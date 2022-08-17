// ANIMAL API
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'b0164e8021msh9e0422ef936a5f6p166279jsnbe00b58f2c4f',
		'X-RapidAPI-Host': 'animaliapi3.p.rapidapi.com'
	}
};

fetch(`https://animaliapi3.p.rapidapi.com/all/${animalName}`, options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));