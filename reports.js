// ANIMAL REPORTS
// control booleans
let previewFull = false;

// input fields
let imageInput = document.getElementById("img-submit");
let locationInput = document.getElementById("loc-submit");
let nameInput = document.getElementById("name-submit");

const preview = document.getElementById("previewContent");

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
        alert("Please provide an image and a location!");
        previewFull = false;
    }
    else {
        //removes any previous info
        preview.textContent = "";

        let animalImage = document.createElement("img");
        let location = document.createElement("p");
        let animalName = document.createElement("p");

        animalImage.classList.add("previewImg");
        location.classList.add("previewTxt");
        animalName.classList.add("previewTxt");

        animalImage.src = imageInput.value;
        location.innerHTML = locationInput.value;
        animalName.innerHTML = nameInput.value;

        preview.appendChild(animalImage);
        preview.appendChild(animalName);
        preview.appendChild(location);

        function displayInfo(animal) {
            let scienceName = animal.scientificname;
            let kingdom = animal.kingdom;
            let order = animal.order;

            console.log(scienceName);
            console.log(kingdom);
            console.log(order);
        };

        fetch(`https://animaliapi3.p.rapidapi.com/all/${nameInput.value}`, options)
            .then(function (response) {
                return response.json();
            })

            .then(displayInfo)

            .catch(function (error) {
                console.log("Error during fetch:", error)
            });

        previewFull = true;
    }
}

function updateDB() {
    const entry = {
        image: imageInput.value,
        location: locationInput.value,
        name: nameInput.value
    }

    submissionDatabase.push(entry);
}

confirmBtn.onclick = function (event) {
    event.preventDefault();

    if(previewFull) {
        if(confirm("Are you sure you want to post this report?")) {
            updateDB();
            preview.textContent = "";
            previewFull = false;
        }
    }
    else{
        alert("Please make sure all information is filled out and that you looked at the preview!");
    }


}
