import P5 from "p5";
import "p5/lib/addons/p5.dom";
import "./styles.scss";

import Grid from "./Grid";
import { Block } from "./types";

// Creating the sketch itself
const sketch = (p5: P5) => {
	const controlsSize = 250;
	const boardSize = 400;
	const n = 6;
	const blockSize = boardSize / n;

	let grid: Grid;
	let addGrid: Grid;

	let selectedBlock: Block;

	// The sketch setup method 
	p5.setup = () => {
		// Creating and positioning the canvas
		const canvas = p5.createCanvas(boardSize, boardSize + controlsSize);
		canvas.parent("app");
		canvas.mousePressed(() => canvasPressed(p5.mouseX, p5.mouseY, blockSize));

		// Configuring the canvas
		p5.background(220);

		// Grid
		grid = new Grid(p5, n);

		// Adding blocks to the grid
		addGrid = initAdditionalBlocks(p5, [
			new Block(0, 0, 2, 1),
			new Block(0, 1, 3, 1),
			new Block(3, 0, 1, 2),
			new Block(4, 0, 1, 3),
		]);
		p5.frameRate(3);
	};

	// The sketch draw method
	p5.draw = () => {
		const margin = 5;
		p5.background(220);
		grid.draw(blockSize, margin);

		// Draw additional blocks
		p5.push();
		p5.translate(0, grid.size * blockSize)
		addGrid.drawBlocks(blockSize, margin);
		p5.pop();

		// Draw selected block
		if (selectedBlock) {
			p5.push();
			p5.translate(p5.mouseX - blockSize / 2, p5.mouseY - blockSize / 2);
			p5.stroke(2);
			p5.fill(selectedBlock.id === 1 ? 255 : 100, 100, 100, 100);
			p5.rect(0, 0, selectedBlock.w * blockSize - 2 * margin, selectedBlock.h * blockSize - 2 * margin);
			p5.pop();
		}
	};

	const initAdditionalBlocks = (p5: P5, blocks: Block[]) => {
		const g = new Grid(p5, n);
		g.removeBlock(g.player);
		blocks.forEach(block => g.addBlock(block));
		return g;
	}

	const canvasPressed = (mouseX: number, mouseY: number, blockSize: number) => {
		const [x, y] = [Math.floor(mouseX / blockSize), Math.floor(mouseY / blockSize)];
		// First grid is clicked
		if (grid.inBounds(new Block(x, y, 1, 1))) {
			// Check if block was selected
			if (selectedBlock) {
				const block = selectedBlock.copy();
				block.pos = new P5.Vector().set(x, y);
				const success = grid.addBlock(block);
				// Update or restore if player
				if (selectedBlock.id === 1) {
					if (success) grid.player = selectedBlock;
					else grid.addBlock(grid.player);
				}
				selectedBlock = undefined;
			// If no block selected, select the one clicked on
			} else {
				selectedBlock = grid.removeBlock(grid.findBlockAt(x, y));
			}
		// Second grid is clicked
		} else {
			// Put player back
			if (selectedBlock?.id === 1) grid.addBlock(selectedBlock);
			selectedBlock = addGrid.findBlockAt(x, y - grid.size);
		}
	}
};



new P5(sketch);
