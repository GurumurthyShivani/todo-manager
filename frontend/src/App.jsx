// import { useEffect, useState } from "react";
// import { api } from "./api";
// import TaskForm from "./TaskForm.jsx";
// import TaskItem from "./TaskItem.jsx";
// import * as I from "./Icons.jsx";

// const TABS = [["ALL", "All Tasks"], ["PENDING", "Pending"], ["COMPLETED", "Completed"], ["OVERDUE", "Overdue"]];
// const NO_FILTERS = { date: "", priority: "" };

// export default function App() {
//   const [tasks, setTasks] = useState([]);
//   const [tab, setTab] = useState("ALL");
//   const [search, setSearch] = useState("");
//   const [draft, setDraft] = useState(NO_FILTERS);      // what the user is typing
//   const [filters, setFilters] = useState(NO_FILTERS);  // applied with the Filter button
//   const [modal, setModal] = useState(null);            // null | { task: Task | null }
//   const [page, setPage] = useState(0); 
//   const [perPage, setPerPage] = useState(10);
//   const [error, setError] = useState("");

//   async function load() {
//     try {
//       setTasks(await api.list(tab, search));
//       setError("");
//     } catch {
//       setError("Cannot reach the server. Make sure the backend is running on port 8080.");
//     }
//   }

//   useEffect(() => {
//     const t = setTimeout(load, 250); // debounce search typing
//     return () => clearTimeout(t);
//   }, [tab, search]);

//   useEffect(() => setPage(0), [tab, search, filters, perPage]);

//   const visible = tasks.filter(
//     (t) => (!filters.date || t.deadline === filters.date) &&
//            (!filters.priority || t.priority === filters.priority)
//   );
//   const pages = Math.max(1, Math.ceil(visible.length / perPage));
//   const shown = visible.slice(page * perPage, page * perPage + perPage);
//   const from = visible.length ? page * perPage + 1 : 0;
//   const to = Math.min(visible.length, (page + 1) * perPage);

//   async function save(data) {
//     if (modal.task) await api.update(modal.task.id, data);
//     else await api.create(data);
//     setModal(null);
//     load();
//   }
//   async function toggle(task) {
//     await api.setStatus(task.id, task.status === "COMPLETED" ? "PENDING" : "COMPLETED");
//     load();
//   }
//   async function remove(task) {
//     if (!window.confirm(`Delete "${task.title}"?`)) return;
//     await api.remove(task.id);
//     load();
//   }

//   const filtersActive = filters.date || filters.priority;

//   return (
//     <div className="shell">
//       <aside className="sidebar">
//         <div className="logo">T</div>
//         <nav>
//           <button className="active" aria-label="Tasks"><I.Home /></button>
//           <button aria-label="Reports"><I.Chart /></button>
//           <button aria-label="Insights"><I.Pie /></button>
//           <button aria-label="Theme"><I.Moon /></button>
//           <button aria-label="Settings"><I.Gear /></button>
//         </nav>
//       </aside>

//       <section className="content">
//         <div className="head">
//           <h1>My Tasks</h1>
//           <label className="searchbox">
//             <I.Search />
//             <input type="search" placeholder="Search tasks" value={search}
//                    onChange={(e) => setSearch(e.target.value)} />
//           </label>
//         </div>

//         <div className="tabs">
//           {TABS.map(([v, name]) => (
//             <button key={v} className={tab === v ? "active" : ""} onClick={() => setTab(v)}>{name}</button>
//           ))}
//         </div>

//         <div className="bar">
//           <div className="filters">
//             <label className="field">
//               <I.Calendar />
//               <input type="date" aria-label="Due date" value={draft.date}
//                      onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
//             </label>
//             <label className="field">
//               <select aria-label="Priority" value={draft.priority}
//                       onChange={(e) => setDraft({ ...draft, priority: e.target.value })}>
//                 <option value="">Choose Priority</option>
//                 <option value="HIGH">High</option>
//                 <option value="MEDIUM">Medium</option>
//                 <option value="LOW">Low</option>
//               </select>
//               <I.Chevron />
//             </label>
//             <button className="btn lilac" onClick={() => setFilters(draft)}>Filter</button>
//             {filtersActive && (
//               <button className="btn ghost" onClick={() => { setDraft(NO_FILTERS); setFilters(NO_FILTERS); }}>Clear</button>
//             )}
//           </div>
//           <button className="btn dark" onClick={() => setModal({ task: null })}>
//             <I.Plus /> Create New Task
//           </button>
//         </div>

//         {error && <div className="alert">{error}</div>}

