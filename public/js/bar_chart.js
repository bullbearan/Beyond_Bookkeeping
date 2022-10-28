const posts = async () => {
	const response = await fetch("http://localhost:5000/mysqlPosts");
	const data = await response.json();
	const barLabels = [
		"Housing",
		"Utilities",
		"Transportation",
		"Food",
		"Grocories",
		"Entertainment",
		"Healthcare",
		"Others",
	];
	const barData = {
		labels: barLabels,
		datasets: [
			{
				data: [
					data.housing,
					data.utilities,
					data.transportation,
					data.food,
					data.grocories,
					data.entertainment,
					data.healthcare,
					data.others,
				],
				backgroundColor: [
					"#FF2E7E",
					"#FF6B45",
					"#FFAB05",
					"#E6FF69",
					"#2EFFAF",
					"#0568FF",
					"#6050DC",
					"#D52DB7",
				],
				hoverBackgroundColor: [
					"#FF2E7E",
					"#FF6B45",
					"#FFAB05",
					"#E6FF69",
					"#2EFFAF",
					"#0568FF",
					"#6050DC",
					"#D52DB7",
				],
				barThickness: 26,
			},
		],
	};

	const barConfig = {
		type: "bar",
		data: barData,
		options: {
			plugins: {
				legend: false,
				tooltip: {
					displayColors: false,
					callbacks: {
						label: function (context) {
							let label = context.dataset.label || "";

							if (label) {
								label += ": ";
							}
							if (context.parsed.y !== null) {
								label += new Intl.NumberFormat("en-US", {
									style: "currency",
									currency: "USD",
								}).format(context.parsed.y);
							}
							return label;
						},
					},
				},
			},
			scales: {
				x: {
					display: false,
				},
				y: {
					beginAtZero: true,
					max: Math.max(
						data.housing,
						data.utilities,
						data.transportation,
						data.food,
						data.grocories,
						data.entertainment,
						data.healthcare,
						data.others
					),
					ticks: {
						stepSize: Math.floor(
							Math.max(
								data.housing,
								data.utilities,
								data.transportation,
								data.food,
								data.grocories,
								data.entertainment,
								data.healthcare,
								data.others
							) / 5
						),
						callback: function (value, index, ticks) {
							return "$ " + value;
						},
					},
				},
			},
			maintainAspectRatio: false,
		},
	};

	const myBArChart = new Chart(
		document.getElementById("myBarChart"),
		barConfig
	);
};

posts();
