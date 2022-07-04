import { StocksManager } from "./stocksManager";
import { sortDirection, tableHeaderName } from "./types";
import { icons } from "./enums";

class TableHeader {
	name: tableHeaderName;
	stocksManager: StocksManager;
	element: HTMLElement;
	private isSorted: boolean;
	sortDirection: sortDirection;

	constructor(name: tableHeaderName, stocksManager: StocksManager) {
		this.name = name;
		this.stocksManager = stocksManager;
		this.isSorted = false;
	}

	render(): HTMLElement {
		this.element = document.createElement("th");
		this.element.classList.add("table-header");
		const upButton = document.createElement("button");
		const downButton = document.createElement("button");
		upButton.classList.add("sort-button");
		downButton.classList.add("sort-button");
		upButton.innerHTML = icons.angleUp;
		downButton.innerHTML = icons.angleDown;
		this.addListeners(upButton, downButton);
		return this.element;
	}

	private addListeners(upButton: HTMLElement, downButton: HTMLElement): void {
		upButton.addEventListener("click", () => this.sort("ascending"));
		downButton.addEventListener("click", () => this.sort("descending"));
		this.element.addEventListener("click", () => {
			if (this.sortDirection === "ascending") this.sort("descending");
			else this.sort("ascending");
		});
	}

	private sort(sortDirection: sortDirection): void {
		this.stocksManager.sortStocks(this.name, sortDirection);
		if (!this.isSorted) this.isSorted = true;
		this.sortDirection = sortDirection;
	}
}
