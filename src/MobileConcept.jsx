import { useState, useEffect } from "react";

/* ===================================================================
   1STOP SERVICE PRO — Mobile App Concept (v2)
   Shows iOS & Android mockups for both Vendor and Manager apps
   Navy #0B1F3A · Orange #E8671A · White · Figtree + Manrope
   Dark mode support · 7 screens · Interactive phone frames
=================================================================== */

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700;800;900&family=Manrope:wght@400;500;600;700&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { max-width: 100%; overflow-x: hidden; }
  :root {
    --navy:   #0B1F3A;
    --navy-2: #16325A;
    --orange: #E8671A;
    --ora-lo: rgba(232,103,26,0.12);
    --ora-md: rgba(232,103,26,0.25);
    --white:  #FFFFFF;
    --bg:     #F5F7FA;
    --card:   #FFFFFF;
    --muted:  #6B82A0;
    --subtle: #A8BBD0;
    --border: rgba(11,31,58,0.10);
    --green:  #1DB87A;
    --blue:   #2D7DD2;
    --red:    #E8404A;
    --fd: 'Figtree', sans-serif;
    --fb: 'Manrope', sans-serif;
    --page-bg: #E8EDF5;
  }
  [data-theme="dark"] {
    --navy:   #E0E8F2;
    --navy-2: #B8C8DC;
    --white:  #0F1923;
    --bg:     #0A1219;
    --card:   #121C27;
    --muted:  #607890;
    --subtle: #3D5468;
    --border: rgba(200,220,240,0.08);
    --page-bg: #080E15;
  }
  body { font-family: var(--fb); background: var(--page-bg); color: var(--navy); -webkit-font-smoothing: antialiased; overflow-x: hidden; }
  * { -webkit-tap-highlight-color: transparent; }
  @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:none; } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes slideScreen { from { opacity:0; transform:scale(0.96); } to { opacity:1; transform:none; } }
  .a-up { animation: fadeUp 0.4s ease both; }
  .d1{animation-delay:.06s} .d2{animation-delay:.12s} .d3{animation-delay:.18s} .d4{animation-delay:.24s}

  /* ── MOBILE RESPONSIVE ── */
  .phone-nav-row { display: flex; align-items: center; gap: 16px; }
  .phone-features-row { display: flex; justify-content: center; gap: 40px; flex-wrap: wrap; align-items: flex-start; }
  .phone-scale-wrap { transform-origin: top center; }
  .nav-arrow { width: 40px; height: 40px; border-radius: 50%; border: 1px solid var(--border); background: var(--card); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--muted); transition: all 0.2s; flex-shrink: 0; }
  .nav-arrow:hover { background: var(--border); }
  .features-panel { max-width: 400px; width: 100%; }

  @media (max-width: 768px) {
    .phone-features-row { flex-direction: column; align-items: center; gap: 24px; }
    .features-panel { max-width: 100%; }
    .phone-scale-wrap { transform: scale(0.85); margin: -20px 0; }
    .nav-arrow { width: 36px; height: 36px; }
    .screen-pills { gap: 6px !important; }
    .screen-pills button { padding: 6px 14px !important; font-size: 12px !important; }
    .role-toggle button { padding: 8px 20px !important; font-size: 13px !important; }
    .feature-overview-grid { grid-template-columns: 1fr !important; }
    .tech-pills { gap: 6px !important; }
    .tech-pills span { font-size: 11px !important; padding: 4px 10px !important; }
  }

  @media (max-width: 480px) {
    .phone-scale-wrap { transform: scale(0.72); margin: -40px 0; }
    .nav-arrow { width: 32px; height: 32px; }
    .screen-pills { display: none !important; }
    .intro-heading { font-size: 24px !important; }
    .intro-subtext { font-size: 13px !important; }
    .features-panel > div { padding: 20px 16px !important; }
    .features-panel .feat-title { font-size: 14px !important; }
    .features-panel .feat-item { font-size: 12px !important; }
  }

  @media (max-width: 360px) {
    .phone-scale-wrap { transform: scale(0.62); margin: -60px 0; }
    .intro-heading { font-size: 20px !important; }
  }
  .screen-enter { animation: slideScreen 0.35s cubic-bezier(0.4,0,0.2,1) both; }
