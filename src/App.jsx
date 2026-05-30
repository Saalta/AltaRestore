import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase Config ──────────────────────────────────────────────────────────
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// ─────────────────────────────────────────────────────────────────────────────

const T = {
  bg: "#F4F2EF",
  card: "#FFFFFF",
  surface: "#EDEBE7",
  border: "#E0DDD8",
  primary: "#1C1A17",
  secondary: "#5C574F",
  muted: "#9B9690",
  accent: "#D4570A",
  accentLight: "#FFF0E8",
  accentMid: "#F5956A",
};

const PRIORITY_COLORS = {
  high: { bg: "#FDECEA", text: "#A0270B", dot: "#D4570A" },
  medium: { bg: "#FEF6E4", text: "#7A5200", dot: "#E5A000" },
  low: { bg: "#E6F4EC", text: "#1B5E37", dot: "#2E9459" },
};

const STATUS_COLOR = {
  active: { bg: "#FFF0E8", text: "#A0370B" },
  "in-progress": { bg: "#F3F0FF", text: "#4C3BAA" },
  complete: { bg: "#E6F4EC", text: "#1B5E37" },
};

const CREW_STATUS = {
  "on-site": { bg: "#E6F4EC", text: "#1B5E37" },
  "en-route": { bg: "#FEF6E4", text: "#7A5200" },
  available: { bg: "#EDEBE7", text: "#5C574F" },
};

const NAV = [
  { id: "dashboard", icon: "ti-layout-dashboard", label: "Dashboard" },
  { id: "jobs", icon: "ti-briefcase", label: "Jobs" },
  { id: "fieldbook", icon: "ti-droplet", label: "Fieldbook" },
  { id: "crew", icon: "ti-users", label: "Crew" },
  { id: "docs", icon: "ti-file-text", label: "Docs" },
];

