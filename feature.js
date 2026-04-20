import axios from "axios";
import FormData from "form-data";

export async function callApi() {

    const userToken = {
        // user1: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEyMywiYnVja2V0TmFtZSI6IkFSVFgxOVA2RjMiLCJwYXNzd29yZFRva2VuRXhwIjoiMjAyNi0wMy0yOCAxMTo1MTo1MSIsImlhdCI6MTc3NDYxMjMxMX0.DW6AW7-WMOGAv9Fba93uJzStmpCUic8Em53lDstKCsE",
        // user2: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mzk4LCJidWNrZXROYW1lIjoiV0lMUkc0Qk5WTiIsInBhc3N3b3JkVG9rZW5FeHAiOiIyMDI2LTA0LTIxIDA3OjMyOjI5IiwiaWF0IjoxNzc2NjcwMzQ5fQ.JGg-PQSrADGhwbFi982Lu0OH2N8ABW9BvBXRgUDr9wI",
        // user3: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ODk0LCJidWNrZXROYW1lIjoiS0lMNVpFSFpSVyIsInBhc3N3b3JkVG9rZW5FeHAiOiIyMDI2LTA0LTIxIDA3OjQ2OjEwIiwiaWF0IjoxNzc2NjcxMTcwfQ.Gs0ZSCw8cumlNDtqOdbNxfoWiTzOUNhd7aVg-CUG4Ms",
        // user4: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEwMiwiYnVja2V0TmFtZSI6IlJBTlk0OUFVNTMiLCJwYXNzd29yZFRva2VuRXhwIjoiMjAyNi0wNC0yMSAwNzo0ODowOCIsImlhdCI6MTc3NjY3MTI4OH0.p5ewunwfNs7dU0RoGrtEjezFbYj4to5g9N0aEFYvpRY"


        user1: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc0LCJidWNrZXROYW1lIjoiQU1BTzFORldUNyIsInBhc3N3b3JkVG9rZW5FeHAiOiIyMDI2LTA0LTIxIDA3OjUyOjIxIiwiaWF0IjoxNzc2NjcxNTQxfQ.4DqWhtzlz0vhCjATY_59K82wQb3Dfr5tao2QUPHboIc",
        user2: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgzLCJidWNrZXROYW1lIjoiVU5JT1hVSkUxSCIsInBhc3N3b3JkVG9rZW5FeHAiOiIyMDI2LTA0LTIxIDA3OjUzOjU3IiwiaWF0IjoxNzc2NjcxNjM3fQ.wJq-xB8yuYFy0rCQerSBgk6rcchs-GZEgjD1mGMryvg",
        user3: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg0LCJidWNrZXROYW1lIjoiVU5JNFc3OVpBWSIsInBhc3N3b3JkVG9rZW5FeHAiOiIyMDI2LTA0LTIxIDA3OjU0OjQ3IiwiaWF0IjoxNzc2NjcxNjg3fQ.W3iL6iTM3MiLGPL0JwR_b6HTHUNuRNE8dXFsAHXzt7o",
        user4: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg1LCJidWNrZXROYW1lIjoiVU5JNjBHTkNXMSIsInBhc3N3b3JkVG9rZW5FeHAiOiIyMDI2LTA0LTIxIDA3OjU1OjE2IiwiaWF0IjoxNzc2NjcxNzE2fQ.0s0EqQakPYxdGTvoFPeVWyeq1snTMv9ph_pWCkm8UbQ",
        user5: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg2LCJidWNrZXROYW1lIjoiVU5JQlFTVU4zWiIsInBhc3N3b3JkVG9rZW5FeHAiOiIyMDI2LTA0LTIxIDA3OjU1OjQyIiwiaWF0IjoxNzc2NjcxNzQyfQ.HHCx46OjPXFI1Q-6W5aJzNNl4oUdSw2heDTR8bJWPWQ"


    }



    Object.keys(userToken).forEach(async (key) => {
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
                        authorization: userToken[key]
                    },
                    maxBodyLength: Infinity // ✅ avoids large file issues
                }
            );

            console.log("Response:", response.data);

        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    });




}
 
