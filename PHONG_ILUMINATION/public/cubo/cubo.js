var scene;
function init_scene()
{
// construtor da cena
scene = new THREE.Scene();                // cria uma cena
}

var camera;
function init_camera()
{
  // construtor da câmera
camera = new THREE.PerspectiveCamera(75,  // parâmetros da câmera (75 = campo de visão,
window.innerWidth / window.innerHeight,   // proporção da imagem dividindo a largura / altura,
                                   0.1,   // 0.1 = plano de recorte mínimo 
                                 1000);   // 1000 = mais distantes máximo
camera.position.z = 5;                    // seta a posição da câmera em z = 5
}

var renderer;
function init_renderer()
{
    // renderização
    renderer = new THREE.WebGLRenderer({antialias: true}); // construtor da renderização criando um render
    renderer.setPixelRatio(window.devicePixelRatio);       //seta razão de pixel, usualmente definido pra prevenir borramento
    renderer.setSize(window.innerWidth, window.innerHeight); // seta a largura e altura
    document.body.appendChild(renderer.domElement);          // adiciona um elemento dentro do corpo do documento html
}

var esfera;
function esfera_sem_textura()
{
// geometria da esfera
var geometria = new THREE.SphereGeometry( 1, 64, 64);       // construtor de geometria do cubo

// material da esfera
var material = new THREE.MeshBasicMaterial({color: 0x696969, 
                                         wireframe: false}); // cria um material será a textura
esfera = new THREE.Mesh(geometria, material);                   // por fim é criado o cubo com a geometria e o material que é a textura
scene.add(esfera);                                              // adiciona o cubo na cena
esfera.position.set(0,0,0);
}

function add_phong_esfera_cena()
{
  var luz_direcional = new THREE.DirectionalLight(0xffffff);
			luz_direcional.position.set(1, 0, 0).normalize();
			scene.add(luz_direcional);

	var geometria = new THREE.SphereBufferGeometry(100, 32, 32);
	var material = new THREE.MeshPhongMaterial( {color: 0xffffff} );
	const		esfera = new THREE.Mesh(geometria, material);
			scene.add(esfera);
}

var axis;
function add_eixo_cena()
{
  axis = new THREE.AxesHelper(200);
  scene.add(axis);
}

function responsividade()
{
      // responsividade da tela
      window.addEventListener('resize', onWindowResize, false);  // ouve eventos de alteração da dimensão da janela

      function onWindowResize(){                                 // função que processa eventos de alterações da tela
        camera.aspect = window.innerWidth / window.innerHeight;  // recebe a dimensão atual da janela
        camera.updateProjectionMatrix();                         // atualia a projeção da janela
        renderer.setSize(window.innerWidth, window.innerHeight); // altera as dimensoes da janela depois que alterou
      }
}

function render()
{
requestAnimationFrame(render);     // recursivamente a função fica em loop
esfera.rotation.x += 0.01;        // rotaciona o cubo em x nessa velocidade
esfera.rotation.y += 0.01;        // rotaciona o cubo em y nessa velocidade
renderer.render(scene, camera); // renderiza a cena e a câmera exibindo o cubo
}

init_scene();
init_camera();
init_renderer();
esfera_sem_textura();
add_phong_esfera_cena();
add_eixo_cena();
responsividade();
render();
