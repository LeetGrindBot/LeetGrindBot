import axios from "axios";

interface LeetCodeProblem {
    code: number;
    title: string;
    titleSlug: string;
    url: string;
    rate: number;
}

const diffMap: { [key: string]: string } = {
    1: "EASY",
    2: "MEDIUM",
    3: "HARD"
};

export default async function getRandomProblem(difficulty: number) : Promise<LeetCodeProblem> {
    const diffStr = diffMap[difficulty];
    const [code, title, titleSlug, url, rate] = await bruteForce(diffStr);
    const res : LeetCodeProblem = {
        code: code, 
        title: title, 
        titleSlug: titleSlug, 
        url: url, 
        rate: rate
    };
    return res;
}

async function bruteForce(diffStr: any) : Promise<any[]> {
    let code, title, titleSlug, url, rate;
    let done = false;
    while(!done) {
        const res = await axios.post("https://leetcode.com/graphql/",
            {"query":"\n    query randomQuestion($categorySlug: String, $filters: QuestionListFilterInput) {\n  randomQuestion(categorySlug: $categorySlug, filters: $filters) { questionId title titleSlug difficulty isPaidOnly acRate }\n}\n    ","variables":{"categorySlug":"all-code-essentials","filters":{"orderBy":"FRONTEND_ID","sortOrder":"DESCENDING","difficulty": diffStr}},"operationName":"randomQuestion"}
        );
        const form = res["data"]["data"]["randomQuestion"];
        titleSlug = form["titleSlug"];
        url = `https://leetcode.com/problems/${titleSlug}/description/`;
        const isPremium = form["isPaidOnly"];
        if(isPremium) {
            continue;
        }
        code = form["questionId"];
        title = form["title"];
        rate = form["acRate"];
        done = true;
    }
    return [code, title, titleSlug, url, rate];
}

getRandomProblem(1);
