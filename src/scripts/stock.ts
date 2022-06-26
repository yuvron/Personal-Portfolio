import { getStockDetails, getStockPrice } from "./fetch";

export class Stock {
	details: StockDetails;
	holdings: StockHoldings;

	constructor(ticker: string, shares: number, averageCost: number) {
		this.initializeStockDetails(ticker, shares, averageCost);
	}

	render(): HTMLElement {
		const element = document.createElement("tr");
		element.innerHTML = `<td>${this.details.ticker}</td>
		<td>${this.details.name}</td>
		<td class="dollar">${this.details.price.toLocaleString()}</td>
		<td>${this.holdings.shares.toLocaleString()}</td>
		<td class="dollar">${this.holdings.averageCost.toLocaleString()}</td>
		<td class="dollar">${this.holdings.purchaseValue.toLocaleString()}</td>
		<td class="dollar">${this.holdings.currentValue.toLocaleString()}</td>
		<td class="dollar ${this.holdings.profitLoss >= 0 ? "profit" : "loss"}">${this.holdings.profitLoss.toLocaleString()}</td>`;
		return element;
	}

	private initializeStockDetails(ticker: string, shares: number, averageCost: number): void {
		getStockDetails(ticker).then((data: { name: string; price: number; dividendYield: number }) => {
			this.details = {
				ticker: ticker,
				name: data.name,
				price: data.price,
				dividendYield: data.dividendYield,
			};
			this.initializeStockHoldings(shares, averageCost);
		});
	}

	private initializeStockHoldings(shares: number, averageCost: number): void {
		const purchaseValue = this.normalizeNumber(shares * averageCost);
		const currentValue = this.normalizeNumber(shares * this.details.price);
		const profitLoss = this.normalizeNumber(currentValue - purchaseValue);
		const profitLossPercent = this.normalizeNumber((profitLoss / purchaseValue) * 100);
		const dividendPayout = this.normalizeNumber(this.details.dividendYield * shares);
		this.holdings = {
			shares: shares,
			averageCost: averageCost,
			purchaseValue: purchaseValue,
			currentValue: currentValue,
			profitLoss: profitLoss,
			profitLossPercent: profitLossPercent,
			dividendPayout: dividendPayout,
		};
	}

	updateStockPrice(): void {
		getStockPrice(this.details.ticker).then((updatedPrice) => {
			this.details.price = updatedPrice;
			this.updateHoldings();
		});
	}

	private updateHoldings(): void {
		this.holdings.currentValue = this.normalizeNumber(this.holdings.shares * this.details.price);
		this.holdings.profitLoss = this.normalizeNumber(this.holdings.currentValue - this.holdings.purchaseValue);
		this.holdings.profitLossPercent = this.normalizeNumber((this.holdings.profitLoss / this.holdings.purchaseValue) * 100);
	}

	private normalizeNumber(num: number): number {
		return +num.toFixed(2);
	}
}

interface StockDetails {
	ticker: string;
	name: string;
	price: number;
	dividendYield: number;
}

interface StockHoldings {
	shares: number;
	averageCost: number;
	purchaseValue: number;
	currentValue: number;
	profitLoss: number;
	profitLossPercent: number;
	dividendPayout: number;
}
