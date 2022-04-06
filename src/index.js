const express = require('express');
const path = require('path')
const app = express();
const { engine } = require('express-handlebars');
const route = require('./routes')
const db = require('./config/db')
db.connect();

app.use(express.static(path.join(__dirname,"./public")))
app.engine('handlebars', engine({extname:'hbs'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'./resource/views'));

const PORT = 3000 ||process.env.PORT ;
route(app)
app.listen(process.env.PORT,() => console.log('app chay'));