import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';

export const app = express();
const port = process.env.PORT || 8080;

import Routes from './routes/index.js';
import { dbConnection } from './configs/dbConnect.js';
import authJwt from './helpers/jwtHelper.js';
import errorHandle from './helpers/errorHandle.js';

//Middleware
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); //parse requests of content-type - application/x-www-form-urlencoded

var corsOptions = {
    origin: '*', // co thể sau này nó là resfult api, cứ để sẵn
};
app.use(cors(corsOptions)); //cross domain...

app.use(morgan('combined')); //theo dõi log GET, POST...

app.use(authJwt()); //Authorized
app.use(errorHandle);

//Connect mongodb
dbConnection();

//Routes
Routes(app);

app.listen(port, () => {
    console.log(`Server run is http://localhost:${port}`);
});
