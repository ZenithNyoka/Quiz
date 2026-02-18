const app = document.getElementById("app");
const backBtn = document.getElementById("backBtn");

let currentTopic = "";
let page = 0;
let score = 0;
let questionIndex = 0;
let historyStack = [];
let inQuiz = false;

const quizData = {
  AVL: [
    { q: "AVL Tree is a type of?", o: ["Binary Tree", "Heap", "Graph", "Queue"], a: 0 },
    { q: "Balance factor values are?", o: ["0 or 1", "-1, 0, 1", "1 or 2", "Any"], a: 1 },
    { q: "AVL Tree is?", o: ["Unbalanced", "Balanced", "Linear", "None"], a: 1 },
    { q: "Rotation is used to?", o: ["Search", "Balance", "Delete", "Traverse"], a: 1 },
    { q: "AVL is faster in?", o: ["Insertion", "Searching", "Deletion", "Traversal"], a: 1 },
    { q: "Worst-case height?", o: ["O(n)", "O(log n)", "O(1)", "O(n log n)"], a: 1 },
    { q: "AVL uses which rotations?", o: ["LL, RR", "LR, RL", "All", "None"], a: 2 },
    { q: "Invented by?", o: ["Knuth", "Adelson-Velsky", "Tarjan", "Cormen"], a: 1 },
    { q: "AVL Tree is a?", o: ["BST", "Heap", "Graph", "Trie"], a: 0 },
    { q: "Balance factor formula?", o: ["L − R", "R − L"], a: 0 },

    { type: "id", q: "What does AVL stand for?", a: "adelson velsky landis" },
    { type: "id", q: "What property must always be maintained?", a: "balance" },
    { type: "id", q: "Max allowed balance factor?", a: "1" },
    { type: "id", q: "What rotation fixes left-left case?", a: "right rotation" },
    { type: "id", q: "What rotation fixes right-right case?", a: "left rotation" },
    { type: "id", q: "Tree type AVL belongs to?", a: "bst" },
    { type: "id", q: "What ensures fast searching?", a: "balanced height" },
    { type: "id", q: "Height complexity?", a: "log n" },
    { type: "id", q: "Imbalance occurs when factor exceeds?", a: "1" },
    { type: "id", q: "Opposite of balanced tree?", a: "unbalanced" },

    { type: "prob", q: "If balance factor becomes 2, what happens?", a: "rotation needed" },
    { type: "prob", q: "Insert causes RR imbalance, what fix?", a: "left rotation" },
    { type: "prob", q: "Insert causes LL imbalance, fix?", a: "right rotation" },
    { type: "prob", q: "Height grows linearly if?", a: "not balanced" },
    { type: "prob", q: "AVL search time complexity?", a: "log n" },
    { type: "prob", q: "After deletion imbalance occurs, action?", a: "rebalance" },
    { type: "prob", q: "AVL guarantees what height?", a: "minimal" },
    { type: "prob", q: "Balance factor = 0 means?", a: "perfectly balanced" },
    { type: "prob", q: "Rotation preserves what order?", a: "bst order" },
    { type: "prob", q: "LR imbalance fix?", a: "left right rotation" }
  ],

  Binary: [
    { q: "Maximum children?", o: ["1", "2", "3", "Unlimited"], a: 1 },
    { q: "Nodes are?", o: ["Sorted", "Unsorted", "Linear", "Circular"], a: 1 },
    { q: "Expression evaluation?", o: ["Yes", "No"], a: 0 },
    { q: "Root count?", o: ["0", "1", "2", "Many"], a: 1 },
    { q: "Traversal types?", o: ["3", "1", "2", "4"], a: 0 },
    { q: "Inorder of BST gives?", o: ["Sorted", "Random", "Reverse", "None"], a: 0 },
    { q: "Max nodes at level L?", o: ["2^L", "L", "L²", "2L"], a: 0 },
    { q: "Leaf nodes have?", o: ["2 children", "1 child", "0 children", "Many"], a: 2 },
    { q: "Height starts from?", o: ["0", "1", "-1", "Any"], a: 0 },
    { q: "Full BT nodes?", o: ["2n+1", "2n−1", "n²", "n+1"], a: 1 },

    { type: "id", q: "Max children per node?", a: "2" },
    { type: "id", q: "Topmost node is called?", a: "root" },
    { type: "id", q: "Node without children?", a: "leaf" },
    { type: "id", q: "Traversal left-root-right?", a: "inorder" },
    { type: "id", q: "Traversal root-left-right?", a: "preorder" },
    { type: "id", q: "Traversal left-right-root?", a: "postorder" },
    { type: "id", q: "Tree with n nodes max height?", a: "n" },
    { type: "id", q: "Binary tree with all nodes full?", a: "full tree" },
    { type: "id", q: "Binary tree sorted property?", a: "bst" },
    { type: "id", q: "Height balanced tree called?", a: "avl" },

    { type: "prob", q: "Height of single node tree?", a: "0" },
    { type: "prob", q: "Max nodes at level 3?", a: "8" },
    { type: "prob", q: "Total nodes full tree height 2?", a: "7" },
    { type: "prob", q: "Leaf count in full tree n internal?", a: "n+1" },
    { type: "prob", q: "Nodes in complete tree height h?", a: "2^h-1" },
    { type: "prob", q: "Balanced tree improves?", a: "search speed" },
    { type: "prob", q: "Binary tree with only right children?", a: "skewed" },
    { type: "prob", q: "Min nodes height h?", a: "h+1" },
    { type: "prob", q: "Traversal for sorting BST?", a: "inorder" },
    { type: "prob", q: "Insert order affects?", a: "shape" }
  ],

  BTree: [
    { q: "Used in?", o: ["Games", "Databases", "AI", "Networking"], a: 1 },
    { q: "B-Tree is?", o: ["Unbalanced", "Balanced", "Linear", "Heap"], a: 1 },
    { q: "Nodes can have?", o: ["Many keys", "One key", "No key", "Two"], a: 0 },
    { q: "Improves?", o: ["Disk access", "Speed", "Memory", "CPU"], a: 0 },
    { q: "Height is?", o: ["Large", "Small", "Infinite", "Random"], a: 1 },
    { q: "Tree type?", o: ["Multiway", "Binary", "Graph", "Trie"], a: 0 },
    { q: "Minimum degree?", o: ["t", "n", "m", "k"], a: 0 },
    { q: "Leaves appear at?", o: ["Same level", "Different", "Random", "Root"], a: 0 },
    { q: "Optimized for?", o: ["RAM", "Cache", "Disk", "CPU"], a: 2 },
    { q: "Reduces?", o: ["Height", "Memory", "Keys", "Sorting"], a: 0 },

    { type: "id", q: "Tree designed for disk storage?", a: "btree" },
    { type: "id", q: "Max children determined by?", a: "degree" },
    { type: "id", q: "All leaves at?", a: "same level" },
    { type: "id", q: "Nodes store?", a: "multiple keys" },
    { type: "id", q: "Balanced automatically?", a: "yes" },
    { type: "id", q: "Used in DB indexing?", a: "yes" },
    { type: "id", q: "Search complexity?", a: "log n" },
    { type: "id", q: "Reduces disk?", a: "access" },
    { type: "id", q: "Opposite of binary tree?", a: "multiway" },
    { type: "id", q: "Minimum keys depends on?", a: "degree" },

    { type: "prob", q: "More keys per node means?", a: "less height" },
    { type: "prob", q: "B-tree improves what operation?", a: "searching" },
    { type: "prob", q: "Split happens when node?", a: "overflows" },
    { type: "prob", q: "Merge happens when node?", a: "underflows" },
    { type: "prob", q: "Balanced property ensures?", a: "fast access" },
    { type: "prob", q: "Used mostly in?", a: "databases" },
    { type: "prob", q: "Large block reading improves?", a: "disk performance" },
    { type: "prob", q: "Height remains?", a: "small" },
    { type: "prob", q: "Keys sorted inside node?", a: "yes" },
    { type: "prob", q: "Root split causes?", a: "height increase" }
  ]
};

