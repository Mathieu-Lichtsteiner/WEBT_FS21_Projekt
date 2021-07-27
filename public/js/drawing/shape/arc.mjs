import { Point } from "./point.mjs";
import { Circle } from "./circle.mjs";
import logConditional from "../../shared/logConditional.mjs";

class Arc {
	constructor(first, second, third) {
		var circle = new Circle(first, second, third);
		this.x = circle.center.x;
		this.y = circle.center.y;
		this.radius = circle.radius;
		// Kreismittelpunkt auf "0,0" setzen & Kordinatensystem auf klassisch y+ nach oben ausrichten
		var p1 = new Point((first.x - this.x), -(first.y - this.y));
		var p2 = new Point((second.x - this.x), -(second.y - this.y));
		var p3 = new Point((third.x - this.x), -(third.y - this.y));
		// punkte auf Polar-Winkel umrechnen
		this.startAngle = -convertToPolar(p1);
		this.endAngle = -convertToPolar(p3);
		// Bestimmen, in welchem Segment der Mittelpunkt liegt.
		var midAngle = -convertToPolar(p2);
		this.counterClockWise = (midAngle < this.startAngle) && (midAngle > this.endAngle);
	}
	toString() {
		return "ARC: Center=(" + new Point(this.x, this.y) + "), radius=(" + this.radius + "), startAngle=(" + this.startAngle + "), endAngle=(" + this.endAngle + "), counterClockWise=(" + this.counterClockWise + ")";
	}
	draw(context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockWise);
		context.stroke();

		logConditional(this.toString());
	}
}

function convertToPolar(point) {
	var x = point.x;
	var y = point.y;
	var atan = Math.atan(y / x);
	// Quadrant bestimmen
	if (x > 0 && y >= 0) { // Quadrant 1
		return atan;
	}
	if (x > 0 && y < 0) { // Quadrant 4
		return atan + 2 * Math.PI;
	}
	if (x < 0) { // Quadrant 2 & 3
		return atan + Math.PI;
	}
}

export { Arc };