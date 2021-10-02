var visibility=1;	//1-видно корабли противника, 0-не видно

let field = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

/* field
0-пустая нестреляная клетка
1-клетка корабля
2-клетка корабля с попаданием
3-пустая клетка стрелянная
*/

let fieldPlayer = [
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];

let ships=[
	//палуб,угол, х1, у1, х2, у2
	[99,99,99,99,99,99],
	[99,99,99,99,99,99],
	[99,99,99,99,99,99],
	[99,99,99,99,99,99],
	[99,99,99,99,99,99],
	[99,99,99,99,99,99],
	[99,99,99,99,99,99],
	[99,99,99,99,99,99],
	[99,99,99,99,99,99],
	[99,99,99,99,99,99],
];

var startOfGame=false;
var angle;
var shipNumber=0;
var locationOp;
var location1; 

//основное выполнение программы начало

fillField(field);
cons(ships);		//проверка массива со значениями координат корабля (консоль)
perekid();
console.log(shipNumber);
var table = document.querySelector('#table1');
var table2 = document.querySelector('#table2');
fillTable(table, field, visibility);
fillTable(table2, fieldPlayer, 1);

//основное выполнение программы конец

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function setShip(field, deck){ //функция размещения кораблей до 10
	var permition= true;
	var a=0;
	while(permition){
		var permition2= false;
		angle= getRandomIntInclusive(0, 1);
		locationOp= getRandomIntInclusive(0, 9);
		location1 = getRandomIntInclusive(0, 10-deck);
	if (angle==1) {
		for (var i = locationOp-1; i <= locationOp+1; i++) {				//проверка на пересечения рабочая
			for (var j = location1-1; j <= location1+deck; j++) {
				for (var k = 0; k < 10; k++) {
					if ((j== ships[k][2] && i== ships[k][3])||(j== ships[k][4] && i== ships[k][5])) {
						permition2= true;
						console.log(++a);
					}
				}
			}
		}
	}else{
		for (var i = locationOp-1; i <= locationOp+1; i++) {
			for (var j = location1-1; j <= location1+deck; j++) {
				for (var k = 0; k < 10; k++) {
					if ((i== ships[k][2] && j== ships[k][3])||(i== ships[k][4] && j== ships[k][5])) {
						permition2= true;
						console.log(++a);
					}
				}
			}
		}
	}
	if (permition2== false) {
			permition= false;
		}
	}
	for (var i = 0; i < 6; i++) {		//забивка координат в массив
		var znachenie;
		switch(i){
			case 0: 
				znachenie= deck;
				break;
			case 1: 
				znachenie= angle;
				break;
			case 2: 
				if (angle== 0) {			
					znachenie= locationOp;
				}else{
					znachenie= location1;
				}
				break;
			case 3: 
				if (angle== 0) {			
					znachenie= location1;
				}else{
					znachenie= locationOp;
				}
				break;
			case 4: 
				if (angle== 0) {			
					znachenie= locationOp;
				}else{
					znachenie= location1+deck-1;
				}
				break;
			case 5: 
				if (angle== 0) {			
					znachenie= location1+deck-1;
				}else{
					znachenie= locationOp;
				}
				break;
			default:
				break;
		}
		ships[shipNumber][i]= znachenie;
	}
	shipNumber++;	
}

function perekid(){						//перекидівание значений координат кораблей на поле
	for (i=0; i<shipNumber; i++) {
		var x1= ships[i][2];
		var y1= ships[i][3];
		for (j=0; j<ships[i][0]; j++) {
			if (ships[i][1]==0) {
				field[y1][x1]=1;
				y1++;

			}else{
				field[y1][x1]=1;
				x1++;
			}		
		}
	}
}

function fillField(field){		//заполнение массива со значениями координат корабля
	setShip(ships, 4);
	setShip(ships, 3);
	setShip(ships, 3);
	setShip(ships, 2);
	setShip(ships, 2);
	setShip(ships, 2);
	setShip(ships, 1);
	setShip(ships, 1);
	setShip(ships, 1);
	setShip(ships, 1);
}

