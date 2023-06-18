import * as dat          from './dat.gui.module.js';// Importando o módulo dat.GUI
import { GLTFLoader }    from './GLTFLoader.js';    // Importando o carregador GLTFLoader
import { OrbitControls } from './OrbitControls.js'; // Importando o controlador OrbitControls
import { RGBELoader }    from './RGBELoader.js';    // Importando o carregador RGBELoader

function init() {
  var scene = new THREE.Scene();            // Criando a cena
  var camera = new THREE.PerspectiveCamera( // Criando a câmera com projeção perspectiva
    75,                                     // Campo de visão vertical
    window.innerWidth / window.innerHeight, // Razão de aspecto
    0.1,                                    // Plano de recorte próximo
    1000                                    // Plano de recorte distante
  );

  camera.position.x = 10;  // Definindo a posição da câmera em x
  camera.position.y = -2;  // Definindo a posição da câmera em y
  camera.position.z = 160; // Definindo a posição da câmera em z
  camera.lookAt(0, 0, 0);  // Definindo o ponto para o qual a câmera está olhando

  var renderer = new THREE.WebGLRenderer({ antialias: true }); // Criando o renderizador WebGL
  renderer.setSize(window.innerWidth, window.innerHeight);     // Definindo o tamanho de renderização
  renderer.shadowMap.enabled = true;                           // Habilitando o mapeamento de sombras
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;            // Definindo o tipo de mapeamento de sombras
  document.body.appendChild(renderer.domElement);              // Adicionando o elemento do renderizador ao documento HTML

  var axes = new THREE.AxesHelper(150); // Criando um objeto de ajuda visual com eixos
  scene.add(axes);                      // Adicionando os eixos à cena

  var luz_pontual = new THREE.PointLight(0xffffff, // Criando uma luz pontual coma a cor 0xffffff
                                                1);// intensidade 1
  luz_pontual.position.set(0, // Definindo a posição da luz em x
                          50, // Definindo a posição da luz em y
                          0); // Definindo a posição da luz em z
  scene.add(luz_pontual);     // Adicionando a luz à cena

  new RGBELoader().load('fundo.hdr', function (texture) {     // criando uma instância do carregador RGBELoader
    texture.mapping = THREE.EquirectangularReflectionMapping; // Configurando o mapeamento da textura como reflexão equiretangular
    scene.background = texture;                               // Definindo a textura como plano de fundo da cena
    scene.environment = texture;                              // Definindo a textura como ambiente da cena
  });

  renderer.toneMapping = THREE.ACESFilmicToneMapping; // Mapeamento de tons
  renderer.toneMappingExposure = 1;                   // Exposição do mapeamento de tons
  renderer.outputEncoding = THREE.sRGBEncoding;       // Codificação de saída sRGBEncoding

  var carrega_gltf = new GLTFLoader(); // Criando o carregador GLTF
  var robo;                            // cria o robo
  var modeloGroup = new THREE.Group(); // Criando um grupo para o modelo
  scene.add(modeloGroup);              // Adicionando o grupo à cena

  carrega_gltf.load('scene.gltf', function (gltf) { // Carregando o modelo GLTF
    robo = gltf.scene;                              // Obtendo a cena do modelo carregado
    robo.position.x = 0;                            // Definindo a posição do modelo em x
    robo.position.y = 0;                            // Definindo a posição do modelo em y
    robo.position.z = 0;                            // Definindo a posição do modelo em z
    modeloGroup.add(robo);                          // Adicionando o modelo ao grupo

    console.log('Componentes do Robô:'); // imprime no console
    logComponentNames(robo);             // cria a função logComponentNames passa o robo 
  });                                    // e imprime o nome dos componentes do modelo

  // função para imprimir os nomes dos componentes de um objeto em uma estrutura hierárquica.
  function logComponentNames(object, parentName = '') {  // cria a logComponentNames recebe dois parâmetros: object e parentName como vazio
    var objectName = parentName + object.name; // cria o objectName que armazena a concatenação do nome do objeto atual (object.name) com o nome do pai (parentName).
    console.log(objectName);                   // Imprimindo o nome do objeto/componente
    if (object.children.length > 0) {   // verifica  se há outros objetos aninhados dentro do objeto atual
      for (var i = 0; i < object.children.length; i++) { // percorre os objetos filhos de um determinado objeto
        logComponentNames(object.children[i], objectName + '/'); // Chamada recursiva para imprimir os nomes dos filhos
      }  // fim do for
    }    // fim do if
  }      // fim da função logComponentNames

  var luz_ambiente = new THREE.AmbientLight(0xffffff, 0.5); // Criando uma luz ambiente
  scene.add(luz_ambiente);                                  // Adicionando a luz ambiente à cena

  var luz_direcional = new THREE.DirectionalLight(0xffffff, 0.5); // Criando uma luz direcional
  luz_direcional.position.set(10, 10, 10);                        // Definindo a posição da luz
  luz_direcional.castShadow = true;                               // Habilitando a projeção de sombras
  luz_direcional.shadow.mapSize.width = 2048;                     // Definindo o tamanho do mapa de sombras
  luz_direcional.shadow.mapSize.height = 2048;
  luz_direcional.shadow.camera.near = 0.5;     // Definindo a distância mínima de projeção de sombras
  luz_direcional.shadow.camera.far = 500;      // Definindo a distância máxima de projeção de sombras
  scene.add(luz_direcional);                   // Adicionando a luz direcional à cena

  var controls = new OrbitControls(camera, renderer.domElement); // Criando o controlador de órbita
  controls.enableDamping = true;       // amortecimento para a rotação da câmera
  controls.dampingFactor = 0.1;        // Definindo o fator de amortecimento

  function onWindowResize() {                               // responsividade da tela
    camera.aspect = window.innerWidth / window.innerHeight; // Atualizando a relação de aspecto da câmera
    camera.updateProjectionMatrix();                        // Atualizando a matriz de projeção da câmera
    renderer.setSize(window.innerWidth, window.innerHeight);// Atualizando o tamanho de renderização
  }
  window.addEventListener('resize', onWindowResize, false); // Adicionando um ouvinte de redimensionamento da janela

  var clock = new THREE.Clock(); // Criando um relógio para o tempo decorrido em uma animação
  var mixer;                     // variável usada posteriormente para armazenar uma instância do objeto AnimationMixer

  var gui = new dat.GUI(); // Criando a interface de usuário interativa

  // setup braço superior (menor)
  var upperArmControls = {     // Controles para o braço superior
    rotationSpeed: 0.01,       // Velocidade de rotação
    maxRotation: Math.PI / 4,  // define um limite de rotação de 45 graus no sentido positivo
    minRotation: -Math.PI / 2, // define um limite de rotação de -90 graus no sentido negativo
  };
  var upperArmFolder = gui.addFolder('UpperArm'); // Criando uma pasta para os controles do braço superior
  upperArmFolder                                  // referência da pasta
    .add(upperArmControls, 'rotationSpeed', -0.1, // cria a barra de controle e add a pasta, -0,1 inicio do intervalo 
                                             0.1, // incremento da velocidade
                                             0.01)// limite do intervalo da velocidade
    .name('vel rotação'); // Adicionando barra de controle para a velocidade de rotação
  upperArmFolder.open();  // Abrindo a pasta inicialmente

  // setup braço inferior (maior)
  var foreArmControls = {      // Controles para o antebraço
    rotationSpeed: 0.01,       // Velocidade de rotação
    maxRotation: Math.PI / 4,  // define um limite de rotação de 45 graus no sentido positivo
    minRotation: -Math.PI / 2, // define um limite de rotação de -90 graus no sentido negativo
  };

  var foreArmFolder = gui.addFolder('ForeArm'); // Criando uma pasta para os controles do braço inferior
  foreArmFolder                                 // referência da pasta
    .add(foreArmControls, 'rotationSpeed', -0.1,// cria a barra de controle e add a pasta, -0,1 inicio do intervalo 
                                            0.1,// incremento da velocidade 
                                            0.01)// limite do intervalo da velocidade
    .name('vel rotação'); // barra de controle para a velocidade de rotação
  foreArmFolder.open();   // Abrindo a pasta inicialmente

  // setup da base do robo
  var baseControls = {   // Controles para a base
    rotationSpeed: 0.01, // Velocidade de rotação
  };
  var baseFolder = gui.addFolder('Base');     // Criando uma pasta para os controles da base
  baseFolder                                  // referência da pasta da base
    .add(baseControls, 'rotationSpeed', -0.1, // cria a barra de controle e add a pasta, -0,1 inicio do intervalo
                                         0.1, // incremento da velocidade 
                                        0.01) // limite do intervalo da velocidade
    .name('vel rotação'); // Adicionando um controle deslizante para a velocidade de rotação
  baseFolder.open();      // Abrindo a pasta inicialmente

  // função de animação
  function animate() {              // Função de animação
    requestAnimationFrame(animate); // solicitar ao navegador que chame a função animate antes do quadro de animação
    renderer.render(scene, camera); // Renderizando a cena com a câmera atual

    if (mixer) {                      // verifica se existe a variável mixer, sim ela existe
      mixer.update(clock.getDelta()); // Atualizando a animação do modelo
    }

    /*
    A chamada clock.getDelta() retorna a diferença de tempo (em segundos) entre o quadro atual 
    e o quadro anterior, fornecendo uma unidade de medida para a atualização da animação. O método
    getDelta() é chamado em um objeto THREE.Clock, que é usado para rastrear o tempo decorrido.
    */

    // parte 
    if (robo) // verifica se a variável robo existe, sim ela existe
    { 
      // ################################### braço inferior ###################################
      var upperArmComponent = robo.getObjectByName('UpperArm'); // Procura o componente do braço superior pelo nome armazena em upperArmComponent
      if (upperArmComponent) // verifica se a variável upperArmComponent se o componente do braço superior foi encontrado
      {
        /* Aqui, é calculada a nova rotação do componente do braço superior.
           A rotação atual (rotation.y) do componente é somada à velocidade de rotação (rotationSpeed) 
           definida no objeto upperArmControls.
          O resultado é armazenado na variável newRotation.   
        */
        var newRotation = upperArmComponent.rotation.y + upperArmControls.rotationSpeed;
        // o if abaixo verifica se a velocidade está nos limites impostos em minRotation e maxRotation
        if (newRotation >= upperArmControls.minRotation && newRotation <= upperArmControls.maxRotation) 
        {
          upperArmComponent.rotation.y = newRotation; // Atualizando a rotação do componente do braço superior
        }
      }

      // ################################### braço superior ###################################
      var foreArmComponent = robo.getObjectByName('ForeArm'); // Obtendo o componente do antebraço pelo nome
      if (foreArmComponent) 
      {
        var newRotation = foreArmComponent.rotation.y + foreArmControls.rotationSpeed;
        if (newRotation >= foreArmControls.minRotation && newRotation <= foreArmControls.maxRotation) 
        {
          foreArmComponent.rotation.y = newRotation; // Atualizando a rotação do componente do antebraço
        }
      }

      // ################################### base ###################################
      var baseComponent = robo.getObjectByName('Base'); // Obtendo o componente da base pelo nome
      if (baseComponent) {
        baseComponent.rotation.z += baseControls.rotationSpeed; // Atualizando a rotação do componente da base
      }
    } // fim do if que verifica se exixte o robô

    controls.update(); // Atualizando os controles de órbita
  }                    // fim da função animate

  animate(); // Iniciando a animação
}            // fim da função init

init();      // Chamando a função de inicialização para iniciar o aplicativo




