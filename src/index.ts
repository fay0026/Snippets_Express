import express from 'express';
import session from 'express-session';
import router from './snippets/snippets.router';
//import { snippetsRepository } from './snippets/snippets.repository';

const app = express();

app.set('view engine', 'ejs');

const port = process.env.port;

app.use(express.static('public'));

app.use(session({
    secret: process.env.session_secret as string, // ajoutez la variable d'environnement correspondante au fichier .env
    saveUninitialized: false,
    resave: false
}));

app.use('/', router)

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});