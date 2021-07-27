import { Point } from "./point.mjs";
import logConditional from "../../shared/logConditional.mjs";

class Circle {
	constructor(center, radius, third) {
		if (arguments.length == 2) { // Mittelpunkt-Kreis
			this.center = center;
			this.radius = radius;
		}
		if (arguments.length == 3) { // Dreipunkt-Kreis
			logConditional(center);
			logConditional(radius);
			logConditional(third);
			// http://ambrsoft.com/TrigoCalc/Circle3D.htm
			var x1 = center.x;
			var y1 = center.y;
			var x2 = radius.x;
			var y2 = radius.y;
			var x3 = third.x;
			var y3 = third.y;
			// Determinanten
			var A = x1 * (y2 - y3) - y1 * (x2 - x3) + x2 * y3 - x3 * y2;
			var B = sqrSum(x1, y1) * (y3 - y2) + sqrSum(x2, y2) * (y1 - y3) + sqrSum(x3, y3) * (y2 - y1);
			var C = sqrSum(x1, y1) * (x2 - x3) + sqrSum(x2, y2) * (x3 - x1) + sqrSum(x3, y3) * (x1 - x2);
			// Berechnung der Punkte
			var x = - (B / (2 * A));
			var y = - (C / (2 * A));
			var r = Math.hypot((x - x1), (y - y1));
			// Felder definieren
			this.center = new Point(x, y);
			this.radius = r;
		}
	}

	toString() {
		return "CIRCLE: center=(" + this.center + "), radius=" + this.radius + ")";
	}
	draw(context) {
		context.beginPath();
		context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
		context.stroke();

		logConditional(this.toString());
	}
}

function sqrSum(num1, num2) {
	return Math.pow(num1, 2) + Math.pow(num2, 2);
}

export { Circle };