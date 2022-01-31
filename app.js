import express, { json, urlencoded } from 'express';
import path from 'path';
import about from './routes/about.js';
import contact from './routes/contact.js';
import projects from './routes/projects.js';

const app = express();
const __dirname = path.resolve();
const port = process.env.PORT;

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use('/about', about);
app.use('/contact', contact);
app.use('/projects', projects);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/homepage.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/404.html'));
});

app.listen(port, () => {
    console.log('App is live at https://portfolio-website-rafi.herokuapp.com');
});