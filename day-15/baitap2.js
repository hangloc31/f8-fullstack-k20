function isPrime(number) {
  if (number < 2) {
    return false;
  }

  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

function isDivisibleBy15(number) {
  return number % 15 === 0;
}

function printNumberTriangle(n) {
  for (let row = 1; row <= n; row++) {
    let line = "";

    for (let number = 1; number <= row; number++) {
      let value = number;

      if (isDivisibleBy15(number)) {
        value = "#";
      } else if (isPrime(number)) {
        value = "*";
      }

      line += value;

      if (number < row) {
        line += " ";
      }
    }

    console.log(line);

    if (row % 2 === 0) {
      console.log("-".repeat(row));
    }
  }
}

// Test phụ hàm kiểm tra số nguyên tố và chia hết cho 15
console.log(isPrime(1)); // false
console.log(isPrime(2)); // true
console.log(isPrime(9)); // false
console.log(isPrime(15)); // false
console.log(isDivisibleBy15(15)); // true
console.log(isDivisibleBy15(9)); // false

// Test chính
printNumberTriangle(15);
