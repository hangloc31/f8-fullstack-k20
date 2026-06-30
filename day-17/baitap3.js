const players = [
  {
    id: 1,
    name: "DragonSlayer",
    scores: [120, 85, 200, 95],
    level: 8,
    badge: "gold",
  },
  { id: 2, name: "NightWolf", scores: [60, 75, 50], level: 5, badge: null },
  {
    id: 3,
    name: "StarQueen",
    scores: [300, 250, 180, 90, 120],
    level: 12,
    badge: "diamond",
  },
  { id: 4, name: "IronFist", scores: [40, 30], level: 2, badge: null },
  {
    id: 5,
    name: "ShadowBlade",
    scores: [150, 200, 175],
    level: 9,
    badge: "silver",
  },
];

function getTotalScore(player) {
  const totalScore = player.scores.reduce((acc, curr) => acc + curr, 0);
  return totalScore;
}

// getTotalScore(players[0]); // 500
// getTotalScore(players[1]); // 185
// getTotalScore(players[2]); // 940

function getRanking(players) {
  const totalScore = players.map((score, index) => {
    return {
      rank: index + 1,
      name: score.name,
      totalScore: getTotalScore(score),
      badge: score.badge ?? "none",
    };
  });

  const sortScore = totalScore.sort((a, b) => b.totalScore - a.totalScore);
  const rankPlayer = sortScore.map((player, index) => {
    return {
      ...player,
      rank: index + 1,
    };
  });

  return rankPlayer;
}

// console.log(getRanking(players));
// [
//   { rank: 1, name: "StarQueen",   totalScore: 940, badge: "diamond" },
//   { rank: 2, name: "ShadowBlade", totalScore: 525, badge: "silver"  },
//   { rank: 3, name: "DragonSlayer",totalScore: 500, badge: "gold"    },
//   { rank: 4, name: "NightWolf",   totalScore: 185, badge: "none"    },
//   { rank: 5, name: "IronFist",    totalScore: 70, badge: "none"    },
// ]

function getTopPlayers(players, n) {
  const ranking = getRanking(players);
  const slicePlayer = ranking.slice(0, n);
  const nameRanking = slicePlayer.map((n) => n.name);
  return nameRanking;
}

// getTopPlayers(players, 3);
// ["StarQueen", "ShadowBlade", "DragonSlayer"]

// getTopPlayers(players, 1);
// ["StarQueen"]

function formatPlayerCard(player) {
  const namePlayer = player.name;
  const levelPlayer = "LV." + player.level;
  const totalScore = getTotalScore(player) + " điểm";
  let badge = player.badge;
  switch (badge) {
    case "diamond":
      badge = "💎 DIAMOND";
      break;
    case "gold":
      badge = "🏅 GOLD";
      break;
    case "silver":
      badge = "🥈 SILVER";
      break;
    default:
      badge = "";
      break;
  }

  const result = `${namePlayer} | ${levelPlayer} | ${totalScore} ${badge ? `| ${badge}` : ""}`;
  return result;
}

// "🥇 DragonSlayer | Lv.8 | 500 điểm | 🏅 GOLD"
// "🥇 StarQueen    | Lv.12 | 940 điểm | 💎 DIAMOND"
// "🥈 ShadowBlade  | Lv.9 | 525 điểm | 🥈 SILVER"
// "   NightWolf    | Lv.5 | 185 điểm"

// formatPlayerCard(players[0]);
// // "DragonSlayer | Lv.8 | 500 điểm | 🏅 GOLD"

// formatPlayerCard(players[1]);
// // "NightWolf | Lv.5 | 185 điểm"

// formatPlayerCard(players[2]);
// // "StarQueen | Lv.12 | 940 điểm | 💎 DIAMOND"

//TEST CASE

console.log(getTotalScore(players[0])); // 500
console.log(getTotalScore(players[3])); // 70

console.log(getRanking(players)[0]);
// { rank: 1, name: "StarQueen", totalScore: 940, badge: "diamond" }

console.log(getRanking(players)[4]);
// { rank: 5, name: "IronFist", totalScore: 70, badge: "none" }

console.log(getTopPlayers(players, 3));
// ["StarQueen", "ShadowBlade", "DragonSlayer"]

console.log(formatPlayerCard(players[0])); // "DragonSlayer | Lv.8 | 500 điểm | 🏅 GOLD"
console.log(formatPlayerCard(players[1])); // "NightWolf | Lv.5 | 185 điểm"
console.log(formatPlayerCard(players[2])); // "StarQueen | Lv.12 | 940 điểm | 💎 DIAMOND"
