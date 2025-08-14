// Open input page, in console use:
const input = document.body.getElementsByTagName("pre")[0].innerHTML;

const listA = [];
const listB = [];

input.split("\n").forEach(crudePair => {
    if (crudePair.length) {
        const [a, b] = crudePair.split("   ");
        
        listA.push(Number.parseInt(a));
        listB.push(Number.parseInt(b));
    }
});

[listA, listB].forEach(list => list.sort());

// Part 1:
const differences = listA.map((a, index) => {
    const b = listB[index];

    return Math.abs(b - a);
});

const total = differences.reduce((total, d) => total + d);

console.log(total);

// Part 2:
const similarityParts = listA.map(a => {
    const frequency = listB.filter(b => b === a).length;

    return a * frequency;
});

const similarityScore = similarityParts.reduce((total, d) => total + d);

console.log(similarityScore);