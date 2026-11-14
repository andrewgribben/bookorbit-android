var at=Object.defineProperty;var ot=(e,r,n)=>r in e?at(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n;var G=(e,r,n)=>ot(e,typeof r!="symbol"?r+"":r,n);import{A as st,D as ve}from"./index-D-NHbW4e.js";const it={menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',bookmark:'<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',panel_right:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',back:'<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',forward:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'};function lt(e){return`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${it[e]}</svg>`}function ie(e,r,n=!1){const o=document.createElement("button");return o.type="button",o.className="rx-icon-btn",o.setAttribute("aria-label",e),o.innerHTML=lt(r),n&&o.setAttribute("aria-pressed","false"),o}function ct(e){e.classList.add("reader-shell");const r=document.createElement("div");r.className="rx-zones";const n=document.createElement("div");n.className="rx-zone rx-zone-left",n.setAttribute("role","button"),n.setAttribute("tabindex","0"),n.setAttribute("aria-label","Previous page");const o=document.createElement("div");o.className="rx-zone rx-zone-centre",o.setAttribute("role","button"),o.setAttribute("tabindex","0"),o.setAttribute("aria-label","Toggle bars");const t=document.createElement("div");t.className="rx-zone rx-zone-right",t.setAttribute("role","button"),t.setAttribute("tabindex","0"),t.setAttribute("aria-label","Next page"),r.append(n,o,t);const a=document.createElement("div");a.className="rx-bar rx-bar-top",a.setAttribute("role","toolbar");const i=ie("Table of contents","menu",!0),l=ie("Bookmark","bookmark",!0),c=ie("Text settings","settings",!0),s=ie("Open context panel","panel_right",!0),f=document.createElement("div");f.className="rx-bar-spacer",a.append(i,l,f,c,s);const b=document.createElement("div");b.className="rx-bar rx-bar-bottom";const k=document.createElement("div");k.className="rx-status-row",k.setAttribute("aria-live","polite");const d=ie("Back","back");d.disabled=!0;const m=document.createElement("span");m.className="rx-chapter-label";const u=ie("Forward","forward");u.disabled=!0,k.append(d,m,u);const h=document.createElement("input");return h.type="range",h.className="rx-scrubber",h.min="0",h.max="1000",h.step="1",h.value="0",h.setAttribute("aria-label","Reading position"),b.append(k,h),e.append(r,a,b),{root:e,zones:r,zoneLeft:n,zoneCentre:o,zoneRight:t,topBar:a,bottomBar:b,contentsBtn:i,bookmarkBtn:l,settingsBtn:c,contextBtn:s,historyBackBtn:d,historyForwardBtn:u,chapterLabel:m,scrubber:h}}const dt=`
.reader-shell {
  --rx-ground: #fbfbfa;
  --rx-ink: #17181a;
  --rx-accent: #3b6ef0;
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
`,ut=599,pt=1200;function ye(e){return e<=ut?"phone":e<=pt?"fold-tablet":"desktop"}const Pe=.3;function xt(e,r){const n=Math.min(1,Math.max(0,e));return n<Pe?r?"next":"prev":n>1-Pe?r?"prev":"next":"toggle"}const bt=new Set(["ArrowRight","ArrowDown","PageDown"," "]),ht=new Set(["ArrowLeft","ArrowUp","PageUp"]);function ft(e){return e.ctrlKey||e.metaKey||e.altKey?null:bt.has(e.key)?"next":ht.has(e.key)?"prev":e.key==="m"||e.key==="M"?"toggleBars":e.key==="Escape"?"escape":null}function mt(e){return e==="next"||e==="prev"}const gt='<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',vt='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function He(e,r){const n=document.createElement("button");return n.type="button",n.className="rx-icon-btn",n.setAttribute("aria-label",e),n.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,n}function yt(e){const r=document.createElement("div");r.className="rx-left-sidebar",r.setAttribute("aria-label","Table of contents"),r.tabIndex=-1;const n=document.createElement("div");n.className="rx-left-sidebar-scrim";const o=document.createElement("div");o.className="rx-sidebar-head";const t=He("Back",gt),a=document.createElement("h3");a.className="rx-sidebar-title",a.textContent="Contents";const i=He("Close contents",vt);i.classList.add("rx-left-sidebar-close"),o.append(t,a,i);const l=document.createElement("div");l.className="rx-left-sidebar-tabs",l.setAttribute("role","tablist");function c(M,A){const E=document.createElement("button");return E.type="button",E.className="rx-left-sidebar-tab",E.setAttribute("role","tab"),E.setAttribute("aria-selected","false"),E.setAttribute("data-tab",A),E.id=`rx-tab-${A}`,E.textContent=M,E}const s=c("Contents","contents"),f=c("Starred","starred"),b=c("Related","related");l.append(s,f,b);const k=document.createElement("div");k.className="rx-left-sidebar-body";function d(M){const A=document.createElement("div");return A.className="rx-sidebar-panel",A.setAttribute("role","tabpanel"),A.setAttribute("data-panel",M),A.setAttribute("aria-labelledby",`rx-tab-${M}`),A.hidden=!0,A}const m=d("contents"),u=document.createElement("div");u.className="rx-toc-scroll";const h=document.createElement("div");h.className="rx-toc-spacer";const v=document.createElement("div");v.className="rx-toc-window",v.setAttribute("role","list"),h.appendChild(v),u.appendChild(h),m.appendChild(u);const I=d("starred"),T=d("related");return k.append(m,I,T),r.append(o,l,k),e.append(n,r),{root:r,scrim:n,backBtn:t,closeBtn:i,title:a,tablist:l,tabContents:s,tabStarred:f,tabRelated:b,body:k,panelContents:m,tocScroll:u,tocSpacer:h,tocWindow:v,panelStarred:I,panelRelated:T}}const kt=`
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
`;function Qe(e,r=null,n=0){const o=[];for(let t=0;t<e.length;t++){const a=e[t],i=r===null?String(t):`${r}.${t}`;o.push({id:i,label:a.label,href:a.href,depth:n,hasChildren:a.subitems.length>0,parentId:r}),a.subitems.length>0&&o.push(...Qe(a.subitems,i,n+1))}return o}function wt(e,r){if(r.size===0)return e;const n=new Set,o=[];for(const t of e){if(t.parentId!==null&&(n.has(t.parentId)||r.has(t.parentId))){n.add(t.id);continue}o.push(t)}return o}function Et(e,r){if(!r)return null;const n=Me(r);let o=null;for(const t of e)if(t.href){if(t.href===r)return t.id;o===null&&Me(t.href)===n&&(o=t)}return(o==null?void 0:o.id)??null}function St(e,r){if(!r)return null;for(const n of e)if(n.label===r)return n.id;return null}function Me(e){const r=e.indexOf("#");return r===-1?e:e.slice(0,r)}function Ct(e,r,n,o,t=8){if(o===0||r<=0)return{start:0,end:-1};const a=Math.floor(e/r),i=Math.ceil(n/r),l=Math.max(0,a-t),c=Math.min(o-1,a+i+t);return{start:l,end:c}}const ke=48;function Lt(e,r,n,o){const t=document.createElement("div");if(t.className="rx-toc-row",t.setAttribute("role","listitem"),t.style.paddingLeft=`${12+e.depth*18}px`,o&&t.classList.add("is-current"),e.hasChildren){const c=document.createElement("button");c.type="button",c.className="rx-toc-toggle";const s=!r.collapsed.has(e.id);c.setAttribute("aria-expanded",String(s)),c.setAttribute("aria-label",`${s?"Collapse":"Expand"} ${e.label}`),c.textContent=s?"▾":"▸",c.addEventListener("click",f=>{f.stopPropagation(),n.onToggleExpand(e)}),t.appendChild(c)}else{const c=document.createElement("span");c.className="rx-toc-toggle-spacer",t.appendChild(c)}const a=document.createElement("button");a.type="button",a.className="rx-toc-label",a.setAttribute("aria-label",e.label),o&&a.setAttribute("aria-current","true"),a.textContent=e.label,a.addEventListener("click",()=>n.onActivate(e)),t.appendChild(a);const i=document.createElement("button");i.type="button",i.className="rx-toc-star";const l=e.href?r.starred.has(e.href):!1;return i.setAttribute("aria-pressed",String(l)),i.setAttribute("aria-label",`${l?"Unstar":"Star"} ${e.label}`),i.textContent=l?"★":"☆",i.addEventListener("click",c=>{c.stopPropagation(),n.onToggleStar(e)}),t.appendChild(i),t}function At(e,r,n,o,t){const a=wt(o.flat,o.collapsed),i=Et(a,o.currentHref)??St(a,o.currentChapterTitle);r.style.height=`${a.length*ke}px`;const l=e.clientHeight||1,{start:c,end:s}=Ct(e.scrollTop,ke,l,a.length);n.replaceChildren(),n.style.transform=`translateY(${c*ke}px)`;for(let f=c;f<=s;f++){const b=a[f];b&&n.appendChild(Lt(b,o,t,b.id===i))}}function Tt(e,r,n){if(e.replaceChildren(),r.length===0){const t=document.createElement("p");t.className="rx-sidebar-empty",t.textContent="No starred chapters yet. Star a chapter in Contents to find it here.",e.appendChild(t);return}const o=document.createElement("div");o.setAttribute("role","list");for(const t of r){const a=document.createElement("button");a.type="button",a.className="rx-starred-row",a.setAttribute("role","listitem"),a.textContent=t.label,a.addEventListener("click",()=>n(t)),o.appendChild(a)}e.appendChild(o)}function Bt(e,r,n){if(e.replaceChildren(),r.length===0){const t=document.createElement("p");t.className="rx-sidebar-empty",t.textContent="No related books yet.",e.appendChild(t);return}const o=document.createElement("div");o.setAttribute("role","list");for(const t of r){const a=document.createElement("button");a.type="button",a.className="rx-related-row",a.setAttribute("role","listitem");const i=`${t.title}${t.subtitle?`, ${t.subtitle}`:""}${t.read?", read":""}`;if(a.setAttribute("aria-label",i),t.coverUrl){const s=document.createElement("img");s.className="rx-related-cover",s.src=t.coverUrl,s.alt="",a.appendChild(s)}else{const s=document.createElement("div");s.className="rx-related-cover rx-related-cover-empty",a.appendChild(s)}const l=document.createElement("div");l.className="rx-related-text";const c=document.createElement("span");if(c.className="rx-related-title",c.textContent=t.title,l.appendChild(c),t.subtitle){const s=document.createElement("span");s.className="rx-related-subtitle",s.textContent=t.subtitle,l.appendChild(s)}if(a.appendChild(l),t.read){const s=document.createElement("span");s.className="rx-related-badge",s.textContent="Read",a.appendChild(s)}a.addEventListener("click",()=>n(t)),o.appendChild(a)}e.appendChild(o)}function Nt(e,r){return et(e,r,1)}function zt(e,r){return et(e,r,-1)}function et(e,r,n){if(e.length===0)return r;const o=e.indexOf(r);if(o===-1)return e[0];const t=(o+n+e.length)%e.length;return e[t]}const It=40;function Pt(e,r){return Math.abs(e)>=It&&Math.abs(e)>Math.abs(r)}function Ht(e,r,n,o){return Pt(r,n)?e==="sidebar"?{action:r<0?"cycle-next":"cycle-prev"}:e==="book"&&o?{action:"close"}:{action:null}:{action:null}}function Mt(e,r,n){return e&&r.contains(e)?"sidebar":e&&n.contains(e)&&!r.contains(e)?"book":"other"}function Ft(e){return Array.from(e.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===e)}function $t(e){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const t=Ft(e);if(t.length===0){o.preventDefault(),e.focus();return}const a=t[0],i=t[t.length-1],l=e.ownerDocument.activeElement;o.shiftKey&&l===a?(o.preventDefault(),i.focus()):!o.shiftKey&&l===i&&(o.preventDefault(),a.focus())}return e.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,e.removeEventListener("keydown",n)}}}const Fe="reactor-left-sidebar-stylesheet";function Ot(e){if(e.getElementById(Fe))return;const r=e.createElement("style");r.id=Fe,r.textContent=kt,e.head.appendChild(r)}function Rt(e,r,n={}){var Y,K;const o=e.ownerDocument??document;Ot(o);const t=yt(e);t.root.classList.add("closed");const a=["contents","starred"];(Y=n.capabilities)!=null&&Y.related&&a.push("related"),t.tabRelated.hidden=!((K=n.capabilities)!=null&&K.related);let i="contents",l=!1,c=!1,s=[];const f=new Set;let b=null,k=null;const d=new Set;let m=[],u=[];const h=$t(t.root);let v=null;function I(){return!e.classList.contains("size-desktop")}function T(y){return y==="contents"?t.panelContents:y==="starred"?t.panelStarred:t.panelRelated}function M(y){return y==="contents"?t.tabContents:y==="starred"?t.tabStarred:t.tabRelated}function A(){i==="contents"?At(t.tocScroll,t.tocSpacer,t.tocWindow,{flat:s,collapsed:f,currentHref:b,currentChapterTitle:k,starred:d},{onActivate:y=>{y.href&&r(y.href),I()&&N()},onToggleExpand:y=>{f.has(y.id)?f.delete(y.id):f.add(y.id),A()},onToggleStar:y=>{var J;if(!y.href)return;const $=!d.has(y.href);$?d.add(y.href):d.delete(y.href),(J=n.onStarToggle)==null||J.call(n,y.href,y.label,$),A()}}):i==="starred"?Tt(t.panelStarred,m,y=>{r(y.href),I()&&N()}):Bt(t.panelRelated,u,y=>{var $;($=n.onOpenRelated)==null||$.call(n,y.id),I()&&N()})}function E(y){y!==i&&(M(i).setAttribute("aria-selected","false"),T(i).hidden=!0,i=y,M(i).setAttribute("aria-selected","true"),T(i).hidden=!1,A())}function B(y){const $=y===1?Nt(a,i):zt(a,i);E($)}t.tabContents.addEventListener("click",()=>E("contents")),t.tabStarred.addEventListener("click",()=>E("starred")),t.tabRelated.addEventListener("click",()=>E("related")),E("contents"),M("contents").setAttribute("aria-selected","true"),T("contents").hidden=!1;function O(){var $;if(l)return;l=!0,v=o.activeElement??null,t.root.classList.add("open"),t.root.classList.remove("closed"),e.classList.add("rx-left-sidebar-open"),t.scrim.classList.toggle("visible",I());const y=I();t.root.setAttribute("role",y?"dialog":"complementary"),y?t.root.setAttribute("aria-modal","true"):t.root.removeAttribute("aria-modal"),y&&(h.activate(),t.root.focus()),($=n.onSidebarChange)==null||$.call(n,!0)}function N(){var y,$;l&&(l=!1,t.root.classList.remove("open"),t.root.classList.add("closed"),e.classList.remove("rx-left-sidebar-open"),t.scrim.classList.remove("visible"),h.deactivate(),(y=v==null?void 0:v.focus)==null||y.call(v),v=null,($=n.onSidebarChange)==null||$.call(n,!1))}t.closeBtn.addEventListener("click",N),t.scrim.addEventListener("click",N),t.backBtn.addEventListener("click",()=>{var y;return(y=n.onBack)==null?void 0:y.call(n)});let R=0,z=0,D="other",P=!1;function _(y){y.pointerType!=="pen"&&(R=y.clientX,z=y.clientY,D=Mt(y.target,t.root,e),P=D!=="other")}function S(y){if(!P)return;P=!1;const $=y.clientX-R,J=y.clientY-z,W=Ht(D,$,J,I());!l&&W.action!==null||(W.action==="cycle-next"?B(1):W.action==="cycle-prev"?B(-1):W.action==="close"&&N())}e.addEventListener("pointerdown",_),e.addEventListener("pointerup",S);function x(y){s=Qe(y),f.clear(),i==="contents"&&A()}function L(y){m=y,d.clear();for(const $ of y)d.add($.href);(i==="starred"||i==="contents")&&A()}function F(y){u=y,i==="related"&&A()}function V(y){b=y,i==="contents"&&A()}function X(y){k=y,i==="contents"&&A()}function U(){c||(c=!0,e.removeEventListener("pointerdown",_),e.removeEventListener("pointerup",S),t.closeBtn.removeEventListener("click",N),t.scrim.removeEventListener("click",N),h.deactivate(),e.classList.remove("rx-left-sidebar-open"),t.root.remove(),t.scrim.remove())}return{open:O,close:N,isOpen:()=>l,cycleTab:B,getActiveTab:()=>i,setToc:x,setStarred:L,setRelated:F,setCurrentHref:V,setCurrentChapterTitle:X,destroy:U}}function we(e,r){const n=document.createElement("button");return n.type="button",n.className="rx-sidebar-tab",n.textContent=e,n.setAttribute("role","tab"),n.setAttribute("aria-selected",String(r)),r&&n.classList.add("active"),n}function _t(e){const r=e.createElement("div");r.className="rx-right-sidebar",r.setAttribute("role","complementary"),r.setAttribute("aria-label","Context panel");const n=e.createElement("div");n.className="rx-sidebar-resize",n.setAttribute("role","separator"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-label","Resize context panel"),n.setAttribute("tabindex","0");const o=e.createElement("div");o.className="rx-sidebar-tabs",o.setAttribute("role","tablist");const t=we("Context",!0),a=we("Glossary",!1),i=we("Notes",!1);i.disabled=!0;const l=e.createElement("button");l.type="button",l.className="rx-icon-btn rx-sidebar-close",l.setAttribute("aria-label","Close panel"),l.textContent="✕",o.append(t,a,i,l);const c=e.createElement("div");c.className="rx-ctx-searchbar",c.setAttribute("role","search");const s=e.createElement("input");s.type="search",s.className="rx-ctx-search-input",s.placeholder="Search this book",s.setAttribute("aria-label","Search this book");const f=e.createElement("button");f.type="button",f.className="rx-icon-btn rx-ctx-openmain",f.setAttribute("aria-label","Open in main window"),f.disabled=!0,f.textContent="↗";const b=e.createElement("div");b.className="rx-ctx-crumbs",b.setAttribute("aria-live","polite"),c.append(s,f,b);const k=e.createElement("div");k.className="rx-sidebar-body";const d=e.createElement("div");d.className="rx-ctx-results";const m=e.createElement("div");m.className="rx-ctx-page",m.hidden=!0;const u=e.createElement("div");u.className="rx-notes-body",u.hidden=!0;const h=e.createElement("div");return h.className="rx-glossary-panel-mount",h.hidden=!0,k.append(d,m,u,h),r.append(n,o,c,k),{root:r,resizeHandle:n,tabsRow:o,contextTabBtn:t,glossaryTabBtn:a,notesTabBtn:i,closeBtn:l,searchBar:c,searchInput:s,openInMainBtn:f,breadcrumb:b,body:k,resultsScroller:d,contextPage:m,notesBody:u,glossaryPanelMount:h}}const Dt=`
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
`;class Gt{constructor(){G(this,"rows",[]);G(this,"headerAt",new Map)}reset(){this.rows=[],this.headerAt.clear()}addGroup(r,n){if(n.length!==0){this.headerAt.has(r)||(this.headerAt.set(r,this.rows.length),this.rows.push({kind:"header",label:r}));for(const o of n)this.rows.push({kind:"item",item:o,groupLabel:r})}}get rowCount(){return this.rows.length}rowAt(r){return this.rows[r]}get isEmpty(){return this.rows.length===0}}class tt{constructor(r){G(this,"container");G(this,"rowHeight");G(this,"buffer");G(this,"opts");G(this,"topSpacer");G(this,"bottomSpacer");G(this,"rowsEl");G(this,"onScroll");G(this,"destroyed",!1);this.opts=r,this.container=r.container,this.rowHeight=r.rowHeight,this.buffer=r.buffer??6,this.topSpacer=document.createElement("div"),this.topSpacer.className="rx-wlist-spacer",this.bottomSpacer=document.createElement("div"),this.bottomSpacer.className="rx-wlist-spacer",this.rowsEl=document.createElement("div"),this.rowsEl.className="rx-wlist-rows",this.rowsEl.setAttribute("role","list"),this.container.replaceChildren(this.topSpacer,this.rowsEl,this.bottomSpacer),this.onScroll=()=>this.render(),this.container.addEventListener("scroll",this.onScroll)}visibleRange(){const r=this.opts.rowCount(),n=this.container.clientHeight||1,o=this.container.scrollTop||0,t=Math.max(0,Math.floor(o/this.rowHeight)-this.buffer),a=Math.ceil(n/this.rowHeight)+this.buffer*2,i=Math.min(r,t+a);return{first:t,last:i}}render(){if(this.destroyed)return;const r=this.opts.rowCount(),{first:n,last:o}=this.visibleRange();this.topSpacer.style.height=`${n*this.rowHeight}px`,this.bottomSpacer.style.height=`${Math.max(0,r-o)*this.rowHeight}px`,this.rowsEl.replaceChildren();for(let t=n;t<o;t++)this.rowsEl.appendChild(this.opts.renderRow(t))}destroy(){this.destroyed||(this.destroyed=!0,this.container.removeEventListener("scroll",this.onScroll),this.container.replaceChildren())}}function Wt(e,r){return e.kind!==r.kind?!1:e.kind==="page"&&r.kind==="page"?e.target===r.target:!0}class qt{constructor(){G(this,"stack",[{kind:"blank"}]);G(this,"index",0)}get current(){return this.stack[this.index]??{kind:"blank"}}get canGoBack(){return this.index>0}get canGoForward(){return this.index<this.stack.length-1}push(r){Wt(this.current,r)||(this.stack=this.stack.slice(0,this.index+1),this.stack.push(r),this.index=this.stack.length-1)}back(){return this.canGoBack?(this.index-=1,this.current):null}forward(){return this.canGoForward?(this.index+=1,this.current):null}reset(){this.stack=[{kind:"blank"}],this.index=0}}const Ut={"fold-tablet":320,desktop:340},ge=240,$e=16,Kt={"fold-tablet":.6,desktop:.7};function Yt(e,r,n){const o=Kt[n],t=Math.max(ge,r*o);return e<ge?ge:e>t?t:e}const rt=new WeakMap;function Ee(e){return rt.get(e)??{left:0,right:0,bottom:0}}function se(e,r){const n={left:Math.max(0,r.left??Ee(e).left),right:Math.max(0,r.right??Ee(e).right),bottom:Math.max(0,r.bottom??Ee(e).bottom)};return rt.set(e,n),e.style.setProperty("--rx-book-inset-left",`${n.left}px`),e.style.setProperty("--rx-book-inset-right",`${n.right}px`),e.style.setProperty("--rx-book-inset-bottom",`${n.bottom}px`),e.style.paddingLeft=n.left?`${n.left}px`:"",e.style.paddingRight=n.right?`${n.right}px`:"",e.style.paddingBottom=n.bottom?`${n.bottom}px`:"",n}const jt=[{id:"all",label:"All"},{id:"highlight",label:"Highlight"},{id:"underline",label:"Underline"},{id:"note",label:"Typed note"},{id:"handwritten",label:"Handwritten"},{id:"bookmark",label:"Bookmark"}],Vt=[{id:"position",label:"Position in book"},{id:"date",label:"Date"},{id:"colour",label:"Colour"},{id:"type",label:"Type"}];function Xt(e){const r=e.createElement("div");r.className="rx-notes-panel";const n=e.createElement("div");n.className="rx-notes-searchbar",n.setAttribute("role","search");const o=e.createElement("input");o.type="search",o.className="rx-notes-search-input",o.placeholder="Search notes",o.setAttribute("aria-label","Search notes"),n.append(o);const t=e.createElement("select");t.className="rx-notes-sort",t.setAttribute("aria-label","Sort notes by");for(const{id:s,label:f}of Vt){const b=e.createElement("option");b.value=s,b.textContent=f,t.append(b)}n.append(t);const a=e.createElement("div");a.className="rx-notes-filters",a.setAttribute("role","group"),a.setAttribute("aria-label","Filter notes by type");const i={};for(const{id:s,label:f}of jt){const b=e.createElement("button");b.type="button",b.className="rx-notes-chip",b.textContent=f,b.setAttribute("aria-pressed",String(s==="all")),s==="all"&&b.classList.add("active"),b.dataset.filter=s,a.append(b),i[s]=b}const l=e.createElement("div");l.className="rx-notes-banner",l.hidden=!0,l.textContent="No annotation store connected. Notes made in this session are not saved.";const c=e.createElement("div");return c.className="rx-notes-list",r.append(n,a,l,c),{root:r,searchBar:n,searchInput:o,filterRow:a,filterButtons:i,sortSelect:t,capabilityBanner:l,listScroller:c}}const Zt=`
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
`,Jt=100,Qt=20;function er(e){return e==="all"?null:e}class tr{constructor(r){G(this,"total",0);G(this,"offset",0);G(this,"items",[]);G(this,"state",{filter:"all",sort:"position",query:null});G(this,"lastRequestedOffset",null);G(this,"everRequested",!1);this.hostChannel=r}getState(){return this.state}setState(r){this.state={...this.state,...r},this.total=0,this.offset=0,this.items=[],this.lastRequestedOffset=null,this.requestPage(0)}ensureInitialLoad(){this.everRequested||this.requestPage(0)}rowCount(){return this.total}rowAt(r){const n=r-this.offset;if(!(n<0||n>=this.items.length))return this.items[n]}ensureLoaded(r,n){const o=Math.max(r,n-1);if(this.rowAt(r)&&this.rowAt(o))return;const t=Math.max(0,r-Qt);this.lastRequestedOffset!==t&&this.requestPage(t)}requestPage(r){this.everRequested=!0,this.lastRequestedOffset=r,this.hostChannel.emitIntent({type:"notesPageRequest",offset:r,limit:Jt,filter:er(this.state.filter),sort:this.state.sort,query:this.state.query})}applyWindow(r){this.total=r.total,this.offset=r.offset,this.items=r.items,this.lastRequestedOffset=null}}const Oe="reactor-notes-stylesheet",rr=48,nr=200,Re={highlight:"Highlight",underline:"Underline",note:"Typed note",bookmark:"Bookmark"};function ar(e,r){return r?`${Re[e]} · ${r}`:Re[e]}function or({container:e,core:r,hostChannel:n,options:o={}}){const t=e.ownerDocument??document;if(!t.getElementById(Oe)){const E=t.createElement("style");E.id=Oe,E.textContent=Zt,t.head.appendChild(E)}const a=Xt(t);e.append(a.root);const i=new tr(n);let l=!1,c=null;const s=new Map,f=new Set;function b(E){s.has(E)||f.has(E)||typeof r.getChapterTitleForCfi=="function"&&(f.add(E),r.getChapterTitleForCfi(E).then(B=>{s.set(E,B)}).catch(()=>{s.set(E,null)}).finally(()=>{f.delete(E),!l&&d.render()}))}function k(E){i.ensureLoaded(E,E+1);const B=i.rowAt(E);if(!B){const S=t.createElement("div");return S.className="rx-notes-loading-row",S.setAttribute("role","listitem"),S.textContent="Loading…",S}const O=t.createElement("button");O.type="button",O.className="rx-notes-row";const N=t.createElement("span");N.className="rx-notes-row-swatch",B.color&&N.style.setProperty("--rx-notes-row-color",B.color);const R=t.createElement("span");R.className="rx-notes-row-body";const z=t.createElement("span");z.className="rx-notes-row-snippet",z.textContent=B.note??B.text??"";const D=t.createElement("span");D.className="rx-notes-row-meta";const P=s.get(B.cfi);D.textContent=ar(B.kind,P??null),R.append(z,D),O.append(N,R),O.setAttribute("aria-label",`${D.textContent}: ${z.textContent}`),P===void 0&&b(B.cfi),O.addEventListener("click",()=>r.goTo(B.cfi));const _=t.createElement("div");return _.setAttribute("role","listitem"),_.appendChild(O),_}const d=new tt({container:a.listScroller,rowHeight:rr,rowCount:()=>i.rowCount(),renderRow:k});function m(E){const B=E.currentTarget,O=B.dataset.filter??"all";for(const N of Object.values(a.filterButtons))N.classList.toggle("active",N===B),N.setAttribute("aria-pressed",String(N===B));i.setState({filter:O}),d.render()}for(const E of Object.values(a.filterButtons))E.addEventListener("click",m);function u(){i.setState({sort:a.sortSelect.value}),d.render()}a.sortSelect.addEventListener("change",u);function h(){c&&clearTimeout(c),c=setTimeout(()=>{i.setState({query:a.searchInput.value.trim()||null}),d.render()},nr)}a.searchInput.addEventListener("input",h);function v(E){E.type==="setNotes"&&(i.applyWindow(E),d.render())}const I=n.onCommand(v);function T(){var E;a.capabilityBanner.hidden=((E=n.getConfig())==null?void 0:E.capabilities.notes)!==!1,i.ensureInitialLoad(),d.render()}function M(){d.render()}function A(){if(!l){l=!0,c&&clearTimeout(c),I();for(const E of Object.values(a.filterButtons))E.removeEventListener("click",m);a.sortSelect.removeEventListener("change",u),a.searchInput.removeEventListener("input",h),d.destroy(),a.root.remove()}}return{onActivate:T,refresh:M,destroy:A}}function sr(e){const r=e.createElement("div");r.className="rx-glossary-panel",r.style.position="absolute",r.style.inset="0";const n=e.createElement("div");n.className="rx-glossary-search",n.setAttribute("role","search");const o=e.createElement("input");o.type="search",o.className="rx-glossary-search-input",o.placeholder="Search glossary",o.setAttribute("aria-label","Search glossary"),n.appendChild(o);const t=e.createElement("div");return t.className="rx-glossary-list",t.setAttribute("role","list"),r.append(n,t),{root:r,searchInput:o,list:t}}const ir=900;function lr(e){const r=e.ownerDocument??document,n=sr(r);e.appendChild(n.root);let o=[],t="",a=!1;function i(){const k=t.trim().toLowerCase();return[...k?o.filter(m=>m.term.toLowerCase().includes(k)):o].sort((m,u)=>m.term.localeCompare(u.term))}function l(){if(a)return;const k=i();if(n.list.replaceChildren(),!o.length){const d=r.createElement("div");d.className="rx-glossary-empty",d.textContent="This book has no glossary.",n.list.appendChild(d);return}if(!k.length){const d=r.createElement("div");d.className="rx-glossary-empty",d.textContent=`No terms match "${t}".`,n.list.appendChild(d);return}for(const d of k){let m=function(){const I=u.classList.toggle("expanded");h.setAttribute("aria-expanded",String(I))};const u=r.createElement("div");u.className="rx-glossary-item",u.setAttribute("role","listitem"),u.setAttribute("data-term",d.term);const h=r.createElement("button");h.type="button",h.className="rx-glossary-term-row",h.setAttribute("role","button"),h.setAttribute("aria-expanded","false"),h.textContent=d.term;const v=r.createElement("div");v.className="rx-glossary-def",v.textContent=d.definition,h.addEventListener("click",m),u.append(h,v),n.list.appendChild(u)}}function c(){t=n.searchInput.value,l()}n.searchInput.addEventListener("input",c),l();function s(k){o=k,l()}function f(k){var m,u;t&&(t="",n.searchInput.value="",l());const d=n.list.querySelector(`.rx-glossary-item[data-term="${CSS.escape(k)}"]`);d&&(d.classList.add("expanded"),(m=d.querySelector(".rx-glossary-term-row"))==null||m.setAttribute("aria-expanded","true"),(u=d.scrollIntoView)==null||u.call(d,{block:"center"}),d.classList.add("flash"),setTimeout(()=>d.classList.remove("flash"),ir))}function b(){a||(a=!0,n.searchInput.removeEventListener("input",c),n.root.remove())}return{setTerms:s,scrollToAndFlash:f,destroy:b}}const _e=9,de=8,De=16;function cr(e,r,n,o){const t=e.top+e.height;let a=e.left;a=Math.min(Math.max(de,a),Math.max(de,r.width-n-de));let i=t+_e,l=!1;if(i+o>r.height-de){const s=e.top-o-_e;i=Math.max(de,s),l=!0}const c=Math.max(De,Math.min(n-De,e.left+e.width/2-a));return{left:a,top:i,above:l,arrowX:c}}const dr='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';function ur(e,r,n){const o=e.ownerDocument??document;let t=null,a=!1;function i(){t==null||t.remove(),t=null}function l(d,m){i();const u=o.createElement("div");u.className="rx-glossary-popover",u.setAttribute("role","dialog"),u.setAttribute("aria-label",`${d.term} definition`),u.innerHTML=`
      <div class="rx-glossary-popover-head">
        <h4 class="rx-glossary-popover-term"></h4>
        <button type="button" class="rx-icon-btn rx-glossary-popover-open" aria-label="Open in glossary" title="Open in glossary">${dr}</button>
      </div>
      <p class="rx-glossary-popover-def"></p>
    `,u.querySelector(".rx-glossary-popover-term").textContent=d.term,u.querySelector(".rx-glossary-popover-def").textContent=d.definition,e.appendChild(u),t=u;const h=e.getBoundingClientRect(),v={left:m.left-h.left,top:m.top-h.top,width:m.width,height:m.height},I={width:h.width,height:h.height},T=cr(v,I,u.offsetWidth,u.offsetHeight||120);u.style.left=`${T.left}px`,u.style.top=`${T.top}px`,u.classList.toggle("above",T.above),u.style.setProperty("--arrow-x",`${T.arrowX}px`),u.querySelector(".rx-glossary-popover-open").addEventListener("click",M=>{M.stopPropagation(),i(),n.onOpenInGlossary(d.term)})}async function c(d,m){const u=await r.getGlossaryTerms();if(a)return;const h=u.find(v=>v.term.toLowerCase()===d.toLowerCase());h&&l(h,m)}const s=r.onGlossaryTermTap(c);function f(d){var u;if(!t)return;const m=d.target;(u=m==null?void 0:m.closest)!=null&&u.call(m,".rx-glossary-popover")||i()}function b(d){d.key==="Escape"&&t&&i()}o.addEventListener("click",f),o.addEventListener("keydown",b);function k(){a||(a=!0,s(),o.removeEventListener("click",f),o.removeEventListener("keydown",b),i())}return{destroy:k}}const pr=`
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
`,Ge="reactor-right-sidebar-stylesheet",We="reactor-glossary-stylesheet",xr=48,br=200;function hr(e){if(!e.getElementById(Ge)){const r=e.createElement("style");r.id=Ge,r.textContent=Dt,e.head.appendChild(r)}if(!e.getElementById(We)){const r=e.createElement("style");r.id=We,r.textContent=pr,e.head.appendChild(r)}}function fr(e){const r=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`${r(e.pre)}<mark>${r(e.match)}</mark>${r(e.post)}`}function mr(e,r,n){var ce,be;const o=e.ownerDocument??document;hr(o);const t=_t(o),a=o.createElement("div");a.className="rx-sidebar-scrim",e.append(a,t.root);const i=new Gt,l=new qt,c=lr(t.glossaryPanelMount);let s="context",f=null,b=!1,k=!1,d=null;const m=!!n.hostChannel&&((ce=n.hostChannel.getConfig())==null?void 0:ce.capabilities.notes)!==!1;t.notesTabBtn.disabled=!m;const u=m?or({container:t.notesBody,core:r,hostChannel:n.hostChannel}):null;((be=n.capabilities)==null?void 0:be.glossary)===!1&&(t.glossaryTabBtn.hidden=!0);function h(g){g!==s&&(s=g,t.contextTabBtn.classList.toggle("active",g==="context"),t.contextTabBtn.setAttribute("aria-selected",String(g==="context")),t.glossaryTabBtn.classList.toggle("active",g==="glossary"),t.glossaryTabBtn.setAttribute("aria-selected",String(g==="glossary")),t.notesTabBtn.classList.toggle("active",g==="notes"),t.notesTabBtn.setAttribute("aria-selected",String(g==="notes")),t.searchBar.hidden=g!=="context",t.glossaryPanelMount.hidden=g!=="glossary",t.notesBody.hidden=g!=="notes",g==="context"?z(l.current):g==="glossary"?(t.resultsScroller.hidden=!0,t.contextPage.hidden=!0,r.getGlossaryTerms().then(H=>c.setTerms(H))):(t.resultsScroller.hidden=!0,t.contextPage.hidden=!0,u==null||u.onActivate()))}const v=()=>h("context"),I=()=>h("glossary"),T=()=>h("notes");t.contextTabBtn.addEventListener("click",v),t.glossaryTabBtn.addEventListener("click",I),t.notesTabBtn.addEventListener("click",T);function M(g){const H=i.rowAt(g);if(!H)return o.createElement("div");if(H.kind==="header"){const ae=o.createElement("div");return ae.className="rx-ctx-group-header",ae.setAttribute("role","listitem"),ae.textContent=H.label,ae}const Z=o.createElement("button");Z.type="button",Z.className="rx-ctx-result",Z.setAttribute("role","listitem"),Z.innerHTML=fr(H.item),Z.addEventListener("click",()=>_(H.item,H.groupLabel));const ee=o.createElement("div");return ee.setAttribute("role","listitem"),ee.appendChild(Z),ee}const A=new tt({container:t.resultsScroller,rowHeight:xr,rowCount:()=>i.rowCount,renderRow:M});function E(){t.breadcrumb.replaceChildren();const g=o.createElement("button");g.type="button",g.textContent="Back",g.disabled=!l.canGoBack,g.setAttribute("aria-label","Back"),g.addEventListener("click",D);const H=o.createElement("button");H.type="button",H.textContent="Forward",H.disabled=!l.canGoForward,H.setAttribute("aria-label","Forward"),H.addEventListener("click",P),t.breadcrumb.append(g,H),t.openInMainBtn.disabled=l.current.kind!=="page"}function B(){t.resultsScroller.hidden=!1,t.contextPage.hidden=!0,A.render()}function O(){t.resultsScroller.hidden=!1,t.contextPage.hidden=!0,A.render()}function N(){return f||(f=r.createSecondaryView(t.contextPage),f)}function R(g){t.resultsScroller.hidden=!0,t.contextPage.hidden=!1;const H=N();H&&H.goTo(g)}function z(g){g.kind==="blank"?O():g.kind==="results"?B():R(g.target),E()}function D(){const g=l.back();g&&z(g)}function P(){const g=l.forward();g&&z(g)}function _(g,H){l.push({kind:"page",target:g.cfi,label:H}),z(l.current)}function S(){const g=t.searchInput.value.trim();i.reset(),g?l.current.kind!=="results"&&l.push({kind:"results"}):l.reset(),z(l.current),d&&clearTimeout(d),g&&(d=setTimeout(()=>r.runSearch(g),br))}t.searchInput.addEventListener("input",S);function x(g){g.type==="searchResults"?(i.addGroup(g.label,g.items),l.current.kind==="results"&&A.render()):g.type==="loaded"&&c.setTerms([])}const L=r.on(x);function F(){const g=l.current;g.kind==="page"&&(r.goTo(g.target),n.getSizeClass()==="phone"&&p())}t.openInMainBtn.addEventListener("click",F);function V(){p()}t.closeBtn.addEventListener("click",V);const X=()=>p();a.addEventListener("click",X);function U(){const g=getComputedStyle(e).getPropertyValue("--rx-ctx-width"),H=parseFloat(g);if(!Number.isNaN(H)&&H>0)return H;const Z=n.getSizeClass();return Z==="phone"?ge:Ut[Z]}function Y(g,H){var ae;const Z=n.getSizeClass();if(Z==="phone")return;const ee=Yt(g,e.clientWidth||1200,Z);e.style.setProperty("--rx-ctx-width",`${ee}px`),t.resizeHandle.setAttribute("aria-valuenow",String(Math.round(ee))),b&&se(e,{right:ee}),H&&((ae=n.onWidthChange)==null||ae.call(n,ee))}let K=!1,y=0,$=0;function J(g){K=!0,y=g.clientX,$=U(),e.classList.add("right-sidebar-resizing"),o.addEventListener("pointermove",W),o.addEventListener("pointerup",te)}function W(g){K&&Y($-(g.clientX-y),!1)}function te(){K&&(K=!1,e.classList.remove("right-sidebar-resizing"),o.removeEventListener("pointermove",W),o.removeEventListener("pointerup",te),Y(U(),!0))}function re(g){g.key==="ArrowLeft"?(g.preventDefault(),Y(U()+$e,!0)):g.key==="ArrowRight"&&(g.preventDefault(),Y(U()-$e,!0))}t.resizeHandle.addEventListener("pointerdown",J),t.resizeHandle.addEventListener("keydown",re);function ne(){b||(b=!0,e.classList.add("right-sidebar-open"),Y(U(),!1),A.render(),s==="notes"&&(u==null||u.refresh()))}function p(){var g;b&&(b=!1,e.classList.remove("right-sidebar-open"),se(e,{right:0}),(g=n.onClose)==null||g.call(n))}function C(){b?p():ne()}function j(g){b||ne(),h("glossary"),r.getGlossaryTerms().then(H=>{c.setTerms(H),c.scrollToAndFlash(g)})}function Q(){b&&(n.getSizeClass()==="phone"?se(e,{right:0}):se(e,{right:U()}))}z(l.current);function oe(){k||(k=!0,d&&clearTimeout(d),L(),t.searchInput.removeEventListener("input",S),t.openInMainBtn.removeEventListener("click",F),t.closeBtn.removeEventListener("click",V),a.removeEventListener("click",X),t.resizeHandle.removeEventListener("pointerdown",J),o.removeEventListener("pointermove",W),o.removeEventListener("pointerup",te),t.resizeHandle.removeEventListener("keydown",re),t.contextTabBtn.removeEventListener("click",v),t.notesTabBtn.removeEventListener("click",T),u==null||u.destroy(),t.glossaryTabBtn.removeEventListener("click",I),c.destroy(),A.destroy(),f==null||f.destroy(),e.classList.remove("right-sidebar-open","right-sidebar-resizing"),se(e,{right:0}),t.root.remove(),a.remove())}return{open:ne,close:p,toggle:C,isOpen:()=>b,destroy:oe,refreshLayout:Q,openGlossaryTerm:j}}function fe(e,r){const n=document.createElement("button");return n.type="button",n.className=r,n.setAttribute("aria-label",e),n}function gr(e){const r=e.createElement("div");r.className="rx-playback-bar",r.setAttribute("role","group"),r.setAttribute("aria-label","Narration transport");const n=fe("Skip back 15 seconds","rx-playback-icon-btn rx-playback-skip-back");n.textContent="⏪";const o=fe("Play","rx-playback-icon-btn rx-playback-play-pause");o.setAttribute("aria-pressed","false"),o.textContent="▶";const t=fe("Skip forward 15 seconds","rx-playback-icon-btn rx-playback-skip-forward");t.textContent="⏩";const a=fe("Playback speed","rx-playback-rate-btn");a.textContent="1x";const i=e.createElement("div");i.className="rx-playback-info",i.setAttribute("aria-live","polite");const l=e.createElement("span");l.className="rx-playback-chapter";const c=e.createElement("span");return c.className="rx-playback-position",c.textContent="0:00",i.append(l,c),r.append(n,o,t,i,a),{root:r,skipBackBtn:n,playPauseBtn:o,skipForwardBtn:t,rateBtn:a,chapterLabel:l,positionLabel:c}}const vr=`
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
`;class yr{constructor(){G(this,"timeline",null);G(this,"activeAudioIndex",0)}setTimeline(r){this.timeline=r,this.activeAudioIndex=0}clear(){this.timeline=null,this.activeAudioIndex=0}hasTimeline(){return this.timeline!==null}itemFor(r){const n=this.timeline;if(!n)return null;const o=a=>a.beginSec<=r&&(a.endSec===null||r<a.endSec);let t=n.items.filter(a=>a.audioIndex===this.activeAudioIndex&&o(a));if(t.length===0){t=n.items.filter(o);const a=t[0];a&&(this.activeAudioIndex=a.audioIndex)}return t.length===0?null:t.reduce((a,i)=>i.beginSec>a.beginSec?i:a)}textHrefFor(r){var n;return((n=this.itemFor(r))==null?void 0:n.textHref)??null}}const qe="reactor-playback-stylesheet",Ue=15,xe=[.75,1,1.25,1.5,1.75,2];function kr(e){if(e.getElementById(qe))return;const r=e.createElement("style");r.id=qe,r.textContent=vr,e.head.appendChild(r)}function wr(e){const r=Number.isFinite(e)&&e>0?e:0,n=Math.floor(r),o=Math.floor(n/60),t=n%60;return`${o}:${String(t).padStart(2,"0")}`}function Ke(e){return xe.reduce((r,n)=>Math.abs(n-e)<Math.abs(r-e)?n:r,xe[0]??1)}function Er(e,r,n,o={}){const t=e.ownerDocument??document;kr(t);let a=null,i=!1,l=!1,c=!1,s=!1,f=0,b=1,k=!1,d=0;const m=new yr;function u(S,x=null,L=null){n.emitIntent({type:"playback",action:S,positionSec:x,rate:L})}const h=()=>u(s?"pause":"play"),v=()=>u("seek",Math.max(0,f-Ue)),I=()=>u("seek",f+Ue),T=()=>{const S=xe.indexOf(Ke(b)),x=xe[(S+1)%xe.length]??1;u("rateChange",null,x)};function M(){a&&(a.playPauseBtn.setAttribute("aria-pressed",String(s)),a.playPauseBtn.setAttribute("aria-label",s?"Pause":"Play"),a.playPauseBtn.textContent=s?"⏸":"▶",a.positionLabel.textContent=wr(f),a.rateBtn.textContent=`${Ke(b)}x`)}function A(S){a&&(a.chapterLabel.textContent=S??"")}function E(){i||l||(i=!0,a=gr(t),a.root.classList.toggle("e-ink",!!o.eink),e.appendChild(a.root),a.playPauseBtn.addEventListener("click",h),a.skipBackBtn.addEventListener("click",v),a.skipForwardBtn.addEventListener("click",I),a.rateBtn.addEventListener("click",T),se(e,{bottom:a.root.offsetHeight||56}),M(),B())}function B(){!i||!k||(d+=1,r.narrationPrepare(d))}function O(){if(!i||!k)return;const S=m.textHrefFor(f);S?r.narrationHighlight(S):r.narrationUnhighlight()}function N(S){switch(S.type){case"loaded":k=S.hasMediaOverlay,m.clear(),B();break;case"relocate":A(S.chapterTitle);break;case"narrationTimeline":S.generation===d&&(m.setTimeline(S),O());break;case"narrationTimelineError":S.generation===d&&m.clear();break}}const R=r.on(N);function z(S){if(S.type==="configure"){if(c)return;c=!0,S.capabilities.playback&&E()}else if(S.type==="setPlaybackState"){if(!i)return;s=S.playing,f=S.positionSec,b=S.rate,M(),O()}}const D=n.onCommand(z),P=n.getConfig();P&&z(P);function _(){l||(l=!0,R(),D(),a&&(a.playPauseBtn.removeEventListener("click",h),a.skipBackBtn.removeEventListener("click",v),a.skipForwardBtn.removeEventListener("click",I),a.rateBtn.removeEventListener("click",T),a.root.remove(),se(e,{bottom:0})))}return{isVisible:()=>i,destroy:_}}const Se={highlight:"Highlight",underline:"Underline",strikethrough:"Strikethrough",squiggly:"Squiggly underline"};function Sr(e){const r=e.createElement("div");r.className="rx-anno-popover",r.setAttribute("role","dialog"),r.setAttribute("aria-label","Annotation"),r.hidden=!0;const n=e.createElement("div");n.className="rx-anno-status",n.setAttribute("aria-live","polite");const o=e.createElement("button");o.type="button",o.className="rx-icon-btn rx-anno-close",o.setAttribute("aria-label","Close"),o.textContent="✕";const t=e.createElement("div");t.className="rx-anno-header",t.append(n,o);const a=e.createElement("div");a.className="rx-anno-colors",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Colour");const i=st.map(h=>{const v=e.createElement("button");return v.type="button",v.className="rx-anno-swatch",v.style.setProperty("--rx-anno-swatch-color",h.value),v.setAttribute("role","radio"),v.setAttribute("aria-checked","false"),v.setAttribute("aria-label",h.label),v.dataset.color=h.value,a.append(v),v}),l=e.createElement("div");l.className="rx-anno-styles",l.setAttribute("role","group"),l.setAttribute("aria-label","Mark style");const c={};for(const h of Object.keys(Se)){const v=e.createElement("button");v.type="button",v.className=`rx-anno-style rx-anno-style-${h}`,v.textContent=Se[h],v.setAttribute("aria-label",Se[h]),v.dataset.style=h,l.append(v),c[h]=v}const s=e.createElement("button");s.type="button",s.className="rx-anno-note-toggle",s.textContent="Note",s.setAttribute("aria-expanded","false");const f=e.createElement("div");f.className="rx-anno-note-form",f.hidden=!0;const b=e.createElement("textarea");b.className="rx-anno-note-textarea",b.setAttribute("aria-label","Note text"),b.rows=3;const k=e.createElement("div");k.className="rx-anno-note-actions";const d=e.createElement("button");d.type="button",d.className="rx-anno-note-save",d.textContent="Save";const m=e.createElement("button");m.type="button",m.className="rx-anno-note-cancel",m.textContent="Cancel",k.append(m,d),f.append(b,k);const u=e.createElement("button");return u.type="button",u.className="rx-anno-delete",u.textContent="Delete",u.hidden=!0,r.append(t,a,l,s,f,u),{root:r,colorRow:a,colorButtons:i,styleRow:l,styleButtons:c,noteToggleBtn:s,noteForm:f,noteTextarea:b,noteSaveBtn:d,noteCancelBtn:m,deleteBtn:u,closeBtn:o,statusLabel:n}}const Cr=`
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
`,Ye="reactor-annotations-stylesheet";function Lr(e){return e==="underline"||e==="squiggly"?"underline":"highlight"}class Ar{constructor(r=500){G(this,"map",new Map);this.cap=r}get(r){return this.map.get(r)}addAll(r){for(const n of r)for(this.map.delete(n.cfi),this.map.set(n.cfi,n);this.map.size>this.cap;){const o=this.map.keys().next().value;if(o===void 0)break;this.map.delete(o)}}}function Tr({shellRoot:e,core:r,hostChannel:n,options:o={}}){const t=e.ownerDocument??document;if(!t.getElementById(Ye)){const x=t.createElement("style");x.id=Ye,x.textContent=Cr,t.head.appendChild(x)}const a=Sr(t);e.append(a.root);const i=new Ar;let l=ve,c=!1,s=null,f=null;function b(){s=null,f=null,a.root.hidden=!0,a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}function k(x){const L=e.getBoundingClientRect(),F=x?x.left-L.left:(e.clientWidth||300)/2-140,V=x?x.bottom-L.top+8:60,X=Math.max(0,(e.clientWidth||300)-288);a.root.style.left=`${Math.min(Math.max(0,F),X)}px`,a.root.style.top=`${Math.max(0,V)}px`}function d(x){l=x;for(const L of a.colorButtons)L.setAttribute("aria-checked",String(L.dataset.color===x))}function m(x){for(const[L,F]of Object.entries(a.styleButtons))F.setAttribute("aria-pressed",String(L===x))}function u(x,L,F){s={kind:"create",cfi:x,text:L},a.statusLabel.textContent="Add mark",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.noteTextarea.value="",d(l),m(null),a.root.hidden=!1,k(F)}function h(x,L){s={kind:"edit",note:x},a.statusLabel.textContent="Edit mark",a.deleteBtn.hidden=!1,a.noteForm.hidden=!0,a.noteTextarea.value=x.note??"",d(x.color??ve),m(x.style??(x.kind==="underline"?"underline":"highlight")),a.root.hidden=!1,k(L)}function v(x,L){s=null,f=x,a.statusLabel.textContent="Loading…",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.root.hidden=!1,k(L),n.emitIntent({type:"notesPageRequest",offset:0,limit:1,filter:null,sort:null,query:`cfi:${x}`})}function I(x){if(x.type==="selection"&&x.cfi)u(x.cfi,x.text,x.rect);else if(x.type==="selectionCleared")(s==null?void 0:s.kind)==="create"&&b();else if(x.type==="annotationTap"){if(!x.cfi)return;const L=i.get(x.cfi);L?h(L,x.rect):v(x.cfi,x.rect)}}const T=r.on(I);function M(x){if(x.type==="setNotes"&&(i.addAll(x.items),f)){const L=x.items.find(F=>F.cfi===f);if(L){const F=a.root.hidden?null:{left:parseFloat(a.root.style.left||"0"),top:parseFloat(a.root.style.top||"0"),bottom:0};h(L,F)}else b()}}const A=n.onCommand(M);function E(x){(s==null?void 0:s.kind)==="create"&&(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:Lr(x),color:l,style:x,text:s.text,note:null}),r.clearSelection(),b())}function B(x){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:l,style:x,note:s.note.note}),b())}function O(x){const F=x.currentTarget.dataset.color??ve;d(F),(s==null?void 0:s.kind)==="edit"&&n.emitIntent({type:"annotationUpdate",id:s.note.id,color:F,style:s.note.style,note:s.note.note})}for(const x of a.colorButtons)x.addEventListener("click",O);const N={highlight:()=>(s==null?void 0:s.kind)==="create"?E("highlight"):B("highlight"),underline:()=>(s==null?void 0:s.kind)==="create"?E("underline"):B("underline"),strikethrough:()=>(s==null?void 0:s.kind)==="create"?E("strikethrough"):B("strikethrough"),squiggly:()=>(s==null?void 0:s.kind)==="create"?E("squiggly"):B("squiggly")};for(const[x,L]of Object.entries(a.styleButtons))L.addEventListener("click",N[x]);function R(){const x=a.noteForm.hidden;a.noteForm.hidden=!x,a.noteToggleBtn.setAttribute("aria-expanded",String(x)),x&&a.noteTextarea.focus()}a.noteToggleBtn.addEventListener("click",R);function z(){a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}a.noteCancelBtn.addEventListener("click",z);function D(){const x=a.noteTextarea.value.trim()||null;(s==null?void 0:s.kind)==="create"?(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:"note",color:l,style:null,text:s.text,note:x}),r.clearSelection(),b()):(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:s.note.color,style:s.note.style,note:x}),b())}a.noteSaveBtn.addEventListener("click",D);function P(){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationDelete",id:s.note.id}),b())}a.deleteBtn.addEventListener("click",P);const _=()=>b();a.closeBtn.addEventListener("click",_);function S(){if(!c){c=!0,T(),A();for(const x of a.colorButtons)x.removeEventListener("click",O);for(const[x,L]of Object.entries(a.styleButtons))L.removeEventListener("click",N[x]);a.noteToggleBtn.removeEventListener("click",R),a.noteCancelBtn.removeEventListener("click",z),a.noteSaveBtn.removeEventListener("click",D),a.deleteBtn.removeEventListener("click",P),a.closeBtn.removeEventListener("click",_),a.root.remove()}}return{destroy:S}}const Br='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function Nr(e,r,n){const o=document.createElement("button");return o.type="button",o.className=n,o.setAttribute("aria-label",e),o.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,o}function ue(e,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-toggle",n.setAttribute("aria-pressed","false"),n.setAttribute("data-setting",r),n.textContent=e,n}function me(e,r,n){const o=document.createElement("div");o.className=`rx-settings-pills ${n}`,o.setAttribute("role","radiogroup"),o.setAttribute("aria-label",e);for(const t of r){const a=document.createElement("button");a.type="button",a.className="rx-settings-pill",a.setAttribute("role","radio"),a.setAttribute("aria-checked","false"),a.setAttribute("data-value",t.id),a.textContent=t.label,o.appendChild(a)}return o}function le(e,r,n,o){const t=document.createElement("div");t.className="rx-settings-slider-row";const a=document.createElement("div");a.className="rx-settings-slider-label";const i=document.createElement("span");i.textContent=e;const l=document.createElement("span");l.className="rx-settings-slider-value",a.append(i,l);const c=document.createElement("input");return c.type="range",c.className="rx-settings-slider",c.min=String(r),c.max=String(n),c.step=String(o),c.setAttribute("aria-label",e),t.append(a,c),{row:t,input:c,value:l}}function zr(e,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-tab",n.setAttribute("role","tab"),n.setAttribute("aria-selected","false"),n.setAttribute("data-tab",e),n.id=`rx-settings-tab-${e}`,n.textContent=r,n}function pe(e){const r=document.createElement("div");return r.className="rx-settings-panel",r.setAttribute("role","tabpanel"),r.setAttribute("data-panel",e),r.setAttribute("aria-labelledby",`rx-settings-tab-${e}`),r.hidden=!0,r}function Ir(e){const r=document.createElement("div");r.className="rx-settings-scrim";const n=document.createElement("div");n.className="rx-settings-sheet",n.setAttribute("role","dialog"),n.setAttribute("aria-label","Text settings"),n.tabIndex=-1;const o=document.createElement("div");o.className="rx-settings-head";const t=document.createElement("h3");t.className="rx-settings-title",t.textContent="Text settings";const a=Nr("Close settings",Br,"rx-icon-btn rx-settings-close");o.append(t,a);const i=document.createElement("div");i.className="rx-settings-scope",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Settings scope");const l=document.createElement("button");l.type="button",l.className="rx-settings-scope-btn",l.setAttribute("role","radio"),l.setAttribute("aria-checked","true"),l.setAttribute("data-scope","global"),l.textContent="Global";const c=document.createElement("button");c.type="button",c.className="rx-settings-scope-btn",c.setAttribute("role","radio"),c.setAttribute("aria-checked","false"),c.setAttribute("data-scope","book"),c.textContent="This book",i.append(l,c);const s=document.createElement("div");s.className="rx-settings-tabs",s.setAttribute("role","tablist");const f=[["typography","Typography"],["layout","Layout"],["theme","Theme"],["controls","Controls"],["playback","Playback"]],b={};for(const[U,Y]of f){const K=zr(U,Y);b[U]=K,s.appendChild(K)}const k=document.createElement("div");k.className="rx-settings-body";const d=pe("typography"),m=le("Font size",13,28,1),u=le("Paragraph spacing",0,2,.1),h=me("Typeface",[],"rx-settings-font-pills");d.append(m.row,h,u.row);const v=pe("layout"),I=me("Reading mode",[{id:"paginated",label:"Paginated"},{id:"scrolled",label:"Scrolling"}],"rx-settings-flow-pills"),T=me("Columns",[{id:"1",label:"1 column"},{id:"2",label:"2 columns"}],"rx-settings-columns-pills"),M=le("Margins",0,96,4),A=le("Line spacing",1.2,1.95,.05),E=ue("Justify text","justify"),B=ue("Hyphenate","hyphenate"),O=ue("Use book's own styling","useBookLayout");v.append(I,T,M.row,A.row,E,B,O);const N=pe("theme"),R=document.createElement("div");R.className="rx-settings-swatches",R.setAttribute("role","radiogroup"),R.setAttribute("aria-label","Theme"),N.append(R);const z=pe("controls"),D=ue("Swipe to turn pages","swipe"),P=me("Tap zone size",[{id:"standard",label:"Standard"},{id:"wide",label:"Wide"}],"rx-settings-tapzone-pills"),_=document.createElement("div");_.className="rx-settings-volumekeys",_.hidden=!0;const S=ue("Volume keys turn pages","volumeKeys");_.append(S),z.append(D,P,_);const x=pe("playback"),L=document.createElement("p");L.className="rx-settings-empty",L.textContent="No narration provider for this book.";const F=document.createElement("div");F.className="rx-settings-playback-controls",F.hidden=!0;const V=le("Narration speed",.5,3,.1),X=le("Skip forward (seconds)",5,60,5);return F.append(V.row,X.row),x.append(L,F),k.append(d,v,N,z,x),n.append(o,i,s,k),e.append(r,n),{root:n,scrim:r,closeBtn:a,scopeGlobalBtn:l,scopeBookBtn:c,tabsRow:s,tabButtons:b,panels:{typography:d,layout:v,theme:N,controls:z,playback:x},fontSizeInput:m.input,fontSizeValue:m.value,paragraphSpacingInput:u.input,paragraphSpacingValue:u.value,fontFamilyPills:h,flowPills:I,columnsPills:T,marginInput:M.input,marginValue:M.value,lineHeightInput:A.input,lineHeightValue:A.value,justifyToggle:E,hyphenateToggle:B,useBookLayoutToggle:O,themeSwatches:R,swipeToggle:D,tapZonePills:P,volumeKeysRow:_,volumeKeysToggle:S,playbackEmpty:L,playbackControls:F,narrationSpeedInput:V.input,narrationSpeedValue:V.value,skipForwardInput:X.input,skipForwardValue:X.value}}const Pr=`
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
`,je={fontSize:16,lineHeight:1.5,fontFamily:null,paragraphSpacing:0,maxColumnCount:2,gap:.05,maxInlineSize:720,maxBlockSize:1440,justify:!0,hyphenate:!0,isDark:!1,themeName:"default",flow:"paginated",useBookLayout:!0,marginTop:40,marginBottom:40,marginLeft:40,marginRight:40,linkSideMargins:!0},Ce=[{id:"light",label:"Light",themeName:"default",isDark:!1,swatchBg:"#ffffff",swatchFg:"#000000"},{id:"sepia",label:"Sepia",themeName:"sepia",isDark:!1,swatchBg:"#f1e8d0",swatchFg:"#5b4636"},{id:"dark",label:"Dark",themeName:"default",isDark:!0,swatchBg:"#222222",swatchFg:"#e0e0e0"},{id:"amoled",label:"AMOLED",themeName:"amoled",isDark:!0,swatchBg:"#000000",swatchFg:"#ffffff"}];function Hr(e,r){return Ce.find(n=>n.themeName===e&&n.isDark===r)??Ce.find(n=>n.id===(r?"dark":"light"))}const Ve=[{id:"publisher",label:"Publisher",value:null},{id:"serif",label:"Serif",value:'Georgia, "Iowan Old Style", "Times New Roman", serif'},{id:"sans",label:"Sans-serif",value:'-apple-system, "Segoe UI", Roboto, Arial, sans-serif'},{id:"mono",label:"Monospace",value:'"Courier New", monospace'}];function Mr(e){return Array.from(e.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===e)}function Fr(e){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const t=Mr(e);if(t.length===0){o.preventDefault(),e.focus();return}const a=t[0],i=t[t.length-1],l=e.ownerDocument.activeElement;o.shiftKey&&l===a?(o.preventDefault(),i.focus()):!o.shiftKey&&l===i&&(o.preventDefault(),a.focus())}return e.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,e.removeEventListener("keydown",n)}}}const Xe="reactor-settings-stylesheet",$r=["typography","layout","theme","controls","playback"];function Or(e){if(e.getElementById(Xe))return;const r=e.createElement("style");r.id=Xe,r.textContent=Pr,e.head.appendChild(r)}function Rr(e,r,n){var te,re,ne;const o=e.ownerDocument??document;Or(o);const t=Ir(e),a=Fr(t.root),i={global:{...je},book:{...je}};let l="global",c="typography",s=!1,f=!1,b=((re=(te=n.hostChannel)==null?void 0:te.getConfig())==null?void 0:re.capabilities.playback)??!1,k=null;t.volumeKeysRow.hidden=!n.volumeKeysCapability;function d(){return i[l]}function m(){const p=d().fontFamily;for(const C of Array.from(t.fontFamilyPills.children)){const j=Ve.find(Q=>Q.id===C.dataset.value);C.setAttribute("aria-checked",String((j==null?void 0:j.value)===p))}}function u(){const p=Hr(d().themeName,d().isDark);for(const C of Array.from(t.themeSwatches.children))C.setAttribute("aria-checked",String(C.dataset.value===p.id))}function h(p,C){for(const j of Array.from(p.children))j.setAttribute("aria-checked",String(j.dataset.value===C))}function v(){t.playbackEmpty.hidden=b,t.playbackControls.hidden=!b}function I(){const p=d();t.fontSizeInput.value=String(p.fontSize),t.fontSizeInput.setAttribute("aria-valuetext",`${p.fontSize}px`),t.fontSizeValue.textContent=`${p.fontSize}px`,t.paragraphSpacingInput.value=String(p.paragraphSpacing),t.paragraphSpacingValue.textContent=`${p.paragraphSpacing}em`,m(),h(t.flowPills,p.flow),h(t.columnsPills,String(p.maxColumnCount)),t.marginInput.value=String(p.marginTop),t.marginValue.textContent=`${p.marginTop}px`,t.lineHeightInput.value=String(p.lineHeight),t.lineHeightValue.textContent=p.lineHeight.toFixed(2),t.justifyToggle.setAttribute("aria-pressed",String(p.justify)),t.hyphenateToggle.setAttribute("aria-pressed",String(p.hyphenate)),t.useBookLayoutToggle.setAttribute("aria-pressed",String(p.useBookLayout)),u(),v(),t.scopeGlobalBtn.setAttribute("aria-checked",String(l==="global")),t.scopeBookBtn.setAttribute("aria-checked",String(l==="book"))}function T(p){var C;i[l]={...i[l],...p},I(),r.applyStyles(i[l]),(C=n.hostChannel)==null||C.emitIntent({type:"settingsChange",scope:l,settings:i[l]})}function M(){T({fontSize:Number(t.fontSizeInput.value)})}t.fontSizeInput.addEventListener("change",M);function A(){T({paragraphSpacing:Number(t.paragraphSpacingInput.value)})}t.paragraphSpacingInput.addEventListener("change",A);for(const p of Ve){const C=document.createElement("button");C.type="button",C.className="rx-settings-pill",C.setAttribute("role","radio"),C.setAttribute("aria-checked","false"),C.setAttribute("data-value",p.id),C.textContent=p.label,C.addEventListener("click",()=>T({fontFamily:p.value})),t.fontFamilyPills.appendChild(C)}function E(p){const C=p.currentTarget.dataset.value;T({flow:C})}for(const p of Array.from(t.flowPills.children))p.addEventListener("click",E);function B(p){const C=Number(p.currentTarget.dataset.value);T({maxColumnCount:C})}for(const p of Array.from(t.columnsPills.children))p.addEventListener("click",B);function O(){const p=Number(t.marginInput.value);T({marginTop:p,marginBottom:p,marginLeft:p,marginRight:p})}t.marginInput.addEventListener("change",O);function N(){T({lineHeight:Number(t.lineHeightInput.value)})}t.lineHeightInput.addEventListener("change",N);function R(){T({justify:!d().justify})}t.justifyToggle.addEventListener("click",R);function z(){T({hyphenate:!d().hyphenate})}t.hyphenateToggle.addEventListener("click",z);function D(){T({useBookLayout:!d().useBookLayout})}t.useBookLayoutToggle.addEventListener("click",D);for(const p of Ce){const C=document.createElement("button");C.type="button",C.className="rx-settings-swatch",C.setAttribute("role","radio"),C.setAttribute("aria-checked","false"),C.setAttribute("aria-label",p.label),C.setAttribute("data-value",p.id);const j=document.createElement("span");j.className="rx-settings-swatch-dot",j.style.background=p.swatchBg;const Q=document.createElement("span");Q.textContent=p.label,C.append(j,Q),C.addEventListener("click",()=>T({themeName:p.themeName,isDark:p.isDark})),t.themeSwatches.appendChild(C)}let P=!0;function _(){P=!P,t.swipeToggle.setAttribute("aria-pressed",String(P)),r.setSwipe(P)}t.swipeToggle.addEventListener("click",_),t.swipeToggle.setAttribute("aria-pressed",String(P));let S="standard";function x(p){S=p.currentTarget.dataset.value??"standard",h(t.tapZonePills,S)}for(const p of Array.from(t.tapZonePills.children))p.addEventListener("click",x);h(t.tapZonePills,S);let L=!1;function F(){L=!L,t.volumeKeysToggle.setAttribute("aria-pressed",String(L))}t.volumeKeysToggle.addEventListener("click",F);function V(){var C;const p=Number(t.narrationSpeedInput.value);t.narrationSpeedValue.textContent=`${p.toFixed(1)}x`,(C=n.hostChannel)==null||C.emitIntent({type:"playback",action:"rateChange",positionSec:null,rate:p})}t.narrationSpeedInput.addEventListener("input",()=>{t.narrationSpeedValue.textContent=`${Number(t.narrationSpeedInput.value).toFixed(1)}x`}),t.narrationSpeedInput.addEventListener("change",V);function X(){t.skipForwardValue.textContent=`${t.skipForwardInput.value}s`}t.skipForwardInput.addEventListener("input",X),t.narrationSpeedInput.value="1",t.narrationSpeedValue.textContent="1.0x",t.skipForwardInput.value="30",t.skipForwardValue.textContent="30s";function U(p){p!==c&&(t.tabButtons[c].setAttribute("aria-selected","false"),t.panels[c].hidden=!0,c=p,t.tabButtons[c].setAttribute("aria-selected","true"),t.panels[c].hidden=!1)}for(const p of $r)t.tabButtons[p].addEventListener("click",()=>U(p));U("typography"),t.tabButtons.typography.setAttribute("aria-selected","true"),t.panels.typography.hidden=!1;function Y(p){p!==l&&(l=p,I(),r.applyStyles(i[l]))}t.scopeGlobalBtn.addEventListener("click",()=>Y("global")),t.scopeBookBtn.addEventListener("click",()=>Y("book"));const K=(ne=n.hostChannel)==null?void 0:ne.onCommand(p=>{p.type==="setSettingsScope"?(i[p.scope]=p.settings,p.scope===l&&(I(),r.applyStyles(i[l]))):p.type==="configure"&&(b=p.capabilities.playback,v())});function y(){var p;s||(s=!0,k=o.activeElement??null,e.classList.add("settings-open"),t.scrim.classList.add("visible"),a.activate(),t.root.focus({preventScroll:!0}),(p=n.onOpenChange)==null||p.call(n,!0))}function $(){var p,C;s&&(s=!1,e.classList.remove("settings-open"),t.scrim.classList.remove("visible"),a.deactivate(),(p=k==null?void 0:k.focus)==null||p.call(k),k=null,(C=n.onOpenChange)==null||C.call(n,!1))}function J(){s?$():y()}t.closeBtn.addEventListener("click",$),t.scrim.addEventListener("click",$),I();function W(){f||(f=!0,K==null||K(),a.deactivate(),e.classList.remove("settings-open"),t.root.remove(),t.scrim.remove())}return{open:y,close:$,toggle:J,isOpen:()=>s,getActiveSettings:()=>d(),getActiveScope:()=>l,destroy:W}}const _r={top:0,right:0,bottom:0,left:0};function Ze(e,r){e.style.setProperty("--rx-inset-top",`${Math.max(0,r.top)}px`),e.style.setProperty("--rx-inset-right",`${Math.max(0,r.right)}px`),e.style.setProperty("--rx-inset-bottom",`${Math.max(0,r.bottom)}px`),e.style.setProperty("--rx-inset-left",`${Math.max(0,r.left)}px`)}const Dr=280,Je="reactor-shell-stylesheet";function Gr(e){if(e.getElementById(Je))return;const r=e.createElement("style");r.id=Je,r.textContent=dt,e.head.appendChild(r)}function Wr(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function qr(){const e=new Set;return{getChromeState:()=>({barsVisible:!1,sidebar:"none"}),onChromeState:r=>(e.add(r),()=>e.delete(r)),setBarsVisible:()=>{},refreshSizeClass:()=>{},destroy:()=>{e.clear()}}}function Yr(e,r,n={}){var Le,Ae,Te,Be,Ne,ze,Ie;if((n.chrome??"reactor")==="host")return qr();const t=e.ownerDocument??document;Gr(t);const a=ct(e),i=a.root;let l=!1,c=!1,s="none",f=!1,b=!1,k=null;const d=new Set;function m(){var q;if(b)return;const w={barsVisible:c,sidebar:s};for(const he of d)he(w);(q=n.hostChannel)==null||q.emitIntent({type:"chromeState",barsVisible:c,sidebar:s})}function u(w){c!==w&&(c=w,i.classList.toggle("ui-visible",c),m())}function h(){u(!c)}const v=Rt(i,w=>r.goTo(w),{eink:n.eink,onBack:()=>{var w;return(w=n.hostChannel)==null?void 0:w.emitIntent({type:"back"})},onSidebarChange:w=>{s=w?"left":"none",a.contentsBtn.setAttribute("aria-pressed",String(w)),m(),M()}});function I(){return i.classList.contains("size-desktop")}function T(){if(v.isOpen()){v.close();return}I()||W.close(),oe.close(),v.open()}a.contentsBtn.addEventListener("click",T);function M(){const w=i.classList.contains("size-desktop");se(i,{left:w&&v.isOpen()?Dr:0})}function A(){i.classList.toggle("reduced-motion",B||Wr())}function E(){i.classList.toggle("e-ink",B)}let B=((Ae=(Le=n.hostChannel)==null?void 0:Le.getConfig())==null?void 0:Ae.eink)??!!n.eink;E(),A(),Ze(i,((Be=(Te=n.hostChannel)==null?void 0:Te.getConfig())==null?void 0:Be.insets)??_r);const O=(Ne=n.hostChannel)==null?void 0:Ne.onCommand(w=>{w.type==="configure"&&(B=w.eink,E(),A(),Ze(i,w.insets))});function N(){const w=e.clientWidth||i.clientWidth,q=ye(w);i.classList.remove("size-phone","size-fold-tablet","size-desktop"),i.classList.add(`size-${q}`),M()}N();function R(){N(),W.refreshLayout()}const z=typeof ResizeObserver=="function"?new ResizeObserver(()=>R()):null;z==null||z.observe(e);const D=()=>R();z||window.addEventListener("resize",D);const P=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,_=()=>A();(ze=P==null?void 0:P.addEventListener)==null||ze.call(P,"change",_);function S(w,q){const he=xt(w,l);he==="prev"?r.prev():he==="next"?r.next():h()}function x(w){w==="prev"?r.prev():w==="next"?r.next():h()}function L(w,q){q.key!=="Enter"&&q.key!==" "||(q.preventDefault(),x(w))}const F=()=>x(l?"next":"prev"),V=()=>x(l?"prev":"next"),X=()=>x("toggle"),U=w=>L(l?"next":"prev",w),Y=w=>L(l?"prev":"next",w),K=w=>L("toggle",w);a.zoneLeft.addEventListener("click",F),a.zoneRight.addEventListener("click",V),a.zoneCentre.addEventListener("click",X),a.zoneLeft.addEventListener("keydown",U),a.zoneRight.addEventListener("keydown",Y),a.zoneCentre.addEventListener("keydown",K);function y(w){const q=ft(w);q&&(mt(q)&&w.preventDefault(),q==="next"?r.next():q==="prev"?r.prev():q==="toggleBars"?h():q==="escape"&&(v.isOpen()?v.close():u(!1)))}t.addEventListener("keydown",y);const $=()=>r.historyBack(),J=()=>r.historyForward();a.historyBackBtn.addEventListener("click",$),a.historyForwardBtn.addEventListener("click",J);const W=mr(i,r,{getSizeClass:()=>ye(e.clientWidth||i.clientWidth),onWidthChange:n.onContextWidthChange,hostChannel:n.hostChannel,onClose:()=>{s="none",a.contextBtn.setAttribute("aria-pressed","false"),m()}});function te(){s==="right"?(W.close(),s="none"):(I()||v.close(),oe.close(),W.open(),s="right"),a.contextBtn.setAttribute("aria-pressed",String(s==="right")),m()}a.contextBtn.addEventListener("click",te);const re=n.hostChannel?Er(i,r,n.hostChannel,{eink:n.eink}):null;let ne=new Set;function p(){a.bookmarkBtn.setAttribute("aria-pressed",String(!!k&&ne.has(k)))}function C(){!n.hostChannel||!k||n.hostChannel.emitIntent({type:"bookmarkToggle",cfi:k})}const j=(Ie=n.hostChannel)==null?void 0:Ie.onCommand(w=>{w.type==="setBookmarks"&&(ne=new Set(w.items.map(q=>q.cfi)),p())});a.bookmarkBtn.addEventListener("click",C);const Q=n.hostChannel?Tr({shellRoot:i,core:r,hostChannel:n.hostChannel,options:{eink:n.eink}}):null,oe=Rr(i,r,{getSizeClass:()=>ye(e.clientWidth||i.clientWidth),eink:n.eink,hostChannel:n.hostChannel,volumeKeysCapability:n.volumeKeysCapability,onOpenChange:w=>{a.settingsBtn.setAttribute("aria-pressed",String(w))}});function ce(){if(oe.isOpen()){oe.close();return}v.close(),W.close(),s="none",a.contentsBtn.setAttribute("aria-pressed","false"),a.contextBtn.setAttribute("aria-pressed","false"),m(),oe.open()}a.settingsBtn.addEventListener("click",ce);const be=ur(i,r,{onOpenInGlossary:w=>{W.openGlossaryTerm(w),s="right",a.contextBtn.setAttribute("aria-pressed","true"),m()}}),g=()=>{f=!0},H=()=>{f=!1,r.goToFraction(Number(a.scrubber.value)/1e3)};a.scrubber.addEventListener("pointerdown",g),a.scrubber.addEventListener("change",H);function Z(w){switch(w.type){case"loaded":l=w.isRtl,i.classList.toggle("is-rtl",l),v.setToc(w.toc),M();break;case"relocate":k=w.cfi??null,a.chapterLabel&&(a.chapterLabel.textContent=w.chapterTitle??""),!f&&typeof w.fraction=="number"&&(a.scrubber.value=String(Math.round(w.fraction*1e3))),v.setCurrentChapterTitle(w.chapterTitle),p();break;case"history":a.historyBackBtn.disabled=!w.canGoBack,a.historyForwardBtn.disabled=!w.canGoForward;break;case"tap":S(w.x,w.y);break}}const ee=r.on(Z);function ae(){N()}function nt(){var w;b||(b=!0,ee(),z==null||z.disconnect(),z||window.removeEventListener("resize",D),(w=P==null?void 0:P.removeEventListener)==null||w.call(P,"change",_),t.removeEventListener("keydown",y),a.zoneLeft.removeEventListener("click",F),a.zoneRight.removeEventListener("click",V),a.zoneCentre.removeEventListener("click",X),a.zoneLeft.removeEventListener("keydown",U),a.zoneRight.removeEventListener("keydown",Y),a.zoneCentre.removeEventListener("keydown",K),a.historyBackBtn.removeEventListener("click",$),a.historyForwardBtn.removeEventListener("click",J),a.contextBtn.removeEventListener("click",te),a.bookmarkBtn.removeEventListener("click",C),j==null||j(),O==null||O(),Q==null||Q.destroy(),W.destroy(),re==null||re.destroy(),a.settingsBtn.removeEventListener("click",ce),oe.destroy(),be.destroy(),a.scrubber.removeEventListener("pointerdown",g),a.scrubber.removeEventListener("change",H),a.contentsBtn.removeEventListener("click",T),v.destroy(),d.clear(),i.classList.remove("reader-shell","ui-visible","e-ink","reduced-motion","is-rtl","size-phone","size-fold-tablet","size-desktop","settings-open"),a.zones.remove(),a.topBar.remove(),a.bottomBar.remove())}return{getChromeState:()=>({barsVisible:c,sidebar:s}),onChromeState:w=>(d.add(w),()=>d.delete(w)),setBarsVisible:u,refreshSizeClass:ae,destroy:nt}}export{Pe as ZONE_FRACTION,ye as computeSizeClass,mt as isPreventableKey,Er as mountPlaybackBar,mr as mountRightSidebar,Rr as mountSettingsPanel,Yr as mountShell,ft as resolveKeyboardAction,xt as resolveTapZone};
