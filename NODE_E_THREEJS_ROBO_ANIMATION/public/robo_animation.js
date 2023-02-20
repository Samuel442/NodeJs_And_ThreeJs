import { GLTFLoader }    from  "./GLTFLoader.js"      // importando a biblioteca GLTFLoader
import { OrbitControls } from  "./OrbitControls.js" ; // importando a biblioteca OrbitControls
import { RGBELoader }    from  "./RGBELoader.js";     // importando a biblioteca RGBELoader

function init()                            // função de início
{

// cria a cena
var scene = new THREE.Scene();             // cria o construtor da cena

//cria a câmera
var camera = new THREE.PerspectiveCamera(  // cria o construtor da camera
    100,                                   // campo de visão da câmera
    window.innerWidth / window.innerHeight,// largura pela altura para proporção da imagem
    0.01,                                  // distancia mínima de visão plano de recorte min
    1000                                   // distância máxima de visão plano de recorte max
);

//camera.position.set(15, 10, 25);
camera.lookAt(0, 0, 0);

// posicionamento da câmera
camera.position.x = 10;    // na origem em x
camera.position.y = -2;    // câmera distante -0.1 unidade de y
camera.position.z = 160;   // câmera distante 10 unidades de z

// rebderização
var renderer = new THREE.WebGLRenderer();                // cria o construtor de renderização
renderer.setSize(window.innerWidth, window.innerHeight); // seta a largura e altura
document.body.appendChild(renderer.domElement);          // linka com o corpo do index do html

// eixos
var axes = new THREE.AxesHelper(150); // cria um construtor para os eixos passando o tamanho
scene.add(axes);                     // adiciona os eixos a cena

// carregamento imagem de fundo
new RGBELoader()
    .load("fundo.hdr", function(texture){                     // carrega a imagem hdr cria uma função que passa atextura
    texture.mapping = THREE.EquirectangularReflectionMapping; // mapeamento de textura recebe mapeamento de reflexão retangular de 3 pontos
    scene.background = texture;                               // aplica a textura no plano de fundo
    scene.environment = texture;                              // aplica a textura no ambiente de cena
    });
renderer.toneMapping = THREE.ACESFilmicToneMapping;  // tom do mapa recebe o mapeamento do ton do filme
renderer.toneMappingExposure = 1;                    // regula o mapeamento de exposição 
renderer.outputEncoding = THREE.sRGBEncoding;        // método de interpolação das cores do ambiente

// carregamento do gltf
var carrega_gltf = new GLTFLoader(); // construtor para o carregamento do gltf
var robo;                            // variável para receber a cena gltf

carrega_gltf.load("scene.gltf", function(gltf){  // carrega o arquivo gltf passando a função com argumento objeto gltf
    robo = gltf.scene;                          // objeto recebe a cena
    scene.add(gltf.scene);                       // adiciona o gltf a cena
});

// cor de fundo
scene.background = new THREE.Color(0xffffff); // construtor da cor de fundo da cena

// luz que vai iluminar o ambiente
var luz_ambiente = new THREE.AmbientLight(0xffffff, // construtor da luz ambiente
                                          1);       // intensidade da luz
scene.add(luz_ambiente);                            // adiciona a cena

// luz numa direção específica
var luz_direcional = new THREE.DirectionalLight(0xffffff,  // construtor da luz numa direção específica
                                                        1);// intensidade da luz
scene.add(luz_direcional);                                 // adiciona a cena

// OrbitControls (Parte dos controles de zoom, giro, etc..)
var controls = new OrbitControls(camera, // cria um construtor passando a câmera para visualizar
                   renderer.domElement);  // domelement para escutar os eventos com mouse
//controls.minDistance = 3;     // distancia limite para o zoom de distanciar 
//controls.maxDistance = 25;    // distancia limite para o zoom de aproximar
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
    requestAnimationFrame(animate);  // chama a animate recursivamente com o método requestAnimationFrame que faz atualizações
    renderer.render(scene, camera);  // renderiza a cena e câmera
}
animate();                           // chama a funçao de animação
}

window.onload = init; // quando carregar a janela executa a função init