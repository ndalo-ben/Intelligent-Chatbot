// script.js
document.addEventListener("DOMContentLoaded", function () {
    const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    // Function to display a message in the chat box
    function displayMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.textContent = `${sender}: ${message}`;
        chatBox.appendChild(messageElement);
    }

    // Event listener for the send button
    sendButton.addEventListener("click", function () {
        const userMessage = userInput.value;
        displayMessage(userMessage, "User");

        // Fetch the knowledge base JSON file
        fetch('knowledge_base.json')
            .then(response => response.json())
            .then(data => {
                const botResponse = getBotResponse(userMessage, data);
                displayMessage(botResponse, "Bot");
            })
            .catch(error => {
                console.error('Error:', error);
                displayMessage('An error occurred.', "Bot");
            });

        userInput.value = ""; // Clear the input field
    });

    // Function to get a response from the knowledge base
    function getBotResponse(userMessage, knowledgeBase) {
        for (const qaPair of knowledgeBase.questions) {
            if (qaPair.question === userMessage) {
                return qaPair.answer;
            }
        }
        return "I don't know the answer to that.";
    }
});
