const comments = [
  {
    id: 1,
    user: "An",
    content: "Sản phẩm rất tốt!",
    rating: 5,
    verified: true,
    likes: 12,
  },
  { id: 2, user: "", content: "ok", rating: 3, verified: false, likes: 0 },
  {
    id: 3,
    user: "Bình",
    content: "Mua lần 2 rồi, vẫn chất lượng",
    rating: 4,
    verified: true,
    likes: 8,
  },
  {
    id: 4,
    user: "Chi",
    content: "   ",
    rating: null,
    verified: false,
    likes: 2,
  },
  {
    id: 5,
    user: "Duy",
    content: "Giao hàng nhanh, đóng gói cẩn thận, sẽ ủng hộ tiếp!",
    rating: 5,
    verified: true,
    likes: 20,
  },
  {
    id: 6,
    user: null,
    content: "Tệ quá",
    rating: 1,
    verified: false,
    likes: 0,
  },
  {
    id: 7,
    user: "Em",
    content: "Bình thường",
    rating: 3,
    verified: true,
    likes: 1,
  },
  {
    id: 8,
    user: null,
    content: "Bình thường",
    rating: 3,
    verified: false,
    likes: 1,
  },
];

function isValidComment(comment) {
  const isValidUser =
    comment.user !== null &&
    comment.user !== undefined &&
    typeof comment.user === "string" &&
    comment.user.length > 0;

  const isValidContent = comment.content.trim().length >= 5;

  const isValidRating =
    typeof comment.rating === "number" &&
    !Number.isNaN(comment.rating) &&
    comment.rating >= 1 &&
    comment.rating <= 5;
  return isValidUser && isValidContent && isValidRating;
}

function filterValidComments(comments) {
  const result = comments.filter((comment) => {
    return isValidComment(comment) === true;
  });
  return result;
}

function getCommentStats(validComments) {
  //Tìm độ dài
  const total = validComments.length;

  //Tính tổng số sao
  const ratings = validComments.map((comment) => comment.rating);
  const sumRatings = ratings.reduce((acc, curr) => acc + curr, 0);
  const avgRating = Math.round((sumRatings / ratings.length) * 10) / 10;

  //Tính tổng số Like
  const likes = validComments.map((comment) => comment.likes);
  const totalLikes = likes.reduce((acc, curr) => acc + curr, 0);

  //Tìm verifiedCount
  const verified = validComments.filter((v) => {
    return v.verified === true;
  });
  const verifiedCount = verified.length;
  // console.log(verifiedCount);

  //Tìm comment có lượt like cao nhất
  let topComment = validComments[0];
  for (let i = 1; i < validComments.length; i++) {
    if (validComments[i].likes > topComment.likes) {
      topComment = validComments[i];
    }
  }

  return {
    total: total,
    avgRating: avgRating,
    totalLikes: totalLikes,
    verifiedCount: verifiedCount,
    topComment: topComment,
  };
}

function formatComment(comment) {
  let stars = "";
  for (let i = 0; i < comment.rating; i++) {
    stars += "⭐";
  }

  const verifiedUser = comment.verified === true ? "✓" : "";

  const content = comment.content;

  const likes = "👍 " + comment.likes;

  const user = comment.user ?? "Ẩn danh";

  const result = `${stars} | ${user} ${verifiedUser} | ${content} | ${likes}`;
  return result;
}

//TEST CASE

console.log(isValidComment(comments[0])); // true
console.log(isValidComment(comments[1])); // false  (user rỗng, content quá ngắn)
console.log(isValidComment(comments[3])); // false  (content chỉ có khoảng trắng, rating null)
console.log(isValidComment(comments[5])); // false  (user null)

console.log(filterValidComments(comments));
// [comments[0], comments[2], comments[4], comments[6]]
// id: 1, 3, 5, 7

console.log(getCommentStats(filterValidComments(comments)));
// {
//   total: 4,
//   avgRating: 4.3,
//   totalLikes: 41,
//   verifiedCount: 3,
//   topComment: { id: 5, user: "Duy", content: "Giao hàng nhanh...", likes: 20, ... }
// }

console.log(formatComment(comments[0]));
// "⭐⭐⭐⭐⭐ | An ✓ | Sản phẩm rất tốt! | 👍 12"

console.log(formatComment(comments[2]));
// "⭐⭐⭐⭐ | Bình ✓ | Mua lần 2 rồi, vẫn chất lượng | 👍 8"

console.log(formatComment(comments[6]));
// "⭐⭐⭐ | Em ✓ | Bình thường | 👍 1"
