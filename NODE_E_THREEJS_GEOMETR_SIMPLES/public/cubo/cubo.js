// construtor da cena
const scene = new THREE.Scene();                // cria uma cena

// construtor da câmera
const camera = new THREE.PerspectiveCamera(75,  // parâmetros da câmera (75 = campo de visão,
  window.innerWidth / window.innerHeight,       // proporção da imagem dividindo a largura / altura,
  0.1,                                          // 0.1 = plano de recorte mínimo 
  1000);                                        // 1000 = mais distantes máximo






// renderização
const renderer = new THREE.WebGLRenderer();              // construtor da renderização criando um render
renderer.setSize(window.innerWidth, window.innerHeight); // seta a largura e altura
document.body.appendChild(renderer.domElement);          // adiciona um elemento dentro do corpo do documento html


// geometria do cubo
const geometry = new THREE.BoxGeometry(2, 2, 2);          // construtor de geometria do cubo


// material do cubo
const material = new THREE.MeshBasicMaterial({color: 0x00ff00,wireframe: true,}); // cria um material será a textura
const cube = new THREE.Mesh(geometry, material); // por fim é criado o cubo com a geometria e o material que é a textura
scene.add(cube);                                 // adiciona o cubo na cena


camera.position.z = 5;           // seta a posição da câmera em z = 5

    // responsividade da tela
    window.addEventListener('resize', onWindowResize, false);  // ouve eventos de alteração da dimensão da janela

    function onWindowResize(){                                 // função que processa eventos de alterações da tela
      camera.aspect = window.innerWidth / window.innerHeight;  // recebe a dimensão atual da janela
      camera.updateProjectionMatrix();                         // atualia a projeção da janela
      renderer.setSize(window.innerWidth, window.innerHeight); // altera as dimensoes da janela depois que alterou
    }

function animate() {              // cria uma função de animar a cena
  requestAnimationFrame(animate); // recursivamente a função fica em loop
  cube.rotation.x += 0.01;        // rotaciona o cubo em x nessa velocidade
  cube.rotation.y += 0.01;        // rotaciona o cubo em y nessa velocidade
  renderer.render(scene, camera); // renderiza a cena e a câmera exibindo o cubo
}
animate();                         // função é chamada
