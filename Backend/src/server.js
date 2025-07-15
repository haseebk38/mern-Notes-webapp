import express from "express";
import dotenv from "dotenv";
import cors from "cors";


import rateLimiter from "./middleware/rateLimiter.js";
import noteRoutes from "./Routes/noteRoutes.js";
import { connectDB } from "./config/db.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001 



app.use(
    cors({
        origin: "http://localhost:5173",
})
);
//middle ware runs btw the req and res
app.use(express.json());  // just before res the middleware executes like req.body to get input

app.use(rateLimiter);


//our simple custom middleware
// app.use((req,res,next) => {
//     console.log(`Req method is ${req.method} & Req url is ${req.url}  `); //first it print this and then it go for the next func (getAllNotes)
//     next();
// });

app.use("/api/notes",noteRoutes);
// app.use("/api/products",productRoutes);
// app.use("/api/payments",paymentRoutes);
// app.use("/api/emails",emailsRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("server started at port : ",PORT);
    });
});

//mongodb+srv://haseebahk17:1UcGZptge7oHuVax@cluster0.7uxh5lg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0