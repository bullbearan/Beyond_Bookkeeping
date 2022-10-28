const donPosts = async () => {
	const response = await fetch("http://localhost:5000/mysqlPosts");
	const datas = await response.json();
	const labels = [
		"Housing",
		"Utilities",
		"Transportation",
		"Food",
		"Grocories",
		"Entertainment",
		"Healthcare",
		"Others",
	];
	const data = {
		labels: labels,
		datasets: [
			{
				backgroundColor: [
					"#D52DB7",
					"#6050DC",
					"#0568FF",
					"#2EFFAF",
					"#E6FF69",
					"#FFAB05",
					"#FF6B45",
					"#FF2E7E",
				],
				hoverBackgroundColor: [
					"#D52DB7",
					"#6050DC",
					"#0568FF",
					"#2EFFAF",
					"#E6FF69",
					"#FFAB05",
					"#FF6B45",
					"#FF2E7E",
				],
				borderWidth: 0,
				data: [
					datas.others,
					datas.healthcare,
					datas.entertainment,
					datas.grocories,
					datas.food,
					datas.transportation,
					datas.utilities,
					datas.housing,
				],
			},
		],
	};
	const config = {
		type: "doughnut",
		data: data,
		options: {
			cutout: 80,
			plugins: {
				legend: false,
				tooltip: {
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
								}).format(context.parsed);
							}
							return label;
						},
					},
				},
			},
		},
		plugins: [],
	};
	const myDoughnutChart = new Chart(
		document.getElementById("myDoughnutChart"),
		config
	);
};

donPosts();
