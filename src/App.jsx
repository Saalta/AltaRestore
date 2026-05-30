import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── Supabase Config ──────────────────────────────────────────────────────────
// Replace these with your actual project values from supabase.com → Project Settings → API
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// ─────────────────────────────────────────────────────────────────────────────

const JOBS = [
  { id: "J-1041", client: "Marcus Webb", type: "Water Damage", status: "active", priority: "high", address: "4821 Elm Creek Dr", crew: ["TR", "MJ"], drybook: 72, moisture: 18, started: "May 27", phase: "Drying" },
  { id: "J-1040", client: "Sandra Kim", type: "Fire & Smoke", status: "active", priority: "high", address: "112 Birchwood Ave", crew: ["AL"], drybook: null, moisture: null, started: "May 26", phase: "Demolition" },
  { id: "J-1038", client: "Riverfront HOA", type: "Mold Remediation", status: "in-progress", priority: "medium", address: "800 Harbor Blvd #3", crew: ["MJ", "DK"], drybook: 48, moisture: 24, started: "May 24", phase: "Containment" },
  { id: "J-1035", client: "Tony Okafor", type: "Water Damage", status: "complete", priority: "low", address: "9 Maple Glen Ln", crew: ["TR"], drybook: 120, moisture: 9, started: "May 20", phase: "Complete" },
  { id: "J-1033", client: "Grace Patel", type: "Storm Damage", status: "complete", priority: "low", address: "332 Valley Ridge Rd", crew: ["AL", "DK"], drybook: 96, moisture: 8, started: "May 18", phase: "Complete" },
];

const CREW = [
  { initials: "TR", name: "Tyler R.", role: "Lead Tech", jobs: 2, status: "on-site" },
  { initials: "MJ", name: "Maya J.", role: "Technician", jobs: 2, status: "on-site" },
  { initials: "AL", name: "Alex L.", role: "Estimator", jobs: 1, status: "en-route" },
  { initials: "DK", name: "Dana K.", role: "Technician", jobs: 2, status: "available" },
];

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
  navActive: "#1C1A17",
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
    if (authError) {
      setError(authError.message);
    } else if (data?.session) {
      onLogin(data.session);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: `1.5px solid ${T.border}`,
    background: T.card,
    fontSize: 15,
    color: T.primary,
    outline: "none",
    fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
    boxSizing: "border-box",
  };

  return (
    <div style={{
      maxWidth: 430, margin: "0 auto", minHeight: "100vh",
      background: T.bg, fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header glow */}
      <div style={{
        background: T.primary, paddingTop: 72, paddingBottom: 48,
        paddingLeft: 28, paddingRight: 28, position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -60, right: -60,
          width: 200, height: 200, borderRadius: "50%",
          background: "rgba(212,87,10,0.18)",
        }} />
        <div style={{
          position: "absolute", bottom: -30, left: 20,
          width: 100, height: 100, borderRadius: "50%",
          background: "rgba(212,87,10,0.08)",
        }} />
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 11, background: "rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1.5px solid rgba(255,255,255,0.08)",
          }}>
            <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
              <path d="M3 14L9 4L15 14" stroke="#D4570A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.5 10.5H12.5" stroke="#D4570A" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
            Alta<span style={{ color: T.accentMid }}>Restore</span>
          </span>
        </div>
        <div style={{ fontSize: 26, fontWeight: 800, color: "#fff", marginBottom: 6, position: "relative" }}>
          Welcome back
        </div>
        <div style={{ fontSize: 14, color: "#9B9690", position: "relative" }}>
          Sign in to your field operations account
        </div>
      </div>

      {/* Form */}
      <div style={{ flex: 1, padding: "32px 24px 40px" }}>
        <form onSubmit={handleSignIn}>
          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block", fontSize: 12, fontWeight: 700,
              color: T.secondary, marginBottom: 8, letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@altarestore.com"
              required
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: 28 }}>
            <label style={{
              display: "block", fontSize: 12, fontWeight: 700,
              color: T.secondary, marginBottom: 8, letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}>Password</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ ...inputStyle, paddingRight: 50 }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                style={{
                  position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer", padding: 4,
                  color: T.muted,
                }}
              >
                <i className={`ti ${showPassword ? "ti-eye-off" : "ti-eye"}`} style={{ fontSize: 18 }} />
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "#FDECEA", border: "1px solid #F5C4A8",
              borderRadius: 10, padding: "12px 14px", marginBottom: 20,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <i className="ti ti-alert-circle" style={{ fontSize: 17, color: T.accent, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "#A0270B", fontWeight: 500 }}>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "15px",
              background: loading ? T.muted : T.primary,
              color: "#fff", border: "none", borderRadius: 14,
              fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "background 0.2s",
            }}
          >
            {loading
              ? <><i className="ti ti-loader-2" style={{ fontSize: 18, animation: "spin 1s linear infinite" }} /> Signing in...</>
              : <><i className="ti ti-login" style={{ fontSize: 18 }} /> Sign In</>
            }
          </button>
        </form>

        <div style={{
          marginTop: 32, padding: "16px", background: T.surface,
          borderRadius: 12, border: `1px solid ${T.border}`,
        }}>
          <div style={{ fontSize: 12, color: T.muted, textAlign: "center" }}>
            <i className="ti ti-shield-lock" style={{ fontSize: 14, marginRight: 6, verticalAlign: "middle" }} />
            Access is restricted to authorized AltaRestore team members
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

