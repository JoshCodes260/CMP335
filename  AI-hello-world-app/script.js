function displayGreeting() {
    const userInput = document.getElementById('nameInput').value;
    const greetingMessage = document.getElementById('greetingMessage');
    greetingMessage.textContent = `Hello ${userInput}`;
}

document.getElementById('submitButton').addEventListener('click', displayGreeting);