//         <div className="table-wrap">
//           <table>
//             <thead>
//               <tr><th>Title</th><th>Priority</th><th>Status</th><th>Date Assigned</th><th>Due Date</th><th></th></tr>
//             </thead>
//             <tbody>
//               {shown.map((t) => (
//                 <TaskItem key={t.id} task={t} onToggle={toggle}
//                           onEdit={(task) => setModal({ task })} onDelete={remove} />
//               ))}
//             </tbody>
//           </table>
//           {!error && shown.length === 0 && <p className="empty">No tasks found. Create a new task to get started.</p>}
//         </div>

//         <div className="pager">
//           <span>Rows per page:</span>
//           <label className="field small">
//             <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
//               {[5, 10, 20, 50].map((n) => <option key={n}>{n}</option>)}
//             </select>
//             <I.Chevron />
//           </label>
//           <span>{from}-{to} of {visible.length}</span>
//           <button className="ico" disabled={page === 0} onClick={() => setPage(page - 1)} aria-label="Previous page"><I.Left /></button>
//           <button className="ico" disabled={page >= pages - 1} onClick={() => setPage(page + 1)} aria-label="Next page"><I.Right /></button>
//         </div>
//       </section>

//       {modal && <TaskForm editing={modal.task} onSave={save} onClose={() => setModal(null)} />}
//     </div>
//   );
// }


import { useEffect, useRef, useState } from "react";
import { api } from "./api";
import TaskForm from "./TaskForm.jsx";
import TaskItem from "./TaskItem.jsx";
import * as I from "./Icons.jsx";

const TABS = [["ALL", "All Tasks"], ["PENDING", "Pending"], ["COMPLETED", "Completed"], ["OVERDUE", "Overdue"]];
const SIDE_ICONS = { ALL: I.Home, PENDING: I.Clock, COMPLETED: I.CheckCircle, OVERDUE: I.Alert };
const NO_FILTERS = { date: "", priority: "" };

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

