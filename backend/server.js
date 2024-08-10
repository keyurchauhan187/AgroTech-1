import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js" 
import categoryRoutes from "./routes/categoryRoutes.js"
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";



dotenv.config();

//connect to db
connectDb();



//express obj
const app= express();

//meddlewear
app.use(cors()); 
app.use(express.json());
app.use(morgan('dev'));

//routes

app.use('/api/v1/auth',authRoutes);
app.use("/api/v1/category",categoryRoutes);
app.use("/api/v1/product", productRoutes);

//api
app.get("/",(req,res)=>{
    res.send("<h1>Welcome to ecommerce web site by Jaydip</h1>")
});

const PORT=process.env.PORT || 8080;  


app.listen(PORT ,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on  port ${PORT}`)
})