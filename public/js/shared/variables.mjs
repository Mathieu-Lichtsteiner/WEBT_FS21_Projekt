const variables = {

	// Canvas als Objektreferenz & variablen
	canvas: null,
	context: null,
	strokeColor: "black",
	// No longer works, because the information is on another page than the colorPicker
	// colorExample: null,
	canvasContainer: null,
	maxWidth: 940,
	offsetFactor: null,

	// Uploadsperre für erstes Bild
	initial: true,
	initialMakeUp: null,

	// Variablen für Zeichenpunkte & den Modus
	first: null,
	second: null,
	oldMode: null,

	// Menü offen?
	menuOpened: false
}

export { variables };