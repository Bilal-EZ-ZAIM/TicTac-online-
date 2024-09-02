function game(ids) {

  
    document.getElementById("current-player").textContent = currentPlayer;
    function createBoard(size) {
      gameBoard.innerHTML = "";
      gameBoard.style.gridTemplateColumns = `repeat(${size}, 30px)`;
      gameBoard.style.gridTemplateRows = `repeat(${size}, 30px)`;
      for (let i = 0; i < size * size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleClick);
        gameBoard.appendChild(cell);
      }
    }

    createBoard(boardSize);

    const cells = document.querySelectorAll(".cell");

    function handleClick(event) {
      const cell = event.target;
      if (!cell.textContent) {
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);
        if (checkWin(cell)) {
          if (currentPlayer === "X") {
            scor.x = +1;
          } else {
            scor.o = +1;
          }
          document.getElementById("score-x").textContent = scor.x;
          document.getElementById("score-o").textContent = scor.o;
          setTimeout(() => {
            cells.forEach((item) => {
              item.textContent = "";
              item.classList.remove("X");
              item.classList.remove("O");
            });
            alert(`Winner is ${currentPlayer}`);
          }, 10);
        }
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        document.getElementById("current-player").textContent =
          currentPlayer;
      }
    }

    function checkWin(cell) {
      const index = parseInt(cell.dataset.index);

      return (
        checkDirection(index, 1) || // Horizontal
        checkDirection(index, boardSize) || // Vertical
        checkDirection(index, boardSize + 1) || // Diagonal /
        checkDirection(index, boardSize - 1)
      ); // Diagonal \
    }

    function checkDirection(startIndex, step) {
      const symbol = document.querySelector(
        `.cell[data-index="${startIndex}"]`
      ).textContent;
      let count = 1;

      // Check forward
      for (
        let i = startIndex + step;
        isValidIndex(i, startIndex, step) && count < sequenceLength;
        i += step
      ) {
        if (
          document.querySelector(`.cell[data-index="${i}"]`).textContent ===
          symbol
        ) {
          count++;

          console.log(` counter de forward = ${count}`);
        } else {
          break;
        }
      }

      console.log(` counter = ${count}`);
      // Check backward
      for (
        let i = startIndex - step;
        isValidIndex(i, startIndex, step) && count < sequenceLength;
        i -= step
      ) {
        if (
          document.querySelector(`.cell[data-index="${i}"]`).textContent ===
          symbol
        ) {
          count++;
          console.log(` counter de bacward = ${count}`);
        } else {
          break;
        }
      }

      return count >= sequenceLength;
    }

    function isValidIndex(index, startIndex, step) {
      if (index < 0 || index >= boardSize * boardSize) return false;

      if (step === 1) {
        return (
          Math.floor(index / boardSize) ===
          Math.floor(startIndex / boardSize)
        );
      } else if (step === boardSize) {
        return true;
      } else if (step === boardSize + 1) {
        return (
          Math.floor(index / boardSize) ===
          Math.floor((index - step) / boardSize) + 1
        );
      } else if (step === boardSize - 1) {
        return (
          Math.floor(index / boardSize) ===
          Math.floor((index - step) / boardSize) + 1
        );
      }

      return false;
    }

    reset.addEventListener("click", resetGame);
    function resetGame() {
      scor.x = 0;
      scor.o = 0;
      document.getElementById("score-x").textContent = scor.x;
      document.getElementById("score-o").textContent = scor.o;
    }
  }