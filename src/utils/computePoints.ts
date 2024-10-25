import { getDifficulty, getRate } from "../database/historyProblem";

const mults: { [key: number]: number } = {
    1: 1,
    2: 2.5,
    3: 6
}

export default async function computePoints(problemTitleSlug: string): Promise<number> {
    const difficulty = await getDifficulty(problemTitleSlug);
    const rate = await getRate(problemTitleSlug);
    const mult = mults[difficulty];
    return 100 * mult / rate;
}
