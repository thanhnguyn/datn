import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './config/connectDB.js';
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import productRouter from './route/product.route.js';
import cartRouter from './route/cart.route.js';
import myListRouter from './route/mylist.route.js';
import addressRouter from './route/address.route.js';
import homeSlidesRouter from './route/homeSlide.route.js';
import bannerV1Router from './route/bannerV1.route.js';
import blogRouter from './route/blog.route.js';
import orderRouter from './route/order.route.js';

const app = express();
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
}));
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: false
}));

app.get("/", (request, response) => {
    ///server to client
    response.json({
        message: "Server is running on PORT " + process.env.PORT
    })
})

app.use('/api/user', userRouter);
app.use('/api/category', categoryRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/myList', myListRouter);
app.use('/api/address', addressRouter);
app.use('/api/homeSlides', homeSlidesRouter);
app.use('/api/bannerV1', bannerV1Router);
app.use('/api/blog', blogRouter);
app.use('/api/order', orderRouter);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server is running on PORT ", process.env.PORT);
    })
});