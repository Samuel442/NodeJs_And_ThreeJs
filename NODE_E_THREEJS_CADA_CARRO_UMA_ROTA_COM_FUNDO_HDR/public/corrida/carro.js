import { GLTFLoader } from "./GLTFLoader.js";       // importando a biblioteca GLTFLoader
import { RGBELoader } from "./RGBELoader.js";       // importando a biblioteca RGBELoader
import { OrbitControls } from "./OrbitControls.js"  // importando a biblioteca OrbitControls

function init()                            // função de início
{

// cria a cena
var scene = new THREE.Scene();             // cria o construtor da cena

// cria a câmera com perspectiva
var camera = new THREE.PerspectiveCamera(   // cria o construtor da camera
    100,                                     // campo de visão da câmera
    window.innerWidth / window.innerHeight, // largura pela altura para proporção da imagem
    0.01,                                   // distancia mínima de visão plano de recorte min
    1000                                    // distância máxima de visão plano de recorte max
);

// posicionamento da câmera
camera.position.x = 0;    // na origem em x
camera.position.y = -0.2; // câmera distante 1 unidade de y
camera.position.z = 10;   // câmera distante 10 unidade de y

// renderização
var renderer = new THREE.WebGLRenderer();               // cria o construtor de renderização
renderer.setSize(window.innerWidth, window.innerHeight);// seta a largura e altura
document.body.appendChild(renderer.domElement);         // linka com o corpo do index do html

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

var loader = new GLTFLoader();  // construtor para o carregamento do gltf
var carro;                      // variável para receber a cena gltf

loader.load("scene.gltf", function(gltf){ // carrega o arquivo gltf passando a função com argumento objeto gltf
    carro = gltf.scene;                   // objeto recebe a cena
    scene.add(gltf.scene);                // adiciona o gltf a cena
});

// cor de fundo
scene.background = new THREE.Color(0xB0E0E6); // construtor da cor de fundo da cena

// luz que vai iluminar o ambiente
var luz_ambiente = new THREE.AmbientLight(0x404040, // cor 
                                               25); // intensidade da luz
scene.add(luz_ambiente);                            // adiciona a cena

// luz numa direção específica
var luz_direcional = new THREE.DirectionalLight(0xffffff,  // construtor da luz numa direção específica
                                                      1); // intensidade da luz
scene.add(luz_direcional);                                 // adiciona a cena

// OrbitControls (Parte dos controles de zoom, giro, etc..)
var controls = new OrbitControls(camera,  // cria um construtor passando a câmera para visualizar 
                    renderer.domElement); // domelement para escutar os eventos com mouse
controls.minDistance = -1;                 // distância mínima de aproximação caso de zoom 
controls.maxDistance = 20;                // distância máxima de aproximação caso de zoom 
controls.enableDamping = true;            // sensibilidade ao detectar o mouse arrastando
controls.dampingFactor = 0.8;             // regular o valor
// controls.screenSpacePanning = true;

// parte do controle de rotação e deslocamento no eixo
var controls = new function(){    // controls passa a ser uma função com os parâmetros abaixo
    this.rotationSpeed = 0.01;    // valor inicial de rotação do objeto
    this.translationSpeed = 0.03; // valor inicial de translação do objeto
    this.showRay = false;         // mostra um raio na trajetória (não utilizei)
}

var gui = new dat.GUI( // cria um novo objeto gui
    {autoplace: false, // posição automática desativado
           width: 200} // largura ajustar
);
gui.add(controls,       // adiciona a função de controle
    'rotationSpeed',    // adicina o rotationSpeed
                  0,    // velocidade mínima de rotação
                  0.5); // velocidade máxima de rotação

gui.add(controls,          // adiciona a função de controle
    'translationSpeed',    // adiciona o translationSpeed 
                     0,    // velocidade mínima de rotação
                     0.5); // velocidade máxima de rotação

// responsividade da tela
window.addEventListener('resize', onWindowResize, false);  // ouve eventos de alteração da dimensão da janela

function onWindowResize(){                                 // função que processa eventos de alterações da tela
  camera.aspect = window.innerWidth / window.innerHeight;  // recebe a dimensão atual da janela
  camera.updateProjectionMatrix();                         // atualia a projeção da janela
  renderer.setSize(window.innerWidth, window.innerHeight); // altera as dimensoes da janela depois que alterou
}

var carroSeguePraFrente = true;      // variável que inicia movimentando o carro para frente por padrão

function animate(){                  // cria a função de animação
    requestAnimationFrame(animate);  // chama a animate recursivamente com o método requestAnimationFrame que faz atualizações
    carro.rotation.y += controls.rotationSpeed; // carro rotaciona em y
    renderer.render(scene, camera);             // renderiza a cena e câmera

    // o carro começa a se mover da origem (0,0,0)
    if(carroSeguePraFrente == true){                   // se o carro estiver indo para frente
        carro.position.z += controls.translationSpeed; // carro se move no eixo z na velocidade armazenada em controls
    }
    else{                                             // caso contrário
        carro.position.z -= controls.translationSpeed; // volta nessa velocidade em controls
    }
    if(carro.position.z >= 5){       // limite que ele chega em z (sentido da tela)
        carroSeguePraFrente = false; // não deixa ele seguir pra frente depois do limite
    }
    else if(carro.position.z <= 0.0){ // chegou na origem (voltando)
        carroSeguePraFrente = true;   // volta andar pra frente novamente como um pêndulo
    }
}
animate();           // chama a funçao de animação
}

window.onload = init; // quando carregar a janela executa a função init