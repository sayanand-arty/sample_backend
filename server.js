import express from 'express';
import router from './router/router.js';
import cors from 'cors'
import connectDB from './db/db.js';

const app = express()
const PORT = 3000;

app.use(cors())
app.use(express.json())

app.use('/api', router)
connectDB();

app.listen(3000, ()=>{
    console.log('running http://localhost:3000')
});
