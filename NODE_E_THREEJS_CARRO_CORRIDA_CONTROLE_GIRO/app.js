var express = require("express"); // variavel express recebe o módulo express
const app = express();            // app recebe tudo do framework express 

app.set('view engine', 'ejs');     // seta e usa uma view engine tipo ejs
app.use(express.static('public')); // pasta pública que permite carregar os arquivos contidos nela

app.get("/corrida", function(req,res){ // cria a rota corrida
    res.render("index");               // renderiza o aquivo html index.ejs deve estar na pasta views
});

app.listen(8081, function(){                       // escuta a porta 8081
    console.log("Servidor rodando na porta 8081!") // imprime no cmd este texto assim que o servidor rodar
});                                                // abrir servidor com express última do código