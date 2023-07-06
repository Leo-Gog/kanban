import Item from "./kanbanItem"
import {useRef} from 'react'
import { BoardContainer, BoardTitle, BoardDivider, AddContainer, ItemInput, AddItemButton } from './myStyledComponents'

const Board = ({board, hendlers}) => {
    const [handleAddItem, ...itemHendlers] = hendlers
    const [dragOverHandler, dropHandler] = itemHendlers
    const inputRef = useRef('')

    const onClick = () => {
        handleAddItem(board.id, inputRef.current.value)
        inputRef.current.value = ''
    }
    
    return (
    <BoardContainer 
        onDragOver={(e) => dragOverHandler(e)} 
        onDrop={(e) => dropHandler(e, board)}
    >
        <BoardTitle>{`${board.title} | ${board.items.length}`}</BoardTitle>
        <BoardDivider color={board.color}/>
        {board.items.map((item, index) => (
            <Item key={item.id} board={board} item={item} index={index} hendlers={itemHendlers}/>
        ))}
        <AddContainer>
            <ItemInput type="text" placeholder="Add new task" ref={inputRef} />
            <AddItemButton onClick={onClick}>Add</AddItemButton>
        </AddContainer>
    </BoardContainer>
    )
}
export default Board