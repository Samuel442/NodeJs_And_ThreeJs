import { GLTFLoader } from "./GLTFLoader.js"; // importando a biblioteca GLTFLoader

function init()                               // função de início
{
    
// cria a cena
var scene = new THREE.Scene();             // cria o construtor da cena

//cria a câmera
var camera = new THREE.PerspectiveCamera(  // cria o construtor da camera
    7,                                     // campo de visão da câmera
    window.innerWidth / window.innerHeight,// largura pela altura para proporção da imagem
    0.01,                                  // distancia mínima de visão plano de recorte min
    1000                                   // distância máxima de visão plano de recorte max
);

// posicionamento da câmera
camera.position.x = 0;    // na origem em x
camera.position.y = -0.1; // câmera distante -0.1 unidade de y
camera.position.z = 10;   // câmera distante 10 unidades de z

// rebderização
var renderer = new THREE.WebGLRenderer();                // cria o construtor de renderização
renderer.setSize(window.innerWidth, window.innerHeight); // seta a largura e altura
document.body.appendChild(renderer.domElement);          // linka com o corpo do index do html

// carregamento do gltf
var carrega_gltf = new GLTFLoader(); // construtor para o carregamento do gltf
var drone;                           // variável para receber a cena gltf

carrega_gltf.load("scene.gltf", function(gltf){  // carrega o arquivo gltf passando a função com argumento objeto gltf
    drone = gltf.scene;                          // objeto recebe a cena
    scene.add(gltf.scene);                       // adiciona o gltf a cena
});

// cria os eixos
var axes = new THREE.AxesHelper(10); // cria um construtor para os eixos passando o tamanho
  scene.add(axes);                   // adiciona os eixos a cena

// cor de fundo
scene.background = new THREE.Color(0xffffff); // construtor da cor de fundo da cena

// luz que vai iluminar o ambiente
var luz_ambiente = new THREE.AmbientLight(0xffffff, // construtor da luz ambiente
                                          2);       // intensidade da luz
scene.add(luz_ambiente);                            // adiciona a cena

// luz numa direção específica
var luz_direcional = new THREE.DirectionalLight(0xffffff,  // construtor da luz numa direção específica
                                                        2);// intensidade da luz
scene.add(luz_direcional);                                 // adiciona a cena

// responsividade da tela
window.addEventListener('resize', onWindowResize, false);  // ouve eventos de alteração da dimensão da janela

function onWindowResize(){                                 // função que processa eventos de alterações da tela
  camera.aspect = window.innerWidth / window.innerHeight;  // recebe a dimensão atual da janela
  camera.updateProjectionMatrix();                         // atualia a projeção da janela
  renderer.setSize(window.innerWidth, window.innerHeight); // altera as dimensoes da janela depois que alterou
}

function animate(){                  // cria a função de animação
    requestAnimationFrame(animate);  // chama a animate recursivamente com o método requestAnimationFrame que faz atualizações
    drone.rotation.y += 0.001;       // rotaciona com essa velocidade em x
    drone.rotation.x += 0.001;       // rtaciona com essa velocidade em y
    renderer.render(scene, camera);  // renderiza a cena e câmera
}
animate();                           // chama a funçao de animação
}
window.onload = init; // quando carregar a janela executa a função init