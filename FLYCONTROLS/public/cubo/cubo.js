import { FlyControls } from "./FlyControls.js"; // importando a biblioteca GLTFLoader

var clock;
function init_clock()
{
  // para controlar suavidade da câmera em fps
  clock = new THREE.Clock();                // armazena instantes de tempos da aplicação
}

var scene;
function init_scene()
{
// construtor da cena
scene = new THREE.Scene();                // cria uma cena
}

function loader_fundo()
{
  // fundo da cena
var loader = new THREE.TextureLoader();
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


function add_cube1()
{
  // geometria do cubo1
const geometria_cubo1 = new THREE.BoxGeometry(1, 1, 1);          // construtor de geometria do cubo

// material do cubo 2
const material_cubo1 = new THREE.MeshBasicMaterial({color: 0x000000,    // cor
                                              wireframe: false,});      // cria um material será a textura
const cube1 = new THREE.Mesh(geometria_cubo1, material_cubo1);            // por fim é criado o cubo com a geometria e o material que é a textura
scene.add(cube1);                                                       // adiciona o cubo na cena
cube1.position.set(0,1,0);
}

function add_cube2()
{
  // geometria do cubo 2
const geometria_cubo2 = new THREE.BoxGeometry(1, 1, 1);                // construtor de geometria do cubo

// material do cubo 2
const material_cubo2 = new THREE.MeshBasicMaterial({color: 0x000000,    // cor
                                              wireframe: false,});      // cria um material será a textura
const cube2 = new THREE.Mesh(geometria_cubo2, material_cubo2);          // por fim é criado o cubo com a geometria e o material que é a textura
scene.add(cube2);                                                       // adiciona o cubo na cena
cube2.position.set(1,-2,0);
}

function add_cube3()
{
  // geometria do cubo 3
const geometria_cubo3 = new THREE.BoxGeometry(1, 1, 1);                 // construtor de geometria do cubo

// material do cubo 3
const material_cubo3 = new THREE.MeshBasicMaterial({color: 0x000000,    // cor
                                              wireframe: false,});      // cria um material será a textura
const cube3 = new THREE.Mesh(geometria_cubo3, material_cubo3);          // por fim é criado o cubo com a geometria e o material que é a textura
scene.add(cube3);                                                       // adiciona o cubo na cena
cube3.position.set(2,0,1);
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

var flyControls;
function add_flyControls()
{
      // parte do flyControls
      flyControls = new FlyControls(camera,renderer.domElement); // cria um construtor para FlyControls
      flyControls.movementSpeed = 50;                                  // velocidade de movimento do clique do mouse
      flyControls.rollSpeed = 0.5;                                     // velocidade de rolagem da câmera
      flyControls.autoForward = false;                                 // avanço automático
      flyControls.dragToLook = true;                                   // dirigir o trageto com o botão do mouse pressionado
}


function render() {              // cria uma função de animar a cena
  var delta = clock.getDelta();   // difirença de tempo entre uma chamda da função animate e a próxima chamda da função animate
  flyControls.update(delta);      // calcula 
  requestAnimationFrame(render); // recursivamente a função fica em loop
  //cube1.rotation.x += 0.01;        // rotaciona o cubo em x nessa velocidade
  //cube1.rotation.y += 0.01;        // rotaciona o cubo em y nessa velocidade
  renderer.render(scene, camera); // renderiza a cena e a câmera exibindo o cubo
}

init_clock();
init_scene();
loader_fundo();
init_camera();
init_renderer();
add_cube1();
add_cube2();
add_cube3();
resize();
add_flyControls();
render();

/* OBS: A função animate é chamada a cada vez que se desenha na tela, por exemplo se a aplicação tiver 
   60 frames por segundo, então a cada segundo a função animate é chamada 60 vezes, a variável delta
   é o tempo passado entre o útimo frame e o frame atual. Com esse tempo a aplicação consegue calcular 
   quantos frames por segundo ela possui e informar isso a camera com o método flyControls.update(delta);
   e a biblioteca de controle. A camera se move independente dos frames por segundo graças a atualização
   do delta.
 */