import logConditional from "../../shared/logConditional.mjs";

class Triangle {
	constructor(first, second, third) {
		this.first = first;
		this.second = second;
		this.third = third;
	}
	toString() {
		return "TRIANGLE: first=(" + this.first + "), second=(" + this.second + "), third=(" + this.third + ")";
	}
	draw(context) {
		context.beginPath();
		context.moveTo(this.first.x, this.first.y);
		context.lineTo(this.second.x, this.second.y);
		context.lineTo(this.third.x, this.third.y);
		context.closePath();
		context.stroke();
		logConditional(this.toString());
	}
}

export { Triangle };