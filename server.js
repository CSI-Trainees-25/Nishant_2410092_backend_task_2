import express from 'express'
const app= express()

import dotenv from 'dotenv'
 dotenv.config({
    path: '.env'
})

import authRoutes from './Src/routes/authRoutes.js'
app.use(express.json());
app.use('/api/auth', authRoutes);

import connectDB from './Src/db/index.js'
connectDB()
    .then(() => {
        app.listen(process.env.PORT || 7000, () => {
            console.log(`server is ready at ${process.env.PORT}`);
        });
        app.on("error", (error) => {
            console.error("ERRORR:", error)
            throw error
        })
    })
    .catch((error) => {
        console.log("mongo DB connection failed", error);
    })


app.get('/api',(req,res) => {
   res.send('hello task_2  Authentication System ')
}
)

