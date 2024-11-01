export function getStartDate(date: Date): Date {
    const day = date.getDay() || 7;
    const diff = date.getDate() - (day-1);
    let res = new Date(date.setDate(diff));
    res = new Date(res.setHours(18));
    res = new Date(res.setMinutes(0));
    res = new Date(res.setSeconds(0));
    res = new Date(res.setMilliseconds(0));
    return res;
}
export function getEndDate(date: Date): Date {
    const startDate = getStartDate(date);
    const day = date.getDay();
    const diff = date.getDate() + day + 6;
    let res = new Date(date.setDate(diff));
    res = new Date(res.setHours(18));
    res = new Date(res.setMinutes(0));
    res = new Date(res.setSeconds(0));
    res = new Date(res.setMilliseconds(0));
    return res;
}
