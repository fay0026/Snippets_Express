import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import router from './snippets/snippets.router';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`ERREUR : ${err.message}`);
    res.render('error', { err });
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});