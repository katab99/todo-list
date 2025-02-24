/* eslint-disable */
export default function Task(props){

    function handleSubmit(formData){
        const taskUpdate = formData.get("updated-task");
        console.log(taskUpdate)
        props.updateTask(taskUpdate);
    }

    return(
        <li key={props.item.id} className="list-item">
            <input type="checkbox" id={props.item.id} className="checkbox" checked={props.item.isCompleted} onChange={props.toggleCheck} />
            <label htmlFor={props.item.id}>
                {props.item.isEditing ?
                <form action={handleSubmit}>
                    <input type="text" defaultValue={props.item.task} name="updated-task"/>
                    <button>Save</button>
                </form>
                : props.item.task }
            </label>
                {/*<button onClick={props.toggleEdit} className="edit-button">Cancel</button>*/}
                <button onClick={props.toggleEdit} className="edit-button">Edit</button>
                <button onClick={props.deleteTask} className="delete-button">Delete</button>
        </li>

    )
}