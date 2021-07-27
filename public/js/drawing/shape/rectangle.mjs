import logConditional from "../../shared/logConditional.mjs";

class Rectangle {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}

	toString() {
		return "RECTANGLE: start=(" + this.start + "), end=(" + this.end + ")";
	}
	draw(context) {
		context.beginPath();
		context.moveTo(this.start.x, this.start.y);
		context.lineTo(this.start.x, this.end.y);
		context.lineTo(this.end.x, this.end.y);
		context.lineTo(this.end.x, this.start.y);
		context.closePath();
		context.stroke();

		logConditional(this.toString());
	}
}

export { Rectangle };