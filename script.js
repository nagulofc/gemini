// Replace with your Google Gemini API endpoint and key
const GOOGLE_GEMINI_API_KEY = "AIzaSyByhvSz52Q0znHLepxvSUifAcwzcA9E90M"; // Add your API Key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyByhvSz52Q0znHLepxvSUifAcwzcA9E90M"; // Sample endpoint

// Select DOM elements
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");

// Send user input to the chatbot
async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  // Display user message
  addMessage("You", userMessage);

  // Make API call
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GOOGLE_GEMINI_API_KEY}`,
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await response.json();
    const botMessage = data?.choices[0]?.message?.content || "I'm not sure how to respond.";
    addMessage("Bot", botMessage);
  } catch (error) {
    console.error("Error:", error);
    addMessage("Bot", "Sorry, there was an error processing your message.");
  }

  userInput.value = ""; // Clear input
}

// Add a message to the chat display
function addMessage(sender, text) {
  const message = document.createElement("div");
  message.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
}

// Event listener for the send button
sendButton.addEventListener("click", sendMessage);

// Optional: Allow Enter key to send messages
userInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    sendMessage();
  }
});