// Small animated person: the head bobs gently, the ring pulses.
// function Avatar() {
//   return (
//     <svg viewBox="0 0 40 40" className="avatar-svg" aria-hidden="true">
//       <circle cx="20" cy="20" r="20" fill="#dbeafe" />
//       <path d="M8 38c1-8 6-11 12-11s11 3 12 11z" fill="#2563eb" />
//       <g className="head">
//         <circle cx="20" cy="16" r="6" fill="#f2c9a5" />
//         <path d="M14 15c0-5 3-8 6-8s6 3 6 8c-2-3-4-4-6-4s-4 1-6 4z" fill="#1e293b" />
//       </g>
//     </svg>
//   );
// }
// Small animated person: the head bobs gently and the eyes blink.
function Avatar() {
  return (
    <svg viewBox="0 0 40 40" className="avatar-svg" aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#dbeafe" />
      <path d="M6 40c0-8.5 6.5-12.5 14-12.5S34 31.500 34 40z" fill="#2563eb" />
      <rect x="18" y="21" width="4" height="6" rx="2" fill="#e9b88f" />
      <g className="person-head">
        <circle cx="20" cy="16" r="6.5" fill="#f2c9a5" />
        <path d="M13.500 15.500C13.500 11 16.300 8 20 8s6.500 3 6.500 7.500c-1.600-2.400-3.800-3.600-6.500-3.600s-4.900 1.200-6.500 3.600z" fill="#1e293b" />
        <circle className="person-eye" cx="17.500" cy="17" r="0.900" fill="#1e293b" />
        <circle className="person-eye" cx="22.500" cy="17" r="0.900" fill="#1e293b" />
        <path d="M17.800 19.600q2.200 1.700 4.400 0" fill="none" stroke="#9a5b3a" strokeWidth="0.800" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [tab, setTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [draft, setDraft] = useState(NO_FILTERS);      // what the user is typing
  const [filters, setFilters] = useState(NO_FILTERS);  // applied with the Filter button
  const [modal, setModal] = useState(null);            // null | { task: Task | null }
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [error, setError] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  async function load() {
    try {
      setTasks(await api.list(tab, search));
      setError("");
    } catch {
      setError("Cannot reach the server. Make sure the backend is running on port 8080.");
    }
  }

  useEffect(() => {
    const t = setTimeout(load, 250); // debounce search typing
    return () => clearTimeout(t);
  }, [tab, search]);

  useEffect(() => setPage(0), [tab, search, filters, perPage]);

  // close the profile card when clicking anywhere else
  useEffect(() => {
    const close = (e) => profileRef.current && !profileRef.current.contains(e.target) && setProfileOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const visible = tasks.filter(
    (t) => (!filters.date || t.deadline === filters.date) &&
           (!filters.priority || t.priority === filters.priority)
  );
  const pages = Math.max(1, Math.ceil(visible.length / perPage));
  const shown = visible.slice(page * perPage, page * perPage + perPage);
  const from = visible.length ? page * perPage + 1 : 0;
  const to = Math.min(visible.length, (page + 1) * perPage);
  const tabName = TABS.find(([v]) => v === tab)[1];

  async function save(data) {
    if (modal.task) await api.update(modal.task.id, data);
    else await api.create(data);
    setModal(null);
    load();
  }
  async function toggle(task) {
    await api.setStatus(task.id, task.status === "COMPLETED" ? "PENDING" : "COMPLETED");
    load();
  }
  async function remove(task) {
    if (!window.confirm(`Delete "${task.title}"?`)) return;
    await api.remove(task.id);
    load();
  }

  const filtersActive = filters.date || filters.priority;

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="logo">T</div>

        <nav>
          {TABS.map(([value, name]) => {
            const Icon = SIDE_ICONS[value];
            return (
              <button key={value} data-tip={name} aria-label={name}
                      className={tab === value ? "active" : ""} onClick={() => setTab(value)}>
                <Icon />
              </button>
            );
          })}
        </nav>

        <div className="profile" ref={profileRef}>
          <button className="avatar" aria-label="Profile" onClick={() => setProfileOpen(!profileOpen)}>
            <Avatar />
          </button>
          {profileOpen && (
            <div className="popover" role="dialog" aria-label="Profile">
              <div className="pop-head">
                <span className="wave">👋</span>
                <div>
                  <strong>{greeting()}!</strong>
                  <small>Let's get things done today.</small>
                </div>
              </div>
              <p className="pop-line">Showing <b>{visible.length}</b> {tabName.toLowerCase()}</p>
              <button className="btn dark full"
                      onClick={() => { setProfileOpen(false); setModal({ task: null }); }}>
                <I.Plus /> New task
              </button>
            </div>
          )}
        </div>
      </aside>

      <section className="content">
        <div className="head">
          <h1>My Tasks</h1>
          <label className="searchbox">
            <I.Search />
            <input type="search" placeholder="Search tasks" value={search}
                   onChange={(e) => setSearch(e.target.value)} />
          </label>
        </div>

        <div className="tabs">
          {TABS.map(([v, name]) => (
            <button key={v} className={tab === v ? "active" : ""} onClick={() => setTab(v)}>{name}</button>
          ))}
        </div>

        <div className="bar">
          <div className="filters">
            <label className="field">
              <I.Calendar />
              <input type="date" aria-label="Due date" value={draft.date}
                     onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
            </label>
            <label className="field">
              <select aria-label="Priority" value={draft.priority}
                      onChange={(e) => setDraft({ ...draft, priority: e.target.value })}>
                <option value="">Choose Priority</option>
                <option value="HIGH">High</option>
                <option value="MEDIUM">Medium</option>
                <option value="LOW">Low</option>
              </select>
              <I.Chevron />
            </label>
            <button className="btn lilac" onClick={() => setFilters(draft)}>Filter</button>
            {filtersActive && (
              <button className="btn ghost" onClick={() => { setDraft(NO_FILTERS); setFilters(NO_FILTERS); }}>Clear</button>
            )}
          </div>
          <button className="btn dark" onClick={() => setModal({ task: null })}>
            <I.Plus /> Create New Task
          </button>
        </div>

        {error && <div className="alert">{error}</div>}

        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Title</th><th>Priority</th><th>Status</th><th>Date Assigned</th><th>Due Date</th><th></th></tr>
            </thead>
            <tbody>
              {shown.map((t) => (
                <TaskItem key={t.id} task={t} onToggle={toggle}
                          onEdit={(task) => setModal({ task })} onDelete={remove} />
              ))}
            </tbody>
          </table>
          {!error && shown.length === 0 && <p className="empty">No tasks found. Create a new task to get started.</p>}
        </div>

        <div className="pager">
          <span>Rows per page:</span>
          <label className="field small">
            <select value={perPage} onChange={(e) => setPerPage(Number(e.target.value))}>
              {[5, 10, 20, 50].map((n) => <option key={n}>{n}</option>)}
            </select>
            <I.Chevron />
          </label>
          <span>{from}-{to} of {visible.length}</span>
          <button className="ico" disabled={page === 0} onClick={() => setPage(page - 1)} aria-label="Previous page"><I.Left /></button>
          <button className="ico" disabled={page >= pages - 1} onClick={() => setPage(page + 1)} aria-label="Next page"><I.Right /></button>
        </div>
      </section>

      {modal && <TaskForm editing={modal.task} onSave={save} onClose={() => setModal(null)} />}
    </div>
  );
}