// Will be used to create card 
class Card{
    constructor(suit,rank,value){
        this.suit=suit;
        this.rank=rank;
        this.value=value;
    }

}

class Deck{
    constructor(){
        this.cards=[];
    }
    createDeck() {
        // array of suits , ranks and their respective values in blackjack.
        let suits = ['♠', '♣', '♥', '♦']; //['clubs', 'diamonds', 'hearts', 'spades'];
        let ranks = [
            'A',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            'J',
            'Q',
            'K',
        ];
        let values = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this.cards.push(new Card(suits[i], ranks[j], values[j]));
            }
        }
    }
    //function to shuffle the deck
 shuffleDeck() {
    //shuffling the deck of 52 cards before dealing.

    // 150 turns

    for (let i = 0; i < 200; i++) {
        //randomly select 2 cards from the deck and swap them.
        let l1 = Math.floor(Math.random() * this.cards.length);
        let l2 = Math.floor(Math.random() * this.cards.length);

        //swapping the values
        let tmp = this.cards[l1];
        this.cards[l1] = this.cards[l2];
        this.cards[l2] = tmp;
    }
}

}

/*
class which deals with creating players.
*/
class Players{
    constructor(name,id,type){
        this.players={
            name:name,
            id:id,
            type:type,
            cards:[]
        }
    }    
}

// function to create players.
function createPlayers(num){
    var players=new Players();
    let playerArr=[];
    for(let i=1;i<=num;i++){
        if(i==num){
            //dealer
            playerArr.push(new Players(`Dealer`,i,"d"));
        }else{
            playerArr.push(new Players(`Player${i}`,i,"p"));
        }
    }
    console.log(playerArr);
}


/*
Testing
*/

// 1.createPlayers function return values are checked. 
createPlayers(2);