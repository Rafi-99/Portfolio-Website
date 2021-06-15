const express = require('express');
const path = require('path');
const about = require('./routes/about');
const contact = require('./routes/contact');
const projects = require('./routes/projects');

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/node_modules/bootstrap/dist')));
app.use("/about", about);
app.use("/contact", contact);
app.use("/projects", projects);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/homepage.html'));
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/404.html'));
});

app.listen(port, () => {
    console.log('App is live at https://www.rafi-codes.dev');
});