// Get and display all the todos when site first loads
document.addEventListener("DOMContentLoaded", () => {
  getAllTodos();
});

// Button to create a todo item
const todoButton = document.getElementById("todo-button");

// Displaying each individual todo
const getAllTodos = async () => {
  const one = await JSON.parse(localStorage.getItem("todoRecords"));
  one.forEach((element) => {
    displayItems(one.indexOf(element), element);
  });
};

// Reusable function to display different states when you create update and delete todos
const updateAlert = (newClassName, alertMessage) => {
  let warning = document.getElementById("warn");
  warning.className += newClassName;
  warning.innerHTML = alertMessage;
  // Making the alert appear
  warning.style.display = "block";
  warning.style.opacity = 1;
  warning.style.pointerEvents = "all";
  // Clear the alert after 2.5 seconds
  setTimeout(() => {
    warning.style.display = "none";
    warning.style.opacity = 0;
    warning.style.pointerEvents = "none";
  }, 2500);
};

// Function that triggers the creation of a todo
todoButton.addEventListener("click", async () => {
  const todoItem = await document.getElementById("todo-input").value;
  // Checking whether the input is empty
  if (todoItem === "") {
    updateAlert("alert alert-warning", "The todo item cannot be empty!!");
  } else {
    const one = await JSON.parse(localStorage.getItem("todoRecords"));
    // If there are no todos
    let obj = {
      item: todoItem,
      completed: false,
    };
    if (one === null) {
      let arr = [];
      arr.push(obj);
      await localStorage.setItem("todoRecords", JSON.stringify(arr));
      updateAlert("alert alert-success", "Your task was successfully added!");
      document.getElementById("todo-input").value = "";
      await location.reload();
    } else {
      // If some todos already exist
      let newArr = [...one, obj];
      await localStorage.setItem("todoRecords", JSON.stringify(newArr));
      updateAlert("alert alert-success", "Your task was successfully added!");
      document.getElementById("todo-input").value = "";
      await location.reload();
    }
  }
});

// Displaying a todo item on a table with the update and delete buttons
const displayItems = (position, item) => {
  const tableBody = document.getElementById("tbody");
  const tableRow = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.innerHTML = position + 1;
  const th2 = document.createElement("td");
  th2.innerHTML = item.item;
  th2.style.cursor = "pointer"
  // Changing the look of a todo when marked completed
  if (item.completed) {
    th2.style.textDecoration = "line-through";
  }
  else {
    th2.style.textDecoration = "none";
  }
  // Marking a todo as complete
  th2.addEventListener("click", async () => {
    const one = await JSON.parse(localStorage.getItem("todoRecords"));
    one[position].completed = !item.completed;
    await localStorage.setItem("todoRecords", JSON.stringify(one));
    await location.reload();
  })
  const btn1 = document.createElement("button");
  btn1.innerHTML = "Update";
  btn1.className = "btn btn-success";
  btn1.type = "button";
  btn1.setAttribute("data-bs-toggle", "modal");
  btn1.setAttribute("data-bs-target", "#exampleModal");
  // Adding the todo we want to update to the update section
  btn1.addEventListener("click", () => {
    document.getElementById("updated-todo").value = item.item;
    document.getElementById("id-ref").innerHTML = position;
  });
  btn2 = document.createElement("button");
  btn2.innerHTML = "Delete";
  btn2.className = "btn btn-danger";
  btn2.type = "button";
  // Deleting a todo
  btn2.addEventListener("click", async () => {
    const one = await JSON.parse(localStorage.getItem("todoRecords"));
    const two = one.filter((val) => val.item !== item.item);
    await localStorage.setItem("todoRecords", JSON.stringify(two));
    updateAlert("alert alert-warning", "Todo deleted successfully!!");
    await location.reload();
  });
  const th3 = document.createElement("td");
  th3.appendChild(btn1);
  const th4 = document.createElement("td");
  th4.appendChild(btn2);
  tableRow.appendChild(th1);
  tableRow.appendChild(th2);
  tableRow.appendChild(th3);
  tableRow.appendChild(th4);
  tableBody.appendChild(tableRow);
};

// Updating a todo
const updateTodo = async () => {
  let todoPosition = document.getElementById("id-ref").innerHTML;
  let todoValue = document.getElementById("updated-todo").value;
  if (todoValue === "") {
    updateAlert("alert alert-warning", "The todo item cannot be empty!!");
  } else {
    const one = await JSON.parse(localStorage.getItem("todoRecords"));
    one[todoPosition].item = todoValue;
    await localStorage.setItem("todoRecords", JSON.stringify(one));
    updateAlert("alert alert-success", "Todo was updated successfully!!");
    await location.reload();
  }
};
