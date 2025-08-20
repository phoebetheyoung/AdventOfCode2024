// Open input page, in console use:
// Part 2:
input = document.body.getElementsByTagName("pre")[0].innerHTML;
rows = input.split("\n").map(row => row.split(""));

startingRow = rows.findIndex(row => row.includes("^"));
startingColumn = rows[startingRow].indexOf("^");

turnRight = (direction) => {
    // [-1, 0] -> [0, 1] -> [1, 0] -> [0, -1] ->
    return [direction[1], -direction[0]];
};

walkForwardCoords = (position, direction) => {
    return [
        position[0] + direction[0],
        position[1] + direction[1],
    ];
};

isLoopy = (rowIndex, columnIndex) => {
    alteredRows = input.split("\n").map(row => row.split(""));
    alteredRows[rowIndex][columnIndex] = "#";
    let guardPosition = [startingRow, startingColumn];
    let guardDirection = [-1, 0];
    let steps = 0;
    
    while (steps < rows.length * rows[0].length * 4 + 1) {
        ahead = walkForwardCoords(guardPosition, guardDirection);
        aheadContents = rows[ahead[0]]
            ? alteredRows[ahead[0]][ahead[1]]
            : undefined;

        if (aheadContents === undefined) {
            return false;
        } else if (aheadContents === "#") {
            guardDirection = turnRight(guardDirection);
        } else {
            guardPosition = ahead;
        }

        steps++;
    }

    return true;
};

numberOfLoopyObstructions = 0;

loopyObstructions = rows.forEach((row, rowIndex) => {
    return row.forEach((v, columnIndex) => {
        positionIsLoopy = v === "." && isLoopy(rowIndex, columnIndex);
        
        if (positionIsLoopy) {
            numberOfLoopyObstructions++;
        }
    });
});

console.log(numberOfLoopyObstructions);