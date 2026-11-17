var ht=Object.defineProperty;var bt=(e,r,n)=>r in e?ht(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n;var D=(e,r,n)=>bt(e,typeof r!="symbol"?r+"":r,n);import{A as xt,D as Se}from"./index-DdSJJAJd.js";const ft={menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',bookmark:'<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',panel_right:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',back:'<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',forward:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',skip_back:'<polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/>',skip_forward:'<polygon points="13 19 22 12 13 5 13 19"/><polygon points="2 19 11 12 2 5 2 19"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'};function me(e){return`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ft[e]}</svg>`}function le(e,r,n=!1){const o=document.createElement("button");return o.type="button",o.className="rx-icon-btn",o.setAttribute("aria-label",e),o.innerHTML=me(r),n&&o.setAttribute("aria-pressed","false"),o}function mt(e){e.classList.add("reader-shell");const r=document.createElement("div");r.className="rx-zones";const n=document.createElement("div");n.className="rx-zone rx-zone-left",n.setAttribute("role","button"),n.setAttribute("tabindex","0"),n.setAttribute("aria-label","Previous page");const o=document.createElement("div");o.className="rx-zone rx-zone-centre",o.setAttribute("role","button"),o.setAttribute("tabindex","0"),o.setAttribute("aria-label","Toggle bars");const t=document.createElement("div");t.className="rx-zone rx-zone-right",t.setAttribute("role","button"),t.setAttribute("tabindex","0"),t.setAttribute("aria-label","Next page"),r.append(n,o,t);const a=document.createElement("div");a.className="rx-bar rx-bar-top",a.setAttribute("role","toolbar");const i=le("Table of contents","menu",!0),l=le("Bookmark","bookmark",!0),c=le("Text settings","settings",!0),s=le("Open context panel","panel_right",!0),g=document.createElement("div");g.className="rx-bar-spacer",a.append(i,l,g,c,s);const h=document.createElement("div");h.className="rx-bar rx-bar-bottom";const f=document.createElement("div");f.className="rx-status-row",f.setAttribute("aria-live","polite");const d=le("Back","back");d.disabled=!0;const u=document.createElement("span");u.className="rx-chapter-label";const m=le("Forward","forward");m.disabled=!0,f.append(d,u,m);const v=document.createElement("input");return v.type="range",v.className="rx-scrubber",v.min="0",v.max="1000",v.step="1",v.value="0",v.setAttribute("aria-label","Reading position"),h.append(f,v),e.append(r,a,h),{root:e,zones:r,zoneLeft:n,zoneCentre:o,zoneRight:t,topBar:a,bottomBar:h,contentsBtn:i,bookmarkBtn:l,settingsBtn:c,contextBtn:s,historyBackBtn:d,historyForwardBtn:m,chapterLabel:u,scrubber:v}}const gt=`
.reader-shell {
  /* Without this, a real touch drag can be claimed by the browser's own native horizontal pan
   * before our pointerdown/pointermove/pointerup swipe tracking (left-sidebar/mount.ts,
   * right-sidebar swipe) ever sees a pointerup - Chromium fires pointercancel instead once it
   * decides the gesture is a scroll, which a mouse-simulated drag never triggers (only real
   * touch input goes through the native pan/scroll arbitration), so this bug was invisible to a
   * mouse-based e2e test and only reproduced with real touch events. pan-y keeps vertical list
   * scroll inside sidebars working while handing horizontal drags to our own JS. */
  touch-action: pan-y;
  --rx-ground: #fbfbfa;
  --rx-ink: #17181a;
  --rx-accent: #356aef;
  --rx-accent-ink: #ffffff;
  --rx-surface: #ffffff;
  --rx-surface-2: #f1f2f4;
  --rx-border: #e2e4e8;
  --rx-muted: #70747c;

  --rx-font-sans: -apple-system, 'Segoe UI', Roboto, 'Inter', Arial, sans-serif;
  --rx-font-serif: Georgia, 'Iowan Old Style', 'Times New Roman', serif;

  --rx-radius: 10px;
  --rx-space-1: 4px;
  --rx-space-2: 8px;
  --rx-space-3: 14px;
  --rx-space-4: 24px;
  --rx-elevation: 0 10px 24px rgba(20, 20, 30, 0.14);

  --rx-motion-fast: 140ms;
  --rx-motion-bar: 200ms ease;

  /* Protocol v2 configure.insets (A3): status bar / nav bar padding a host reports. Default
   * 0px so a v1-only host (never sends configure) sees no change at all - src/shell/insets.ts
   * sets these on the root, mount.ts re-applies them on every later configure. */
  --rx-inset-top: 0px;
  --rx-inset-right: 0px;
  --rx-inset-bottom: 0px;
  --rx-inset-left: 0px;

  position: relative;
  width: 100%;
  height: 100%;
  /* clip, not hidden: off-canvas overlay panels (left/right sidebars, this file's own settings
   * sheet) sit permanently translated outside the 0..100% box via transform, which still
   * counts towards this element's scrollWidth. overflow: hidden lets a focus() call on any of
   * them still shift scrollLeft via the browser's native scroll-into-view (hidden only suppresses
   * the scrollbar and user-driven scrolling, not programmatic/focus-triggered scrolling) and
   * visibly uncover whichever panel is off-canvas. clip disallows scrolling outright (CSS
   * Overflow Module Level 3), which is what a chrome root that must never scroll actually needs. */
  overflow: clip;
  background: var(--rx-ground);
  color: var(--rx-ink);
  font-family: var(--rx-font-sans);
  box-sizing: border-box;
}
.reader-shell.theme-dark {
  --rx-ground: #0b0f1a;
  --rx-ink: #e7ecf7;
  --rx-surface: #12172a;
  --rx-surface-2: #1a2036;
  --rx-border: #2a3250;
  --rx-muted: #9aa3bd;
  /* A dark background needs a lighter accent than the light theme's #356aef to read as text
   * at 4.5:1 (axe color-contrast on the Settings toggle pills, U9 fix); accent-ink flips to
   * black to match, since that same lighter blue fails as a background under white text. */
  --rx-accent: #7aa2ff;
  --rx-accent-ink: #000000;
}
/* AMOLED chrome (U6 Theme tab swatch, U9 contrast pass): true black ground/surface so an
 * AMOLED panel can switch pixels off, with the same 4.5:1-minimum muted tone as theme-dark
 * rather than theme-dark's own muted (9aa3bd is still >=4.5:1 on pure black, kept identical). */
.reader-shell.theme-amoled {
  --rx-ground: #000000;
  --rx-ink: #ffffff;
  --rx-surface: #000000;
  --rx-surface-2: #0a0a0a;
  --rx-border: #2a2a2a;
  --rx-muted: #a6a6a6;
  --rx-accent: #7aa2ff;
  --rx-accent-ink: #000000;
}
/* E-ink (SHELL.md fixes #2-#4): opaque surfaces, square corners, no shadow, no hiding chrome. */
.reader-shell.e-ink {
  --rx-ground: #ffffff;
  --rx-ink: #000000;
  --rx-accent: #000000;
  --rx-accent-ink: #ffffff;
  --rx-surface: #ffffff;
  --rx-surface-2: #f2f2f2;
  --rx-border: #000000;
  --rx-muted: #3a3a3a;
  --rx-radius: 0px;
  --rx-elevation: none;
}
.reader-shell.e-ink *,
.reader-shell.reduced-motion * {
  transition: none !important;
  animation: none !important;
}

.reader-shell * {
  box-sizing: border-box;
}

/* Zone overlay (SHELL.md z-layer 20): pointer-events: none always - core's own doc handlers
 * see every pointer event directly (src/core/selection.ts), so an opaque overlay here would
 * block native text selection. Zones exist as real elements only for keyboard/switch-access
 * parity and the optional debug visualisation. */
.rx-zones {
  position: absolute;
  inset: 0;
  z-index: 20;
  display: flex;
  pointer-events: none;
}
.rx-zone {
  height: 100%;
  pointer-events: none;
}
.rx-zone-left,
.rx-zone-right {
  width: 30%;
}
.rx-zone-centre {
  width: 40%;
  flex: 1 1 auto;
}
.reader-shell.show-zones .rx-zone {
  background: color-mix(in srgb, var(--rx-accent) 12%, transparent);
  outline: 1px dashed var(--rx-accent);
}
.reader-shell.e-ink.show-zones .rx-zone {
  background: none;
  outline: 2px dashed var(--rx-ink);
}

.rx-bar {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: var(--rx-space-2);
  padding: var(--rx-space-2) calc(var(--rx-space-3) + var(--rx-inset-right)) var(--rx-space-2) calc(var(--rx-space-3) + var(--rx-inset-left));
  background: color-mix(in srgb, var(--rx-surface) 92%, transparent);
  border-color: var(--rx-border);
  transition: transform var(--rx-motion-bar);
}
.reader-shell.e-ink .rx-bar {
  background: var(--rx-surface);
}
/* E-ink forces an opaque, bordered edge on the bars instead of blur or elevation (SHELL.md
 * fix #3): a device accessibility requirement, not a general-purpose decorative line. */
.reader-shell.e-ink .rx-bar-top {
  border-bottom: 1px solid var(--rx-ink); /* taste-skill-ignore: e-ink has no shadow to separate the bar, needs a real border */
}
.reader-shell.e-ink .rx-bar-bottom {
  border-top: 1px solid var(--rx-ink); /* taste-skill-ignore: e-ink has no shadow to separate the bar, needs a real border */
}
.rx-bar-top {
  top: 0;
  padding-top: calc(var(--rx-space-2) + var(--rx-inset-top));
  box-shadow: var(--rx-elevation); /* taste-skill-ignore: real sticky overlay bar, not an at-rest element */
  transform: translateY(-100%);
}
.rx-bar-bottom {
  bottom: 0;
  padding-bottom: calc(var(--rx-space-2) + var(--rx-inset-bottom));
  box-shadow: 0 -10px 24px rgba(20, 20, 30, 0.14); /* taste-skill-ignore: real sticky overlay bar, not an at-rest element */
  flex-direction: column;
  align-items: stretch;
  gap: var(--rx-space-1);
  /* U7's bottom override in src/shell/playback/stylesheet.ts lifts this bar above a docked
   * playback bar while visible; the hidden offset has to add the same inset back on top of its
   * own height, or sliding down by only 100% lands this bar inside the reserved playback-bar
   * strip instead of fully below the viewport (U7 review: stray Forward arrow ghosting over the
   * playback bar's position readout). */
  transform: translateY(calc(100% + var(--rx-book-inset-bottom, 0px)));
}
.reader-shell.ui-visible .rx-bar-top,
.reader-shell.ui-visible .rx-bar-bottom {
  transform: translateY(0);
}

.rx-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  min-width: 48px;
  min-height: 48px;
  border: none;
  background: none;
  color: var(--rx-ink);
  border-radius: var(--rx-radius);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}
.rx-icon-btn:hover {
  background: var(--rx-surface-2);
}
.rx-icon-btn[aria-pressed='true'] {
  color: var(--rx-accent);
}
.rx-icon-btn:disabled {
  opacity: 0.4;
  cursor: default;
}
.rx-icon-btn:focus-visible,
.rx-zone:focus-visible {
  outline: 2px solid var(--rx-accent);
  outline-offset: 2px;
}
.rx-icon-btn svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.rx-bar-spacer {
  flex: 1 1 auto;
}

.rx-status-row {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: var(--rx-space-2);
  font-size: 13px;
  color: var(--rx-muted);
  min-height: 20px;
}

.rx-scrubber {
  appearance: none;
  width: 100%;
  height: 48px;
  margin: 0;
  background: transparent;
}
.rx-scrubber::-webkit-slider-runnable-track {
  height: 4px;
  background: var(--rx-border);
  border-radius: 2px;
}
.rx-scrubber::-webkit-slider-thumb {
  appearance: none;
  width: 16px;
  height: 16px;
  margin-top: -6px;
  border-radius: 50%;
  background: var(--rx-accent);
}
.reader-shell.e-ink .rx-scrubber::-webkit-slider-thumb {
  border-radius: 0;
}

/* Size classes (SHELL.md section 2): layout hooks for later U tasks; U1 itself only needs the
 * class present on the root for its own and future components to read. */
.reader-shell.size-phone {
}
.reader-shell.size-fold-tablet {
}
.reader-shell.size-desktop {
}

.rx-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
`,vt=599,yt=1200;function Ce(e){return e<=vt?"phone":e<=yt?"fold-tablet":"desktop"}const _e=.3;function kt(e,r){const n=Math.min(1,Math.max(0,e));return n<_e?r?"next":"prev":n>1-_e?r?"prev":"next":"toggle"}const wt=new Set(["ArrowRight","ArrowDown","PageDown"," "]),Et=new Set(["ArrowLeft","ArrowUp","PageUp"]);function St(e){return e.ctrlKey||e.metaKey||e.altKey?null:wt.has(e.key)?"next":Et.has(e.key)?"prev":e.key==="m"||e.key==="M"?"toggleBars":e.key==="Escape"?"escape":null}function Ct(e){return e==="next"||e==="prev"}const Lt='<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',At='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function $e(e,r){const n=document.createElement("button");return n.type="button",n.className="rx-icon-btn",n.setAttribute("aria-label",e),n.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,n}function Tt(e){const r=document.createElement("div");r.className="rx-left-sidebar",r.setAttribute("aria-label","Table of contents"),r.tabIndex=-1;const n=document.createElement("div");n.className="rx-left-sidebar-scrim";const o=document.createElement("div");o.className="rx-sidebar-head";const t=$e("Back",Lt),a=document.createElement("h3");a.className="rx-sidebar-title",a.textContent="Contents";const i=$e("Close contents",At);i.classList.add("rx-left-sidebar-close"),o.append(t,a,i);const l=document.createElement("div");l.className="rx-left-sidebar-tabs",l.setAttribute("role","tablist");function c(L,T){const S=document.createElement("button");return S.type="button",S.className="rx-left-sidebar-tab",S.setAttribute("role","tab"),S.setAttribute("aria-selected","false"),S.setAttribute("data-tab",T),S.id=`rx-tab-${T}`,S.textContent=L,S}const s=c("Contents","contents"),g=c("Starred","starred"),h=c("Related","related");l.append(s,g,h);const f=document.createElement("div");f.className="rx-left-sidebar-body";function d(L){const T=document.createElement("div");return T.className="rx-sidebar-panel",T.setAttribute("role","tabpanel"),T.setAttribute("data-panel",L),T.setAttribute("aria-labelledby",`rx-tab-${L}`),T.hidden=!0,T}const u=d("contents"),m=document.createElement("div");m.className="rx-toc-scroll";const v=document.createElement("div");v.className="rx-toc-spacer";const p=document.createElement("div");p.className="rx-toc-window",p.setAttribute("role","list"),v.appendChild(p),m.appendChild(v),u.appendChild(m);const A=d("starred"),z=d("related");return f.append(u,A,z),r.append(o,l,f),e.append(n,r),{root:r,scrim:n,backBtn:t,closeBtn:i,title:a,tablist:l,tabContents:s,tabStarred:g,tabRelated:h,body:f,panelContents:u,tocScroll:m,tocSpacer:v,tocWindow:p,panelStarred:A,panelRelated:z}}const Bt=`
.rx-left-sidebar {
  position: absolute;
  inset: 0 auto 0 0;
  z-index: 40;
  display: flex;
  flex-direction: column;
  width: 88%;
  max-width: 340px;
  background: var(--rx-surface);
  border-right: 1px solid var(--rx-border);
  transform: translateX(-100%);
  transition: transform var(--rx-motion-bar, 200ms ease);
}
.reader-shell.size-fold-tablet .rx-left-sidebar {
  width: 78%;
  max-width: 320px;
}
/* SHELL.md U2 row: "desktop ... pushes book column". The sidebar itself stays absolutely
 * positioned (inset 0 auto 0 0, same as the overlay rule above) even on desktop: the shell root
 * is not a flex container, so a non-absolute "docked" sidebar would sit in normal block flow and
 * push every element after it - including the book column - down the page instead of beside it.
 * The actual column push is done in JS by the shared setBookInsets helper (src/shell/layout.ts,
 * also used by U3's right sidebar), which reserves the space as padding on the shell root - no
 * CSS !important fight with core's own inline style. */
.reader-shell.size-desktop .rx-left-sidebar {
  width: 280px;
  max-width: 280px;
  transform: none;
}
.reader-shell.size-desktop .rx-left-sidebar.closed {
  display: none;
}
.rx-left-sidebar.open {
  transform: translateX(0);
  box-shadow: var(--rx-elevation); /* taste-skill-ignore: real overlay dialog while narrow, not an at-rest element */
}
.reader-shell.size-desktop .rx-left-sidebar.open {
  box-shadow: none; /* taste-skill-ignore: docked (non-modal) presentation carries no shadow */
}
.reader-shell.e-ink .rx-left-sidebar {
  box-shadow: none; /* taste-skill-ignore: e-ink never carries a shadow (SHELL.md fix #2) */
  border-right: 1px solid var(--rx-ink); /* taste-skill-ignore: e-ink has no shadow to separate the docked/overlay panel, needs a real border */
}

/* Docked layouts only (SHELL.md section 2: Desktop docks the left sidebar and pushes the book
 * column; Fold unfolded/Tablet overlays it instead, so mount.ts's updateBookInsets only ever sets
 * a nonzero --rx-book-inset-left on desktop - this rule is a no-op anywhere else). A docked
 * sidebar is not behind a scrim, so without pulling the bars/zones in by the same reserved width,
 * their own controls (Contents, Bookmark) would sit under the panel: visible but unreachable to a
 * real pointer click. Mirrors U3's identical rule for the right sidebar
 * (src/shell/right-sidebar/stylesheet.ts), both reading the one shared inset helper. */
.reader-shell.rx-left-sidebar-open:not(.size-phone) .rx-bar,
.reader-shell.rx-left-sidebar-open:not(.size-phone) .rx-zones {
  left: var(--rx-book-inset-left, 0px);
}

/* Named distinctly from the right sidebar's own .rx-sidebar-scrim (src/shell/right-sidebar/
 * stylesheet.ts): both modules are mounted into the same shell root, so a shared class name here
 * would let one module's rules (display-toggled) cascade onto the other's element (opacity-based)
 * since CSS only matches by class, not by owning module. */
.rx-left-sidebar-scrim {
  position: absolute;
  inset: 0;
  z-index: 35;
  background: color-mix(in srgb, #000 40%, transparent);
  display: none;
}
.reader-shell.e-ink .rx-left-sidebar-scrim {
  background: #000;
}
.rx-left-sidebar-scrim.visible {
  display: block;
}
.reader-shell.size-desktop .rx-left-sidebar-scrim {
  display: none !important;
}

.rx-sidebar-head {
  display: flex;
  align-items: center;
  gap: var(--rx-space-2);
  padding: var(--rx-space-2) var(--rx-space-2);
  border-bottom: 1px solid var(--rx-border); /* taste-skill-ignore: fixed chrome header above a scrolling list, not a decorative divider */
  flex: 0 0 auto;
}
.rx-sidebar-title {
  flex: 1 1 auto;
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}
.rx-left-sidebar-close {
  display: none;
}
.reader-shell:not(.size-desktop) .rx-left-sidebar-close {
  display: inline-flex;
}

.rx-left-sidebar-tabs {
  display: flex;
  flex: 0 0 auto;
  border-bottom: 1px solid var(--rx-border); /* taste-skill-ignore: tablist/tabpanel boundary (role=tablist), not a decorative divider */
}
.rx-left-sidebar-tab {
  flex: 1 1 0;
  min-height: 48px;
  border: none;
  background: none;
  color: var(--rx-muted);
  font-size: 13px;
  font-family: var(--rx-font-sans);
  cursor: pointer;
  border-bottom: 2px solid transparent;
}
.rx-left-sidebar-tab[aria-selected='true'] {
  color: var(--rx-ink);
  border-bottom-color: var(--rx-accent);
  font-weight: 600;
}
.rx-left-sidebar-tab:focus-visible {
  outline: 2px solid var(--rx-accent);
  outline-offset: -2px;
}

.rx-left-sidebar-body {
  /* Explicit (not just inherited from .reader-shell's ancestor rule): this box is its own
   * scroll container (overflow-y below), and a real touch drag here is exactly what swipe-to-
   * cycle-tabs needs to see complete to pointerup instead of being claimed as a native scroll. */
  touch-action: pan-y;
  flex: 1 1 auto;
  min-height: 0;
  position: relative;
}
.rx-sidebar-panel {
  position: absolute;
  inset: 0;
  overflow: auto;
}
.rx-sidebar-panel[hidden] {
  display: none;
}

.rx-toc-scroll {
  height: 100%;
  overflow-y: auto;
}
.rx-toc-spacer {
  position: relative;
}
.rx-toc-window {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.rx-toc-row {
  display: flex;
  align-items: center;
  min-height: 48px;
  gap: var(--rx-space-1);
}
.rx-toc-row.is-current {
  background: var(--rx-surface-2);
}
.rx-toc-toggle,
.rx-toc-toggle-spacer {
  flex: 0 0 44px;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  color: var(--rx-muted);
  cursor: pointer;
  font-size: 11px;
}
.rx-toc-label {
  flex: 1 1 auto;
  text-align: left;
  border: none;
  background: none;
  color: var(--rx-ink);
  font-family: var(--rx-font-sans);
  font-size: 14px;
  min-height: 48px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
  padding: var(--rx-space-1) 0;
}
.rx-toc-row.is-current .rx-toc-label {
  color: var(--rx-accent);
  font-weight: 600;
}
.rx-toc-star {
  flex: 0 0 48px;
  min-width: 48px;
  min-height: 48px;
  border: none;
  background: none;
  color: var(--rx-muted);
  cursor: pointer;
  font-size: 16px;
}
.rx-toc-star[aria-pressed='true'] {
  color: var(--rx-accent);
}

.rx-sidebar-empty {
  padding: var(--rx-space-4) var(--rx-space-3);
  color: var(--rx-muted);
  font-size: 13px;
}

.rx-starred-row,
.rx-related-row {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 48px;
  gap: var(--rx-space-2);
  padding: var(--rx-space-2) var(--rx-space-3);
  border: none;
  background: none;
  color: var(--rx-ink);
  font-family: var(--rx-font-sans);
  font-size: 14px;
  text-align: left;
  cursor: pointer;
}
.rx-starred-row:hover,
.rx-related-row:hover {
  background: var(--rx-surface-2);
}
.rx-related-cover {
  flex: 0 0 44px;
  width: 44px;
  height: 60px;
  object-fit: cover;
  background: var(--rx-surface-2);
}
.rx-related-cover-empty {
  border: 1px solid var(--rx-border);
}
.rx-related-text {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-width: 0;
}
.rx-related-title {
  font-weight: 500;
}
.rx-related-subtitle {
  color: var(--rx-muted);
  font-size: 12px;
}
.rx-related-badge {
  flex: 0 0 auto;
  font-size: 11px;
  color: var(--rx-muted);
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  padding: 2px 6px;
}
`;function at(e,r=null,n=0){const o=[];for(let t=0;t<e.length;t++){const a=e[t],i=r===null?String(t):`${r}.${t}`;o.push({id:i,label:a.label,href:a.href,depth:n,hasChildren:a.subitems.length>0,parentId:r}),a.subitems.length>0&&o.push(...at(a.subitems,i,n+1))}return o}function Nt(e,r){if(r.size===0)return e;const n=new Set,o=[];for(const t of e){if(t.parentId!==null&&(n.has(t.parentId)||r.has(t.parentId))){n.add(t.id);continue}o.push(t)}return o}function zt(e,r){if(!r)return null;const n=De(r);let o=null;for(const t of e)if(t.href){if(t.href===r)return t.id;o===null&&De(t.href)===n&&(o=t)}return(o==null?void 0:o.id)??null}function It(e,r){if(!r)return null;for(const n of e)if(n.label===r)return n.id;return null}function De(e){const r=e.indexOf("#");return r===-1?e:e.slice(0,r)}function Pt(e,r,n,o,t=8){if(o===0||r<=0)return{start:0,end:-1};const a=Math.floor(e/r),i=Math.ceil(n/r),l=Math.max(0,a-t),c=Math.min(o-1,a+i+t);return{start:l,end:c}}const Le=48;function Mt(e,r,n,o){const t=document.createElement("div");if(t.className="rx-toc-row",t.setAttribute("role","listitem"),t.style.paddingLeft=`${12+e.depth*18}px`,o&&t.classList.add("is-current"),e.hasChildren){const c=document.createElement("button");c.type="button",c.className="rx-toc-toggle";const s=!r.collapsed.has(e.id);c.setAttribute("aria-expanded",String(s)),c.setAttribute("aria-label",`${s?"Collapse":"Expand"} ${e.label}`),c.textContent=s?"▾":"▸",c.addEventListener("click",g=>{g.stopPropagation(),n.onToggleExpand(e)}),t.appendChild(c)}else{const c=document.createElement("span");c.className="rx-toc-toggle-spacer",t.appendChild(c)}const a=document.createElement("button");a.type="button",a.className="rx-toc-label",a.setAttribute("aria-label",e.label),o&&a.setAttribute("aria-current","true"),a.textContent=e.label,a.addEventListener("click",()=>n.onActivate(e)),t.appendChild(a);const i=document.createElement("button");i.type="button",i.className="rx-toc-star";const l=e.href?r.starred.has(e.href):!1;return i.setAttribute("aria-pressed",String(l)),i.setAttribute("aria-label",`${l?"Unstar":"Star"} ${e.label}`),i.textContent=l?"★":"☆",i.addEventListener("click",c=>{c.stopPropagation(),n.onToggleStar(e)}),t.appendChild(i),t}function Ht(e,r,n,o,t){const a=Nt(o.flat,o.collapsed),i=zt(a,o.currentHref)??It(a,o.currentChapterTitle);r.style.height=`${a.length*Le}px`;const l=e.clientHeight||1,{start:c,end:s}=Pt(e.scrollTop,Le,l,a.length);n.replaceChildren(),n.style.transform=`translateY(${c*Le}px)`;for(let g=c;g<=s;g++){const h=a[g];h&&n.appendChild(Mt(h,o,t,h.id===i))}}function Ot(e,r,n){if(e.replaceChildren(),r.length===0){const t=document.createElement("p");t.className="rx-sidebar-empty",t.textContent="No starred chapters yet. Star a chapter in Contents to find it here.",e.appendChild(t);return}const o=document.createElement("div");o.setAttribute("role","list");for(const t of r){const a=document.createElement("button");a.type="button",a.className="rx-starred-row",a.setAttribute("role","listitem"),a.textContent=t.label,a.addEventListener("click",()=>n(t)),o.appendChild(a)}e.appendChild(o)}function Ft(e,r,n){if(e.replaceChildren(),r.length===0){const t=document.createElement("p");t.className="rx-sidebar-empty",t.textContent="No related books yet.",e.appendChild(t);return}const o=document.createElement("div");o.setAttribute("role","list");for(const t of r){const a=document.createElement("button");a.type="button",a.className="rx-related-row",a.setAttribute("role","listitem");const i=`${t.title}${t.subtitle?`, ${t.subtitle}`:""}${t.read?", read":""}`;if(a.setAttribute("aria-label",i),t.coverUrl){const s=document.createElement("img");s.className="rx-related-cover",s.src=t.coverUrl,s.alt="",a.appendChild(s)}else{const s=document.createElement("div");s.className="rx-related-cover rx-related-cover-empty",a.appendChild(s)}const l=document.createElement("div");l.className="rx-related-text";const c=document.createElement("span");if(c.className="rx-related-title",c.textContent=t.title,l.appendChild(c),t.subtitle){const s=document.createElement("span");s.className="rx-related-subtitle",s.textContent=t.subtitle,l.appendChild(s)}if(a.appendChild(l),t.read){const s=document.createElement("span");s.className="rx-related-badge",s.textContent="Read",a.appendChild(s)}a.addEventListener("click",()=>n(t)),o.appendChild(a)}e.appendChild(o)}function ot(e,r){return it(e,r,1)}function st(e,r){return it(e,r,-1)}function it(e,r,n){if(e.length===0)return r;const o=e.indexOf(r);if(o===-1)return e[0];const t=(o+n+e.length)%e.length;return e[t]}function _t(e,r){return ot(e,r)}function $t(e,r){return st(e,r)}const Dt=40;function Rt(e,r){return Math.abs(e)>=Dt&&Math.abs(e)>Math.abs(r)}function lt(e,r,n,o){return Rt(r,n)?e==="sidebar"?{action:r<0?"cycle-next":"cycle-prev"}:e==="book"&&o?{action:"close"}:{action:null}:{action:null}}function ct(e,r,n){return e&&r.contains(e)?"sidebar":e&&n.contains(e)&&!r.contains(e)?"book":"other"}function dt(e,r){let n=0,o=0,t=0,a=0,i=null,l=!1,c=!1;function s(p,A,z,L){n=t=p,o=a=A,i=z,l=!0,c=L}function g(){l&&(l=!1,r.onSwipe(t-n,a-o,i),i=null)}function h(p){p.pointerType!=="pen"&&s(p.clientX,p.clientY,p.target,p.pointerType==="touch")}function f(p){l&&(t=p.clientX,a=p.clientY)}function d(p){t=p.clientX,a=p.clientY,g()}function u(){c||g()}function m(p){if(!l)return;const A=p.touches[0];A&&(t=A.clientX,a=A.clientY)}function v(){g()}return e.addEventListener("pointerdown",h),e.addEventListener("pointermove",f),e.addEventListener("pointerup",d),e.addEventListener("pointercancel",u),e.addEventListener("touchmove",m,{passive:!0}),e.addEventListener("touchend",v,{passive:!0}),{destroy(){e.removeEventListener("pointerdown",h),e.removeEventListener("pointermove",f),e.removeEventListener("pointerup",d),e.removeEventListener("pointercancel",u),e.removeEventListener("touchmove",m),e.removeEventListener("touchend",v)}}}function Gt(e){return Array.from(e.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===e)}function Wt(e){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const t=Gt(e);if(t.length===0){o.preventDefault(),e.focus();return}const a=t[0],i=t[t.length-1],l=e.ownerDocument.activeElement;o.shiftKey&&l===a?(o.preventDefault(),i.focus()):!o.shiftKey&&l===i&&(o.preventDefault(),a.focus())}return e.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,e.removeEventListener("keydown",n)}}}const Re="reactor-left-sidebar-stylesheet";function qt(e){if(e.getElementById(Re))return;const r=e.createElement("style");r.id=Re,r.textContent=Bt,e.head.appendChild(r)}function Ut(e,r,n={}){var k,I;const o=e.ownerDocument??document;qt(o);const t=Tt(e);t.root.classList.add("closed");const a=["contents","starred"];(k=n.capabilities)!=null&&k.related&&a.push("related"),t.tabRelated.hidden=!((I=n.capabilities)!=null&&I.related);let i="contents",l=!1,c=!1,s=[];const g=new Set;let h=null,f=null;const d=new Set;let u=[],m=[];const v=Wt(t.root);let p=null;function A(){return!e.classList.contains("size-desktop")}function z(w){return w==="contents"?t.panelContents:w==="starred"?t.panelStarred:t.panelRelated}function L(w){return w==="contents"?t.tabContents:w==="starred"?t.tabStarred:t.tabRelated}function T(){i==="contents"?Ht(t.tocScroll,t.tocSpacer,t.tocWindow,{flat:s,collapsed:g,currentHref:h,currentChapterTitle:f,starred:d},{onActivate:w=>{w.href&&r(w.href),A()&&N()},onToggleExpand:w=>{g.has(w.id)?g.delete(w.id):g.add(w.id),T()},onToggleStar:w=>{var V;if(!w.href)return;const O=!d.has(w.href);O?d.add(w.href):d.delete(w.href),(V=n.onStarToggle)==null||V.call(n,w.href,w.label,O),T()}}):i==="starred"?Ot(t.panelStarred,u,w=>{r(w.href),A()&&N()}):Ft(t.panelRelated,m,w=>{var O;(O=n.onOpenRelated)==null||O.call(n,w.id),A()&&N()})}function S(w){w!==i&&(L(i).setAttribute("aria-selected","false"),z(i).hidden=!0,i=w,L(i).setAttribute("aria-selected","true"),z(i).hidden=!1,T())}function B(w){const O=w===1?_t(a,i):$t(a,i);S(O)}t.tabContents.addEventListener("click",()=>S("contents")),t.tabStarred.addEventListener("click",()=>S("starred")),t.tabRelated.addEventListener("click",()=>S("related")),S("contents"),L("contents").setAttribute("aria-selected","true"),z("contents").hidden=!1;function H(){var O;if(l)return;l=!0,p=o.activeElement??null,t.root.classList.add("open"),t.root.classList.remove("closed"),e.classList.add("rx-left-sidebar-open"),t.scrim.classList.toggle("visible",A());const w=A();t.root.setAttribute("role",w?"dialog":"complementary"),w?t.root.setAttribute("aria-modal","true"):t.root.removeAttribute("aria-modal"),w&&(v.activate(),t.root.focus()),(O=n.onSidebarChange)==null||O.call(n,!0)}function N(){var w,O;l&&(l=!1,t.root.classList.remove("open"),t.root.classList.add("closed"),e.classList.remove("rx-left-sidebar-open"),t.scrim.classList.remove("visible"),v.deactivate(),(w=p==null?void 0:p.focus)==null||w.call(p),p=null,(O=n.onSidebarChange)==null||O.call(n,!1))}t.closeBtn.addEventListener("click",N),t.scrim.addEventListener("click",N),t.backBtn.addEventListener("click",()=>{var w;return(w=n.onBack)==null?void 0:w.call(n)});const $=dt(e,{onSwipe:(w,O,V)=>{const Q=ct(V,t.root,e),K=lt(Q,w,O,A());!l&&K.action!==null||(K.action==="cycle-next"?B(1):K.action==="cycle-prev"?B(-1):K.action==="close"&&N())}});function F(w){s=at(w),g.clear(),i==="contents"&&T()}function R(w){u=w,d.clear();for(const O of w)d.add(O.href);(i==="starred"||i==="contents")&&T()}function _(w){m=w,i==="related"&&T()}function M(w){h=w,i==="contents"&&T()}function W(w){f=w,i==="contents"&&T()}function x(){c||(c=!0,$.destroy(),t.closeBtn.removeEventListener("click",N),t.scrim.removeEventListener("click",N),v.deactivate(),e.classList.remove("rx-left-sidebar-open"),t.root.remove(),t.scrim.remove())}return{open:H,close:N,isOpen:()=>l,cycleTab:B,getActiveTab:()=>i,setToc:F,setStarred:R,setRelated:_,setCurrentHref:M,setCurrentChapterTitle:W,destroy:x}}function Ae(e,r,n){const o=document.createElement("button");return o.type="button",o.className="rx-sidebar-tab",o.textContent=e,o.setAttribute("role","tab"),o.setAttribute("aria-selected",String(r)),o.dataset.tab=n,r&&o.classList.add("active"),o}function Kt(e){const r=e.createElement("div");r.className="rx-right-sidebar",r.setAttribute("role","complementary"),r.setAttribute("aria-label","Context panel");const n=e.createElement("div");n.className="rx-sidebar-resize",n.setAttribute("role","separator"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-label","Resize context panel"),n.setAttribute("tabindex","0");const o=e.createElement("div");o.className="rx-sidebar-tabs";const t=e.createElement("div");t.className="rx-sidebar-tablist",t.setAttribute("role","tablist");const a=Ae("Context",!0,"context"),i=Ae("Glossary",!1,"glossary"),l=Ae("Notes",!1,"notes");l.disabled=!0;const c=e.createElement("button");c.type="button",c.className="rx-icon-btn rx-sidebar-close",c.setAttribute("aria-label","Close panel"),c.textContent="✕",t.append(a,i,l),o.append(t,c);const s=e.createElement("div");s.className="rx-ctx-searchbar",s.setAttribute("role","search");const g=e.createElement("input");g.type="search",g.className="rx-ctx-search-input",g.placeholder="Search this book",g.setAttribute("aria-label","Search this book");const h=e.createElement("button");h.type="button",h.className="rx-icon-btn rx-ctx-openmain",h.setAttribute("aria-label","Open in main window"),h.disabled=!0,h.textContent="↗";const f=e.createElement("div");f.className="rx-ctx-crumbs",f.setAttribute("aria-live","polite"),s.append(g,h,f);const d=e.createElement("div");d.className="rx-sidebar-body";const u=e.createElement("div");u.className="rx-ctx-results";const m=e.createElement("div");m.className="rx-ctx-page",m.hidden=!0;const v=e.createElement("div");v.className="rx-notes-body",v.hidden=!0;const p=e.createElement("div");return p.className="rx-glossary-panel-mount",p.hidden=!0,d.append(u,m,v,p),r.append(n,o,s,d),{root:r,resizeHandle:n,tabsRow:o,contextTabBtn:a,glossaryTabBtn:i,notesTabBtn:l,closeBtn:c,searchBar:s,searchInput:g,openInMainBtn:h,breadcrumb:f,body:d,resultsScroller:u,contextPage:m,notesBody:v,glossaryPanelMount:p}}const Yt=`
.rx-right-sidebar {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 40;
  display: flex;
  flex-direction: column;
  width: var(--rx-ctx-width, 340px);
  background: var(--rx-surface);
  border-left: 1px solid var(--rx-border);
  transform: translateX(105%);
  transition: transform var(--rx-motion-bar), width var(--rx-motion-bar);
}
.reader-shell.right-sidebar-open .rx-right-sidebar {
  transform: translateX(0);
}
.reader-shell.right-sidebar-resizing .rx-right-sidebar {
  transition: none;
}
.reader-shell.size-phone .rx-right-sidebar {
  width: min(88%, 340px);
  box-shadow: var(--rx-elevation); /* taste-skill-ignore: a real overlay panel on top of the book, not an at-rest surface */
}
.reader-shell.e-ink.size-phone .rx-right-sidebar {
  box-shadow: none; /* taste-skill-ignore: already shadow-free; e-ink override */
  border-left: 1px solid var(--rx-ink);
}

.rx-sidebar-scrim {
  position: absolute;
  inset: 0;
  z-index: 35;
  background: var(--rx-ink);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--rx-motion-bar);
}
.reader-shell.size-phone.right-sidebar-open .rx-sidebar-scrim {
  opacity: 0.32;
  pointer-events: auto;
}
.reader-shell.e-ink .rx-sidebar-scrim {
  opacity: 0; /* no translucent scrim under eink (hard rule 8) - see mount.ts, phone close still works via the close button */
}

.rx-sidebar-resize {
  position: absolute;
  left: -6px;
  top: 0;
  bottom: 0;
  width: 12px;
  z-index: 1; /* paints above the panel body (results/page), which otherwise covers its right half */
  cursor: col-resize;
  touch-action: none;
}
.reader-shell.size-phone .rx-sidebar-resize {
  display: none;
}

/* Docked layouts (SHELL.md section 2: Fold unfolded/Tablet and Desktop get a "docked, resizable"
 * right sidebar, phone gets an overlay). The book-column push itself is done in JS via
 * setBookInsets (src/shell/layout.ts, shared with U2's left sidebar), which reserves the space as
 * padding on the shell root; these rules just pull the top/bottom bars and tap zones in by the
 * same reserved amount so their controls (Settings, Context) stay reachable instead of sitting
 * under the panel. */
.reader-shell.right-sidebar-open:not(.size-phone) .rx-bar,
.reader-shell.right-sidebar-open:not(.size-phone) .rx-zones {
  right: var(--rx-book-inset-right, 0px);
}
.rx-sidebar-resize:focus-visible {
  outline: 2px solid var(--rx-accent);
  outline-offset: -2px;
}

.rx-sidebar-tabs {
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid var(--rx-border);
  flex: 0 0 auto;
}
.rx-sidebar-tablist {
  display: flex;
  align-items: stretch;
  flex: 1 1 auto;
}
.rx-sidebar-tab {
  flex: 1 1 auto;
  min-height: 48px;
  border: none;
  background: none;
  color: var(--rx-muted);
  font-size: 13px;
  cursor: pointer;
}
.rx-sidebar-tab.active {
  color: var(--rx-ink);
  box-shadow: inset 0 -2px 0 var(--rx-accent); /* taste-skill-ignore: active-tab indicator, not a resting shadow */
}
.rx-sidebar-tab:disabled {
  opacity: 0.4;
  cursor: default;
}
.rx-sidebar-close {
  display: none;
  flex: 0 0 48px;
}
.reader-shell.size-phone .rx-sidebar-close {
  display: flex;
}

.rx-ctx-searchbar {
  display: flex;
  align-items: center;
  gap: var(--rx-space-2);
  padding: var(--rx-space-2) var(--rx-space-3);
  border-bottom: 1px solid var(--rx-border);
  flex: 0 0 auto;
  flex-wrap: wrap;
}
.rx-ctx-searchbar[hidden] {
  /* U4's Glossary tab hides this bar via the hidden attribute; override the class rule above,
     which otherwise beats the UA [hidden] display:none rule by specificity. */
  display: none;
}
.rx-ctx-search-input {
  flex: 1 1 auto;
  min-height: 48px;
  padding: 0 var(--rx-space-2);
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  background: var(--rx-ground);
  color: var(--rx-ink);
  font-size: 14px;
}
.rx-ctx-crumbs {
  flex: 0 0 100%;
  font-size: 12px;
  color: var(--rx-muted);
  display: flex;
  align-items: center;
  gap: var(--rx-space-1);
}
.rx-ctx-crumbs button {
  background: var(--rx-surface-2);
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  color: var(--rx-ink);
  font-size: 13px;
  font-weight: 500;
  min-height: 48px;
  padding: 0 var(--rx-space-3);
  cursor: pointer;
}
.rx-ctx-crumbs button:hover:not(:disabled) {
  background: var(--rx-surface);
  border-color: var(--rx-accent);
}
.rx-ctx-crumbs button:disabled {
  color: var(--rx-muted);
  background: none;
  border-color: var(--rx-border);
  cursor: default;
}

.rx-sidebar-body {
  /* BO-53 #4: real touch needs this explicit (ancestor .reader-shell already carries pan-y,
   * but this is also its own nested scroll context) so a horizontal swipe cycling the tabs
   * isn't claimed by native vertical-list scrolling. */
  touch-action: pan-y;
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
}
.rx-ctx-results {
  position: absolute;
  inset: 0;
  overflow-y: auto;
}
.rx-wlist-spacer {
  flex: 0 0 auto;
}
.rx-wlist-rows {
  display: flex;
  flex-direction: column;
}
.rx-ctx-group-header {
  padding: var(--rx-space-2) var(--rx-space-3);
  min-height: 48px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: var(--rx-muted);
  background: var(--rx-surface-2);
  box-sizing: border-box;
}
.rx-ctx-result {
  padding: var(--rx-space-2) var(--rx-space-3);
  min-height: 48px;
  border-bottom: 1px solid var(--rx-border);
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  text-align: left;
  color: var(--rx-ink);
  font-size: 13px;
  line-height: 1.4;
  cursor: pointer;
  width: 100%;
}
.rx-ctx-result:hover {
  background: var(--rx-surface-2);
}
.rx-ctx-result mark {
  background: none;
  color: var(--rx-accent);
  font-weight: 600;
}

.rx-ctx-page {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: var(--rx-ground);
}

/* The Notes tab's own panel (U5) - a sibling of the Context results/page, same absolute-fill
 * geometry as .rx-ctx-page so switching tabs is a plain hidden-attribute toggle, no reflow. */
.rx-notes-body {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.rx-glossary-panel-mount {
  position: absolute;
  inset: 0;
}
`;class Vt{constructor(){D(this,"rows",[]);D(this,"headerAt",new Map)}reset(){this.rows=[],this.headerAt.clear()}addGroup(r,n){if(n.length!==0){this.headerAt.has(r)||(this.headerAt.set(r,this.rows.length),this.rows.push({kind:"header",label:r}));for(const o of n)this.rows.push({kind:"item",item:o,groupLabel:r})}}get rowCount(){return this.rows.length}rowAt(r){return this.rows[r]}get isEmpty(){return this.rows.length===0}}class ut{constructor(r){D(this,"container");D(this,"rowHeight");D(this,"buffer");D(this,"opts");D(this,"topSpacer");D(this,"bottomSpacer");D(this,"rowsEl");D(this,"onScroll");D(this,"destroyed",!1);this.opts=r,this.container=r.container,this.rowHeight=r.rowHeight,this.buffer=r.buffer??6,this.topSpacer=document.createElement("div"),this.topSpacer.className="rx-wlist-spacer",this.bottomSpacer=document.createElement("div"),this.bottomSpacer.className="rx-wlist-spacer",this.rowsEl=document.createElement("div"),this.rowsEl.className="rx-wlist-rows",this.rowsEl.setAttribute("role","list"),this.container.replaceChildren(this.topSpacer,this.rowsEl,this.bottomSpacer),this.onScroll=()=>this.render(),this.container.addEventListener("scroll",this.onScroll)}visibleRange(){const r=this.opts.rowCount(),n=this.container.clientHeight||1,o=this.container.scrollTop||0,t=Math.max(0,Math.floor(o/this.rowHeight)-this.buffer),a=Math.ceil(n/this.rowHeight)+this.buffer*2,i=Math.min(r,t+a);return{first:t,last:i}}render(){if(this.destroyed)return;const r=this.opts.rowCount(),{first:n,last:o}=this.visibleRange();this.topSpacer.style.height=`${n*this.rowHeight}px`,this.bottomSpacer.style.height=`${Math.max(0,r-o)*this.rowHeight}px`,this.rowsEl.replaceChildren();for(let t=n;t<o;t++)this.rowsEl.appendChild(this.opts.renderRow(t))}destroy(){this.destroyed||(this.destroyed=!0,this.container.removeEventListener("scroll",this.onScroll),this.container.replaceChildren())}}function jt(e,r){return e.kind!==r.kind?!1:e.kind==="page"&&r.kind==="page"?e.target===r.target:!0}class Xt{constructor(){D(this,"stack",[{kind:"blank"}]);D(this,"index",0)}get current(){return this.stack[this.index]??{kind:"blank"}}get canGoBack(){return this.index>0}get canGoForward(){return this.index<this.stack.length-1}push(r){jt(this.current,r)||(this.stack=this.stack.slice(0,this.index+1),this.stack.push(r),this.index=this.stack.length-1)}back(){return this.canGoBack?(this.index-=1,this.current):null}forward(){return this.canGoForward?(this.index+=1,this.current):null}reset(){this.stack=[{kind:"blank"}],this.index=0}}const Zt={"fold-tablet":320,desktop:340},Ee=240,Ge=16,Jt={"fold-tablet":.6,desktop:.7};function Qt(e,r,n){const o=Jt[n],t=Math.max(Ee,r*o);return e<Ee?Ee:e>t?t:e}const pt=new WeakMap;function Te(e){return pt.get(e)??{left:0,right:0,bottom:0}}function se(e,r){const n={left:Math.max(0,r.left??Te(e).left),right:Math.max(0,r.right??Te(e).right),bottom:Math.max(0,r.bottom??Te(e).bottom)};return pt.set(e,n),e.style.setProperty("--rx-book-inset-left",`${n.left}px`),e.style.setProperty("--rx-book-inset-right",`${n.right}px`),e.style.setProperty("--rx-book-inset-bottom",`${n.bottom}px`),e.style.paddingLeft=n.left?`${n.left}px`:"",e.style.paddingRight=n.right?`${n.right}px`:"",e.style.paddingBottom=n.bottom?`${n.bottom}px`:"",n}const er=[{id:"all",label:"All"},{id:"highlight",label:"Highlight"},{id:"underline",label:"Underline"},{id:"note",label:"Typed note"},{id:"handwritten",label:"Handwritten"},{id:"bookmark",label:"Bookmark"}],tr=[{id:"position",label:"Position in book"},{id:"date",label:"Date"},{id:"colour",label:"Colour"},{id:"type",label:"Type"}];function rr(e){const r=e.createElement("div");r.className="rx-notes-panel";const n=e.createElement("div");n.className="rx-notes-searchbar",n.setAttribute("role","search");const o=e.createElement("input");o.type="search",o.className="rx-notes-search-input",o.placeholder="Search notes",o.setAttribute("aria-label","Search notes"),n.append(o);const t=e.createElement("select");t.className="rx-notes-sort",t.setAttribute("aria-label","Sort notes by");for(const{id:s,label:g}of tr){const h=e.createElement("option");h.value=s,h.textContent=g,t.append(h)}n.append(t);const a=e.createElement("div");a.className="rx-notes-filters",a.setAttribute("role","group"),a.setAttribute("aria-label","Filter notes by type");const i={};for(const{id:s,label:g}of er){const h=e.createElement("button");h.type="button",h.className="rx-notes-chip",h.textContent=g,h.setAttribute("aria-pressed",String(s==="all")),s==="all"&&h.classList.add("active"),h.dataset.filter=s,a.append(h),i[s]=h}const l=e.createElement("div");l.className="rx-notes-banner",l.hidden=!0,l.textContent="No annotation store connected. Notes made in this session are not saved.";const c=e.createElement("div");return c.className="rx-notes-list",r.append(n,a,l,c),{root:r,searchBar:n,searchInput:o,filterRow:a,filterButtons:i,sortSelect:t,capabilityBanner:l,listScroller:c}}const nr=`
.rx-notes-panel {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  background: var(--rx-ground);
}
.rx-notes-searchbar {
  display: flex;
  gap: var(--rx-space-2);
  padding: var(--rx-space-2) var(--rx-space-3);
  border-bottom: 1px solid var(--rx-border);
  flex: 0 0 auto;
}
.rx-notes-search-input {
  flex: 1 1 auto;
  min-height: 48px;
  padding: 0 var(--rx-space-2);
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  background: var(--rx-surface);
  color: var(--rx-ink);
  font-size: 14px;
}
.rx-notes-sort {
  min-height: 48px;
  min-width: 44px;
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  background: var(--rx-surface);
  color: var(--rx-ink);
  font-size: 13px;
}
.rx-notes-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--rx-space-2);
  padding: var(--rx-space-2) var(--rx-space-3);
  border-bottom: 1px solid var(--rx-border);
  flex: 0 0 auto;
}
.rx-notes-chip {
  min-height: 44px;
  padding: 0 var(--rx-space-3);
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  background: var(--rx-surface);
  color: var(--rx-muted);
  font-size: 13px;
  cursor: pointer;
}
.rx-notes-chip.active {
  color: var(--rx-ink);
  border-color: var(--rx-accent);
  background: var(--rx-surface-2);
}
.rx-notes-banner {
  padding: var(--rx-space-2) var(--rx-space-3);
  font-size: 12px;
  color: var(--rx-muted);
  background: var(--rx-surface-2);
  flex: 0 0 auto;
}
.rx-notes-list {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
}
.rx-notes-row {
  display: flex;
  align-items: center;
  gap: var(--rx-space-2);
  min-height: 48px;
  padding: var(--rx-space-2) var(--rx-space-3);
  border-bottom: 1px solid var(--rx-border);
  background: none;
  border-left: none;
  border-right: none;
  border-top: none;
  text-align: left;
  color: var(--rx-ink);
  font-size: 13px;
  width: 100%;
  cursor: pointer;
}
.rx-notes-row:hover {
  background: var(--rx-surface-2);
}
.rx-notes-row-swatch {
  flex: 0 0 14px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--rx-notes-row-color, var(--rx-muted));
}
.reader-shell.e-ink .rx-notes-row-swatch {
  border-radius: 0;
  border: 1px solid var(--rx-ink);
}
.rx-notes-row-body {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1 1 auto;
}
.rx-notes-row-snippet {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.rx-notes-row-meta {
  font-size: 11px;
  color: var(--rx-muted);
}
.rx-notes-loading-row {
  min-height: 48px;
  display: flex;
  align-items: center;
  padding: 0 var(--rx-space-3);
  color: var(--rx-muted);
  font-size: 12px;
}
.rx-notes-empty {
  padding: var(--rx-space-4);
  color: var(--rx-muted);
  font-size: 13px;
  text-align: center;
}
`,ar=100,or=20;function sr(e){return e==="all"?null:e}class ir{constructor(r){D(this,"total",0);D(this,"offset",0);D(this,"items",[]);D(this,"state",{filter:"all",sort:"position",query:null});D(this,"lastRequestedOffset",null);D(this,"everRequested",!1);this.hostChannel=r}getState(){return this.state}setState(r){this.state={...this.state,...r},this.total=0,this.offset=0,this.items=[],this.lastRequestedOffset=null,this.requestPage(0)}ensureInitialLoad(){this.everRequested||this.requestPage(0)}rowCount(){return this.total}rowAt(r){const n=r-this.offset;if(!(n<0||n>=this.items.length))return this.items[n]}ensureLoaded(r,n){const o=Math.max(r,n-1);if(this.rowAt(r)&&this.rowAt(o))return;const t=Math.max(0,r-or);this.lastRequestedOffset!==t&&this.requestPage(t)}requestPage(r){this.everRequested=!0,this.lastRequestedOffset=r,this.hostChannel.emitIntent({type:"notesPageRequest",offset:r,limit:ar,filter:sr(this.state.filter),sort:this.state.sort,query:this.state.query})}applyWindow(r){this.total=r.total,this.offset=r.offset,this.items=r.items,this.lastRequestedOffset=null}}const We="reactor-notes-stylesheet",lr=48,cr=200,qe={highlight:"Highlight",underline:"Underline",note:"Typed note",bookmark:"Bookmark"};function dr(e,r){return r?`${qe[e]} · ${r}`:qe[e]}function ur({container:e,core:r,hostChannel:n,options:o={}}){const t=e.ownerDocument??document;if(!t.getElementById(We)){const S=t.createElement("style");S.id=We,S.textContent=nr,t.head.appendChild(S)}const a=rr(t);e.append(a.root);const i=new ir(n);let l=!1,c=null;const s=new Map,g=new Set;function h(S){s.has(S)||g.has(S)||typeof r.getChapterTitleForCfi=="function"&&(g.add(S),r.getChapterTitleForCfi(S).then(B=>{s.set(S,B)}).catch(()=>{s.set(S,null)}).finally(()=>{g.delete(S),!l&&d.render()}))}function f(S){i.ensureLoaded(S,S+1);const B=i.rowAt(S);if(!B){const W=t.createElement("div");return W.className="rx-notes-loading-row",W.setAttribute("role","listitem"),W.textContent="Loading…",W}const H=t.createElement("button");H.type="button",H.className="rx-notes-row";const N=t.createElement("span");N.className="rx-notes-row-swatch",B.color&&N.style.setProperty("--rx-notes-row-color",B.color);const $=t.createElement("span");$.className="rx-notes-row-body";const F=t.createElement("span");F.className="rx-notes-row-snippet",F.textContent=B.note??B.text??"";const R=t.createElement("span");R.className="rx-notes-row-meta";const _=s.get(B.cfi);R.textContent=dr(B.kind,_??null),$.append(F,R),H.append(N,$),H.setAttribute("aria-label",`${R.textContent}: ${F.textContent}`),_===void 0&&h(B.cfi),H.addEventListener("click",()=>r.goTo(B.cfi));const M=t.createElement("div");return M.setAttribute("role","listitem"),M.appendChild(H),M}const d=new ut({container:a.listScroller,rowHeight:lr,rowCount:()=>i.rowCount(),renderRow:f});function u(S){const B=S.currentTarget,H=B.dataset.filter??"all";for(const N of Object.values(a.filterButtons))N.classList.toggle("active",N===B),N.setAttribute("aria-pressed",String(N===B));i.setState({filter:H}),d.render()}for(const S of Object.values(a.filterButtons))S.addEventListener("click",u);function m(){i.setState({sort:a.sortSelect.value}),d.render()}a.sortSelect.addEventListener("change",m);function v(){c&&clearTimeout(c),c=setTimeout(()=>{i.setState({query:a.searchInput.value.trim()||null}),d.render()},cr)}a.searchInput.addEventListener("input",v);function p(S){S.type==="setNotes"&&(i.applyWindow(S),d.render())}const A=n.onCommand(p);function z(){var S;a.capabilityBanner.hidden=((S=n.getConfig())==null?void 0:S.capabilities.notes)!==!1,i.ensureInitialLoad(),d.render()}function L(){d.render()}function T(){if(!l){l=!0,c&&clearTimeout(c),A();for(const S of Object.values(a.filterButtons))S.removeEventListener("click",u);a.sortSelect.removeEventListener("change",m),a.searchInput.removeEventListener("input",v),d.destroy(),a.root.remove()}}return{onActivate:z,refresh:L,destroy:T}}function pr(e){const r=e.createElement("div");r.className="rx-glossary-panel",r.style.position="absolute",r.style.inset="0";const n=e.createElement("div");n.className="rx-glossary-search",n.setAttribute("role","search");const o=e.createElement("input");o.type="search",o.className="rx-glossary-search-input",o.placeholder="Search glossary",o.setAttribute("aria-label","Search glossary"),n.appendChild(o);const t=e.createElement("div");return t.className="rx-glossary-list",t.setAttribute("role","list"),r.append(n,t),{root:r,searchInput:o,list:t}}const hr=900;function br(e){const r=e.ownerDocument??document,n=pr(r);e.appendChild(n.root);let o=[],t="",a=!1;function i(){const f=t.trim().toLowerCase();return[...f?o.filter(u=>u.term.toLowerCase().includes(f)):o].sort((u,m)=>u.term.localeCompare(m.term))}function l(){if(a)return;const f=i();if(n.list.replaceChildren(),!o.length){n.list.removeAttribute("role");const d=r.createElement("div");d.className="rx-glossary-empty",d.textContent="This book has no glossary.",n.list.appendChild(d);return}if(!f.length){n.list.removeAttribute("role");const d=r.createElement("div");d.className="rx-glossary-empty",d.textContent=`No terms match "${t}".`,n.list.appendChild(d);return}n.list.setAttribute("role","list");for(const d of f){let u=function(){const A=m.classList.toggle("expanded");v.setAttribute("aria-expanded",String(A))};const m=r.createElement("div");m.className="rx-glossary-item",m.setAttribute("role","listitem"),m.setAttribute("data-term",d.term);const v=r.createElement("button");v.type="button",v.className="rx-glossary-term-row",v.setAttribute("role","button"),v.setAttribute("aria-expanded","false"),v.textContent=d.term;const p=r.createElement("div");p.className="rx-glossary-def",p.textContent=d.definition,v.addEventListener("click",u),m.append(v,p),n.list.appendChild(m)}}function c(){t=n.searchInput.value,l()}n.searchInput.addEventListener("input",c),l();function s(f){o=f,l()}function g(f){var u,m;t&&(t="",n.searchInput.value="",l());const d=n.list.querySelector(`.rx-glossary-item[data-term="${CSS.escape(f)}"]`);d&&(d.classList.add("expanded"),(u=d.querySelector(".rx-glossary-term-row"))==null||u.setAttribute("aria-expanded","true"),(m=d.scrollIntoView)==null||m.call(d,{block:"center"}),d.classList.add("flash"),setTimeout(()=>d.classList.remove("flash"),hr))}function h(){a||(a=!0,n.searchInput.removeEventListener("input",c),n.root.remove())}return{setTerms:s,scrollToAndFlash:g,destroy:h}}const Ue=9,be=8,Ke=16;function xr(e,r,n,o){const t=e.top+e.height;let a=e.left;a=Math.min(Math.max(be,a),Math.max(be,r.width-n-be));let i=t+Ue,l=!1;if(i+o>r.height-be){const s=e.top-o-Ue;i=Math.max(be,s),l=!0}const c=Math.max(Ke,Math.min(n-Ke,e.left+e.width/2-a));return{left:a,top:i,above:l,arrowX:c}}const fr='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';function mr(e,r,n){const o=e.ownerDocument??document;let t=null,a=!1;function i(){var d;const f=!!t;t==null||t.remove(),t=null,f&&((d=e.querySelector("iframe"))==null||d.focus())}function l(f,d){var z;i();const u=o.createElement("div");u.className="rx-glossary-popover",u.setAttribute("role","dialog"),u.setAttribute("aria-label",`${f.term} definition`),u.innerHTML=`
      <div class="rx-glossary-popover-head">
        <h4 class="rx-glossary-popover-term"></h4>
        <button type="button" class="rx-icon-btn rx-glossary-popover-open" aria-label="Open in glossary" title="Open in glossary">${fr}</button>
      </div>
      <p class="rx-glossary-popover-def"></p>
    `,u.querySelector(".rx-glossary-popover-term").textContent=f.term,u.querySelector(".rx-glossary-popover-def").textContent=f.definition,e.appendChild(u),t=u;const m=e.getBoundingClientRect(),v={left:d.left-m.left,top:d.top-m.top,width:d.width,height:d.height},p={width:m.width,height:m.height},A=xr(v,p,u.offsetWidth,u.offsetHeight||120);u.style.left=`${A.left}px`,u.style.top=`${A.top}px`,u.classList.toggle("above",A.above),u.style.setProperty("--arrow-x",`${A.arrowX}px`),u.querySelector(".rx-glossary-popover-open").addEventListener("click",L=>{L.stopPropagation(),i(),n.onOpenInGlossary(f.term)}),(z=u.querySelector(".rx-glossary-popover-open"))==null||z.focus()}async function c(f,d){const u=await r.getGlossaryTerms();if(a)return;const m=u.find(v=>v.term.toLowerCase()===f.toLowerCase());m&&l(m,d)}const s=r.onGlossaryTermTap(c);function g(f){var u;if(!t)return;const d=f.target;(u=d==null?void 0:d.closest)!=null&&u.call(d,".rx-glossary-popover")||i()}o.addEventListener("click",g);function h(){a||(a=!0,s(),o.removeEventListener("click",g),i())}return{isOpen:()=>t!==null,close:i,destroy:h}}const gr=`
.rx-glossary-search {
  display: flex;
  align-items: center;
  padding: var(--rx-space-2) var(--rx-space-3);
  border-bottom: 1px solid var(--rx-border);
  flex: 0 0 auto;
}
.rx-glossary-search-input {
  flex: 1 1 auto;
  min-height: 48px;
  padding: 0 var(--rx-space-2);
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  background: var(--rx-ground);
  color: var(--rx-ink);
  font-size: 14px;
}
.rx-glossary-list {
  position: absolute;
  inset: 0;
  top: 65px; /* below the fixed-height search bar */
  overflow-y: auto;
}
.rx-glossary-item {
  padding: var(--rx-space-2) var(--rx-space-3);
  border-bottom: 1px solid var(--rx-border);
}
.rx-glossary-term-row {
  min-height: 48px;
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--rx-ink);
  cursor: pointer;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
  padding: 0;
}
.rx-glossary-def {
  font-size: 12px;
  color: var(--rx-muted);
  margin-top: 3px;
  line-height: 1.45;
  display: none;
}
.rx-glossary-item.expanded .rx-glossary-def {
  display: block;
}
.rx-glossary-empty {
  padding: var(--rx-space-4) var(--rx-space-3);
  text-align: center;
  font-size: 13px;
  color: var(--rx-muted);
}
.rx-glossary-item.flash {
  background: var(--rx-surface-2);
}

