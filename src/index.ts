import express from "express";
import { Request, Response } from "express";
import * as dotenv from 'dotenv'
dotenv.config()
import connect from "./database/connect";
import close from "./database/close";
//connect()
const app = express();
const port = 3000 || process.env.PORT


app.get('/', (req: Request, res: Response)=>{
    res.send('Hello World!');
})


app.listen(port, ()=>{
    console.log('I am listening nigga', process.env.BRUH)
})