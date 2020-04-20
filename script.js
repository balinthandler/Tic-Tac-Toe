const gameBoard = (() =>{
    const boardArray = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
    const boardContainer = document.querySelector('#boardContainer');
    let player1 = {};
    let player2 = {};
    let lastMark = '';
    let gameover = false;
    const winningCases = [
        ['A1', 'A2', 'A3'],
        ['B1', 'B2', 'B3'],
        ['C1', 'C2', 'C3'],
        ['A1', 'B1', 'C1'],
        ['A2', 'B2', 'C2'],
        ['A3', 'B3', 'C3'],
        ['A1', 'B2', 'C3'],
        ['A3', 'B2', 'C1']
    ];
    const newGameInput = () => {
        if (!document.querySelector('#playerContainer')){
            if (document.querySelector('#vsInfo')) {vsInfo.remove()};
            if (document.querySelector('#reset')) {reset.remove()};
            gameover = true;
            const navBar = document.querySelector('#navBar');
            const playerContainer = document.createElement('idv');
            playerContainer.id = 'playerContainer';
            const pLabel1 = document.createElement('label');
            pLabel1.textContent = 'Player X:';
            const pLabel2 = document.createElement('label');
            pLabel2.textContent = 'Player O:';
            const inputP1 = document.createElement('input');
            const inputP2 = document.createElement('input');
            inputP1.required = true;
            inputP2.required = true;
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
                if (inputP1.validity.valueMissing || inputP2.validity.valueMissing) {
                    const inpError = document.createElement('span');
                    inpError.id = 'inpError';
                    inpError.innerHTML= 'Enter name!';
                        if (inputP1.validity.valueMissing) {
                            if (!document.querySelector('#inpError')){
                                inputP1.after(inpError);
                                inputP1.addEventListener('input', e => {
                                    if (inputP1.value != '') {
                                        inpError.remove()
                                    }
                                })
                            };
                        }
                        if (inputP2.validity.valueMissing) {
                            if (!document.querySelector('#inpError')){
                                inputP2.after(inpError);
                                inputP2.addEventListener('input', e => {
                                    if (inputP2.value != '') {
                                        inpError.remove()
                                    }
                                })
                            };
                        }
                }else{
                    gameover = false;
                    player1 = playerInit(inputP1.value,'X');
                    player2 = playerInit(inputP2.value,'O');
                    playerContainer.remove();
                    const vsInfo = document.createElement('h1');
                    vsInfo.id = 'vsInfo';
                    vsInfo.textContent = `${player1.name} vs. ${player2.name}`;
                    const reset = document.createElement('button');
                    reset.textContent = 'Reset';
                    reset.id = "reset";
                    navBar.appendChild(vsInfo);
                    navBar.appendChild(reset);

                    createBoard();
                    gameMechanics();
                }
            })
        }
    }
    const playerInit = (name, marker) => {
        return{
            name,
            marker,
            marks: [],
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
        
    }
    const gameMechanics = () => {
        resBtn();
        let box = document.querySelectorAll('.box');
        box.forEach(e => {e.addEventListener('click', function() {
            if (!gameover){
                if ((lastMark == '' || lastMark == player2.marker) && this.innerHTML == '') {
                    this.innerHTML = player1.marker;
                    lastMark = player1.marker;
                    
                    player1.marks.push(this.id);
                } else if (lastMark == player1.marker && this.innerHTML == '') {
                    this.innerHTML = player2.marker;
                    lastMark = player2.marker;
                    player2.marks.push(this.id);
                }
            }
            evaluate(player1);
            evaluate(player2);
        })});
    }
    
    const winColoring = (array) => {
        let box = document.querySelectorAll('.box');
        box.forEach(e => {
            array.forEach(w => {
                if (w == e.id) {
                    e.classList.add('winningBoxes');
                }
            })
        })      
    }
    const evaluate = (obj) => {
        let objName = obj.name;
        let array = obj.marks ;
        winningCases.forEach(w => {
            let found = 0;
            w.forEach(e => {
                array.forEach(v => {
                    if (v == e) {
                        found +=1;
                        if (found == 3) {
                            let vsInfo = document.querySelector('#vsInfo');
                            vsInfo.textContent = objName + ' won!';
                            gameover = true;
                            obj.points += 1;
                            winColoring(w);

                        }
                        if ((player1.marks.length + player2.marks.length == 9) && found < 3 ){
                            let vsInfo = document.querySelector('#vsInfo');
                            vsInfo.textContent = 'Tie!';
                            gameover = true;
                        }
                    }
                })
            })
        })
    }
  
    const resBtn = () => {
        let navBar = document.querySelector('#navBar');
        navBar.onclick = function(event){
            let target = event.target;
            if (target.id == 'reset'){
                resetGame();
            }
        }
    }   
    const resetGame = () => {
        player1.marks = [];
        player2.marks = [];
        lastMark = '';
        const vsInfo = document.querySelector('#vsInfo');
        vsInfo.textContent = `${player1.name} vs. ${player2.name}`;
        createBoard();
        gameMechanics();
        gameover = false;
    };
    return{
        newGameInput,
    }
})();
const newGame = document.querySelector('#newGame');
newGame.addEventListener('click', e => gameBoard.newGameInput());