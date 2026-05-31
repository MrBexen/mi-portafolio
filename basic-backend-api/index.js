//cargar express
const express = require("express")
//Cargando express
const app = express();
//por donde esta corriendo el servidor de node
const port = 3000;

app.use(express.json())


//datos de prueba
let games = [
    {id:1,titulo:"Red dead redemption 2", precio:20},
    {id:2,titulo:"Mafia 1",precio:27},
    {id:3,titulo:"Persona 5",precio:37},
    {id:4,titulo:"GTA 6",precio:57},
    {id:5,titulo:"Top Spin 2K25",precio:27},
    
];


//rutas
app.get("/",(req,res) =>{

    return res.json(games);
})

app.get("/my_games",(req,res)=>{
    return res.json([
        games[0],
        games[3]
    ])
})

//guardar datos en el servidor
app.post("/save-game",(req,res)=>{
    let newGame ={
        id: games.length + 1,
        titulo:req.body.titulo,
        precio: req.body.precio
    };

    games.push(newGame)

    return res.status(200).json(newGame);
})

//obtener juego por ID
app.get("/games/:id", (req,res)=>{
    const id = parseInt(req.params.id);
    const game = games.find(g => g.id == id);

    if (!game){
        return res.status(404).json({
            messagee:"juego no encontrado"
        });
    }

    return res.json(game);
})


//actualizar juego
app.put("/games/:id",(req,res)=>{

    const id = parseInt(req.params.id);

    const game = games.find(g=> g.id === id);

    if(!game){
        return res.status(404).json({
            messagee: "juego no encontrado"
        });
    }

    game.titulo = req.body.titulo;
    game.precio = req.body.precio;

    return res.json(game);

});

app.listen(port, ()=>{
    console.log("Servidor de node escuchando en http://localhost:"+port);
})
