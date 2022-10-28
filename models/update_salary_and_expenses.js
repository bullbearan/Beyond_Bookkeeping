const mysql = require("mysql2/promise");

const updateSalaryExpenses = async (req, res) => {
	const user = require("../models/login");
	let deUser = require("../models/first_time_signing_up");
	let goalUsername = null;
	let toPass = null;
	const getUserPost = {
		salary: req.body.salary,
		housing: req.body.housing,
		utilities: req.body.utilities,
		transportation: req.body.transportation,
		food: req.body.food,
		grocories: req.body.grocories,
		entertainment: req.body.entertainment,
		healthcare: req.body.healthcare,
		others: req.body.others,
	};
	let sumAll = 0;
	for (const post in getUserPost) {
		if (post !== "salary") sumAll += parseInt(getUserPost[post], 10);
	}
	const conn = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "12345678",
		database: "db",
	});
	if (deUser.user) {
		goalUsername = await conn.query(
			"SELECT user_name, id FROM users WHERE id=?",
			[deUser.user]
		);
		toPass = goalUsername[0][0];
		deUser = null;
	} else {
		goalUsername = await conn.query(
			"SELECT user_name, id FROM users WHERE user_name=?",
			[user.sqlUsernameOrEmail]
		);
		toPass = goalUsername[0][0];
	}
	await conn.query("UPDATE salary_expenses_date SET ?", getUserPost);
	const thPosts = await conn.query(
		"SELECT goal_name, goal_price, curr_amount FROM goals WHERE users_id=?",
		[goalUsername[0][0].id]
	);
	await conn.end();
	return res.render("app", {
		username: toPass.user_name,
		postsSum: sumAll,
		goals: thPosts[0],
		status: "ok",
		check: null,
		color: "first",
	});
};

module.exports = updateSalaryExpenses;
