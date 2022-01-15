window.matchMedia('(prefers-color-scheme:dark)').addEventListener('change', e=> {
	const color = e.matches? 'dark': 'light'
	console.log('Color scheme changed to ' + color)
	styletoggle.checked = e.matches;
	styletoggle.disabled = e.matches;
	styletoggle.dataset.content = (e.matches)? '🔒' : '';
})

document.addEventListener('DOMContentLoaded', e=>{
	if(window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches){
		styletoggle.checked = true;
		styletoggle.disabled = true;
		styletoggle.dataset.content = '🔒';
	}
})
