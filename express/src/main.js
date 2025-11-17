import express, { json } from 'express'
import taskRouter from './routes/tasks.js'
import cors from 'cors'

const app=express()
const port=4000

app.use(cors())

app.use(json())

app.use('/', taskRouter)

app.listen(port,()=>console.log("app listening on port "+port ))
