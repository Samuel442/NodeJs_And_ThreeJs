function init(){

  // cena
  const scene = new THREE.Scene(); // cria uma cena

  // camera
  const camera = new THREE.PerspectiveCamera(
    60,                                     // parâmetros da câmera 75 = campo de visão
    window.innerWidth / window.innerHeight, // proporção da imagem dividindo a largura / altura,
    0.1,                                    // 0.1 = plano de recorte mínimo 
    1000                                    // 1000 = mais distantes máximo
  );
  // setando a posição da câmera
  camera.position.set(5, // a 5 unidades da origem em x
                      5, // a 5 unidades da origem em y
                      5); // a 5 unidades da origem em z
  camera.lookAt(scene.position); // camera olha para a posição da cena
  
  

  // renderização
  const renderer = new THREE.WebGLRenderer();              // usa renderização criando um render
  renderer.setSize(window.innerWidth, window.innerHeight); // seta o tamanho, largura e altura para proporção da tela
  renderer.setClearColor(0x5F5F5F,                         // cor clara de fundo
                                1);                        // corde fundo intensidade
  document.body.appendChild(renderer.domElement);          // adiciona um elemento dentro do corpo do documento html

  //--------------------------figuras-------------------------------
  // geometria do cubo-----------------------------------------------
  const geometryCube = new THREE.BoxGeometry(2, 2, 2); // geometria da caixa
  // material do cubo
  const materialCube = new THREE.MeshBasicMaterial({color: 0x00ff00, // cor do cubo
                                                  wireframe: true}); // textura de arame
  const cube = new THREE.Mesh(geometryCube, materialCube);           // por fim é criado o cubo com a geometria e o material que é a textura
  cube.position.set(-2,2,0)                                          // posição do cubo
  scene.add(cube);                                                   // adiciona o cubo na cena

  // geometria da esfera--------------------------------------------
  var sphereGeometry = new THREE.SphereGeometry(2,   // raio
                                                 20, // suavisação e arredodamento da esfera
                                                 20); // suavisação e arredodamento da esfera
var sphereMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff,   // cor da esfera
                                                  wireframe: true}); // material de arame
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);         // cria a malha da esfera passando a geometria e o material
sphere.position.set(1,2,-4);                                         // posição da esfera
scene.add(sphere);                                                   // adiciona a cena


// geometria de cone
const geometryCone = new THREE.ConeGeometry(1, 1, 40);
// por fim é criado o cone com a geometria e o material que é a textura
const materialCone = new THREE.MeshBasicMaterial({color: 0xff0000,
                                                  wireframe: true}); // cria um material será a textura
const cone = new THREE.Mesh(geometryCone, materialCone);             // cria a malha do cone passando a geometria e o material
cone.position.set(0,-2,5);                                           // posição do cone
scene.add(cone);                                                     // adiciona o cone na cena
  


// geometria de cilindro---------------------------------------------
const geometryCilindro = new THREE.CylinderGeometry(1,    // raio superior
                                                    1,    // raio inferior
                                                    5,    // altura
                                                    32);
// material do cilindro
const materialCilindro = new THREE.MeshBasicMaterial({color: 0x4B0082, // cor
                                                      wireframe: true, // estrutura da figura será em arame
                                                    });                            
const cilindro = new THREE.Mesh(geometryCilindro, materialCilindro);   // cria a malha do cone passando a geometria e o material
cilindro.position.set(-4,1,5);                                         // posição do cone
scene.add(cilindro);                                                   // adiciona o cone na cena


// geometria de capsula
const geometryCapsula = new THREE.CapsuleGeometry(1, 1, 4, 8);
// material da cápsula
const materialCapsula = new THREE.MeshBasicMaterial({         // textura
                                             color: 0x000000, // cor
                                             wireframe: true, // estrutura da figura será em arame
                                            });               // cria um material será a textura
const capsula = new THREE.Mesh(geometryCapsula, materialCapsula); // por fim é criado o capsula com a geometria e o material que é a textura
capsula.position.set(-10,-7,9);  
scene.add(capsula);                                           // adiciona o capsula na cena

//posição da câmera
camera.position.z = 10; // seta a posição da câmera em z = 10

  // Controle da velocidade de rotação na tela
  var controls = new function(){  // variável de controle recebe a função
    this.rotationSpeed = 0.2;     // velocidade que inicia 
  }

  // faz parte do rotation speed
  var gui = new dat.GUI(     // criaum objeto de interface grágica
    {autoplace: false,       // garante uma posição física não está sendo usado
      width: 600}            // largura
  );
  gui.add(controls,  // função
    'rotationSpeed', // começa com velocidade de 0.2
    0, 0.5);         // velocidade máxima e mínima de rotação

    // responsividade da tela
    window.addEventListener('resize', onWindowResize, false);  // ouve eventos de alteração da dimensão da janela

    function onWindowResize(){                                 // função que processa eventos de alterações da tela
      camera.aspect = window.innerWidth / window.innerHeight;  // recebe a dimensão atual da janela
      camera.updateProjectionMatrix();                         // atualia a projeção da janela
      renderer.setSize(window.innerWidth, window.innerHeight); // altera as dimensoes da janela depois que alterou
    }

// função de loop de animação
  function animate() {                // cria uma função de animar a cena
    requestAnimationFrame(animate);   // recursivamente a função fica em loop
    // cubo
    cube.rotation.x += controls.rotationSpeed;     // rotaciona o cubo em x nessa velocidade
    cube.rotation.y += controls.rotationSpeed;     // rotaciona o cubo em y nessa velocidade
    // cone
    cone.rotation.x += controls.rotationSpeed;     // rotaciona o cone em x nessa velocidade
    cone.rotation.y += controls.rotationSpeed;     // rotaciona o cone em y nessa velocidade
    // esfera
    sphere.rotation.x += controls.rotationSpeed;   // rotaciona a esfera em x nessa velocidade
    sphere.rotation.y += controls.rotationSpeed;   // rotaciona a esfera em y nessa velocidade
    // cilindro
    cilindro.rotation.x += controls.rotationSpeed; // rotaciona o cilindro em x nessa velocidade
    cilindro.rotation.y += controls.rotationSpeed; // rotaciona o cilindro em y nessa velocidade
    // capsula
    capsula.rotation.x += controls.rotationSpeed;  // rotaciona o cilindro em x nessa velocidade
    capsula.rotation.y += controls.rotationSpeed;  // rotaciona o cilindro em y nessa velocidade


    renderer.render(scene, camera); // renderiza a cena e a câmera 
    }
  animate();                        // função é chamada
  }

window.onload = init;               // assim que carrega a janela executa a init