function navigate(render) {
  if (!inQuiz) historyStack.push(app.innerHTML);
  backBtn.classList.toggle("hidden", historyStack.length === 0);
  render();
}

backBtn.onclick = () => {
  if (inQuiz) return;
  app.innerHTML = historyStack.pop();
  backBtn.classList.toggle("hidden", historyStack.length === 0);
};

function showHome() {
  historyStack = [];
  inQuiz = false;
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
      "AVL Tree is a SELF-BALANCING Binary Search Tree. It keeps its height small by ensuring the balance factor of every node is −1, 0, or +1.",
      "When imbalance occurs, AVL Trees use rotations such as LL, RR, LR, and RL to restore balance.",
      "Because AVL Trees remain balanced, searching, insertion, and deletion all run in O(log n) time."
    ],

    Binary: [
      "A Binary Tree is a hierarchical data structure where each node can have at most TWO children: left and right.",
      "Binary Trees are used in expression evaluation, file systems, searching structures, and decision trees.",
      "Common traversals are Inorder (sorted for BST), Preorder, and Postorder."
    ],

    BTree: [
      "A B-Tree is a multiway balanced search tree designed for efficient disk storage and database indexing.",
      "Each node can contain multiple keys and children, reducing tree height significantly.",
      "All leaf nodes remain at the same level, ensuring consistent and fast search performance."
    ]
  };

  app.innerHTML = `
    <div class="card">
      <h3>${currentTopic}</h3>
      <p>${content[currentTopic][page - 1]}</p>
      <button onclick="${page < content[currentTopic].length ? "nextPage()" : "startQuiz()"}">
        ${page < content[currentTopic].length ? "Next" : "Start Quiz"}
      </button>
    </div>
  `;
}

