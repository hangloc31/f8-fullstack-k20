//1. Tạo một object cấu hình, bên trong có vài thuộc tính tùy ý (một số, một chuỗi, một số khác cũng được).
// Sau khi tạo xong thì "khóa cứng" lại — không cho ai sửa, thêm hay xóa bất kỳ thuộc tính nào của nó nữa, dù có
// cố tình gán đè cũng vô hiệu.
console.log("1. ===============================");
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retryCount: 3,
  mucPhuPhi: 5000,
};

Object.freeze(config);
config.timeout = 9999;
config.mucPhuPhi = 0.5;
delete config.apiUrl;

console.log(config.timeout); //Giá trị ban đầu không đổi
console.log(Object.isFrozen(config)); //true

//2.
console.log("2. ===============================");

class Order {
  constructor(name) {
    this.name = name;
    this.items = [];
    this._discount = 0;

    Object.defineProperty(this, "id", {
      value: `ORD_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      writable: false,
      enumerable: false,
      configurable: false,
    });
  }
  addItem(name, price, quantity) {
    this.items.push({ name, price, quantity });
  }

  get total() {
    //Tính tổng tiền các sản phẩm
    let sum = this.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    //Cộng phụ phí từ config
    sum += config.mucPhuPhi;

    //Trừ giảm giá (nếu có)
    if (this._discount > 0) {
      sum = sum * (1 - this._discount / 100);
    }

    return sum;
  }
  set discount(value) {
    if (value < 0 || value > 100) {
      throw new Error(`Giảm giá phải từ 0 đến 100, nhận được ${value}`);
    }
    this._discount = value;
  }
}

const order = new Order("Nam");
order.addItem("Bánh mì", 15000, 2);
order.addItem("Cà phê", 25000, 1);

console.log("Tổng trước giảm giá:", order.total);

order.discount = 10;
console.log("Tổng sau giảm 10%:", order.total);

console.log("3. ===============================");

function logSummary() {
  console.log(`Danh sách của ${this.name}: ${this.total}`);
}
setTimeout(logSummary.bind(order), 100);

console.log("4. ===============================");

console.log(order.id);
order.id = "xyz";
console.log("id sau khi ghi đè: ", order.id);
console.log("Object.keys:", Object.keys(order));

for (let key in order) console.log("for...in:", key);

delete order.id;
console.log("id sau khi xóa:", order.id);

console.log("5. ===============================");

const objA = { name: "Alex", age: 25, city: "Hà Nội" };
const objB = { age: 30, salary: 1000 };
const merged = { ...objA, ...objB };
console.log("Object mới sau khi merge:", merged);

console.log("objA: ", objA);
console.log("objB: ", objB);