.rx-glossary-popover {
  position: absolute;
  z-index: 90;
  background: var(--rx-surface);
  color: var(--rx-ink);
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  box-shadow: var(--rx-elevation); /* taste-skill-ignore: a true floater (role=dialog popover), the app-screens shadow exception */
  padding: var(--rx-space-2) var(--rx-space-3) var(--rx-space-3);
  width: max-content;
  min-width: 168px;
  max-width: min(288px, calc(100% - 16px));
  animation: rx-glossary-pop-in var(--rx-motion-fast) ease;
}
.reader-shell.e-ink .rx-glossary-popover,
.reader-shell.reduced-motion .rx-glossary-popover {
  animation: none;
}
@keyframes rx-glossary-pop-in {
  from {
    opacity: 0;
    transform: scale(0.96);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.rx-glossary-popover-head {
  display: flex;
  align-items: center;
  gap: var(--rx-space-2);
}
.rx-glossary-popover-term {
  margin: 0;
  flex: 1 1 auto;
  min-width: 0;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;
}
.rx-glossary-popover-def {
  margin: var(--rx-space-1) 0 0;
  font-size: 14px;
  line-height: 1.45;
}
.rx-glossary-popover-open {
  flex: 0 0 auto;
  width: 44px;
  height: 44px;
  color: var(--rx-accent);
}
`,Ye="reactor-right-sidebar-stylesheet",Ve="reactor-glossary-stylesheet",vr=48,yr=200;function kr(e){if(!e.getElementById(Ye)){const r=e.createElement("style");r.id=Ye,r.textContent=Yt,e.head.appendChild(r)}if(!e.getElementById(Ve)){const r=e.createElement("style");r.id=Ve,r.textContent=gr,e.head.appendChild(r)}}function wr(e){const r=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`${r(e.pre)}<mark>${r(e.match)}</mark>${r(e.post)}`}function Er(e,r,n){var pe,he;const o=e.ownerDocument??document;kr(o);const t=Kt(o),a=o.createElement("div");a.className="rx-sidebar-scrim",e.append(a,t.root);const i=new Vt,l=new Xt,c=br(t.glossaryPanelMount);let s="context",g=null,h=!1,f=!1,d=null;const u=!!n.hostChannel&&((pe=n.hostChannel.getConfig())==null?void 0:pe.capabilities.notes)!==!1;t.notesTabBtn.disabled=!u;const m=u?ur({container:t.notesBody,core:r,hostChannel:n.hostChannel}):null;((he=n.capabilities)==null?void 0:he.glossary)===!1&&(t.glossaryTabBtn.hidden=!0);const v=["context"];t.glossaryTabBtn.hidden!==!0&&v.push("glossary"),u&&v.push("notes");function p(){return n.getSizeClass()==="phone"}function A(y){const P=y===1?ot(v,s):st(v,s);z(P)}function z(y){y!==s&&(s=y,t.contextTabBtn.classList.toggle("active",y==="context"),t.contextTabBtn.setAttribute("aria-selected",String(y==="context")),t.glossaryTabBtn.classList.toggle("active",y==="glossary"),t.glossaryTabBtn.setAttribute("aria-selected",String(y==="glossary")),t.notesTabBtn.classList.toggle("active",y==="notes"),t.notesTabBtn.setAttribute("aria-selected",String(y==="notes")),t.searchBar.hidden=y!=="context",t.glossaryPanelMount.hidden=y!=="glossary",t.notesBody.hidden=y!=="notes",y==="context"?M(l.current):y==="glossary"?(t.resultsScroller.hidden=!0,t.contextPage.hidden=!0,r.getGlossaryTerms().then(P=>c.setTerms(P))):(t.resultsScroller.hidden=!0,t.contextPage.hidden=!0,m==null||m.onActivate()))}const L=()=>z("context"),T=()=>z("glossary"),S=()=>z("notes");t.contextTabBtn.addEventListener("click",L),t.glossaryTabBtn.addEventListener("click",T),t.notesTabBtn.addEventListener("click",S);function B(y){const P=i.rowAt(y);if(!P)return o.createElement("div");if(P.kind==="header"){const j=o.createElement("div");return j.className="rx-ctx-group-header",j.setAttribute("role","listitem"),j.textContent=P.label,j}const Y=o.createElement("button");Y.type="button",Y.className="rx-ctx-result",Y.setAttribute("role","listitem"),Y.innerHTML=wr(P.item),Y.addEventListener("click",()=>k(P.item,P.groupLabel));const te=o.createElement("div");return te.setAttribute("role","listitem"),te.appendChild(Y),te}const H=new ut({container:t.resultsScroller,rowHeight:vr,rowCount:()=>i.rowCount,renderRow:B});function N(){t.breadcrumb.replaceChildren();const y=o.createElement("button");y.type="button",y.textContent="Back",y.disabled=!l.canGoBack,y.setAttribute("aria-label","Back"),y.addEventListener("click",W);const P=o.createElement("button");P.type="button",P.textContent="Forward",P.disabled=!l.canGoForward,P.setAttribute("aria-label","Forward"),P.addEventListener("click",x),t.breadcrumb.append(y,P),t.openInMainBtn.disabled=l.current.kind!=="page"}function $(){t.resultsScroller.hidden=!1,t.contextPage.hidden=!0,H.render()}function F(){t.resultsScroller.hidden=!1,t.contextPage.hidden=!0,H.render()}function R(){return g||(g=r.createSecondaryView(t.contextPage),g)}function _(y){t.resultsScroller.hidden=!0,t.contextPage.hidden=!1;const P=R();P&&P.goTo(y)}function M(y){y.kind==="blank"?F():y.kind==="results"?$():_(y.target),N()}function W(){const y=l.back();y&&M(y)}function x(){const y=l.forward();y&&M(y)}function k(y,P){l.push({kind:"page",target:y.cfi,label:P}),M(l.current)}function I(){const y=t.searchInput.value.trim();i.reset(),y?l.current.kind!=="results"&&l.push({kind:"results"}):l.reset(),M(l.current),d&&clearTimeout(d),y&&(d=setTimeout(()=>r.runSearch(y),yr))}t.searchInput.addEventListener("input",I);function w(y){y.type==="searchResults"?(i.addGroup(y.label,y.items),l.current.kind==="results"&&H.render()):y.type==="loaded"&&c.setTerms([])}const O=r.on(w);function V(){const y=l.current;y.kind==="page"&&(r.goTo(y.target),n.getSizeClass()==="phone"&&q())}t.openInMainBtn.addEventListener("click",V);function Q(){q()}t.closeBtn.addEventListener("click",Q);const K=()=>q();a.addEventListener("click",K);function X(){const y=getComputedStyle(e).getPropertyValue("--rx-ctx-width"),P=parseFloat(y);if(!Number.isNaN(P)&&P>0)return P;const Y=n.getSizeClass();return Y==="phone"?Ee:Zt[Y]}t.resizeHandle.setAttribute("aria-valuenow",String(Math.round(X())));function re(y,P){var j;const Y=n.getSizeClass();if(Y==="phone")return;const te=Qt(y,e.clientWidth||1200,Y);e.style.setProperty("--rx-ctx-width",`${te}px`),t.resizeHandle.setAttribute("aria-valuenow",String(Math.round(te))),h&&se(e,{right:te}),P&&((j=n.onWidthChange)==null||j.call(n,te))}let ee=!1,ie=0,Z=0;function ae(y){ee=!0,ie=y.clientX,Z=X(),e.classList.add("right-sidebar-resizing"),o.addEventListener("pointermove",J),o.addEventListener("pointerup",oe)}function J(y){ee&&re(Z-(y.clientX-ie),!1)}function oe(){ee&&(ee=!1,e.classList.remove("right-sidebar-resizing"),o.removeEventListener("pointermove",J),o.removeEventListener("pointerup",oe),re(X(),!0))}function b(y){y.key==="ArrowLeft"?(y.preventDefault(),re(X()+Ge,!0)):y.key==="ArrowRight"&&(y.preventDefault(),re(X()-Ge,!0))}t.resizeHandle.addEventListener("pointerdown",ae),t.resizeHandle.addEventListener("keydown",b);const C=dt(e,{onSwipe:(y,P,Y)=>{const te=ct(Y,t.root,e),j=lt(te,y,P,p());!h&&j.action!==null||(j.action==="cycle-next"?A(1):j.action==="cycle-prev"?A(-1):j.action==="close"&&q())}});function U(){h||(h=!0,e.classList.add("right-sidebar-open"),re(X(),!1),H.render(),s==="notes"&&(m==null||m.refresh()))}function q(){var y;h&&(h=!1,e.classList.remove("right-sidebar-open"),se(e,{right:0}),(y=n.onClose)==null||y.call(n))}function ne(){h?q():U()}function ve(y){h||U(),z("glossary"),r.getGlossaryTerms().then(P=>{c.setTerms(P),c.scrollToAndFlash(y)})}function de(){h&&(n.getSizeClass()==="phone"?se(e,{right:0}):se(e,{right:X()}))}M(l.current);function ue(){f||(f=!0,d&&clearTimeout(d),O(),t.searchInput.removeEventListener("input",I),t.openInMainBtn.removeEventListener("click",V),t.closeBtn.removeEventListener("click",Q),a.removeEventListener("click",K),t.resizeHandle.removeEventListener("pointerdown",ae),o.removeEventListener("pointermove",J),o.removeEventListener("pointerup",oe),t.resizeHandle.removeEventListener("keydown",b),C.destroy(),t.contextTabBtn.removeEventListener("click",L),t.notesTabBtn.removeEventListener("click",S),m==null||m.destroy(),t.glossaryTabBtn.removeEventListener("click",T),c.destroy(),H.destroy(),g==null||g.destroy(),e.classList.remove("right-sidebar-open","right-sidebar-resizing"),se(e,{right:0}),t.root.remove(),a.remove())}return{open:U,close:q,toggle:ne,isOpen:()=>h,destroy:ue,refreshLayout:de,openGlossaryTerm:ve}}function ke(e,r){const n=document.createElement("button");return n.type="button",n.className=r,n.setAttribute("aria-label",e),n}function Sr(e){const r=e.createElement("div");r.className="rx-playback-bar",r.setAttribute("role","group"),r.setAttribute("aria-label","Narration transport");const n=ke("Skip back 15 seconds","rx-playback-icon-btn rx-playback-skip-back");n.innerHTML=me("skip_back");const o=ke("Play","rx-playback-icon-btn rx-playback-play-pause");o.setAttribute("aria-pressed","false"),o.innerHTML=me("play");const t=ke("Skip forward 15 seconds","rx-playback-icon-btn rx-playback-skip-forward");t.innerHTML=me("skip_forward");const a=ke("Playback speed","rx-playback-rate-btn");a.textContent="1x";const i=e.createElement("div");i.className="rx-playback-info";const l=e.createElement("span");l.className="rx-playback-chapter",l.setAttribute("aria-live","polite");const c=e.createElement("span");return c.className="rx-playback-position",c.textContent="0:00",i.append(l,c),r.append(n,o,t,i,a),{root:r,skipBackBtn:n,playPauseBtn:o,skipForwardBtn:t,rateBtn:a,chapterLabel:l,positionLabel:c}}const Cr=`
.rx-playback-bar {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: var(--rx-space-2);
  padding: var(--rx-space-2) var(--rx-space-3);
  background: color-mix(in srgb, var(--rx-surface) 92%, transparent);
  border-top: 1px solid var(--rx-border); /* taste-skill-ignore: fixed transport bar above the reading surface, not a decorative divider */
  box-shadow: 0 -10px 24px rgba(20, 20, 30, 0.14); /* taste-skill-ignore: real sticky overlay bar, not an at-rest element */
  transition: transform var(--rx-motion-bar, 200ms ease);
}
/* BO-53 #1: hides with the rest of the chrome bars (src/shell/stylesheet.ts's own
 * .ui-visible rule) unless audio is actually playing, in which case mount.ts never adds this
 * class regardless of barsVisible (see applyChromeVisibility there). Previously this bar had
 * no hide rule at all and stayed visible even with every other bar dismissed. */
.rx-playback-bar.rx-playback-chrome-hidden {
  transform: translateY(100%);
}
.reader-shell.e-ink .rx-playback-bar,
.rx-playback-bar.e-ink {
  background: var(--rx-surface);
  border-top: 1px solid var(--rx-ink); /* taste-skill-ignore: e-ink has no shadow to separate the bar, needs a real border */
  box-shadow: none; /* taste-skill-ignore: disables the one real shadow above for e-ink, not a new one */
}

.rx-playback-icon-btn,
.rx-playback-rate-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  min-height: 48px;
  border: none;
  background: none;
  color: var(--rx-ink);
  border-radius: var(--rx-radius);
  cursor: pointer;
  font-size: 18px;
  line-height: 1;
}
.rx-playback-rate-btn {
  font-size: 13px;
  font-weight: 600;
  padding: 0 var(--rx-space-2);
}
.rx-playback-icon-btn:hover,
.rx-playback-rate-btn:hover {
  background: var(--rx-surface-2);
}
.rx-playback-play-pause[aria-pressed='true'] {
  color: var(--rx-accent);
}
.rx-playback-icon-btn:focus-visible,
.rx-playback-rate-btn:focus-visible {
  outline: 2px solid var(--rx-accent);
  outline-offset: 2px;
}
.rx-playback-icon-btn svg {
  width: 22px;
  height: 22px;
  fill: currentColor;
  stroke: none;
}

.rx-playback-info {
  flex: 1 1 auto;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: var(--rx-muted);
}
.rx-playback-chapter {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--rx-ink);
  font-size: 13px;
}
.rx-playback-position {
  font-variant-numeric: tabular-nums;
}

