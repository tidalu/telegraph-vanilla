const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000;

const viewsDir = path.join(__dirname, 'views');
const publicDir = path.join(__dirname, '../public')

app.use(express.static(publicDir));
console.log(publicDir)
app.set('views', viewsDir);
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
    res.render('index');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})