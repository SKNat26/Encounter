// ANIMAL REPORTS
// control booleans
let previewFull = false;

// input fields
let imageInput = document.getElementById("img-submit");
let locationInput = document.getElementById("loc-submit");
let nameInput = document.getElementById("name-submit");
let dateInput = document.getElementById("date-submit");
let scientificInput = document.getElementById("scientific-submit");
let extraInput = document.getElementById("extra-submit");
let taxonArea = document.querySelector("#taxon p");

let extraString = "";
    
const previewLeft = document.querySelector(".left-preview");
const previewRight = document.querySelector(".right-preview");

// ANIMAL API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b0164e8021msh9e0422ef936a5f6p166279jsnbe00b58f2c4f',
		'X-RapidAPI-Host': 'animaliapi3.p.rapidapi.com'
	}
};

// buttons
const submitBtn = document.getElementById("data-submit");
let taxonBtn = document.getElementById("find-taxon");
const addBtn = document.getElementById("add-more")
const confirmBtn = document.getElementById("confirm-response");

let extraInfo = document.createElement("p");

submitBtn.onclick = function (event) {
    event.preventDefault();

    if(imageInput.value == "" || locationInput.value == "" || nameInput.value == "" || dateInput.value == ""){
        alert("Please provide an image, location, date and a name!");
        previewFull = false;
    }
    else {
        //removes any previous info
        previewLeft.textContent = "";
        previewRight.textContent = "";

        let animalImage = document.createElement("img");
        let location = document.createElement("p");
        let animalName = document.createElement("p");
        let date = document.createElement("p");
        let extraInfoDiv = document.createElement("div");

        animalImage.classList.add("previewImg");
        location.classList.add("previewTxt");
        location.classList.add("locationColor");
        date.classList.add("previewDate")
        animalName.classList.add("previewTxt");
        animalName.classList.add("nameColor");
        extraInfo.classList.add("previewExtra");
        extraInfoDiv.classList.add("previewExtraDiv");

        animalImage.src = imageInput.value;
        location.innerHTML = locationInput.value;
        date.innerHTML = dateInput.value.substring(5,7) + "/" + dateInput.value.substring(8,11) + "/" + dateInput.value.substring(0,4);
        animalName.innerHTML = nameInput.value;
        extraInfo.innerHTML = extraInput.value;

        previewLeft.appendChild(animalImage);
        previewRight.appendChild(animalName);
        previewRight.appendChild(location);
        extraInfoDiv.appendChild(date);
        extraInfoDiv.appendChild(extraInfo);
        previewRight.appendChild(extraInfoDiv);
        
        if(scientificInput.value == ""){
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': 'be5579b406msh1f8c2d3ffe74664p193917jsn4f5339d2425a',
                    'X-RapidAPI-Host': 'animaliapi3.p.rapidapi.com'
                }
            };
            
            fetch(`https://animaliapi3.p.rapidapi.com/all/${processName(nameInput.value)}`, options)
                .then(response => response.json())
                .then(response => processAnimalInfo(response.animal))
                .catch(err => console.error(err));
        }
        previewFull = true;

    }
}

taxonBtn.onclick = function(event) {
    event.preventDefault();

    if(previewFull && scientificInput.value != "") {
        baseURL = "https://api.gbif.org/v1/";

        //gbif species match
        fetch(`${baseURL}species/match?name=${scientificInput.value}`)
            .then(function (response) {
                return response.json();
            })
            .then(retrieveTaxon)
            .catch(function (error) {
                console.log("Error during fetch:", error);
            });
    }
}

function retrieveTaxon(data) {
    taxonArea.innerHTML = "Taxon Key:"
    taxonArea.innerHTML += " ";
    taxonArea.innerHTML += data.usageKey;
}

let apiData = document.createElement("div");
let apiHeading = document.createElement("p");
let apiImage = document.createElement("img");
let apiIUCN = document.createElement("p");
let apiCoords = document.createElement("p");
let apiLocation = document.createElement("p");
let apiDate = document.createElement("p");

