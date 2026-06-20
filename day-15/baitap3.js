function analyzeClass(scores) {
  let excellentCount = 0;
  let goodCount = 0;
  let fairCount = 0;
  let averageCount = 0;
  let weakCount = 0;

  let invalidCount = 0;
  let validCount = 0;
  let totalScore = 0;

  let highestScore = null;
  let lowestScore = null;

  for (let i = 0; i < scores.length; i++) {
    let score = scores[i];

    if (score < 0 || score > 10) {
      invalidCount++;
    } else {
      validCount++;
      totalScore += score;

      if (highestScore === null || score > highestScore) {
        highestScore = score;
      }

      if (lowestScore === null || score < lowestScore) {
        lowestScore = score;
      }

      if (score >= 9 && score <= 10) {
        excellentCount++;
      } else if (score >= 8) {
        goodCount++;
      } else if (score >= 6.5) {
        fairCount++;
      } else if (score >= 5) {
        averageCount++;
      } else {
        weakCount++;
      }
    }
  }

  if (validCount === 0) {
    return {
      excellent: excellentCount,
      good: goodCount,
      fair: fairCount,
      average: averageCount,
      weak: weakCount,
      highestScore: null,
      lowestScore: null,
      averageScore: 0,
      invalidCount: invalidCount,
      validCount: validCount,
      comment: "Không có dữ liệu hợp lệ",
    };
  }

  let averageScore = Math.round((totalScore / validCount) * 100) / 100;
  let goodOrBetterCount = excellentCount + goodCount + fairCount;
  let comment = "";

  if (goodOrBetterCount > validCount / 2) {
    comment = "Lớp học tốt";
  } else if (weakCount > validCount / 2) {
    comment = "Cần cải thiện";
  } else {
    comment = "Lớp học ở mức ổn";
  }

  return {
    excellent: excellentCount,
    good: goodCount,
    fair: fairCount,
    average: averageCount,
    weak: weakCount,
    highestScore: highestScore,
    lowestScore: lowestScore,
    averageScore: averageScore,
    invalidCount: invalidCount,
    validCount: validCount,
    comment: comment,
  };
}

console.log("Test 1:");
console.log(analyzeClass([9, 7, -2, 5.5, 10, 4, 11, 6.5, 8]));

console.log("Test 2:");
console.log(analyzeClass([3, 2, 4.5, 1, 0]));

console.log("Test 3:");
console.log(analyzeClass([9, 1, 7, 6, 5.5]));

console.log("Test 4:");
console.log(analyzeClass([-5, 15, 100, -1]));

console.log("Test 5:");
console.log(analyzeClass([]));
