import { TrackballControls } from "./TrackballControls.js"; // importando a biblioteca GLTFLoader

var clock;
function init_clock()
{
  clock = new THREE.Clock();   // armazena instantes de tempos da aplicação
}
             
var scene;
function init_scene()
{
  // construtor da cena
  scene = new THREE.Scene();  // cria uma cena 
}
             
var camera;
function init_camera()
{
  // construtor da câmera
camera = new THREE.PerspectiveCamera(75,  // parâmetros da câmera (75 = campo de visão,
window.innerWidth / window.innerHeight,   // proporção da imagem dividindo a largura / altura,
                                   0.1,   // 0.1 = plano de recorte mínimo 
                                1000);    // 1000 = mais distantes máximo
                                camera.position.z = 5;           // seta a posição da câmera em z = 5
}

var renderer;
function init_renderer()
{
  // renderização
  renderer = new THREE.WebGLRenderer();              // construtor da renderização criando um render
  renderer.setSize(window.innerWidth, window.innerHeight); // seta a largura e altura
  document.body.appendChild(renderer.domElement);          // adiciona um elemento dentro do corpo do documento html

}

function add_cube()
{
// geometria do cubo
const geometry = new THREE.BoxGeometry(2, 2, 2);          // construtor de geometria do cubo
// material do cubo
const material = new THREE.MeshBasicMaterial({color: 0x00ff00,
                                              wireframe: true,}); // cria um material será a textura
const cube = new THREE.Mesh(geometry, material); // por fim é criado o cubo com a geometria e o material que é a textura
scene.add(cube);  // adiciona o cubo na cena
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

var axes;
function add_eixo()
{
  axes = new THREE.AxesHelper(20);
  scene.add(axes);

}

var trackballControls;
function add_trackballControls()
{
      // parte do trackball
      trackballControls = new TrackballControls(camera,
      renderer.domElement);
      trackballControls.rotateSpeed = 1;
      trackballControls.zoomSpeed = 1;
      trackballControls.panSpeed = 1;

}

function render() {              // cria uma função de animar a cena
  var delta = clock.getDelta();   // difirença de tempo entre uma chamda da função animate e a próxima chamda da função animate
  trackballControls.update(delta); // calcula 
  requestAnimationFrame(render);  // recursivamente a função fica em loop
  //cube1.rotation.x += 0.01;      // rotaciona o cubo em x nessa velocidade
  //cube1.rotation.y += 0.01;      // rotaciona o cubo em y nessa velocidade
  renderer.render(scene, camera); // renderiza a cena e a câmera exibindo o cubo
}

init_clock()
init_scene()
init_camera()
init_renderer()
add_cube()
resize()
add_eixo()
add_trackballControls()
render()                   // função é chamada


/* OBS: A função animate é chamada a cada vez que se desenha na tela, por exemplo se a aplicação tiver 
   60 frames por segundo, então a cada segundo a função animate é chamada 60 vezes, a variável delta
   é o tempo passado entre o útimo frame e o frame atual. Com esse tempo a aplicação consegue calcular 
   quantos frames por segundo ela possui e informar isso a camera com o método flyControls.update(delta);
   e a biblioteca de controle. A camera se move independente dos frames por segundo graças a atualização
   do delta.
 */