import axios from "axios";

// набор данных
const dashboardData = {
	mainTarget: 3840,
	sellingPlanData: [
		{
			heading: "Суханов Тимофей Робертович",
			currentValue: 35,
			allValue: 80,
		},
		{
			heading: "Третьяков Дмитрий Миронович",
			currentValue: 350,
			allValue: 590,
		},
		{
			heading: "Сизов Матвей Артёмович",
			currentValue: 100,
			allValue: 380,
		},
		{
			heading: "Казаков Марк Евгеньевич",
			currentValue: 180,
			allValue: 1080,
		},
		{
			heading: "Афанасьева Мария Михайловна",
			currentValue: 630,
			allValue: 780,
		},
		{
			heading: "Гришин Михаил Степанович",
			currentValue: 120,
			allValue: 340,
		},
		{
			heading: "Кузнецов Семён Семёнович",
			currentValue: 275,
			allValue: 450,
		},
		{
			heading: "Егорова Марта Львовна",
			currentValue: 17,
			allValue: 140,
		},
	],
};

const singleMonths = [
	"январь",
	"февраль",
	"март",
	"апрель",
	"май",
	"июнь",
	"июль",
	"август",
	"сентябрь",
	"октябрь",
	"ноябрь",
	"декабрь",
];

const months = [
	"января",
	"февраля",
	"марта",
	"апреля",
	"мая",
	"июня",
	"июля",
	"августа",
	"сентября",
	"октября",
	"ноября",
	"декабря",
];

const quartersLinesCount = {
	year: 34,
	quarter: 10,
};

const quarters = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4];

const quartersReverse = {
	1: [0, 1, 2],
	2: [3, 4, 5],
	3: [6, 7, 8],
	4: [9, 10, 11],
};

const mainTargetEl = document.querySelector(".plan__text-value");
const graphsList = document.querySelector(".plan__graphs");
const currYearEl = document.querySelector(".plan__text-period-year");

function formatNumber(value) {
	return new String(value).replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
}

class RowGraph {
	constructor(properties) {
		this.heading = properties.heading;
		this.currentValue = properties.currentValue;
		this.allValue = properties.allValue;
	}
	getHtmlNode() {
		let newGraph = document.createElement("div");
		newGraph.classList = "plan__container-graph";
		newGraph.innerHTML = `
			<h4 class="title plan__title-graph">${this.heading}</h4>
			<div class="plan__row-graph">
				<div class="plan__graph" data-current="${this.currentValue}">
					<div class="plan__track"></div>
				</div>
				<h5 class="title plan__text-all" data-all="${this.allValue}">${formatNumber(this.allValue)} тонн</h5>
			</div>
		`;

		let track = newGraph.querySelector(".plan__track");
		let widthPersent = (this.currentValue / this.allValue) * 100;
		if (widthPersent !== 0) {
			if (widthPersent > 95) {
				track.classList.add("plan__track-toleft");
			}
			track.style.width = widthPersent + "%";
			track.setAttribute("data-width", Math.round(widthPersent) + "%");
		} else {
			track.style.width = "4px";
			track.setAttribute("data-width", 0 + "%");
		}
		return newGraph;
	}
}
function init(dashboardData) {
	mainTargetEl.innerHTML = formatNumber(dashboardData.mainTarget);
	currYearEl.innerHTML = new Date().getFullYear();
	dashboardData.sellingPlanData.forEach((obj) => {
		graphsList.appendChild(new RowGraph(obj).getHtmlNode());
	});
}

init(dashboardData);

// axios
// 	.get("dashboardDataUrl")
// 	.catch((e) => {
// 		console.log(e);
// 	});
