var express = require("express"); // variavel express recebe o módulo express
const app = express();            // app recebe tudo do framework express
const path  = require("path");    // constante recebe o módulo path

app.set('view engine', 'ejs');    // seta e usa uma view engine tipo ejs para renderizar o html


app.use(express.static(path.join(__dirname, "public"))); // arquivos estáticos

// rotas que envia arquivo
app.get("/drone", function(req,res){ // cria a rota drone
    res.render("drone");             // renderiza o arquivo html index.ejs (deve estar na pasta views)
});
app.get("/robo", function(req,res){  // cria a rota robo
    res.render("robo");              // renderiza o arquivo html index.ejs (deve estar na pasta views)
});

// abrir servidor com express sempre no fim do código
app.listen(8081, function(){                       // escuta a porta 8081
    console.log("Servidor rodando na porta 8081!") // imprime no cmd este texto assim que o servidor rodar
});                                                