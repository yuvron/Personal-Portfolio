const request = require("request");

function getUrl(symbol: string): string {
	return `https://query1.finance.yahoo.com/v10/finance/\quoteSummary/${symbol}?&modules=financialData`;
}

function getJson(url: string): Promise<any> {
	return new Promise((resolve, reject) => {
		const requestOpts = {
			url: url,
			json: true,
			headers: { "User-agent": "request" },
		};
		request.get(requestOpts, (err, res, data) => {
			if (err) reject(err);
			else if (res.statusCode !== 200) reject(res.statusCode);
			else resolve(data);
		});
	});
}

export function getQuote(symbol: string): Promise<any> {
	return new Promise((resolve, reject) => {
		const url = getUrl(symbol);
		getJson(url)
			.then((data) => {
				resolve({
					symbol,
					currentPrice: data.quoteSummary.result[0].financialData.currentPrice.raw,
				});
			})
			.catch((err) => reject(err));
	});
}
