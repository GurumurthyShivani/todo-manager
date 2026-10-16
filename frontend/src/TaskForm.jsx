import { useState } from "react";

const empty = { title: "", description: "", deadline: "", priority: "MEDIUM" };

// Modal dialog used for both "Create New Task" and "Edit task".
export default function TaskForm({ editing, onSave, onClose }) {
  const [form, setForm] = useState(
    editing ? { ...empty, ...editing, deadline: editing.deadline || "" } : empty
  );
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    if (!form.title.trim()) return setErrors({ title: "Title is required" });
    try {
      await onSave({ ...form, deadline: form.deadline || null });
    } catch (err) {
      setErrors(err.fields && Object.keys(err.fields).length ? err.fields : { form: err.message });
    }
  }

  return (
    <div className="overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <form className="modal" onSubmit={submit} noValidate>
        <h2>{editing ? "Edit task" : "Create new task"}</h2>

        <label>
          Title
          <input autoFocus value={form.title} onChange={set("title")} placeholder="What needs to be done?"
                 className={errors.title ? "invalid" : ""} maxLength={120} />
          {errors.title && <span className="error">{errors.title}</span>}
        </label>

        <label>
          Description
          <textarea rows="3" value={form.description || ""} onChange={set("description")}
                    placeholder="Add a few details (optional)" />
          {errors.description && <span className="error">{errors.description}</span>}
        </label>

        <div className="row">
          <label>
            Due date
            <input type="date" value={form.deadline} onChange={set("deadline")} />
          </label>
          <label>
            Priority
            <select value={form.priority} onChange={set("priority")}>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </label>
        </div>

        {errors.form && <span className="error">{errors.form}</span>}

        <div className="actions">
          <button className="btn ghost" type="button" onClick={onClose}>Cancel</button>
          <button className="btn dark" type="submit">{editing ? "Save changes" : "Create task"}</button>
        </div>
      </form>
    </div>
  );
}
