import { Check, Undo, Edit, Trash } from "./Icons.jsx";

const PRIORITY = { LOW: "Low", MEDIUM: "Medium", HIGH: "High" };

const fmt = (d) => (d ? d.split("-").reverse().join("/") : "–");

// One table row.
export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const done = task.status === "COMPLETED";
  return (
    <tr className={done ? "done" : ""}>
      <td className="title-cell">
        <strong>{task.title}</strong>
        {task.description && <span>{task.description}</span>}
      </td>
      <td><span className={`pill ${task.priority.toLowerCase()}`}>{PRIORITY[task.priority]}</span></td>
      <td><span className={`pill ${done ? "completed" : "pending"}`}>{done ? "Completed" : "Pending"}</span></td>
      <td>{fmt(task.createdAt)}</td>
      <td className={task.overdue ? "late" : ""}>
        {fmt(task.deadline)}
        {task.overdue && <em>Overdue</em>}
      </td>
      <td>
        <div className="icons">
          <button className="ico green" onClick={() => onToggle(task)}
                  title={done ? "Mark as pending" : "Mark as completed"}
                  aria-label={done ? "Mark as pending" : "Mark as completed"}>
            {done ? <Undo /> : <Check />}
          </button>
          <button className="ico violet" onClick={() => onEdit(task)} title="Edit" aria-label="Edit task"><Edit /></button>
          <button className="ico rose" onClick={() => onDelete(task)} title="Delete" aria-label="Delete task"><Trash /></button>
        </div>
      </td>
    </tr>
  );
}
