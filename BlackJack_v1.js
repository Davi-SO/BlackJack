class Baralho  {
    cartas = 
    [   "2C.jpg","2D.jpg","2H.jpg","2S.jpg",
        "3C.jpg","3D.jpg","3H.jpg","3S.jpg",
        "4C.jpg","4D.jpg","4H.jpg","4S.jpg",
        "5C.jpg","5D.jpg","5H.jpg","5S.jpg",
        "6C.jpg","6D.jpg","6H.jpg","6S.jpg",
        "7C.jpg","7D.jpg","7H.jpg","7S.jpg",
        "8C.jpg","8D.jpg","8H.jpg","8S.jpg",
        "9C.jpg","9D.jpg","9H.jpg","9S.jpg",
        "10C.jpg","10D.jpg","10H.jpg","10S.jpg",
        "QC.jpg","QD.jpg","QH.jpg","QS.jpg",
        "JC.jpg","JD.jpg","JH.jpg","JS.jpg",
        "KC.jpg","KD.jpg","KH.jpg","KS.jpg",
        "AC.jpg","AD.jpg","AH.jpg","AS.jpg"]


    pull_card(){
        return this.cartas.splice(Math.floor(Math.random()*100)%this.cartas.length,1)
    }

}


var baralho = new Baralho

const divTeste = document.createElement('div')
document.body.appendChild(divTeste)

function determine_value(cardName,handValue){
    let value = cardName[0][0]
    if(value=="2")      return 2
    else if(value=="3") return 3
    else if(value=="4") return 4
    else if(value=="5") return 5
    else if(value=="6") return 6
    else if(value=="7") return 7
    else if(value=="8") return 8
    else if(value=="9") return 9
    else if(value=="1"||value=="Q"||value=="J"||value=="K") return 10
    else if(value=="A"){
        if(handValue<11)
            return 11
        else
            return 1
    }
}
function push_card(div,cardName){
    let carta = new Image(108)
    carta.src = "imgs/cards/" + cardName
    carta.alt = cardName 
    div.appendChild(carta)
}
class Player {
    hands = []
    handValue = 0

    determine_handValue(){
        let aceCount = 0;
        this.handValue=0
        for(let i=0;i<this.hands.length;i++){
            if (this.hands[i][0][0]=='A'){
                aceCount += 1; 
                continue;}
            this.handValue += determine_value(this.hands[i],this.handValue)}
        let i=0;
        while(aceCount>0) {
            this.handValue += determine_value(["A"],this.handValue)
            aceCount--
        }
    }
}
var player = new Player

function buy_card(){
    player.hands.push(baralho.pull_card())
    player.determine_handValue()
    push_card(divTeste,player.hands[player.hands.length-1])

}
buy_card()

//DOM script



const headVal = document.createElement('h1')
headVal.innerText = player.handValue
document.body.appendChild(headVal)
const divBtn = document.createElement('div')
document.body.appendChild(divBtn)
const resetBtn = document.createElement('button')
resetBtn.className = "botão"
resetBtn.innerText = "RESET"
resetBtn.disabled = true
resetBtn.type = "button"
const cartaBtn = document.createElement('button')
cartaBtn.className = "botão"
cartaBtn.innerText = "Carta"
cartaBtn.type = "button"
const msgDiv = document.createElement('div')
document.body.append(msgDiv) 
function comprar_carta(){
    buy_card()
    headVal.innerText = player.handValue
    if(player.handValue==21){
        endTxtMsg = document.createElement('h1')
        endTxtMsg.className = "endMsgW"
        endTxtMsg.innerText =  "! ! ! YOU WIN ! ! !"
        msgDiv.appendChild(endTxtMsg)
        cartaBtn.disabled = true
        resetBtn.disabled = false
    } 
    else if (player.handValue>21){
        endTxtMsg = document.createElement('h1')
        endTxtMsg.className = "endMsgL"
        endTxtMsg.innerText =  "! ! ! YOU LOSE ! ! !"
        msgDiv.appendChild(endTxtMsg)
        cartaBtn.disabled = true
        resetBtn.disabled = false

    }
}
cartaBtn.onclick = comprar_carta

resetBtn.onclick = ()=> window.location.href=location.href
divBtn.appendChild(cartaBtn)
divBtn.appendChild(resetBtn)
