import axios from "axios";
// import client from "./redis.js";
import express from "express"
import { options } from "./proxyScript.js";

const app = express()
const PORT = 8000
const origin = options.origin;
console.log(origin);

// app.use()
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})


