//Overall Color Palette
const colorarray = ['#2b2d2f', '#2678ec', '#7a49a5', '#aaffc3', '#5fe611', '#dcbeff',
'#82d5e1', '#469990', '#808000', '#f58231', '#c8c6a7', '#962d2d', '#d99879',
'#cbe8e8', '#ce97b0','#eba83a']

function RGBToHex(rgb) {
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
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

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

 const playagain = document.getElementsByClassName('playagain')
 let over = document.getElementsByClassName("gameover")
// function wip(){
//   over.innerHTML="This is WIP :) ........  Refresh the browser"
// }


//All audios for universal access
const audio_start = document.getElementById("A")
const audio_gameblink = document.getElementById("F")
const audio_selectcolor = document.getElementById("B")
const audio_correctbox = document.getElementById("C")
const audio_wrongbox = document.getElementById("D")
const audio_intro = document.getElementById("H")
const audio_playgame = document.getElementById("I")
const audio_hb = document.getElementById("J")
const audio_win = document.getElementById("K")
const audio_lose = document.getElementById("L")
const audio_timeover = document.getElementById("M")
const audio_clockticking = document.getElementById("N")
audio_intro.loop = true
audio_clockticking.loop = true
audio_clockticking.volume = .5

//array for HTML box IDs
const boxarray = ['box1','box2','box3','box4',
'box5','box6','box7','box8',
'box9','box10','box11','box12',
'box13','box14','box15','box16']
let boxcolor=[]
let box = []
let done = 0
let error = 0
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
const reminder = document.getElementsByClassName("scroll-right")
let currentcolor = []
let colornow = ""
let timerId=""


function loadgamebox(){
  audio_start.play()
  const intro = document.getElementsByClassName("start")
  intro[0].classList.add("noshow")
  sleep(300)
  audio_intro.play()

  const grid = document.getElementsByClassName("gamebox")
  grid[0].classList.remove("noshow")
  reminder[0].classList.remove("noshow")


  //assign selected colors randomly to boxcolor "ORIGINAL STATE"
    for(let i=0; i<16; i++){
       boxcolor[i+1] = randomcolors[Math.floor(Math.random() * randomcolors.length)];
    }
    //loop the selection of boxIDs from HTML
    for(let i=0 ; i<16 ; i++){
    box[i+1].style.backgroundColor = `${boxcolor[i+1]}`
    }

  window.setTimeout(makeblink, 12000)

  function makeblink(){
    audio_intro.pause()
    sleep()
    audio_gameblink.play()
    for(let i=0 ; i<16 ; i++){
    box[i+1].classList.toggle("blink_me")
    }
    window.setTimeout(makeboxgrey, 4000)
  }

  function makeboxgrey(){
    reminder[0].classList.add("noshow")
    audio_gameblink.pause()
    audio_intro.play()
    for(let i=0 ; i<16 ; i++){
    box[i+1].style.backgroundColor = "grey"
    box[i+1].classList.toggle("blink_me")
    }
    window.setTimeout(showcolorpanel(), 2000)
    sleep(200)
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
    audio_clockticking.play()
    let timeLeft = 60;
    let timetext = document.getElementById('timetext')
    let heart = document.getElementById('heart')
    timerId = setInterval(countdown, 1000)

    function countdown() {
      timetext.classList.remove("noshow")
        if (timeLeft === 0) {
            clearTimeout(timerId);
            gameover("timeover")
        } else {
          timetext.innerHTML = timeLeft
          if(timeLeft <= 10 && timeLeft >0 && error !== 10 && done !== 16 ){
            heart.classList.toggle("noshow")
            audio_intro.pause()
            audio_hb.play()
            }
          timeLeft--;
          }
    }

  function selectAndPutColor(){
    colorlist = document.querySelectorAll('.colorpanelbox')
    for(let i=0; i<colorlist.length;i++){
      colorlist[i].addEventListener("click", function(){
        audio_selectcolor.play()
        currentcolor[i] = colorlist[i].style.backgroundColor
        colornow = colorlist[i].style.backgroundColor
       })
     }//forloop ends
    for(let i=0;i<16;i++){
      box[i+1].addEventListener("click",function(){
        if(boxcolor[i+1] === RGBToHex(colornow) ){
          done++
          console.log(done)
          audio_correctbox.play()
          box[i+1].classList.add("transiton")
          box[i+1].style.backgroundColor = colornow
          if(done===16){gameover("16done")}
                  //sound ting
        }
        else{
          audio_wrongbox.play()
          error++
          if(error === 10){gameover("5error")}
          //sound tong
        }
      })
    }
  }//setputcolorends
  selectAndPutColor()
 }//gamestarts ends
 function gameover(evt){
   audio_intro.pause()
   audio_hb.pause()
   audio_clockticking.pause()
   clearTimeout(timerId);
   let timetext = document.getElementById('timetext');
   let heart = document.getElementById('heart')
   heart.classList.add("noshow")
   timetext.classList.add("noshow")
   for(let i=0;i<16;i++)
   box[i+1].classList.add("noshow")
   colorpanel.classList.add("noshow")

   let gameenddiv = document.getElementsByClassName("gameend")
   let gameoverdiv = document.createElement('div')
   gameoverdiv.classList.add("gameover")
   gameenddiv[0].appendChild(gameoverdiv)

   if(evt === "timeover" && done !== 16 && error !== 10){
   gameoverdiv.innerHTML="TIME OVER"
   audio_timeover.play()
   playagain[0].classList.remove("noshow")
   playagain[0].addEventListener('onclick',function(){
     gameoverdiv.innerHTML="This is WIP :) ........  Refresh the browser"
   })
   }
   if(evt === "16done"){
     gameoverdiv.innerHTML="CONGRATULATIONS!!!! YOU WON....."
     audio_win.play()
     playagain[0].classList.remove("noshow")
     playagain[0].addEventListener('onclick',function(){
       gameoverdiv.innerHTML="This is WIP :) ........  Refresh the browser"
     })

   }
   if(evt === "5error"){
     gameoverdiv.innerHTML="YOU NEED A MEMORY BOOSTER"
     audio_lose.play()
     playagain[0].classList.remove("noshow")
     playagain[0].addEventListener('onclick',function(){
       gameoverdiv.innerHTML="This is WIP :) ........  Refresh the browser"
     })
   }

 }


}//loadgamebox ends
