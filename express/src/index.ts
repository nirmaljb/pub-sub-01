import express from "express";
import { createClient } from "redis";

const app = express();
const client = createClient();
client.connect();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello, World'
    });
})

app.post('/submit', async (req, res) => {
    const { problemId, userId, code, language }= req.body;
    
    await client.lPush("submission", JSON.stringify({problemId, userId, code, language}));
    res.json({
        message: 'Submission recieved'
    })
})

app.listen(8000);