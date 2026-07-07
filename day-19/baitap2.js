function getCustomerStatistics(customers, products, orders) {
  const productMap = {};
  for (const p of products) {
    productMap[p.id] = p;
  }

  const customerOrders = {};
  for (const order of orders) {
    const cid = order.customerId;
    if (!customerOrders[cid]) customerOrders[cid] = [];
    customerOrders[cid] = [...customerOrders[cid], order];
  }

  const result = [];

  for (const customer of customers) {
    const custOrders = customerOrders[customer.id] || [];

    const productAgg = {};

    for (const order of custOrders) {
      for (const item of order.items) {
        const prod = productMap[item.productId];
        if (!prod) continue;

        if (!productAgg[prod.id]) {
          productAgg[prod.id] = { name: prod.name, quantity: 0, totalSpent: 0 };
        }
        productAgg[prod.id].quantity += item.quantity;
        productAgg[prod.id].totalSpent += prod.price * item.quantity;
      }
    }

    const productsList = Object.values(productAgg);
    productsList.sort((a, b) => b.totalSpent - a.totalSpent);

    let totalSpent = 0;
    for (const p of productsList) {
      totalSpent += p.totalSpent;
    }

    result.push({
      id: customer.id,
      name: customer.name,
      totalSpent,
      products: productsList,
    });
  }

  result.sort((a, b) => b.totalSpent - a.totalSpent);

  return result;
}

// ---- TEST CASES ----

const productsDB = [
  { id: 101, name: "Laptop", price: 1200 },
  { id: 102, name: "Phone", price: 800 },
  { id: 103, name: "Tablet", price: 500 },
  { id: 104, name: "Headphones", price: 150 },
];

// Test Case 1 - Gộp cùng sản phẩm
console.log("=== Test Case 1: Gộp cùng sản phẩm ===");
const tc1 = getCustomerStatistics(
  [{ id: 1, name: "Alice" }],
  productsDB,
  [
    { customerId: 1, items: [{ productId: 101, quantity: 2 }, { productId: 101, quantity: 3 }] },
  ]
);
console.log(JSON.stringify(tc1[0].products, null, 2));

// Test Case 2 - Customer không có đơn hàng
console.log("\n=== Test Case 2: Không đơn hàng ===");
const tc2 = getCustomerStatistics(
  [{ id: 10, name: "David" }],
  productsDB,
  []
);
console.log(JSON.stringify(tc2, null, 2));

// Test Case 3 - Một đơn hàng nhiều sản phẩm
console.log("\n=== Test Case 3: Một đơn hàng nhiều sản phẩm ===");
const tc3 = getCustomerStatistics(
  [{ id: 2, name: "Bob" }],
  productsDB,
  [
    { customerId: 2, items: [{ productId: 101, quantity: 1 }, { productId: 102, quantity: 2 }] },
  ]
);
const c3 = tc3[0];
console.log("Laptop:", c3.products.find(p => p.name === "Laptop").totalSpent);
console.log("Phone:", c3.products.find(p => p.name === "Phone").totalSpent);
console.log("Customer Total:", c3.totalSpent);

// Test Case 4 - Nhiều đơn hàng cùng sản phẩm
console.log("\n=== Test Case 4: Nhiều đơn hàng cùng sản phẩm ===");
const tc4 = getCustomerStatistics(
  [{ id: 3, name: "Carol" }],
  productsDB,
  [
    { customerId: 3, items: [{ productId: 101, quantity: 1 }] },
    { customerId: 3, items: [{ productId: 101, quantity: 2 }] },
    { customerId: 3, items: [{ productId: 101, quantity: 5 }] },
  ]
);
console.log(JSON.stringify(tc4[0].products[0], null, 2));

// Test Case 5 - Sắp xếp Customer
console.log("\n=== Test Case 5: Sắp xếp Customer ===");
const tc5 = getCustomerStatistics(
  [
    { id: 4, name: "An" },
    { id: 5, name: "Bình" },
    { id: 6, name: "Chi" },
  ],
  productsDB,
  [
    { customerId: 4, items: [{ productId: 101, quantity: 2 }, { productId: 102, quantity: 1 }, { productId: 104, quantity: 2 }] },
    { customerId: 5, items: [{ productId: 101, quantity: 3 }, { productId: 102, quantity: 2 }] },
    { customerId: 6, items: [{ productId: 101, quantity: 2 }, { productId: 102, quantity: 1 }, { productId: 104, quantity: 6 }] },
  ]
);
console.log(tc5.map(c => c.name).join("\n"));

// Test Case 6 - Sắp xếp Products
console.log("\n=== Test Case 6: Sắp xếp Products ===");
const tc6 = getCustomerStatistics(
  [{ id: 7, name: "User" }],
  productsDB,
  [
    {
      customerId: 7,
      items: [
        { productId: 101, quantity: 3 },
        { productId: 102, quantity: 1 },
        { productId: 103, quantity: 4 },
        { productId: 104, quantity: 3 },
      ],
    },
  ]
);
console.log(tc6[0].products.map(p => p.name).join("\n"));

// Test Case 7 - Customer chỉ mua một sản phẩm
console.log("\n=== Test Case 7: Một sản phẩm ===");
const tc7 = getCustomerStatistics(
  [{ id: 8, name: "Charlie" }],
  productsDB,
  [
    { customerId: 8, items: [{ productId: 104, quantity: 10 }] },
  ]
);
console.log(JSON.stringify(tc7[0], null, 2));

// Test Case 8 - Không có dữ liệu
console.log("\n=== Test Case 8: Không dữ liệu ===");
const tc8 = getCustomerStatistics([], [], []);
console.log(JSON.stringify(tc8));
