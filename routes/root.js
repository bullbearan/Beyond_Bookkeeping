const express = require("express");
const router = express.Router();
const register = require("../models/sign_up");
const login = require("../models/login");
const fetchPosts = require("../models/fetch_posts");
const firstTimeSigningUp = require("../models/first_time_signing_up");
const updateSalaryExpenses = require("../models/update_salary_and_expenses");
const Setupgoals = require("../models/goals");
const navIcons = require("../models/nav_icons");
const getSavings = require("../models/nav_icons_savings");
const editGaols = require("../models/edit_goals");
var state = null;

// Landing page
router.get("/", (req, res) => {
	res.sendFile("index.html", { root: "." });
});

// Fetches user expenses from the database
router.get("/mysqlPosts", fetchPosts);

// Sign-up page
router.get("/sign-up", (req, res) => {
	res.render("sign_up", { status: null });
});

// If user signs up it will take him to the first time signing up page
router.post("/Welcome", register);

router.get("/Welcome-to-the-app", navIcons);

// If the user enters his expenses it will take him to the app page
router.post("/Welcome-to-the-app", firstTimeSigningUp);

// Login page
router.get("/login", (req, res) => {
	res.render("login", { status: null });
});

router.get("/app", navIcons);

// If user logs in it will take him to the app page
router.post("/app", login);

router.post("/updated", updateSalaryExpenses);

router.post("/goals", Setupgoals);

router.get("/app-savings", getSavings);

router.post("/edit-goals", editGaols);

// Export to server.js file
module.exports = router;
