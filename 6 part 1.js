// Open input page, in console use:
// Part 1:
const input = document.body.getElementsByTagName("pre")[0].innerHTML;

const rows = input.split("\n");

const startingRow = rows.findIndex(row => row.indexOf("^") > -1);
const startingColumn = rows[startingRow].indexOf("^");
let guardPosition = [startingRow, startingColumn];
let guardDirection = [-1, 0];
let steps = 0;

const turnRight = () => {
    // [-1, 0] -> [0, 1] -> [1, 0] -> [0, -1] ->
    guardDirection = [guardDirection[1], -guardDirection[0]];
}

const walkForwardCoords = (position, direction) => {
    return [
        position[0] + direction[0],
        position[1] + direction[1],
    ];
}

const onMap = (position) => {
    return position[0] >= 0
        && position[0] < rows.length
        && position[1] >= 0
        && position[1] < rows[0].length;
}

while (onMap(guardPosition) && steps < 10000) {
    const ahead = walkForwardCoords(guardPosition, guardDirection);

    if (rows[ahead[0]] && rows[ahead[0]][ahead[1]] === "#") {
        turnRight();
    } else {
        rows[guardPosition[0]] = rows[guardPosition[0]].slice(0, guardPosition[1])
            .concat("X")
            .concat(rows[guardPosition[0]].slice(guardPosition[1] + 1));
        guardPosition = ahead;
    }

    steps++;
}

total = rows.reduce((total, row) => {
    const xs = row.match(/X/g);

    return xs === null ? total : total + xs.length;
}, 0);

console.log(total, "finished = ", !onMap(guardPosition));

// Part 2:
