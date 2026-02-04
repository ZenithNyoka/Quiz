const app = document.getElementById("app");

let currentTopic = "";
let page = 0;
let score = 0;
let questionIndex = 0;

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

function showHome() {
    app.innerHTML = `
        <div class="card">
            <img src="tree.png" alt="Tree" class="tree-img">
            <h2>Data Structures Quiz</h2>
            <button onclick="startTopic('AVL')">AVL Tree</button>
            <button onclick="startTopic('Binary')">Binary Tree</button>
            <button onclick="startTopic('BTree')">B-Tree</button>
            <button onclick="exitApp()" style="background:#ef5350;color:white;">Exit</button>
        </div>
    `;
}

function startTopic(topic) {
    currentTopic = topic;
    page = 1;
    showContent();
}

function showContent() {
    let content = "";

    if (currentTopic === "AVL") {
        content = page === 1
            ? "An AVL Tree is a self-balancing Binary Search Tree where the height difference between the left and right subtrees of any node is at most one. This balance condition ensures efficient searching operations."
            : "AVL Trees maintain balance using rotations, ensuring fast lookup times compared to unbalanced binary trees.";
    }

    if (currentTopic === "Binary") {
        content = page === 1
            ? "A Binary Tree is a hierarchical data structure where each node has at most two children."
            : "Binary Trees support inorder, preorder, and postorder traversals used in expression evaluation and searching.";
    }

    if (currentTopic === "BTree") {
        content = page === 1
            ? "A B-Tree is a self-balancing multiway tree that stores multiple keys per node."
            : "B-Trees are used in databases and file systems to reduce disk access operations.";
    }

    app.innerHTML = `
        <div class="card">
            <img src="tree.png" alt="Tree" class="tree-img">
            <h3>${currentTopic} Content</h3>
            <p>${content}</p>
            <button onclick="${page === 1 ? "nextPage()" : "showSummary()"}">
                ${page === 1 ? "Next" : "Summary"}
            </button>
        </div>
    `;
}

function nextPage() {
    page++;
    showContent();
}

function showSummary() {
    const summaries = {
        AVL: "AVL Trees are self-balancing Binary Search Trees using rotations to maintain height balance.",
        Binary: "Binary Trees allow each node to have at most two children and form the basis of many structures.",
        BTree: "B-Trees are balanced trees optimized for large datasets and disk-based storage."
    };

    app.innerHTML = `
        <div class="card">
            <h3>${currentTopic} Summary</h3>
            <p>${summaries[currentTopic]}</p>
            <button onclick="startQuiz()">Start Quiz</button>
        </div>
    `;
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
            ${q.o.map((opt, i) => `<button onclick="checkAnswer(${i})">${opt}</button>`).join("")}
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
            <h2>Quiz Completed</h2>
            <h3>Your Score: ${score}/5</h3>
            <button onclick="showHome()">Back to Home</button>
        </div>
    `;
}

function exitApp() {
    app.innerHTML = `
        <div class="card">
            <h2>Thank You!</h2>
            <p>You have exited the Data Structures Quiz.</p>
        </div>
    `;
}

showHome();