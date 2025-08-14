// Open input page, in console use:
const input = document.body.getElementsByTagName("pre")[0].innerHTML;

const parseAndMultiply = mulString => {
    const [a, b] = mulString.slice(4).split(",").map(v => Number.parseInt(v));

    return a * b;
}

// Part 1:
const pattern = /mul\(\d+,\d+\)/g;

const validData = input.match(pattern);

const multiplications = validData.map(parseAndMultiply);

const total = multiplications.reduce((total, d) => total + d);

console.log(total);

// Part 2:
const pattern2 = /mul\(\d+,\d+\)|do\(\)|don't\(\)/g;

const validData2 = input.match(pattern2);

let total2 = 0;
let currentlyDoing = true;

for (let i = 0; i < validData2.length; i++) {
    data = validData2[i];

    if (data === "do()") {
        currentlyDoing = true;
    } else if (data === "don't()") {
        currentlyDoing = false;
    } else if (currentlyDoing) {
        total2 += parseAndMultiply(data);
    }
}

console.log(total2);