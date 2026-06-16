function classifyUser(user) {
  const displayName = user.name || "Ẩn danh";
  const isAdult = user.age >= 18;
  const hasEmail = user.email.length > 0;
  const role = user.role ?? "guest";
  const status = user.score >= 80 ? "vip" : user.score >= 50 ? "normal" : "new";

  return {
    displayName: displayName,
    isAdult: isAdult,
    hasEmail: hasEmail,
    role: role,
    status: status,
    canAccess: isAdult && role !== "guest",
  };
}

const user = {
  name: "Duy",
  age: 16,
  email: "duy@gmail.com",
  score: 90,
  role: "admin",
};

console.log(classifyUser(user));
