import axios from "axios"
import client from "../redis.js"

export const cacheRequest = async (req,res,next) => {
    console.log("HII FROM MIDDLEWARE");
    
    const cacheKey = `${req.method}/${req.originalUrl}`
    console.log(cacheKey);
    
    try {
        const cachedResponse = await client.get(cacheKey)
        if (cachedResponse) {
            res.setHeader("X-Cache", "HIT")
            return res.send(JSON.parse(cachedResponse))
        }
        res.setHeader('X-Cache', 'MISS');
        res.locals.cacheKey = cacheKey
        next()
    } catch (error) {
        console.error("Error caching thr request")
        next()
    }
}