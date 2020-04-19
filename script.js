const gameBoard = (() =>{
    const boardArray = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
    const boardContainer = document.querySelector('#boardContainer');
    let lastMark = '';
    let player1 = {};
    let player2 = {};
    const playerInit = (name, marker) => {
        return{
            name,
            marker,
            points: 0
        }
    }


    const createBoard = () => {
        boardContainer.innerHTML = '';
        boardArray.forEach(element =>{
            const newbox = document.createElement('div');
            newbox.className = 'box';
            newbox.id = element;
            boardContainer.appendChild(newbox);
        });
        let box = document.querySelectorAll('.box');
        box.forEach(e => {e.addEventListener('click', function() {
            if (lastMark == '' || lastMark == 'O') {
                this.innerHTML = 'X';
                lastMark = 'X';
            } else if (lastMark == 'X') {
                this.innerHTML = 'O'
                lastMark = 'O';
            }

        })});

    }


    const newGameInput = () => {
        if (!document.querySelector('#playerContainer')) {
            if (document.querySelector('#vsInfo')){vsInfo.remove()}
            const navBar = document.querySelector('#navBar');
            const playerContainer = document.createElement('idv');
            playerContainer.id = 'playerContainer';
            const pLabel1 = document.createElement('label');
            pLabel1.textContent = 'Player 1:'
            const pLabel2 = document.createElement('label');
            pLabel2.textContent = 'Player 2:'
            const inputP1 = document.createElement('input');
            const inputP2 = document.createElement('input');
            inputP1.id = 'p1';
            inputP2.id = 'p2';

            const submit = document.createElement('button');
            submit.id = 'submit';
            submit.textContent = 'Submit';
            playerContainer.appendChild(pLabel1);
            playerContainer.appendChild(inputP1);
            playerContainer.appendChild(pLabel2);
            playerContainer.appendChild(inputP2);
            playerContainer.appendChild(submit);
            navBar.appendChild(playerContainer);
            
            submit.addEventListener('click', e => {
                player1 = playerInit(inputP1.value,'X');
                player2 = playerInit(inputP2.value,'O');
                playerContainer.remove();
                gameBoard.createBoard();
                let vsInfo = document.createElement('h1');
                vsInfo.id = 'vsInfo';
                vsInfo.textContent = `${player1.name} vs. ${player2.name}`;
                navBar.appendChild(vsInfo);
            });

        }
    }
    return{
        playerInit,
        newGameInput,
        createBoard
        
    }
    
    
    
})();

let newGame = document.querySelector('#newGame');
newGame.addEventListener('click', e => gameBoard.newGameInput());

