import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema({
    description:{
        type:String
    },
    image_url:{
        type:String
    }
});

export default mongoose.model("disease",diseaseSchema);