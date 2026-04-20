import axios from "axios";
import FormData from "form-data";

export async function callApi() {
    try {

        // ✅ Get image as stream (NOT blob)
        const imageResponse = await axios.get(
            "https://picsum.photos/1920/1080?random=" + Math.random(),
            { responseType: "stream" }
        );

        const formData = new FormData();

        formData.append("shareWith", "All Tribes");
        formData.append("documentModel[0].order", "1");

        // ✅ Pass stream instead of blob
        formData.append(
            "documentModel[0].media",
            imageResponse.data,
            {
                filename: "image.jpg",
                contentType: "image/jpeg"
            }
        );

        formData.append("entityType", "moment");
        formData.append("tribeId", "81");
        formData.append("L1tribeId", "5");
        formData.append("L2tribeId", "2");

        const response = await axios.post(
            "https://unitedtribes.com/business-api/api/moments/upload",
            formData,
            {
                headers: {
                    ...formData.getHeaders(), // ✅ VERY IMPORTANT
                    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzY3LCJidWNrZXROYW1lIjoiV0lMQUNJNE1WRyIsInBhc3N3b3JkVG9rZW5FeHAiOiIyMDI2LTA0LTIxIDA1OjM2OjEyIiwiaWF0IjoxNzc2NjYzMzcyfQ.ynjeQXcCq4l36ap3VomEsNXFQAUhyR_yaNkxvcLjTLw"
                },
                maxBodyLength: Infinity // ✅ avoids large file issues
            }
        );

        console.log("Response:", response.data);

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    }
}
