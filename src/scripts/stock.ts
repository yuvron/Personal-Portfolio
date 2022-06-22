import { getStockDetails, getStockPrice } from "./fetch";

export class Stock {
	ticker: string;
	name: string;
	price: number;
	holdings: number;
	averageCost: number;
	purchaseValue: number;
	currentValue: number;
	profitLoss: number;
	profitLossPercent: number;
	dividendYield: number;
	dividendPayout: number;
	constructor(ticker: string, holdings: number, averageCost: number) {
		this.ticker = ticker;
		this.holdings = holdings;
		this.averageCost = averageCost;
		this.purchaseValue = +(this.holdings * this.averageCost).toFixed(2);
		getStockDetails(ticker).then((data) => {
			this.name = data.name;
			this.price = data.price;
			this.currentValue = +(this.holdings * this.price).toFixed(2);
			this.profitLoss = +(this.currentValue - this.purchaseValue).toFixed(2);
			this.profitLossPercent = +((this.profitLoss / this.purchaseValue) * 100).toFixed(4);
			this.dividendYield = data.dividendYield;
			this.dividendPayout = +(this.dividendYield * this.holdings).toFixed(2);
		});
	}

	updatePrice(): void {
		getStockPrice(this.ticker).then((data) => {
			this.price = data;
			this.currentValue = +(this.holdings * this.price).toFixed(2);
			this.profitLoss = +(this.currentValue - this.purchaseValue).toFixed(2);
			this.profitLossPercent = +((this.profitLoss / this.purchaseValue) * 100).toFixed(4);
		});
	}

	toString(): string {
		return `${this.name} (${this.ticker}): ${this.holdings} @ $${this.averageCost}, ${this.profitLossPercent}% ${this.profitLoss > 0 ? "up" : "down"}`;
	}
}
