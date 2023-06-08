import { GLTFLoader } from "./GLTFLoader.js";
import { OrbitControls } from "./OrbitControls.js";
import { RGBELoader } from "./RGBELoader.js";

function init() {
  // cria a cena
  var scene = new THREE.Scene();

  //cria a câmera
  var camera = new THREE.PerspectiveCamera(
    100,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  camera.lookAt(0, 0, 0);
  camera.position.x = 10;
  camera.position.y = -2;
  camera.position.z = 160;

  // renderização
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // eixos
  var axes = new THREE.AxesHelper(150);
  scene.add(axes);

  // carregamento imagem de fundo
  new RGBELoader().load("fundo.hdr", function (texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.background = texture;
    scene.environment = texture;
  });
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.outputEncoding = THREE.sRGBEncoding;

  // carregamento do gltf
  var carrega_gltf = new GLTFLoader();
  var robo;

  carrega_gltf.load("scene.gltf", function (gltf) {
    const robo = gltf.scene;
    scene.add(robo);

    // Get the animations from the glTF file
    var animations = gltf.animations;

    // Create a mixer to play the animations
    var mixer = new THREE.AnimationMixer(robo);

    // Loop through each animation and add it to the mixer
    for (var i = 0; i < animations.length; i++) {
      var animation = animations[i];
      var action = mixer.clipAction(animation);
      action.play();
    }

    // cor de fundo
    scene.background = new THREE.Color(0xffffff);

    // luz que vai iluminar o ambiente
    var luz_ambiente = new THREE.AmbientLight(0xffffff, 1);
    scene.add(luz_ambiente);

    // luz numa direção específica
    var luz_direcional = new THREE.DirectionalLight(0xffffff, 1);
    scene.add(luz_direcional);

    // OrbitControls
    var controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // responsividade da tela
    window.addEventListener(
      "resize",
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      },
      false
    );

    // Start the animation loop
    var clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);

      if (mixer) {
        mixer.update(clock.getDelta());
      }
    }

    animate();
  });
}

window.onload = init;
