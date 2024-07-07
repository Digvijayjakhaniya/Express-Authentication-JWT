import express, { json } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import web from './routes/web.js'
import conn from "./config/connectDb.js";

const app = express()
const port = process.env.port
const db_url = process.env.db_url

app.use(json())
app.use(cors())
conn(db_url)
app.use('/api/user',web)

app.listen(port,()=>{
    console.log(`port run on http://localhost:${port}`)
})