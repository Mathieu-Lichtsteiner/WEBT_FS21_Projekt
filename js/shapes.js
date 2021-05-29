// Object (Constructor-Methods)

function Point(x, y) {
	this.x = x;
	this.y = y;

	this.toString = function () {
		return "POINT: X=" + this.x + " / Y=" + this.y;
	}
}

function Line(start, end) {
	this.start = start;
	this.end = end;

	this.toString = function () {
		return "LINE: start=(" + this.start + "), end=(" + this.end + ")";
	}
	this.draw = function () {
		context.beginPath();
		context.moveTo(this.start.x, this.start.y);
		context.lineTo(this.end.x, this.end.y);
		context.stroke();
		console.log(this);
	}
}

function Circle(center, radius) {
	this.center = center;
	this.radius = radius;

	this.draw = function () {
		context.beginPath();
		context.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
		context.stroke();
		console.log("Kreis gezeichnet: Mitte: " + this.center + ", radius=" + this.radius);
	}
}

function sqr(number) {
	return Math.pow(number, 2);
}

function threePointCircle(first, second, third) {
	// http://ambrsoft.com/TrigoCalc/Circle3D.htm
	var x1 = first.x;
	var y1 = first.y;
	var x2 = second.x;
	var y2 = second.y;
	var x3 = third.x;
	var y3 = third.y;
	// Determinanten
	var A = x1 * (y2 - y3) - y1 * (x2 - x3) + x2 * y3 - x3 * y2;
	var B = (sqr(x1) + sqr(y1)) * (y3 - y2) + (sqr(x2) + sqr(y2)) * (y1 - y3) + (sqr(x3) + sqr(y3)) * (y2 - y1);
	var C = (sqr(x1) + sqr(y1)) * (x2 - x3) + (sqr(x2) + sqr(y2)) * (x3 - x1) + (sqr(x3) + sqr(y3)) * (x1 - x2);
	// Berechnung der Punkte
	var x = - (B / (2 * A));
	var y = - (C / (2 * A));
	var r = Math.sqrt(sqr(x - x1) + sqr(y - y1));
	// Mittelpunktskreis zurückgeben.
	return new Circle(x, y, r);
}

function Arc(first, second, third) {
	this.first = first;
	this.second = second;
	this.third = third;

	// this.xStart = xStart;
	// this.yStart = yStart;
	// this.xEnd = xEnd;
	// this.yEnd = yEnd;
	// this.radius = radius;
	// this.angle = angle > Math.PI ? angle * Math.PI / 180 : angle; // If in Degrees, conversion to Radians

	this.toString = function () {
		return "ARC: first=(" + this.first + "), second=(" + this.second + "), third=(" + this.third + ")";
	}
	this.draw = function () {
		// context.beginPath();
		// context.moveTo(xStart, xEnd);
		// context.arcTo(xStart, yStart, xEnd, yEnd, radius);
		// context.lineTo(xEnd, yEnd);
		// context.stroke();
		console.log("NOT IMPLEMENTED! " + this);
	}
}

function Rectangle(start, end) {
	this.start = start;
	this.end = end;

	this.toString = function () {
		return "RECTANGLE: start=(" + this.start + "), end=(" + this.end + ")";
	}
	this.draw = function () {
		context.beginPath();
		context.moveTo(this.start.x, this.start.y);
		context.lineTo(this.start.x, this.end.y);
		context.lineTo(this.end.x, this.end.y);
		context.lineTo(this.end.x, this.start.y);
		context.closePath();
		context.stroke();
		console.log(this);
	}
}

function Triangle(first, second, third) {
	this.first = first;
	this.second = second;
	this.third = third;

	this.toString = function () {
		return "TRIANGLE: first=(" + this.first + "), second=(" + this.second + "), third=(" + this.third + ")";
	}
	this.draw = function () {
		context.beginPath();
		context.moveTo(this.first.x, this.first.y);
		context.lineTo(this.second.x, this.second.y);
		context.lineTo(this.third.x, this.third.y);
		context.closePath();
		context.stroke();
		console.log(this);
	}
}