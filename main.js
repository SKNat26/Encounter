// FRONT PAGE MAIN JS

const chatBox = document.getElementById("chatDiv");

submissionDatabase.on("child_added", addReport);

function addReport(rowData) {
    const reportObject = rowData.val();

    let reportDiv = makeReportHTML(reportObject.image, reportObject.location, reportObject.date, reportObject.name, reportObject.extra, reportObject.moreHeading, reportObject.moreImage, reportObject.moreIUCN, reportObject.moreDate, reportObject.moreCoords, reportObject.moreLocation);

    chatBox.append(reportDiv);
}

function makeReportHTML(imageSrc, locationTxt, dateTxt, nameTxt, extraTxt, moreHeadingTxt, moreImageTxt, moreIUCNTxt, moreDateTxt, moreCoordsTxt, moreLocationTxt) {
    //user
    let report = document.createElement("div");
    let rightReport = document.createElement("div");
    let leftReport = document.createElement("div");
    let animalImage = document.createElement("img");
    let date = document.createElement("p");
    let location = document.createElement("p");
    let animalName = document.createElement("p");
    let apiData = document.createElement("div");
    let apiHeading = document.createElement("p");
    let apiImage = document.createElement("img");
    let apiIUCN = document.createElement("p");
    let apiCoords = document.createElement("p");
    let apiLocation = document.createElement("p");
    let apiDate = document.createElement("p");
    let extraInfo = document.createElement("p");
    let extraInfoDiv = document.createElement("div");
    let seeMoreBtn = document.createElement("button");

    animalImage.classList.add("previewImg");
    location.classList.add("previewTxt");
    location.classList.add("locationColor");
    date.classList.add("previewDate")
    animalName.classList.add("previewTxt");
    animalName.classList.add("nameColor");
    extraInfo.classList.add("previewExtra");
    extraInfoDiv.classList.add("previewExtraDiv");
    apiData.classList.add("apiData");
    apiHeading.classList.add("apiHeading");
    apiImage.classList.add("apiImage");
    apiIUCN.classList.add("apiIUCN");
    apiCoords.classList.add("apiCoords");
    apiLocation.classList.add("apiLocation");
    apiDate.classList.add("apiDate");
    seeMoreBtn.classList.add("seeMore");
    rightReport.classList.add("right-preview");
    leftReport.classList.add("left-preview");
    report.classList.add("report");

    animalImage.src = imageSrc;
    location.innerHTML = locationTxt;
    date.innerHTML = dateTxt;
    animalName.innerHTML = nameTxt;
    extraInfo.innerHTML = extraTxt;
    apiHeading.innerHTML = moreHeadingTxt;
    apiImage.src = moreImageTxt;
    apiIUCN.innerHTML = moreIUCNTxt;
    apiCoords.innerHTML = moreCoordsTxt;
    apiLocation.innerHTML = moreLocationTxt;
    apiDate.innerHTML = moreDateTxt;

    seeMoreBtn.innerHTML = "REVEAL/CLOSE";

    seeMoreBtn.onclick = function(event) {
        event.preventDefault();
        if(apiHeading.innerHTML != ""){
            if(window.getComputedStyle(apiData).display == "none"){
                apiData.style.display = "flex";
            }
            else{
                apiData.style.display = "none";
            }
        }
    }

    extraInfoDiv.appendChild(date);
    extraInfoDiv.appendChild(extraInfo);
    apiData.appendChild(apiHeading);
    apiData.appendChild(apiImage);
    apiData.appendChild(apiIUCN);
    apiData.appendChild(apiDate);
    apiData.appendChild(apiCoords);
    apiData.appendChild(apiLocation);
    leftReport.appendChild(animalImage);
    rightReport.appendChild(animalName);
    rightReport.appendChild(location); 
    rightReport.appendChild(extraInfoDiv);
    rightReport.appendChild(seeMoreBtn);
    rightReport.appendChild(apiData); 
    
    report.appendChild(leftReport);
    report.appendChild(rightReport);

    return report;
}
