var express = require("express");  // variavel express recebe o módulo express
const app = express();             // app recebe tudo do express 

app.set('view engine', 'ejs');     // seta e usa uma view engine tipo ejs para renderizar o html
app.use(express.static('public')); // pasta pública que permite carregar os arquivos contidos nela

// rotas que envia arquivo
app.get("/cubo", function(req,res){ // cria a rota /cubo
    res.render("cubo_html");        // envia o html na rota especificada 
});

app.listen(8081, function(){                       // escuta a porta 8081
    console.log("Servidor rodando na porta 8081!") // imprime no cmd este texto assim que o servidor rodar
});                                                // abrir servidor com express última do código