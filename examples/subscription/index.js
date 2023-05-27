const express = require('express');
const app = express();

let blockHeight = 0;

app.get('/sse-endpoint', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    const intervalId = setInterval(() => {
        blockHeight++;
        res.write(`event: blockheight\n`);
        res.write(`data: ${blockHeight}\n\n`);
    }, Math.random() * (10000 - 1000) + 1000);  // Sleep between 1 and 10 seconds

    // Cleanup on connection close
    req.on('close', () => {
        clearInterval(intervalId);
        res.end();
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
