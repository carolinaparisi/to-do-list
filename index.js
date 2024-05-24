window.onload = () => {
	console.log("Inside window.onload");

	const addButton = document.getElementById("add-button");
	console.log(addButton);
	addButton.addEventListener("click", handleAddButton);

	//I don't want the enter key to work once it is clicked:
	const form = document.getElementsByClassName("input-forms")[0];

	form.addEventListener("keydown", function preventEnter(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			return;
		}
	});
};

function handleAddButton(event) {
	event.preventDefault();

	const taskInput = document.getElementById("task-name");
	const descriptionInput = document.getElementById("description");

	addNewToDo(taskInput.value, descriptionInput.value);
	cleanInputs(taskInput, descriptionInput);
}

function addNewToDo(task, description) {
	const table = document.getElementsByTagName("table")[0];
	const tableRow = document.createElement("tr");

	const taskData = document.createElement("td");
	taskData.setAttribute("class", "border border-slate-700 px-6 py-8");
	taskData.innerText = task;

	const descriptionData = document.createElement("td");
	descriptionData.setAttribute("class", "border border-slate-700 px-6 py-8");
	descriptionData.innerText = description;

	const statusData = document.createElement("td");
	statusData.setAttribute("class", "border border-slate-700 px-6 py-8");
	statusData.innerText = "Incomplete";

	const actionsData = document.createElement("td");
	actionsData.setAttribute("class", "border border-slate-700 px-6 py-8");
	actionsData.setAttribute("id", "actions-td");
	createActionsBtn(actionsData, tableRow);

	tableRow.append(taskData, descriptionData, statusData, actionsData);
	table.append(tableRow);
}

function createActionsBtn(actionsData, tableRow) {
	//create the Actions buttons
	const toggleStatusBtn = document.createElement("button");
	toggleStatusBtn.setAttribute("class", "actions-btn");
	toggleStatusBtn.innerText = "Toggle Status";
	const deleteBtn = document.createElement("button");
	deleteBtn.setAttribute("id", `delete-btn`);
	deleteBtn.setAttribute("class", "actions-btn delete-btn");
	deleteBtn.innerText = "Delete";

	actionsData.append(toggleStatusBtn, deleteBtn);

	toggleStatusBtn.addEventListener("click", () => {
		handleToggleBtn(toggleStatusBtn, tableRow);
	});
	deleteBtn.addEventListener("click", () => {
		handleDeleteBtn(tableRow);
	});
}
function handleToggleBtn(toggleStatusBtn, tableRow) {
	//attribute which will make the btn's opacity change
	toggleStatusBtn.setAttribute("id", "toggle-btn");
	toggleStatusBtn.setAttribute("disabled", "");

	const statusCol = tableRow.children[2];
	console.log(statusCol);
	statusCol.innerText = "Complete";
}

function handleDeleteBtn(tableRow) {
	tableRow.remove();
}

function cleanInputs(taskInput, descriptionInput) {
	taskInput.value = "";
	descriptionInput.value = "";
}
