// Tiny inline icon set (stroke icons, inherit colour from CSS).
const base = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
const make = (d) => (props) => <svg {...base} {...props}>{d}</svg>;

export const Home = make(<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />);
export const Chart = make(<><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 17v-5M12 17V8M16 17v-3" /></>);
export const Pie = make(<><path d="M21 12A9 9 0 1 1 12 3v9z" /><path d="M15 3.5A9 9 0 0 1 20.5 9H15z" /></>);
export const Moon = make(<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />);
export const Gear = make(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>);
export const Search = make(<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>);
export const Plus = make(<path d="M12 5v14M5 12h14" />);
export const Edit = make(<path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />);
export const Trash = make(<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14M10 11v5M14 11v5" />);
export const Check = make(<path d="M5 12.5l4.5 4.5L19 7.5" />);
export const Undo = make(<path d="M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3" />);
export const Chevron = make(<path d="M6 9l6 6 6-6" />);
export const Left = make(<path d="M15 6l-6 6 6 6" />);
export const Right = make(<path d="M9 6l6 6-6 6" />);
export const Calendar = make(<><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M16 3v4M8 3v4M3 10h18" /></>);
export const Clock = make(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>);
export const CheckCircle = make(<><circle cx="12" cy="12" r="9" /><path d="M8 12.5l3 3 5-6" /></>);
export const Alert = make(<><path d="M12 3l10 18H2z" /><path d="M12 10v4M12 17.5v.01" /></>);
