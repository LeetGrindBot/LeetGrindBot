import { listHistoryProblems } from "../database/historyProblem";
import { listHistoryPoints, updateHistoryPoint } from "../database/historyPoint";
import { computePoints } from "./computePoints";

export default async function updateAllPoints(): Promise<void> {
    const hpb = await listHistoryProblems();  
    const hpoints = await listHistoryPoints();

    for(let i = 0 ; i < hpoints.length ; i++) {
        const hpoint = hpoints[i];
        const problem = hpb.find(v => { return v.titleSlug == hpoint.idHistoryProblem });
        if(!problem) {
            continue;
        }
        const newPoints = computePoints(problem.difficulty, problem.rate);
        await updateHistoryPoint(hpoint.idHistoryProblem, hpoint.idDiscord, newPoints);
    }

}
