//alert("heck");


let mode = "none";
let grid = [["title","title","none","none"],
["body","body","none","body"],
["header","header","header","none"],
["none","none","body","body"],
["body","none","none","none"]];
let divGrid = grid;


function paintGrid(row, col) {
  grid[row][col] = mode;
}

function setMode(newMode){
  mode = newMode;
}

function getTemplateAreaString(){
  str = "";
  for (let i = 0; i < (divGrid.length); i++){
    str += "'";
    for (let j = 0; j < (divGrid[i].length) ; j++){
      str+= divGrid[i][j] + " ";
    }
    str += "'\n";
  }
  return str;
}

function setDivGrid(){
  divs = ["title","head0"];
  divGrid = grid;


  //title loop
  let loop = true;
  let row = 0;
  let col = 0;
  let squares = [];
  while (loop){
    if (grid[row][col] == "title"){
      squares.push([row, col]);
    }
    col ++;
    if (col == grid[row].length){
      col = 0;
      row ++;
      if (row == grid.length){loop = false;}
    }
  }
  if (squares.length == 0) {return "title fail";}
  row = squares[0][0];
  for (i in squares){
    if (squares[i][0] != row){return "title fail";}
  }

  //header loop
  loop = true;
  row = 0;
  col = 0;
  squares = [];
  while (loop){
    if (grid[row][col] == "header"){
      squares.push([row, col]);
      divGrid[row][col] = "head0";
    }

    col ++;
    if (col == grid[row].length){
      col = 0;
      row ++;
      if (row == grid.length){loop = false;}
    }
  }
  if (squares.length == 0) {return "header fail 1";}
  row = squares[0][0];
  for (i in squares){
    if (squares[i][0] != row){return "header fail 2";}
  }


  //body loop
  loop = true;
  row = 0;
  col = 0;
  squares = [];
  let curr = -1;
  let scan = false;
  while (loop){
    if (grid[row][col] == "body"){
      if (!scan){
        scan = true;
        curr += 1;
        divs.push("b"+curr);
      }
      divGrid[row][col] = "b"+curr;
    }
    else if (scan){scan = false;}

    col ++;
    if (col == grid[row].length){
      scan = false;
      col = 0;
      row ++;
      if (row == grid.length){loop = false;}
    }
  }


  //none loop
  loop = true;
  row = 0;
  col = 0;
  squares = [];
  curr = 0;
  while (loop){
    if (grid[row][col] == "none"){
      divGrid[row][col] = "n"+curr;
      divs.push("n"+curr);
      curr += 1;
    }

    col ++;
    if (col == grid[row].length){
      col = 0;
      row ++;
      if (row == grid.length){loop = false;}
    }
  }
  return divs;
}

function hide(id){
  document.getElementById(id).style.display = 'none';
}


function refreshElements(){
  const main = document.getElementById("gc");
  // for (i in main.children){
  //   alert(i);
  //   main.removeChild(i);
  // }
  const divs = setDivGrid();
  main.style.gridTemplateAreas = getTemplateAreaString();
  let div;
  alert(divs);
  let inner;
  for (i in divs){
    div = document.createElement("div");
    div.id = divs[i];
    
    //alert(i)
    if (divs[i] == "title"){
      div.className = 'title';
      inner = document.createElement("h1");
      inner.innerHTML = "SHARKS ATTACK SIMMONS!!!";
      div.appendChild(inner);
    }
    else if (divs[i].charAt(0) == "h"){
      div.className = 'header';
      inner = document.createElement("h3");
      inner.innerHTML = "THE SHARKS WERE QUITE SPOOKYYYYY!!!!";
      div.appendChild(inner);
    }
    else if (divs[i].charAt(0) == "b"){
      div.className = 'body';
      inner = document.createElement("p");
      inner.innerHTML = "God damn these sharks were rough. But also gay? The sharks were involved in homosexual activities, which was fun. God damn these sharks were rough. But also gay? The sharks were involved in homosexual activities, which was fun. God damn these sharks were rough. But also gay? The sharks were involved in homosexual activities, which was fun. God damn these sharks were rough. But also gay? The sharks were involved in homosexual activities, which was fun."
      div.appendChild(inner)
    }
    else if (divs[i].charAt(0) == 'n'){div.className = 'none';}
    div.className += " grid-item"
    main.appendChild(div);
  }
  stopOverflow()
}

function stopOverflow() {
  var body = document.getElementsByClassName("body");
  for (let i = 0; i < body.length-1; i++) {
    b1 = body[i];
    p1 = body[i].firstElementChild;
    b2 = body[i+1];
    p2 = body[i+1].firstElementChild;

    var p1text = p1.innerHTML;
    p1text = p1text.split(' ');

    b1Height = b1.offsetHeight;
    p1Height = p1.offsetHeight;

    var p2text = []
    while (p1Height > b1Height) {
      char = p1text.pop();
      p2text.unshift(char);

      p1temp = p1text.join(' ');
      p1.innerHTML = p1temp;
      p1Height = p1.offsetHeight;
    }
    p2.innerHTML = p2text.join(' ');
  }
}

function moveOverflowBody() {
  var b0 = document.getElementById('b0');
  var p0 = document.getElementById('b0 p')
  var b1 = document.getElementById('b1')
  var p1 = document.getElementById('b1 p')
  var b0Height = b0.height();
  var p1Height = p0.height();

  var p0text = p0.text();
  p0text = p0text.split('');
  

}


//alert(getTemplateAreaString())

refreshElements();