function addDays(dateString, days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + days);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  //Format thêm số 0 vào ngày/tháng nếu ngày/tháng < 10
  const monthStr = month < 10 ? `0${month}` : `${month}`;
  const dayStr = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${monthStr}-${dayStr}`;
}

// console.log(addDays("2026-07-19", 10)); // "2026-07-29"
// console.log(addDays("2026-07-25", 10)); // "2026-08-04"
// console.log(addDays("2026-01-01", -5)); // "2025-12-27"

function getDaysBetween(date1String, date2String) {
  const date1 = new Date(date1String);
  const date2 = new Date(date2String);

  const MS_PER_DAY = 86400000;
  const diffInMs = Math.abs(date2.getTime() - date1.getTime());
  const days = Math.floor(diffInMs / MS_PER_DAY);

  return days;
}

// console.log(getDaysBetween("2026-07-19", "2026-08-01")); // 13
// console.log(getDaysBetween("2026-01-01", "2026-12-31")); // 364

function isExpired(expiryDateString, currentDateString) {
  const expiryDate = new Date(expiryDateString);
  const currentDate = new Date(currentDateString);
  return expiryDate < currentDate;
}

// console.log(isExpired("2026-07-01", "2026-07-19")); // true  (đã qua ngày hết hạn)
// console.log(isExpired("2026-12-31", "2026-07-19")); // false (chưa tới hạn)

function getCountdown(targetDateString, currentDateString) {
  const targetDate = new Date(targetDateString);
  const currentDate = new Date(currentDateString);
  if (targetDate < currentDate) {
    return "Đã qua hạn";
  }

  const MS_PER_DAY = 86400000;
  const MS_PER_HOUR = 3600000;

  //Tính chênh lệch miliseconds
  const diffInMs = Math.abs(currentDate.getTime() - targetDate.getTime());
  //Đổi miliseconds sang ngày
  const days = Math.floor(diffInMs / MS_PER_DAY);

  //Số giờ(phần dư sau khi lấy ngày)
  const remainingMs = diffInMs % MS_PER_DAY;
  const hours = Math.floor(remainingMs / MS_PER_HOUR);
  return `Còn ${days} ngày ${hours} giờ`;
}

// console.log(getCountdown("2026-08-01T00:00:00", "2026-07-19T12:00:00"));
// "Còn 12 ngày 12 giờ"

// console.log(getCountdown("2026-07-01T00:00:00", "2026-07-19T12:00:00"));
// "Đã qua hạn"

// Test Cases tổng hợp
console.log(addDays("2026-07-19", 10)); // "2026-07-29"
console.log(addDays("2026-01-01", -5)); // "2025-12-27"

console.log(getDaysBetween("2026-07-19", "2026-08-01")); // 13
console.log(getDaysBetween("2026-01-01", "2026-12-31")); // 364

console.log(isExpired("2026-07-01", "2026-07-19")); // true
console.log(isExpired("2026-12-31", "2026-07-19")); // false

console.log(getCountdown("2026-08-01T00:00:00", "2026-07-19T12:00:00"));
// "Còn 12 ngày 12 giờ"
console.log(getCountdown("2026-07-01T00:00:00", "2026-07-19T12:00:00"));
// "Đã qua hạn"
