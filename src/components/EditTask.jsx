import { useState } from "react";

function EditTask({ task, onSave, onCancle }) {
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
            <button onClick={saveEdit}>save</button>
            <button onClick={oncancel}>cancel</button>
        </div>
    );
}
export default EditTask