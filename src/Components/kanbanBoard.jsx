import Item from "./kanbanItem"
import {useRef} from 'react'

const Board = ({board, toggel, hendlers}) => {
    const [handleAddItem, ...itemHendlers] = hendlers
    const [dragOverHandler, dropHandler] = itemHendlers
    const inputRef = useRef('')

    const onClick = () => {
        handleAddItem(board.id, inputRef.current.value)
        inputRef.current.value = ''
    }
    
    return (
        <div
            className={`board ${toggel}`}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropHandler(e, board)}
        >   
            <div className={`border__title ${toggel}`}>{`${board.title} | ${board.items.length}`}</div>
                {board.items.map((item, index) => (
                    <Item key={item.id} board={board} item={item} index={index} toggel={toggel} hendlers={itemHendlers}/>
                ))}
                <div className={`item-container ${toggel}`}>
                <input
                    type="text"
                    placeholder="Add new item"
                    ref={inputRef}
                    className={`item-input ${toggel}`}
                />
                <button onClick={onClick} className={`add-item-button ${toggel}`}>Add</button>
            </div>
        </div>
    )
}
export default Board