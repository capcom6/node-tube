//@ts-check

const express = require('express');
const routes = require('./routes');

/**
 * @param {number} port
 * @param {import("./services/metadata")} metadata
 * @param {import("./services/streaming")} streaming
 * @param {import("./services/upload")} uploading
 * @param {import("./services/history")} history
 */
function startHttpServer(port, metadata, streaming, uploading, history) {
    return new Promise(resolve => {
        const app = express();
        const microservice = {
            app,
            metadata,
            streaming,
            uploading,
            history,
        };
        routes.setupHandlers(microservice);

        const server = app.listen(port, () => {
            microservice.close = () => {
                return new Promise(resolve => {
                    server.close(() => resolve());
                });
            };
            resolve(microservice);
        });
    });
}

/**
 * @param {import('./config')} config
 */
async function startMicroservice(config) {
    const MetadataService = require('./services/metadata');
    const VideoStreamingService = require('./services/streaming');
    const VideoUploadService = require('./services/upload');
    const HistoryService = require('./services/history');

    return startHttpServer(
        config.port,
        new MetadataService(config.metadataHost, config.metadataPort),
        new VideoStreamingService(config.videoStreamingUrl),
        new VideoUploadService(config.videoUploadUrl),
        new HistoryService(config.historyUrl)
    );
}

/**
 * @param {import('./config')} config
 */
async function main(config) {
    return startMicroservice(config);
};

if (require.main === module) {
    const config = require('./config');

    // Only start the microservice normally if this script is the "main" module.
    main(config)
        .then(() => {
            console.log(`Video streaming service is listeting on port ${config.port}!`);
        })
        .catch(err => {
            console.error('Video streaming service failed to start.');
            console.error(err && err.stack || err);
        });
}
else {
    // Otherwise we are running under test
    module.exports = {
        startMicroservice,
    };
}
