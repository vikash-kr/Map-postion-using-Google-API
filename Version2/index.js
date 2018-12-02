const express = require('express')
const app = express()


//setting view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));


app.get('/', (req, res) => res.render('home'))

app.listen(3000, () => console.log(`App started on port 3000!`))