function nextPage() { page++; showContent(); }

function startQuiz() {
  score = 0;
  questionIndex = 0;
  inQuiz = true;
  backBtn.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  const q = quizData[currentTopic][questionIndex];
  const total = quizData[currentTopic].length;

  if (q.type === "id" || q.type === "prob") {
    app.innerHTML = `
      <div class="card">
        <p>Question ${questionIndex + 1} of ${total}</p>
        <h3>${q.q}</h3>
        <input id="answerInput" placeholder="Type answer here">
        <button onclick="checkTextAnswer()">Submit</button>
      </div>
    `;
  } else {
    app.innerHTML = `
      <div class="card">
        <p>Question ${questionIndex + 1} of ${total}</p>
        <h3>${q.q}</h3>
        ${q.o.map((opt, i) => `<button onclick="checkAnswer(${i})">${opt}</button>`).join("")}
      </div>
    `;
  }
}

function checkTextAnswer() {
  const input = document.getElementById("answerInput").value.toLowerCase().trim();
  const correct = quizData[currentTopic][questionIndex].a.toLowerCase();
  if (input.includes(correct)) score++;
  questionIndex++;
  questionIndex < quizData[currentTopic].length ? showQuestion() : showResult();
}

function checkAnswer(choice) {
  if (choice === quizData[currentTopic][questionIndex].a) score++;
  questionIndex++;
  questionIndex < quizData[currentTopic].length ? showQuestion() : showResult();
}

function showResult() {
  inQuiz = false;
  app.innerHTML = `
    <div class="card">
      <h2>Quiz Completed</h2>
      <p>Your Score</p>
      <h3>${score} / ${quizData[currentTopic].length}</h3>
      <button onclick="showHome()">Home</button>
    </div>
  `;
}

showHome();


