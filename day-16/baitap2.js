const text =
  "javascript là ngôn ngữ lập trình phổ biến javascript chạy trên trình duyệt và javascript cũng chạy trên server";

function getWords(text) {
  return text.split(/\s+/);
}

function countWord(text, word) {
  const words = getWords(text);
  return words.filter((w) => w === word).length;
}

function getUniqueWords(text) {
  const words = getWords(text);
  const uniqueWords = [...new Set(words)];
  return uniqueWords.sort();
}

function getTopWords(text, n) {
  const words = getWords(text);
  const wordCount = {};

  words.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  const sortedWords = Object.entries(wordCount)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);

  return sortedWords.slice(0, n);
}

function highlight(text, word) {
  const regex = new RegExp(`(${word})`, "g");
  return text.replace(regex, "**$1**");
}

// Test cases

console.log(getWords(text));
// ["javascript", "là", "ngôn", "ngữ", "lập", "trình", "phổ", "biến", "javascript", "chạy", "trên", "trình", "duyệt", "và", "javascript", "cũng", "chạy", "trên", "server"]

console.log(countWord(text, "javascript")); // 3
console.log(countWord(text, "chạy")); // 2
console.log(countWord(text, "python")); // 0

console.log(getUniqueWords(text));
// ["và", "biến", "chạy", "cũng", "duyệt", "javascript", "là", "lập", "ngôn", "ngữ", "phổ", "server", "trên", "trình"]
// (sắp xếp alphabet, không trùng)

console.log(getTopWords(text, 3));
// [
//   { word: "javascript", count: 3 },
//   { word: "chạy", count: 2 },
//   { word: "trên", count: 2 },
// ]

console.log(highlight(text, "javascript"));
// "**javascript** là ngôn ngữ lập trình phổ biến **javascript** chạy trên trình duyệt và **javascript** cũng chạy trên server"
