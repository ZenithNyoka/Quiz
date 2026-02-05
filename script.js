const app = document.getElementById("app");
const backBtn = document.getElementById("backBtn");

let currentTopic = "";
let page = 0;
let score = 0;
let questionIndex = 0;
let historyStack = [];

const quizData = {
  AVL: [
    { q: "AVL Tree is a type of?", o: ["Binary Tree", "Heap", "Graph", "Queue"], a: 0 },
    { q: "Balance factor values are?", o: ["0 or 1", "-1, 0, 1", "1 or 2", "Any"], a: 1 },
    { q: "AVL Tree is?", o: ["Unbalanced", "Balanced", "Linear", "None"], a: 1 },
    { q: "Rotation is used to?", o: ["Search", "Balance", "Delete", "Traverse"], a: 1 },
    { q: "AVL is faster in?", o: ["Insertion", "Searching", "Deletion", "Traversal"], a: 1 }
  ],
  Binary: [
    { q: "Max children per node?", o: ["1", "2", "3", "Unlimited"], a: 1 },
    { q: "Binary Tree nodes are?", o: ["Sorted", "Unsorted", "Linear", "Circular"], a: 1 },
    { q: "Used in expression evaluation?", o: ["Yes", "No"], a: 0 },
    { q: "Root node count?", o: ["0", "1", "2", "Many"], a: 1 },
    { q: "Traversal types?", o: ["3", "1", "2", "4"], a: 0 }
  ],
  BTree: [
    { q: "B-Tree is used in?", o: ["Games", "Databases", "AI", "Networking"], a: 1 },
    { q: "B-Tree is?", o: ["Unbalanced", "Balanced", "Linear", "Heap"], a: 1 },
    { q: "Nodes can have?", o: ["Many keys", "One key", "No key", "Two keys"], a: 0 },
    { q: "B-Tree improves?", o: ["Disk access", "Speed", "Memory", "CPU"], a: 0 },
    { q: "B-Tree height is?", o: ["Large", "Small", "Infinite", "Random"], a: 1 }
  ]
};

function navigate(renderFn) {
  historyStack.push(app.innerHTML);
  backBtn.classList.remove("hidden");
  renderFn();
}

backBtn.onclick = () => {
  if (historyStack.length > 0) {
    app.innerHTML = historyStack.pop();
  }
  if (historyStack.length === 0) backBtn.classList.add("hidden");
};

function showHome() {
  historyStack = [];
  backBtn.classList.add("hidden");

  app.innerHTML = `
    <div class="card">
      <img src="tree.png" class="tree-img" />
      <h2>Data Structures Quiz</h2>
      <button onclick="startTopic('AVL')">AVL Tree</button>
      <button onclick="startTopic('Binary')">Binary Tree</button>
      <button onclick="startTopic('BTree')">B-Tree</button>
    </div>
  `;
}

function startTopic(topic) {
  currentTopic = topic;
  page = 1;

  navigate(() => showContent());
}

function showContent() {
  const content = {
    AVL: [
      "AVL Trees are self-balancing Binary Search Trees.",
      "They use rotations to maintain height balance."
    ],
    Binary: [
      "Binary Trees allow at most two children.",
      "They support inorder, preorder, and postorder traversal."
    ],
    BTree: [
      "B-Trees store multiple keys per node.",
      "They are optimized for disk-based systems."
    ]
  };

  app.innerHTML = `
    <div class="card">
      <h3>${currentTopic}</h3>
      <p>${content[currentTopic][page - 1]}</p>
      <button onclick="${page === 1 ? "nextPage()" : "startQuiz()"}">
        ${page === 1 ? "Next" : "Start Quiz"}
      </button>
    </div>
  `;
}

function nextPage() {
  page++;
  showContent();
}

function startQuiz() {
  score = 0;
  questionIndex = 0;
  showQuestion();
}

function showQuestion() {
  const q = quizData[currentTopic][questionIndex];

  app.innerHTML = `
    <div class="card">
      <h3>${q.q}</h3>
      ${q.o.map((o, i) => `<button onclick="checkAnswer(${i})">${o}</button>`).join("")}
    </div>
  `;
}

function checkAnswer(choice) {
  if (choice === quizData[currentTopic][questionIndex].a) score++;
  questionIndex++;
  questionIndex < 5 ? showQuestion() : showResult();
}

function showResult() {
  app.innerHTML = `
    <div class="card">
      <h2>Completed</h2>
      <p>Your Score</p>
      <h3>${score} / 5</h3>
      <button onclick="showHome()">Home</button>
    </div>
  `;
}

showHome();