/* U1's own reading bottom bar (chapter/scrubber) sits at bottom:0 too (src/shell/stylesheet.ts);
 * once this bar reserves space via setBookInsets (src/shell/layout.ts), shift that bar up by the
 * same amount so the two stack instead of overlapping. Defaults to 0 (no-op) whenever the
 * playback bar isn't mounted, same pattern U2/U3 use for their own book-inset CSS variables. */
.reader-shell .rx-bar-bottom {
  bottom: var(--rx-book-inset-bottom, 0px);
}
`;class Lr{constructor(){D(this,"timeline",null);D(this,"activeAudioIndex",0)}setTimeline(r){this.timeline=r,this.activeAudioIndex=0}clear(){this.timeline=null,this.activeAudioIndex=0}hasTimeline(){return this.timeline!==null}itemFor(r){const n=this.timeline;if(!n)return null;const o=a=>a.beginSec<=r&&(a.endSec===null||r<a.endSec);let t=n.items.filter(a=>a.audioIndex===this.activeAudioIndex&&o(a));if(t.length===0){t=n.items.filter(o);const a=t[0];a&&(this.activeAudioIndex=a.audioIndex)}return t.length===0?null:t.reduce((a,i)=>i.beginSec>a.beginSec?i:a)}textHrefFor(r){var n;return((n=this.itemFor(r))==null?void 0:n.textHref)??null}}const je="reactor-playback-stylesheet",Xe=15,ge=[.75,1,1.25,1.5,1.75,2];function Ar(e){if(e.getElementById(je))return;const r=e.createElement("style");r.id=je,r.textContent=Cr,e.head.appendChild(r)}function Tr(e){const r=Number.isFinite(e)&&e>0?e:0,n=Math.floor(r),o=Math.floor(n/60),t=n%60;return`${o}:${String(t).padStart(2,"0")}`}function Ze(e){return ge.reduce((r,n)=>Math.abs(n-e)<Math.abs(r-e)?n:r,ge[0]??1)}function Br(e,r,n,o={}){const t=e.ownerDocument??document;Ar(t);let a=null,i=!1,l=!1,c=!1,s=!1,g=0,h=1,f=!1,d=0,u=!1;const m=new Lr;function v(k,I=null,w=null){n.emitIntent({type:"playback",action:k,positionSec:I,rate:w})}const p=()=>v(s?"pause":"play"),A=()=>v("seek",Math.max(0,g-Xe)),z=()=>v("seek",g+Xe),L=()=>{const k=ge.indexOf(Ze(h)),I=ge[(k+1)%ge.length]??1;v("rateChange",null,I)};function T(){a&&(a.playPauseBtn.setAttribute("aria-pressed",String(s)),a.playPauseBtn.setAttribute("aria-label",s?"Pause":"Play"),a.playPauseBtn.innerHTML=me(s?"pause":"play"),a.positionLabel.textContent=Tr(g),a.rateBtn.textContent=`${Ze(h)}x`,S())}function S(){a&&a.root.classList.toggle("rx-playback-chrome-hidden",!u&&!s)}function B(k){a&&a.chapterLabel.textContent!==(k??"")&&(a.chapterLabel.textContent=k??"")}function H(){i||l||(i=!0,a=Sr(t),a.root.classList.toggle("e-ink",!!o.eink),e.appendChild(a.root),a.playPauseBtn.addEventListener("click",p),a.skipBackBtn.addEventListener("click",A),a.skipForwardBtn.addEventListener("click",z),a.rateBtn.addEventListener("click",L),se(e,{bottom:a.root.offsetHeight||56}),T(),N())}function N(){!i||!f||(d+=1,r.narrationPrepare(d))}function $(){if(!i||!f)return;const k=m.textHrefFor(g);k?r.narrationHighlight(k):r.narrationUnhighlight()}function F(k){switch(k.type){case"loaded":f=k.hasMediaOverlay,m.clear(),N();break;case"relocate":B(k.chapterTitle);break;case"narrationTimeline":k.generation===d&&(m.setTimeline(k),$());break;case"narrationTimelineError":k.generation===d&&m.clear();break}}const R=r.on(F);r.replayLastEvents(F);function _(k){if(k.type==="configure"){if(c)return;c=!0,k.capabilities.playback&&H()}else if(k.type==="setPlaybackState"){if(!i)return;s=k.playing,g=k.positionSec,h=k.rate,T(),$()}}const M=n.onCommand(_),W=n.getConfig();W&&_(W);function x(){l||(l=!0,R(),M(),a&&(a.playPauseBtn.removeEventListener("click",p),a.skipBackBtn.removeEventListener("click",A),a.skipForwardBtn.removeEventListener("click",z),a.rateBtn.removeEventListener("click",L),a.root.remove(),se(e,{bottom:0})))}return{isVisible:()=>i,setChromeVisible:k=>{u=k,S()},destroy:x}}const Be={highlight:"Highlight",underline:"Underline",strikethrough:"Strikethrough",squiggly:"Squiggly underline"};function Nr(e){const r=e.createElement("div");r.className="rx-anno-popover",r.setAttribute("role","dialog"),r.setAttribute("aria-label","Annotation"),r.hidden=!0;const n=e.createElement("div");n.className="rx-anno-status",n.setAttribute("aria-live","polite");const o=e.createElement("button");o.type="button",o.className="rx-icon-btn rx-anno-close",o.setAttribute("aria-label","Close"),o.textContent="✕";const t=e.createElement("div");t.className="rx-anno-header",t.append(n,o);const a=e.createElement("div");a.className="rx-anno-colors",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Colour");const i=xt.map(v=>{const p=e.createElement("button");return p.type="button",p.className="rx-anno-swatch",p.style.setProperty("--rx-anno-swatch-color",v.value),p.setAttribute("role","radio"),p.setAttribute("aria-checked","false"),p.setAttribute("aria-label",v.label),p.dataset.color=v.value,a.append(p),p}),l=e.createElement("div");l.className="rx-anno-styles",l.setAttribute("role","group"),l.setAttribute("aria-label","Mark style");const c={};for(const v of Object.keys(Be)){const p=e.createElement("button");p.type="button",p.className=`rx-anno-style rx-anno-style-${v}`,p.textContent=Be[v],p.setAttribute("aria-label",Be[v]),p.dataset.style=v,l.append(p),c[v]=p}const s=e.createElement("button");s.type="button",s.className="rx-anno-note-toggle",s.textContent="Note",s.setAttribute("aria-expanded","false");const g=e.createElement("div");g.className="rx-anno-note-form",g.hidden=!0;const h=e.createElement("textarea");h.className="rx-anno-note-textarea",h.setAttribute("aria-label","Note text"),h.rows=3;const f=e.createElement("div");f.className="rx-anno-note-actions";const d=e.createElement("button");d.type="button",d.className="rx-anno-note-save",d.textContent="Save";const u=e.createElement("button");u.type="button",u.className="rx-anno-note-cancel",u.textContent="Cancel",f.append(u,d),g.append(h,f);const m=e.createElement("button");return m.type="button",m.className="rx-anno-delete",m.textContent="Delete",m.hidden=!0,r.append(t,a,l,s,g,m),{root:r,colorRow:a,colorButtons:i,styleRow:l,styleButtons:c,noteToggleBtn:s,noteForm:g,noteTextarea:h,noteSaveBtn:d,noteCancelBtn:u,deleteBtn:m,closeBtn:o,statusLabel:n}}const zr=`
.rx-anno-popover {
  position: absolute;
  z-index: 70;
  width: min(280px, 92vw);
  background: var(--rx-surface);
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  box-shadow: var(--rx-elevation); /* taste-skill-ignore: a real floating popover, not an at-rest surface */
  padding: var(--rx-space-3);
  display: flex;
  flex-direction: column;
  gap: var(--rx-space-2);
}
.rx-anno-popover[hidden] {
  display: none;
}
.reader-shell.e-ink .rx-anno-popover {
  border: 1px solid var(--rx-ink);
}
.rx-anno-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--rx-space-2);
}
.rx-anno-status {
  font-size: 13px;
  color: var(--rx-muted);
}
.rx-anno-close {
  flex: 0 0 auto;
}
.rx-anno-colors {
  display: flex;
  gap: var(--rx-space-2);
}
.rx-anno-swatch {
  width: 40px;
  height: 48px;
  min-width: 40px;
  border: 2px solid transparent;
  border-radius: var(--rx-radius);
  background: var(--rx-surface-2);
  cursor: pointer;
  position: relative;
}
.rx-anno-swatch::before {
  content: '';
  position: absolute;
  inset: 12px;
  border-radius: 50%;
  background: var(--rx-anno-swatch-color);
}
.reader-shell.e-ink .rx-anno-swatch::before {
  border-radius: 0;
}
.rx-anno-swatch[aria-checked='true'] {
  border-color: var(--rx-accent);
}
.rx-anno-styles {
  display: flex;
  flex-wrap: wrap;
  gap: var(--rx-space-2);
}
.rx-anno-style,
.rx-anno-note-toggle,
.rx-anno-note-save,
.rx-anno-note-cancel,
.rx-anno-delete {
  min-height: 48px;
  padding: 0 var(--rx-space-3);
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  background: var(--rx-surface-2);
  color: var(--rx-ink);
  font-size: 13px;
  cursor: pointer;
}
.rx-anno-style[aria-pressed='true'] {
  border-color: var(--rx-accent);
  color: var(--rx-accent);
}
.rx-anno-delete {
  color: #c0392b;
  border-color: #c0392b;
}
.rx-anno-note-form {
  display: flex;
  flex-direction: column;
  gap: var(--rx-space-2);
}
.rx-anno-note-textarea {
  min-height: 72px;
  padding: var(--rx-space-2);
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  background: var(--rx-ground);
  color: var(--rx-ink);
  font: inherit;
  resize: vertical;
}
.rx-anno-note-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--rx-space-2);
}

