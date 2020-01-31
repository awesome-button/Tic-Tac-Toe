const game = (() => {
    let player1 = "Lena";
    let player2 = "kotik";
    let a;

    const sw = () => {
        if (a === player1) {
            a = player2;
        } else {
            a = player1;
        }
        return a;
    };
    
    return {a, sw};

})();

const game = (() => {
    let player1 = "Jim";
    let player2 = "Mary";
    let currentPlayer = player1;

    const getCurrent = () => {
        return currentPlayer;
    }

    const switchPlayers = () => { //This closure function is supposed to reassign
        // the value of currentPlayer above. But it does not do it.
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
        return currentPlayer;
    };
    
    return {getCurrent, switchPlayers};

})();

game.switchPlayers // works as needed and switches the players every time it is invoked;
game.currentPlayer // gets stuck on player 1 as assigned at the beginning of the factory function;


let newArr = Array.from(
    { length: 3 },
    () => Array.from({ length: 3 })
);

newArr[0][1] = 'X';

let rows = [
    [1, 1, 1],
    ['X', 'X', 'X'],
    [2, 3, 4]
];

rows.some(row => {
    return row.every(ele => ele === 'X' || ele=== 'O');
})