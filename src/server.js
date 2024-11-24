import axios from "axios";
import express from "express";
import { options } from "./proxyScript.js";
import { cacheRequest } from "./middlewares/caching.middleware.js";
import client from "./redis.js";

const app = express();
const ORIGIN = options.origin;
const PORT = options.port;

if (options.clearCache) {
  await client.flushall()
  console.log("All Cache Sucessfully Deleted From Redis");
  process.exit(1)
}

if (!PORT || !ORIGIN) {
  console.error("ERROR: Please specify the port and origin url using --port and --origin flag");
  process.exit(1);
}
app.use(express.json());

app.all("*",cacheRequest, async (req, res) => {
  const originUrl = `${ORIGIN}${req.originalUrl}`;
  console.log(req.body);
  
  console.log(originUrl);
  
  try {
    console.log("In try block");
    console.log(req.method, req.headers, req.body);
    
    
    const response = await axios({
      url: originUrl,
      method: req.method,
      headers: req.headers,
      data: req.body,
    });

    console.log(response.data);
    await client.set(res.locals.cacheKey, JSON.stringify(response.data), "EX", 60);
    res.status(response.status).set(response.headers).send(response.data);

  } catch (error) {
    res.status(500).send("Error communicating with the origin server");
  }
});
app.listen(PORT, () => {
  console.log(`Proxy server running on ${PORT}`);
});
