const mysql = require("mysql2/promise");

const navIcons = async (req, res) => {
	const goalUser = require("../models/login");
	let deUser = require("../models/first_time_signing_up");
	let goalUsername = null;
	let toPass = null;
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

module.exports = navIcons;