// ─── Login Screen ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) setError(authError.message);
    else if (data?.session) onLogin(data.session);
  };

  const inputStyle = {
    width: "100%", padding: "14px 16px", borderRadius: 12,
    border: `1.5px solid ${T.border}`, background: T.card,
    fontSize: 15, color: T.primary, outline: "none",
    fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
    boxSizing: "border-box",
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", minHeight: "100vh", background: T.bg, fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif", display: "flex", flexDirection: "column" }}>
      <div style={{ background: T.primary, paddingTop: 72, paddingBottom: 48, paddingLeft: 28, paddingRight: 28, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(212,87,10,0.18)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M3 14L9 4L15 14" stroke="#D4570A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.5 10.5H12.5" stroke="#D4570A" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>Alta<span style={{ color: T.accentMid }}>Restore</span></span>
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 6 }}>Welcome back</div>
        <div style={{ fontSize: 14, color: "#9B9690" }}>Sign in to your field operations account</div>
      </div>

      <div style={{ flex: 1, padding: "32px 24px 40px" }}>
        <form onSubmit={handleSignIn}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.secondary, marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@altarestore.com" required style={inputStyle} />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.secondary, marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required style={{ ...inputStyle, paddingRight: 50 }} />
              <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: T.muted }}>
                <i className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"}`} style={{ fontSize: 18 }} />
              </button>
            </div>
          </div>
          {error && (
            <div style={{ background: "#FDECEA", border: "1px solid #F5C4A8", borderRadius: 10, padding: "12px 14px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <i className="ti ti-alert-circle" style={{ fontSize: 17, color: T.accent }} />
              <span style={{ fontSize: 13, color: "#A0270B", fontWeight: 500 }}>{error}</span>
            </div>
          )}
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "15px", background: loading ? T.muted : T.primary, color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            {loading ? "Signing in..." : <><i className="ti ti-login" style={{ fontSize: 18 }} /> Sign In</>}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Add Job Form ─────────────────────────────────────────────────────────────
function AddJobForm({ onClose, onSave }) {
  const [form, setForm] = useState({
    client: "", type: "Water Damage", status: "active", priority: "medium",
    address: "", phase: "Assessment",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.client || !form.address) { setError("Client name and address are required."); return; }
    setSaving(true);
    const id = "J-" + Date.now().toString().slice(-4);
    const started = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const { error: err } = await supabase.from("jobs").insert([{ ...form, id, started, crew: [], drybook: null, moisture: null }]);
    setSaving(false);
    if (err) setError(err.message);
    else { onSave(); onClose(); }
  };

  const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.card, fontSize: 14, color: T.primary, outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: "border-box", marginBottom: 14 };
  const labelStyle = { display: "block", fontSize: 11, fontWeight: 700, color: T.secondary, marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: T.bg, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 1200, padding: "24px 20px 40px", maxHeight: "90vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: T.primary }}>New Job</div>
          <button onClick={onClose} style={{ background: T.surface, border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 13, color: T.secondary }}>Cancel</button>
        </div>

        <label style={labelStyle}>Client Name</label>
        <input style={inputStyle} value={form.client} onChange={e => set("client", e.target.value)} placeholder="e.g. John Smith" />

        <label style={labelStyle}>Address</label>
        <input style={inputStyle} value={form.address} onChange={e => set("address", e.target.value)} placeholder="e.g. 123 Main St" />

        <label style={labelStyle}>Job Type</label>
        <select style={{ ...inputStyle }} value={form.type} onChange={e => set("type", e.target.value)}>
          {["Water Damage", "Fire & Smoke", "Mold Remediation", "Storm Damage", "Other"].map(t => <option key={t}>{t}</option>)}
        </select>

        <label style={labelStyle}>Phase</label>
        <select style={{ ...inputStyle }} value={form.phase} onChange={e => set("phase", e.target.value)}>
          {["Assessment", "Demolition", "Drying", "Containment", "Rebuild", "Complete"].map(p => <option key={p}>{p}</option>)}
        </select>

        <label style={labelStyle}>Priority</label>
        <select style={{ ...inputStyle }} value={form.priority} onChange={e => set("priority", e.target.value)}>
          {["high", "medium", "low"].map(p => <option key={p}>{p}</option>)}
        </select>

        <label style={labelStyle}>Status</label>
        <select style={{ ...inputStyle }} value={form.status} onChange={e => set("status", e.target.value)}>
          {["active", "in-progress", "complete"].map(s => <option key={s}>{s}</option>)}
        </select>

        {error && <div style={{ color: "#A0270B", fontSize: 13, marginBottom: 14 }}>{error}</div>}

        <button onClick={handleSave} disabled={saving} style={{ width: "100%", padding: "14px", background: T.primary, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {saving ? "Saving..." : "Create Job"}
        </button>
      </div>
    </div>
  );
}

// ─── Add Crew Form ────────────────────────────────────────────────────────────
function AddCrewForm({ onClose, onSave }) {
  const [form, setForm] = useState({ initials: "", name: "", role: "Technician", status: "available", jobs: 0 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = async () => {
    if (!form.name || !form.initials) { setError("Name and initials are required."); return; }
    setSaving(true);
    const { error: err } = await supabase.from("crew").insert([form]);
    setSaving(false);
    if (err) setError(err.message);
    else { onSave(); onClose(); }
  };

  const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: T.card, fontSize: 14, color: T.primary, outline: "none", fontFamily: "'Plus Jakarta Sans', sans-serif", boxSizing: "border-box", marginBottom: 14 };
  const labelStyle = { display: "block", fontSize: 11, fontWeight: 700, color: T.secondary, marginBottom: 6, letterSpacing: "0.04em", textTransform: "uppercase" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 100, display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
      <div style={{ background: T.bg, borderRadius: "20px 20px 0 0", width: "100%", maxWidth: 1200, padding: "24px 20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: T.primary }}>Add Crew Member</div>
          <button onClick={onClose} style={{ background: T.surface, border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 13, color: T.secondary }}>Cancel</button>
        </div>

        <label style={labelStyle}>Full Name</label>
        <input style={inputStyle} value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Tyler R." />

        <label style={labelStyle}>Initials</label>
        <input style={inputStyle} value={form.initials} onChange={e => set("initials", e.target.value.toUpperCase().slice(0, 2))} placeholder="e.g. TR" maxLength={2} />

        <label style={labelStyle}>Role</label>
        <select style={{ ...inputStyle }} value={form.role} onChange={e => set("role", e.target.value)}>
          {["Lead Tech", "Technician", "Estimator", "Project Manager"].map(r => <option key={r}>{r}</option>)}
        </select>

        <label style={labelStyle}>Status</label>
        <select style={{ ...inputStyle }} value={form.status} onChange={e => set("status", e.target.value)}>
          {["available", "on-site", "en-route"].map(s => <option key={s}>{s}</option>)}
        </select>

        {error && <div style={{ color: "#A0270B", fontSize: 13, marginBottom: 14 }}>{error}</div>}

        <button onClick={handleSave} disabled={saving} style={{ width: "100%", padding: "14px", background: T.primary, color: "#fff", border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {saving ? "Saving..." : "Add Member"}
        </button>
      </div>
    </div>
  );
}

// ─── Shared Components ────────────────────────────────────────────────────────
function LogoBar({ user, onSignOut }) {
  const initials = user?.email ? user.email.slice(0, 2).toUpperCase() : "AD";
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 16px 14px", borderBottom: `1px solid ${T.border}`, background: T.card }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{ width: 32, height: 32, borderRadius: 9, background: T.primary, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 14L9 4L15 14" stroke="#D4570A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.5 10.5H12.5" stroke="#D4570A" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontSize: 17, fontWeight: 800, color: T.primary, letterSpacing: "-0.02em" }}>Alta<span style={{ color: T.accent }}>Restore</span></span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 34, height: 34, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff" }}>{initials}</div>
        {onSignOut && (
          <button onClick={onSignOut} style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 12, color: T.secondary, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
            <i className="ti ti-logout" style={{ fontSize: 14 }} /> Out
          </button>
        )}
      </div>
    </div>
  );
}

function Avatar({ initials, size = 32, color = "#1C1A17" }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.36, fontWeight: 700, flexShrink: 0 }}>{initials}</div>
  );
}

function Badge({ text, bg, color }) {
  return <span style={{ background: bg, color, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, letterSpacing: "0.05em", textTransform: "uppercase" }}>{text}</span>;
}

function JobCard({ job, onClick }) {
  const p = PRIORITY_COLORS[job.priority] || PRIORITY_COLORS.medium;
  const s = STATUS_COLOR[job.status] || STATUS_COLOR.active;
  return (
    <div onClick={() => onClick(job)} style={{ background: T.card, borderRadius: 14, padding: "14px 16px", border: `1px solid ${T.border}`, marginBottom: 10, cursor: "pointer" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 2 }}>{job.client}</div>
          <div style={{ fontSize: 12, color: T.muted }}>{job.id} · {job.address}</div>
        </div>
        <Badge text={job.status.replace("-", " ")} bg={s.bg} color={s.text} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: T.accent, background: T.accentLight, padding: "2px 10px", borderRadius: 20, fontWeight: 600 }}>{job.type}</span>
        <span style={{ fontSize: 12, color: T.muted }}>Phase: <strong style={{ color: T.secondary }}>{job.phase}</strong></span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: T.muted }}>Started {job.started}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.dot }} />
          <span style={{ fontSize: 11, color: p.text, fontWeight: 700, textTransform: "uppercase" }}>{job.priority}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ jobs, onJobClick, user, onSignOut, onAddJob }) {
  const active = jobs.filter(j => j.status === "active").length;
  const complete = jobs.filter(j => j.status === "complete").length;

  return (
    <div>
      <LogoBar user={user} onSignOut={onSignOut} />
      <div style={{ padding: "18px 16px 0" }}>
        <div style={{ fontSize: 12, color: T.muted, marginBottom: 2, letterSpacing: "0.04em", textTransform: "uppercase" }}>Good morning</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: T.primary }}>{user?.email?.split("@")[0] ?? "there"} 👋</div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ background: "#1C1A17", borderRadius: 20, padding: "20px", color: "#fff", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 130, height: 130, borderRadius: "50%", background: "rgba(212,87,10,0.15)" }} />
          <div style={{ fontSize: 11, color: "#9B9690", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>Active Jobs Overview</div>
          <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 14 }}>{active} Active</div>
          <div style={{ display: "flex", gap: 16 }}>
            {[{ val: active, label: "Active" }, { val: jobs.length, label: "Total" }, { val: complete, label: "Completed" }].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: i > 0 ? 16 : 0 }}>
                {i > 0 && <div style={{ width: 1, height: 28, background: "#3A3830" }} />}
                <div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: i === 0 ? T.accentMid : "#fff" }}>{item.val}</div>
                  <div style={{ fontSize: 11, color: "#9B9690" }}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.primary }}>Active Jobs</div>
          <button onClick={onAddJob} style={{ fontSize: 13, color: "#fff", background: T.accent, border: "none", fontWeight: 700, cursor: "pointer", padding: "6px 14px", borderRadius: 20 }}>
            + New Job
          </button>
        </div>
        {jobs.filter(j => j.status !== "complete").length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: T.muted }}>
            <i className="ti ti-briefcase" style={{ fontSize: 40, marginBottom: 12, display: "block" }} />
            <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 6 }}>No active jobs yet</div>
            <div style={{ fontSize: 13 }}>Tap "New Job" to add your first job</div>
          </div>
        ) : (
          jobs.filter(j => j.status !== "complete").map(job => <JobCard key={job.id} job={job} onClick={onJobClick} />)
        )}
      </div>
    </div>
  );
}

