const express = require('express');
const path = require('path')
const app = express();
const { engine } = require('express-handlebars');
var cors = require('cors')
const route = require('./routes')
const db = require('./config/db')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
db.connect();

app.use(cors())
app.use(express.static(path.join(__dirname,"./public")))
app.engine('handlebars', engine({extname:'hbs'}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'./resource/views'));

const PORT = process.env.PORT || 3000  ;
route(app)
app.listen(PORT,() => console.log(`app chay cong ${PORT}`));