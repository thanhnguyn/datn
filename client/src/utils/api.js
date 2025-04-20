import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

export const postData = async (url, formData) => {
    try {
        const response = await fetch(apiUrl + url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`,//Include your API key in the Authorization
                "Content-Type": 'application/json' //Adjust the content type as needed
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            return errorData;
        }


    } catch (error) {
        console.error("Error: " + error);
    }
}