function LogoBar({ user, onSignOut }) {
  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : "AD";

  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "18px 16px 14px", borderBottom: `1px solid ${T.border}`,
      background: T.card,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{
          width: 32, height: 32, borderRadius: 9, background: T.primary,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M3 14L9 4L15 14" stroke="#D4570A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.5 10.5H12.5" stroke="#D4570A" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <span style={{ fontSize: 17, fontWeight: 800, color: T.primary, letterSpacing: "-0.02em" }}>
          Alta<span style={{ color: T.accent }}>Restore</span>
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{
          width: 34, height: 34, borderRadius: "50%", background: T.primary,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#fff", cursor: "pointer",
        }} title={user?.email}>{initials}</div>
        {onSignOut && (
          <button onClick={onSignOut} style={{
            background: T.surface, border: `1px solid ${T.border}`,
            borderRadius: 8, padding: "6px 10px", cursor: "pointer",
            fontSize: 12, color: T.secondary, fontWeight: 600,
            display: "flex", alignItems: "center", gap: 4,
          }}>
            <i className="ti ti-logout" style={{ fontSize: 14 }} /> Out
          </button>
        )}
      </div>
    </div>
  );
}

function Avatar({ initials, size = 32, color = "#1C1A17" }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color, color: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.36, fontWeight: 700, flexShrink: 0,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      letterSpacing: "0.02em",
    }}>{initials}</div>
  );
}

function Badge({ text, bg, color }) {
  return (
    <span style={{
      background: bg, color, fontSize: 10, fontWeight: 700,
      padding: "2px 8px", borderRadius: 20, letterSpacing: "0.05em",
      textTransform: "uppercase",
    }}>{text}</span>
  );
}

function JobCard({ job, onClick }) {
  const p = PRIORITY_COLORS[job.priority];
  const s = STATUS_COLOR[job.status];
  return (
    <div onClick={() => onClick(job)} style={{
      background: T.card, borderRadius: 14, padding: "14px 16px",
      border: `1px solid ${T.border}`, marginBottom: 10, cursor: "pointer",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.primary, marginBottom: 2 }}>{job.client}</div>
          <div style={{ fontSize: 12, color: T.muted }}>{job.id} · {job.address}</div>
        </div>
        <Badge text={job.status.replace("-", " ")} bg={s.bg} color={s.text} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{
          fontSize: 11, color: T.accent, background: T.accentLight,
          padding: "2px 10px", borderRadius: 20, fontWeight: 600,
        }}>{job.type}</span>
        <span style={{ fontSize: 12, color: T.muted }}>Phase: <strong style={{ color: T.secondary }}>{job.phase}</strong></span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex" }}>
          {job.crew.map((c, i) => (
            <div key={c} style={{ marginLeft: i > 0 ? -8 : 0, zIndex: job.crew.length - i }}>
              <Avatar initials={c} size={26} color={i === 0 ? T.primary : T.secondary} />
            </div>
          ))}
          <span style={{ fontSize: 12, color: T.muted, marginLeft: 10, alignSelf: "center" }}>
            Started {job.started}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: p.dot }} />
          <span style={{ fontSize: 11, color: p.text, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>{job.priority}</span>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, accent }) {
  return (
    <div style={{
      background: T.card, borderRadius: 14, padding: "14px",
      border: `1px solid ${T.border}`, flex: 1,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 9,
        background: accent + "18", display: "flex", alignItems: "center",
        justifyContent: "center", marginBottom: 8,
      }}>
        <i className={`ti ${icon}`} style={{ fontSize: 17, color: accent }} />
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: T.primary, lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{label}</div>
    </div>
  );
}

