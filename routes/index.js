import userRouter from "./user.js";

export default function Routes(app) {

    app.use("/", userRouter);

}