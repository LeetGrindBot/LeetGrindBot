import axios from "axios";

// 2 jours
const maxDelay: number = 2 * (24 * 3600 * 1000)

export default async function hasUserCompleted(username: string, problemslug: string)
{
    let q: string = `query getAcSubmissions($username: String!, $limit: Int) {
        recentAcSubmissionList(username: $username, limit: $limit) {
            titleSlug, timestamp
        }
    }`;
    const variables: any = {
        username: username,
        limit: 20,
    };
    const res = await axios.post("https://leetcode.com/graphql/", 
            {"query": q, "variables": variables, "operationName": "getAcSubmissions" });
    const subs: any[] = res["data"]["data"]["recentAcSubmissionList"];
    const now = new Date();
    const completed = subs.some((sub) => {
        const slug = sub["titleSlug"];
        const ts = sub["timestamp"];
        const completionDate = new Date(parseInt(ts)*1000);
        const doneInTime = (now.getTime() - completionDate.getTime()) < maxDelay;
        return slug === problemslug && doneInTime
    });
    return completed;
}
