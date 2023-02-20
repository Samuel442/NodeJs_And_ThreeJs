var express = require("express"); // variavel express recebe o módulo express
const app = express();            // app recebe tudo do framework express 
const path  = require("path");    // constante recebe o módulo path

app.set('view engine', 'ejs');     // seta e usa uma view engine tipo ejs para renderizar o html
app.use(express.static(path.join(__dirname, "public"))); // arquivos estáticos

app.get("/figura", function(req,res){ // cria rota figura
    res.render("index");            // renderiza o aquivo html index.ejs (deve estar na pasta views)
});

app.listen(8081, function(){                         // escuta a porta 8081
    console.log("Servidor rodando na porta 8081!")   // imprime no cmd este texto assim que o servidor rodar
});                                                  // abrir servidor com express última linha do código
