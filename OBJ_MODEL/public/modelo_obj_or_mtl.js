import { OBJLoader } from "./OBJLoader.js"; // importando o OBJLoader
import { MTLLoader } from "./MTLLoader.js"; // importando o MTLLoader
import { OrbitControls } from './OrbitControls.js'; // importando o OrbitControls

var scene;
// cria a cena
scene = new THREE.Scene();             // cria o construtor da cena

var camera;
  //cria a câmera
camera = new THREE.PerspectiveCamera(  // cria o construtor da camera
20,                                     // campo de visão da câmera
window.innerWidth / window.innerHeight,// largura pela altura para proporção da imagem
0.01,                                  // distancia mínima de visão plano de recorte min
1000                                   // distância máxima de visão plano de recorte max
);
// posicionamento da câmera
camera.position.x = 5;    // na origem em x
camera.position.y = 5; // câmera distante -0.1 unidade de y
camera.position.z = 17;   // câmera distante 10 unidades de z

var renderer;
function init_renderer()
{
// renderização
renderer = new THREE.WebGLRenderer();                // cria o construtor de renderização
renderer.setSize(window.innerWidth, window.innerHeight); // seta a largura e altura
document.body.appendChild(renderer.domElement);          // linka com o corpo do index do html
}



var objLoader;
var robo;
  // Load the OBJ file with its MTL materials
objLoader = new OBJLoader();
//objLoader.setPath('path/to/your/obj/and/mtl/files/');
objLoader.load('componente.obj', function (obj) {
// Add the loaded object to the scene
robo = obj.scene;                          // objeto recebe a cena
scene.add(obj);
});


var controls;
  // OrbitControls (Parte dos controles de zoom, giro, etc..)
controls = new OrbitControls(camera, // cria um construtor passando a câmera para visualizar
               renderer.domElement);  // domelement para escutar os eventos com mouse
controls.minDistance = 0;     // distancia limite para o zoom de distanciar 
controls.maxDistance = 25;    // distancia limite para o zoom de aproximar
controls.enableDamping = true; // sensibilidade ao detectar o mouse arrastando
controls.dampingFactor = 0.1;  // regular o valor

var axes;
  // cria os eixos
axes = new THREE.AxesHelper(10); // cria um construtor para os eixos passando o tamanho
scene.add(axes);                   // adiciona os eixos a cena

  // cor de fundo
  scene.background = new THREE.Color(0x000000, // construtor da cor de fundo da cena
                                            10); 

var luz_ambiente;
// luz que vai iluminar o ambiente
luz_ambiente = new THREE.AmbientLight(0x000000, // construtor da luz ambiente
                                            10); // intensidade da luz
scene.add(luz_ambiente);                        // adiciona a cena

var luz_direcional;
// luz numa direção específica
luz_direcional = new THREE.DirectionalLight(0xffffff,  // construtor da luz numa direção específica
                                                        2);// intensidade da luz
scene.add(luz_direcional);                                 // adiciona a cena

// responsividade da tela
window.addEventListener('resize', onWindowResize, false);  // ouve eventos de alteração da dimensão da janela

function onWindowResize(){                                 // função que processa eventos de alterações da tela
  camera.aspect = window.innerWidth / window.innerHeight;  // recebe a dimensão atual da janela
  camera.updateProjectionMatrix();                         // atualia a projeção da janela
  renderer.setSize(window.innerWidth, window.innerHeight); // altera as dimensoes da janela depois que alterou
}

function renderiza(){                  // cria a função de animação
    requestAnimationFrame(renderiza);  // chama a animate recursivamente com o método requestAnimationFrame que faz atualizações
    renderer.render(scene, camera);  // renderiza a cena e câmera
}

renderiza();