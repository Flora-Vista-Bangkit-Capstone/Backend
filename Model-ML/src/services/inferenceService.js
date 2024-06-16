const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        let result, suggestion;
        
        if (confidenceScore > 50) {
            result = "Detected";
            suggestion = "Further action recommended!";
        } else {
            result = "Not Detected";
            suggestion = "All clear!";
        }

        return { result, suggestion };

    } catch (error) {
        console.error('Error during prediction:', error);
        throw new InputError(`Error during input: ${error.message}`);
    }
}

module.exports = {
    predictClassification
};