function Dashboard({ onJobClick, user, onSignOut }) {
  const active = JOBS.filter(j => j.status === "active").length;
  const complete = JOBS.filter(j => j.status === "complete").length;
  const firstName = user?.email?.split("@")[0] ?? "there";
  return (
    <div>
      <LogoBar user={user} onSignOut={onSignOut} />

      <div style={{ padding: "18px 16px 0" }}>
        <div style={{ fontSize: 12, color: T.muted, marginBottom: 2, letterSpacing: "0.04em", textTransform: "uppercase" }}>Good morning</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: T.primary }}>{firstName} 👋</div>
      </div>

      <div style={{ padding: "16px 16px 0" }}>
        <div style={{
          background: "#1C1A17",
          borderRadius: 20, padding: "20px", color: "#fff",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -30, right: -30,
            width: 130, height: 130, borderRadius: "50%",
            background: "rgba(212,87,10,0.15)",
          }} />
          <div style={{
            position: "absolute", bottom: -20, right: 40,
            width: 80, height: 80, borderRadius: "50%",
            background: "rgba(212,87,10,0.08)",
          }} />
          <div style={{ fontSize: 11, color: "#9B9690", marginBottom: 4, letterSpacing: "0.06em", textTransform: "uppercase" }}>Active Revenue Pipeline</div>
          <div style={{ fontSize: 32, fontWeight: 800, marginBottom: 14, color: "#fff" }}>$148,420</div>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { val: active, label: "Active Jobs" },
              { val: 4, label: "On-Site" },
              { val: complete, label: "Completed" },
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: i > 0 ? 16 : 0 }}>
                {i > 0 && <div style={{ width: 1, height: 28, background: "#3A3830" }} />}
                <div style={{ paddingLeft: i > 0 ? 0 : 0 }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: i === 0 ? T.accentMid : "#fff" }}>{item.val}</div>
                  <div style={{ fontSize: 11, color: "#9B9690" }}>{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 10, padding: "14px 16px 0" }}>
        <StatCard label="Avg Moisture" value="17%" icon="ti-droplet" accent={T.accent} />
        <StatCard label="Pending Invoices" value="$42k" icon="ti-receipt" accent="#E5A000" />
        <StatCard label="Alerts" value="2" icon="ti-bell-ringing" accent="#C0392B" />
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.primary }}>Active Jobs</div>
          <button style={{
            fontSize: 12, color: T.accent, background: "none", border: "none",
            fontWeight: 700, cursor: "pointer", padding: 0,
          }}>See All →</button>
        </div>
        {JOBS.filter(j => j.status !== "complete").map(job => (
          <JobCard key={job.id} job={job} onClick={onJobClick} />
        ))}
      </div>
    </div>
  );
}

