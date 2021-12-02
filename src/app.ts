import P5 from "p5";
import "p5/lib/addons/p5.dom";
import "./styles.scss";

// DEMO: A sample class implementation
import MyCircle from "./MyCircle";

// Creating the sketch itself
const sketch = (p5: P5) => {
	const controlsSize = 250;
	const boardSize = 400;

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

		// DEMO: Create three circles in the center of the canvas

		
	};

	// The sketch draw method
	p5.draw = () => {
		// DEMO: Let the circle instances draw themselves
	};
};

new P5(sketch);
