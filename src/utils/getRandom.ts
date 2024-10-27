export function getRandomDifficulty(): number {
  const difficulties: number[] = [1, 2, 3];
  return difficulties[Math.floor(Math.random() * difficulties.length)];
}

export function getRandomGif(): string {
  ("");
  const gifs: string[] = [
    "https://i.pinimg.com/originals/2a/cd/b9/2acdb9192f82fc1726058bb37e7a88aa.gif",
    "https://i.pinimg.com/originals/06/d1/57/06d157e21d94027ff086851a11ffef1e.gif",
    "https://giffiles.alphacoders.com/219/219888.gif",
    "https://pa1.aminoapps.com/7472/1138371ad480415bb640643ab3db19db1fc3e02dr1-500-281_hq.gif",
    "https://i.pinimg.com/originals/47/8d/fc/478dfccf95b70a7b4683feceeb07dbbc.gif",
    "https://i.pinimg.com/originals/ab/e3/a0/abe3a048056b29fa9eafca61e4859e73.gif",
    "https://i.pinimg.com/originals/62/6e/db/626edb1f706ad87f7ec2716e32132f68.gif",
    "https://i.pinimg.com/originals/8f/1e/23/8f1e237076159c35cb5124b744b451cf.gif",
    "https://i.pinimg.com/originals/9e/a7/c3/9ea7c37566fa5d5ec0bb87e6d50a6e20.gif",
  ];
  return gifs[Math.floor(Math.random() * gifs.length)];
}
