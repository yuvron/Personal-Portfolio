const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Key": "c81c3af95bmsh7b93b6cab82efd4p135921jsnfb3997580094",
		"X-RapidAPI-Host": "yh-finance.p.rapidapi.com",
	},
};

export function getStockDetails(ticker: string): Promise<{ name: string; price: number; dividendYield: number }> {
	return fetch(`https://yh-finance.p.rapidapi.com/stock/v2/get-summary?symbol=${ticker}&region=US`, options)
		.then((response) => response.json())
		.then((data) => {
			return {
				name: data.quoteType.shortName,
				price: +data.price.regularMarketPrice.raw,
				dividendYield: +data.summaryDetail.trailingAnnualDividendYield.fmt.replace("%", ""),
			};
		})
		.catch((err) => err);
}

export async function getStockPrice(ticker: string): Promise<number> {
	return fetch(`https://realstonks.p.rapidapi.com/${ticker}`, options)
		.then((response) => response.json())
		.then((data) => +data.price)
		.catch((err) => err);
}
