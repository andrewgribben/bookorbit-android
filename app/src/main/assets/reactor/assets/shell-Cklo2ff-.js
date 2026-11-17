var ht=Object.defineProperty;var xt=(t,r,n)=>r in t?ht(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;var $=(t,r,n)=>xt(t,typeof r!="symbol"?r+"":r,n);import{A as bt,D as Se}from"./index-ClmUd51z.js";const ft={menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',bookmark:'<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',panel_right:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',back:'<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',forward:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',skip_back:'<polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/>',skip_forward:'<polygon points="13 19 22 12 13 5 13 19"/><polygon points="2 19 11 12 2 5 2 19"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'};function ge(t){return`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ft[t]}</svg>`}function pe(t,r,n=!1){const o=document.createElement("button");return o.type="button",o.className="rx-icon-btn",o.setAttribute("aria-label",t),o.innerHTML=ge(r),n&&o.setAttribute("aria-pressed","false"),o}function mt(t){t.classList.add("reader-shell");const r=document.createElement("div");r.className="rx-zones";const n=document.createElement("div");n.className="rx-zone rx-zone-left",n.setAttribute("role","button"),n.setAttribute("tabindex","0"),n.setAttribute("aria-label","Previous page");const o=document.createElement("div");o.className="rx-zone rx-zone-centre",o.setAttribute("role","button"),o.setAttribute("tabindex","0"),o.setAttribute("aria-label","Toggle bars");const e=document.createElement("div");e.className="rx-zone rx-zone-right",e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label","Next page"),r.append(n,o,e);const a=document.createElement("div");a.className="rx-bar rx-bar-top",a.setAttribute("role","toolbar");const i=pe("Table of contents","menu",!0),l=pe("Bookmark","bookmark",!0),c=pe("Text settings","settings",!0),s=pe("Open context panel","panel_right",!0),g=document.createElement("div");g.className="rx-bar-spacer",a.append(i,l,g,c,s);const x=document.createElement("div");x.className="rx-bar rx-bar-bottom";const f=document.createElement("div");f.className="rx-status-row",f.setAttribute("aria-live","polite");const d=pe("Back","back");d.disabled=!0;const p=document.createElement("span");p.className="rx-chapter-label";const m=pe("Forward","forward");m.disabled=!0,f.append(d,p,m);const v=document.createElement("input");return v.type="range",v.className="rx-scrubber",v.min="0",v.max="1000",v.step="1",v.value="0",v.setAttribute("aria-label","Reading position"),x.append(f,v),t.append(r,a,x),{root:t,zones:r,zoneLeft:n,zoneCentre:o,zoneRight:e,topBar:a,bottomBar:x,contentsBtn:i,bookmarkBtn:l,settingsBtn:c,contextBtn:s,historyBackBtn:d,historyForwardBtn:m,chapterLabel:p,scrubber:v}}const gt=`
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
`,vt=599,yt=1200;function Ce(t){return t<=vt?"phone":t<=yt?"fold-tablet":"desktop"}const Re=.3;function kt(t,r){const n=Math.min(1,Math.max(0,t));return n<Re?r?"next":"prev":n>1-Re?r?"prev":"next":"toggle"}const wt=new Set(["ArrowRight","ArrowDown","PageDown"," "]),Et=new Set(["ArrowLeft","ArrowUp","PageUp"]);function St(t){return t.ctrlKey||t.metaKey||t.altKey?null:wt.has(t.key)?"next":Et.has(t.key)?"prev":t.key==="m"||t.key==="M"?"toggleBars":t.key==="Escape"?"escape":null}function Ct(t){return t==="next"||t==="prev"}const Lt='<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',At='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function $e(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-icon-btn",n.setAttribute("aria-label",t),n.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,n}function Tt(t){const r=document.createElement("div");r.className="rx-left-sidebar",r.setAttribute("aria-label","Table of contents"),r.tabIndex=-1;const n=document.createElement("div");n.className="rx-left-sidebar-scrim";const o=document.createElement("div");o.className="rx-sidebar-head";const e=$e("Back",Lt),a=document.createElement("h3");a.className="rx-sidebar-title",a.textContent="Contents";const i=$e("Close contents",At);i.classList.add("rx-left-sidebar-close"),o.append(e,a,i);const l=document.createElement("div");l.className="rx-left-sidebar-tabs",l.setAttribute("role","tablist");function c(C,T){const S=document.createElement("button");return S.type="button",S.className="rx-left-sidebar-tab",S.setAttribute("role","tab"),S.setAttribute("aria-selected","false"),S.setAttribute("data-tab",T),S.id=`rx-tab-${T}`,S.textContent=C,S}const s=c("Contents","contents"),g=c("Starred","starred"),x=c("Related","related");l.append(s,g,x);const f=document.createElement("div");f.className="rx-left-sidebar-body";function d(C){const T=document.createElement("div");return T.className="rx-sidebar-panel",T.setAttribute("role","tabpanel"),T.setAttribute("data-panel",C),T.setAttribute("aria-labelledby",`rx-tab-${C}`),T.hidden=!0,T}const p=d("contents"),m=document.createElement("div");m.className="rx-toc-scroll";const v=document.createElement("div");v.className="rx-toc-spacer";const h=document.createElement("div");h.className="rx-toc-window",h.setAttribute("role","list"),v.appendChild(h),m.appendChild(v),p.appendChild(m);const A=d("starred"),z=d("related");return f.append(p,A,z),r.append(o,l,f),t.append(n,r),{root:r,scrim:n,backBtn:e,closeBtn:i,title:a,tablist:l,tabContents:s,tabStarred:g,tabRelated:x,body:f,panelContents:p,tocScroll:m,tocSpacer:v,tocWindow:h,panelStarred:A,panelRelated:z}}const Bt=`
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
`;function at(t,r=null,n=0){const o=[];for(let e=0;e<t.length;e++){const a=t[e],i=r===null?String(e):`${r}.${e}`;o.push({id:i,label:a.label,href:a.href,depth:n,hasChildren:a.subitems.length>0,parentId:r}),a.subitems.length>0&&o.push(...at(a.subitems,i,n+1))}return o}function Nt(t,r){if(r.size===0)return t;const n=new Set,o=[];for(const e of t){if(e.parentId!==null&&(n.has(e.parentId)||r.has(e.parentId))){n.add(e.id);continue}o.push(e)}return o}function zt(t,r){if(!r)return null;const n=_e(r);let o=null;for(const e of t)if(e.href){if(e.href===r)return e.id;o===null&&_e(e.href)===n&&(o=e)}return(o==null?void 0:o.id)??null}function It(t,r){if(!r)return null;for(const n of t)if(n.label===r)return n.id;return null}function _e(t){const r=t.indexOf("#");return r===-1?t:t.slice(0,r)}function Mt(t,r,n,o,e=8){if(o===0||r<=0)return{start:0,end:-1};const a=Math.floor(t/r),i=Math.ceil(n/r),l=Math.max(0,a-e),c=Math.min(o-1,a+i+e);return{start:l,end:c}}const Le=48;function Pt(t,r,n,o){const e=document.createElement("div");if(e.className="rx-toc-row",e.setAttribute("role","listitem"),e.style.paddingLeft=`${12+t.depth*18}px`,o&&e.classList.add("is-current"),t.hasChildren){const c=document.createElement("button");c.type="button",c.className="rx-toc-toggle";const s=!r.collapsed.has(t.id);c.setAttribute("aria-expanded",String(s)),c.setAttribute("aria-label",`${s?"Collapse":"Expand"} ${t.label}`),c.textContent=s?"▾":"▸",c.addEventListener("click",g=>{g.stopPropagation(),n.onToggleExpand(t)}),e.appendChild(c)}else{const c=document.createElement("span");c.className="rx-toc-toggle-spacer",e.appendChild(c)}const a=document.createElement("button");a.type="button",a.className="rx-toc-label",a.setAttribute("aria-label",t.label),o&&a.setAttribute("aria-current","true"),a.textContent=t.label,a.addEventListener("click",()=>n.onActivate(t)),e.appendChild(a);const i=document.createElement("button");i.type="button",i.className="rx-toc-star";const l=t.href?r.starred.has(t.href):!1;return i.setAttribute("aria-pressed",String(l)),i.setAttribute("aria-label",`${l?"Unstar":"Star"} ${t.label}`),i.textContent=l?"★":"☆",i.addEventListener("click",c=>{c.stopPropagation(),n.onToggleStar(t)}),e.appendChild(i),e}function Ht(t,r,n,o,e){const a=Nt(o.flat,o.collapsed),i=zt(a,o.currentHref)??It(a,o.currentChapterTitle);r.style.height=`${a.length*Le}px`;const l=t.clientHeight||1,{start:c,end:s}=Mt(t.scrollTop,Le,l,a.length);n.replaceChildren(),n.style.transform=`translateY(${c*Le}px)`;for(let g=c;g<=s;g++){const x=a[g];x&&n.appendChild(Pt(x,o,e,x.id===i))}}function Ot(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No starred chapters yet. Star a chapter in Contents to find it here.",t.appendChild(e);return}const o=document.createElement("div");o.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-starred-row",a.setAttribute("role","listitem"),a.textContent=e.label,a.addEventListener("click",()=>n(e)),o.appendChild(a)}t.appendChild(o)}function Ft(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No related books yet.",t.appendChild(e);return}const o=document.createElement("div");o.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-related-row",a.setAttribute("role","listitem");const i=`${e.title}${e.subtitle?`, ${e.subtitle}`:""}${e.read?", read":""}`;if(a.setAttribute("aria-label",i),e.coverUrl){const s=document.createElement("img");s.className="rx-related-cover",s.src=e.coverUrl,s.alt="",a.appendChild(s)}else{const s=document.createElement("div");s.className="rx-related-cover rx-related-cover-empty",a.appendChild(s)}const l=document.createElement("div");l.className="rx-related-text";const c=document.createElement("span");if(c.className="rx-related-title",c.textContent=e.title,l.appendChild(c),e.subtitle){const s=document.createElement("span");s.className="rx-related-subtitle",s.textContent=e.subtitle,l.appendChild(s)}if(a.appendChild(l),e.read){const s=document.createElement("span");s.className="rx-related-badge",s.textContent="Read",a.appendChild(s)}a.addEventListener("click",()=>n(e)),o.appendChild(a)}t.appendChild(o)}function ot(t,r){return it(t,r,1)}function st(t,r){return it(t,r,-1)}function it(t,r,n){if(t.length===0)return r;const o=t.indexOf(r);if(o===-1)return t[0];const e=(o+n+t.length)%t.length;return t[e]}function Rt(t,r){return ot(t,r)}function $t(t,r){return st(t,r)}const _t=40;function Dt(t,r){return Math.abs(t)>=_t&&Math.abs(t)>Math.abs(r)}function lt(t,r,n,o){return Dt(r,n)?t==="sidebar"?{action:r<0?"cycle-next":"cycle-prev"}:t==="book"&&o?{action:"close"}:{action:null}:{action:null}}function ct(t,r,n){return t&&r.contains(t)?"sidebar":t&&n.contains(t)&&!r.contains(t)?"book":"other"}function dt(t,r){let n=0,o=0,e=0,a=0,i=null,l=!1,c=!1;function s(h,A,z,C){n=e=h,o=a=A,i=z,l=!0,c=C}function g(){l&&(l=!1,r.onSwipe(e-n,a-o,i),i=null)}function x(h){h.pointerType!=="pen"&&s(h.clientX,h.clientY,h.target,h.pointerType==="touch")}function f(h){l&&(e=h.clientX,a=h.clientY)}function d(h){e=h.clientX,a=h.clientY,g()}function p(){c||g()}function m(h){if(!l)return;const A=h.touches[0];A&&(e=A.clientX,a=A.clientY)}function v(){g()}return t.addEventListener("pointerdown",x),t.addEventListener("pointermove",f),t.addEventListener("pointerup",d),t.addEventListener("pointercancel",p),t.addEventListener("touchmove",m,{passive:!0}),t.addEventListener("touchend",v,{passive:!0}),{destroy(){t.removeEventListener("pointerdown",x),t.removeEventListener("pointermove",f),t.removeEventListener("pointerup",d),t.removeEventListener("pointercancel",p),t.removeEventListener("touchmove",m),t.removeEventListener("touchend",v)}}}function Gt(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function Vt(t){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const e=Gt(t);if(e.length===0){o.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],l=t.ownerDocument.activeElement;o.shiftKey&&l===a?(o.preventDefault(),i.focus()):!o.shiftKey&&l===i&&(o.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const De="reactor-left-sidebar-stylesheet";function Wt(t){if(t.getElementById(De))return;const r=t.createElement("style");r.id=De,r.textContent=Bt,t.head.appendChild(r)}function qt(t,r,n={}){var k,I;const o=t.ownerDocument??document;Wt(o);const e=Tt(t);e.root.classList.add("closed");const a=["contents","starred"];(k=n.capabilities)!=null&&k.related&&a.push("related"),e.tabRelated.hidden=!((I=n.capabilities)!=null&&I.related);let i="contents",l=!1,c=!1,s=[];const g=new Set;let x=null,f=null;const d=new Set;let p=[],m=[];const v=Vt(e.root);let h=null;function A(){return!t.classList.contains("size-desktop")}function z(w){return w==="contents"?e.panelContents:w==="starred"?e.panelStarred:e.panelRelated}function C(w){return w==="contents"?e.tabContents:w==="starred"?e.tabStarred:e.tabRelated}function T(){i==="contents"?Ht(e.tocScroll,e.tocSpacer,e.tocWindow,{flat:s,collapsed:g,currentHref:x,currentChapterTitle:f,starred:d},{onActivate:w=>{w.href&&r(w.href),A()&&N()},onToggleExpand:w=>{g.has(w.id)?g.delete(w.id):g.add(w.id),T()},onToggleStar:w=>{var W;if(!w.href)return;const H=!d.has(w.href);H?d.add(w.href):d.delete(w.href),(W=n.onStarToggle)==null||W.call(n,w.href,w.label,H),T()}}):i==="starred"?Ot(e.panelStarred,p,w=>{r(w.href),A()&&N()}):Ft(e.panelRelated,m,w=>{var H;(H=n.onOpenRelated)==null||H.call(n,w.id),A()&&N()})}function S(w){w!==i&&(C(i).setAttribute("aria-selected","false"),z(i).hidden=!0,i=w,C(i).setAttribute("aria-selected","true"),z(i).hidden=!1,T())}function B(w){const H=w===1?Rt(a,i):$t(a,i);S(H)}e.tabContents.addEventListener("click",()=>S("contents")),e.tabStarred.addEventListener("click",()=>S("starred")),e.tabRelated.addEventListener("click",()=>S("related")),S("contents"),C("contents").setAttribute("aria-selected","true"),z("contents").hidden=!1;function P(){var H;if(l)return;l=!0,h=o.activeElement??null,e.root.classList.add("open"),e.root.classList.remove("closed"),t.classList.add("rx-left-sidebar-open"),e.scrim.classList.toggle("visible",A());const w=A();e.root.setAttribute("role",w?"dialog":"complementary"),w?e.root.setAttribute("aria-modal","true"):e.root.removeAttribute("aria-modal"),w&&(v.activate(),e.root.focus()),(H=n.onSidebarChange)==null||H.call(n,!0)}function N(){var w,H;l&&(l=!1,e.root.classList.remove("open"),e.root.classList.add("closed"),t.classList.remove("rx-left-sidebar-open"),e.scrim.classList.remove("visible"),v.deactivate(),(w=h==null?void 0:h.focus)==null||w.call(h),h=null,(H=n.onSidebarChange)==null||H.call(n,!1))}e.closeBtn.addEventListener("click",N),e.scrim.addEventListener("click",N),e.backBtn.addEventListener("click",()=>{var w;return(w=n.onBack)==null?void 0:w.call(n)});const _=dt(t,{onSwipe:(w,H,W)=>{const ee=ct(W,e.root,t),j=lt(ee,w,H,A());!l&&j.action!==null||(j.action==="cycle-next"?B(1):j.action==="cycle-prev"?B(-1):j.action==="close"&&N())}});function O(w){s=at(w),g.clear(),i==="contents"&&T()}function D(w){p=w,d.clear();for(const H of w)d.add(H.href);(i==="starred"||i==="contents")&&T()}function F(w){m=w,i==="related"&&T()}function R(w){x=w,i==="contents"&&T()}function V(w){f=w,i==="contents"&&T()}function b(){c||(c=!0,_.destroy(),e.closeBtn.removeEventListener("click",N),e.scrim.removeEventListener("click",N),v.deactivate(),t.classList.remove("rx-left-sidebar-open"),e.root.remove(),e.scrim.remove())}return{open:P,close:N,isOpen:()=>l,cycleTab:B,getActiveTab:()=>i,setToc:O,setStarred:D,setRelated:F,setCurrentHref:R,setCurrentChapterTitle:V,destroy:b}}function Ae(t,r,n){const o=document.createElement("button");return o.type="button",o.className="rx-sidebar-tab",o.textContent=t,o.setAttribute("role","tab"),o.setAttribute("aria-selected",String(r)),o.dataset.tab=n,r&&o.classList.add("active"),o}function Ut(t){const r=t.createElement("div");r.className="rx-right-sidebar",r.setAttribute("role","complementary"),r.setAttribute("aria-label","Context panel");const n=t.createElement("div");n.className="rx-sidebar-resize",n.setAttribute("role","separator"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-label","Resize context panel"),n.setAttribute("tabindex","0");const o=t.createElement("div");o.className="rx-sidebar-tabs";const e=t.createElement("div");e.className="rx-sidebar-tablist",e.setAttribute("role","tablist");const a=Ae("Context",!0,"context"),i=Ae("Glossary",!1,"glossary"),l=Ae("Notes",!1,"notes");l.disabled=!0;const c=t.createElement("button");c.type="button",c.className="rx-icon-btn rx-sidebar-close",c.setAttribute("aria-label","Close panel"),c.textContent="✕",e.append(a,i,l),o.append(e,c);const s=t.createElement("div");s.className="rx-ctx-searchbar",s.setAttribute("role","search");const g=t.createElement("input");g.type="search",g.className="rx-ctx-search-input",g.placeholder="Search this book",g.setAttribute("aria-label","Search this book");const x=t.createElement("button");x.type="button",x.className="rx-icon-btn rx-ctx-openmain",x.setAttribute("aria-label","Open in main window"),x.disabled=!0,x.textContent="↗";const f=t.createElement("div");f.className="rx-ctx-crumbs",f.setAttribute("aria-live","polite"),s.append(g,x,f);const d=t.createElement("div");d.className="rx-sidebar-body";const p=t.createElement("div");p.className="rx-ctx-results";const m=t.createElement("div");m.className="rx-ctx-page",m.hidden=!0;const v=t.createElement("div");v.className="rx-notes-body",v.hidden=!0;const h=t.createElement("div");return h.className="rx-glossary-panel-mount",h.hidden=!0,d.append(p,m,v,h),r.append(n,o,s,d),{root:r,resizeHandle:n,tabsRow:o,contextTabBtn:a,glossaryTabBtn:i,notesTabBtn:l,closeBtn:c,searchBar:s,searchInput:g,openInMainBtn:x,breadcrumb:f,body:d,resultsScroller:p,contextPage:m,notesBody:v,glossaryPanelMount:h}}const Kt=`
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
`;class Yt{constructor(){$(this,"rows",[]);$(this,"headerAt",new Map)}reset(){this.rows=[],this.headerAt.clear()}addGroup(r,n){if(n.length!==0){this.headerAt.has(r)||(this.headerAt.set(r,this.rows.length),this.rows.push({kind:"header",label:r}));for(const o of n)this.rows.push({kind:"item",item:o,groupLabel:r})}}get rowCount(){return this.rows.length}rowAt(r){return this.rows[r]}get isEmpty(){return this.rows.length===0}}class ut{constructor(r){$(this,"container");$(this,"rowHeight");$(this,"buffer");$(this,"opts");$(this,"topSpacer");$(this,"bottomSpacer");$(this,"rowsEl");$(this,"onScroll");$(this,"destroyed",!1);this.opts=r,this.container=r.container,this.rowHeight=r.rowHeight,this.buffer=r.buffer??6,this.topSpacer=document.createElement("div"),this.topSpacer.className="rx-wlist-spacer",this.bottomSpacer=document.createElement("div"),this.bottomSpacer.className="rx-wlist-spacer",this.rowsEl=document.createElement("div"),this.rowsEl.className="rx-wlist-rows",this.rowsEl.setAttribute("role","list"),this.container.replaceChildren(this.topSpacer,this.rowsEl,this.bottomSpacer),this.onScroll=()=>this.render(),this.container.addEventListener("scroll",this.onScroll)}visibleRange(){const r=this.opts.rowCount(),n=this.container.clientHeight||1,o=this.container.scrollTop||0,e=Math.max(0,Math.floor(o/this.rowHeight)-this.buffer),a=Math.ceil(n/this.rowHeight)+this.buffer*2,i=Math.min(r,e+a);return{first:e,last:i}}render(){if(this.destroyed)return;const r=this.opts.rowCount(),{first:n,last:o}=this.visibleRange();this.topSpacer.style.height=`${n*this.rowHeight}px`,this.bottomSpacer.style.height=`${Math.max(0,r-o)*this.rowHeight}px`,this.rowsEl.replaceChildren();for(let e=n;e<o;e++)this.rowsEl.appendChild(this.opts.renderRow(e))}destroy(){this.destroyed||(this.destroyed=!0,this.container.removeEventListener("scroll",this.onScroll),this.container.replaceChildren())}}function jt(t,r){return t.kind!==r.kind?!1:t.kind==="page"&&r.kind==="page"?t.target===r.target:!0}class Xt{constructor(){$(this,"stack",[{kind:"blank"}]);$(this,"index",0)}get current(){return this.stack[this.index]??{kind:"blank"}}get canGoBack(){return this.index>0}get canGoForward(){return this.index<this.stack.length-1}push(r){jt(this.current,r)||(this.stack=this.stack.slice(0,this.index+1),this.stack.push(r),this.index=this.stack.length-1)}back(){return this.canGoBack?(this.index-=1,this.current):null}forward(){return this.canGoForward?(this.index+=1,this.current):null}reset(){this.stack=[{kind:"blank"}],this.index=0}}const Zt={"fold-tablet":320,desktop:340},Ee=240,Ge=16,Jt={"fold-tablet":.6,desktop:.7};function Qt(t,r,n){const o=Jt[n],e=Math.max(Ee,r*o);return t<Ee?Ee:t>e?e:t}const pt=new WeakMap;function Te(t){return pt.get(t)??{left:0,right:0,bottom:0}}function ce(t,r){const n={left:Math.max(0,r.left??Te(t).left),right:Math.max(0,r.right??Te(t).right),bottom:Math.max(0,r.bottom??Te(t).bottom)};return pt.set(t,n),t.style.setProperty("--rx-book-inset-left",`${n.left}px`),t.style.setProperty("--rx-book-inset-right",`${n.right}px`),t.style.setProperty("--rx-book-inset-bottom",`${n.bottom}px`),t.style.paddingLeft=n.left?`${n.left}px`:"",t.style.paddingRight=n.right?`${n.right}px`:"",t.style.paddingBottom=n.bottom?`${n.bottom}px`:"",n}const er=[{id:"all",label:"All"},{id:"highlight",label:"Highlight"},{id:"underline",label:"Underline"},{id:"note",label:"Typed note"},{id:"handwritten",label:"Handwritten"},{id:"bookmark",label:"Bookmark"}],tr=[{id:"position",label:"Position in book"},{id:"date",label:"Date"},{id:"colour",label:"Colour"},{id:"type",label:"Type"}];function rr(t){const r=t.createElement("div");r.className="rx-notes-panel";const n=t.createElement("div");n.className="rx-notes-searchbar",n.setAttribute("role","search");const o=t.createElement("input");o.type="search",o.className="rx-notes-search-input",o.placeholder="Search notes",o.setAttribute("aria-label","Search notes"),n.append(o);const e=t.createElement("select");e.className="rx-notes-sort",e.setAttribute("aria-label","Sort notes by");for(const{id:s,label:g}of tr){const x=t.createElement("option");x.value=s,x.textContent=g,e.append(x)}n.append(e);const a=t.createElement("div");a.className="rx-notes-filters",a.setAttribute("role","group"),a.setAttribute("aria-label","Filter notes by type");const i={};for(const{id:s,label:g}of er){const x=t.createElement("button");x.type="button",x.className="rx-notes-chip",x.textContent=g,x.setAttribute("aria-pressed",String(s==="all")),s==="all"&&x.classList.add("active"),x.dataset.filter=s,a.append(x),i[s]=x}const l=t.createElement("div");l.className="rx-notes-banner",l.hidden=!0,l.textContent="No annotation store connected. Notes made in this session are not saved.";const c=t.createElement("div");return c.className="rx-notes-list",r.append(n,a,l,c),{root:r,searchBar:n,searchInput:o,filterRow:a,filterButtons:i,sortSelect:e,capabilityBanner:l,listScroller:c}}const nr=`
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
`,ar=100,or=20;function sr(t){return t==="all"?null:t}class ir{constructor(r){$(this,"total",0);$(this,"offset",0);$(this,"items",[]);$(this,"state",{filter:"all",sort:"position",query:null});$(this,"lastRequestedOffset",null);$(this,"everRequested",!1);this.hostChannel=r}getState(){return this.state}setState(r){this.state={...this.state,...r},this.total=0,this.offset=0,this.items=[],this.lastRequestedOffset=null,this.requestPage(0)}ensureInitialLoad(){this.everRequested||this.requestPage(0)}rowCount(){return this.total}rowAt(r){const n=r-this.offset;if(!(n<0||n>=this.items.length))return this.items[n]}ensureLoaded(r,n){const o=Math.max(r,n-1);if(this.rowAt(r)&&this.rowAt(o))return;const e=Math.max(0,r-or);this.lastRequestedOffset!==e&&this.requestPage(e)}requestPage(r){this.everRequested=!0,this.lastRequestedOffset=r,this.hostChannel.emitIntent({type:"notesPageRequest",offset:r,limit:ar,filter:sr(this.state.filter),sort:this.state.sort,query:this.state.query})}applyWindow(r){this.total=r.total,this.offset=r.offset,this.items=r.items,this.lastRequestedOffset=null}}const Ve="reactor-notes-stylesheet",lr=48,cr=200,We={highlight:"Highlight",underline:"Underline",note:"Typed note",bookmark:"Bookmark"};function dr(t,r){return r?`${We[t]} · ${r}`:We[t]}function ur({container:t,core:r,hostChannel:n,options:o={}}){const e=t.ownerDocument??document;if(!e.getElementById(Ve)){const S=e.createElement("style");S.id=Ve,S.textContent=nr,e.head.appendChild(S)}const a=rr(e);t.append(a.root);const i=new ir(n);let l=!1,c=null;const s=new Map,g=new Set;function x(S){s.has(S)||g.has(S)||typeof r.getChapterTitleForCfi=="function"&&(g.add(S),r.getChapterTitleForCfi(S).then(B=>{s.set(S,B)}).catch(()=>{s.set(S,null)}).finally(()=>{g.delete(S),!l&&d.render()}))}function f(S){i.ensureLoaded(S,S+1);const B=i.rowAt(S);if(!B){const V=e.createElement("div");return V.className="rx-notes-loading-row",V.setAttribute("role","listitem"),V.textContent="Loading…",V}const P=e.createElement("button");P.type="button",P.className="rx-notes-row";const N=e.createElement("span");N.className="rx-notes-row-swatch",B.color&&N.style.setProperty("--rx-notes-row-color",B.color);const _=e.createElement("span");_.className="rx-notes-row-body";const O=e.createElement("span");O.className="rx-notes-row-snippet",O.textContent=B.note??B.text??"";const D=e.createElement("span");D.className="rx-notes-row-meta";const F=s.get(B.cfi);D.textContent=dr(B.kind,F??null),_.append(O,D),P.append(N,_),P.setAttribute("aria-label",`${D.textContent}: ${O.textContent}`),F===void 0&&x(B.cfi),P.addEventListener("click",()=>r.goTo(B.cfi));const R=e.createElement("div");return R.setAttribute("role","listitem"),R.appendChild(P),R}const d=new ut({container:a.listScroller,rowHeight:lr,rowCount:()=>i.rowCount(),renderRow:f});function p(S){const B=S.currentTarget,P=B.dataset.filter??"all";for(const N of Object.values(a.filterButtons))N.classList.toggle("active",N===B),N.setAttribute("aria-pressed",String(N===B));i.setState({filter:P}),d.render()}for(const S of Object.values(a.filterButtons))S.addEventListener("click",p);function m(){i.setState({sort:a.sortSelect.value}),d.render()}a.sortSelect.addEventListener("change",m);function v(){c&&clearTimeout(c),c=setTimeout(()=>{i.setState({query:a.searchInput.value.trim()||null}),d.render()},cr)}a.searchInput.addEventListener("input",v);function h(S){S.type==="setNotes"&&(i.applyWindow(S),d.render())}const A=n.onCommand(h);function z(){var S;a.capabilityBanner.hidden=((S=n.getConfig())==null?void 0:S.capabilities.notes)!==!1,i.ensureInitialLoad(),d.render()}function C(){d.render()}function T(){if(!l){l=!0,c&&clearTimeout(c),A();for(const S of Object.values(a.filterButtons))S.removeEventListener("click",p);a.sortSelect.removeEventListener("change",m),a.searchInput.removeEventListener("input",v),d.destroy(),a.root.remove()}}return{onActivate:z,refresh:C,destroy:T}}function pr(t){const r=t.createElement("div");r.className="rx-glossary-panel",r.style.position="absolute",r.style.inset="0";const n=t.createElement("div");n.className="rx-glossary-search",n.setAttribute("role","search");const o=t.createElement("input");o.type="search",o.className="rx-glossary-search-input",o.placeholder="Search glossary",o.setAttribute("aria-label","Search glossary"),n.appendChild(o);const e=t.createElement("div");return e.className="rx-glossary-list",e.setAttribute("role","list"),r.append(n,e),{root:r,searchInput:o,list:e}}const hr=900;function xr(t){const r=t.ownerDocument??document,n=pr(r);t.appendChild(n.root);let o=[],e="",a=!1;function i(){const f=e.trim().toLowerCase();return[...f?o.filter(p=>p.term.toLowerCase().includes(f)):o].sort((p,m)=>p.term.localeCompare(m.term))}function l(){if(a)return;const f=i();if(n.list.replaceChildren(),!o.length){n.list.removeAttribute("role");const d=r.createElement("div");d.className="rx-glossary-empty",d.textContent="This book has no glossary.",n.list.appendChild(d);return}if(!f.length){n.list.removeAttribute("role");const d=r.createElement("div");d.className="rx-glossary-empty",d.textContent=`No terms match "${e}".`,n.list.appendChild(d);return}n.list.setAttribute("role","list");for(const d of f){let p=function(){const A=m.classList.toggle("expanded");v.setAttribute("aria-expanded",String(A))};const m=r.createElement("div");m.className="rx-glossary-item",m.setAttribute("role","listitem"),m.setAttribute("data-term",d.term);const v=r.createElement("button");v.type="button",v.className="rx-glossary-term-row",v.setAttribute("role","button"),v.setAttribute("aria-expanded","false"),v.textContent=d.term;const h=r.createElement("div");h.className="rx-glossary-def",h.textContent=d.definition,v.addEventListener("click",p),m.append(v,h),n.list.appendChild(m)}}function c(){e=n.searchInput.value,l()}n.searchInput.addEventListener("input",c),l();function s(f){o=f,l()}function g(f){var p,m;e&&(e="",n.searchInput.value="",l());const d=n.list.querySelector(`.rx-glossary-item[data-term="${CSS.escape(f)}"]`);d&&(d.classList.add("expanded"),(p=d.querySelector(".rx-glossary-term-row"))==null||p.setAttribute("aria-expanded","true"),(m=d.scrollIntoView)==null||m.call(d,{block:"center"}),d.classList.add("flash"),setTimeout(()=>d.classList.remove("flash"),hr))}function x(){a||(a=!0,n.searchInput.removeEventListener("input",c),n.root.remove())}return{setTerms:s,scrollToAndFlash:g,destroy:x}}const qe=9,fe=8,Ue=16;function br(t,r,n,o){const e=t.top+t.height;let a=t.left;a=Math.min(Math.max(fe,a),Math.max(fe,r.width-n-fe));let i=e+qe,l=!1;if(i+o>r.height-fe){const s=t.top-o-qe;i=Math.max(fe,s),l=!0}const c=Math.max(Ue,Math.min(n-Ue,t.left+t.width/2-a));return{left:a,top:i,above:l,arrowX:c}}const fr='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';function mr(t,r,n){const o=t.ownerDocument??document;let e=null,a=!1;function i(){var d;const f=!!e;e==null||e.remove(),e=null,f&&((d=t.querySelector("iframe"))==null||d.focus())}function l(f,d){var z;i();const p=o.createElement("div");p.className="rx-glossary-popover",p.setAttribute("role","dialog"),p.setAttribute("aria-label",`${f.term} definition`),p.innerHTML=`
      <div class="rx-glossary-popover-head">
        <h4 class="rx-glossary-popover-term"></h4>
        <button type="button" class="rx-icon-btn rx-glossary-popover-open" aria-label="Open in glossary" title="Open in glossary">${fr}</button>
      </div>
      <p class="rx-glossary-popover-def"></p>
    `,p.querySelector(".rx-glossary-popover-term").textContent=f.term,p.querySelector(".rx-glossary-popover-def").textContent=f.definition,t.appendChild(p),e=p;const m=t.getBoundingClientRect(),v={left:d.left-m.left,top:d.top-m.top,width:d.width,height:d.height},h={width:m.width,height:m.height},A=br(v,h,p.offsetWidth,p.offsetHeight||120);p.style.left=`${A.left}px`,p.style.top=`${A.top}px`,p.classList.toggle("above",A.above),p.style.setProperty("--arrow-x",`${A.arrowX}px`),p.querySelector(".rx-glossary-popover-open").addEventListener("click",C=>{C.stopPropagation(),i(),n.onOpenInGlossary(f.term)}),(z=p.querySelector(".rx-glossary-popover-open"))==null||z.focus()}async function c(f,d){const p=await r.getGlossaryTerms();if(a)return;const m=p.find(v=>v.term.toLowerCase()===f.toLowerCase());m&&l(m,d)}const s=r.onGlossaryTermTap(c);function g(f){var p;if(!e)return;const d=f.target;(p=d==null?void 0:d.closest)!=null&&p.call(d,".rx-glossary-popover")||i()}o.addEventListener("click",g);function x(){a||(a=!0,s(),o.removeEventListener("click",g),i())}return{isOpen:()=>e!==null,close:i,destroy:x}}const gr=`
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
`,Ke="reactor-right-sidebar-stylesheet",Ye="reactor-glossary-stylesheet",vr=48,yr=200;function kr(t){if(!t.getElementById(Ke)){const r=t.createElement("style");r.id=Ke,r.textContent=Kt,t.head.appendChild(r)}if(!t.getElementById(Ye)){const r=t.createElement("style");r.id=Ye,r.textContent=gr,t.head.appendChild(r)}}function wr(t){const r=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`${r(t.pre)}<mark>${r(t.match)}</mark>${r(t.post)}`}function Er(t,r,n){var xe,be;const o=t.ownerDocument??document;kr(o);const e=Ut(o),a=o.createElement("div");a.className="rx-sidebar-scrim",t.append(a,e.root);const i=new Yt,l=new Xt,c=xr(e.glossaryPanelMount);let s="context",g=null,x=!1,f=!1,d=null;const p=!!n.hostChannel&&((xe=n.hostChannel.getConfig())==null?void 0:xe.capabilities.notes)!==!1;e.notesTabBtn.disabled=!p;const m=p?ur({container:e.notesBody,core:r,hostChannel:n.hostChannel}):null;((be=n.capabilities)==null?void 0:be.glossary)===!1&&(e.glossaryTabBtn.hidden=!0);const v=["context"];e.glossaryTabBtn.hidden!==!0&&v.push("glossary"),p&&v.push("notes");function h(){return n.getSizeClass()==="phone"}function A(y){const M=y===1?ot(v,s):st(v,s);z(M)}function z(y){y!==s&&(s=y,e.contextTabBtn.classList.toggle("active",y==="context"),e.contextTabBtn.setAttribute("aria-selected",String(y==="context")),e.glossaryTabBtn.classList.toggle("active",y==="glossary"),e.glossaryTabBtn.setAttribute("aria-selected",String(y==="glossary")),e.notesTabBtn.classList.toggle("active",y==="notes"),e.notesTabBtn.setAttribute("aria-selected",String(y==="notes")),e.searchBar.hidden=y!=="context",e.glossaryPanelMount.hidden=y!=="glossary",e.notesBody.hidden=y!=="notes",y==="context"?R(l.current):y==="glossary"?(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,r.getGlossaryTerms().then(M=>c.setTerms(M))):(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,m==null||m.onActivate()))}const C=()=>z("context"),T=()=>z("glossary"),S=()=>z("notes");e.contextTabBtn.addEventListener("click",C),e.glossaryTabBtn.addEventListener("click",T),e.notesTabBtn.addEventListener("click",S);function B(y){const M=i.rowAt(y);if(!M)return o.createElement("div");if(M.kind==="header"){const Q=o.createElement("div");return Q.className="rx-ctx-group-header",Q.setAttribute("role","listitem"),Q.textContent=M.label,Q}const J=o.createElement("button");J.type="button",J.className="rx-ctx-result",J.setAttribute("role","listitem"),J.innerHTML=wr(M.item),J.addEventListener("click",()=>k(M.item,M.groupLabel));const ne=o.createElement("div");return ne.setAttribute("role","listitem"),ne.appendChild(J),ne}const P=new ut({container:e.resultsScroller,rowHeight:vr,rowCount:()=>i.rowCount,renderRow:B});function N(){e.breadcrumb.replaceChildren();const y=o.createElement("button");y.type="button",y.textContent="Back",y.disabled=!l.canGoBack,y.setAttribute("aria-label","Back"),y.addEventListener("click",V);const M=o.createElement("button");M.type="button",M.textContent="Forward",M.disabled=!l.canGoForward,M.setAttribute("aria-label","Forward"),M.addEventListener("click",b),e.breadcrumb.append(y,M),e.openInMainBtn.disabled=l.current.kind!=="page"}function _(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,P.render()}function O(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,P.render()}function D(){return g||(g=r.createSecondaryView(e.contextPage),g)}function F(y){e.resultsScroller.hidden=!0,e.contextPage.hidden=!1;const M=D();M&&M.goTo(y)}function R(y){y.kind==="blank"?O():y.kind==="results"?_():F(y.target),N()}function V(){const y=l.back();y&&R(y)}function b(){const y=l.forward();y&&R(y)}function k(y,M){l.push({kind:"page",target:y.cfi,label:M}),R(l.current)}function I(){const y=e.searchInput.value.trim();i.reset(),y?l.current.kind!=="results"&&l.push({kind:"results"}):l.reset(),R(l.current),d&&clearTimeout(d),y&&(d=setTimeout(()=>r.runSearch(y),yr))}e.searchInput.addEventListener("input",I);function w(y){y.type==="searchResults"?(i.addGroup(y.label,y.items),l.current.kind==="results"&&P.render()):y.type==="loaded"&&c.setTerms([])}const H=r.on(w);function W(){const y=l.current;y.kind==="page"&&(r.goTo(y.target),n.getSizeClass()==="phone"&&Y())}e.openInMainBtn.addEventListener("click",W);function ee(){Y()}e.closeBtn.addEventListener("click",ee);const j=()=>Y();a.addEventListener("click",j);function K(){const y=getComputedStyle(t).getPropertyValue("--rx-ctx-width"),M=parseFloat(y);if(!Number.isNaN(M)&&M>0)return M;const J=n.getSizeClass();return J==="phone"?Ee:Zt[J]}e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(K())));function X(y,M){var Q;const J=n.getSizeClass();if(J==="phone")return;const ne=Qt(y,t.clientWidth||1200,J);t.style.setProperty("--rx-ctx-width",`${ne}px`),e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(ne))),x&&ce(t,{right:ne}),M&&((Q=n.onWidthChange)==null||Q.call(n,ne))}let te=!1,re=0,q=0;function ae(y){te=!0,re=y.clientX,q=K(),t.classList.add("right-sidebar-resizing"),o.addEventListener("pointermove",U),o.addEventListener("pointerup",le)}function U(y){te&&X(q-(y.clientX-re),!1)}function le(){te&&(te=!1,t.classList.remove("right-sidebar-resizing"),o.removeEventListener("pointermove",U),o.removeEventListener("pointerup",le),X(K(),!0))}function de(y){y.key==="ArrowLeft"?(y.preventDefault(),X(K()+Ge,!0)):y.key==="ArrowRight"&&(y.preventDefault(),X(K()-Ge,!0))}e.resizeHandle.addEventListener("pointerdown",ae),e.resizeHandle.addEventListener("keydown",de);const ue=dt(t,{onSwipe:(y,M,J)=>{const ne=ct(J,e.root,t),Q=lt(ne,y,M,h());!x&&Q.action!==null||(Q.action==="cycle-next"?A(1):Q.action==="cycle-prev"?A(-1):Q.action==="close"&&Y())}});function oe(){x||(x=!0,t.classList.add("right-sidebar-open"),X(K(),!1),P.render(),s==="notes"&&(m==null||m.refresh()))}function Y(){var y;x&&(x=!1,t.classList.remove("right-sidebar-open"),ce(t,{right:0}),(y=n.onClose)==null||y.call(n))}function u(){x?Y():oe()}function L(y){x||oe(),z("glossary"),r.getGlossaryTerms().then(M=>{c.setTerms(M),c.scrollToAndFlash(y)})}function Z(){x&&(n.getSizeClass()==="phone"?ce(t,{right:0}):ce(t,{right:K()}))}R(l.current);function se(){f||(f=!0,d&&clearTimeout(d),H(),e.searchInput.removeEventListener("input",I),e.openInMainBtn.removeEventListener("click",W),e.closeBtn.removeEventListener("click",ee),a.removeEventListener("click",j),e.resizeHandle.removeEventListener("pointerdown",ae),o.removeEventListener("pointermove",U),o.removeEventListener("pointerup",le),e.resizeHandle.removeEventListener("keydown",de),ue.destroy(),e.contextTabBtn.removeEventListener("click",C),e.notesTabBtn.removeEventListener("click",S),m==null||m.destroy(),e.glossaryTabBtn.removeEventListener("click",T),c.destroy(),P.destroy(),g==null||g.destroy(),t.classList.remove("right-sidebar-open","right-sidebar-resizing"),ce(t,{right:0}),e.root.remove(),a.remove())}return{open:oe,close:Y,toggle:u,isOpen:()=>x,destroy:se,refreshLayout:Z,openGlossaryTerm:L}}function ke(t,r){const n=document.createElement("button");return n.type="button",n.className=r,n.setAttribute("aria-label",t),n}function Sr(t){const r=t.createElement("div");r.className="rx-playback-bar",r.setAttribute("role","group"),r.setAttribute("aria-label","Narration transport");const n=ke("Skip back 15 seconds","rx-playback-icon-btn rx-playback-skip-back");n.innerHTML=ge("skip_back");const o=ke("Play","rx-playback-icon-btn rx-playback-play-pause");o.setAttribute("aria-pressed","false"),o.innerHTML=ge("play");const e=ke("Skip forward 15 seconds","rx-playback-icon-btn rx-playback-skip-forward");e.innerHTML=ge("skip_forward");const a=ke("Playback speed","rx-playback-rate-btn");a.textContent="1x";const i=t.createElement("div");i.className="rx-playback-info";const l=t.createElement("span");l.className="rx-playback-chapter",l.setAttribute("aria-live","polite");const c=t.createElement("span");return c.className="rx-playback-position",c.textContent="0:00",i.append(l,c),r.append(n,o,e,i,a),{root:r,skipBackBtn:n,playPauseBtn:o,skipForwardBtn:e,rateBtn:a,chapterLabel:l,positionLabel:c}}const Cr=`
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
`;class Lr{constructor(){$(this,"timeline",null);$(this,"activeAudioIndex",0)}setTimeline(r){this.timeline=r,this.activeAudioIndex=0}clear(){this.timeline=null,this.activeAudioIndex=0}hasTimeline(){return this.timeline!==null}itemFor(r){const n=this.timeline;if(!n)return null;const o=a=>a.beginSec<=r&&(a.endSec===null||r<a.endSec);let e=n.items.filter(a=>a.audioIndex===this.activeAudioIndex&&o(a));if(e.length===0){e=n.items.filter(o);const a=e[0];a&&(this.activeAudioIndex=a.audioIndex)}return e.length===0?null:e.reduce((a,i)=>i.beginSec>a.beginSec?i:a)}textHrefFor(r){var n;return((n=this.itemFor(r))==null?void 0:n.textHref)??null}}const je="reactor-playback-stylesheet",Xe=15,ve=[.75,1,1.25,1.5,1.75,2];function Ar(t){if(t.getElementById(je))return;const r=t.createElement("style");r.id=je,r.textContent=Cr,t.head.appendChild(r)}function Tr(t){const r=Number.isFinite(t)&&t>0?t:0,n=Math.floor(r),o=Math.floor(n/60),e=n%60;return`${o}:${String(e).padStart(2,"0")}`}function Ze(t){return ve.reduce((r,n)=>Math.abs(n-t)<Math.abs(r-t)?n:r,ve[0]??1)}function Br(t,r,n,o={}){const e=t.ownerDocument??document;Ar(e);let a=null,i=!1,l=!1,c=!1,s=!1,g=0,x=1,f=!1,d=0,p=!1;const m=new Lr;function v(k,I=null,w=null){n.emitIntent({type:"playback",action:k,positionSec:I,rate:w})}const h=()=>v(s?"pause":"play"),A=()=>v("seek",Math.max(0,g-Xe)),z=()=>v("seek",g+Xe),C=()=>{const k=ve.indexOf(Ze(x)),I=ve[(k+1)%ve.length]??1;v("rateChange",null,I)};function T(){a&&(a.playPauseBtn.setAttribute("aria-pressed",String(s)),a.playPauseBtn.setAttribute("aria-label",s?"Pause":"Play"),a.playPauseBtn.innerHTML=ge(s?"pause":"play"),a.positionLabel.textContent=Tr(g),a.rateBtn.textContent=`${Ze(x)}x`,S())}function S(){a&&a.root.classList.toggle("rx-playback-chrome-hidden",!p&&!s)}function B(k){a&&a.chapterLabel.textContent!==(k??"")&&(a.chapterLabel.textContent=k??"")}function P(){i||l||(i=!0,a=Sr(e),a.root.classList.toggle("e-ink",!!o.eink),t.appendChild(a.root),a.playPauseBtn.addEventListener("click",h),a.skipBackBtn.addEventListener("click",A),a.skipForwardBtn.addEventListener("click",z),a.rateBtn.addEventListener("click",C),ce(t,{bottom:a.root.offsetHeight||56}),T(),N())}function N(){!i||!f||(d+=1,r.narrationPrepare(d))}function _(){if(!i||!f)return;const k=m.textHrefFor(g);k?r.narrationHighlight(k):r.narrationUnhighlight()}function O(k){switch(k.type){case"loaded":f=k.hasMediaOverlay,m.clear(),N();break;case"relocate":B(k.chapterTitle);break;case"narrationTimeline":k.generation===d&&(m.setTimeline(k),_());break;case"narrationTimelineError":k.generation===d&&m.clear();break}}const D=r.on(O);r.replayLastEvents(O);function F(k){if(k.type==="configure"){if(c)return;c=!0,k.capabilities.playback&&P()}else if(k.type==="setPlaybackState"){if(!i)return;s=k.playing,g=k.positionSec,x=k.rate,T(),_()}}const R=n.onCommand(F),V=n.getConfig();V&&F(V);function b(){l||(l=!0,D(),R(),a&&(a.playPauseBtn.removeEventListener("click",h),a.skipBackBtn.removeEventListener("click",A),a.skipForwardBtn.removeEventListener("click",z),a.rateBtn.removeEventListener("click",C),a.root.remove(),ce(t,{bottom:0})))}return{isVisible:()=>i,setChromeVisible:k=>{p=k,S()},destroy:b}}const Be={highlight:"Highlight",underline:"Underline",strikethrough:"Strikethrough",squiggly:"Squiggly underline"};function Nr(t){const r=t.createElement("div");r.className="rx-anno-popover",r.setAttribute("role","dialog"),r.setAttribute("aria-label","Annotation"),r.hidden=!0;const n=t.createElement("div");n.className="rx-anno-status",n.setAttribute("aria-live","polite");const o=t.createElement("button");o.type="button",o.className="rx-icon-btn rx-anno-close",o.setAttribute("aria-label","Close"),o.textContent="✕";const e=t.createElement("div");e.className="rx-anno-header",e.append(n,o);const a=t.createElement("div");a.className="rx-anno-colors",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Colour");const i=bt.map(v=>{const h=t.createElement("button");return h.type="button",h.className="rx-anno-swatch",h.style.setProperty("--rx-anno-swatch-color",v.value),h.setAttribute("role","radio"),h.setAttribute("aria-checked","false"),h.setAttribute("aria-label",v.label),h.dataset.color=v.value,a.append(h),h}),l=t.createElement("div");l.className="rx-anno-styles",l.setAttribute("role","group"),l.setAttribute("aria-label","Mark style");const c={};for(const v of Object.keys(Be)){const h=t.createElement("button");h.type="button",h.className=`rx-anno-style rx-anno-style-${v}`,h.textContent=Be[v],h.setAttribute("aria-label",Be[v]),h.dataset.style=v,l.append(h),c[v]=h}const s=t.createElement("button");s.type="button",s.className="rx-anno-note-toggle",s.textContent="Note",s.setAttribute("aria-expanded","false");const g=t.createElement("div");g.className="rx-anno-note-form",g.hidden=!0;const x=t.createElement("textarea");x.className="rx-anno-note-textarea",x.setAttribute("aria-label","Note text"),x.rows=3;const f=t.createElement("div");f.className="rx-anno-note-actions";const d=t.createElement("button");d.type="button",d.className="rx-anno-note-save",d.textContent="Save";const p=t.createElement("button");p.type="button",p.className="rx-anno-note-cancel",p.textContent="Cancel",f.append(p,d),g.append(x,f);const m=t.createElement("button");return m.type="button",m.className="rx-anno-delete",m.textContent="Delete",m.hidden=!0,r.append(e,a,l,s,g,m),{root:r,colorRow:a,colorButtons:i,styleRow:l,styleButtons:c,noteToggleBtn:s,noteForm:g,noteTextarea:x,noteSaveBtn:d,noteCancelBtn:p,deleteBtn:m,closeBtn:o,statusLabel:n}}const zr=`
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
`,Je="reactor-annotations-stylesheet";function Ir(t){return t==="underline"||t==="squiggly"?"underline":"highlight"}class Mr{constructor(r=500){$(this,"map",new Map);this.cap=r}get(r){return this.map.get(r)}addAll(r){for(const n of r)for(this.map.delete(n.cfi),this.map.set(n.cfi,n);this.map.size>this.cap;){const o=this.map.keys().next().value;if(o===void 0)break;this.map.delete(o)}}}function Pr({shellRoot:t,core:r,hostChannel:n,options:o={}}){const e=t.ownerDocument??document;if(!e.getElementById(Je)){const b=e.createElement("style");b.id=Je,b.textContent=zr,e.head.appendChild(b)}const a=Nr(e);t.append(a.root);const i=new Mr;let l=Se,c=!1,s=null,g=null;function x(){s=null,g=null,a.root.hidden=!0,a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}function f(b){const k=t.getBoundingClientRect(),I=b?b.left-k.left:(t.clientWidth||300)/2-140,w=b?b.bottom-k.top+8:60,H=Math.max(0,(t.clientWidth||300)-288);a.root.style.left=`${Math.min(Math.max(0,I),H)}px`,a.root.style.top=`${Math.max(0,w)}px`}function d(b){l=b;for(const k of a.colorButtons)k.setAttribute("aria-checked",String(k.dataset.color===b))}function p(b){for(const[k,I]of Object.entries(a.styleButtons))I.setAttribute("aria-pressed",String(k===b))}function m(b,k,I){s={kind:"create",cfi:b,text:k},a.statusLabel.textContent="Add mark",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.noteTextarea.value="",d(l),p(null),a.root.hidden=!1,f(I)}function v(b,k){s={kind:"edit",note:b},a.statusLabel.textContent="Edit mark",a.deleteBtn.hidden=!1,a.noteForm.hidden=!0,a.noteTextarea.value=b.note??"",d(b.color??Se),p(b.style??(b.kind==="underline"?"underline":"highlight")),a.root.hidden=!1,f(k)}function h(b,k){s=null,g=b,a.statusLabel.textContent="Loading…",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.root.hidden=!1,f(k),n.emitIntent({type:"notesPageRequest",offset:0,limit:1,filter:null,sort:null,query:`cfi:${b}`})}function A(b){if(b.type==="selection"&&b.cfi)m(b.cfi,b.text,b.rect);else if(b.type==="selectionCleared")(s==null?void 0:s.kind)==="create"&&x();else if(b.type==="annotationTap"){if(!b.cfi)return;const k=i.get(b.cfi);k?v(k,b.rect):h(b.cfi,b.rect)}}const z=r.on(A);function C(b){if(b.type==="setNotes"&&(i.addAll(b.items),g)){const k=b.items.find(I=>I.cfi===g);if(k){const I=a.root.hidden?null:{left:parseFloat(a.root.style.left||"0"),top:parseFloat(a.root.style.top||"0"),bottom:0};v(k,I)}else x()}}const T=n.onCommand(C);function S(b){(s==null?void 0:s.kind)==="create"&&(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:Ir(b),color:l,style:b,text:s.text,note:null}),r.clearSelection(),x())}function B(b){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:l,style:b,note:s.note.note}),x())}function P(b){const I=b.currentTarget.dataset.color??Se;d(I),(s==null?void 0:s.kind)==="edit"&&n.emitIntent({type:"annotationUpdate",id:s.note.id,color:I,style:s.note.style,note:s.note.note})}for(const b of a.colorButtons)b.addEventListener("click",P);const N={highlight:()=>(s==null?void 0:s.kind)==="create"?S("highlight"):B("highlight"),underline:()=>(s==null?void 0:s.kind)==="create"?S("underline"):B("underline"),strikethrough:()=>(s==null?void 0:s.kind)==="create"?S("strikethrough"):B("strikethrough"),squiggly:()=>(s==null?void 0:s.kind)==="create"?S("squiggly"):B("squiggly")};for(const[b,k]of Object.entries(a.styleButtons))k.addEventListener("click",N[b]);function _(){const b=a.noteForm.hidden;a.noteForm.hidden=!b,a.noteToggleBtn.setAttribute("aria-expanded",String(b)),b&&a.noteTextarea.focus()}a.noteToggleBtn.addEventListener("click",_);function O(){a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}a.noteCancelBtn.addEventListener("click",O);function D(){const b=a.noteTextarea.value.trim()||null;(s==null?void 0:s.kind)==="create"?(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:"note",color:l,style:null,text:s.text,note:b}),r.clearSelection(),x()):(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:s.note.color,style:s.note.style,note:b}),x())}a.noteSaveBtn.addEventListener("click",D);function F(){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationDelete",id:s.note.id}),x())}a.deleteBtn.addEventListener("click",F);const R=()=>x();a.closeBtn.addEventListener("click",R);function V(){if(!c){c=!0,z(),T();for(const b of a.colorButtons)b.removeEventListener("click",P);for(const[b,k]of Object.entries(a.styleButtons))k.removeEventListener("click",N[b]);a.noteToggleBtn.removeEventListener("click",_),a.noteCancelBtn.removeEventListener("click",O),a.noteSaveBtn.removeEventListener("click",D),a.deleteBtn.removeEventListener("click",F),a.closeBtn.removeEventListener("click",R),a.root.remove()}}return{isOpen:()=>!a.root.hidden,close:x,destroy:V}}const Hr='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function Or(t,r,n){const o=document.createElement("button");return o.type="button",o.className=n,o.setAttribute("aria-label",t),o.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,o}function he(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-toggle",n.setAttribute("aria-pressed","false"),n.setAttribute("data-setting",r),n.textContent=t,n}function we(t,r,n){const o=document.createElement("div");o.className=`rx-settings-pills ${n}`,o.setAttribute("role","radiogroup"),o.setAttribute("aria-label",t);for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-settings-pill",a.setAttribute("role","radio"),a.setAttribute("aria-checked","false"),a.setAttribute("data-value",e.id),a.textContent=e.label,o.appendChild(a)}return o}function ie(t,r,n,o){const e=document.createElement("div");e.className="rx-settings-slider-row";const a=document.createElement("div");a.className="rx-settings-slider-label";const i=document.createElement("span");i.textContent=t;const l=document.createElement("span");l.className="rx-settings-slider-value",a.append(i,l);const c=document.createElement("input");return c.type="range",c.className="rx-settings-slider",c.min=String(r),c.max=String(n),c.step=String(o),c.setAttribute("aria-label",t),e.append(a,c),{row:e,input:c,value:l}}function Fr(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-tab",n.setAttribute("role","tab"),n.setAttribute("aria-selected","false"),n.setAttribute("data-tab",t),n.id=`rx-settings-tab-${t}`,n.textContent=r,n}function me(t){const r=document.createElement("div");return r.className="rx-settings-panel",r.setAttribute("role","tabpanel"),r.setAttribute("data-panel",t),r.setAttribute("aria-labelledby",`rx-settings-tab-${t}`),r.hidden=!0,r}function Rr(t){const r=document.createElement("div");r.className="rx-settings-scrim";const n=document.createElement("div");n.className="rx-settings-sheet",n.setAttribute("role","dialog"),n.setAttribute("aria-label","Text settings"),n.tabIndex=-1;const o=document.createElement("div");o.className="rx-settings-head";const e=document.createElement("h3");e.className="rx-settings-title",e.textContent="Text settings";const a=Or("Close settings",Hr,"rx-icon-btn rx-settings-close");o.append(e,a);const i=document.createElement("div");i.className="rx-settings-scope",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Settings scope");const l=document.createElement("button");l.type="button",l.className="rx-settings-scope-btn",l.setAttribute("role","radio"),l.setAttribute("aria-checked","true"),l.setAttribute("data-scope","global"),l.textContent="Global";const c=document.createElement("button");c.type="button",c.className="rx-settings-scope-btn",c.setAttribute("role","radio"),c.setAttribute("aria-checked","false"),c.setAttribute("data-scope","book"),c.textContent="This book",i.append(l,c);const s=document.createElement("div");s.className="rx-settings-tabs",s.setAttribute("role","tablist");const g=[["typography","Typography"],["layout","Layout"],["theme","Theme"],["controls","Controls"],["playback","Playback"]],x={};for(const[q,ae]of g){const U=Fr(q,ae);x[q]=U,s.appendChild(U)}const f=document.createElement("div");f.className="rx-settings-body";const d=me("typography"),p=ie("Font size",13,28,1),m=ie("Paragraph spacing",0,2,.1),v=we("Typeface",[],"rx-settings-font-pills");d.append(p.row,v,m.row);const h=me("layout"),A=we("Reading mode",[{id:"paginated",label:"Paginated"},{id:"scrolled",label:"Scrolling"}],"rx-settings-flow-pills"),z=we("Columns",[{id:"1",label:"1 column"},{id:"2",label:"2 columns"}],"rx-settings-columns-pills"),C=document.createElement("div");C.className="rx-settings-margins-group";const T=document.createElement("div");T.className="rx-settings-margins-head";const S=document.createElement("span");S.className="rx-settings-margins-label",S.textContent="Margins";const B=he("Link left and right margins","linkSideMargins");B.classList.add("rx-settings-link-toggle"),T.append(S,B);const P=ie("Top",0,96,4),N=ie("Bottom",0,96,4),_=ie("Left",0,96,4),O=ie("Right",0,96,4);C.append(T,P.row,N.row,_.row,O.row);const D=ie("Line spacing",1.2,1.95,.05),F=he("Justify text","justify"),R=he("Hyphenate","hyphenate"),V=he("Use book's own styling","useBookLayout");h.append(A,z,C,D.row,F,R,V);const b=me("theme"),k=document.createElement("div");k.className="rx-settings-swatches",k.setAttribute("role","radiogroup"),k.setAttribute("aria-label","Theme"),b.append(k);const I=me("controls"),w=he("Swipe to turn pages","swipe"),H=we("Tap zone size",[{id:"standard",label:"Standard"},{id:"wide",label:"Wide"}],"rx-settings-tapzone-pills"),W=document.createElement("div");W.className="rx-settings-volumekeys",W.hidden=!0;const ee=he("Volume keys turn pages","volumeKeys");W.append(ee),I.append(w,H,W);const j=me("playback"),K=document.createElement("p");K.className="rx-settings-empty",K.textContent="No narration provider for this book.";const X=document.createElement("div");X.className="rx-settings-playback-controls",X.hidden=!0;const te=ie("Narration speed",.5,3,.1),re=ie("Skip forward (seconds)",5,60,5);return X.append(te.row,re.row),j.append(K,X),f.append(d,h,b,I,j),n.append(o,i,s,f),t.append(r,n),{root:n,scrim:r,closeBtn:a,scopeGlobalBtn:l,scopeBookBtn:c,tabsRow:s,tabButtons:x,panels:{typography:d,layout:h,theme:b,controls:I,playback:j},fontSizeInput:p.input,fontSizeValue:p.value,paragraphSpacingInput:m.input,paragraphSpacingValue:m.value,fontFamilyPills:v,flowPills:A,columnsPills:z,linkSideMarginsToggle:B,marginTopInput:P.input,marginTopValue:P.value,marginBottomInput:N.input,marginBottomValue:N.value,marginLeftInput:_.input,marginLeftValue:_.value,marginRightInput:O.input,marginRightValue:O.value,lineHeightInput:D.input,lineHeightValue:D.value,justifyToggle:F,hyphenateToggle:R,useBookLayoutToggle:V,themeSwatches:k,swipeToggle:w,tapZonePills:H,volumeKeysRow:W,volumeKeysToggle:ee,playbackEmpty:K,playbackControls:X,narrationSpeedInput:te.input,narrationSpeedValue:te.value,skipForwardInput:re.input,skipForwardValue:re.value}}const $r=`
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

.rx-settings-margins-group {
  display: flex;
  flex-direction: column;
  gap: var(--rx-space-2);
}
.rx-settings-margins-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--rx-space-2);
}
.rx-settings-margins-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--rx-ink);
}
.rx-settings-link-toggle {
  flex: 0 0 auto;
  min-height: 40px;
  padding: 0 var(--rx-space-2);
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
`,Qe={fontSize:16,lineHeight:1.5,fontFamily:null,paragraphSpacing:0,maxColumnCount:2,gap:.05,maxInlineSize:720,maxBlockSize:1440,justify:!0,hyphenate:!0,isDark:!1,themeName:"default",flow:"paginated",useBookLayout:!0,marginTop:40,marginBottom:40,marginLeft:40,marginRight:40,linkSideMargins:!0},Ne=[{id:"light",label:"Light",themeName:"default",isDark:!1,swatchBg:"#ffffff",swatchFg:"#000000"},{id:"sepia",label:"Sepia",themeName:"sepia",isDark:!1,swatchBg:"#f1e8d0",swatchFg:"#5b4636"},{id:"dark",label:"Dark",themeName:"default",isDark:!0,swatchBg:"#222222",swatchFg:"#e0e0e0"},{id:"amoled",label:"AMOLED",themeName:"amoled",isDark:!0,swatchBg:"#000000",swatchFg:"#ffffff"}];function _r(t,r){return Ne.find(n=>n.themeName===t&&n.isDark===r)??Ne.find(n=>n.id===(r?"dark":"light"))}const et=[{id:"publisher",label:"Publisher",value:null},{id:"serif",label:"Serif",value:'Georgia, "Iowan Old Style", "Times New Roman", serif'},{id:"sans",label:"Sans-serif",value:'-apple-system, "Segoe UI", Roboto, Arial, sans-serif'},{id:"mono",label:"Monospace",value:'"Courier New", monospace'}];function Dr(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function Gr(t){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const e=Dr(t);if(e.length===0){o.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],l=t.ownerDocument.activeElement;o.shiftKey&&l===a?(o.preventDefault(),i.focus()):!o.shiftKey&&l===i&&(o.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const tt="reactor-settings-stylesheet",Vr=["typography","layout","theme","controls","playback"];function Wr(t){if(t.getElementById(tt))return;const r=t.createElement("style");r.id=tt,r.textContent=$r,t.head.appendChild(r)}function qr(t,r,n){var ue,oe,Y;const o=t.ownerDocument??document;Wr(o);const e=Rr(t),a=Gr(e.root),i={global:{...Qe},book:{...Qe}};let l="global",c="typography",s=!1,g=!1,x=((oe=(ue=n.hostChannel)==null?void 0:ue.getConfig())==null?void 0:oe.capabilities.playback)??!1,f=null;e.volumeKeysRow.hidden=!n.volumeKeysCapability;function d(u){t.classList.remove("theme-dark","theme-amoled"),u.themeName==="amoled"?t.classList.add("theme-amoled"):u.isDark&&t.classList.add("theme-dark")}function p(){return i[l]}function m(){const u=p().fontFamily;for(const L of Array.from(e.fontFamilyPills.children)){const Z=et.find(se=>se.id===L.dataset.value);L.setAttribute("aria-checked",String((Z==null?void 0:Z.value)===u))}}function v(){const u=_r(p().themeName,p().isDark);for(const L of Array.from(e.themeSwatches.children))L.setAttribute("aria-checked",String(L.dataset.value===u.id))}function h(u,L){for(const Z of Array.from(u.children))Z.setAttribute("aria-checked",String(Z.dataset.value===L))}function A(){e.playbackEmpty.hidden=x,e.playbackControls.hidden=!x}function z(){const u=p();e.fontSizeInput.value=String(u.fontSize),e.fontSizeInput.setAttribute("aria-valuetext",`${u.fontSize}px`),e.fontSizeValue.textContent=`${u.fontSize}px`,e.paragraphSpacingInput.value=String(u.paragraphSpacing),e.paragraphSpacingValue.textContent=`${u.paragraphSpacing}em`,m(),h(e.flowPills,u.flow),h(e.columnsPills,String(u.maxColumnCount)),e.marginTopInput.value=String(u.marginTop),e.marginTopInput.setAttribute("aria-valuetext",`${u.marginTop}px`),e.marginTopValue.textContent=`${u.marginTop}px`,e.marginBottomInput.value=String(u.marginBottom),e.marginBottomInput.setAttribute("aria-valuetext",`${u.marginBottom}px`),e.marginBottomValue.textContent=`${u.marginBottom}px`,e.marginLeftInput.value=String(u.marginLeft),e.marginLeftInput.setAttribute("aria-valuetext",`${u.marginLeft}px`),e.marginLeftValue.textContent=`${u.marginLeft}px`,e.marginRightInput.value=String(u.marginRight),e.marginRightInput.setAttribute("aria-valuetext",`${u.marginRight}px`),e.marginRightValue.textContent=`${u.marginRight}px`,e.linkSideMarginsToggle.setAttribute("aria-pressed",String(u.linkSideMargins)),e.lineHeightInput.value=String(u.lineHeight),e.lineHeightValue.textContent=u.lineHeight.toFixed(2),e.justifyToggle.setAttribute("aria-pressed",String(u.justify)),e.hyphenateToggle.setAttribute("aria-pressed",String(u.hyphenate)),e.useBookLayoutToggle.setAttribute("aria-pressed",String(u.useBookLayout)),v(),A(),e.scopeGlobalBtn.setAttribute("aria-checked",String(l==="global")),e.scopeBookBtn.setAttribute("aria-checked",String(l==="book"))}function C(u){var L;i[l]={...i[l],...u},z(),r.applyStyles(i[l]),d(i[l]),(L=n.hostChannel)==null||L.emitIntent({type:"settingsChange",scope:l,settings:i[l]})}function T(){C({fontSize:Number(e.fontSizeInput.value)})}e.fontSizeInput.addEventListener("change",T);function S(){C({paragraphSpacing:Number(e.paragraphSpacingInput.value)})}e.paragraphSpacingInput.addEventListener("change",S);for(const u of et){const L=document.createElement("button");L.type="button",L.className="rx-settings-pill",L.setAttribute("role","radio"),L.setAttribute("aria-checked","false"),L.setAttribute("data-value",u.id),L.textContent=u.label,L.addEventListener("click",()=>C({fontFamily:u.value})),e.fontFamilyPills.appendChild(L)}function B(u){const L=u.currentTarget.dataset.value;C({flow:L})}for(const u of Array.from(e.flowPills.children))u.addEventListener("click",B);function P(u){const L=Number(u.currentTarget.dataset.value);C({maxColumnCount:L})}for(const u of Array.from(e.columnsPills.children))u.addEventListener("click",P);function N(){C({marginTop:Number(e.marginTopInput.value)})}e.marginTopInput.addEventListener("change",N);function _(){C({marginBottom:Number(e.marginBottomInput.value)})}e.marginBottomInput.addEventListener("change",_);function O(){const u=Number(e.marginLeftInput.value);p().linkSideMargins?C({marginLeft:u,marginRight:u}):C({marginLeft:u})}e.marginLeftInput.addEventListener("change",O);function D(){const u=Number(e.marginRightInput.value);p().linkSideMargins?C({marginLeft:u,marginRight:u}):C({marginRight:u})}e.marginRightInput.addEventListener("change",D);function F(){C({linkSideMargins:!p().linkSideMargins})}e.linkSideMarginsToggle.addEventListener("click",F);function R(){C({lineHeight:Number(e.lineHeightInput.value)})}e.lineHeightInput.addEventListener("change",R);function V(){C({justify:!p().justify})}e.justifyToggle.addEventListener("click",V);function b(){C({hyphenate:!p().hyphenate})}e.hyphenateToggle.addEventListener("click",b);function k(){C({useBookLayout:!p().useBookLayout})}e.useBookLayoutToggle.addEventListener("click",k);for(const u of Ne){const L=document.createElement("button");L.type="button",L.className="rx-settings-swatch",L.setAttribute("role","radio"),L.setAttribute("aria-checked","false"),L.setAttribute("aria-label",u.label),L.setAttribute("data-value",u.id);const Z=document.createElement("span");Z.className="rx-settings-swatch-dot",Z.style.background=u.swatchBg;const se=document.createElement("span");se.textContent=u.label,L.append(Z,se),L.addEventListener("click",()=>C({themeName:u.themeName,isDark:u.isDark})),e.themeSwatches.appendChild(L)}let I=!0;function w(){I=!I,e.swipeToggle.setAttribute("aria-pressed",String(I)),r.setSwipe(I)}e.swipeToggle.addEventListener("click",w),e.swipeToggle.setAttribute("aria-pressed",String(I));let H="standard";function W(u){H=u.currentTarget.dataset.value??"standard",h(e.tapZonePills,H)}for(const u of Array.from(e.tapZonePills.children))u.addEventListener("click",W);h(e.tapZonePills,H);let ee=!1;function j(){ee=!ee,e.volumeKeysToggle.setAttribute("aria-pressed",String(ee))}e.volumeKeysToggle.addEventListener("click",j);function K(){var L;const u=Number(e.narrationSpeedInput.value);e.narrationSpeedValue.textContent=`${u.toFixed(1)}x`,(L=n.hostChannel)==null||L.emitIntent({type:"playback",action:"rateChange",positionSec:null,rate:u})}e.narrationSpeedInput.addEventListener("input",()=>{e.narrationSpeedValue.textContent=`${Number(e.narrationSpeedInput.value).toFixed(1)}x`}),e.narrationSpeedInput.addEventListener("change",K);function X(){e.skipForwardValue.textContent=`${e.skipForwardInput.value}s`}e.skipForwardInput.addEventListener("input",X),e.narrationSpeedInput.value="1",e.narrationSpeedValue.textContent="1.0x",e.skipForwardInput.value="30",e.skipForwardValue.textContent="30s";function te(u){u!==c&&(e.tabButtons[c].setAttribute("aria-selected","false"),e.panels[c].hidden=!0,c=u,e.tabButtons[c].setAttribute("aria-selected","true"),e.panels[c].hidden=!1)}for(const u of Vr)e.tabButtons[u].addEventListener("click",()=>te(u));te("typography"),e.tabButtons.typography.setAttribute("aria-selected","true"),e.panels.typography.hidden=!1;function re(u){u!==l&&(l=u,z(),r.applyStyles(i[l]),d(i[l]))}e.scopeGlobalBtn.addEventListener("click",()=>re("global")),e.scopeBookBtn.addEventListener("click",()=>re("book"));const q=(Y=n.hostChannel)==null?void 0:Y.onCommand(u=>{u.type==="setSettingsScope"?(i[u.scope]=u.settings,u.scope===l&&(z(),r.applyStyles(i[l]),d(i[l]))):u.type==="configure"&&(x=u.capabilities.playback,A())});function ae(){var u;s||(s=!0,f=o.activeElement??null,t.classList.add("settings-open"),e.scrim.classList.add("visible"),a.activate(),e.root.focus({preventScroll:!0}),(u=n.onOpenChange)==null||u.call(n,!0))}function U(){var u,L;s&&(s=!1,t.classList.remove("settings-open"),e.scrim.classList.remove("visible"),a.deactivate(),(u=f==null?void 0:f.focus)==null||u.call(f),f=null,(L=n.onOpenChange)==null||L.call(n,!1))}function le(){s?U():ae()}e.closeBtn.addEventListener("click",U),e.scrim.addEventListener("click",U),z();function de(){g||(g=!0,q==null||q(),a.deactivate(),t.classList.remove("settings-open"),e.root.remove(),e.scrim.remove())}return{open:ae,close:U,toggle:le,isOpen:()=>s,getActiveSettings:()=>p(),getActiveScope:()=>l,destroy:de}}const Ur={top:0,right:0,bottom:0,left:0};function rt(t,r){t.style.setProperty("--rx-inset-top",`${Math.max(0,r.top)}px`),t.style.setProperty("--rx-inset-right",`${Math.max(0,r.right)}px`),t.style.setProperty("--rx-inset-bottom",`${Math.max(0,r.bottom)}px`),t.style.setProperty("--rx-inset-left",`${Math.max(0,r.left)}px`)}const Kr=280,nt="reactor-shell-stylesheet";function Yr(t){if(t.getElementById(nt))return;const r=t.createElement("style");r.id=nt,r.textContent=gt,t.head.appendChild(r)}function jr(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function Xr(){const t=new Set;return{getChromeState:()=>({barsVisible:!1,sidebar:"none"}),onChromeState:r=>(t.add(r),()=>t.delete(r)),setBarsVisible:()=>{},refreshSizeClass:()=>{},destroy:()=>{t.clear()}}}function Qr(t,r,n={}){var Q,ze,Ie,Me,Pe,He,Oe,Fe;if((n.chrome??"reactor")==="host")return Xr();const e=t.ownerDocument??document;Yr(e);const a=mt(t),i=a.root;let l=!1,c=!1,s="none",g=!1,x=!1,f=null;const d=new Set;function p(){var G;if(x)return;const E={barsVisible:c,sidebar:s};for(const ye of d)ye(E);(G=n.hostChannel)==null||G.emitIntent({type:"chromeState",barsVisible:c,sidebar:s})}function m(E){c!==E&&(c=E,i.classList.toggle("ui-visible",c),U==null||U.setChromeVisible(c),p())}function v(){m(!c)}const h=qt(i,E=>r.goTo(E),{eink:n.eink,onBack:()=>{var E;return(E=n.hostChannel)==null?void 0:E.emitIntent({type:"back"})},onSidebarChange:E=>{s=E?"left":"none",a.contentsBtn.setAttribute("aria-pressed",String(E)),p(),C()}});function A(){return i.classList.contains("size-desktop")}function z(){if(h.isOpen()){h.close();return}A()||q.close(),u.close(),h.open()}a.contentsBtn.addEventListener("click",z);function C(){const E=i.classList.contains("size-desktop");ce(i,{left:E&&h.isOpen()?Kr:0})}function T(){i.classList.toggle("reduced-motion",B||jr())}function S(){i.classList.toggle("e-ink",B)}let B=((ze=(Q=n.hostChannel)==null?void 0:Q.getConfig())==null?void 0:ze.eink)??!!n.eink;S(),T(),rt(i,((Me=(Ie=n.hostChannel)==null?void 0:Ie.getConfig())==null?void 0:Me.insets)??Ur);const P=(Pe=n.hostChannel)==null?void 0:Pe.onCommand(E=>{E.type==="configure"&&(B=E.eink,S(),T(),rt(i,E.insets))});function N(){const E=t.clientWidth||i.clientWidth,G=Ce(E);i.classList.remove("size-phone","size-fold-tablet","size-desktop"),i.classList.add(`size-${G}`),C()}N();function _(){N(),q.refreshLayout()}const O=typeof ResizeObserver=="function"?new ResizeObserver(()=>_()):null;O==null||O.observe(t);const D=()=>_();O||window.addEventListener("resize",D);const F=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,R=()=>T();(He=F==null?void 0:F.addEventListener)==null||He.call(F,"change",R);function V(E,G){const ye=kt(E,l);ye==="prev"?r.prev():ye==="next"?r.next():v()}function b(E){E==="prev"?r.prev():E==="next"?r.next():v()}function k(E,G){G.key!=="Enter"&&G.key!==" "||(G.preventDefault(),b(E))}const I=()=>b(l?"next":"prev"),w=()=>b(l?"prev":"next"),H=()=>b("toggle"),W=E=>k(l?"next":"prev",E),ee=E=>k(l?"prev":"next",E),j=E=>k("toggle",E);a.zoneLeft.addEventListener("click",I),a.zoneRight.addEventListener("click",w),a.zoneCentre.addEventListener("click",H),a.zoneLeft.addEventListener("keydown",W),a.zoneRight.addEventListener("keydown",ee),a.zoneCentre.addEventListener("keydown",j);function K(){return u.isOpen()?(u.close(),!0):Y!=null&&Y.isOpen()?(Y.close(),!0):Z.isOpen()?(Z.close(),!0):q.isOpen()?(ae(),!0):h.isOpen()?(h.close(),!0):c?(m(!1),!0):!1}function X(E){const G=St(E);G&&(Ct(G)&&E.preventDefault(),G==="next"?r.next():G==="prev"?r.prev():G==="toggleBars"?v():G==="escape"&&K())}e.addEventListener("keydown",X);const te=()=>r.historyBack(),re=()=>r.historyForward();a.historyBackBtn.addEventListener("click",te),a.historyForwardBtn.addEventListener("click",re);const q=Er(i,r,{getSizeClass:()=>Ce(t.clientWidth||i.clientWidth),onWidthChange:n.onContextWidthChange,hostChannel:n.hostChannel,onClose:()=>{s="none",a.contextBtn.setAttribute("aria-pressed","false"),p()}});function ae(){s==="right"?(q.close(),s="none"):(A()||h.close(),u.close(),q.open(),s="right"),a.contextBtn.setAttribute("aria-pressed",String(s==="right")),p()}a.contextBtn.addEventListener("click",ae);const U=n.hostChannel?Br(i,r,n.hostChannel,{eink:n.eink}):null;let le=new Set;function de(){a.bookmarkBtn.setAttribute("aria-pressed",String(!!f&&le.has(f)))}function ue(){!n.hostChannel||!f||n.hostChannel.emitIntent({type:"bookmarkToggle",cfi:f})}const oe=(Oe=n.hostChannel)==null?void 0:Oe.onCommand(E=>{E.type==="setBookmarks"&&(le=new Set(E.items.map(G=>G.cfi)),de())});a.bookmarkBtn.addEventListener("click",ue);const Y=n.hostChannel?Pr({shellRoot:i,core:r,hostChannel:n.hostChannel,options:{eink:n.eink}}):null,u=qr(i,r,{getSizeClass:()=>Ce(t.clientWidth||i.clientWidth),eink:n.eink,hostChannel:n.hostChannel,volumeKeysCapability:n.volumeKeysCapability,onOpenChange:E=>{a.settingsBtn.setAttribute("aria-pressed",String(E))}});function L(){if(u.isOpen()){u.close();return}h.close(),q.close(),s="none",a.contentsBtn.setAttribute("aria-pressed","false"),a.contextBtn.setAttribute("aria-pressed","false"),p(),u.open()}a.settingsBtn.addEventListener("click",L);const Z=mr(i,r,{onOpenInGlossary:E=>{q.openGlossaryTerm(E),s="right",a.contextBtn.setAttribute("aria-pressed","true"),p()}}),se=(Fe=n.hostChannel)==null?void 0:Fe.onCommand(E=>{var G;E.type==="dismiss"&&!K()&&((G=n.hostChannel)==null||G.emitIntent({type:"back"}))}),xe=()=>{g=!0},be=()=>{g=!1,r.goToFraction(Number(a.scrubber.value)/1e3)};a.scrubber.addEventListener("pointerdown",xe),a.scrubber.addEventListener("change",be);function y(E){switch(E.type){case"loaded":l=E.isRtl,i.classList.toggle("is-rtl",l),h.setToc(E.toc),C();break;case"relocate":f=E.cfi??null,a.chapterLabel&&a.chapterLabel.textContent!==(E.chapterTitle??"")&&(a.chapterLabel.textContent=E.chapterTitle??""),!g&&typeof E.fraction=="number"&&(a.scrubber.value=String(Math.round(E.fraction*1e3))),h.setCurrentChapterTitle(E.chapterTitle),de();break;case"history":a.historyBackBtn.disabled=!E.canGoBack,a.historyForwardBtn.disabled=!E.canGoForward;break;case"tap":V(E.x,E.y);break}}const M=r.on(y);r.replayLastEvents(y);function J(){N()}function ne(){var E;x||(x=!0,M(),O==null||O.disconnect(),O||window.removeEventListener("resize",D),(E=F==null?void 0:F.removeEventListener)==null||E.call(F,"change",R),e.removeEventListener("keydown",X),a.zoneLeft.removeEventListener("click",I),a.zoneRight.removeEventListener("click",w),a.zoneCentre.removeEventListener("click",H),a.zoneLeft.removeEventListener("keydown",W),a.zoneRight.removeEventListener("keydown",ee),a.zoneCentre.removeEventListener("keydown",j),a.historyBackBtn.removeEventListener("click",te),a.historyForwardBtn.removeEventListener("click",re),a.contextBtn.removeEventListener("click",ae),a.bookmarkBtn.removeEventListener("click",ue),oe==null||oe(),se==null||se(),P==null||P(),Y==null||Y.destroy(),q.destroy(),U==null||U.destroy(),a.settingsBtn.removeEventListener("click",L),u.destroy(),Z.destroy(),a.scrubber.removeEventListener("pointerdown",xe),a.scrubber.removeEventListener("change",be),a.contentsBtn.removeEventListener("click",z),h.destroy(),d.clear(),i.classList.remove("reader-shell","ui-visible","e-ink","reduced-motion","is-rtl","size-phone","size-fold-tablet","size-desktop","settings-open"),a.zones.remove(),a.topBar.remove(),a.bottomBar.remove())}return{getChromeState:()=>({barsVisible:c,sidebar:s}),onChromeState:E=>(d.add(E),()=>d.delete(E)),setBarsVisible:m,refreshSizeClass:J,destroy:ne}}export{Re as ZONE_FRACTION,Ce as computeSizeClass,Ct as isPreventableKey,Br as mountPlaybackBar,Er as mountRightSidebar,qr as mountSettingsPanel,Qr as mountShell,St as resolveKeyboardAction,kt as resolveTapZone};
