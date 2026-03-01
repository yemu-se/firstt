
import { CATEGORIES } from "./categoryComponents";
const TaskCategories = ({ tasks }) => {
  return (
    <div className="category-container">
      <div className="category-grid">
        {CATEGORIES.map((cat) => {
          const count = tasks.filter(t => t.category === cat.label).length;
          return (
            <div key={cat.label} className="category-card">
              <span className="dot" style={{ backgroundColor: cat.color }}></span>
              <span className="label">{cat.label}</span>
              <span className="count">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );


};
export default TaskCategories