function formatBirthday(dateString) {
  const part = dateString.split("-");
  return `${part[2]}/${part[1]}/${part[0]}`;
}

// console.log(formatBirthday("1995-03-25")); // "25/03/1995"
// console.log(formatBirthday("2000-12-01")); // "01/12/2000"

function getAge(birthDateString, currentDateString) {
  const [birthYear, birthMonth, birthDay] = birthDateString
    .split("-")
    .map(Number);
  const [currentYear, currentMonth, currentDay] = currentDateString
    .split("-")
    .map(Number);
  let age = currentYear - birthYear;
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    return --age;
  }
  return age;
}

// console.log(getAge("1995-03-25", "2026-07-19")); // 31  (đã qua sinh nhật tháng 3)
// console.log(getAge("2000-12-01", "2026-07-19")); // 25  (chưa tới sinh nhật tháng 12, nên chưa tính là 26)
// console.log(getAge("1995-08-01", "2026-07-19")); // 30  (còn vài ngày nữa mới tới sinh nhật)

function getDayOfWeekName(dateString) {
  const d = new Date(dateString);
  console.log(d);
  const days = [
    "Chủ nhật",
    "Thứ hai",
    "Thứ ba",
    "Thứ tư",
    "Thứ năm",
    "Thứ sáu",
    "Thứ bảy",
  ];
  return days[d.getDay()];
}

// console.log(getDayOfWeekName("2026-07-19")); // "Chủ nhật"
// console.log(getDayOfWeekName("2000-01-01")); // "Thứ bảy"

//Test Cases tổng hợp

console.log(formatBirthday("1995-03-25")); // "25/03/1995"
console.log(formatBirthday("2000-12-01")); // "01/12/2000"

console.log(getAge("1995-03-25", "2026-07-19")); // 31
console.log(getAge("2000-12-01", "2026-07-19")); // 25
console.log(getAge("1995-08-01", "2026-07-19")); // 30

console.log(getDayOfWeekName("2026-07-19")); // "Chủ nhật"
console.log(getDayOfWeekName("2000-01-01")); // "Thứ bảy"
