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
    { q: "Balance factor formula?", o: ["L − R", "R − L"], a: 0 }
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
    { q: "Full BT nodes?", o: ["2n+1", "2n−1", "n²", "n+1"], a: 1 }
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
    { q: "Reduces?", o: ["Height", "Memory", "Keys", "Sorting"], a: 0 }
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
      "An AVL Tree is a self-balancing Binary Search Tree (BST). This means that for every node, the height difference between its left and right subtrees (called the balance factor) is at most 1. Because of this rule, AVL trees always remain balanced.",

      "Whenever an insertion or deletion causes imbalance, AVL Trees use rotations (LL, RR, LR, RL) to restore balance. This guarantees that the height of the tree stays O(log n), making operations efficient.",

      "AVL Trees provide very fast searching because they are strictly balanced. However, insertions and deletions are slightly slower due to the overhead of maintaining balance. They are best used when search operations are frequent."
    ],

    Binary: [
      "A Binary Tree is a hierarchical data structure in which each node can have at most two children, commonly referred to as the left child and the right child. There is no restriction on the order of elements unless it is a Binary Search Tree.",

      "Binary Trees are widely used to represent hierarchical relationships such as file systems, expression trees, and decision trees. They are also the foundation for more advanced trees like AVL Trees and Heaps.",

      "Binary Trees support three main traversal methods: inorder, preorder, and postorder. These traversals are used for searching, evaluating expressions, and processing nodes in a specific order."
    ],

    BTree: [
      "A B-Tree is a self-balancing multiway search tree where each node can contain multiple keys and have more than two children. It is designed to work efficiently with large blocks of data.",

      "B-Trees are commonly used in databases and file systems because they minimize disk access. All leaf nodes appear at the same level, ensuring consistent search performance.",

      "By storing multiple keys in a single node, B-Trees reduce the height of the tree. This makes searching, insertion, and deletion operations efficient even for very large datasets."
    ]
  };

  app.innerHTML = `
    <div class="card">
      <h3>${currentTopic}</h3>
      <p>${content[currentTopic][page - 1]}</p>
      <button onclick="${
        page < content[currentTopic].length ? "nextPage()" : "startQuiz()"
      }">
        ${page < content[currentTopic].length ? "Next" : "Start Quiz"}
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
  inQuiz = true;
  backBtn.classList.add("hidden");
  showQuestion();
}

function showQuestion() {
  const q = quizData[currentTopic][questionIndex];
  const total = quizData[currentTopic].length;

  app.innerHTML = `
    <div class="card">
      <p>Question ${questionIndex + 1} of ${total}</p>
      <h3>${q.q}</h3>
      ${q.o.map((opt, i) =>
        `<button onclick="checkAnswer(${i})">${opt}</button>`
      ).join("")}
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