function cons(ships){		//проверка массива со значениями координат корабля
	for (var i = 0 ; i< 10; i++) {
		console.log(ships[i][0]+", "+ships[i][1]+", "+ships[i][2]+", "+ships[i][3]+", "+ships[i][4]+", "+ships[i][5]+", ");
		console.log("\n");
	}	
}

function fillTable(table, field, viz){
	for (var i = 0; i < field.length; i++) {
		var tr = document.createElement('tr');
		for (var j = 0; j < field[i].length; j++) {
			var td = document.createElement('td');
			td.style.backgroundSize= "cover";
			//td.innerHTML = field[i][j];  //проверка, значение элемента массива в клетке
			switch(field[i][j]){
				case 0:
					td.style.backgroundImage = "url('pust.jpg')";
					break;
				case 1:
					if(viz){
						td.style.backgroundImage = "url('korabl.jpg')";}
					else{
						td.style.backgroundImage = "url('pust.jpg')";	
					}
					break;
				case 2:
					td.style.backgroundImage = "url('popal.jpg')";
					break;
				case 3:
					td.style.backgroundImage = "url('mimo.jpg')";
					break;
				default:
					break;
			}
			td.cordinateY= i;
			td.cordinateX= j;
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

table.onclick = function(event) {				//выстрел
	if(startOfGame){
	let target = event.target; // где был клик?

	if (target.tagName != 'TD') return; // не на TD? тогда не интересует

	var resultat= "hunta Kievskaya";

	  	switch(field[target.cordinateY][target.cordinateX]){			//здесь проверка содержимого и изменение результата в массиве
	  		case 0:
	  		resultat= "miss";
	  		field[target.cordinateY][target.cordinateX]=3;
	  		break;
	  		case 1:
	  		resultat= "BADABUM PIPISH";
	  		field[target.cordinateY][target.cordinateX]=2;
	  		break;
	  		case 2:
	  		resultat= "tI CHO zastyl?";
	  		break;
	  		case 3:
	  		resultat= "pryamo nastolko kosoy?";
	  		break;
	  		default:
	  		resultat= "kak ty suda popal?";
	  		break;
	  	}
	console.log("Y-"+target.cordinateY+"   X-"+target.cordinateX+"   "+resultat+"   ");

	document.querySelectorAll('td').forEach(el => el.remove());		//очиста стола от ячеек
	document.querySelectorAll('tr').forEach(el => el.remove());		//очистка стола от строк

	fillTable(table, field, visibility);
	fillTable(table2, fieldPlayer, 1);
	}
};

table2.onclick = function(event) {				//выстрел
  
  let target = event.target; // где был клик?

  if (target.tagName != 'TD') return; // не на TD? тогда не интересует

  	var resultat= "hunta Kievskaya";

  	switch(fieldPlayer[target.cordinateY][target.cordinateX]){			//здесь проверка содержимого и изменение результата в массиве
  		case 0:
  		resultat= "miss";
  		fieldPlayer[target.cordinateY][target.cordinateX]=3;
  		break;
  		case 1:
  		resultat= "BADABUM PIPISH";
  		fieldPlayer[target.cordinateY][target.cordinateX]=2;
  		break;
  		case 2:
  		resultat= "tI CHO zastyl?";
  		break;
  		case 3:
  		resultat= "pryamo nastolko kosoy?";
  		break;
  		default:
  		resultat= "kak ty suda popal?";
  		break;
  	}
  console.log("Y-"+target.cordinateY+"   X-"+target.cordinateX+"   "+resultat+"   ");

  document.querySelectorAll('td').forEach(el => el.remove());		//очиста стола от ячеек
  document.querySelectorAll('tr').forEach(el => el.remove());		//очистка стола от строк

  fillTable(table, field, visibility);
  fillTable(table2, fieldPlayer, 1);
  startOfGame= true;
};