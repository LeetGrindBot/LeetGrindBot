import axios from "axios";

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
    const completed = subs.some((sub) => {
        const slug = sub["titleSlug"];
        return slug === problemslug
    });
    return completed;
}
