import express from "express"
import cors from "cors"
import router from "./Routes/routes";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api',router);


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server started running on port ${PORT}`)
})