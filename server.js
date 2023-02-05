import http from "http";
import express from "express";
import { initialize } from "@oas-tools/core";
import initMongoDBConnection from './config/mongoose.js'


const deploy = async () => {
    const serverPort = 8080;
    const app = express();
    app.use(express.json({ limit: '50mb' }));

    const config = {
        middleware: {
            security: {
                auth: {
                }
            }
        }
    }

    try {
        await initMongoDBConnection()
        console.log('Successfully connected to DB')
    }
    catch (err) {
        console.error('Could not connect to DB ' + err)
    }

    initialize(app, config).then(() => {
        http.createServer(app).listen(serverPort, () => {
            console.log("\nApp running at http://localhost:" + serverPort);
            console.log("________________________________________________________________");
            if (config.middleware.swagger?.disable !== false) {
                console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
                console.log("________________________________________________________________");
            }
        });
    });
}

const undeploy = () => {
    process.exit();
};

export default { deploy, undeploy }

