import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import "dotenv/config";

const app = express();
const port = process.env.PORT || 8080;

import Routes from "./routes/index.js";


//Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());

//Routes
Routes(app);


app.listen(port, () => {
    console.log(`Server run is http://localhost:${port}`);
})
