import { GLTFLoader } from "./GLTFLoader.js";      // importando a biblioteca GLTFLoader
import { OrbitControls } from "./OrbitControls.js" // importando a biblioteca OrbitControls

function init()                            // função principal de início
{

// cria a cena
var scene = new THREE.Scene();             // cria o construtor da cena

// cria a camera
var camera = new THREE.PerspectiveCamera(  // cria o construtor da camera
    11,                                    // campo de visão da câmera
    window.innerWidth / window.innerHeight,// largura pela altura para a proporção da imagem 
    0.01,                                  // distancia mínima de visão plano de recorte mín
    1000                                   // distância máxima de visão plano de recorte máx
);

// posicionando a câmera
camera.position.x = 0;  // posição na origem em x
camera.position.y = 0.2;// posição a 0.2 da origem de y
camera.position.z = 10; // posição a 10 unidades de z

// renderização
var renderer = new THREE.WebGLRenderer();                // cria o construtor de renderização
renderer.setSize(window.innerWidth, window.innerHeight); // seta a largura e altura da janela
document.body.appendChild(renderer.domElement);          // adiciona um elemento dentro do corpo do documento html

// eixos
var axes = new THREE.AxesHelper(30); // cria um construtor para os eixos passando o tamanho
scene.add(axes);                     // adiciona os eixos a cena

// construtor de carregamento do gltf
var loader = new GLTFLoader();  // construtor para o carregamento do arquivo gltf
var robo;                       // variável para receber a cena gltf

// função de carregamento do gltf
loader.load("scene.gltf", function(gltf){ // carrega a cena gltf passando a função com argumento gltf
    robo = gltf.scene;                    // objeto robo recebe a cena
    scene.add(gltf.scene);                // adiciona o arquivo gltf a cena
});

// cor de fundo
scene.background = new THREE.Color(0x708090); // construtor da cor de fundo da cena

// luz que vai iluminar o ambiente
var luz_ambiente = new THREE.AmbientLight(0x404040,  // construtor da luz ambiente 
                                                3);  // intensidade da luz
scene.add(luz_ambiente);                             // adiciona a cena

// luz numa direção específica
var luz_direcional = new THREE.DirectionalLight(0xffffff, // construtor da luz direcional
                                                      2); // intensidade da luz
scene.add(luz_direcional);                                // adiciona a cena

// OrbitControls (Parte dos controles de zoom, giro, etc..)
var controls = new OrbitControls(camera, // cria um construtor passando a câmera para visualizar
                   renderer.domElement);  // domelement para escutar os eventos com mouse
controls.minDistance = 3;     // distancia limite para o zoom de distanciar 
controls.maxDistance = 25;    // distancia limite para o zoom de aproximar
controls.enableDamping = true; // sensibilidade ao detectar o mouse arrastando
controls.dampingFactor = 0.1;  // regular o valor

    // responsividade da tela
    window.addEventListener('resize', onWindowResize, false);  // ouve eventos de alteração da dimensão da janela

    function onWindowResize(){                                 // função que processa eventos de alterações da tela
      camera.aspect = window.innerWidth / window.innerHeight;  // recebe a dimensão atual da janela
      camera.updateProjectionMatrix();                         // atualia a projeção da janela
      renderer.setSize(window.innerWidth, window.innerHeight); // altera as dimensoes da janela depois que alterou
    }

function animate(){                  // cria a função de animação
    requestAnimationFrame(animate);  // recursividde chamando animate dentro dela mesma por frames
    renderer.render(scene, camera);  // renderiza a cena e câmera
}
animate();                           // chama a funçao de animação
}

window.onload = init;                // quando abre a janela chama a função init