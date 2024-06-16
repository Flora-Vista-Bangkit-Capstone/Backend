const { predictClassification } = require('../services/inferenceService');
const crypto = require('crypto');
const storeData = require('../services/storeData');
const { getPlantModel, getDiseaseModel, getSoilModel } = require('../services/loadModel');
const { Firestore } = require('@google-cloud/firestore');

async function postPredictPlant(request, h) {
    return await handlePrediction(request, h, getPlantModel);
}

async function postPredictDisease(request, h) {
    return await handlePrediction(request, h, getDiseaseModel);
}

async function postPredictSoil(request, h) {
    return await handlePrediction(request, h, getSoilModel);
}

async function handlePrediction(request, h, getModel) {
    const { image } = request.payload;

    try {
        const model = await getModel();
        const { result, suggestion } = await predictClassification(model, image);
        const id = crypto.randomUUID();
        const createdAt = new Date().toISOString();

        const data = {
            id,
            result,
            suggestion,
            createdAt
        };

        await storeData(id, data);

        const response = h.response({
            status: 'success',
            message: 'Prediction successful',
            data
        });

        response.code(201);
        return response;
    } catch (error) {
        console.error('Prediction error:', error);
        return h.response({
            status: 'fail',
            message: 'Terjadi kesalahan dalam melakukan prediksi'
        }).code(500);
    }
}

async function getPredictHistories(request, h) {
    const db = new Firestore();
    const predictCollection = db.collection('predictions');
    const predictSnapshot = await predictCollection.get();

    const data = [];

    predictSnapshot.forEach((doc) => {
        const history = {
            id: doc.id,
            history: doc.data()
        };
        data.push(history);
    });

    const response = h.response({
        status: 'success',
        data
    });
    response.code(200);
    return response;
}

module.exports = {
    postPredictPlant,
    postPredictDisease,
    postPredictSoil,
    getPredictHistories
};
