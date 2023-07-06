import React, { useState } from "react";
import Board from "./Components/kanbanBoard";
import { KanbanContainer, KanbanBoards } from "./Components/myStyledComponents";

const Kanban = () => {
  const [boards, setBoards] = useState([
    { 
      id: 1,
      title: "Inbox",
      color: "#b87b66",
      items: [
        { id: 1, color: "#339df5", title: "Download Android app" },
        { id: 2, color: "#f64728", title: "Change and update account details in the iOS app" }
      ]
     },
    {
      id: 2,
      title: "In Progress",
      color: "#fefdab",
      items: [
        { id: 3, color: "#f64728", title: "Set up recurring utilites payments" },
        { id: 4, color: "#ebc90f", title: "View transaction history by category" },
        { id: 5, color: "#339df5", title: "Set and monitor progress on financial goals" }
      ] 
    },
    {
      id: 3,
      title: "Done",
      color: "#b7c9a1",
      items: [
        { id: 6, color: "#92d055", title: "Download iOS app" },
        { id: 7, color: "#339df5", title: "Transfer money between accounts" }
      ] 
    }
  ])

  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

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
  
  const hendlers = [handleAddItem, dragOverHandler, dropHandler, dragLeaveHandler, dragStartHandler, dragEndHandler]

  return (
    <KanbanContainer className="kanban">
      <KanbanBoards>
        {boards.map((board) => (
          <Board 
            key={board.id}
            board={board}
            hendlers={hendlers}
          />
        ))}
      </KanbanBoards>
    </KanbanContainer>
  );
};

export default Kanban