//IIFEs
const gameboard = (function(){
    let cells = [0,0,0,0,0,0,0,0,0];
    let turn = 1;

    const resetBoard = () => {cells = [0,0,0,0,0,0,0,0,0]};
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
    const roundMessage = document.querySelector('.roundEnd span');
    const player1score = document.querySelector('.player1score');
    const player2score = document.querySelector('.player2score');
    const playerNameButtons = document.querySelectorAll('.score img');
    const player1Name = document.querySelector('span.editablename1');
    const player2Name = document.querySelector('span.editablename2');
    const newRoundButton = document.querySelector('.roundEnd button');
    
    let gameFlag = 1;

    const renderNewName = () => playerNameButtons.forEach((button,index) => {
        button.addEventListener('click', () => {
            const newName = prompt('Enter a player name', 'Player');
            if(index === 0 && newName !== null && newName !== ''){
                playerOne.updatePlayerName(newName);
                player1Name.textContent = newName;
            }
            if(index === 1 && newName !== '' && newName !== ''){
                playerTwo.updatePlayerName(newName);
                player2Name.textContent = newName;
            }
        })
    })

    const toggleGameFlag = () => {
        if(gameFlag === 0){gameFlag = 1}
        else {gameFlag = 0}
    }

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
        if(winCheck !== 0){
            toggleGameFlag();
            newRoundButton.classList.remove('buttonHide');
            if(winCheck === 1){
            roundMessage.textContent = playerOne.getPlayerName() + ' has won!';
            playerOne.updateScore();
            player1score.textContent = playerOne.getScore();
            }
            if(winCheck === 2){
            roundMessage.textContent = playerTwo.getPlayerName() + ' has won!';
            playerTwo.updateScore();
            player2score.textContent = playerTwo.getScore();
            }
            if(winCheck === 3) {
                roundMessage.textContent = "It's a tie.";
            }
        } else {
        gameboard.makeTurn();
        changeTurn();
        }
    }
    
    const configureBoard = () => {
        cells.forEach((cell, index) => {cell.addEventListener('click', () => {
            if(gameFlag === 1){
                let turn = gameboard.getTurn();
                if(turn === 1 && cell.textContent === ''){
                cell.textContent = 'X';
                fullTurn(index, turn);
                } else if(turn === 2 && cell.textContent=== ''){
                cell.textContent = 'O';
                fullTurn(index, turn);
                }
            }         
        })})
    }

    const newRound = () => {
        gameboard.resetBoard();
        cells.forEach(cell => cell.textContent = '');
        roundMessage.textContent = '';
        gameboard.makeTurn();
        changeTurn();
        gameFlag = 1;
        newRoundButton.classList.add('buttonHide');
    }
    newRoundButton.addEventListener('click', newRound);

    return {changeTurn, configureBoard, toggleGameFlag, renderNewName, newRound,}
})();

//Normal Factories
const newPlayer = function(name){
    let score = 0;
    let playerName = name;

    const updatePlayerName = (newName) => {playerName = newName};
    const getPlayerName = () => {return playerName};
    const updateScore = () => score++;
    const getScore = () => {return score}

    return {updatePlayerName, getPlayerName, updateScore, getScore,}
}

const playerOne = newPlayer('Player One');
const playerTwo = newPlayer('Player Two');

domControl.configureBoard();
domControl.renderNewName();



