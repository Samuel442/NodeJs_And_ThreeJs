import { OrbitControls } from "./OrbitControls.js";
import { GUI } from "./dat.gui.module.js";

var scene;
function init_scene()
{
  // construtor da cena
  scene = new THREE.Scene();                // cria uma cena
}

var camera;
function init_camera()
{
  // construtor da câmera
  camera = new THREE.PerspectiveCamera(75,  // parâmetros da câmera (75 = campo de visão,
  window.innerWidth / window.innerHeight,   // proporção da imagem dividindo a largura / altura,
                                     0.1,   // 0.1 = plano de recorte mínimo 
                                  1000);    // 1000 = mais distantes máximo
                  camera.position.z = 5;    // seta a posição da câmera em z = 5
}


var renderer;
function init_renderer()
{
  // renderização
renderer = new THREE.WebGLRenderer();              // construtor da renderização criando um render
renderer.setSize(window.innerWidth, window.innerHeight); // seta a largura e altura
document.body.appendChild(renderer.domElement);          // adiciona um elemento dentro do corpo do documento html
}

var cube;
function add_cube()
{
// geometria do cubo
const geometry = new THREE.BoxGeometry(2, 2, 2);          // construtor de geometria do cubo
// material do cubo
const material = new THREE.MeshBasicMaterial({color: 0x00ff00}); // cria um material será a textura
cube = new THREE.Mesh(geometry, material); // por fim é criado o cubo com a geometria e o material que é a textura
scene.add(cube);                                 // adiciona o cubo na cena
}

var luz_ambiente;
function add_luz_ambiente()
{
  // luz que vai iluminar o ambiente
  luz_ambiente = new THREE.AmbientLight(0xffffff,  // construtor da luz ambiente 
                                              1);  // intensidade da luz
scene.add(luz_ambiente);                             // adiciona a cena     
}

var luz_direcional;
function add_luz_direcional()
{
  // luz numa direção específica
  luz_direcional = new THREE.DirectionalLight(0xffffff, // construtor da luz direcional
                                                     1); // intensidade da luz
scene.add(luz_direcional);                               // adiciona a cena
}

var controls_orbit;
function add_controls_orbit()
{
// OrbitControls (Parte dos controles de zoom, giro, etc..)
controls_orbit  = new OrbitControls(camera, // cria um construtor passando a câmera para visualizar
  renderer.domElement);  // domelement para escutar os eventos com mouse
  controls_orbit.enableDamping = true; // sensibilidade ao detectar o mouse arrastando
  controls_orbit.dampingFactor = 0.1;  // regular o valor
}

function resize()
{
      // responsividade da tela
      window.addEventListener('resize', onWindowResize, false);  // ouve eventos de alteração da dimensão da janela

      function onWindowResize(){                                 // função que processa eventos de alterações da tela
        camera.aspect = window.innerWidth / window.innerHeight;  // recebe a dimensão atual da janela
        camera.updateProjectionMatrix();                         // atualia a projeção da janela
        renderer.setSize(window.innerWidth, window.innerHeight); // altera as dimensoes da janela depois que alterou
      }
}

function gui_controls()
{
  // parte da interface de controle GUI
const gui = new GUI();
gui.add(cube.position, "x", -50, 50, 5).name("X posição");
gui.add(cube.scale, "x", 1, 10, 0.5).name("X scale");
gui.add(cube.rotation, "x", 0, Math.PI * 2).name("X rotation");
gui.add(cube.material, "wireframe");
gui.add(cube, "visible");
let folderRGB = gui.addFolder("RGB");
folderRGB.add(cube.material.color, "r", 0, 1).name("color red");
folderRGB.add(cube.material.color, "g", 0, 1).name("color green");
folderRGB.add(cube.material.color, "b", 0, 1).name("color blue");
let palette = {
  color: [0, 255, 255]
}
folderRGB.addColor(palette, 'color').onChange(function(value){
  cube.material.color.r = value[0] / 255;
  cube.material.color.g = value[1] / 255;
  cube.material.color.b = value[2] / 255;
})
}

function render() {              // cria uma função de animar a cena
  requestAnimationFrame(render);  // recursivamente a função fica em loop
  //cube1.rotation.x += 0.01;      // rotaciona o cubo em x nessa velocidade
  //cube1.rotation.y += 0.01;      // rotaciona o cubo em y nessa velocidade
  renderer.render(scene, camera); // renderiza a cena e a câmera exibindo o cubo
}

init_scene();
init_camera();
init_renderer();
add_cube();
add_luz_ambiente();
add_luz_direcional();
add_controls_orbit();
resize();
gui_controls();
render();
