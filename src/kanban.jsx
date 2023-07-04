import React, { useState } from "react";
import "./kanbanStyle.css";
import useLocalStorage from "./hooks/useLocalStorage";
import useWindowResize from "./hooks/useWindowResize";
import Board from "./Components/kanbanBoard";

const Kanban = () => {
  const [boards, setBoards] = useState([
    { id: 1, title: "Inbox", items: [{ id: 1, title: "task 1" }] },
    { id: 2, title: "In Progress", items: [{ id: 7, title: "task 1, board-2" }] },
    { id: 3, title: "Done", items: [{ id: 9, title: "task 1, board-3" }] }
  ])

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

  const [theme, setTheme] = useLocalStorage("theme", true)
  const width = useWindowResize()

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

  const handleAddItem = (boardId, itemValue) => {
    const newItem = {id: Date.now(), title: itemValue}

    const updatedBoards = boards.map((b) => {
      if (b.id === boardId) {
        const updatedItems = [...b.items, newItem]
        return { ...b, items: updatedItems }
      }
      return b
    })
    setBoards(updatedBoards)
  }

  const toggleDarkMode = () => setTheme(!theme)

  const toggel = `${!(width <= 576) && theme && 'dark-mode'}`
  const hendlers = [handleAddItem, dragOverHandler, dropHandler, dragLeaveHandler, dragStartHandler, dragEndHandler]

return (
  <>
    <button onClick={() => toggleDarkMode() } className="switch-btn">Switch mode</button>
    <div className="kanban">
        {boards.map((board) => (
          <Board 
            key={board.id}
            board={board} 
            toggel={toggel} 
            hendlers={hendlers}
          />
        ))}
    </div>
  </>
  );
};

export default Kanban