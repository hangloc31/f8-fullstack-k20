const orders = [
  {
    id: 1,
    customer: "An",
    product: "Áo thun",
    category: "fashion",
    amount: 300000,
    status: "completed",
  },
  {
    id: 2,
    customer: "Bình",
    product: "iPhone 15",
    category: "electronics",
    amount: 25000000,
    status: "completed",
  },
  {
    id: 3,
    customer: "An",
    product: "Quần jean",
    category: "fashion",
    amount: 450000,
    status: "canceled",
  },
  {
    id: 4,
    customer: "Chi",
    product: "Tai nghe",
    category: "electronics",
    amount: 1200000,
    status: "completed",
  },
  {
    id: 5,
    customer: "Bình",
    product: "Giày",
    category: "fashion",
    amount: 900000,
    status: "pending",
  },
  {
    id: 6,
    customer: "An",
    product: "Sạc dự phòng",
    category: "electronics",
    amount: 350000,
    status: "completed",
  },
  {
    id: 7,
    customer: "Duy",
    product: "Áo khoác",
    category: "fashion",
    amount: 600000,
    status: "completed",
  },
];

function getRevenueByCategory(orders) {
  return orders.reduce((result, order) => {
    if (order.status === "completed") {
      const category = order.category;
      if (!result[category]) {
        result[category] = 0;
      }
      result[category] += order.amount;
    }
    return result;
  }, {});
}

console.log(getRevenueByCategory(orders));
// {
//   fashion: 900000,       // 300000 + 600000 (đơn canceled bị loại)
//   electronics: 26550000, // 25000000 + 1200000 + 350000
// }

function getSpendingByCustomer(orders) {
  return orders.reduce((result, order) => {
    if (order.status === "completed") {
      const customer = order.customer;
      if (!result[customer]) {
        result[customer] = 0;
      }
      result[customer] += order.amount;
    }
    return result;
  }, {});
}

console.log(getSpendingByCustomer(orders));
// {
//   An: 650000,      // 300000 + 350000
//   Bình: 25000000,
//   Chi: 1200000,
//   Duy: 600000,
// }

function getOrderCountByStatus(orders) {
  return orders.reduce((result, order) => {
    const status = order.status;
    if (!result[status]) {
      result[status] = 0;
    }
    result[status] += 1;
    return result;
  }, {});
}

console.log(getOrderCountByStatus(orders));
// { completed: 5, canceled: 1, pending: 1 }

function getTopCustomer(orders) {
  const spending = orders.reduce((result, order) => {
    if (order.status === "completed") {
      const customer = order.customer;
      if (!result[customer]) {
        result[customer] = 0;
      }
      result[customer] += order.amount;
    }
    return result;
  }, {});

  let topCustomer = "";
  let maxTotal = 0;

  for (let customer in spending) {
    if (spending[customer] > maxTotal) {
      maxTotal = spending[customer];
      topCustomer = customer;
    }
  }

  return { customer: topCustomer, total: maxTotal };
}

console.log(getTopCustomer(orders));
// { customer: "Bình", total: 25000000 }

function getFullReport(orders) {
  return orders.reduce(
    (result, order) => {
      // 1. Đếm status (tất cả đơn)
      const status = order.status;
      if (!result.statusCount[status]) {
        result.statusCount[status] = 0;
      }
      result.statusCount[status] += 1;

      // 2. Nếu là completed thì xử lý thêm
      if (order.status === "completed") {
        // 2a. Revenue theo category
        const category = order.category;
        if (!result.revenueByCategory[category]) {
          result.revenueByCategory[category] = 0;
        }
        result.revenueByCategory[category] += order.amount;

        // 2b. Spending theo customer
        const customer = order.customer;
        if (!result.spendingByCustomer[customer]) {
          result.spendingByCustomer[customer] = 0;
        }
        result.spendingByCustomer[customer] += order.amount;

        // 2c. Tổng revenue
        result.totalRevenue += order.amount;
      }

      return result;
    },
    {
      revenueByCategory: {},
      spendingByCustomer: {},
      statusCount: {},
      totalRevenue: 0,
    },
  );
}

console.log(getFullReport(orders));
// {
//   revenueByCategory: { fashion: 900000, electronics: 26550000 },
//   spendingByCustomer: { An: 650000, Bình: 25000000, Chi: 1200000, Duy: 600000 },
//   statusCount: { completed: 5, canceled: 1, pending: 1 },
//   totalRevenue: 27450000
// }
