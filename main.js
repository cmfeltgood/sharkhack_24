//alert("heck");


let mode = "none";
let grid = [["none","none","none","none"],
["none","none","none","none"],
["none","none","none","none"],
["none","none","none","none"],
["none","none","none","none"]];



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



alert(getTemplateAreaString())