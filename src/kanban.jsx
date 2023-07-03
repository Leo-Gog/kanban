import React, { useState } from "react";
import "./kanbanStyle.css";
import useLocalStorage from "./hooks/useLocalStorage";
import useWindowResize from "./hooks/useWindowResize";

const Kanban = () => {
  const [boards, setBoards] = useState([
    { id: 1, title: "Inbox", items: [{ id: 1, title: "task 1" }] },
    { id: 2, title: "inProgress", items: [{ id: 7, title: "task 1, board-2" }] },
    { id: 3, title: "Done", items: [{ id: 9, title: "task 1, board-3" }] }
  ])

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
  
  const [theme, setTheme] = useLocalStorage("theme", true)
  const width = useWindowResize()

  const resize = () => width <= 576 ?  false : true

  const [newItemTitles, setNewItemTitles] = useState({1: "", 2: "", 3: ""})

  const dragOverHandler = (e) => {
    e.preventDefault()
    if (e.target.className === "item") e.target.style.boxShadow = "0 4px 3px gray";
  }

  const dragLeaveHandler = (e) => {
    if (e.target.className === "item") e.target.style.boxShadow = "none"
  } 

  const dragStartHandler = (e, board, item) => {
    setCurrentBoard(board)
    setCurrentItem(item)
  }

  const dragEndHandler = (e) => {
    if (e.target.className === "item") e.target.style.boxShadow = "none"
  }

  const dropHandler = (e, targetBoard) => {
    e.preventDefault()
    if (currentBoard.id !== targetBoard.id) {
      const updatedBoards = boards.map((board) => {
        if (board.id === currentBoard.id) {
          const updatedItems = board.items.filter((item) => item.id !== currentItem.id)
          return { ...board, items: updatedItems }
        }
        if (board.id === targetBoard.id) {
          const updatedItems = [...board.items, currentItem]
          return { ...board, items: updatedItems }
        }
        return board
      })
      setBoards(updatedBoards)
    } else {
      const updatedBoards = boards.map((board) => {
        if (board.id === currentBoard.id) {
          const updatedItems = [...board.items]
          const dragIndex = updatedItems.findIndex((item) => item.id === currentItem.id)
          updatedItems.splice(dragIndex, 1)
          updatedItems.splice(e.target.dataset.index, 0, currentItem)
          return { ...board, items: updatedItems }
        }
        return board
      })
      setBoards(updatedBoards)
    }
  }

  const handleNewItemChange = (e, board) => {
    const { value } = e.target

    const updatedNewItemTitles = { ...newItemTitles, [board.id]: value }
    setNewItemTitles(updatedNewItemTitles)
  };

  const handleAddItem = (board) => {
    const newItem = { id: Date.now(), title: newItemTitles[board.id] }
    const updatedBoards = boards.map((b) => {
      if (b.id === board.id) {
        const updatedItems = [...b.items, newItem]
        return { ...b, items: updatedItems }
      }
      return b
    })
    setBoards(updatedBoards);

    const updatedNewItemTitles = { ...newItemTitles, [board.id]: "" }
    setNewItemTitles(updatedNewItemTitles)
  }

  const toggleDarkMode = () => {
    setTheme(!theme)
  }
 const toggel = `${resize() && theme && 'dark-mode'}`
return (
  <>
    <button onClick={() => toggleDarkMode() } className="switch-btn">Switch mode</button>
    <div className="kanban">
        {boards.map((board) => (
          <div
            key={board.id}
            className={`board ${toggel}`}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, board)}
          >
            <div className={`border__title ${toggel}`}>{board.title}</div>
            {board.items.map((item, index) => (
              <div
                key={item.id}
                onDragOver={(e) => dragOverHandler(e)}
                onDragLeave={(e) => dragLeaveHandler(e)}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDrop={(e) => dropHandler(e, board)}
                draggable="true"
                className={`item ${toggel}`}
                data-index={index}
              >
                {item.title}
              </div>
            ))}
            <div className={`item-container ${toggel}`}>
              <input
                type="text"
                placeholder="Add new item"
                value={newItemTitles[board.id]}
                onChange={(e) => handleNewItemChange(e, board)}
                className={`item-input ${toggel}`}
              />
              <button onClick={() => handleAddItem(board)} className={`add-item-button ${toggel}`}>
                Add
              </button>
            </div>
          </div>
        ))}
    </div>
  </>
  );
};

export default Kanban