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
			}, {once: true});
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
			}, {once: true});
		},
		removeBtn : (presentTodoCount) => {
			const targetBtn = document.getElementsByClassName(`remove-${presentTodoCount}`)[0];
			targetBtn.addEventListener("click", () => {
				changeView.singleTodoView.removeATodo(`todo-${presentTodoCount}`, false);
			});
		},
		optionBtn : () => {
			const targetBtn = document.getElementsByClassName("option-btn")[0];
			const optionsContainer = document.getElementsByClassName("options")[0];
			targetBtn.addEventListener("click", () => {
				optionsContainer.classList.toggle("display-options");
				setTimeout(() => {
					optionsContainer.classList.toggle("options-pop");
				}, 50);
			});
			optionsContainer.addEventListener("click", (event) => {
				changeView.changeBgColor(event.target.classList);
			});
		},
		buttonClicked : () => {
			const buttonClasses = document.getElementsByClassName("button");
			for( let i = 0; i < buttonClasses.length ; i+=1){
				buttonClasses[i].addEventListener("click", () => {
					buttonClasses[i].classList.toggle("button-clicked");
				});
			}
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
	},
	changeBgColor : (colorClass) => {
		const [button, isColor, color] = colorClass;
		const [darkOrLight, colorCode]= color.split("-");
		if(isColor === 'color'){
			document.body.style.background = `#${colorCode}`;
			if(darkOrLight === 'col'){
				document.documentElement.style.setProperty('--main-txt-color', 'black');
				document.documentElement.style.setProperty('--main-bg-color', 'rgba(0, 0, 0, 0.1)');
				document.documentElement.style.setProperty('--focused', 'rgba(0, 0, 0, 0.05)');
			}
			else{
				document.documentElement.style.setProperty('--main-txt-color', 'rgba(255, 255, 255, 0.8)');
				document.documentElement.style.setProperty('--main-bg-color', 'rgba(255, 255, 255, 0.1)');
				document.documentElement.style.setProperty('--focused', 'rgba(255, 255, 255, 0.05)');
			}
		}
	}
};
const controller = {
	todoCounter : 0,
	create : () => {
		functionalities.eventListeners.newTodo();
	},
	optionsToggler : () => {
		functionalities.eventListeners.optionBtn();
	},
	allButtonEffects : () => {
		functionalities.eventListeners.buttonClicked();
	}
};
controller.create();
controller.optionsToggler();
controller.allButtonEffects();