function JobDetail({ job, onBack }) {
  const [tab, setTab] = useState("overview");
  const p = PRIORITY_COLORS[job.priority];
  const tabs = ["overview", "drybook", "docs", "photos"];

  return (
    <div>
      <div style={{
        background: "#1C1A17", padding: "52px 16px 20px", color: "#fff",
      }}>
        <button onClick={onBack} style={{
          background: "rgba(255,255,255,0.1)", border: "none", color: "#fff",
          borderRadius: 10, padding: "6px 14px", fontSize: 13,
          cursor: "pointer", marginBottom: 16, display: "flex",
          alignItems: "center", gap: 6,
        }}>
          <i className="ti ti-arrow-left" style={{ fontSize: 15 }} /> Back
        </button>
        <div style={{ fontSize: 11, color: "#9B9690", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{job.id} · {job.type}</div>
        <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{job.client}</div>
        <div style={{ fontSize: 13, color: "#9B9690", display: "flex", alignItems: "center", gap: 4 }}>
          <i className="ti ti-map-pin" style={{ fontSize: 14 }} /> {job.address}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <span style={{ background: "rgba(255,255,255,0.1)", color: "#fff", fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>{job.phase}</span>
          <span style={{ background: p.bg, color: p.text, fontSize: 11, padding: "3px 10px", borderRadius: 20, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            {job.priority} priority
          </span>
        </div>
      </div>

      <div style={{ display: "flex", padding: "0 16px", background: T.card, borderBottom: `1px solid ${T.border}` }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "12px 0", background: "none", border: "none",
            fontSize: 12, fontWeight: tab === t ? 700 : 500,
            color: tab === t ? T.accent : T.muted,
            borderBottom: tab === t ? `2px solid ${T.accent}` : "2px solid transparent",
            cursor: "pointer", textTransform: "capitalize",
          }}>{t}</button>
        ))}
      </div>

      <div style={{ padding: "16px" }}>
        {tab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
              {[
                { label: "Start Date", val: job.started, icon: "ti-calendar" },
                { label: "Phase", val: job.phase, icon: "ti-progress" },
                { label: "Crew Size", val: job.crew.length + " techs", icon: "ti-users" },
                { label: "Fieldbook Hrs", val: job.drybook ? job.drybook + "h" : "N/A", icon: "ti-clock" },
              ].map(item => (
                <div key={item.label} style={{
                  background: T.surface, borderRadius: 12, padding: "12px 14px",
                }}>
                  <i className={`ti ${item.icon}`} style={{ fontSize: 16, color: T.accent, marginBottom: 4, display: "block" }} />
                  <div style={{ fontSize: 16, fontWeight: 700, color: T.primary }}>{item.val}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{item.label}</div>
                </div>
              ))}
            </div>

            {job.moisture !== null && (
              <div style={{ background: T.accentLight, borderRadius: 14, padding: "14px", marginBottom: 14, border: `1px solid #F5C4A8` }}>
                <div style={{ fontSize: 13, color: T.accent, fontWeight: 700, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  <i className="ti ti-droplet" style={{ marginRight: 6 }} />Moisture Reading
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: "50%",
                    background: job.moisture > 15 ? "#FDECEA" : "#E6F4EC",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, fontWeight: 800,
                    color: job.moisture > 15 ? "#A0270B" : "#1B5E37",
                    border: `2px solid ${job.moisture > 15 ? "#D4570A" : "#2E9459"}`,
                  }}>{job.moisture}%</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: job.moisture > 15 ? "#A0270B" : "#1B5E37" }}>
                      {job.moisture > 15 ? "Still Drying" : "Near Target"}
                    </div>
                    <div style={{ fontSize: 12, color: T.muted }}>Target: ≤12%</div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.primary, marginBottom: 10 }}>Assigned Crew</div>
              {CREW.filter(c => job.crew.includes(c.initials)).map(member => (
                <div key={member.initials} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  background: T.card, border: `1px solid ${T.border}`,
                  borderRadius: 12, padding: "10px 14px", marginBottom: 8,
                }}>
                  <Avatar initials={member.initials} size={36} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: T.primary }}>{member.name}</div>
                    <div style={{ fontSize: 12, color: T.muted }}>{member.role}</div>
                  </div>
                  <Badge
                    text={member.status}
                    bg={CREW_STATUS[member.status].bg}
                    color={CREW_STATUS[member.status].text}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "drybook" && job.drybook && (
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.primary, marginBottom: 12 }}>Fieldbook — Drying Log</div>
            {[0, 24, 48, 72].filter(h => h <= job.drybook).map(h => {
              const m = Math.max(9, job.moisture + (job.drybook - h) * 0.18);
              return (
                <div key={h} style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 0", borderBottom: `1px solid ${T.border}`,
                }}>
                  <div style={{
                    width: 40, height: 40, background: T.surface, borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700, color: T.secondary,
                  }}>{h}h</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.primary }}>Reading at {h}hrs</div>
                    <div style={{ fontSize: 12, color: T.muted }}>
                      {h === 0 ? "Initial assessment" : "Monitoring cycle"}
                    </div>
                  </div>
                  <div style={{
                    fontSize: 16, fontWeight: 800,
                    color: m > 15 ? "#A0270B" : "#1B5E37",
                  }}>{Math.round(m)}%</div>
                </div>
              );
            })}
          </div>
        )}

        {tab === "docs" && (
          <div>
            {["Work Authorization", "Moisture Map", "Photo Log", "Scope of Work", "Insurance Claim"].map(doc => (
              <div key={doc} style={{
                display: "flex", alignItems: "center", gap: 12,
                background: T.card, border: `1px solid ${T.border}`,
                borderRadius: 12, padding: "12px 14px", marginBottom: 8,
              }}>
                <div style={{
                  width: 36, height: 36, background: T.accentLight, borderRadius: 8,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <i className="ti ti-file-text" style={{ fontSize: 18, color: T.accent }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: T.primary }}>{doc}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>PDF · Updated May 28</div>
                </div>
                <i className="ti ti-download" style={{ fontSize: 18, color: T.secondary }} />
              </div>
            ))}
          </div>
        )}

        {tab === "photos" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
              {Array.from({ length: 9 }, (_, i) => (
                <div key={i} style={{
                  aspectRatio: "1",
                  background: i % 3 === 0 ? "#F0EDE8" : i % 3 === 1 ? "#FFF0E8" : "#E6F4EC",
                  borderRadius: 10, display: "flex", alignItems: "center",
                  justifyContent: "center",
                }}>
                  <i className="ti ti-camera" style={{ fontSize: 22, color: T.muted }} />
                </div>
              ))}
            </div>
            <button style={{
              width: "100%", marginTop: 16, background: T.primary, color: "#fff",
              border: "none", borderRadius: 12, padding: "13px",
              fontSize: 14, fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <i className="ti ti-camera-plus" style={{ fontSize: 18 }} /> Add Photos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function JobsScreen({ onJobClick, user, onSignOut }) {
  const [filter, setFilter] = useState("all");
  const filters = ["all", "active", "in-progress", "complete"];
  const filtered = filter === "all" ? JOBS : JOBS.filter(j => j.status === filter);

  return (
    <div>
      <LogoBar user={user} onSignOut={onSignOut} />
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: T.primary, marginBottom: 16 }}>All Jobs</div>
        <div style={{ display: "flex", gap: 6, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              flexShrink: 0,
              background: filter === f ? T.primary : T.surface,
              color: filter === f ? "#fff" : T.muted,
              border: "none", borderRadius: 20, padding: "6px 14px",
              fontSize: 12, fontWeight: 600, cursor: "pointer",
              textTransform: "capitalize",
            }}>{f}</button>
          ))}
        </div>
        {filtered.map(job => <JobCard key={job.id} job={job} onClick={onJobClick} />)}
      </div>
    </div>
  );
}