// ─── Job Detail ───────────────────────────────────────────────────────────────
function JobDetail({ job, onBack }) {
  const [tab, setTab] = useState("overview");
  const p = PRIORITY_COLORS[job.priority] || PRIORITY_COLORS.medium;
  const tabs = ["overview", "drybook", "docs", "photos"];

  return (
    <div>
      <div style={{ background: "#1C1A17", padding: "52px 16px 20px", color: "#fff" }}>
        <button onClick={onBack} style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: 10, padding: "6px 14px", fontSize: 13, cursor: "pointer", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
          <i className="ti ti-arrow-left" style={{ fontSize: 15 }} /> Back
        </button>
        <div style={{ fontSize: 11, color: "#9B9690", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{job.id} · {job.type}</div>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{job.client}</div>
        <div style={{ fontSize: 13, color: "#9B9690" }}><i className="ti ti-map-pin" style={{ fontSize: 14 }} /> {job.address}</div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <span style={{ background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>{job.phase}</span>
          <span style={{ background: p.bg, color: p.text, fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 700, textTransform: "uppercase" }}>{job.priority} priority</span>
        </div>
      </div>

      <div style={{ display: "flex", padding: "0 16px", background: T.card, borderBottom: `1px solid ${T.border}` }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "12px 0", background: "none", border: "none", fontSize: 12, fontWeight: tab === t ? 700 : 500, color: tab === t ? T.accent : T.muted, borderBottom: tab === t ? `2px solid ${T.accent}` : "2px solid transparent", cursor: "pointer", textTransform: "capitalize" }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "16px" }}>
        {tab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Start Date", val: job.started, icon: "ti-calendar" },
                { label: "Phase", val: job.phase, icon: "ti-progress" },
                { label: "Status", val: job.status, icon: "ti-flag" },
                { label: "Priority", val: job.priority, icon: "ti-alert-triangle" },
              ].map(item => (
                <div key={item.label} style={{ background: T.surface, borderRadius: 12, padding: "12px 14px" }}>
                  <i className={`ti ${item.icon}`} style={{ fontSize: 16, color: T.accent, marginBottom: 4, display: "block" }} />
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.primary, textTransform: "capitalize" }}>{item.val}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{item.label}</div>
                </div>
              ))}
            </div>
            {job.moisture && (
              <div style={{ background: T.accentLight, borderRadius: 14, padding: "14px", marginBottom: 14, border: `1px solid #F5C4A8` }}>
                <div style={{ fontSize: 13, color: T.accent, fontWeight: 700, marginBottom: 8 }}><i className="ti ti-droplet" style={{ marginRight: 6 }} />Moisture Reading</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: job.moisture > 15 ? "#FDECEA" : "#E6F4EC", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, color: job.moisture > 15 ? "#A0270B" : "#1B5E37", border: `2px solid ${job.moisture > 15 ? "#D4570A" : "#2E9459"}` }}>{job.moisture}%</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: job.moisture > 15 ? "#A0270B" : "#1B5E37" }}>{job.moisture > 15 ? "Still Drying" : "Near Target"}</div>
                    <div style={{ fontSize: 12, color: T.muted }}>Target: ≤12%</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        {tab === "drybook" && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: T.muted }}>
            <i className="ti ti-droplet" style={{ fontSize: 40, marginBottom: 12, display: "block" }} />
            <div style={{ fontSize: 15, fontWeight: 600 }}>No drybook data yet</div>
          </div>
        )}
        {tab === "docs" && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: T.muted }}>
            <i className="ti ti-file-text" style={{ fontSize: 40, marginBottom: 12, display: "block" }} />
            <div style={{ fontSize: 15, fontWeight: 600 }}>No documents yet</div>
          </div>
        )}
        {tab === "photos" && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: T.muted }}>
            <i className="ti ti-camera" style={{ fontSize: 40, marginBottom: 12, display: "block" }} />
            <div style={{ fontSize: 15, fontWeight: 600 }}>No photos yet</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Jobs Screen ──────────────────────────────────────────────────────────────