addBtn.onclick = function(event) {
    event.preventDefault();

    if(previewFull && scientificInput.value != ""){
        let seeMoreBtn = document.createElement("button");
        seeMoreBtn.innerHTML = "REVEAL/CLOSE";

        seeMoreBtn.onclick = function(event) {
            event.preventDefault();

            if(window.getComputedStyle(apiData).display == "none"){
                apiData.style.display = "flex";
            }
            else{
                apiData.style.display = "none";
            }
        }

        apiData.classList.add("apiData");
        apiHeading.classList.add("apiHeading");
        apiImage.classList.add("apiImage");
        apiIUCN.classList.add("apiIUCN");
        apiCoords.classList.add("apiCoords");
        apiLocation.classList.add("apiLocation");
        apiDate.classList.add("apiDate");
        seeMoreBtn.classList.add("seeMore");

        apiData.appendChild(apiHeading);
        apiData.appendChild(apiImage);
        apiData.appendChild(apiIUCN);
        apiData.appendChild(apiDate);
        apiData.appendChild(apiCoords);
        apiData.appendChild(apiLocation);

        previewRight.appendChild(seeMoreBtn);
        previewRight.appendChild(apiData);

        baseURL = "https://api.gbif.org/v1/";

        //gbif occurence search
        fetch(`${baseURL}occurrence/search?taxonkey=${taxonArea.innerHTML.substring(11)}&limit=1`)
            .then(response => response.json())
            .then(response => processOccurences(response,apiHeading,apiImage,apiIUCN,apiCoords,apiLocation,apiDate))
            .catch(function (error) {
                console.log("Error during fetch:", error);
            });
    }        
}

function processOccurences(data, heading, availableImg, iucnCat, coords, location, date) {
    const iucn = {
        "DD" : "Data Deficient",
        "LC" : "Least Concern",
        "NT" : "Near Threatened",
        "VU" : "Vulnerable",
        "EN" : "Endangered",
        "CR" : "Critically Endangered",
        "EW" : "Extinct in the Wild",
        "EX" : "Extinct",
        "NE" : "Not Evaluated"
    };

    let image = "";
    if(data.results[0].media.length != 0) {
        image = data.results[0].media[0].identifier;
    }

    heading.innerHTML = "Related to this Post:";
    availableImg.src = image;
    iucnCat.innerHTML = iucn[(data.results[0].iucnRedListCategory)];
    date.innerHTML = data.results[0].month + "/" + data.results[0].day + "/" + data.results[0].year;
    coords.innerHTML = data.results[0].decimalLatitude + ", " + data.results[0].decimalLongitude;
    location.innerHTML = data.results[0].country + ", " + data.results[0].stateProvince;
}

confirmBtn.onclick = function (event) {
    event.preventDefault();

    if(previewFull) {
        if(confirm("Are you sure you want to post this report?")) {
            updateDB();
            previewLeft.textContent = "";
            previewRight.textContent = "";
            imageInput.value = "";
            locationInput.value = "";
            dateInput.value = "";
            nameInput.value = "";
            extraInput.value = "";
            scientificInput.value = "";
            taxonArea.innerHTML = "";
            apiData.textContent = "";
            previewFull = false;
        }
    }
    else{
        alert("Please make sure all information is filled out and that you looked at the preview!");
    }
}

function updateDB() {
    const entry = {
        image: imageInput.value,
        location: locationInput.value,
        date: dateInput.value,
        name: nameInput.value,
        extra: extraInfo.innerHTML,
        moreHeading: apiHeading.innerHTML,
        moreImage: apiImage.src,
        moreIUCN: apiIUCN.innerHTML,
        moreDate: apiDate.innerHTML,
        moreCoords: apiCoords.innerHTML,
        moreLocation: apiLocation.innerHTML
    }

    submissionDatabase.push(entry);
}

function processName(name) {
    let newName = "";
    newName += name.substring(0,1).toUpperCase();
    newName += name.substring(1,name.length).toLowerCase();
    return newName;
}

function processAnimalInfo(data) {
    if(data != undefined){
        console.log(data);
        scientificInput.value = data.scientificname;
    }
}
