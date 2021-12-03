import P5 from "p5";
import "p5/lib/addons/p5.dom";
import "./styles.scss";

// DEMO: A sample class implementation
import Grid from "./Grid";

// Creating the sketch itself
const sketch = (p5: P5) => {
	const controlsSize = 250;
	const boardSize = 400;
	const n = 6;
	const blockSize = boardSize / n;

	let grid;

	let additionalBlocks;
	let selectedAddBlock;
	let selectedGridBlock;

	// The sketch setup method 
	p5.setup = () => {
		// Creating and positioning the canvas
		const canvas = p5.createCanvas(boardSize, boardSize + controlsSize);
		canvas.parent("app");

		// Configuring the canvas
		p5.background(220);

		grid = new Grid(p5, n);
		p5.frameRate(3);
	};

	// The sketch draw method
	p5.draw = () => {
		p5.background(220);
		grid.draw(blockSize);
	};
};

new P5(sketch);
