function createSlug(text) {
  const slug = text
    .replaceAll(/[^\w\s]/g, "")
    .replaceAll(" ", "-")
    .toLowerCase();
  console.log(slug);
}

function generateOrderId(productName, quantity) {
  const prefix = productName.slice(0, 3);
  const orderId =
    `ORD-${prefix}-${quantity}-${productName.length}`.toUpperCase();
  console.log(orderId);
}

function formatPrice(price, currency = "VND") {
  switch (currency) {
    case "VND":
      console.log(
        price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        }),
      );
      break;
    case "USD":
      console.log(
        price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        }),
      );
      break;
    default:
      break;
  }
}

function buildProductUrl(baseUrl, product) {
  const slug = product.name
    .replaceAll(/[^\w\s]/g, "")
    .replaceAll(" ", "-")
    .toLowerCase();

  const result = `${baseUrl}/${product.category}/${slug}?id=${product.id}`;
  console.log(result);
}

const baseUrl = "https://shop.vn";
const product = { name: "MacBook Pro 2024", id: 101, category: "laptop" };

/**Test Cases */
createSlug("MacBook Pro 2024"); // "macbook-pro-2024"
createSlug("iPhone 15 Pro Max!!!"); // "iphone-15-pro-max"
createSlug("Hello   World"); // "hello---world"

generateOrderId("MacBook Pro", 2); // "ORD-MAC-2-11"
generateOrderId("iPhone 15", 5); // "ORD-IPH-5-9"

formatPrice(2000000, "VND"); // "2.000.000 ₫"
formatPrice(1500, "USD"); // "$1,500.00"
formatPrice(300000); // "300.000 ₫"

buildProductUrl("https://shop.vn", {
  name: "MacBook Pro 2024",
  id: 101,
  category: "laptop",
});
// "https://shop.vn/laptop/macbook-pro-2024?id=101"

buildProductUrl("https://shop.vn", {
  name: "iPhone 15",
  id: 55,
  category: "phone",
});
// "https://shop.vn/phone/iphone-15?id=55"
