// Open input page, in console use:
const input = document.body.getElementsByTagName("pre")[0].innerHTML;

const rows = input.split("\n");

// Part 1:
const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

const checkNextLetter = (currentPosition, direction, remainingWord) => {
    if (remainingWord.length === 0) {
        return true;
    } else {
        if (rows[currentPosition[0]]
            && rows[currentPosition[0]][currentPosition[1]]
            && rows[currentPosition[0]][currentPosition[1]] === remainingWord[0]) {
            
            const nextPosition = [
                currentPosition[0] + direction[0],
                currentPosition[1] + direction[1],
            ];
    
            return checkNextLetter(nextPosition, direction, remainingWord.slice(1));
        } else {
            return false;
        }
    }
}

let total = 0

for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < rows[0].length; columnIndex++) {
        directions.forEach(direction => {
            if (checkNextLetter([rowIndex, columnIndex], direction, "XMAS")) {
                total++;
            };
        });
    }
}

console.log(total);

// Part 2:
const directions2 = [
    [1, -1],
    [1, 1],
];

const centreAPotentials = [];

for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < rows[0].length; columnIndex++) {
        directions2.forEach(direction => {
            if (checkNextLetter([rowIndex, columnIndex], direction, "MAS")
                || checkNextLetter([rowIndex, columnIndex], direction, "SAM")) {
                centreAPotentials.push([
                    rowIndex + direction[0],
                    columnIndex + direction[1],
                ])
            };
        });
    }
}

const centreAs = centreAPotentials.filter((coord, index) => {
    return centreAPotentials.slice(index + 1).some(otherCoord => {
        return coord[0] === otherCoord[0] && coord[1] === otherCoord[1];
    });
})

const total2 = centreAs.length;

console.log(total2);