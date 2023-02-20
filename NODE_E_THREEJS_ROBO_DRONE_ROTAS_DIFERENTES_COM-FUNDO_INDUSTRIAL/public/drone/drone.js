import { GLTFLoader } from "./GLTFLoader.js";  // importando a biblioteca GLTFLoader
import { RGBELoader } from "./RGBELoader.js";       // importando a biblioteca RGBELoader
import { OrbitControls } from "./OrbitControls.js"  // importando a biblioteca OrbitControls

// import { dat } from "./dat.gui.js";

function init()                              
{

//cena
var scene = new THREE.Scene();              // cria o construtor da cena

// cria a camera com perspectiva
var camera = new THREE.PerspectiveCamera(   // cria o construtor da camera
    100,                                    // campo de visão da câmera
    window.innerWidth / window.innerHeight, // largura pela altura para proporção da imagem
    0.01,                                   // distancia mínima de visão plano de recorte mín
    100                                    // distância máxima de visão plano de recorte máximo
);

// configurando a posição
camera.position.x = 0;  // posição em x no ponto 0
camera.position.y = 0;  // posição em y no ponto 0
camera.position.z = 10; // posição em z distante 10 unidades da origem

// renderização
var renderer = new THREE.WebGLRenderer();                // cria o construtor de renderizar
renderer.setSize(window.innerWidth, window.innerHeight); // seta a largura e altura
document.body.appendChild(renderer.domElement);          // adiciona um elemento dentro do corpo do documento html

// eixos
var axes = new THREE.AxesHelper(20); // cria um construtor de eixos
scene.add(axes);                     // adiciona a cena

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

// carregamento da imagem gltf
var carrega_gltf = new GLTFLoader(); // construtor para o carregamento do gltf
var drone;                           // variável para receber a cena gltf

carrega_gltf.load("scene.gltf", function(gltf){  // carrega a cena gltf passando a função com argumento gltf
    drone = gltf.scene;                          // objeto drone recebe a cena
    scene.add(gltf.scene);                       // adiciona o gltf a cena
});

// cor de fundo
scene.background = new THREE.Color(0xffffff);   // construtor da cor de fundo da cena

// luz que vai iluminar o ambiente
var luz_ambiente = new THREE.AmbientLight(0xffffff, // cria um construtor da luz ambiente
                                                1); // intensidade da luz
scene.add(luz_ambiente);                            // adiciona a luz a cena

// luz numa direção específica
var luz_direcional = new THREE.DirectionalLight(0xffffff,  // cria um construtor da luz direcional
                                                        2);// intensidade
scene.add(luz_direcional);                                 // adiciona a luz cena


// OrbitControls (Parte dos controles de zoom, giro, etc..)
var controls = new OrbitControls(camera,  // cria um construtor passando a câmera para visualizar 
                    renderer.domElement); // domelement para escutar os eventos com mouse
controls.minDistance = -1;                 // distância mínima de aproximação caso de zoom 
controls.maxDistance = 20;                // distância máxima de aproximação caso de zoom 
controls.enableDamping = true;            // sensibilidade ao detectar o mouse arrastando
controls.dampingFactor = 0.8;             // regular o valor
// controls.screenSpacePanning = true;

// parte do controle de rotação e deslocamento no eixo
var controls = new function(){     // controls passa a ser uma função com os parâmetros abaixo
    this.rotationSpeed = 0.01;     // valor inicial de rotação do objeto
    this.translationSpeed = 0.03;  // valor inicial de translação do objeto
}

var gui = new dat.GUI( // cria um novo objeto gui
    {autoplace: false, // posição automática desativado
           width: 300} // largura da barra de controle
);
gui.add(controls,       // adiciona a função de controle
    'rotationSpeed',    // adicina o rotationSpeed
                  0,    // velocidade mínima de rotação
                  0.5); // velocidade máxima de rotação
gui.add(controls,           // adiciona a função de controle
    'translationSpeed',     // adicina o translationSpeed
                     0,     // velocidade mínima de translação
                     0.5);  // velocidade máxima de translação

var droneSeguePraFrente = true;      // variável que inicia movimentando o drone para frente

// responsividade da tela
window.addEventListener('resize', onWindowResize, false);  // ouve eventos de alteração da dimensão da janela

function onWindowResize(){                                 // função que processa eventos de alterações da tela
  camera.aspect = window.innerWidth / window.innerHeight;  // recebe a dimensão atual da janela
  camera.updateProjectionMatrix();                         // atualia a projeção da janela
  renderer.setSize(window.innerWidth, window.innerHeight); // altera as dimensoes da janela depois que alterou
}

function animate(){                  // cria a função de animação
    requestAnimationFrame(animate);  // chama a animate recursivamente com o método requestAnimationFrame que faz atualizações
    drone.rotation.y += controls.rotationSpeed; // drone rotaciona em y

    renderer.render(scene, camera);   // renderiza a cena e câmera

    // o drone começa a se mover da origem (0,0,0)
    if(droneSeguePraFrente == true){                    // se o drone estiver indo para frente
        drone.position.z += controls.translationSpeed;  // drone se move em z na velocidade armazenada em controls
    }
    else{                                               // caso contrário
        drone.position.z -= controls.translationSpeed;  // volta nessa velocidade em controls
    }
    if(drone.position.z >= 11){          // limite que ele chega em z (sentido da tela)
        droneSeguePraFrente = false;    // não deixa ele seguir pra frente depois do limite
    }
    else if(drone.position.z <= 0.0){   // chegou na origem (voltando)
        droneSeguePraFrente = true;     // volta andar pra frente novamente como um pêndulo
    }
}

animate();            // chama a funçao de animação
}

window.onload = init; // qundo abre a janela chama a função init