import * as dat          from './dat.gui.module.js'; // Importando o módulo dat.GUI
import { GLTFLoader }    from './GLTFLoader.js';     // Importando o carregador GLTFLoader
import { OrbitControls } from './OrbitControls.js';  // Importando o controlador OrbitControls
import { RGBELoader }    from './RGBELoader.js';     // Importando o carregador RGBELoader

function init() {
  var scene = new THREE.Scene();            // Criando a cena
  var camera = new THREE.PerspectiveCamera( // Criando a câmera com projeção perspectiva
    75,                                     // Campo de visão vertical
    window.innerWidth / window.innerHeight, // Razão de aspecto
    0.1,                                    // Plano de recorte próximo
    1000                                    // Plano de recorte distante
  );

  camera.position.x = 10;  // Definindo a posição da câmera
  camera.position.y = -2;
  camera.position.z = 160;
  camera.lookAt(0, 0, 0);  // Definindo o ponto para o qual a câmera está olhando

  var renderer = new THREE.WebGLRenderer({ antialias: true }); // Criando o renderizador WebGL
  renderer.setSize(window.innerWidth, window.innerHeight);     // Definindo o tamanho de renderização
  renderer.shadowMap.enabled = true;                           // Habilitando o mapeamento de sombras
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;            // Definindo o tipo de mapeamento de sombras
  document.body.appendChild(renderer.domElement);              // Adicionando o elemento do renderizador ao documento HTML

  var axes = new THREE.AxesHelper(150); // Criando um objeto de ajuda visual com eixos
  scene.add(axes);                      // Adicionando os eixos à cena

  var luz_pontual = new THREE.PointLight(0xffffff, 1); // Criando uma luz pontual
  luz_pontual.position.set(0, 50, 0);                  // Definindo a posição da luz
  scene.add(luz_pontual);                              // Adicionando a luz à cena

  new RGBELoader().load('fundo.hdr', function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping; // Configurando o mapeamento da textura como reflexão equiretangular
    scene.background = texture;                               // Definindo a textura como plano de fundo da cena
    scene.environment = texture;                              // Definindo a textura como ambiente da cena
  });

  renderer.toneMapping = THREE.ACESFilmicToneMapping; // Configurando o mapeamento de tons
  renderer.toneMappingExposure = 1;                   // Configurando a exposição do mapeamento de tons
  renderer.outputEncoding = THREE.sRGBEncoding;       // Configurando a codificação de saída

  var carrega_gltf = new GLTFLoader(); // Criando o carregador GLTF
  var robo;
  var modeloGroup = new THREE.Group(); // Criando um grupo para o modelo
  scene.add(modeloGroup);              // Adicionando o grupo à cena

  carrega_gltf.load('scene.gltf', function (gltf) { // Carregando o modelo GLTF
    robo = gltf.scene;                              // Obtendo a cena do modelo carregado
    robo.position.x = 0;                            // Definindo a posição do modelo
    robo.position.y = 0;
    robo.position.z = 0;
    modeloGroup.add(robo);                           // Adicionando o modelo ao grupo

    console.log('Componentes do Robô:');
    logComponentNames(robo); // Imprimindo o nome dos componentes do modelo
  });

  function logComponentNames(object, parentName = '') {
    var objectName = parentName + object.name;
    console.log(objectName);                             // Imprimindo o nome do objeto/componente

    if (object.children.length > 0) {
      for (var i = 0; i < object.children.length; i++) {
        logComponentNames(object.children[i], objectName + '/'); // Chamada recursiva para imprimir os nomes dos filhos
      }
    }
  }

  var luz_ambiente = new THREE.AmbientLight(0xffffff, 0.5); // Criando uma luz ambiente
  scene.add(luz_ambiente);                                  // Adicionando a luz ambiente à cena

  var luz_direcional = new THREE.DirectionalLight(0xffffff, 0.5); // Criando uma luz direcional
  luz_direcional.position.set(10, 10, 10);       // Definindo a posição da luz
  luz_direcional.castShadow = true;              // Habilitando a projeção de sombras
  luz_direcional.shadow.mapSize.width = 2048;    // Definindo o tamanho do mapa de sombras
  luz_direcional.shadow.mapSize.height = 2048;
  luz_direcional.shadow.camera.near = 0.5;       // Definindo a distância mínima de projeção de sombras
  luz_direcional.shadow.camera.far = 500;        // Definindo a distância máxima de projeção de sombras
  scene.add(luz_direcional);                     // Adicionando a luz direcional à cena

  var controls = new OrbitControls(camera, renderer.domElement); // Criando o controlador de órbita
  controls.enableDamping = true;                                 // Habilitando amortecimento de rotação
  controls.dampingFactor = 0.1;                                  // Definindo o fator de amortecimento

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;  // Atualizando a relação de aspecto da câmera
    camera.updateProjectionMatrix();                         // Atualizando a matriz de projeção da câmera
    renderer.setSize(window.innerWidth, window.innerHeight); // Atualizando o tamanho de renderização
  }

  window.addEventListener('resize', onWindowResize, false); // Adicionando um ouvinte de redimensionamento da janela

  var clock = new THREE.Clock();                             // Criando um relógio
  var mixer;

  var gui = new dat.GUI();    // Criando a interface de usuário interativa

  var upperArmControls = {     // Controles para o braço superior
    rotationSpeed: 0.01,       // Velocidade de rotação
    maxRotation: Math.PI / 4,  // Rotação máxima permitida
    minRotation: -Math.PI / 2, // Rotação mínima permitida
  };

  var upperArmFolder = gui.addFolder('UpperArm'); // Criando uma pasta para os controles do braço superior
  upperArmFolder
    .add(upperArmControls, 'rotationSpeed', -0.1, 0.1, 0.01)
    .name('Rotation Speed'); // Adicionando um controle deslizante para a velocidade de rotação
  upperArmFolder.open();     // Abrindo a pasta inicialmente

  var foreArmControls = {      // Controles para o antebraço
    rotationSpeed: 0.01,       // Velocidade de rotação
    maxRotation: Math.PI / 4,  // Rotação máxima permitida
    minRotation: -Math.PI / 2, // Rotação mínima permitida
  };

  var foreArmFolder = gui.addFolder('ForeArm'); // Criando uma pasta para os controles do antebraço
  foreArmFolder
    .add(foreArmControls, 'rotationSpeed', -0.1, 0.1, 0.01)
    .name('Rotation Speed');  // Adicionando um controle deslizante para a velocidade de rotação
  foreArmFolder.open();       // Abrindo a pasta inicialmente

  var baseControls = {        // Controles para a base
    rotationSpeed: 0.01,      // Velocidade de rotação
  };

  var baseFolder = gui.addFolder('Base'); // Criando uma pasta para os controles da base
  baseFolder
    .add(baseControls, 'rotationSpeed', -0.1, 0.1, 0.01)
    .name('Rotation Speed');              // Adicionando um controle deslizante para a velocidade de rotação
  baseFolder.open();                      // Abrindo a pasta inicialmente

  function animate() {             // Função de animação
    requestAnimationFrame(animate);
    renderer.render(scene, camera); // Renderizando a cena com a câmera atual

    if (mixer) {
      mixer.update(clock.getDelta()); // Atualizando a animação do modelo
    }

    if (robo) {
      var upperArmComponent = robo.getObjectByName('UpperArm'); // Obtendo o componente do braço superior pelo nome
      if (upperArmComponent) {
        var newRotation = upperArmComponent.rotation.y + upperArmControls.rotationSpeed;
        if (
          newRotation >= upperArmControls.minRotation &&
          newRotation <= upperArmControls.maxRotation
        ) {
          upperArmComponent.rotation.y = newRotation; // Atualizando a rotação do componente do braço superior
        }
      }

      var foreArmComponent = robo.getObjectByName('ForeArm'); // Obtendo o componente do antebraço pelo nome
      if (foreArmComponent) {
        var newRotation = foreArmComponent.rotation.y + foreArmControls.rotationSpeed;
        if (
          newRotation >= foreArmControls.minRotation &&
          newRotation <= foreArmControls.maxRotation
        ) {
          foreArmComponent.rotation.y = newRotation; // Atualizando a rotação do componente do antebraço
        }
      }

      var baseComponent = robo.getObjectByName('Base'); // Obtendo o componente da base pelo nome
      if (baseComponent) {
        baseComponent.rotation.z += baseControls.rotationSpeed; // Atualizando a rotação do componente da base
      }
    }

    controls.update(); // Atualizando os controles de órbita
  }

  animate();           // Iniciando a animação
}

init(); // Chamando a função de inicialização para iniciar o aplicativo





