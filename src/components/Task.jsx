/* eslint-disable */
import {useState} from "react";

export default function Task(props){
    const [isEditing, setIsEditing] = useState(false);

    function submitEdit(formData){
        const taskUpdate = formData.get("updated-task");
        props.updateTask(
            {...props.item, task : taskUpdate},
        );

        toggleEdit()
    }

    function toggleEdit(){
        setIsEditing(prevInEdit => !prevInEdit);
    }

    return(
        <li key={props.item.id} className="list-item">
            <label htmlFor={props.item.id}>
                {isEditing ?
                    <>
                        <form id="edit-task" action={submitEdit}>
                            <input type="text" defaultValue={props.item.task} name="updated-task"/>
                        </form>
                        <button form="edit-task" type="submit">Save</button>
                        <button type="button">Cancel</button>
                    </>
                :
                    <>
                        <span>{props.item.task}</span>
                        <button onClick={() => props.toggleCheck(props.item.id)}>Complete</button>
                        <button onClick={toggleEdit} className="edit-button">Edit</button>
                        <button onClick={props.deleteTask} className="delete-button">Delete</button>
                    </>
                     }
            </label>
        </li>

    )
}