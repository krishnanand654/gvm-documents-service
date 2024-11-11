import express from "express"
import cors from "cors"
import router from "./Routes/routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api',router);

const PORT = 3000

app.listen(PORT,()=>{
    console.log(`Server started running on port ${PORT}`)
})