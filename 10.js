// Open input page, in console use:
input = document.body.getElementsByTagName("pre")[0].innerHTML;
rows = input.split("\n")
    .map(row => row.split("").map(v => Number.parseInt(v)))
    .filter(row => row.length > 0);

directions = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
];

stepsUpFrom = (currentPosition) => {
    const newPositions = [];
    const currentElevation = rows[currentPosition[0]][currentPosition[1]];

    directions.forEach(direction => {
        const nextPosition = [
            currentPosition[0] + direction[0],
            currentPosition[1] + direction[1],
        ];

        if (rows[nextPosition[0]]
            && rows[nextPosition[0]][nextPosition[1]]
            && rows[nextPosition[0]][nextPosition[1]] === currentElevation + 1) {
            newPositions.push(nextPosition);
        }
    })

    return newPositions;
}

// Part 1
scoreOfTrailhead = (currentPositions) => {
    const currentElevation = rows[currentPositions[0][0]][currentPositions[0][1]];

    if (currentElevation === 9) {
        return currentPositions.length;
    } else {
        let stepsUp = currentPositions.flatMap(stepsUpFrom);

        stepsUp = stepsUp.filter((position, index) => {
            return stepsUp.slice(0, index).every(otherPosition => {
                return position[0] !== otherPosition[0]
                    || position[1] !== otherPosition[1];
            })
        });

        return scoreOfTrailhead(stepsUp);
    }
}

let sumOfScores = 0;

for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < rows[0].length; columnIndex++) {
        if (rows[rowIndex][columnIndex] === 0) {
            sumOfScores += scoreOfTrailhead([[rowIndex, columnIndex]]);
        }
    }
}

console.log(sumOfScores);

// Part 2
ratings = [];

ratingOfTrailhead = (currentPositions) => {
    const currentElevation = rows[currentPositions[0][0]][currentPositions[0][1]];

    if (currentElevation === 9) {
        return currentPositions.length;
    } else {
        let stepsUp = currentPositions.flatMap(stepsUpFrom);

        return ratingOfTrailhead(stepsUp);
    }
}

for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (let columnIndex = 0; columnIndex < rows[0].length; columnIndex++) {
        if (rows[rowIndex][columnIndex] === 0) {
            ratings.push(ratingOfTrailhead([[rowIndex, columnIndex]]));
        }
    }
}

sumOfRatings = ratings.reduce((total, v) => total + v);

console.log(sumOfRatings);