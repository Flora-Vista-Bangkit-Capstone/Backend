const { postPredictPlant, postPredictDisease, postPredictSoil, getPredictHistories } = require('../server/handler');

const routes = [
    {
        path: '/predict/plant',
        method: 'POST',
        handler: postPredictPlant,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1000000
            }
        }
    },
    {
        path: '/predict/disease',
        method: 'POST',
        handler: postPredictDisease,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1000000
            }
        }
    },
    {
        path: '/predict/soil',
        method: 'POST',
        handler: postPredictSoil,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1000000
            }
        }
    },
    {
        path: '/predict/histories',
        method: 'GET',
        handler: getPredictHistories
    }
];

module.exports = routes;
