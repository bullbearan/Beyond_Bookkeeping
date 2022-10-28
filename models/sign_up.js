const mysql = require("mysql2/promise");

const register = async (req, res) => {
	const validateEmail = (email) => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};
	if (!req.body.fname) {
		return res.render("sign_up", { status: "fname error" });
	} else if (!req.body.email) {
		return res.render("sign_up", { status: "email error" });
	} else if (!req.body.password) {
		return res.render("sign_up", { status: "password error" });
	} else if (!req.body.conf_password) {
		return res.render("sign_up", { status: "conf password error" });
	}
	const conn = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "12345678",
		database: "db",
	});
	// Query the username from the database
	let sqlResults = await conn.query(
		"SELECT user_name FROM users WHERE user_name=?",
		[req.body.fname]
	);
	const sqlUsername = sqlResults[0][0]
		? sqlResults[0][0].user_name
		: undefined;
	if (sqlUsername) {
		await conn.end();
		return res.render("sign_up", { status: "user exists" });
	}

	// Query the email from the database
	sqlResults = await conn.query(
		"SELECT user_email FROM users WHERE user_email=?",
		[req.body.email]
	);
	const sqlEmail = sqlResults[0][0] ? sqlResults[0][0].user_email : undefined;
	if (sqlEmail) {
		await conn.end();
		return res.render("sign_up", { status: "email exists" });
	} else if (!validateEmail(req.body.email)) {
		await conn.end();
		return res.render("sign_up", { status: "email not valid" });
	}
	// Check for user password and confirm user password
	if (req.body.password.length < 5) {
		await conn.end();
		return res.render("sign_up", { status: "password length < 5" });
	}
	if (req.body.password !== req.body.conf_password) {
		await conn.end();
		return res.render("sign_up", { status: "password does not match" });
	}
	const post = {
		user_name: req.body.fname,
		user_email: req.body.email,
		password: req.body.password,
	};
	await conn.query("INSERT INTO users SET ?", post);
	sqlResults = await conn.query("SELECT id FROM users WHERE user_name=?", [
		req.body.fname,
	]);
	let userId = sqlResults[0][0].id;
	await conn.end();
	module.exports.userId = userId;
	return res.render("first_time_signing_up", { status: null });
};
module.exports = register;
