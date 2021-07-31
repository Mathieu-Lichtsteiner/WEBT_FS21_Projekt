import { variables } from "../shared/variables.mjs";

function updateOffset() {
	var actualWidth = variables.canvasContainer.offsetWidth;
	variables.offsetFactor = variables.maxWidth / actualWidth;
}

export { updateOffset };