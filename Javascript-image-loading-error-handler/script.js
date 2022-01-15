const image = [
	{url: "https://i.imgur.com/gvHZvSW.jpg"},
	{url: "https://i.imgur.com/SosmyAe.jpg"},
	{url: "https://i.imgur.com/gcZMvY3.jpg"},
	{url: "https://error/404.jpg"} // This will be the unavailable image
]

init();

function init(){
	renderRandomImage(document.querySelector('#root'));
}

function randomNeBetween(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomImageUrl(){
	return image[randomNeBetween(0, image.length - 1)].url;
}

function renderRandomImage(where){
	console.log('Image loading...')
	const randomImageUrl = getRandomImageUrl();
	const image = document.createElement("img");
	image.src = randomImageUrl;
	
	image.onload = function(e){
		image.width = 400;
		where.appendChild(image);
		console.log('Image loading done...')
	}
	
	image.onerror = function(e){
		console.log('Image loading error! I try to load again...');
		renderRandomImage(where); //Recursion
	}
}