function CrewScreen({ user, onSignOut }) {
  return (
    <div>
      <LogoBar user={user} onSignOut={onSignOut} />
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: T.primary, marginBottom: 16 }}>Field Crew</div>
        {CREW.map(member => (
          <div key={member.initials} style={{
            background: T.card, borderRadius: 16, border: `1px solid ${T.border}`,
            padding: "16px", marginBottom: 12,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <Avatar initials={member.initials} size={46} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: T.primary }}>{member.name}</div>
                <div style={{ fontSize: 12, color: T.muted }}>{member.role}</div>
              </div>
              <Badge
                text={member.status}
                bg={CREW_STATUS[member.status].bg}
                color={CREW_STATUS[member.status].text}
              />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1, background: T.surface, borderRadius: 10, padding: "10px", textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: T.primary }}>{member.jobs}</div>
                <div style={{ fontSize: 11, color: T.muted }}>Active Jobs</div>
              </div>
              <button style={{
                flex: 2, background: T.accentLight, color: T.accent,
                border: "none", borderRadius: 10, padding: "10px",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                <i className="ti ti-message" style={{ fontSize: 15 }} /> Message
              </button>
              <button style={{
                flex: 2, background: T.primary, color: "#fff",
                border: "none", borderRadius: 10, padding: "10px",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
              }}>
                <i className="ti ti-phone" style={{ fontSize: 15 }} /> Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DocsScreen({ user, onSignOut }) {
  const docs = [
    { name: "Work Authorization — Webb", job: "J-1041", type: "Auth", date: "May 27" },
    { name: "Moisture Map — Webb", job: "J-1041", type: "Map", date: "May 27" },
    { name: "Work Authorization — Kim", job: "J-1040", type: "Auth", date: "May 26" },
    { name: "Scope of Work — Riverfront", job: "J-1038", type: "Scope", date: "May 25" },
    { name: "Insurance Claim — Okafor", job: "J-1035", type: "Claim", date: "May 22" },
    { name: "Final Report — Patel", job: "J-1033", type: "Report", date: "May 21" },
  ];
  return (
    <div>
      <LogoBar user={user} onSignOut={onSignOut} />
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: T.primary, marginBottom: 16 }}>Field Documents</div>
        <div style={{
          background: T.surface, borderRadius: 14, padding: "12px 14px",
          display: "flex", gap: 10, alignItems: "center", marginBottom: 16,
          border: `1px solid ${T.border}`,
        }}>
          <i className="ti ti-search" style={{ fontSize: 18, color: T.muted }} />
          <span style={{ fontSize: 14, color: T.muted }}>Search documents...</span>
        </div>
        {docs.map((doc, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 12,
            background: T.card, border: `1px solid ${T.border}`,
            borderRadius: 12, padding: "12px 14px", marginBottom: 8,
          }}>
            <div style={{
              width: 38, height: 38, background: T.accentLight, borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}>
              <i className="ti ti-file-text" style={{ fontSize: 18, color: T.accent }} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.primary, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{doc.name}</div>
              <div style={{ fontSize: 11, color: T.muted }}>{doc.job} · {doc.date}</div>
            </div>
            <i className="ti ti-download" style={{ fontSize: 17, color: T.secondary, flexShrink: 0 }} />
          </div>
        ))}
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

  useEffect(() => {
    // Check for an existing session on mount
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });

    // Listen for auth state changes (login, logout, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setScreen("dashboard");
    setSelectedJob(null);
  };

  const shell = {
    maxWidth: 430, margin: "0 auto", background: T.bg,
    minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
    paddingBottom: 80,
  };

  const fonts = (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <link href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.34.0/dist/tabler-icons.min.css" rel="stylesheet" />
    </>
  );

  // Loading state while checking session
  if (authLoading) {
    return (
      <div style={{ ...shell, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {fonts}
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, background: T.primary,
            display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px",
          }}>
            <svg width="24" height="24" viewBox="0 0 18 18" fill="none">
              <path d="M3 14L9 4L15 14" stroke="#D4570A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M5.5 10.5H12.5" stroke="#D4570A" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div style={{ fontSize: 13, color: T.muted }}>Loading AltaRestore…</div>
        </div>
      </div>
    );
  }

  // Not authenticated → show login
  if (!session) {
    return (
      <>
        {fonts}
        <LoginScreen onLogin={setSession} />
      </>
    );
  }

  const user = session.user;

  // Job detail view
  if (selectedJob) {
    return (
      <div style={shell}>
        {fonts}
        <JobDetail job={selectedJob} onBack={() => setSelectedJob(null)} />
      </div>
    );
  }

  // Main app
  return (
    <div style={shell}>
      {fonts}

      <div style={{ overflowY: "auto" }}>
        {screen === "dashboard" && <Dashboard onJobClick={setSelectedJob} user={user} onSignOut={handleSignOut} />}
        {screen === "jobs" && <JobsScreen onJobClick={setSelectedJob} user={user} onSignOut={handleSignOut} />}
        {screen === "fieldbook" && (
          <div>
            <LogoBar user={user} onSignOut={handleSignOut} />
            <div style={{ padding: "16px 16px 0" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: T.primary, marginBottom: 16 }}>Fieldbook</div>
              {JOBS.filter(j => j.drybook).map(job => (
                <div key={job.id} onClick={() => setSelectedJob(job)} style={{
                  background: T.card, borderRadius: 16, border: `1px solid ${T.border}`,
                  padding: "14px 16px", marginBottom: 10, cursor: "pointer",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: T.primary }}>{job.client}</div>
                    <div style={{
                      fontSize: 18, fontWeight: 800,
                      color: job.moisture > 15 ? "#A0270B" : "#1B5E37",
                    }}>{job.moisture}%</div>
                  </div>
                  <div style={{ background: T.surface, borderRadius: 8, height: 8, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", borderRadius: 8,
                      background: job.moisture > 15 ? T.accent : "#2E9459",
                      width: `${Math.min(100, (job.moisture / 30) * 100)}%`,
                    }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                    <span style={{ fontSize: 11, color: T.muted }}>{job.drybook}h logged · {job.id}</span>
                    <span style={{ fontSize: 11, color: T.muted }}>Target: ≤12%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {screen === "crew" && <CrewScreen user={user} onSignOut={handleSignOut} />}
        {screen === "docs" && <DocsScreen user={user} onSignOut={handleSignOut} />}
      </div>

      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: T.card, borderTop: `1px solid ${T.border}`,
        display: "flex", padding: "8px 0 12px",
      }}>
        {NAV.map(item => (
          <button key={item.id} onClick={() => setScreen(item.id)} style={{
            flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            background: "none", border: "none", cursor: "pointer", padding: "4px 0",
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: screen === item.id ? T.primary : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <i className={`ti ${item.icon}`} style={{
                fontSize: 18,
                color: screen === item.id ? "#fff" : T.muted,
              }} />
            </div>
            <span style={{
              fontSize: 10, fontWeight: screen === item.id ? 700 : 500,
              color: screen === item.id ? T.primary : T.muted,
            }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
