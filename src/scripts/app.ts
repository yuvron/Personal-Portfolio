// import { getQuote } from "./stocks";

// getQuote("GOOGL").then((data) => console.log(JSON.stringify(data, null, 4)));

const addBtn = document.getElementById("add-button");
const modal = document.getElementById("modal");

addBtn.addEventListener("click", () => (modal.style.display = "block"));
