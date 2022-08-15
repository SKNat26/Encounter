// FRONT PAGE MAIN JS
// variables
const messageDatabase = firebase.database().ref();
const usernameInput = document.getElementById("username-input")
const textInput = document.getElementById("text-input");
const submitButton = document.getElementById("submit-button");

// clicking the submit button
submitButton.onclick = function(event) {
    event.preventDefault();

    const entry = { // database records entry
        username: usernameInput.value,
        message: textInput.value
    };

    messageDatabase.push(entry);
    textInput.value = '';
}

const chatBox = document.getElementById("chatDiv");

messageDatabase.on("child_added", addTextMessage);

function addTextMessage(rowData) {
    const messageObject = rowData.val();
    console.log(messageObject);

    let messageDiv = makeSingleMessageHTML(messageObject.username, messageObject.message);
    
    chatBox.appendChild(messageDiv);
}

function makeSingleMessageHTML(usernameTxt, messageTxt) {
    let message = document.createElement("p");
    message.innerHTML = `${usernameTxt}: ${messageTxt}`;

    return message;
}

// SUBMISSION MAIN JS
// variables
const submissionDatabase = firebase.database().ref();
const imgInput = document.getElementById("img-submit");
const locationInput = document.getElementById("loc-submit");
const nameInput = document.getElementById("name-submit");
const dataSubmit = document.getElementById("data-submit");
const confirmButton = document.getElementById("confirm-response")
const previewBox = document.getElementById("preview-content");


// clicking submit button
dataSubmit.onclick = function() {

}

confirmButton.onclick = function(){

}