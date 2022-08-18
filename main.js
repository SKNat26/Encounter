// FRONT PAGE MAIN JS
// variables
const usernameInput = document.getElementById("username-input")
const textInput = document.getElementById("text-input");
const submitButton = document.getElementById("submit-button");

// clicking the submit button
submitButton.onclick = function(event) {
    event.preventDefault();
    if(usernameInput.value == "" || textInput.value == ""){
        alert("Fill out all fields");
    }
    else{
        const entry = { // database records entry
            username: usernameInput.value,
            message: textInput.value
        };
    
        messageDatabase.push(entry);
        textInput.value = '';
    }
}

const chatBox = document.getElementById("chatDiv");

messageDatabase.on("child_added", addTextMessage);

function addTextMessage(rowData) {
    const messageObject = rowData.val();

    let messageDiv = makeSingleMessageHTML(messageObject.username, messageObject.message);
    
    chatBox.appendChild(messageDiv);
}

function makeSingleMessageHTML(usernameTxt, messageTxt) {
    let message = document.createElement("p");
    message.innerHTML = `${usernameTxt}: ${messageTxt}`;

    return message;
}

submissionDatabase.on("child_added", addReport);

function addReport(rowData) {
    const reportObject = rowData.val();

    let reportDiv = makeReportHTML(reportObject.image, reportObject.location, reportObject.name, reportObject.extra);

    chatBox.append(reportDiv);
}

function makeReportHTML(imageSrc, locationTxt, nameTxt, extraTxt) {
    let report = document.createElement("div");
    let rightReport = document.createElement("div");
    let leftReport = document.createElement("div");
    let animalImage = document.createElement("img");
    let location = document.createElement("p");
    let animalName = document.createElement("p");
    let extraInfo = document.createElement("p");

    animalImage.classList.add("previewImg");
    location.classList.add("previewTxt");
    animalName.classList.add("previewTxt");
    extraInfo.classList.add("previewExtra");
    rightReport.classList.add("right-preview");
    leftReport.classList.add("left-preview");
    report.classList.add("report");

    animalImage.src = imageSrc;
    location.innerHTML = locationTxt;
    animalName.innerHTML = nameTxt;
    extraInfo.innerHTML = extraTxt;

    leftReport.appendChild(animalImage);
    rightReport.appendChild(animalName);
    rightReport.appendChild(location); 
    rightReport.appendChild(extraInfo); 
    
    report.appendChild(leftReport);
    report.appendChild(rightReport);

    return report;
}
