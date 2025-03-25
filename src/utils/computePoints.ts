import { getDifficulty, getRate } from "../database/historyProblem";

const mults: { [key: number]: number } = {
    1: 1,
    2: 2,
    3: 3
}

export async function computePointsFromSlug(problemTitleSlug: string): Promise<number> {
    const difficulty = await getDifficulty(problemTitleSlug);
    let rate = await getRate(problemTitleSlug);
    return computePoints(difficulty, rate);
}

export function computePoints(difficulty: number, rate: number): number {
    const mult = mults[difficulty];
    rate = Math.max(rate, 30);
    const points = Math.round(100 * mult / rate);
    return points;
}
