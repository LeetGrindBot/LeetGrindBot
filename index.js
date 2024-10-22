import getRandomProblem from "./scraper.js";

const [code, text, url] = await getRandomProblem(3);
console.log(code);
console.log(text);
console.log(url);
