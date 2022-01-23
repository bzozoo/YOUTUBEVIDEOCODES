render()

async function render(){
		const data = await getRandomJokeFromRandomUser();
		if(data) document.querySelector('#root').innerHTML = TemplateComponent(data);
}

async function getRandomJokeFromRandomUser(){
	const user = await getRandomUser();
	const norrisJoke = await getChuckNorrisJoke();
	return (user && norrisJoke)? {...user.results[0], ...norrisJoke} : false;
}

async function getRandomUser(){
	const response = await fetch('https://randomuser.me/api/?results=1&inc=name,picture&format=pretty');
	return response.status === 200? response.json() : false;
}

async function getChuckNorrisJoke(){
	const response = await fetch('https://api.chucknorris.io/jokes/random');
	return response.status === 200? response.json() : false;
}

function TemplateComponent({name, picture, value}){
	return `
		<div id="panel">
			<div id="persondatas">
				<div id="photo">
					<img src="${picture.large}" />
				</div>
				<div id="name">
					${name.title} ${name.first} ${name.last}
				</div>
			</div>
			
			<div id="chucknorrisjoke">
				<p class="bubble speech">${value}</p>
			</div>
		</div>
		`;
}

document.querySelector("#newjoke").addEventListener('click', render);
