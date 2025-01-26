import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import "reflect-metadata";
import registerRoute from "./routes/register.router";
import login from "./routes/login.router";
import userRoute from "./routes/user.router";
import ordersRoute from "./routes/order.router";



import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/register", registerRoute);
app.use("/api/login", login);
app.use("/api/users", userRoute);
app.use("/api/orders", ordersRoute);

app.get('/', (req, res) => {
    res.send('Ruta de prueba simple funcionando!');
});

export default app;