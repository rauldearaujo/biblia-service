var express = require('express');
var cors = require('cors');
const fs = require('fs');

app = express();
app.use(express.json());
app.use(cors());

app.get('/livros', function(req, res){
    let livrosAT = fs.readdirSync('Biblia Ave-Maria/AT').map((nomeLivro) => {return nomeLivro.slice(3)});
    let livrosNT = fs.readdirSync('Biblia Ave-Maria/NT').map((nomeLivro) => {return nomeLivro.slice(3)});
    let livros = {
        AT: livrosAT,
        NT: livrosNT
    } 
    res.json(livros);
});

app.post('/capitulos', function(req, res) {
    let capitulos = fs.readdirSync(`Biblia Ave-Maria/${req.body.testamento}/${req.body.livro}`).map((capitulo) => {return capitulo.slice(0, -4)})
    res.json(capitulos);
});

app.post('/texto', function(req, res){
    let texto = fs.readFileSync(`Biblia Ave-Maria/${req.body.testamento}/${req.body.livro}/${req.body.capitulo}.txt`).toString('ucs2');
    texto = texto.replace(/\s+/g, " ");
    texto = texto.replace(/\n+/g, "\n");
    texto = texto.replace(/(\r+)|(\t+)/g, "");
    res.json(texto.split("\n"));
});

app.get("/", function(req, res){
    res.send("Biblia-Service working!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
