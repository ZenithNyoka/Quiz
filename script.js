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
    { q: "AVL is faster in?", o: ["Insertion", "Searching", "Deletion", "Traversal"], a: 1 },
    { q: "Worst case height of AVL Tree?", o: ["O(n)", "O(log n)", "O(1)", "O(n log n)"], a: 1 },
    { q: "Which rotations exist in AVL?", o: ["LL, RR", "LR, RL", "All of these", "None"], a: 2 },
    { q: "AVL Tree was invented by?", o: ["Knuth", "Adelson-Velsky", "Tarjan", "Cormen"], a: 1 },
    { q: "AVL Tree is a?", o: ["BST", "Heap", "Graph", "Trie"], a: 0 },
    { q: "Balance factor = height(left) − height(right)?", o: ["True", "False"], a: 0 }
  ],

  Binary: [
    { q: "Maximum children per node?", o: ["1", "2", "3", "Unlimited"], a: 1 },
    { q: "Binary Tree nodes are?", o: ["Sorted", "Unsorted", "Linear", "Circular"], a: 1 },
    { q: "Used in expression evaluation?", o: ["Yes", "No"], a: 0 },
    { q: "Root node count?", o: ["0", "1", "2", "Many"], a: 1 },
    { q: "Traversal types?", o: ["3", "1", "2", "4"], a: 0 },
    { q: "Inorder traversal of BST gives?", o: ["Sorted order", "Reverse", "Random", "None"], a: 0 },
    { q: "Binary Tree max nodes at level L?", o: ["2^L", "L", "L²", "2L"], a: 0 },
    { q: "Leaf nodes have?", o: ["Two children", "One child", "No children", "Many children"], a: 2 },
    { q: "Binary Tree height starts from?", o: ["0", "1", "-1", "Any"], a: 0 },
    { q: "Full Binary Tree nodes count formula?", o: ["2n+1", "2n−1", "n²", "n+1"], a: 1 }
  ],

  BTree: [
    { q: "B-Tree is used in?", o: ["Games", "Databases", "AI", "Networking"], a: 1 },
    { q: "B-Tree is?", o: ["Unbalanced", "Balanced", "Linear", "Heap"], a: 1 },
    { q: "Nodes can have?", o: ["Many keys", "One key", "No key", "Two keys"], a: 0 },
    { q: "B-Tree improves?", o: ["Disk access", "Speed", "Memory", "CPU"], a: 0 },
    { q: "B-Tree height is?", o: ["Large", "Small", "Infinite", "Random"], a: 1 },
    { q: "B-Tree is a?", o: ["Multiway tree", "Binary tree", "Graph", "Trie"], a: 0 },
    { q: "Minimum degree of B-Tree is?", o: ["t", "n", "m", "k"], a: 0 },
    { q: "All leaves appear at?", o: ["Same level", "Different levels", "Random", "Root"], a: 0 },
    { q: "B-Tree is optimized for?", o: ["RAM", "Cache", "Disk storage", "CPU"], a: 2 },
    { q: "B-Tree reduces?", o: ["Tree height", "Memory", "Keys", "Sorting"], a: 0 }
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
      <img src="tree.png" class="tree-img">
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
  navigate(showContent);
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
  const total = quizData[currentTopic].length;

  app.innerHTML = `
    <div class="card">
      <p>Question ${questionIndex + 1} of ${total}</p>
      <h3>${q.q}</h3>
      ${q.o.map((opt, i) => `<button onclick="checkAnswer(${i})">${opt}</button>`).join("")}
    </div>
  `;
}

function checkAnswer(choice) {
  if (choice === quizData[currentTopic][questionIndex].a) score++;
  questionIndex++;

  questionIndex < quizData[currentTopic].length
    ? showQuestion()
    : showResult();
}

function showResult() {
  const total = quizData[currentTopic].length;

  app.innerHTML = `
    <div class="card">
      <h2>Quiz Completed</h2>
      <p>Your Score</p>
      <h3>${score} / ${total}</h3>
      <button onclick="showHome()">Home</button>
    </div>
  `;
}

showHome();
