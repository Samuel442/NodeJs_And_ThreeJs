import { GUI } from "./dat.gui.module.js";
import { OrbitControls } from "./OrbitControls.js";

// cria a cena
var scene;
function init_scene()
{
  scene = new THREE.Scene();
}

// Cria acamera
var camera;
function init_camera()
{
  camera = new THREE.PerspectiveCamera(75, 
   window.innerWidth / window.innerHeight, 
                                      0.1, 
                                    1000);
             camera.position.set(0, 0, 5);
}

// Cria a renderização
var renderer;
function init_renderizacao()
{
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
}


//criação das figuras geométricas de forma individual
var retangulo_menor;
var retangulo_cima;
var retangulo_baixo;
var cilindro_base;
var plano;
function cria_figuras_individuais()
{
  // retangulo menor
  var geometria_retangulo_menor = new THREE.BoxGeometry(0.3, 1, 0.2);
  var material_retangulo_menor = new THREE.MeshBasicMaterial({ color: 0xfffff0, wireframe:true });
  retangulo_menor = new THREE.Mesh(geometria_retangulo_menor, material_retangulo_menor);
  retangulo_menor.position.set(1.3, 0.2, 0);
  scene.add(retangulo_menor);

  // retangulo de cima
  var geometria_retangulo_cima = new THREE.BoxGeometry(0.4, 2, 0.3);
  var material_retangulo_cima = new THREE.MeshBasicMaterial({ color: 0xfff000, wireframe:true });
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
  scene.add(retangulo_cima);

  // retangulo de baixo
  var geometria_retangulo_baixo = new THREE.BoxGeometry(0.4, 2, 0.3);
  var material_retangulo_baixo = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe:true });
  retangulo_baixo = new THREE.Mesh(geometria_retangulo_baixo, material_retangulo_baixo);
  retangulo_baixo.position.set(-0.5, 0.1, 0);
  scene.add(retangulo_baixo);

  // cilindro
  var geometria_cilindro_base = new THREE.CylinderGeometry(0.3, 0.3, 2, 32);
  var material_cilindro_base = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe:true });
  cilindro_base = new THREE.Mesh(geometria_cilindro_base, material_cilindro_base);
  cilindro_base.position.set(-0.5, -1.86, 0);
  scene.add(cilindro_base);

  // plano
  var geometria_plano_base = new THREE.PlaneGeometry(1, 2);
  var material_plano_base = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  plano = new THREE.Mesh(geometria_plano_base, material_plano_base);
  plano.position.set(-0.5, -2.86, 0);
  plano.rotation.x = -Math.PI / 2; 
  scene.add(plano); 
}

  //cria um grupo que rotaciona o robô por inteiro
  const robo_completo = new THREE.Group();
  //cria um grupo que rotaciona o braço vertical horizontal e bico
  const robo_horizontal_vertical_bico = new THREE.Group();
  //cria um grupo que rotaciona braço horizontal e bico
  const robo_horizontal_bico = new THREE.Group();

function move_robo_completo()
{
    // retangulo menor
    var geometria_retangulo_menor = new THREE.BoxGeometry(0.3, 1, 0.2);
    var material_retangulo_menor = new THREE.MeshBasicMaterial({ color: 0xfffff0, wireframe:true });
    retangulo_menor = new THREE.Mesh(geometria_retangulo_menor, material_retangulo_menor);
    retangulo_menor.position.set(1.3, 0.2, 0);
  
    // retangulo de cima
    var geometria_retangulo_cima = new THREE.BoxGeometry(0.4, 2, 0.3);
    var material_retangulo_cima = new THREE.MeshBasicMaterial({ color: 0xfff000, wireframe:true });
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
    var geometria_retangulo_baixo = new THREE.BoxGeometry(0.4, 2, 0.3);
    var material_retangulo_baixo = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe:true });
    retangulo_baixo = new THREE.Mesh(geometria_retangulo_baixo, material_retangulo_baixo);
    retangulo_baixo.position.set(-0.5, 0.1, 0);
  
    // cilindro
    var geometria_cilindro_base = new THREE.CylinderGeometry(0.3, 0.3, 2, 32);
    var material_cilindro_base = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe:true });
    cilindro_base = new THREE.Mesh(geometria_cilindro_base, material_cilindro_base);
    cilindro_base.position.set(-0.5, -1.86, 0);
  
    // plano
    var geometria_plano_base = new THREE.PlaneGeometry(1, 2);
    var material_plano_base = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    plano = new THREE.Mesh(geometria_plano_base, material_plano_base);
    plano.position.set(-0.5, -2.86, 0);
    plano.rotation.x = -Math.PI / 2; 

    robo_completo.add(retangulo_menor, retangulo_cima, retangulo_baixo, cilindro_base, plano);
    scene.add(robo_completo);
    //robo_horizontal_vertical_bico.add(retangulo_menor, retangulo_cima, retangulo_baixo);
    //scene.add(robo_horizontal_vertical_bico);
    //robo_horizontal_bico.add(retangulo_menor, retangulo_cima);
    //scene.add(robo_horizontal_bico);
}


