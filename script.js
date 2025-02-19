const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 500;

let nodes = [];
let edges = [];
let selectedNode = null;
let draggingNode = null;
let traversalPath = [];

function getClickedNode(x, y) {
    return nodes.find(node => Math.hypot(node.x - x, node.y - y) < 20);
}

canvas.addEventListener("mousedown", (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    const clickedNode = getClickedNode(x, y);

    if (clickedNode) {
        draggingNode = clickedNode;
    } else {
        nodes.push({ x, y, id: nodes.length });
        selectedNode = null;
    }

    drawGraph();
});

canvas.addEventListener("mousemove", (event) => {
    if (draggingNode) {
        draggingNode.x = event.offsetX;
        draggingNode.y = event.offsetY;
        drawGraph();
    }
});

canvas.addEventListener("mouseup", () => {
    draggingNode = null;
});

canvas.addEventListener("click", (event) => {
    if (draggingNode) return;

    const x = event.offsetX;
    const y = event.offsetY;
    const clickedNode = getClickedNode(x, y);

    if (clickedNode) {
        if (selectedNode && selectedNode !== clickedNode) {
            edges.push({ from: selectedNode, to: clickedNode });
            selectedNode = null;
        } else {
            selectedNode = clickedNode;
        }
    }

    drawGraph();
});

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    edges.forEach(edge => {
        ctx.beginPath();
        ctx.moveTo(edge.from.x, edge.from.y);
        ctx.lineTo(edge.to.x, edge.to.y);
        ctx.stroke();
    });

    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 20, 0, Math.PI * 2);
        ctx.fillStyle = traversalPath.includes(node.id) ? "green" : (selectedNode && selectedNode.id === node.id) ? "red" : "blue";
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "white";
        ctx.fillText(node.id, node.x - 5, node.y + 5);
    });
}

function startTraversal() {
    if (nodes.length === 0) return;

    const type = document.getElementById("traversalType").value;
    traversalPath = [];
    document.getElementById("traversalPath").innerText = "Traversal Path: ";
    document.getElementById("cycleDetection").innerText = "";

    let visited = new Set();

    if (type === "dfs") {
        for (let node of nodes) {
            if (!visited.has(node.id)) {
                dfs(node, visited);
            }
        }
        animateTraversal();
    } else if (type === "bfs") {
        for (let node of nodes) {
            if (!visited.has(node.id)) {
                bfs(node, visited);
            }
        }
        animateTraversal();
    } else if (type === "cycleDetection") {
        detectCycle();
    }
}

function dfs(startNode, visited) {
    let stack = [startNode];

    while (stack.length > 0) {
        let node = stack.pop();
        if (!visited.has(node.id)) {
            visited.add(node.id);
            traversalPath.push(node.id);
            let neighbors = edges.filter(e => e.from.id === node.id || e.to.id === node.id)
                .map(e => (e.from.id === node.id ? e.to : e.from));
            stack.push(...neighbors);
        }
    }
}

function bfs(startNode, visited) {
    let queue = [startNode];

    while (queue.length > 0) {
        let node = queue.shift();
        if (!visited.has(node.id)) {
            visited.add(node.id);
            traversalPath.push(node.id);
            let neighbors = edges.filter(e => e.from.id === node.id || e.to.id === node.id)
                .map(e => (e.from.id === node.id ? e.to : e.from));
            queue.push(...neighbors);
        }
    }
}

function detectCycle() {
    let visited = new Set();
    let parent = new Map();

    function hasCycle(node, parentNode) {
        if (visited.has(node.id)) return false;
        visited.add(node.id);

        let neighbors = edges.filter(e => e.from.id === node.id || e.to.id === node.id)
            .map(e => (e.from.id === node.id ? e.to : e.from));

        for (let neighbor of neighbors) {
            if (!visited.has(neighbor.id)) {
                parent.set(neighbor.id, node.id);
                if (hasCycle(neighbor, node.id)) return true;
            } else if (neighbor.id !== parentNode) {
                return true;
            }
        }
        return false;
    }

    let cycleFound = false;
    for (let node of nodes) {
        if (!visited.has(node.id)) {
            if (hasCycle(node, -1)) {
                cycleFound = true;
                break;
            }
        }
    }

    document.getElementById("cycleDetection").innerText = cycleFound ? "Cycle is Present" : "Cycle is Not Present";
}

function animateTraversal(index = 0) {
    if (index >= traversalPath.length) return;

    let nodeId = traversalPath[index];
    let node = nodes.find(n => n.id === nodeId);
    if (node) {
        drawGraph();
        document.getElementById("traversalPath").innerText += ` ${nodeId}`;
    }

    setTimeout(() => animateTraversal(index + 1), 500);
}

function clearGraph() {
    nodes = [];
    edges = [];
    selectedNode = null;
    traversalPath = [];
    drawGraph();
    document.getElementById("traversalPath").innerText = "Traversal Path: ";
    document.getElementById("cycleDetection").innerText = "";
}
