let boxes = document.querySelectorAll('.box');
let msg = document.querySelector('.msg');
let reset = document.querySelector('.reset');

let playerX = true;

let patterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

reset.addEventListener('click', () => {
    playerX = true;
    msg.innerText = "Let's start the game with X";

    for (let box of boxes) {
        box.innerText = '';
        box.disabled = false;
        box.style.color = ''; 
        box.classList.remove('highlight');
    }

    msg.classList.remove('Win');
});

boxes.forEach((box, index) => {
    box.addEventListener('click', () => {
        if (playerX) {
            box.innerText = 'X';
            box.style.color = '#FF204E';
            msg.innerText = `Player O's Turn`;
        } else {
            box.innerText = 'O';
            box.style.color = '#116D6E';
            msg.innerText = `Player X's Turn`;
        }

        box.disabled = true;
        playerX = !playerX;

        checkWinner();
    });
});

function checkWinner() {
    if ([...boxes].every(box => box.innerText !== '')) {
        msg.innerHTML = "It's a Tie!";
        msg.classList.add('Win');
    }
    for (let pattern of patterns) {
        let p1 = boxes[pattern[0]].innerText;
        let p2 = boxes[pattern[1]].innerText;
        let p3 = boxes[pattern[2]].innerText;

        if (p1 && p1 === p2 && p2 === p3) {
            msg.innerHTML = `Congratulations, ${p1} Wins!`;
            msg.classList.add('Win');
            pattern.forEach(index => {
                boxes[index].classList.add('highlight');
            });
            
            boxes.forEach(box => box.disabled = true);
            return;
        }
    }

}
