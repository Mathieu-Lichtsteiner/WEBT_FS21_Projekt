import { Circle, Line, Point } from "./shapes.mjs";

function drawInitialMakeUp() {
	//For testing my Custom Functions
	var strokes = [
		new Circle(new Point(370, 250), 60),
		new Circle(new Point(520, 250), 60),
		new Line(new Point(430, 250), new Point(460, 250)),
		new Line(new Point(450, 100), new Point(420, 150)),
		new Line(new Point(420, 150), new Point(480, 150)),
		new Line(new Point(480, 150), new Point(450, 200)),
		new Line(new Point(580, 250), new Point(630, 280)),
		new Circle(new Point(605, 365), 5),
		new Circle(new Point(605, 378), 10),
		new Circle(new Point(605, 406), 20)
	];
	Window.variables.context.strokeStyle = "black";
	strokes.forEach(stroke => {
		stroke.draw(Window.variables.context);
	});
	Window.variables.context.beginPath();
	Window.variables.context.strokeStyle = Window.variables.strokeColor;
}

export { drawInitialMakeUp };