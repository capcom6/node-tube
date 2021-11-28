const path = require('path');

const express = require('express');
const http = require('http');
const fs = require('fs');
const app = express();

require('dotenv').config()

if (!process.env.PORT) {
    throw new Error('Please specify the port number for the HTTP server with the enviroment variable PORT.');
}
if (!process.env.VIDEO_STORAGE_HOST) {
    throw new Error('Please specify video storage address with the enviroment variable VIDEO_STORAGE_HOST.');
}
if (!process.env.VIDEO_STORAGE_PORT) {
    throw new Error('Please specify video storage port with the enviroment variable VIDEO_STORAGE_PORT.');
}

const PORT = process.env.PORT;
const VIDEO_STORAGE_HOST = process.env.VIDEO_STORAGE_HOST;
const VIDEO_STORAGE_PORT = parseInt(process.env.VIDEO_STORAGE_PORT);

app.get('/', (req, res) => {
    res.send('Node Video Streaming Service');
});

app.get('/video', (req, res) => {
    const forwardRequest = http.request({
        host: VIDEO_STORAGE_HOST,
        port: VIDEO_STORAGE_PORT,
        path: '/video?path=SampleVideo_1280x720_30mb.mp4',
        method: 'GET',
        headers: req.headers
    }, forwardResponse => {
        res.writeHead(forwardResponse.statusCode, forwardResponse.headers);
        forwardResponse.pipe(res);
    });

    req.pipe(forwardRequest);
});

app.listen(PORT, () => {
    console.log(`Video streaming service is listeting on port ${PORT}!`);
});
