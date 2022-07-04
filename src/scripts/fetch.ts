const MARKETS = ["NYSE", "NYSE MKT", "NASDAQ", "OTC Markets"];

const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c81c3af95bmsh7b93b6cab82efd4p135921jsnfb3997580094",
	},
};

export function getStockDetails(ticker: string): Promise<{ name: string; price: number; dividendYield: number }> {
	options.headers["X-RapidAPI-Host"] = "yh-finance.p.rapidapi.com";
	return fetch(`https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=${ticker}&region=US`, options)
		.then((response) => response.json())
		.then((data) => {
			const dividend = data.summaryDetail.trailingAnnualDividendYield.fmt;
			return {
				name: data.quoteType.shortName,
				price: +data.price.regularMarketPrice.raw,
				dividendYield: dividend ? +dividend.replace("%", "") : 0,
			};
		})
		.catch((err) => {
			console.error(err);
			return err;
		})
		.catch((err) => {
			console.error(err);
			return err;
		});
}

export async function getStockPrice(ticker: string): Promise<number> {
	options.headers["X-RapidAPI-Host"] = "realstonks.p.rapidapi.com";
	return fetch(`https://realstonks.p.rapidapi.com/${ticker}`, options)
		.then((response) => response.json())
		.then((data) => +data.price)
		.catch((err) => {
			console.error(err);
			return err;
		})
		.catch((err) => {
			console.error(err);
			return err;
		});
}

export async function searchValue(search: string): Promise<Array<string>> {
	options.headers["X-RapidAPI-Host"] = "stock-data2.p.rapidapi.com";
	return fetch(`https://stock-data2.p.rapidapi.com/v6/finance/autocomplete?query=${search}&lang=en`, options)
		.then((response) => response.json())
		.then((data) => {
			return data.ResultSet.Result.filter((stock) => stock.symbol.charAt(0) !== "^" && MARKETS.includes(stock.exchDisp))
				.map((stock) => stock.symbol)
				.slice(0, 5);
		})
		.catch((err) => {
			console.error(err);
			return err;
		})
		.catch((err) => {
			console.error(err);
			return err;
		});
}

export class Fetcher {
	static options = {
		method: "GET",
		headers: {
			"X-RapidAPI-Key": "c81c3af95bmsh7b93b6cab82efd4p135921jsnfb3997580094",
		},
	};
	static validMarkets = ["NYSE", "NYSE MKT", "NASDAQ", "OTC Markets"];
	static hosts = {
		yhFinance: "yh-finance.p.rapidapi.com",
		stockData2: "stock-data2.p.rapidapi.com",
		realstonks: "realstonks.p.rapidapi.com",
	};

	static async getStockDetails(ticker: string): Promise<{ name: string; price: number; dividendYield: number }> {
		const options = Fetcher.options;
		options.headers["X-RapidAPI-Host"] = Fetcher.hosts.yhFinance;
		try {
			const response = await fetch(`https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=${ticker}&region=US`, options);
			const data = await response.json();
			const dividend = data.summaryDetail.trailingAnnualDividendYield.fmt;
			return {
				name: data.quoteType.shortName,
				price: +data.price.regularMarketPrice.raw,
				dividendYield: dividend ? +dividend.replace("%", "") : 0,
			};
		} catch (err) {
			console.error(err);
			return err;
		}
	}

	static async searchValue(search: string): Promise<Array<string>> {
		const options = Fetcher.options;
		options.headers["X-RapidAPI-Host"] = Fetcher.hosts.stockData2;
		try {
			const response = await fetch(`https://stock-data2.p.rapidapi.com/v6/finance/autocomplete?query=${search}&lang=en`, options);
			const data = await response.json();
			const searchResults = data.ResultSet.Result;
			const validSearchResults = searchResults.filter((searchResult) => {
				if (searchResult.symbol.charAt(0) === "^") return false;
				if (!Fetcher.validMarkets.includes(searchResult.exchDisp)) return false;
				return true;
			});
			return validSearchResults.map((stock) => stock.symbol).slice(0, 5);
		} catch (err) {
			console.error("Fetcher error:", err);
			return err;
		}
	}

	static async getStockPrice(ticker: string): Promise<number> {
		const options = Fetcher.options;
		options.headers["X-RapidAPI-Host"] = "realstonks.p.rapidapi.com";
		try {
			const response = await fetch(`https://realstonks.p.rapidapi.com/${ticker}`, options);
			const data = await response.json();
			const price = +data.price;
			return price;
		} catch (err) {
			console.error("Fetcher error:", err);
			return err;
		}
	}
}
