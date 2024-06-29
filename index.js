const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const path = require('path')
const methodOverride = require('method-override')

const router = require('./src/routes/index')
const {URL_API} = require('./src/utils/constant')

const app = express();

const port = 9000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))
app.use(morgan('common'))
app.use(cookieParser())
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", 'https://funix.edu.vn'],
            scriptSrcAttr: ["'unsafe-inline'"],
            },
        },
    })
);
const corsOptions = {
    origin: URL_API,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views'));

app.get('/', (req, res, next) => {
    res.send('HOME PAGE')
})

app.use('/', router)

app.get('*', function(req, res){
    res.status(404).render('notFound', {
      pageTitle: 'Not found'
    });
});

app.use((err, req, res, next) => {
    console.log('error');
    res.status(500).render('error', {
        pageTitle: 'Error'
    });
})

app.listen(port, () => {
    console.log(`Server is running port:${port}`)
})
