import getRandomProblem from "./src/utils/scraper.ts";

const [code, text, url] = await getRandomProblem(3);
console.log(code);
console.log(text);
console.log(url);