.rx-anno-selection-hint {
  position: absolute;
  z-index: 70;
  background: var(--rx-surface);
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  box-shadow: var(--rx-elevation); /* taste-skill-ignore: floating selection menu */
  padding: var(--rx-space-1);
}
`,Je="reactor-annotations-stylesheet";function Ir(e){return e==="underline"||e==="squiggly"?"underline":"highlight"}class Pr{constructor(r=500){D(this,"map",new Map);this.cap=r}get(r){return this.map.get(r)}addAll(r){for(const n of r)for(this.map.delete(n.cfi),this.map.set(n.cfi,n);this.map.size>this.cap;){const o=this.map.keys().next().value;if(o===void 0)break;this.map.delete(o)}}}function Mr({shellRoot:e,core:r,hostChannel:n,options:o={}}){const t=e.ownerDocument??document;if(!t.getElementById(Je)){const x=t.createElement("style");x.id=Je,x.textContent=zr,t.head.appendChild(x)}const a=Nr(t);e.append(a.root);const i=new Pr;let l=Se,c=!1,s=null,g=null;function h(){s=null,g=null,a.root.hidden=!0,a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}function f(x){const k=e.getBoundingClientRect(),I=x?x.left-k.left:(e.clientWidth||300)/2-140,w=x?x.bottom-k.top+8:60,O=Math.max(0,(e.clientWidth||300)-288);a.root.style.left=`${Math.min(Math.max(0,I),O)}px`,a.root.style.top=`${Math.max(0,w)}px`}function d(x){l=x;for(const k of a.colorButtons)k.setAttribute("aria-checked",String(k.dataset.color===x))}function u(x){for(const[k,I]of Object.entries(a.styleButtons))I.setAttribute("aria-pressed",String(k===x))}function m(x,k,I){s={kind:"create",cfi:x,text:k},a.statusLabel.textContent="Add mark",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.noteTextarea.value="",d(l),u(null),a.root.hidden=!1,f(I)}function v(x,k){s={kind:"edit",note:x},a.statusLabel.textContent="Edit mark",a.deleteBtn.hidden=!1,a.noteForm.hidden=!0,a.noteTextarea.value=x.note??"",d(x.color??Se),u(x.style??(x.kind==="underline"?"underline":"highlight")),a.root.hidden=!1,f(k)}function p(x,k){s=null,g=x,a.statusLabel.textContent="Loading…",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.root.hidden=!1,f(k),n.emitIntent({type:"notesPageRequest",offset:0,limit:1,filter:null,sort:null,query:`cfi:${x}`})}function A(x){if(x.type==="selection"&&x.cfi)m(x.cfi,x.text,x.rect);else if(x.type==="selectionCleared")(s==null?void 0:s.kind)==="create"&&h();else if(x.type==="annotationTap"){if(!x.cfi)return;const k=i.get(x.cfi);k?v(k,x.rect):p(x.cfi,x.rect)}}const z=r.on(A);function L(x){if(x.type==="setNotes"&&(i.addAll(x.items),g)){const k=x.items.find(I=>I.cfi===g);if(k){const I=a.root.hidden?null:{left:parseFloat(a.root.style.left||"0"),top:parseFloat(a.root.style.top||"0"),bottom:0};v(k,I)}else h()}}const T=n.onCommand(L);function S(x){(s==null?void 0:s.kind)==="create"&&(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:Ir(x),color:l,style:x,text:s.text,note:null}),r.clearSelection(),h())}function B(x){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:l,style:x,note:s.note.note}),h())}function H(x){const I=x.currentTarget.dataset.color??Se;d(I),(s==null?void 0:s.kind)==="edit"&&n.emitIntent({type:"annotationUpdate",id:s.note.id,color:I,style:s.note.style,note:s.note.note})}for(const x of a.colorButtons)x.addEventListener("click",H);const N={highlight:()=>(s==null?void 0:s.kind)==="create"?S("highlight"):B("highlight"),underline:()=>(s==null?void 0:s.kind)==="create"?S("underline"):B("underline"),strikethrough:()=>(s==null?void 0:s.kind)==="create"?S("strikethrough"):B("strikethrough"),squiggly:()=>(s==null?void 0:s.kind)==="create"?S("squiggly"):B("squiggly")};for(const[x,k]of Object.entries(a.styleButtons))k.addEventListener("click",N[x]);function $(){const x=a.noteForm.hidden;a.noteForm.hidden=!x,a.noteToggleBtn.setAttribute("aria-expanded",String(x)),x&&a.noteTextarea.focus()}a.noteToggleBtn.addEventListener("click",$);function F(){a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}a.noteCancelBtn.addEventListener("click",F);function R(){const x=a.noteTextarea.value.trim()||null;(s==null?void 0:s.kind)==="create"?(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:"note",color:l,style:null,text:s.text,note:x}),r.clearSelection(),h()):(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:s.note.color,style:s.note.style,note:x}),h())}a.noteSaveBtn.addEventListener("click",R);function _(){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationDelete",id:s.note.id}),h())}a.deleteBtn.addEventListener("click",_);const M=()=>h();a.closeBtn.addEventListener("click",M);function W(){if(!c){c=!0,z(),T();for(const x of a.colorButtons)x.removeEventListener("click",H);for(const[x,k]of Object.entries(a.styleButtons))k.removeEventListener("click",N[x]);a.noteToggleBtn.removeEventListener("click",$),a.noteCancelBtn.removeEventListener("click",F),a.noteSaveBtn.removeEventListener("click",R),a.deleteBtn.removeEventListener("click",_),a.closeBtn.removeEventListener("click",M),a.root.remove()}}return{isOpen:()=>!a.root.hidden,close:h,destroy:W}}const Hr='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function Or(e,r,n){const o=document.createElement("button");return o.type="button",o.className=n,o.setAttribute("aria-label",e),o.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,o}function xe(e,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-toggle",n.setAttribute("aria-pressed","false"),n.setAttribute("data-setting",r),n.textContent=e,n}function we(e,r,n){const o=document.createElement("div");o.className=`rx-settings-pills ${n}`,o.setAttribute("role","radiogroup"),o.setAttribute("aria-label",e);for(const t of r){const a=document.createElement("button");a.type="button",a.className="rx-settings-pill",a.setAttribute("role","radio"),a.setAttribute("aria-checked","false"),a.setAttribute("data-value",t.id),a.textContent=t.label,o.appendChild(a)}return o}function ce(e,r,n,o){const t=document.createElement("div");t.className="rx-settings-slider-row";const a=document.createElement("div");a.className="rx-settings-slider-label";const i=document.createElement("span");i.textContent=e;const l=document.createElement("span");l.className="rx-settings-slider-value",a.append(i,l);const c=document.createElement("input");return c.type="range",c.className="rx-settings-slider",c.min=String(r),c.max=String(n),c.step=String(o),c.setAttribute("aria-label",e),t.append(a,c),{row:t,input:c,value:l}}function Fr(e,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-tab",n.setAttribute("role","tab"),n.setAttribute("aria-selected","false"),n.setAttribute("data-tab",e),n.id=`rx-settings-tab-${e}`,n.textContent=r,n}function fe(e){const r=document.createElement("div");return r.className="rx-settings-panel",r.setAttribute("role","tabpanel"),r.setAttribute("data-panel",e),r.setAttribute("aria-labelledby",`rx-settings-tab-${e}`),r.hidden=!0,r}function _r(e){const r=document.createElement("div");r.className="rx-settings-scrim";const n=document.createElement("div");n.className="rx-settings-sheet",n.setAttribute("role","dialog"),n.setAttribute("aria-label","Text settings"),n.tabIndex=-1;const o=document.createElement("div");o.className="rx-settings-head";const t=document.createElement("h3");t.className="rx-settings-title",t.textContent="Text settings";const a=Or("Close settings",Hr,"rx-icon-btn rx-settings-close");o.append(t,a);const i=document.createElement("div");i.className="rx-settings-scope",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Settings scope");const l=document.createElement("button");l.type="button",l.className="rx-settings-scope-btn",l.setAttribute("role","radio"),l.setAttribute("aria-checked","true"),l.setAttribute("data-scope","global"),l.textContent="Global";const c=document.createElement("button");c.type="button",c.className="rx-settings-scope-btn",c.setAttribute("role","radio"),c.setAttribute("aria-checked","false"),c.setAttribute("data-scope","book"),c.textContent="This book",i.append(l,c);const s=document.createElement("div");s.className="rx-settings-tabs",s.setAttribute("role","tablist");const g=[["typography","Typography"],["layout","Layout"],["theme","Theme"],["controls","Controls"],["playback","Playback"]],h={};for(const[V,Q]of g){const K=Fr(V,Q);h[V]=K,s.appendChild(K)}const f=document.createElement("div");f.className="rx-settings-body";const d=fe("typography"),u=ce("Font size",13,28,1),m=ce("Paragraph spacing",0,2,.1),v=we("Typeface",[],"rx-settings-font-pills");d.append(u.row,v,m.row);const p=fe("layout"),A=we("Reading mode",[{id:"paginated",label:"Paginated"},{id:"scrolled",label:"Scrolling"}],"rx-settings-flow-pills"),z=we("Columns",[{id:"1",label:"1 column"},{id:"2",label:"2 columns"}],"rx-settings-columns-pills"),L=ce("Margins",0,96,4),T=ce("Line spacing",1.2,1.95,.05),S=xe("Justify text","justify"),B=xe("Hyphenate","hyphenate"),H=xe("Use book's own styling","useBookLayout");p.append(A,z,L.row,T.row,S,B,H);const N=fe("theme"),$=document.createElement("div");$.className="rx-settings-swatches",$.setAttribute("role","radiogroup"),$.setAttribute("aria-label","Theme"),N.append($);const F=fe("controls"),R=xe("Swipe to turn pages","swipe"),_=we("Tap zone size",[{id:"standard",label:"Standard"},{id:"wide",label:"Wide"}],"rx-settings-tapzone-pills"),M=document.createElement("div");M.className="rx-settings-volumekeys",M.hidden=!0;const W=xe("Volume keys turn pages","volumeKeys");M.append(W),F.append(R,_,M);const x=fe("playback"),k=document.createElement("p");k.className="rx-settings-empty",k.textContent="No narration provider for this book.";const I=document.createElement("div");I.className="rx-settings-playback-controls",I.hidden=!0;const w=ce("Narration speed",.5,3,.1),O=ce("Skip forward (seconds)",5,60,5);return I.append(w.row,O.row),x.append(k,I),f.append(d,p,N,F,x),n.append(o,i,s,f),e.append(r,n),{root:n,scrim:r,closeBtn:a,scopeGlobalBtn:l,scopeBookBtn:c,tabsRow:s,tabButtons:h,panels:{typography:d,layout:p,theme:N,controls:F,playback:x},fontSizeInput:u.input,fontSizeValue:u.value,paragraphSpacingInput:m.input,paragraphSpacingValue:m.value,fontFamilyPills:v,flowPills:A,columnsPills:z,marginInput:L.input,marginValue:L.value,lineHeightInput:T.input,lineHeightValue:T.value,justifyToggle:S,hyphenateToggle:B,useBookLayoutToggle:H,themeSwatches:$,swipeToggle:R,tapZonePills:_,volumeKeysRow:M,volumeKeysToggle:W,playbackEmpty:k,playbackControls:I,narrationSpeedInput:w.input,narrationSpeedValue:w.value,skipForwardInput:O.input,skipForwardValue:O.value}}const $r=`
.rx-settings-scrim {
  position: absolute;
  inset: 0;
  z-index: 49;
  background: color-mix(in srgb, #000 40%, transparent);
  display: none;
}
.reader-shell.e-ink .rx-settings-scrim {
  background: #000;
}
.rx-settings-scrim.visible {
  display: block;
}

/* z-index 50 (SHELL.md section 1.4: "settings sheet | 50 (own stack, sits over sidebars"). */
.rx-settings-sheet {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  max-height: 78%;
  display: flex;
  flex-direction: column;
  background: var(--rx-surface);
  border-top: 1px solid var(--rx-border);
  border-radius: var(--rx-radius) var(--rx-radius) 0 0;
  box-shadow: var(--rx-elevation); /* taste-skill-ignore: a real overlay sheet while open, not an at-rest surface */
  transform: translateY(105%);
  transition: transform var(--rx-motion-bar);
}
.reader-shell.settings-open .rx-settings-sheet {
  transform: translateY(0);
}
.reader-shell.e-ink .rx-settings-sheet {
  box-shadow: none; /* taste-skill-ignore: e-ink never carries a shadow (SHELL.md fix #2) */
  border: 1px solid var(--rx-ink);
}

/* Desktop: a centered/docked panel, not a full-width bottom sheet (SHELL.md section 2: "desktop
 * has no thumb-reach constraint... U6 decides the exact desktop presentation but must keep the
 * same tab set and Global/This book scope control"). */
.reader-shell.size-desktop .rx-settings-sheet {
  left: 50%;
  right: auto;
  bottom: 50%;
  width: min(480px, 90%);
  max-height: 80%;
  border-radius: var(--rx-radius);
  border: 1px solid var(--rx-border);
  transform: translate(-50%, 50%) scale(0.98);
  opacity: 0;
  pointer-events: none;
}
.reader-shell.size-desktop.settings-open .rx-settings-sheet {
  transform: translate(-50%, 50%) scale(1);
  opacity: 1;
  pointer-events: auto;
}

.rx-settings-head {
  display: flex;
  align-items: center;
  gap: var(--rx-space-2);
  padding: var(--rx-space-3) var(--rx-space-2) var(--rx-space-3) var(--rx-space-3);
  border-bottom: 1px solid var(--rx-border); /* taste-skill-ignore: fixed chrome header above scrolling content, not a decorative divider */
  flex: 0 0 auto;
}
.rx-settings-title {
  flex: 1 1 auto;
  margin: 0;
  font-size: 15px;
  font-weight: 600;
}

.rx-settings-scope {
  display: flex;
  flex: 0 0 auto;
  gap: var(--rx-space-1);
  padding: 0 var(--rx-space-3) var(--rx-space-2);
}
.rx-settings-scope-btn {
  flex: 1 1 0;
  min-height: 48px;
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  background: var(--rx-ground);
  color: var(--rx-ink);
  font-family: var(--rx-font-sans);
  font-size: 13px;
  cursor: pointer;
}
.rx-settings-scope-btn[aria-checked='true'] {
  background: var(--rx-accent);
  color: var(--rx-accent-ink);
  border-color: var(--rx-accent);
}

.rx-settings-tabs {
  display: flex;
  flex: 0 0 auto;
  border-bottom: 1px solid var(--rx-border); /* taste-skill-ignore: tablist/tabpanel boundary (role=tablist), not a decorative divider */
  overflow-x: auto;
}
.rx-settings-tab {
  flex: 1 1 0;
  min-height: 48px;
  min-width: 72px;
  border: none;
  background: none;
  color: var(--rx-muted);
  font-size: 12px;
  font-family: var(--rx-font-sans);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  padding: 0 var(--rx-space-2);
}
.rx-settings-tab[aria-selected='true'] {
  color: var(--rx-ink);
  border-bottom-color: var(--rx-accent);
  font-weight: 600;
}

.rx-settings-body {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: var(--rx-space-3);
}
.rx-settings-panel[hidden] {
  display: none;
}
.rx-settings-panel {
  display: flex;
  flex-direction: column;
  gap: var(--rx-space-3);
}

.rx-settings-slider-row {
  display: flex;
  flex-direction: column;
  gap: var(--rx-space-1);
}
.rx-settings-slider-label {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: var(--rx-ink);
}
.rx-settings-slider-value {
  color: var(--rx-muted);
}
.rx-settings-slider {
  appearance: none;
  width: 100%;
  min-height: 48px;
  margin: 0;
  background: transparent;
}
.rx-settings-slider::-webkit-slider-runnable-track {
  height: 4px;
  background: var(--rx-border);
  border-radius: 2px;
}
.rx-settings-slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  margin-top: -8px;
  border-radius: 50%;
  background: var(--rx-accent);
}
.reader-shell.e-ink .rx-settings-slider::-webkit-slider-thumb {
  border-radius: 0;
}

