// Open input page, in console use:
const input = document.body.getElementsByTagName("pre")[0].innerHTML;

const reportList = [];

input.split("\n").forEach(crudeReport => {
    if (crudeReport.length) {
        const report = crudeReport.split(" ");
        
        reportList.push(report.map(level => Number.parseInt(level)));
    }
});

// Part 1:
const isSafe = (report) => {
    const l = report.length;
    let sign = Math.sign(report[l - 1] - report[0]);

    for (let i = 1; i < l; i++) {
        const d = report[i] - report[i - 1];

        if (d === 0 || Math.abs(d) > 3 || Math.sign(d) !== sign) {
            return false;
        }
    }

    return true;
}

const safeReports = reportList.filter(isSafe);

const total = safeReports.length;

console.log(total);

// Part 2:
const isSafeD = (report) => {
    return isSafe(report)
        || report.some((_, i) => {
            const dampenedReport = report.slice(0, i).concat(report.slice(i + 1));

            return isSafe(dampenedReport);
        });
}

const safeReportsD = reportList.filter(isSafeD);

const totalD = safeReportsD.length;

console.log(totalD);