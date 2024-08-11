import mongoose from "mongoose";

const connectDb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connect to mongodb database ${conn.connection.host}`);

    }catch(e){
        console.log(`Error is ${e}`)
    }
};

export default connectDb;