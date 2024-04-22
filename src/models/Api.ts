import mongoose from "mongoose";

const apiSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    routeName: {
        type: String,
        required: true
    },
    routeData:{
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    routePath:{
        type: String,
        required: true
    },
    routeDescription:{
        type: String,
        required: true
    },accessType: {
        type: String,
        enum: ['public', 'private'],
        required: true
    },key:{
        type: String
    }
});

const Api = mongoose.model('api', apiSchema);

export default Api;
