function drawImage(context, url) {
	// Image als Objektreferenz
	var background = new Image();
	background.src = url;
	background.onload = function () {
		context.drawImage(background, 170, 0, 600, 600); // 1
	}
	console.log(background);
}

function Line(xStart, yStart, xEnd, yEnd) {
	this.xStart = xStart;
	this.yStart = yStart;
	this.xEnd = xEnd;
	this.yEnd = yEnd;

	this.draw = function (context) {
		context.beginPath();
		context.moveTo(this.xStart, this.yStart);
		context.lineTo(this.xEnd, this.yEnd);
		context.stroke();
		console.log("linie gezeichnet: Von (" + this.xStart + "/" + this.yStart + "), Bis (" + this.xEnd + "/" + this.yEnd + ")");
	}
}

function Circle(x, y, radius) {
	this.x = x;
	this.y = y;
	this.radius = radius;

	this.draw = function (context) {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		context.stroke();
		console.log("Kreis gezeichnet: x=" + this.x + ", y=" + this.y + ", radius=" + this.radius);
	}
}

function Arc(xStart, yStart, xEnd, yEnd, radius, angle) {
	this.xStart = xStart;
	this.yStart = yStart;
	this.xEnd = xEnd;
	this.yEnd = yEnd;
	this.radius = radius;
	this.angle = angle > Math.PI ? angle * Math.PI / 180 : angle; // If in Degrees, conversion to Radians

	this.draw = function (context) {
		context.beginPath();
		context.moveTo(xStart, xEnd);
		context.arcTo(xStart, yStart, xEnd, yEnd, radius);
		context.lineTo(xEnd, yEnd);
		context.stroke();
		console.log("Rechteck gezeichnet: Von (" + this.xStart + "/" + this.yStart + ") Bis (" + this.xEnd + "/" + this.yEnd + "), Radius=" + this.radius + ", Winkel=" + this.angle * 180);
	}
}

function Rect(xStart, yStart, xEnd, yEnd) {
	this.xStart = xStart;
	this.yStart = yStart;
	this.xEnd = xEnd;
	this.yEnd = yEnd;

	this.draw = function (context) {
		context.beginPath();
		context.moveTo(this.xStart, this.yStart);
		context.lineTo(this.xStart, this.yEnd);
		context.lineTo(this.xEnd, this.yEnd);
		context.lineTo(this.xEnd, this.yStart);
		context.closePath();
		context.stroke();
		console.log("Rechteck gezeichnet: Von (" + this.xStart + "/" + this.yStart + "), Bis (" + this.xEnd + "/" + this.yEnd + ")");
	}
}

function Triangle(x1, y1, x2, y2, x3, y3) {
	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;
	this.x3 = x3;
	this.y3 = y3;

	this.draw = function (context) {
		context.beginPath();
		context.moveTo(this.x1, this.y1);
		context.lineTo(this.x2, this.y2);
		context.lineTo(this.x3, this.y3);
		context.closePath();
		context.stroke();
		console.log("Dreieck gezeichnet: (" + this.x1 + "/" + this.y1 + ") - (" + this.x2 + "/" + this.y2 + ") - (" + this.x3 + "/" + this.y3 + ")");
	}
}

// export { drawImage, Line, Circle, Arc, Rect, Triangle };