.rx-settings-pills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--rx-space-1);
}
.rx-settings-pill {
  min-height: 44px;
  min-width: 48px;
  padding: 0 var(--rx-space-3);
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  background: var(--rx-ground);
  color: var(--rx-ink);
  font-family: var(--rx-font-sans);
  font-size: 13px;
  cursor: pointer;
}
.rx-settings-pill[aria-checked='true'] {
  background: var(--rx-accent);
  color: var(--rx-accent-ink);
  border-color: var(--rx-accent);
}

.rx-settings-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  padding: 0 var(--rx-space-2);
  border: 1px solid var(--rx-border);
  border-radius: var(--rx-radius);
  background: var(--rx-ground);
  color: var(--rx-ink);
  font-family: var(--rx-font-sans);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}
.rx-settings-toggle[aria-pressed='true'] {
  border-color: var(--rx-accent);
  color: var(--rx-accent);
  font-weight: 600;
}

.rx-settings-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: var(--rx-space-3);
}
.rx-settings-swatch {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--rx-space-1);
  min-width: 48px;
  min-height: 48px;
  padding: var(--rx-space-1);
  border: none;
  background: none;
  cursor: pointer;
  font-size: 11px;
  color: var(--rx-muted);
  font-family: var(--rx-font-sans);
}
.rx-settings-swatch-dot {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--rx-border);
}
.rx-settings-swatch[aria-checked='true'] .rx-settings-swatch-dot {
  border-color: var(--rx-accent);
  box-shadow: 0 0 0 2px var(--rx-accent); /* taste-skill-ignore: selection ring on a control, not a resting decoration */
}
.reader-shell.e-ink .rx-settings-swatch-dot {
  border-radius: 0;
}

