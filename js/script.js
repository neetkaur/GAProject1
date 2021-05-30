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
'#cbe8e8', '#ce97b0','#eba83a']

function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}
//array for HTML box IDs
const boxarray = ['box1','box2','box3','box4',
'box5','box6','box7','box8',
'box9','box10','box11','box12',
'box13','box14','box15','box16']
let boxcolor=[]
let box = []
let done = 0
let error = 0
let counter = 0
for(let i=0 ; i<16 ; i++){
box[i+1] = document.getElementById(`${boxarray[i]}`)
//box[i+1].style.backgroundColor = `${boxcolor[i]}`
}

//random color Palette
let level = 4
let randomcolors = colorarray.slice(0, level).map(function () {
    return this.splice(Math.floor(Math.random() * this.length), 1)[0];
}, colorarray.slice())

let colorpanelbox = []
const colorpanel = document.getElementsByClassName("colorpanel")[0]
let currentcolor = []
let colornow = ""


function loadgamebox(){

  //assign selected colors randomly to boxcolor "ORIGINAL STATE"
    for(let i=0; i<16; i++){
       boxcolor[i+1] = randomcolors[Math.floor(Math.random() * randomcolors.length)];
    }
    //loop the selection of boxIDs from HTML
    for(let i=0 ; i<16 ; i++){
    box[i+1].style.backgroundColor = `${boxcolor[i+1]}`
    }


  window.setTimeout(makeblink, 2000)

  function makeblink(){
    for(let i=0 ; i<16 ; i++){
    box[i+1].classList.toggle("blink_me")
    }
    window.setTimeout(makeboxgrey, 2000)
  }

  function makeboxgrey(){
    for(let i=0 ; i<16 ; i++){
    box[i+1].style.backgroundColor = "grey"
    box[i+1].classList.toggle("blink_me")
    }
    window.setTimeout(showcolorpanel(), 2000)
  }
//show color panel
  function showcolorpanel(){
    for(let i=0; i<randomcolors.length;i++){
      colorpanelbox[i+1]= document.createElement("button")
      colorpanel.appendChild(colorpanelbox[i+1])
      colorpanelbox[i+1].classList.add("colorpanelbox")
      colorpanelbox[i+1].style.backgroundColor = randomcolors[i]
    }
    gameStarts()
  }
  //select a color from colorpanel
  function gameStarts(){
    //showTimer()
    let timeLeft = 5;
    let elem = document.getElementById('timetext');
    let heart = document.getElementById('heart')
    heart.classList.remove("noshow")
    let timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
            gameover("timeover")
        } else {
            elem.innerHTML = timeLeft
            timeLeft--;
            //selectAndPutColor()
        }
    }
    // selectColorFromPanel()
    // clickGameGrid()
  function selectAndPutColor(){
    colorlist = document.querySelectorAll('.colorpanelbox')
    for(let i=0; i<colorlist.length;i++){
      colorlist[i].addEventListener("click", function(){
        currentcolor[i] = colorlist[i].style.backgroundColor
        colornow = colorlist[i].style.backgroundColor
        counter++
       })
     }//forloop ends
    for(let i=0;i<16;i++){
      box[i+1].addEventListener("click",function(){
        if(boxcolor[i+1] === RGBToHex(colornow) ){
          done++
          box[i+1].classList.add("transiton")
          box[i+1].style.backgroundColor = colornow
          if(done===16){gameover("16done")}
                  //sound ting
        }
        else{
          error++
          if(error === 5){gameover("5error")}
          //sound tong
        }
      })
    }
  }//setputcolorends
  selectAndPutColor()
 }//gamestarts ends
 function gameover(evt){
   console.log(evt)
   let elem = document.getElementById('timetext');
   let heart = document.getElementById('heart')
   heart.classList.add("noshow")
   elem.classList.add("noshow")
   for(let i=0;i<16;i++)
   box[i+1].classList.add("noshow")
   colorpanel.classList.add("noshow")


   let gameoverdiv = document.createElement('div')
   gameoverdiv.classList.add("gameover")
   document.body.appendChild(gameoverdiv)

   if(evt === "timeover"){
   gameoverdiv.innerHTML="TIME OVER"
   }
   if(evt === "16done"){
     gameoverdiv.innerHTML="CONGRATULATIONS!!!! You won....."

   }
   if(evt === "5error"){
     gameoverdiv.innerHTML="AWWWWWW....You need to boost your memory"

   }
 }


}//loadgamebox ends
