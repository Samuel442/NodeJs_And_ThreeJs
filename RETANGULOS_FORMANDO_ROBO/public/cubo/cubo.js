import { GUI }           from "./dat.gui.module.js";
import { RGBELoader }    from "./RGBELoader.js";     // importando a biblioteca RGBELoader
import { OrbitControls } from "./OrbitControls.js";

// cria a cena
var scene;
scene = new THREE.Scene();


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

// figuras que formam o manipulador
    // retangulo menor
    var retangulo_menor;
    var geometria_retangulo_menor = new THREE.BoxGeometry(0.3, 1, 0.2);
    var material_retangulo_menor = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(
                                                              './textura.jpg') });
    //var material_retangulo_menor = new THREE.MeshBasicMaterial({ color: 0xfffff0});
    retangulo_menor = new THREE.Mesh(geometria_retangulo_menor, material_retangulo_menor);
    retangulo_menor.position.set(1.3, 0.3, 0);

    //var textura_material = new THREE.TextureLoader().load('./crate.gif');
    //var geometria = new THREE.BoxGeometry(3, 3, 3);                   // construtor de geometria do cubo
    //var material = new THREE.MeshBasicMaterial({map: textura_material});     // cria um material será a textura
    //cube = new THREE.Mesh(geometria, material);
    //scene.add(cube);
  
    // retangulo de cima
    var retangulo_cima;
    var geometria_retangulo_cima = new THREE.BoxGeometry(0.4, 2, 0.3);
    var material_retangulo_cima = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(
      './textura.jpg') });
    retangulo_cima = new THREE.Mesh(geometria_retangulo_cima, material_retangulo_cima);
    //rectangulo_cima.position.set(-0.5, 2.1, 0);
    const angle = Math.PI / 2; // 90 degrees in radians
    const x = 0.5; // X position of the base of the rectangle
    const y = 0.9; // Y position of the top of the rectangle
    retangulo_cima.position.set(x, y, 0);
    retangulo_cima.rotation.z = angle;
    /*
    const angle = Math.PI / 9; // 20 degrees in radians
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const x = 0; // X position of the base of the rectangle
    const y = 0; // Y position of the base of the rectangle
    rectangulo_cima.position.set(x + cos, y + sin, 0);
    rectangulo_cima.rotation.z = angle;
    */
  
    // retangulo de baixo
    var retangulo_baixo;
    var geometria_retangulo_baixo = new THREE.BoxGeometry(0.4, 2, 0.3);
    var material_retangulo_baixo = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(
      './textura.jpg') });
    retangulo_baixo = new THREE.Mesh(geometria_retangulo_baixo, material_retangulo_baixo);
    retangulo_baixo.position.set(-0.5, 0.1, 0);
  
    // cilindro
    var cilindro_base;
    var geometria_cilindro_base = new THREE.CylinderGeometry(0.3, 0.3, 2, 32);
    var material_cilindro_base = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(
                                                                                './textura.jpg') });
    cilindro_base = new THREE.Mesh(geometria_cilindro_base, material_cilindro_base);
    cilindro_base.position.set(-0.5, -1.86, 0);
  
    // plano
    var plano;
    var geometria_plano_base = new THREE.PlaneGeometry(1, 2);
    var material_plano_base = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(
      './textura_plano.jpg') });
    plano = new THREE.Mesh(geometria_plano_base, material_plano_base);
    plano.position.set(-0.5, -2.86, 0);
    plano.rotation.x = -Math.PI / 2; 

// grupos
  const grupo = new THREE.Group(); //cria um grupo que rotaciona o robô por inteiro 
  grupo.add(retangulo_baixo, retangulo_cima, retangulo_menor,cilindro_base, plano);
  scene.add(grupo);  


// controles de órbita
var controls_orbit;                           // OrbitControls (Parte dos controles de zoom, giro, etc..)
  controls_orbit  = new OrbitControls(camera, // cria um construtor passando a câmera para visualizar
                        renderer.domElement); // domelement para escutar os eventos com mouse
         controls_orbit.enableDamping = true; // sensibilidade ao detectar o mouse arrastando
          controls_orbit.dampingFactor = 0.1; // regular o valor


// Controles GUI
var gui;
  gui = new GUI();
  gui.add(retangulo_baixo.rotation, "y", 0, Math.PI * 2).name("Braço vertical");
  gui.add(retangulo_cima.rotation,  "x", 0, Math.PI * 2).name("Braço horizontal");
  gui.add(cilindro_base.rotation,   "y", 0, Math.PI * 2).name("Cilindro base");
  gui.add(plano.rotation,           "z", 0, Math.PI * 2).name("Plano base");
  gui.add(retangulo_menor.rotation, "y", 0, Math.PI * 2).name("Bico");
  gui.add(grupo.rotation,           'y', 0, Math.PI * 2).name("completo");


  //gui.add(robo_horizontal_bico.rotation, "z", 0, Math.PI * 2).name("Braço horizontal e bico");

    // responsividade da tela
window.addEventListener('resize', onWindowResize, false);  // ouve eventos de alteração da dimensão da janela
function onWindowResize(){                                 // função que processa eventos de alterações da tela
  camera.aspect = window.innerWidth / window.innerHeight;  // recebe a dimensão atual da janela
  camera.updateProjectionMatrix();                         // atualia a projeção da janela
  renderer.setSize(window.innerWidth, window.innerHeight); // altera as dimensoes da janela depois que alterou
}

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();












