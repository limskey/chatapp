const chatForm = document.querySelector('#chat-form');
const userInput = document.querySelector('#user-input');
const chatList = document.querySelector('#chat-list');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Send user input to ChatGPT API backend
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message: userInput.value })
  });
  const data = await response.json();

  // Display ChatGPT response in chat list
  const chatItem = document.createElement('li');
  chatItem.textContent = `User: ${userInput.value}`;
  chatList.appendChild(chatItem);

  const chatResponse = document.createElement('li');
  chatResponse.textContent = `ChatGPT: ${data.response}`;
  chatList.appendChild(chatResponse);

  // Clear input field
  userInput.value = '';
});
