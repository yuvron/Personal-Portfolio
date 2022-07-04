import { Stock } from "./stock";
import { searchValue } from "./fetch";
import { StocksManager } from "./stocksManager";

const searchContainer = document.querySelector(".search-container");
const searchResults = document.getElementById("search-results");
const searchBox = document.getElementById("search-box") as HTMLInputElement;
const stocksContainer = document.querySelector(".my-stocks");

const stocksManager = new StocksManager();
let searchHovered = false;

searchContainer.addEventListener("mouseenter", () => (searchHovered = true));
searchContainer.addEventListener("mouseleave", () => (searchHovered = false));
searchBox.addEventListener("blur", () => searchResults.classList.add(!searchHovered ? "hidden" : ""));
searchBox.addEventListener("focus", () => searchResults.classList.remove("hidden"));

searchBox.addEventListener("input", async () => {
	const searchTerm = searchBox.value;
	[...searchResults.children].forEach((searchItem) => searchItem.remove());
	searchValue(searchTerm)
		.then((data) => {
			data.forEach((stock) => {
				const searchItem = document.createElement("p");
				searchItem.classList.add("search-item");
				searchItem.innerHTML = stock;
				searchItem.addEventListener("click", () => {
					addNewStock(stock);
					searchResults.classList.add("hidden");
					searchResults.innerHTML = "";
					searchBox.value = "";
				});
				searchResults.appendChild(searchItem);
			});
		})
		.catch((err) => console.log("ERROR: ", err));
});

function addNewStock(ticker: string): void {
	const newStock = new Stock(ticker, 100, 100);
	setTimeout(() => stocksContainer.appendChild(newStock.render()), 3000);
}
