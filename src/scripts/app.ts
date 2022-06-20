import { Stock } from "./stock";
import { searchValue } from "./fetch";

// const stock = new Stock("AAPL", 100, 100);

// setTimeout(() => (document.querySelector(".stock").innerHTML = stock.toString()), 3000);
const searchContainer = document.getElementById("search-container");
const searchBox = document.getElementById("search-box") as HTMLInputElement;

searchBox.addEventListener("blur", () => document.querySelectorAll(".search-item").forEach((searchItem) => searchItem.classList.add("hidden")));
searchBox.addEventListener("focus", () => document.querySelectorAll(".search-item").forEach((searchItem) => searchItem.classList.remove("hidden")));

searchBox.addEventListener("input", async () => {
	const searchTerm = searchBox.value;
	[...searchContainer.children].forEach((searchItem) => searchItem.remove());
	searchValue(searchTerm)
		.then((data) => {
			data.forEach((stock) => {
				const searchItem = document.createElement("p");
				searchItem.classList.add("search-item");
				searchItem.innerHTML = stock;
				searchContainer.appendChild(searchItem);
			});
		})
		.catch((err) => console.log("ERROR: ", err));
});
