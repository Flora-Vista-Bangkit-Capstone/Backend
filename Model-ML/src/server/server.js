require('dotenv').config();

const Hapi = require('@hapi/hapi');
const routes = require('../server/routes');
const InputError = require('../exceptions/InputError');

(async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    server.ext('onPreResponse', function (request, h) {
        const response = request.response;

        if (response.isBoom && response.output.statusCode === 413) {
            const newResponse = h.response({
                status: 'fail',
                message: 'Payload content length greater than maximum allowed: 1000000',
            });

            newResponse.code(413);
            return newResponse;
        }

        if (response instanceof InputError || response.isBoom) {
            const statusCode = response instanceof InputError ? response.statusCode : response.output.statusCode;
            const newResponse = h.response({
                status: 'fail',
                message: 'Terjadi kesalahan dalam melakukan prediksi',
            });

            newResponse.code(parseInt(statusCode));
            return newResponse;
        }

        return h.continue;
    });

    await server.start();
    console.log(`Server started at: ${server.info.uri}`);
})();