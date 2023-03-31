import { OBJLoader }     from "./OBJLoader.js";     // importando o OBJLoader
import { OrbitControls } from './OrbitControls.js'; // importando o OrbitControls
import { GUI }           from "./dat.gui.module.js";
import { RGBELoader }    from "./RGBELoader.js";     // importando a biblioteca RGBELoader

var scene;
// cria a cena
scene = new THREE.Scene();             // cria o construtor da cena


// Cria acamera
var camera;
  camera = new THREE.PerspectiveCamera(75, 
   window.innerWidth / window.innerHeight, 
                                      0.1, 
                                    1000);
             camera.position.set(0, 0, 5);

// Cria a renderização
var renderer;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

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

/*
var objLoader;
var robo;
  // Load the OBJ file with its MTL materials
objLoader = new OBJLoader();
objLoader.load('componente.obj', function (obj) {
// Add the loaded object to the scene
robo = obj.scene;                          // objeto recebe a cena
scene.add(obj);
});
*/

var objLoader_base;
var robo_base;
  // Load the OBJ file with its MTL materials
  objLoader_base = new OBJLoader();
  objLoader_base.load('BASE.obj', function (base) {
  // Add the loaded object to the scene
  robo_base = base.scene;                          // objeto recebe a cena
  //objLoader_base.position.set(0, 0, 0);
  scene.add(base);
});

var objLoader_topo;
var robo_topo;
  // Load the OBJ file with its MTL materials
  objLoader_topo = new OBJLoader();
  objLoader_topo.load('PARTE_CIMA.obj', function (topo) {
  // Add the loaded object to the scene
  robo_topo = topo.scene;                          // objeto recebe a cena
  //objLoader_base.position.set(0, 0, 0);
  scene.add(topo);
});

// grupos
const grupo = new THREE.Group(); //cria um grupo que rotaciona o robô por inteiro 
grupo.add(objLoader_base,objLoader_topo);
scene.add(grupo); 

// controles de órbita
var controls_orbit;                           // OrbitControls (Parte dos controles de zoom, giro, etc..)
  controls_orbit  = new OrbitControls(camera, // cria um construtor passando a câmera para visualizar
                        renderer.domElement); // domelement para escutar os eventos com mouse
         controls_orbit.enableDamping = true; // sensibilidade ao detectar o mouse arrastando
          controls_orbit.dampingFactor = 0.1; // regular o valor


var axes;
  // cria os eixos
axes = new THREE.AxesHelper(10); // cria um construtor para os eixos passando o tamanho
scene.add(axes);                   // adiciona os eixos a cena

// cor de fundo
scene.background = new THREE.Color(0x000000, // construtor da cor de fundo da cena
                                          1); 


var luz_ambiente;
// luz que vai iluminar o ambiente
luz_ambiente = new THREE.AmbientLight(0x000000, // construtor da luz ambiente
                                             1); // intensidade da luz
scene.add(luz_ambiente);                        // adiciona a cena


var luz_direcional;
function init_luz_direcional()
{
// luz numa direção específica
luz_direcional = new THREE.DirectionalLight(0xffffff,  // construtor da luz numa direção específica
                                                        2);// intensidade da luz
scene.add(luz_direcional);                                 // adiciona a cena
}


// Controles GUI
var gui;
  gui = new GUI();
  //gui.add(objLoader_base.rotation, "y", 0, Math.PI * 2).name("BASE");
  //gui.add(objLoader_topo.rotation, "y", 0, Math.PI * 2).name("Braço vertical");
  gui.add(grupo.rotation,  "x", 0, Math.PI * 2).name("COMPLETO");


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


//init_luz_ambiente();
//init_luz_direcional();

renderiza();