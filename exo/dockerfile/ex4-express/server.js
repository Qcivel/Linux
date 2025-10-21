// Ce serveur Express répond "Hello depuis Express et Docker !" à la racine "/"
import express from "express";
const app = express();

app.get("/", (req, res) => res.send("Hello depuis Express et Docker !"));
app.listen(3000, () => console.log("Serveur Express prêt sur le port 3000"));