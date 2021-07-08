var contador = 0

let cardsArray = () =>
{
    //return Array.from(document.getElementsByClassName("card"));
    return Array.from(document.querySelectorAll(".card:not(.paired)"));

}

let revealedArray = () =>
{
    return Array.from(document.getElementsByClassName("revealed"));
}


let reparte = () =>
{
    let myCards = cardsArray();

    console.log(myCards)



    let options = [
        "red",
        "red",
        "black",
        "black",
    ]

    for (let i = 0; i < myCards.length; i++) {
        let position = Math.floor(Math.random() * options.length);
        myCards[i].classList.add(options[position]);
        options.splice(position, 1);
    }
}

let clickFunction = function() {

    if (this.classList.contains("paired"))
        return

    if (this.classList.contains("revealed"))
    {
        //this.classList.remove("revealed");
        //contador--
    }
    else
    {
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
        }
        else {
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
            }, 100);
    }
}

let revealedCard = () =>
{   
    myCards = cardsArray();
    
    myCards.forEach(card =>
    {
        card.onclick = clickFunction
    });            
}

let checkPair = () =>
{
    let revealed = revealedArray()
    let cartasRojas = 0
    let cartasNegras = 0

    for (let i = 0; i < revealed.length; i++) {
        if (revealed[i].classList.contains("red")) 
            cartasRojas++
        if (revealed[i].classList.contains("black")) 
            cartasNegras++
    }
    if (cartasRojas == 2 || cartasNegras == 2)
        return true
    
    return false
}

window.onload = () =>
{
    reparte();
    revealedCard();
}