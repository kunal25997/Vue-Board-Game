class game{
    constructor(){
        // A boolean value to ensure that if there is no winner that means game is in progress. 
        this.inProgress = true;
        // This will ensure the winner of the game.
        this.winner = null; // "O" or "X"
        // This will determine the player's turn
        this.currentTurn = game.O; //Game "O"
        // How many moves are made ? 
        this.movesMade = 0;

        this.canvas = new Array(9).fill().map( s => new canvas() );
    }

    // Method 1: "i" will be the index of the square where a move is to be made.
    makeMove(i) {
        if(this.inProgress && !this.canvas[i].value){
            this.canvas[i].value = this.currentTurn;

            this.movesMade++;
            this.checkWinner();
            this.currentTurn = (this.currentTurn === game.O) ? game.X : game.O;
        }
    }

    // Method 2: This method will check for winner once a move is made.
    checkWinner(){
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        winningCombinations.forEach((wc) => {
            const [a,b,c] = wc;
            const cnA = this.canvas[a];
            const cnB = this.canvas[b];
            const cnC = this.canvas[c];

            if(cnA.value && cnA.value === cnB.value && cnA.value === cnC.value) {
                //Game is not in progress anymore
                this.inProgress = false;
                this.winner = cnA.value; // "O" or "X"
                cnA.isHighlighted = cnB.isHighlighted = cnC.isHighlighted = true;
            }
        }); 

        //Check for tie
        if(this.movesMade === this.canvas.length){
            this.inProgress = false;
        }
    }
}

//This will be used for comparisons and to set the value of squares.
game.O = 'O';
game.X = 'X';