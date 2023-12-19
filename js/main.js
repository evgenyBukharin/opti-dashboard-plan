/******/ (() => {
	// webpackBootstrap
	/******/ var __webpack_modules__ = {
		/***/ 683: /***/ () => {
			const months = [
				"Январь",
				"Февраль",
				"Март",
				"Апрель",
				"Май",
				"Июнь",
				"Июль",
				"Август",
				"Сентябрь",
				"Октябрь",
				"Ноябрь",
				"Декабрь",
			];
			const quarters = ["I", "II", "III", "IV"];
			const halfYears = ["I", "II"];
			const years = [];
			const rootSelectItems = [
				{
					text: "Месяц",
					value: "month",
				},
				{
					text: "Квартал",
					value: "quarter",
				},
				{
					text: "Полугодие",
					value: "halfyear",
				},
				{
					text: "Год",
					value: "year",
				},
			];
			let usersList = [
				{
					userId: 0,
					name: "Суханов Тимофей Робертович",
					avatar: "./img/avatar.svg",
				},
				{
					userId: 1,
					name: "Третьяков Дмитрий Миронович",
					avatar: "./img/avatar.svg",
				},
				{
					userId: 2,
					name: "Сизов Матвей Артёмович",
					avatar: "./img/avatar.svg",
				},
				{
					userId: 3,
					name: "Казаков Марк Евгеньевич",
					avatar: "./img/avatar.svg",
				},
				{
					userId: 4,
					name: "Афанасьева Мария Михайловна",
					avatar: "./img/avatar.svg",
				},
				{
					userId: 5,
					name: "Гришин Михаил Степанович",
					avatar: "./img/avatar.svg",
				},
				{
					userId: 6,
					name: "Кузнецов Семён Семёнович",
					avatar: "./img/avatar.svg",
				},
				{
					userId: 7,
					name: "Егорова Марта Львовна",
					avatar: "./img/avatar.svg",
				},
			];
			const rootSelect = document.querySelector(".settings__select-dashed");
			const detailedSelect = document.querySelector(".settings__select-detailed");
			const yearSelect = document.querySelector(".setting__select-year");
			function getYearsArray(startYear) {
				let currentYear = new Date().getFullYear() + 1;
				while (startYear <= currentYear) {
					years.push("" + startYear++);
				}
				years.reverse();
			}
			getYearsArray(2018);
			let activeMode = "month";
			const modeList = {
				month: "Месяц",
				quarter: "Квартал",
				halfyear: "Полугодие",
				year: "Год",
			};
			const defaultSelects = document.querySelectorAll(".settings__select-default");
			let activeSelect = null;
			defaultSelects.forEach((select) => {
				const container = select.querySelector(".settings__container-value");
				const list = select.querySelector(".settings__list");
				container.addEventListener("click", () => {
					if (activeSelect !== null && activeSelect !== list) {
						activeSelect.classList.remove("settings__list-visible");
					}
					if (list.classList.contains("settings__list-visible")) {
						list.classList.remove("settings__list-visible");
						activeSelect = null;
					} else {
						list.classList.add("settings__list-visible");
						activeSelect = list;
					}
				});
			});
			function redrawItems(itemsArray, select) {
				const list = select.querySelector(".settings__list");
				const value = select.querySelector(".settings__value");
				list.innerHTML = "";
				let isItemObject = typeof itemsArray[0] == "object";
				itemsArray.forEach((item) => {
					let li = document.createElement("li");
					li.classList = "settings__item";
					if (isItemObject) {
						li.setAttribute("data-value", item.value);
						li.innerHTML = item.text;
						li.addEventListener("click", () => {
							const itemValue = li.getAttribute("data-value");
							if (value !== itemValue) {
								value.innerHTML = li.innerHTML;
								value.setAttribute("data-value", itemValue);
							}
							activeSelect.classList.remove("settings__list-visible");
							activeSelect = null;
						});
					} else {
						li.setAttribute("data-value", item);
						if (activeMode == "quarter" || activeMode == "halfyear") {
							li.innerHTML = item + " " + modeList[activeMode];
						} else {
							li.innerHTML = item;
						}
						li.addEventListener("click", () => {
							const itemValue = li.getAttribute("data-value");
							if (value !== itemValue) {
								value.innerHTML = itemValue;
								value.setAttribute("data-value", itemValue);
							}
							activeSelect.classList.remove("settings__list-visible");
							activeSelect = null;
						});
					}
					list.appendChild(li);
				});
			}
			let isDetailedSelectHidden = false;
			function hideDetailedSelect() {
				detailedSelect.classList.add("settings__select-hidden");
				isDetailedSelectHidden = true;
			}
			function showDetailedSelect() {
				detailedSelect.classList.remove("settings__select-hidden");
				isDetailedSelectHidden = false;
			}
			function changeValue(select, valueObj) {
				let valueEl = select.querySelector(".settings__value");
				valueEl.setAttribute("data-value", valueObj.value);
				valueEl.innerHTML = valueObj.text;
			}

			// отслеживаем изменения на root селекте
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					if (mutation.type === "attributes") {
						let newMode = mutation.target.getAttribute("data-value");
						activeMode = newMode;
						init(newMode);
					}
				});
			});
			observer.observe(document.querySelector(".settings__select-dashed .settings__value"), {
				attributes: true,
			});
			function init(mode) {
				switch (mode) {
					case "month":
						if (isDetailedSelectHidden) {
							showDetailedSelect();
						}
						redrawItems(months, detailedSelect);
						redrawItems(years, yearSelect);
						changeValue(detailedSelect, {
							value: "Январь",
							text: "Январь",
						});
						break;
					case "quarter":
						if (isDetailedSelectHidden) {
							showDetailedSelect();
						}
						redrawItems(quarters, detailedSelect);
						changeValue(detailedSelect, {
							value: "I квартал",
							text: "I",
						});
						break;
					case "halfyear":
						if (isDetailedSelectHidden) {
							showDetailedSelect();
						}
						redrawItems(halfYears, detailedSelect);
						changeValue(detailedSelect, {
							value: "I полугодие",
							text: "I",
						});
						break;
					case "year":
						hideDetailedSelect();
						break;
				}
			}
			redrawItems(rootSelectItems, rootSelect);
			init("month");
			const usersContainer = document.querySelector(".settings__grid-users");
			function drawUsers(usersArray) {
				let isEmpty = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
				usersContainer.innerHTML = "";
				usersArray.forEach((user) => {
					let div = document.createElement("div");
					div.classList = "settings__item-user";
					if (isEmpty == false) {
						let formattedName = user.name.split(" ");
						formattedName[1] = formattedName[1].split("")[0] + ".";
						formattedName[2] = formattedName[2].split("")[0] + ".";
						div.innerHTML = `
				<img
					src="${user.avatar}"
					class="image settings__avatar"
					width="32"
					height="32"
					alt="Аватар"
				/>
				<div class="settings__name">${formattedName.join(" ")}</div>
			`;
						div.addEventListener("click", () => {
							addNewEmployee(user);
						});
					} else {
						div.classList.add("settings__item-user-blocked");
						div.innerHTML = `
				<img
					src="${user.avatar}"
					class="image settings__avatar"
					width="32"
					height="32"
					alt="Аватар"
				/>
				<div class="settings__name">${user.name}</div>
			`;
					}
					usersContainer.appendChild(div);
				});
			}
			const addedUsersList = document.querySelector(".settings__row-users");
			let bannedUserIds = [];
			function addNewEmployee(user) {
				if (bannedUserIds.includes(user.userId)) {
					return;
				}
				let formattedName = user.name.split(" ");
				formattedName[1] = formattedName[1].split("")[0] + ".";
				formattedName[2] = formattedName[2].split("")[0] + ".";
				let div = document.createElement("div");
				div.classList = "settings__employee";
				div.setAttribute("data-user-id", user.userId);
				div.innerHTML = `
		<div class="settings__user settings__user-visible">
			<div class="settings__column">
				<img
					src="${user.avatar}"
					class="image settings__avatar"
					width="32"
					height="32"
					alt="Аватар"
				/>
				<div class="settings__name">${formattedName.join(" ")}</div>
			</div>
			<input type="text" id="input0" class="settings__input" placeholder="Например: 20 000" />
		</div>
		<button class="btn-reset settings__button-close-bx">
			<img
				src="./img/close-bx.svg"
				class="image settings__avatar"
				width="10"
				height="10"
				alt="Аватар"
			/>
		</button>
	`;
				// функционал кнопки удаления
				let deleteUserBtn = div.querySelector(".settings__button-close-bx");
				deleteUserBtn.addEventListener("click", function () {
					let tempContainer = this.closest(".settings__employee");
					let idxToRemove = bannedUserIds.findIndex((arrayIndex) => {
						return arrayIndex == tempContainer.getAttribute("data-user-id");
					});
					bannedUserIds.splice(idxToRemove, 1);
					tempContainer.remove();
					if (checkIsAddedUsersEmpty()) {
						addedUsersList.classList.add("settings__row-users-empty");
					}
					makeScrollMagic();
				});
				addedUsersList.appendChild(div);
				makeScrollMagic();
				bannedUserIds.push(user.userId);
				if (checkIsAddedUsersEmpty() == false) {
					addedUsersList.classList.remove("settings__row-users-empty");
				}
			}
			drawUsers(usersList);
			function checkIsAddedUsersEmpty() {
				if (bannedUserIds.length == 0) {
					return true;
				} else {
					return false;
				}
			}
			const searchInput = document.getElementById("search");
			searchInput.addEventListener("input", () => {
				let filteredUsers = usersList.filter((user) => {
					return user.name.includes(searchInput.value);
				});
				if (filteredUsers.length !== 0) {
					drawUsers(filteredUsers);
				} else {
					drawUsers(
						[
							{
								name: "Совпадений нет",
								avatar: "./img/avatar.svg",
							},
						],
						true
					);
				}
			});
			const usersSelect = document.querySelector(".settings__select-users");
			const usersSelectToggle = document.querySelector(".settings__title-dashed");
			const usersSelectCloseButton = document.querySelector(".settings__button-close-users");
			function toggleUsersSelect() {
				usersSelect.classList.toggle("settings__select-users-visible");
			}
			function makeScrollMagic() {
				let hasVerScroll = addedUsersList.scrollHeight > addedUsersList.clientHeight;
				if (hasVerScroll) {
					addedUsersList.style.paddingRight = "7px";
				} else {
					addedUsersList.style.paddingRight = "0";
				}
			}
			usersSelectToggle.addEventListener("click", () => {
				toggleUsersSelect();
			});
			usersSelectCloseButton.addEventListener("click", () => {
				toggleUsersSelect();
			});
			const settings = document.querySelector(".settings");
			const settingsCloseButton = document.querySelector(".settings__button-close-main");
			const settingsOpenButton = document.querySelector(".plan__settings");
			function toggleSettings() {
				settings.classList.toggle("settings-visible");
			}
			settingsCloseButton.addEventListener("click", () => {
				toggleSettings();
			});
			settingsOpenButton.addEventListener("click", () => {
				toggleSettings();
			});

			/***/
		},

		/***/ 602: /***/ () => {
			const gearButton = document.querySelector(".plan__settings");

			/***/
		},

		/******/
	};
	/************************************************************************/
	/******/ // The module cache
	/******/ var __webpack_module_cache__ = {};
	/******/
	/******/ // The require function
	/******/ function __webpack_require__(moduleId) {
		/******/ // Check if module is in cache
		/******/ var cachedModule = __webpack_module_cache__[moduleId];
		/******/ if (cachedModule !== undefined) {
			/******/ return cachedModule.exports;
			/******/
		}
		/******/ // Create a new module (and put it into the cache)
		/******/ var module = (__webpack_module_cache__[moduleId] = {
			/******/ // no module.id needed
			/******/ // no module.loaded needed
			/******/ exports: {},
			/******/
		});
		/******/
		/******/ // Execute the module function
		/******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
		/******/
		/******/ // Return the exports of the module
		/******/ return module.exports;
		/******/
	}
	/******/
	/************************************************************************/
	var __webpack_exports__ = {};
	// This entry need to be wrapped in an IIFE because it need to be in strict mode.
	(() => {
		"use strict"; // CONCATENATED MODULE: ./src/js/_vars.js

		/* harmony default export */ const _vars = {
			windowEl: window,
			documentEl: document,
			htmlEl: document.documentElement,
			bodyEl: document.body,
		}; // CONCATENATED MODULE: ./src/js/components/dashboard-content.js
		// набор данных
		const dashboardData = {
			mainTarget: 5230000,
			sellingPlanData: [
				{
					heading: "Общее (услуги)",
					currentValue: 400000,
					allValue: 900000,
				},
				{
					heading: "Продвижение и реклама",
					currentValue: 0,
					allValue: 200000,
				},
				{
					heading: "Поддержка - Правки",
					currentValue: 0,
					allValue: 50000,
				},
				{
					heading: "БУС сайты",
					currentValue: 36000,
					allValue: 1200000,
				},
				{
					heading: "Б24 CRM",
					currentValue: 944000,
					allValue: 800000,
				},
				{
					heading: "Лицензии (повторно)",
					currentValue: 168000,
					allValue: 700000,
				},
				{
					heading: "Тендеры",
					currentValue: 0,
					allValue: 1000000,
				},
			],
			graphDataQuarter: {
				heading: "Выполнение плана по направлениям",
				allValue: 5230000,
				currentValue: 1905144,
			},
			graphDataYear: {
				heading: "Выполнение плана по направлениям",
				allValue: 15230000,
				currentValue: 1905144,
			},
		};
		const singleMonths = /* unused pure expression or super */ null && [
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
				<h5 class="title plan__text-all" data-all="${this.allValue}">${formatNumber(this.allValue)} руб.</h5>
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
		class SingleRowGraph {
			constructor(properties) {
				this.heading = properties.heading;
				this.currentValue = properties.currentValue;
				this.allValue = properties.allValue;
			}
			get widthPersent() {
				return (this.currentValue / this.allValue) * 100;
			}
			get remainingValue() {
				return this.allValue - this.currentValue;
			}
			formatNumber(value) {
				return new String(value).replace(/(\d)(?=(\d{3})+$)/g, "$1 ");
			}
			calculateLeftPosition(start, end) {
				if (typeof start == "number" && typeof end == "number") {
					let now = new Date();
					let endYear = new Date(now.getFullYear(), 0, -1, 0, 0);
					let day = Math.round((now - endYear) / 1000 / 60 / 60 / 24);
					return (day / end) * 100;
				} else {
					let now = new Date();
					let endYear = new Date(now.getFullYear(), 0, -1, 0, 0);
					let todayDaysAfterYearStart = Math.round((now - endYear) / 1000 / 60 / 60 / 24);
					let startDaysAfterYearStart = Math.round((start - endYear) / 1000 / 60 / 60 / 24);
					let diff = todayDaysAfterYearStart - startDaysAfterYearStart;
					return (diff / 90) * 100;
				}
			}
			getHtmlNode(mode) {
				let newGraph = document.createElement("div");
				newGraph.classList = "plan__row-graph-single";
				newGraph.innerHTML = `
			<div class="plan__container-graph">
				<h4 class="title plan__title-graph">Выполнение плана по направлениям</h4>
				<div class="plan__row-graph">
					<div class="plan__graph" data-current="${this.currentValue}">
						<div class="plan__track"></div>
					</div>
					<h5 class="title plan__text-all" data-all="${this.allValue}">${formatNumber(this.remainingValue)} руб.</h5>
					<div class="plan__container-dateline">
						<div class="plan__dateline">
						</div>
						<span class="plan__text-dateline plan__text-dateline-start"></span>
						<span class="plan__text-dateline plan__text-dateline-end"></span>
						<div class="plan__container-today">
							<div class="plan__text-today">Сегодня</div>
							<div class="plan__text-date-today"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="plan__container-stats">
				<div class="plan__stat plan__stat-done">
					<h4 class="title plan__title-stat">Выполнено</h4>
					<h2 class="title plan__title-h2">
						<span class="plan__text-value-stat">${formatNumber(this.currentValue)}</span>
						<span class="plan__text-currency-stat">руб.</span>
					</h2>
				</div>
				<div class="plan__stat plan__stat-remaining">
					<h4 class="title plan__title-stat">Осталось</h4>
					<h2 class="title plan__title-h2">
						<span class="plan__text-value-stat">${formatNumber(this.remainingValue)}</span>
						<span class="plan__text-currency-stat">руб.</span>
					</h2>
				</div>
				<div class="plan__stat plan__stat-persentage">
					<h4 class="title plan__title-stat">Выполнение плана</h4>
					<h2 class="title plan__title-h2">
						<span class="plan__text-value-stat">${Math.round(this.widthPersent)}</span>
						<span class="plan__text-currency-stat">%</span>
					</h2>
				</div>
			</div>
		`;
				// рисуем график
				let track = newGraph.querySelector(".plan__track");
				if (this.widthPersent !== 0) {
					if (this.widthPersent > 95) {
						track.classList.add("plan__track-toleft");
					}
					track.style.width = this.widthPersent + "%";
					track.setAttribute("data-width", Math.round(this.widthPersent) + "%");
				} else {
					track.style.width = "4px";
					track.setAttribute("data-width", 0 + "%");
				}

				// рисуем черточки
				const dateline = newGraph.querySelector(".plan__dateline");
				for (let i = 0; i < quartersLinesCount[mode]; i++) {
					let span = document.createElement("span");
					span.classList = "plan__line";
					dateline.appendChild(span);
				}
				let date = new Date();
				const todayContainer = newGraph.querySelector(".plan__container-today");
				const todayText = newGraph.querySelector(".plan__text-date-today");
				// считаем даты
				if (mode == "quarter") {
					let currentMonthId = date.getMonth();
					let currentQuarter = quarters[currentMonthId];
					let firstDay = new Date(date.getFullYear(), quartersReverse[currentQuarter][0], 1);
					let lastDay = new Date(date.getFullYear(), quartersReverse[currentQuarter][2] + 1, 0);
					let firstDayText = "1 " + months[firstDay.getMonth()];
					let lastDayText =
						getLastDayOfMonth(lastDay.getFullYear(), lastDay.getMonth()).getDate() +
						" " +
						months[lastDay.getMonth()];
					newGraph.querySelector(".plan__text-dateline-start").innerHTML = firstDayText;
					newGraph.querySelector(".plan__text-dateline-end").innerHTML = lastDayText;
					todayText.innerHTML = date.getDate() + " " + months[date.getMonth()];
					todayContainer.style.left = this.calculateLeftPosition(firstDay, lastDay) + "%";
				}
				if (mode == "year") {
					newGraph.querySelector(".plan__text-dateline-start").innerHTML = "1 января";
					newGraph.querySelector(".plan__text-dateline-end").innerHTML = "31 декабря";
					todayText.innerHTML = date.getDate() + " " + months[date.getMonth()];
					todayContainer.style.left = this.calculateLeftPosition(1, 365) + "%";
				}
				return newGraph;
			}
		}
		function getLastDayOfMonth(year, month) {
			return new Date(year, month + 1, 0);
		}
		function init(dashboardData) {
			mainTargetEl.innerHTML = formatNumber(dashboardData.mainTarget);
			currYearEl.innerHTML = new Date().getFullYear();
			dashboardData.sellingPlanData.forEach((obj) => {
				graphsList.appendChild(new RowGraph(obj).getHtmlNode());
			});
			graphsList.insertAdjacentElement(
				"afterend",
				new SingleRowGraph(dashboardData.graphDataYear).getHtmlNode("year")
			);
			graphsList.insertAdjacentElement(
				"afterend",
				new SingleRowGraph(dashboardData.graphDataQuarter).getHtmlNode("quarter")
			);
		}
		init(dashboardData);

		// axios
		// 	.get("dashboardDataUrl")
		// 	.catch((e) => {
		// 		console.log(e);
		// 	});
		// EXTERNAL MODULE: ./src/js/components/plan-settings.js
		var plan_settings = __webpack_require__(602);
		// EXTERNAL MODULE: ./src/js/components/custom-selects.js
		var custom_selects = __webpack_require__(683); // CONCATENATED MODULE: ./src/js/_components.js // CONCATENATED MODULE: ./src/js/main.js
	})();

	/******/
})();
