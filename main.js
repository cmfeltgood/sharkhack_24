//alert("heck");


let mode = "none";
let grid = [["none","none","none","none"],
["none","none","none","none"],
["none","none","none","none"],
["none","none","none","none"],
["none","none","none","none"]];
let divGrid = grid;


function paintGrid(row, col) {
  grid[row][col] = mode;
}

function setMode(newMode){
  mode = newMode;
}

function getTemplateAreaString(){
  str = "";
  for (let i = 0; i < (grid.length); i++){
    str += "'";
    for (let j = 0; j < (grid[i].length) ; j++){
      str+= grid[i][j] + " ";
    }
    str += "'\n";
  }
  return str;
}

function setDivGrid(){
  divs = ["title","head1","t1"];

  //title loop
  let loop = true;
  let row = 0;
  let col = 0;
  while (loop){
    
  }
}

function hide(id){
  document.getElementById(id).style.display = 'none';
}

alert(getTemplateAreaString())