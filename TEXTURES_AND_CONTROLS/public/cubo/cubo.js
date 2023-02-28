import { OrbitControls } from './OrbitControls.js';

var scene;
function init_scene()
{
// construtor da cena
scene = new THREE.Scene();                // cria uma cena
}

var loader;
function carrega_fundo()
{
  // fundo da cena
loader = new THREE.TextureLoader();
loader.load('./fundo.png', function(texture){
  scene.background = texture;
});
}

var camera;
function init_camera()
{
  // construtor da câmera
camera = new THREE.PerspectiveCamera(75,  // parâmetros da câmera (75 = campo de visão,
window.innerWidth / window.innerHeight,   // proporção da imagem dividindo a largura / altura,
                                   0.1,   // 0.1 = plano de recorte mínimo 
                                 1000);   // 1000 = mais distantes máximo
camera.position.z = 5;                    // seta a posição da câmera em z = 5
}

var renderer;
function init_renderer()
{
    // renderização
    renderer = new THREE.WebGLRenderer({antialias: true}); // construtor da renderização criando um render
    renderer.setPixelRatio(window.devicePixelRatio);       //seta razão de pixel, usualmente definido pra prevenir borramento
    renderer.setSize(window.innerWidth, window.innerHeight); // seta a largura e altura
    document.body.appendChild(renderer.domElement);          // adiciona um elemento dentro do corpo do documento html
}

var cube1;
function add_cubo1_com_textura()
{
  var textura_material1 = new THREE.TextureLoader().load('./crate.gif');
  var geometria1 = new THREE.BoxGeometry(1, 1, 1);                   // construtor de geometria do cubo
  var material1 = new THREE.MeshBasicMaterial({map: textura_material1});     // cria um material será a textura
  cube1 = new THREE.Mesh(geometria1, material1);
  cube1.position.set(0,-2,0);
  scene.add(cube1);
}

var cube2;
function add_cubo2_com_textura()
{
  var textura_material2 = new THREE.TextureLoader().load('./crate.gif');
  var geometria2 = new THREE.BoxGeometry(1, 1, 1);                   // construtor de geometria do cubo
  var material2 = new THREE.MeshBasicMaterial({map: textura_material2});     // cria um material será a textura
  cube2 = new THREE.Mesh(geometria2, material2);
  cube2.position.set(1,0,0);
  scene.add(cube2);
}

var axis;
function add_eixo_cena()
{
  axis = new THREE.AxesHelper(200);
  scene.add(axis);
}

var controle1;
function contole_cubo_1()
{
  // OrbitControls (Parte dos controles de zoom, giro, etc..)
  controle1 = new OrbitControls(camera, // cria um construtor passando a câmera para visualizar
                  renderer.domElement);  // domelement para escutar os eventos com mouse
//controls.minDistance = 3;     // distancia limite para o zoom de distanciar 
//controls.maxDistance = 25;          // distancia limite para o zoom de aproximar
controle1.enableDamping = true;        // sensibilidade ao detectar o mouse arrastando
controle1.dampingFactor = 0.1;         // regular o valor
controle1.update();
}

var controle2;
function contole_cubo_2()
{
  // OrbitControls (Parte dos controles de zoom, giro, etc..)
  controle2 = new OrbitControls(camera, // cria um construtor passando a câmera para visualizar
               renderer.domElement);    // domelement para escutar os eventos com mouse
//controls.minDistance = 3;             // distancia limite para o zoom de distanciar 
//controls.maxDistance = 25;            // distancia limite para o zoom de aproximar
controle2.enableDamping = true;         // sensibilidade ao detectar o mouse arrastando
controle2.dampingFactor = 0.1;          // regular o valor
controle2.update();
}


function responsividade()
{
      // responsividade da tela
      window.addEventListener('resize', onWindowResize, false);  // ouve eventos de alteração da dimensão da janela
      function onWindowResize(){                                 // função que processa eventos de alterações da tela
        camera.aspect = window.innerWidth / window.innerHeight;  // recebe a dimensão atual da janela
        camera.updateProjectionMatrix();                         // atualia a projeção da janela
        renderer.setSize(window.innerWidth, window.innerHeight); // altera as dimensoes da janela depois que alterou
      }
}

function render()
{
requestAnimationFrame(render);     // recursivamente a função fica em loop
//cube.rotation.x += 0.01;        // rotaciona o cubo em x nessa velocidade
//cube.rotation.y += 0.01;        // rotaciona o cubo em y nessa velocidade
controle1.update();
controle2.update();
renderer.render(scene, camera); // renderiza a cena e a câmera exibindo o cubo
}

init_scene();
carrega_fundo();
init_camera();
init_renderer();
add_cubo1_com_textura();
add_cubo2_com_textura();
//add_eixo_cena();
contole_cubo_1();
contole_cubo_2();
responsividade();
render();
