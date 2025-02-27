import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect, useCallback } from "react";

/** Directions array used for neighbor checks / BFS flood-fill */
const DIRECTIONS = [
	[-1, -1],
	[-1, 0],
	[-1, 1],
	[0, -1],
	[0, 1],
	[1, -1],
	[1, 0],
	[1, 1],
];

/**
 * Generate a new Minesweeper board.
 */
function generateBoard(rows, cols, mines) {
	const board = [];
	// Create the board grid
	for (let r = 0; r < rows; r++) {
		const row = [];
		for (let c = 0; c < cols; c++) {
			row.push({
				row: r,
				col: c,
				isMine: false,
				isRevealed: false,
				isFlagged: false,
				neighborCount: 0,
			});
		}
		board.push(row);
	}

	// Randomly place mines
	let placed = 0;
	while (placed < mines) {
		const rr = Math.floor(Math.random() * rows);
		const cc = Math.floor(Math.random() * cols);
		if (!board[rr][cc].isMine) {
			board[rr][cc].isMine = true;
			placed++;
		}
	}

	// Compute neighbor counts for non-mine cells
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < cols; c++) {
			const cell = board[r][c];
			if (!cell.isMine) {
				cell.neighborCount = getNeighborMines(board, r, c);
			}
		}
	}

	return board;
}

/**
 * Count how many mines are adjacent to (row, col).
 */
function getNeighborMines(board, row, col) {
	let count = 0;
	for (const [dr, dc] of DIRECTIONS) {
		const rr = row + dr;
		const cc = col + dc;
		if (rr >= 0 && rr < board.length && cc >= 0 && cc < board[0].length) {
			if (board[rr][cc].isMine) {
				count++;
			}
		}
	}

	return count;
}

/**
 * Reveal a cell and spread to adjacent empty cells (BFS/flood-fill).
 */
function revealEmptyArea(board, startRow, startCol) {
	const stack = [[startRow, startCol]];

	while (stack.length > 0) {
		const [r, c] = stack.pop();
		const cell = board[r][c];

		if (cell.isRevealed || cell.isFlagged) {
			continue;
		}

		cell.isRevealed = true;

		if (cell.neighborCount === 0 && !cell.isMine) {
			for (const [dr, dc] of DIRECTIONS) {
				const rr = r + dr;
				const cc = c + dc;
				// Check bounds
				if (rr >= 0 && rr < board.length && cc >= 0 && cc < board[0].length) {
					const neighbor = board[rr][cc];
					if (!neighbor.isRevealed && !neighbor.isFlagged) {
						stack.push([rr, cc]);
					}
				}
			}
		}
	}
}

/**
 * Check if all non-mine cells are revealed.
 */
function checkWin(board, totalMines) {
	let revealedCount = 0;
	const totalCells = board.length * board[0].length;

	for (const row of board) {
		for (const cell of row) {
			if (cell.isRevealed) {
				revealedCount++;
			}
		}
	}
	return revealedCount === totalCells - totalMines;
}