function JobsScreen({ jobs, onJobClick, user, onSignOut, onAddJob }) {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "active", "in-progress", "complete"];
  const filtered = filter === "all" ? jobs : jobs.filter(j => j.status === filter);

  return (
    <div>
      <LogoBar user={user} onSignOut={onSignOut} />
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.primary }}>All Jobs</div>
          <button onClick={onAddJob} style={{ fontSize: 13, color: "#fff", background: T.accent, border: "none", fontWeight: 700, cursor: "pointer", padding: "6px 14px", borderRadius: 20 }}>+ New Job</button>
        </div>
        <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, background: filter === f ? T.primary : T.surface, color: filter === f ? "#fff" : T.muted, border: "none", borderRadius: 20, padding: "6px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{f}</button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: T.muted }}>
            <i className="ti ti-briefcase" style={{ fontSize: 40, marginBottom: 12, display: "block" }} />
            <div style={{ fontSize: 15, fontWeight: 600 }}>No jobs here yet</div>
          </div>
        ) : filtered.map(job => <JobCard key={job.id} job={job} onClick={onJobClick} />)}
      </div>
    </div>
  );
}

// ─── Crew Screen ──────────────────────────────────────────────────────────────
function CrewScreen({ crew, user, onSignOut, onAddCrew }) {
  return (
    <div>
      <LogoBar user={user} onSignOut={onSignOut} />
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.primary }}>Field Crew</div>
          <button onClick={onAddCrew} style={{ fontSize: 13, color: "#fff", background: T.accent, border: "none", fontWeight: 700, cursor: "pointer", padding: "6px 14px", borderRadius: 20 }}>+ Add Member</button>
        </div>
        {crew.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 20px", color: T.muted }}>
            <i className="ti ti-users" style={{ fontSize: 40, marginBottom: 12, display: "block" }} />
            <div style={{ fontSize: 15, fontWeight: 600 }}>No crew members yet</div>
            <div style={{ fontSize: 13, marginTop: 6 }}>Tap "+ Add Member" to get started</div>
          </div>
        ) : crew.map(member => (
          <div key={member.initials} style={{ background: T.card, borderRadius: 16, border: `1px solid ${T.border}`, padding: "16px", marginBottom: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <Avatar initials={member.initials} size={46} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: T.primary }}>{member.name}</div>
                <div style={{ fontSize: 12, color: T.muted }}>{member.role}</div>
              </div>
              <Badge text={member.status} bg={CREW_STATUS[member.status]?.bg || T.surface} color={CREW_STATUS[member.status]?.text || T.muted} />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{ flex: 2, background: T.accentLight, color: T.accent, border: "none", borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <i className="ti ti-message" style={{ fontSize: 15 }} /> Message
              </button>
              <button style={{ flex: 2, background: T.primary, color: "#fff", border: "none", borderRadius: 10, padding: "10px", fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <i className="ti ti-phone" style={{ fontSize: 15 }} /> Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Docs Screen ──────────────────────────────────────────────────────────────
function DocsScreen({ user, onSignOut }) {
  return (
    <div>
      <LogoBar user={user} onSignOut={onSignOut} />
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: T.primary, marginBottom: 16 }}>Field Documents</div>
        <div style={{ textAlign: "center", padding: "40px 20px", color: T.muted }}>
          <i className="ti ti-file-text" style={{ fontSize: 40, marginBottom: 12, display: "block" }} />
          <div style={{ fontSize: 15, fontWeight: 600 }}>No documents yet</div>
        </div>
      </div>
    </div>
  );
}

// ─── Root App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [screen, setScreen] = useState("dashboard");
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [crew, setCrew] = useState([]);
  const [showAddJob, setShowAddJob] = useState(false);
  const [showAddCrew, setShowAddCrew] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => subscription.unsubscribe();
  }, []);

  const loadJobs = async () => {
    const { data } = await supabase.from("jobs").select("*").order("id", { ascending: false });
    if (data) setJobs(data);
  };

  const loadCrew = async () => {
    const { data } = await supabase.from("crew").select("*");
    if (data) setCrew(data);
  };

  useEffect(() => {
    if (session) { loadJobs(); loadCrew(); }
  }, [session]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setScreen("dashboard");
    setSelectedJob(null);
  };

  const shell = { maxWidth: 1200, margin: "0 auto", background: T.bg, minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif", paddingBottom: 80 };

  const fonts = (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.34.0/dist/tabler-icons.min.css" rel="stylesheet" />
    </>
  );

  if (authLoading) return (
    <div style={{ ...shell, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {fonts}
      <div style={{ textAlign: "center", color: T.muted, fontSize: 13 }}>Loading AltaRestore…</div>
    </div>
  );

  if (!session) return <>{fonts}<LoginScreen onLogin={setSession} /></>;

  const user = session.user;

  if (selectedJob) return (
    <div style={shell}>
      {fonts}
      <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />
    </div>
  );

  return (
    <div style={shell}>
      {fonts}
      {showAddJob && <AddJobForm onClose={() => setShowAddJob(false)} onSave={loadJobs} />}
      {showAddCrew && <AddCrewForm onClose={() => setShowAddCrew(false)} onSave={loadCrew} />}

      <div style={{ overflowY: "auto" }}>
        {screen === "dashboard" && <Dashboard jobs={jobs} onJobClick={setSelectedJob} user={user} onSignOut={handleSignOut} onAddJob={() => setShowAddJob(true)} />}
        {screen === "jobs" && <JobsScreen jobs={jobs} onJobClick={setSelectedJob} user={user} onSignOut={handleSignOut} onAddJob={() => setShowAddJob(true)} />}
        {screen === "fieldbook" && (
          <div>
            <LogoBar user={user} onSignOut={handleSignOut} />
            <div style={{ padding: "16px 16px 0" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.primary, marginBottom: 16 }}>Fieldbook</div>
              {jobs.filter(j => j.moisture).length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 20px", color: T.muted }}>
                  <i className="ti ti-droplet" style={{ fontSize: 40, marginBottom: 12, display: "block" }} />
                  <div style={{ fontSize: 15, fontWeight: 600 }}>No moisture readings yet</div>
                </div>
              ) : jobs.filter(j => j.moisture).map(job => (
                <div key={job.id} onClick={() => setSelectedJob(job)} style={{ background: T.card, borderRadius: 16, border: `1px solid ${T.border}`, padding: "14px 16px", marginBottom: 10, cursor: "pointer" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.primary }}>{job.client}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: job.moisture > 15 ? "#A0270B" : "#1B5E37" }}>{job.moisture}%</div>
                  </div>
                  <div style={{ background: T.surface, borderRadius: 8, height: 8, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 8, background: job.moisture > 15 ? T.accent : "#2E9459", width: `${Math.min(100, (job.moisture / 30) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {screen === "crew" && <CrewScreen crew={crew} user={user} onSignOut={handleSignOut} onAddCrew={() => setShowAddCrew(true)} />}
        {screen === "docs" && <DocsScreen user={user} onSignOut={handleSignOut} />}
      </div>

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 1200, background: T.card, borderTop: `1px solid ${T.border}`, display: "flex", padding: "8px 0 12px" }}>
        {NAV.map(item => (
          <button key={item.id} onClick={() => setScreen(item.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, background: "none", border: "none", cursor: "pointer", padding: "4px 0" }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: screen === item.id ? T.primary : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <i className={`ti ${item.icon}`} style={{ fontSize: 18, color: screen === item.id ? "#fff" : T.muted }} />
            </div>
            <span style={{ fontSize: 10, fontWeight: screen === item.id ? 700 : 500, color: screen === item.id ? T.primary : T.muted }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
