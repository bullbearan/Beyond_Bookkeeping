const mysql = require("mysql2/promise");

function getMonthFromString(mon) {
	var d = Date.parse(mon + "1, 2012");
	if (!isNaN(d)) {
		return new Date(d).getMonth() + 1;
	}
	return -1;
}

const editGoals = async (req, res) => {
	const goalUser = require("../models/login");
	let deUser = require("../models/first_time_signing_up");
	let goalUsername = null;
	let toPass = null;
	let thePeriod = null;
	const conn = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "12345678",
		database: "db",
	});
	if (state === "signedup") {
		goalUsername = await conn.query(
			"SELECT user_name, id FROM users WHERE id=?",
			[deUser.user]
		);
		toPass = goalUsername[0][0].user_name;
	} else {
		goalUsername = await conn.query(
			"SELECT user_name, id FROM users WHERE user_name=?",
			[goalUser.sqlUsernameOrEmail]
		);
		toPass = goalUsername[0][0].user_name;
	}
	const goalsPosts = await conn.query(
		"SELECT housing, utilities, transportation, food, grocories, entertainment, healthcare, others FROM salary_expenses_date WHERE users_id=?",
		[goalUsername[0][0].id]
	);
	let goalSum = 0;
	for (const post in goalsPosts[0][0]) goalSum += goalsPosts[0][0][post];
	const goalAmount = await conn.query(
		"SELECT goal_price FROM goals WHERE users_id=? AND goal_name=?",
		[goalUsername[0][0].id, req.body.title.toLowerCase()]
	);
	for (const post in goalsPosts[0][0]) goalSum += goalsPosts[0][0][post];
	if (getMonthFromString(req.body.period) - new Date().getMonth() + 1 < 0)
		thePeriod =
			getMonthFromString(req.body.period) -
			(new Date().getMonth() + 1) +
			12;
	else
		thePeriod =
			parseInt(getMonthFromString(req.body.period), 10) -
			(new Date().getMonth() + 1);
	const goalsInput = {
		goal_monthly_savings: (
			(parseInt(goalAmount[0][0].goal_price, 10) -
				parseInt(req.body.current, 10)) /
			thePeriod
		).toFixed(2),
		curr_amount: req.body.current,
		goal_period: getMonthFromString(req.body.period),
	};
	await conn.query("UPDATE goals SET ? WHERE users_id=? AND goal_name=?", [
		goalsInput,
		goalUsername[0][0].id,
		req.body.title.toLowerCase(),
	]);
	const posts = await conn.query(
		"SELECT goal_name, goal_price, curr_amount FROM goals WHERE users_id=?",
		[goalUsername[0][0].id]
	);
	await conn.end();
	return res.render("app", {
		username: toPass,
		postsSum: goalSum,
		goals: posts[0],
		status: "ok",
		check: null,
		color: "first",
	});
};

module.exports = editGoals;
