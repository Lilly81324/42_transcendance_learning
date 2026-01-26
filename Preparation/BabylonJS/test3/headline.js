// get Canvas Element to write in
const canvas = document.getElementById("headline");

// Set Texts Ratio to that of the Canvas element
canvas.width = canvas.height * (canvas.clientWidth / canvas.clientHeight);
const ctx = canvas.getContext("2d");

const msg = "Hello Client, and welcome to this test";
// Set Text Formatting
alert(canvas.clientWidth)

const maximum = 21 * msg.length;
const formula = 0.45 * canvas.clientWidth;

const scaling = Math.min(maximum, formula);

alert(maximum);
alert(formula);

ctx.font = "" + scaling + "% sans-serif";
ctx.textBaseline = "middle";
ctx.textAlign = "center";
ctx.fillText(msg, canvas.width / 2, canvas.height / 2);
