const members = [
  { id: 1, name: "Minh Tran", email: "minh@example.com" },
  { id: 2, name: "Lan Pham", email: "lan@example.com" },
  { id: 3, name: "Huy Nguyen", email: "huy@example.com" },
  { id: 4, name: "Trang Le", email: "trang@example.com" },
  { id: 5, name: "Duc Vo", email: "duc@example.com" },
];

const books = [
  { id: 201, title: "Clean Code", finePerDay: 5000 },
  { id: 202, title: "Atomic Habits", finePerDay: 3000 },
  { id: 203, title: "Sapiens", finePerDay: 4000 },
  { id: 204, title: "Deep Work", finePerDay: 2000 },
  { id: 205, title: "The Pragmatic Programmer", finePerDay: 6000 },
];

const borrowRecords = [
  {
    id: 3001,
    memberId: 1,
    lines: [
      { bookId: 201, lateDays: 2 },
      { bookId: 202, lateDays: 0 },
    ],
  },
  {
    id: 3002,
    memberId: 2,
    lines: [
      { bookId: 202, lateDays: 1 },
      { bookId: 203, lateDays: 3 },
    ],
  },
  {
    id: 3003,
    memberId: 3,
    lines: [
      { bookId: 204, lateDays: 5 },
      { bookId: 205, lateDays: 2 },
    ],
  },
  {
    id: 3004,
    memberId: 4,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 203, lateDays: 2 },
    ],
  },
  {
    id: 3005,
    memberId: 5,
    lines: [{ bookId: 205, lateDays: 10 }],
  },
  {
    id: 3006,
    memberId: 1,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 205, lateDays: 3 },
    ],
  },
  {
    id: 3007,
    memberId: 2,
    lines: [
      { bookId: 204, lateDays: 2 },
      { bookId: 203, lateDays: 1 },
    ],
  },
  {
    id: 3008,
    memberId: 3,
    lines: [{ bookId: 202, lateDays: 2 }],
  },
  {
    id: 3009,
    memberId: 4,
    lines: [
      { bookId: 201, lateDays: 1 },
      { bookId: 202, lateDays: 1 },
    ],
  },
  {
    id: 3010,
    memberId: 5,
    lines: [
      { bookId: 203, lateDays: 4 },
      { bookId: 204, lateDays: 3 },
    ],
  },
];

//Hàm trả về danh sách các thành viên (member) với cấu trúc:

// [
//   {
//     id,
//     name,
//     totalFine,
//     books: [
//       {
//         title,
//         lateDays,
//         fine,
//       },
//     ],
//   },
// ];

function getMemberFineStatistics(members, books, borrowRecords) {
  const result = members.map((member) => {
    const borrowRecordsFilterByMembers = borrowRecords.filter(
      (f) => f.memberId === member.id && Object.hasOwn(f, "lines"),
    ); //Lọc danh sách theo id members
    // console.log("Filter: ", borrowRecordsFilterByMembers);

    const allItem = [];
    for (const item of borrowRecordsFilterByMembers) {
      //   console.log("item: ", item);
      for (const total of item.lines) {
        allItem.push(total);
      }
    }
    // console.log("item: ", allItem);
    const totalFine = allItem.reduce((total, item) => {
      const book = books.find((b) => b.id === item.bookId);
      //   console.log("book filter: ", book);
      return total + item.lateDays * book.finePerDay;
    }, 0);
    // console.log("Total Fine: ", totalFine);

    const bookMap = allItem.reduce((acc, item) => {
      const book = books.find((b) => b.id === item.bookId);
      //   console.log(item);

      if (acc[item.bookId]) {
        acc[item.bookId].lateDays += item.lateDays;
        acc[item.bookId].fine += book.finePerDay * item.lateDays;
      } else {
        acc[item.bookId] = {
          title: book.title,
          lateDays: item.lateDays,
          fine: book.finePerDay * item.lateDays,
        };
      }
      return acc;
    }, {});

    // console.log(bookMap);

    return {
      id: member.id,
      name: member.name,
      totalFine: totalFine,
      books: Object.values(bookMap).sort((a, b) => b.fine - a.fine),
    };
  });
  const sortedResult = [...result].sort((a, b) => b.totalFine - a.totalFine);
  const frozenResult = sortedResult.map((member) => Object.freeze(member));
  const finalResult = Object.freeze(frozenResult);
  finalResult[0].totalFine = 999;
  return finalResult;
}

console.log(getMemberFineStatistics(members, books, borrowRecords));

class MemberPaginator {
  constructor(resultList, soLuongMoiTrang) {
    this.resultList = resultList;
    this.soLuongMoiTrang = soLuongMoiTrang;
  }
  [Symbol.iterator]() {
    let currentIndex = 0;
    const data = this.resultList;
    const pageSize = this.soLuongMoiTrang;

    return {
      next() {
        const start = currentIndex;
        const end = currentIndex + pageSize;
        const page = data.slice(start, end);
        currentIndex = end;

        if (page.length > 0) {
          return { value: page, done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}

const result = getMemberFineStatistics(members, books, borrowRecords);
const paginator = new MemberPaginator(result, 2); // mỗi trang 2 member

for (const page of paginator) {
  console.log(page); // mỗi lần lặp là một mảng con gồm tối đa 2 member
}
