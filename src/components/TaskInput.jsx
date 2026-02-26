import { use } from 'react';
import { useState } from 'react';

function TaskInput({ onAdd }) {

   const [task, setTask] = useState("")
   const handleAddTAsk = () => { onAdd(task), setTask("") }
   return (
      <div className='input-field'>
         <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder='Enter a new task'
         />
         <button className='add-btn' onClick={handleAddTAsk}>Add Task</button>
      </div>
   );
}
export default TaskInput