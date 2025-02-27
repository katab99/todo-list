/* eslint-disable */
import {useState} from "react";
import {clsx} from "clsx";

export default function Task(props){
    const [isEditing, setIsEditing] = useState(false);
    const [taskText, setTaskText] = useState(props.item.task ? props.item.task : "");

    function submitUpdate(){
        props.updateTask(
            {...props.item, task : taskText},
        );
        toggleEdit();
    }

    function toggleEdit(){
        setIsEditing(prevInEdit => !prevInEdit);
    }

    return(
        <li key={props.item.id}>
            <label htmlFor={props.item.id} className="task-item">
                {isEditing ?
                    <>
                        <input type="text" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
                        <button type="submit" onClick={submitUpdate}>Save</button>
                        <button type="button" onClick={toggleEdit}>Cancel</button>
                    </>
                :
                    <>
                        <button onClick={() => props.toggleCheck(props.item.id)}>Complete</button>
                        <span className="task-name">{props.item.task}</span>
                        <div className="action-buttons">
                            <button onClick={toggleEdit} className="edit-button">Edit</button>
                            <button onClick={props.deleteTask} className="delete-button">Delete</button>
                        </div>
                    </>
                }
            </label>
        </li>

    )
}