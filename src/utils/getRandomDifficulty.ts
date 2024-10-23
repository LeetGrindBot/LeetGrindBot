export default function getRandomDifficulty(): number {
    const difficulties: number[] = [1, 2, 3];
    return difficulties[Math.floor(Math.random() * difficulties.length)];
};
