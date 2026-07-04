const createCalculator = function () {
  return {
    add: function (a, b) {
      return a + b;
    },
    subtract: function (a, b) {
      return a - b;
    },
    multiply: function (a, b) {
      return a * b;
    },
    divide: function (a, b) {
      if (b === 0) return "Lỗi: chia cho 0";
      return a / b;
    },
  };
};

const calculator = createCalculator();
console.log(calculator.add(2, 3));
console.log(calculator.subtract(10, 4));
console.log(calculator.multiply(3, 5));
console.log(calculator.divide(10, 2));
console.log(calculator.divide(10, 0)); // "Lỗi: chia cho 0"

function average(...numbers) {
  if (numbers.length === 0) {
    return 0;
  }

  let sum = 0;
  for (let number of numbers) {
    sum += number;
  }
  return sum / numbers.length;
}

console.log(average(10, 20, 30)); // 20
console.log(average(5)); // 5
console.log(average()); // 0
console.log(average(1, 2, 3, 4, 5)); // 3

function applyDiscount(price, discountPercent = 10) {
  if (typeof price !== "number" || isNaN(price)) return "Giá không hợp lệ";
  const totalPrice = price - price * (discountPercent / 100);
  return Math.floor(totalPrice);
}

console.log(applyDiscount(100000)); // 90000  (giảm 10% mặc định)
console.log(applyDiscount(100000, 20)); // 80000
console.log(applyDiscount(100000, 0)); // 100000
console.log(applyDiscount("abc", 10)); // "Giá không hợp lệ"
console.log(applyDiscount(NaN, 10)); // "Giá không hợp lệ"

function safeCalculate(operation, ...numbers) {
  for (let number of numbers) {
    if (typeof number !== "number" || isNaN(number)) {
      return "Kết quả không hợp lệ";
    }
  }
  switch (operation) {
    case "add":
      return numbers.reduce((acc, curr) => acc + curr);
      break;
    case "multiply":
      return numbers.reduce((acc, curr) => acc * curr);
      break;
    case "average":
      return numbers.reduce((acc, curr) => acc + curr) / numbers.length;
      break;
    default:
      return "Phép tính không được hỗ trợ";
  }
}

console.log(safeCalculate("add", 1, 2, 3)); // 6
console.log(safeCalculate("multiply", 2, 3, 4)); // 24
console.log(safeCalculate("average", 10, 20)); // 15
console.log(safeCalculate("divide", 10, 2)); // "Phép tính không được hỗ trợ"
console.log(safeCalculate("add", 1, "abc", 3)); // "Kết quả không hợp lệ"
