var express = require("express"); // variavel express recebe o módulo express
const app = express();            // app recebe tudo do framework express  

app.set('view engine', 'ejs');     // engine ejs permita renderizar html rm fomato ejs para o servidor
app.use(express.static('public')); // pasta pública que permite executar os arquivos estáticos contidos nela

// rotas que envia arquivo
app.get("/figuras", function(req,res){ // cria a rota figura
    res.render("index");               // renderiza via engine ejs o html na rota especificada 
});

app.listen(8081, function(){                      // escuta a porta 8081
    console.log("Servidor rodando na porta 8081!") // imprime no cmd este texto assim que o servidor rodar
});                                                // abrir servidor com express última do código