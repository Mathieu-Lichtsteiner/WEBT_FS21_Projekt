class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	toString() {
		return "POINT: X=" + this.x + " / Y=" + this.y;
	}
}

export { Point };