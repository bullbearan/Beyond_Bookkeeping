const editSalaryExpensesBtn = document.getElementById(
	"edit-salary-expenses-btn"
);
const cancelBtn = document.getElementById("card-cancel-btn");
const hiddenGoal = document.getElementById("hidden-goal");
const goalBtn = document.getElementById("goal-btn");
const cancelGoal = document.getElementById("cancel-goal");
const editGoalBtn = document.getElementById("editGoalBtn");
const cancelEditGoal = document.getElementById("cancelEditGoal");

const card = document.getElementById("hidden-card");
const hiddenBackground = document.getElementById("hidden-background");
const hiddenEditGoal = document.getElementById("hiddenEditGoal");

const toggle = () => {
	if (card.style.visibility === "hidden") {
		card.style.visibility = "visible";
		hiddenBackground.style.visibility = "visible";
	} else {
		card.style.visibility = "hidden";
		hiddenBackground.style.visibility = "hidden";
	}
};

const toggleBackground = () => {
	if (hiddenBackground.style.visibility === "visible") {
		hiddenGoal.style.visibility = "hidden";
		hiddenBackground.style.visibility = "hidden";
		card.style.visibility = "hidden";
		hiddenEditGoal.style.visibility = "hidden"
	}
};

const toggleGoal = () => {
	if (hiddenGoal.style.visibility === "hidden") {
		hiddenGoal.style.visibility = "visible";
		hiddenBackground.style.visibility = "visible";
	} else {
		hiddenGoal.style.visibility = "hidden";
		hiddenBackground.style.visibility = "hidden";
	}
};

const toggleEditGoal = () => {
	if (hiddenEditGoal.style.visibility === "hidden") {
		hiddenEditGoal.style.visibility = "visible";
		hiddenBackground.style.visibility = "visible";
	} else {
		hiddenEditGoal.style.visibility = "hidden";
		hiddenBackground.style.visibility = "hidden";
	}
};

goalBtn.addEventListener("click", toggleGoal);
editSalaryExpensesBtn.addEventListener("click", toggle);
hiddenBackground.addEventListener("click", toggleBackground);
cancelGoal.addEventListener("click", toggleGoal);
cancelBtn.addEventListener("click", toggle);
editGoalBtn.addEventListener("click", toggleEditGoal);
cancelEditGoal.addEventListener("click", toggleEditGoal)