# Graph Visualizer

Graph Visualizer is a web-based interactive tool to visualize graph structures and perform various graph traversal algorithms like Depth-First Search (DFS), Breadth-First Search (BFS), and Cycle Detection.

## Features
- Add nodes by clicking on the canvas.
- Drag nodes to reposition them.
- Connect nodes by clicking on two nodes sequentially.
- Visualize DFS and BFS traversal paths.
- Detect cycles in the graph.
- Clear the graph to start fresh.

## Technologies Used
- **HTML**: Structure of the webpage.
- **CSS**: Styling and layout.
- **JavaScript**: Graph logic and interactivity.

## Installation & Usage
1. Clone the repository or download the source code.
2. Open `index.html` in any modern web browser.
3. Interact with the canvas to add and connect nodes.
4. Select an algorithm from the dropdown and click `Start Traversal` to see the results.
5. Click `Clear Graph` to reset the canvas.

## How to Use
1. **Adding Nodes**: Click anywhere on the canvas to add a node.
2. **Connecting Nodes**: Click on two nodes sequentially to create an edge between them.
3. **Dragging Nodes**: Click and drag a node to move it.
4. **Graph Traversal**:
   - Select **DFS** or **BFS** from the dropdown and click `Start Traversal` to visualize the traversal path.
   - Select **Cycle Detection** to check if the graph contains cycles.
5. **Clearing the Graph**: Click `Clear Graph` to remove all nodes and edges.

## File Structure
```
📂 Graph Visualizer
├── index.html  # Main HTML file
├── style.css   # CSS styling (included in HTML)
├── script.js   # JavaScript logic (included in HTML)
```

## Future Enhancements
- Allow users to label nodes and edges.
- Implement weighted graphs with Dijkstra's Algorithm.
- Add undo/redo functionality.
- Improve UI/UX with animations and transitions.


