let res;
let col;
let row;
let arr;

let gen;

let lastCalledTime = 0;
let callInterval = 50; 


function setup() {
  createCanvas(800, 800);
  res = 20;
  col = floor(width / res);
  row = floor(height / res);
    
  arr = new Array(col);
  
  for (let i = 0; i < arr.length; ++i) {
    arr[i] = new Array(row);
  }
  
  arr = randomly_complete(arr);
  
  gen = 1;
  textSize(30);
  
}

function randomly_complete(arr) {
  for (let i = 0; i < col; ++i) {
    for (let j = 0; j < row; ++j) {
      arr[i][j] = floor(random(2));
    }
  }
  
  return arr;
}

function getNeighbors(i, j, grid) {
  let neighbors = 0;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      let newX = i + dx;
      let newY = j + dy;
      // Vérifie si la cellule est à l'intérieur du tableau
      if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length) {
        // Exclut la cellule elle-même
        if (dx != 0 || dy != 0) 
            neighbors += grid[newX][newY];
        
      }
    }
  }

  return neighbors;
}

function rules(grid) {
  let nextGrid = JSON.parse(JSON.stringify(grid)); 
  
  for (let i = 0; i < col; ++i) {
    for (let j = 0; j < row; ++j) {
      let neighbors = getNeighbors(i, j, grid);
      let status = grid[i][j];
      
      if (status == 1 && (neighbors < 2 || neighbors > 3)) nextGrid[i][j] = 0;
      else if (status == 0 && neighbors == 3) nextGrid[i][j] = 1;
      else nextGrid[i][j] = status;
    }
  }
  
  return nextGrid;
}

function draw() {
  background(255); // Efface l'écran avant chaque dessin

  for (let i = 0; i < col; ++i) {
    for (let j = 0; j < row; ++j) {
      let x = i * res;
      let y = j * res;
      if (arr[i][j] == 1) { 
        fill(0);
        rect(x, y, res, res)
      }
      else {
        noFill();
        rect(x, y, res, res)
      }
    }
  }
  
    // 32 est le code de touche pour la barre d'espace
    if (keyIsDown(32) && millis() - lastCalledTime > callInterval) {
      let next = rules(arr);
      arr = next;
      lastCalledTime = millis();
      gen++;
    }
  
  fill(255, 0, 0);
  text(gen, 10, 40);
}

function keyPressed() {
  if (key === ' ') {
      let next = rules(arr);
      arr = next;
      lastCalledTime = millis();
      gen++;
  }
}