.rx-settings-empty {
  margin: 0;
  color: var(--rx-muted);
  font-size: 13px;
}

.rx-settings-volumekeys[hidden],
.rx-settings-playback-controls[hidden] {
  display: none;
}
`,Qe={fontSize:16,lineHeight:1.5,fontFamily:null,paragraphSpacing:0,maxColumnCount:2,gap:.05,maxInlineSize:720,maxBlockSize:1440,justify:!0,hyphenate:!0,isDark:!1,themeName:"default",flow:"paginated",useBookLayout:!0,marginTop:40,marginBottom:40,marginLeft:40,marginRight:40,linkSideMargins:!0},Ne=[{id:"light",label:"Light",themeName:"default",isDark:!1,swatchBg:"#ffffff",swatchFg:"#000000"},{id:"sepia",label:"Sepia",themeName:"sepia",isDark:!1,swatchBg:"#f1e8d0",swatchFg:"#5b4636"},{id:"dark",label:"Dark",themeName:"default",isDark:!0,swatchBg:"#222222",swatchFg:"#e0e0e0"},{id:"amoled",label:"AMOLED",themeName:"amoled",isDark:!0,swatchBg:"#000000",swatchFg:"#ffffff"}];function Dr(e,r){return Ne.find(n=>n.themeName===e&&n.isDark===r)??Ne.find(n=>n.id===(r?"dark":"light"))}const et=[{id:"publisher",label:"Publisher",value:null},{id:"serif",label:"Serif",value:'Georgia, "Iowan Old Style", "Times New Roman", serif'},{id:"sans",label:"Sans-serif",value:'-apple-system, "Segoe UI", Roboto, Arial, sans-serif'},{id:"mono",label:"Monospace",value:'"Courier New", monospace'}];function Rr(e){return Array.from(e.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===e)}function Gr(e){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const t=Rr(e);if(t.length===0){o.preventDefault(),e.focus();return}const a=t[0],i=t[t.length-1],l=e.ownerDocument.activeElement;o.shiftKey&&l===a?(o.preventDefault(),i.focus()):!o.shiftKey&&l===i&&(o.preventDefault(),a.focus())}return e.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,e.removeEventListener("keydown",n)}}}const tt="reactor-settings-stylesheet",Wr=["typography","layout","theme","controls","playback"];function qr(e){if(e.getElementById(tt))return;const r=e.createElement("style");r.id=tt,r.textContent=$r,e.head.appendChild(r)}function Ur(e,r,n){var ae,J,oe;const o=e.ownerDocument??document;qr(o);const t=_r(e),a=Gr(t.root),i={global:{...Qe},book:{...Qe}};let l="global",c="typography",s=!1,g=!1,h=((J=(ae=n.hostChannel)==null?void 0:ae.getConfig())==null?void 0:J.capabilities.playback)??!1,f=null;t.volumeKeysRow.hidden=!n.volumeKeysCapability;function d(b){e.classList.remove("theme-dark","theme-amoled"),b.themeName==="amoled"?e.classList.add("theme-amoled"):b.isDark&&e.classList.add("theme-dark")}function u(){return i[l]}function m(){const b=u().fontFamily;for(const C of Array.from(t.fontFamilyPills.children)){const U=et.find(q=>q.id===C.dataset.value);C.setAttribute("aria-checked",String((U==null?void 0:U.value)===b))}}function v(){const b=Dr(u().themeName,u().isDark);for(const C of Array.from(t.themeSwatches.children))C.setAttribute("aria-checked",String(C.dataset.value===b.id))}function p(b,C){for(const U of Array.from(b.children))U.setAttribute("aria-checked",String(U.dataset.value===C))}function A(){t.playbackEmpty.hidden=h,t.playbackControls.hidden=!h}function z(){const b=u();t.fontSizeInput.value=String(b.fontSize),t.fontSizeInput.setAttribute("aria-valuetext",`${b.fontSize}px`),t.fontSizeValue.textContent=`${b.fontSize}px`,t.paragraphSpacingInput.value=String(b.paragraphSpacing),t.paragraphSpacingValue.textContent=`${b.paragraphSpacing}em`,m(),p(t.flowPills,b.flow),p(t.columnsPills,String(b.maxColumnCount)),t.marginInput.value=String(b.marginTop),t.marginValue.textContent=`${b.marginTop}px`,t.lineHeightInput.value=String(b.lineHeight),t.lineHeightValue.textContent=b.lineHeight.toFixed(2),t.justifyToggle.setAttribute("aria-pressed",String(b.justify)),t.hyphenateToggle.setAttribute("aria-pressed",String(b.hyphenate)),t.useBookLayoutToggle.setAttribute("aria-pressed",String(b.useBookLayout)),v(),A(),t.scopeGlobalBtn.setAttribute("aria-checked",String(l==="global")),t.scopeBookBtn.setAttribute("aria-checked",String(l==="book"))}function L(b){var C;i[l]={...i[l],...b},z(),r.applyStyles(i[l]),d(i[l]),(C=n.hostChannel)==null||C.emitIntent({type:"settingsChange",scope:l,settings:i[l]})}function T(){L({fontSize:Number(t.fontSizeInput.value)})}t.fontSizeInput.addEventListener("change",T);function S(){L({paragraphSpacing:Number(t.paragraphSpacingInput.value)})}t.paragraphSpacingInput.addEventListener("change",S);for(const b of et){const C=document.createElement("button");C.type="button",C.className="rx-settings-pill",C.setAttribute("role","radio"),C.setAttribute("aria-checked","false"),C.setAttribute("data-value",b.id),C.textContent=b.label,C.addEventListener("click",()=>L({fontFamily:b.value})),t.fontFamilyPills.appendChild(C)}function B(b){const C=b.currentTarget.dataset.value;L({flow:C})}for(const b of Array.from(t.flowPills.children))b.addEventListener("click",B);function H(b){const C=Number(b.currentTarget.dataset.value);L({maxColumnCount:C})}for(const b of Array.from(t.columnsPills.children))b.addEventListener("click",H);function N(){const b=Number(t.marginInput.value);L({marginTop:b,marginBottom:b,marginLeft:b,marginRight:b})}t.marginInput.addEventListener("change",N);function $(){L({lineHeight:Number(t.lineHeightInput.value)})}t.lineHeightInput.addEventListener("change",$);function F(){L({justify:!u().justify})}t.justifyToggle.addEventListener("click",F);function R(){L({hyphenate:!u().hyphenate})}t.hyphenateToggle.addEventListener("click",R);function _(){L({useBookLayout:!u().useBookLayout})}t.useBookLayoutToggle.addEventListener("click",_);for(const b of Ne){const C=document.createElement("button");C.type="button",C.className="rx-settings-swatch",C.setAttribute("role","radio"),C.setAttribute("aria-checked","false"),C.setAttribute("aria-label",b.label),C.setAttribute("data-value",b.id);const U=document.createElement("span");U.className="rx-settings-swatch-dot",U.style.background=b.swatchBg;const q=document.createElement("span");q.textContent=b.label,C.append(U,q),C.addEventListener("click",()=>L({themeName:b.themeName,isDark:b.isDark})),t.themeSwatches.appendChild(C)}let M=!0;function W(){M=!M,t.swipeToggle.setAttribute("aria-pressed",String(M)),r.setSwipe(M)}t.swipeToggle.addEventListener("click",W),t.swipeToggle.setAttribute("aria-pressed",String(M));let x="standard";function k(b){x=b.currentTarget.dataset.value??"standard",p(t.tapZonePills,x)}for(const b of Array.from(t.tapZonePills.children))b.addEventListener("click",k);p(t.tapZonePills,x);let I=!1;function w(){I=!I,t.volumeKeysToggle.setAttribute("aria-pressed",String(I))}t.volumeKeysToggle.addEventListener("click",w);function O(){var C;const b=Number(t.narrationSpeedInput.value);t.narrationSpeedValue.textContent=`${b.toFixed(1)}x`,(C=n.hostChannel)==null||C.emitIntent({type:"playback",action:"rateChange",positionSec:null,rate:b})}t.narrationSpeedInput.addEventListener("input",()=>{t.narrationSpeedValue.textContent=`${Number(t.narrationSpeedInput.value).toFixed(1)}x`}),t.narrationSpeedInput.addEventListener("change",O);function V(){t.skipForwardValue.textContent=`${t.skipForwardInput.value}s`}t.skipForwardInput.addEventListener("input",V),t.narrationSpeedInput.value="1",t.narrationSpeedValue.textContent="1.0x",t.skipForwardInput.value="30",t.skipForwardValue.textContent="30s";function Q(b){b!==c&&(t.tabButtons[c].setAttribute("aria-selected","false"),t.panels[c].hidden=!0,c=b,t.tabButtons[c].setAttribute("aria-selected","true"),t.panels[c].hidden=!1)}for(const b of Wr)t.tabButtons[b].addEventListener("click",()=>Q(b));Q("typography"),t.tabButtons.typography.setAttribute("aria-selected","true"),t.panels.typography.hidden=!1;function K(b){b!==l&&(l=b,z(),r.applyStyles(i[l]),d(i[l]))}t.scopeGlobalBtn.addEventListener("click",()=>K("global")),t.scopeBookBtn.addEventListener("click",()=>K("book"));const X=(oe=n.hostChannel)==null?void 0:oe.onCommand(b=>{b.type==="setSettingsScope"?(i[b.scope]=b.settings,b.scope===l&&(z(),r.applyStyles(i[l]),d(i[l]))):b.type==="configure"&&(h=b.capabilities.playback,A())});function re(){var b;s||(s=!0,f=o.activeElement??null,e.classList.add("settings-open"),t.scrim.classList.add("visible"),a.activate(),t.root.focus({preventScroll:!0}),(b=n.onOpenChange)==null||b.call(n,!0))}function ee(){var b,C;s&&(s=!1,e.classList.remove("settings-open"),t.scrim.classList.remove("visible"),a.deactivate(),(b=f==null?void 0:f.focus)==null||b.call(f),f=null,(C=n.onOpenChange)==null||C.call(n,!1))}function ie(){s?ee():re()}t.closeBtn.addEventListener("click",ee),t.scrim.addEventListener("click",ee),z();function Z(){g||(g=!0,X==null||X(),a.deactivate(),e.classList.remove("settings-open"),t.root.remove(),t.scrim.remove())}return{open:re,close:ee,toggle:ie,isOpen:()=>s,getActiveSettings:()=>u(),getActiveScope:()=>l,destroy:Z}}const Kr={top:0,right:0,bottom:0,left:0};function rt(e,r){e.style.setProperty("--rx-inset-top",`${Math.max(0,r.top)}px`),e.style.setProperty("--rx-inset-right",`${Math.max(0,r.right)}px`),e.style.setProperty("--rx-inset-bottom",`${Math.max(0,r.bottom)}px`),e.style.setProperty("--rx-inset-left",`${Math.max(0,r.left)}px`)}const Yr=280,nt="reactor-shell-stylesheet";function Vr(e){if(e.getElementById(nt))return;const r=e.createElement("style");r.id=nt,r.textContent=gt,e.head.appendChild(r)}function jr(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function Xr(){const e=new Set;return{getChromeState:()=>({barsVisible:!1,sidebar:"none"}),onChromeState:r=>(e.add(r),()=>e.delete(r)),setBarsVisible:()=>{},refreshSizeClass:()=>{},destroy:()=>{e.clear()}}}function Qr(e,r,n={}){var j,ze,Ie,Pe,Me,He,Oe,Fe;if((n.chrome??"reactor")==="host")return Xr();const t=e.ownerDocument??document;Vr(t);const a=mt(e),i=a.root;let l=!1,c=!1,s="none",g=!1,h=!1,f=null;const d=new Set;function u(){var G;if(h)return;const E={barsVisible:c,sidebar:s};for(const ye of d)ye(E);(G=n.hostChannel)==null||G.emitIntent({type:"chromeState",barsVisible:c,sidebar:s})}function m(E){c!==E&&(c=E,i.classList.toggle("ui-visible",c),J==null||J.setChromeVisible(c),u())}function v(){m(!c)}const p=Ut(i,E=>r.goTo(E),{eink:n.eink,onBack:()=>{var E;return(E=n.hostChannel)==null?void 0:E.emitIntent({type:"back"})},onSidebarChange:E=>{s=E?"left":"none",a.contentsBtn.setAttribute("aria-pressed",String(E)),u(),L()}});function A(){return i.classList.contains("size-desktop")}function z(){if(p.isOpen()){p.close();return}A()||Z.close(),ne.close(),p.open()}a.contentsBtn.addEventListener("click",z);function L(){const E=i.classList.contains("size-desktop");se(i,{left:E&&p.isOpen()?Yr:0})}function T(){i.classList.toggle("reduced-motion",B||jr())}function S(){i.classList.toggle("e-ink",B)}let B=((ze=(j=n.hostChannel)==null?void 0:j.getConfig())==null?void 0:ze.eink)??!!n.eink;S(),T(),rt(i,((Pe=(Ie=n.hostChannel)==null?void 0:Ie.getConfig())==null?void 0:Pe.insets)??Kr);const H=(Me=n.hostChannel)==null?void 0:Me.onCommand(E=>{E.type==="configure"&&(B=E.eink,S(),T(),rt(i,E.insets))});function N(){const E=e.clientWidth||i.clientWidth,G=Ce(E);i.classList.remove("size-phone","size-fold-tablet","size-desktop"),i.classList.add(`size-${G}`),L()}N();function $(){N(),Z.refreshLayout()}const F=typeof ResizeObserver=="function"?new ResizeObserver(()=>$()):null;F==null||F.observe(e);const R=()=>$();F||window.addEventListener("resize",R);const _=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,M=()=>T();(He=_==null?void 0:_.addEventListener)==null||He.call(_,"change",M);function W(E,G){const ye=kt(E,l);ye==="prev"?r.prev():ye==="next"?r.next():v()}function x(E){E==="prev"?r.prev():E==="next"?r.next():v()}function k(E,G){G.key!=="Enter"&&G.key!==" "||(G.preventDefault(),x(E))}const I=()=>x(l?"next":"prev"),w=()=>x(l?"prev":"next"),O=()=>x("toggle"),V=E=>k(l?"next":"prev",E),Q=E=>k(l?"prev":"next",E),K=E=>k("toggle",E);a.zoneLeft.addEventListener("click",I),a.zoneRight.addEventListener("click",w),a.zoneCentre.addEventListener("click",O),a.zoneLeft.addEventListener("keydown",V),a.zoneRight.addEventListener("keydown",Q),a.zoneCentre.addEventListener("keydown",K);function X(){return ne.isOpen()?(ne.close(),!0):q!=null&&q.isOpen()?(q.close(),!0):de.isOpen()?(de.close(),!0):Z.isOpen()?(ae(),!0):p.isOpen()?(p.close(),!0):c?(m(!1),!0):!1}function re(E){const G=St(E);G&&(Ct(G)&&E.preventDefault(),G==="next"?r.next():G==="prev"?r.prev():G==="toggleBars"?v():G==="escape"&&X())}t.addEventListener("keydown",re);const ee=()=>r.historyBack(),ie=()=>r.historyForward();a.historyBackBtn.addEventListener("click",ee),a.historyForwardBtn.addEventListener("click",ie);const Z=Er(i,r,{getSizeClass:()=>Ce(e.clientWidth||i.clientWidth),onWidthChange:n.onContextWidthChange,hostChannel:n.hostChannel,onClose:()=>{s="none",a.contextBtn.setAttribute("aria-pressed","false"),u()}});function ae(){s==="right"?(Z.close(),s="none"):(A()||p.close(),ne.close(),Z.open(),s="right"),a.contextBtn.setAttribute("aria-pressed",String(s==="right")),u()}a.contextBtn.addEventListener("click",ae);const J=n.hostChannel?Br(i,r,n.hostChannel,{eink:n.eink}):null;let oe=new Set;function b(){a.bookmarkBtn.setAttribute("aria-pressed",String(!!f&&oe.has(f)))}function C(){!n.hostChannel||!f||n.hostChannel.emitIntent({type:"bookmarkToggle",cfi:f})}const U=(Oe=n.hostChannel)==null?void 0:Oe.onCommand(E=>{E.type==="setBookmarks"&&(oe=new Set(E.items.map(G=>G.cfi)),b())});a.bookmarkBtn.addEventListener("click",C);const q=n.hostChannel?Mr({shellRoot:i,core:r,hostChannel:n.hostChannel,options:{eink:n.eink}}):null,ne=Ur(i,r,{getSizeClass:()=>Ce(e.clientWidth||i.clientWidth),eink:n.eink,hostChannel:n.hostChannel,volumeKeysCapability:n.volumeKeysCapability,onOpenChange:E=>{a.settingsBtn.setAttribute("aria-pressed",String(E))}});function ve(){if(ne.isOpen()){ne.close();return}p.close(),Z.close(),s="none",a.contentsBtn.setAttribute("aria-pressed","false"),a.contextBtn.setAttribute("aria-pressed","false"),u(),ne.open()}a.settingsBtn.addEventListener("click",ve);const de=mr(i,r,{onOpenInGlossary:E=>{Z.openGlossaryTerm(E),s="right",a.contextBtn.setAttribute("aria-pressed","true"),u()}}),ue=(Fe=n.hostChannel)==null?void 0:Fe.onCommand(E=>{var G;E.type==="dismiss"&&!X()&&((G=n.hostChannel)==null||G.emitIntent({type:"back"}))}),pe=()=>{g=!0},he=()=>{g=!1,r.goToFraction(Number(a.scrubber.value)/1e3)};a.scrubber.addEventListener("pointerdown",pe),a.scrubber.addEventListener("change",he);function y(E){switch(E.type){case"loaded":l=E.isRtl,i.classList.toggle("is-rtl",l),p.setToc(E.toc),L();break;case"relocate":f=E.cfi??null,a.chapterLabel&&a.chapterLabel.textContent!==(E.chapterTitle??"")&&(a.chapterLabel.textContent=E.chapterTitle??""),!g&&typeof E.fraction=="number"&&(a.scrubber.value=String(Math.round(E.fraction*1e3))),p.setCurrentChapterTitle(E.chapterTitle),b();break;case"history":a.historyBackBtn.disabled=!E.canGoBack,a.historyForwardBtn.disabled=!E.canGoForward;break;case"tap":W(E.x,E.y);break}}const P=r.on(y);r.replayLastEvents(y);function Y(){N()}function te(){var E;h||(h=!0,P(),F==null||F.disconnect(),F||window.removeEventListener("resize",R),(E=_==null?void 0:_.removeEventListener)==null||E.call(_,"change",M),t.removeEventListener("keydown",re),a.zoneLeft.removeEventListener("click",I),a.zoneRight.removeEventListener("click",w),a.zoneCentre.removeEventListener("click",O),a.zoneLeft.removeEventListener("keydown",V),a.zoneRight.removeEventListener("keydown",Q),a.zoneCentre.removeEventListener("keydown",K),a.historyBackBtn.removeEventListener("click",ee),a.historyForwardBtn.removeEventListener("click",ie),a.contextBtn.removeEventListener("click",ae),a.bookmarkBtn.removeEventListener("click",C),U==null||U(),ue==null||ue(),H==null||H(),q==null||q.destroy(),Z.destroy(),J==null||J.destroy(),a.settingsBtn.removeEventListener("click",ve),ne.destroy(),de.destroy(),a.scrubber.removeEventListener("pointerdown",pe),a.scrubber.removeEventListener("change",he),a.contentsBtn.removeEventListener("click",z),p.destroy(),d.clear(),i.classList.remove("reader-shell","ui-visible","e-ink","reduced-motion","is-rtl","size-phone","size-fold-tablet","size-desktop","settings-open"),a.zones.remove(),a.topBar.remove(),a.bottomBar.remove())}return{getChromeState:()=>({barsVisible:c,sidebar:s}),onChromeState:E=>(d.add(E),()=>d.delete(E)),setBarsVisible:m,refreshSizeClass:Y,destroy:te}}export{_e as ZONE_FRACTION,Ce as computeSizeClass,Ct as isPreventableKey,Br as mountPlaybackBar,Er as mountRightSidebar,Ur as mountSettingsPanel,Qr as mountShell,St as resolveKeyboardAction,kt as resolveTapZone};
