import axiosClient from './axiosClient';

export const chatbotAPI = {
    sendMessage: async (message) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
            return await response.json();
        } catch (error) {
            console.log('error', error);
        }
    },
};
