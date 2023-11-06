import userRouter from "./user.js";
import productRouter from "./product.js";
import categoryRouter from "./category.js";
import authRouter from "./auth.js";


export default function Routes(app) {

    app.use(`${process.env.API_URL}/products`, productRouter);
    app.use(`${process.env.API_URL}/categories`, categoryRouter);
    app.use(`${process.env.API_URL}/auth`, authRouter );
    app.use(`${process.env.API_URL}/users`, userRouter);

}