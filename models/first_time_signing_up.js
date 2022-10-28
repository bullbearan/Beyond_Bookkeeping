const mysql = require("mysql2/promise");

const firstTimeSigningUp = async (req, res) => {
	const user = require("../models/sign_up");
	if (!req.body.salary) {
		return res.render("first_time_signing_up", { status: "salary error" });
	} else if (!req.body.housing) {
		return res.render("first_time_signing_up", { status: "housing error" });
	} else if (!req.body.utilities) {
		return res.render("first_time_signing_up", {
			status: "utilities error",
		});
	} else if (!req.body.transportation) {
		return res.render("first_time_signing_up", {
			status: "transportation error",
		});
	} else if (!req.body.food) {
		return res.render("first_time_signing_up", { status: "food error" });
	} else if (!req.body.grocories) {
		return res.render("first_time_signing_up", {
			status: "grocories error",
		});
	} else if (!req.body.entertainment) {
		return res.render("first_time_signing_up", {
			status: "entertainment error",
		});
	} else if (!req.body.healthcare) {
		return res.render("first_time_signing_up", {
			status: "healthcare error",
		});
	} else if (!req.body.others) {
		return res.render("first_time_signing_up", { status: "others error" });
	}
	state = "signedup";
	const conn = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "12345678",
		database: "db",
	});
	const post = {
		users_id: user.userId,
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
	let firstTimeSigningUpSum = 0;
	for (const sPost in post) {
		if (sPost !== "users_id" && sPost !== "salary")
			firstTimeSigningUpSum += parseInt(post[sPost]);
	}
	if (firstTimeSigningUpSum > req.body.salary) {
		await conn.end();
		return res.render("first_time_signing_up", { status: "too high" });
	}
	await conn.query("INSERT INTO salary_expenses_date SET ?", post);
	const theUser = await conn.query("SELECT user_name FROM users WHERE id=?", [
		user.userId,
	]);
	const dePosts = await conn.query(
		"SELECT goal_name, goal_price, curr_amount FROM goals WHERE users_id=?",
		[user.userId]
	);
	module.exports.user = user.userId;
	module.exports.ssum = firstTimeSigningUpSum;
	module.exports.dePosts = dePosts[0];
	await conn.end();
	return res.render("app", {
		username: theUser[0][0].user_name,
		postsSum: firstTimeSigningUpSum,
		goals: dePosts[0],
		status: null,
		check: "sign-up",
		color: "first",
	});
};

module.exports = firstTimeSigningUp;
