const first = document.getElementById("first");
const second = document.getElementById("second");
const bar = document.getElementById("bar");
const one = document.getElementById("one");
const three = document.getElementById("three");
const four = document.getElementById("four");
const five = document.getElementById("five");
second.addEventListener("click", () => {
	bar.style.fill = "white";
	one.style.fill = "#2BA30E";
	three.style.fill = "#2BA30E";
	four.style.fill = "#2BA30E";
	five.style.fill = "#2BA30E";
});

first.addEventListener("click", () => {
	bar.style.fill = "#2BA30E";
	one.style.fill = "white";
	three.style.fill = "white";
	four.style.fill = "white";
	five.style.fill = "white";
});
