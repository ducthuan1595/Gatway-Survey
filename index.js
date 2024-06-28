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
app.use(cors({
    // origin: (origin, callback) => {
    //   // Check the origin of the request
    //   if (!origin || origin === `http://${req.hostname}` || origin === `https://${req.hostname}`) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // }
}));
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views'));

app.get('/', (req, res, next) => {
    res.send('HOME PAGE')
})

app.use('/', router)

// app.use((req, res, next) => {
//     next(createError(404, 'Not found'))
// })
  

app.listen(port, () => {
    console.log(`Server is running port:${port}`)
})
