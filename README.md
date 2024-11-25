# Caching Proxy Server

A lightweight caching proxy server that forwards requests to a specified origin server and caches responses to improve performance. Subsequent requests for the same resource are served from the cache, reducing load on the origin server.

---

## Features

- Forwards requests to an origin server.
- Caches responses to avoid redundant requests to the origin server.
- Supports clearing the cache.
- Configurable via command-line arguments.
- Easily deployable as a CLI tool.

---

## Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **Redis** (for caching)

### Clone the Repository

```bash
git clone https://github.com/ayushsharma74/Caching-Proxy-Server
cd Caching-Proxy_server
```

### Install Dependencies

```bash
npm install
```

---

## Usage

### Start the Caching Proxy Server

Run the following command to start the server:

```bash
node src/server.js --port <PORT> --origin <ORIGIN_URL>
```

- `--port`: The port on which the caching proxy server will run.
- `--origin`: The URL of the origin server to which requests will be forwarded.

#### Example:
```bash
node src/server.js --port 3000 --origin http://dummyjson.com
```

### Clear Cache

To clear the cache, run:

```bash
node src/server.js --clear-cache
```

## How It Works

1. **Forward Requests**: 
   Requests made to the proxy server (e.g., `http://localhost:3000/products`) are forwarded to the origin server (e.g., `http://dummyjson.com/products`).

2. **Cache Responses**: 
   Responses are cached in Redis with a time-to-live (TTL) of 60 seconds.

3. **Serve Cached Data**: 
   If the same request is made again within the TTL, the cached response is returned with the header:
   ```
   X-Cache: HIT
   ```
   Otherwise, the request is forwarded to the origin server, and the response is returned with:
   ```
   X-Cache: MISS
   ```

---

## Configuration

You can customize the following settings:

- **Cache Expiration Time**: Modify the TTL for cached responses in `caching.middleware.js`.
- **Headers**: Customize headers in the `axios` request within the server code.

---

## Development

### Start Server for Development

```bash
node src/server.js --port 3000 --origin http://dummyjson.com
```

### Run Tests (Optional)

Add tests using your preferred testing framework, e.g., Jest, Mocha, or others.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you’d like to improve this project.

---

## Author
```
Created by [Ayush](https://github.com/ayushsharma74).
```

## Project Idea From https://roadmap.sh/projects/markdown-note-taking-app
