import express from "express";

//dotEnv config

const app = express();

app.get('/', (req, res) => {
    res.send("Hello from server");
})


export default app;