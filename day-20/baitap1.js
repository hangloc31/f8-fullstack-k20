//1. Tạo một object gốc, bên trong có một method trả về câu giới thiệu ngắn dựa trên 2 thuộc tính (tên và tuổi) lấy từ this.
console.log("1. ===============================");

const item1 = {
  name: "Nguyễn Văn A",
  age: 28,
  introduce: function () {
    return `Tôi là ${this.name}, ${this.age} tuổi`;
  },
};

console.log(item1.introduce());

//2. Dùng Object.create() tạo tiếp một object khác có prototype là object gốc ở trên, đồng thời thêm vào một method mới — trả về
// một câu mô tả dựa trên 2 thuộc tính khác (ví dụ phòng ban và lương) lấy từ this.
console.log("2. ===============================");

const item2 = Object.create(item1);
item2.department = "IT";
item2.salary = 15000000;
item2.getInfo = function () {
  return `${this.name} làm ở phòng ${this.department}, lương ${this.salary}`;
};

console.log(item2.getInfo());

//3. Tạo ít nhất 5 object cụ thể, prototype của mỗi cái đều là object ở bước 2. Mỗi object này chỉ cần chứa
// đúng 4 thuộc tính riêng của nó thôi (tên, tuổi, phòng ban, lương) — đừng viết lại các method đã có sẵn ở prototype làm gì.
console.log("3. ===============================");
const user1 = Object.create(item2);
user1.name = "Tran Van B";
user1.age = 25;
user1.department = "Marketing";
user1.salary = 5000000;

const user2 = Object.create(item2);
user2.name = "Le Thi C";
user2.age = 30;
user2.department = "Kế Toán";
user2.salary = 8000000;

const user3 = Object.create(item2);
user3.name = "Pham Van D";
user3.age = 22;
user3.department = "Nhân Sự";
user3.salary = 6000000;

const user4 = Object.create(item2);
user4.name = "Hoang Thi E";
user4.age = 35;
user4.department = "IT";
user4.salary = 12000000;

const user5 = Object.create(item2);
user5.name = "Do Van F";
user5.age = 28;
user5.department = "IT";
user5.salary = 15000000;

console.log(user3.introduce());
console.log(user3.getInfo());

//4. Viết một hàm để kiểm tra xem một thuộc tính có phải là thuộc tính riêng của object hay không
// (tức không tính mấy cái kế thừa từ prototype). Dùng cách viết hiện đại, đừng gọi trực tiếp qua chính object đó.
console.log("4. ===============================");

function checkOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

console.log(checkOwnProperty(item1, "name"));
// Output: true
console.log(checkOwnProperty(item1, "sayHi"));
// Output: false

//5. Viết code chứng minh chuỗi prototype hoạt động đúng: từ một object cụ thể, truy ngược lên sẽ ra được object ở bước 2,
// rồi từ đó truy tiếp lên sẽ ra object gốc ở bước 1. Sau đó tạo thêm một prototype hoàn toàn mới, có method mô tả trả về câu khác hẳn,
// rồi đổi prototype của một trong các object cụ thể sang cái mới này — chứng minh hành vi của nó đổi theo ngay lập tức.
console.log("5. ===============================");

console.log(Object.getPrototypeOf(user1) === item2); //truy ngược lên object bước 2
console.log(Object.getPrototypeOf(item2) === item1); //truy ngược lên object đầu tiên

//Prototype mới
const newProto = {
  getInfo() {
    return `Câu mô tả khác hẳn, lấy từ newProto`;
  },
};
console.log("TRƯỚC: ", user3.getInfo());
Object.setPrototypeOf(user3, newProto);
console.log("SAU: ", user3.getInfo());

//6. In ra tên toàn bộ các thuộc tính riêng (không tính kế thừa) của một object cụ thể bất kỳ.
console.log("6. ===============================");

console.log(Object.getOwnPropertyNames(user2));
// Output: ["name", "age", "department", "salary"]

//7. Lấy descriptor đầy đủ (value, writable, enumerable, configurable) của một thuộc tính bất kỳ trên object đó.
console.log("7. ===============================");

console.log(Object.getOwnPropertyDescriptor(user2, "name"));
// Output: { value: 15000000, writable: true, enumerable: true, configurable: true }

//8. Niêm phong một trong các object cụ thể lại, sao cho không ai thêm hay xóa thuộc tính được nữa,
// nhưng vẫn sửa được giá trị của thuộc tính đã có sẵn (ví dụ lương). Viết code kiểm chứng cả hai điều này luôn.
console.log("8. ===============================");
Object.seal(user4);
user4.email = "a@c.com";
console.log(user4.email); //Thêm không thành công
delete user4.salary;
console.log(user4.salary); //Xóa không thành công

user4.salary = 7000000;
console.log(user4.salary); //Sửa giá trị salary của object user4

console.log(Object.isSealed(user4));
// Output: true

//9. Có sẵn một mảng chứa các object cụ thể ở bước 3, thuộc ít nhất 2-3 phòng ban khác nhau.
// Dùng Object.groupBy() để nhóm chúng lại theo phòng ban.
console.log("9. ===============================");

const users = [user1, user2, user3, user4, user5];
console.log(users);

const grouped = Object.groupBy(users, (item) => item.department);
console.log(grouped);

//10. Cho một mảng gồm các cặp [mã, tên], dùng Object.fromEntries() biến nó thành một object để tra cứu nhanh theo mã.
console.log("10. ===============================");

const entries = [
  ["A001", "Nguyễn Văn A"],
  ["A002", "Trần Văn B"],
  ["A003", "Lê Thị C"],
];

const lookup = Object.fromEntries(entries);
console.log(lookup);
console.log(lookup["A002"]);
