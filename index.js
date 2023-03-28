import express from "express";
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import handlebars from "express-handlebars";
import cluster from 'cluster'
import { AuthRouter, InfoRouter, RandomRouter, ProductRouter, CartRouter } from "./src/routers/router.js";
import { config } from "./src/config/config.js";
import { MongoDBService } from "./src/services/mongoDBService.js";
import { PassportAuth } from "./src/middlewares/passportAuth.js";
import { INFO } from "./src/utils/info.js";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Proyecto Final",
        },
    },
    apis: ['./docs/**/*.yaml'],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions)

export const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoDBService.init()
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.DATABASE.mongo.dburl,
        dbName: config.DATABASE.mongo.dbName,
        mongoOptions,
        ttl: 6000,
        collectionName: 'sessions'
    }),
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))

app.use(passport.initialize());
app.use(passport.session());


/* app.engine("hbs",handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
})
);
app.set("view engine", "hbs");
app.set("views", "./public/views"); */

PassportAuth.init()

app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpecs))

app.use('/', AuthRouter)
app.use('/products', ProductRouter)
app.use('/cart', CartRouter)
app.use('/info', InfoRouter)
app.use('/api/randoms', RandomRouter)

const MODO = config.SERVER.MODO

if (MODO === "CLUSTER") {
    if (cluster.isPrimary) {
        const server = app.listen(config.SERVER.PORT, async () => {
            console.log(`Servidor escuchando en puerto ${server.address().port}`);
          });
          server.on('error', error => console.log(`Error del servidor: ${error}`))
        console.log(`CLUSTER corriendo en nodo primario ${process.pid} - Puerto ${config.SERVER.PORT}`);
        
        for (let i = 0; i < INFO.numeroProcesadores; i++) {
            cluster.fork()
        }
        cluster.on(`exit`, worker => {
            console.log(`Worker ${worker.process.pid} finalizado.`);
        });
    } else {
        console.log(`Nodo Worker corriendo en el proceso ${process.pid}`);
    }
} else {
    console.log(`Server inciado en modo fork`);
    const server = app.listen(config.SERVER.PORT, async () => {
      console.log(`Servidor escuchando en puerto ${server.address().port}`);
    });
    server.on('error', error => console.log(`Error del servidor: ${error}`))
}