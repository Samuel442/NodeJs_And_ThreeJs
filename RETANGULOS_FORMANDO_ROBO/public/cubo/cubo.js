import { GUI }           from "./dat.gui.module.js"; // importando a biblioteca GUI
import { RGBELoader }    from "./RGBELoader.js";     // importando a biblioteca RGBELoader
import { OrbitControls } from "./OrbitControls.js";  // importando a biblioteca OrbitControls

// cria a cena
var scene;                 // variável que recebe o construtor da cena
scene = new THREE.Scene(); // cria a cena


// Cria acamera
var camera;                                // variável que recebe a câmera
  camera = new THREE.PerspectiveCamera(75, // cria a câmera com perspectiva
   window.innerWidth / window.innerHeight, // divide a largura pela altura
                                      0.1, // plano de recorte mínimo de visão
                                    1000); // plano de recorte máximo de visão
             camera.position.set(0, 0, 5); // posição da câmera

// Cria a renderização
var renderer;                                             // variável que recebe o construtor da renderização
  renderer = new THREE.WebGLRenderer();                   // cria a renderização
  renderer.setSize(window.innerWidth, window.innerHeight);// seta a largura e altura da janela
  document.body.appendChild(renderer.domElement);         // linka no body do html

// carregamento imagem de fundo
new RGBELoader().load("fundo.hdr", function(texture){         // carrega a imagem hdr cria uma função que passa atextura
    texture.mapping = THREE.EquirectangularReflectionMapping; // mapeamento de textura recebe mapeamento de reflexão retangular de 3 pontos
    scene.background = texture;                               // aplica a textura no plano de fundo
    scene.environment = texture;                              // aplica a textura no ambiente de cena
    });
renderer.toneMapping = THREE.ACESFilmicToneMapping;  // tom do mapa recebe o mapeamento do ton do filme
renderer.toneMappingExposure = 1;                    // regula o mapeamento de exposição 
renderer.outputEncoding = THREE.sRGBEncoding;        // método de interpolação das cores do ambiente

// figuras que formam o manipulador
    // cilindro menor
    var cilindro_menor;
    var geometria_cilindro_menor = new THREE.CylinderGeometry(0.3, 
                                                              0.1,                                                               
                                                                2, 
                                                              32);
    var material_cilindro_menor = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(
                                                                                    './textura.jpg') });
    cilindro_menor = new THREE.Mesh(geometria_cilindro_menor, material_cilindro_menor);
    cilindro_menor.position.set(1.3, 
                                0.3, 
                                 0);

    // elo na horizontal
    var retangulo_cima;
    var geometria_retangulo_cima = new THREE.BoxGeometry(0.4, 
                                                           2, 
                                                           0.3);
    var material_retangulo_cima = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(
                                                                                 './textura.jpg') });
    retangulo_cima = new THREE.Mesh(geometria_retangulo_cima, material_retangulo_cima);
    const angle = Math.PI / 2;       // 90 graus em radianos
    retangulo_cima.position.set(0.5, 
                                0.9, 
                                0);
    retangulo_cima.rotation.z = angle; // rotaciona em z
  
    // cilindro de cima
    var cilindro_cima;
    var geometria_cilindro_cima = new THREE.CylinderGeometry(0.2, // raio superior
                                                             0.2, // raio inferior
                                                             2,   // altura
                                                             32); // faces seguimentadas (resolução)
    var material_cilindro_cima = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(
                                                                                    './textura.jpg') });
    cilindro_cima = new THREE.Mesh(geometria_cilindro_cima, material_cilindro_cima);
    cilindro_cima.position.set(-0.5, // x
                                0.1, // y
                                0);  // z

    // cilindro base
    var cilindro_base;
    var geometria_cilindro_base = new THREE.CylinderGeometry(0.3, // raio superior
                                                             0.3, // raio inferior
                                                             2,   // altura
                                                             32); // faces seguimentadas (resolução)
    var material_cilindro_base = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(
                                                                                './textura.jpg') });
    cilindro_base = new THREE.Mesh(geometria_cilindro_base, material_cilindro_base);
    cilindro_base.position.set(-0.5, // x
                              -1.86, // y
                              0);    // z
  
    // plano
    var plano;
    var geometria_plano_base = new THREE.PlaneGeometry(3, // largura
                                                      2); // altura
    var material_plano_base = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(
                                                                         './textura_plano.jpg') });
    plano = new THREE.Mesh(geometria_plano_base, material_plano_base);
    plano.position.set(-0.5, 
                      -2.86, 
                         0);
    plano.rotation.x = -Math.PI / 2; 

//cria um grupo que rotaciona o robô por inteiro 
  const grupo = new THREE.Group();                                               // construtor do grupo
  grupo.add(cilindro_cima, retangulo_cima, cilindro_menor,cilindro_base, plano);
  scene.add(grupo);  

  var axis;
  axis = new THREE.AxesHelper(2);
  scene.add(axis);

// controles de órbita
var controls_orbit;                           // OrbitControls (Parte dos controles de zoom, giro, etc..)
  controls_orbit  = new OrbitControls(camera, // cria o controle passando a câmera
                        renderer.domElement); // domelement para escutar os eventos com mouse
         controls_orbit.enableDamping = true; // sensibilidade ao detectar o mouse arrastando
          controls_orbit.dampingFactor = 0.1; // regular o valor


// Controles GUI
var gui;
  gui = new GUI();
  gui.add(cilindro_cima.rotation, "y", 0, Math.PI * 2).name("Elo vertical");
  gui.add(retangulo_cima.rotation,"x", 0, Math.PI * 2).name("Elo horizontal");
  gui.add(cilindro_base.rotation, "y", 0, Math.PI * 2).name("Cilindro base");
  gui.add(plano.rotation,         "z", 0, Math.PI * 2).name("Plano base");
  gui.add(cilindro_menor.rotation,"y", 0, Math.PI * 2).name("Punho");
  gui.add(grupo.rotation,         'y', 0, Math.PI * 2).name("Total");

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












