export default function Task(props){
    return(
        <li key={props.item.id} className="list-item">
            <input type="checkbox" id={props.item.id} className="checkbox" checked={props.item.isCompleted} onChange={props.toggleCheck} />
            <label htmlFor={props.item.id}>
                {props.item.task}
            </label>
            <button onClick={props.editTask} className="edit-button">Edit</button>
            <button onClick={props.deleteTask} className="delete-button">Delete</button>
        </li>
    )
}