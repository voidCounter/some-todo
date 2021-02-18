const changeView = {
	singleTodoView : {
		createNewTodo : (todoName, newTodoInput) => {
			const todoList = document.getElementsByClassName("todo-list")[0];
			const singleTodoContainer = document.createElement("div");
			singleTodoContainer.classList.add("single-todo-container");
			singleTodoContainer.innerHTML =
				`
					<div class = "single-todo">
						<i class="far fa-circle"></i>
						<span> ${todoName} </span>
					</div>
				`
			todoList.append(singleTodoContainer);
			newTodoInput.value = '';
			newTodoInput.focus();
		}
	}
};
const functionalities = {
	eventListeners : {
		newTodo : () => {
			const todoContainer = document.getElementsByClassName("add-new-btn")[0];
			const newTodoInput = document.getElementById("todo-box");
			newTodoInput.addEventListener("focusin", () => {
				todoContainer.classList.add("focused");
			});
			newTodoInput.addEventListener("keypress", (keypressed) => {
				if(keypressed.key === "Enter"){
					changeView.singleTodoView.createNewTodo(newTodoInput.value,
						newTodoInput);
					newTodoInput.blur();
				}
			});
		}
	}
};
functionalities.eventListeners.newTodo();
