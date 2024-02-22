//IIFEs
const gameboard = (function(){
    let cells = [0,0,0,0,0,0,0,0,0];

    const resetBoard = cells => {cells = [0,0,0,0,0,0,0,0,0]};
    const changeCell = (index, player) => {
        if(cells[index] === 0){cells[index] = player} else {return 'error'};
        winCheck(player);
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
                console.log('player'+ player + ' winner')
            } else if(!cells.includes(0)) {console.log('tie game')}
    }

    return {resetBoard, changeCell, getBoardState, winCheck,}
})();

const domControl = function(){
    
}

//Normal Factories
const newPlayer = function(name){
    let turn = 0;

    const makeTurn = () => turn = 1;
    const endTurn = () => turn = 0;
    const getTurn = () => {return turn};

    return {name, makeTurn, endTurn, getTurn,}
}

const one = newPlayer('one');
const two = newPlayer('two');
one.makeTurn();



