function classifyUser(user) {
  const displayName = user.name || "Ẩn danh";
  const isAdult = user.age >= 18;
  const hasEmail = user.email ? true : false;
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
  email: "",
  score: 90,
  role: "admin",
};

console.log(classifyUser(user));
