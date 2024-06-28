const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const path = require('path')

const router = require('./src/routes/index')

const app = express();

const port = 9000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors({}))
app.use(helmet())
app.use(morgan('common'))
app.use(cookieParser())
app.use(cors({}));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views'));

app.get('/', (req, res, next) => {
    res.send('HOME PAGE')
})

app.use('/', router)

app.use((req, res, next) => {
    next(createError(404, 'Not found'))
})
  

app.listen(port, () => {
    console.log(`Server is running port:${port}`)
})
