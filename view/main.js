const cuotesURL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';
window.state = new device.state({});

function random (r){
	const range = r||window.state.get('quotes').length; 
	return parseInt( Math.random()*range ); 
}

function newQuote(){
	window.state.set(state=>({ 
		quote: state.quotes[random()],
	}));
}

window.state.observeField('quote',(prev,act)=>{
	const {author, quote} = act, color = random(10);	
	_$('[color]').map((x)=>x.setAttribute('color',color));
	$('#author').innerText = author;
	$('#text').innerText = quote;
})

addEvent(window,'load',()=>{
	addEvent($('#new-quote'),'click',newQuote);
	fetch( cuotesURL ).then(async(res)=>{
		const { quotes } = await res.json();
		window.state.set({ 
			quote: quotes[random(quotes.length)],
			quotes: quotes, 
		});
	}).catch(e=>{ console.log(e) });
});
