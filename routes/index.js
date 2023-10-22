import userRouter from "./user.js";
import productRouter from "./product.js";


export default function Routes(app) {

    app.use(`${process.env.API_URL}/products`, productRouter);
    app.use(`${process.env.API_URL}/users`, userRouter);

}