const mysql = require("mysql2/promise");

const login = async (req, res) => {
	state = "notsignedup";
	let sqlUsernameOrEmail = null;
	let sqlUserPassword = null;
	if (!req.body.user_name) {
		return res.render("login", {
			status: "username or email error",
		});
	} else if (!req.body.password) {
		return res.render("login", {
			status: "password error",
		});
	}
	const conn = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "12345678",
		database: "db",
	});
	// Query username or user email
	sqlUsernameOrEmail = await conn.query(
		"SELECT user_name, user_email FROM users WHERE user_name=? OR user_email=?",
		[req.body.user_name, req.body.user_name]
	);

	// Query user password
	sqlUserPassword = await conn.query(
		"SELECT password FROM users WHERE password=?",
		[req.body.password]
	);
	if (!sqlUsernameOrEmail[0][0]) {
		await conn.end();
		return res.render("login", {
			status: "Username or email address doesn't exist",
		});
	} else if (!sqlUserPassword[0][0]) {
		await conn.end();
		return res.render("login", { status: "Incorrect password" });
	}
	const userId = await conn.query("SELECT id FROM users WHERE user_name=?", [
		req.body.user_name,
	]);
	const posts = await conn.query(
		"SELECT housing, utilities, transportation, food, grocories, entertainment, healthcare, others FROM salary_expenses_date WHERE users_id=?",
		[userId[0][0].id]
	);
	let sum = 0;
	for (const post in posts[0][0]) sum += posts[0][0][post];
	const thePosts = await conn.query(
		"SELECT goal_name, goal_price, curr_amount FROM goals WHERE users_id=?",
		[userId[0][0].id]
	);
	await conn.end();
	module.exports.sqlUsernameOrEmail = sqlUsernameOrEmail[0][0].user_name;
	module.exports.sum = sum;
	module.exports.thePosts = thePosts[0];
	return res.render("app", {
		username: sqlUsernameOrEmail[0][0].user_name,
		postsSum: sum,
		goals: thePosts[0],
		status: "ok",
		check: null,
		color: "first",
	});
};
module.exports = login;
