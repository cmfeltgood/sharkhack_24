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
  if (squares.length == 0) {return "header fail";}
  row = squares[0][0];
  for (i in squares){
    if (squares[i][0] != row){return "header fail";}
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
}

function hide(id){
  document.getElementById(id).style.display = 'none';
}


setDivGrid()

//alert(getTemplateAreaString())