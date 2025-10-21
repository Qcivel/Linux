// Ce programme utilise la dépendance "express" pour afficher un message.
import express from "express";
const app = express();

app.get("/", (req, res) => res.send("Express a bien été installé !"));

app.listen(3000, () => console.log("Serveur prêt sur le port 3000"));