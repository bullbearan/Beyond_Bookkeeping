const mysql = require("mysql2/promise");

const fetchPosts = async (req, res) => {
	const user = require("../models/login");
	const conn = await mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "12345678",
		database: "db",
	});
	// Query username or user email
	const userId = await conn.query(
		"SELECT id FROM users WHERE user_name='ahmed'",
		[user.sqlUsernameOrEmail]
	);
	const posts = await conn.query(
		"SELECT housing, utilities, transportation, food, grocories, entertainment, healthcare, others FROM salary_expenses_date WHERE users_id=?",
		[userId[0][0].id]
	);
	await conn.end();
	return res.json(posts[0][0]);
};

module.exports = fetchPosts;
