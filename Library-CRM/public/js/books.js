const search = document.getElementById("search");

search.addEventListener("keyup", function(){

let value = search.value.toLowerCase();

let rows = document.querySelectorAll("#bookTable tr");

rows.forEach(row=>{

let text = row.innerText.toLowerCase();

row.style.display = text.includes(value) ? "" : "none";

});

});