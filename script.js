let idList = [];
let usedCards = [];
let cardValues = [];
let gridGen = false;
function generateGrid() {
	let p = document.getElementById("amount");
	let squares = Number(p.value);
	if(squares>100){
		p.style.background="#ff8c8c";
		p.value = "";
		p.placeholder = "Please enter a number between 1 and 100";
		gridGen = false;
	}else if(squares%2!==0) {
		p.style.background="#ff8c8c";
		p.value = "";
		p.placeholder = "Please enter an even number so every card has a match!";
		gridGen = false;
	}
	else {
		p.style.background="#93ff93";
		let grid = document.getElementById("cardGrid");
		while (grid.firstChild) {
    		grid.removeChild(grid.firstChild);
		}
		let factors=[];
		idList.length = 0;
		usedCards.length = 0;
		cardValues.length = 0;
		factors.length = 0;
		for(let i=1; i<squares; i++){
			if(squares%i===0){
				factors.push(i);
			}
		}
		let height = factors[Math.floor(factors.length/2)];
		let width = squares/height;
		for(let i=0; i<height; i++) {
			grid.appendChild(document.createElement("tr"));
		}
		let tableRows = document.getElementsByTagName("tr");
		let cardCount = -1;
		for(let i=0; i<tableRows.length; i++){
			for(let j=0; j<width; j++){
				let element = document.createElement("td");
				cardCount++;
				element.id = cardCount;
				element.onclick = flipCard;
				tableRows[i].appendChild(element);
			}
		}
		for (let i=0; i<squares; i++){
			idList.push(i);
		}
		console.log(idList);
		gridGen = true;
	}
	assignValues(gridGen);
}

function assignValues(gridGen){
	let squares = Number(document.getElementById("amount").value);
	if(gridGen){
		let valueMax = squares / 2;
		while(usedCards.length!=squares){
			let randomValue = Math.floor(Math.random()*squares);
			if(usedCards.includes(randomValue)){

			}else{
				usedCards.push(randomValue);
			}
		}
		for(let i=1; i<valueMax+1; i++){
			cardValues.push(i);
			cardValues.push(i);
		}
		console.log("used cards", usedCards);
		console.log("card values", cardValues);
	}
}

function flipCard(){
	let p = document.getElementById(this.id);
	p.innerHTML = cardValues[usedCards[Number(p.id)]];
	window.setTimeout(function reEmpty(){p.innerHTML=''}, 5000);
}
/*function addElement(parentId, elementTag, elementId, html){
	var p = document.getElementById(parentId);
	var newElement = document.createElement(elementId);
	newElement.setAttribute('class', elementClass);
	newElement.innerHTML = html;
	p.appendChild(newElement);
}

function removeElement(elementClass){
	var length = document.getElementsByClassName(elementClass).length;
	var i = length-1;
	while(i >= 0){
		var element = document.getElementsByClassName(elementClass)[i];
		var elementPar = element.parentNode;
		i--;
	}
}*/
