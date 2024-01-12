import axios from "axios";
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
	{ text: "Месяц", value: "month" },
	{ text: "Квартал", value: "quarter" },
	{ text: "Полугодие", value: "halfyear" },
	{ text: "Год", value: "year" },
];

let usersList = [];

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
			changeValue(detailedSelect, { value: "Январь", text: "Январь" });
			break;
		case "quarter":
			if (isDetailedSelectHidden) {
				showDetailedSelect();
			}
			redrawItems(quarters, detailedSelect);
			changeValue(detailedSelect, { value: "I квартал", text: "I" });
			break;
		case "halfyear":
			if (isDetailedSelectHidden) {
				showDetailedSelect();
			}
			redrawItems(halfYears, detailedSelect);
			changeValue(detailedSelect, { value: "I полугодие", text: "I" });
			break;
		case "year":
			hideDetailedSelect();
			break;
	}
}

redrawItems(rootSelectItems, rootSelect);

init("month");

const usersContainer = document.querySelector(".settings__grid-users");

function drawUsers(usersArray, isEmpty = false) {
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
		drawUsers([{ name: "Совпадений нет", avatar: "./img/avatar.svg" }], true);
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
const settingsCloseButtonMain = document.querySelector(".settings__button-close-main");
const settingsCloseButton = document.querySelector(".settings__button-cancel");
const settingsOpenButton = document.querySelector(".plan__settings");

function toggleSettings() {
	settings.classList.toggle("settings-visible");
}

settingsCloseButtonMain.addEventListener("click", () => {
	toggleSettings();
});
settingsCloseButton.addEventListener("click", () => {
	toggleSettings();
});
settingsOpenButton.addEventListener("click", () => {
	toggleSettings();
});

// получение списка работников
// dev
// axios
// 	.get("http://localhost:3000/employeeList")
// 	.then((response) => {
// 		usersList = response.data;
// 		drawUsers(usersList);
// 	})
// 	.catch((e) => {
// 		console.log(e);
// 	});

// prod
axios
	.get("/sales_plan/api/get_users_list.php")
	.then((response) => {
		usersList = response.data;
		drawUsers(usersList);
	})
	.catch((e) => {
		console.log(e);
	});

const submitPlanButton = document.querySelector(".settings__button-save");
submitPlanButton.addEventListener("click", () => {
	const planData = [];
	let addedUsers = document.querySelectorAll(".settings__employee");
	addedUsers.forEach((user) => {
		planData.push({
			userId: user.getAttribute("data-user-id"),
			goal: user.querySelector(".settings__input").value,
		});
	});
	// отправляем их данные
	axios
		.post("submitPlanUrl", planData)
		.then(() => {
			console.log("Наааааааайс");
		})
		.catch((e) => {
			console.log("Вообще не нааааааааайс");
			console.log(e);
		});
});
