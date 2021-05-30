/*
To help create a card.
*/
class Card {
    constructor(suit, rank, value) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
    }
}

/*
To create decks
*/
class Deck {
    constructor() {
        this.cards = [];
    }
    //function to create a deck of 52 cards.
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
var deck = new Deck();
var currentPlayer = 0;
// let deck = new Deck();
// deck.createDeck();
// deck.shuffleDeck();
// d.createDeck();
// console.log(deck.cards);
// d.shuffleDeck();
// console.log(d.shuffleDeck());

function startGame() {
    deck.createDeck();
    deck.shuffleDeck();
    document.getElementById('start').innerHTML = 'Restart';
    document.getElementById('players').style.visibility = 'visible';
    document.getElementById('hitme').style.visibility = 'visible';
    document.getElementById('stay').style.visibility = 'visible';
    document.getElementById('status').style.visibility = 'hidden';

    document.getElementById('hitme').disabled = false;
    document.getElementById('stay').disabled = false;
    currentPlayer = 0;
    createPlayers(2);
    createPlayersUI();
    dealHands();
}
function createPlayers(num) {
    players = [];
    for (var i = 1; i <= num; i++) {
        var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: [] };
        players.push(player);
    }
}

function createPlayersUI() {
    document.getElementById('players').innerHTML = '';
    for (var i = 0; i < players.length; i++) {
        var div_player = document.createElement('div');
        var div_playerid = document.createElement('div');
        var div_hand = document.createElement('div');
        var div_points = document.createElement('div');
        div_points.className = 'points';
        div_points.id = 'points_' + i;
        div_player.id = 'player_' + i;
        div_player.className = 'player';
        div_hand.id = 'hand_' + i;

        div_playerid.innerHTML = 'Player ' + players[i].ID;
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.getElementById('players').appendChild(div_player);
    }
}
function dealHands() {
    // alternate handing cards to each player
    // 2 cards each
    for (let i = 0; i < 2; i++) {
        for (let x = 0; x < players.length; x++) {
            var card = deck.cards.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
            updatePoints();
        }
    }
    document.getElementById('player_0').classList.add('active');
    check();
}
function renderCard(card, player) {
    var hand = document.getElementById('hand_' + player);
    var el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = card.rank + '<br/>' + card.suit;
    hand.appendChild(el);
}

// returns the number of points that a player has in hand
function getPoints(player) {
    var points = 0; 
    for (var i = 0; i < players[player].Hand.length; i++) {
        points += players[player].Hand[i].value;
    }
    players[player].Points = points;
    return points;
}

function updatePoints() {
    for (var i = 0; i < players.length; i++) {
        getPoints(i);
        let currPlayer = 'points_' + i;
        document.getElementById(currPlayer).innerHTML = players[i].Points;
    }
}

function hitMe() {
    // pop a card from the deck to the current player
    // check if current player new points are over 21
    var card = deck.cards.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    check();
    if (players[currentPlayer].Points >= 21) {
        end();
    }
}

function stay() {
    // move on to next player, if any
    console.log(currentPlayer); 
    if (currentPlayer == 0) {
        console.log('player changed');
        document
            .getElementById('player_' + currentPlayer)
            .classList.remove('active');
        currentPlayer += 1;
        document
            .getElementById('player_' + currentPlayer)
            .classList.add('active');
    } else {
        end();
    }
}
function end() {
    var winner = 1;
    var score = 0;

    for (let i = 0; i < players.length; i++) {
        if (players[i].Points > score && players[i].Points < 22) {
            winner = i;
        }
        score = players[i].Points;
    }

    document.getElementById('status').innerHTML =
        'Winner: Player ' + players[winner].ID;
    document.getElementById('status').style.display = 'inline-block';
    document.getElementById('status').style.visibility = 'visible';
    document.getElementById('hitme').disabled = true;
    document.getElementById('stay').disabled = true;
}

function check() {
    console.log('checking');
    let p1_points=players[0].Points;
    let p2_points=players[1].Points;

    console.log(`Player1 points:${p1_points}`);
    console.log(`Player2 points:${p2_points}`);
    if (p1_points > 21) {
        console.log('checked');
        document.getElementById('status').innerHTML =
            'Player 2: Wins';
        document.getElementById('status').style.display = 'inline-block';
        end();
    }else if(p2_points> 21){
        document.getElementById('status').innerHTML =
            'Player 1: Wins';
        document.getElementById('status').style.display = 'inline-block';
        end();
    }else if(p1_points == 21 && p2_points == 21){
        document.getElementById('status').innerHTML =
        'Draw';
        document.getElementById('status').style.display = 'inline-block';
        end();
    }
    else if(players[currentPlayer].Points == 21){
        console.log('Black jack');
        document.getElementById('status').innerHTML =
            'Player: ' + players[currentPlayer].ID + ' Won';
        document.getElementById('status').style.display = 'inline-block';
        end();
    }
}

window.addEventListener('load', function () {
    var deck = new Deck();
    deck.createDeck();
    deck.shuffleDeck();
    createPlayers(1);
});
