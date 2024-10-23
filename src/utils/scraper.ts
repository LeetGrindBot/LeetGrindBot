import {firefox} from "playwright";
import axios from "axios";

const diffMap: { [key: string]: string } = {
    1: "EASY",
    2: "MEDIUM",
    3: "HARD"
};

export default async function getRandomProblem(difficulty: number) {
    const diffStr = diffMap[difficulty];
    const browser = await firefox.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();

    const [code, text, url] = await bruteForce(page, diffStr);
    await page.close();
    await context.close();
    await browser.close();
    return [code, text, url];
}

async function bruteForce(page: any, diffStr: any) {
    let problemCode, problemText, problemUrl;
    let done = false;
    while(!done) {
        const res = await axios.post("https://leetcode.com/graphql/",
            {"query":"\n    query randomQuestion($categorySlug: String, $filters: QuestionListFilterInput) {\n  randomQuestion(categorySlug: $categorySlug, filters: $filters) {\n    titleSlug\n  }\n}\n    ","variables":{"categorySlug":"all-code-essentials","filters":{"orderBy":"FRONTEND_ID","sortOrder":"DESCENDING","difficulty": diffStr}},"operationName":"randomQuestion"}
        );
        const problemName = res["data"]["data"]["randomQuestion"]["titleSlug"];
        problemUrl = `https://leetcode.com/problems/${problemName}/description/`;
        await page.goto(problemUrl);

        await page.waitForSelector('[class*="text-difficulty-"]');

        let selector = `div.text-difficulty-${diffStr.toLowerCase()}`;
        let difficultyTagLoc = page.locator(selector);
        let existsDiffTag = await difficultyTagLoc.isVisible();
        if(!existsDiffTag) {
            continue;
        }

        const premiumLoc = page.locator("div.backdrop-blur-sm ");
        const existsPremiumTag = await premiumLoc.isVisible();
        if(existsPremiumTag) {
            continue;
        }

        const problemLoc = page.locator("a.cursor-text");
        [problemCode, problemText] = (await problemLoc.innerText()).split(".");
        problemText = problemText.substring(1, problemText.length);
        break;
    }

    return [problemCode, problemText, problemUrl];
}
