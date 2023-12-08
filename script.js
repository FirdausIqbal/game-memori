
const icons =[
  "fas fa-sun",
  "fas fa-bicycle",
  "fas fa-bolt",
  "fas fa-bomb",
  "fas fa-cube",
  "fas fa-leaf",
  "fas fa-paper-plane",
  "fas fa-star",
]
const gameBoard = document.querySelector('.game-board');
const cards = [...icons, ...icons, ...icons]
let skor = 0;
let kartuPertama, kartuKedua, kartuKetiga;
let kunciKartu = false;

function acak(arr){
  for (let i=arr.length-1; i>0; i--){
    let j = Math.floor(Math.random() * (i));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr;
  
}

function buatCard(icon){
  const card = document.createElement("div");
  card.classList.add("kartu");
  card.innerHTML=`
  <div class="isi-kartu">
    <div class="depan"><i class="${icon}"></i></div>
    <div class="belakang"></div>
  </div>`
  card.addEventListener('click', putarCard)
  return card;
}

function putarCard(){
  if (kunciKartu) return;
  if(kartuPertama === this) return;
  
  this.classList.add("flipped")
  if(!kartuPertama){
    kartuPertama = this;
    return;
  }
  if(!kartuKedua){
    kartuKedua = this;
    return;
  } 
  kartuKetiga= this;

  
  cekCard();
}

function cekCard(){
  let x = kartuPertama.querySelector(".depan i").className;
  let y = kartuKedua.querySelector(".depan i").className;
  let z = kartuKetiga.querySelector(".depan i").className;
  if (x === y && y === z && z === x){
    skor += 1;
    hapusAnimasi();
    return;
  }
  kembalikanCard();
  
}

function hapusAnimasi(){
  kartuPertama.removeEventListener('click', putarCard)
  kartuKedua.removeEventListener('click', putarCard)
  kartuKetiga.removeEventListener('click', putarCard)
  reset();
}

function kembalikanCard(){
  kunciKartu = true;
  setTimeout(() => {
    kartuPertama.classList.remove("flipped")
    kartuKedua.classList.remove("flipped")
    kartuKetiga.classList.remove("flipped")
    
    reset()
  }, 1000)
}

function reset(){
  [kartuPertama, kartuKedua] = [null, null];
  kunciKartu = false;
  if(skor === 8){
    alert("asd");
    return;
  }
}

function init(){
  const acakCards = acak(cards);
  acakCards.forEach(icon => {
    gameBoard.appendChild(buatCard(icon))
    
  });
}
init()

function openGame(){
  let pn = document.querySelector("#player-name").value;
  let game = document.querySelector(".game-board");
  
  document.querySelector(".header").innerHTML = `Selamat Bermain ${pn}`;
  game.style.visibility = "visible"
}