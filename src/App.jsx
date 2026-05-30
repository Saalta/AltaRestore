import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const T = {
  bg: "#F0EEE9",
  card: "#FFFFFF",
  surface: "#E8E5E0",
  border: "#DDD9D3",
  sidebar: "#1C1A17",
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

const CREW_STATUS_COLOR = {
  "on-site": { bg: "#E6F4EC", text: "#1B5E37" },
  "en-route": { bg: "#FEF6E4", text: "#7A5200" },
  available: { bg: "#EDEBE7", text: "#5C574F" },
};

const NAV_ITEMS = [
  { id: "dashboard", icon: "ti-layout-dashboard", label: "Dashboard" },
  { id: "jobs", icon: "ti-briefcase", label: "Jobs" },
  { id: "fieldbook", icon: "ti-droplet", label: "Fieldbook" },
  { id: "crew", icon: "ti-users", label: "Crew" },
  { id: "docs", icon: "ti-file-text", label: "Documents" },
];

// ─── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPw, setShowPw] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null);
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) setError(err.message);
    else if (data?.session) onLogin(data.session);
  };

  return (
    <div style={{ minHeight: "100vh", background: T.sidebar, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}>
      <div style={{ display: "flex", width: 900, borderRadius: 24, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,0,0,0.4)" }}>
        {/* Left panel */}
        <div style={{ flex: 1, background: T.accent, padding: "60px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 60 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(0,0,0,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <path d="M3 14L9 4L15 14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.5 10.5H12.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>AltaRestore</span>
            </div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 16 }}>Field Operations<br />Management</div>
            <div style={{ fontSize: 15, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>Track jobs, crew, moisture readings, and documents — all in one place.</div>
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>© 2025 AltaRestore. All rights reserved.</div>
        </div>

        {/* Right panel */}
        <div style={{ width: 420, background: T.card, padding: "60px 48px" }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: T.primary, marginBottom: 8 }}>Sign in</div>
          <div style={{ fontSize: 14, color: T.muted, marginBottom: 36 }}>Enter your credentials to access your account</div>
          <form onSubmit={handleSignIn}>
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.secondary, marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required
                style={{ width: "100%", padding: "13px 16px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: "#FAFAF9", fontSize: 14, color: T.primary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
            <div style={{ marginBottom: 28 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.secondary, marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  style={{ width: "100%", padding: "13px 46px 13px 16px", borderRadius: 10, border: `1.5px solid ${T.border}`, background: "#FAFAF9", fontSize: 14, color: T.primary, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }} />
                <button type="button" onClick={() => setShowPw(v => !v)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: T.muted }}>
                  <i className={`ti ${showPw ? "ti-eye-off" : "ti-eye"}`} style={{ fontSize: 17 }} />
                </button>
              </div>
            </div>
            {error && <div style={{ background: "#FDECEA", borderRadius: 8, padding: "10px 14px", marginBottom: 18, fontSize: 13, color: "#A0270B" }}>{error}</div>}
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "14px", background: T.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              {loading ? "Signing in…" : "Sign In →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({ screen, setScreen, user, onSignOut }) {
  return (
    <div style={{ width: 240, background: T.sidebar, minHeight: "100vh", display: "flex", flexDirection: "column", flexShrink: 0, position: "fixed", top: 0, left: 0, bottom: 0 }}>
      {/* Logo */}
      <div style={{ padding: "28px 24px 24px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: T.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 14L9 4L15 14" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.5 10.5H12.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>AltaRestore</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "16px 12px" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8, paddingLeft: 12 }}>Navigation</div>
        {NAV_ITEMS.map(item => {
          const active = screen === item.id;
          return (
            <button key={item.id} onClick={() => setScreen(item.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: active ? "rgba(255,255,255,0.1)" : "transparent", border: "none", cursor: "pointer", marginBottom: 2, textAlign: "left" }}>
              <i className={`ti ${item.icon}`} style={{ fontSize: 17, color: active ? "#fff" : "rgba(255,255,255,0.45)", flexShrink: 0 }} />
              <span style={{ fontSize: 14, fontWeight: active ? 700 : 500, color: active ? "#fff" : "rgba(255,255,255,0.45)" }}>{item.label}</span>
              {active && <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: T.accent }} />}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding: "16px 12px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px" }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: T.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
            {user?.email?.slice(0, 2).toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user?.email?.split("@")[0]}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Field Manager</div>
          </div>
          <button onClick={onSignOut} title="Sign out" style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", padding: 4 }}>
            <i className="ti ti-logout" style={{ fontSize: 16 }} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page Header ──────────────────────────────────────────────────────────────
function PageHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
      <div>
        <div style={{ fontSize: 24, fontWeight: 800, color: T.primary, letterSpacing: "-0.02em" }}>{title}</div>
        {subtitle && <div style={{ fontSize: 14, color: T.muted, marginTop: 4 }}>{subtitle}</div>}
      </div>
      {action}
    </div>
  );
}

function AddBtn({ label, onClick }) {
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 8, background: T.primary, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
      <i className="ti ti-plus" style={{ fontSize: 16 }} /> {label}
    </button>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, icon, accent, sub }) {
  return (
    <div style={{ background: T.card, borderRadius: 14, padding: "20px 24px", border: `1px solid ${T.border}`, flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.muted }}>{label}</div>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: accent + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <i className={`ti ${icon}`} style={{ fontSize: 18, color: accent }} />
        </div>
      </div>
      <div style={{ fontSize: 32, fontWeight: 800, color: T.primary, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: T.muted, marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ text, bg, color }) {
  return <span style={{ background: bg, color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, letterSpacing: "0.04em", textTransform: "capitalize", whiteSpace: "nowrap" }}>{text}</span>;
}

// ─── Job Card ─────────────────────────────────────────────────────────────────
function JobCard({ job, onClick }) {
  const p = PRIORITY_COLORS[job.priority] || PRIORITY_COLORS.medium;
  const s = STATUS_COLOR[job.status] || STATUS_COLOR.active;
  return (
    <div onClick={() => onClick(job)} style={{ background: T.card, borderRadius: 14, padding: "20px", border: `1px solid ${T.border}`, cursor: "pointer", transition: "box-shadow 0.15s", display: "flex", flexDirection: "column", gap: 14 }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"}
      onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 4 }}>{job.client}</div>
          <div style={{ fontSize: 12, color: T.muted }}>{job.id}</div>
        </div>
        <Badge text={job.status.replace("-", " ")} bg={s.bg} color={s.text} />
      </div>
      <div style={{ fontSize: 13, color: T.secondary, display: "flex", alignItems: "center", gap: 6 }}>
        <i className="ti ti-map-pin" style={{ fontSize: 13, color: T.muted }} />{job.address}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: T.accent, background: T.accentLight, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>{job.type}</span>
        <span style={{ fontSize: 12, color: T.secondary }}>Phase: <strong>{job.phase}</strong></span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
        <span style={{ fontSize: 12, color: T.muted }}>Started {job.started}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.dot }} />
          <span style={{ fontSize: 11, color: p.text, fontWeight: 700, textTransform: "uppercase" }}>{job.priority}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function Dashboard({ jobs, onJobClick, onAddJob }) {
  const active = jobs.filter(j => j.status === "active").length;
  const inProgress = jobs.filter(j => j.status === "in-progress").length;
  const complete = jobs.filter(j => j.status === "complete").length;
  const activeJobs = jobs.filter(j => j.status !== "complete");

  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Overview of your active restoration jobs" action={<AddBtn label="New Job" onClick={onAddJob} />} />

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32 }}>
        <StatCard label="Active Jobs" value={active} icon="ti-flame" accent="#D4570A" sub={`${inProgress} in progress`} />
        <StatCard label="Total Jobs" value={jobs.length} icon="ti-briefcase" accent="#4C3BAA" sub="All time" />
        <StatCard label="Completed" value={complete} icon="ti-circle-check" accent="#2E9459" sub="Finished jobs" />
        <StatCard label="Crew Members" value="—" icon="ti-users" accent="#E5A000" sub="Go to Crew tab" />
      </div>

      {/* Active jobs grid */}
      <div style={{ fontSize: 16, fontWeight: 700, color: T.primary, marginBottom: 16 }}>Active Jobs</div>
      {activeJobs.length === 0 ? (
        <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: "60px 20px", textAlign: "center", color: T.muted }}>
          <i className="ti ti-briefcase" style={{ fontSize: 48, marginBottom: 16, display: "block" }} />
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No active jobs yet</div>
          <div style={{ fontSize: 14 }}>Click "New Job" to create your first job</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {activeJobs.map(job => <JobCard key={job.id} job={job} onClick={onJobClick} />)}
        </div>
      )}
    </div>
  );
}

// ─── Job Detail ───────────────────────────────────────────────────────────────
function JobDetail({ job, onBack }) {
  const [tab, setTab] = useState("overview");
  const [photos, setPhotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const p = PRIORITY_COLORS[job.priority] || PRIORITY_COLORS.medium;
  const s = STATUS_COLOR[job.status] || STATUS_COLOR.active;

  const loadPhotos = async () => {
    const { data } = await supabase.storage.from("job-photos").list(job.id);
    if (data) {
      const urls = data.map(f => ({
        name: f.name,
        url: supabase.storage.from("job-photos").getPublicUrl(`${job.id}/${f.name}`).data.publicUrl,
      }));
      setPhotos(urls);
    }
  };

  useEffect(() => { if (tab === "photos") loadPhotos(); }, [tab]);

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    for (const file of files) {
      const path = `${job.id}/${Date.now()}-${file.name}`;
      await supabase.storage.from("job-photos").upload(path, file);
    }
    await loadPhotos();
    setUploading(false);
  };

  const handlePrint = () => {
    const win = window.open("", "_blank");
    win.document.write(`
      <html><head><title>Job Report — ${job.client}</title>
      <style>
        body { font-family: 'Segoe UI', sans-serif; padding: 48px; color: #1C1A17; max-width: 800px; margin: 0 auto; }
        h1 { font-size: 28px; font-weight: 800; margin-bottom: 4px; }
        .meta { color: #9B9690; font-size: 13px; margin-bottom: 32px; }
        .section { margin-bottom: 28px; }
        .section-title { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #9B9690; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #E0DDD8; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .field { background: #F4F2EF; border-radius: 8px; padding: 14px 16px; }
        .field-label { font-size: 11px; color: #9B9690; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px; }
        .field-val { font-size: 16px; font-weight: 700; text-transform: capitalize; }
        .badge { display: inline-block; padding: 3px 12px; border-radius: 20px; font-size: 12px; font-weight: 700; text-transform: capitalize; }
        .header-row { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
        .logo { font-size: 18px; font-weight: 800; color: #D4570A; }
        .divider { border: none; border-top: 2px solid #1C1A17; margin: 0 0 28px; }
        @media print { body { padding: 24px; } }
      </style></head><body>
      <div class="header-row">
        <div class="logo">AltaRestore</div>
        <div style="font-size:12px;color:#9B9690;">Generated ${new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</div>
      </div>
      <hr class="divider"/>
      <div class="section">
        <div class="section-title">Job Information</div>
        <h1>${job.client}</h1>
        <div class="meta">${job.id} &nbsp;·&nbsp; ${job.type} &nbsp;·&nbsp; ${job.address}</div>
        <div class="grid">
          <div class="field"><div class="field-label">Status</div><div class="field-val">${job.status.replace("-", " ")}</div></div>
          <div class="field"><div class="field-label">Priority</div><div class="field-val">${job.priority}</div></div>
          <div class="field"><div class="field-label">Phase</div><div class="field-val">${job.phase}</div></div>
          <div class="field"><div class="field-label">Start Date</div><div class="field-val">${job.started}</div></div>
        </div>
      </div>
      ${job.moisture ? `
      <div class="section">
        <div class="section-title">Moisture Reading</div>
        <div class="field"><div class="field-label">Current Reading</div><div class="field-val">${job.moisture}% &nbsp;(Target: ≤12%)</div></div>
      </div>` : ""}
      <div class="section">
        <div class="section-title">Notes</div>
        <div style="border:1px solid #E0DDD8;border-radius:8px;padding:20px 16px;min-height:80px;color:#9B9690;font-size:14px;">No notes recorded.</div>
      </div>
      <div style="margin-top:60px;padding-top:20px;border-top:1px solid #E0DDD8;display:flex;justify-content:space-between;font-size:12px;color:#9B9690;">
        <div>AltaRestore Field Report</div><div>${job.id}</div>
      </div>
      </body></html>
    `);
    win.document.close();
    win.print();
  };

  return (
    <div>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", color: T.muted, fontSize: 14, fontWeight: 600, marginBottom: 24, padding: 0 }}>
        <i className="ti ti-arrow-left" style={{ fontSize: 16 }} /> Back to Jobs
      </button>

      {/* Header */}
      <div style={{ background: T.card, borderRadius: 16, padding: "28px 32px", border: `1px solid ${T.border}`, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 11, color: T.muted, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 8 }}>{job.id} · {job.type}</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: T.primary, marginBottom: 8 }}>{job.client}</div>
          <div style={{ fontSize: 14, color: T.secondary, display: "flex", alignItems: "center", gap: 6 }}>
            <i className="ti ti-map-pin" style={{ fontSize: 15, color: T.muted }} />{job.address}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <Badge text={job.status.replace("-", " ")} bg={s.bg} color={s.text} />
            <Badge text={`${job.priority} priority`} bg={p.bg} color={p.text} />
          </div>
          <button onClick={handlePrint} style={{ display: "flex", alignItems: "center", gap: 8, background: T.surface, border: `1px solid ${T.border}`, borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 700, color: T.primary, cursor: "pointer" }}>
            <i className="ti ti-printer" style={{ fontSize: 15 }} /> Print Report
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: T.surface, borderRadius: 10, padding: 4, marginBottom: 24, width: "fit-content" }}>
        {["overview", "drybook", "docs", "photos"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 18px", borderRadius: 8, background: tab === t ? T.card : "transparent", border: "none", cursor: "pointer", fontSize: 13, fontWeight: tab === t ? 700 : 500, color: tab === t ? T.primary : T.muted, boxShadow: tab === t ? "0 1px 4px rgba(0,0,0,0.08)" : "none", textTransform: "capitalize" }}>{t}</button>
        ))}
      </div>

      {tab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 16 }}>
          {[
            { label: "Start Date", val: job.started, icon: "ti-calendar" },
            { label: "Phase", val: job.phase, icon: "ti-progress" },
            { label: "Status", val: job.status, icon: "ti-flag" },
            { label: "Priority", val: job.priority, icon: "ti-alert-triangle" },
          ].map(item => (
            <div key={item.label} style={{ background: T.card, borderRadius: 12, padding: "20px", border: `1px solid ${T.border}` }}>
              <i className={`ti ${item.icon}`} style={{ fontSize: 20, color: T.accent, marginBottom: 10, display: "block" }} />
              <div style={{ fontSize: 18, fontWeight: 700, color: T.primary, textTransform: "capitalize" }}>{item.val}</div>
              <div style={{ fontSize: 12, color: T.muted, marginTop: 4 }}>{item.label}</div>
            </div>
          ))}
        </div>
      )}

      {(tab === "drybook" || tab === "docs") && (
        <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: "60px 20px", textAlign: "center", color: T.muted }}>
          <i className={`ti ${tab === "drybook" ? "ti-droplet" : "ti-file-text"}`} style={{ fontSize: 48, marginBottom: 16, display: "block" }} />
          <div style={{ fontSize: 16, fontWeight: 600 }}>No {tab} data yet</div>
        </div>
      )}

      {tab === "photos" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.primary }}>{photos.length} photo{photos.length !== 1 ? "s" : ""}</div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, background: T.primary, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              <i className="ti ti-camera-plus" style={{ fontSize: 16 }} />
              {uploading ? "Uploading…" : "Upload Photos"}
              <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} style={{ display: "none" }} />
            </label>
          </div>
          {photos.length === 0 ? (
            <div style={{ background: T.card, borderRadius: 14, border: `2px dashed ${T.border}`, padding: "60px 20px", textAlign: "center", color: T.muted }}>
              <i className="ti ti-camera" style={{ fontSize: 48, marginBottom: 16, display: "block" }} />
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>No photos yet</div>
              <div style={{ fontSize: 13 }}>Click "Upload Photos" to add images</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              {photos.map(photo => (
                <div key={photo.name} style={{ borderRadius: 12, overflow: "hidden", aspectRatio: "1", border: `1px solid ${T.border}` }}>
                  <img src={photo.url} alt={photo.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Jobs Screen ──────────────────────────────────────────────────────────────
function JobsScreen({ jobs, onJobClick, onAddJob }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? jobs : jobs.filter(j => j.status === filter);

  return (
    <div>
      <PageHeader title="All Jobs" subtitle={`${jobs.length} total jobs`} action={<AddBtn label="New Job" onClick={onAddJob} />} />
      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        {["all", "active", "in-progress", "complete"].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: "7px 16px", borderRadius: 8, background: filter === f ? T.primary : T.card, color: filter === f ? "#fff" : T.muted, border: `1px solid ${filter === f ? T.primary : T.border}`, fontSize: 13, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{f}</button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: "60px 20px", textAlign: "center", color: T.muted }}>
          <i className="ti ti-briefcase" style={{ fontSize: 48, marginBottom: 16, display: "block" }} />
          <div style={{ fontSize: 16, fontWeight: 600 }}>No jobs found</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {filtered.map(job => <JobCard key={job.id} job={job} onClick={onJobClick} />)}
        </div>
      )}
    </div>
  );
}

// ─── Crew Screen ──────────────────────────────────────────────────────────────
function CrewScreen({ crew, onAddCrew }) {
  return (
    <div>
      <PageHeader title="Field Crew" subtitle={`${crew.length} team members`} action={<AddBtn label="Add Member" onClick={onAddCrew} />} />
      {crew.length === 0 ? (
        <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: "60px 20px", textAlign: "center", color: T.muted }}>
          <i className="ti ti-users" style={{ fontSize: 48, marginBottom: 16, display: "block" }} />
          <div style={{ fontSize: 16, fontWeight: 600 }}>No crew members yet</div>
          <div style={{ fontSize: 14, marginTop: 8 }}>Add your first team member</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {crew.map(member => (
            <div key={member.initials} style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{member.initials}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.primary }}>{member.name}</div>
                  <div style={{ fontSize: 13, color: T.muted }}>{member.role}</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <Badge text={member.status} bg={CREW_STATUS_COLOR[member.status]?.bg || T.surface} color={CREW_STATUS_COLOR[member.status]?.text || T.muted} />
                <span style={{ fontSize: 12, color: T.muted }}>{member.jobs} active jobs</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={{ flex: 1, background: T.surface, color: T.secondary, border: "none", borderRadius: 8, padding: "9px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Message</button>
                <button style={{ flex: 1, background: T.primary, color: "#fff", border: "none", borderRadius: 8, padding: "9px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Call</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Fieldbook ────────────────────────────────────────────────────────────────
function FieldbookScreen({ jobs, onJobClick }) {
  const dryJobs = jobs.filter(j => j.moisture);
  return (
    <div>
      <PageHeader title="Fieldbook" subtitle="Moisture readings and drying logs" />
      {dryJobs.length === 0 ? (
        <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: "60px 20px", textAlign: "center", color: T.muted }}>
          <i className="ti ti-droplet" style={{ fontSize: 48, marginBottom: 16, display: "block" }} />
          <div style={{ fontSize: 16, fontWeight: 600 }}>No moisture readings yet</div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
          {dryJobs.map(job => (
            <div key={job.id} onClick={() => onJobClick(job)} style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: "20px", cursor: "pointer" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.primary }}>{job.client}</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: job.moisture > 15 ? "#A0270B" : "#1B5E37" }}>{job.moisture}%</div>
              </div>
              <div style={{ background: T.surface, borderRadius: 8, height: 8, overflow: "hidden", marginBottom: 8 }}>
                <div style={{ height: "100%", borderRadius: 8, background: job.moisture > 15 ? T.accent : "#2E9459", width: `${Math.min(100, (job.moisture / 30) * 100)}%` }} />
              </div>
              <div style={{ fontSize: 12, color: T.muted }}>Target: ≤12% · {job.id}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Docs Screen ──────────────────────────────────────────────────────────────
function DocsScreen() {
  return (
    <div>
      <PageHeader title="Documents" subtitle="Field documents and reports" />
      <div style={{ background: T.card, borderRadius: 14, border: `1px solid ${T.border}`, padding: "60px 20px", textAlign: "center", color: T.muted }}>
        <i className="ti ti-file-text" style={{ fontSize: 48, marginBottom: 16, display: "block" }} />
        <div style={{ fontSize: 16, fontWeight: 600 }}>No documents yet</div>
      </div>
    </div>
  );
}

// ─── Add Job Modal ────────────────────────────────────────────────────────────
function AddJobModal({ onClose, onSave }) {
  const [form, setForm] = useState({ client: "", type: "Water Damage", status: "active", priority: "medium", address: "", phase: "Assessment" });
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

  const field = (label, content) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.secondary, marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</label>
      {content}
    </div>
  );

  const inputStyle = { width: "100%", padding: "11px 14px", borderRadius: 8, border: `1.5px solid ${T.border}`, background: "#FAFAF9", fontSize: 14, color: T.primary, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: T.card, borderRadius: 20, width: 560, padding: "32px", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.primary }}>Create New Job</div>
          <button onClick={onClose} style={{ background: T.surface, border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, color: T.secondary, fontWeight: 600 }}>Cancel</button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
          <div style={{ gridColumn: "1 / -1" }}>{field("Client Name", <input style={inputStyle} value={form.client} onChange={e => set("client", e.target.value)} placeholder="e.g. John Smith" />)}</div>
          <div style={{ gridColumn: "1 / -1" }}>{field("Address", <input style={inputStyle} value={form.address} onChange={e => set("address", e.target.value)} placeholder="e.g. 123 Main St" />)}</div>
          {field("Job Type", <select style={inputStyle} value={form.type} onChange={e => set("type", e.target.value)}>{["Water Damage","Fire & Smoke","Mold Remediation","Storm Damage","Other"].map(t => <option key={t}>{t}</option>)}</select>)}
          {field("Phase", <select style={inputStyle} value={form.phase} onChange={e => set("phase", e.target.value)}>{["Assessment","Demolition","Drying","Containment","Rebuild","Complete"].map(p => <option key={p}>{p}</option>)}</select>)}
          {field("Priority", <select style={inputStyle} value={form.priority} onChange={e => set("priority", e.target.value)}>{["high","medium","low"].map(p => <option key={p}>{p}</option>)}</select>)}
          {field("Status", <select style={inputStyle} value={form.status} onChange={e => set("status", e.target.value)}>{["active","in-progress","complete"].map(s => <option key={s}>{s}</option>)}</select>)}
        </div>
        {error && <div style={{ color: "#A0270B", fontSize: 13, marginBottom: 16 }}>{error}</div>}
        <button onClick={handleSave} disabled={saving} style={{ width: "100%", padding: "13px", background: T.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
          {saving ? "Creating…" : "Create Job"}
        </button>
      </div>
    </div>
  );
}

// ─── Add Crew Modal ───────────────────────────────────────────────────────────
function AddCrewModal({ onClose, onSave }) {
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

  const inputStyle = { width: "100%", padding: "11px 14px", borderRadius: 8, border: `1.5px solid ${T.border}`, background: "#FAFAF9", fontSize: 14, color: T.primary, outline: "none", fontFamily: "inherit", boxSizing: "border-box" };
  const field = (label, content) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: T.secondary, marginBottom: 8, letterSpacing: "0.04em", textTransform: "uppercase" }}>{label}</label>
      {content}
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: T.card, borderRadius: 20, width: 480, padding: "32px", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.primary }}>Add Crew Member</div>
          <button onClick={onClose} style={{ background: T.surface, border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, color: T.secondary, fontWeight: 600 }}>Cancel</button>
        </div>
        {field("Full Name", <input style={inputStyle} value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Tyler Reynolds" />)}
        {field("Initials", <input style={inputStyle} value={form.initials} onChange={e => set("initials", e.target.value.toUpperCase().slice(0, 2))} placeholder="e.g. TR" maxLength={2} />)}
        {field("Role", <select style={inputStyle} value={form.role} onChange={e => set("role", e.target.value)}>{["Lead Tech","Technician","Estimator","Project Manager"].map(r => <option key={r}>{r}</option>)}</select>)}
        {field("Status", <select style={inputStyle} value={form.status} onChange={e => set("status", e.target.value)}>{["available","on-site","en-route"].map(s => <option key={s}>{s}</option>)}</select>)}
        {error && <div style={{ color: "#A0270B", fontSize: 13, marginBottom: 16 }}>{error}</div>}
        <button onClick={handleSave} disabled={saving} style={{ width: "100%", padding: "13px", background: T.primary, color: "#fff", border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {saving ? "Adding…" : "Add Member"}
        </button>
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
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setAuthLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  const loadJobs = async () => { const { data } = await supabase.from("jobs").select("*").order("id", { ascending: false }); if (data) setJobs(data); };
  const loadCrew = async () => { const { data } = await supabase.from("crew").select("*"); if (data) setCrew(data); };

  useEffect(() => { if (session) { loadJobs(); loadCrew(); } }, [session]);

  const handleSignOut = async () => { await supabase.auth.signOut(); setSession(null); setScreen("dashboard"); setSelectedJob(null); };

  const fonts = (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.34.0/dist/tabler-icons.min.css" rel="stylesheet" />
      <style>{`* { box-sizing: border-box; } body { margin: 0; background: ${T.bg}; }`}</style>
    </>
  );

  if (authLoading) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "sans-serif", color: "#9B9690" }}>{fonts}Loading…</div>;
  if (!session) return <>{fonts}<LoginScreen onLogin={setSession} /></>;

  return (
    <>
      {fonts}
      {showAddJob && <AddJobModal onClose={() => setShowAddJob(false)} onSave={loadJobs} />}
      {showAddCrew && <AddCrewModal onClose={() => setShowAddCrew(false)} onSave={loadCrew} />}

      <div style={{ display: "flex", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif" }}>
        <Sidebar screen={selectedJob ? "jobs" : screen} setScreen={(s) => { setScreen(s); setSelectedJob(null); }} user={session.user} onSignOut={handleSignOut} />

        {/* Main content */}
        <div style={{ marginLeft: 240, flex: 1, padding: "36px 40px", background: T.bg, minHeight: "100vh" }}>
          {selectedJob ? (
            <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />
          ) : (
            <>
              {screen === "dashboard" && <Dashboard jobs={jobs} onJobClick={setSelectedJob} onAddJob={() => setShowAddJob(true)} />}
              {screen === "jobs" && <JobsScreen jobs={jobs} onJobClick={setSelectedJob} onAddJob={() => setShowAddJob(true)} />}
              {screen === "fieldbook" && <FieldbookScreen jobs={jobs} onJobClick={setSelectedJob} />}
              {screen === "crew" && <CrewScreen crew={crew} onAddCrew={() => setShowAddCrew(true)} />}
              {screen === "docs" && <DocsScreen />}
            </>
          )}
        </div>
      </div>
    </>
  );
}
