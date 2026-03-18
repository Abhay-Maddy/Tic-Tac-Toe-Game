let scoreX = 0;
        let scoreO = 0;
        let boxes = document.querySelectorAll(".box");
        let resetBtn = document.querySelector("#reset");
        let reSetBtn = document.querySelector("#reSet");
        let newGameBtn = document.querySelector("#restart");
        let msg = document.querySelector("#msgBox");
        let turnIndicator = document.querySelector(".turn-indicator");
        let countX = document.querySelector("#scoreX");
        let countO = document.querySelector("#scoreO");
        let turnO = true;
        let gameOver = false;

        const winPatterns = [
            [0, 1, 2],
            [0, 3, 6],
            [0, 4, 8],
            [1, 4, 7],
            [2, 5, 8],
            [2, 4, 6],
            [3, 4, 5],
            [6, 7, 8],
        ];

        // Initialize the game
        function initGame() {
            boxes.forEach(box => {
                box.innerText = "";
                box.disabled = false;
                box.classList.remove("X", "O");
            });
            
            turnO = true;
            gameOver = false;
            updateTurnIndicator();
            msg.classList.add("hide");
            newGameBtn.classList.add("hide");
            resetBtn.classList.add("hide");
            reSetBtn.classList.remove("hide");
        }

        // Update turn indicator
        function updateTurnIndicator() {
            if (turnO) {
                turnIndicator.classList.remove("turn-X");
                turnIndicator.classList.add("turn-O");
                turnIndicator.querySelector(".turn-symbol").textContent = "O";
            } else {
                turnIndicator.classList.remove("turn-O");
                turnIndicator.classList.add("turn-X");
                turnIndicator.querySelector(".turn-symbol").textContent = "X";
            }
        }

        // Handle box clicks
        boxes.forEach((box) => {
            box.addEventListener("click", () => {
                if (gameOver || box.innerText !== "") return;
                
                if (turnO) {
                    box.innerText = "O";
                    box.classList.add("O");
                    turnO = false;
                } else {
                    box.innerText = "X";
                    box.classList.add("X");
                    turnO = true;
                }
                
                box.disabled = true;
                updateTurnIndicator();
                checkWinner();
            });
        });

        // Disable all boxes
        function disableBoxes() {
            boxes.forEach(box => box.disabled = true);
        }

        // Show winner
        function showWinner(winner) {
            msg.innerText = `Congratulations, Winner is ${winner}`;
            msg.classList.remove("hide");
            turnIndicator.querySelector(".turn-symbol").textContent = winner;
            reSetBtn.classList.add("hide");
            newGameBtn.classList.remove("hide");
            resetBtn.classList.remove("hide");
            disableBoxes();
            gameOver = true;
            
            if(winner === "O") {
                scoreO++;
                countO.textContent = scoreO;
            } else {
                scoreX++;
                countX.textContent = scoreX;
            }
        }

        // Check for winner or draw
        function checkWinner() {
            for (let pattern of winPatterns) {
                let pos1Value = boxes[pattern[0]].innerText;
                let pos2Value = boxes[pattern[1]].innerText;
                let pos3Value = boxes[pattern[2]].innerText;

                if (pos1Value !== "" && pos2Value !== "" && pos3Value !== "") {
                    if (pos1Value === pos2Value && pos2Value === pos3Value) {
                        showWinner(pos1Value);
                        return;
                    }
                }
            }
            
            // Check for draw
            if (Array.from(boxes).every(box => box.innerText !== "") && !gameOver) {
                msg.innerText = "It's a Draw!";
                msg.classList.remove("hide");
                reSetBtn.classList.add("hide");
                newGameBtn.classList.remove("hide");
                resetBtn.classList.remove("hide");
                gameOver = true;
                disableBoxes();
            }
        }

        // Reset game (keep scores)
        function resetGame() {
            turnO = true;
            boxes.forEach(box => {
                box.disabled = false;
                box.innerText = "";
                box.classList.remove("X", "O");
            });
            updateTurnIndicator();
            newGameBtn.classList.add("hide");
            resetBtn.classList.add("hide");
            reSetBtn.classList.remove("hide");
            msg.innerText = "Start to Playing Game";
            gameOver = false;
        }

        // New game (reset scores)
        function newGame() {
            turnO = true;
            boxes.forEach(box => {
                box.disabled = false;
                box.innerText = "";
                box.classList.remove("X", "O");
            });
            updateTurnIndicator();
            newGameBtn.classList.add("hide");
            resetBtn.classList.add("hide");
            reSetBtn.classList.remove("hide");
            msg.innerText = "Start New Game"; 
            scoreO = 0;
            scoreX = 0;
            countO.textContent = scoreO;
            countX.textContent = scoreX;
            gameOver = false;
        }

        // Event listeners
        newGameBtn.addEventListener("click", newGame);
        resetBtn.addEventListener("click", resetGame);
        reSetBtn.addEventListener("click", resetGame);

        // Initialize the game
        initGame();