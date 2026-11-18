var wt=Object.defineProperty;var Et=(t,r,n)=>r in t?wt(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;var D=(t,r,n)=>Et(t,typeof r!="symbol"?r+"":r,n);import{A as St,D as Se}from"./index-CnKe6ja5.js";const Ct={menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',bookmark:'<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',panel_right:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',back:'<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',forward:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',skip_back:'<polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/>',skip_forward:'<polygon points="13 19 22 12 13 5 13 19"/><polygon points="2 19 11 12 2 5 2 19"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-6a9 9 0 0 1 18 0v6a1 1 0 0 1-1 1h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',sleep:'<path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/>'};function xe(t){return`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${Ct[t]}</svg>`}function pe(t,r,n=!1){const s=document.createElement("button");return s.type="button",s.className="rx-icon-btn",s.setAttribute("aria-label",t),s.innerHTML=xe(r),n&&s.setAttribute("aria-pressed","false"),s}function Lt(t){t.classList.add("reader-shell");const r=document.createElement("div");r.className="rx-zones";const n=document.createElement("div");n.className="rx-zone rx-zone-left",n.setAttribute("role","button"),n.setAttribute("tabindex","0"),n.setAttribute("aria-label","Previous page");const s=document.createElement("div");s.className="rx-zone rx-zone-centre",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label","Toggle bars");const e=document.createElement("div");e.className="rx-zone rx-zone-right",e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label","Next page"),r.append(n,s,e);const a=document.createElement("div");a.className="rx-bar rx-bar-top",a.setAttribute("role","toolbar");const i=pe("Table of contents","menu",!0),l=pe("Bookmark","bookmark",!0),c=pe("Toggle narration","headphones",!0);c.hidden=!0;const o=pe("Text settings","settings",!0),g=pe("Open context panel","panel_right",!0),b=document.createElement("div");b.className="rx-bar-spacer",a.append(i,l,b,c,o,g);const m=document.createElement("div");m.className="rx-bar rx-bar-bottom";const u=document.createElement("div");u.className="rx-status-row",u.setAttribute("aria-live","polite");const h=pe("Back","back");h.disabled=!0;const y=document.createElement("span");y.className="rx-chapter-label";const w=pe("Forward","forward");w.disabled=!0,u.append(h,y,w);const p=document.createElement("input");return p.type="range",p.className="rx-scrubber",p.min="0",p.max="1000",p.step="1",p.value="0",p.setAttribute("aria-label","Reading position"),m.append(u,p),t.append(r,a,m),{root:t,zones:r,zoneLeft:n,zoneCentre:s,zoneRight:e,topBar:a,bottomBar:m,contentsBtn:i,bookmarkBtn:l,narrationBtn:c,settingsBtn:o,contextBtn:g,historyBackBtn:h,historyForwardBtn:w,chapterLabel:y,scrubber:p}}const At=`
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
`,Tt=599,Bt=1200;function Ce(t){return t<=Tt?"phone":t<=Bt?"fold-tablet":"desktop"}const Ve=.3;function Nt(t,r){const n=Math.min(1,Math.max(0,t));return n<Ve?r?"next":"prev":n>1-Ve?r?"prev":"next":"toggle"}const zt=new Set(["ArrowRight","ArrowDown","PageDown"," "]),It=new Set(["ArrowLeft","ArrowUp","PageUp"]);function Mt(t){return t.ctrlKey||t.metaKey||t.altKey?null:zt.has(t.key)?"next":It.has(t.key)?"prev":t.key==="m"||t.key==="M"?"toggleBars":t.key==="Escape"?"escape":null}function Pt(t){return t==="next"||t==="prev"}const Ht='<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',Ot='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function qe(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-icon-btn",n.setAttribute("aria-label",t),n.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,n}function Rt(t){const r=document.createElement("div");r.className="rx-left-sidebar",r.setAttribute("aria-label","Table of contents"),r.tabIndex=-1;const n=document.createElement("div");n.className="rx-left-sidebar-scrim";const s=document.createElement("div");s.className="rx-sidebar-head";const e=qe("Back",Ht),a=document.createElement("h3");a.className="rx-sidebar-title",a.textContent="Contents";const i=qe("Close contents",Ot);i.classList.add("rx-left-sidebar-close"),s.append(e,a,i);const l=document.createElement("div");l.className="rx-left-sidebar-tabs",l.setAttribute("role","tablist");function c(P,S){const E=document.createElement("button");return E.type="button",E.className="rx-left-sidebar-tab",E.setAttribute("role","tab"),E.setAttribute("aria-selected","false"),E.setAttribute("data-tab",S),E.id=`rx-tab-${S}`,E.textContent=P,E}const o=c("Contents","contents"),g=c("Starred","starred"),b=c("Related","related");l.append(o,g,b);const m=document.createElement("div");m.className="rx-left-sidebar-body";function u(P){const S=document.createElement("div");return S.className="rx-sidebar-panel",S.setAttribute("role","tabpanel"),S.setAttribute("data-panel",P),S.setAttribute("aria-labelledby",`rx-tab-${P}`),S.hidden=!0,S}const h=u("contents"),y=document.createElement("div");y.className="rx-toc-scroll";const w=document.createElement("div");w.className="rx-toc-spacer";const p=document.createElement("div");p.className="rx-toc-window",p.setAttribute("role","list"),w.appendChild(p),y.appendChild(w),h.appendChild(y);const L=u("starred"),M=u("related");return m.append(h,L,M),r.append(s,l,m),t.append(n,r),{root:r,scrim:n,backBtn:e,closeBtn:i,title:a,tablist:l,tabContents:o,tabStarred:g,tabRelated:b,body:m,panelContents:h,tocScroll:y,tocSpacer:w,tocWindow:p,panelStarred:L,panelRelated:M}}const Ft=`
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
`;function dt(t,r=null,n=0){const s=[];for(let e=0;e<t.length;e++){const a=t[e],i=r===null?String(e):`${r}.${e}`;s.push({id:i,label:a.label,href:a.href,depth:n,hasChildren:a.subitems.length>0,parentId:r}),a.subitems.length>0&&s.push(...dt(a.subitems,i,n+1))}return s}function $t(t,r){if(r.size===0)return t;const n=new Set,s=[];for(const e of t){if(e.parentId!==null&&(n.has(e.parentId)||r.has(e.parentId))){n.add(e.id);continue}s.push(e)}return s}function _t(t,r){if(!r)return null;const n=Ke(r);let s=null;for(const e of t)if(e.href){if(e.href===r)return e.id;s===null&&Ke(e.href)===n&&(s=e)}return(s==null?void 0:s.id)??null}function Dt(t,r){if(!r)return null;for(const n of t)if(n.label===r)return n.id;return null}function Ke(t){const r=t.indexOf("#");return r===-1?t:t.slice(0,r)}function Gt(t,r,n,s,e=8){if(s===0||r<=0)return{start:0,end:-1};const a=Math.floor(t/r),i=Math.ceil(n/r),l=Math.max(0,a-e),c=Math.min(s-1,a+i+e);return{start:l,end:c}}const Le=48;function Wt(t,r,n,s){const e=document.createElement("div");if(e.className="rx-toc-row",e.setAttribute("role","listitem"),e.style.paddingLeft=`${12+t.depth*18}px`,s&&e.classList.add("is-current"),t.hasChildren){const c=document.createElement("button");c.type="button",c.className="rx-toc-toggle";const o=!r.collapsed.has(t.id);c.setAttribute("aria-expanded",String(o)),c.setAttribute("aria-label",`${o?"Collapse":"Expand"} ${t.label}`),c.textContent=o?"▾":"▸",c.addEventListener("click",g=>{g.stopPropagation(),n.onToggleExpand(t)}),e.appendChild(c)}else{const c=document.createElement("span");c.className="rx-toc-toggle-spacer",e.appendChild(c)}const a=document.createElement("button");a.type="button",a.className="rx-toc-label",a.setAttribute("aria-label",t.label),s&&a.setAttribute("aria-current","true"),a.textContent=t.label,a.addEventListener("click",()=>n.onActivate(t)),e.appendChild(a);const i=document.createElement("button");i.type="button",i.className="rx-toc-star";const l=t.href?r.starred.has(t.href):!1;return i.setAttribute("aria-pressed",String(l)),i.setAttribute("aria-label",`${l?"Unstar":"Star"} ${t.label}`),i.textContent=l?"★":"☆",i.addEventListener("click",c=>{c.stopPropagation(),n.onToggleStar(t)}),e.appendChild(i),e}function Vt(t,r,n,s,e){const a=$t(s.flat,s.collapsed),i=_t(a,s.currentHref)??Dt(a,s.currentChapterTitle);r.style.height=`${a.length*Le}px`;const l=t.clientHeight||1,{start:c,end:o}=Gt(t.scrollTop,Le,l,a.length);n.replaceChildren(),n.style.transform=`translateY(${c*Le}px)`;for(let g=c;g<=o;g++){const b=a[g];b&&n.appendChild(Wt(b,s,e,b.id===i))}}function qt(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No starred chapters yet. Star a chapter in Contents to find it here.",t.appendChild(e);return}const s=document.createElement("div");s.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-starred-row",a.setAttribute("role","listitem"),a.textContent=e.label,a.addEventListener("click",()=>n(e)),s.appendChild(a)}t.appendChild(s)}function Kt(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No related books yet.",t.appendChild(e);return}const s=document.createElement("div");s.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-related-row",a.setAttribute("role","listitem");const i=`${e.title}${e.subtitle?`, ${e.subtitle}`:""}${e.read?", read":""}`;if(a.setAttribute("aria-label",i),e.coverUrl){const o=document.createElement("img");o.className="rx-related-cover",o.src=e.coverUrl,o.alt="",a.appendChild(o)}else{const o=document.createElement("div");o.className="rx-related-cover rx-related-cover-empty",a.appendChild(o)}const l=document.createElement("div");l.className="rx-related-text";const c=document.createElement("span");if(c.className="rx-related-title",c.textContent=e.title,l.appendChild(c),e.subtitle){const o=document.createElement("span");o.className="rx-related-subtitle",o.textContent=e.subtitle,l.appendChild(o)}if(a.appendChild(l),e.read){const o=document.createElement("span");o.className="rx-related-badge",o.textContent="Read",a.appendChild(o)}a.addEventListener("click",()=>n(e)),s.appendChild(a)}t.appendChild(s)}function ut(t,r){return ht(t,r,1)}function pt(t,r){return ht(t,r,-1)}function ht(t,r,n){if(t.length===0)return r;const s=t.indexOf(r);if(s===-1)return t[0];const e=(s+n+t.length)%t.length;return t[e]}function Ut(t,r){return ut(t,r)}function Yt(t,r){return pt(t,r)}const jt=40;function Xt(t,r){return Math.abs(t)>=jt&&Math.abs(t)>Math.abs(r)}function bt(t,r,n,s){return Xt(r,n)?t==="sidebar"?{action:r<0?"cycle-next":"cycle-prev"}:t==="book"&&s?{action:"close"}:{action:null}:{action:null}}function xt(t,r,n){return t&&r.contains(t)?"sidebar":t&&n.contains(t)&&!r.contains(t)?"book":"other"}function ft(t,r){let n=0,s=0,e=0,a=0,i=null,l=!1,c=!1;function o(p,L,M,P){n=e=p,s=a=L,i=M,l=!0,c=P}function g(){l&&(l=!1,r.onSwipe(e-n,a-s,i),i=null)}function b(p){p.pointerType!=="pen"&&o(p.clientX,p.clientY,p.target,p.pointerType==="touch")}function m(p){l&&(e=p.clientX,a=p.clientY)}function u(p){e=p.clientX,a=p.clientY,g()}function h(){c||g()}function y(p){if(!l)return;const L=p.touches[0];L&&(e=L.clientX,a=L.clientY)}function w(){g()}return t.addEventListener("pointerdown",b),t.addEventListener("pointermove",m),t.addEventListener("pointerup",u),t.addEventListener("pointercancel",h),t.addEventListener("touchmove",y,{passive:!0}),t.addEventListener("touchend",w,{passive:!0}),{destroy(){t.removeEventListener("pointerdown",b),t.removeEventListener("pointermove",m),t.removeEventListener("pointerup",u),t.removeEventListener("pointercancel",h),t.removeEventListener("touchmove",y),t.removeEventListener("touchend",w)}}}function Zt(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function Jt(t){let r=!1;function n(s){if(!r||s.key!=="Tab")return;const e=Zt(t);if(e.length===0){s.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],l=t.ownerDocument.activeElement;s.shiftKey&&l===a?(s.preventDefault(),i.focus()):!s.shiftKey&&l===i&&(s.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const Ue="reactor-left-sidebar-stylesheet";function Qt(t){if(t.getElementById(Ue))return;const r=t.createElement("style");r.id=Ue,r.textContent=Ft,t.head.appendChild(r)}function er(t,r,n={}){var A,O;const s=t.ownerDocument??document;Qt(s);const e=Rt(t);e.root.classList.add("closed");const a=["contents","starred"];(A=n.capabilities)!=null&&A.related&&a.push("related"),e.tabRelated.hidden=!((O=n.capabilities)!=null&&O.related);let i="contents",l=!1,c=!1,o=[];const g=new Set;let b=null,m=null;const u=new Set,h=new Map;let y=[];const w=Jt(e.root);let p=null;function L(){return!t.classList.contains("size-desktop")}function M(k){return k==="contents"?e.panelContents:k==="starred"?e.panelStarred:e.panelRelated}function P(k){return k==="contents"?e.tabContents:k==="starred"?e.tabStarred:e.tabRelated}function S(){if(i==="contents")Vt(e.tocScroll,e.tocSpacer,e.tocWindow,{flat:o,collapsed:g,currentHref:b,currentChapterTitle:m,starred:u},{onActivate:k=>{k.href&&r(k.href),L()&&I()},onToggleExpand:k=>{g.has(k.id)?g.delete(k.id):g.add(k.id),S()},onToggleStar:k=>{var _;if(!k.href)return;const z=!u.has(k.href);z?(u.add(k.href),h.set(k.href,k.label)):(u.delete(k.href),h.delete(k.href)),(_=n.onStarToggle)==null||_.call(n,k.href,k.label,z),S()}});else if(i==="starred"){const k=Array.from(h,([z,_])=>({href:z,label:_}));qt(e.panelStarred,k,z=>{r(z.href),L()&&I()})}else Kt(e.panelRelated,y,k=>{var z;(z=n.onOpenRelated)==null||z.call(n,k.id),L()&&I()})}function E(k){k!==i&&(P(i).setAttribute("aria-selected","false"),M(i).hidden=!0,i=k,P(i).setAttribute("aria-selected","true"),M(i).hidden=!1,S())}function N(k){const z=k===1?Ut(a,i):Yt(a,i);E(z)}e.tabContents.addEventListener("click",()=>E("contents")),e.tabStarred.addEventListener("click",()=>E("starred")),e.tabRelated.addEventListener("click",()=>E("related")),E("contents"),P("contents").setAttribute("aria-selected","true"),M("contents").hidden=!1;function H(){var z;if(l)return;l=!0,p=s.activeElement??null,e.root.classList.add("open"),e.root.classList.remove("closed"),t.classList.add("rx-left-sidebar-open"),e.scrim.classList.toggle("visible",L());const k=L();e.root.setAttribute("role",k?"dialog":"complementary"),k?e.root.setAttribute("aria-modal","true"):e.root.removeAttribute("aria-modal"),k&&(w.activate(),e.root.focus()),(z=n.onSidebarChange)==null||z.call(n,!0)}function I(){var k,z;l&&(l=!1,e.root.classList.remove("open"),e.root.classList.add("closed"),t.classList.remove("rx-left-sidebar-open"),e.scrim.classList.remove("visible"),w.deactivate(),(k=p==null?void 0:p.focus)==null||k.call(p),p=null,(z=n.onSidebarChange)==null||z.call(n,!1))}e.closeBtn.addEventListener("click",I),e.scrim.addEventListener("click",I),e.backBtn.addEventListener("click",()=>{var k;return(k=n.onBack)==null?void 0:k.call(n)});const V=ft(t,{onSwipe:(k,z,_)=>{const T=xt(_,e.root,t),W=bt(T,k,z,L());!l&&W.action!==null||(W.action==="cycle-next"?N(1):W.action==="cycle-prev"?N(-1):W.action==="close"&&I())}});function R(k){o=dt(k),g.clear(),i==="contents"&&S()}function G(k){h.clear(),u.clear();for(const z of k)u.add(z.href),h.set(z.href,z.label);(i==="starred"||i==="contents")&&S()}function F(k){y=k,i==="related"&&S()}function $(k){b=k,i==="contents"&&S()}function K(k){m=k,i==="contents"&&S()}function x(){c||(c=!0,V.destroy(),e.closeBtn.removeEventListener("click",I),e.scrim.removeEventListener("click",I),w.deactivate(),t.classList.remove("rx-left-sidebar-open"),e.root.remove(),e.scrim.remove())}return{open:H,close:I,isOpen:()=>l,cycleTab:N,getActiveTab:()=>i,setToc:R,setStarred:G,setRelated:F,setCurrentHref:$,setCurrentChapterTitle:K,destroy:x}}function Ae(t,r,n){const s=document.createElement("button");return s.type="button",s.className="rx-sidebar-tab",s.textContent=t,s.setAttribute("role","tab"),s.setAttribute("aria-selected",String(r)),s.dataset.tab=n,r&&s.classList.add("active"),s}function tr(t){const r=t.createElement("div");r.className="rx-right-sidebar",r.setAttribute("role","complementary"),r.setAttribute("aria-label","Context panel");const n=t.createElement("div");n.className="rx-sidebar-resize",n.setAttribute("role","separator"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-label","Resize context panel"),n.setAttribute("tabindex","0");const s=t.createElement("div");s.className="rx-sidebar-tabs";const e=t.createElement("div");e.className="rx-sidebar-tablist",e.setAttribute("role","tablist");const a=Ae("Context",!0,"context"),i=Ae("Glossary",!1,"glossary"),l=Ae("Notes",!1,"notes");l.disabled=!0;const c=t.createElement("button");c.type="button",c.className="rx-icon-btn rx-sidebar-close",c.setAttribute("aria-label","Close panel"),c.textContent="✕",e.append(a,i,l),s.append(e,c);const o=t.createElement("div");o.className="rx-ctx-searchbar",o.setAttribute("role","search");const g=t.createElement("input");g.type="search",g.className="rx-ctx-search-input",g.placeholder="Search this book",g.setAttribute("aria-label","Search this book");const b=t.createElement("button");b.type="button",b.className="rx-icon-btn rx-ctx-openmain",b.setAttribute("aria-label","Open in main window"),b.disabled=!0,b.textContent="↗";const m=t.createElement("div");m.className="rx-ctx-crumbs",m.setAttribute("aria-live","polite"),o.append(g,b,m);const u=t.createElement("div");u.className="rx-sidebar-body";const h=t.createElement("div");h.className="rx-ctx-results";const y=t.createElement("div");y.className="rx-ctx-page",y.hidden=!0;const w=t.createElement("div");w.className="rx-notes-body",w.hidden=!0;const p=t.createElement("div");return p.className="rx-glossary-panel-mount",p.hidden=!0,u.append(h,y,w,p),r.append(n,s,o,u),{root:r,resizeHandle:n,tabsRow:s,contextTabBtn:a,glossaryTabBtn:i,notesTabBtn:l,closeBtn:c,searchBar:o,searchInput:g,openInMainBtn:b,breadcrumb:m,body:u,resultsScroller:h,contextPage:y,notesBody:w,glossaryPanelMount:p}}const rr=`
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
`;class nr{constructor(){D(this,"rows",[]);D(this,"headerAt",new Map)}reset(){this.rows=[],this.headerAt.clear()}addGroup(r,n){if(n.length!==0){this.headerAt.has(r)||(this.headerAt.set(r,this.rows.length),this.rows.push({kind:"header",label:r}));for(const s of n)this.rows.push({kind:"item",item:s,groupLabel:r})}}get rowCount(){return this.rows.length}rowAt(r){return this.rows[r]}get isEmpty(){return this.rows.length===0}}class gt{constructor(r){D(this,"container");D(this,"rowHeight");D(this,"buffer");D(this,"opts");D(this,"topSpacer");D(this,"bottomSpacer");D(this,"rowsEl");D(this,"onScroll");D(this,"destroyed",!1);this.opts=r,this.container=r.container,this.rowHeight=r.rowHeight,this.buffer=r.buffer??6,this.topSpacer=document.createElement("div"),this.topSpacer.className="rx-wlist-spacer",this.bottomSpacer=document.createElement("div"),this.bottomSpacer.className="rx-wlist-spacer",this.rowsEl=document.createElement("div"),this.rowsEl.className="rx-wlist-rows",this.rowsEl.setAttribute("role","list"),this.container.replaceChildren(this.topSpacer,this.rowsEl,this.bottomSpacer),this.onScroll=()=>this.render(),this.container.addEventListener("scroll",this.onScroll)}visibleRange(){const r=this.opts.rowCount(),n=this.container.clientHeight||1,s=this.container.scrollTop||0,e=Math.max(0,Math.floor(s/this.rowHeight)-this.buffer),a=Math.ceil(n/this.rowHeight)+this.buffer*2,i=Math.min(r,e+a);return{first:e,last:i}}render(){if(this.destroyed)return;const r=this.opts.rowCount(),{first:n,last:s}=this.visibleRange();this.topSpacer.style.height=`${n*this.rowHeight}px`,this.bottomSpacer.style.height=`${Math.max(0,r-s)*this.rowHeight}px`,this.rowsEl.replaceChildren();for(let e=n;e<s;e++)this.rowsEl.appendChild(this.opts.renderRow(e))}destroy(){this.destroyed||(this.destroyed=!0,this.container.removeEventListener("scroll",this.onScroll),this.container.replaceChildren())}}function ar(t,r){return t.kind!==r.kind?!1:t.kind==="page"&&r.kind==="page"?t.target===r.target:!0}class sr{constructor(){D(this,"stack",[{kind:"blank"}]);D(this,"index",0)}get current(){return this.stack[this.index]??{kind:"blank"}}get canGoBack(){return this.index>0}get canGoForward(){return this.index<this.stack.length-1}push(r){ar(this.current,r)||(this.stack=this.stack.slice(0,this.index+1),this.stack.push(r),this.index=this.stack.length-1)}back(){return this.canGoBack?(this.index-=1,this.current):null}forward(){return this.canGoForward?(this.index+=1,this.current):null}reset(){this.stack=[{kind:"blank"}],this.index=0}}const or={"fold-tablet":320,desktop:340},Ee=240,Ye=16,ir={"fold-tablet":.6,desktop:.7};function lr(t,r,n){const s=ir[n],e=Math.max(Ee,r*s);return t<Ee?Ee:t>e?e:t}const mt=new WeakMap;function Te(t){return mt.get(t)??{left:0,right:0,bottom:0}}function ce(t,r){const n={left:Math.max(0,r.left??Te(t).left),right:Math.max(0,r.right??Te(t).right),bottom:Math.max(0,r.bottom??Te(t).bottom)};return mt.set(t,n),t.style.setProperty("--rx-book-inset-left",`${n.left}px`),t.style.setProperty("--rx-book-inset-right",`${n.right}px`),t.style.setProperty("--rx-book-inset-bottom",`${n.bottom}px`),t.style.paddingLeft=n.left?`${n.left}px`:"",t.style.paddingRight=n.right?`${n.right}px`:"",t.style.paddingBottom=n.bottom?`${n.bottom}px`:"",n}const cr=[{id:"all",label:"All"},{id:"highlight",label:"Highlight"},{id:"underline",label:"Underline"},{id:"note",label:"Typed note"},{id:"handwritten",label:"Handwritten"},{id:"bookmark",label:"Bookmark"}],dr=[{id:"position",label:"Position in book"},{id:"date",label:"Date"},{id:"colour",label:"Colour"},{id:"type",label:"Type"}];function ur(t){const r=t.createElement("div");r.className="rx-notes-panel";const n=t.createElement("div");n.className="rx-notes-searchbar",n.setAttribute("role","search");const s=t.createElement("input");s.type="search",s.className="rx-notes-search-input",s.placeholder="Search notes",s.setAttribute("aria-label","Search notes"),n.append(s);const e=t.createElement("select");e.className="rx-notes-sort",e.setAttribute("aria-label","Sort notes by");for(const{id:o,label:g}of dr){const b=t.createElement("option");b.value=o,b.textContent=g,e.append(b)}n.append(e);const a=t.createElement("div");a.className="rx-notes-filters",a.setAttribute("role","group"),a.setAttribute("aria-label","Filter notes by type");const i={};for(const{id:o,label:g}of cr){const b=t.createElement("button");b.type="button",b.className="rx-notes-chip",b.textContent=g,b.setAttribute("aria-pressed",String(o==="all")),o==="all"&&b.classList.add("active"),b.dataset.filter=o,a.append(b),i[o]=b}const l=t.createElement("div");l.className="rx-notes-banner",l.hidden=!0,l.textContent="No annotation store connected. Notes made in this session are not saved.";const c=t.createElement("div");return c.className="rx-notes-list",r.append(n,a,l,c),{root:r,searchBar:n,searchInput:s,filterRow:a,filterButtons:i,sortSelect:e,capabilityBanner:l,listScroller:c}}const pr=`
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
`,hr=100,br=20;function xr(t){return t==="all"?null:t}class fr{constructor(r){D(this,"total",0);D(this,"offset",0);D(this,"items",[]);D(this,"state",{filter:"all",sort:"position",query:null});D(this,"lastRequestedOffset",null);D(this,"everRequested",!1);this.hostChannel=r}getState(){return this.state}setState(r){this.state={...this.state,...r},this.total=0,this.offset=0,this.items=[],this.lastRequestedOffset=null,this.requestPage(0)}ensureInitialLoad(){this.everRequested||this.requestPage(0)}rowCount(){return this.total}rowAt(r){const n=r-this.offset;if(!(n<0||n>=this.items.length))return this.items[n]}ensureLoaded(r,n){const s=Math.max(r,n-1);if(this.rowAt(r)&&this.rowAt(s))return;const e=Math.max(0,r-br);this.lastRequestedOffset!==e&&this.requestPage(e)}requestPage(r){this.everRequested=!0,this.lastRequestedOffset=r,this.hostChannel.emitIntent({type:"notesPageRequest",offset:r,limit:hr,filter:xr(this.state.filter),sort:this.state.sort,query:this.state.query})}applyWindow(r){this.total=r.total,this.offset=r.offset,this.items=r.items,this.lastRequestedOffset=null}}const je="reactor-notes-stylesheet",gr=48,mr=200,Xe={highlight:"Highlight",underline:"Underline",note:"Typed note",bookmark:"Bookmark"};function vr(t,r){return r?`${Xe[t]} · ${r}`:Xe[t]}function yr({container:t,core:r,hostChannel:n,options:s={}}){const e=t.ownerDocument??document;if(!e.getElementById(je)){const E=e.createElement("style");E.id=je,E.textContent=pr,e.head.appendChild(E)}const a=ur(e);t.append(a.root);const i=new fr(n);let l=!1,c=null;const o=new Map,g=new Set;function b(E){o.has(E)||g.has(E)||typeof r.getChapterTitleForCfi=="function"&&(g.add(E),r.getChapterTitleForCfi(E).then(N=>{o.set(E,N)}).catch(()=>{o.set(E,null)}).finally(()=>{g.delete(E),!l&&u.render()}))}function m(E){i.ensureLoaded(E,E+1);const N=i.rowAt(E);if(!N){const K=e.createElement("div");return K.className="rx-notes-loading-row",K.setAttribute("role","listitem"),K.textContent="Loading…",K}const H=e.createElement("button");H.type="button",H.className="rx-notes-row";const I=e.createElement("span");I.className="rx-notes-row-swatch",N.color&&I.style.setProperty("--rx-notes-row-color",N.color);const V=e.createElement("span");V.className="rx-notes-row-body";const R=e.createElement("span");R.className="rx-notes-row-snippet",R.textContent=N.note??N.text??"";const G=e.createElement("span");G.className="rx-notes-row-meta";const F=o.get(N.cfi);G.textContent=vr(N.kind,F??null),V.append(R,G),H.append(I,V),H.setAttribute("aria-label",`${G.textContent}: ${R.textContent}`),F===void 0&&b(N.cfi),H.addEventListener("click",()=>r.goTo(N.cfi));const $=e.createElement("div");return $.setAttribute("role","listitem"),$.appendChild(H),$}const u=new gt({container:a.listScroller,rowHeight:gr,rowCount:()=>i.rowCount(),renderRow:m});function h(E){const N=E.currentTarget,H=N.dataset.filter??"all";for(const I of Object.values(a.filterButtons))I.classList.toggle("active",I===N),I.setAttribute("aria-pressed",String(I===N));i.setState({filter:H}),u.render()}for(const E of Object.values(a.filterButtons))E.addEventListener("click",h);function y(){i.setState({sort:a.sortSelect.value}),u.render()}a.sortSelect.addEventListener("change",y);function w(){c&&clearTimeout(c),c=setTimeout(()=>{i.setState({query:a.searchInput.value.trim()||null}),u.render()},mr)}a.searchInput.addEventListener("input",w);function p(E){E.type==="setNotes"&&(i.applyWindow(E),u.render())}const L=n.onCommand(p);function M(){var E;a.capabilityBanner.hidden=((E=n.getConfig())==null?void 0:E.capabilities.notes)!==!1,i.ensureInitialLoad(),u.render()}function P(){u.render()}function S(){if(!l){l=!0,c&&clearTimeout(c),L();for(const E of Object.values(a.filterButtons))E.removeEventListener("click",h);a.sortSelect.removeEventListener("change",y),a.searchInput.removeEventListener("input",w),u.destroy(),a.root.remove()}}return{onActivate:M,refresh:P,destroy:S}}function kr(t){const r=t.createElement("div");r.className="rx-glossary-panel",r.style.position="absolute",r.style.inset="0";const n=t.createElement("div");n.className="rx-glossary-search",n.setAttribute("role","search");const s=t.createElement("input");s.type="search",s.className="rx-glossary-search-input",s.placeholder="Search glossary",s.setAttribute("aria-label","Search glossary"),n.appendChild(s);const e=t.createElement("div");return e.className="rx-glossary-list",e.setAttribute("role","list"),r.append(n,e),{root:r,searchInput:s,list:e}}const wr=900;function Er(t){const r=t.ownerDocument??document,n=kr(r);t.appendChild(n.root);let s=[],e="",a=!1;function i(){const m=e.trim().toLowerCase();return[...m?s.filter(h=>h.term.toLowerCase().includes(m)):s].sort((h,y)=>h.term.localeCompare(y.term))}function l(){if(a)return;const m=i();if(n.list.replaceChildren(),!s.length){n.list.removeAttribute("role");const u=r.createElement("div");u.className="rx-glossary-empty",u.textContent="This book has no glossary.",n.list.appendChild(u);return}if(!m.length){n.list.removeAttribute("role");const u=r.createElement("div");u.className="rx-glossary-empty",u.textContent=`No terms match "${e}".`,n.list.appendChild(u);return}n.list.setAttribute("role","list");for(const u of m){let h=function(){const L=y.classList.toggle("expanded");w.setAttribute("aria-expanded",String(L))};const y=r.createElement("div");y.className="rx-glossary-item",y.setAttribute("role","listitem"),y.setAttribute("data-term",u.term);const w=r.createElement("button");w.type="button",w.className="rx-glossary-term-row",w.setAttribute("role","button"),w.setAttribute("aria-expanded","false"),w.textContent=u.term;const p=r.createElement("div");p.className="rx-glossary-def",p.textContent=u.definition,w.addEventListener("click",h),y.append(w,p),n.list.appendChild(y)}}function c(){e=n.searchInput.value,l()}n.searchInput.addEventListener("input",c),l();function o(m){s=m,l()}function g(m){var h,y;e&&(e="",n.searchInput.value="",l());const u=n.list.querySelector(`.rx-glossary-item[data-term="${CSS.escape(m)}"]`);u&&(u.classList.add("expanded"),(h=u.querySelector(".rx-glossary-term-row"))==null||h.setAttribute("aria-expanded","true"),(y=u.scrollIntoView)==null||y.call(u,{block:"center"}),u.classList.add("flash"),setTimeout(()=>u.classList.remove("flash"),wr))}function b(){a||(a=!0,n.searchInput.removeEventListener("input",c),n.root.remove())}return{setTerms:o,scrollToAndFlash:g,destroy:b}}const Ze=9,ge=8,Je=16;function Sr(t,r,n,s){const e=t.top+t.height;let a=t.left;a=Math.min(Math.max(ge,a),Math.max(ge,r.width-n-ge));let i=e+Ze,l=!1;if(i+s>r.height-ge){const o=t.top-s-Ze;i=Math.max(ge,o),l=!0}const c=Math.max(Je,Math.min(n-Je,t.left+t.width/2-a));return{left:a,top:i,above:l,arrowX:c}}const Cr='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';function Lr(t,r,n){const s=t.ownerDocument??document;let e=null,a=!1;function i(){var u;const m=!!e;e==null||e.remove(),e=null,m&&((u=t.querySelector("iframe"))==null||u.focus())}function l(m,u){var M;i();const h=s.createElement("div");h.className="rx-glossary-popover",h.setAttribute("role","dialog"),h.setAttribute("aria-label",`${m.term} definition`),h.innerHTML=`
      <div class="rx-glossary-popover-head">
        <h4 class="rx-glossary-popover-term"></h4>
        <button type="button" class="rx-icon-btn rx-glossary-popover-open" aria-label="Open in glossary" title="Open in glossary">${Cr}</button>
      </div>
      <p class="rx-glossary-popover-def"></p>
    `,h.querySelector(".rx-glossary-popover-term").textContent=m.term,h.querySelector(".rx-glossary-popover-def").textContent=m.definition,t.appendChild(h),e=h;const y=t.getBoundingClientRect(),w={left:u.left-y.left,top:u.top-y.top,width:u.width,height:u.height},p={width:y.width,height:y.height},L=Sr(w,p,h.offsetWidth,h.offsetHeight||120);h.style.left=`${L.left}px`,h.style.top=`${L.top}px`,h.classList.toggle("above",L.above),h.style.setProperty("--arrow-x",`${L.arrowX}px`),h.querySelector(".rx-glossary-popover-open").addEventListener("click",P=>{P.stopPropagation(),i(),n.onOpenInGlossary(m.term)}),(M=h.querySelector(".rx-glossary-popover-open"))==null||M.focus()}async function c(m,u){const h=await r.getGlossaryTerms();if(a)return;const y=h.find(w=>w.term.toLowerCase()===m.toLowerCase());y&&l(y,u)}const o=r.onGlossaryTermTap(c);function g(m){var h;if(!e)return;const u=m.target;(h=u==null?void 0:u.closest)!=null&&h.call(u,".rx-glossary-popover")||i()}s.addEventListener("click",g);function b(){a||(a=!0,o(),s.removeEventListener("click",g),i())}return{isOpen:()=>e!==null,close:i,destroy:b}}const Ar=`
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
`,Qe="reactor-right-sidebar-stylesheet",et="reactor-glossary-stylesheet",Tr=48,Br=200;function Nr(t){if(!t.getElementById(Qe)){const r=t.createElement("style");r.id=Qe,r.textContent=rr,t.head.appendChild(r)}if(!t.getElementById(et)){const r=t.createElement("style");r.id=et,r.textContent=Ar,t.head.appendChild(r)}}function zr(t){const r=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`${r(t.pre)}<mark>${r(t.match)}</mark>${r(t.post)}`}function Ir(t,r,n){var oe,fe;const s=t.ownerDocument??document;Nr(s);const e=tr(s),a=s.createElement("div");a.className="rx-sidebar-scrim",t.append(a,e.root);const i=new nr,l=new sr,c=Er(e.glossaryPanelMount);let o="context",g=null,b=!1,m=!1,u=null;const h=!!n.hostChannel&&((oe=n.hostChannel.getConfig())==null?void 0:oe.capabilities.notes)!==!1;e.notesTabBtn.disabled=!h;const y=h?yr({container:e.notesBody,core:r,hostChannel:n.hostChannel}):null;((fe=n.capabilities)==null?void 0:fe.glossary)===!1&&(e.glossaryTabBtn.hidden=!0);const w=["context"];e.glossaryTabBtn.hidden!==!0&&w.push("glossary"),h&&w.push("notes");function p(){return n.getSizeClass()==="phone"}function L(f){const B=f===1?ut(w,o):pt(w,o);M(B)}function M(f){f!==o&&(o=f,e.contextTabBtn.classList.toggle("active",f==="context"),e.contextTabBtn.setAttribute("aria-selected",String(f==="context")),e.glossaryTabBtn.classList.toggle("active",f==="glossary"),e.glossaryTabBtn.setAttribute("aria-selected",String(f==="glossary")),e.notesTabBtn.classList.toggle("active",f==="notes"),e.notesTabBtn.setAttribute("aria-selected",String(f==="notes")),e.searchBar.hidden=f!=="context",e.glossaryPanelMount.hidden=f!=="glossary",e.notesBody.hidden=f!=="notes",f==="context"?$(l.current):f==="glossary"?(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,r.getGlossaryTerms().then(B=>c.setTerms(B))):(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,y==null||y.onActivate()))}const P=()=>M("context"),S=()=>M("glossary"),E=()=>M("notes");e.contextTabBtn.addEventListener("click",P),e.glossaryTabBtn.addEventListener("click",S),e.notesTabBtn.addEventListener("click",E);function N(f){const B=i.rowAt(f);if(!B)return s.createElement("div");if(B.kind==="header"){const J=s.createElement("div");return J.className="rx-ctx-group-header",J.setAttribute("role","listitem"),J.textContent=B.label,J}const j=s.createElement("button");j.type="button",j.className="rx-ctx-result",j.setAttribute("role","listitem"),j.innerHTML=zr(B.item),j.addEventListener("click",()=>A(B.item,B.groupLabel));const ee=s.createElement("div");return ee.setAttribute("role","listitem"),ee.appendChild(j),ee}const H=new gt({container:e.resultsScroller,rowHeight:Tr,rowCount:()=>i.rowCount,renderRow:N});function I(){e.breadcrumb.replaceChildren();const f=s.createElement("button");f.type="button",f.textContent="Back",f.disabled=!l.canGoBack,f.setAttribute("aria-label","Back"),f.addEventListener("click",K);const B=s.createElement("button");B.type="button",B.textContent="Forward",B.disabled=!l.canGoForward,B.setAttribute("aria-label","Forward"),B.addEventListener("click",x),e.breadcrumb.append(f,B),e.openInMainBtn.disabled=l.current.kind!=="page"}function V(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,H.render()}function R(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,H.render()}function G(){return g||(g=r.createSecondaryView(e.contextPage),g)}function F(f){e.resultsScroller.hidden=!0,e.contextPage.hidden=!1;const B=G();B&&B.goTo(f)}function $(f){f.kind==="blank"?R():f.kind==="results"?V():F(f.target),I()}function K(){const f=l.back();f&&$(f)}function x(){const f=l.forward();f&&$(f)}function A(f,B){l.push({kind:"page",target:f.cfi,label:B}),$(l.current)}function O(){const f=e.searchInput.value.trim();i.reset(),f?l.current.kind!=="results"&&l.push({kind:"results"}):l.reset(),$(l.current),u&&clearTimeout(u),f&&(u=setTimeout(()=>r.runSearch(f),Br))}e.searchInput.addEventListener("input",O);function k(f){f.type==="searchResults"?(i.addGroup(f.label,f.items),l.current.kind==="results"&&H.render()):f.type==="loaded"&&c.setTerms([])}const z=r.on(k);function _(){const f=l.current;f.kind==="page"&&(r.goTo(f.target),n.getSizeClass()==="phone"&&ae())}e.openInMainBtn.addEventListener("click",_);function T(){ae()}e.closeBtn.addEventListener("click",T);const W=()=>ae();a.addEventListener("click",W);function U(){const f=getComputedStyle(t).getPropertyValue("--rx-ctx-width"),B=parseFloat(f);if(!Number.isNaN(B)&&B>0)return B;const j=n.getSizeClass();return j==="phone"?Ee:or[j]}e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(U())));function X(f,B){var J;const j=n.getSizeClass();if(j==="phone")return;const ee=lr(f,t.clientWidth||1200,j);t.style.setProperty("--rx-ctx-width",`${ee}px`),e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(ee))),b&&ce(t,{right:ee}),B&&((J=n.onWidthChange)==null||J.call(n,ee))}let te=!1,re=0,Y=0;function ne(f){te=!0,re=f.clientX,Y=U(),t.classList.add("right-sidebar-resizing"),s.addEventListener("pointermove",Z),s.addEventListener("pointerup",se)}function Z(f){te&&X(Y-(f.clientX-re),!1)}function se(){te&&(te=!1,t.classList.remove("right-sidebar-resizing"),s.removeEventListener("pointermove",Z),s.removeEventListener("pointerup",se),X(U(),!0))}function de(f){f.key==="ArrowLeft"?(f.preventDefault(),X(U()+Ye,!0)):f.key==="ArrowRight"&&(f.preventDefault(),X(U()-Ye,!0))}e.resizeHandle.addEventListener("pointerdown",ne),e.resizeHandle.addEventListener("keydown",de);const he=ft(t,{onSwipe:(f,B,j)=>{const ee=xt(j,e.root,t),J=bt(ee,f,B,p());!b&&J.action!==null||(J.action==="cycle-next"?L(1):J.action==="cycle-prev"?L(-1):J.action==="close"&&ae())}});function ie(){b||(b=!0,t.classList.add("right-sidebar-open"),X(U(),!1),H.render(),o==="notes"&&(y==null||y.refresh()))}function ae(){var f;b&&(b=!1,t.classList.remove("right-sidebar-open"),ce(t,{right:0}),(f=n.onClose)==null||f.call(n))}function ue(){b?ae():ie()}function d(f){b||ie(),M("glossary"),r.getGlossaryTerms().then(B=>{c.setTerms(B),c.scrollToAndFlash(f)})}function C(){b&&(n.getSizeClass()==="phone"?ce(t,{right:0}):ce(t,{right:U()}))}$(l.current);function Q(){m||(m=!0,u&&clearTimeout(u),z(),e.searchInput.removeEventListener("input",O),e.openInMainBtn.removeEventListener("click",_),e.closeBtn.removeEventListener("click",T),a.removeEventListener("click",W),e.resizeHandle.removeEventListener("pointerdown",ne),s.removeEventListener("pointermove",Z),s.removeEventListener("pointerup",se),e.resizeHandle.removeEventListener("keydown",de),he.destroy(),e.contextTabBtn.removeEventListener("click",P),e.notesTabBtn.removeEventListener("click",E),y==null||y.destroy(),e.glossaryTabBtn.removeEventListener("click",S),c.destroy(),H.destroy(),g==null||g.destroy(),t.classList.remove("right-sidebar-open","right-sidebar-resizing"),ce(t,{right:0}),e.root.remove(),a.remove())}return{open:ie,close:ae,toggle:ue,isOpen:()=>b,destroy:Q,refreshLayout:C,openGlossaryTerm:d}}function me(t,r){const n=document.createElement("button");return n.type="button",n.className=r,n.setAttribute("aria-label",t),n}function Mr(t){const r=t.createElement("div");r.className="rx-playback-bar",r.setAttribute("role","group"),r.setAttribute("aria-label","Narration transport");const n=me("Skip back 15 seconds","rx-playback-icon-btn rx-playback-skip-back");n.innerHTML=xe("skip_back");const s=me("Play","rx-playback-icon-btn rx-playback-play-pause");s.setAttribute("aria-pressed","false"),s.innerHTML=xe("play");const e=me("Skip forward 15 seconds","rx-playback-icon-btn rx-playback-skip-forward");e.innerHTML=xe("skip_forward");const a=me("Sleep timer","rx-playback-icon-btn rx-playback-sleep");a.setAttribute("aria-pressed","false"),a.innerHTML=xe("sleep");const i=me("Playback speed","rx-playback-rate-btn");i.textContent="1x";const l=t.createElement("div");l.className="rx-playback-info";const c=t.createElement("span");c.className="rx-playback-chapter",c.setAttribute("aria-live","polite");const o=t.createElement("span");return o.className="rx-playback-position",o.textContent="0:00",l.append(c,o),r.append(n,s,e,a,l,i),{root:r,skipBackBtn:n,playPauseBtn:s,skipForwardBtn:e,sleepBtn:a,rateBtn:i,chapterLabel:c,positionLabel:o}}const Pr=`
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
`;class Hr{constructor(){D(this,"timeline",null);D(this,"activeAudioIndex",0)}setTimeline(r){this.timeline=r,this.activeAudioIndex=0}clear(){this.timeline=null,this.activeAudioIndex=0}hasTimeline(){return this.timeline!==null}itemFor(r){const n=this.timeline;if(!n)return null;const s=a=>a.beginSec<=r&&(a.endSec===null||r<a.endSec);let e=n.items.filter(a=>a.audioIndex===this.activeAudioIndex&&s(a));if(e.length===0){e=n.items.filter(s);const a=e[0];a&&(this.activeAudioIndex=a.audioIndex)}return e.length===0?null:e.reduce((a,i)=>i.beginSec>a.beginSec?i:a)}textHrefFor(r){var n;return((n=this.itemFor(r))==null?void 0:n.textHref)??null}}const tt="reactor-playback-stylesheet",rt=15,ye=[.75,1,1.25,1.5,1.75,2];function Or(t){if(t.getElementById(tt))return;const r=t.createElement("style");r.id=tt,r.textContent=Pr,t.head.appendChild(r)}function Rr(t){const r=Number.isFinite(t)&&t>0?t:0,n=Math.floor(r),s=Math.floor(n/60),e=n%60;return`${s}:${String(e).padStart(2,"0")}`}function nt(t){return ye.reduce((r,n)=>Math.abs(n-t)<Math.abs(r-t)?n:r,ye[0]??1)}function Fr(t,r,n,s={}){const e=t.ownerDocument??document;Or(e);let a=null,i=!1,l=!1,c=!1,o=!1,g=0,b=1,m=!1,u=!1,h=0,y=!1,w=!1,p="shell";const L=new Hr;function M(T,W=null,U=null){n.emitIntent({type:"playback",action:T,positionSec:W,rate:U})}const P=()=>M(o?"pause":"play"),S=()=>M("seek",Math.max(0,g-rt)),E=()=>M("seek",g+rt),N=()=>M("sleepTimer"),H=()=>{const T=ye.indexOf(nt(b)),W=ye[(T+1)%ye.length]??1;M("rateChange",null,W)};function I(){a&&(a.playPauseBtn.setAttribute("aria-pressed",String(o)),a.playPauseBtn.setAttribute("aria-label",o?"Pause":"Play"),a.playPauseBtn.innerHTML=xe(o?"pause":"play"),a.sleepBtn.setAttribute("aria-pressed",String(w)),a.positionLabel.textContent=Rr(g),a.rateBtn.textContent=`${nt(b)}x`,R())}function V(){if(!a)return;const T=a.root.classList.contains("rx-playback-chrome-hidden");ce(t,{bottom:T?0:a.root.offsetHeight||56})}function R(){a&&(a.root.classList.toggle("rx-playback-chrome-hidden",!m||!y&&!o),V())}function G(T){a&&a.chapterLabel.textContent!==(T??"")&&(a.chapterLabel.textContent=T??"")}function F(){i||l||(i=!0,a=Mr(e),a.root.classList.toggle("e-ink",!!s.eink),t.appendChild(a.root),a.playPauseBtn.addEventListener("click",P),a.skipBackBtn.addEventListener("click",S),a.skipForwardBtn.addEventListener("click",E),a.rateBtn.addEventListener("click",H),a.sleepBtn.addEventListener("click",N),I(),$())}function $(){!i||!u||p==="host"||(h+=1,r.narrationPrepare(h))}function K(){if(!i||!u||p==="host")return;const T=L.textHrefFor(g);T?r.narrationHighlight(T):r.narrationUnhighlight()}function x(T){switch(T.type){case"loaded":u=T.hasMediaOverlay,L.clear(),$();break;case"relocate":G(T.chapterTitle);break;case"narrationTimeline":T.generation===h&&(L.setTimeline(T),K());break;case"narrationTimelineError":T.generation===h&&L.clear();break}}const A=r.on(x);r.replayLastEvents(x);function O(T){if(T.type==="configure"){if(c)return;c=!0,p=T.narrationFollow??"shell",T.capabilities.playback&&F()}else if(T.type==="setPlaybackState"){if(!i)return;o=T.playing,g=T.positionSec,b=T.rate,m=T.active!==!1,w=T.sleepTimerActive===!0,I(),K()}}const k=n.onCommand(O),z=n.getConfig();z&&O(z);function _(){l||(l=!0,A(),k(),a&&(a.playPauseBtn.removeEventListener("click",P),a.skipBackBtn.removeEventListener("click",S),a.skipForwardBtn.removeEventListener("click",E),a.rateBtn.removeEventListener("click",H),a.sleepBtn.removeEventListener("click",N),a.root.remove(),ce(t,{bottom:0})))}return{isVisible:()=>i,setChromeVisible:T=>{y=T,R()},destroy:_}}const Be={highlight:"Highlight",underline:"Underline",strikethrough:"Strikethrough",squiggly:"Squiggly underline"};function $r(t){const r=t.createElement("div");r.className="rx-anno-popover",r.setAttribute("role","dialog"),r.setAttribute("aria-label","Annotation"),r.hidden=!0;const n=t.createElement("div");n.className="rx-anno-status",n.setAttribute("aria-live","polite");const s=t.createElement("button");s.type="button",s.className="rx-icon-btn rx-anno-close",s.setAttribute("aria-label","Close"),s.textContent="✕";const e=t.createElement("div");e.className="rx-anno-header",e.append(n,s);const a=t.createElement("div");a.className="rx-anno-colors",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Colour");const i=St.map(w=>{const p=t.createElement("button");return p.type="button",p.className="rx-anno-swatch",p.style.setProperty("--rx-anno-swatch-color",w.value),p.setAttribute("role","radio"),p.setAttribute("aria-checked","false"),p.setAttribute("aria-label",w.label),p.dataset.color=w.value,a.append(p),p}),l=t.createElement("div");l.className="rx-anno-styles",l.setAttribute("role","group"),l.setAttribute("aria-label","Mark style");const c={};for(const w of Object.keys(Be)){const p=t.createElement("button");p.type="button",p.className=`rx-anno-style rx-anno-style-${w}`,p.textContent=Be[w],p.setAttribute("aria-label",Be[w]),p.dataset.style=w,l.append(p),c[w]=p}const o=t.createElement("button");o.type="button",o.className="rx-anno-note-toggle",o.textContent="Note",o.setAttribute("aria-expanded","false");const g=t.createElement("div");g.className="rx-anno-note-form",g.hidden=!0;const b=t.createElement("textarea");b.className="rx-anno-note-textarea",b.setAttribute("aria-label","Note text"),b.rows=3;const m=t.createElement("div");m.className="rx-anno-note-actions";const u=t.createElement("button");u.type="button",u.className="rx-anno-note-save",u.textContent="Save";const h=t.createElement("button");h.type="button",h.className="rx-anno-note-cancel",h.textContent="Cancel",m.append(h,u),g.append(b,m);const y=t.createElement("button");return y.type="button",y.className="rx-anno-delete",y.textContent="Delete",y.hidden=!0,r.append(e,a,l,o,g,y),{root:r,colorRow:a,colorButtons:i,styleRow:l,styleButtons:c,noteToggleBtn:o,noteForm:g,noteTextarea:b,noteSaveBtn:u,noteCancelBtn:h,deleteBtn:y,closeBtn:s,statusLabel:n}}const _r=`
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
`,at="reactor-annotations-stylesheet";function Dr(t){return t==="underline"||t==="squiggly"?"underline":"highlight"}class Gr{constructor(r=500){D(this,"map",new Map);this.cap=r}get(r){return this.map.get(r)}addAll(r){for(const n of r)for(this.map.delete(n.cfi),this.map.set(n.cfi,n);this.map.size>this.cap;){const s=this.map.keys().next().value;if(s===void 0)break;this.map.delete(s)}}}function Wr({shellRoot:t,core:r,hostChannel:n,options:s={}}){const e=t.ownerDocument??document;if(!e.getElementById(at)){const x=e.createElement("style");x.id=at,x.textContent=_r,e.head.appendChild(x)}const a=$r(e);t.append(a.root);const i=new Gr;let l=Se,c=!1,o=null,g=null;function b(){o=null,g=null,a.root.hidden=!0,a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}function m(x){const A=t.getBoundingClientRect(),O=x?x.left-A.left:(t.clientWidth||300)/2-140,k=x?x.bottom-A.top+8:60,z=Math.max(0,(t.clientWidth||300)-288);a.root.style.left=`${Math.min(Math.max(0,O),z)}px`,a.root.style.top=`${Math.max(0,k)}px`}function u(x){l=x;for(const A of a.colorButtons)A.setAttribute("aria-checked",String(A.dataset.color===x))}function h(x){for(const[A,O]of Object.entries(a.styleButtons))O.setAttribute("aria-pressed",String(A===x))}function y(x,A,O){o={kind:"create",cfi:x,text:A},a.statusLabel.textContent="Add mark",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.noteTextarea.value="",u(l),h(null),a.root.hidden=!1,m(O)}function w(x,A){o={kind:"edit",note:x},a.statusLabel.textContent="Edit mark",a.deleteBtn.hidden=!1,a.noteForm.hidden=!0,a.noteTextarea.value=x.note??"",u(x.color??Se),h(x.style??(x.kind==="underline"?"underline":"highlight")),a.root.hidden=!1,m(A)}function p(x,A){o=null,g=x,a.statusLabel.textContent="Loading…",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.root.hidden=!1,m(A),n.emitIntent({type:"notesPageRequest",offset:0,limit:1,filter:null,sort:null,query:`cfi:${x}`})}function L(x){if(x.type==="selection"&&x.cfi)y(x.cfi,x.text,x.rect);else if(x.type==="selectionCleared")(o==null?void 0:o.kind)==="create"&&b();else if(x.type==="annotationTap"){if(!x.cfi)return;const A=i.get(x.cfi);A?w(A,x.rect):p(x.cfi,x.rect)}}const M=r.on(L);function P(x){if(x.type==="setNotes"&&(i.addAll(x.items),g)){const A=x.items.find(O=>O.cfi===g);if(A){const O=a.root.hidden?null:{left:parseFloat(a.root.style.left||"0"),top:parseFloat(a.root.style.top||"0"),bottom:0};w(A,O)}else b()}}const S=n.onCommand(P);function E(x){(o==null?void 0:o.kind)==="create"&&(n.emitIntent({type:"annotationCreate",cfi:o.cfi,kind:Dr(x),color:l,style:x,text:o.text,note:null}),r.clearSelection(),b())}function N(x){(o==null?void 0:o.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:o.note.id,color:l,style:x,note:o.note.note}),b())}function H(x){const O=x.currentTarget.dataset.color??Se;u(O),(o==null?void 0:o.kind)==="edit"&&n.emitIntent({type:"annotationUpdate",id:o.note.id,color:O,style:o.note.style,note:o.note.note})}for(const x of a.colorButtons)x.addEventListener("click",H);const I={highlight:()=>(o==null?void 0:o.kind)==="create"?E("highlight"):N("highlight"),underline:()=>(o==null?void 0:o.kind)==="create"?E("underline"):N("underline"),strikethrough:()=>(o==null?void 0:o.kind)==="create"?E("strikethrough"):N("strikethrough"),squiggly:()=>(o==null?void 0:o.kind)==="create"?E("squiggly"):N("squiggly")};for(const[x,A]of Object.entries(a.styleButtons))A.addEventListener("click",I[x]);function V(){const x=a.noteForm.hidden;a.noteForm.hidden=!x,a.noteToggleBtn.setAttribute("aria-expanded",String(x)),x&&a.noteTextarea.focus()}a.noteToggleBtn.addEventListener("click",V);function R(){a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}a.noteCancelBtn.addEventListener("click",R);function G(){const x=a.noteTextarea.value.trim()||null;(o==null?void 0:o.kind)==="create"?(n.emitIntent({type:"annotationCreate",cfi:o.cfi,kind:"note",color:l,style:null,text:o.text,note:x}),r.clearSelection(),b()):(o==null?void 0:o.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:o.note.id,color:o.note.color,style:o.note.style,note:x}),b())}a.noteSaveBtn.addEventListener("click",G);function F(){(o==null?void 0:o.kind)==="edit"&&(n.emitIntent({type:"annotationDelete",id:o.note.id}),b())}a.deleteBtn.addEventListener("click",F);const $=()=>b();a.closeBtn.addEventListener("click",$);function K(){if(!c){c=!0,M(),S();for(const x of a.colorButtons)x.removeEventListener("click",H);for(const[x,A]of Object.entries(a.styleButtons))A.removeEventListener("click",I[x]);a.noteToggleBtn.removeEventListener("click",V),a.noteCancelBtn.removeEventListener("click",R),a.noteSaveBtn.removeEventListener("click",G),a.deleteBtn.removeEventListener("click",F),a.closeBtn.removeEventListener("click",$),a.root.remove()}}return{isOpen:()=>!a.root.hidden,close:b,destroy:K}}const Vr='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function qr(t,r,n){const s=document.createElement("button");return s.type="button",s.className=n,s.setAttribute("aria-label",t),s.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,s}function be(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-toggle",n.setAttribute("aria-pressed","false"),n.setAttribute("data-setting",r),n.textContent=t,n}function we(t,r,n){const s=document.createElement("div");s.className=`rx-settings-pills ${n}`,s.setAttribute("role","radiogroup"),s.setAttribute("aria-label",t);for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-settings-pill",a.setAttribute("role","radio"),a.setAttribute("aria-checked","false"),a.setAttribute("data-value",e.id),a.textContent=e.label,s.appendChild(a)}return s}function le(t,r,n,s){const e=document.createElement("div");e.className="rx-settings-slider-row";const a=document.createElement("div");a.className="rx-settings-slider-label";const i=document.createElement("span");i.textContent=t;const l=document.createElement("span");l.className="rx-settings-slider-value",a.append(i,l);const c=document.createElement("input");return c.type="range",c.className="rx-settings-slider",c.min=String(r),c.max=String(n),c.step=String(s),c.setAttribute("aria-label",t),e.append(a,c),{row:e,input:c,value:l}}function Kr(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-tab",n.setAttribute("role","tab"),n.setAttribute("aria-selected","false"),n.setAttribute("data-tab",t),n.id=`rx-settings-tab-${t}`,n.textContent=r,n}function ve(t){const r=document.createElement("div");return r.className="rx-settings-panel",r.setAttribute("role","tabpanel"),r.setAttribute("data-panel",t),r.setAttribute("aria-labelledby",`rx-settings-tab-${t}`),r.hidden=!0,r}function Ur(t){const r=document.createElement("div");r.className="rx-settings-scrim";const n=document.createElement("div");n.className="rx-settings-sheet",n.setAttribute("role","dialog"),n.setAttribute("aria-label","Text settings"),n.tabIndex=-1;const s=document.createElement("div");s.className="rx-settings-head";const e=document.createElement("h3");e.className="rx-settings-title",e.textContent="Text settings";const a=qr("Close settings",Vr,"rx-icon-btn rx-settings-close");s.append(e,a);const i=document.createElement("div");i.className="rx-settings-scope",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Settings scope");const l=document.createElement("button");l.type="button",l.className="rx-settings-scope-btn",l.setAttribute("role","radio"),l.setAttribute("aria-checked","true"),l.setAttribute("data-scope","global"),l.textContent="Global";const c=document.createElement("button");c.type="button",c.className="rx-settings-scope-btn",c.setAttribute("role","radio"),c.setAttribute("aria-checked","false"),c.setAttribute("data-scope","book"),c.textContent="This book",i.append(l,c);const o=document.createElement("div");o.className="rx-settings-tabs",o.setAttribute("role","tablist");const g=[["typography","Typography"],["layout","Layout"],["theme","Theme"],["controls","Controls"],["playback","Playback"]],b={};for(const[Y,ne]of g){const Z=Kr(Y,ne);b[Y]=Z,o.appendChild(Z)}const m=document.createElement("div");m.className="rx-settings-body";const u=ve("typography"),h=le("Font size",13,28,1),y=le("Paragraph spacing",0,2,.1),w=we("Typeface",[],"rx-settings-font-pills");u.append(h.row,w,y.row);const p=ve("layout"),L=we("Reading mode",[{id:"paginated",label:"Paginated"},{id:"scrolled",label:"Scrolling"}],"rx-settings-flow-pills"),M=we("Columns",[{id:"1",label:"1 column"},{id:"2",label:"2 columns"}],"rx-settings-columns-pills"),P=document.createElement("div");P.className="rx-settings-margins-group";const S=document.createElement("div");S.className="rx-settings-margins-head";const E=document.createElement("span");E.className="rx-settings-margins-label",E.textContent="Margins";const N=be("Link left and right margins","linkSideMargins");N.classList.add("rx-settings-link-toggle"),S.append(E,N);const H=le("Top",0,96,4),I=le("Bottom",0,96,4),V=le("Left",0,96,4),R=le("Right",0,96,4);P.append(S,H.row,I.row,V.row,R.row);const G=le("Line spacing",1.2,1.95,.05),F=be("Justify text","justify"),$=be("Hyphenate","hyphenate"),K=be("Use book's own styling","useBookLayout");p.append(L,M,P,G.row,F,$,K);const x=ve("theme"),A=document.createElement("div");A.className="rx-settings-swatches",A.setAttribute("role","radiogroup"),A.setAttribute("aria-label","Theme"),x.append(A);const O=ve("controls"),k=be("Swipe to turn pages","swipe"),z=we("Tap zone size",[{id:"standard",label:"Standard"},{id:"wide",label:"Wide"}],"rx-settings-tapzone-pills"),_=document.createElement("div");_.className="rx-settings-volumekeys",_.hidden=!0;const T=be("Volume keys turn pages","volumeKeys");_.append(T),O.append(k,z,_);const W=ve("playback"),U=document.createElement("p");U.className="rx-settings-empty",U.textContent="No narration provider for this book.";const X=document.createElement("div");X.className="rx-settings-playback-controls",X.hidden=!0;const te=le("Narration speed",.5,3,.1),re=le("Skip forward (seconds)",5,60,5);return X.append(te.row,re.row),W.append(U,X),m.append(u,p,x,O,W),n.append(s,i,o,m),t.append(r,n),{root:n,scrim:r,closeBtn:a,scopeGlobalBtn:l,scopeBookBtn:c,tabsRow:o,tabButtons:b,panels:{typography:u,layout:p,theme:x,controls:O,playback:W},fontSizeInput:h.input,fontSizeValue:h.value,paragraphSpacingInput:y.input,paragraphSpacingValue:y.value,fontFamilyPills:w,flowPills:L,columnsPills:M,linkSideMarginsToggle:N,marginTopInput:H.input,marginTopValue:H.value,marginBottomInput:I.input,marginBottomValue:I.value,marginLeftInput:V.input,marginLeftValue:V.value,marginRightInput:R.input,marginRightValue:R.value,lineHeightInput:G.input,lineHeightValue:G.value,justifyToggle:F,hyphenateToggle:$,useBookLayoutToggle:K,themeSwatches:A,swipeToggle:k,tapZonePills:z,volumeKeysRow:_,volumeKeysToggle:T,playbackEmpty:U,playbackControls:X,narrationSpeedInput:te.input,narrationSpeedValue:te.value,skipForwardInput:re.input,skipForwardValue:re.value}}const Yr=`
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
`,st={fontSize:16,lineHeight:1.5,fontFamily:null,paragraphSpacing:0,maxColumnCount:2,gap:.05,maxInlineSize:720,maxBlockSize:1440,justify:!0,hyphenate:!0,isDark:!1,themeName:"default",flow:"paginated",useBookLayout:!0,marginTop:40,marginBottom:40,marginLeft:40,marginRight:40,linkSideMargins:!0},Ne=[{id:"light",label:"Light",themeName:"default",isDark:!1,swatchBg:"#ffffff",swatchFg:"#000000"},{id:"sepia",label:"Sepia",themeName:"sepia",isDark:!1,swatchBg:"#f1e8d0",swatchFg:"#5b4636"},{id:"dark",label:"Dark",themeName:"default",isDark:!0,swatchBg:"#222222",swatchFg:"#e0e0e0"},{id:"amoled",label:"AMOLED",themeName:"amoled",isDark:!0,swatchBg:"#000000",swatchFg:"#ffffff"}];function jr(t,r){return Ne.find(n=>n.themeName===t&&n.isDark===r)??Ne.find(n=>n.id===(r?"dark":"light"))}const ot=[{id:"publisher",label:"Publisher",value:null},{id:"serif",label:"Serif",value:'Georgia, "Iowan Old Style", "Times New Roman", serif'},{id:"sans",label:"Sans-serif",value:'-apple-system, "Segoe UI", Roboto, Arial, sans-serif'},{id:"mono",label:"Monospace",value:'"Courier New", monospace'}];function Xr(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function Zr(t){let r=!1;function n(s){if(!r||s.key!=="Tab")return;const e=Xr(t);if(e.length===0){s.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],l=t.ownerDocument.activeElement;s.shiftKey&&l===a?(s.preventDefault(),i.focus()):!s.shiftKey&&l===i&&(s.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const it="reactor-settings-stylesheet",Jr=["typography","layout","theme","controls","playback"];function Qr(t){if(t.getElementById(it))return;const r=t.createElement("style");r.id=it,r.textContent=Yr,t.head.appendChild(r)}function en(t,r,n){var ie,ae,ue;const s=t.ownerDocument??document;Qr(s);const e=Ur(t),a=Zr(e.root),i={global:{...st},book:{...st}};let l="global",c="typography",o=!1,g=!1,b=((ae=(ie=n.hostChannel)==null?void 0:ie.getConfig())==null?void 0:ae.capabilities.playback)??!1,m=null;e.volumeKeysRow.hidden=!n.volumeKeysCapability;function u(d){t.classList.remove("theme-dark","theme-amoled"),d.themeName==="amoled"?t.classList.add("theme-amoled"):d.isDark&&t.classList.add("theme-dark")}function h(){return i[l]}function y(){const d=h().fontFamily;for(const C of Array.from(e.fontFamilyPills.children)){const Q=ot.find(oe=>oe.id===C.dataset.value);C.setAttribute("aria-checked",String((Q==null?void 0:Q.value)===d))}}function w(){const d=jr(h().themeName,h().isDark);for(const C of Array.from(e.themeSwatches.children))C.setAttribute("aria-checked",String(C.dataset.value===d.id))}function p(d,C){for(const Q of Array.from(d.children))Q.setAttribute("aria-checked",String(Q.dataset.value===C))}function L(){e.playbackEmpty.hidden=b,e.playbackControls.hidden=!b}function M(){const d=h().useBookLayout;for(const C of Array.from(e.fontFamilyPills.children))C.disabled=d;e.paragraphSpacingInput.disabled=d,e.lineHeightInput.disabled=d,e.justifyToggle.disabled=d,e.hyphenateToggle.disabled=d}function P(){const d=h();e.fontSizeInput.value=String(d.fontSize),e.fontSizeInput.setAttribute("aria-valuetext",`${d.fontSize}px`),e.fontSizeValue.textContent=`${d.fontSize}px`,e.paragraphSpacingInput.value=String(d.paragraphSpacing),e.paragraphSpacingValue.textContent=`${d.paragraphSpacing}em`,y(),p(e.flowPills,d.flow),p(e.columnsPills,String(d.maxColumnCount)),e.marginTopInput.value=String(d.marginTop),e.marginTopInput.setAttribute("aria-valuetext",`${d.marginTop}px`),e.marginTopValue.textContent=`${d.marginTop}px`,e.marginBottomInput.value=String(d.marginBottom),e.marginBottomInput.setAttribute("aria-valuetext",`${d.marginBottom}px`),e.marginBottomValue.textContent=`${d.marginBottom}px`,e.marginLeftInput.value=String(d.marginLeft),e.marginLeftInput.setAttribute("aria-valuetext",`${d.marginLeft}px`),e.marginLeftValue.textContent=`${d.marginLeft}px`,e.marginRightInput.value=String(d.marginRight),e.marginRightInput.setAttribute("aria-valuetext",`${d.marginRight}px`),e.marginRightValue.textContent=`${d.marginRight}px`,e.linkSideMarginsToggle.setAttribute("aria-pressed",String(d.linkSideMargins)),e.lineHeightInput.value=String(d.lineHeight),e.lineHeightValue.textContent=d.lineHeight.toFixed(2),e.justifyToggle.setAttribute("aria-pressed",String(d.justify)),e.hyphenateToggle.setAttribute("aria-pressed",String(d.hyphenate)),e.useBookLayoutToggle.setAttribute("aria-pressed",String(d.useBookLayout)),M(),w(),L(),e.scopeGlobalBtn.setAttribute("aria-checked",String(l==="global")),e.scopeBookBtn.setAttribute("aria-checked",String(l==="book"))}function S(d){var C;i[l]={...i[l],...d},P(),r.applyStyles(i[l]),u(i[l]),(C=n.hostChannel)==null||C.emitIntent({type:"settingsChange",scope:l,settings:i[l]})}function E(){S({fontSize:Number(e.fontSizeInput.value)})}e.fontSizeInput.addEventListener("change",E);function N(){S({paragraphSpacing:Number(e.paragraphSpacingInput.value)})}e.paragraphSpacingInput.addEventListener("change",N);for(const d of ot){const C=document.createElement("button");C.type="button",C.className="rx-settings-pill",C.setAttribute("role","radio"),C.setAttribute("aria-checked","false"),C.setAttribute("data-value",d.id),C.textContent=d.label,C.addEventListener("click",()=>S({fontFamily:d.value})),e.fontFamilyPills.appendChild(C)}function H(d){const C=d.currentTarget.dataset.value;S({flow:C})}for(const d of Array.from(e.flowPills.children))d.addEventListener("click",H);function I(d){const C=Number(d.currentTarget.dataset.value);S({maxColumnCount:C})}for(const d of Array.from(e.columnsPills.children))d.addEventListener("click",I);function V(){S({marginTop:Number(e.marginTopInput.value)})}e.marginTopInput.addEventListener("change",V);function R(){S({marginBottom:Number(e.marginBottomInput.value)})}e.marginBottomInput.addEventListener("change",R);function G(){const d=Number(e.marginLeftInput.value);h().linkSideMargins?S({marginLeft:d,marginRight:d}):S({marginLeft:d})}e.marginLeftInput.addEventListener("change",G);function F(){const d=Number(e.marginRightInput.value);h().linkSideMargins?S({marginLeft:d,marginRight:d}):S({marginRight:d})}e.marginRightInput.addEventListener("change",F);function $(){S({linkSideMargins:!h().linkSideMargins})}e.linkSideMarginsToggle.addEventListener("click",$);function K(){S({lineHeight:Number(e.lineHeightInput.value)})}e.lineHeightInput.addEventListener("change",K);function x(){S({justify:!h().justify})}e.justifyToggle.addEventListener("click",x);function A(){S({hyphenate:!h().hyphenate})}e.hyphenateToggle.addEventListener("click",A);function O(){S({useBookLayout:!h().useBookLayout})}e.useBookLayoutToggle.addEventListener("click",O);for(const d of Ne){const C=document.createElement("button");C.type="button",C.className="rx-settings-swatch",C.setAttribute("role","radio"),C.setAttribute("aria-checked","false"),C.setAttribute("aria-label",d.label),C.setAttribute("data-value",d.id);const Q=document.createElement("span");Q.className="rx-settings-swatch-dot",Q.style.background=d.swatchBg;const oe=document.createElement("span");oe.textContent=d.label,C.append(Q,oe),C.addEventListener("click",()=>S({themeName:d.themeName,isDark:d.isDark})),e.themeSwatches.appendChild(C)}let k=!0;function z(){k=!k,e.swipeToggle.setAttribute("aria-pressed",String(k)),r.setSwipe(k)}e.swipeToggle.addEventListener("click",z),e.swipeToggle.setAttribute("aria-pressed",String(k));let _="standard";function T(d){_=d.currentTarget.dataset.value??"standard",p(e.tapZonePills,_)}for(const d of Array.from(e.tapZonePills.children))d.addEventListener("click",T);p(e.tapZonePills,_);let W=!1;function U(){W=!W,e.volumeKeysToggle.setAttribute("aria-pressed",String(W))}e.volumeKeysToggle.addEventListener("click",U);function X(){var C;const d=Number(e.narrationSpeedInput.value);e.narrationSpeedValue.textContent=`${d.toFixed(1)}x`,(C=n.hostChannel)==null||C.emitIntent({type:"playback",action:"rateChange",positionSec:null,rate:d})}e.narrationSpeedInput.addEventListener("input",()=>{e.narrationSpeedValue.textContent=`${Number(e.narrationSpeedInput.value).toFixed(1)}x`}),e.narrationSpeedInput.addEventListener("change",X);function te(){e.skipForwardValue.textContent=`${e.skipForwardInput.value}s`}e.skipForwardInput.addEventListener("input",te),e.narrationSpeedInput.value="1",e.narrationSpeedValue.textContent="1.0x",e.skipForwardInput.value="30",e.skipForwardValue.textContent="30s";function re(d){d!==c&&(e.tabButtons[c].setAttribute("aria-selected","false"),e.panels[c].hidden=!0,c=d,e.tabButtons[c].setAttribute("aria-selected","true"),e.panels[c].hidden=!1)}for(const d of Jr)e.tabButtons[d].addEventListener("click",()=>re(d));re("typography"),e.tabButtons.typography.setAttribute("aria-selected","true"),e.panels.typography.hidden=!1;function Y(d){d!==l&&(l=d,P(),r.applyStyles(i[l]),u(i[l]))}e.scopeGlobalBtn.addEventListener("click",()=>Y("global")),e.scopeBookBtn.addEventListener("click",()=>Y("book"));const ne=(ue=n.hostChannel)==null?void 0:ue.onCommand(d=>{d.type==="setSettingsScope"?(i[d.scope]=d.settings,d.scope===l&&(P(),r.applyStyles(i[l]),u(i[l]))):d.type==="configure"&&(b=d.capabilities.playback,L())});function Z(){var d;o||(o=!0,m=s.activeElement??null,t.classList.add("settings-open"),e.scrim.classList.add("visible"),a.activate(),e.root.focus({preventScroll:!0}),(d=n.onOpenChange)==null||d.call(n,!0))}function se(){var d,C;o&&(o=!1,t.classList.remove("settings-open"),e.scrim.classList.remove("visible"),a.deactivate(),(d=m==null?void 0:m.focus)==null||d.call(m),m=null,(C=n.onOpenChange)==null||C.call(n,!1))}function de(){o?se():Z()}e.closeBtn.addEventListener("click",se),e.scrim.addEventListener("click",se),P();function he(){g||(g=!0,ne==null||ne(),a.deactivate(),t.classList.remove("settings-open"),e.root.remove(),e.scrim.remove())}return{open:Z,close:se,toggle:de,isOpen:()=>o,getActiveSettings:()=>h(),getActiveScope:()=>l,destroy:he}}const tn={top:0,right:0,bottom:0,left:0};function lt(t,r){t.style.setProperty("--rx-inset-top",`${Math.max(0,r.top)}px`),t.style.setProperty("--rx-inset-right",`${Math.max(0,r.right)}px`),t.style.setProperty("--rx-inset-bottom",`${Math.max(0,r.bottom)}px`),t.style.setProperty("--rx-inset-left",`${Math.max(0,r.left)}px`)}const rn=280,ct="reactor-shell-stylesheet";function nn(t){if(t.getElementById(ct))return;const r=t.createElement("style");r.id=ct,r.textContent=At,t.head.appendChild(r)}function an(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function sn(){const t=new Set;return{getChromeState:()=>({barsVisible:!1,sidebar:"none"}),onChromeState:r=>(t.add(r),()=>t.delete(r)),setBarsVisible:()=>{},refreshSizeClass:()=>{},destroy:()=>{t.clear()}}}function cn(t,r,n={}){var Pe,He,Oe,Re,Fe,$e,_e,De,Ge,We;if((n.chrome??"reactor")==="host")return sn();const e=t.ownerDocument??document;nn(e);const a=Lt(t),i=a.root;let l=!1,c=!1,o="none",g=!1,b=!1,m=null;const u=new Set;function h(){var q;if(b)return;const v={barsVisible:c,sidebar:o};for(const ke of u)ke(v);(q=n.hostChannel)==null||q.emitIntent({type:"chromeState",barsVisible:c,sidebar:o})}function y(v){c!==v&&(c=v,i.classList.toggle("ui-visible",c),Z==null||Z.setChromeVisible(c),h())}function w(){y(!c)}const p=er(i,v=>r.goTo(v),{eink:n.eink,onBack:()=>{var v;return(v=n.hostChannel)==null?void 0:v.emitIntent({type:"back"})},onSidebarChange:v=>{o=v?"left":"none",a.contentsBtn.setAttribute("aria-pressed",String(v)),h(),P()}});function L(){return i.classList.contains("size-desktop")}function M(){if(p.isOpen()){p.close();return}L()||Y.close(),B.close(),p.open()}a.contentsBtn.addEventListener("click",M);function P(){const v=i.classList.contains("size-desktop");ce(i,{left:v&&p.isOpen()?rn:0})}function S(){i.classList.toggle("reduced-motion",N||an())}function E(){i.classList.toggle("e-ink",N)}let N=((He=(Pe=n.hostChannel)==null?void 0:Pe.getConfig())==null?void 0:He.eink)??!!n.eink;E(),S(),lt(i,((Re=(Oe=n.hostChannel)==null?void 0:Oe.getConfig())==null?void 0:Re.insets)??tn);const H=(Fe=n.hostChannel)==null?void 0:Fe.onCommand(v=>{v.type==="configure"&&(N=v.eink,E(),S(),lt(i,v.insets))});function I(){const v=t.clientWidth||i.clientWidth,q=Ce(v);i.classList.remove("size-phone","size-fold-tablet","size-desktop"),i.classList.add(`size-${q}`),P()}I();function V(){I(),Y.refreshLayout()}const R=typeof ResizeObserver=="function"?new ResizeObserver(()=>V()):null;R==null||R.observe(t);const G=()=>V();R||window.addEventListener("resize",G);const F=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,$=()=>S();($e=F==null?void 0:F.addEventListener)==null||$e.call(F,"change",$);function K(v,q){const ke=Nt(v,l);ke==="prev"?r.prev():ke==="next"?r.next():w()}function x(v){v==="prev"?r.prev():v==="next"?r.next():w()}function A(v,q){q.key!=="Enter"&&q.key!==" "||(q.preventDefault(),x(v))}const O=()=>x(l?"next":"prev"),k=()=>x(l?"prev":"next"),z=()=>x("toggle"),_=v=>A(l?"next":"prev",v),T=v=>A(l?"prev":"next",v),W=v=>A("toggle",v);a.zoneLeft.addEventListener("click",O),a.zoneRight.addEventListener("click",k),a.zoneCentre.addEventListener("click",z),a.zoneLeft.addEventListener("keydown",_),a.zoneRight.addEventListener("keydown",T),a.zoneCentre.addEventListener("keydown",W);function U(){return B.isOpen()?(B.close(),!0):f!=null&&f.isOpen()?(f.close(),!0):ee.isOpen()?(ee.close(),!0):Y.isOpen()?(ne(),!0):p.isOpen()?(p.close(),!0):c?(y(!1),!0):!1}function X(v){const q=Mt(v);q&&(Pt(q)&&v.preventDefault(),q==="next"?r.next():q==="prev"?r.prev():q==="toggleBars"?w():q==="escape"&&U())}e.addEventListener("keydown",X);const te=()=>r.historyBack(),re=()=>r.historyForward();a.historyBackBtn.addEventListener("click",te),a.historyForwardBtn.addEventListener("click",re);const Y=Ir(i,r,{getSizeClass:()=>Ce(t.clientWidth||i.clientWidth),onWidthChange:n.onContextWidthChange,hostChannel:n.hostChannel,onClose:()=>{o="none",a.contextBtn.setAttribute("aria-pressed","false"),h()}});function ne(){o==="right"?(Y.close(),o="none"):(L()||p.close(),B.close(),Y.open(),o="right"),a.contextBtn.setAttribute("aria-pressed",String(o==="right")),h()}a.contextBtn.addEventListener("click",ne);const Z=n.hostChannel?Fr(i,r,n.hostChannel,{eink:n.eink}):null;let se=new Set;function de(){a.bookmarkBtn.setAttribute("aria-pressed",String(!!m&&se.has(m)))}function he(){!n.hostChannel||!m||n.hostChannel.emitIntent({type:"bookmarkToggle",cfi:m})}const ie=(_e=n.hostChannel)==null?void 0:_e.onCommand(v=>{v.type==="setBookmarks"&&(se=new Set(v.items.map(q=>q.cfi)),de())});a.bookmarkBtn.addEventListener("click",he);let ae=!1;function ue(v){ae||(ae=!0,a.narrationBtn.hidden=!v)}let d=!1;function C(){a.narrationBtn.setAttribute("aria-pressed",String(d))}function Q(){var v;(v=n.hostChannel)==null||v.emitIntent({type:"playback",action:d?"stop":"play",positionSec:null,rate:null})}const oe=(De=n.hostChannel)==null?void 0:De.onCommand(v=>{v.type==="configure"?ue(v.capabilities.playback):v.type==="setPlaybackState"&&(d=v.active!==!1,C())}),fe=(Ge=n.hostChannel)==null?void 0:Ge.getConfig();fe&&ue(fe.capabilities.playback),a.narrationBtn.addEventListener("click",Q);const f=n.hostChannel?Wr({shellRoot:i,core:r,hostChannel:n.hostChannel,options:{eink:n.eink}}):null,B=en(i,r,{getSizeClass:()=>Ce(t.clientWidth||i.clientWidth),eink:n.eink,hostChannel:n.hostChannel,volumeKeysCapability:n.volumeKeysCapability,onOpenChange:v=>{a.settingsBtn.setAttribute("aria-pressed",String(v))}});function j(){if(B.isOpen()){B.close();return}p.close(),Y.close(),o="none",a.contentsBtn.setAttribute("aria-pressed","false"),a.contextBtn.setAttribute("aria-pressed","false"),h(),B.open()}a.settingsBtn.addEventListener("click",j);const ee=Lr(i,r,{onOpenInGlossary:v=>{Y.openGlossaryTerm(v),o="right",a.contextBtn.setAttribute("aria-pressed","true"),h()}}),J=(We=n.hostChannel)==null?void 0:We.onCommand(v=>{var q;v.type==="dismiss"&&!U()&&((q=n.hostChannel)==null||q.emitIntent({type:"back"}))}),ze=()=>{g=!0},Ie=()=>{g=!1,r.goToFraction(Number(a.scrubber.value)/1e3)};a.scrubber.addEventListener("pointerdown",ze),a.scrubber.addEventListener("change",Ie);function Me(v){switch(v.type){case"loaded":l=v.isRtl,i.classList.toggle("is-rtl",l),p.setToc(v.toc),P();break;case"relocate":m=v.cfi??null,a.chapterLabel&&a.chapterLabel.textContent!==(v.chapterTitle??"")&&(a.chapterLabel.textContent=v.chapterTitle??""),!g&&typeof v.fraction=="number"&&(a.scrubber.value=String(Math.round(v.fraction*1e3))),p.setCurrentChapterTitle(v.chapterTitle),de();break;case"history":a.historyBackBtn.disabled=!v.canGoBack,a.historyForwardBtn.disabled=!v.canGoForward;break;case"tap":K(v.x,v.y);break}}const vt=r.on(Me);r.replayLastEvents(Me),h();function yt(){I()}function kt(){var v;b||(b=!0,vt(),R==null||R.disconnect(),R||window.removeEventListener("resize",G),(v=F==null?void 0:F.removeEventListener)==null||v.call(F,"change",$),e.removeEventListener("keydown",X),a.zoneLeft.removeEventListener("click",O),a.zoneRight.removeEventListener("click",k),a.zoneCentre.removeEventListener("click",z),a.zoneLeft.removeEventListener("keydown",_),a.zoneRight.removeEventListener("keydown",T),a.zoneCentre.removeEventListener("keydown",W),a.historyBackBtn.removeEventListener("click",te),a.historyForwardBtn.removeEventListener("click",re),a.contextBtn.removeEventListener("click",ne),a.bookmarkBtn.removeEventListener("click",he),a.narrationBtn.removeEventListener("click",Q),oe==null||oe(),ie==null||ie(),J==null||J(),H==null||H(),f==null||f.destroy(),Y.destroy(),Z==null||Z.destroy(),a.settingsBtn.removeEventListener("click",j),B.destroy(),ee.destroy(),a.scrubber.removeEventListener("pointerdown",ze),a.scrubber.removeEventListener("change",Ie),a.contentsBtn.removeEventListener("click",M),p.destroy(),u.clear(),i.classList.remove("reader-shell","ui-visible","e-ink","reduced-motion","is-rtl","size-phone","size-fold-tablet","size-desktop","settings-open"),a.zones.remove(),a.topBar.remove(),a.bottomBar.remove())}return{getChromeState:()=>({barsVisible:c,sidebar:o}),onChromeState:v=>(u.add(v),()=>u.delete(v)),setBarsVisible:y,refreshSizeClass:yt,destroy:kt}}export{Ve as ZONE_FRACTION,Ce as computeSizeClass,Pt as isPreventableKey,Fr as mountPlaybackBar,Ir as mountRightSidebar,en as mountSettingsPanel,cn as mountShell,Mt as resolveKeyboardAction,Nt as resolveTapZone};
