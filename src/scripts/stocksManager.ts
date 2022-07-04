import { Stock } from "./stock";
import { sortDirection, tableHeaderName } from "./types";

export class StocksManager {
	stocks: Stock[];
	element: HTMLElement;

	constructor() {
		this.stocks = [];
	}

	render(): HTMLElement {
		this.element = document.createElement("tbody");
		this.element.classList.add("my-stocks");
		this.renderStocks();
		return this.element;
	}

	renderStocks(): void {
		this.element.innerHTML = "";
		this.stocks.forEach((stock) => this.element.appendChild(stock.render()));
	}

	addStock(stock: Stock): boolean {
		if (!this.getStock(stock)) {
			this.stocks.splice(this.stocks.indexOf(stock), 1);
			return true;
		}
		return false;
	}

	removeStock(stock: Stock): boolean {
		if (this.getStock(stock)) {
			this.stocks.splice(this.stocks.indexOf(stock), 1);
			return true;
		}
		return false;
	}

	getStock(searchedStock: Stock): Stock | undefined {
		return this.stocks.find((stock) => stock === searchedStock);
	}

	sortStocks(headerName: tableHeaderName, direction: sortDirection): void {
		const sortDirection = direction === "ascending" ? 1 : -1;
		this.stocks.sort((a, b) => {
			if (!isNaN(+a[headerName])) return (a[headerName] - b[headerName]) * sortDirection;
			else return a[headerName] > b[headerName] ? sortDirection : -1 * sortDirection;
		});
		this.renderStocks();
	}
}
