import mongoose from "mongoose";

const apiKeysSchema = new mongoose.Schema({
   userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'user',
       required: true
   },
    ApiID: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'api',
        required:true
   },
    key: {
        type: String,
        required: true
    },

});
const APIkeys = mongoose.model('APIkeys', apiKeysSchema);

export default APIkeys;