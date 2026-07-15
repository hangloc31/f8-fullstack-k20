const students = [
  { id: 1, name: "Khoa Nguyen" },
  { id: 2, name: "My Tran" },
  { id: 3, name: "Phong Le" },
  { id: 4, name: "Yen Vo" },
  { id: 5, name: "Bao Pham" },
];

const answerKey = [
  { question: 1, correctAnswer: "A", point: 2 },
  { question: 2, correctAnswer: "C", point: 1 },
  { question: 3, correctAnswer: "B", point: 3 },
  { question: 4, correctAnswer: "D", point: 2 },
  { question: 5, correctAnswer: "A", point: 2 },
];

const submissions = [
  {
    studentId: 1,
    submittedAt: "2026-07-10T08:00:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "A" },
      { question: 5, answer: "A" },
    ],
  },
  {
    studentId: 2,
    submittedAt: "2026-07-10T08:05:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "B" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "C" },
    ],
  },
  {
    studentId: 3,
    submittedAt: "2026-07-10T07:58:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "A" },
    ],
  },
  {
    studentId: 4,
    submittedAt: "2026-07-10T08:02:00",
    answers: [
      { question: 1, answer: "B" },
      { question: 2, answer: "C" },
    ],
  },
  {
    studentId: 5,
    submittedAt: "2026-07-10T08:01:00",
    answers: [
      { question: 1, answer: "A" },
      { question: 2, answer: "C" },
      { question: 3, answer: "B" },
      { question: 4, answer: "D" },
      { question: 5, answer: "A" },
    ],
  },
];

// [
//   {
//     id,
//     name,
//     score,
//     correctCount,
//     wrongQuestions,
//     rank,
//   },
// ];

function gradeExam(students, answerKey, submissions) {
  const result = students.map((stu) => {
    const submission = submissions.find(
      (sub) => sub.studentId === stu.id && Object.hasOwn(sub, "answers"),
    );

    // console.log("Filter: ", submission);
    let score = 0;
    let correctCount = 0;
    const wrongQuestions = [];

    for (const key of answerKey) {
      const studentAnswer = submission?.answers?.find(
        (a) => a.question === key.question,
      );
      // console.log("Question: ", studentAnswer);
      if (!studentAnswer || studentAnswer.answer !== key.correctAnswer) {
        wrongQuestions.push(key.question); // sai hoặc bỏ trống
      } else {
        score += key.point;
        correctCount++;
      }
    }

    // console.log(score, correctCount, wrongQuestions);

    return {
      id: stu.id,
      name: stu.name,
      score: score,
      correctCount: correctCount,
      wrongQuestions: wrongQuestions,
      submittedAt: submission?.submittedAt,
      rank: null,
    };
  });

  result.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const aTime = a.submittedAt ? new Date(a.submittedAt).getTime() : Infinity;
    const bTime = b.submittedAt ? new Date(b.submittedAt).getTime() : Infinity;
    return aTime - bTime;
  });

  result.forEach((student, index) => {
    // console.log(student.submittedAt);
    if (index === 0) {
      student.rank = 1;
    } else if (student.score < result[index - 1].score) {
      student.rank = index + 1;
    } else {
      student.rank = result[index - 1].rank;
    }
    delete student.submittedAt;
  });

  return result;
}
console.log(gradeExam(students, answerKey, submissions));

class WrongAnswerIterator {
  constructor(studentResult) {
    this.wrongQuestions = studentResult.wrongQuestions;
  }
  [Symbol.iterator]() {
    let index = 0;
    const data = this.wrongQuestions;

    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

const result = gradeExam(students, answerKey, submissions);

const iterator = new WrongAnswerIterator(result[2]);
for (const q of iterator) {
  console.log(q); // in ra: 4
}

// result[1] = My Tran: wrongQuestions = [2, 5]
const iterator2 = new WrongAnswerIterator(result[3]);
for (const q of iterator2) {
  console.log(q); // in ra: 2, 5
}
