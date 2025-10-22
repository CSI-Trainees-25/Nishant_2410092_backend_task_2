import express from 'express'
const app= express()

import dotenv from 'dotenv'
 dotenv.config({
    path: '.env'
})
app.get('/api',(req,res) => {
   res.send('hello task_2  Authentication System ')
}

)
app.listen(process.env.PORT || 7000,() => {
   console.log(`server is ready at ${process.env.PORT}`)
}
)