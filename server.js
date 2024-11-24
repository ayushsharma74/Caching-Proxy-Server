import axios from "axios";
import client from "./redis.js";
import express from "express"

const app = express()
const PORT = 8000

app.get('/', async (req,res) => {
    const todos = await client.get("todos")
    if (todos) {
        return res.json(JSON.parse(todos))
    }
    const {data}  = await axios.get("https://jsonplaceholder.typicode.com/todos")
    await client.set("todos",JSON.stringify(data))
    client.expire("todos", 30)
    return res.json(data)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


