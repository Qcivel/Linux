// Ce programme lit le fichier message.txt et affiche son contenu.
import fs from "fs";

const message = fs.readFileSync("message.txt", "utf8");
console.log("Le message est :", message);