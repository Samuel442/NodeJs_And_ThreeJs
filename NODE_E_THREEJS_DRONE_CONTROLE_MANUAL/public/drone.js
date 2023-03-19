import { GLTFLoader } from "./GLTFLoader.js";  // importando a biblioteca GLTFLoader
// import { dat } from "./dat.gui.js";

var scene;
function init_scene()
{
    //cena
    scene = new THREE.Scene(); // cria o construtor da cena
}

var camera;
function init_camera()
{
    // cria a camera com perspectiva
camera = new THREE.PerspectiveCamera(  // cria o construtor da camera
                                    7, // campo de visão da câmera
window.innerWidth / window.innerHeight,// largura pela altura para a proporção da imagem
                                  0.01,// distancia mínima de visão plano de recorte mín
                                  1000 // distância máxima de visão plano de recorte máx
                                    );
// configurando a posição
camera.position.x = 0;  // posição em x no ponto 0
camera.position.y = 0;  // posição em y no ponto 0
camera.position.z = 10; // posição em z distante 10 unidades da origem
}

var renderer;
function init_renderer()
{
// renderização
renderer = new THREE.WebGLRenderer();                // cria o construtor de renderização
renderer.setSize(window.innerWidth, window.innerHeight); // seta a largura e altura
document.body.appendChild(renderer.domElement);          // linka com o corpo do index do html
}


var carrega_gltf;
var drone;

function init_carrega_gltf()
{
// carregamento da imagem gltf
carrega_gltf = new GLTFLoader(); // construtor para o carregamento do gltf
drone;                           // variável para receber a cena gltf

carrega_gltf.load("scene.gltf", function(gltf){ // carrega o arquivo gltf passando a função com argumento objeto gltf
    drone = gltf.scene;                         // objeto drone recebe a cena
    scene.add(gltf.scene);                      // adiciona o gltf a cena
});
}

function add_cor_fundo()
{
// cor de fundo
scene.background = new THREE.Color(0x696969);  // construtor da cor de fundo da cena
}

var luz_ambiente;
function add_luz_ambiente()
{
// luz que vai iluminar o ambiente
   luz_ambiente = new THREE.AmbientLight(0xffffff, // construtor da luz ambiente
                                                2); // intensidade da luz
scene.add(luz_ambiente);                            // adiciona a luz a cena
}

var luz_direcional;
function add_luz_direcional()
{
// luz numa direção específica
     luz_direcional = new THREE.DirectionalLight(0xffffff,  // construtor da luz numa direção específica
                                                        2);// intensidade da luz
scene.add(luz_direcional);                                 // adiciona a luz cena
}

var controls;
function controles_gui()
{
    // parte do controle de rotação e deslocamento no eixo
    controls = new function(){    // controls passa a ser uma função com os parâmetros abaixo
        this.rotationSpeed = 0.01;    // valor inicial de rotação do objeto
        this.translationSpeed = 0.03; // valor inicial de translação do objeto
    }
    
    var gui = new dat.GUI( // cria um novo objeto gui
        {autoplace: false, // posição automática desativado
               width: 600} // largura ajustar
    );
    gui.add(controls,       // adiciona a função de controle
        'rotationSpeed',    // adicina o rotationSpeed
                      0,    // velocidade mínima de rotação
                      0.5); // velocidade máxima de rotação
    
    gui.add(controls,          // adiciona a função de controle
        'translationSpeed',    // adicina o translationSpeed
                         0,    // velocidade mínima de translação
                         0.5); // velocidade máxima de translação
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

var droneSeguePraFrente = true;      // variável que inicia movimentando o drone para frente
function renderiza(){                  // cria a função de animação
    requestAnimationFrame(renderiza);  // chama a animate recursivamente com o método requestAnimationFrame que faz atualizações
    drone.rotation.y += controls.rotationSpeed; // drone rotaciona em y

    renderer.render(scene, camera); // renderiza a cena e câmera

    // o drone começa a se mover da origem (0,0,0)
    if(droneSeguePraFrente == true){                   // se o drone estiver indo para frente
        drone.position.z += controls.translationSpeed; // drone se move no eixo z na velocidade armazenada em controls
    }
    else{                                             // caso contrário
        drone.position.z -= controls.translationSpeed;// volta nessa velocidade em controls
    }
    if(drone.position.z >= 9){       // limite que ele chega em z (sentido da tela)
        droneSeguePraFrente = false; // não deixa ele seguir pra frente depois do limite
    }
    else if(drone.position.z <= 0.0){ // chegou na origem (voltando)
        droneSeguePraFrente = true;   // volta andar pra frente novamente como um pêndulo
    }
}

init_scene();
init_camera();
init_renderer();
init_carrega_gltf();
add_cor_fundo();
add_luz_ambiente();
add_luz_direcional();
controles_gui();
responsividade();
renderiza();            // chama a funçao de animação
