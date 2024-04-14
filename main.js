//alert("heck");


let mode = "none";
let grid = [["title","title","none","none"],
["body","body","none","body"],
["header","header","header","none"],
["none","none","body","body"],
["body","none","none","none"]];
let divGrid;


function paintGrid(row, col) {
  const prev = grid[row][col]
  grid[row][col] = mode;
  const back = refreshElements();
  if (back!= 0){grid[row][col] = prev}
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
  divGrid = []
  for (i in grid){
    divGrid.push([]);
    for (j in grid[i]){
      divGrid[i].push(grid[i][j])
    }
  }

  divs = [];


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
  // if (squares.length == 0) {return "title fail";}
  if (squares.length != 0){
    divs.push("title");
    row = squares[0][0];
    for (i in squares){
      if (squares[i][0] != row){
        alert("Don't put the title in multiple rows!")
        return("title fail");
      }
    }
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
  if (squares.length != 0){
    divs.push("head0")
    row = squares[0][0];
    for (i in squares){
      if (squares[i][0] != row){
        alert("Don't put the header in multiple rows!")
        return "header fail";
      }
    }
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
  const divs = setDivGrid();
  if (divs == "title fail"){return 1}
  else if (divs == "header fail"){return 2}
  const main = document.getElementById("gc");
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  
  main.style.gridTemplateAreas = getTemplateAreaString();
  let div;
  //alert(divs);
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
      div.appendChild(inner);
    }
    else if (divs[i].charAt(0) == 'n'){div.className = 'none';}
    div.className += " grid-item";
    main.appendChild(div);
  }
  stopOverflow();
  return 0;
}

function stopOverflow() {
  var body = document.getElementsByClassName("body");
  body[0].firstElementChild.innerHTML = "Simmons University in Fenway was the scene of an unprecedented event today when a shark was found on the premises. The university's security personnel were alerted to the situation when the shark was detected in the university's aquatic center. Fortunately, no students or staff were harmed in this incident. The authorities were quickly alerted and the situation was handled swiftly. The shark was safely removed from the premises and released back into the ocean by a team of marine biologists. Simmons University is committed to the safety and well-being of all students and staff. The university has launched a full investigation into the circumstances surrounding this incident and will take necessary measures to prevent any such occurrences in the future. Simmons University is grateful for the quick response of the security personnel and the authorities, which led to the situation being resolved without any harm to anyone involved. The university will continue to work closely with the authorities to ensure the safety of all its members.";
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

function changeColor(hexDark, hexLight){
  const root = document.querySelector(':root');
  root.style.setProperty('--bgDark', hexDark);
  root.style.setProperty('--bgLight', hexLight);
}

//alert(getTemplateAreaString())

function moveOverlay(){
  const textGrid = document.getElementById("gc");
  const rect = textGrid.getBoundingClientRect();
  const overlay = document.getElementById("overlay");
  overlay.style.top = rect.y + "px";
  overlay.style.left = rect.x + "px";
}

moveOverlay();
window.addEventListener("resize", moveOverlay);

refreshElements();