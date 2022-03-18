document.addEventListener("DOMContentLoaded", () => {
  getAllTodos();
});

const todoButton = document.getElementById("todo-button");

const getAllTodos = async () => {
  const one = await JSON.parse(localStorage.getItem("todoRecords"));
  one.forEach((element) => {
    displayItems(one.indexOf(element), element);
  });
};

const updateAlert = (newClassName, alertMessage) => {
  let warning = document.getElementById("warn");
  warning.className += newClassName;
  warning.innerHTML = alertMessage;
  warning.style.display = "block";
  warning.style.opacity = 1;
  warning.style.pointerEvents = "all";
  setTimeout(() => {
    warning.style.display = "none";
    warning.style.opacity = 0;
    warning.style.pointerEvents = "none";
  }, 2500);
};

todoButton.addEventListener("click", async () => {
  const todoItem = await document.getElementById("todo-input").value;
  if (todoItem === "") {
    updateAlert("alert alert-warning", "The todo item cannot be empty!!");
  } else {
    const one = await JSON.parse(localStorage.getItem("todoRecords"));
    if (one === null) {
      let arr = [];
      arr.push(todoItem);
      await localStorage.setItem("todoRecords", JSON.stringify(arr));
      updateAlert("alert alert-success", "Your task was successfully added!");
      document.getElementById("todo-input").value = "";
      await location.reload();
    } else {
      let newArr = [...one, todoItem];
      await localStorage.setItem("todoRecords", JSON.stringify(newArr));
      updateAlert("alert alert-success", "Your task was successfully added!");
      document.getElementById("todo-input").value = "";
      await location.reload();
    }
  }
});

const displayItems = (position, title) => {
  const tableBody = document.getElementById("tbody");
  const tableRow = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.innerHTML = position + 1;
  const th2 = document.createElement("td");
  th2.innerHTML = title;
  const btn1 = document.createElement("button");
  btn1.innerHTML = "Update";
  btn1.className = "btn btn-success";
  btn1.type = "button";
  btn1.setAttribute("data-bs-toggle", "modal");
  btn1.setAttribute("data-bs-target", "#exampleModal");
  btn1.addEventListener("click", () => {
    document.getElementById("updated-todo").value = title;
    document.getElementById("id-ref").innerHTML = position;
  });
  btn2 = document.createElement("button");
  btn2.innerHTML = "Delete";
  btn2.className = "btn btn-danger";
  btn2.type = "button";
  btn2.addEventListener("click", async () => {
    const one = await JSON.parse(localStorage.getItem("todoRecords"));
    const two = one.filter((val) => val !== title);
    await localStorage.setItem("todoRecords", JSON.stringify(two));
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

const updateTodo = async () => {
  let todoPosition = document.getElementById("id-ref").innerHTML;
  let todoValue = document.getElementById("updated-todo").value;
  if (todoValue === "") {
    updateAlert("alert alert-warning", "The todo item cannot be empty!!");
  } else {
    const one = await JSON.parse(localStorage.getItem("todoRecords"));
    one[todoPosition] = todoValue;
    await localStorage.setItem("todoRecords", JSON.stringify(one));
    await location.reload();
  }
};
