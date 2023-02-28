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

var cube;
function cube_sem_textura()
{
// geometria do cubo
var geometria = new THREE.BoxGeometry(1, 1, 1);                   // construtor de geometria do cubo
// material do cubo
var material = new THREE.MeshBasicMaterial({color: 0x000000, 
                                         wireframe: false,}); // cria um material será a textura
cube = new THREE.Mesh(geometria, material);                   // por fim é criado o cubo com a geometria e o material que é a textura
scene.add(cube);                                              // adiciona o cubo na cena
cube.position.set(0,0,0);
}


function add_cubo_com_textura()
{
  var textura_material = new THREE.TextureLoader().load('./crate.gif');
  var geometria = new THREE.BoxGeometry(3, 3, 3);                   // construtor de geometria do cubo
  var material = new THREE.MeshBasicMaterial({map: textura_material});     // cria um material será a textura
  cube = new THREE.Mesh(geometria, material);
  scene.add(cube);
}

var axis;
function add_eixo_cena()
{
  axis = new THREE.AxesHelper(200);
  scene.add(axis);
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
cube.rotation.x += 0.01;        // rotaciona o cubo em x nessa velocidade
cube.rotation.y += 0.01;        // rotaciona o cubo em y nessa velocidade
renderer.render(scene, camera); // renderiza a cena e a câmera exibindo o cubo
}

init_scene();
carrega_fundo();
init_camera();
init_renderer();
add_cubo_com_textura();
add_eixo_cena();
responsividade();
render();