// controles de órbita
var controls_orbit;
function controles()
{
  // OrbitControls (Parte dos controles de zoom, giro, etc..)
  controls_orbit  = new OrbitControls(camera, // cria um construtor passando a câmera para visualizar
  renderer.domElement);                       // domelement para escutar os eventos com mouse
  controls_orbit.enableDamping = true;        // sensibilidade ao detectar o mouse arrastando
  controls_orbit.dampingFactor = 0.1;         // regular o valor
}


// Controles GUI
var gui;
function controles_gui()
{
  gui = new GUI();
  gui.add(retangulo_baixo.rotation, "y", 0, Math.PI * 2).name("Braço vertical");
  gui.add(retangulo_cima.rotation, "x", 0, Math.PI * 2).name("Braço horizontal");
  gui.add(cilindro_base.rotation, "y", 0, Math.PI * 2).name("Cilindro base");
  gui.add(plano.rotation, "z", 0, Math.PI * 2).name("Plano base");
  gui.add(retangulo_menor.rotation, "y", 0, Math.PI * 2).name("Bico");
  gui.add(robo_completo.rotation, "y", 0, Math.PI * 2).name("Robô completo");
  //gui.add(robo_horizontal_vertical_bico.rotation, "y", 0, Math.PI * 2).name("Braço vertical");
  //gui.add(robo_horizontal_bico.rotation, "z", 0, Math.PI * 2).name("Braço horizontal e bico");
}


// Render the scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init_scene();
init_camera();
init_renderizacao();
//cria_figuras_individuais();
move_robo_completo();
controles();
controles_gui();
animate();




/*
var robo = {
  "retangulo_cima" :
  {
      "position" : new THREE.Vector3(-0.5, 2.4, 0),
      "rotAxis"  : "x",
      "material" : new THREE.MeshBasicMaterial({ color: 0xfff000 }),
      "rotation" : { setpoint: 0.0, feedback: 0.0, min: -170.0, max: 170.0, speed: 97.5 },
      "rotation" : { setpoint: 0.0, feedback: 0.0, min: -90.0, max: 65.0, speed: 89.0 },
      "addAxis"  : true,
  },
  "retangulo_baixo" :
  {
      "position" : new THREE.Vector3(-0.5, 0.3, 0),
      "rotAxis"  : "y",
      "material" : new THREE.MeshBasicMaterial({ color: 0xffffff }),
      "rotation" : { setpoint: 0.0, feedback: 0.0, min: -170.0, max: 170.0, speed: 97.5 },
      "rotation" : { setpoint: 0.0, feedback: 0.0, min: -90.0, max: 65.0, speed: 89.0 },
      "addAxis"  : true,
  },
  "cilindro" :
  {
      "position" : new THREE.Vector3(-0.5, -1.86, 0),
      "rotAxis"  : "z",
      "material" : new THREE.MeshBasicMaterial({ color: 0xff0000 }),
      "rotation" : { setpoint: 0.0, feedback: 0.0, min: -90.0, max: 65.0, speed: 89.0 },
      "addAxis"  : true,
  },
  "plano" :
  {
      "position" : new THREE.Vector3(-0.5, -3, 0),
      "rotAxis"  : "z",
      "material" : new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
      "rotation" : { setpoint: 0.0, feedback: 0.0, min: -90.0, max: 65.0, speed: 89.0 },
      "addAxis"  : true,
  },
};

var partes_moveis = ["retangulo_cima", "retangulo_baixo", "Arm", "cilindro", "plano" ];
*/












































