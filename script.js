let idList = [];
let usedCards = [];
let cardValues = [];
let clickedCards = [];
let correctCards = [];
let gridGen = false;
let clickCount = 0;
function generateGrid() {
	clickCount = 0;
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
		clickedCards.length = 0;
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
	clickCount++;
	let p = document.getElementById(this.id);
	if(clickedCards.includes(Number(p.id))===false){
		if(clickedCards.length<2){
			p.innerHTML = cardValues[usedCards[p.id]];
			clickedCards.push(p.id);
		}
		check();
		if(clickedCards.length === 2 && correct === false){
			window.setTimeout(function(){
				document.getElementById(clickedCards[0]).innerHTML = "";
				document.getElementById(clickedCards[1]).innerHTML = "";
				clickedCards.length = 0;}, 2000)
		}
	}
	if(correctCards.length === idList.length){
		document.write("<div style='width: 100%; height: 100vh; background: linear-gradient(#42f4a1, #4741f4);'>" +
		"<div style='font-size: 20vw; text-align: center; width: 100%; margin: 0 auto; box-sizing: border-box;'>" +
		"You Won!" + "</div>" + "<div style='text-align: center; width: 60%; font-size: 5vw; box-sizing: border-box; margin: 0 auto;'>" +
		"You successfully matched all the cards in " + Math.round(clickCount/2) + " tries" + "</div>" + "<div style='box-sizing: border-box; width: 50%; margin: 0 auto; text-align: center;'>" +
		"<button onclick='reload()' style='width: 200px; height: 100px; font-size: 40px'>" + "Restart" + "</button>" + "</div>" + "</div>");
	}
	console.log("clickedCards", clickedCards);
}

let correct = false;
function check(){
	if(cardValues[usedCards[Number(clickedCards[0])]]===cardValues[usedCards[Number(clickedCards[1])]] && clickedCards[0]!==clickedCards[1]){
		document.getElementById(clickedCards[0]).style.background = "#93ff93";
		document.getElementById(clickedCards[1]).style.background = "#93ff93";
		correctCards.push(clickedCards[0].id);
		correctCards.push(clickedCards[1].id);
		correct = true;
		clickedCards.length = 0;
	}else{
		correct = false;
	}
}

function reload(){
	location.reload();
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
