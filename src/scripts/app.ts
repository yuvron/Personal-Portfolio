import { Stock } from "./stock";
import { searchValue } from "./fetch";

// const stock = new Stock("AAPL", 100, 100);

// setTimeout(() => (document.querySelector(".stock").innerHTML = stock.toString()), 3000);
const searchContainer = document.querySelector(".search-container");
const searchResults = document.getElementById("search-results");
const searchBox = document.getElementById("search-box") as HTMLInputElement;
const stocksContainer = document.querySelector(".my-stocks");

let searchHovered = false;

searchContainer.addEventListener("mouseenter", () => (searchHovered = true));
searchContainer.addEventListener("mouseleave", () => (searchHovered = false));
searchBox.addEventListener("blur", () => {
	if (!searchHovered) {
		document.querySelectorAll(".search-item").forEach((searchItem) => searchItem.classList.add("hidden"));
	}
});
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

function addNewStock(ticker: string): void {
	const newStock = new Stock(ticker, 100, 100);
	setTimeout(() => stocksContainer.appendChild(newStock.render()), 3000);
}
