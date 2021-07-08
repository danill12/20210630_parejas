var contador = 0
let contadorVictoria = 0
let contadorControl = 0
let contadorClick = 0
let options = [
    "red",
    "black",
    "blue",
    "green",
    "purple",
    "orange",
]  

let cardsArray = () => {
    //return Array.from(document.getElementsByClassName("card"));
    return Array.from(document.querySelectorAll(".card:not(.paired)"));
}

let revealedArray = () => {
    return Array.from(document.querySelectorAll(".revealed:not(.paired)"));
}

let reparte = () => {
    let myCards = cardsArray();

    console.log(myCards)
    let optionsDoubled = []

    for (let index = 0; index < options.length; index++) {
        optionsDoubled.push(options[index]);
        optionsDoubled.push(options[index]);
    }
    
    for (let i = 0; i < myCards.length; i++) {
        let position = Math.floor(Math.random() * optionsDoubled.length);
        myCards[i].classList.add(optionsDoubled[position]);
        optionsDoubled.splice(position, 1);
    }
}

let clickFunction = function() {

    contadorClick++
    console.log(`Contador de click: ${contadorClick}`)

    if (this.classList.contains("paired"))
        return

    if (!this.classList.contains("revealed")) {
        this.classList.add("revealed");
        contador++
    }

    console.log(`REVEAL: ${contador}`)

    if (contador == 2) {

        checkValue = checkPair();

        console.log(`checkValue: ${checkValue}`)

        revealed = revealedArray()

        if (checkValue) {
            for (let i = 0; i < revealed.length; i++) {
                revealed[i].classList.add("paired");
            }
        } else {
            setTimeout(() => {

                for (let i = 0; i < revealed.length; i++) {
                    revealed[i].classList.remove("revealed");
                }
            }, 550);
        }
        contador = 0
        if (cardsArray().length == 0)
            setTimeout(() => {
                alert("Victory")
                endGame();
            }, 100);
    }
}

let revealedCard = () => {
    myCards = cardsArray();

    myCards.forEach(card => {
        card.onclick = clickFunction
    });
}

let checkPair = () => {
    let revealed = revealedArray()
    let cartasDic = {};

    console.log('--------------------------')
    
    options.forEach(color => {
        revealed.forEach(card => {
            if(card.classList.contains(color)) {
                cartasDic[color] = (cartasDic[color] || 0) + 1;
            }
        })
    })

    contadorControl++

    for (let key in cartasDic) {
        console.log(`${cartasDic[key]} =`)
        if (cartasDic[key] == 2) {
            contadorVictoria++
        }
    }


    console.log(contadorControl)
    console.log(contadorVictoria)

    if (contadorVictoria == contadorControl) {
        contadorVictoria = 0
        contadorControl = 0
        return true
    } else {
        contadorControl--
        return false
    }
}


let endGame = () => {

    let contadorParejas = 0

    console.log(`Contador final: ${contadorClick}`)
    contadorParejas = (contadorClick / 2) - 7
    console.log(`Parejas erroneas: ${contadorParejas}`)
    setTimeout(() => {
        msg = `Has fallado ${contadorParejas} veces en encontrar la pareja ideal \nHas intentado ${contadorClick} veces hasta ganar la partida`
        document.getElementById('messages').innerHTML = msg
    }, 100);
}

window.onload = () => {
    reparte();
    revealedCard();
}