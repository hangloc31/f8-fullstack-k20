/**
 * 
    baseScore  = kills * 10
    bonusScore = level >= 5 ? baseScore * 0.5 : baseScore * 0.2
    finalScore = boosted ? (baseScore + bonusScore) * 2 : baseScore + bonusScore

 */

function calculateScore(level, kills, boosted) {
  boosted = typeof boosted === "boolean" ? boosted : false;

  if (
    typeof level !== "number" ||
    typeof kills !== "number" ||
    Number.isNaN(level) ||
    Number.isNaN(kills) ||
    level < 0 ||
    kills < 0
  ) {
    console.log("Dữ liệu không hợp lệ");
  } else {
    let baseScore = kills * 10;
    let bonusScore = level >= 5 ? baseScore * 0.5 : baseScore * 0.2;
    let finalScore = boosted
      ? (baseScore + bonusScore) * 2
      : baseScore + bonusScore;
    console.log(finalScore, boosted);
  }
}

calculateScore(5, 20, true); // 600
calculateScore(3, 10, false); // 120
calculateScore(5, 15, false); // 225
calculateScore(1, 50, true); // 1200

calculateScore(-1, 10, true); // "Dữ liệu không hợp lệ"
calculateScore(2, -5, false); // "Dữ liệu không hợp lệ"
calculateScore("abc", 10, true); // "Dữ liệu không hợp lệ"
calculateScore(2, "abc", false); // "Dữ liệu không hợp lệ"

calculateScore(5, 15, null); // 225  (boosted = false)
calculateScore(5, 15, "yes"); // 225  (boosted = false)
calculateScore(5, 15, undefined); // 225  (boosted = false)
