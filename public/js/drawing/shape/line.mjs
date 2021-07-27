import logConditional from "../../shared/logConditional.mjs";

class Line {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}

	toString() {
		return "LINE: start=(" + this.start + "), end=(" + this.end + ")";
	}
	draw(context) {
		context.beginPath();
		context.moveTo(this.start.x, this.start.y);
		context.lineTo(this.end.x, this.end.y);
		context.stroke();

		logConditional(this.toString());
	}
}

export { Line };