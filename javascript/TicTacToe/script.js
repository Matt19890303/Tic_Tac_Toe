// https://github.com/javascriptacademy-stash/tic-tac-toe/blob/master/index.js

window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const annnounce = document.querySelector('.display announcer hide');

    let board = ['','','','','','','','','',];
    let currentPlayer = 'X';
    let isGameActive = true;

    // End Game State
    const playerXwon = 'PLAYER X WINS';
    const playerOwon = 'PLAYER O WINS';
    const tie = "TIE";

        // Indices within the board
        // [0] [1] [2]
        // [3] [4] [5] 
        // [6] [7] [8]


        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];




        function handleResultValidation() {
            let roundWon = false;
            for (let i = 0; i <= 7; i++) {
                const winCondition = winningConditions[i];
                const a = board[winCondition[0]];
                const b = board[winCondition[1]];
                const c = board[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }
    
        if (roundWon) {
                announce(currentPlayer === 'X' ? playerXwon : playerOwon);
                isGameActive = false;
                return;
            }
    
        if (!board.includes(''))
            announce(tie);
        }





        const announce = (type) => {
            switch(type){
                case playerOwon:
                    announce.innerHTML = 'Player <span class="playerO">O</span> Won';
                    break;
                case playerXwon:
                    announce.innerHTML = 'Player <span class="playerX">X</span> Won';
                    break;
                case tie:
                    announce.innerHTML = 'Tie! Try Again';
            }
            annnounce.classList.remove('hide');
        };




        const isValidAction = (tile) => {
            if (tile.innerText === 'X' || tile.innerText === 'O'){
                return false;
            }
    
            return true;
        };




        const updateBoard =  (index) => {
            board[index] = currentPlayer;
        }




        const changePlayer = () => {
            playerDisplay.classList.remove(`player${currentPlayer}`);
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerDisplay.innerText = currentPlayer;
            playerDisplay.classList.add(`player${currentPlayer}`);
        }




        // user action function
        const userAction = (tile, index) => {
            if(isValidAction(tile) && isGameActive) {
                tile.innerText = currentPlayer;
                tile.classList.add(`player${currentPlayer}`)
                updateBoard(index);
                handleResultValidation();
                changePlayer();
            }
        }




        const resetBoard = () => {
            board = ['', '', '', '', '', '', '', '', ''];
            isGameActive = true;
            announce.classList.add('hide');
    
            if (currentPlayer === 'O') {
                changePlayer();
            }
    
            tiles.forEach(tile => {
                tile.innerText = '';
                tile.classList.remove('playerX');
                tile.classList.remove('playerO');
            });
        }

        // function resetBoard() {
        //     document.querySelectorAll('.tile').value = "";
        // }




        // attach an event listener for each tile
        tiles.forEach((tile, index) => {
            tile.addEventListener('click', () => userAction(tile, index));
        });


        resetButton.addEventListener('click', resetBoard);
    });