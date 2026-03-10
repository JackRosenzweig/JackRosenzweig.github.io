let changingColumnActiveVal = "Status";
const tableData = Array();
let openEntry = undefined;
let notEditing = true;

function changeColumn(newContentVal) {
  columnHeader = document.getElementById("changingColumn");
  columnHeader.textContent = newContentVal;
  changingColumnActiveVal = newContentVal;
  populateTable(tableData);
}

function populateTable(data) {
  const tableBody = document.querySelector("#tableBody");
  tableBody.innerHTML = "";
  if (tableData.length > 0){
    data.forEach(item => {
      let row = tableBody.insertRow();
      let titleCell = row.insertCell();
      titleCell.innerText = item.title;
      let authorCell = row.insertCell();
      authorCell.innerText = item.author;
      let variableCell = row.insertCell();
      switch (changingColumnActiveVal) {
        case "Status":
          variableCell.innerText = item.status;
          break;
        case "Rating":
          variableCell.innerText = item.rating;
          break;
        case "Genre":
          variableCell.innerText = item.genre;
          break;
        case "Format":
          variableCell.innerText = item.format;
          break;
        case "Ownership":
          variableCell.innerText = item.ownership;
          break;
      };
      let editCell = row.insertCell();
      const editButton = document.createElement("button");
      editButton.textContent = "Edit/Delete";
      editButton.addEventListener("click", () => editEntry(item));
      editCell.append(editButton);
    });
  }
}

function Entry(title, author, status, rating, genre, format, ownership){
  this.title = title;
  this.author = author;
  this.status = status;
  this.rating = rating;
  this.genre = genre;
  this.format = format;
  this.ownership = ownership;
}

function openForm() {
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("formContent").style.display = "flex";
  document.getElementById("deleteButton").style.display = "none";
}

function closeForm() {
  document.getElementById("formContent").style.display = "none";
  document.getElementById("overlay").style.display = "none";
  clearForm();
}

function submitEntry() {
  title = document.getElementById("title").value;
  author = document.getElementById("author").value;
  status = document.getElementById("status").value;
  rating = document.getElementById("rating").value;
  genre = document.getElementById("genre").value;
  format = document.getElementById("format").value;
  ownership = document.getElementById("ownership").value;
  
  if (notEditing) {
    newEntry = new Entry(title, author, status, rating, genre, format, ownership);
    tableData.push(newEntry);
  } else {
    openEntry.title = title;
    openEntry.author = author;
    openEntry.status = status;
    openEntry.rating = rating;
    openEntry.genre = genre;
    openEntry.format = format;
    openEntry.ownership = ownership;
    document.getElementById("pushButton").innerText = "Add";
  }
  populateTable(tableData);
  closeForm();
}

function clearForm(){
  document.getElementById("newEntry").reset();
  notEditing = true;
}

function editEntry(entry){
  openEntry = entry;
  document.getElementById("title").value = entry.title;
  document.getElementById("author").value = entry.author;
  document.getElementById("status").value = entry.status;
  document.getElementById("rating").value = entry.rating;
  document.getElementById("genre").value = entry.genre;
  document.getElementById("format").value = entry.format;
  document.getElementById("ownership").value = entry.ownership;
  
  openForm();
  document.getElementById("deleteButton").style.display = "inline-block";
  document.getElementById("pushButton").innerText = "Edit";
  notEditing = false;
}

function deleteEntry() {
  let index = tableData.indexOf(openEntry);
  tableData.splice(index, 1);
  populateTable();
  closeForm();
}