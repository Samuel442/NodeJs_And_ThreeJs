import * as dat       from './dat.gui.module.js';
import { GLTFLoader } from './GLTFLoader.js';
import { OrbitControls } from './OrbitControls.js';
import { RGBELoader } from './RGBELoader.js';

function init() {
  // Cria a cena, a câmera e o renderizador
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );

  // Define a posição da câmera
  camera.position.x = 10;
  camera.position.y = -2;
  camera.position.z = 160;
  camera.lookAt(0, 0, 0);

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Adiciona um conjunto de eixos à cena para referência visual
  var axes = new THREE.AxesHelper(150);
  scene.add(axes);

  // Carrega o mapa de ambiente para iluminação
  new RGBELoader().load('fundo.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  });

  // Configura o renderizador
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;

  // Carrega o modelo GLTF do robô
  var carrega_gltf = new GLTFLoader();
  var robo;
  var modeloGroup = new THREE.Group();
  scene.add(modeloGroup);

  carrega_gltf.load('scene.gltf', function (gltf) {
    robo = gltf.scene;
    modeloGroup.add(robo);

    // Imprime os nomes dos componentes do robô no console
    console.log('Componentes do Robô:');
    logComponentNames(robo);
  });

  // Função para imprimir os nomes dos componentes do robô
  function logComponentNames(object, parentName = '') {
    var objectName = parentName + object.name;
    console.log(objectName);

    if (object.children.length > 0) {
      for (var i = 0; i < object.children.length; i++) {
        logComponentNames(object.children[i], objectName + '/');
      }
    }
  }

  // Configura a iluminação ambiente e a luz direcional
  scene.background = new THREE.Color(0xffffff);
  var luz_ambiente = new THREE.AmbientLight(0xffffff, 1);
  scene.add(luz_ambiente);
  var luz_direcional = new THREE.DirectionalLight(0xffffff, 1);
  scene.add(luz_direcional);

  // Cria controles de órbita para interação com a cena
  var controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.1;

  // Função chamada quando a janela é redimensionada
  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.addEventListener('resize', onWindowResize, false);

  var clock = new THREE.Clock();
  var mixer;

  // Cria uma instância do GUI do dat.GUI
  var gui = new dat.GUI();

  // Define os controles para o componente 'UpperArm'
  var upperArmControls = {
    rotationSpeed: 0.01,
    maxRotation: Math.PI / 4, // Definir o limite máximo de rotação do UpperArm
    minRotation: -Math.PI / 2, // Definir o limite mínimo de rotação do UpperArm
  };

  var upperArmFolder = gui.addFolder('UpperArm');
  upperArmFolder
    .add(upperArmControls, 'rotationSpeed', -0.1, 0.1, 0.01)
    .name('Rotation Speed');
  upperArmFolder.open();

  // Define os controles para o componente 'ForeArm'
  var foreArmControls = {
    rotationSpeed: 0.01,
    maxRotation: Math.PI / 4, // Definir o limite máximo de rotação do ForeArm
    minRotation: -Math.PI / 2, // Definir o limite mínimo de rotação do ForeArm
  };

  var foreArmFolder = gui.addFolder('ForeArm');
  foreArmFolder
    .add(foreArmControls, 'rotationSpeed', -0.1, 0.1, 0.01)
    .name('Rotation Speed');
  foreArmFolder.open();

  // Define os controles para o componente 'Base'
  var baseControls = {
    rotationSpeedClockwise: 0.1, // Defina o valor máximo como 0.1 (antes era 0)
    rotationSpeedCounterclockwise: -0.1, // Defina o valor mínimo como -0.1 (antes era -0.1)
  };

  var baseFolder = gui.addFolder('Base');
  baseFolder
    .add(baseControls, 'rotationSpeedClockwise', -0.1, 0.1, 0.01)
    .name('Rotation Speed Clockwise');
  baseFolder
    .add(baseControls, 'rotationSpeedCounterclockwise', -0.1, 0.1, 0.01)
    .name('Rotation Speed Counterclockwise');
  baseFolder.open();

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    if (mixer) {
      mixer.update(clock.getDelta());
    }

    // Rotação do componente 'UpperArm'
    if (robo) {
      var upperArmComponent = robo.getObjectByName('UpperArm');
      if (upperArmComponent) {
        var newRotation = upperArmComponent.rotation.y + upperArmControls.rotationSpeed;
        if (
          newRotation >= upperArmControls.minRotation &&
          newRotation <= upperArmControls.maxRotation
        ) {
          upperArmComponent.rotation.y = newRotation;
        }
      }
    }

    // Rotação do componente 'ForeArm'
    if (robo) {
      var foreArmComponent = robo.getObjectByName('ForeArm');
      if (foreArmComponent) {
        var newRotation = foreArmComponent.rotation.y + foreArmControls.rotationSpeed;
        if (
          newRotation >= foreArmControls.minRotation &&
          newRotation <= foreArmControls.maxRotation
        ) {
          foreArmComponent.rotation.y = newRotation;
        }
      }
    }

    // Rotação do componente 'Base' (sentido horário)
    if (robo) {
      var baseComponent = robo.getObjectByName('Base');
      if (baseComponent) {
        baseComponent.rotation.z += baseControls.rotationSpeedClockwise;
      }
    }

    // Rotação do componente 'Base' (sentido anti-horário)
    if (robo) {
      var baseComponent = robo.getObjectByName('Base');
      if (baseComponent) {
        baseComponent.rotation.z += baseControls.rotationSpeedCounterclockwise;
      }
    }

    controls.update();
  }

  animate();
}

init();


