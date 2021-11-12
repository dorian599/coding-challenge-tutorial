"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (() => {
    const path = 'swagger/';
    return {
        swaggerUI: {
            handler: path + 'html.handler',
            disableLogs: true,
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'swagger',
                        cors: true,
                    },
                },
            ],
        },
        swaggerJSON: {
            handler: path + 'json.handler',
            disableLogs: true,
            events: [
                {
                    http: {
                        method: 'get',
                        path: 'swagger.json',
                        cors: true,
                    },
                },
            ],
        },
    };
})();