`;

// ── ICON SET ──────────────────────────────────────────────────────────
const I = {
  home:     <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3 8L10 2l7 6v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M8 19v-8h4v8"/></svg>,
  jobs:     <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="4" width="14" height="14" rx="2"/><path d="M7 4V2.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V4"/><path d="M7 10h6M7 13h4"/></svg>,
  earn:     <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M10 2v16M7 5h4.5a2.5 2.5 0 0 1 0 5H8a2.5 2.5 0 0 0 0 5H13"/></svg>,
  team:     <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="8" cy="7" r="3"/><path d="M2 18c0-3.31 2.69-6 6-6s6 2.69 6 6"/><circle cx="15" cy="7" r="2"/><path d="M18 17c0-2-1.34-3.5-3-3.5"/></svg>,
  check:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10l4.5 4.5 7.5-8"/></svg>,
  arrow:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 10h12M11 6l4 4-4 4"/></svg>,
  bell:     <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M10 2a6 6 0 0 1 6 6v3l1.5 2.5h-15L4 11V8a6 6 0 0 1 6-6z"/><path d="M8 17.5a2 2 0 0 0 4 0"/></svg>,
  map:      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M10 2C7.24 2 5 4.24 5 7c0 4.5 5 11 5 11s5-6.5 5-11c0-2.76-2.24-5-5-5z"/><circle cx="10" cy="7" r="2"/></svg>,
  cam:      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="6" width="16" height="12" rx="2"/><circle cx="10" cy="12" r="3"/><path d="M7 6l1-3h4l1 3"/></svg>,
  star:     <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2l2 5.5h6l-4.5 3.5L15 17l-5-3-5 3 1.5-6L2 7.5h6z"/></svg>,
  plus:     <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 4v12M4 10h12"/></svg>,
  build:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="7" width="16" height="12" rx="1.5"/><path d="M6 7V5a4 4 0 0 1 8 0v2"/><path d="M10 11v2.5"/></svg>,
  list:     <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M8 5h9M8 10h9M8 15h9M3 5h.5M3 10h.5M3 15h.5"/></svg>,
  settings: <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="10" cy="10" r="3"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M15.78 4.22l-1.42 1.42M5.64 14.36l-1.42 1.42"/></svg>,
  chart:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 15l4.5-5.5 3.5 2.5 4-6 4 3.5"/><path d="M2 18h16"/></svg>,
  shield:   <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M10 2L3 6v5c0 5.25 3.1 9.5 7 10.5 3.9-1 7-5.25 7-10.5V6L10 2z"/></svg>,
  clock:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="10" cy="10" r="8"/><path d="M10 6v4.5l3 3"/></svg>,
  moon:     <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 10.5A7.5 7.5 0 1 1 9.5 3a6 6 0 0 0 7.5 7.5z"/></svg>,
  sun:      <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="10" cy="10" r="4"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.5 1.5M14.3 14.3l1.5 1.5M15.8 4.2l-1.5 1.5M5.7 14.3l-1.5 1.5"/></svg>,
  left:     <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4l-6 6 6 6"/></svg>,
  right:    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4l6 6-6 6"/></svg>,
};

// ── PHONE FRAME ────────────────────────────────────────────────────
function Phone({ type = "iphone", children, label }) {
  const isAndroid = type === "android";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{
        background: isAndroid ? "#1A1A2E" : "#111",
        borderRadius: isAndroid ? 28 : 48,
        padding: isAndroid ? "10px 6px" : "12px 8px",
        boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.05), inset 0 1px 0 rgba(255,255,255,0.08)",
        width: isAndroid ? 250 : 252,
        position: "relative",
      }}>
        {/* Status bar */}
        <div style={{ height: isAndroid ? 24 : 44, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          {isAndroid ? (
            <>
              <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: 600, fontFamily: "var(--fb)" }}>9:41</span>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {[12,14,16,18].map(h => <div key={h} style={{ width: 3, height: h, background: "rgba(255,255,255,0.6)", borderRadius: 2 }} />)}
                <div style={{ width: 18, height: 9, border: "1px solid rgba(255,255,255,0.5)", borderRadius: 2, position: "relative", marginLeft: 4 }}>
                  <div style={{ position: "absolute", left: 1, top: 1, bottom: 1, width: "70%", background: "rgba(255,255,255,0.6)", borderRadius: 1 }} />
                </div>
              </div>
            </>
          ) : (
            <>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 700, fontFamily: "var(--fb)" }}>9:41</span>
              <div style={{ background: "#111", borderRadius: 20, padding: "5px 28px", marginTop: 6 }}>
                <div style={{ width: 10, height: 10, background: "#222", borderRadius: "50%" }} />
              </div>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <svg width="14" height="10" viewBox="0 0 14 10"><path d="M1 9l3-3 3 3 3-7 3 7" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round"/></svg>
                <svg width="16" height="11" viewBox="0 0 16 11"><rect x="1" y="1" width="14" height="9" rx="2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2"/><rect x="2.5" y="2.5" width="10" height="6" rx="1" fill="rgba(255,255,255,0.6)"/></svg>
              </div>
            </>
          )}
        </div>
        <div style={{ background: "#F5F7FA", borderRadius: isAndroid ? 18 : 36, overflow: "hidden", height: 490, position: "relative" }}>
          <div className="screen-enter" key={label} style={{ height: "100%" }}>{children}</div>
        </div>
        {!isAndroid && (
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 8, paddingBottom: 4 }}>
            <div style={{ width: 100, height: 4, background: "rgba(255,255,255,0.3)", borderRadius: 3 }} />
          </div>
        )}
        {isAndroid && (
          <div style={{ display: "flex", justifyContent: "center", gap: 24, paddingTop: 8, paddingBottom: 4 }}>
            {[I.home, I.check, I.arrow].map((ic, i) => (
              <div key={i} style={{ color: "rgba(255,255,255,0.45)", width: 16, height: 16, display: "flex" }}>{ic}</div>
            ))}
          </div>
        )}
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)", fontFamily: "var(--fd)" }}>{label}</div>
        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>{type === "android" ? "Android" : "iOS"}</div>
      </div>
    </div>
  );
}

// ── BOTTOM NAV ────────────────────────────────────────────────────
function BottomNav({ items, active = 0 }) {
  return (
    <div style={{ marginTop: "auto", background: "white", borderTop: "1px solid rgba(11,31,58,0.08)", padding: "8px 0 4px", display: "flex", justifyContent: "space-around" }}>
      {items.map(([ic, l], i) => (
        <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "4px 8px", cursor: "pointer" }}>
          <div style={{ color: i === active ? "#E8671A" : "#6B82A0", display: "flex", width: 18, height: 18 }}>{ic}</div>
          <span style={{ fontSize: 9, fontWeight: 700, color: i === active ? "#E8671A" : "#6B82A0" }}>{l}</span>
        </div>
      ))}
    </div>
  );
}

// ── SCREEN: VENDOR DASHBOARD ──────────────────────────────────────
function VendorDashScreen() {
  return (
    <div style={{ background: "#F5F7FA", height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#0B1F3A", padding: "16px 18px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(232,103,26,0.15)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Good Morning</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: "white", fontFamily: "var(--fd)", marginTop: 2 }}>CleanPro LLC</div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)" }}>{I.bell}</div>
            <div style={{ position: "absolute", top: -2, right: -2, width: 14, height: 14, background: "#E8671A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "white" }}>3</div>
          </div>
        </div>
        <div style={{ marginTop: 14, background: "rgba(232,103,26,0.20)", borderRadius: 12, padding: "10px 14px", border: "1px solid rgba(232,103,26,0.30)", position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8671A" }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: "#E8671A", textTransform: "uppercase", letterSpacing: 1 }}>Active Now</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "white", marginTop: 2 }}>Turnover Cleaning</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 1 }}>Hillcrest Apts · Unit B-302</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 16, fontWeight: 900, color: "#E8671A", fontFamily: "var(--fd)" }}>$285</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", marginTop: 1 }}>Est. payout</div>
            </div>
          </div>
          <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
            <div style={{ flex: 1, background: "rgba(255,255,255,0.12)", borderRadius: 8, padding: "7px 10px", textAlign: "center", color: "rgba(255,255,255,0.7)", fontSize: 11, fontWeight: 600 }}>Get Directions</div>
            <div style={{ flex: 1, background: "#E8671A", borderRadius: 8, padding: "7px 10px", textAlign: "center", color: "white", fontSize: 11, fontWeight: 700 }}>Mark Complete</div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, padding: "12px 14px 0" }}>
        {[["$3,240","Month"],["98%","On-Time"],["4.9","Rating"]].map(([v,l])=>(
          <div key={l} style={{ flex: 1, background: "white", borderRadius: 12, padding: "10px", textAlign: "center", boxShadow: "0 1px 6px rgba(11,31,58,0.07)", border: "1px solid rgba(11,31,58,0.07)" }}>
            <div style={{ fontFamily: "var(--fd)", fontSize: 16, fontWeight: 900, color: "#0B1F3A" }}>{v}</div>
            <div style={{ fontSize: 10, color: "#6B82A0", marginTop: 2, fontWeight: 600 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 14px 0", flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A", fontFamily: "var(--fd)", marginBottom: 8 }}>Upcoming Jobs</div>
        {[
          { svc: "Plumbing Repair", prop: "Riverside Commons", time: "Jun 30 · 11AM", amt: "$190" },
          { svc: "HVAC Maintenance", prop: "Palmetto HOA", time: "Jul 2 · 8AM", amt: "$340" },
        ].map((j, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, padding: "10px 12px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 4px rgba(11,31,58,0.06)", border: "1px solid rgba(11,31,58,0.07)" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A" }}>{j.svc}</div>
              <div style={{ fontSize: 11, color: "#6B82A0", marginTop: 2 }}>{j.prop}</div>
              <div style={{ fontSize: 10, color: "#E8671A", marginTop: 2, fontWeight: 600 }}>{j.time}</div>
            </div>
            <div style={{ fontFamily: "var(--fd)", fontSize: 15, fontWeight: 800, color: "#1DB87A" }}>{j.amt}</div>
          </div>
        ))}
      </div>
      <BottomNav items={[[I.home,"Home"],[I.jobs,"Jobs"],[I.earn,"Earnings"],[I.team,"Team"]]} active={0} />
    </div>
  );
}

// ── SCREEN: AVAILABLE JOBS ────────────────────────────────────────
function AvailJobsScreen() {
  return (
    <div style={{ background: "#F5F7FA", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "white", padding: "16px 16px 12px", borderBottom: "1px solid rgba(11,31,58,0.08)" }}>
        <div style={{ fontSize: 17, fontWeight: 900, color: "#0B1F3A", fontFamily: "var(--fd)" }}>Available Jobs</div>
        <div style={{ fontSize: 11, color: "#6B82A0", marginTop: 2 }}>Atlanta, GA · 5 new requests</div>
        <div style={{ display: "flex", gap: 6, marginTop: 10, overflowX: "auto" }}>
          {["All","Urgent","Nearby","Turnover","HVAC"].map((f,i) => (
            <div key={f} style={{ padding: "5px 12px", borderRadius: 100, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", background: i === 0 ? "#0B1F3A" : "rgba(11,31,58,0.05)", color: i === 0 ? "white" : "#6B82A0", border: `1px solid ${i === 0 ? "#0B1F3A" : "rgba(11,31,58,0.10)"}` }}>{f}</div>
          ))}
        </div>
      </div>
      <div style={{ padding: "10px 14px", flex: 1, overflowY: "auto" }}>
        {[
          { svc: "Turnover Cleaning", prop: "Sunset Ridge Apts", unit: "Unit 14-A", date: "Jul 3 · 9AM", est: "$260–$310", urgent: true, dist: "3.2 mi" },
          { svc: "HVAC Maintenance", prop: "Lakewood Commons", unit: "Common Area", date: "Jul 4 · 8AM", est: "$380–$450", urgent: false, dist: "5.8 mi" },
          { svc: "Plumbing Repair", prop: "Park Avenue Tower", unit: "Suite 400", date: "Jul 5 · 10AM", est: "$180–$220", urgent: false, dist: "2.1 mi" },
        ].map((j, i) => (
          <div key={i} style={{ background: "white", borderRadius: 14, padding: "14px", marginBottom: 10, boxShadow: "0 1px 6px rgba(11,31,58,0.07)", border: j.urgent ? "1.5px solid rgba(232,103,26,0.30)" : "1px solid rgba(11,31,58,0.07)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: "#0B1F3A" }}>{j.svc}</span>
                  {j.urgent && <span style={{ fontSize: 9, fontWeight: 700, color: "#E8671A", background: "rgba(232,103,26,0.12)", padding: "2px 6px", borderRadius: 100, textTransform: "uppercase", letterSpacing: 0.5 }}>Urgent</span>}
                </div>
                <div style={{ fontSize: 11, color: "#6B82A0", marginTop: 2 }}>{j.prop} · {j.unit}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 14, fontWeight: 900, color: "#1DB87A", fontFamily: "var(--fd)" }}>{j.est}</div>
                <div style={{ fontSize: 9, color: "#6B82A0", marginTop: 1 }}>est. payout</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, fontSize: 10, color: "#6B82A0", marginBottom: 10 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 3 }}><span style={{ width: 10, height: 10, display: "flex" }}>{I.map}</span>{j.dist}</span>
              <span style={{ display: "flex", alignItems: "center", gap: 3 }}><span style={{ width: 10, height: 10, display: "flex" }}>{I.clock}</span>{j.date}</span>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ flex: 1, background: "#E8671A", borderRadius: 8, padding: "8px", textAlign: "center", color: "white", fontSize: 12, fontWeight: 700 }}>Accept Job</div>
              <div style={{ padding: "8px 14px", borderRadius: 8, border: "1px solid rgba(11,31,58,0.12)", color: "#6B82A0", fontSize: 12, fontWeight: 600 }}>Details</div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav items={[[I.home,"Home"],[I.jobs,"Jobs"],[I.earn,"Earnings"],[I.team,"Team"]]} active={1} />
    </div>
  );
}

// ── SCREEN: JOB COMPLETION ────────────────────────────────────────
function JobCompleteScreen() {
  return (
    <div style={{ background: "#F5F7FA", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "white", padding: "14px 16px", borderBottom: "1px solid rgba(11,31,58,0.08)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: "#0B1F3A", fontFamily: "var(--fd)" }}>Complete Job</div>
            <div style={{ fontSize: 11, color: "#6B82A0", marginTop: 2 }}>Turnover Cleaning · B-302</div>
          </div>
          <div style={{ fontSize: 16, fontWeight: 900, color: "#E8671A", fontFamily: "var(--fd)" }}>$285</div>
        </div>
      </div>
      <div style={{ padding: "14px", flex: 1, overflowY: "auto" }}>
        <div style={{ background: "white", borderRadius: 14, padding: "14px", marginBottom: 12, boxShadow: "0 1px 6px rgba(11,31,58,0.07)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A", marginBottom: 10 }}>Completion Checklist</div>
          {[
            { l: "Kitchen & dining area cleaned", done: true },
            { l: "Bathrooms sanitized", done: true },
            { l: "Floors vacuumed & mopped", done: true },
            { l: "Windows & mirrors wiped", done: false },
            { l: "Final walkthrough photos", done: false },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: i < 4 ? "1px solid rgba(11,31,58,0.06)" : "none" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: s.done ? "#1DB87A" : "rgba(11,31,58,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {s.done ? <div style={{ color: "white", width: 10, height: 10 }}>{I.check}</div> : <div style={{ width: 8, height: 8, borderRadius: "50%", border: "1.5px solid #6B82A0" }} />}
              </div>
              <span style={{ fontSize: 12, color: s.done ? "#0B1F3A" : "#6B82A0", fontWeight: s.done ? 600 : 400 }}>{s.l}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "white", borderRadius: 14, padding: "14px", marginBottom: 12, boxShadow: "0 1px 6px rgba(11,31,58,0.07)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A", marginBottom: 8 }}>Completion Photos</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
            {[1, 2].map(n => (
              <div key={n} style={{ aspectRatio: "1", background: "#E8671A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", opacity: 0.9 }}>
                <div style={{ color: "rgba(255,255,255,0.7)", width: 18, height: 18 }}>{I.cam}</div>
              </div>
            ))}
            <div style={{ aspectRatio: "1", background: "#F5F7FA", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", border: "1.5px dashed rgba(11,31,58,0.20)" }}>
              <div style={{ color: "#6B82A0", width: 18, height: 18 }}>{I.plus}</div>
            </div>
          </div>
        </div>
        <div style={{ background: "white", borderRadius: 14, padding: "14px", marginBottom: 12, boxShadow: "0 1px 6px rgba(11,31,58,0.07)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A", marginBottom: 8 }}>Completion Notes</div>
          <div style={{ background: "#F5F7FA", borderRadius: 8, padding: "10px 12px", fontSize: 12, color: "#6B82A0", border: "1.5px solid rgba(11,31,58,0.08)", lineHeight: 1.5 }}>
            All rooms cleaned and documented. Bathroom caulking needs attention — flagged for PM review.
          </div>
        </div>
        <div style={{ background: "#E8671A", borderRadius: 12, padding: "14px", textAlign: "center", color: "white", fontSize: 14, fontWeight: 800, fontFamily: "var(--fd)", boxShadow: "0 4px 16px rgba(232,103,26,0.30)" }}>
          Submit & Complete Job · $285
        </div>
      </div>
    </div>
  );
}

// ── SCREEN: VENDOR EARNINGS ──────────────────────────────────────
function VendorEarningsScreen() {
  return (
    <div style={{ background: "#F5F7FA", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#0B1F3A", padding: "16px 18px 20px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 120, height: 120, borderRadius: "50%", background: "rgba(29,184,122,0.12)" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>June 2025 Earnings</div>
          <div style={{ fontSize: 32, fontWeight: 900, color: "white", fontFamily: "var(--fd)", marginTop: 4, letterSpacing: -1 }}>$3,240</div>
          <div style={{ fontSize: 12, color: "rgba(29,184,122,0.9)", fontWeight: 600, marginTop: 4 }}>+12% vs last month</div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16, position: "relative", zIndex: 1 }}>
          {[["$28,450","All-Time"],["47","Jobs Done"],["$289","Avg/Job"]].map(([v,l])=>(
            <div key={l} style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--fd)", fontSize: 15, fontWeight: 900, color: "white" }}>{v}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", marginTop: 2, fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "14px 14px 0" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A", fontFamily: "var(--fd)", marginBottom: 10 }}>Monthly Trend</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 70, paddingBottom: 4 }}>
          {[{ m:"Jan",v:1840 },{ m:"Feb",v:2100 },{ m:"Mar",v:1650 },{ m:"Apr",v:2800 },{ m:"May",v:2400 },{ m:"Jun",v:3240 }].map((d,i,a) => (
            <div key={d.m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
              <div style={{ width: "100%", background: i === a.length-1 ? "#E8671A" : "#0B1F3A", opacity: i === a.length-1 ? 1 : 0.2, borderRadius: "4px 4px 0 0", height: `${(d.v / 3240) * 50}px`, minHeight: 4 }} />
              <div style={{ fontSize: 9, color: i === a.length-1 ? "#E8671A" : "#6B82A0", fontWeight: i === a.length-1 ? 700 : 400 }}>{d.m}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 14px 0", flex: 1 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A", fontFamily: "var(--fd)", marginBottom: 8 }}>Recent Payouts</div>
        {[
          { svc: "HVAC", prop: "Hillcrest Apts", date: "Jun 25", amt: "$450", status: "Paid" },
          { svc: "Carpet Cleaning", prop: "Bayview Office", date: "Jun 22", amt: "$220", status: "Paid" },
          { svc: "Turnover", prop: "Riverside", date: "Jun 18", amt: "$285", status: "Paid" },
        ].map((p, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: i < 2 ? "1px solid rgba(11,31,58,0.06)" : "none" }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A" }}>{p.svc} — {p.prop}</div>
              <div style={{ fontSize: 10, color: "#6B82A0", marginTop: 2 }}>{p.date}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#0B1F3A", fontFamily: "var(--fd)" }}>{p.amt}</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: "#1DB87A" }}>{p.status}</div>
            </div>
          </div>
        ))}
      </div>
      <BottomNav items={[[I.home,"Home"],[I.jobs,"Jobs"],[I.earn,"Earnings"],[I.team,"Team"]]} active={2} />
    </div>
  );
}

// ── SCREEN: MANAGER DASHBOARD ────────────────────────────────────
function ManagerDashScreen() {
  return (
    <div style={{ background: "#F5F7FA", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "#0B1F3A", padding: "16px 16px 18px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 130, height: 130, borderRadius: "50%", background: "rgba(45,125,210,0.10)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Portfolio Overview</div>
            <div style={{ fontSize: 17, fontWeight: 900, color: "white", fontFamily: "var(--fd)", marginTop: 2 }}>Hillcrest Group</div>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)" }}>{I.bell}</div>
            <div style={{ position: "absolute", top: -2, right: -2, width: 14, height: 14, background: "#E8671A", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: "white" }}>5</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 14, position: "relative", zIndex: 1 }}>
          {[["7","Open Requests"],["4","Properties"],["$3.2K","MTD Spend"]].map(([v,l])=>(
            <div key={l} style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--fd)", fontSize: 17, fontWeight: 900, color: "white" }}>{v}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.45)", marginTop: 2, fontWeight: 600, lineHeight: 1.3 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 12px 0", flex: 1, overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A", fontFamily: "var(--fd)" }}>Active Requests</div>
          <div style={{ fontSize: 11, color: "#E8671A", fontWeight: 700 }}>View All</div>
        </div>
        {[
          { svc:"Turnover Cleaning",  prop:"Hillcrest · B-302", status:"In Progress", statusC:"#E8671A", amt:"$285" },
          { svc:"Emergency Restore",  prop:"Palmetto · U-7",    status:"Assigned",     statusC:"#2D7DD2", amt:"$1,200" },
          { svc:"Plumbing",           prop:"Riverside · A-104", status:"Scheduled",    statusC:"#2D7DD2", amt:"$190" },
          { svc:"Daily Janitorial",   prop:"Bayview · Fl 1-3",  status:"Pending",      statusC:"#6B82A0", amt:"$320" },
        ].map((r, i) => (
          <div key={i} style={{ background: "white", borderRadius: 12, padding: "11px 13px", marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 6px rgba(11,31,58,0.07)" }}>
            <div style={{ flex: 1, paddingRight: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A" }}>{r.svc}</div>
              <div style={{ fontSize: 10, color: "#6B82A0", marginTop: 2 }}>{r.prop}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: r.statusC }}>{r.status}</div>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#0B1F3A", fontFamily: "var(--fd)", marginTop: 2 }}>{r.amt}</div>
            </div>
          </div>
        ))}
        <div style={{ background: "#E8671A", borderRadius: 12, padding: "13px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12, boxShadow: "0 4px 16px rgba(232,103,26,0.30)" }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "white", fontFamily: "var(--fd)" }}>New Service Request</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>Submit in under 60 seconds</div>
          </div>
          <div style={{ color: "white", width: 20, height: 20 }}>{I.plus}</div>
        </div>
      </div>
      <BottomNav items={[[I.home,"Home"],[I.build,"Properties"],[I.list,"Requests"],[I.chart,"Analytics"],[I.settings,"Settings"]]} active={0} />
    </div>
  );
}

// ── SCREEN: MANAGER NEW REQUEST ──────────────────────────────────
function NewRequestScreen() {
  return (
    <div style={{ background: "#F5F7FA", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "white", padding: "14px 16px", borderBottom: "1px solid rgba(11,31,58,0.08)" }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#0B1F3A", fontFamily: "var(--fd)" }}>New Service Request</div>
        <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
          {["Service","Schedule","Notes"].map((s, i) => (
            <div key={s} style={{ flex: 1, textAlign: "center" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: i < 2 ? "#E8671A" : "rgba(11,31,58,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: i < 2 ? "white" : "#6B82A0", margin: "0 auto 4px" }}>
                {i < 2 ? <div style={{ color: "white", width: 10, height: 10 }}>{I.check}</div> : "3"}
              </div>
              <div style={{ fontSize: 9, color: i < 2 ? "#0B1F3A" : "#6B82A0", fontWeight: 600 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "14px", flex: 1, overflowY: "auto" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "#6B82A0", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Special Instructions</div>
        <div style={{ background: "white", borderRadius: 12, padding: "12px 14px", marginBottom: 14, border: "1.5px solid rgba(11,31,58,0.10)", minHeight: 70, fontSize: 12, color: "#6B82A0", lineHeight: 1.5 }}>
          Access code is #4421. Park in visitor spots. Tenant has a dog — please keep door closed.
        </div>
        <div style={{ background: "white", borderRadius: 12, padding: "14px", marginBottom: 14, boxShadow: "0 1px 6px rgba(11,31,58,0.07)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A", marginBottom: 10 }}>Request Summary</div>
          {[["Service","Turnover Cleaning"],["Property","Hillcrest Apartments"],["Unit","B-302"],["Date","Jul 3, 2025"],["Priority","High"]].map(([k,v])=>(
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: "1px solid rgba(11,31,58,0.06)", fontSize: 11 }}>
              <span style={{ color: "#6B82A0" }}>{k}</span>
              <span style={{ fontWeight: 700, color: "#0B1F3A" }}>{v}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(232,103,26,0.12)", borderRadius: 10, padding: "10px 12px", marginBottom: 14, border: "1px solid rgba(232,103,26,0.25)", fontSize: 11, color: "#0B1F3A", lineHeight: 1.55 }}>
          By submitting, you authorize 1Stop to assign a certified vendor. Real-time updates will be sent to your phone.
        </div>
        <div style={{ background: "#E8671A", borderRadius: 12, padding: "13px", textAlign: "center", color: "white", fontSize: 14, fontWeight: 800, fontFamily: "var(--fd)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 16px rgba(232,103,26,0.30)" }}>
          <div style={{ color: "white", width: 16, height: 16 }}>{I.check}</div>
          Submit Request
        </div>
      </div>
    </div>
  );
}

// ── SCREEN: MANAGER ANALYTICS ────────────────────────────────────
function ManagerAnalyticsScreen() {
  return (
    <div style={{ background: "#F5F7FA", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "white", padding: "14px 16px", borderBottom: "1px solid rgba(11,31,58,0.08)" }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: "#0B1F3A", fontFamily: "var(--fd)" }}>Spend Analytics</div>
        <div style={{ fontSize: 11, color: "#6B82A0", marginTop: 2 }}>Jan – Jun 2025</div>
      </div>
      <div style={{ padding: "14px", flex: 1, overflowY: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
          {[["$14,030","Total YTD","#E8671A"],["$3,240","This Month","#1DB87A"],["$289","Avg/Job","#0B1F3A"],["$19.81","Per Unit/Mo","#2D7DD2"]].map(([v,l,c])=>(
            <div key={l} style={{ background: "white", borderRadius: 12, padding: "12px", boxShadow: "0 1px 4px rgba(11,31,58,0.06)", borderTop: `3px solid ${c}` }}>
              <div style={{ fontSize: 18, fontWeight: 900, color: c, fontFamily: "var(--fd)" }}>{v}</div>
              <div style={{ fontSize: 10, color: "#6B82A0", marginTop: 4, fontWeight: 600 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "white", borderRadius: 14, padding: "14px", marginBottom: 12, boxShadow: "0 1px 6px rgba(11,31,58,0.07)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A", marginBottom: 12 }}>By Service Type</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <svg width="90" height="90" viewBox="0 0 90 90" style={{ flexShrink: 0, transform: "rotate(-90deg)" }}>
              {(() => {
                const segs = [{pct:31,color:"#E8671A"},{pct:22,color:"#2D7DD2"},{pct:17,color:"#E8404A"},{pct:14,color:"#1DB87A"},{pct:16,color:"#6B82A0"}];
                const c = 2 * Math.PI * 32;
                let off = 0;
                return segs.map((s, i) => {
                  const el = <circle key={i} cx="45" cy="45" r="32" fill="none" stroke={s.color} strokeWidth="12" strokeDasharray={c} strokeDashoffset={c - (s.pct/100)*c} style={{ transform: `rotate(${(off/100)*360}deg)`, transformOrigin: '45px 45px' }} />;
                  off += s.pct;
                  return el;
                });
              })()}
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[["Turnover","31%","#E8671A"],["HVAC","22%","#2D7DD2"],["Restoration","17%","#E8404A"],["Plumbing","14%","#1DB87A"],["Other","16%","#6B82A0"]].map(([l,v,c])=>(
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: c, flexShrink: 0 }} />
                  <span style={{ color: "#0B1F3A", fontWeight: 500 }}>{l}</span>
                  <span style={{ color: "#6B82A0", fontWeight: 700, marginLeft: "auto" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ background: "white", borderRadius: 14, padding: "14px", boxShadow: "0 1px 6px rgba(11,31,58,0.07)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A", marginBottom: 10 }}>Top Properties</div>
          {[
            { n: "Hillcrest Apartments", spend: "$6,420", jobs: 11 },
            { n: "Riverside Commons", spend: "$3,890", jobs: 7 },
            { n: "Bayview Office", spend: "$2,100", jobs: 3 },
          ].map((p, i) => (
            <div key={p.n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 0", borderBottom: i < 2 ? "1px solid rgba(11,31,58,0.06)" : "none" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#0B1F3A" }}>{p.n}</div>
                <div style={{ fontSize: 10, color: "#6B82A0", marginTop: 1 }}>{p.jobs} jobs</div>
              </div>
              <div style={{ fontSize: 14, fontWeight: 800, color: "#E8671A", fontFamily: "var(--fd)" }}>{p.spend}</div>
            </div>
          ))}
        </div>
      </div>
      <BottomNav items={[[I.home,"Home"],[I.build,"Properties"],[I.list,"Requests"],[I.chart,"Analytics"],[I.settings,"Settings"]]} active={3} />
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────
export default function App() {
  const [role, setRole] = useState("vendor");
  const [screen, setScreen] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const vendorScreens = [
    { label: "Vendor Dashboard", comp: <VendorDashScreen />, device: "iphone" },
    { label: "Available Jobs Board", comp: <AvailJobsScreen />, device: "android" },
    { label: "Job Completion Flow", comp: <JobCompleteScreen />, device: "iphone" },
    { label: "Vendor Earnings", comp: <VendorEarningsScreen />, device: "android" },
  ];
  const managerScreens = [
    { label: "Manager Dashboard", comp: <ManagerDashScreen />, device: "android" },
    { label: "New Request (Step 3)", comp: <NewRequestScreen />, device: "iphone" },
    { label: "Spend Analytics", comp: <ManagerAnalyticsScreen />, device: "iphone" },
  ];
  const screens = role === "vendor" ? vendorScreens : managerScreens;

  const prevScreen = () => setScreen(s => s > 0 ? s - 1 : screens.length - 1);
  const nextScreen = () => setScreen(s => s < screens.length - 1 ? s + 1 : 0);

  const features = {
    vendor: {
      0: ["Live active job with one-tap navigation and completion","Real-time earnings and performance at a glance","Push notifications for new job offers","Team status and schedule overview"],
      1: ["Real-time job board with distance and urgency filtering","30-minute lock window — no double-booking","One-tap job acceptance with instant calendar sync","Estimated payout shown before accepting"],
      2: ["Step-by-step completion checklist","Native camera integration for photo documentation","Completion notes with flag-for-manager feature","Instant invoice generation on submission"],
      3: ["Monthly earnings trend with bar chart","Payout history with status tracking","Job count and average revenue metrics","All-time revenue breakdown"],
    },
    manager: {
      0: ["Full portfolio status at a glance","Real-time request tracking with vendor location","One-tap new request from home screen","Spend tracking and invoice notifications"],
      1: ["3-step guided wizard optimized for mobile","Pre-filled property and unit data","Priority selection with urgency indicators","Instant vendor dispatch notification"],
      2: ["Interactive spend analytics with donut chart","Property-level cost breakdown","Service category distribution","Year-to-date and monthly trend data"],
    },
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{ minHeight: "100vh", background: "var(--page-bg)", fontFamily: "var(--fb)" }}>
        {/* Header */}
        <div style={{ background: "#0B1F3A" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px,4vw,60px)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, background: "#E8671A", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ color: "white", width: 20, height: 20 }}>{I.shield}</div>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--fd)", fontSize: 20, fontWeight: 900, color: "white" }}><span style={{ color: "#E8671A" }}>1STOP</span> SERVICE PRO</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: 1.5, textTransform: "uppercase" }}>Mobile App Concept</div>
                </div>
              </div>
              <button onClick={() => setDarkMode(d => !d)} style={{ width: 38, height: 38, borderRadius: 10, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.7)", transition: "all 0.2s" }}>
                <span style={{ width: 18, height: 18, display: "flex" }}>{darkMode ? I.sun : I.moon}</span>
              </button>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px clamp(16px,4vw,60px)" }}>
          {/* Intro */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
              <div style={{ background: "#E8671A", borderRadius: 100, padding: "7px 16px", fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: "white", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 16px rgba(232,103,26,0.40)" }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "rgba(255,255,255,0.9)" }} />
                Mobile Apps
              </div>
              <div style={{ background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(11,31,58,0.06)", border: `1px solid ${darkMode ? "rgba(255,255,255,0.08)" : "rgba(11,31,58,0.12)"}`, borderRadius: 100, padding: "7px 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: "var(--muted)" }}>
                iOS + Android Concept
              </div>
            </div>
            <h1 className="intro-heading" style={{ fontFamily: "var(--fd)", fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "var(--navy)", letterSpacing: -1, lineHeight: 1.1, marginBottom: 14 }}>
              Native apps for every<br />
              <span style={{ color: "#E8671A" }}>person on the platform.</span>
            </h1>
            <p className="intro-subtext" style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
              Two purpose-built apps — one for vendors in the field, one for managers on the go. Real-time updates,
              job acceptance, photo documentation, and request submission — all native mobile experiences.
            </p>
          </div>

          {/* Role toggle */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 44 }}>
            <div className="role-toggle" style={{ display: "flex", background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 5, gap: 4, boxShadow: "0 2px 10px rgba(11,31,58,0.08)" }}>
              {["vendor","manager"].map(r => (
                <button key={r} onClick={() => { setRole(r); setScreen(0); }} style={{ padding: "10px 28px", borderRadius: 10, border: "none", cursor: "pointer", fontFamily: "var(--fb)", fontSize: 14, fontWeight: 700, transition: "all 0.2s", background: role === r ? "#0B1F3A" : "transparent", color: role === r ? "white" : "var(--muted)" }}>
                  {r === "vendor" ? "Vendor App" : "Manager App"}
                </button>
              ))}
            </div>
          </div>

          {/* Screen pills */}
          <div className="screen-pills" style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 44, flexWrap: "wrap", padding: "0 8px" }}>
            {screens.map((s, i) => (
              <button key={i} onClick={() => setScreen(i)} style={{ padding: "8px 20px", borderRadius: 100, border: `1.5px solid ${screen === i ? "#E8671A" : "var(--border)"}`, background: screen === i ? "rgba(232,103,26,0.12)" : "var(--card)", color: screen === i ? "#E8671A" : "var(--muted)", fontFamily: "var(--fb)", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Phone + features */}
          <div className="phone-features-row" style={{ marginBottom: 64 }}>
            <div className="phone-nav-row">
              <button className="nav-arrow" onClick={prevScreen}>
                <span style={{ width: 18, height: 18, display: "flex" }}>{I.left}</span>
              </button>
              <div className="phone-scale-wrap">
                <div className="a-up" key={`${role}-${screen}`}>
                  <Phone type={screens[screen].device} label={screens[screen].label}>
                    {screens[screen].comp}
                  </Phone>
                </div>
              </div>
              <button className="nav-arrow" onClick={nextScreen}>
                <span style={{ width: 18, height: 18, display: "flex" }}>{I.right}</span>
              </button>
            </div>

            <div className="features-panel a-up d2" key={`feat-${role}-${screen}`}>
              <div style={{ background: "var(--card)", borderRadius: 24, border: "1px solid var(--border)", padding: "28px 24px", boxShadow: "0 4px 24px rgba(11,31,58,0.07)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: role === "vendor" ? "#E8671A" : "#0B1F3A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ color: "white", width: 14, height: 14 }}>{role === "vendor" ? I.jobs : I.build}</div>
                  </div>
                  <div className="feat-title" style={{ fontFamily: "var(--fd)", fontSize: 15, fontWeight: 800, color: "var(--navy)" }}>{screens[screen].label}</div>
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 20, lineHeight: 1.5 }}>
                  {role === "vendor" ? "Built for vendors in the field — fast actions, minimal taps." : "Built for property managers on the go — full portfolio control."}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {(features[role][screen] || []).map(f => (
                    <div className="feat-item" key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, color: "var(--navy)" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "rgba(29,184,122,0.12)", border: "1px solid rgba(29,184,122,0.30)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <div style={{ color: "#1DB87A", width: 9, height: 9 }}>{I.check}</div>
                      </div>
                      <span style={{ lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16 }}>
                {screens.map((_, i) => (
                  <div key={i} onClick={() => setScreen(i)} style={{ width: screen === i ? 24 : 8, height: 8, borderRadius: 100, background: screen === i ? "#E8671A" : "var(--border)", cursor: "pointer", transition: "all 0.25s" }} />
                ))}
              </div>
            </div>
          </div>

          {/* Feature overview */}
          <div style={{ background: "var(--card)", borderRadius: 24, border: "1px solid var(--border)", padding: "clamp(28px,4vw,44px)", marginBottom: 40, boxShadow: "0 4px 24px rgba(11,31,58,0.07)" }}>
            <div style={{ textAlign: "center", marginBottom: 36 }}>
              <div style={{ fontFamily: "var(--fd)", fontSize: "clamp(22px,3vw,30px)", fontWeight: 900, color: "var(--navy)", marginBottom: 8 }}>Full App Feature Overview</div>
              <div style={{ fontSize: 14, color: "var(--muted)" }}>What both apps ship with at launch</div>
            </div>
            <div className="feature-overview-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
              {[
                { title: "Vendor App", sub: "iOS + Android", color: "#E8671A", features: ["Dashboard with live job status","Available Jobs Board (real-time)","Job acceptance & scheduling","Step-by-step completion workflow","Native photo documentation","GPS navigation integration","Earnings & payout history","Team member management","Performance ratings & reviews","Push notifications for new jobs","Offline mode for job details","SMS-based authentication"] },
                { title: "Manager App", sub: "iOS + Android", color: "#0B1F3A", features: ["Portfolio dashboard overview","Submit requests in under 60s","Real-time job tracking","Vendor location & ETA","Photo review on completion","Invoice review & approval","Multi-property management","Push notifications & alerts","Spend analytics by property","Vendor rating & feedback","Emergency request (high priority)","Face ID / biometric login"] },
              ].map(app => (
                <div key={app.title} style={{ border: `1.5px solid ${app.color}30`, borderRadius: 16, padding: "24px 22px", background: `${app.color}06` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                    <div style={{ width: 40, height: 40, background: app.color, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ color: "white", width: 20, height: 20 }}>{app.title.includes("Vendor") ? I.jobs : I.build}</div>
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--fd)", fontSize: 16, fontWeight: 800, color: "var(--navy)" }}>{app.title}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>{app.sub}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    {app.features.map(f => (
                      <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--navy)" }}>
                        <div style={{ width: 16, height: 16, borderRadius: "50%", background: `${app.color}18`, border: `1px solid ${app.color}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <div style={{ color: app.color, width: 8, height: 8 }}>{I.check}</div>
                        </div>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech stack */}
          <div style={{ background: "#0B1F3A", borderRadius: 20, padding: "28px 32px", color: "white" }}>
            <div style={{ fontFamily: "var(--fd)", fontSize: 18, fontWeight: 800, marginBottom: 8 }}>Recommended Build Stack</div>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.60)", lineHeight: 1.65, marginBottom: 18 }}>
              Single codebase for both iOS and Android. Reuses 95% of the web platform's business logic and API layer.
            </div>
            <div className="tech-pills" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["React Native","Expo","TypeScript","React Navigation","Push Notifications (Expo)","Stripe Mobile SDK","Google Maps SDK","Camera Roll API","Biometrics / Face ID","AsyncStorage","Socket.io (real-time)","Node.js / Express API"].map(t=>(
                <span key={t} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 100, padding: "5px 14px", fontSize: 12, fontWeight: 600 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
