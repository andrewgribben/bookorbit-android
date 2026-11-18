var wt=Object.defineProperty;var Et=(t,r,n)=>r in t?wt(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;var G=(t,r,n)=>Et(t,typeof r!="symbol"?r+"":r,n);import{A as St,D as Le}from"./index-DvTAFnd0.js";const Ct={menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',bookmark:'<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',panel_right:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',back:'<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',forward:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',skip_back:'<polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/>',skip_forward:'<polygon points="13 19 22 12 13 5 13 19"/><polygon points="2 19 11 12 2 5 2 19"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-6a9 9 0 0 1 18 0v6a1 1 0 0 1-1 1h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',sleep:'<path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/>'};function ge(t){return`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${Ct[t]}</svg>`}function he(t,r,n=!1){const s=document.createElement("button");return s.type="button",s.className="rx-icon-btn",s.setAttribute("aria-label",t),s.innerHTML=ge(r),n&&s.setAttribute("aria-pressed","false"),s}function Lt(t){t.classList.add("reader-shell");const r=document.createElement("div");r.className="rx-zones";const n=document.createElement("div");n.className="rx-zone rx-zone-left",n.setAttribute("role","button"),n.setAttribute("tabindex","0"),n.setAttribute("aria-label","Previous page");const s=document.createElement("div");s.className="rx-zone rx-zone-centre",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label","Toggle bars");const e=document.createElement("div");e.className="rx-zone rx-zone-right",e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label","Next page"),r.append(n,s,e);const a=document.createElement("div");a.className="rx-bar rx-bar-top",a.setAttribute("role","toolbar");const i=he("Table of contents","menu",!0),l=he("Bookmark","bookmark",!0),d=he("Toggle narration","headphones",!0);d.hidden=!0;const o=he("Text settings","settings",!0),v=he("Open context panel","panel_right",!0),b=document.createElement("div");b.className="rx-bar-spacer",a.append(i,l,b,d,o,v);const y=document.createElement("div");y.className="rx-bar rx-bar-bottom";const u=document.createElement("div");u.className="rx-status-row",u.setAttribute("aria-live","polite");const h=he("Back","back");h.disabled=!0;const m=document.createElement("span");m.className="rx-chapter-label";const g=he("Forward","forward");g.disabled=!0,u.append(h,m,g);const p=document.createElement("input");return p.type="range",p.className="rx-scrubber",p.min="0",p.max="1000",p.step="1",p.value="0",p.setAttribute("aria-label","Reading position"),y.append(u,p),t.append(r,a,y),{root:t,zones:r,zoneLeft:n,zoneCentre:s,zoneRight:e,topBar:a,bottomBar:y,contentsBtn:i,bookmarkBtn:l,narrationBtn:d,settingsBtn:o,contextBtn:v,historyBackBtn:h,historyForwardBtn:g,chapterLabel:m,scrubber:p}}const At=`
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
`,Tt=599,Bt=1200;function Ae(t){return t<=Tt?"phone":t<=Bt?"fold-tablet":"desktop"}const Ve=.3;function Nt(t,r){const n=Math.min(1,Math.max(0,t));return n<Ve?r?"next":"prev":n>1-Ve?r?"prev":"next":"toggle"}const zt=new Set(["ArrowRight","ArrowDown","PageDown"," "]),It=new Set(["ArrowLeft","ArrowUp","PageUp"]);function Mt(t){return t.ctrlKey||t.metaKey||t.altKey?null:zt.has(t.key)?"next":It.has(t.key)?"prev":t.key==="m"||t.key==="M"?"toggleBars":t.key==="Escape"?"escape":null}function Pt(t){return t==="next"||t==="prev"}const Ht='<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',Ot='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function qe(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-icon-btn",n.setAttribute("aria-label",t),n.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,n}function Rt(t){const r=document.createElement("div");r.className="rx-left-sidebar",r.setAttribute("aria-label","Table of contents"),r.tabIndex=-1;const n=document.createElement("div");n.className="rx-left-sidebar-scrim";const s=document.createElement("div");s.className="rx-sidebar-head";const e=qe("Back",Ht),a=document.createElement("h3");a.className="rx-sidebar-title",a.textContent="Contents";const i=qe("Close contents",Ot);i.classList.add("rx-left-sidebar-close"),s.append(e,a,i);const l=document.createElement("div");l.className="rx-left-sidebar-tabs",l.setAttribute("role","tablist");function d(P,B){const E=document.createElement("button");return E.type="button",E.className="rx-left-sidebar-tab",E.setAttribute("role","tab"),E.setAttribute("aria-selected","false"),E.setAttribute("data-tab",B),E.id=`rx-tab-${B}`,E.textContent=P,E}const o=d("Contents","contents"),v=d("Starred","starred"),b=d("Related","related");l.append(o,v,b);const y=document.createElement("div");y.className="rx-left-sidebar-body";function u(P){const B=document.createElement("div");return B.className="rx-sidebar-panel",B.setAttribute("role","tabpanel"),B.setAttribute("data-panel",P),B.setAttribute("aria-labelledby",`rx-tab-${P}`),B.hidden=!0,B}const h=u("contents"),m=document.createElement("div");m.className="rx-toc-scroll";const g=document.createElement("div");g.className="rx-toc-spacer";const p=document.createElement("div");p.className="rx-toc-window",p.setAttribute("role","list"),g.appendChild(p),m.appendChild(g),h.appendChild(m);const N=u("starred"),I=u("related");return y.append(h,N,I),r.append(s,l,y),t.append(n,r),{root:r,scrim:n,backBtn:e,closeBtn:i,title:a,tablist:l,tabContents:o,tabStarred:v,tabRelated:b,body:y,panelContents:h,tocScroll:m,tocSpacer:g,tocWindow:p,panelStarred:N,panelRelated:I}}const Ft=`
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
  /* BO-53: the sidebar background still fills inset:0 (no seam at the status bar), but its
   * content box pads by the host's safe-area insets (--rx-inset-*, src/shell/insets.ts) so the
   * header/tabs/close button and the scrolled list's bottom row never sit under a system bar or
   * cutout. Left sidebar always docks against the physical left edge, overlay or docked, so the
   * left inset applies unconditionally. Zero insets (desktop/web host, WORKTREE_BRIEF.md rule 1)
   * resolve to 0px and change nothing. */
  padding-top: var(--rx-inset-top, 0px);
  padding-bottom: var(--rx-inset-bottom, 0px);
  padding-left: var(--rx-inset-left, 0px);
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
`;function dt(t,r=null,n=0){const s=[];for(let e=0;e<t.length;e++){const a=t[e],i=r===null?String(e):`${r}.${e}`;s.push({id:i,label:a.label,href:a.href,depth:n,hasChildren:a.subitems.length>0,parentId:r}),a.subitems.length>0&&s.push(...dt(a.subitems,i,n+1))}return s}function $t(t,r){if(r.size===0)return t;const n=new Set,s=[];for(const e of t){if(e.parentId!==null&&(n.has(e.parentId)||r.has(e.parentId))){n.add(e.id);continue}s.push(e)}return s}function _t(t,r){if(!r)return null;const n=Ue(r);let s=null;for(const e of t)if(e.href){if(e.href===r)return e.id;s===null&&Ue(e.href)===n&&(s=e)}return(s==null?void 0:s.id)??null}function Dt(t,r){if(!r)return null;for(const n of t)if(n.label===r)return n.id;return null}function Ue(t){const r=t.indexOf("#");return r===-1?t:t.slice(0,r)}function Gt(t,r,n,s,e=8){if(s===0||r<=0)return{start:0,end:-1};const a=Math.floor(t/r),i=Math.ceil(n/r),l=Math.max(0,a-e),d=Math.min(s-1,a+i+e);return{start:l,end:d}}const Te=48;function Kt(t,r,n,s){const e=document.createElement("div");if(e.className="rx-toc-row",e.setAttribute("role","listitem"),e.style.paddingLeft=`${12+t.depth*18}px`,s&&e.classList.add("is-current"),t.hasChildren){const d=document.createElement("button");d.type="button",d.className="rx-toc-toggle";const o=!r.collapsed.has(t.id);d.setAttribute("aria-expanded",String(o)),d.setAttribute("aria-label",`${o?"Collapse":"Expand"} ${t.label}`),d.textContent=o?"▾":"▸",d.addEventListener("click",v=>{v.stopPropagation(),n.onToggleExpand(t)}),e.appendChild(d)}else{const d=document.createElement("span");d.className="rx-toc-toggle-spacer",e.appendChild(d)}const a=document.createElement("button");a.type="button",a.className="rx-toc-label",a.setAttribute("aria-label",t.label),s&&a.setAttribute("aria-current","true"),a.textContent=t.label,a.addEventListener("click",()=>n.onActivate(t)),e.appendChild(a);const i=document.createElement("button");i.type="button",i.className="rx-toc-star";const l=t.href?r.starred.has(t.href):!1;return i.setAttribute("aria-pressed",String(l)),i.setAttribute("aria-label",`${l?"Unstar":"Star"} ${t.label}`),i.textContent=l?"★":"☆",i.addEventListener("click",d=>{d.stopPropagation(),n.onToggleStar(t)}),e.appendChild(i),e}function Wt(t,r,n,s,e){const a=$t(s.flat,s.collapsed),i=_t(a,s.currentHref)??Dt(a,s.currentChapterTitle);r.style.height=`${a.length*Te}px`;const l=t.clientHeight||1,{start:d,end:o}=Gt(t.scrollTop,Te,l,a.length);n.replaceChildren(),n.style.transform=`translateY(${d*Te}px)`;for(let v=d;v<=o;v++){const b=a[v];b&&n.appendChild(Kt(b,s,e,b.id===i))}}function Vt(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No starred chapters yet. Star a chapter in Contents to find it here.",t.appendChild(e);return}const s=document.createElement("div");s.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-starred-row",a.setAttribute("role","listitem"),a.textContent=e.label,a.addEventListener("click",()=>n(e)),s.appendChild(a)}t.appendChild(s)}function qt(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No related books yet.",t.appendChild(e);return}const s=document.createElement("div");s.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-related-row",a.setAttribute("role","listitem");const i=`${e.title}${e.subtitle?`, ${e.subtitle}`:""}${e.read?", read":""}`;if(a.setAttribute("aria-label",i),e.coverUrl){const o=document.createElement("img");o.className="rx-related-cover",o.src=e.coverUrl,o.alt="",a.appendChild(o)}else{const o=document.createElement("div");o.className="rx-related-cover rx-related-cover-empty",a.appendChild(o)}const l=document.createElement("div");l.className="rx-related-text";const d=document.createElement("span");if(d.className="rx-related-title",d.textContent=e.title,l.appendChild(d),e.subtitle){const o=document.createElement("span");o.className="rx-related-subtitle",o.textContent=e.subtitle,l.appendChild(o)}if(a.appendChild(l),e.read){const o=document.createElement("span");o.className="rx-related-badge",o.textContent="Read",a.appendChild(o)}a.addEventListener("click",()=>n(e)),s.appendChild(a)}t.appendChild(s)}function ut(t,r){return ht(t,r,1)}function pt(t,r){return ht(t,r,-1)}function ht(t,r,n){if(t.length===0)return r;const s=t.indexOf(r);if(s===-1)return t[0];const e=(s+n+t.length)%t.length;return t[e]}function Ut(t,r){return ut(t,r)}function Yt(t,r){return pt(t,r)}const jt=40;function Xt(t,r){return Math.abs(t)>=jt&&Math.abs(t)>Math.abs(r)}function bt(t,r,n,s){return Xt(r,n)?t==="sidebar"?{action:r<0?"cycle-next":"cycle-prev"}:t==="book"&&s?{action:"close"}:{action:null}:{action:null}}function ft(t,r,n){return t&&r.contains(t)?"sidebar":t&&n.contains(t)&&!r.contains(t)?"book":"other"}function xt(t,r){let n=0,s=0,e=0,a=0,i=null,l=!1,d=!1;function o(p,N,I,P){n=e=p,s=a=N,i=I,l=!0,d=P}function v(){l&&(l=!1,r.onSwipe(e-n,a-s,i),i=null)}function b(p){p.pointerType!=="pen"&&o(p.clientX,p.clientY,p.target,p.pointerType==="touch")}function y(p){l&&(e=p.clientX,a=p.clientY)}function u(p){e=p.clientX,a=p.clientY,v()}function h(){d||v()}function m(p){if(!l)return;const N=p.touches[0];N&&(e=N.clientX,a=N.clientY)}function g(){v()}return t.addEventListener("pointerdown",b),t.addEventListener("pointermove",y),t.addEventListener("pointerup",u),t.addEventListener("pointercancel",h),t.addEventListener("touchmove",m,{passive:!0}),t.addEventListener("touchend",g,{passive:!0}),{destroy(){t.removeEventListener("pointerdown",b),t.removeEventListener("pointermove",y),t.removeEventListener("pointerup",u),t.removeEventListener("pointercancel",h),t.removeEventListener("touchmove",m),t.removeEventListener("touchend",g)}}}function Zt(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function Jt(t){let r=!1;function n(s){if(!r||s.key!=="Tab")return;const e=Zt(t);if(e.length===0){s.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],l=t.ownerDocument.activeElement;s.shiftKey&&l===a?(s.preventDefault(),i.focus()):!s.shiftKey&&l===i&&(s.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const Ye="reactor-left-sidebar-stylesheet";function Qt(t){if(t.getElementById(Ye))return;const r=t.createElement("style");r.id=Ye,r.textContent=Ft,t.head.appendChild(r)}function er(t,r,n={}){var A,R;const s=t.ownerDocument??document;Qt(s);const e=Rt(t);e.root.classList.add("closed");const a=["contents","starred"];(A=n.capabilities)!=null&&A.related&&a.push("related"),e.tabRelated.hidden=!((R=n.capabilities)!=null&&R.related);let i="contents",l=!1,d=!1,o=[];const v=new Set;let b=null,y=null;const u=new Set,h=new Map;let m=[];const g=Jt(e.root);let p=null;function N(){return!t.classList.contains("size-desktop")}function I(w){return w==="contents"?e.panelContents:w==="starred"?e.panelStarred:e.panelRelated}function P(w){return w==="contents"?e.tabContents:w==="starred"?e.tabStarred:e.tabRelated}function B(){if(i==="contents")Wt(e.tocScroll,e.tocSpacer,e.tocWindow,{flat:o,collapsed:v,currentHref:b,currentChapterTitle:y,starred:u},{onActivate:w=>{w.href&&r(w.href),N()&&M()},onToggleExpand:w=>{v.has(w.id)?v.delete(w.id):v.add(w.id),B()},onToggleStar:w=>{var O;if(!w.href)return;const z=!u.has(w.href);z?(u.add(w.href),h.set(w.href,w.label)):(u.delete(w.href),h.delete(w.href)),(O=n.onStarToggle)==null||O.call(n,w.href,w.label,z),B()}});else if(i==="starred"){const w=Array.from(h,([z,O])=>({href:z,label:O}));Vt(e.panelStarred,w,z=>{r(z.href),N()&&M()})}else qt(e.panelRelated,m,w=>{var z;(z=n.onOpenRelated)==null||z.call(n,w.id),N()&&M()})}function E(w){w!==i&&(P(i).setAttribute("aria-selected","false"),I(i).hidden=!0,i=w,P(i).setAttribute("aria-selected","true"),I(i).hidden=!1,B())}function C(w){const z=w===1?Ut(a,i):Yt(a,i);E(z)}e.tabContents.addEventListener("click",()=>E("contents")),e.tabStarred.addEventListener("click",()=>E("starred")),e.tabRelated.addEventListener("click",()=>E("related")),E("contents"),P("contents").setAttribute("aria-selected","true"),I("contents").hidden=!1;function H(){var z;if(l)return;l=!0,p=s.activeElement??null,e.root.classList.add("open"),e.root.classList.remove("closed"),t.classList.add("rx-left-sidebar-open"),e.scrim.classList.toggle("visible",N());const w=N();e.root.setAttribute("role",w?"dialog":"complementary"),w?e.root.setAttribute("aria-modal","true"):e.root.removeAttribute("aria-modal"),w&&(g.activate(),e.root.focus()),(z=n.onSidebarChange)==null||z.call(n,!0)}function M(){var w,z;l&&(l=!1,e.root.classList.remove("open"),e.root.classList.add("closed"),t.classList.remove("rx-left-sidebar-open"),e.scrim.classList.remove("visible"),g.deactivate(),(w=p==null?void 0:p.focus)==null||w.call(p),p=null,(z=n.onSidebarChange)==null||z.call(n,!1))}e.closeBtn.addEventListener("click",M),e.scrim.addEventListener("click",M),e.backBtn.addEventListener("click",()=>{var w;return(w=n.onBack)==null?void 0:w.call(n)});const K=xt(t,{onSwipe:(w,z,O)=>{const q=ft(O,e.root,t),j=bt(q,w,z,N());!l&&j.action!==null||(j.action==="cycle-next"?C(1):j.action==="cycle-prev"?C(-1):j.action==="close"&&M())}});function F(w){o=dt(w),v.clear(),i==="contents"&&B()}function W(w){h.clear(),u.clear();for(const z of w)u.add(z.href),h.set(z.href,z.label);(i==="starred"||i==="contents")&&B()}function $(w){m=w,i==="related"&&B()}function D(w){b=w,i==="contents"&&B()}function Y(w){y=w,i==="contents"&&B()}function f(){d||(d=!0,K.destroy(),e.closeBtn.removeEventListener("click",M),e.scrim.removeEventListener("click",M),g.deactivate(),t.classList.remove("rx-left-sidebar-open"),e.root.remove(),e.scrim.remove())}return{open:H,close:M,isOpen:()=>l,cycleTab:C,getActiveTab:()=>i,setToc:F,setStarred:W,setRelated:$,setCurrentHref:D,setCurrentChapterTitle:Y,destroy:f}}function Be(t,r,n){const s=document.createElement("button");return s.type="button",s.className="rx-sidebar-tab",s.textContent=t,s.setAttribute("role","tab"),s.setAttribute("aria-selected",String(r)),s.dataset.tab=n,r&&s.classList.add("active"),s}function tr(t){const r=t.createElement("div");r.className="rx-right-sidebar",r.setAttribute("role","complementary"),r.setAttribute("aria-label","Context panel");const n=t.createElement("div");n.className="rx-sidebar-resize",n.setAttribute("role","separator"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-label","Resize context panel"),n.setAttribute("tabindex","0");const s=t.createElement("div");s.className="rx-sidebar-tabs";const e=t.createElement("div");e.className="rx-sidebar-tablist",e.setAttribute("role","tablist");const a=Be("Context",!0,"context"),i=Be("Glossary",!1,"glossary"),l=Be("Notes",!1,"notes");l.disabled=!0;const d=t.createElement("button");d.type="button",d.className="rx-icon-btn rx-sidebar-close",d.setAttribute("aria-label","Close panel"),d.textContent="✕",e.append(a,i,l),s.append(e,d);const o=t.createElement("div");o.className="rx-ctx-searchbar",o.setAttribute("role","search");const v=t.createElement("input");v.type="search",v.className="rx-ctx-search-input",v.placeholder="Search this book",v.setAttribute("aria-label","Search this book");const b=t.createElement("button");b.type="button",b.className="rx-icon-btn rx-ctx-openmain",b.setAttribute("aria-label","Open in main window"),b.disabled=!0,b.textContent="↗";const y=t.createElement("div");y.className="rx-ctx-crumbs",y.setAttribute("aria-live","polite"),o.append(v,b,y);const u=t.createElement("div");u.className="rx-sidebar-body";const h=t.createElement("div");h.className="rx-ctx-results";const m=t.createElement("div");m.className="rx-ctx-page",m.hidden=!0;const g=t.createElement("div");g.className="rx-notes-body",g.hidden=!0;const p=t.createElement("div");return p.className="rx-glossary-panel-mount",p.hidden=!0,u.append(h,m,g,p),r.append(n,s,o,u),{root:r,resizeHandle:n,tabsRow:s,contextTabBtn:a,glossaryTabBtn:i,notesTabBtn:l,closeBtn:d,searchBar:o,searchInput:v,openInMainBtn:b,breadcrumb:y,body:u,resultsScroller:h,contextPage:m,notesBody:g,glossaryPanelMount:p}}const rr=`
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
  /* BO-53: background keeps top:0/bottom:0 (no seam at the status bar), content box pads by the
   * host's safe-area insets (--rx-inset-*, src/shell/insets.ts) so the tab row, close button and
   * scrolled list's bottom row never sit under a bar or cutout. Right sidebar always docks
   * against the physical right edge, overlay or docked, so the right inset applies
   * unconditionally. Zero insets (desktop/web host, WORKTREE_BRIEF.md rule 1) change nothing. */
  padding-top: var(--rx-inset-top, 0px);
  padding-bottom: var(--rx-inset-bottom, 0px);
  padding-right: var(--rx-inset-right, 0px);
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
`;class nr{constructor(){G(this,"rows",[]);G(this,"headerAt",new Map)}reset(){this.rows=[],this.headerAt.clear()}addGroup(r,n){if(n.length!==0){this.headerAt.has(r)||(this.headerAt.set(r,this.rows.length),this.rows.push({kind:"header",label:r}));for(const s of n)this.rows.push({kind:"item",item:s,groupLabel:r})}}get rowCount(){return this.rows.length}rowAt(r){return this.rows[r]}get isEmpty(){return this.rows.length===0}}class gt{constructor(r){G(this,"container");G(this,"rowHeight");G(this,"buffer");G(this,"opts");G(this,"topSpacer");G(this,"bottomSpacer");G(this,"rowsEl");G(this,"onScroll");G(this,"destroyed",!1);this.opts=r,this.container=r.container,this.rowHeight=r.rowHeight,this.buffer=r.buffer??6,this.topSpacer=document.createElement("div"),this.topSpacer.className="rx-wlist-spacer",this.bottomSpacer=document.createElement("div"),this.bottomSpacer.className="rx-wlist-spacer",this.rowsEl=document.createElement("div"),this.rowsEl.className="rx-wlist-rows",this.rowsEl.setAttribute("role","list"),this.container.replaceChildren(this.topSpacer,this.rowsEl,this.bottomSpacer),this.onScroll=()=>this.render(),this.container.addEventListener("scroll",this.onScroll)}visibleRange(){const r=this.opts.rowCount(),n=this.container.clientHeight||1,s=this.container.scrollTop||0,e=Math.max(0,Math.floor(s/this.rowHeight)-this.buffer),a=Math.ceil(n/this.rowHeight)+this.buffer*2,i=Math.min(r,e+a);return{first:e,last:i}}render(){if(this.destroyed)return;const r=this.opts.rowCount(),{first:n,last:s}=this.visibleRange();this.topSpacer.style.height=`${n*this.rowHeight}px`,this.bottomSpacer.style.height=`${Math.max(0,r-s)*this.rowHeight}px`,this.rowsEl.replaceChildren();for(let e=n;e<s;e++)this.rowsEl.appendChild(this.opts.renderRow(e))}destroy(){this.destroyed||(this.destroyed=!0,this.container.removeEventListener("scroll",this.onScroll),this.container.replaceChildren())}}function ar(t,r){return t.kind!==r.kind?!1:t.kind==="page"&&r.kind==="page"?t.target===r.target:!0}class sr{constructor(){G(this,"stack",[{kind:"blank"}]);G(this,"index",0)}get current(){return this.stack[this.index]??{kind:"blank"}}get canGoBack(){return this.index>0}get canGoForward(){return this.index<this.stack.length-1}push(r){ar(this.current,r)||(this.stack=this.stack.slice(0,this.index+1),this.stack.push(r),this.index=this.stack.length-1)}back(){return this.canGoBack?(this.index-=1,this.current):null}forward(){return this.canGoForward?(this.index+=1,this.current):null}reset(){this.stack=[{kind:"blank"}],this.index=0}}const or={"fold-tablet":320,desktop:340},Ce=240,je=16,ir={"fold-tablet":.6,desktop:.7};function lr(t,r,n){const s=ir[n],e=Math.max(Ce,r*s);return t<Ce?Ce:t>e?e:t}const mt=new WeakMap;function Ne(t){return mt.get(t)??{left:0,right:0,bottom:0}}function ce(t,r){const n={left:Math.max(0,r.left??Ne(t).left),right:Math.max(0,r.right??Ne(t).right),bottom:Math.max(0,r.bottom??Ne(t).bottom)};return mt.set(t,n),t.style.setProperty("--rx-book-inset-left",`${n.left}px`),t.style.setProperty("--rx-book-inset-right",`${n.right}px`),t.style.setProperty("--rx-book-inset-bottom",`${n.bottom}px`),t.style.paddingLeft=n.left?`${n.left}px`:"",t.style.paddingRight=n.right?`${n.right}px`:"",t.style.paddingBottom=n.bottom?`${n.bottom}px`:"",n}const cr=[{id:"all",label:"All"},{id:"highlight",label:"Highlight"},{id:"underline",label:"Underline"},{id:"note",label:"Typed note"},{id:"handwritten",label:"Handwritten"},{id:"bookmark",label:"Bookmark"}],dr=[{id:"position",label:"Position in book"},{id:"date",label:"Date"},{id:"colour",label:"Colour"},{id:"type",label:"Type"}];function ur(t){const r=t.createElement("div");r.className="rx-notes-panel";const n=t.createElement("div");n.className="rx-notes-searchbar",n.setAttribute("role","search");const s=t.createElement("input");s.type="search",s.className="rx-notes-search-input",s.placeholder="Search notes",s.setAttribute("aria-label","Search notes"),n.append(s);const e=t.createElement("select");e.className="rx-notes-sort",e.setAttribute("aria-label","Sort notes by");for(const{id:o,label:v}of dr){const b=t.createElement("option");b.value=o,b.textContent=v,e.append(b)}n.append(e);const a=t.createElement("div");a.className="rx-notes-filters",a.setAttribute("role","group"),a.setAttribute("aria-label","Filter notes by type");const i={};for(const{id:o,label:v}of cr){const b=t.createElement("button");b.type="button",b.className="rx-notes-chip",b.textContent=v,b.setAttribute("aria-pressed",String(o==="all")),o==="all"&&b.classList.add("active"),b.dataset.filter=o,a.append(b),i[o]=b}const l=t.createElement("div");l.className="rx-notes-banner",l.hidden=!0,l.textContent="No annotation store connected. Notes made in this session are not saved.";const d=t.createElement("div");return d.className="rx-notes-list",r.append(n,a,l,d),{root:r,searchBar:n,searchInput:s,filterRow:a,filterButtons:i,sortSelect:e,capabilityBanner:l,listScroller:d}}const pr=`
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
`,hr=100,br=20;function fr(t){return t==="all"?null:t}class xr{constructor(r){G(this,"total",0);G(this,"offset",0);G(this,"items",[]);G(this,"state",{filter:"all",sort:"position",query:null});G(this,"lastRequestedOffset",null);G(this,"everRequested",!1);this.hostChannel=r}getState(){return this.state}setState(r){this.state={...this.state,...r},this.total=0,this.offset=0,this.items=[],this.lastRequestedOffset=null,this.requestPage(0)}ensureInitialLoad(){this.everRequested||this.requestPage(0)}rowCount(){return this.total}rowAt(r){const n=r-this.offset;if(!(n<0||n>=this.items.length))return this.items[n]}ensureLoaded(r,n){const s=Math.max(r,n-1);if(this.rowAt(r)&&this.rowAt(s))return;const e=Math.max(0,r-br);this.lastRequestedOffset!==e&&this.requestPage(e)}requestPage(r){this.everRequested=!0,this.lastRequestedOffset=r,this.hostChannel.emitIntent({type:"notesPageRequest",offset:r,limit:hr,filter:fr(this.state.filter),sort:this.state.sort,query:this.state.query})}applyWindow(r){this.total=r.total,this.offset=r.offset,this.items=r.items,this.lastRequestedOffset=null}}const Xe="reactor-notes-stylesheet",gr=48,mr=200,Ze={highlight:"Highlight",underline:"Underline",note:"Typed note",bookmark:"Bookmark"};function vr(t,r){return r?`${Ze[t]} · ${r}`:Ze[t]}function yr({container:t,core:r,hostChannel:n,options:s={}}){const e=t.ownerDocument??document;if(!e.getElementById(Xe)){const E=e.createElement("style");E.id=Xe,E.textContent=pr,e.head.appendChild(E)}const a=ur(e);t.append(a.root);const i=new xr(n);let l=!1,d=null;const o=new Map,v=new Set;function b(E){o.has(E)||v.has(E)||typeof r.getChapterTitleForCfi=="function"&&(v.add(E),r.getChapterTitleForCfi(E).then(C=>{o.set(E,C)}).catch(()=>{o.set(E,null)}).finally(()=>{v.delete(E),!l&&u.render()}))}function y(E){i.ensureLoaded(E,E+1);const C=i.rowAt(E);if(!C){const Y=e.createElement("div");return Y.className="rx-notes-loading-row",Y.setAttribute("role","listitem"),Y.textContent="Loading…",Y}const H=e.createElement("button");H.type="button",H.className="rx-notes-row";const M=e.createElement("span");M.className="rx-notes-row-swatch",C.color&&M.style.setProperty("--rx-notes-row-color",C.color);const K=e.createElement("span");K.className="rx-notes-row-body";const F=e.createElement("span");F.className="rx-notes-row-snippet",F.textContent=C.note??C.text??"";const W=e.createElement("span");W.className="rx-notes-row-meta";const $=o.get(C.cfi);W.textContent=vr(C.kind,$??null),K.append(F,W),H.append(M,K),H.setAttribute("aria-label",`${W.textContent}: ${F.textContent}`),$===void 0&&b(C.cfi),H.addEventListener("click",()=>r.goTo(C.cfi));const D=e.createElement("div");return D.setAttribute("role","listitem"),D.appendChild(H),D}const u=new gt({container:a.listScroller,rowHeight:gr,rowCount:()=>i.rowCount(),renderRow:y});function h(E){const C=E.currentTarget,H=C.dataset.filter??"all";for(const M of Object.values(a.filterButtons))M.classList.toggle("active",M===C),M.setAttribute("aria-pressed",String(M===C));i.setState({filter:H}),u.render()}for(const E of Object.values(a.filterButtons))E.addEventListener("click",h);function m(){i.setState({sort:a.sortSelect.value}),u.render()}a.sortSelect.addEventListener("change",m);function g(){d&&clearTimeout(d),d=setTimeout(()=>{i.setState({query:a.searchInput.value.trim()||null}),u.render()},mr)}a.searchInput.addEventListener("input",g);function p(E){E.type==="setNotes"&&(i.applyWindow(E),u.render())}const N=n.onCommand(p);function I(){var E;a.capabilityBanner.hidden=((E=n.getConfig())==null?void 0:E.capabilities.notes)!==!1,i.ensureInitialLoad(),u.render()}function P(){u.render()}function B(){if(!l){l=!0,d&&clearTimeout(d),N();for(const E of Object.values(a.filterButtons))E.removeEventListener("click",h);a.sortSelect.removeEventListener("change",m),a.searchInput.removeEventListener("input",g),u.destroy(),a.root.remove()}}return{onActivate:I,refresh:P,destroy:B}}function kr(t){const r=t.createElement("div");r.className="rx-glossary-panel",r.style.position="absolute",r.style.inset="0";const n=t.createElement("div");n.className="rx-glossary-search",n.setAttribute("role","search");const s=t.createElement("input");s.type="search",s.className="rx-glossary-search-input",s.placeholder="Search glossary",s.setAttribute("aria-label","Search glossary"),n.appendChild(s);const e=t.createElement("div");return e.className="rx-glossary-list",e.setAttribute("role","list"),r.append(n,e),{root:r,searchInput:s,list:e}}const wr=900;function Er(t){const r=t.ownerDocument??document,n=kr(r);t.appendChild(n.root);let s=[],e="",a=!1;function i(){const y=e.trim().toLowerCase();return[...y?s.filter(h=>h.term.toLowerCase().includes(y)):s].sort((h,m)=>h.term.localeCompare(m.term))}function l(){if(a)return;const y=i();if(n.list.replaceChildren(),!s.length){n.list.removeAttribute("role");const u=r.createElement("div");u.className="rx-glossary-empty",u.textContent="This book has no glossary.",n.list.appendChild(u);return}if(!y.length){n.list.removeAttribute("role");const u=r.createElement("div");u.className="rx-glossary-empty",u.textContent=`No terms match "${e}".`,n.list.appendChild(u);return}n.list.setAttribute("role","list");for(const u of y){let h=function(){const N=m.classList.toggle("expanded");g.setAttribute("aria-expanded",String(N))};const m=r.createElement("div");m.className="rx-glossary-item",m.setAttribute("role","listitem"),m.setAttribute("data-term",u.term);const g=r.createElement("button");g.type="button",g.className="rx-glossary-term-row",g.setAttribute("role","button"),g.setAttribute("aria-expanded","false"),g.textContent=u.term;const p=r.createElement("div");p.className="rx-glossary-def",p.textContent=u.definition,g.addEventListener("click",h),m.append(g,p),n.list.appendChild(m)}}function d(){e=n.searchInput.value,l()}n.searchInput.addEventListener("input",d),l();function o(y){s=y,l()}function v(y){var h,m;e&&(e="",n.searchInput.value="",l());const u=n.list.querySelector(`.rx-glossary-item[data-term="${CSS.escape(y)}"]`);u&&(u.classList.add("expanded"),(h=u.querySelector(".rx-glossary-term-row"))==null||h.setAttribute("aria-expanded","true"),(m=u.scrollIntoView)==null||m.call(u,{block:"center"}),u.classList.add("flash"),setTimeout(()=>u.classList.remove("flash"),wr))}function b(){a||(a=!0,n.searchInput.removeEventListener("input",d),n.root.remove())}return{setTerms:o,scrollToAndFlash:v,destroy:b}}const Je=9,me=8,Qe=16;function Sr(t,r,n,s){const e=t.top+t.height;let a=t.left;a=Math.min(Math.max(me,a),Math.max(me,r.width-n-me));let i=e+Je,l=!1;if(i+s>r.height-me){const o=t.top-s-Je;i=Math.max(me,o),l=!0}const d=Math.max(Qe,Math.min(n-Qe,t.left+t.width/2-a));return{left:a,top:i,above:l,arrowX:d}}const Cr='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';function Lr(t,r,n){const s=t.ownerDocument??document;let e=null,a=!1;function i(){var u;const y=!!e;e==null||e.remove(),e=null,y&&((u=t.querySelector("iframe"))==null||u.focus())}function l(y,u){var I;i();const h=s.createElement("div");h.className="rx-glossary-popover",h.setAttribute("role","dialog"),h.setAttribute("aria-label",`${y.term} definition`),h.innerHTML=`
      <div class="rx-glossary-popover-head">
        <h4 class="rx-glossary-popover-term"></h4>
        <button type="button" class="rx-icon-btn rx-glossary-popover-open" aria-label="Open in glossary" title="Open in glossary">${Cr}</button>
      </div>
      <p class="rx-glossary-popover-def"></p>
    `,h.querySelector(".rx-glossary-popover-term").textContent=y.term,h.querySelector(".rx-glossary-popover-def").textContent=y.definition,t.appendChild(h),e=h;const m=t.getBoundingClientRect(),g={left:u.left-m.left,top:u.top-m.top,width:u.width,height:u.height},p={width:m.width,height:m.height},N=Sr(g,p,h.offsetWidth,h.offsetHeight||120);h.style.left=`${N.left}px`,h.style.top=`${N.top}px`,h.classList.toggle("above",N.above),h.style.setProperty("--arrow-x",`${N.arrowX}px`),h.querySelector(".rx-glossary-popover-open").addEventListener("click",P=>{P.stopPropagation(),i(),n.onOpenInGlossary(y.term)}),(I=h.querySelector(".rx-glossary-popover-open"))==null||I.focus()}async function d(y,u){const h=await r.getGlossaryTerms();if(a)return;const m=h.find(g=>g.term.toLowerCase()===y.toLowerCase());m&&l(m,u)}const o=r.onGlossaryTermTap(d);function v(y){var h;if(!e)return;const u=y.target;(h=u==null?void 0:u.closest)!=null&&h.call(u,".rx-glossary-popover")||i()}s.addEventListener("click",v);function b(){a||(a=!0,o(),s.removeEventListener("click",v),i())}return{isOpen:()=>e!==null,close:i,destroy:b}}const Ar=`
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
`,et="reactor-right-sidebar-stylesheet",tt="reactor-glossary-stylesheet",Tr=48,Br=200;function Nr(t){if(!t.getElementById(et)){const r=t.createElement("style");r.id=et,r.textContent=rr,t.head.appendChild(r)}if(!t.getElementById(tt)){const r=t.createElement("style");r.id=tt,r.textContent=Ar,t.head.appendChild(r)}}function zr(t){const r=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`${r(t.pre)}<mark>${r(t.match)}</mark>${r(t.post)}`}function Ir(t,r,n){var se,le;const s=t.ownerDocument??document;Nr(s);const e=tr(s),a=s.createElement("div");a.className="rx-sidebar-scrim",t.append(a,e.root);const i=new nr,l=new sr,d=Er(e.glossaryPanelMount);let o="context",v=null,b=!1,y=!1,u=null;const h=!!n.hostChannel&&((se=n.hostChannel.getConfig())==null?void 0:se.capabilities.notes)!==!1;e.notesTabBtn.disabled=!h;const m=h?yr({container:e.notesBody,core:r,hostChannel:n.hostChannel}):null;((le=n.capabilities)==null?void 0:le.glossary)===!1&&(e.glossaryTabBtn.hidden=!0);const g=["context"];e.glossaryTabBtn.hidden!==!0&&g.push("glossary"),h&&g.push("notes");function p(){return n.getSizeClass()==="phone"}function N(x){const T=x===1?ut(g,o):pt(g,o);I(T)}function I(x){x!==o&&(o=x,e.contextTabBtn.classList.toggle("active",x==="context"),e.contextTabBtn.setAttribute("aria-selected",String(x==="context")),e.glossaryTabBtn.classList.toggle("active",x==="glossary"),e.glossaryTabBtn.setAttribute("aria-selected",String(x==="glossary")),e.notesTabBtn.classList.toggle("active",x==="notes"),e.notesTabBtn.setAttribute("aria-selected",String(x==="notes")),e.searchBar.hidden=x!=="context",e.glossaryPanelMount.hidden=x!=="glossary",e.notesBody.hidden=x!=="notes",x==="context"?D(l.current):x==="glossary"?(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,r.getGlossaryTerms().then(T=>d.setTerms(T))):(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,m==null||m.onActivate()))}const P=()=>I("context"),B=()=>I("glossary"),E=()=>I("notes");e.contextTabBtn.addEventListener("click",P),e.glossaryTabBtn.addEventListener("click",B),e.notesTabBtn.addEventListener("click",E);function C(x){const T=i.rowAt(x);if(!T)return s.createElement("div");if(T.kind==="header"){const _=s.createElement("div");return _.className="rx-ctx-group-header",_.setAttribute("role","listitem"),_.textContent=T.label,_}const c=s.createElement("button");c.type="button",c.className="rx-ctx-result",c.setAttribute("role","listitem"),c.innerHTML=zr(T.item),c.addEventListener("click",()=>A(T.item,T.groupLabel));const S=s.createElement("div");return S.setAttribute("role","listitem"),S.appendChild(c),S}const H=new gt({container:e.resultsScroller,rowHeight:Tr,rowCount:()=>i.rowCount,renderRow:C});function M(){e.breadcrumb.replaceChildren();const x=s.createElement("button");x.type="button",x.textContent="Back",x.disabled=!l.canGoBack,x.setAttribute("aria-label","Back"),x.addEventListener("click",Y);const T=s.createElement("button");T.type="button",T.textContent="Forward",T.disabled=!l.canGoForward,T.setAttribute("aria-label","Forward"),T.addEventListener("click",f),e.breadcrumb.append(x,T),e.openInMainBtn.disabled=l.current.kind!=="page"}function K(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,H.render()}function F(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,H.render()}function W(){return v||(v=r.createSecondaryView(e.contextPage),v)}function $(x){e.resultsScroller.hidden=!0,e.contextPage.hidden=!1;const T=W();T&&T.goTo(x)}function D(x){x.kind==="blank"?F():x.kind==="results"?K():$(x.target),M()}function Y(){const x=l.back();x&&D(x)}function f(){const x=l.forward();x&&D(x)}function A(x,T){l.push({kind:"page",target:x.cfi,label:T}),D(l.current)}function R(){const x=e.searchInput.value.trim();i.reset(),x?l.current.kind!=="results"&&l.push({kind:"results"}):l.reset(),D(l.current),u&&clearTimeout(u),x&&(u=setTimeout(()=>r.runSearch(x),Br))}e.searchInput.addEventListener("input",R);function w(x){x.type==="searchResults"?(i.addGroup(x.label,x.items),l.current.kind==="results"&&H.render()):x.type==="loaded"&&d.setTerms([])}const z=r.on(w);function O(){const x=l.current;x.kind==="page"&&(r.goTo(x.target),n.getSizeClass()==="phone"&&te())}e.openInMainBtn.addEventListener("click",O);function q(){te()}e.closeBtn.addEventListener("click",q);const j=()=>te();a.addEventListener("click",j);function L(){const x=getComputedStyle(t).getPropertyValue("--rx-ctx-width"),T=parseFloat(x);if(!Number.isNaN(T)&&T>0)return T;const c=n.getSizeClass();return c==="phone"?Ce:or[c]}e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(L())));function V(x,T){var _;const c=n.getSizeClass();if(c==="phone")return;const S=lr(x,t.clientWidth||1200,c);t.style.setProperty("--rx-ctx-width",`${S}px`),e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(S))),b&&ce(t,{right:S}),T&&((_=n.onWidthChange)==null||_.call(n,S))}let J=!1,ee=0,X=0;function re(x){J=!0,ee=x.clientX,X=L(),t.classList.add("right-sidebar-resizing"),s.addEventListener("pointermove",Z),s.addEventListener("pointerup",ne)}function Z(x){J&&V(X-(x.clientX-ee),!1)}function ne(){J&&(J=!1,t.classList.remove("right-sidebar-resizing"),s.removeEventListener("pointermove",Z),s.removeEventListener("pointerup",ne),V(L(),!0))}function ae(x){x.key==="ArrowLeft"?(x.preventDefault(),V(L()+je,!0)):x.key==="ArrowRight"&&(x.preventDefault(),V(L()-je,!0))}e.resizeHandle.addEventListener("pointerdown",re),e.resizeHandle.addEventListener("keydown",ae);const de=xt(t,{onSwipe:(x,T,c)=>{const S=ft(c,e.root,t),_=bt(S,x,T,p());!b&&_.action!==null||(_.action==="cycle-next"?N(1):_.action==="cycle-prev"?N(-1):_.action==="close"&&te())}});function Q(){b||(b=!0,t.classList.add("right-sidebar-open"),V(L(),!1),H.render(),o==="notes"&&(m==null||m.refresh()))}function te(){var x;b&&(b=!1,t.classList.remove("right-sidebar-open"),ce(t,{right:0}),(x=n.onClose)==null||x.call(n))}function be(){b?te():Q()}function ie(x){b||Q(),I("glossary"),r.getGlossaryTerms().then(T=>{d.setTerms(T),d.scrollToAndFlash(x)})}function fe(){b&&(n.getSizeClass()==="phone"?ce(t,{right:0}):ce(t,{right:L()}))}D(l.current);function ue(){y||(y=!0,u&&clearTimeout(u),z(),e.searchInput.removeEventListener("input",R),e.openInMainBtn.removeEventListener("click",O),e.closeBtn.removeEventListener("click",q),a.removeEventListener("click",j),e.resizeHandle.removeEventListener("pointerdown",re),s.removeEventListener("pointermove",Z),s.removeEventListener("pointerup",ne),e.resizeHandle.removeEventListener("keydown",ae),de.destroy(),e.contextTabBtn.removeEventListener("click",P),e.notesTabBtn.removeEventListener("click",E),m==null||m.destroy(),e.glossaryTabBtn.removeEventListener("click",B),d.destroy(),H.destroy(),v==null||v.destroy(),t.classList.remove("right-sidebar-open","right-sidebar-resizing"),ce(t,{right:0}),e.root.remove(),a.remove())}return{open:Q,close:te,toggle:be,isOpen:()=>b,destroy:ue,refreshLayout:fe,openGlossaryTerm:ie}}function ve(t,r){const n=document.createElement("button");return n.type="button",n.className=r,n.setAttribute("aria-label",t),n}function Mr(t){const r=t.createElement("div");r.className="rx-playback-bar",r.setAttribute("role","group"),r.setAttribute("aria-label","Narration transport");const n=ve("Skip back 15 seconds","rx-playback-icon-btn rx-playback-skip-back");n.innerHTML=ge("skip_back");const s=ve("Play","rx-playback-icon-btn rx-playback-play-pause");s.setAttribute("aria-pressed","false"),s.innerHTML=ge("play");const e=ve("Skip forward 15 seconds","rx-playback-icon-btn rx-playback-skip-forward");e.innerHTML=ge("skip_forward");const a=ve("Sleep timer","rx-playback-icon-btn rx-playback-sleep");a.setAttribute("aria-pressed","false"),a.innerHTML=ge("sleep");const i=ve("Playback speed","rx-playback-rate-btn");i.textContent="1x";const l=t.createElement("div");l.className="rx-playback-info";const d=t.createElement("span");d.className="rx-playback-chapter",d.setAttribute("aria-live","polite");const o=t.createElement("span");return o.className="rx-playback-position",o.textContent="0:00",l.append(d,o),r.append(n,s,e,a,l,i),{root:r,skipBackBtn:n,playPauseBtn:s,skipForwardBtn:e,sleepBtn:a,rateBtn:i,chapterLabel:d,positionLabel:o}}const Pr=`
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
  /* The off-screen bar's upward shadow still paints over the page's bottom edge, and its
   * buttons stay focusable: drop both once the slide has finished. */
  visibility: hidden;
  transition: transform var(--rx-motion-bar, 200ms ease), visibility 0s linear 200ms;
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
.rx-playback-sleep[aria-pressed='true'] {
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
`;class Hr{constructor(){G(this,"timeline",null);G(this,"activeAudioIndex",0)}setTimeline(r){this.timeline=r,this.activeAudioIndex=0}clear(){this.timeline=null,this.activeAudioIndex=0}hasTimeline(){return this.timeline!==null}itemFor(r){const n=this.timeline;if(!n)return null;const s=a=>a.beginSec<=r&&(a.endSec===null||r<a.endSec);let e=n.items.filter(a=>a.audioIndex===this.activeAudioIndex&&s(a));if(e.length===0){e=n.items.filter(s);const a=e[0];a&&(this.activeAudioIndex=a.audioIndex)}return e.length===0?null:e.reduce((a,i)=>i.beginSec>a.beginSec?i:a)}textHrefFor(r){var n;return((n=this.itemFor(r))==null?void 0:n.textHref)??null}}const rt="reactor-playback-stylesheet",Ee=15,ke=[.75,1,1.25,1.5,1.75,2];function Or(t){if(t.getElementById(rt))return;const r=t.createElement("style");r.id=rt,r.textContent=Pr,t.head.appendChild(r)}function Rr(t){const r=Number.isFinite(t)&&t>0?t:0,n=Math.floor(r),s=Math.floor(n/60),e=n%60;return`${s}:${String(e).padStart(2,"0")}`}function nt(t){return ke.reduce((r,n)=>Math.abs(n-t)<Math.abs(r-t)?n:r,ke[0]??1)}function Fr(t,r,n,s={}){const e=t.ownerDocument??document;Or(e);let a=null,i=!1,l=!1,d=!1,o=!1,v=0,b=1,y=!1,u=!1,h=0,m=!1,g=!1,p=Ee,N=Ee,I="shell";const P=new Hr;function B(L,V=null,J=null){n.emitIntent({type:"playback",action:L,positionSec:V,rate:J})}const E=()=>B(o?"pause":"play"),C=()=>B("seek",Math.max(0,v-p)),H=()=>B("seek",v+N),M=()=>B("sleepTimer"),K=()=>{const L=ke.indexOf(nt(b)),V=ke[(L+1)%ke.length]??1;B("rateChange",null,V)};function F(){a&&(a.playPauseBtn.setAttribute("aria-pressed",String(o)),a.playPauseBtn.setAttribute("aria-label",o?"Pause":"Play"),a.playPauseBtn.innerHTML=ge(o?"pause":"play"),a.sleepBtn.setAttribute("aria-pressed",String(g)),a.positionLabel.textContent=Rr(v),a.rateBtn.textContent=`${nt(b)}x`,$())}function W(){if(!a)return;const L=a.root.classList.contains("rx-playback-chrome-hidden");ce(t,{bottom:L?0:a.root.offsetHeight||56})}function $(){a&&(a.root.classList.toggle("rx-playback-chrome-hidden",!y||!m&&!o),W())}function D(L){a&&a.chapterLabel.textContent!==(L??"")&&(a.chapterLabel.textContent=L??"")}function Y(){i||l||(i=!0,a=Mr(e),a.root.classList.toggle("e-ink",!!s.eink),t.appendChild(a.root),a.playPauseBtn.addEventListener("click",E),a.skipBackBtn.addEventListener("click",C),a.skipForwardBtn.addEventListener("click",H),a.rateBtn.addEventListener("click",K),a.sleepBtn.addEventListener("click",M),F(),f())}function f(){!i||!u||I==="host"||(h+=1,r.narrationPrepare(h))}function A(){if(!i||!u||I==="host")return;const L=P.textHrefFor(v);L?r.narrationHighlight(L):r.narrationUnhighlight()}function R(L){switch(L.type){case"loaded":u=L.hasMediaOverlay,P.clear(),f();break;case"relocate":D(L.chapterTitle);break;case"narrationTimeline":L.generation===h&&(P.setTimeline(L),A());break;case"narrationTimelineError":L.generation===h&&P.clear();break}}const w=r.on(R);r.replayLastEvents(R);function z(L){if(L.type==="configure"){if(d)return;d=!0,I=L.narrationFollow??"shell",L.capabilities.playback&&Y()}else if(L.type==="setPlaybackState"){if(!i)return;o=L.playing,v=L.positionSec,b=L.rate,y=L.active!==!1,g=L.sleepTimerActive===!0,p=L.skipBackSec??Ee,N=L.skipForwardSec??Ee,F(),A()}}const O=n.onCommand(z),q=n.getConfig();q&&z(q);function j(){l||(l=!0,w(),O(),a&&(a.playPauseBtn.removeEventListener("click",E),a.skipBackBtn.removeEventListener("click",C),a.skipForwardBtn.removeEventListener("click",H),a.rateBtn.removeEventListener("click",K),a.sleepBtn.removeEventListener("click",M),a.root.remove(),ce(t,{bottom:0})))}return{isVisible:()=>i,setChromeVisible:L=>{m=L,$()},destroy:j}}const ze={highlight:"Highlight",underline:"Underline",strikethrough:"Strikethrough",squiggly:"Squiggly underline"};function $r(t){const r=t.createElement("div");r.className="rx-anno-popover",r.setAttribute("role","dialog"),r.setAttribute("aria-label","Annotation"),r.hidden=!0;const n=t.createElement("div");n.className="rx-anno-status",n.setAttribute("aria-live","polite");const s=t.createElement("button");s.type="button",s.className="rx-icon-btn rx-anno-close",s.setAttribute("aria-label","Close"),s.textContent="✕";const e=t.createElement("div");e.className="rx-anno-header",e.append(n,s);const a=t.createElement("div");a.className="rx-anno-colors",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Colour");const i=St.map(g=>{const p=t.createElement("button");return p.type="button",p.className="rx-anno-swatch",p.style.setProperty("--rx-anno-swatch-color",g.value),p.setAttribute("role","radio"),p.setAttribute("aria-checked","false"),p.setAttribute("aria-label",g.label),p.dataset.color=g.value,a.append(p),p}),l=t.createElement("div");l.className="rx-anno-styles",l.setAttribute("role","group"),l.setAttribute("aria-label","Mark style");const d={};for(const g of Object.keys(ze)){const p=t.createElement("button");p.type="button",p.className=`rx-anno-style rx-anno-style-${g}`,p.textContent=ze[g],p.setAttribute("aria-label",ze[g]),p.dataset.style=g,l.append(p),d[g]=p}const o=t.createElement("button");o.type="button",o.className="rx-anno-note-toggle",o.textContent="Note",o.setAttribute("aria-expanded","false");const v=t.createElement("div");v.className="rx-anno-note-form",v.hidden=!0;const b=t.createElement("textarea");b.className="rx-anno-note-textarea",b.setAttribute("aria-label","Note text"),b.rows=3;const y=t.createElement("div");y.className="rx-anno-note-actions";const u=t.createElement("button");u.type="button",u.className="rx-anno-note-save",u.textContent="Save";const h=t.createElement("button");h.type="button",h.className="rx-anno-note-cancel",h.textContent="Cancel",y.append(h,u),v.append(b,y);const m=t.createElement("button");return m.type="button",m.className="rx-anno-delete",m.textContent="Delete",m.hidden=!0,r.append(e,a,l,o,v,m),{root:r,colorRow:a,colorButtons:i,styleRow:l,styleButtons:d,noteToggleBtn:o,noteForm:v,noteTextarea:b,noteSaveBtn:u,noteCancelBtn:h,deleteBtn:m,closeBtn:s,statusLabel:n}}const _r=`
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
`,at="reactor-annotations-stylesheet";function Dr(t){return t==="underline"||t==="squiggly"?"underline":"highlight"}class Gr{constructor(r=500){G(this,"map",new Map);this.cap=r}get(r){return this.map.get(r)}addAll(r){for(const n of r)for(this.map.delete(n.cfi),this.map.set(n.cfi,n);this.map.size>this.cap;){const s=this.map.keys().next().value;if(s===void 0)break;this.map.delete(s)}}}function Kr({shellRoot:t,core:r,hostChannel:n,options:s={}}){const e=t.ownerDocument??document;if(!e.getElementById(at)){const f=e.createElement("style");f.id=at,f.textContent=_r,e.head.appendChild(f)}const a=$r(e);t.append(a.root);const i=new Gr;let l=Le,d=!1,o=null,v=null;function b(){o=null,v=null,a.root.hidden=!0,a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}function y(f){const A=t.getBoundingClientRect(),R=f?f.left-A.left:(t.clientWidth||300)/2-140,w=f?f.bottom-A.top+8:60,z=Math.max(0,(t.clientWidth||300)-288);a.root.style.left=`${Math.min(Math.max(0,R),z)}px`,a.root.style.top=`${Math.max(0,w)}px`}function u(f){l=f;for(const A of a.colorButtons)A.setAttribute("aria-checked",String(A.dataset.color===f))}function h(f){for(const[A,R]of Object.entries(a.styleButtons))R.setAttribute("aria-pressed",String(A===f))}function m(f,A,R){o={kind:"create",cfi:f,text:A},a.statusLabel.textContent="Add mark",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.noteTextarea.value="",u(l),h(null),a.root.hidden=!1,y(R)}function g(f,A){o={kind:"edit",note:f},a.statusLabel.textContent="Edit mark",a.deleteBtn.hidden=!1,a.noteForm.hidden=!0,a.noteTextarea.value=f.note??"",u(f.color??Le),h(f.style??(f.kind==="underline"?"underline":"highlight")),a.root.hidden=!1,y(A)}function p(f,A){o=null,v=f,a.statusLabel.textContent="Loading…",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.root.hidden=!1,y(A),n.emitIntent({type:"notesPageRequest",offset:0,limit:1,filter:null,sort:null,query:`cfi:${f}`})}function N(f){if(f.type==="selection"&&f.cfi)m(f.cfi,f.text,f.rect);else if(f.type==="selectionCleared")(o==null?void 0:o.kind)==="create"&&b();else if(f.type==="annotationTap"){if(!f.cfi)return;const A=i.get(f.cfi);A?g(A,f.rect):p(f.cfi,f.rect)}}const I=r.on(N);function P(f){if(f.type==="setNotes"&&(i.addAll(f.items),v)){const A=f.items.find(R=>R.cfi===v);if(A){const R=a.root.hidden?null:{left:parseFloat(a.root.style.left||"0"),top:parseFloat(a.root.style.top||"0"),bottom:0};g(A,R)}else b()}}const B=n.onCommand(P);function E(f){(o==null?void 0:o.kind)==="create"&&(n.emitIntent({type:"annotationCreate",cfi:o.cfi,kind:Dr(f),color:l,style:f,text:o.text,note:null}),r.clearSelection(),b())}function C(f){(o==null?void 0:o.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:o.note.id,color:l,style:f,note:o.note.note}),b())}function H(f){const R=f.currentTarget.dataset.color??Le;u(R),(o==null?void 0:o.kind)==="edit"&&n.emitIntent({type:"annotationUpdate",id:o.note.id,color:R,style:o.note.style,note:o.note.note})}for(const f of a.colorButtons)f.addEventListener("click",H);const M={highlight:()=>(o==null?void 0:o.kind)==="create"?E("highlight"):C("highlight"),underline:()=>(o==null?void 0:o.kind)==="create"?E("underline"):C("underline"),strikethrough:()=>(o==null?void 0:o.kind)==="create"?E("strikethrough"):C("strikethrough"),squiggly:()=>(o==null?void 0:o.kind)==="create"?E("squiggly"):C("squiggly")};for(const[f,A]of Object.entries(a.styleButtons))A.addEventListener("click",M[f]);function K(){const f=a.noteForm.hidden;a.noteForm.hidden=!f,a.noteToggleBtn.setAttribute("aria-expanded",String(f)),f&&a.noteTextarea.focus()}a.noteToggleBtn.addEventListener("click",K);function F(){a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}a.noteCancelBtn.addEventListener("click",F);function W(){const f=a.noteTextarea.value.trim()||null;(o==null?void 0:o.kind)==="create"?(n.emitIntent({type:"annotationCreate",cfi:o.cfi,kind:"note",color:l,style:null,text:o.text,note:f}),r.clearSelection(),b()):(o==null?void 0:o.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:o.note.id,color:o.note.color,style:o.note.style,note:f}),b())}a.noteSaveBtn.addEventListener("click",W);function $(){(o==null?void 0:o.kind)==="edit"&&(n.emitIntent({type:"annotationDelete",id:o.note.id}),b())}a.deleteBtn.addEventListener("click",$);const D=()=>b();a.closeBtn.addEventListener("click",D);function Y(){if(!d){d=!0,I(),B();for(const f of a.colorButtons)f.removeEventListener("click",H);for(const[f,A]of Object.entries(a.styleButtons))A.removeEventListener("click",M[f]);a.noteToggleBtn.removeEventListener("click",K),a.noteCancelBtn.removeEventListener("click",F),a.noteSaveBtn.removeEventListener("click",W),a.deleteBtn.removeEventListener("click",$),a.closeBtn.removeEventListener("click",D),a.root.remove()}}return{isOpen:()=>!a.root.hidden,close:b,destroy:Y}}const Wr='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function Vr(t,r,n){const s=document.createElement("button");return s.type="button",s.className=n,s.setAttribute("aria-label",t),s.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,s}function xe(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-toggle",n.setAttribute("aria-pressed","false"),n.setAttribute("data-setting",r),n.textContent=t,n}function Se(t,r,n){const s=document.createElement("div");s.className=`rx-settings-pills ${n}`,s.setAttribute("role","radiogroup"),s.setAttribute("aria-label",t);for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-settings-pill",a.setAttribute("role","radio"),a.setAttribute("aria-checked","false"),a.setAttribute("data-value",e.id),a.textContent=e.label,s.appendChild(a)}return s}function oe(t,r,n,s){const e=document.createElement("div");e.className="rx-settings-slider-row";const a=document.createElement("div");a.className="rx-settings-slider-label";const i=document.createElement("span");i.textContent=t;const l=document.createElement("span");l.className="rx-settings-slider-value",a.append(i,l);const d=document.createElement("input");return d.type="range",d.className="rx-settings-slider",d.min=String(r),d.max=String(n),d.step=String(s),d.setAttribute("aria-label",t),e.append(a,d),{row:e,input:d,value:l}}function qr(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-tab",n.setAttribute("role","tab"),n.setAttribute("aria-selected","false"),n.setAttribute("data-tab",t),n.id=`rx-settings-tab-${t}`,n.textContent=r,n}function ye(t){const r=document.createElement("div");return r.className="rx-settings-panel",r.setAttribute("role","tabpanel"),r.setAttribute("data-panel",t),r.setAttribute("aria-labelledby",`rx-settings-tab-${t}`),r.hidden=!0,r}function Ur(t){const r=document.createElement("div");r.className="rx-settings-scrim";const n=document.createElement("div");n.className="rx-settings-sheet",n.setAttribute("role","dialog"),n.setAttribute("aria-label","Text settings"),n.tabIndex=-1;const s=document.createElement("div");s.className="rx-settings-head";const e=document.createElement("h3");e.className="rx-settings-title",e.textContent="Text settings";const a=Vr("Close settings",Wr,"rx-icon-btn rx-settings-close");s.append(e,a);const i=document.createElement("div");i.className="rx-settings-scope",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Settings scope");const l=document.createElement("button");l.type="button",l.className="rx-settings-scope-btn",l.setAttribute("role","radio"),l.setAttribute("aria-checked","true"),l.setAttribute("data-scope","global"),l.textContent="Global";const d=document.createElement("button");d.type="button",d.className="rx-settings-scope-btn",d.setAttribute("role","radio"),d.setAttribute("aria-checked","false"),d.setAttribute("data-scope","book"),d.textContent="This book",i.append(l,d);const o=document.createElement("div");o.className="rx-settings-tabs",o.setAttribute("role","tablist");const v=[["typography","Typography"],["layout","Layout"],["theme","Theme"],["controls","Controls"],["playback","Playback"]],b={};for(const[X,re]of v){const Z=qr(X,re);b[X]=Z,o.appendChild(Z)}const y=document.createElement("div");y.className="rx-settings-body";const u=ye("typography"),h=oe("Font size",13,28,1),m=oe("Paragraph spacing",0,2,.1),g=Se("Typeface",[],"rx-settings-font-pills");u.append(h.row,g,m.row);const p=ye("layout"),N=Se("Reading mode",[{id:"paginated",label:"Paginated"},{id:"scrolled",label:"Scrolling"}],"rx-settings-flow-pills"),I=Se("Columns",[{id:"1",label:"1 column"},{id:"2",label:"2 columns"}],"rx-settings-columns-pills"),P=document.createElement("div");P.className="rx-settings-margins-group";const B=document.createElement("div");B.className="rx-settings-margins-head";const E=document.createElement("span");E.className="rx-settings-margins-label",E.textContent="Margins";const C=xe("Link left and right margins","linkSideMargins");C.classList.add("rx-settings-link-toggle"),B.append(E,C);const H=oe("Top",0,96,4),M=oe("Bottom",0,96,4),K=oe("Left",0,96,4),F=oe("Right",0,96,4);P.append(B,H.row,M.row,K.row,F.row);const W=oe("Line spacing",1.2,1.95,.05),$=xe("Justify text","justify"),D=xe("Hyphenate","hyphenate"),Y=xe("Use book's own styling","useBookLayout");p.append(N,I,P,W.row,$,D,Y);const f=ye("theme"),A=document.createElement("div");A.className="rx-settings-swatches",A.setAttribute("role","radiogroup"),A.setAttribute("aria-label","Theme"),f.append(A);const R=ye("controls"),w=xe("Swipe to turn pages","swipe"),z=Se("Tap zone size",[{id:"standard",label:"Standard"},{id:"wide",label:"Wide"}],"rx-settings-tapzone-pills"),O=document.createElement("div");O.className="rx-settings-volumekeys",O.hidden=!0;const q=xe("Volume keys turn pages","volumeKeys");O.append(q),R.append(w,z,O);const j=ye("playback"),L=document.createElement("p");L.className="rx-settings-empty",L.textContent="No narration provider for this book.";const V=document.createElement("div");V.className="rx-settings-playback-controls",V.hidden=!0;const J=oe("Narration speed",.5,3,.1),ee=oe("Skip forward (seconds)",5,60,5);return V.append(J.row,ee.row),j.append(L,V),y.append(u,p,f,R,j),n.append(s,i,o,y),t.append(r,n),{root:n,scrim:r,closeBtn:a,scopeGlobalBtn:l,scopeBookBtn:d,tabsRow:o,tabButtons:b,panels:{typography:u,layout:p,theme:f,controls:R,playback:j},fontSizeInput:h.input,fontSizeValue:h.value,paragraphSpacingInput:m.input,paragraphSpacingValue:m.value,fontFamilyPills:g,flowPills:N,columnsPills:I,linkSideMarginsToggle:C,marginTopInput:H.input,marginTopValue:H.value,marginBottomInput:M.input,marginBottomValue:M.value,marginLeftInput:K.input,marginLeftValue:K.value,marginRightInput:F.input,marginRightValue:F.value,lineHeightInput:W.input,lineHeightValue:W.value,justifyToggle:$,hyphenateToggle:D,useBookLayoutToggle:Y,themeSwatches:A,swipeToggle:w,tapZonePills:z,volumeKeysRow:O,volumeKeysToggle:q,playbackEmpty:L,playbackControls:V,narrationSpeedInput:J.input,narrationSpeedValue:J.value,skipForwardInput:ee.input,skipForwardValue:ee.value}}const Yr=`
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
  /* BO-53: background keeps left:0/right:0/bottom:0 (no seam at the nav bar), content box pads
   * by the host's safe-area insets (--rx-inset-*, src/shell/insets.ts) so the header/close
   * button stay clear of the status bar when the sheet grows tall enough to reach it, the
   * scrolled body's bottom row stays clear of the nav bar, and either cutout edge stays clear
   * on a landscape phone. Zero insets (desktop/web host, WORKTREE_BRIEF.md rule 1) change
   * nothing. */
  padding-top: var(--rx-inset-top, 0px);
  padding-bottom: var(--rx-inset-bottom, 0px);
  padding-left: var(--rx-inset-left, 0px);
  padding-right: var(--rx-inset-right, 0px);
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
  /* Desktop presentation is a centered floating dialog, not anchored to any physical edge, so
   * the safe-area padding above (BO-53) does not apply here. */
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
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
`,st={fontSize:16,lineHeight:1.5,fontFamily:null,paragraphSpacing:0,maxColumnCount:2,gap:.05,maxInlineSize:720,maxBlockSize:1440,justify:!0,hyphenate:!0,isDark:!1,themeName:"default",flow:"paginated",useBookLayout:!0,marginTop:40,marginBottom:40,marginLeft:40,marginRight:40,linkSideMargins:!0},Ie=[{id:"light",label:"Light",themeName:"default",isDark:!1,swatchBg:"#ffffff",swatchFg:"#000000"},{id:"sepia",label:"Sepia",themeName:"sepia",isDark:!1,swatchBg:"#f1e8d0",swatchFg:"#5b4636"},{id:"dark",label:"Dark",themeName:"default",isDark:!0,swatchBg:"#222222",swatchFg:"#e0e0e0"},{id:"amoled",label:"AMOLED",themeName:"amoled",isDark:!0,swatchBg:"#000000",swatchFg:"#ffffff"}];function jr(t,r){return Ie.find(n=>n.themeName===t&&n.isDark===r)??Ie.find(n=>n.id===(r?"dark":"light"))}const ot=[{id:"publisher",label:"Publisher",value:null},{id:"serif",label:"Serif",value:'Georgia, "Iowan Old Style", "Times New Roman", serif'},{id:"sans",label:"Sans-serif",value:'-apple-system, "Segoe UI", Roboto, Arial, sans-serif'},{id:"mono",label:"Monospace",value:'"Courier New", monospace'}];function Xr(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function Zr(t){let r=!1;function n(s){if(!r||s.key!=="Tab")return;const e=Xr(t);if(e.length===0){s.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],l=t.ownerDocument.activeElement;s.shiftKey&&l===a?(s.preventDefault(),i.focus()):!s.shiftKey&&l===i&&(s.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const it="reactor-settings-stylesheet",Jr=["typography","layout","theme","controls","playback"];function Qr(t){if(t.getElementById(it))return;const r=t.createElement("style");r.id=it,r.textContent=Yr,t.head.appendChild(r)}function en(t,r,n){var ie,fe,ue,se,le,x,T;const s=t.ownerDocument??document;Qr(s);const e=Ur(t),a=Zr(e.root),i={global:{...st},book:{...st}};let l="global",d="typography",o=!1,v=!1,b=((fe=(ie=n.hostChannel)==null?void 0:ie.getConfig())==null?void 0:fe.capabilities.playback)??!1,y=null,u=n.volumeKeysCapability??((se=(ue=n.hostChannel)==null?void 0:ue.getConfig())==null?void 0:se.capabilities.volumeKeys)??!1;const h=(x=(le=n.hostChannel)==null?void 0:le.getConfig())==null?void 0:x.controlsState;e.volumeKeysRow.hidden=!u;function m(c){t.classList.remove("theme-dark","theme-amoled"),c.themeName==="amoled"?t.classList.add("theme-amoled"):c.isDark&&t.classList.add("theme-dark")}function g(){return i[l]}function p(){const c=g().fontFamily;for(const S of Array.from(e.fontFamilyPills.children)){const _=ot.find(pe=>pe.id===S.dataset.value);S.setAttribute("aria-checked",String((_==null?void 0:_.value)===c))}}function N(){const c=jr(g().themeName,g().isDark);for(const S of Array.from(e.themeSwatches.children))S.setAttribute("aria-checked",String(S.dataset.value===c.id))}function I(c,S){for(const _ of Array.from(c.children))_.setAttribute("aria-checked",String(_.dataset.value===S))}function P(){e.playbackEmpty.hidden=b,e.playbackControls.hidden=!b}function B(){const c=g().useBookLayout;for(const S of Array.from(e.fontFamilyPills.children))S.disabled=c;e.paragraphSpacingInput.disabled=c,e.lineHeightInput.disabled=c,e.justifyToggle.disabled=c,e.hyphenateToggle.disabled=c}function E(){const c=g();e.fontSizeInput.value=String(c.fontSize),e.fontSizeInput.setAttribute("aria-valuetext",`${c.fontSize}px`),e.fontSizeValue.textContent=`${c.fontSize}px`,e.paragraphSpacingInput.value=String(c.paragraphSpacing),e.paragraphSpacingValue.textContent=`${c.paragraphSpacing}em`,p(),I(e.flowPills,c.flow),I(e.columnsPills,String(c.maxColumnCount)),e.marginTopInput.value=String(c.marginTop),e.marginTopInput.setAttribute("aria-valuetext",`${c.marginTop}px`),e.marginTopValue.textContent=`${c.marginTop}px`,e.marginBottomInput.value=String(c.marginBottom),e.marginBottomInput.setAttribute("aria-valuetext",`${c.marginBottom}px`),e.marginBottomValue.textContent=`${c.marginBottom}px`,e.marginLeftInput.value=String(c.marginLeft),e.marginLeftInput.setAttribute("aria-valuetext",`${c.marginLeft}px`),e.marginLeftValue.textContent=`${c.marginLeft}px`,e.marginRightInput.value=String(c.marginRight),e.marginRightInput.setAttribute("aria-valuetext",`${c.marginRight}px`),e.marginRightValue.textContent=`${c.marginRight}px`,e.linkSideMarginsToggle.setAttribute("aria-pressed",String(c.linkSideMargins)),e.lineHeightInput.value=String(c.lineHeight),e.lineHeightValue.textContent=c.lineHeight.toFixed(2),e.justifyToggle.setAttribute("aria-pressed",String(c.justify)),e.hyphenateToggle.setAttribute("aria-pressed",String(c.hyphenate)),e.useBookLayoutToggle.setAttribute("aria-pressed",String(c.useBookLayout)),B(),N(),P(),e.scopeGlobalBtn.setAttribute("aria-checked",String(l==="global")),e.scopeBookBtn.setAttribute("aria-checked",String(l==="book"))}function C(c){var S;i[l]={...i[l],...c},E(),r.applyStyles(i[l]),m(i[l]),(S=n.hostChannel)==null||S.emitIntent({type:"settingsChange",scope:l,settings:i[l]})}function H(){C({fontSize:Number(e.fontSizeInput.value)})}e.fontSizeInput.addEventListener("change",H);function M(){C({paragraphSpacing:Number(e.paragraphSpacingInput.value)})}e.paragraphSpacingInput.addEventListener("change",M);for(const c of ot){const S=document.createElement("button");S.type="button",S.className="rx-settings-pill",S.setAttribute("role","radio"),S.setAttribute("aria-checked","false"),S.setAttribute("data-value",c.id),S.textContent=c.label,S.addEventListener("click",()=>C({fontFamily:c.value})),e.fontFamilyPills.appendChild(S)}function K(c){const S=c.currentTarget.dataset.value;C({flow:S})}for(const c of Array.from(e.flowPills.children))c.addEventListener("click",K);function F(c){const S=Number(c.currentTarget.dataset.value);C({maxColumnCount:S})}for(const c of Array.from(e.columnsPills.children))c.addEventListener("click",F);function W(){C({marginTop:Number(e.marginTopInput.value)})}e.marginTopInput.addEventListener("change",W);function $(){C({marginBottom:Number(e.marginBottomInput.value)})}e.marginBottomInput.addEventListener("change",$);function D(){const c=Number(e.marginLeftInput.value);g().linkSideMargins?C({marginLeft:c,marginRight:c}):C({marginLeft:c})}e.marginLeftInput.addEventListener("change",D);function Y(){const c=Number(e.marginRightInput.value);g().linkSideMargins?C({marginLeft:c,marginRight:c}):C({marginRight:c})}e.marginRightInput.addEventListener("change",Y);function f(){C({linkSideMargins:!g().linkSideMargins})}e.linkSideMarginsToggle.addEventListener("click",f);function A(){C({lineHeight:Number(e.lineHeightInput.value)})}e.lineHeightInput.addEventListener("change",A);function R(){C({justify:!g().justify})}e.justifyToggle.addEventListener("click",R);function w(){C({hyphenate:!g().hyphenate})}e.hyphenateToggle.addEventListener("click",w);function z(){C({useBookLayout:!g().useBookLayout})}e.useBookLayoutToggle.addEventListener("click",z);for(const c of Ie){const S=document.createElement("button");S.type="button",S.className="rx-settings-swatch",S.setAttribute("role","radio"),S.setAttribute("aria-checked","false"),S.setAttribute("aria-label",c.label),S.setAttribute("data-value",c.id);const _=document.createElement("span");_.className="rx-settings-swatch-dot",_.style.background=c.swatchBg;const pe=document.createElement("span");pe.textContent=c.label,S.append(_,pe),S.addEventListener("click",()=>C({themeName:c.themeName,isDark:c.isDark})),e.themeSwatches.appendChild(S)}let O=(h==null?void 0:h.swipeEnabled)??!0,q=(h==null?void 0:h.volumeKeysEnabled)??!1;r.setSwipe(O);function j(){var c;(c=n.hostChannel)==null||c.emitIntent({type:"controlsChange",swipeEnabled:O,volumeKeysEnabled:q})}function L(){O=!O,e.swipeToggle.setAttribute("aria-pressed",String(O)),r.setSwipe(O),j()}e.swipeToggle.addEventListener("click",L),e.swipeToggle.setAttribute("aria-pressed",String(O));let V="standard";function J(c){V=c.currentTarget.dataset.value??"standard",I(e.tapZonePills,V)}for(const c of Array.from(e.tapZonePills.children))c.addEventListener("click",J);I(e.tapZonePills,V);function ee(){q=!q,e.volumeKeysToggle.setAttribute("aria-pressed",String(q)),j()}e.volumeKeysToggle.addEventListener("click",ee),e.volumeKeysToggle.setAttribute("aria-pressed",String(q));function X(){var S;const c=Number(e.narrationSpeedInput.value);e.narrationSpeedValue.textContent=`${c.toFixed(1)}x`,(S=n.hostChannel)==null||S.emitIntent({type:"playback",action:"rateChange",positionSec:null,rate:c})}e.narrationSpeedInput.addEventListener("input",()=>{e.narrationSpeedValue.textContent=`${Number(e.narrationSpeedInput.value).toFixed(1)}x`}),e.narrationSpeedInput.addEventListener("change",X);function re(){e.skipForwardValue.textContent=`${e.skipForwardInput.value}s`}e.skipForwardInput.addEventListener("input",re),e.narrationSpeedInput.value="1",e.narrationSpeedValue.textContent="1.0x",e.skipForwardInput.value="30",e.skipForwardValue.textContent="30s";function Z(c){c!==d&&(e.tabButtons[d].setAttribute("aria-selected","false"),e.panels[d].hidden=!0,d=c,e.tabButtons[d].setAttribute("aria-selected","true"),e.panels[d].hidden=!1)}for(const c of Jr)e.tabButtons[c].addEventListener("click",()=>Z(c));Z("typography"),e.tabButtons.typography.setAttribute("aria-selected","true"),e.panels.typography.hidden=!1;function ne(c){c!==l&&(l=c,E(),r.applyStyles(i[l]),m(i[l]))}e.scopeGlobalBtn.addEventListener("click",()=>ne("global")),e.scopeBookBtn.addEventListener("click",()=>ne("book"));const ae=(T=n.hostChannel)==null?void 0:T.onCommand(c=>{c.type==="setSettingsScope"?(i[c.scope]=c.settings,c.scope===l&&(E(),r.applyStyles(i[l]),m(i[l]))):c.type==="configure"&&(b=c.capabilities.playback,P(),u=n.volumeKeysCapability??c.capabilities.volumeKeys??!1,e.volumeKeysRow.hidden=!u,c.controlsState&&(O=c.controlsState.swipeEnabled,q=c.controlsState.volumeKeysEnabled,e.swipeToggle.setAttribute("aria-pressed",String(O)),e.volumeKeysToggle.setAttribute("aria-pressed",String(q)),r.setSwipe(O)))});function de(){var c;o||(o=!0,y=s.activeElement??null,t.classList.add("settings-open"),e.scrim.classList.add("visible"),a.activate(),e.root.focus({preventScroll:!0}),(c=n.onOpenChange)==null||c.call(n,!0))}function Q(){var c,S;o&&(o=!1,t.classList.remove("settings-open"),e.scrim.classList.remove("visible"),a.deactivate(),(c=y==null?void 0:y.focus)==null||c.call(y),y=null,(S=n.onOpenChange)==null||S.call(n,!1))}function te(){o?Q():de()}e.closeBtn.addEventListener("click",Q),e.scrim.addEventListener("click",Q),E();function be(){v||(v=!0,ae==null||ae(),a.deactivate(),t.classList.remove("settings-open"),e.root.remove(),e.scrim.remove())}return{open:de,close:Q,toggle:te,isOpen:()=>o,getActiveSettings:()=>g(),getActiveScope:()=>l,destroy:be}}const tn={top:0,right:0,bottom:0,left:0};function lt(t,r){t.style.setProperty("--rx-inset-top",`${Math.max(0,r.top)}px`),t.style.setProperty("--rx-inset-right",`${Math.max(0,r.right)}px`),t.style.setProperty("--rx-inset-bottom",`${Math.max(0,r.bottom)}px`),t.style.setProperty("--rx-inset-left",`${Math.max(0,r.left)}px`)}const rn=280,ct="reactor-shell-stylesheet";function nn(t){if(t.getElementById(ct))return;const r=t.createElement("style");r.id=ct,r.textContent=At,t.head.appendChild(r)}function an(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function sn(){const t=new Set;return{getChromeState:()=>({barsVisible:!1,sidebar:"none"}),onChromeState:r=>(t.add(r),()=>t.delete(r)),setBarsVisible:()=>{},refreshSizeClass:()=>{},destroy:()=>{t.clear()}}}function cn(t,r,n={}){var He,Oe,Re,Fe,$e,_e,De,Ge,Ke,We;if((n.chrome??"reactor")==="host")return sn();const e=t.ownerDocument??document;nn(e);const a=Lt(t),i=a.root;let l=!1,d=!1,o="none",v=!1,b=!1,y=null;const u=new Set;function h(){var U;if(b)return;const k={barsVisible:d,sidebar:o};for(const we of u)we(k);(U=n.hostChannel)==null||U.emitIntent({type:"chromeState",barsVisible:d,sidebar:o})}function m(k){d!==k&&(d=k,i.classList.toggle("ui-visible",d),Z==null||Z.setChromeVisible(d),h())}function g(){m(!d)}const p=er(i,k=>r.goTo(k),{eink:n.eink,onBack:()=>{var k;return(k=n.hostChannel)==null?void 0:k.emitIntent({type:"back"})},onSidebarChange:k=>{o=k?"left":"none",a.contentsBtn.setAttribute("aria-pressed",String(k)),h(),P()}});function N(){return i.classList.contains("size-desktop")}function I(){if(p.isOpen()){p.close();return}N()||X.close(),T.close(),p.open()}a.contentsBtn.addEventListener("click",I);function P(){const k=i.classList.contains("size-desktop");ce(i,{left:k&&p.isOpen()?rn:0})}function B(){i.classList.toggle("reduced-motion",C||an())}function E(){i.classList.toggle("e-ink",C)}let C=((Oe=(He=n.hostChannel)==null?void 0:He.getConfig())==null?void 0:Oe.eink)??!!n.eink;E(),B(),lt(i,((Fe=(Re=n.hostChannel)==null?void 0:Re.getConfig())==null?void 0:Fe.insets)??tn);const H=($e=n.hostChannel)==null?void 0:$e.onCommand(k=>{k.type==="configure"&&(C=k.eink,E(),B(),lt(i,k.insets))});function M(){const k=t.clientWidth||i.clientWidth,U=Ae(k);i.classList.remove("size-phone","size-fold-tablet","size-desktop"),i.classList.add(`size-${U}`),P()}M();function K(){M(),X.refreshLayout()}const F=typeof ResizeObserver=="function"?new ResizeObserver(()=>K()):null;F==null||F.observe(t);const W=()=>K();F||window.addEventListener("resize",W);const $=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,D=()=>B();(_e=$==null?void 0:$.addEventListener)==null||_e.call($,"change",D);function Y(k,U){const we=Nt(k,l);we==="prev"?r.prev():we==="next"?r.next():g()}function f(k){k==="prev"?r.prev():k==="next"?r.next():g()}function A(k,U){U.key!=="Enter"&&U.key!==" "||(U.preventDefault(),f(k))}const R=()=>f(l?"next":"prev"),w=()=>f(l?"prev":"next"),z=()=>f("toggle"),O=k=>A(l?"next":"prev",k),q=k=>A(l?"prev":"next",k),j=k=>A("toggle",k);a.zoneLeft.addEventListener("click",R),a.zoneRight.addEventListener("click",w),a.zoneCentre.addEventListener("click",z),a.zoneLeft.addEventListener("keydown",O),a.zoneRight.addEventListener("keydown",q),a.zoneCentre.addEventListener("keydown",j);function L(){return T.isOpen()?(T.close(),!0):x!=null&&x.isOpen()?(x.close(),!0):S.isOpen()?(S.close(),!0):X.isOpen()?(re(),!0):p.isOpen()?(p.close(),!0):d?(m(!1),!0):!1}function V(k){const U=Mt(k);U&&(Pt(U)&&k.preventDefault(),U==="next"?r.next():U==="prev"?r.prev():U==="toggleBars"?g():U==="escape"&&L())}e.addEventListener("keydown",V);const J=()=>r.historyBack(),ee=()=>r.historyForward();a.historyBackBtn.addEventListener("click",J),a.historyForwardBtn.addEventListener("click",ee);const X=Ir(i,r,{getSizeClass:()=>Ae(t.clientWidth||i.clientWidth),onWidthChange:n.onContextWidthChange,hostChannel:n.hostChannel,onClose:()=>{o="none",a.contextBtn.setAttribute("aria-pressed","false"),h()}});function re(){o==="right"?(X.close(),o="none"):(N()||p.close(),T.close(),X.open(),o="right"),a.contextBtn.setAttribute("aria-pressed",String(o==="right")),h()}a.contextBtn.addEventListener("click",re);const Z=n.hostChannel?Fr(i,r,n.hostChannel,{eink:n.eink}):null;let ne=new Set;function ae(){a.bookmarkBtn.setAttribute("aria-pressed",String(!!y&&ne.has(y)))}function de(){!n.hostChannel||!y||n.hostChannel.emitIntent({type:"bookmarkToggle",cfi:y})}const Q=(De=n.hostChannel)==null?void 0:De.onCommand(k=>{k.type==="setBookmarks"&&(ne=new Set(k.items.map(U=>U.cfi)),ae())});a.bookmarkBtn.addEventListener("click",de);let te=!1;function be(k){te||(te=!0,a.narrationBtn.hidden=!k)}let ie=!1;function fe(){a.narrationBtn.setAttribute("aria-pressed",String(ie))}function ue(){var k;(k=n.hostChannel)==null||k.emitIntent({type:"playback",action:ie?"stop":"play",positionSec:null,rate:null})}const se=(Ge=n.hostChannel)==null?void 0:Ge.onCommand(k=>{k.type==="configure"?be(k.capabilities.playback):k.type==="setPlaybackState"&&(ie=k.active!==!1,fe())}),le=(Ke=n.hostChannel)==null?void 0:Ke.getConfig();le&&be(le.capabilities.playback),a.narrationBtn.addEventListener("click",ue);const x=n.hostChannel?Kr({shellRoot:i,core:r,hostChannel:n.hostChannel,options:{eink:n.eink}}):null,T=en(i,r,{getSizeClass:()=>Ae(t.clientWidth||i.clientWidth),eink:n.eink,hostChannel:n.hostChannel,volumeKeysCapability:n.volumeKeysCapability,onOpenChange:k=>{a.settingsBtn.setAttribute("aria-pressed",String(k))}});function c(){if(T.isOpen()){T.close();return}p.close(),X.close(),o="none",a.contentsBtn.setAttribute("aria-pressed","false"),a.contextBtn.setAttribute("aria-pressed","false"),h(),T.open()}a.settingsBtn.addEventListener("click",c);const S=Lr(i,r,{onOpenInGlossary:k=>{X.openGlossaryTerm(k),o="right",a.contextBtn.setAttribute("aria-pressed","true"),h()}}),_=(We=n.hostChannel)==null?void 0:We.onCommand(k=>{var U;k.type==="dismiss"&&!L()&&((U=n.hostChannel)==null||U.emitIntent({type:"back"}))}),pe=()=>{v=!0},Me=()=>{v=!1,r.goToFraction(Number(a.scrubber.value)/1e3)};a.scrubber.addEventListener("pointerdown",pe),a.scrubber.addEventListener("change",Me);function Pe(k){switch(k.type){case"loaded":l=k.isRtl,i.classList.toggle("is-rtl",l),p.setToc(k.toc),P();break;case"relocate":y=k.cfi??null,a.chapterLabel&&a.chapterLabel.textContent!==(k.chapterTitle??"")&&(a.chapterLabel.textContent=k.chapterTitle??""),!v&&typeof k.fraction=="number"&&(a.scrubber.value=String(Math.round(k.fraction*1e3))),p.setCurrentChapterTitle(k.chapterTitle),ae();break;case"history":a.historyBackBtn.disabled=!k.canGoBack,a.historyForwardBtn.disabled=!k.canGoForward;break;case"tap":Y(k.x,k.y);break}}const vt=r.on(Pe);r.replayLastEvents(Pe),h();function yt(){M()}function kt(){var k;b||(b=!0,vt(),F==null||F.disconnect(),F||window.removeEventListener("resize",W),(k=$==null?void 0:$.removeEventListener)==null||k.call($,"change",D),e.removeEventListener("keydown",V),a.zoneLeft.removeEventListener("click",R),a.zoneRight.removeEventListener("click",w),a.zoneCentre.removeEventListener("click",z),a.zoneLeft.removeEventListener("keydown",O),a.zoneRight.removeEventListener("keydown",q),a.zoneCentre.removeEventListener("keydown",j),a.historyBackBtn.removeEventListener("click",J),a.historyForwardBtn.removeEventListener("click",ee),a.contextBtn.removeEventListener("click",re),a.bookmarkBtn.removeEventListener("click",de),a.narrationBtn.removeEventListener("click",ue),se==null||se(),Q==null||Q(),_==null||_(),H==null||H(),x==null||x.destroy(),X.destroy(),Z==null||Z.destroy(),a.settingsBtn.removeEventListener("click",c),T.destroy(),S.destroy(),a.scrubber.removeEventListener("pointerdown",pe),a.scrubber.removeEventListener("change",Me),a.contentsBtn.removeEventListener("click",I),p.destroy(),u.clear(),i.classList.remove("reader-shell","ui-visible","e-ink","reduced-motion","is-rtl","size-phone","size-fold-tablet","size-desktop","settings-open"),a.zones.remove(),a.topBar.remove(),a.bottomBar.remove())}return{getChromeState:()=>({barsVisible:d,sidebar:o}),onChromeState:k=>(u.add(k),()=>u.delete(k)),setBarsVisible:m,refreshSizeClass:yt,destroy:kt}}export{Ve as ZONE_FRACTION,Ae as computeSizeClass,Pt as isPreventableKey,Fr as mountPlaybackBar,Ir as mountRightSidebar,en as mountSettingsPanel,cn as mountShell,Mt as resolveKeyboardAction,Nt as resolveTapZone};
