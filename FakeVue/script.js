let FakeVue = function (options){
	console.log(options)
	this.elem = document.querySelector(options.selector);
	this.data = options.data;
	this.template = options.template;
}

FakeVue.prototype.render = function (){
	this.elem.innerHTML = this.template(this.data);
}

let app = new FakeVue({
	selector: '#app',
	data: {
		heading: 'MyToDos',
		todos: ['Swim', 'Climb', 'Jump', 'Play']
	},
	template: function(props){
		return `
			<h1>${props.heading}</h1>
			<ul>
				${props.todos.map((todo)=>{
						return `<li>${todo}</li>`
		}).join('')
	}
			</ul>
		`
	}
})

app.render();

//Thanks for the watching!!!
