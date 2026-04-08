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
            "https://unitedtribes.techcedence.net/business-api/api/moments/upload",
            formData,
            {
                headers: {
                    ...formData.getHeaders(), // ✅ VERY IMPORTANT
                    authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEyMywiYnVja2V0TmFtZSI6IkFSVFgxOVA2RjMiLCJwYXNzd29yZFRva2VuRXhwIjoiMjAyNi0wMy0yOCAxMTo1MTo1MSIsImlhdCI6MTc3NDYxMjMxMX0.DW6AW7-WMOGAv9Fba93uJzStmpCUic8Em53lDstKCsE"
                },
                maxBodyLength: Infinity // ✅ avoids large file issues
            }
        );

        console.log("Response:", response.data);

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
    }
}
