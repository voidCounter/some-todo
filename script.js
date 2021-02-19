const todoList = document.getElementsByClassName("todo-list")[0];
const newTodoInput = document.getElementById("todo-box");
const activeCountSpan= document.getElementById("active-count");
let activeCount = 0;
let progressCount = 0;
let doneCount = 0;
const functionalities = {
	eventListeners : {
		newTodo : () => {
			window.addEventListener("keypress", () => {
				newTodoInput.focus();
			})
			const todoContainer = document.getElementsByClassName("add-new-btn")[0];
			newTodoInput.addEventListener("focusin", () => {
				todoContainer.classList.add("focused");
			});
			newTodoInput.addEventListener("keypress", (keypressed) => {
				if(keypressed.key === "Enter"){
					controller.todoCounter +=1;
					const presentTodoCount = controller.todoCounter;
					changeView.singleTodoView.createNewTodo(newTodoInput.value, presentTodoCount);
					functionalities.eventListeners.doneBtn(presentTodoCount);
					functionalities.eventListeners.removeBtn(presentTodoCount);
				}
			});
		},
		doneBtn : (presentTodoCount) => {
			const notDoneIcon = document.getElementsByClassName(`check-${presentTodoCount}`)[0];
			notDoneIcon.addEventListener("click",() => {
				if(notDoneIcon.classList.contains("fa-circle")){
					notDoneIcon.classList.replace("fa-circle", "fa-check-circle");
				}
				else{
					notDoneIcon.classList.replace("fa-check-circle", "fa-circle");
				}
				changeView.singleTodoView.removeATodo(`todo-${presentTodoCount}`, true);
			})
		},
		removeBtn : (presentTodoCount) => {
			const targetBtn = document.getElementsByClassName(`remove-${presentTodoCount}`)[0];
			targetBtn.addEventListener("click", () => {
				changeView.singleTodoView.removeATodo(`todo-${presentTodoCount}`, false);
			})
		}
	}

};
const changeView = {
	singleTodoView : {
		createNewTodo : (todoName, presentTodoCount) => {
			activeCount +=1;
			progressCount +=1;
			doneCount = 0;
			const singleTodoContainer = document.createElement("div");
			singleTodoContainer.classList.add("single-todo-container", `todo-${presentTodoCount}`);
			singleTodoContainer.innerHTML =
				`
					<div class = "single-todo">
						<i class="far fa-circle check-${presentTodoCount}"></i>
						<input class = "todo-${presentTodoCount}" value="${todoName}">
						<i class="far fa-times-circle remove-${presentTodoCount} remove-todo"></i>
					</div>
				`
			todoList.append(singleTodoContainer);
			newTodoInput.value = '';
			changeView.activeCounter();
			changeView.progress();
		},
		removeATodo: (todoClass, isDone) => {
			const [targetTodo, targetTodoName] = document.getElementsByClassName(todoClass);
			if(isDone){
				doneCount +=1;
				progressCount -=1;
				targetTodoName.classList.add("strike");
			}
			else{
				activeCount -=1;
				progressCount -=1;
			}
			targetTodo.classList.add("unfocused");
			setTimeout(() => {
				todoList.removeChild(targetTodo);
			}, 500);

			changeView.activeCounter();
			changeView.progress();
		}
	},
	activeCounter : () => {
		activeCountSpan.innerHTML = progressCount;
	},
	progress : () => {

		const width = 100/activeCount;
		const fill = doneCount * width;
		console.log(activeCount, `${doneCount} ${  progressCount}`);
		const progressFill = document.getElementById("progress-fill");
		progressFill.style.width = `${fill}%`;
		if(activeCount === doneCount){
			doneCount = 0;
			progressCount = 0;
			activeCount = 0;
		}
		if(doneCount === 0 && activeCount > progressCount){
			activeCount = progressCount;
		}
	}
};
const controller = {
	todoCounter : 0,
	create : () => {
		functionalities.eventListeners.newTodo();
	}
}
controller.create();
