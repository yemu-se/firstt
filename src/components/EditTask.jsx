import { useState } from "react";

function EditTask({ task, onSave, onCancel }) {
  const  [taskEdit, setEdit] = useState(task.text)

    const saveEdit = () => {
     if(taskEdit.trim()){
        onSave(task.id,taskEdit)
     }
    };
    return(
        <div className="input-field">
            <input
            type="text"
            value={taskEdit}
            onChange={(e) =>setEdit(e.target.value)}
            onKeyDown={(e)=>e.key ==='Enter'&& saveEdit()}
            autoFocus
            />
            <button className="save-btn" onClick={saveEdit}>save</button>
            <button className="cancel-btn" onClick={onCancel}>cancel</button>
        </div>
    );
}
export default EditTask