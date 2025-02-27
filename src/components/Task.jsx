/* eslint-disable */
import {useState} from "react";
import {clsx} from "clsx";

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
        <li key={props.item.id}>
            <label htmlFor={props.item.id} className="task-item">{props.item.name}
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
                        <button className={clsx("complete-button",
                            {"hidden" : props.item.isCompleted})} onClick={() => props.toggleCheck(props.item.id)}>Complete</button>
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