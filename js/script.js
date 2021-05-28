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

//Overall Color Palette
const colorarray = ['#2b2d2f', '#2678ec', '#7a49a5', '#aaffc3', '#5fe611', '#dcbeff',
'#82d5e1', '#469990', '#808000', '#f58231', '#c8c6a7', '#962d2d', '#d99879',
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

//random color Palette
let level = 4
let randomcolors = colorarray.slice(0, level).map(function () {
    return this.splice(Math.floor(Math.random() * this.length), 1)[0];
}, colorarray.slice())

function loadgamebox(){
  //Level 1 = 5 colors
  //level 2 = 10 colors
  //level 3 = 16 colors
  //let level = document.querySelectorbyID() - take level input from user
  //assign selected colors randomly to boxcolor
    for(let i=0; i<16; i++){
       boxcolor[i+1] = randomcolors[Math.floor(Math.random() * randomcolors.length)];
    }
    //loop the selection of boxIDs from HTML
    for(let i=0 ; i<16 ; i++){
    box[i+1].style.backgroundColor = `${boxcolor[i+1]}`
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
    window.setTimeout(showcolorpanel(), 5000)
  }
//show color panel
  function showcolorpanel(){
    let colorpanelbox = []
    const colorpanel = document.getElementsByClassName("colorpanel")[0]
    for(let i=0; i<randomcolors.length;i++){
      colorpanelbox[i+1]= document.createElement("button")
      colorpanel.appendChild(colorpanelbox[i+1])
      colorpanelbox[i+1].classList.add("colorpanelbox")
      colorpanelbox[i+1].style.backgroundColor = randomcolors[i]
    }
  }
}
//select a color from colorpanel
