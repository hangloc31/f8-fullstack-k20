function createOrderSystem() {
  // Function Scope: cart là private, không thể truy cập từ bên ngoài
  const cart = [];

  return {
    addToCart(name, price, qty) {
      cart.push({ name, price, qty });
      return cart.length;
    },

    checkout(distance) {
      // Tính subtotal (tổng tiền hàng)
      let subtotal = 0;
      for (const item of cart) {
        subtotal += item.price * item.qty;
      }

      // Tính phí ship với Block Scope
      let shippingFee;
      if (distance <= 5) {
        const baseRate = 15000; // Block Scope: chỉ tồn tại trong khối này
        shippingFee = baseRate;
      } else if (distance <= 20) {
        const baseRate = 30000; // Block Scope: chỉ tồn tại trong khối này
        shippingFee = baseRate;
      } else {
        const baseRate = 50000; // Block Scope: chỉ tồn tại trong khối này
        shippingFee = baseRate;
      }

      // Miễn phí ship nếu tổng tiền hàng từ 500,000 trở lên
      if (subtotal >= 500000) {
        shippingFee = 0;
      }

      const finalTotal = subtotal + shippingFee;

      // Làm trống giỏ hàng sau khi thanh toán
      cart.length = 0;

      return { subtotal, shippingFee, finalTotal };
    },

    getCartSize() {
      return cart.length;
    },
  };
}

//Test Cases
const store = createOrderSystem();

store.addToCart("Mũ lưỡi trai", 120000, 1); // 1  (số sản phẩm hiện có trong giỏ)
store.getCartSize(); // 1

store.checkout(15);
// { subtotal: 120000, shippingFee: 30000, finalTotal: 150000 }

store.getCartSize(); // 0  (giỏ hàng đã tự làm trống sau khi thanh toán)

// --- Một hệ thống khác, hoàn toàn độc lập ---
const store2 = createOrderSystem();
store2.addToCart("Tất", 30000, 2); // 1
store2.checkout(3);
// { subtotal: 60000, shippingFee: 15000, finalTotal: 75000 }

// --- Đơn hàng lớn, được miễn phí ship dù khoảng cách xa ---
const store3 = createOrderSystem();
store3.addToCart("Áo khoác", 600000, 1); // 1
store3.checkout(30);
// { subtotal: 600000, shippingFee: 0, finalTotal: 600000 }

// store gốc và store2, store3 không hề ảnh hưởng lẫn nhau
store.getCartSize(); // 0
store2.getCartSize(); // 0
store3.getCartSize(); // 0
