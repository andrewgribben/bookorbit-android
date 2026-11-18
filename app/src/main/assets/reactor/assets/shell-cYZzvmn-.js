var wt=Object.defineProperty;var Et=(t,r,n)=>r in t?wt(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;var D=(t,r,n)=>Et(t,typeof r!="symbol"?r+"":r,n);import{A as St,D as Se}from"./index-BopFCGvv.js";const Ct={menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',bookmark:'<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',panel_right:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',back:'<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',forward:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',skip_back:'<polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/>',skip_forward:'<polygon points="13 19 22 12 13 5 13 19"/><polygon points="2 19 11 12 2 5 2 19"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-6a9 9 0 0 1 18 0v6a1 1 0 0 1-1 1h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>'};function ge(t){return`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${Ct[t]}</svg>`}function pe(t,r,n=!1){const o=document.createElement("button");return o.type="button",o.className="rx-icon-btn",o.setAttribute("aria-label",t),o.innerHTML=ge(r),n&&o.setAttribute("aria-pressed","false"),o}function Lt(t){t.classList.add("reader-shell");const r=document.createElement("div");r.className="rx-zones";const n=document.createElement("div");n.className="rx-zone rx-zone-left",n.setAttribute("role","button"),n.setAttribute("tabindex","0"),n.setAttribute("aria-label","Previous page");const o=document.createElement("div");o.className="rx-zone rx-zone-centre",o.setAttribute("role","button"),o.setAttribute("tabindex","0"),o.setAttribute("aria-label","Toggle bars");const e=document.createElement("div");e.className="rx-zone rx-zone-right",e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label","Next page"),r.append(n,o,e);const a=document.createElement("div");a.className="rx-bar rx-bar-top",a.setAttribute("role","toolbar");const i=pe("Table of contents","menu",!0),l=pe("Bookmark","bookmark",!0),c=pe("Toggle narration","headphones",!0);c.hidden=!0;const s=pe("Text settings","settings",!0),m=pe("Open context panel","panel_right",!0),f=document.createElement("div");f.className="rx-bar-spacer",a.append(i,l,f,c,s,m);const g=document.createElement("div");g.className="rx-bar rx-bar-bottom";const u=document.createElement("div");u.className="rx-status-row",u.setAttribute("aria-live","polite");const h=pe("Back","back");h.disabled=!0;const y=document.createElement("span");y.className="rx-chapter-label";const w=pe("Forward","forward");w.disabled=!0,u.append(h,y,w);const p=document.createElement("input");return p.type="range",p.className="rx-scrubber",p.min="0",p.max="1000",p.step="1",p.value="0",p.setAttribute("aria-label","Reading position"),g.append(u,p),t.append(r,a,g),{root:t,zones:r,zoneLeft:n,zoneCentre:o,zoneRight:e,topBar:a,bottomBar:g,contentsBtn:i,bookmarkBtn:l,narrationBtn:c,settingsBtn:s,contextBtn:m,historyBackBtn:h,historyForwardBtn:w,chapterLabel:y,scrubber:p}}const At=`
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
`,Tt=599,Bt=1200;function Ce(t){return t<=Tt?"phone":t<=Bt?"fold-tablet":"desktop"}const We=.3;function Nt(t,r){const n=Math.min(1,Math.max(0,t));return n<We?r?"next":"prev":n>1-We?r?"prev":"next":"toggle"}const zt=new Set(["ArrowRight","ArrowDown","PageDown"," "]),It=new Set(["ArrowLeft","ArrowUp","PageUp"]);function Pt(t){return t.ctrlKey||t.metaKey||t.altKey?null:zt.has(t.key)?"next":It.has(t.key)?"prev":t.key==="m"||t.key==="M"?"toggleBars":t.key==="Escape"?"escape":null}function Mt(t){return t==="next"||t==="prev"}const Ht='<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',Ot='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function qe(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-icon-btn",n.setAttribute("aria-label",t),n.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,n}function Ft(t){const r=document.createElement("div");r.className="rx-left-sidebar",r.setAttribute("aria-label","Table of contents"),r.tabIndex=-1;const n=document.createElement("div");n.className="rx-left-sidebar-scrim";const o=document.createElement("div");o.className="rx-sidebar-head";const e=qe("Back",Ht),a=document.createElement("h3");a.className="rx-sidebar-title",a.textContent="Contents";const i=qe("Close contents",Ot);i.classList.add("rx-left-sidebar-close"),o.append(e,a,i);const l=document.createElement("div");l.className="rx-left-sidebar-tabs",l.setAttribute("role","tablist");function c(I,C){const S=document.createElement("button");return S.type="button",S.className="rx-left-sidebar-tab",S.setAttribute("role","tab"),S.setAttribute("aria-selected","false"),S.setAttribute("data-tab",C),S.id=`rx-tab-${C}`,S.textContent=I,S}const s=c("Contents","contents"),m=c("Starred","starred"),f=c("Related","related");l.append(s,m,f);const g=document.createElement("div");g.className="rx-left-sidebar-body";function u(I){const C=document.createElement("div");return C.className="rx-sidebar-panel",C.setAttribute("role","tabpanel"),C.setAttribute("data-panel",I),C.setAttribute("aria-labelledby",`rx-tab-${I}`),C.hidden=!0,C}const h=u("contents"),y=document.createElement("div");y.className="rx-toc-scroll";const w=document.createElement("div");w.className="rx-toc-spacer";const p=document.createElement("div");p.className="rx-toc-window",p.setAttribute("role","list"),w.appendChild(p),y.appendChild(w),h.appendChild(y);const A=u("starred"),P=u("related");return g.append(h,A,P),r.append(o,l,g),t.append(n,r),{root:r,scrim:n,backBtn:e,closeBtn:i,title:a,tablist:l,tabContents:s,tabStarred:m,tabRelated:f,body:g,panelContents:h,tocScroll:y,tocSpacer:w,tocWindow:p,panelStarred:A,panelRelated:P}}const Rt=`
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
`;function dt(t,r=null,n=0){const o=[];for(let e=0;e<t.length;e++){const a=t[e],i=r===null?String(e):`${r}.${e}`;o.push({id:i,label:a.label,href:a.href,depth:n,hasChildren:a.subitems.length>0,parentId:r}),a.subitems.length>0&&o.push(...dt(a.subitems,i,n+1))}return o}function $t(t,r){if(r.size===0)return t;const n=new Set,o=[];for(const e of t){if(e.parentId!==null&&(n.has(e.parentId)||r.has(e.parentId))){n.add(e.id);continue}o.push(e)}return o}function _t(t,r){if(!r)return null;const n=Ue(r);let o=null;for(const e of t)if(e.href){if(e.href===r)return e.id;o===null&&Ue(e.href)===n&&(o=e)}return(o==null?void 0:o.id)??null}function Dt(t,r){if(!r)return null;for(const n of t)if(n.label===r)return n.id;return null}function Ue(t){const r=t.indexOf("#");return r===-1?t:t.slice(0,r)}function Gt(t,r,n,o,e=8){if(o===0||r<=0)return{start:0,end:-1};const a=Math.floor(t/r),i=Math.ceil(n/r),l=Math.max(0,a-e),c=Math.min(o-1,a+i+e);return{start:l,end:c}}const Le=48;function Vt(t,r,n,o){const e=document.createElement("div");if(e.className="rx-toc-row",e.setAttribute("role","listitem"),e.style.paddingLeft=`${12+t.depth*18}px`,o&&e.classList.add("is-current"),t.hasChildren){const c=document.createElement("button");c.type="button",c.className="rx-toc-toggle";const s=!r.collapsed.has(t.id);c.setAttribute("aria-expanded",String(s)),c.setAttribute("aria-label",`${s?"Collapse":"Expand"} ${t.label}`),c.textContent=s?"▾":"▸",c.addEventListener("click",m=>{m.stopPropagation(),n.onToggleExpand(t)}),e.appendChild(c)}else{const c=document.createElement("span");c.className="rx-toc-toggle-spacer",e.appendChild(c)}const a=document.createElement("button");a.type="button",a.className="rx-toc-label",a.setAttribute("aria-label",t.label),o&&a.setAttribute("aria-current","true"),a.textContent=t.label,a.addEventListener("click",()=>n.onActivate(t)),e.appendChild(a);const i=document.createElement("button");i.type="button",i.className="rx-toc-star";const l=t.href?r.starred.has(t.href):!1;return i.setAttribute("aria-pressed",String(l)),i.setAttribute("aria-label",`${l?"Unstar":"Star"} ${t.label}`),i.textContent=l?"★":"☆",i.addEventListener("click",c=>{c.stopPropagation(),n.onToggleStar(t)}),e.appendChild(i),e}function Wt(t,r,n,o,e){const a=$t(o.flat,o.collapsed),i=_t(a,o.currentHref)??Dt(a,o.currentChapterTitle);r.style.height=`${a.length*Le}px`;const l=t.clientHeight||1,{start:c,end:s}=Gt(t.scrollTop,Le,l,a.length);n.replaceChildren(),n.style.transform=`translateY(${c*Le}px)`;for(let m=c;m<=s;m++){const f=a[m];f&&n.appendChild(Vt(f,o,e,f.id===i))}}function qt(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No starred chapters yet. Star a chapter in Contents to find it here.",t.appendChild(e);return}const o=document.createElement("div");o.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-starred-row",a.setAttribute("role","listitem"),a.textContent=e.label,a.addEventListener("click",()=>n(e)),o.appendChild(a)}t.appendChild(o)}function Ut(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No related books yet.",t.appendChild(e);return}const o=document.createElement("div");o.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-related-row",a.setAttribute("role","listitem");const i=`${e.title}${e.subtitle?`, ${e.subtitle}`:""}${e.read?", read":""}`;if(a.setAttribute("aria-label",i),e.coverUrl){const s=document.createElement("img");s.className="rx-related-cover",s.src=e.coverUrl,s.alt="",a.appendChild(s)}else{const s=document.createElement("div");s.className="rx-related-cover rx-related-cover-empty",a.appendChild(s)}const l=document.createElement("div");l.className="rx-related-text";const c=document.createElement("span");if(c.className="rx-related-title",c.textContent=e.title,l.appendChild(c),e.subtitle){const s=document.createElement("span");s.className="rx-related-subtitle",s.textContent=e.subtitle,l.appendChild(s)}if(a.appendChild(l),e.read){const s=document.createElement("span");s.className="rx-related-badge",s.textContent="Read",a.appendChild(s)}a.addEventListener("click",()=>n(e)),o.appendChild(a)}t.appendChild(o)}function ut(t,r){return ht(t,r,1)}function pt(t,r){return ht(t,r,-1)}function ht(t,r,n){if(t.length===0)return r;const o=t.indexOf(r);if(o===-1)return t[0];const e=(o+n+t.length)%t.length;return t[e]}function Kt(t,r){return ut(t,r)}function Yt(t,r){return pt(t,r)}const jt=40;function Xt(t,r){return Math.abs(t)>=jt&&Math.abs(t)>Math.abs(r)}function ft(t,r,n,o){return Xt(r,n)?t==="sidebar"?{action:r<0?"cycle-next":"cycle-prev"}:t==="book"&&o?{action:"close"}:{action:null}:{action:null}}function bt(t,r,n){return t&&r.contains(t)?"sidebar":t&&n.contains(t)&&!r.contains(t)?"book":"other"}function xt(t,r){let n=0,o=0,e=0,a=0,i=null,l=!1,c=!1;function s(p,A,P,I){n=e=p,o=a=A,i=P,l=!0,c=I}function m(){l&&(l=!1,r.onSwipe(e-n,a-o,i),i=null)}function f(p){p.pointerType!=="pen"&&s(p.clientX,p.clientY,p.target,p.pointerType==="touch")}function g(p){l&&(e=p.clientX,a=p.clientY)}function u(p){e=p.clientX,a=p.clientY,m()}function h(){c||m()}function y(p){if(!l)return;const A=p.touches[0];A&&(e=A.clientX,a=A.clientY)}function w(){m()}return t.addEventListener("pointerdown",f),t.addEventListener("pointermove",g),t.addEventListener("pointerup",u),t.addEventListener("pointercancel",h),t.addEventListener("touchmove",y,{passive:!0}),t.addEventListener("touchend",w,{passive:!0}),{destroy(){t.removeEventListener("pointerdown",f),t.removeEventListener("pointermove",g),t.removeEventListener("pointerup",u),t.removeEventListener("pointercancel",h),t.removeEventListener("touchmove",y),t.removeEventListener("touchend",w)}}}function Zt(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function Jt(t){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const e=Zt(t);if(e.length===0){o.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],l=t.ownerDocument.activeElement;o.shiftKey&&l===a?(o.preventDefault(),i.focus()):!o.shiftKey&&l===i&&(o.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const Ke="reactor-left-sidebar-stylesheet";function Qt(t){if(t.getElementById(Ke))return;const r=t.createElement("style");r.id=Ke,r.textContent=Rt,t.head.appendChild(r)}function er(t,r,n={}){var T,H;const o=t.ownerDocument??document;Qt(o);const e=Ft(t);e.root.classList.add("closed");const a=["contents","starred"];(T=n.capabilities)!=null&&T.related&&a.push("related"),e.tabRelated.hidden=!((H=n.capabilities)!=null&&H.related);let i="contents",l=!1,c=!1,s=[];const m=new Set;let f=null,g=null;const u=new Set,h=new Map;let y=[];const w=Jt(e.root);let p=null;function A(){return!t.classList.contains("size-desktop")}function P(k){return k==="contents"?e.panelContents:k==="starred"?e.panelStarred:e.panelRelated}function I(k){return k==="contents"?e.tabContents:k==="starred"?e.tabStarred:e.tabRelated}function C(){if(i==="contents")Wt(e.tocScroll,e.tocSpacer,e.tocWindow,{flat:s,collapsed:m,currentHref:f,currentChapterTitle:g,starred:u},{onActivate:k=>{k.href&&r(k.href),A()&&z()},onToggleExpand:k=>{m.has(k.id)?m.delete(k.id):m.add(k.id),C()},onToggleStar:k=>{var $;if(!k.href)return;const E=!u.has(k.href);E?(u.add(k.href),h.set(k.href,k.label)):(u.delete(k.href),h.delete(k.href)),($=n.onStarToggle)==null||$.call(n,k.href,k.label,E),C()}});else if(i==="starred"){const k=Array.from(h,([E,$])=>({href:E,label:$}));qt(e.panelStarred,k,E=>{r(E.href),A()&&z()})}else Ut(e.panelRelated,y,k=>{var E;(E=n.onOpenRelated)==null||E.call(n,k.id),A()&&z()})}function S(k){k!==i&&(I(i).setAttribute("aria-selected","false"),P(i).hidden=!0,i=k,I(i).setAttribute("aria-selected","true"),P(i).hidden=!1,C())}function N(k){const E=k===1?Kt(a,i):Yt(a,i);S(E)}e.tabContents.addEventListener("click",()=>S("contents")),e.tabStarred.addEventListener("click",()=>S("starred")),e.tabRelated.addEventListener("click",()=>S("related")),S("contents"),I("contents").setAttribute("aria-selected","true"),P("contents").hidden=!1;function M(){var E;if(l)return;l=!0,p=o.activeElement??null,e.root.classList.add("open"),e.root.classList.remove("closed"),t.classList.add("rx-left-sidebar-open"),e.scrim.classList.toggle("visible",A());const k=A();e.root.setAttribute("role",k?"dialog":"complementary"),k?e.root.setAttribute("aria-modal","true"):e.root.removeAttribute("aria-modal"),k&&(w.activate(),e.root.focus()),(E=n.onSidebarChange)==null||E.call(n,!0)}function z(){var k,E;l&&(l=!1,e.root.classList.remove("open"),e.root.classList.add("closed"),t.classList.remove("rx-left-sidebar-open"),e.scrim.classList.remove("visible"),w.deactivate(),(k=p==null?void 0:p.focus)==null||k.call(p),p=null,(E=n.onSidebarChange)==null||E.call(n,!1))}e.closeBtn.addEventListener("click",z),e.scrim.addEventListener("click",z),e.backBtn.addEventListener("click",()=>{var k;return(k=n.onBack)==null?void 0:k.call(n)});const G=xt(t,{onSwipe:(k,E,$)=>{const Q=bt($,e.root,t),q=ft(Q,k,E,A());!l&&q.action!==null||(q.action==="cycle-next"?N(1):q.action==="cycle-prev"?N(-1):q.action==="close"&&z())}});function O(k){s=dt(k),m.clear(),i==="contents"&&C()}function _(k){h.clear(),u.clear();for(const E of k)u.add(E.href),h.set(E.href,E.label);(i==="starred"||i==="contents")&&C()}function F(k){y=k,i==="related"&&C()}function R(k){f=k,i==="contents"&&C()}function W(k){g=k,i==="contents"&&C()}function b(){c||(c=!0,G.destroy(),e.closeBtn.removeEventListener("click",z),e.scrim.removeEventListener("click",z),w.deactivate(),t.classList.remove("rx-left-sidebar-open"),e.root.remove(),e.scrim.remove())}return{open:M,close:z,isOpen:()=>l,cycleTab:N,getActiveTab:()=>i,setToc:O,setStarred:_,setRelated:F,setCurrentHref:R,setCurrentChapterTitle:W,destroy:b}}function Ae(t,r,n){const o=document.createElement("button");return o.type="button",o.className="rx-sidebar-tab",o.textContent=t,o.setAttribute("role","tab"),o.setAttribute("aria-selected",String(r)),o.dataset.tab=n,r&&o.classList.add("active"),o}function tr(t){const r=t.createElement("div");r.className="rx-right-sidebar",r.setAttribute("role","complementary"),r.setAttribute("aria-label","Context panel");const n=t.createElement("div");n.className="rx-sidebar-resize",n.setAttribute("role","separator"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-label","Resize context panel"),n.setAttribute("tabindex","0");const o=t.createElement("div");o.className="rx-sidebar-tabs";const e=t.createElement("div");e.className="rx-sidebar-tablist",e.setAttribute("role","tablist");const a=Ae("Context",!0,"context"),i=Ae("Glossary",!1,"glossary"),l=Ae("Notes",!1,"notes");l.disabled=!0;const c=t.createElement("button");c.type="button",c.className="rx-icon-btn rx-sidebar-close",c.setAttribute("aria-label","Close panel"),c.textContent="✕",e.append(a,i,l),o.append(e,c);const s=t.createElement("div");s.className="rx-ctx-searchbar",s.setAttribute("role","search");const m=t.createElement("input");m.type="search",m.className="rx-ctx-search-input",m.placeholder="Search this book",m.setAttribute("aria-label","Search this book");const f=t.createElement("button");f.type="button",f.className="rx-icon-btn rx-ctx-openmain",f.setAttribute("aria-label","Open in main window"),f.disabled=!0,f.textContent="↗";const g=t.createElement("div");g.className="rx-ctx-crumbs",g.setAttribute("aria-live","polite"),s.append(m,f,g);const u=t.createElement("div");u.className="rx-sidebar-body";const h=t.createElement("div");h.className="rx-ctx-results";const y=t.createElement("div");y.className="rx-ctx-page",y.hidden=!0;const w=t.createElement("div");w.className="rx-notes-body",w.hidden=!0;const p=t.createElement("div");return p.className="rx-glossary-panel-mount",p.hidden=!0,u.append(h,y,w,p),r.append(n,o,s,u),{root:r,resizeHandle:n,tabsRow:o,contextTabBtn:a,glossaryTabBtn:i,notesTabBtn:l,closeBtn:c,searchBar:s,searchInput:m,openInMainBtn:f,breadcrumb:g,body:u,resultsScroller:h,contextPage:y,notesBody:w,glossaryPanelMount:p}}const rr=`
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
`;class nr{constructor(){D(this,"rows",[]);D(this,"headerAt",new Map)}reset(){this.rows=[],this.headerAt.clear()}addGroup(r,n){if(n.length!==0){this.headerAt.has(r)||(this.headerAt.set(r,this.rows.length),this.rows.push({kind:"header",label:r}));for(const o of n)this.rows.push({kind:"item",item:o,groupLabel:r})}}get rowCount(){return this.rows.length}rowAt(r){return this.rows[r]}get isEmpty(){return this.rows.length===0}}class mt{constructor(r){D(this,"container");D(this,"rowHeight");D(this,"buffer");D(this,"opts");D(this,"topSpacer");D(this,"bottomSpacer");D(this,"rowsEl");D(this,"onScroll");D(this,"destroyed",!1);this.opts=r,this.container=r.container,this.rowHeight=r.rowHeight,this.buffer=r.buffer??6,this.topSpacer=document.createElement("div"),this.topSpacer.className="rx-wlist-spacer",this.bottomSpacer=document.createElement("div"),this.bottomSpacer.className="rx-wlist-spacer",this.rowsEl=document.createElement("div"),this.rowsEl.className="rx-wlist-rows",this.rowsEl.setAttribute("role","list"),this.container.replaceChildren(this.topSpacer,this.rowsEl,this.bottomSpacer),this.onScroll=()=>this.render(),this.container.addEventListener("scroll",this.onScroll)}visibleRange(){const r=this.opts.rowCount(),n=this.container.clientHeight||1,o=this.container.scrollTop||0,e=Math.max(0,Math.floor(o/this.rowHeight)-this.buffer),a=Math.ceil(n/this.rowHeight)+this.buffer*2,i=Math.min(r,e+a);return{first:e,last:i}}render(){if(this.destroyed)return;const r=this.opts.rowCount(),{first:n,last:o}=this.visibleRange();this.topSpacer.style.height=`${n*this.rowHeight}px`,this.bottomSpacer.style.height=`${Math.max(0,r-o)*this.rowHeight}px`,this.rowsEl.replaceChildren();for(let e=n;e<o;e++)this.rowsEl.appendChild(this.opts.renderRow(e))}destroy(){this.destroyed||(this.destroyed=!0,this.container.removeEventListener("scroll",this.onScroll),this.container.replaceChildren())}}function ar(t,r){return t.kind!==r.kind?!1:t.kind==="page"&&r.kind==="page"?t.target===r.target:!0}class or{constructor(){D(this,"stack",[{kind:"blank"}]);D(this,"index",0)}get current(){return this.stack[this.index]??{kind:"blank"}}get canGoBack(){return this.index>0}get canGoForward(){return this.index<this.stack.length-1}push(r){ar(this.current,r)||(this.stack=this.stack.slice(0,this.index+1),this.stack.push(r),this.index=this.stack.length-1)}back(){return this.canGoBack?(this.index-=1,this.current):null}forward(){return this.canGoForward?(this.index+=1,this.current):null}reset(){this.stack=[{kind:"blank"}],this.index=0}}const sr={"fold-tablet":320,desktop:340},Ee=240,Ye=16,ir={"fold-tablet":.6,desktop:.7};function lr(t,r,n){const o=ir[n],e=Math.max(Ee,r*o);return t<Ee?Ee:t>e?e:t}const gt=new WeakMap;function Te(t){return gt.get(t)??{left:0,right:0,bottom:0}}function ce(t,r){const n={left:Math.max(0,r.left??Te(t).left),right:Math.max(0,r.right??Te(t).right),bottom:Math.max(0,r.bottom??Te(t).bottom)};return gt.set(t,n),t.style.setProperty("--rx-book-inset-left",`${n.left}px`),t.style.setProperty("--rx-book-inset-right",`${n.right}px`),t.style.setProperty("--rx-book-inset-bottom",`${n.bottom}px`),t.style.paddingLeft=n.left?`${n.left}px`:"",t.style.paddingRight=n.right?`${n.right}px`:"",t.style.paddingBottom=n.bottom?`${n.bottom}px`:"",n}const cr=[{id:"all",label:"All"},{id:"highlight",label:"Highlight"},{id:"underline",label:"Underline"},{id:"note",label:"Typed note"},{id:"handwritten",label:"Handwritten"},{id:"bookmark",label:"Bookmark"}],dr=[{id:"position",label:"Position in book"},{id:"date",label:"Date"},{id:"colour",label:"Colour"},{id:"type",label:"Type"}];function ur(t){const r=t.createElement("div");r.className="rx-notes-panel";const n=t.createElement("div");n.className="rx-notes-searchbar",n.setAttribute("role","search");const o=t.createElement("input");o.type="search",o.className="rx-notes-search-input",o.placeholder="Search notes",o.setAttribute("aria-label","Search notes"),n.append(o);const e=t.createElement("select");e.className="rx-notes-sort",e.setAttribute("aria-label","Sort notes by");for(const{id:s,label:m}of dr){const f=t.createElement("option");f.value=s,f.textContent=m,e.append(f)}n.append(e);const a=t.createElement("div");a.className="rx-notes-filters",a.setAttribute("role","group"),a.setAttribute("aria-label","Filter notes by type");const i={};for(const{id:s,label:m}of cr){const f=t.createElement("button");f.type="button",f.className="rx-notes-chip",f.textContent=m,f.setAttribute("aria-pressed",String(s==="all")),s==="all"&&f.classList.add("active"),f.dataset.filter=s,a.append(f),i[s]=f}const l=t.createElement("div");l.className="rx-notes-banner",l.hidden=!0,l.textContent="No annotation store connected. Notes made in this session are not saved.";const c=t.createElement("div");return c.className="rx-notes-list",r.append(n,a,l,c),{root:r,searchBar:n,searchInput:o,filterRow:a,filterButtons:i,sortSelect:e,capabilityBanner:l,listScroller:c}}const pr=`
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
`,hr=100,fr=20;function br(t){return t==="all"?null:t}class xr{constructor(r){D(this,"total",0);D(this,"offset",0);D(this,"items",[]);D(this,"state",{filter:"all",sort:"position",query:null});D(this,"lastRequestedOffset",null);D(this,"everRequested",!1);this.hostChannel=r}getState(){return this.state}setState(r){this.state={...this.state,...r},this.total=0,this.offset=0,this.items=[],this.lastRequestedOffset=null,this.requestPage(0)}ensureInitialLoad(){this.everRequested||this.requestPage(0)}rowCount(){return this.total}rowAt(r){const n=r-this.offset;if(!(n<0||n>=this.items.length))return this.items[n]}ensureLoaded(r,n){const o=Math.max(r,n-1);if(this.rowAt(r)&&this.rowAt(o))return;const e=Math.max(0,r-fr);this.lastRequestedOffset!==e&&this.requestPage(e)}requestPage(r){this.everRequested=!0,this.lastRequestedOffset=r,this.hostChannel.emitIntent({type:"notesPageRequest",offset:r,limit:hr,filter:br(this.state.filter),sort:this.state.sort,query:this.state.query})}applyWindow(r){this.total=r.total,this.offset=r.offset,this.items=r.items,this.lastRequestedOffset=null}}const je="reactor-notes-stylesheet",mr=48,gr=200,Xe={highlight:"Highlight",underline:"Underline",note:"Typed note",bookmark:"Bookmark"};function vr(t,r){return r?`${Xe[t]} · ${r}`:Xe[t]}function yr({container:t,core:r,hostChannel:n,options:o={}}){const e=t.ownerDocument??document;if(!e.getElementById(je)){const S=e.createElement("style");S.id=je,S.textContent=pr,e.head.appendChild(S)}const a=ur(e);t.append(a.root);const i=new xr(n);let l=!1,c=null;const s=new Map,m=new Set;function f(S){s.has(S)||m.has(S)||typeof r.getChapterTitleForCfi=="function"&&(m.add(S),r.getChapterTitleForCfi(S).then(N=>{s.set(S,N)}).catch(()=>{s.set(S,null)}).finally(()=>{m.delete(S),!l&&u.render()}))}function g(S){i.ensureLoaded(S,S+1);const N=i.rowAt(S);if(!N){const W=e.createElement("div");return W.className="rx-notes-loading-row",W.setAttribute("role","listitem"),W.textContent="Loading…",W}const M=e.createElement("button");M.type="button",M.className="rx-notes-row";const z=e.createElement("span");z.className="rx-notes-row-swatch",N.color&&z.style.setProperty("--rx-notes-row-color",N.color);const G=e.createElement("span");G.className="rx-notes-row-body";const O=e.createElement("span");O.className="rx-notes-row-snippet",O.textContent=N.note??N.text??"";const _=e.createElement("span");_.className="rx-notes-row-meta";const F=s.get(N.cfi);_.textContent=vr(N.kind,F??null),G.append(O,_),M.append(z,G),M.setAttribute("aria-label",`${_.textContent}: ${O.textContent}`),F===void 0&&f(N.cfi),M.addEventListener("click",()=>r.goTo(N.cfi));const R=e.createElement("div");return R.setAttribute("role","listitem"),R.appendChild(M),R}const u=new mt({container:a.listScroller,rowHeight:mr,rowCount:()=>i.rowCount(),renderRow:g});function h(S){const N=S.currentTarget,M=N.dataset.filter??"all";for(const z of Object.values(a.filterButtons))z.classList.toggle("active",z===N),z.setAttribute("aria-pressed",String(z===N));i.setState({filter:M}),u.render()}for(const S of Object.values(a.filterButtons))S.addEventListener("click",h);function y(){i.setState({sort:a.sortSelect.value}),u.render()}a.sortSelect.addEventListener("change",y);function w(){c&&clearTimeout(c),c=setTimeout(()=>{i.setState({query:a.searchInput.value.trim()||null}),u.render()},gr)}a.searchInput.addEventListener("input",w);function p(S){S.type==="setNotes"&&(i.applyWindow(S),u.render())}const A=n.onCommand(p);function P(){var S;a.capabilityBanner.hidden=((S=n.getConfig())==null?void 0:S.capabilities.notes)!==!1,i.ensureInitialLoad(),u.render()}function I(){u.render()}function C(){if(!l){l=!0,c&&clearTimeout(c),A();for(const S of Object.values(a.filterButtons))S.removeEventListener("click",h);a.sortSelect.removeEventListener("change",y),a.searchInput.removeEventListener("input",w),u.destroy(),a.root.remove()}}return{onActivate:P,refresh:I,destroy:C}}function kr(t){const r=t.createElement("div");r.className="rx-glossary-panel",r.style.position="absolute",r.style.inset="0";const n=t.createElement("div");n.className="rx-glossary-search",n.setAttribute("role","search");const o=t.createElement("input");o.type="search",o.className="rx-glossary-search-input",o.placeholder="Search glossary",o.setAttribute("aria-label","Search glossary"),n.appendChild(o);const e=t.createElement("div");return e.className="rx-glossary-list",e.setAttribute("role","list"),r.append(n,e),{root:r,searchInput:o,list:e}}const wr=900;function Er(t){const r=t.ownerDocument??document,n=kr(r);t.appendChild(n.root);let o=[],e="",a=!1;function i(){const g=e.trim().toLowerCase();return[...g?o.filter(h=>h.term.toLowerCase().includes(g)):o].sort((h,y)=>h.term.localeCompare(y.term))}function l(){if(a)return;const g=i();if(n.list.replaceChildren(),!o.length){n.list.removeAttribute("role");const u=r.createElement("div");u.className="rx-glossary-empty",u.textContent="This book has no glossary.",n.list.appendChild(u);return}if(!g.length){n.list.removeAttribute("role");const u=r.createElement("div");u.className="rx-glossary-empty",u.textContent=`No terms match "${e}".`,n.list.appendChild(u);return}n.list.setAttribute("role","list");for(const u of g){let h=function(){const A=y.classList.toggle("expanded");w.setAttribute("aria-expanded",String(A))};const y=r.createElement("div");y.className="rx-glossary-item",y.setAttribute("role","listitem"),y.setAttribute("data-term",u.term);const w=r.createElement("button");w.type="button",w.className="rx-glossary-term-row",w.setAttribute("role","button"),w.setAttribute("aria-expanded","false"),w.textContent=u.term;const p=r.createElement("div");p.className="rx-glossary-def",p.textContent=u.definition,w.addEventListener("click",h),y.append(w,p),n.list.appendChild(y)}}function c(){e=n.searchInput.value,l()}n.searchInput.addEventListener("input",c),l();function s(g){o=g,l()}function m(g){var h,y;e&&(e="",n.searchInput.value="",l());const u=n.list.querySelector(`.rx-glossary-item[data-term="${CSS.escape(g)}"]`);u&&(u.classList.add("expanded"),(h=u.querySelector(".rx-glossary-term-row"))==null||h.setAttribute("aria-expanded","true"),(y=u.scrollIntoView)==null||y.call(u,{block:"center"}),u.classList.add("flash"),setTimeout(()=>u.classList.remove("flash"),wr))}function f(){a||(a=!0,n.searchInput.removeEventListener("input",c),n.root.remove())}return{setTerms:s,scrollToAndFlash:m,destroy:f}}const Ze=9,xe=8,Je=16;function Sr(t,r,n,o){const e=t.top+t.height;let a=t.left;a=Math.min(Math.max(xe,a),Math.max(xe,r.width-n-xe));let i=e+Ze,l=!1;if(i+o>r.height-xe){const s=t.top-o-Ze;i=Math.max(xe,s),l=!0}const c=Math.max(Je,Math.min(n-Je,t.left+t.width/2-a));return{left:a,top:i,above:l,arrowX:c}}const Cr='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';function Lr(t,r,n){const o=t.ownerDocument??document;let e=null,a=!1;function i(){var u;const g=!!e;e==null||e.remove(),e=null,g&&((u=t.querySelector("iframe"))==null||u.focus())}function l(g,u){var P;i();const h=o.createElement("div");h.className="rx-glossary-popover",h.setAttribute("role","dialog"),h.setAttribute("aria-label",`${g.term} definition`),h.innerHTML=`
      <div class="rx-glossary-popover-head">
        <h4 class="rx-glossary-popover-term"></h4>
        <button type="button" class="rx-icon-btn rx-glossary-popover-open" aria-label="Open in glossary" title="Open in glossary">${Cr}</button>
      </div>
      <p class="rx-glossary-popover-def"></p>
    `,h.querySelector(".rx-glossary-popover-term").textContent=g.term,h.querySelector(".rx-glossary-popover-def").textContent=g.definition,t.appendChild(h),e=h;const y=t.getBoundingClientRect(),w={left:u.left-y.left,top:u.top-y.top,width:u.width,height:u.height},p={width:y.width,height:y.height},A=Sr(w,p,h.offsetWidth,h.offsetHeight||120);h.style.left=`${A.left}px`,h.style.top=`${A.top}px`,h.classList.toggle("above",A.above),h.style.setProperty("--arrow-x",`${A.arrowX}px`),h.querySelector(".rx-glossary-popover-open").addEventListener("click",I=>{I.stopPropagation(),i(),n.onOpenInGlossary(g.term)}),(P=h.querySelector(".rx-glossary-popover-open"))==null||P.focus()}async function c(g,u){const h=await r.getGlossaryTerms();if(a)return;const y=h.find(w=>w.term.toLowerCase()===g.toLowerCase());y&&l(y,u)}const s=r.onGlossaryTermTap(c);function m(g){var h;if(!e)return;const u=g.target;(h=u==null?void 0:u.closest)!=null&&h.call(u,".rx-glossary-popover")||i()}o.addEventListener("click",m);function f(){a||(a=!0,s(),o.removeEventListener("click",m),i())}return{isOpen:()=>e!==null,close:i,destroy:f}}const Ar=`
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
`,Qe="reactor-right-sidebar-stylesheet",et="reactor-glossary-stylesheet",Tr=48,Br=200;function Nr(t){if(!t.getElementById(Qe)){const r=t.createElement("style");r.id=Qe,r.textContent=rr,t.head.appendChild(r)}if(!t.getElementById(et)){const r=t.createElement("style");r.id=et,r.textContent=Ar,t.head.appendChild(r)}}function zr(t){const r=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`${r(t.pre)}<mark>${r(t.match)}</mark>${r(t.post)}`}function Ir(t,r,n){var se,be;const o=t.ownerDocument??document;Nr(o);const e=tr(o),a=o.createElement("div");a.className="rx-sidebar-scrim",t.append(a,e.root);const i=new nr,l=new or,c=Er(e.glossaryPanelMount);let s="context",m=null,f=!1,g=!1,u=null;const h=!!n.hostChannel&&((se=n.hostChannel.getConfig())==null?void 0:se.capabilities.notes)!==!1;e.notesTabBtn.disabled=!h;const y=h?yr({container:e.notesBody,core:r,hostChannel:n.hostChannel}):null;((be=n.capabilities)==null?void 0:be.glossary)===!1&&(e.glossaryTabBtn.hidden=!0);const w=["context"];e.glossaryTabBtn.hidden!==!0&&w.push("glossary"),h&&w.push("notes");function p(){return n.getSizeClass()==="phone"}function A(x){const B=x===1?ut(w,s):pt(w,s);P(B)}function P(x){x!==s&&(s=x,e.contextTabBtn.classList.toggle("active",x==="context"),e.contextTabBtn.setAttribute("aria-selected",String(x==="context")),e.glossaryTabBtn.classList.toggle("active",x==="glossary"),e.glossaryTabBtn.setAttribute("aria-selected",String(x==="glossary")),e.notesTabBtn.classList.toggle("active",x==="notes"),e.notesTabBtn.setAttribute("aria-selected",String(x==="notes")),e.searchBar.hidden=x!=="context",e.glossaryPanelMount.hidden=x!=="glossary",e.notesBody.hidden=x!=="notes",x==="context"?R(l.current):x==="glossary"?(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,r.getGlossaryTerms().then(B=>c.setTerms(B))):(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,y==null||y.onActivate()))}const I=()=>P("context"),C=()=>P("glossary"),S=()=>P("notes");e.contextTabBtn.addEventListener("click",I),e.glossaryTabBtn.addEventListener("click",C),e.notesTabBtn.addEventListener("click",S);function N(x){const B=i.rowAt(x);if(!B)return o.createElement("div");if(B.kind==="header"){const Z=o.createElement("div");return Z.className="rx-ctx-group-header",Z.setAttribute("role","listitem"),Z.textContent=B.label,Z}const Y=o.createElement("button");Y.type="button",Y.className="rx-ctx-result",Y.setAttribute("role","listitem"),Y.innerHTML=zr(B.item),Y.addEventListener("click",()=>T(B.item,B.groupLabel));const ee=o.createElement("div");return ee.setAttribute("role","listitem"),ee.appendChild(Y),ee}const M=new mt({container:e.resultsScroller,rowHeight:Tr,rowCount:()=>i.rowCount,renderRow:N});function z(){e.breadcrumb.replaceChildren();const x=o.createElement("button");x.type="button",x.textContent="Back",x.disabled=!l.canGoBack,x.setAttribute("aria-label","Back"),x.addEventListener("click",W);const B=o.createElement("button");B.type="button",B.textContent="Forward",B.disabled=!l.canGoForward,B.setAttribute("aria-label","Forward"),B.addEventListener("click",b),e.breadcrumb.append(x,B),e.openInMainBtn.disabled=l.current.kind!=="page"}function G(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,M.render()}function O(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,M.render()}function _(){return m||(m=r.createSecondaryView(e.contextPage),m)}function F(x){e.resultsScroller.hidden=!0,e.contextPage.hidden=!1;const B=_();B&&B.goTo(x)}function R(x){x.kind==="blank"?O():x.kind==="results"?G():F(x.target),z()}function W(){const x=l.back();x&&R(x)}function b(){const x=l.forward();x&&R(x)}function T(x,B){l.push({kind:"page",target:x.cfi,label:B}),R(l.current)}function H(){const x=e.searchInput.value.trim();i.reset(),x?l.current.kind!=="results"&&l.push({kind:"results"}):l.reset(),R(l.current),u&&clearTimeout(u),x&&(u=setTimeout(()=>r.runSearch(x),Br))}e.searchInput.addEventListener("input",H);function k(x){x.type==="searchResults"?(i.addGroup(x.label,x.items),l.current.kind==="results"&&M.render()):x.type==="loaded"&&c.setTerms([])}const E=r.on(k);function $(){const x=l.current;x.kind==="page"&&(r.goTo(x.target),n.getSizeClass()==="phone"&&ae())}e.openInMainBtn.addEventListener("click",$);function Q(){ae()}e.closeBtn.addEventListener("click",Q);const q=()=>ae();a.addEventListener("click",q);function U(){const x=getComputedStyle(t).getPropertyValue("--rx-ctx-width"),B=parseFloat(x);if(!Number.isNaN(B)&&B>0)return B;const Y=n.getSizeClass();return Y==="phone"?Ee:sr[Y]}e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(U())));function j(x,B){var Z;const Y=n.getSizeClass();if(Y==="phone")return;const ee=lr(x,t.clientWidth||1200,Y);t.style.setProperty("--rx-ctx-width",`${ee}px`),e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(ee))),f&&ce(t,{right:ee}),B&&((Z=n.onWidthChange)==null||Z.call(n,ee))}let te=!1,re=0,K=0;function ne(x){te=!0,re=x.clientX,K=U(),t.classList.add("right-sidebar-resizing"),o.addEventListener("pointermove",X),o.addEventListener("pointerup",oe)}function X(x){te&&j(K-(x.clientX-re),!1)}function oe(){te&&(te=!1,t.classList.remove("right-sidebar-resizing"),o.removeEventListener("pointermove",X),o.removeEventListener("pointerup",oe),j(U(),!0))}function de(x){x.key==="ArrowLeft"?(x.preventDefault(),j(U()+Ye,!0)):x.key==="ArrowRight"&&(x.preventDefault(),j(U()-Ye,!0))}e.resizeHandle.addEventListener("pointerdown",ne),e.resizeHandle.addEventListener("keydown",de);const he=xt(t,{onSwipe:(x,B,Y)=>{const ee=bt(Y,e.root,t),Z=ft(ee,x,B,p());!f&&Z.action!==null||(Z.action==="cycle-next"?A(1):Z.action==="cycle-prev"?A(-1):Z.action==="close"&&ae())}});function ie(){f||(f=!0,t.classList.add("right-sidebar-open"),j(U(),!1),M.render(),s==="notes"&&(y==null||y.refresh()))}function ae(){var x;f&&(f=!1,t.classList.remove("right-sidebar-open"),ce(t,{right:0}),(x=n.onClose)==null||x.call(n))}function ue(){f?ae():ie()}function d(x){f||ie(),P("glossary"),r.getGlossaryTerms().then(B=>{c.setTerms(B),c.scrollToAndFlash(x)})}function L(){f&&(n.getSizeClass()==="phone"?ce(t,{right:0}):ce(t,{right:U()}))}R(l.current);function J(){g||(g=!0,u&&clearTimeout(u),E(),e.searchInput.removeEventListener("input",H),e.openInMainBtn.removeEventListener("click",$),e.closeBtn.removeEventListener("click",Q),a.removeEventListener("click",q),e.resizeHandle.removeEventListener("pointerdown",ne),o.removeEventListener("pointermove",X),o.removeEventListener("pointerup",oe),e.resizeHandle.removeEventListener("keydown",de),he.destroy(),e.contextTabBtn.removeEventListener("click",I),e.notesTabBtn.removeEventListener("click",S),y==null||y.destroy(),e.glossaryTabBtn.removeEventListener("click",C),c.destroy(),M.destroy(),m==null||m.destroy(),t.classList.remove("right-sidebar-open","right-sidebar-resizing"),ce(t,{right:0}),e.root.remove(),a.remove())}return{open:ie,close:ae,toggle:ue,isOpen:()=>f,destroy:J,refreshLayout:L,openGlossaryTerm:d}}function ke(t,r){const n=document.createElement("button");return n.type="button",n.className=r,n.setAttribute("aria-label",t),n}function Pr(t){const r=t.createElement("div");r.className="rx-playback-bar",r.setAttribute("role","group"),r.setAttribute("aria-label","Narration transport");const n=ke("Skip back 15 seconds","rx-playback-icon-btn rx-playback-skip-back");n.innerHTML=ge("skip_back");const o=ke("Play","rx-playback-icon-btn rx-playback-play-pause");o.setAttribute("aria-pressed","false"),o.innerHTML=ge("play");const e=ke("Skip forward 15 seconds","rx-playback-icon-btn rx-playback-skip-forward");e.innerHTML=ge("skip_forward");const a=ke("Playback speed","rx-playback-rate-btn");a.textContent="1x";const i=t.createElement("div");i.className="rx-playback-info";const l=t.createElement("span");l.className="rx-playback-chapter",l.setAttribute("aria-live","polite");const c=t.createElement("span");return c.className="rx-playback-position",c.textContent="0:00",i.append(l,c),r.append(n,o,e,i,a),{root:r,skipBackBtn:n,playPauseBtn:o,skipForwardBtn:e,rateBtn:a,chapterLabel:l,positionLabel:c}}const Mr=`
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
`;class Hr{constructor(){D(this,"timeline",null);D(this,"activeAudioIndex",0)}setTimeline(r){this.timeline=r,this.activeAudioIndex=0}clear(){this.timeline=null,this.activeAudioIndex=0}hasTimeline(){return this.timeline!==null}itemFor(r){const n=this.timeline;if(!n)return null;const o=a=>a.beginSec<=r&&(a.endSec===null||r<a.endSec);let e=n.items.filter(a=>a.audioIndex===this.activeAudioIndex&&o(a));if(e.length===0){e=n.items.filter(o);const a=e[0];a&&(this.activeAudioIndex=a.audioIndex)}return e.length===0?null:e.reduce((a,i)=>i.beginSec>a.beginSec?i:a)}textHrefFor(r){var n;return((n=this.itemFor(r))==null?void 0:n.textHref)??null}}const tt="reactor-playback-stylesheet",rt=15,ve=[.75,1,1.25,1.5,1.75,2];function Or(t){if(t.getElementById(tt))return;const r=t.createElement("style");r.id=tt,r.textContent=Mr,t.head.appendChild(r)}function Fr(t){const r=Number.isFinite(t)&&t>0?t:0,n=Math.floor(r),o=Math.floor(n/60),e=n%60;return`${o}:${String(e).padStart(2,"0")}`}function nt(t){return ve.reduce((r,n)=>Math.abs(n-t)<Math.abs(r-t)?n:r,ve[0]??1)}function Rr(t,r,n,o={}){const e=t.ownerDocument??document;Or(e);let a=null,i=!1,l=!1,c=!1,s=!1,m=0,f=1,g=!1,u=!1,h=0,y=!1,w="shell";const p=new Hr;function A(E,$=null,Q=null){n.emitIntent({type:"playback",action:E,positionSec:$,rate:Q})}const P=()=>A(s?"pause":"play"),I=()=>A("seek",Math.max(0,m-rt)),C=()=>A("seek",m+rt),S=()=>{const E=ve.indexOf(nt(f)),$=ve[(E+1)%ve.length]??1;A("rateChange",null,$)};function N(){a&&(a.playPauseBtn.setAttribute("aria-pressed",String(s)),a.playPauseBtn.setAttribute("aria-label",s?"Pause":"Play"),a.playPauseBtn.innerHTML=ge(s?"pause":"play"),a.positionLabel.textContent=Fr(m),a.rateBtn.textContent=`${nt(f)}x`,z())}function M(){if(!a)return;const E=a.root.classList.contains("rx-playback-chrome-hidden");ce(t,{bottom:E?0:a.root.offsetHeight||56})}function z(){a&&(a.root.classList.toggle("rx-playback-chrome-hidden",!g||!y&&!s),M())}function G(E){a&&a.chapterLabel.textContent!==(E??"")&&(a.chapterLabel.textContent=E??"")}function O(){i||l||(i=!0,a=Pr(e),a.root.classList.toggle("e-ink",!!o.eink),t.appendChild(a.root),a.playPauseBtn.addEventListener("click",P),a.skipBackBtn.addEventListener("click",I),a.skipForwardBtn.addEventListener("click",C),a.rateBtn.addEventListener("click",S),N(),_())}function _(){!i||!u||w==="host"||(h+=1,r.narrationPrepare(h))}function F(){if(!i||!u||w==="host")return;const E=p.textHrefFor(m);E?r.narrationHighlight(E):r.narrationUnhighlight()}function R(E){switch(E.type){case"loaded":u=E.hasMediaOverlay,p.clear(),_();break;case"relocate":G(E.chapterTitle);break;case"narrationTimeline":E.generation===h&&(p.setTimeline(E),F());break;case"narrationTimelineError":E.generation===h&&p.clear();break}}const W=r.on(R);r.replayLastEvents(R);function b(E){if(E.type==="configure"){if(c)return;c=!0,w=E.narrationFollow??"shell",E.capabilities.playback&&O()}else if(E.type==="setPlaybackState"){if(!i)return;s=E.playing,m=E.positionSec,f=E.rate,g=E.active!==!1,N(),F()}}const T=n.onCommand(b),H=n.getConfig();H&&b(H);function k(){l||(l=!0,W(),T(),a&&(a.playPauseBtn.removeEventListener("click",P),a.skipBackBtn.removeEventListener("click",I),a.skipForwardBtn.removeEventListener("click",C),a.rateBtn.removeEventListener("click",S),a.root.remove(),ce(t,{bottom:0})))}return{isVisible:()=>i,setChromeVisible:E=>{y=E,z()},destroy:k}}const Be={highlight:"Highlight",underline:"Underline",strikethrough:"Strikethrough",squiggly:"Squiggly underline"};function $r(t){const r=t.createElement("div");r.className="rx-anno-popover",r.setAttribute("role","dialog"),r.setAttribute("aria-label","Annotation"),r.hidden=!0;const n=t.createElement("div");n.className="rx-anno-status",n.setAttribute("aria-live","polite");const o=t.createElement("button");o.type="button",o.className="rx-icon-btn rx-anno-close",o.setAttribute("aria-label","Close"),o.textContent="✕";const e=t.createElement("div");e.className="rx-anno-header",e.append(n,o);const a=t.createElement("div");a.className="rx-anno-colors",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Colour");const i=St.map(w=>{const p=t.createElement("button");return p.type="button",p.className="rx-anno-swatch",p.style.setProperty("--rx-anno-swatch-color",w.value),p.setAttribute("role","radio"),p.setAttribute("aria-checked","false"),p.setAttribute("aria-label",w.label),p.dataset.color=w.value,a.append(p),p}),l=t.createElement("div");l.className="rx-anno-styles",l.setAttribute("role","group"),l.setAttribute("aria-label","Mark style");const c={};for(const w of Object.keys(Be)){const p=t.createElement("button");p.type="button",p.className=`rx-anno-style rx-anno-style-${w}`,p.textContent=Be[w],p.setAttribute("aria-label",Be[w]),p.dataset.style=w,l.append(p),c[w]=p}const s=t.createElement("button");s.type="button",s.className="rx-anno-note-toggle",s.textContent="Note",s.setAttribute("aria-expanded","false");const m=t.createElement("div");m.className="rx-anno-note-form",m.hidden=!0;const f=t.createElement("textarea");f.className="rx-anno-note-textarea",f.setAttribute("aria-label","Note text"),f.rows=3;const g=t.createElement("div");g.className="rx-anno-note-actions";const u=t.createElement("button");u.type="button",u.className="rx-anno-note-save",u.textContent="Save";const h=t.createElement("button");h.type="button",h.className="rx-anno-note-cancel",h.textContent="Cancel",g.append(h,u),m.append(f,g);const y=t.createElement("button");return y.type="button",y.className="rx-anno-delete",y.textContent="Delete",y.hidden=!0,r.append(e,a,l,s,m,y),{root:r,colorRow:a,colorButtons:i,styleRow:l,styleButtons:c,noteToggleBtn:s,noteForm:m,noteTextarea:f,noteSaveBtn:u,noteCancelBtn:h,deleteBtn:y,closeBtn:o,statusLabel:n}}const _r=`
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
`,at="reactor-annotations-stylesheet";function Dr(t){return t==="underline"||t==="squiggly"?"underline":"highlight"}class Gr{constructor(r=500){D(this,"map",new Map);this.cap=r}get(r){return this.map.get(r)}addAll(r){for(const n of r)for(this.map.delete(n.cfi),this.map.set(n.cfi,n);this.map.size>this.cap;){const o=this.map.keys().next().value;if(o===void 0)break;this.map.delete(o)}}}function Vr({shellRoot:t,core:r,hostChannel:n,options:o={}}){const e=t.ownerDocument??document;if(!e.getElementById(at)){const b=e.createElement("style");b.id=at,b.textContent=_r,e.head.appendChild(b)}const a=$r(e);t.append(a.root);const i=new Gr;let l=Se,c=!1,s=null,m=null;function f(){s=null,m=null,a.root.hidden=!0,a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}function g(b){const T=t.getBoundingClientRect(),H=b?b.left-T.left:(t.clientWidth||300)/2-140,k=b?b.bottom-T.top+8:60,E=Math.max(0,(t.clientWidth||300)-288);a.root.style.left=`${Math.min(Math.max(0,H),E)}px`,a.root.style.top=`${Math.max(0,k)}px`}function u(b){l=b;for(const T of a.colorButtons)T.setAttribute("aria-checked",String(T.dataset.color===b))}function h(b){for(const[T,H]of Object.entries(a.styleButtons))H.setAttribute("aria-pressed",String(T===b))}function y(b,T,H){s={kind:"create",cfi:b,text:T},a.statusLabel.textContent="Add mark",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.noteTextarea.value="",u(l),h(null),a.root.hidden=!1,g(H)}function w(b,T){s={kind:"edit",note:b},a.statusLabel.textContent="Edit mark",a.deleteBtn.hidden=!1,a.noteForm.hidden=!0,a.noteTextarea.value=b.note??"",u(b.color??Se),h(b.style??(b.kind==="underline"?"underline":"highlight")),a.root.hidden=!1,g(T)}function p(b,T){s=null,m=b,a.statusLabel.textContent="Loading…",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.root.hidden=!1,g(T),n.emitIntent({type:"notesPageRequest",offset:0,limit:1,filter:null,sort:null,query:`cfi:${b}`})}function A(b){if(b.type==="selection"&&b.cfi)y(b.cfi,b.text,b.rect);else if(b.type==="selectionCleared")(s==null?void 0:s.kind)==="create"&&f();else if(b.type==="annotationTap"){if(!b.cfi)return;const T=i.get(b.cfi);T?w(T,b.rect):p(b.cfi,b.rect)}}const P=r.on(A);function I(b){if(b.type==="setNotes"&&(i.addAll(b.items),m)){const T=b.items.find(H=>H.cfi===m);if(T){const H=a.root.hidden?null:{left:parseFloat(a.root.style.left||"0"),top:parseFloat(a.root.style.top||"0"),bottom:0};w(T,H)}else f()}}const C=n.onCommand(I);function S(b){(s==null?void 0:s.kind)==="create"&&(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:Dr(b),color:l,style:b,text:s.text,note:null}),r.clearSelection(),f())}function N(b){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:l,style:b,note:s.note.note}),f())}function M(b){const H=b.currentTarget.dataset.color??Se;u(H),(s==null?void 0:s.kind)==="edit"&&n.emitIntent({type:"annotationUpdate",id:s.note.id,color:H,style:s.note.style,note:s.note.note})}for(const b of a.colorButtons)b.addEventListener("click",M);const z={highlight:()=>(s==null?void 0:s.kind)==="create"?S("highlight"):N("highlight"),underline:()=>(s==null?void 0:s.kind)==="create"?S("underline"):N("underline"),strikethrough:()=>(s==null?void 0:s.kind)==="create"?S("strikethrough"):N("strikethrough"),squiggly:()=>(s==null?void 0:s.kind)==="create"?S("squiggly"):N("squiggly")};for(const[b,T]of Object.entries(a.styleButtons))T.addEventListener("click",z[b]);function G(){const b=a.noteForm.hidden;a.noteForm.hidden=!b,a.noteToggleBtn.setAttribute("aria-expanded",String(b)),b&&a.noteTextarea.focus()}a.noteToggleBtn.addEventListener("click",G);function O(){a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}a.noteCancelBtn.addEventListener("click",O);function _(){const b=a.noteTextarea.value.trim()||null;(s==null?void 0:s.kind)==="create"?(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:"note",color:l,style:null,text:s.text,note:b}),r.clearSelection(),f()):(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:s.note.color,style:s.note.style,note:b}),f())}a.noteSaveBtn.addEventListener("click",_);function F(){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationDelete",id:s.note.id}),f())}a.deleteBtn.addEventListener("click",F);const R=()=>f();a.closeBtn.addEventListener("click",R);function W(){if(!c){c=!0,P(),C();for(const b of a.colorButtons)b.removeEventListener("click",M);for(const[b,T]of Object.entries(a.styleButtons))T.removeEventListener("click",z[b]);a.noteToggleBtn.removeEventListener("click",G),a.noteCancelBtn.removeEventListener("click",O),a.noteSaveBtn.removeEventListener("click",_),a.deleteBtn.removeEventListener("click",F),a.closeBtn.removeEventListener("click",R),a.root.remove()}}return{isOpen:()=>!a.root.hidden,close:f,destroy:W}}const Wr='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function qr(t,r,n){const o=document.createElement("button");return o.type="button",o.className=n,o.setAttribute("aria-label",t),o.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,o}function fe(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-toggle",n.setAttribute("aria-pressed","false"),n.setAttribute("data-setting",r),n.textContent=t,n}function we(t,r,n){const o=document.createElement("div");o.className=`rx-settings-pills ${n}`,o.setAttribute("role","radiogroup"),o.setAttribute("aria-label",t);for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-settings-pill",a.setAttribute("role","radio"),a.setAttribute("aria-checked","false"),a.setAttribute("data-value",e.id),a.textContent=e.label,o.appendChild(a)}return o}function le(t,r,n,o){const e=document.createElement("div");e.className="rx-settings-slider-row";const a=document.createElement("div");a.className="rx-settings-slider-label";const i=document.createElement("span");i.textContent=t;const l=document.createElement("span");l.className="rx-settings-slider-value",a.append(i,l);const c=document.createElement("input");return c.type="range",c.className="rx-settings-slider",c.min=String(r),c.max=String(n),c.step=String(o),c.setAttribute("aria-label",t),e.append(a,c),{row:e,input:c,value:l}}function Ur(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-tab",n.setAttribute("role","tab"),n.setAttribute("aria-selected","false"),n.setAttribute("data-tab",t),n.id=`rx-settings-tab-${t}`,n.textContent=r,n}function me(t){const r=document.createElement("div");return r.className="rx-settings-panel",r.setAttribute("role","tabpanel"),r.setAttribute("data-panel",t),r.setAttribute("aria-labelledby",`rx-settings-tab-${t}`),r.hidden=!0,r}function Kr(t){const r=document.createElement("div");r.className="rx-settings-scrim";const n=document.createElement("div");n.className="rx-settings-sheet",n.setAttribute("role","dialog"),n.setAttribute("aria-label","Text settings"),n.tabIndex=-1;const o=document.createElement("div");o.className="rx-settings-head";const e=document.createElement("h3");e.className="rx-settings-title",e.textContent="Text settings";const a=qr("Close settings",Wr,"rx-icon-btn rx-settings-close");o.append(e,a);const i=document.createElement("div");i.className="rx-settings-scope",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Settings scope");const l=document.createElement("button");l.type="button",l.className="rx-settings-scope-btn",l.setAttribute("role","radio"),l.setAttribute("aria-checked","true"),l.setAttribute("data-scope","global"),l.textContent="Global";const c=document.createElement("button");c.type="button",c.className="rx-settings-scope-btn",c.setAttribute("role","radio"),c.setAttribute("aria-checked","false"),c.setAttribute("data-scope","book"),c.textContent="This book",i.append(l,c);const s=document.createElement("div");s.className="rx-settings-tabs",s.setAttribute("role","tablist");const m=[["typography","Typography"],["layout","Layout"],["theme","Theme"],["controls","Controls"],["playback","Playback"]],f={};for(const[K,ne]of m){const X=Ur(K,ne);f[K]=X,s.appendChild(X)}const g=document.createElement("div");g.className="rx-settings-body";const u=me("typography"),h=le("Font size",13,28,1),y=le("Paragraph spacing",0,2,.1),w=we("Typeface",[],"rx-settings-font-pills");u.append(h.row,w,y.row);const p=me("layout"),A=we("Reading mode",[{id:"paginated",label:"Paginated"},{id:"scrolled",label:"Scrolling"}],"rx-settings-flow-pills"),P=we("Columns",[{id:"1",label:"1 column"},{id:"2",label:"2 columns"}],"rx-settings-columns-pills"),I=document.createElement("div");I.className="rx-settings-margins-group";const C=document.createElement("div");C.className="rx-settings-margins-head";const S=document.createElement("span");S.className="rx-settings-margins-label",S.textContent="Margins";const N=fe("Link left and right margins","linkSideMargins");N.classList.add("rx-settings-link-toggle"),C.append(S,N);const M=le("Top",0,96,4),z=le("Bottom",0,96,4),G=le("Left",0,96,4),O=le("Right",0,96,4);I.append(C,M.row,z.row,G.row,O.row);const _=le("Line spacing",1.2,1.95,.05),F=fe("Justify text","justify"),R=fe("Hyphenate","hyphenate"),W=fe("Use book's own styling","useBookLayout");p.append(A,P,I,_.row,F,R,W);const b=me("theme"),T=document.createElement("div");T.className="rx-settings-swatches",T.setAttribute("role","radiogroup"),T.setAttribute("aria-label","Theme"),b.append(T);const H=me("controls"),k=fe("Swipe to turn pages","swipe"),E=we("Tap zone size",[{id:"standard",label:"Standard"},{id:"wide",label:"Wide"}],"rx-settings-tapzone-pills"),$=document.createElement("div");$.className="rx-settings-volumekeys",$.hidden=!0;const Q=fe("Volume keys turn pages","volumeKeys");$.append(Q),H.append(k,E,$);const q=me("playback"),U=document.createElement("p");U.className="rx-settings-empty",U.textContent="No narration provider for this book.";const j=document.createElement("div");j.className="rx-settings-playback-controls",j.hidden=!0;const te=le("Narration speed",.5,3,.1),re=le("Skip forward (seconds)",5,60,5);return j.append(te.row,re.row),q.append(U,j),g.append(u,p,b,H,q),n.append(o,i,s,g),t.append(r,n),{root:n,scrim:r,closeBtn:a,scopeGlobalBtn:l,scopeBookBtn:c,tabsRow:s,tabButtons:f,panels:{typography:u,layout:p,theme:b,controls:H,playback:q},fontSizeInput:h.input,fontSizeValue:h.value,paragraphSpacingInput:y.input,paragraphSpacingValue:y.value,fontFamilyPills:w,flowPills:A,columnsPills:P,linkSideMarginsToggle:N,marginTopInput:M.input,marginTopValue:M.value,marginBottomInput:z.input,marginBottomValue:z.value,marginLeftInput:G.input,marginLeftValue:G.value,marginRightInput:O.input,marginRightValue:O.value,lineHeightInput:_.input,lineHeightValue:_.value,justifyToggle:F,hyphenateToggle:R,useBookLayoutToggle:W,themeSwatches:T,swipeToggle:k,tapZonePills:E,volumeKeysRow:$,volumeKeysToggle:Q,playbackEmpty:U,playbackControls:j,narrationSpeedInput:te.input,narrationSpeedValue:te.value,skipForwardInput:re.input,skipForwardValue:re.value}}const Yr=`
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

/* BO-53 #7: visual affordance for controls disabled while useBookLayout is on (see
   renderPublisherOverridesGate in mount.ts) - otherwise a disabled slider/pill looks identical
   to an enabled one and a user has no idea why it has no effect. */
.rx-settings-pill:disabled,
.rx-settings-toggle:disabled,
.rx-settings-slider:disabled {
  opacity: 0.4;
  cursor: not-allowed;
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
`,ot={fontSize:16,lineHeight:1.5,fontFamily:null,paragraphSpacing:0,maxColumnCount:2,gap:.05,maxInlineSize:720,maxBlockSize:1440,justify:!0,hyphenate:!0,isDark:!1,themeName:"default",flow:"paginated",useBookLayout:!0,marginTop:40,marginBottom:40,marginLeft:40,marginRight:40,linkSideMargins:!0},Ne=[{id:"light",label:"Light",themeName:"default",isDark:!1,swatchBg:"#ffffff",swatchFg:"#000000"},{id:"sepia",label:"Sepia",themeName:"sepia",isDark:!1,swatchBg:"#f1e8d0",swatchFg:"#5b4636"},{id:"dark",label:"Dark",themeName:"default",isDark:!0,swatchBg:"#222222",swatchFg:"#e0e0e0"},{id:"amoled",label:"AMOLED",themeName:"amoled",isDark:!0,swatchBg:"#000000",swatchFg:"#ffffff"}];function jr(t,r){return Ne.find(n=>n.themeName===t&&n.isDark===r)??Ne.find(n=>n.id===(r?"dark":"light"))}const st=[{id:"publisher",label:"Publisher",value:null},{id:"serif",label:"Serif",value:'Georgia, "Iowan Old Style", "Times New Roman", serif'},{id:"sans",label:"Sans-serif",value:'-apple-system, "Segoe UI", Roboto, Arial, sans-serif'},{id:"mono",label:"Monospace",value:'"Courier New", monospace'}];function Xr(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function Zr(t){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const e=Xr(t);if(e.length===0){o.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],l=t.ownerDocument.activeElement;o.shiftKey&&l===a?(o.preventDefault(),i.focus()):!o.shiftKey&&l===i&&(o.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const it="reactor-settings-stylesheet",Jr=["typography","layout","theme","controls","playback"];function Qr(t){if(t.getElementById(it))return;const r=t.createElement("style");r.id=it,r.textContent=Yr,t.head.appendChild(r)}function en(t,r,n){var ie,ae,ue;const o=t.ownerDocument??document;Qr(o);const e=Kr(t),a=Zr(e.root),i={global:{...ot},book:{...ot}};let l="global",c="typography",s=!1,m=!1,f=((ae=(ie=n.hostChannel)==null?void 0:ie.getConfig())==null?void 0:ae.capabilities.playback)??!1,g=null;e.volumeKeysRow.hidden=!n.volumeKeysCapability;function u(d){t.classList.remove("theme-dark","theme-amoled"),d.themeName==="amoled"?t.classList.add("theme-amoled"):d.isDark&&t.classList.add("theme-dark")}function h(){return i[l]}function y(){const d=h().fontFamily;for(const L of Array.from(e.fontFamilyPills.children)){const J=st.find(se=>se.id===L.dataset.value);L.setAttribute("aria-checked",String((J==null?void 0:J.value)===d))}}function w(){const d=jr(h().themeName,h().isDark);for(const L of Array.from(e.themeSwatches.children))L.setAttribute("aria-checked",String(L.dataset.value===d.id))}function p(d,L){for(const J of Array.from(d.children))J.setAttribute("aria-checked",String(J.dataset.value===L))}function A(){e.playbackEmpty.hidden=f,e.playbackControls.hidden=!f}function P(){const d=h().useBookLayout;for(const L of Array.from(e.fontFamilyPills.children))L.disabled=d;e.paragraphSpacingInput.disabled=d,e.lineHeightInput.disabled=d,e.justifyToggle.disabled=d,e.hyphenateToggle.disabled=d}function I(){const d=h();e.fontSizeInput.value=String(d.fontSize),e.fontSizeInput.setAttribute("aria-valuetext",`${d.fontSize}px`),e.fontSizeValue.textContent=`${d.fontSize}px`,e.paragraphSpacingInput.value=String(d.paragraphSpacing),e.paragraphSpacingValue.textContent=`${d.paragraphSpacing}em`,y(),p(e.flowPills,d.flow),p(e.columnsPills,String(d.maxColumnCount)),e.marginTopInput.value=String(d.marginTop),e.marginTopInput.setAttribute("aria-valuetext",`${d.marginTop}px`),e.marginTopValue.textContent=`${d.marginTop}px`,e.marginBottomInput.value=String(d.marginBottom),e.marginBottomInput.setAttribute("aria-valuetext",`${d.marginBottom}px`),e.marginBottomValue.textContent=`${d.marginBottom}px`,e.marginLeftInput.value=String(d.marginLeft),e.marginLeftInput.setAttribute("aria-valuetext",`${d.marginLeft}px`),e.marginLeftValue.textContent=`${d.marginLeft}px`,e.marginRightInput.value=String(d.marginRight),e.marginRightInput.setAttribute("aria-valuetext",`${d.marginRight}px`),e.marginRightValue.textContent=`${d.marginRight}px`,e.linkSideMarginsToggle.setAttribute("aria-pressed",String(d.linkSideMargins)),e.lineHeightInput.value=String(d.lineHeight),e.lineHeightValue.textContent=d.lineHeight.toFixed(2),e.justifyToggle.setAttribute("aria-pressed",String(d.justify)),e.hyphenateToggle.setAttribute("aria-pressed",String(d.hyphenate)),e.useBookLayoutToggle.setAttribute("aria-pressed",String(d.useBookLayout)),P(),w(),A(),e.scopeGlobalBtn.setAttribute("aria-checked",String(l==="global")),e.scopeBookBtn.setAttribute("aria-checked",String(l==="book"))}function C(d){var L;i[l]={...i[l],...d},I(),r.applyStyles(i[l]),u(i[l]),(L=n.hostChannel)==null||L.emitIntent({type:"settingsChange",scope:l,settings:i[l]})}function S(){C({fontSize:Number(e.fontSizeInput.value)})}e.fontSizeInput.addEventListener("change",S);function N(){C({paragraphSpacing:Number(e.paragraphSpacingInput.value)})}e.paragraphSpacingInput.addEventListener("change",N);for(const d of st){const L=document.createElement("button");L.type="button",L.className="rx-settings-pill",L.setAttribute("role","radio"),L.setAttribute("aria-checked","false"),L.setAttribute("data-value",d.id),L.textContent=d.label,L.addEventListener("click",()=>C({fontFamily:d.value})),e.fontFamilyPills.appendChild(L)}function M(d){const L=d.currentTarget.dataset.value;C({flow:L})}for(const d of Array.from(e.flowPills.children))d.addEventListener("click",M);function z(d){const L=Number(d.currentTarget.dataset.value);C({maxColumnCount:L})}for(const d of Array.from(e.columnsPills.children))d.addEventListener("click",z);function G(){C({marginTop:Number(e.marginTopInput.value)})}e.marginTopInput.addEventListener("change",G);function O(){C({marginBottom:Number(e.marginBottomInput.value)})}e.marginBottomInput.addEventListener("change",O);function _(){const d=Number(e.marginLeftInput.value);h().linkSideMargins?C({marginLeft:d,marginRight:d}):C({marginLeft:d})}e.marginLeftInput.addEventListener("change",_);function F(){const d=Number(e.marginRightInput.value);h().linkSideMargins?C({marginLeft:d,marginRight:d}):C({marginRight:d})}e.marginRightInput.addEventListener("change",F);function R(){C({linkSideMargins:!h().linkSideMargins})}e.linkSideMarginsToggle.addEventListener("click",R);function W(){C({lineHeight:Number(e.lineHeightInput.value)})}e.lineHeightInput.addEventListener("change",W);function b(){C({justify:!h().justify})}e.justifyToggle.addEventListener("click",b);function T(){C({hyphenate:!h().hyphenate})}e.hyphenateToggle.addEventListener("click",T);function H(){C({useBookLayout:!h().useBookLayout})}e.useBookLayoutToggle.addEventListener("click",H);for(const d of Ne){const L=document.createElement("button");L.type="button",L.className="rx-settings-swatch",L.setAttribute("role","radio"),L.setAttribute("aria-checked","false"),L.setAttribute("aria-label",d.label),L.setAttribute("data-value",d.id);const J=document.createElement("span");J.className="rx-settings-swatch-dot",J.style.background=d.swatchBg;const se=document.createElement("span");se.textContent=d.label,L.append(J,se),L.addEventListener("click",()=>C({themeName:d.themeName,isDark:d.isDark})),e.themeSwatches.appendChild(L)}let k=!0;function E(){k=!k,e.swipeToggle.setAttribute("aria-pressed",String(k)),r.setSwipe(k)}e.swipeToggle.addEventListener("click",E),e.swipeToggle.setAttribute("aria-pressed",String(k));let $="standard";function Q(d){$=d.currentTarget.dataset.value??"standard",p(e.tapZonePills,$)}for(const d of Array.from(e.tapZonePills.children))d.addEventListener("click",Q);p(e.tapZonePills,$);let q=!1;function U(){q=!q,e.volumeKeysToggle.setAttribute("aria-pressed",String(q))}e.volumeKeysToggle.addEventListener("click",U);function j(){var L;const d=Number(e.narrationSpeedInput.value);e.narrationSpeedValue.textContent=`${d.toFixed(1)}x`,(L=n.hostChannel)==null||L.emitIntent({type:"playback",action:"rateChange",positionSec:null,rate:d})}e.narrationSpeedInput.addEventListener("input",()=>{e.narrationSpeedValue.textContent=`${Number(e.narrationSpeedInput.value).toFixed(1)}x`}),e.narrationSpeedInput.addEventListener("change",j);function te(){e.skipForwardValue.textContent=`${e.skipForwardInput.value}s`}e.skipForwardInput.addEventListener("input",te),e.narrationSpeedInput.value="1",e.narrationSpeedValue.textContent="1.0x",e.skipForwardInput.value="30",e.skipForwardValue.textContent="30s";function re(d){d!==c&&(e.tabButtons[c].setAttribute("aria-selected","false"),e.panels[c].hidden=!0,c=d,e.tabButtons[c].setAttribute("aria-selected","true"),e.panels[c].hidden=!1)}for(const d of Jr)e.tabButtons[d].addEventListener("click",()=>re(d));re("typography"),e.tabButtons.typography.setAttribute("aria-selected","true"),e.panels.typography.hidden=!1;function K(d){d!==l&&(l=d,I(),r.applyStyles(i[l]),u(i[l]))}e.scopeGlobalBtn.addEventListener("click",()=>K("global")),e.scopeBookBtn.addEventListener("click",()=>K("book"));const ne=(ue=n.hostChannel)==null?void 0:ue.onCommand(d=>{d.type==="setSettingsScope"?(i[d.scope]=d.settings,d.scope===l&&(I(),r.applyStyles(i[l]),u(i[l]))):d.type==="configure"&&(f=d.capabilities.playback,A())});function X(){var d;s||(s=!0,g=o.activeElement??null,t.classList.add("settings-open"),e.scrim.classList.add("visible"),a.activate(),e.root.focus({preventScroll:!0}),(d=n.onOpenChange)==null||d.call(n,!0))}function oe(){var d,L;s&&(s=!1,t.classList.remove("settings-open"),e.scrim.classList.remove("visible"),a.deactivate(),(d=g==null?void 0:g.focus)==null||d.call(g),g=null,(L=n.onOpenChange)==null||L.call(n,!1))}function de(){s?oe():X()}e.closeBtn.addEventListener("click",oe),e.scrim.addEventListener("click",oe),I();function he(){m||(m=!0,ne==null||ne(),a.deactivate(),t.classList.remove("settings-open"),e.root.remove(),e.scrim.remove())}return{open:X,close:oe,toggle:de,isOpen:()=>s,getActiveSettings:()=>h(),getActiveScope:()=>l,destroy:he}}const tn={top:0,right:0,bottom:0,left:0};function lt(t,r){t.style.setProperty("--rx-inset-top",`${Math.max(0,r.top)}px`),t.style.setProperty("--rx-inset-right",`${Math.max(0,r.right)}px`),t.style.setProperty("--rx-inset-bottom",`${Math.max(0,r.bottom)}px`),t.style.setProperty("--rx-inset-left",`${Math.max(0,r.left)}px`)}const rn=280,ct="reactor-shell-stylesheet";function nn(t){if(t.getElementById(ct))return;const r=t.createElement("style");r.id=ct,r.textContent=At,t.head.appendChild(r)}function an(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function on(){const t=new Set;return{getChromeState:()=>({barsVisible:!1,sidebar:"none"}),onChromeState:r=>(t.add(r),()=>t.delete(r)),setBarsVisible:()=>{},refreshSizeClass:()=>{},destroy:()=>{t.clear()}}}function cn(t,r,n={}){var Me,He,Oe,Fe,Re,$e,_e,De,Ge,Ve;if((n.chrome??"reactor")==="host")return on();const e=t.ownerDocument??document;nn(e);const a=Lt(t),i=a.root;let l=!1,c=!1,s="none",m=!1,f=!1,g=null;const u=new Set;function h(){var V;if(f)return;const v={barsVisible:c,sidebar:s};for(const ye of u)ye(v);(V=n.hostChannel)==null||V.emitIntent({type:"chromeState",barsVisible:c,sidebar:s})}function y(v){c!==v&&(c=v,i.classList.toggle("ui-visible",c),X==null||X.setChromeVisible(c),h())}function w(){y(!c)}const p=er(i,v=>r.goTo(v),{eink:n.eink,onBack:()=>{var v;return(v=n.hostChannel)==null?void 0:v.emitIntent({type:"back"})},onSidebarChange:v=>{s=v?"left":"none",a.contentsBtn.setAttribute("aria-pressed",String(v)),h(),I()}});function A(){return i.classList.contains("size-desktop")}function P(){if(p.isOpen()){p.close();return}A()||K.close(),B.close(),p.open()}a.contentsBtn.addEventListener("click",P);function I(){const v=i.classList.contains("size-desktop");ce(i,{left:v&&p.isOpen()?rn:0})}function C(){i.classList.toggle("reduced-motion",N||an())}function S(){i.classList.toggle("e-ink",N)}let N=((He=(Me=n.hostChannel)==null?void 0:Me.getConfig())==null?void 0:He.eink)??!!n.eink;S(),C(),lt(i,((Fe=(Oe=n.hostChannel)==null?void 0:Oe.getConfig())==null?void 0:Fe.insets)??tn);const M=(Re=n.hostChannel)==null?void 0:Re.onCommand(v=>{v.type==="configure"&&(N=v.eink,S(),C(),lt(i,v.insets))});function z(){const v=t.clientWidth||i.clientWidth,V=Ce(v);i.classList.remove("size-phone","size-fold-tablet","size-desktop"),i.classList.add(`size-${V}`),I()}z();function G(){z(),K.refreshLayout()}const O=typeof ResizeObserver=="function"?new ResizeObserver(()=>G()):null;O==null||O.observe(t);const _=()=>G();O||window.addEventListener("resize",_);const F=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,R=()=>C();($e=F==null?void 0:F.addEventListener)==null||$e.call(F,"change",R);function W(v,V){const ye=Nt(v,l);ye==="prev"?r.prev():ye==="next"?r.next():w()}function b(v){v==="prev"?r.prev():v==="next"?r.next():w()}function T(v,V){V.key!=="Enter"&&V.key!==" "||(V.preventDefault(),b(v))}const H=()=>b(l?"next":"prev"),k=()=>b(l?"prev":"next"),E=()=>b("toggle"),$=v=>T(l?"next":"prev",v),Q=v=>T(l?"prev":"next",v),q=v=>T("toggle",v);a.zoneLeft.addEventListener("click",H),a.zoneRight.addEventListener("click",k),a.zoneCentre.addEventListener("click",E),a.zoneLeft.addEventListener("keydown",$),a.zoneRight.addEventListener("keydown",Q),a.zoneCentre.addEventListener("keydown",q);function U(){return B.isOpen()?(B.close(),!0):x!=null&&x.isOpen()?(x.close(),!0):ee.isOpen()?(ee.close(),!0):K.isOpen()?(ne(),!0):p.isOpen()?(p.close(),!0):c?(y(!1),!0):!1}function j(v){const V=Pt(v);V&&(Mt(V)&&v.preventDefault(),V==="next"?r.next():V==="prev"?r.prev():V==="toggleBars"?w():V==="escape"&&U())}e.addEventListener("keydown",j);const te=()=>r.historyBack(),re=()=>r.historyForward();a.historyBackBtn.addEventListener("click",te),a.historyForwardBtn.addEventListener("click",re);const K=Ir(i,r,{getSizeClass:()=>Ce(t.clientWidth||i.clientWidth),onWidthChange:n.onContextWidthChange,hostChannel:n.hostChannel,onClose:()=>{s="none",a.contextBtn.setAttribute("aria-pressed","false"),h()}});function ne(){s==="right"?(K.close(),s="none"):(A()||p.close(),B.close(),K.open(),s="right"),a.contextBtn.setAttribute("aria-pressed",String(s==="right")),h()}a.contextBtn.addEventListener("click",ne);const X=n.hostChannel?Rr(i,r,n.hostChannel,{eink:n.eink}):null;let oe=new Set;function de(){a.bookmarkBtn.setAttribute("aria-pressed",String(!!g&&oe.has(g)))}function he(){!n.hostChannel||!g||n.hostChannel.emitIntent({type:"bookmarkToggle",cfi:g})}const ie=(_e=n.hostChannel)==null?void 0:_e.onCommand(v=>{v.type==="setBookmarks"&&(oe=new Set(v.items.map(V=>V.cfi)),de())});a.bookmarkBtn.addEventListener("click",he);let ae=!1;function ue(v){ae||(ae=!0,a.narrationBtn.hidden=!v)}let d=!1;function L(){a.narrationBtn.setAttribute("aria-pressed",String(d))}function J(){var v;(v=n.hostChannel)==null||v.emitIntent({type:"playback",action:d?"stop":"play",positionSec:null,rate:null})}const se=(De=n.hostChannel)==null?void 0:De.onCommand(v=>{v.type==="configure"?ue(v.capabilities.playback):v.type==="setPlaybackState"&&(d=v.active!==!1,L())}),be=(Ge=n.hostChannel)==null?void 0:Ge.getConfig();be&&ue(be.capabilities.playback),a.narrationBtn.addEventListener("click",J);const x=n.hostChannel?Vr({shellRoot:i,core:r,hostChannel:n.hostChannel,options:{eink:n.eink}}):null,B=en(i,r,{getSizeClass:()=>Ce(t.clientWidth||i.clientWidth),eink:n.eink,hostChannel:n.hostChannel,volumeKeysCapability:n.volumeKeysCapability,onOpenChange:v=>{a.settingsBtn.setAttribute("aria-pressed",String(v))}});function Y(){if(B.isOpen()){B.close();return}p.close(),K.close(),s="none",a.contentsBtn.setAttribute("aria-pressed","false"),a.contextBtn.setAttribute("aria-pressed","false"),h(),B.open()}a.settingsBtn.addEventListener("click",Y);const ee=Lr(i,r,{onOpenInGlossary:v=>{K.openGlossaryTerm(v),s="right",a.contextBtn.setAttribute("aria-pressed","true"),h()}}),Z=(Ve=n.hostChannel)==null?void 0:Ve.onCommand(v=>{var V;v.type==="dismiss"&&!U()&&((V=n.hostChannel)==null||V.emitIntent({type:"back"}))}),ze=()=>{m=!0},Ie=()=>{m=!1,r.goToFraction(Number(a.scrubber.value)/1e3)};a.scrubber.addEventListener("pointerdown",ze),a.scrubber.addEventListener("change",Ie);function Pe(v){switch(v.type){case"loaded":l=v.isRtl,i.classList.toggle("is-rtl",l),p.setToc(v.toc),I();break;case"relocate":g=v.cfi??null,a.chapterLabel&&a.chapterLabel.textContent!==(v.chapterTitle??"")&&(a.chapterLabel.textContent=v.chapterTitle??""),!m&&typeof v.fraction=="number"&&(a.scrubber.value=String(Math.round(v.fraction*1e3))),p.setCurrentChapterTitle(v.chapterTitle),de();break;case"history":a.historyBackBtn.disabled=!v.canGoBack,a.historyForwardBtn.disabled=!v.canGoForward;break;case"tap":W(v.x,v.y);break}}const vt=r.on(Pe);r.replayLastEvents(Pe),h();function yt(){z()}function kt(){var v;f||(f=!0,vt(),O==null||O.disconnect(),O||window.removeEventListener("resize",_),(v=F==null?void 0:F.removeEventListener)==null||v.call(F,"change",R),e.removeEventListener("keydown",j),a.zoneLeft.removeEventListener("click",H),a.zoneRight.removeEventListener("click",k),a.zoneCentre.removeEventListener("click",E),a.zoneLeft.removeEventListener("keydown",$),a.zoneRight.removeEventListener("keydown",Q),a.zoneCentre.removeEventListener("keydown",q),a.historyBackBtn.removeEventListener("click",te),a.historyForwardBtn.removeEventListener("click",re),a.contextBtn.removeEventListener("click",ne),a.bookmarkBtn.removeEventListener("click",he),a.narrationBtn.removeEventListener("click",J),se==null||se(),ie==null||ie(),Z==null||Z(),M==null||M(),x==null||x.destroy(),K.destroy(),X==null||X.destroy(),a.settingsBtn.removeEventListener("click",Y),B.destroy(),ee.destroy(),a.scrubber.removeEventListener("pointerdown",ze),a.scrubber.removeEventListener("change",Ie),a.contentsBtn.removeEventListener("click",P),p.destroy(),u.clear(),i.classList.remove("reader-shell","ui-visible","e-ink","reduced-motion","is-rtl","size-phone","size-fold-tablet","size-desktop","settings-open"),a.zones.remove(),a.topBar.remove(),a.bottomBar.remove())}return{getChromeState:()=>({barsVisible:c,sidebar:s}),onChromeState:v=>(u.add(v),()=>u.delete(v)),setBarsVisible:y,refreshSizeClass:yt,destroy:kt}}export{We as ZONE_FRACTION,Ce as computeSizeClass,Mt as isPreventableKey,Rr as mountPlaybackBar,Ir as mountRightSidebar,en as mountSettingsPanel,cn as mountShell,Pt as resolveKeyboardAction,Nt as resolveTapZone};
