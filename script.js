//gameBoard module
const pl1 = document.querySelector('.player1');
const pl2 = document.querySelector('.player2');
const players = document.querySelector('.player');

const gameBoard = (() => {
    const container = document.getElementById('container');
    
    const createGrid = () => {
        for (let j = 0; j < 3; j++) {
        let col = document.createElement('div');
        col.setAttribute('class', 'col');
        container.appendChild(col);
            for (let i = 0; i < 3; i++) {
                let cell = document.createElement('div');
                cell.setAttribute('class', 'cell');
                cell.innerText = "";
                col.appendChild(cell);
            };
        };
    };
    
    const placeMark = (e) => {
        if (e.target.innerText === "") {
        e.target.innerText = gameFlow.getCurrent().mark;
        };
    }; 
    return {createGrid, placeMark};
})();

//Player factory function
const player = (name, mark) => {
    return {name, mark};
}

//gameFlow module
const gameFlow = (() => {

    gameBoard.createGrid();

    let player1, player2, currentPlayer;
    

    const createPlayers = (e) => {  
        if (e.keyCode === 13) {
            const name = document.createElement('p');
            name.innerText = e.target.value;
            players.replaceChild(name, e.target);
            
            const player1Name = players.children[1].innerText;
            const player2Name = players.children[3].innerText;
            
            player1 = player(player1Name, 'X');
            player2 = player(player2Name, 'O');
            
            currentPlayer = player1;
        };
    };
  

    const getCurrent = () => currentPlayer;

    const switchPlayers = () => {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1}
    };
    
    const turn = (e) => {

        console.log(getCurrent());
        gameBoard.placeMark(e);
        if (gameOver()) {
            console.log(`${getCurrent().name} won. Game over`);
        }
        switchPlayers();
    }

    const vertical = () => {
        const cols = Array.from(document.querySelectorAll('.col'));
        return cols.some(col => {
            let cells = Array.from(col.childNodes);
            return cells.every(cell => cell.innerText === "X") ||
            cells.every(cell => cell.innerText === "O");
        });
    };

    const horizontal = () => {
        let arr = [[], [], []];
        const cols = Array.from(document.querySelectorAll('.col'));
        cols.forEach((col, i1) => {
            let cells = Array.from(col.childNodes);
            cells.forEach((cell, i2) => {
                arr[i2][i1] = cell;
            })
        });
        return arr.some(row => {
            return row.every(cell => cell.innerText === "X") ||
            row.every(cell => cell.innerText === "O");
        })
    }
    
    const gameOver = () => {
        return horizontal() || vertical();
    };

    let cells = Array.from(document.querySelectorAll('.cell'));
    cells.forEach(cell => {
       cell.addEventListener('click', turn);
    });

    pl1.addEventListener('keypress', createPlayers);
    pl2.addEventListener('keypress', createPlayers);

    return {switchPlayers, getCurrent, gameOver};
})(); 

