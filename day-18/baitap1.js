const examResults = [
  { student: "An", scores: [8.5, 7, 9, 6.5] },
  { student: "Bình", scores: [10, 9.5, 8, 10] },
  { student: "Chi", scores: [5, 4.5, 6, 5.5] },
  { student: "Duy", scores: [7, 7, 7, 7] },
];

function getAverage(scores) {
  const sumScores = scores.reduce((acc, curr) => acc + curr, 0);
  const average = (sumScores / scores.length).toFixed(1);
  return Number(average);
}

console.log(getAverage(examResults[0].scores)); // 7.75 -> 7.8
console.log(getAverage(examResults[1].scores)); // 9.375 -> 9.4

function classifyStudent(average) {
  if (average >= 9) return "Xuất sắc";
  if (average >= 8) return "Giỏi";
  if (average >= 6.5) return "Khá";
  if (average >= 5) return "Trung bình";
  return "Yếu";
}

console.log(classifyStudent(getAverage(examResults[1].scores))); // "Xuất sắc"
console.log(classifyStudent(getAverage(examResults[3].scores))); // "Khá"
console.log(classifyStudent(getAverage(examResults[2].scores))); // "Trung bình"

function isValidScore(score) {
  return Number.isFinite(score) && score >= 0 && score <= 10;
}

console.log(isValidScore(8.5)); // true
console.log(isValidScore(-1)); // false
console.log(isValidScore(11)); // false
console.log(isValidScore(Infinity)); // false
console.log(isValidScore(NaN)); // false

function getReportCard(examResults) {
  const report = examResults.map((p) => {
    return {
      student: p.student,
      average: getAverage(p.scores),
      classification: classifyStudent(getAverage(p.scores)),
    };
  });

  return report;
}

console.log(getReportCard(examResults));
// [
//   { student: "An",   average: 7.8, classification: "Khá" },
//   { student: "Bình", average: 9.4, classification: "Xuất sắc" },
//   { student: "Chi",  average: 5.3, classification: "Trung bình" },
//   { student: "Duy",  average: 7,   classification: "Khá" },
// ]
