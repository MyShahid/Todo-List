// Select the input field, button, and the list container where tasks will be added
const input = document.querySelector("#inputValue");
const button = document.querySelector(".btn");
const list = document.querySelector(".todo-ele-list");

// Function to get the todo list from localStorage
const getTodoListFromLocal = () => {
    return JSON.parse(localStorage.getItem("todoList"));
};

// Function to save the updated todo list back to localStorage
const addTodoListLocalStorage = (localTodoLists) => {
    localStorage.setItem("todoList", JSON.stringify(localTodoLists));
};

// Initialize the todo list by retrieving any stored tasks or starting with an empty list
let localTodoLists = getTodoListFromLocal() || [];

// Function to dynamically create and add a todo item to the DOM
const addTodoDynamicElement = (curElem) => {
    const divEle = document.createElement("div");
    divEle.classList.add("main-todo-div"); // Add the necessary class for styling

    // Create the inner HTML structure for the todo item
    divEle.innerHTML = `
        <li>${curElem}</li>
        <button class="delBtn">Delete</button>
    `;

    list.append(divEle); // Append the newly created todo item to the list
};

// Function to handle adding a new todo item
const addTodoList = (e) => {
    e.preventDefault(); // Prevent the form from submitting and refreshing the page

    const todoListValue = input.value.trim(); // Get the trimmed value from the input field
    input.value = ''; // Clear the input field for the next task

    // If the task is not empty and not already in the list, add it
    if (todoListValue !== "" && !localTodoLists.includes(todoListValue)) {
        localTodoLists.push(todoListValue); // Add the new task to the list

        localTodoLists = [...new Set(localTodoLists)]; // Ensure the list contains unique tasks

        addTodoListLocalStorage(localTodoLists); // Save the updated list to localStorage

        addTodoDynamicElement(todoListValue); // Add the new task to the DOM
    }
};

// Function to display all todo items on page load
const showTodoList = () => {
    localTodoLists.forEach((curElem) => {
        addTodoDynamicElement(curElem); // Add each stored task to the DOM
    });
};

// Call the function to show the todo list when the page loads
showTodoList();

// Function to remove a todo item from the list and localStorage
const removeTodoElem = (e) => {
    const todoToRemove = e.target; // The delete button that was clicked
    const todoListContent = todoToRemove.previousElementSibling.innerText; // Get the text of the task to be removed
    const parentElem = todoToRemove.parentElement; // Get the parent element (the entire todo item)

    // Filter out the task to be removed from the list
    localTodoLists = localTodoLists.filter((curTodo) => {
        return curTodo !== todoListContent;
    });

    addTodoListLocalStorage(localTodoLists); // Update localStorage with the new list
    parentElem.remove(); // Remove the task from the DOM
};

// Event listener to handle task deletion
list.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default behavior
    if (e.target.classList.contains("delBtn")) {
        removeTodoElem(e); // Call the remove function if a delete button was clicked
    }
});

// Event listener to handle adding a new task
button.addEventListener("click", addTodoList);
