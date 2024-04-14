import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    element: {
        type: String,
        required: true
    }
});

const Api = mongoose.model('api', apiSchema);

export default Api;