const Minesweeper = () => {
	const [rows] = useState(9);
	const [cols] = useState(9);
	const [mines] = useState(10);

	const [board, setBoard] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	const [gameWon, setGameWon] = useState(false);

	const [flagsUsed, setFlagsUsed] = useState(0);

	const [time, setTime] = useState(0);
	const [timerActive, setTimerActive] = useState(false);

	/**
	 * Initialize or reset the game board.
	 */
	const initGame = useCallback(() => {
		const newBoard = generateBoard(rows, cols, mines);
		setBoard(newBoard);
		setGameOver(false);
		setGameWon(false);
		setFlagsUsed(0);
		setTime(0);
		setTimerActive(false);
	}, [rows, cols, mines]);

	useEffect(() => initGame(), [initGame]);

	useEffect(() => {
		let interval;
		if (timerActive && !gameOver && !gameWon) {
			interval = setInterval(() => {
				setTime((prev) => prev + 1);
			}, 1000);
		}
		return () => clearInterval(interval);
	}, [timerActive, gameOver, gameWon]);

	/**
	 * Handle left-click on a cell.
	 */
	const handleLeftClick = (r, c) => {
		if (gameOver || gameWon) return;

		// Start timer on the first click
		if (!timerActive && time === 0) {
			setTimerActive(true);
		}

		const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
		const cell = newBoard[r][c];

		// Ignore if flagged
		if (cell.isFlagged) return;

		// If it's a mine => game over
		if (cell.isMine) {
			setGameOver(true);
			// Reveal all mines
			for (const row of newBoard) {
				for (const ccell of row) {
					if (ccell.isMine) {
						ccell.isRevealed = true;
					}
				}
			}
			setBoard(newBoard);
			return;
		}

		if (cell.neighborCount === 0 && !cell.isMine) {
			revealEmptyArea(newBoard, r, c);
		}

		cell.isRevealed = true;

		setBoard(newBoard);

		if (checkWin(newBoard, mines)) {
			setGameWon(true);
			setTimerActive(false);
		}
	};

	/**
	 * Handle right-click (flag) on a cell.
	 */
	const handleRightClick = (e, r, c) => {
		e.preventDefault();
		if (gameOver || gameWon) return;

		if (!timerActive && time === 0) {
			setTimerActive(true);
		}

		const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
		const cell = newBoard[r][c];

		if (!cell.isRevealed) {
			cell.isFlagged = !cell.isFlagged;
			setFlagsUsed((prev) => (cell.isFlagged ? prev + 1 : prev - 1));
			setBoard(newBoard);

			if (checkWin(newBoard, mines)) {
				setGameWon(true);
				setTimerActive(false);
			}
		}
	};

	/**
	 * Render the grid of cells.
	 */
	const cellElements = [];
	for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
		for (let colIndex = 0; colIndex < board[0].length; colIndex++) {
			const cell = board[rowIndex][colIndex];

			let displayValue = "";
			if (cell.isRevealed) {
				if (cell.isMine) {
					displayValue = "💣";
				} else if (cell.neighborCount > 0) {
					displayValue = String(cell.neighborCount);
				}
			} else if (cell.isFlagged) {
				displayValue = "🚩";
			}

			// Color code for neighbor counts
			const colors = [
				"#0000FF", // 1
				"#008000", // 2
				"#FF0000", // 3
				"#000080", // 4
				"#800000", // 5
				"#008080", // 6
				"#000000", // 7
				"#808080", // 8
			];
			const numberColor =
				cell.isMine && cell.isRevealed
					? "#000000"
					: cell.neighborCount > 0
						? colors[cell.neighborCount - 1]
						: "#000000";

			const isRevealed = cell.isRevealed;

			cellElements.push(
				<Button
					key={`${rowIndex}-${colIndex}`}
					onClick={() => handleLeftClick(rowIndex, colIndex)}
					onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
					disableRipple
					sx={{
						width: 30,
						height: 30,
						boxSizing: "border-box",
						minWidth: "auto",
						minHeight: "auto",
						p: 0,
						m: 0,
						cursor: "default !important",
						border: 2,
						borderColor: "background.minesweeperDark",
						borderTopColor: "#fff",
						borderLeftColor: "#fff",
						"&:active": {
							borderTopColor: "background.minesweeperDark",
							borderLeftColor: "background.minesweeperDark",
							borderBottomColor: "#fff",
							borderRightColor: "#fff",
						},
						"&:hover": {
							cursor: "default !important",
						},
						...(isRevealed && {
							borderTopColor: "background.minesweeperDark",
							borderLeftColor: "background.minesweeperDark",
							borderBottomColor: "#fff",
							borderRightColor: "#fff",
						}),
						backgroundColor: "background.minesweeper",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography
						component="span"
						sx={{
							m: 0,
							p: 0,
							lineHeight: 1.2,
							color: numberColor,
							userSelect: "none",
							fontSize: "1rem",
						}}
					>
						{displayValue}
					</Typography>
				</Button>,
			);
		}
	}

	const mineCountDisplay = Math.max(mines - flagsUsed, 0);

	return (
		<Box
			id="minesweeper-container"
			sx={{
				cursor: "default !important",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				bgcolor: "background.minesweeper",
			}}
		>
			<Box
				id="minesweeper-outer-box"
				sx={{
					borderColor: "background.minesweeperDark",
					borderTopColor: "#fff",
					borderLeftColor: "#fff",
					p: 0.25,
					backgroundColor: "background.minesweeper",
					cursor: "default !important",
				}}
			>
				<Box
					id="minesweeper-top-panel"
					sx={{
						border: 2,
						borderColor: "#fff",
						borderTopColor: "background.minesweeperDark",
						borderLeftColor: "background.minesweeperDark",
						backgroundColor: "background.minesweeper",
						p: 1,
						mb: 1,
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						cursor: "default !important",
					}}
				>
					<Box
						id="minesweeper-mines-counter"
						sx={{
							fontFamily: "monospace",
							fontSize: "1.2rem",
							color: "#ff0000",
							backgroundColor: "#000",
							textAlign: "right",
							border: 2,
							borderColor: "background.minesweeperDark",
							px: 1,
							py: 0.5,
							width: "fit-content",
							cursor: "default !important",
						}}
					>
						{mineCountDisplay.toString().padStart(3, "0")}
					</Box>

					<Button
						id="minesweeper-reset-button"
						onClick={initGame}
						sx={{
							width: 32,
							height: 32,
							border: 2,
							borderColor: "background.minesweeperDark",
							borderTopColor: "#fff",
							borderLeftColor: "#fff",
							backgroundColor: "background.minesweeper",
							cursor: "default !important",
							"&:active": {
								borderTopColor: "background.minesweeperDark",
								borderLeftColor: "background.minesweeperDark",
								borderBottomColor: "#fff",
								borderRightColor: "#fff",
							},
							fontSize: "1.2rem",
							p: 0,
							pt: 0.5,
						}}
					>
						{gameOver ? "😵" : gameWon ? "😎" : "🙂"}
					</Button>

					<Box
						id="minesweeper-timer"
						sx={{
							fontFamily: "monospace",
							fontSize: "1.2rem",
							color: "#ff0000",
							backgroundColor: "#000",
							textAlign: "right",
							border: 2,
							borderColor: "background.minesweeperDark",
							px: 1,
							py: 0.5,
							width: "fit-content",
							cursor: "default !important",
						}}
					>
						{time.toString().padStart(3, "0")}
					</Box>
				</Box>

				<Box
					id="minesweeper-board"
					sx={{
						display: "grid",
						gridTemplateColumns: `repeat(${cols}, auto)`,
						bgcolor: "background.minesweeperDark",
						p: 1,
						border: 2,
						borderColor: "background.minesweeperDark",
						borderTopColor: "#fff",
						borderLeftColor: "#fff",
						cursor: "default !important",
					}}
				>
					{cellElements}
				</Box>
			</Box>
		</Box>
	);
};

export default Minesweeper;
