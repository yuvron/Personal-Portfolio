import { Stock } from "./stock";
import { searchValue } from "./fetch";

// const stock = new Stock("AAPL", 100, 100);

// setTimeout(() => (document.querySelector(".stock").innerHTML = stock.toString()), 3000);
const searchContainer = document.querySelector(".search-container");
const searchResults = document.getElementById("search-results");
const searchBox = document.getElementById("search-box") as HTMLInputElement;
const stocksContainer = document.querySelector(".stocks");

searchBox.addEventListener("blur", () => document.querySelectorAll(".search-item").forEach((searchItem) => searchItem.classList.add("hidden")));
searchBox.addEventListener("focus", () => document.querySelectorAll(".search-item").forEach((searchItem) => searchItem.classList.remove("hidden")));

searchBox.addEventListener("input", async () => {
	const searchTerm = searchBox.value;
	[...searchResults.children].forEach((searchItem) => searchItem.remove());
	searchValue(searchTerm)
		.then((data) => {
			data.forEach((stock) => {
				const searchItem = document.createElement("p");
				searchItem.classList.add("search-item");
				searchItem.innerHTML = stock;
				searchItem.addEventListener("click", () => addNewStock(stock));
				searchResults.appendChild(searchItem);
			});
		})
		.catch((err) => console.log("ERROR: ", err));
});

function addNewStock(stock: string): void {
	const newStock = new Stock(stock, 100, 100);
	const element = document.createElement("p");
	element.classList.add("stock");
	setTimeout(() => (element.innerHTML = newStock.toString()), 3000);
	stocksContainer.appendChild(element);
}
