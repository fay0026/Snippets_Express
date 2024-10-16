import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import router from './snippets/snippets.router';
import languagesRouter from './languages/languages.router';

const app = express();

app.set('view engine', 'ejs');

const port = process.env.port;

app.use(express.static('public'));

app.use(session({
    secret: process.env.session_secret as string,
    saveUninitialized: false,
    resave: false
}));

app.use('/', router)

app.use('/lang', languagesRouter)

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(`ERREUR : ${err.message}`);
    res.render('error', { err });
});

app.listen(port, () => {
    console.log(`Serveur local démarré : http://localhost:${port}`);
});