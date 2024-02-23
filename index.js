//IIFEs
const gameboard = (function(){
    let cells = [0,0,0,0,0,0,0,0,0];
    let turn = 1;

    const resetBoard = cells => {cells = [0,0,0,0,0,0,0,0,0]};
    const changeCell = (index, playerTurn) => {
        if(cells[index] === 0){cells[index] = playerTurn} else {return 'error'};
        winCheck(playerTurn);
        getBoardState();
    };
    const getBoardState = () => {return console.log(cells)};
    const winCheck = (player) => {
        if( (cells[0] === cells[1] && cells[1] === cells[2] && cells[2] === player) || 
            (cells[3] === cells[4] && cells[4] === cells[5] && cells[5] === player) || 
            (cells[6] === cells[7] && cells[7] === cells[8] && cells[8] === player) || 
            (cells[0] === cells[3] && cells[3] === cells[6] && cells[6] === player) || 
            (cells[1] === cells[4] && cells[4] === cells[7] && cells[7] === player) || 
            (cells[2] === cells[5] && cells[5] === cells[8] && cells[8] === player) || 
            (cells[0] === cells[4] && cells[4] === cells[8] && cells[8] === player) || 
            (cells[2] === cells[4] && cells[4] === cells[6] && cells[6] === player) ){
                return player
            } else if(!cells.includes(0)) {
                return 3
            } else {return 0}     
    }
    
    const makeTurn = () => {
        if(turn === 0 || turn === 2){
            turn = 1
        } else {turn = 2}
    };
    const endTurn = () => turn = 0;
    const getTurn = () => {return turn};

    return {resetBoard, changeCell, getBoardState, winCheck, makeTurn, endTurn, getTurn,}
})();

const domControl = (function(){
    const player1 = document.querySelector('.one');
    const player2 = document.querySelector('.two');
    const cells = document.querySelectorAll('.cell');

    const changeTurn = () => {
        player1.classList.remove('turn1');
        player2.classList.remove('turn2');
        let turn = gameboard.getTurn()
        if(turn === 0){
            return
        } else if(turn === 1){
            player1.classList.add('turn1');
        }
        else if(turn === 2) {
            player2.classList.add('turn2');
        }  
    }

    const fullTurn = (nodeIndex, playerTurn) => {
        gameboard.changeCell(nodeIndex, playerTurn);
        const winCheck = gameboard.winCheck(playerTurn);
        if(winCheck === 1){
            //LEFT OFF HERE FIGURE OUT HOW TO REMOVE EVENT LISTENERS
        }

        gameboard.makeTurn();
        changeTurn();
    }
    
    const updateBoard = () => {
        cells.forEach((cell, index) => {cell.addEventListener('click', () => {
            let turn = gameboard.getTurn();
            if(turn === 1 && cell.textContent === ''){
                cell.textContent = 'X';
                fullTurn(index, turn);
            } else if(turn === 2 && cell.textContent=== ''){
                cell.textContent = 'O';
                fullTurn(index, turn);
            }
            
            
            
        })})
    }

    return {changeTurn, updateBoard,}
})();

//Normal Factories
const newPlayer = function(name){
    let score = 0;

    const updateScore = () => score++

    return {name, updateScore,}
}

const one = newPlayer('one');
const two = newPlayer('two');

domControl.updateBoard()



