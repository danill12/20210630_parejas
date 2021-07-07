let cardsArray = () =>
{
    return Array.from(document.getElementsByClassName("card"));
}
reparte = () =>
{
    let myCards = cardsArray();

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
revealedCard = () =>
{   
    myCards = cardsArray();
    
        cardsArray().forEach(card =>
            {
                card.onclick = function()
                {
                    this.classList.toggle("revealed");
                };
                checkValue = checkPair();
                if (checkValue == false){
                    for (let i = 0; i < myCards.length; i++) {
                        myCards[i].classList.remove("revealed");
                    }
                }
            });
            
}
checkPair = () =>
{
    let uncover = Array.from(document.getElementsByClassName("revealed"))
    for (let i = 0; i < uncover.length; i++) {
        if (uncover[i] == "card red revealed"){
            return true
        }
        else{
            return false
        }
    }
}

window.onload = () =>
{
    reparte();
    revealedCard();
}