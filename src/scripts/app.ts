import { Stock } from "./stock";

const stock = new Stock("AAPL", 100, 100);

setTimeout(() => (document.querySelector(".stock").innerHTML = stock.toString()), 3000);
