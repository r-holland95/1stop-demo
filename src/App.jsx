import { useState, useEffect, useRef } from "react";

/* =====================================================================
   1STOP SERVICE PRO — Complete Platform
   Design: Clean enterprise light-mode. Figtree display, Manrope body.
   Navy #0B1F3A, Orange #E8671A, White #FFFFFF base.
   Direct portal access — no login required for preview.
   Fully responsive: 320px → 2560px+
===================================================================== */

// ─────────────────────────────────────────────────────────────────────
// GLOBAL CSS
// ─────────────────────────────────────────────────────────────────────
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&family=Manrope:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --navy:      #0B1F3A;
      --navy-2:    #0F2847;
      --navy-3:    #16325A;
      --orange:    #E8671A;
      --orange-2:  #F07830;
      --orange-lo: rgba(232, 103, 26, 0.10);
      --orange-md: rgba(232, 103, 26, 0.22);
      --white:     #FFFFFF;
      --bg:        #F6F8FB;
      --bg-2:      #EDF1F7;
      --card:      #FFFFFF;
      --ink:       #0B1F3A;
      --ink-2:     #1E3A5F;
      --body:      #374B65;
      --muted:     #6B82A0;
      --subtle:    #A8BBD0;
      --border:    rgba(11, 31, 58, 0.10);
      --border-2:  rgba(11, 31, 58, 0.18);
      --green:     #1DB87A;
      --green-lo:  rgba(29, 184, 122, 0.10);
      --red:       #E8404A;
      --red-lo:    rgba(232, 64, 74, 0.10);
      --blue:      #2D7DD2;
      --blue-lo:   rgba(45, 125, 210, 0.10);
      --shadow-sm: 0 1px 4px rgba(11,31,58,0.08), 0 1px 2px rgba(11,31,58,0.04);
      --shadow:    0 4px 16px rgba(11,31,58,0.10), 0 1px 4px rgba(11,31,58,0.06);
      --shadow-lg: 0 12px 40px rgba(11,31,58,0.14), 0 4px 12px rgba(11,31,58,0.08);
      --shadow-xl: 0 24px 64px rgba(11,31,58,0.16);
      --r-sm: 6px; --r: 10px; --r-md: 14px; --r-lg: 18px; --r-xl: 24px; --r-2xl: 32px;
      --nav-h: 64px;
      --side-w: 236px;
      --t: 0.18s cubic-bezier(0.4, 0, 0.2, 1);
      --font-d: 'Figtree', sans-serif;
      --font-b: 'Manrope', sans-serif;
      --font-m: 'JetBrains Mono', monospace;
      --max: 1200px;
      --gutter: clamp(16px, 4vw, 60px);
    }

    html { font-size: 16px; scroll-behavior: smooth; }
    body {
      font-family: var(--font-b);
      background: var(--bg);
      color: var(--body);
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--border-2); border-radius: 4px; }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes slideIn  { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:none; } }
    @keyframes spin     { to { transform:rotate(360deg); } }
    @keyframes ticker   { from { transform:translateX(0); } to { transform:translateX(-50%); } }
    @keyframes glow     { 0%,100% { box-shadow:0 0 0 0 rgba(232,103,26,0); } 50% { box-shadow:0 0 0 6px rgba(232,103,26,0.15); } }
    @keyframes popIn    { 0% { opacity:0; transform:scale(.94) translateY(8px); } 100% { opacity:1; transform:none; } }

    .a-up   { animation: fadeUp  0.45s cubic-bezier(0.4,0,0.2,1) both; }
    .a-in   { animation: fadeIn  0.3s ease both; }
    .a-slide{ animation: slideIn 0.3s ease both; }
    .d1 { animation-delay: 0.06s; } .d2 { animation-delay: 0.12s; }
    .d3 { animation-delay: 0.18s; } .d4 { animation-delay: 0.24s; }
    .d5 { animation-delay: 0.30s; } .d6 { animation-delay: 0.36s; }

    /* ── LAYOUT ── */
    .wrap { max-width: var(--max); margin: 0 auto; padding: 0 var(--gutter); width: 100%; }
    .portal-shell { display: flex; min-height: 100vh; padding-top: var(--nav-h); }
    .portal-main  { margin-left: var(--side-w); flex: 1; padding: clamp(20px,3vw,40px) clamp(16px,3vw,40px); min-width: 0; background: var(--bg); }

    /* ── GRID ── */
    .g2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
    .g3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
    .g4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
    .ga { display: grid; grid-template-columns: 1fr 360px; gap: 20px; }
    .ga-wide { display: grid; grid-template-columns: 1fr 340px; gap: 20px; }

    /* ── NAV ── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      height: var(--nav-h);
      background: var(--white);
      border-bottom: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
      display: flex; align-items: center;
    }
    .nav-inner {
      display: flex; align-items: center; justify-content: space-between;
      width: 100%; max-width: 1440px; margin: 0 auto;
      padding: 0 clamp(16px, 3vw, 48px);
    }
    .nav-logo { display: flex; align-items: center; gap: 10px; cursor: pointer; text-decoration: none; flex-shrink: 0; }
    .nav-logo-mark {
      width: 36px; height: 36px; background: var(--orange); border-radius: 9px;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .nav-logo-mark svg { width: 20px; height: 20px; fill: white; }
    .nav-logo-text { font-family: var(--font-d); font-size: 17px; font-weight: 800; color: var(--navy); line-height: 1; }
    .nav-logo-text span { color: var(--orange); }
    .nav-logo-sub { font-size: 9px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-top: 2px; display: block; }
    .nav-links { display: flex; align-items: center; gap: 4px; }
    .nav-link { padding: 8px 14px; border-radius: var(--r); font-size: 13.5px; font-weight: 500; color: var(--body); cursor: pointer; transition: all var(--t); border: none; background: none; white-space: nowrap; }
    .nav-link:hover { background: var(--bg); color: var(--navy); }
    .nav-link.active { background: var(--orange-lo); color: var(--orange); font-weight: 600; }
    .nav-cta { display: flex; align-items: center; gap: 8px; }
    .nav-portal-label { font-size: 12px; font-weight: 600; color: var(--muted); letter-spacing: 0.3px; padding-right: 8px; border-right: 1px solid var(--border); margin-right: 4px; white-space: nowrap; }
    .nav-hamburger { display: none; flex-direction: column; gap: 4px; cursor: pointer; padding: 8px; border-radius: var(--r-sm); border: none; background: none; }
    .nav-hamburger span { display: block; width: 20px; height: 2px; background: var(--navy); border-radius: 2px; transition: all var(--t); }

    /* ── BUTTONS ── */
    .btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 7px;
      padding: 10px 22px; border-radius: var(--r); border: none; cursor: pointer;
      font-family: var(--font-b); font-size: 13.5px; font-weight: 600;
      transition: all var(--t); white-space: nowrap; position: relative; line-height: 1;
      text-decoration: none;
    }
    .btn svg { width: 15px; height: 15px; flex-shrink: 0; }
    .btn-primary { background: var(--orange); color: white; }
    .btn-primary:hover { background: var(--orange-2); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(232,103,26,0.30); }
    .btn-primary:active { transform: none; box-shadow: none; }
    .btn-navy { background: var(--navy); color: white; }
    .btn-navy:hover { background: var(--navy-2); transform: translateY(-1px); box-shadow: 0 6px 20px rgba(11,31,58,0.25); }
    .btn-outline { background: transparent; color: var(--navy); border: 1.5px solid var(--border-2); }
    .btn-outline:hover { background: var(--bg); border-color: var(--navy); }
    .btn-outline-orange { background: transparent; color: var(--orange); border: 1.5px solid var(--orange-md); }
    .btn-outline-orange:hover { background: var(--orange-lo); border-color: var(--orange); }
    .btn-ghost { background: transparent; color: var(--body); }
    .btn-ghost:hover { background: var(--bg); color: var(--navy); }
    .btn-ghost-white { background: rgba(255,255,255,0.12); color: white; border: 1px solid rgba(255,255,255,0.25); }
    .btn-ghost-white:hover { background: rgba(255,255,255,0.20); }
    .btn-danger { background: var(--red-lo); color: var(--red); border: 1px solid rgba(232,64,74,0.2); }
    .btn-danger:hover { background: rgba(232,64,74,0.15); }
    .btn-sm { padding: 7px 14px; font-size: 12.5px; border-radius: var(--r-sm); }
    .btn-lg { padding: 13px 30px; font-size: 15px; border-radius: var(--r-md); }
    .btn-xl { padding: 15px 36px; font-size: 16px; font-weight: 700; border-radius: var(--r-md); }
    .btn-full { width: 100%; }
    .btn:disabled { opacity: 0.45; cursor: not-allowed; transform: none !important; box-shadow: none !important; }
    .btn-loading { color: transparent !important; pointer-events: none; }
    .btn-loading::after {
      content: ''; position: absolute; width: 16px; height: 16px;
      border: 2.5px solid rgba(255,255,255,0.35); border-top-color: white;
      border-radius: 50%; animation: spin 0.65s linear infinite;
    }
    .btn-loading.btn-outline::after,
    .btn-loading.btn-ghost::after { border-color: rgba(11,31,58,0.2); border-top-color: var(--navy); }

    /* ── CARDS ── */
    .card {
      background: var(--card); border: 1px solid var(--border);
      border-radius: var(--r-lg); box-shadow: var(--shadow-sm);
    }
    .card-pad { padding: clamp(16px, 2.5vw, 24px); }
    .card-hover { transition: all var(--t); }
    .card-hover:hover { border-color: var(--border-2); box-shadow: var(--shadow); transform: translateY(-2px); }

    /* ── STAT TILES ── */
    .stat-grid { display: grid; gap: 14px; margin-bottom: 22px; }
    .sg4 { grid-template-columns: repeat(4, 1fr); }
    .sg3 { grid-template-columns: repeat(3, 1fr); }
    .sg2 { grid-template-columns: repeat(2, 1fr); }
    .tile {
      background: var(--card); border: 1px solid var(--border);
      border-radius: var(--r-lg); padding: clamp(16px, 2vw, 22px);
      box-shadow: var(--shadow-sm); position: relative; overflow: hidden;
      transition: border-color var(--t);
    }
    .tile:hover { border-color: var(--border-2); }
    .tile-accent { border-top: 3px solid var(--orange); }
    .tile-green  { border-top: 3px solid var(--green); }
    .tile-blue   { border-top: 3px solid var(--blue); }
    .tile-label  { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: var(--muted); margin-bottom: 10px; }
    .tile-value  { font-family: var(--font-d); font-size: clamp(26px, 4vw, 34px); font-weight: 800; color: var(--navy); line-height: 1; letter-spacing: -0.5px; }
    .tile-value.orange { color: var(--orange); }
    .tile-value.green  { color: var(--green); }
    .tile-delta  { font-size: 12px; color: var(--green); margin-top: 6px; font-weight: 500; display: flex; align-items: center; gap: 4px; }
    .tile-delta.neutral { color: var(--muted); }

    /* ── SIDEBAR ── */
    .sidebar {
      width: var(--side-w); position: fixed; top: var(--nav-h); left: 0; bottom: 0;
      background: var(--white); border-right: 1px solid var(--border);
      padding: 20px 12px 24px; display: flex; flex-direction: column;
      z-index: 500; overflow-y: auto;
    }
    .sidebar-section { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--subtle); padding: 0 10px; margin: 18px 0 6px; }
    .sidebar-item {
      display: flex; align-items: center; gap: 10px; padding: 9px 10px;
      border-radius: var(--r); font-size: 13.5px; font-weight: 500; color: var(--body);
      cursor: pointer; transition: all var(--t); border: 1px solid transparent;
      text-decoration: none;
    }
    .sidebar-item svg { width: 16px; height: 16px; flex-shrink: 0; opacity: 0.65; transition: opacity var(--t); }
    .sidebar-item:hover { background: var(--bg); color: var(--navy); }
    .sidebar-item:hover svg { opacity: 1; }
    .sidebar-item.active { background: var(--orange-lo); color: var(--orange); font-weight: 600; border-color: var(--orange-md); }
    .sidebar-item.active svg { opacity: 1; }
    .sidebar-badge { margin-left: auto; background: var(--orange); color: white; font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 100px; font-family: var(--font-m); }
    .sidebar-profile { margin-top: auto; padding: 12px; background: var(--bg); border-radius: var(--r-md); border: 1px solid var(--border); }
    .sp-name { font-size: 13px; font-weight: 600; color: var(--navy); }
    .sp-role { font-size: 11px; color: var(--muted); margin-top: 1px; }
    .sp-av { width: 32px; height: 32px; border-radius: 50%; background: var(--orange); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; font-family: var(--font-d); flex-shrink: 0; }

    /* ── PAGE HEADER ── */
    .ph { margin-bottom: 24px; }
    .ph-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
    .ph-title { font-family: var(--font-d); font-size: clamp(20px, 3vw, 26px); font-weight: 800; color: var(--navy); line-height: 1.15; }
    .ph-title b { color: var(--orange); }
    .ph-sub { font-size: 13px; color: var(--muted); margin-top: 4px; }
    .ph-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; flex-wrap: wrap; }

    /* ── CARD HEADER ── */
    .ch { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
    .ch-title { font-family: var(--font-d); font-size: 15px; font-weight: 700; color: var(--navy); }
    .ch-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }

    /* ── TABLE ── */
    .table-wrap { overflow-x: auto; -webkit-overflow-scrolling: touch; }
    .tbl { width: 100%; border-collapse: collapse; min-width: 480px; }
    .tbl thead th {
      text-align: left; padding: 11px 14px; font-size: 11px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.8px; color: var(--muted);
      background: var(--bg); border-bottom: 1px solid var(--border);
    }
    .tbl tbody td { padding: 13px 14px; font-size: 13px; color: var(--body); border-bottom: 1px solid var(--border); vertical-align: middle; }
    .tbl tbody tr:last-child td { border-bottom: none; }
    .tbl tbody tr { transition: background var(--t); }
    .tbl tbody tr:hover td { background: var(--bg); }
    .tbl td strong { color: var(--navy); font-weight: 600; }
    .mono { font-family: var(--font-m); font-size: 11.5px; color: var(--orange); }

    /* ── BADGES ── */
    .badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 9px; border-radius: 100px; font-size: 11.5px; font-weight: 600; white-space: nowrap; }
    .badge-dot::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; flex-shrink: 0; }
    .b-orange { background: var(--orange-lo); color: var(--orange); border: 1px solid var(--orange-md); }
    .b-green  { background: var(--green-lo);  color: var(--green);  border: 1px solid rgba(29,184,122,0.25); }
    .b-blue   { background: var(--blue-lo);   color: var(--blue);   border: 1px solid rgba(45,125,210,0.25); }
    .b-red    { background: var(--red-lo);    color: var(--red);    border: 1px solid rgba(232,64,74,0.25); }
    .b-gray   { background: var(--bg-2);      color: var(--muted);  border: 1px solid var(--border); }

    /* ── FORM ELEMENTS ── */
    .fg { display: flex; flex-direction: column; gap: 5px; }
    .fl { font-size: 11.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; color: var(--muted); }
    .fi {
      padding: 11px 14px; border: 1.5px solid var(--border-2); border-radius: var(--r);
      font-family: var(--font-b); font-size: 13.5px; color: var(--navy);
      background: var(--white); outline: none; transition: all var(--t); width: 100%;
    }
    .fi::placeholder { color: var(--subtle); }
    .fi:focus { border-color: var(--orange); box-shadow: 0 0 0 3px var(--orange-lo); }
    .fi:hover:not(:focus) { border-color: var(--muted); }
    select.fi { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B82A0' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 12px center; cursor: pointer; }
    textarea.fi { resize: vertical; min-height: 96px; }
    .fr { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
    .fr3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px; }
    .fstack { display: flex; flex-direction: column; gap: 16px; }

    /* ── DIVIDER ── */
    .divider { height: 1px; background: var(--border); margin: 18px 0; }

    /* ── TABS ── */
    .tabs-row { display: flex; gap: 2px; background: var(--bg-2); border: 1px solid var(--border); border-radius: var(--r-md); padding: 4px; width: fit-content; margin-bottom: 18px; flex-wrap: wrap; }
    .tab { padding: 7px 16px; border-radius: var(--r-sm); font-size: 13px; font-weight: 500; cursor: pointer; color: var(--body); transition: all var(--t); white-space: nowrap; }
    .tab:hover { color: var(--navy); }
    .tab.on { background: var(--white); color: var(--navy); font-weight: 600; box-shadow: var(--shadow-sm); }

    /* ── TOAST ── */
    .toast {
      position: fixed; bottom: 20px; right: 20px; z-index: 9999;
      padding: 13px 18px; border-radius: var(--r-md); background: var(--navy);
      color: white; display: flex; align-items: center; gap: 10px;
      font-size: 13.5px; font-weight: 500; box-shadow: var(--shadow-xl);
      animation: popIn 0.3s ease both; max-width: min(340px, calc(100vw - 40px));
    }
    .toast svg { width: 16px; height: 16px; flex-shrink: 0; }
    .toast.ok  { border-left: 4px solid var(--green); }
    .toast.err { border-left: 4px solid var(--red); }
    .toast.ok svg { color: var(--green); }
    .toast.err svg { color: var(--red); }

    /* ── MODAL ── */
    .overlay { position: fixed; inset: 0; z-index: 2000; background: rgba(11,31,58,0.55); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 16px; animation: fadeIn 0.2s ease both; }
    .modal { background: var(--white); border-radius: var(--r-xl); padding: clamp(24px,4vw,32px); width: 100%; max-width: 500px; max-height: 92vh; overflow-y: auto; box-shadow: var(--shadow-xl); animation: popIn 0.28s ease both; }
    .modal-head { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 22px; }
    .modal-title { font-family: var(--font-d); font-size: 20px; font-weight: 800; color: var(--navy); }
    .modal-x { width: 32px; height: 32px; border-radius: var(--r-sm); border: 1px solid var(--border); background: none; cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--muted); transition: all var(--t); flex-shrink: 0; }
    .modal-x:hover { background: var(--bg); color: var(--navy); }
    .modal-x svg { width: 14px; height: 14px; }

    /* ── TIMELINE ── */
    .tl { display: flex; flex-direction: column; }
    .tl-item { display: flex; gap: 12px; padding-bottom: 16px; position: relative; }
    .tl-item:not(:last-child)::before { content: ''; position: absolute; left: 8px; top: 18px; bottom: 0; width: 1px; background: var(--border); }
    .tl-dot { width: 18px; height: 18px; border-radius: 50%; border: 2px solid; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: var(--white); z-index: 1; }
    .tl-dot svg { width: 8px; height: 8px; }
    .tl-dot.orange { border-color: var(--orange); color: var(--orange); }
    .tl-dot.green  { border-color: var(--green); color: var(--green); }
    .tl-dot.gray   { border-color: var(--border-2); color: var(--subtle); }
    .tl-body { flex: 1; padding-top: 1px; }
    .tl-text { font-size: 13px; color: var(--body); line-height: 1.5; }
    .tl-time { font-size: 11px; color: var(--muted); margin-top: 2px; }

    /* ── PROGRESS ── */
    .prog { height: 4px; background: var(--bg-2); border-radius: 4px; overflow: hidden; }
    .prog-fill { height: 100%; background: var(--orange); border-radius: 4px; transition: width 0.6s ease; }
    .prog-fill.green { background: var(--green); }
    .prog-fill.blue  { background: var(--blue); }

    /* ── AVATAR ── */
    .av { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: var(--font-d); font-size: 12px; font-weight: 700; flex-shrink: 0; }
    .av-orange { background: var(--orange); color: white; }
    .av-navy   { background: var(--navy); color: white; }
    .av-green  { background: var(--green-lo); color: var(--green); border: 1px solid rgba(29,184,122,0.3); }
    .av-gray   { background: var(--bg-2); color: var(--muted); border: 1px solid var(--border); }

    /* ── JOB CARD ── */
    .jcard { background: var(--white); border: 1.5px solid var(--border); border-radius: var(--r-lg); padding: clamp(16px, 2vw, 22px); transition: all var(--t); position: relative; }
    .jcard:hover { border-color: var(--border-2); box-shadow: var(--shadow); }
    .jcard.active { border-color: var(--orange-md); background: linear-gradient(135deg, rgba(232,103,26,0.03) 0%, white 50%); }
    .jcard-live { position: absolute; top: 16px; right: 16px; display: flex; align-items: center; gap: 5px; }
    .live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--orange); animation: glow 2s ease-in-out infinite; }
    .jcard-meta { display: flex; gap: 16px; flex-wrap: wrap; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border); }
    .jcard-meta-item { font-size: 12px; color: var(--muted); display: flex; align-items: center; gap: 5px; font-family: var(--font-m); }
    .jcard-meta-item svg { width: 12px; height: 12px; }

    /* ── PROP CARD ── */
    .prop-card { background: var(--white); border: 1px solid var(--border); border-radius: var(--r-lg); padding: 20px; transition: all var(--t); }
    .prop-card:hover { border-color: var(--border-2); box-shadow: var(--shadow); }
    .prop-banner { height: 80px; border-radius: var(--r); background: var(--navy); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; overflow: hidden; position: relative; }
    .prop-banner-pattern { position: absolute; inset: 0; background-image: repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 8px); }
    .prop-banner-label { position: relative; font-family: var(--font-d); font-size: 22px; font-weight: 900; color: rgba(255,255,255,0.2); letter-spacing: 2px; }
    .prop-name { font-size: 14px; font-weight: 700; color: var(--navy); margin-bottom: 2px; }
    .prop-addr { font-size: 12px; color: var(--muted); margin-bottom: 12px; }
    .prop-stats { display: flex; gap: 16px; }
    .prop-stat { font-size: 12px; color: var(--body); }
    .prop-stat b { color: var(--navy); font-weight: 700; }

    /* ── STEP WIZARD ── */
    .wizard { display: flex; align-items: center; gap: 0; margin-bottom: 28px; overflow-x: auto; padding-bottom: 4px; }
    .ws { display: flex; align-items: center; }
    .ws-dot { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; font-family: var(--font-d); flex-shrink: 0; transition: all 0.25s ease; }
    .ws-dot.done { background: var(--green); color: white; }
    .ws-dot.on { background: var(--orange); color: white; box-shadow: 0 0 0 4px var(--orange-lo); }
    .ws-dot.off { background: var(--bg-2); color: var(--muted); border: 1.5px solid var(--border); }
    .ws-dot svg { width: 12px; height: 12px; }
    .ws-label { font-size: 12.5px; font-weight: 500; margin: 0 8px; white-space: nowrap; transition: color 0.2s; }
    .ws-label.on  { color: var(--navy); font-weight: 600; }
    .ws-label.off { color: var(--muted); }
    .ws-line { height: 2px; width: 24px; background: var(--border); flex-shrink: 0; transition: background 0.3s; }
    .ws-line.done { background: var(--green); }

    /* ── EMPTY STATE ── */
    .empty { text-align: center; padding: 48px 24px; }
    .empty svg { width: 40px; height: 40px; color: var(--subtle); margin: 0 auto 14px; display: block; }
    .empty-t { font-family: var(--font-d); font-size: 17px; font-weight: 700; color: var(--muted); margin-bottom: 6px; }
    .empty-s { font-size: 13px; color: var(--subtle); }

    /* ── LANDING — HERO ── */
    .hero {
      background: var(--navy);
      padding: clamp(80px,10vw,120px) var(--gutter) clamp(60px,8vw,100px);
      text-align: center; position: relative; overflow: hidden;
    }
    .hero-bg {
      position: absolute; inset: 0; pointer-events: none;
      background:
        radial-gradient(ellipse 80% 60% at 50% -10%, rgba(232,103,26,0.18) 0%, transparent 70%),
        radial-gradient(ellipse 50% 40% at 80% 100%, rgba(45,125,210,0.10) 0%, transparent 70%);
    }
    /* hero dots removed - clean dark background */
    .hero-inner { position: relative; z-index: 1; max-width: 860px; margin: 0 auto; }
    .hero-eyebrow { display: inline-flex; align-items: center; gap: 0; margin-bottom: 28px; }
    .hero-eyebrow-pill-l {
      background: var(--orange); border-radius: 100px; padding: 7px 16px;
      font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px;
      color: white; white-space: nowrap; display: flex; align-items: center; gap: 6px;
      box-shadow: 0 4px 16px rgba(232,103,26,0.45);
    }
    .hero-eyebrow-live { width: 7px; height: 7px; border-radius: 50%; background: rgba(255,255,255,0.9); animation: glow 2s infinite; flex-shrink: 0; }
    .hero-eyebrow-pill-r {
      background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.16);
      border-radius: 100px; padding: 7px 18px; margin-left: 6px;
      font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;
      color: rgba(255,255,255,0.75); white-space: nowrap;
    }
    .hero-dot { display: none; }
    .hero-h1 { font-family: var(--font-d); font-size: clamp(36px, 6vw, 72px); font-weight: 900; color: white; line-height: 1.0; letter-spacing: -1.5px; margin-bottom: 22px; }
    .hero-h1 .accent { color: var(--orange); display: block; }
    .hero-p { font-size: clamp(15px, 2vw, 18px); color: rgba(255,255,255,0.70); line-height: 1.65; max-width: 600px; margin: 0 auto 40px; }
    .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
    .hero-stats { display: flex; gap: 0; margin-top: clamp(48px,6vw,80px); background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10); border-radius: var(--r-xl); overflow: hidden; }
    .hs { flex: 1; padding: clamp(16px,3vw,28px) clamp(12px,2vw,24px); text-align: center; border-right: 1px solid rgba(255,255,255,0.10); display: flex; flex-direction: column; align-items: center; justify-content: center; }
    .hs:last-child { border-right: none; }
    .hs-n { font-family: var(--font-d); font-size: clamp(28px,4vw,42px); font-weight: 900; color: white; letter-spacing: -1px; line-height: 1; }
    .hs-n span { color: var(--orange); }
    .hs-l { font-size: clamp(10px,1.2vw,12px); color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1px; margin-top: 5px; }

    /* ── TICKER ── */
    .ticker { overflow: hidden; background: white; border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); height: 36px; display: flex; align-items: center; }
    .ticker-inner { display: flex; white-space: nowrap; animation: ticker 25s linear infinite; }
    .ticker-item { padding: 0 28px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: var(--muted); display: flex; align-items: center; gap: 8px; }
    .ticker-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--orange); flex-shrink: 0; }

    /* ── LANDING SECTIONS ── */
    .ls { padding: clamp(60px,8vw,96px) 0; }
    .ls-alt { background: var(--bg); }
    .ls-navy { background: var(--navy); }
    .ls-eyebrow { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px; color: var(--orange); margin-bottom: 10px; }
    .ls-h { font-family: var(--font-d); font-size: clamp(28px,4vw,44px); font-weight: 900; color: var(--navy); letter-spacing: -0.8px; line-height: 1.1; margin-bottom: 14px; }
    .ls-h.white { color: white; }
    .ls-p { font-size: clamp(14px,1.5vw,16px); color: var(--muted); line-height: 1.65; max-width: 520px; }
    .ls-p.white { color: rgba(255,255,255,0.65); }

    /* ── SERVICES GRID (Salesforce-style) ── */
    .svc-section { padding: clamp(60px,8vw,96px) 0; background: white; }
    .svc-section-wrap { max-width: var(--max); margin: 0 auto; padding: 0 var(--gutter); text-align: center; }
    .svc-section-wrap .ls-eyebrow { margin-bottom: 10px; }
    .svc-section-wrap .ls-h { max-width: 640px; margin: 0 auto 14px; }
    .svc-section-wrap .ls-p { max-width: 540px; margin: 0 auto 52px; }
    .svc-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .svc-card {
      background: var(--white); border: 1.5px solid var(--border); border-radius: 20px;
      padding: 28px 24px 0 24px; transition: all 0.22s ease; overflow: hidden;
      display: flex; flex-direction: column; min-height: 230px; position: relative;
      box-shadow: 0 2px 8px rgba(11,31,58,0.06);
    }
    .svc-card:hover { border-color: var(--orange); box-shadow: 0 12px 36px rgba(11,31,58,0.12); transform: translateY(-4px); }
    .svc-card:hover .svc-explore { color: var(--orange-2); }
    .svc-name { font-family: var(--font-d); font-size: 16px; font-weight: 800; color: var(--navy); margin-bottom: 9px; text-align: left; line-height: 1.25; }
    .svc-desc { font-size: 13px; color: var(--muted); line-height: 1.6; text-align: left; }
    .svc-card-foot { display: flex; align-items: flex-end; justify-content: space-between; margin-top: auto; }
    .svc-explore { display: inline-flex; align-items: center; gap: 4px; font-size: 13px; font-weight: 700; color: var(--orange); margin-bottom: 22px; text-decoration: underline; text-underline-offset: 3px; cursor: pointer; transition: color 0.15s; }
    .svc-blob-wrap { width: 76px; height: 76px; position: relative; flex-shrink: 0; }
    .svc-blob-bg { position: absolute; bottom: 0; right: 0; width: 68px; height: 68px; border-radius: 50% 50% 0 50%; background: linear-gradient(135deg, var(--orange-lo) 0%, rgba(232,103,26,0.04) 100%); border: 1px solid var(--orange-md); }
    .svc-blob-icon { position: absolute; bottom: 10px; right: 10px; width: 36px; height: 36px; border-radius: 50%; background: var(--white); border: 1.5px solid rgba(11,31,58,0.10); display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(11,31,58,0.10); }
    .svc-blob-icon svg { width: 17px; height: 17px; color: var(--orange); }

    /* ── STEPS ── */
    .steps-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 44px; }
    .step-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10); border-radius: var(--r-xl); padding: clamp(24px,3vw,36px); position: relative; }
    .step-n { font-family: var(--font-d); font-size: 64px; font-weight: 900; color: rgba(255,255,255,0.05); position: absolute; top: 20px; right: 24px; line-height: 1; }
    .step-icon { width: 48px; height: 48px; background: var(--orange); border-radius: var(--r-md); display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
    .step-icon svg { width: 24px; height: 24px; color: white; }
    .step-t { font-family: var(--font-d); font-size: 18px; font-weight: 700; color: white; margin-bottom: 10px; }
    .step-d { font-size: 13.5px; color: rgba(255,255,255,0.60); line-height: 1.65; }

    /* ── PORTAL SHOWCASE ── */
    .pshow { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 44px; }
    .pc {
      border-radius: var(--r-2xl); padding: clamp(28px,4vw,44px) clamp(24px,3vw,40px);
      position: relative; overflow: hidden; cursor: pointer;
      transition: all 0.25s ease;
    }
    .pc-pm { background: linear-gradient(140deg, var(--navy) 0%, var(--navy-3) 100%); border: 1px solid rgba(255,255,255,0.08); }
    .pc-pm:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(11,31,58,0.30); }
    .pc-vd { background: var(--orange); border: 1px solid rgba(255,255,255,0.15); }
    .pc-vd:hover { transform: translateY(-4px); box-shadow: 0 24px 60px rgba(232,103,26,0.35); background: var(--orange-2); }
    .pc-gfx { position: absolute; bottom: -20px; right: -10px; font-family: var(--font-d); font-size: 120px; font-weight: 900; opacity: 0.06; color: white; line-height: 1; pointer-events: none; }
    .pc-tag { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: rgba(255,255,255,0.55); margin-bottom: 8px; }
    .pc-title { font-family: var(--font-d); font-size: clamp(24px,3vw,32px); font-weight: 900; color: white; margin-bottom: 12px; letter-spacing: -0.3px; }
    .pc-desc { font-size: 13.5px; color: rgba(255,255,255,0.70); line-height: 1.65; margin-bottom: 28px; max-width: 340px; }
    .pc-feats { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 20px; }
    .pc-feat { font-size: 11px; padding: 4px 10px; border-radius: 100px; font-weight: 600; background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.80); border: 1px solid rgba(255,255,255,0.15); }

    /* ── CTA SECTION ── */
    .cta { padding: clamp(60px,8vw,100px) var(--gutter); text-align: center; background: var(--bg); border-top: 1px solid var(--border); position: relative; overflow: hidden; }
    .cta::before { content: ''; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); width: 600px; height: 300px; background: radial-gradient(ellipse, rgba(232,103,26,0.06) 0%, transparent 70%); pointer-events: none; }
    .cta > * { position: relative; z-index: 1; }

    /* ── FOOTER ── */
    .footer { background: var(--navy); padding: clamp(28px,4vw,40px) clamp(16px,3vw,60px); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
    .footer-copy { font-size: 12.5px; color: rgba(255,255,255,0.45); }
    .footer-links { display: flex; gap: 24px; flex-wrap: wrap; }
    .footer-link { font-size: 12.5px; color: rgba(255,255,255,0.45); cursor: pointer; transition: color var(--t); }
    .footer-link:hover { color: rgba(255,255,255,0.80); }

    /* ── AUTH ── */
    .auth-wrap { display: flex; min-height: calc(100vh - var(--nav-h)); }
    .auth-left { flex: 1; background: var(--navy); padding: clamp(48px,6vw,80px) clamp(32px,5vw,80px); display: flex; flex-direction: column; justify-content: center; position: relative; overflow: hidden; }
    .auth-left-bg { position: absolute; inset: 0; background: radial-gradient(ellipse 70% 60% at 20% 50%, rgba(232,103,26,0.10) 0%, transparent 70%); pointer-events: none; }
    .auth-right { width: min(480px, 100%); background: var(--white); border-left: 1px solid var(--border); padding: clamp(40px,5vw,64px) clamp(28px,4vw,56px); display: flex; flex-direction: column; justify-content: center; }
    .auth-h { font-family: var(--font-d); font-size: clamp(36px,4vw,52px); font-weight: 900; color: white; line-height: 1; letter-spacing: -1px; margin-bottom: 18px; }
    .auth-h b { color: var(--orange); }
    .auth-p { font-size: 15px; color: rgba(255,255,255,0.60); line-height: 1.65; max-width: 440px; }
    .auth-checks { margin-top: 44px; display: flex; flex-direction: column; gap: 14px; }
    .auth-check { display: flex; align-items: center; gap: 11px; font-size: 13.5px; color: rgba(255,255,255,0.65); }
    .auth-check-icon { width: 22px; height: 22px; border-radius: 50%; background: rgba(232,103,26,0.15); border: 1px solid rgba(232,103,26,0.30); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
    .auth-check-icon svg { width: 10px; height: 10px; color: var(--orange); }
    .auth-ft { font-family: var(--font-d); font-size: 24px; font-weight: 800; color: var(--navy); margin-bottom: 6px; }
    .auth-fs { font-size: 13px; color: var(--muted); margin-bottom: 28px; }
    .auth-sw { margin-top: 18px; text-align: center; font-size: 13px; color: var(--muted); }
    .auth-sw a { color: var(--orange); cursor: pointer; font-weight: 600; }
    .auth-sw a:hover { text-decoration: underline; }
    .auth-sw-alt { margin-top: 10px; text-align: center; font-size: 13px; }
    .auth-sw-alt a { color: var(--blue); cursor: pointer; font-weight: 600; }

    /* ── DEMO BANNER ── */
    .demo-banner { background: linear-gradient(90deg, var(--orange-lo) 0%, rgba(45,125,210,0.08) 100%); border: 1px solid var(--orange-md); border-radius: var(--r-lg); padding: 12px 16px; margin-bottom: 22px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    .demo-banner svg { width: 16px; height: 16px; color: var(--orange); flex-shrink: 0; }
    .demo-text { font-size: 13px; color: var(--navy); font-weight: 500; flex: 1; min-width: 200px; }
    .demo-text span { color: var(--orange); font-weight: 700; }

    /* ── TOGGLE SWITCH ── */
    .toggle { width: 40px; height: 22px; background: var(--green); border-radius: 11px; cursor: pointer; position: relative; flex-shrink: 0; transition: background var(--t); }
    .toggle-thumb { width: 18px; height: 18px; background: white; border-radius: 50%; position: absolute; right: 2px; top: 2px; box-shadow: 0 1px 3px rgba(0,0,0,0.20); transition: right var(--t); }

    /* ── RESPONSIVE ── */

    /* Ultrawide (1600px+) */
    @media (min-width: 1600px) {
      :root { --max: 1400px; }
      .portal-main { padding: 44px 52px; }
    }

    /* Large (1280–1600) */
    @media (min-width: 1280px) and (max-width: 1599px) {
      .ga, .ga-wide { grid-template-columns: 1fr 380px; }
    }

    /* Medium laptop (1024–1280) */
    @media (max-width: 1280px) {
      .g4 { grid-template-columns: repeat(2, 1fr); }
      .sg4 { grid-template-columns: repeat(2, 1fr); }
      .steps-grid { grid-template-columns: 1fr 1fr; }
      .svc-grid { grid-template-columns: repeat(3, 1fr); }
    }

    /* Tablet (768–1024) */
    @media (max-width: 1024px) {
      :root { --side-w: 0px; }
      .sidebar { display: none; }
      .portal-main { margin-left: 0; }
      .ga, .ga-wide { grid-template-columns: 1fr; }
      .pshow { grid-template-columns: 1fr; }
      .auth-left { display: none; }
      .auth-right { width: 100%; border-left: none; }
      .g3 { grid-template-columns: repeat(2, 1fr); }
      .svc-grid { grid-template-columns: repeat(2, 1fr); }
      .hero-stats { flex-wrap: wrap; }
      .hs { min-width: 40%; }
    }

    /* Large mobile (480–768) */
    @media (max-width: 768px) {
      .g2, .g3, .sg4, .sg3, .sg2 { grid-template-columns: 1fr; }
      .svc-grid { grid-template-columns: repeat(2, 1fr); }
      .fr, .fr3 { grid-template-columns: 1fr; }
      .steps-grid { grid-template-columns: 1fr; }
      .nav-links { display: none; }
      .nav-hamburger { display: flex; }
      .ph-row { flex-direction: column; }
      .tabs-row { flex-wrap: wrap; }
      .hero-stats { flex-direction: column; }
      .hs { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.10); }
      .hs:last-child { border-bottom: none; }
      .footer { flex-direction: column; text-align: center; }
      .footer-links { justify-content: center; }
      .demo-banner { flex-direction: column; gap: 8px; }
    }

    /* Small mobile (< 480) */
    @media (max-width: 480px) {
      :root { --nav-h: 56px; }
      .btn-xl { padding: 13px 24px; font-size: 14px; }
      .modal { padding: 20px; }
      .hero-btns { flex-direction: column; align-items: center; }
      .hero-btns .btn { width: 100%; max-width: 320px; }
    }
  `}</style>
);

// ─────────────────────────────────────────────────────────────────────
// SVG ICONS
// ─────────────────────────────────────────────────────────────────────
const I = {
  dash:    (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="1.5" y="1.5" width="6" height="6" rx="1.5"/><rect x="10.5" y="1.5" width="6" height="6" rx="1.5"/><rect x="1.5" y="10.5" width="6" height="6" rx="1.5"/><rect x="10.5" y="10.5" width="6" height="6" rx="1.5"/></svg>),
  bld:     (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="2" y="6" width="14" height="11" rx="1.5"/><path d="M6 6V4a3 3 0 0 1 6 0v2"/><path d="M9 10v2"/></svg>),
  list:    (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M7 4.5h9M7 9h9M7 13.5h9M2.5 4.5h.5M2.5 9h.5M2.5 13.5h.5"/></svg>),
  plus:    (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M9 2v14M2 9h14"/></svg>),
  gear:    (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="9" cy="9" r="2.5"/><path d="M9 2v2M9 14v2M2 9h2M14 9h2M4.1 4.1l1.4 1.4M12.5 12.5l1.4 1.4M13.9 4.1l-1.4 1.4M5.5 12.5l-1.4 1.4"/></svg>),
  users:   (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="7" cy="7" r="3"/><path d="M1 16c0-3.31 2.69-6 6-6s6 2.69 6 6"/><circle cx="14" cy="6" r="2"/><path d="M17 14c0-2.21-1.34-4-3-4"/></svg>),
  dollar:  (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M9 1v16M6 5h4.5a2.5 2.5 0 0 1 0 5H8a2.5 2.5 0 0 0 0 5H13"/></svg>),
  chart:   (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M2 14l4-5 3 3 4-6 3 3"/><path d="M2 16h14"/></svg>),
  check:   (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l4.5 4.5 7.5-8"/></svg>),
  x:       (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3.5 3.5l11 11M14.5 3.5l-11 11"/></svg>),
  arrow:   (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9h12M10 5l4 4-4 4"/></svg>),
  cal:     (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="1.5" y="3.5" width="15" height="13" rx="1.5"/><path d="M6 1.5v3M12 1.5v3M1.5 8h15"/></svg>),
  clock:   (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="9" cy="9" r="7.5"/><path d="M9 5.5V9l3 3"/></svg>),
  pin:     (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M9 1C6.24 1 4 3.24 4 6c0 4 5 11 5 11s5-7 5-11c0-2.76-2.24-5-5-5z"/><circle cx="9" cy="6" r="2"/></svg>),
  send:    (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 2L2 7.5l6 2.5 2.5 6L16 2z"/><path d="M8 10l3-3"/></svg>),
  eye:     (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M1.5 9s2.5-6 7.5-6 7.5 6 7.5 6-2.5 6-7.5 6-7.5-6-7.5-6z"/><circle cx="9" cy="9" r="2.5"/></svg>),
  logout:  (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2h4a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-4M7 13l4-4-4-4M11 9H2"/></svg>),
  wrench:  (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 2a4 4 0 0 1-4 7L3 14l2 2 5-5a4 4 0 0 1 6-5 4 4 0 0 1-4-4z"/></svg>),
  shield:  (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M9 1.5L2 5v4c0 4.14 2.97 8 7 9 4.03-1 7-4.86 7-9V5L9 1.5z"/></svg>),
  hvac:    (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="9" cy="9" r="3.5"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.34 3.34l1.42 1.42M13.24 13.24l1.42 1.42M14.66 3.34l-1.42 1.42M4.76 13.24l-1.42 1.42"/></svg>),
  drop:    (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M9 1.5C9 1.5 3 9 3 12.5a6 6 0 0 0 12 0C15 9 9 1.5 9 1.5z"/></svg>),
  paint:   (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M2 16l10-10M3.5 1.5l13 13M1 5l12 12"/><circle cx="4" cy="14" r="2"/></svg>),
  turn:    (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 9A7 7 0 0 1 2 9"/><path d="M2 9l2.5-2.5M2 9l2.5 2.5"/><path d="M16 5V2.5M16 2.5l-2 2M16 2.5l2 2"/></svg>),
  sweep:   (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l10 10"/><path d="M3 10l2-2 5 5-2 2H3z"/><path d="M11 15h6"/></svg>),
  restore: (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 5v5h5M2 10C3.5 5.5 6.5 2.5 10.5 2a7.5 7.5 0 1 1-7 8.5"/></svg>),
  carpet:  (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><rect x="1.5" y="4" width="15" height="10" rx="1.5"/><path d="M1.5 7h15M1.5 11h15M5 4v10M9 4v10M13 4v10"/></svg>),
  event:   (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 1l2 5.5h5.5l-4.5 3.5 1.7 5.5L9 12.5l-4.7 3 1.7-5.5L1.5 6.5H7z"/></svg>),
  info:    (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="9" cy="9" r="7.5"/><path d="M9 8v5"/><circle cx="9" cy="5.5" r=".5" fill="currentColor"/></svg>),
  export:  (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 11v4a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-4M9 2v10M5.5 5.5L9 2l3.5 3.5"/></svg>),
  tag:     (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M2 2h6l8 8a2.83 2.83 0 0 1 0 4l-3 3a2.83 2.83 0 0 1-4 0L1 9V2h1z"/><circle cx="5.5" cy="5.5" r="1"/></svg>),
  star:    (<svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M9 1l2 5.5h5.5l-4.5 3.5 1.7 5.5L9 12.5l-4.7 3 1.7-5.5L1.5 6.5H7z"/></svg>),
};

// ─────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────
const SVCS = [
  { id:"jan",  name:"Daily / Nightly Janitorial", icon:"sweep",   desc:"Recurring scheduled cleaning for commercial properties" },
  { id:"hvac", name:"HVAC",                       icon:"hvac",    desc:"Preventive maintenance and emergency repair" },
  { id:"plmb", name:"Plumbing",                   icon:"drop",    desc:"Leak detection, installs, emergency dispatch" },
  { id:"pnt",  name:"Painting",                   icon:"paint",   desc:"Interior and exterior — residential and commercial" },
  { id:"mnt",  name:"General Maintenance",        icon:"wrench",  desc:"Repairs, installations, and ongoing upkeep" },
  { id:"turn", name:"Turnover Cleaning",          icon:"turn",    desc:"Full unit prep between tenant transitions" },
  { id:"rest", name:"Emergency Restoration",      icon:"restore", desc:"24/7 water, fire, and storm damage response" },
  { id:"crpt", name:"Carpet Cleaning",            icon:"carpet",  desc:"Deep cleaning and installation services" },
  { id:"evt",  name:"Event Cleanup",              icon:"event",   desc:"Pre and post-event cleaning services" },
];

const REQUESTS = [
  { id:"REQ-0041", svc:"Turnover Cleaning",     prop:"Hillcrest Apartments",   unit:"B-302",      status:"In Progress", priority:"High",     date:"Jun 28", vendor:"CleanPro LLC",       amt:285  },
  { id:"REQ-0040", svc:"Plumbing",              prop:"Riverside Commons",       unit:"A-104",      status:"Scheduled",   priority:"Medium",   date:"Jun 30", vendor:"Metro Plumbing Co.", amt:190  },
  { id:"REQ-0039", svc:"HVAC",                  prop:"Hillcrest Apartments",   unit:"Common Area", status:"Completed",  priority:"Low",      date:"Jun 25", vendor:"AirFlow Pros",       amt:450  },
  { id:"REQ-0038", svc:"Daily Janitorial",      prop:"Bayview Office Center",  unit:"Floors 1-3", status:"Pending",     priority:"Medium",   date:"Jul 01", vendor:null,                 amt:320  },
  { id:"REQ-0037", svc:"Emergency Restoration", prop:"Palmetto HOA",           unit:"Unit 7",     status:"Assigned",    priority:"Critical", date:"Jun 27", vendor:"RestoreMasters",     amt:1200 },
];

const PROPS = [
  { id:"P-01", name:"Hillcrest Apartments",  addr:"1234 Maple St, Atlanta, GA 30301",        units:48, reqs:3 },
  { id:"P-02", name:"Riverside Commons",     addr:"780 River Run Blvd, Orlando, FL 32801",   units:32, reqs:1 },
  { id:"P-03", name:"Bayview Office Center", addr:"5500 Bayshore Dr, Tampa, FL 33611",       units:12, reqs:1 },
  { id:"P-04", name:"Palmetto HOA",          addr:"900 Palmetto Ln, Miami, FL 33101",        units:24, reqs:2 },
];

const VJOBS = [
  { id:"JOB-104", svc:"Turnover Cleaning",  prop:"Hillcrest Apartments",  addr:"1234 Maple St, Atlanta, GA",      unit:"B-302",      date:"Jun 28", time:"9:00 AM",  status:"In Progress", amt:285,  notes:"2 bed / 1 bath. Photo documentation required on completion." },
  { id:"JOB-103", svc:"Plumbing",           prop:"Riverside Commons",      addr:"780 River Run Blvd, Orlando, FL", unit:"A-104",      date:"Jun 30", time:"11:00 AM", status:"Scheduled",   amt:190,  notes:"Garbage disposal replacement. Parts on site upon arrival." },
  { id:"JOB-102", svc:"HVAC Maintenance",   prop:"Palmetto HOA",           addr:"900 Palmetto Ln, Miami, FL",      unit:"Common Area",date:"Jul 2",  time:"8:00 AM",  status:"Scheduled",   amt:340,  notes:"Annual filter replacement and full system inspection." },
  { id:"JOB-101", svc:"Carpet Cleaning",    prop:"Bayview Office Center",  addr:"5500 Bayshore Dr, Tampa, FL",     unit:"Suite 200",  date:"Jun 27", time:"7:00 AM",  status:"Completed",   amt:220,  notes:"Completed. Invoice submitted and confirmed." },
];

// ─────────────────────────────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────────────────────────────
function statusBadge(s) {
  const map = { "In Progress":"orange", Scheduled:"blue", Completed:"green", Pending:"gray", Assigned:"blue", Active:"green", Inactive:"gray", "On Job":"orange" };
  return <span className={`badge badge-dot b-${map[s] || "gray"}`}>{s}</span>;
}
function priorityBadge(p) {
  const map = { Critical:"red", High:"orange", Medium:"blue", Low:"gray" };
  return <span className={`badge b-${map[p] || "gray"}`}>{p}</span>;
}
function initials(name) {
  return (name || "").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}

// ─────────────────────────────────────────────────────────────────────
// TOAST
// ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type, clear }) {
  useEffect(() => { const t = setTimeout(clear, 3800); return () => clearTimeout(t); }, []);
  return (
    <div className={`toast ${type}`}>
      <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {type === "ok" ? <path d="M3 9l4.5 4.5 7.5-8"/> : <><path d="M9 6v4"/><circle cx="9" cy="13" r=".5" fill="currentColor"/></>}
      </svg>
      {msg}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────
function Nav({ view, onNav, role, onLogout }) {
  const inPortal = role !== null;
  const roleLabel = { pm: "Property Manager", vendor: "Vendor", admin: "Admin" };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <div className="nav-logo" onClick={() => { if (role === "pm") onNav("pm-dash"); else if (role === "vendor") onNav("v-dash"); else if (role === "admin") onNav("a-dash"); else onNav("home"); }}>
          <div className="nav-logo-mark">
            <svg viewBox="0 0 24 24"><path d="M12 2L4 7v5c0 5.25 3.4 10.14 8 11.32C16.6 22.14 20 17.25 20 12V7L12 2z"/></svg>
          </div>
          <div>
            <div className="nav-logo-text"><span>1STOP</span> SERVICE PRO</div>
            <span className="nav-logo-sub">Powered by 1st Choice All-Purpose</span>
          </div>
        </div>

        {!inPortal ? (
          <>
            <div className="nav-links">
              <button className="nav-link" onClick={() => onNav("home")}>Home</button>
              <button className="nav-link" onClick={() => { onNav("home"); setTimeout(()=>{ const el=document.getElementById("services"); if(el) el.scrollIntoView({behavior:"smooth"}); },80); }}>Services</button>
              <button className="nav-link" onClick={() => { onNav("home"); setTimeout(()=>{ const el=document.getElementById("how"); if(el) el.scrollIntoView({behavior:"smooth"}); },80); }}>How It Works</button>
              <button className="nav-link" onClick={() => onNav("pm-dash")}>Manager Portal</button>
              <button className="nav-link" onClick={() => onNav("v-dash")}>Vendor Portal</button>
            </div>
            <div className="nav-cta">
              <button className="btn btn-ghost btn-sm" onClick={() => onNav("pm-login")}>Sign In</button>
              <button className="btn btn-primary btn-sm" onClick={() => onNav("pm-dash")}>Get Started {I.arrow}</button>
            </div>
          </>
        ) : (
          <div className="nav-cta">
            <span className="nav-portal-label">{roleLabel[role]} Portal</span>
            <button className="btn btn-ghost btn-sm" onClick={() => onNav(role === "pm" ? "v-dash" : "pm-dash")}>
              Switch Portal
            </button>
            <button className="btn btn-outline btn-sm" onClick={onLogout} style={{ gap: 6 }}>
              {I.logout} Exit Portal
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────
// SIDEBAR
// ─────────────────────────────────────────────────────────────────────
function Sidebar({ role, active, onNav, user }) {
  const pmNav = [
    { id: "pm-dash",  label: "Dashboard",         icon: "dash" },
    { id: "pm-props", label: "Properties",         icon: "bld" },
    { id: "pm-reqs",  label: "Service Requests",   icon: "list", badge: "4" },
    { id: "pm-new",   label: "New Request",         icon: "plus" },
    { id: "pm-inv",   label: "Invoices & Billing",  icon: "dollar" },
    { id: "pm-anal",  label: "Analytics",           icon: "chart" },
    { id: "pm-acct",  label: "Settings",            icon: "gear" },
  ];
  const vNav = [
    { id: "v-dash",   label: "Dashboard",    icon: "dash" },
    { id: "v-avail",  label: "Available Jobs",icon: "tag",  badge: "5" },
    { id: "v-jobs",   label: "My Jobs",       icon: "list", badge: "3" },
    { id: "v-team",   label: "Team",          icon: "users" },
    { id: "v-earn",   label: "Earnings",      icon: "dollar" },
    { id: "v-perf",   label: "Performance",   icon: "chart" },
    { id: "v-acct",   label: "Settings",      icon: "gear" },
  ];
  const aNav = [
    { id: "a-dash",   label: "Overview",    icon: "chart" },
    { id: "a-reqs",   label: "All Requests",icon: "list" },
    { id: "a-props",  label: "Properties",  icon: "bld" },
    { id: "a-vend",   label: "Vendors",     icon: "users" },
    { id: "a-set",    label: "Settings",    icon: "gear" },
  ];
  const nav = role === "pm" ? pmNav : role === "vendor" ? vNav : aNav;
  const roleLabel = { pm: "Property Manager", vendor: "Vendor Owner", admin: "Administrator" };

  return (
    <aside className="sidebar">
      <div className="sidebar-section">Navigation</div>
      {nav.map(item => (
        <div
          key={item.id}
          className={`sidebar-item ${active === item.id ? "active" : ""}`}
          onClick={() => onNav(item.id)}
        >
          <span style={{ display: "flex" }}>{I[item.icon]}</span>
          <span>{item.label}</span>
          {item.badge && <span className="sidebar-badge">{item.badge}</span>}
        </div>
      ))}
      <div className="sidebar-profile" style={{ marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="sp-av">{initials(user || "US")}</div>
          <div>
            <div className="sp-name">{user || "User"}</div>
            <div className="sp-role">{roleLabel[role]}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ─────────────────────────────────────────────────────────────────────
// DEMO BANNER
// ─────────────────────────────────────────────────────────────────────
function DemoBanner({ role, onNav }) {
  return (
    <div className="demo-banner">
      {I.info}
      <span className="demo-text">
        You are viewing the <span>{role === "pm" ? "Property Manager" : role === "vendor" ? "Vendor" : "Admin"} Portal</span> in demo mode.
        All features are interactive.{" "}
        <a
          style={{ color: "var(--blue)", cursor: "pointer", fontWeight: 600 }}
          onClick={() => onNav(role === "pm" ? "pm-login" : role === "vendor" ? "vendor-login" : "admin-login")}
        >
          Create a real account
        </a>
      </span>
      {role !== "vendor" && (
        <button className="btn btn-outline-orange btn-sm" onClick={() => onNav("v-dash")}>View Vendor Portal</button>
      )}
      {role !== "pm" && (
        <button className="btn btn-navy btn-sm" onClick={() => onNav("pm-dash")}>View Manager Portal</button>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// LANDING PAGE
// ─────────────────────────────────────────────────────────────────────
function Landing({ onNav }) {
  return (
    <div>
      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-bg" />

        <div className="hero-inner">
          <div className="hero-eyebrow a-up">
            <div className="hero-eyebrow-pill-l">
              <span className="hero-eyebrow-live" />
              Platform Live
            </div>
            <div className="hero-eyebrow-pill-r">Now Operating in All 50 States</div>
          </div>
          <h1 className="hero-h1 a-up d1">
            The Operating System
            <span className="accent">for Property Services.</span>
          </h1>
          <p className="hero-p a-up d2">
            One platform connecting commercial property managers with certified service vendors.
            HVAC, plumbing, turnover, janitorial — dispatched, tracked, and invoiced in one place.
          </p>
          <div className="hero-btns a-up d3">
            <button className="btn btn-primary btn-xl" onClick={() => onNav("pm-dash")}>
              View Manager Portal {I.arrow}
            </button>
            <button className="btn btn-ghost-white btn-xl" onClick={() => onNav("v-dash")}>
              View Vendor Portal
            </button>
          </div>
          <div className="hero-stats a-up d4">
            {[["50","+ States","Serving Nationwide"],["1,200","+ Vendors","Certified Network"],["98","%","On-Time Rate"],["$0","","Vendor Marketing Cost"]].map(([n, s, l]) => (
              <div className="hs" key={l}>
                <div className="hs-n">{n}<span>{s}</span></div>
                <div className="hs-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-inner">
          {[...Array(2)].map((_, di) =>
            ["Atlanta, GA","Orlando, FL","Miami, FL","Tampa, FL","Dallas, TX","Chicago, IL","Houston, TX","Phoenix, AZ","Charlotte, NC","Nashville, TN","Los Angeles, CA","New York, NY","Seattle, WA","Denver, CO"].map((c, i) => (
              <span key={`${di}-${i}`} className="ticker-item">
                <span className="ticker-dot" />{c}
              </span>
            ))
          )}
        </div>
      </div>

      {/* Services */}
      <section className="svc-section" id="services">
        <div className="svc-section-wrap">
          <p className="ls-eyebrow">Services We Cover</p>
          <h2 className="ls-h">Every service your properties need.<br />Zero juggling required.</h2>
          <p className="ls-p">Pre-screened, insured vendors for every category. Dispatched by 1Stop, tracked in real time, invoiced in one place.</p>
          <div className="svc-grid">
            {SVCS.map((s, i) => (
              <div className={`svc-card a-up d${(i % 4) + 1}`} key={s.id}>
                <div className="svc-name">{s.name}</div>
                <div className="svc-desc">{s.desc}</div>
                <div className="svc-card-foot">
                  <span className="svc-explore">Explore {I.arrow}</span>
                  <div className="svc-blob-wrap">
                    <div className="svc-blob-bg" />
                    <div className="svc-blob-icon">{I[s.icon]}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="ls ls-navy" id="how">
        <div className="wrap">
          <p className="ls-eyebrow">Process</p>
          <h2 className="ls-h white">From request to completion in three steps.</h2>
          <p className="ls-p white">No phone calls. No back-and-forth. Submit once, track everything.</p>
          <div className="steps-grid">
            {[
              { n:"01", icon:"bld",    t:"Submit Your Request",           d:"Log in, select service type, property, unit, and any notes. Done in under 60 seconds from any device." },
              { n:"02", icon:"shield", t:"We Assign a Certified Vendor",  d:"Our operations team receives an instant alert and dispatches the right pre-screened vendor for your market." },
              { n:"03", icon:"check",  t:"Track It From Start to Close",  d:"Vendors log start and end time, submit completion notes and photos. You get updates at every milestone." },
            ].map(s => (
              <div className="step-card a-up" key={s.n}>
                <div className="step-n">{s.n}</div>
                <div className="step-icon">{I[s.icon]}</div>
                <div className="step-t">{s.t}</div>
                <div className="step-d">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portals showcase */}
      <section className="ls ls-alt">
        <div className="wrap">
          <p className="ls-eyebrow">Platform</p>
          <h2 className="ls-h">Two portals. One seamless system.</h2>
          <p className="ls-p">Each portal is purpose-built. Not one generic dashboard shared between two completely different users.</p>
          <div className="pshow">
            <div className="pc pc-pm" onClick={() => onNav("pm-dash")}>
              <div className="pc-gfx">PM</div>
              <div className="pc-tag">For Property Managers</div>
              <div className="pc-title">Manager Portal</div>
              <div className="pc-desc">Centralized command for all service requests across your entire portfolio. Multi-property, multi-market. Full visibility from submission to completion.</div>
              <button className="btn btn-ghost-white btn-lg" onClick={e => { e.stopPropagation(); onNav("pm-dash"); }}>
                Explore Manager Portal {I.arrow}
              </button>
              <div className="pc-feats">
                {["Property Dashboard","Request Tracking","Multi-Market","Consolidated Billing","Real-Time Status"].map(f => (
                  <span className="pc-feat" key={f}>{f}</span>
                ))}
              </div>
            </div>
            <div className="pc pc-vd" onClick={() => onNav("v-dash")}>
              <div className="pc-gfx">VD</div>
              <div className="pc-tag">For Service Vendors</div>
              <div className="pc-title">Vendor Portal</div>
              <div className="pc-desc">Receive consistent, qualified work orders. Manage your crew. Track every dollar earned. No marketing. No cold calls. No chasing invoices.</div>
              <button className="btn btn-navy btn-lg" onClick={e => { e.stopPropagation(); onNav("v-dash"); }}>
                Explore Vendor Portal {I.arrow}
              </button>
              <div className="pc-feats">
                {["Job Queue","Team Management","Earnings Dashboard","SMS Verification","Employee Access Tiers"].map(f => (
                  <span className="pc-feat" key={f}>{f}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <p className="ls-eyebrow" style={{ marginBottom: 12 }}>Get Started Today</p>
          <h2 className="ls-h" style={{ marginBottom: 14 }}>Management meets<br /><span style={{ color: "var(--orange)" }}>maintenance.</span></h2>
          <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.65, marginBottom: 36 }}>
            Stop juggling vendors. Start running properties. One login. Every service. Zero chaos.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn btn-primary btn-xl" onClick={() => onNav("pm-dash")}>View Manager Portal {I.arrow}</button>
            <button className="btn btn-navy btn-xl" onClick={() => onNav("v-dash")}>View Vendor Portal {I.arrow}</button>
            <button className="btn btn-outline btn-xl" onClick={() => onNav("pm-signup")}>Create Free Account</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="nav-logo-mark" style={{ width: 28, height: 28, borderRadius: 6, flexShrink: 0 }}>
            <svg viewBox="0 0 24 24" style={{ width: 16, height: 16 }}><path d="M12 2L4 7v5c0 5.25 3.4 10.14 8 11.32C16.6 22.14 20 17.25 20 12V7L12 2z"/></svg>
          </div>
          <span className="footer-copy">© 2025 1Stop Service Pro, powered by 1st Choice All-Purpose. All rights reserved.</span>
        </div>
        <div className="footer-links">
          {["Privacy Policy","Terms of Service","Contact Us"].map(l => (
            <span key={l} className="footer-link">{l}</span>
          ))}
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// AUTH SCREEN
// ─────────────────────────────────────────────────────────────────────
function AuthScreen({ mode, role, onLogin, onNav }) {
  const [form, setForm] = useState({ email:"", password:"", name:"", phone:"", company:"", svc:"" });
  const [loading, setLoading] = useState(false);
  const isV = role === "vendor";
  const isSU = mode === "signup";
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(role); }, 1100);
  };

  const pmChecks = ["Submit any service in under 60 seconds","Track jobs in real time from submission to close","Manage all properties from one dashboard","Consolidated invoicing and payment history"];
  const vChecks  = ["Receive verified work orders from property managers","Manage your team with tiered access controls","Track all earnings and payout history","No marketing costs or customer acquisition needed"];

  return (
    <div className="auth-wrap" style={{ paddingTop: "var(--nav-h)" }}>
      <div className="auth-left">
        <div className="auth-left-bg" />
        <div className="a-up" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ marginBottom: 28 }}>
            <span className={`badge ${isV ? "b-orange" : "b-blue"}`}>{isV ? "Vendor Portal" : "Property Manager Portal"}</span>
          </div>
          <div className="auth-h">
            {isV ? <><b>Build your</b><br />business.<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>One job<br />at a time.</span></>
                 : <><b>Manage every</b><br />property.<br /><span style={{ color: "rgba(255,255,255,0.45)" }}>One<br />platform.</span></>}
          </div>
          <p className="auth-p">
            {isV ? "Join 1,200+ certified vendors. Get consistent work orders, manage your team, and track every dollar — all from one app."
                 : "Stop coordinating across a dozen contractors. 1Stop connects you to pre-screened vendors for every service your properties need."}
          </p>
          <div className="auth-checks">
            {(isV ? vChecks : pmChecks).map(c => (
              <div className="auth-check" key={c}>
                <div className="auth-check-icon">{I.check}</div>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="a-up">
          <div style={{ marginBottom: 24 }}>
            <span className={`badge ${isV ? "b-orange" : "b-blue"}`}>{isV ? "Vendor" : "Property Manager"}</span>
          </div>
          <div className="auth-ft">{isSU ? "Create your account" : "Welcome back"}</div>
          <div className="auth-fs">{isSU ? `Join the 1Stop ${isV ? "vendor" : "manager"} network today.` : "Sign in to access your portal."}</div>

          <form onSubmit={submit} className="fstack">
            {isSU && (
              <div className="fg">
                <label className="fl">{isV ? "Business Name" : "Full Name"}</label>
                <input className="fi" placeholder={isV ? "ABC Services LLC" : "Jane Smith"} value={form.name} onChange={e => set("name", e.target.value)} required />
              </div>
            )}
            {isSU && (
              <div className="fg">
                <label className="fl">{isV ? "Business Phone" : "Company / Organization"}</label>
                <input className="fi" placeholder={isV ? "(404) 555-0100" : "Hillcrest Property Group"} value={form.company} onChange={e => set("company", e.target.value)} required />
              </div>
            )}
            {(!isV || !isSU) ? (
              <div className="fg">
                <label className="fl">Email Address</label>
                <input className="fi" type="email" placeholder="you@company.com" value={form.email} onChange={e => set("email", e.target.value)} required />
              </div>
            ) : (
              <div className="fg">
                <label className="fl">Mobile Number</label>
                <input className="fi" type="tel" placeholder="(404) 555-0100" value={form.phone} onChange={e => set("phone", e.target.value)} required />
              </div>
            )}
            {isSU && isV && (
              <div className="fg">
                <label className="fl">Primary Service Category</label>
                <select className="fi" value={form.svc} onChange={e => set("svc", e.target.value)} required>
                  <option value="">Select a category</option>
                  {SVCS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            )}
            <div className="fg">
              <label className="fl">Password</label>
              <input className="fi" type="password" placeholder="••••••••" value={form.password} onChange={e => set("password", e.target.value)} required />
            </div>
            <button type="submit" className={`btn btn-primary btn-full btn-lg ${loading ? "btn-loading" : ""}`} disabled={loading}>
              {!loading && (isSU ? "Create Account" : "Sign In")}
            </button>
            {isV && !isSU && (
              <button type="button" className="btn btn-outline btn-full" onClick={submit}>
                Sign In via SMS Code
              </button>
            )}
          </form>

          <div className="auth-sw">
            {isSU ? <>Already have an account? <a onClick={() => onNav(`${role}-login`)}>Sign in</a></>
                  : <>No account? <a onClick={() => onNav(`${role}-signup`)}>Sign up free</a></>}
          </div>
          <div className="auth-sw-alt">
            <a onClick={() => onNav(isV ? "pm-login" : "vendor-login")}>
              {isV ? "Switch to Property Manager Portal" : "Switch to Vendor Portal"} {">"}
            </a>
          </div>
          <div style={{ marginTop: 16, textAlign: "center" }}>
            <button className="btn btn-ghost btn-sm" onClick={() => onNav(isV ? "v-dash" : "pm-dash")} style={{ color: "var(--muted)", fontSize: 12 }}>
              Preview without signing in {I.arrow}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PM: DASHBOARD
// ─────────────────────────────────────────────────────────────────────
function PMDash({ onNav, showToast, isDemo }) {
  return (
    <div>
      {isDemo && <DemoBanner role="pm" onNav={onNav} />}
      <div className="ph">
        <div className="ph-row">
          <div>
            <div className="ph-title">Dashboard — <b>Marcus Johnson</b></div>
            <div className="ph-sub">Tuesday, June 27, 2025 · Hillcrest Property Group · 4 active properties</div>
          </div>
          <div className="ph-actions">
            <button className="btn btn-outline btn-sm" onClick={() => showToast("Report exported.", "ok")}>{I.export} Export</button>
            <button className="btn btn-primary btn-sm" onClick={() => onNav("pm-new")}>{I.plus} New Request</button>
          </div>
        </div>
      </div>

      <div className="stat-grid sg4">
        {[
          { l:"Open Requests",      v:"7",    d:"+2 this week",          ac:"accent" },
          { l:"Properties",         v:"4",    d:"Across 3 markets",      ac:"blue" },
          { l:"Completed (MTD)",    v:"23",   d:"+18% vs last month",    ac:"green" },
          { l:"Avg Response Time",  v:"2.4h", d:"vs 18h industry avg",   ac:"" },
        ].map((k, i) => (
          <div key={i} className={`tile ${k.ac} a-up d${i + 1}`}>
            <div className="tile-label">{k.l}</div>
            <div className={`tile-value ${k.ac === "accent" ? "orange" : k.ac === "green" ? "green" : ""}`}>{k.v}</div>
            <div className={`tile-delta ${k.ac === "" ? "neutral" : ""}`}>{k.d}</div>
          </div>
        ))}
      </div>

      <div className="ga">
        <div className="card a-up d2">
          <div className="card-pad" style={{ paddingBottom: 0 }}>
            <div className="ch">
              <div>
                <div className="ch-title">Recent Service Requests</div>
                <div className="ch-sub">{REQUESTS.length} total across all properties</div>
              </div>
              <button className="btn btn-ghost btn-sm" onClick={() => onNav("pm-reqs")}>View All {I.arrow}</button>
            </div>
          </div>
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>Request ID</th><th>Service</th><th>Property</th><th>Vendor</th><th>Status</th><th>Amt</th></tr></thead>
              <tbody>
                {REQUESTS.map(r => (
                  <tr key={r.id}>
                    <td><span className="mono">{r.id}</span></td>
                    <td><strong>{r.svc}</strong><br /><span style={{ fontSize: 11, color: "var(--muted)" }}>{r.unit}</span></td>
                    <td style={{ fontSize: 12 }}>{r.prop}</td>
                    <td style={{ fontSize: 12 }}>{r.vendor || <span style={{ color: "var(--orange)", fontWeight: 700, fontSize: 11 }}>Unassigned</span>}</td>
                    <td>{statusBadge(r.status)}</td>
                    <td><strong>${r.amt}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card card-pad a-up d3">
            <div className="ch">
              <div className="ch-title">Properties</div>
              <button className="btn btn-ghost btn-sm" onClick={() => onNav("pm-props")}>Manage</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {PROPS.map(p => (
                <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 12px", background: "var(--bg)", borderRadius: "var(--r)", border: "1px solid var(--border)" }}>
                  <div style={{ width: 32, height: 32, background: "var(--navy)", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ color: "white", display: "flex" }}>{I.bld}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)" }}>{p.units} units</div>
                  </div>
                  {p.reqs > 0 && <span className="badge b-orange">{p.reqs}</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="card card-pad a-up d4">
            <div className="ch"><div className="ch-title">Activity Feed</div></div>
            <div className="tl">
              {[
                { t: "REQ-0037 — Emergency Restoration assigned to RestoreMasters", time: "2h ago",    dot: "orange" },
                { t: "REQ-0039 — HVAC completed at Hillcrest Common Area",         time: "6h ago",    dot: "green"  },
                { t: "REQ-0041 — Vendor started turnover at Unit B-302",           time: "Yesterday", dot: "orange" },
                { t: "REQ-0040 — Plumbing scheduled for June 30, 11:00 AM",        time: "2 days ago",dot: "gray"   },
              ].map((a, i) => (
                <div className="tl-item" key={i}>
                  <div className={`tl-dot ${a.dot}`}>{a.dot === "green" ? I.check : null}</div>
                  <div className="tl-body">
                    <div className="tl-text">{a.t}</div>
                    <div className="tl-time">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PM: REQUESTS
// ─────────────────────────────────────────────────────────────────────
function PMReqs({ onNav, showToast, isDemo }) {
  const [filter, setFilter] = useState("All");
  const statuses = ["All","In Progress","Scheduled","Pending","Completed"];
  const rows = filter === "All" ? REQUESTS : REQUESTS.filter(r => r.status === filter);

  return (
    <div>
      {isDemo && <DemoBanner role="pm" onNav={onNav} />}
      <div className="ph">
        <div className="ph-row">
          <div>
            <div className="ph-title">Service <b>Requests</b></div>
            <div className="ph-sub">{REQUESTS.length} requests across all properties</div>
          </div>
          <div className="ph-actions">
            <button className="btn btn-outline btn-sm" onClick={() => showToast("CSV exported.", "ok")}>{I.export} Export</button>
            <button className="btn btn-primary btn-sm" onClick={() => onNav("pm-new")}>{I.plus} New Request</button>
          </div>
        </div>
      </div>
      <div className="tabs-row">
        {statuses.map(s => <div key={s} className={`tab ${filter === s ? "on" : ""}`} onClick={() => setFilter(s)}>{s}</div>)}
      </div>
      <div className="card a-up">
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>ID</th><th>Service</th><th>Property / Unit</th><th>Vendor</th><th>Priority</th><th>Status</th><th>Date</th><th>Amount</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td><span className="mono">{r.id}</span></td>
                  <td><strong>{r.svc}</strong></td>
                  <td>{r.prop}<br /><span style={{ fontSize: 11, color: "var(--muted)" }}>{r.unit}</span></td>
                  <td style={{ fontSize: 12 }}>{r.vendor || <span style={{ color: "var(--orange)", fontWeight: 700, fontSize: 11 }}>Pending Assignment</span>}</td>
                  <td>{priorityBadge(r.priority)}</td>
                  <td>{statusBadge(r.status)}</td>
                  <td style={{ fontFamily: "var(--font-m)", fontSize: 12 }}>{r.date}</td>
                  <td><strong>${r.amt}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <div className="empty">{I.list}<div className="empty-t">No requests</div><div className="empty-s">No {filter.toLowerCase()} requests found</div></div>}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PM: NEW REQUEST
// ─────────────────────────────────────────────────────────────────────
function PMNew({ onNav, showToast, isDemo }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ prop:"", unit:"", svc:"", priority:"Medium", date:"", time:"Morning (8AM-12PM)", notes:"", scope:"Small (1-2 hours)" });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const doSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Service request submitted. Assigning vendor now.", "ok");
      onNav("pm-reqs");
    }, 1400);
  };

  const Step = ({ n, label }) => {
    const done = step > n, on = step === n;
    return (
      <div className="ws">
        <div className={`ws-dot ${done ? "done" : on ? "on" : "off"}`}>
          {done ? I.check : n}
        </div>
        <span className={`ws-label ${on ? "on" : "off"}`}>{label}</span>
        {n < 3 && <div className={`ws-line ${done ? "done" : ""}`} />}
      </div>
    );
  };

  return (
    <div>
      {isDemo && <DemoBanner role="pm" onNav={onNav} />}
      <div className="ph">
        <div className="ph-title">New Service <b>Request</b></div>
        <div className="ph-sub">Submit a request and we assign a certified vendor within minutes.</div>
      </div>
      <div style={{ maxWidth: 680 }}>
        <div className="wizard a-up">
          <Step n={1} label="Service Details" />
          <Step n={2} label="Schedule" />
          <Step n={3} label="Notes & Submit" />
        </div>
        <form onSubmit={doSubmit} className="card card-pad a-up d1">
          {step === 1 && (
            <div className="fstack">
              <div className="fr">
                <div className="fg">
                  <label className="fl">Property</label>
                  <select className="fi" value={form.prop} onChange={e => set("prop", e.target.value)} required>
                    <option value="">Select property</option>
                    {PROPS.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="fg">
                  <label className="fl">Unit / Area</label>
                  <input className="fi" placeholder="B-302 or Common Area" value={form.unit} onChange={e => set("unit", e.target.value)} required />
                </div>
              </div>
              <div className="fg">
                <label className="fl">Priority Level</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
                  {["Critical","High","Medium","Low"].map(p => (
                    <div
                      key={p}
                      onClick={() => set("priority", p)}
                      style={{ padding: "10px 8px", borderRadius: "var(--r)", textAlign: "center", cursor: "pointer", transition: "all var(--t)", fontFamily: "var(--font-b)", fontSize: 13, fontWeight: 600, background: form.priority === p ? "var(--orange-lo)" : "var(--bg)", border: `1.5px solid ${form.priority === p ? "var(--orange)" : "var(--border)"}`, color: form.priority === p ? "var(--orange)" : "var(--body)" }}
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
              <div className="fg">
                <label className="fl">Service Type</label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {SVCS.map(s => (
                    <div
                      key={s.id}
                      onClick={() => set("svc", s.id)}
                      style={{ padding: "12px 12px", borderRadius: "var(--r)", cursor: "pointer", transition: "all var(--t)", display: "flex", alignItems: "center", gap: 8, background: form.svc === s.id ? "var(--orange-lo)" : "var(--bg)", border: `1.5px solid ${form.svc === s.id ? "var(--orange-md)" : "var(--border)"}` }}
                    >
                      <span style={{ color: form.svc === s.id ? "var(--orange)" : "var(--muted)", display: "flex", flexShrink: 0 }}>{I[s.icon]}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: form.svc === s.id ? "var(--orange)" : "var(--body)" }}>{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-primary" onClick={() => { if (form.prop && form.svc) setStep(2); else showToast("Please select a property and service type.", "err"); }}>
                  Continue {I.arrow}
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="fstack">
              <div className="fr">
                <div className="fg">
                  <label className="fl">Preferred Date</label>
                  <input className="fi" type="date" value={form.date} onChange={e => set("date", e.target.value)} required />
                </div>
                <div className="fg">
                  <label className="fl">Time Window</label>
                  <select className="fi" value={form.time} onChange={e => set("time", e.target.value)}>
                    {["Morning (8AM-12PM)","Afternoon (12PM-5PM)","Evening (5PM-9PM)","ASAP / Flexible"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="fg">
                <label className="fl">Estimated Job Scope</label>
                <select className="fi" value={form.scope} onChange={e => set("scope", e.target.value)}>
                  <option>Small (1-2 hours)</option>
                  <option>Medium (2-4 hours)</option>
                  <option>Large (4-8 hours)</option>
                  <option>Project-Based (Multi-day)</option>
                </select>
              </div>
              <div style={{ padding: "16px 18px", background: "var(--bg)", borderRadius: "var(--r-md)", border: "1px solid var(--border)" }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".8px", color: "var(--muted)", marginBottom: 12 }}>Request Summary</div>
                {[
                  ["Service",  SVCS.find(s => s.id === form.svc)?.name || "—"],
                  ["Property", PROPS.find(p => p.id === form.prop)?.name || "—"],
                  ["Unit",     form.unit || "—"],
                  ["Priority", form.priority],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ color: "var(--muted)" }}>{k}</span>
                    <strong style={{ color: "var(--navy)" }}>{v}</strong>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>Continue {I.arrow}</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="fstack">
              <div className="fg">
                <label className="fl">Special Instructions</label>
                <textarea className="fi" placeholder="Access codes, tenant info, parking instructions, specific areas to focus on..." value={form.notes} onChange={e => set("notes", e.target.value)} />
              </div>
              <div style={{ padding: "14px 16px", background: "var(--orange-lo)", borderRadius: "var(--r)", border: "1px solid var(--orange-md)", fontSize: 13, color: "var(--body)", lineHeight: 1.65 }}>
                By submitting, you authorize 1Stop Service Pro to assign a certified vendor to this request. You will receive real-time status updates as the job progresses.
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button type="button" className="btn btn-outline" onClick={() => setStep(2)}>Back</button>
                <button type="submit" className={`btn btn-primary btn-lg ${loading ? "btn-loading" : ""}`} disabled={loading} style={{ gap: 8 }}>
                  {!loading && <>{I.send} Submit Request</>}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PM: PROPERTIES
// ─────────────────────────────────────────────────────────────────────
function PMProps({ onNav, showToast, isDemo }) {
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);

  const doAdd = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setShowAdd(false); showToast("Property added successfully.", "ok"); }, 1100);
  };

  return (
    <div>
      {isDemo && <DemoBanner role="pm" onNav={onNav} />}
      <div className="ph">
        <div className="ph-row">
          <div>
            <div className="ph-title">Your <b>Properties</b></div>
            <div className="ph-sub">{PROPS.length} properties in portfolio</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}>{I.plus} Add Property</button>
        </div>
      </div>
      <div className="g2 a-up">
        {PROPS.map(p => (
          <div className="prop-card card-hover" key={p.id}>
            <div className="prop-banner">
              <div className="prop-banner-pattern" />
              <div className="prop-banner-label">{p.name.split(" ").map(w => w[0]).join("").slice(0, 3)}</div>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
              <div className="prop-name">{p.name}</div>
              {p.reqs > 0 && <span className="badge b-orange">{p.reqs} active</span>}
            </div>
            <div className="prop-addr">{p.addr}</div>
            <div className="prop-stats">
              <span className="prop-stat"><b>{p.units}</b> Units</span>
              <span className="prop-stat" style={{ marginLeft: 16 }}><b>{p.reqs}</b> Open Requests</span>
            </div>
            <div className="divider" />
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-outline btn-sm" onClick={() => onNav("pm-reqs")}>View Requests</button>
              <button className="btn btn-primary btn-sm" onClick={() => onNav("pm-new")}>New Request</button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <div className="overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">Add Property</div>
              <button className="modal-x" onClick={() => setShowAdd(false)}>{I.x}</button>
            </div>
            <div className="fstack">
              <div className="fg"><label className="fl">Property Name</label><input className="fi" placeholder="Hillcrest Apartments" /></div>
              <div className="fg"><label className="fl">Street Address</label><input className="fi" placeholder="1234 Maple St" /></div>
              <div className="fr">
                <div className="fg"><label className="fl">City</label><input className="fi" placeholder="Atlanta" /></div>
                <div className="fg"><label className="fl">State</label><select className="fi"><option value="">Select</option>{["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"].map(s => <option key={s}>{s}</option>)}</select></div>
              </div>
              <div className="fg"><label className="fl">Number of Units</label><input className="fi" type="number" placeholder="48" min="1" /></div>
              <button className={`btn btn-primary btn-full btn-lg ${loading ? "btn-loading" : ""}`} onClick={doAdd} disabled={loading}>{!loading && "Add Property"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PM: ACCOUNT
// ─────────────────────────────────────────────────────────────────────
function PMAcct({ showToast, isDemo, onNav }) {
  const [saving, setSaving] = useState(false);
  const save = () => { setSaving(true); setTimeout(() => { setSaving(false); showToast("Profile saved.", "ok"); }, 900); };

  return (
    <div>
      {isDemo && <DemoBanner role="pm" onNav={onNav} />}
      <div className="ph">
        <div className="ph-title">Account <b>Settings</b></div>
        <div className="ph-sub">Manage profile, notifications, and billing</div>
      </div>
      <div style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="card card-pad a-up">
          <div className="ch"><div className="ch-title">Profile Information</div></div>
          <div className="fstack">
            <div className="fr">
              <div className="fg"><label className="fl">First Name</label><input className="fi" defaultValue="Marcus" /></div>
              <div className="fg"><label className="fl">Last Name</label><input className="fi" defaultValue="Johnson" /></div>
            </div>
            <div className="fg"><label className="fl">Email Address</label><input className="fi" defaultValue="marcus@hillcrestgroup.com" /></div>
            <div className="fg"><label className="fl">Company</label><input className="fi" defaultValue="Hillcrest Property Group" /></div>
            <div className="fg"><label className="fl">Phone</label><input className="fi" defaultValue="(404) 555-0177" /></div>
            <button className={`btn btn-primary ${saving ? "btn-loading" : ""}`} style={{ alignSelf: "flex-start" }} onClick={save} disabled={saving}>{!saving && "Save Changes"}</button>
          </div>
        </div>
        <div className="card card-pad a-up d1">
          <div className="ch"><div className="ch-title">Notification Preferences</div></div>
          {["Job Assigned to Vendor","Vendor Arrived On Site","Job Completed","Invoice Ready","Urgent Status Change"].map((pref, i) => (
            <div key={pref} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < 4 ? "1px solid var(--border)" : "none" }}>
              <span style={{ fontSize: 13.5, color: "var(--body)" }}>{pref}</span>
              <div className="toggle"><div className="toggle-thumb" /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// VENDOR: DASHBOARD
// ─────────────────────────────────────────────────────────────────────
function VDash({ onNav, showToast, isDemo }) {
  return (
    <div>
      {isDemo && <DemoBanner role="vendor" onNav={onNav} />}
      <div className="ph">
        <div className="ph-row">
          <div>
            <div className="ph-title">Dashboard — <b>CleanPro LLC</b></div>
            <div className="ph-sub">1 active job · 2 scheduled this week · Atlanta, GA market</div>
          </div>
          <div className="ph-actions">
            <span className="badge b-green badge-dot">Verified Vendor</span>
            <span style={{ fontFamily: "var(--font-m)", fontSize: 12, color: "var(--body)", padding: "6px 12px", background: "var(--bg-2)", borderRadius: "var(--r-sm)", border: "1px solid var(--border)" }}>Rating 4.9 / 5.0</span>
          </div>
        </div>
      </div>

      <div className="stat-grid sg4">
        {[
          { l:"Today's Jobs",    v:"1",      d:"In progress now",      ac:"accent" },
          { l:"Scheduled",       v:"2",      d:"Remaining this week",  ac:"blue" },
          { l:"Month Earnings",  v:"$3,240", d:"+12% vs last month",   ac:"green" },
          { l:"Completion Rate", v:"98%",    d:"Last 30 days",         ac:"" },
        ].map((k, i) => (
          <div key={i} className={`tile ${k.ac} a-up d${i + 1}`}>
            <div className="tile-label">{k.l}</div>
            <div className={`tile-value ${k.ac === "accent" ? "orange" : k.ac === "green" ? "green" : ""}`}>{k.v}</div>
            <div className={`tile-delta ${k.ac === "" ? "neutral" : ""}`}>{k.d}</div>
          </div>
        ))}
      </div>

      <div className="ga-wide">
        <div>
          <div style={{ fontFamily: "var(--font-d)", fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 14 }}>Active & Upcoming Jobs</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {VJOBS.slice(0, 3).map((j, i) => (
              <div key={j.id} className={`jcard ${j.status === "In Progress" ? "active" : ""} a-up d${i + 1}`}>
                {j.status === "In Progress" && <div className="jcard-live"><div className="live-dot" /><span style={{ fontSize: 11, fontWeight: 600, color: "var(--orange)" }}>Live</span></div>}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, paddingRight: j.status === "In Progress" ? 60 : 0 }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-d)", fontSize: 15, fontWeight: 700, color: "var(--navy)", marginBottom: 2 }}>{j.svc}</div>
                    <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{j.prop} — Unit {j.unit}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-d)", fontSize: 18, fontWeight: 800, color: "var(--orange)" }}>${j.amt}</span>
                    {statusBadge(j.status)}
                  </div>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--muted)", lineHeight: 1.55, marginBottom: 12 }}>{j.notes}</div>
                <div className="jcard-meta">
                  <span className="jcard-meta-item">{I.pin}{j.addr.split(",")[1]?.trim()}</span>
                  <span className="jcard-meta-item">{I.cal}{j.date}</span>
                  <span className="jcard-meta-item">{I.clock}{j.time}</span>
                </div>
                {j.status === "In Progress" && (
                  <button className="btn btn-primary btn-full" style={{ marginTop: 12 }} onClick={() => showToast("Job marked complete. Invoice submitted.", "ok")}>
                    {I.check} Mark Job Complete
                  </button>
                )}
                {j.status === "Scheduled" && (
                  <button className="btn btn-outline-orange btn-full" style={{ marginTop: 12 }} onClick={() => showToast("Job started. Timer is now running.", "ok")}>
                    Start Job
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card card-pad a-up d2">
            <div className="ch">
              <div>
                <div className="ch-title">Earnings — June</div>
                <div className="ch-sub">By property</div>
              </div>
            </div>
            {[{ n:"Hillcrest Apartments", v:1420, pct:80 }, { n:"Riverside Commons", v:780, pct:44 }, { n:"Palmetto HOA", v:340, pct:19 }, { n:"Bayview Office", v:700, pct:39 }].map(e => (
              <div key={e.n} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: "var(--body)" }}>{e.n}</span>
                  <strong style={{ color: "var(--navy)" }}>${e.v}</strong>
                </div>
                <div className="prog"><div className="prog-fill" style={{ width: `${e.pct}%` }} /></div>
              </div>
            ))}
            <div className="divider" />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 600, color: "var(--muted)" }}>Total</span>
              <span style={{ fontFamily: "var(--font-d)", fontSize: 18, fontWeight: 800, color: "var(--orange)" }}>$3,240</span>
            </div>
          </div>

          <div className="card card-pad a-up d3">
            <div className="ch">
              <div className="ch-title">Team</div>
              <button className="btn btn-ghost btn-sm" onClick={() => onNav("v-team")}>Manage</button>
            </div>
            {[
              { name:"Darius Washington", role:"Lead Technician",    s:"On Job" },
              { name:"Carmen Rivera",     role:"Janitorial",          s:"Active" },
              { name:"Tony Bell",         role:"Maintenance",         s:"Scheduled" },
            ].map(m => (
              <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <div className="av av-orange">{initials(m.name)}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)" }}>{m.name}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{m.role}</div>
                </div>
                {statusBadge(m.s)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// VENDOR: JOBS
// ─────────────────────────────────────────────────────────────────────
function VJobs({ showToast, isDemo, onNav }) {
  const [filter, setFilter] = useState("All");
  const rows = filter === "All" ? VJOBS : VJOBS.filter(j => j.status === filter);

  return (
    <div>
      {isDemo && <DemoBanner role="vendor" onNav={onNav} />}
      <div className="ph">
        <div className="ph-title">My <b>Jobs</b></div>
        <div className="ph-sub">{VJOBS.length} assigned jobs</div>
      </div>
      <div className="tabs-row">
        {["All","In Progress","Scheduled","Completed"].map(s => <div key={s} className={`tab ${filter === s ? "on" : ""}`} onClick={() => setFilter(s)}>{s}</div>)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {rows.map((j, i) => (
          <div key={j.id} className={`jcard ${j.status === "In Progress" ? "active" : ""} a-up d${Math.min(i + 1, 4)}`}>
            {j.status === "In Progress" && <div className="jcard-live"><div className="live-dot" /><span style={{ fontSize: 11, fontWeight: 600, color: "var(--orange)" }}>Live</span></div>}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, paddingRight: j.status === "In Progress" ? 60 : 0 }}>
              <div>
                <div style={{ fontFamily: "var(--font-d)", fontSize: 16, fontWeight: 800, color: "var(--navy)", marginBottom: 2 }}>{j.svc}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{j.prop} — Unit {j.unit}</div>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-d)", fontSize: 20, fontWeight: 800, color: "var(--orange)" }}>${j.amt}</span>
                {statusBadge(j.status)}
              </div>
            </div>
            <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 12 }}>{j.notes}</div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid var(--border)" }}>
              {[[I.pin,"Location",j.addr],[I.cal,"Date",j.date],[I.clock,"Time",j.time]].map(([ic, k, v]) => (
                <div key={k}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".8px", color: "var(--muted)", marginBottom: 3 }}>{k}</div>
                  <div style={{ fontSize: 12, color: "var(--body)", display: "flex", alignItems: "center", gap: 5, fontFamily: "var(--font-m)" }}>
                    <span style={{ display: "flex" }}>{ic}</span>{v}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {j.status === "In Progress" && <button className="btn btn-primary btn-sm" onClick={() => showToast("Job completed. Invoice submitted.", "ok")}>{I.check} Mark Complete</button>}
              {j.status === "Scheduled"   && <button className="btn btn-outline-orange btn-sm" onClick={() => showToast("Job started.", "ok")}>Start Job</button>}
              {j.status === "Completed"   && <button className="btn btn-outline btn-sm" onClick={() => showToast("Invoice opened.", "ok")}>View Invoice</button>}
              <button className="btn btn-ghost btn-sm" onClick={() => showToast("Notes saved.", "ok")}>Add Note</button>
            </div>
          </div>
        ))}
        {rows.length === 0 && <div className="empty card">{I.list}<div className="empty-t">No jobs found</div><div className="empty-s">No {filter.toLowerCase()} jobs at this time</div></div>}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// VENDOR: EARNINGS
// ─────────────────────────────────────────────────────────────────────
function VEarn({ showToast, isDemo, onNav }) {
  return (
    <div>
      {isDemo && <DemoBanner role="vendor" onNav={onNav} />}
      <div className="ph">
        <div className="ph-row">
          <div>
            <div className="ph-title"><b>Earnings</b> and Payouts</div>
            <div className="ph-sub">Revenue tracking and payout history</div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => showToast("Statement exported.", "ok")}>{I.export} Export Statement</button>
        </div>
      </div>
      <div className="stat-grid sg3">
        {[
          { l:"This Month",  v:"$3,240", d:"+12% vs last", ac:"accent" },
          { l:"Last Month",  v:"$2,890", d:"May 2025",     ac:"" },
          { l:"All Time",    v:"$28,450",d:"Since Jan 2025",ac:"green" },
        ].map((s, i) => (
          <div key={i} className={`tile ${s.ac} a-up d${i + 1}`}>
            <div className="tile-label">{s.l}</div>
            <div className={`tile-value ${s.ac === "accent" ? "orange" : s.ac === "green" ? "green" : ""}`}>{s.v}</div>
            <div className={`tile-delta ${s.ac === "" ? "neutral" : ""}`}>{s.d}</div>
          </div>
        ))}
      </div>
      <div className="card a-up d1">
        <div className="card-pad" style={{ paddingBottom: 0 }}>
          <div className="ch"><div className="ch-title">Payout History</div></div>
        </div>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Date</th><th>Property</th><th>Service</th><th>Job ID</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {[
                { date:"Jun 25", prop:"Hillcrest Apartments",  svc:"HVAC",            id:"JOB-104", amt:450 },
                { date:"Jun 22", prop:"Bayview Office Center", svc:"Carpet Cleaning",  id:"JOB-103", amt:220 },
                { date:"Jun 18", prop:"Riverside Commons",     svc:"Turnover Cleaning",id:"JOB-102", amt:285 },
                { date:"Jun 15", prop:"Palmetto HOA",          svc:"Daily Janitorial", id:"JOB-101", amt:320 },
              ].map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: "var(--font-m)", fontSize: 12 }}>{p.date}</td>
                  <td><strong>{p.prop}</strong></td>
                  <td>{p.svc}</td>
                  <td><span className="mono">{p.id}</span></td>
                  <td><strong>${p.amt}</strong></td>
                  <td><span className="badge b-green badge-dot">Paid</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// VENDOR: TEAM
// ─────────────────────────────────────────────────────────────────────
function VTeam({ showToast, isDemo, onNav }) {
  const [showAdd, setShowAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const members = [
    { name:"Darius Washington", email:"darius@cleanpro.com", role:"Lead Technician",      s:"On Job",   jobs:12 },
    { name:"Carmen Rivera",     email:"carmen@cleanpro.com", role:"Janitorial Specialist", s:"Active",   jobs:9  },
    { name:"Tony Bell",         email:"tony@cleanpro.com",   role:"Maintenance Tech",      s:"Scheduled",jobs:7  },
  ];

  const doAdd = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setShowAdd(false); showToast("SMS invite sent successfully.", "ok"); }, 1000);
  };

  return (
    <div>
      {isDemo && <DemoBanner role="vendor" onNav={onNav} />}
      <div className="ph">
        <div className="ph-row">
          <div>
            <div className="ph-title">My <b>Team</b></div>
            <div className="ph-sub">{members.length} active employees · employees see jobs only, no financial data</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => setShowAdd(true)}>{I.plus} Add Employee</button>
        </div>
      </div>
      <div className="card a-up">
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Employee</th><th>Role</th><th>Jobs This Month</th><th>Status</th><th>Access Level</th><th></th></tr></thead>
            <tbody>
              {members.map(m => (
                <tr key={m.name}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="av av-orange">{initials(m.name)}</div>
                      <div><strong>{m.name}</strong><br /><span style={{ fontSize: 11, color: "var(--muted)" }}>{m.email}</span></div>
                    </div>
                  </td>
                  <td>{m.role}</td>
                  <td><strong>{m.jobs}</strong></td>
                  <td>{statusBadge(m.s)}</td>
                  <td><span className="badge b-gray">Jobs Only</span></td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => showToast("Edit employee opened.", "ok")}>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdd && (
        <div className="overlay" onClick={() => setShowAdd(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div className="modal-title">Add Employee</div>
              <button className="modal-x" onClick={() => setShowAdd(false)}>{I.x}</button>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", marginBottom: 22, lineHeight: 1.65 }}>
              Employees receive an SMS invite link. They can view assigned jobs only and cannot access financial data.
            </p>
            <div className="fstack">
              <div className="fr">
                <div className="fg"><label className="fl">First Name</label><input className="fi" placeholder="John" /></div>
                <div className="fg"><label className="fl">Last Name</label><input className="fi" placeholder="Doe" /></div>
              </div>
              <div className="fg"><label className="fl">Mobile Number</label><input className="fi" type="tel" placeholder="(404) 555-0100" /></div>
              <div className="fg"><label className="fl">Role / Position</label><input className="fi" placeholder="HVAC Technician" /></div>
              <button className={`btn btn-primary btn-full btn-lg ${loading ? "btn-loading" : ""}`} onClick={doAdd} disabled={loading}>{!loading && "Send SMS Invite"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// VENDOR: ACCOUNT
// ─────────────────────────────────────────────────────────────────────
function VAcct({ showToast, isDemo, onNav }) {
  const [saving, setSaving] = useState(false);
  const save = () => { setSaving(true); setTimeout(() => { setSaving(false); showToast("Profile updated.", "ok"); }, 900); };

  return (
    <div>
      {isDemo && <DemoBanner role="vendor" onNav={onNav} />}
      <div className="ph">
        <div className="ph-title">Account <b>Settings</b></div>
        <div className="ph-sub">Business profile, service categories, and payout setup</div>
      </div>
      <div style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="card card-pad a-up">
          <div className="ch"><div className="ch-title">Business Information</div></div>
          <div className="fstack">
            <div className="fg"><label className="fl">Business Name</label><input className="fi" defaultValue="CleanPro LLC" /></div>
            <div className="fr">
              <div className="fg"><label className="fl">Owner First</label><input className="fi" defaultValue="Marcus" /></div>
              <div className="fg"><label className="fl">Owner Last</label><input className="fi" defaultValue="Thompson" /></div>
            </div>
            <div className="fg"><label className="fl">Business Phone</label><input className="fi" defaultValue="(404) 555-0199" /></div>
            <div className="fg">
              <label className="fl">Primary Market</label>
              <select className="fi">
                <option>Atlanta, GA</option><option>Orlando, FL</option><option>Tampa, FL</option><option>Miami, FL</option>
              </select>
            </div>
            <div className="fg">
              <label className="fl">Service Categories</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 6 }}>
                {SVCS.slice(0, 4).map(s => <span key={s.id} className="badge b-orange" style={{ cursor: "pointer" }}>{s.name}</span>)}
                <button className="btn btn-outline btn-sm" onClick={() => showToast("Category added.", "ok")}>{I.plus} Add</button>
              </div>
            </div>
            <button className={`btn btn-primary ${saving ? "btn-loading" : ""}`} style={{ alignSelf: "flex-start" }} onClick={save} disabled={saving}>{!saving && "Save Changes"}</button>
          </div>
        </div>
        <div className="card card-pad a-up d1">
          <div className="ch"><div className="ch-title">Payout Setup</div></div>
          <div className="fstack">
            <div className="fg"><label className="fl">Bank Account</label><input className="fi" defaultValue="••••  ••••  ••••  4821" readOnly /></div>
            <div className="fg">
              <label className="fl">Payout Schedule</label>
              <select className="fi">
                <option>Weekly — Every Friday</option><option>Bi-weekly</option><option>Monthly</option>
              </select>
            </div>
            <button className="btn btn-outline" style={{ alignSelf: "flex-start" }} onClick={() => showToast("Bank update flow opened.", "ok")}>Update Bank Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ADMIN: DASHBOARD
// ─────────────────────────────────────────────────────────────────────
function ADash({ onNav, showToast }) {
  return (
    <div>
      <div className="ph">
        <div className="ph-row">
          <div>
            <div className="ph-title"><b>Admin</b> Overview</div>
            <div className="ph-sub">All markets · June 2025 · Platform-wide data</div>
          </div>
          <div className="ph-actions">
            <button className="btn btn-outline btn-sm" onClick={() => showToast("Report exported.", "ok")}>{I.export} Export Report</button>
            <button className="btn btn-primary btn-sm" onClick={() => onNav("a-reqs")}>Manage Requests {I.arrow}</button>
          </div>
        </div>
      </div>

      <div className="stat-grid sg4">
        {[
          { l:"Requests (MTD)",  v:"247",    d:"+34% vs last month",  ac:"accent" },
          { l:"Active Vendors",  v:"89",     d:"Across 12 markets",   ac:"blue" },
          { l:"Properties",      v:"163",    d:"+8 this week",         ac:"green" },
          { l:"Revenue (MTD)",   v:"$41.2K", d:"+28% vs last month",  ac:"" },
        ].map((k, i) => (
          <div key={i} className={`tile ${k.ac} a-up d${i + 1}`}>
            <div className="tile-label">{k.l}</div>
            <div className={`tile-value ${k.ac === "accent" ? "orange" : k.ac === "green" ? "green" : ""}`}>{k.v}</div>
            <div className={`tile-delta ${k.ac === "" ? "neutral" : ""}`}>{k.d}</div>
          </div>
        ))}
      </div>

      <div className="ga">
        <div className="card a-up d2">
          <div className="card-pad" style={{ paddingBottom: 0 }}>
            <div className="ch">
              <div>
                <div className="ch-title">Pending Vendor Assignment</div>
                <div className="ch-sub">Requires immediate action</div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => showToast("All requests assigned.", "ok")}>Assign All</button>
            </div>
          </div>
          <div className="table-wrap">
            <table className="tbl">
              <thead><tr><th>ID</th><th>Service</th><th>Property</th><th>Priority</th><th>Action</th></tr></thead>
              <tbody>
                {REQUESTS.filter(r => !r.vendor).map(r => (
                  <tr key={r.id}>
                    <td><span className="mono">{r.id}</span></td>
                    <td><strong>{r.svc}</strong></td>
                    <td style={{ fontSize: 12 }}>{r.prop}</td>
                    <td>{priorityBadge(r.priority)}</td>
                    <td><button className="btn btn-primary btn-sm" onClick={() => showToast(`Vendor assigned to ${r.id}.`, "ok")}>Assign {I.arrow}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div className="card card-pad a-up d3">
            <div className="ch"><div className="ch-title">Top Markets</div></div>
            {[["Atlanta, GA",84,24,"$14.2K"],["Orlando, FL",67,19,"$11.1K"],["Tampa, FL",52,15,"$8.6K"],["Miami, FL",44,18,"$7.3K"]].map(([c,r,v,rev], i) => (
              <div key={c} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none" }}>
                <div style={{ width: 26, height: 26, background: "var(--orange-lo)", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-d)", fontSize: 12, fontWeight: 800, color: "var(--orange)", flexShrink: 0 }}>{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>{c}</div>
                  <div style={{ fontSize: 11, color: "var(--muted)" }}>{r} requests · {v} vendors</div>
                </div>
                <strong style={{ color: "var(--orange)", fontFamily: "var(--font-d)", fontSize: 15 }}>{rev}</strong>
              </div>
            ))}
          </div>

          <div className="card card-pad a-up d4">
            <div className="ch"><div className="ch-title">Services Breakdown</div></div>
            {[["Turnover Cleaning",31,76],["HVAC",24,59],["Plumbing",18,44],["Janitorial",14,35],["Other",13,33]].map(([n, p, c]) => (
              <div key={n} style={{ marginBottom: 13 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 5 }}>
                  <span style={{ color: "var(--body)" }}>{n}</span>
                  <span style={{ color: "var(--muted)", fontFamily: "var(--font-m)", fontSize: 11 }}>{c} jobs · <strong style={{ color: "var(--navy)" }}>{p}%</strong></span>
                </div>
                <div className="prog"><div className="prog-fill" style={{ width: `${p * 3}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ADMIN: REQUESTS
// ─────────────────────────────────────────────────────────────────────
function AReqs({ showToast }) {
  return (
    <div>
      <div className="ph">
        <div className="ph-row">
          <div>
            <div className="ph-title">All Service <b>Requests</b></div>
            <div className="ph-sub">Platform-wide · all markets and properties</div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => showToast("CSV exported.", "ok")}>{I.export} Export CSV</button>
        </div>
      </div>
      <div className="card a-up">
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>ID</th><th>Service</th><th>Property / Unit</th><th>Manager</th><th>Vendor</th><th>Priority</th><th>Status</th><th>Amount</th><th></th></tr></thead>
            <tbody>
              {REQUESTS.map(r => (
                <tr key={r.id}>
                  <td><span className="mono">{r.id}</span></td>
                  <td><strong>{r.svc}</strong></td>
                  <td>{r.prop}<br /><span style={{ fontSize: 11, color: "var(--muted)" }}>{r.unit}</span></td>
                  <td style={{ fontSize: 12 }}>Marcus J.</td>
                  <td style={{ fontSize: 12 }}>{r.vendor || <span style={{ color: "var(--orange)", fontWeight: 700, fontSize: 11 }}>UNASSIGNED</span>}</td>
                  <td>{priorityBadge(r.priority)}</td>
                  <td>{statusBadge(r.status)}</td>
                  <td><strong>${r.amt}</strong></td>
                  <td>
                    {!r.vendor
                      ? <button className="btn btn-primary btn-sm" onClick={() => showToast(`Vendor assigned to ${r.id}.`, "ok")}>Assign</button>
                      : <button className="btn btn-ghost btn-sm" onClick={() => showToast("Request details opened.", "ok")}>{I.eye}</button>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ADMIN: VENDORS
// ─────────────────────────────────────────────────────────────────────
function AVend({ showToast }) {
  const vends = [
    { name:"CleanPro LLC",        owner:"Marcus T.", svcs:["Janitorial","Turnover"], mkt:"Atlanta, GA",   jobs:47, rating:4.9, s:"Active", rev:"$8,240"  },
    { name:"Metro Plumbing Co.",  owner:"James R.",  svcs:["Plumbing"],              mkt:"Orlando, FL",   jobs:33, rating:4.8, s:"Active", rev:"$5,900"  },
    { name:"AirFlow Pros",        owner:"Sarah D.",  svcs:["HVAC"],                  mkt:"Tampa, FL",     jobs:28, rating:5.0, s:"Active", rev:"$12,600" },
    { name:"RestoreMasters",      owner:"Chris W.",  svcs:["Restoration"],           mkt:"Miami, FL",     jobs:15, rating:4.7, s:"Active", rev:"$18,000" },
    { name:"BrightCoat Painting", owner:"Ana M.",    svcs:["Painting"],              mkt:"Charlotte, NC", jobs:22, rating:4.6, s:"Inactive",rev:"$3,100"  },
  ];

  return (
    <div>
      <div className="ph">
        <div className="ph-row">
          <div>
            <div className="ph-title">Vendor <b>Network</b></div>
            <div className="ph-sub">{vends.length} registered vendors across all markets</div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => showToast("Invitation sent.", "ok")}>{I.plus} Invite Vendor</button>
        </div>
      </div>
      <div className="card a-up">
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Company</th><th>Services</th><th>Market</th><th>Jobs</th><th>Rating</th><th>Revenue</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {vends.map(v => (
                <tr key={v.name}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="av av-navy">{v.name.charAt(0)}</div>
                      <div><strong>{v.name}</strong><br /><span style={{ fontSize: 11, color: "var(--muted)" }}>{v.owner}</span></div>
                    </div>
                  </td>
                  <td>{v.svcs.map(s => <span key={s} className="badge b-gray" style={{ marginRight: 4, marginBottom: 2, display: "inline-flex" }}>{s}</span>)}</td>
                  <td style={{ fontSize: 12 }}>{v.mkt}</td>
                  <td><strong>{v.jobs}</strong></td>
                  <td style={{ fontFamily: "var(--font-m)", fontSize: 12 }}><span style={{ color: "var(--orange)", fontWeight: 700 }}>{v.rating}</span></td>
                  <td><strong>{v.rev}</strong></td>
                  <td>{statusBadge(v.s)}</td>
                  <td><button className="btn btn-ghost btn-sm" onClick={() => showToast("Vendor profile opened.", "ok")}>Manage</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ADMIN: PROPERTIES
// ─────────────────────────────────────────────────────────────────────
function AProps({ showToast }) {
  return (
    <div>
      <div className="ph">
        <div className="ph-row">
          <div>
            <div className="ph-title">All <b>Properties</b></div>
            <div className="ph-sub">{PROPS.length} onboarded properties across all markets</div>
          </div>
          <button className="btn btn-outline btn-sm" onClick={() => showToast("Properties exported.", "ok")}>{I.export} Export</button>
        </div>
      </div>
      <div className="card a-up">
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Property</th><th>Manager</th><th>Market</th><th>Units</th><th>Open Requests</th><th>Status</th></tr></thead>
            <tbody>
              {PROPS.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong></td>
                  <td style={{ fontSize: 12 }}>Marcus Johnson</td>
                  <td style={{ fontSize: 12 }}>{p.addr.split(",").slice(1).join(",").trim()}</td>
                  <td><strong>{p.units}</strong></td>
                  <td>{p.reqs > 0 ? <span className="badge b-orange">{p.reqs}</span> : <span style={{ color: "var(--muted)", fontSize: 12 }}>None</span>}</td>
                  <td><span className="badge b-green badge-dot">Active</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ADMIN: SETTINGS
// ─────────────────────────────────────────────────────────────────────
function ASet({ showToast }) {
  const [saving, setSaving] = useState(false);
  const save = () => { setSaving(true); setTimeout(() => { setSaving(false); showToast("Settings saved.", "ok"); }, 900); };

  return (
    <div>
      <div className="ph">
        <div className="ph-title">Platform <b>Settings</b></div>
        <div className="ph-sub">Fee structures, active markets, and platform configuration</div>
      </div>
      <div style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 16 }}>
        <div className="card card-pad a-up">
          <div className="ch"><div className="ch-title">Revenue Split Configuration</div></div>
          <div className="fstack">
            <div className="fr">
              <div className="fg"><label className="fl">Platform Commission (%)</label><input className="fi" defaultValue="18" type="number" /></div>
              <div className="fg"><label className="fl">Vendor Payout (%)</label><input className="fi" defaultValue="82" type="number" /></div>
            </div>
            <div className="fr">
              <div className="fg"><label className="fl">Emergency Surcharge (%)</label><input className="fi" defaultValue="25" type="number" /></div>
              <div className="fg"><label className="fl">Minimum Job Value ($)</label><input className="fi" defaultValue="85" type="number" /></div>
            </div>
            <button className={`btn btn-primary ${saving ? "btn-loading" : ""}`} style={{ alignSelf: "flex-start" }} onClick={save} disabled={saving}>{!saving && "Save Configuration"}</button>
          </div>
        </div>
        <div className="card card-pad a-up d1">
          <div className="ch">
            <div className="ch-title">Active Markets</div>
            <button className="btn btn-primary btn-sm" onClick={() => showToast("Market added.", "ok")}>{I.plus} Add Market</button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["Atlanta, GA","Orlando, FL","Tampa, FL","Miami, FL","Charlotte, NC","Nashville, TN","Dallas, TX","Houston, TX"].map(m => (
              <span key={m} className="badge b-green badge-dot" style={{ fontSize: 12, padding: "5px 12px" }}>{m}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// VENDOR: AVAILABLE JOBS (Key Differentiator)
// ─────────────────────────────────────────────────────────────────────
const AVAIL_JOBS = [
  { id:"AJ-009", svc:"Turnover Cleaning",    prop:"Sunset Ridge Apartments", addr:"2200 Peachtree Rd, Atlanta, GA",  unit:"Unit 14-A",   date:"Jul 3",  time:"9:00 AM",  est:"$260–$310",  urgency:"Urgent",  dist:"3.2 mi" },
  { id:"AJ-008", svc:"HVAC Maintenance",     prop:"Lakewood Commons",         addr:"810 Lakewood Ave, Atlanta, GA",   unit:"Common Area", date:"Jul 4",  time:"8:00 AM",  est:"$380–$450",  urgency:"Normal",  dist:"5.8 mi" },
  { id:"AJ-007", svc:"General Maintenance",  prop:"Midtown Plaza Office",     addr:"1500 West Peachtree, Atlanta, GA",unit:"Suite 3B",    date:"Jul 3",  time:"11:00 AM", est:"$140–$180",  urgency:"Normal",  dist:"4.1 mi" },
  { id:"AJ-006", svc:"Daily Janitorial",     prop:"Buckhead Tower",           addr:"3399 Peachtree Rd, Atlanta, GA",  unit:"All Floors",  date:"Jul 5",  time:"7:00 AM",  est:"$420–$500",  urgency:"Normal",  dist:"6.4 mi" },
  { id:"AJ-005", svc:"Emergency Restoration",prop:"Vine City Residences",     addr:"700 Martin Luther King Dr, GA",   unit:"Units 2–4",   date:"Today",  time:"ASAP",     est:"$800–$1,200",urgency:"Critical",dist:"2.9 mi" },
];

function VAvail({ showToast, isDemo, onNav }) {
  const [accepted, setAccepted] = useState([]);
  const urgColor = { Critical:"red", Urgent:"orange", Normal:"blue" };

  return (
    <div>
      {isDemo && <DemoBanner role="vendor" onNav={onNav} />}
      <div className="ph">
        <div className="ph-row">
          <div>
            <div className="ph-title">Available <b>Jobs</b></div>
            <div className="ph-sub">New work orders in your market — accept before another vendor does</div>
          </div>
          <div className="ph-actions">
            <span className="badge b-orange" style={{fontSize:13,padding:"6px 14px"}}>Atlanta, GA Market</span>
          </div>
        </div>
      </div>
      <div style={{background:"var(--orange-lo)",border:"1px solid var(--orange-md)",borderRadius:"var(--r-lg)",padding:"14px 18px",marginBottom:22,display:"flex",alignItems:"center",gap:12}}>
        {I.info}
        <span style={{fontSize:13,color:"var(--navy)",lineHeight:1.6}}>
          <strong>How it works:</strong> These are open requests from property managers in your service area. 
          Accept a job to lock it in — first come, first served. You have <strong>30 minutes</strong> to accept before it goes to the next vendor.
        </span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {AVAIL_JOBS.map((j, i) => {
          const isAccepted = accepted.includes(j.id);
          return (
            <div key={j.id} className={`jcard a-up d${Math.min(i+1,4)} ${j.urgency==="Critical"?"active":""}`} style={{opacity: isAccepted ? 0.6 : 1}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:12}}>
                <div style={{flex:1,paddingRight:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                    <span style={{fontFamily:"var(--font-d)",fontSize:16,fontWeight:800,color:"var(--navy)"}}>{j.svc}</span>
                    <span className={`badge b-${urgColor[j.urgency]}`}>{j.urgency}</span>
                    {isAccepted && <span className="badge b-green badge-dot">Accepted</span>}
                  </div>
                  <div style={{fontSize:13,color:"var(--muted)"}}>{j.prop} — {j.unit}</div>
                </div>
                <div style={{textAlign:"right",flexShrink:0}}>
                  <div style={{fontFamily:"var(--font-d)",fontSize:18,fontWeight:800,color:"var(--green)"}}>{j.est}</div>
                  <div style={{fontSize:11,color:"var(--muted)",marginTop:2}}>estimated payout</div>
                </div>
              </div>
              <div style={{display:"flex",gap:20,flexWrap:"wrap",marginBottom:14,paddingBottom:14,borderBottom:"1px solid var(--border)"}}>
                {[[I.pin,"Distance",j.dist],[I.cal,"Date",j.date],[I.clock,"Time",j.time],[I.pin,"Address",j.addr]].map(([ic,k,v])=>(
                  <div key={k}>
                    <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".8px",color:"var(--muted)",marginBottom:3}}>{k}</div>
                    <div style={{fontSize:12,color:"var(--body)",display:"flex",alignItems:"center",gap:5,fontFamily:"var(--font-m)"}}><span style={{display:"flex"}}>{ic}</span>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                {!isAccepted ? (
                  <>
                    <button className="btn btn-primary" onClick={()=>{setAccepted(a=>[...a,j.id]);showToast(`Job ${j.id} accepted! Added to your schedule.`,"ok")}}>
                      {I.check} Accept Job
                    </button>
                    <button className="btn btn-outline btn-sm" onClick={()=>showToast("Job details expanded.","ok")}>View Details</button>
                    <button className="btn btn-ghost btn-sm" style={{color:"var(--red)"}} onClick={()=>showToast("Job declined.","ok")}>Decline</button>
                  </>
                ) : (
                  <button className="btn btn-ghost btn-sm" onClick={()=>onNav("v-jobs")}>View in My Jobs {I.arrow}</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// VENDOR: PERFORMANCE
// ─────────────────────────────────────────────────────────────────────
function VPerf({ isDemo, onNav }) {
  return (
    <div>
      {isDemo && <DemoBanner role="vendor" onNav={onNav} />}
      <div className="ph">
        <div className="ph-title"><b>Performance</b> Metrics</div>
        <div className="ph-sub">How property managers see your business — ratings, response times, quality scores</div>
      </div>
      <div className="stat-grid sg4">
        {[
          {l:"Overall Rating",   v:"4.9",    d:"Based on 47 reviews",  ac:"accent"},
          {l:"Acceptance Rate",  v:"94%",    d:"Jobs accepted vs offered",ac:"green"},
          {l:"On-Time Rate",     v:"97%",    d:"Last 90 days",          ac:"green"},
          {l:"Avg Response",     v:"8 min",  d:"To new job offers",     ac:"blue"},
        ].map((k,i)=>(
          <div key={i} className={`tile ${k.ac} a-up d${i+1}`}>
            <div className="tile-label">{k.l}</div>
            <div className={`tile-value ${k.ac==="accent"?"orange":k.ac==="green"?"green":""}`}>{k.v}</div>
            <div className="tile-delta">{k.d}</div>
          </div>
        ))}
      </div>
      <div className="g2">
        <div className="card card-pad a-up d1">
          <div className="ch"><div className="ch-title">Recent Reviews</div></div>
          {[
            {prop:"Hillcrest Apartments",  rating:5, comment:"Exceptional turnaround on Unit B-302. Spotless and on time.", date:"Jun 25"},
            {prop:"Riverside Commons",     rating:5, comment:"Team was professional and communicated well throughout.",    date:"Jun 20"},
            {prop:"Bayview Office Center", rating:4, comment:"Great job overall. Minor detail missed on one unit.",       date:"Jun 15"},
            {prop:"Palmetto HOA",          rating:5, comment:"Fastest response we've ever gotten. Highly recommend.",     date:"Jun 10"},
          ].map((r,i)=>(
            <div key={i} style={{padding:"14px 0",borderBottom:i<3?"1px solid var(--border)":"none"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <strong style={{fontSize:13,color:"var(--navy)"}}>{r.prop}</strong>
                <div style={{display:"flex",gap:2}}>
                  {[1,2,3,4,5].map(s=>(
                    <svg key={s} viewBox="0 0 14 14" width="13" height="13" fill={s<=r.rating?"var(--orange)":"var(--border-2)"}><path d="M7 1l1.5 4h4L9 8l1.5 4L7 10l-3.5 2L5 8 1.5 5h4z"/></svg>
                  ))}
                </div>
              </div>
              <div style={{fontSize:13,color:"var(--muted)",lineHeight:1.55}}>{r.comment}</div>
              <div style={{fontSize:11,color:"var(--subtle)",marginTop:4,fontFamily:"var(--font-m)"}}>{r.date}</div>
            </div>
          ))}
        </div>
        <div className="card card-pad a-up d2">
          <div className="ch"><div className="ch-title">Quality Benchmarks</div></div>
          {[
            {l:"Completion Rate",  v:98, color:"green"},
            {l:"Customer Sat.",    v:96, color:"green"},
            {l:"Photo Compliance", v:89, color:"orange"},
            {l:"Response Speed",   v:94, color:"green"},
            {l:"Repeat Bookings",  v:78, color:"blue"},
          ].map(m=>(
            <div key={m.l} style={{marginBottom:16}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:6}}>
                <span style={{color:"var(--body)"}}>{m.l}</span>
                <strong style={{color:"var(--navy)"}}>{m.v}%</strong>
              </div>
              <div className="prog"><div className={`prog-fill ${m.color}`} style={{width:`${m.v}%`}}/></div>
            </div>
          ))}
          <div className="divider"/>
          <div style={{padding:"14px",background:"var(--green-lo)",borderRadius:"var(--r)",border:"1px solid rgba(29,184,122,0.25)"}}>
            <div style={{fontSize:12,fontWeight:700,color:"var(--green)",marginBottom:5}}>TOP VENDOR STATUS</div>
            <div style={{fontSize:13,color:"var(--body)",lineHeight:1.55}}>Your ratings qualify you for priority job assignment. You receive new jobs before standard vendors in your market.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PM: INVOICES & BILLING
// ─────────────────────────────────────────────────────────────────────
const INVOICES = [
  {id:"INV-0041",req:"REQ-0039",svc:"HVAC",prop:"Hillcrest Apartments",vendor:"AirFlow Pros",    date:"Jun 25",due:"Jul 10",amt:450, status:"Paid"},
  {id:"INV-0040",req:"REQ-0037",svc:"Emergency Restoration",prop:"Palmetto HOA",vendor:"RestoreMasters",date:"Jun 27",due:"Jul 12",amt:1200,status:"Due"},
  {id:"INV-0039",req:"REQ-0040",svc:"Plumbing",prop:"Riverside Commons",vendor:"Metro Plumbing Co.",date:"Jun 22",due:"Jul 7", amt:190, status:"Paid"},
  {id:"INV-0038",req:"REQ-0038",svc:"Daily Janitorial",prop:"Bayview Office Center",vendor:"Pending",date:"Jul 1",due:"Jul 16",amt:320, status:"Pending"},
  {id:"INV-0037",req:"REQ-0035",svc:"Turnover Cleaning",prop:"Hillcrest Apartments",vendor:"CleanPro LLC",date:"Jun 18",due:"Jul 3",amt:285,status:"Paid"},
];

function PMInv({ showToast, isDemo, onNav }) {
  const [filter, setFilter] = useState("All");
  const rows = filter==="All" ? INVOICES : INVOICES.filter(i=>i.status===filter);
  const total = INVOICES.reduce((s,i)=>s+i.amt,0);
  const paid = INVOICES.filter(i=>i.status==="Paid").reduce((s,i)=>s+i.amt,0);
  const due = INVOICES.filter(i=>i.status==="Due").reduce((s,i)=>s+i.amt,0);

  return (
    <div>
      {isDemo && <DemoBanner role="pm" onNav={onNav} />}
      <div className="ph">
        <div className="ph-row">
          <div>
            <div className="ph-title">Invoices <b>&amp; Billing</b></div>
            <div className="ph-sub">All invoices across every property and vendor</div>
          </div>
          <div className="ph-actions">
            <button className="btn btn-outline btn-sm" onClick={()=>showToast("Invoices exported.","ok")}>{I.export} Export All</button>
          </div>
        </div>
      </div>
      <div className="stat-grid sg3">
        {[
          {l:"Total Invoiced (MTD)",v:`$${total.toLocaleString()}`,d:"June 2025",ac:"accent"},
          {l:"Paid",v:`$${paid.toLocaleString()}`,d:"Processed",ac:"green"},
          {l:"Outstanding",v:`$${due.toLocaleString()}`,d:"Due within 15 days",ac:""},
        ].map((k,i)=>(
          <div key={i} className={`tile ${k.ac} a-up d${i+1}`}>
            <div className="tile-label">{k.l}</div>
            <div className={`tile-value ${k.ac==="accent"?"orange":k.ac==="green"?"green":""}`}>{k.v}</div>
            <div className={`tile-delta ${k.ac===""?"neutral":""}`}>{k.d}</div>
          </div>
        ))}
      </div>
      <div className="tabs-row">
        {["All","Paid","Due","Pending"].map(s=><div key={s} className={`tab ${filter===s?"on":""}`} onClick={()=>setFilter(s)}>{s}</div>)}
      </div>
      <div className="card a-up">
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Invoice</th><th>Request</th><th>Service</th><th>Property</th><th>Vendor</th><th>Date</th><th>Due</th><th>Amount</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {rows.map(inv=>{
                const sColor = inv.status==="Paid"?"green":inv.status==="Due"?"orange":"gray";
                return (
                  <tr key={inv.id}>
                    <td><span className="mono">{inv.id}</span></td>
                    <td><span className="mono" style={{fontSize:11,color:"var(--muted)"}}>{inv.req}</span></td>
                    <td><strong>{inv.svc}</strong></td>
                    <td style={{fontSize:12}}>{inv.prop}</td>
                    <td style={{fontSize:12}}>{inv.vendor}</td>
                    <td style={{fontFamily:"var(--font-m)",fontSize:12}}>{inv.date}</td>
                    <td style={{fontFamily:"var(--font-m)",fontSize:12}}>{inv.due}</td>
                    <td><strong>${inv.amt}</strong></td>
                    <td><span className={`badge b-${sColor} badge-dot`}>{inv.status}</span></td>
                    <td>
                      <button className="btn btn-ghost btn-sm" onClick={()=>showToast("Invoice downloaded.","ok")}>PDF</button>
                      {inv.status==="Due" && <button className="btn btn-primary btn-sm" style={{marginLeft:4}} onClick={()=>showToast("Payment processed.","ok")}>Pay Now</button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// PM: ANALYTICS
// ─────────────────────────────────────────────────────────────────────
function PMAnalytics({ isDemo, onNav }) {
  const spendData = [
    {month:"Jan",v:1840},{month:"Feb",v:2100},{month:"Mar",v:1650},{month:"Apr",v:2800},
    {month:"May",v:2400},{month:"Jun",v:3240},
  ];
  const max = Math.max(...spendData.map(d=>d.v));

  return (
    <div>
      {isDemo && <DemoBanner role="pm" onNav={onNav} />}
      <div className="ph">
        <div className="ph-title">Spend <b>Analytics</b></div>
        <div className="ph-sub">Understand where your maintenance budget is going</div>
      </div>
      <div className="stat-grid sg4">
        {[
          {l:"Total YTD",    v:"$14,030",d:"Jan – Jun 2025",    ac:"accent"},
          {l:"This Month",   v:"$3,240", d:"+35% vs last month", ac:"green"},
          {l:"Avg Per Job",  v:"$289",   d:"Across 23 completed",ac:""},
          {l:"Cost / Unit",  v:"$19.81", d:"Per unit per month", ac:"blue"},
        ].map((k,i)=>(
          <div key={i} className={`tile ${k.ac} a-up d${i+1}`}>
            <div className="tile-label">{k.l}</div>
            <div className={`tile-value ${k.ac==="accent"?"orange":k.ac==="green"?"green":""}`}>{k.v}</div>
            <div className={`tile-delta ${k.ac===""?"neutral":""}`}>{k.d}</div>
          </div>
        ))}
      </div>
      <div className="g2">
        <div className="card card-pad a-up d1">
          <div className="ch"><div className="ch-title">Monthly Spend</div><div className="ch-sub">Last 6 months</div></div>
          <div style={{display:"flex",alignItems:"flex-end",gap:10,height:180,paddingBottom:8}}>
            {spendData.map(d=>(
              <div key={d.month} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
                <div style={{fontSize:11,fontWeight:600,color:"var(--muted)",fontFamily:"var(--font-m)"}}>${(d.v/1000).toFixed(1)}k</div>
                <div style={{width:"100%",background:"var(--orange)",borderRadius:"6px 6px 0 0",height:`${(d.v/max)*140}px`,transition:"height 0.6s ease",minHeight:4}}/>
                <div style={{fontSize:11,color:"var(--muted)"}}>{d.month}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card card-pad a-up d2">
          <div className="ch"><div className="ch-title">Spend by Service Type</div></div>
          {[
            {l:"Turnover Cleaning", v:31, amt:"$4,349"},
            {l:"HVAC",             v:22, amt:"$3,087"},
            {l:"Emergency Resto.", v:17, amt:"$2,385"},
            {l:"Plumbing",         v:14, amt:"$1,964"},
            {l:"Janitorial",       v:9,  amt:"$1,263"},
            {l:"Other",            v:7,  amt:"$982"},
          ].map(s=>(
            <div key={s.l} style={{marginBottom:13}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:5}}>
                <span style={{color:"var(--body)"}}>{s.l}</span>
                <span style={{color:"var(--muted)",fontFamily:"var(--font-m)",fontSize:11}}>{s.amt} · <strong style={{color:"var(--navy)"}}>{s.v}%</strong></span>
              </div>
              <div className="prog"><div className="prog-fill" style={{width:`${s.v*3}%`}}/></div>
            </div>
          ))}
        </div>
      </div>
      <div className="card card-pad a-up d3" style={{marginTop:16}}>
        <div className="ch"><div className="ch-title">Spend by Property</div></div>
        <div className="table-wrap">
          <table className="tbl">
            <thead><tr><th>Property</th><th>Units</th><th>Total Spend</th><th>Cost / Unit</th><th>Jobs</th><th>Top Service</th></tr></thead>
            <tbody>
              {[
                {n:"Hillcrest Apartments",  u:48, spend:"$6,420", cpu:"$133.75", jobs:11, top:"Turnover Cleaning"},
                {n:"Riverside Commons",     u:32, spend:"$3,890", cpu:"$121.56", jobs:7,  top:"Plumbing"},
                {n:"Bayview Office Center", u:12, spend:"$2,100", cpu:"$175.00", jobs:3,  top:"Daily Janitorial"},
                {n:"Palmetto HOA",          u:24, spend:"$1,620", cpu:"$67.50",  jobs:2,  top:"Emergency Restoration"},
              ].map(r=>(
                <tr key={r.n}>
                  <td><strong>{r.n}</strong></td>
                  <td>{r.u}</td>
                  <td><strong>{r.spend}</strong></td>
                  <td style={{fontFamily:"var(--font-m)",fontSize:12}}>{r.cpu}</td>
                  <td>{r.jobs}</td>
                  <td style={{fontSize:12}}>{r.top}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView]     = useState("home");
  const [role, setRole]     = useState(null);
  const [user, setUser]     = useState(null);
  const [toast, setToast]   = useState(null);
  const [isDemo, setIsDemo] = useState(false);

  const showToast = (msg, type = "ok") => setToast({ msg, type });

  const nav = s => {
    setView(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const login = r => {
    const names = { pm:"Marcus Johnson", vendor:"CleanPro LLC", admin:"Platform Admin" };
    setRole(r);
    setUser(names[r]);
    setIsDemo(false);
    nav(r === "pm" ? "pm-dash" : r === "vendor" ? "v-dash" : "a-dash");
  };

  // Direct portal access (no login)
  const enterDemo = r => {
    const names = { pm:"Marcus Johnson", vendor:"CleanPro LLC", admin:"Platform Admin" };
    setRole(r);
    setUser(names[r]);
    setIsDemo(true);
    nav(r === "pm" ? "pm-dash" : r === "vendor" ? "v-dash" : "a-dash");
  };

  const logout = () => {
    setRole(null); setUser(null); setIsDemo(false); nav("home");
  };

  // Handle nav — if no role and user hits a portal page, auto-demo them
  const handleNav = s => {
    const pmPages = ["pm-dash","pm-props","pm-reqs","pm-new","pm-acct","pm-inv","pm-anal"];
    const vPages  = ["v-dash","v-jobs","v-team","v-earn","v-acct","v-avail","v-perf"];
    const aPages  = ["a-dash","a-reqs","a-props","a-vend","a-set"];

    if (!role) {
      if (pmPages.includes(s)) { enterDemo("pm"); return; }
      if (vPages.includes(s))  { enterDemo("vendor"); return; }
      if (aPages.includes(s))  { enterDemo("admin"); return; }
    }
    nav(s);
  };

  const props = { onNav: handleNav, showToast, isDemo };

  const renderView = () => {
    switch (view) {
      case "home":          return <Landing onNav={handleNav} />;
      case "pm-login":      return <AuthScreen mode="login"  role="pm"     onLogin={login} onNav={handleNav} />;
      case "pm-signup":     return <AuthScreen mode="signup" role="pm"     onLogin={login} onNav={handleNav} />;
      case "vendor-login":  return <AuthScreen mode="login"  role="vendor" onLogin={login} onNav={handleNav} />;
      case "vendor-signup": return <AuthScreen mode="signup" role="vendor" onLogin={login} onNav={handleNav} />;
      case "admin-login":   return <AuthScreen mode="login"  role="admin"  onLogin={login} onNav={handleNav} />;
      case "pm-dash":       return <PMDash     {...props} />;
      case "pm-reqs":       return <PMReqs     {...props} />;
      case "pm-props":      return <PMProps    {...props} />;
      case "pm-new":        return <PMNew      {...props} />;
      case "pm-inv":        return <PMInv      {...props} />;
      case "pm-anal":       return <PMAnalytics {...props} />;
      case "pm-acct":       return <PMAcct     {...props} />;
      case "v-dash":        return <VDash   {...props} />;
      case "v-avail":       return <VAvail  {...props} />;
      case "v-jobs":        return <VJobs   {...props} />;
      case "v-team":        return <VTeam   {...props} />;
      case "v-earn":        return <VEarn   {...props} />;
      case "v-perf":        return <VPerf   {...props} />;
      case "v-acct":        return <VAcct   {...props} />;
      case "a-dash":        return <ADash   {...props} />;
      case "a-reqs":        return <AReqs   {...props} />;
      case "a-props":       return <AProps  {...props} />;
      case "a-vend":        return <AVend   {...props} />;
      case "a-set":         return <ASet    {...props} />;
      default:              return <Landing onNav={handleNav} />;
    }
  };

  const inPortal = role !== null;

  return (
    <>
      <G />
      <Nav view={view} onNav={handleNav} role={role} onLogout={logout} />

      {inPortal ? (
        <div className="portal-shell">
          <Sidebar role={role} active={view} onNav={handleNav} user={user} />
          <main className="portal-main">
            <div key={view} className="a-in">{renderView()}</div>
          </main>
        </div>
      ) : (
        <div style={{ paddingTop: "var(--nav-h)" }}>
          <div key={view} className="a-in">{renderView()}</div>
        </div>
      )}

      {toast && <Toast msg={toast.msg} type={toast.type} clear={() => setToast(null)} />}

      {/* Hidden admin entry */}
      {!inPortal && view === "home" && (
        <div style={{ position: "fixed", bottom: 12, left: 12, zIndex: 999 }}>
          <button className="btn btn-ghost btn-sm" style={{ opacity: 0.2, fontSize: 10, color: "var(--muted)" }} onClick={() => enterDemo("admin")}>
            {I.shield} Admin
          </button>
        </div>
      )}
    </>
  );
}
