import { firefox } from "playwright";

function getRandomProblem() {
    const browser = await firefox.launch({headless: false});

}
