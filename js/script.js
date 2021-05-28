class player{
  constructor(name, level){
    this.name=name;
    this.level=level;
  }
}

class gamebox{
  constructor(colornum){
    this.colornum = colornum
  }
}
const colorarray = ['#fabed4', '#ffd8b1', '#fffac8', '#aaffc3', '#ce9797', '#dcbeff',
'#a9a9a9', '#469990', '#808000', '#f58231', '#c8c6a7', '#962d2d', '#d99879',
'#afb9c8', '#ce97b0','#eba83a']

//array for HTML box IDs
const boxarray = ['box1','box2','box3','box4',
'box5','box6','box7','box8',
'box9','box10','box11','box12',
'box13','box14','box15','box16']
let boxcolor=[]
let box = []
for(let i=0 ; i<16 ; i++){
box[i+1] = document.getElementById(`${boxarray[i]}`)
//box[i+1].style.backgroundColor = `${boxcolor[i]}`
}

function loadgamebox(){
//Level 1 = 5 colors
//level 2 = 10 colors
//level 3 = 16 colors
//let level = document.querySelectorbyID() - take level input from user
  let level = 5
  //select random colors from colorarray
  let randomcolors = colorarray.slice(0, level).map(function () {
      return this.splice(Math.floor(Math.random() * this.length), 1)[0];
  }, colorarray.slice())

  //assign selected colors randomly to boxcolor
  for(let i=0; i<16; i++){
     boxcolor[i+1] = randomcolors[Math.floor(Math.random() * randomcolors.length)];
  }

  //loop the selection of boxIDs from HTML
  for(let i=0 ; i<16 ; i++){
  box[i+1].style.backgroundColor = `${boxcolor[i]}`
  }
}

window.setTimeout(makeblink, 5000)

function makeblink(){
  for(let i=0 ; i<16 ; i++){
  box[i+1].classList.toggle("blink_me")
  }
  window.setTimeout(makeboxgrey, 5000)
}

function makeboxgrey(){
  for(let i=0 ; i<16 ; i++){
  box[i+1].style.backgroundColor = "grey"
  box[i+1].classList.toggle("blink_me")

  }
}
