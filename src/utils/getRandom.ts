export function getRandomDifficulty(): number {
    const difficulties: number[] = [1, 2, 3];
    return difficulties[Math.floor(Math.random() * difficulties.length)];
}

export function getRandomGif(): string {
    const gifs: string[] = [
        'https://media1.tenor.com/m/rz7YXvXEWvIAAAAC/core-keeper-core.gif',
        'https://media1.tenor.com/m/hmDMrE1yMAkAAAAC/when-the-coding-when-the.gif',
        'https://media1.tenor.com/m/7pyDepP8SOQAAAAC/cat-wif.gif',
        'https://media1.tenor.com/m/i3lImBg2UEQAAAAd/scaler-create-impact.gif',
        'https://media1.tenor.com/m/fq-1gwJhSf8AAAAd/baby-koding-baby.gif',
        'https://media1.tenor.com/m/XPRG-4ujVMIAAAAd/cat-work-in-progress.gif',
        'https://media.tenor.com/WWt-bBPOct0AAAAj/cyberkongz-kongz.gif',
        'https://media1.tenor.com/m/3AQDvhSiPpMAAAAC/dog-hacker.gif',
        'https://media1.tenor.com/m/y2JXkY1pXkwAAAAC/cat-computer.gif'
        ];
    return gifs[Math.floor(Math.random() * gifs.length)];
}
