import { useState } from 'react';
import { CATEGORIES } from './categoryComponents';

function TaskInput({ onAdd }) {
   const [isAdding, setIsAdding] = useState(false);
   const [category, setCategory] = useState(CATEGORIES[0].label);
   const [task, setTask] = useState("");

   const handleAddClick = () => {
      if (task.trim() === "") {
         setIsAdding(false);
         return;
      }
      onAdd(task, category);
      setTask("");
      setIsAdding(false);
   };

   return (
      <div className='task-input-container'>
         {!isAdding ? (
            /* Show ONLY this button initially */
            <button className='open-btn' onClick={() => setIsAdding(true)}>
               + Add New Task
            </button>
         ) : (
            /* Show the full form ONLY when isAdding is true */
            <div className='input-field-active'>
               <input
                  type="text"
                  value={task}
                  autoFocus
                  onChange={(e) => setTask(e.target.value)}
                  placeholder='What needs to be done?'
               />

               <select 
                  className='select-option'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
               >
                  {CATEGORIES.map((cat) => (
                     <option key={cat.label} value={cat.label}>
                        {cat.label}
                     </option>
                  ))}
               </select>

               <div className="button-group">
                  <button className='add-btn' onClick={handleAddClick}>Save Task</button>
                  <button className='cancel-btn' onClick={() => setIsAdding(false)}>Cancel</button>
               </div>
            </div>
         )}
      </div>
   );
}

export default TaskInput;