// Checks if all cells of the same color are connected (4-directionally)
function verifyGridConnected(cells) {
    const gridSize = cells.length;
    const visited = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
    const colorGroups = {};

    // Collect all positions for each color
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const color = cells[i][j];
            if (!colorGroups[color]) colorGroups[color] = [];
            colorGroups[color].push([i, j]);
        }
    }

    // For each color, check connectivity
    for (const color in colorGroups) {
        const positions = colorGroups[color];
        if (positions.length === 1) continue;
        // BFS/DFS from the first position
        const [startX, startY] = positions[0];
        const queue = [[startX, startY]];
        const localVisited = Array.from({ length: gridSize }, () => Array(gridSize).fill(false));
        localVisited[startX][startY] = true;
        let count = 1;
        while (queue.length) {
            const [x, y] = queue.shift();
            for (const [dx, dy] of [[0,1],[1,0],[0,-1],[-1,0]]) {
                const nx = x + dx, ny = y + dy;
                if (
                    nx >= 0 && nx < gridSize &&
                    ny >= 0 && ny < gridSize &&
                    !localVisited[nx][ny] &&
                    cells[nx][ny] === color
                ) {
                    localVisited[nx][ny] = true;
                    queue.push([nx, ny]);
                    count++;
                }
            }
        }
        if (count !== positions.length) return false;
    }
    return true;
}
import { useState, useEffect, useRef } from "react";

const colors = ['#ebc034', '#6193d4', '#d46161', '#7fc464'];


function Grid2() {
    const [selectX, setSelectX] = useState(0);
    const [selectY, setSelectY] = useState(0);
    const [picked, setPicked] = useState(false);
    const gridSize = 5;
    const gridRef = useRef(null);
    const [cells, setCells] = useState(() => {
        // initialize 2D array of random colors
        return Array.from({ length: gridSize }, () =>
            Array.from({ length: gridSize }, () => colors[Math.floor(Math.random() * colors.length)])
        );
    });

    useEffect(() => {
        const handleKeyDown = (e) => {
            let newX = selectX;
            let newY = selectY;
            let moved = false;
            // Movement: WASD only
            if (e.key === "w" || e.key === "W") {
                newX = Math.max(0, selectX - 1);
                moved = newX !== selectX;
            } else if (e.key === "s" || e.key === "S") {
                newX = Math.min(gridSize - 1, selectX + 1);
                moved = newX !== selectX;
            } else if (e.key === "a" || e.key === "A") {
                newY = Math.max(0, selectY - 1);
                moved = newY !== selectY;
            } else if (e.key === "d" || e.key === "D") {
                newY = Math.min(gridSize - 1, selectY + 1);
                moved = newY !== selectY;
            }
            if (["w", "W", "a", "A", "s", "S", "d", "D"].includes(e.key)) {
                if (picked && (newX !== selectX || newY !== selectY)) {
                    setCells((prevCells) => {
                        const newCells = prevCells.map(row => [...row]);
                        const temp = newCells[selectX][selectY];
                        newCells[selectX][selectY] = newCells[newX][newY];
                        newCells[newX][newY] = temp;
                        // Check after swap
                        if (verifyGridConnected(newCells)) {
                            console.log("Grid is verified!");
                        }
                        return newCells;
                    });
                } else {
                    // Check after move (no swap)
                    if (verifyGridConnected(cells)) {
                        console.log("Grid is verified!");
                    }
                }
                setSelectX(newX);
                setSelectY(newY);
            } else if (e.key === " " || e.key === "Spacebar") {
                setPicked((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectX, selectY, picked, gridSize, cells]);

    return (
        <div className="centered-grid" tabIndex={0} ref={gridRef}>
            {cells.map((row, rowIdx) =>
                row.map((cell, colIdx) => {
                    // Tint background with color, more visible
                    let tint = cell + '66';
                    if (selectX === rowIdx && selectY === colIdx) {
                        tint = cell + 'bb';
                    }
                    return (
                        <div
                            key={`${rowIdx}-${colIdx}`}
                            className={((selectX === rowIdx && selectY === colIdx) ? (!picked ? "selected-grid-cell" : "picked-grid-cell") : "grid-cell")}
                            style={{ background: tint }}
                        >
                            <div
                                className={"cell-circle "}
                                style={{ backgroundColor: cell }}
                            />
                        </div>
                    );
                })
            )}
        </div>
    );
}

export default Grid2;