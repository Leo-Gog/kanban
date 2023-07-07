import Item from "./kanbanItem"
import {useRef} from 'react'
import { BoardContainer, BoardTitle, BoardDivider, AddContainer, ItemInput, ColorSelect, AddItemButton } from './myStyledComponents'

const Board = ({board, hendlers}) => {
    const [handleAddItem, ...itemHendlers] = hendlers
    const [dragOverHandler, dropHandler] = itemHendlers
    const inputRef = useRef(null)
    const colorRef = useRef(null)

    const colors = {
        blue: "#339df5",
        green: "#92d055",
        default: "#92d055",
        yellow: "#ebc90f",
        orange: "#FF5F15",
        red: "#f64728",
    }

    const onClick = () => {
        const value = inputRef.current.value
        if (value !== ''){
            handleAddItem(board.id, value, colors[colorRef.current.value])
            inputRef.current.value = ''
        }
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
            <ColorSelect defaultValue={'default'} ref={colorRef}>
                <option disabled value='default' >
                    Select a color
                </option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="orange">Orange</option>
                <option value="red">Red</option>
            </ColorSelect>
            <AddItemButton onClick={onClick}>Add</AddItemButton>
        </AddContainer>
    </BoardContainer>
    )
}
export default Board