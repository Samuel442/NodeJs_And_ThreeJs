import { OrbitControls } from "./OrbitControls.js"  // importando a biblioteca OrbitControls
import { RGBELoader } from "./RGBELoader.js";       // importando a biblioteca RGBELoader

function init()                            // função principal de início
{
// cria a cena
var scene = new THREE.Scene();              // cria o construtor da cena

// cria a câmera com perspectiva
var camera = new THREE.PerspectiveCamera(   // cria o construtor da camera
                                       100, // campo de visão da câmera
    window.innerWidth / window.innerHeight, // largura pela altura para  proporção da imagem
                                      0.01, // distancia mínima de visão plano de recorte mín
                                      1000  // distância máxima de visão plano de recorte máx
);

camera.position.set(15, 10, 25);
camera.lookAt(0, 0, 0);

// renderização
var renderer = new THREE.WebGLRenderer();                // cria o construtor de renderização
renderer.setSize(window.innerWidth, window.innerHeight); // seta a largura e altura
document.body.appendChild(renderer.domElement);          // adiciona um elemento dentro do corpo do documento html

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

// cor de fundo
scene.background = new THREE.Color(0xffffff); // construtor da cor de fundo da cena passando a cor

// luz que vai iluminar o ambiente
var luz_ambiente = new THREE.AmbientLight(0x404040, // cria o construtor da luz ambiente 
                                                 3);// intensidade da luz
scene.add(luz_ambiente);                            // adiciona a cena

// luz numa direção específica
var luz_direcional = new THREE.DirectionalLight(0xffffff, // cria o construtor da luz direcional
                                                      2); // intensidade da luz
scene.add(luz_direcional);                                // adiciona a cena


// OrbitControls (Parte dos controles de zoom, giro, etc..)
var controls = new OrbitControls(camera,  // cria um construtor passando a câmera para visualizar 
                    renderer.domElement); // domelement para escutar os eventos com mouse
controls.minDistance = 3;                 // distância mínima de aproximação caso de zoom 
controls.maxDistance = 20;                // distância máxima de aproximação caso de zoom 
controls.enableDamping = true;            // sensibilidade ao detectar o mouse arrastando
controls.dampingFactor = 0.8;             // regular o valor
// controls.screenSpacePanning = true;

    // responsividade da tela
    window.addEventListener('resize', onWindowResize, false);  // ouve eventos de alteração da dimensão da janela

    function onWindowResize(){                                 // função que processa eventos de alterações da tela
      camera.aspect = window.innerWidth / window.innerHeight;  // recebe a dimensão atual da janela
      camera.updateProjectionMatrix();                         // atualia a projeção da janela
      renderer.setSize(window.innerWidth, window.innerHeight); // altera as dimensoes da janela depois que alterou
    }

function animate(){                  // cria a função de animação
    requestAnimationFrame(animate);  // recursividde chamando animate dentro dela mesma por frames
    renderer.render(scene, camera);  // renderiza a cena e câmera
}
animate();                            // chama a funçao de animação
}

window.onload = init;                // qundo abre a janela chama a função init