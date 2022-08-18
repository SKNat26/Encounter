// ANIMAL REPORTS
// control booleans
let previewFull = false;

// input fields
let imageInput = document.getElementById("img-submit");
let locationInput = document.getElementById("loc-submit");
let nameInput = document.getElementById("name-submit");
let extraInput = document.getElementById("extra-submit");

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
const confirmBtn = document.getElementById("confirm-response");

submitBtn.onclick = function (event) {
    event.preventDefault();

    if(imageInput.value == "" || locationInput.value == ""){
        alert("Please provide an image, location, and a name!");
        previewFull = false;
    }
    else {
        //removes any previous info
        previewLeft.textContent = "";
        previewRight.textContent = "";

        let animalImage = document.createElement("img");
        let location = document.createElement("p");
        let animalName = document.createElement("p");
        let extraInfo = document.createElement("p");

        animalImage.classList.add("previewImg");
        location.classList.add("previewTxt");
        animalName.classList.add("previewTxt");
        extraInfo.classList.add("previewExtra");

        animalImage.src = imageInput.value;
        location.innerHTML = locationInput.value;
        animalName.innerHTML = nameInput.value;
        extraInfo.innerHTML = extraInput.value;

        previewLeft.appendChild(animalImage);
        previewRight.appendChild(animalName);
        previewRight.appendChild(location);
        previewRight.appendChild(extraInfo);

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'be5579b406msh1f8c2d3ffe74664p193917jsn4f5339d2425a',
                'X-RapidAPI-Host': 'animaliapi3.p.rapidapi.com'
            }
        };
        
        fetch(`https://animaliapi3.p.rapidapi.com/all/${processName(nameInput.value)}`, options)
            .then(response => response.json())
            .then(response => processAnimalInfo(response.animal,extraInfo))
            .catch(err => console.error(err));

        previewFull = true;
    }
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
            nameInput.value = "";
            extraInput.value = "";
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
        name: nameInput.value,
        extra: extraString
    }

    submissionDatabase.push(entry);
}

function processName(name) {
    let newName = "";
    newName += name.substring(0,1).toUpperCase();
    newName += name.substring(1,name.length).toLowerCase();
    return newName;
}

function processAnimalInfo(data,extra) {
    if(data != undefined){
        console.log(data);
        extra.innerHTML += `<br/><br/>Class Name: ${data.classname}<br/>Family: ${data.family}<br/>Genus: ${data.genus}<br/>Kingdom: ${data.kingdom}<br/>Order: ${data.order}<br/>Phylum: ${data.phylum}<br/>Scientific Name: ${data.scientificname}`;
        extraString = extra.innerHTML;
    }
}
