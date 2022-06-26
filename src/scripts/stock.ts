import { getStockDetails, getStockPrice } from "./fetch";

export class Stock {
	details: StockDetails;
	holdings: StockHoldings;

	constructor(ticker: string, shares: number, averageCost: number) {
		this.initializeStockDetails(ticker);
		this.initializeStockHoldings(shares, averageCost);
	}

	private initializeStockDetails(ticker: string): void {
		getStockDetails(ticker).then((data: { name: string; price: number; dividendYield: number }) => {
			this.details = {
				ticker: ticker,
				name: data.name,
				price: data.price,
				dividendYield: data.dividendYield,
			};
		});
	}

	private initializeStockHoldings(shares: number, averageCost: number): void {
		this.holdings = {
			shares: shares,
			averageCost: averageCost,
			purchaseValue: this.normalize(averageCost * this.details.price),
			currentValue: this.normalize(this.holdings.shares * this.details.price),
			profitLoss: this.normalize(this.holdings.currentValue - this.holdings.purchaseValue),
			profitLossPercent: this.normalize((this.holdings.profitLoss / this.holdings.purchaseValue) * 100),
			dividendPayout: this.normalize(this.details.dividendYield * this.holdings.shares),
		};
	}

	updateStockPrice(): void {
		getStockPrice(this.details.ticker).then((updatedPrice) => {
			this.details.price = updatedPrice;
			this.updateHoldings();
		});
	}

	private updateHoldings(): void {
		this.holdings.currentValue = this.normalize(this.holdings.shares * this.details.price);
		this.holdings.profitLoss = this.normalize(this.holdings.currentValue - this.holdings.purchaseValue);
		this.holdings.profitLossPercent = this.normalize((this.holdings.profitLoss / this.holdings.purchaseValue) * 100);
	}

	private normalize(argument: number): number {
		return +argument.toFixed(2);
	}

	toString(): string {
		return `${this.details.name} (${this.details.ticker}): 
        ${this.holdings.shares} @ $${this.holdings.averageCost}, 
        ${this.holdings.profitLossPercent}% ${this.holdings.profitLoss > 0 ? "up" : "down"}`;
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
