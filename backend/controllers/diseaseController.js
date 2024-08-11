import diseaseSchema from "../models/diseasedModel.js";
import fetch from "node-fetch";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const createDiseaseController = async (req, res) => {
  try {
    const disease_image_url = req.body.url;
    console.log("### url 1", req.body.url)

    const genDescription = await   main(disease_image_url).catch(console.error);
    console.log("##### gen des 1",genDescription);

    const disease = new diseaseSchema({
      image_url: disease_image_url,
      description: genDescription
    });

    await disease.save();

    res.status(201).send({
      success: true,
      message: "Image interpretated Successfully",  
      genDescription,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in image interpretation",
    });
  }
}






const main = async (disease_image_url) => {
const genAI = new GoogleGenerativeAI("AIzaSyD5RRsyaHbUu8qQFeK3w8tndY7j8jytJ08");

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Identify plant and what status it is in, in tream of plant diseases identify it and it solution give response in short direact list posibale diseases in a section name diseases and describe effect of it ";




    //Identify plant and what status it is in, in tream of plant diseases identify it and it solution give response in short direact list posibale diseases and describe effect of it


    // Fetch image from URL
    // const imageUrl = "https://res.cloudinary.com/deq0hxr3t/image/upload/v1723269748/farm_zrvzgq.png";
    const imageUrl = disease_image_url;
    
    const response = await fetch(imageUrl);
    const buffer = await response.arrayBuffer(); // Updated as per the deprecation warning

    const image = {
        inlineData: {
            data: Buffer.from(buffer).toString("base64"),
            mimeType: "image/png",  // Adjust based on actual image type
        },
    };

    const result = await model.generateContent([prompt, image]);
    // console.log(result.response.text());
    return result.response.text();
};
