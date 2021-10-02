var guess;
var hits = 0;
var guesses = 0;
var victory=false;


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}


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

/*
0-пустая нестреляная клетка
1-клетка корабля
2-клетка корабля с попаданием
3-пустая клетка стрелянная
*/

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

var angle;
var shipNumber=0;
var locationOp;
var location1; 


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

	/*	for (var i = 0; i < 10; i++) {
			if (angle=0) {			//проверка по пересечениям
				if (locationOp>=ships[i][2]-1 && locationOp<=ships[i][4]+1 && location1>=ships[i][3]-1 &&  location1+deck-1<= ships[i][5]+1) {	//проверка вертикальная
					permition2= true;
				}
			}else if(angle=1){
				if (location1>=ships[i][2]-1 && location1+deck-1<=ships[i][4]+1 && locationOp>=ships[i][3]-1 && locationOp<= ships[i][5]+1) {	//проверка горизонтальная
					permition2= true;
				}
			}
		}
	*/


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



/*   РАБОЧЕЕ РАЗМЕЩЕНИЕ ОДНОГО КОРАБЛЯ
function setShip(field, deck){
	
	angle= getRandomIntInclusive(0, 1);
	locationOp= getRandomIntInclusive(0, 9);
	location1 = getRandomIntInclusive(0, 10-deck);

		 
	
					
	for (var i = 0; i < deck; i++) {
		if( angle==0){
			field[location1][locationOp]=1;		//вертикальное размещение
			location1++;
		}
		else{
			field[locationOp][location1]=1;		//горизонтальное размещение
			location1++;
		}
	}
}  */
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


fillField(field);
cons(ships);		//проверка массива со значениями координат корабля
perekid();
console.log(shipNumber);
var table = document.querySelector('#table1');

function fillTable(table, field){
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
				td.style.backgroundImage = "url('korabl.jpg')";
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
			
			/*td.onclick= function pokazat(){
			console.log("Y-"+td.cordinateY+"   X-"+td.cordinateX);
			};*/    // неправильный вывод координат при клике v.2. Ошибка в том что координаты выводятся только у последнего элемента

			//alert("Y-"+td.cordinateY+"   X-"+td.cordinateX);  //проверка, задаются ли в свойства объекта координаты

			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
}

/*var td= document.querySelector("td");
td.onclick= function(){
console.log("Y-"+td.cordinateY+"   X-"+td.cordinateX);
}*/   // неправильный вывод координат при клике v.1. Ошибка в .querySelectorALL


//var el = document.querySelectorAll('td'); 
//el.remove();					//очистка стола для обновления рабочая вроде А НИХУЯ НЕ РАБОЧАЯ ниже незакоменчено

fillTable(table, field);

table.onclick = function(event) {				//выстрел
  
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

  fillTable(table, field);
};























/*
for (var i = 0; i < 10; i++) {
	for (var j = 0; j < 10; j++) {
		document.write(field[i][j]);
	}
	document.write("\n");
	
}

/*while (victory == false){
	guess= -1;
	while(guess<0 || guess>6){
	guess = prompt ( "шут ми 0-6");
	}
	guesses++;
	if (guess==location1||guess==location2||guess==location3){
		alert("попал");
		hits++;
		if(hits==3){
			victory= true;
			alert("пабедЯ");
		}
	}
	else{
		alert("мимо");
	}
	
}
alert("выстрелов: "+guesses+". точность: "+(3/guesses));
*/