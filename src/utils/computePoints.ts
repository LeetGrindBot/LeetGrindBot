import { getDifficulty, getRate } from "../database/historyProblem";

const mults: { [key: number]: number } = {
    1: 1,
    2: 2,
    3: 3
}

export default async function computePoints(problemTitleSlug: string): Promise<number> {
    const difficulty = await getDifficulty(problemTitleSlug);
    const mult = mults[difficulty];
    let rate = await getRate(problemTitleSlug);
    rate = Math.max(rate, 30);
    const points = Math.round(100 * mult / rate);
    return points;
}
