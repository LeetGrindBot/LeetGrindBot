export function getRandomDifficulty(): number {
  const difficulties: number[] = [1, 2, 3];
  return difficulties[Math.floor(Math.random() * difficulties.length)];
}

export function getRandomGif(): string {
  const gifs: string[] = [
    "https://qph.cf2.quoracdn.net/main-qimg-6ac854a953f07cb8df10b6a6bffc3759",
    "https://steamuserimages-a.akamaihd.net/ugc/2029473162813738608/986910611937FA421599765516049427E1B8A3C7/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://giffiles.alphacoders.com/219/219888.gif",
    "https://steamuserimages-a.akamaihd.net/ugc/921430008405840800/1A562719B1885AE013F6743BF938F5A029C82817/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://steamuserimages-a.akamaihd.net/ugc/816686421609822330/AD91AB6D38E200ADC0423FD93A1B483BDA473FFE/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://i.pinimg.com/originals/ab/e3/a0/abe3a048056b29fa9eafca61e4859e73.gif",
    "https://i.pinimg.com/originals/62/6e/db/626edb1f706ad87f7ec2716e32132f68.gif",
    "https://steamuserimages-a.akamaihd.net/ugc/579074461706301500/DC7D718B24ADEC70D772EC2D69A98A07150F0F0E/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false",
    "https://i.pinimg.com/originals/9e/a7/c3/9ea7c37566fa5d5ec0bb87e6d50a6e20.gif",
  ];
  return gifs[Math.floor(Math.random() * gifs.length)];
}
