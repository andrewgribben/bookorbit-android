var zt=Object.defineProperty;var It=(t,r,n)=>r in t?zt(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;var q=(t,r,n)=>It(t,typeof r!="symbol"?r+"":r,n);import{A as Pt,D as Ue}from"./index-OJPrAk8D.js";const Mt={menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',bookmark:'<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',panel_right:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',back:'<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',forward:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',skip_back:'<polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/>',skip_forward:'<polygon points="13 19 22 12 13 5 13 19"/><polygon points="2 19 11 12 2 5 2 19"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-6a9 9 0 0 1 18 0v6a1 1 0 0 1-1 1h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',sleep:'<path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/>'};function Ce(t){return`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${Mt[t]}</svg>`}function we(t,r,n=!1){const o=document.createElement("button");return o.type="button",o.className="rx-icon-btn",o.setAttribute("aria-label",t),o.innerHTML=Ce(r),n&&o.setAttribute("aria-pressed","false"),o}function Ft(t){t.classList.add("reader-shell");const r=document.createElement("div");r.className="rx-zones";const n=document.createElement("div");n.className="rx-zone rx-zone-left",n.setAttribute("role","button"),n.setAttribute("tabindex","0"),n.setAttribute("aria-label","Previous page");const o=document.createElement("div");o.className="rx-zone rx-zone-centre",o.setAttribute("role","button"),o.setAttribute("tabindex","0"),o.setAttribute("aria-label","Toggle bars");const e=document.createElement("div");e.className="rx-zone rx-zone-right",e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label","Next page"),r.append(n,o,e);const a=document.createElement("div");a.className="rx-bar rx-bar-top",a.setAttribute("role","toolbar");const i=we("Table of contents","menu",!0),c=we("Bookmark","bookmark",!0),d=we("Toggle narration","headphones",!0);d.hidden=!0;const s=we("Text settings","settings",!0),m=we("Open context panel","panel_right",!0),h=document.createElement("div");h.className="rx-bar-spacer",a.append(i,c,h,d,s,m);const v=document.createElement("div");v.className="rx-bar rx-bar-bottom";const u=document.createElement("div");u.className="rx-status-row",u.setAttribute("aria-live","polite");const b=we("Back","back");b.disabled=!0;const y=document.createElement("span");y.className="rx-chapter-label";const f=we("Forward","forward");f.disabled=!0,u.append(b,y,f);const p=document.createElement("input");return p.type="range",p.className="rx-scrubber",p.min="0",p.max="1000",p.step="1",p.value="0",p.setAttribute("aria-label","Reading position"),v.append(u,p),t.append(r,a,v),{root:t,zones:r,zoneLeft:n,zoneCentre:o,zoneRight:e,topBar:a,bottomBar:v,contentsBtn:i,bookmarkBtn:c,narrationBtn:d,settingsBtn:s,contextBtn:m,historyBackBtn:b,historyForwardBtn:f,chapterLabel:y,scrubber:p}}const Ht=`
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
`,Ot=599,Rt=1200;function Ye(t){return t<=Ot?"phone":t<=Rt?"fold-tablet":"desktop"}const nt=.3;function $t(t,r){const n=Math.min(1,Math.max(0,t));return n<nt?r?"next":"prev":n>1-nt?r?"prev":"next":"toggle"}const _t=new Set(["ArrowRight","ArrowDown","PageDown"," "]),Dt=new Set(["ArrowLeft","ArrowUp","PageUp"]);function Gt(t){return t.ctrlKey||t.metaKey||t.altKey?null:_t.has(t.key)?"next":Dt.has(t.key)?"prev":t.key==="m"||t.key==="M"?"toggleBars":t.key==="Escape"?"escape":null}function Kt(t){return t==="next"||t==="prev"}const Vt='<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',Wt='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function at(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-icon-btn",n.setAttribute("aria-label",t),n.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,n}function qt(t){const r=document.createElement("div");r.className="rx-left-sidebar",r.setAttribute("aria-label","Table of contents"),r.tabIndex=-1;const n=document.createElement("div");n.className="rx-left-sidebar-scrim";const o=document.createElement("div");o.className="rx-sidebar-head";const e=at("Back",Vt),a=document.createElement("h3");a.className="rx-sidebar-title",a.textContent="Contents";const i=at("Close contents",Wt);i.classList.add("rx-left-sidebar-close"),o.append(e,a,i);const c=document.createElement("div");c.className="rx-left-sidebar-tabs",c.setAttribute("role","tablist");function d(F,T){const S=document.createElement("button");return S.type="button",S.className="rx-left-sidebar-tab",S.setAttribute("role","tab"),S.setAttribute("aria-selected","false"),S.setAttribute("data-tab",T),S.id=`rx-tab-${T}`,S.textContent=F,S}const s=d("Contents","contents"),m=d("Starred","starred"),h=d("Related","related");c.append(s,m,h);const v=document.createElement("div");v.className="rx-left-sidebar-body";function u(F){const T=document.createElement("div");return T.className="rx-sidebar-panel",T.setAttribute("role","tabpanel"),T.setAttribute("data-panel",F),T.setAttribute("aria-labelledby",`rx-tab-${F}`),T.hidden=!0,T}const b=u("contents"),y=document.createElement("div");y.className="rx-toc-scroll";const f=document.createElement("div");f.className="rx-toc-spacer";const p=document.createElement("div");p.className="rx-toc-window",p.setAttribute("role","list"),f.appendChild(p),y.appendChild(f),b.appendChild(y);const C=u("starred"),A=u("related");return v.append(b,C,A),r.append(o,c,v),t.append(n,r),{root:r,scrim:n,backBtn:e,closeBtn:i,title:a,tablist:c,tabContents:s,tabStarred:m,tabRelated:h,body:v,panelContents:b,tocScroll:y,tocSpacer:f,tocWindow:p,panelStarred:C,panelRelated:A}}const Ut=`
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
`;function wt(t,r=null,n=0){const o=[];for(let e=0;e<t.length;e++){const a=t[e],i=r===null?String(e):`${r}.${e}`;o.push({id:i,label:a.label,href:a.href,depth:n,hasChildren:a.subitems.length>0,parentId:r}),a.subitems.length>0&&o.push(...wt(a.subitems,i,n+1))}return o}function Yt(t,r){if(r.size===0)return t;const n=new Set,o=[];for(const e of t){if(e.parentId!==null&&(n.has(e.parentId)||r.has(e.parentId))){n.add(e.id);continue}o.push(e)}return o}function jt(t,r){if(!r)return null;const n=ot(r);let o=null;for(const e of t)if(e.href){if(e.href===r)return e.id;o===null&&ot(e.href)===n&&(o=e)}return(o==null?void 0:o.id)??null}function Zt(t,r){if(!r)return null;for(const n of t)if(n.label===r)return n.id;return null}function ot(t){const r=t.indexOf("#");return r===-1?t:t.slice(0,r)}function Xt(t,r,n,o,e=8){if(o===0||r<=0)return{start:0,end:-1};const a=Math.floor(t/r),i=Math.ceil(n/r),c=Math.max(0,a-e),d=Math.min(o-1,a+i+e);return{start:c,end:d}}const je=48;function Jt(t,r,n,o){const e=document.createElement("div");if(e.className="rx-toc-row",e.setAttribute("role","listitem"),e.style.paddingLeft=`${12+t.depth*18}px`,o&&e.classList.add("is-current"),t.hasChildren){const d=document.createElement("button");d.type="button",d.className="rx-toc-toggle";const s=!r.collapsed.has(t.id);d.setAttribute("aria-expanded",String(s)),d.setAttribute("aria-label",`${s?"Collapse":"Expand"} ${t.label}`),d.textContent=s?"▾":"▸",d.addEventListener("click",m=>{m.stopPropagation(),n.onToggleExpand(t)}),e.appendChild(d)}else{const d=document.createElement("span");d.className="rx-toc-toggle-spacer",e.appendChild(d)}const a=document.createElement("button");a.type="button",a.className="rx-toc-label",a.setAttribute("aria-label",t.label),o&&a.setAttribute("aria-current","true"),a.textContent=t.label,a.addEventListener("click",()=>n.onActivate(t)),e.appendChild(a);const i=document.createElement("button");i.type="button",i.className="rx-toc-star";const c=t.href?r.starred.has(t.href):!1;return i.setAttribute("aria-pressed",String(c)),i.setAttribute("aria-label",`${c?"Unstar":"Star"} ${t.label}`),i.textContent=c?"★":"☆",i.addEventListener("click",d=>{d.stopPropagation(),n.onToggleStar(t)}),e.appendChild(i),e}function Qt(t,r,n,o,e){const a=Yt(o.flat,o.collapsed),i=jt(a,o.currentHref)??Zt(a,o.currentChapterTitle);r.style.height=`${a.length*je}px`;const c=t.clientHeight||1,{start:d,end:s}=Xt(t.scrollTop,je,c,a.length);n.replaceChildren(),n.style.transform=`translateY(${d*je}px)`;for(let m=d;m<=s;m++){const h=a[m];h&&n.appendChild(Jt(h,o,e,h.id===i))}}function er(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No starred chapters yet. Star a chapter in Contents to find it here.",t.appendChild(e);return}const o=document.createElement("div");o.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-starred-row",a.setAttribute("role","listitem"),a.textContent=e.label,a.addEventListener("click",()=>n(e)),o.appendChild(a)}t.appendChild(o)}function tr(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No related books yet.",t.appendChild(e);return}const o=document.createElement("div");o.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-related-row",a.setAttribute("role","listitem");const i=`${e.title}${e.subtitle?`, ${e.subtitle}`:""}${e.read?", read":""}`;if(a.setAttribute("aria-label",i),e.coverUrl){const s=document.createElement("img");s.className="rx-related-cover",s.src=e.coverUrl,s.alt="",a.appendChild(s)}else{const s=document.createElement("div");s.className="rx-related-cover rx-related-cover-empty",a.appendChild(s)}const c=document.createElement("div");c.className="rx-related-text";const d=document.createElement("span");if(d.className="rx-related-title",d.textContent=e.title,c.appendChild(d),e.subtitle){const s=document.createElement("span");s.className="rx-related-subtitle",s.textContent=e.subtitle,c.appendChild(s)}if(a.appendChild(c),e.read){const s=document.createElement("span");s.className="rx-related-badge",s.textContent="Read",a.appendChild(s)}a.addEventListener("click",()=>n(e)),o.appendChild(a)}t.appendChild(o)}function Et(t,r){return Ct(t,r,1)}function St(t,r){return Ct(t,r,-1)}function Ct(t,r,n){if(t.length===0)return r;const o=t.indexOf(r);if(o===-1)return t[0];const e=(o+n+t.length)%t.length;return t[e]}function rr(t,r){return Et(t,r)}function nr(t,r){return St(t,r)}const ar=40;function or(t,r){return Math.abs(t)>=ar&&Math.abs(t)>Math.abs(r)}function Lt(t,r,n,o){return or(r,n)?t==="sidebar"?{action:r<0?"cycle-next":"cycle-prev"}:t==="book"&&o?{action:"close"}:{action:null}:{action:null}}function At(t,r,n){return t&&r.contains(t)?"sidebar":t&&n.contains(t)&&!r.contains(t)?"book":"other"}function Tt(t,r){let n=0,o=0,e=0,a=0,i=null,c=!1,d=!1;function s(p,C,A,F){n=e=p,o=a=C,i=A,c=!0,d=F}function m(){c&&(c=!1,r.onSwipe(e-n,a-o,i),i=null)}function h(p){p.pointerType!=="pen"&&s(p.clientX,p.clientY,p.target,p.pointerType==="touch")}function v(p){c&&(e=p.clientX,a=p.clientY)}function u(p){e=p.clientX,a=p.clientY,m()}function b(){d||m()}function y(p){if(!c)return;const C=p.touches[0];C&&(e=C.clientX,a=C.clientY)}function f(){m()}return t.addEventListener("pointerdown",h),t.addEventListener("pointermove",v),t.addEventListener("pointerup",u),t.addEventListener("pointercancel",b),t.addEventListener("touchmove",y,{passive:!0}),t.addEventListener("touchend",f,{passive:!0}),{destroy(){t.removeEventListener("pointerdown",h),t.removeEventListener("pointermove",v),t.removeEventListener("pointerup",u),t.removeEventListener("pointercancel",b),t.removeEventListener("touchmove",y),t.removeEventListener("touchend",f)}}}function sr(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function ir(t){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const e=sr(t);if(e.length===0){o.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],c=t.ownerDocument.activeElement;o.shiftKey&&c===a?(o.preventDefault(),i.focus()):!o.shiftKey&&c===i&&(o.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const st="reactor-left-sidebar-stylesheet";function lr(t){if(t.getElementById(st))return;const r=t.createElement("style");r.id=st,r.textContent=Ut,t.head.appendChild(r)}function cr(t,r,n={}){var I,O;const o=t.ownerDocument??document;lr(o);const e=qt(t);e.root.classList.add("closed");const a=["contents","starred"];(I=n.capabilities)!=null&&I.related&&a.push("related"),e.tabRelated.hidden=!((O=n.capabilities)!=null&&O.related);let i="contents",c=!1,d=!1,s=[];const m=new Set;let h=null,v=null;const u=new Set,b=new Map;let y=[];const f=ir(e.root);let p=null;function C(){return!t.classList.contains("size-desktop")}function A(w){return w==="contents"?e.panelContents:w==="starred"?e.panelStarred:e.panelRelated}function F(w){return w==="contents"?e.tabContents:w==="starred"?e.tabStarred:e.tabRelated}function T(){if(i==="contents")Qt(e.tocScroll,e.tocSpacer,e.tocWindow,{flat:s,collapsed:m,currentHref:h,currentChapterTitle:v,starred:u},{onActivate:w=>{w.href&&r(w.href),C()&&M()},onToggleExpand:w=>{m.has(w.id)?m.delete(w.id):m.add(w.id),T()},onToggleStar:w=>{var j;if(!w.href)return;const B=!u.has(w.href);B?(u.add(w.href),b.set(w.href,w.label)):(u.delete(w.href),b.delete(w.href)),(j=n.onStarToggle)==null||j.call(n,w.href,w.label,B),T()}});else if(i==="starred"){const w=Array.from(b,([B,j])=>({href:B,label:j}));er(e.panelStarred,w,B=>{r(B.href),C()&&M()})}else tr(e.panelRelated,y,w=>{var B;(B=n.onOpenRelated)==null||B.call(n,w.id),C()&&M()})}function S(w){w!==i&&(F(i).setAttribute("aria-selected","false"),A(i).hidden=!0,i=w,F(i).setAttribute("aria-selected","true"),A(i).hidden=!1,T())}function z(w){const B=w===1?rr(a,i):nr(a,i);S(B)}e.tabContents.addEventListener("click",()=>S("contents")),e.tabStarred.addEventListener("click",()=>S("starred")),e.tabRelated.addEventListener("click",()=>S("related")),S("contents"),F("contents").setAttribute("aria-selected","true"),A("contents").hidden=!1;function H(){var B;if(c)return;c=!0,p=o.activeElement??null,e.root.classList.add("open"),e.root.classList.remove("closed"),t.classList.add("rx-left-sidebar-open"),e.scrim.classList.toggle("visible",C());const w=C();e.root.setAttribute("role",w?"dialog":"complementary"),w?e.root.setAttribute("aria-modal","true"):e.root.removeAttribute("aria-modal"),w&&(f.activate(),e.root.focus()),(B=n.onSidebarChange)==null||B.call(n,!0)}function M(){var w,B;c&&(c=!1,e.root.classList.remove("open"),e.root.classList.add("closed"),t.classList.remove("rx-left-sidebar-open"),e.scrim.classList.remove("visible"),f.deactivate(),(w=p==null?void 0:p.focus)==null||w.call(p),p=null,(B=n.onSidebarChange)==null||B.call(n,!1))}e.closeBtn.addEventListener("click",M),e.scrim.addEventListener("click",M),e.backBtn.addEventListener("click",()=>{var w;return(w=n.onBack)==null?void 0:w.call(n)});const $=Tt(t,{onSwipe:(w,B,j)=>{const ne=At(j,e.root,t),Q=Lt(ne,w,B,C());!c&&Q.action!==null||(Q.action==="cycle-next"?z(1):Q.action==="cycle-prev"?z(-1):Q.action==="close"&&M())}});function N(w){s=wt(w),m.clear(),i==="contents"&&T()}function U(w){b.clear(),u.clear();for(const B of w)u.add(B.href),b.set(B.href,B.label);(i==="starred"||i==="contents")&&T()}function _(w){y=w,i==="related"&&T()}function D(w){h=w,i==="contents"&&T()}function R(w){v=w,i==="contents"&&T()}function g(){d||(d=!0,$.destroy(),e.closeBtn.removeEventListener("click",M),e.scrim.removeEventListener("click",M),f.deactivate(),t.classList.remove("rx-left-sidebar-open"),e.root.remove(),e.scrim.remove())}return{open:H,close:M,isOpen:()=>c,cycleTab:z,getActiveTab:()=>i,setToc:N,setStarred:U,setRelated:_,setCurrentHref:D,setCurrentChapterTitle:R,destroy:g}}function Ze(t,r,n){const o=document.createElement("button");return o.type="button",o.className="rx-sidebar-tab",o.textContent=t,o.setAttribute("role","tab"),o.setAttribute("aria-selected",String(r)),o.dataset.tab=n,r&&o.classList.add("active"),o}function dr(t){const r=t.createElement("div");r.className="rx-right-sidebar",r.setAttribute("role","complementary"),r.setAttribute("aria-label","Context panel");const n=t.createElement("div");n.className="rx-sidebar-resize",n.setAttribute("role","separator"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-label","Resize context panel"),n.setAttribute("tabindex","0");const o=t.createElement("div");o.className="rx-sidebar-tabs";const e=t.createElement("div");e.className="rx-sidebar-tablist",e.setAttribute("role","tablist");const a=Ze("Context",!0,"context"),i=Ze("Glossary",!1,"glossary"),c=Ze("Notes",!1,"notes");c.disabled=!0;const d=t.createElement("button");d.type="button",d.className="rx-icon-btn rx-sidebar-close",d.setAttribute("aria-label","Close panel"),d.textContent="✕",e.append(a,i,c),o.append(e,d);const s=t.createElement("div");s.className="rx-ctx-searchbar",s.setAttribute("role","search");const m=t.createElement("input");m.type="search",m.className="rx-ctx-search-input",m.placeholder="Search this book",m.setAttribute("aria-label","Search this book");const h=t.createElement("button");h.type="button",h.className="rx-icon-btn rx-ctx-openmain",h.setAttribute("aria-label","Open in main window"),h.disabled=!0,h.textContent="↗";const v=t.createElement("div");v.className="rx-ctx-crumbs",v.setAttribute("aria-live","polite"),s.append(m,h,v);const u=t.createElement("div");u.className="rx-sidebar-body";const b=t.createElement("div");b.className="rx-ctx-results";const y=t.createElement("div");y.className="rx-ctx-page",y.hidden=!0;const f=t.createElement("div");f.className="rx-notes-body",f.hidden=!0;const p=t.createElement("div");return p.className="rx-glossary-panel-mount",p.hidden=!0,u.append(b,y,f,p),r.append(n,o,s,u),{root:r,resizeHandle:n,tabsRow:o,contextTabBtn:a,glossaryTabBtn:i,notesTabBtn:c,closeBtn:d,searchBar:s,searchInput:m,openInMainBtn:h,breadcrumb:v,body:u,resultsScroller:b,contextPage:y,notesBody:f,glossaryPanelMount:p}}const ur=`
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
`;class pr{constructor(){q(this,"rows",[]);q(this,"headerAt",new Map)}reset(){this.rows=[],this.headerAt.clear()}addGroup(r,n){if(n.length!==0){this.headerAt.has(r)||(this.headerAt.set(r,this.rows.length),this.rows.push({kind:"header",label:r}));for(const o of n)this.rows.push({kind:"item",item:o,groupLabel:r})}}get rowCount(){return this.rows.length}rowAt(r){return this.rows[r]}get isEmpty(){return this.rows.length===0}}class Bt{constructor(r){q(this,"container");q(this,"rowHeight");q(this,"buffer");q(this,"opts");q(this,"topSpacer");q(this,"bottomSpacer");q(this,"rowsEl");q(this,"onScroll");q(this,"destroyed",!1);this.opts=r,this.container=r.container,this.rowHeight=r.rowHeight,this.buffer=r.buffer??6,this.topSpacer=document.createElement("div"),this.topSpacer.className="rx-wlist-spacer",this.bottomSpacer=document.createElement("div"),this.bottomSpacer.className="rx-wlist-spacer",this.rowsEl=document.createElement("div"),this.rowsEl.className="rx-wlist-rows",this.rowsEl.setAttribute("role","list"),this.container.replaceChildren(this.topSpacer,this.rowsEl,this.bottomSpacer),this.onScroll=()=>this.render(),this.container.addEventListener("scroll",this.onScroll)}visibleRange(){const r=this.opts.rowCount(),n=this.container.clientHeight||1,o=this.container.scrollTop||0,e=Math.max(0,Math.floor(o/this.rowHeight)-this.buffer),a=Math.ceil(n/this.rowHeight)+this.buffer*2,i=Math.min(r,e+a);return{first:e,last:i}}render(){if(this.destroyed)return;const r=this.opts.rowCount(),{first:n,last:o}=this.visibleRange();this.topSpacer.style.height=`${n*this.rowHeight}px`,this.bottomSpacer.style.height=`${Math.max(0,r-o)*this.rowHeight}px`,this.rowsEl.replaceChildren();for(let e=n;e<o;e++)this.rowsEl.appendChild(this.opts.renderRow(e))}destroy(){this.destroyed||(this.destroyed=!0,this.container.removeEventListener("scroll",this.onScroll),this.container.replaceChildren())}}function hr(t,r){return t.kind!==r.kind?!1:t.kind==="page"&&r.kind==="page"?t.target===r.target:!0}class br{constructor(){q(this,"stack",[{kind:"blank"}]);q(this,"index",0)}get current(){return this.stack[this.index]??{kind:"blank"}}get canGoBack(){return this.index>0}get canGoForward(){return this.index<this.stack.length-1}push(r){hr(this.current,r)||(this.stack=this.stack.slice(0,this.index+1),this.stack.push(r),this.index=this.stack.length-1)}back(){return this.canGoBack?(this.index-=1,this.current):null}forward(){return this.canGoForward?(this.index+=1,this.current):null}reset(){this.stack=[{kind:"blank"}],this.index=0}}const fr={"fold-tablet":320,desktop:340},We=240,it=16,xr={"fold-tablet":.6,desktop:.7};function gr(t,r,n){const o=xr[n],e=Math.max(We,r*o);return t<We?We:t>e?e:t}const Nt=new WeakMap;function Xe(t){return Nt.get(t)??{left:0,right:0,bottom:0}}function pe(t,r){const n={left:Math.max(0,r.left??Xe(t).left),right:Math.max(0,r.right??Xe(t).right),bottom:Math.max(0,r.bottom??Xe(t).bottom)};return Nt.set(t,n),t.style.setProperty("--rx-book-inset-left",`${n.left}px`),t.style.setProperty("--rx-book-inset-right",`${n.right}px`),t.style.setProperty("--rx-book-inset-bottom",`${n.bottom}px`),t.style.paddingLeft=n.left?`${n.left}px`:"",t.style.paddingRight=n.right?`${n.right}px`:"",t.style.paddingBottom=n.bottom?`${n.bottom}px`:"",n}const mr=[{id:"all",label:"All"},{id:"highlight",label:"Highlight"},{id:"underline",label:"Underline"},{id:"note",label:"Typed note"},{id:"handwritten",label:"Handwritten"},{id:"bookmark",label:"Bookmark"}],vr=[{id:"position",label:"Position in book"},{id:"date",label:"Date"},{id:"colour",label:"Colour"},{id:"type",label:"Type"}];function yr(t){const r=t.createElement("div");r.className="rx-notes-panel";const n=t.createElement("div");n.className="rx-notes-searchbar",n.setAttribute("role","search");const o=t.createElement("input");o.type="search",o.className="rx-notes-search-input",o.placeholder="Search notes",o.setAttribute("aria-label","Search notes"),n.append(o);const e=t.createElement("select");e.className="rx-notes-sort",e.setAttribute("aria-label","Sort notes by");for(const{id:s,label:m}of vr){const h=t.createElement("option");h.value=s,h.textContent=m,e.append(h)}n.append(e);const a=t.createElement("div");a.className="rx-notes-filters",a.setAttribute("role","group"),a.setAttribute("aria-label","Filter notes by type");const i={};for(const{id:s,label:m}of mr){const h=t.createElement("button");h.type="button",h.className="rx-notes-chip",h.textContent=m,h.setAttribute("aria-pressed",String(s==="all")),s==="all"&&h.classList.add("active"),h.dataset.filter=s,a.append(h),i[s]=h}const c=t.createElement("div");c.className="rx-notes-banner",c.hidden=!0,c.textContent="No annotation store connected. Notes made in this session are not saved.";const d=t.createElement("div");return d.className="rx-notes-list",r.append(n,a,c,d),{root:r,searchBar:n,searchInput:o,filterRow:a,filterButtons:i,sortSelect:e,capabilityBanner:c,listScroller:d}}const kr=`
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
`,wr=100,Er=20;function Sr(t){return t==="all"?null:t}class Cr{constructor(r){q(this,"total",0);q(this,"offset",0);q(this,"items",[]);q(this,"state",{filter:"all",sort:"position",query:null});q(this,"lastRequestedOffset",null);q(this,"everRequested",!1);this.hostChannel=r}getState(){return this.state}setState(r){this.state={...this.state,...r},this.total=0,this.offset=0,this.items=[],this.lastRequestedOffset=null,this.requestPage(0)}ensureInitialLoad(){this.everRequested||this.requestPage(0)}rowCount(){return this.total}rowAt(r){const n=r-this.offset;if(!(n<0||n>=this.items.length))return this.items[n]}ensureLoaded(r,n){const o=Math.max(r,n-1);if(this.rowAt(r)&&this.rowAt(o))return;const e=Math.max(0,r-Er);this.lastRequestedOffset!==e&&this.requestPage(e)}requestPage(r){this.everRequested=!0,this.lastRequestedOffset=r,this.hostChannel.emitIntent({type:"notesPageRequest",offset:r,limit:wr,filter:Sr(this.state.filter),sort:this.state.sort,query:this.state.query})}applyWindow(r){this.total=r.total,this.offset=r.offset,this.items=r.items,this.lastRequestedOffset=null}}const lt="reactor-notes-stylesheet",Lr=48,Ar=200,ct={highlight:"Highlight",underline:"Underline",note:"Typed note",bookmark:"Bookmark"};function Tr(t,r){return r?`${ct[t]} · ${r}`:ct[t]}function Br({container:t,core:r,hostChannel:n,options:o={}}){const e=t.ownerDocument??document;if(!e.getElementById(lt)){const S=e.createElement("style");S.id=lt,S.textContent=kr,e.head.appendChild(S)}const a=yr(e);t.append(a.root);const i=new Cr(n);let c=!1,d=null;const s=new Map,m=new Set;function h(S){s.has(S)||m.has(S)||typeof r.getChapterTitleForCfi=="function"&&(m.add(S),r.getChapterTitleForCfi(S).then(z=>{s.set(S,z)}).catch(()=>{s.set(S,null)}).finally(()=>{m.delete(S),!c&&u.render()}))}function v(S){i.ensureLoaded(S,S+1);const z=i.rowAt(S);if(!z){const R=e.createElement("div");return R.className="rx-notes-loading-row",R.setAttribute("role","listitem"),R.textContent="Loading…",R}const H=e.createElement("button");H.type="button",H.className="rx-notes-row";const M=e.createElement("span");M.className="rx-notes-row-swatch",z.color&&M.style.setProperty("--rx-notes-row-color",z.color);const $=e.createElement("span");$.className="rx-notes-row-body";const N=e.createElement("span");N.className="rx-notes-row-snippet",N.textContent=z.note??z.text??"";const U=e.createElement("span");U.className="rx-notes-row-meta";const _=s.get(z.cfi);U.textContent=Tr(z.kind,_??null),$.append(N,U),H.append(M,$),H.setAttribute("aria-label",`${U.textContent}: ${N.textContent}`),_===void 0&&h(z.cfi),H.addEventListener("click",()=>r.goTo(z.cfi));const D=e.createElement("div");return D.setAttribute("role","listitem"),D.appendChild(H),D}const u=new Bt({container:a.listScroller,rowHeight:Lr,rowCount:()=>i.rowCount(),renderRow:v});function b(S){const z=S.currentTarget,H=z.dataset.filter??"all";for(const M of Object.values(a.filterButtons))M.classList.toggle("active",M===z),M.setAttribute("aria-pressed",String(M===z));i.setState({filter:H}),u.render()}for(const S of Object.values(a.filterButtons))S.addEventListener("click",b);function y(){i.setState({sort:a.sortSelect.value}),u.render()}a.sortSelect.addEventListener("change",y);function f(){d&&clearTimeout(d),d=setTimeout(()=>{i.setState({query:a.searchInput.value.trim()||null}),u.render()},Ar)}a.searchInput.addEventListener("input",f);function p(S){S.type==="setNotes"&&(i.applyWindow(S),u.render())}const C=n.onCommand(p);function A(){var S;a.capabilityBanner.hidden=((S=n.getConfig())==null?void 0:S.capabilities.notes)!==!1,i.ensureInitialLoad(),u.render()}function F(){u.render()}function T(){if(!c){c=!0,d&&clearTimeout(d),C();for(const S of Object.values(a.filterButtons))S.removeEventListener("click",b);a.sortSelect.removeEventListener("change",y),a.searchInput.removeEventListener("input",f),u.destroy(),a.root.remove()}}return{onActivate:A,refresh:F,destroy:T}}function Nr(t){const r=t.createElement("div");r.className="rx-glossary-panel",r.style.position="absolute",r.style.inset="0";const n=t.createElement("div");n.className="rx-glossary-search",n.setAttribute("role","search");const o=t.createElement("input");o.type="search",o.className="rx-glossary-search-input",o.placeholder="Search glossary",o.setAttribute("aria-label","Search glossary"),n.appendChild(o);const e=t.createElement("div");return e.className="rx-glossary-list",e.setAttribute("role","list"),r.append(n,e),{root:r,searchInput:o,list:e}}const zr=900;function Ir(t){const r=t.ownerDocument??document,n=Nr(r);t.appendChild(n.root);let o=[],e="",a=!1;function i(){const v=e.trim().toLowerCase();return[...v?o.filter(b=>b.term.toLowerCase().includes(v)):o].sort((b,y)=>b.term.localeCompare(y.term))}function c(){if(a)return;const v=i();if(n.list.replaceChildren(),!o.length){n.list.removeAttribute("role");const u=r.createElement("div");u.className="rx-glossary-empty",u.textContent="This book has no glossary.",n.list.appendChild(u);return}if(!v.length){n.list.removeAttribute("role");const u=r.createElement("div");u.className="rx-glossary-empty",u.textContent=`No terms match "${e}".`,n.list.appendChild(u);return}n.list.setAttribute("role","list");for(const u of v){let b=function(){const C=y.classList.toggle("expanded");f.setAttribute("aria-expanded",String(C))};const y=r.createElement("div");y.className="rx-glossary-item",y.setAttribute("role","listitem"),y.setAttribute("data-term",u.term);const f=r.createElement("button");f.type="button",f.className="rx-glossary-term-row",f.setAttribute("role","button"),f.setAttribute("aria-expanded","false"),f.textContent=u.term;const p=r.createElement("div");p.className="rx-glossary-def",p.textContent=u.definition,f.addEventListener("click",b),y.append(f,p),n.list.appendChild(y)}}function d(){e=n.searchInput.value,c()}n.searchInput.addEventListener("input",d),c();function s(v){o=v,c()}function m(v){var b,y;e&&(e="",n.searchInput.value="",c());const u=n.list.querySelector(`.rx-glossary-item[data-term="${CSS.escape(v)}"]`);u&&(u.classList.add("expanded"),(b=u.querySelector(".rx-glossary-term-row"))==null||b.setAttribute("aria-expanded","true"),(y=u.scrollIntoView)==null||y.call(u,{block:"center"}),u.classList.add("flash"),setTimeout(()=>u.classList.remove("flash"),zr))}function h(){a||(a=!0,n.searchInput.removeEventListener("input",d),n.root.remove())}return{setTerms:s,scrollToAndFlash:m,destroy:h}}const dt=9,He=8,ut=16;function Pr(t,r,n,o){const e=t.top+t.height;let a=t.left;a=Math.min(Math.max(He,a),Math.max(He,r.width-n-He));let i=e+dt,c=!1;if(i+o>r.height-He){const s=t.top-o-dt;i=Math.max(He,s),c=!0}const d=Math.max(ut,Math.min(n-ut,t.left+t.width/2-a));return{left:a,top:i,above:c,arrowX:d}}const Mr='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';function Fr(t,r,n){const o=t.ownerDocument??document;let e=null,a=!1;function i(){var u;const v=!!e;e==null||e.remove(),e=null,v&&((u=t.querySelector("iframe"))==null||u.focus())}function c(v,u){var A;i();const b=o.createElement("div");b.className="rx-glossary-popover",b.setAttribute("role","dialog"),b.setAttribute("aria-label",`${v.term} definition`),b.innerHTML=`
      <div class="rx-glossary-popover-head">
        <h4 class="rx-glossary-popover-term"></h4>
        <button type="button" class="rx-icon-btn rx-glossary-popover-open" aria-label="Open in glossary" title="Open in glossary">${Mr}</button>
      </div>
      <p class="rx-glossary-popover-def"></p>
    `,b.querySelector(".rx-glossary-popover-term").textContent=v.term,b.querySelector(".rx-glossary-popover-def").textContent=v.definition,t.appendChild(b),e=b;const y=t.getBoundingClientRect(),f={left:u.left-y.left,top:u.top-y.top,width:u.width,height:u.height},p={width:y.width,height:y.height},C=Pr(f,p,b.offsetWidth,b.offsetHeight||120);b.style.left=`${C.left}px`,b.style.top=`${C.top}px`,b.classList.toggle("above",C.above),b.style.setProperty("--arrow-x",`${C.arrowX}px`),b.querySelector(".rx-glossary-popover-open").addEventListener("click",F=>{F.stopPropagation(),i(),n.onOpenInGlossary(v.term)}),(A=b.querySelector(".rx-glossary-popover-open"))==null||A.focus()}async function d(v,u){const b=await r.getGlossaryTerms();if(a)return;const y=b.find(f=>f.term.toLowerCase()===v.toLowerCase());y&&c(y,u)}const s=r.onGlossaryTermTap(d);function m(v){var b;if(!e)return;const u=v.target;(b=u==null?void 0:u.closest)!=null&&b.call(u,".rx-glossary-popover")||i()}o.addEventListener("click",m);function h(){a||(a=!0,s(),o.removeEventListener("click",m),i())}return{isOpen:()=>e!==null,close:i,destroy:h}}const Hr=`
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
`,pt="reactor-right-sidebar-stylesheet",ht="reactor-glossary-stylesheet",Or=48,Rr=200;function $r(t){if(!t.getElementById(pt)){const r=t.createElement("style");r.id=pt,r.textContent=ur,t.head.appendChild(r)}if(!t.getElementById(ht)){const r=t.createElement("style");r.id=ht,r.textContent=Hr,t.head.appendChild(r)}}function _r(t){const r=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`${r(t.pre)}<mark>${r(t.match)}</mark>${r(t.post)}`}function Dr(t,r,n){var fe,xe;const o=t.ownerDocument??document;$r(o);const e=dr(o),a=o.createElement("div");a.className="rx-sidebar-scrim",t.append(a,e.root);const i=new pr,c=new br,d=Ir(e.glossaryPanelMount);let s="context",m=null,h=!1,v=!1,u=null;const b=!!n.hostChannel&&((fe=n.hostChannel.getConfig())==null?void 0:fe.capabilities.notes)!==!1;e.notesTabBtn.disabled=!b;const y=b?Br({container:e.notesBody,core:r,hostChannel:n.hostChannel}):null;((xe=n.capabilities)==null?void 0:xe.glossary)===!1&&(e.glossaryTabBtn.hidden=!0);const f=["context"];e.glossaryTabBtn.hidden!==!0&&f.push("glossary"),b&&f.push("notes");function p(){return n.getSizeClass()==="phone"}function C(k){const P=k===1?Et(f,s):St(f,s);A(P)}function A(k){k!==s&&(s=k,e.contextTabBtn.classList.toggle("active",k==="context"),e.contextTabBtn.setAttribute("aria-selected",String(k==="context")),e.glossaryTabBtn.classList.toggle("active",k==="glossary"),e.glossaryTabBtn.setAttribute("aria-selected",String(k==="glossary")),e.notesTabBtn.classList.toggle("active",k==="notes"),e.notesTabBtn.setAttribute("aria-selected",String(k==="notes")),e.searchBar.hidden=k!=="context",e.glossaryPanelMount.hidden=k!=="glossary",e.notesBody.hidden=k!=="notes",k==="context"?D(c.current):k==="glossary"?(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,r.getGlossaryTerms().then(P=>d.setTerms(P))):(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,y==null||y.onActivate()))}const F=()=>A("context"),T=()=>A("glossary"),S=()=>A("notes");e.contextTabBtn.addEventListener("click",F),e.glossaryTabBtn.addEventListener("click",T),e.notesTabBtn.addEventListener("click",S);function z(k){const P=i.rowAt(k);if(!P)return o.createElement("div");if(P.kind==="header"){const Z=o.createElement("div");return Z.className="rx-ctx-group-header",Z.setAttribute("role","listitem"),Z.textContent=P.label,Z}const K=o.createElement("button");K.type="button",K.className="rx-ctx-result",K.setAttribute("role","listitem"),K.innerHTML=_r(P.item),K.addEventListener("click",()=>I(P.item,P.groupLabel));const W=o.createElement("div");return W.setAttribute("role","listitem"),W.appendChild(K),W}const H=new Bt({container:e.resultsScroller,rowHeight:Or,rowCount:()=>i.rowCount,renderRow:z});function M(){e.breadcrumb.replaceChildren();const k=o.createElement("button");k.type="button",k.textContent="Back",k.disabled=!c.canGoBack,k.setAttribute("aria-label","Back"),k.addEventListener("click",R);const P=o.createElement("button");P.type="button",P.textContent="Forward",P.disabled=!c.canGoForward,P.setAttribute("aria-label","Forward"),P.addEventListener("click",g),e.breadcrumb.append(k,P),e.openInMainBtn.disabled=c.current.kind!=="page"}function $(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,H.render()}function N(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,H.render()}function U(){return m||(m=r.createSecondaryView(e.contextPage),m)}function _(k){e.resultsScroller.hidden=!0,e.contextPage.hidden=!1;const P=U();P&&P.goTo(k)}function D(k){k.kind==="blank"?N():k.kind==="results"?$():_(k.target),M()}function R(){const k=c.back();k&&D(k)}function g(){const k=c.forward();k&&D(k)}function I(k,P){c.push({kind:"page",target:k.cfi,label:P}),D(c.current)}function O(){const k=e.searchInput.value.trim();i.reset(),k?c.current.kind!=="results"&&c.push({kind:"results"}):c.reset(),D(c.current),u&&clearTimeout(u),k&&(u=setTimeout(()=>r.runSearch(k),Rr))}e.searchInput.addEventListener("input",O);function w(k){k.type==="searchResults"?(i.addGroup(k.label,k.items),c.current.kind==="results"&&H.render()):k.type==="loaded"&&d.setTerms([])}const B=r.on(w);function j(){const k=c.current;k.kind==="page"&&(r.goTo(k.target),n.getSizeClass()==="phone"&&X())}e.openInMainBtn.addEventListener("click",j);function ne(){X()}e.closeBtn.addEventListener("click",ne);const Q=()=>X();a.addEventListener("click",Q);function L(){const k=getComputedStyle(t).getPropertyValue("--rx-ctx-width"),P=parseFloat(k);if(!Number.isNaN(P)&&P>0)return P;const K=n.getSizeClass();return K==="phone"?We:fr[K]}e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(L())));function G(k,P){var Z;const K=n.getSizeClass();if(K==="phone")return;const W=gr(k,t.clientWidth||1200,K);t.style.setProperty("--rx-ctx-width",`${W}px`),e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(W))),h&&pe(t,{right:W}),P&&((Z=n.onWidthChange)==null||Z.call(n,W))}let Y=!1,ae=0,ee=0;function oe(k){Y=!0,ae=k.clientX,ee=L(),t.classList.add("right-sidebar-resizing"),o.addEventListener("pointermove",J),o.addEventListener("pointerup",se)}function J(k){Y&&G(ee-(k.clientX-ae),!1)}function se(){Y&&(Y=!1,t.classList.remove("right-sidebar-resizing"),o.removeEventListener("pointermove",J),o.removeEventListener("pointerup",se),G(L(),!0))}function re(k){k.key==="ArrowLeft"?(k.preventDefault(),G(L()+it,!0)):k.key==="ArrowRight"&&(k.preventDefault(),G(L()-it,!0))}e.resizeHandle.addEventListener("pointerdown",oe),e.resizeHandle.addEventListener("keydown",re);const ue=Tt(t,{onSwipe:(k,P,K)=>{const W=At(K,e.root,t),Z=Lt(W,k,P,p());!h&&Z.action!==null||(Z.action==="cycle-next"?C(1):Z.action==="cycle-prev"?C(-1):Z.action==="close"&&X())}});function le(){h||(h=!0,t.classList.add("right-sidebar-open"),G(L(),!1),H.render(),s==="notes"&&(y==null||y.refresh()))}function X(){var k;h&&(h=!1,t.classList.remove("right-sidebar-open"),pe(t,{right:0}),(k=n.onClose)==null||k.call(n))}function ie(){h?X():le()}function ce(k){h||le(),A("glossary"),r.getGlossaryTerms().then(P=>{d.setTerms(P),d.scrollToAndFlash(k)})}function he(){h&&(n.getSizeClass()==="phone"?pe(t,{right:0}):pe(t,{right:L()}))}D(c.current);function be(){v||(v=!0,u&&clearTimeout(u),B(),e.searchInput.removeEventListener("input",O),e.openInMainBtn.removeEventListener("click",j),e.closeBtn.removeEventListener("click",ne),a.removeEventListener("click",Q),e.resizeHandle.removeEventListener("pointerdown",oe),o.removeEventListener("pointermove",J),o.removeEventListener("pointerup",se),e.resizeHandle.removeEventListener("keydown",re),ue.destroy(),e.contextTabBtn.removeEventListener("click",F),e.notesTabBtn.removeEventListener("click",S),y==null||y.destroy(),e.glossaryTabBtn.removeEventListener("click",T),d.destroy(),H.destroy(),m==null||m.destroy(),t.classList.remove("right-sidebar-open","right-sidebar-resizing"),pe(t,{right:0}),e.root.remove(),a.remove())}return{open:le,close:X,toggle:ie,isOpen:()=>h,destroy:be,refreshLayout:he,openGlossaryTerm:ce}}function Oe(t,r){const n=document.createElement("button");return n.type="button",n.className=r,n.setAttribute("aria-label",t),n}function Gr(t){const r=t.createElement("div");r.className="rx-playback-bar",r.setAttribute("role","group"),r.setAttribute("aria-label","Narration transport");const n=Oe("Skip back 15 seconds","rx-playback-icon-btn rx-playback-skip-back");n.innerHTML=Ce("skip_back");const o=Oe("Play","rx-playback-icon-btn rx-playback-play-pause");o.setAttribute("aria-pressed","false"),o.innerHTML=Ce("play");const e=Oe("Skip forward 15 seconds","rx-playback-icon-btn rx-playback-skip-forward");e.innerHTML=Ce("skip_forward");const a=Oe("Sleep timer","rx-playback-icon-btn rx-playback-sleep");a.setAttribute("aria-pressed","false"),a.innerHTML=Ce("sleep");const i=Oe("Playback speed","rx-playback-rate-btn");i.textContent="1x";const c=t.createElement("div");c.className="rx-playback-info";const d=t.createElement("span");d.className="rx-playback-chapter",d.setAttribute("aria-live","polite");const s=t.createElement("span");return s.className="rx-playback-position",s.textContent="0:00",c.append(d,s),r.append(n,o,e,a,c,i),{root:r,skipBackBtn:n,playPauseBtn:o,skipForwardBtn:e,sleepBtn:a,rateBtn:i,chapterLabel:d,positionLabel:s}}const Kr=`
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
`;class Vr{constructor(){q(this,"timeline",null);q(this,"activeAudioIndex",0)}setTimeline(r){this.timeline=r,this.activeAudioIndex=0}clear(){this.timeline=null,this.activeAudioIndex=0}hasTimeline(){return this.timeline!==null}itemFor(r){const n=this.timeline;if(!n)return null;const o=a=>a.beginSec<=r&&(a.endSec===null||r<a.endSec);let e=n.items.filter(a=>a.audioIndex===this.activeAudioIndex&&o(a));if(e.length===0){e=n.items.filter(o);const a=e[0];a&&(this.activeAudioIndex=a.audioIndex)}return e.length===0?null:e.reduce((a,i)=>i.beginSec>a.beginSec?i:a)}textHrefFor(r){var n;return((n=this.itemFor(r))==null?void 0:n.textHref)??null}}const bt="reactor-playback-stylesheet",Ke=15,$e=[.75,1,1.25,1.5,1.75,2];function Wr(t){if(t.getElementById(bt))return;const r=t.createElement("style");r.id=bt,r.textContent=Kr,t.head.appendChild(r)}function qr(t){const r=Number.isFinite(t)&&t>0?t:0,n=Math.floor(r),o=Math.floor(n/60),e=n%60;return`${o}:${String(e).padStart(2,"0")}`}function ft(t){return $e.reduce((r,n)=>Math.abs(n-t)<Math.abs(r-t)?n:r,$e[0]??1)}function Ur(t,r,n,o={}){const e=t.ownerDocument??document;Wr(e);let a=null,i=!1,c=!1,d=!1,s=!1,m=0,h=1,v=!1,u=!1,b=0,y=!1,f=!1,p=Ke,C=Ke,A="shell";const F=new Vr;function T(L,G=null,Y=null){n.emitIntent({type:"playback",action:L,positionSec:G,rate:Y})}const S=()=>T(s?"pause":"play"),z=()=>T("seek",Math.max(0,m-p)),H=()=>T("seek",m+C),M=()=>T("sleepTimer"),$=()=>{const L=$e.indexOf(ft(h)),G=$e[(L+1)%$e.length]??1;T("rateChange",null,G)};function N(){a&&(a.playPauseBtn.setAttribute("aria-pressed",String(s)),a.playPauseBtn.setAttribute("aria-label",s?"Pause":"Play"),a.playPauseBtn.innerHTML=Ce(s?"pause":"play"),a.sleepBtn.setAttribute("aria-pressed",String(f)),a.positionLabel.textContent=qr(m),a.rateBtn.textContent=`${ft(h)}x`,_())}function U(){if(!a)return;const L=a.root.classList.contains("rx-playback-chrome-hidden");pe(t,{bottom:L?0:a.root.offsetHeight||56})}function _(){a&&(a.root.classList.toggle("rx-playback-chrome-hidden",!v||!y&&!s),U())}function D(L){a&&a.chapterLabel.textContent!==(L??"")&&(a.chapterLabel.textContent=L??"")}function R(){i||c||(i=!0,a=Gr(e),a.root.classList.toggle("e-ink",!!o.eink),t.appendChild(a.root),a.playPauseBtn.addEventListener("click",S),a.skipBackBtn.addEventListener("click",z),a.skipForwardBtn.addEventListener("click",H),a.rateBtn.addEventListener("click",$),a.sleepBtn.addEventListener("click",M),N(),g())}function g(){!i||!u||A==="host"||(b+=1,r.narrationPrepare(b))}function I(){if(!i||!u||A==="host")return;const L=F.textHrefFor(m);L?r.narrationHighlight(L):r.narrationUnhighlight()}function O(L){switch(L.type){case"loaded":u=L.hasMediaOverlay,F.clear(),g();break;case"relocate":D(L.chapterTitle);break;case"narrationTimeline":L.generation===b&&(F.setTimeline(L),I());break;case"narrationTimelineError":L.generation===b&&F.clear();break}}const w=r.on(O);r.replayLastEvents(O);function B(L){if(L.type==="configure"){if(d)return;d=!0,A=L.narrationFollow??"shell",L.capabilities.playback&&R()}else if(L.type==="setPlaybackState"){if(!i)return;s=L.playing,m=L.positionSec,h=L.rate,v=L.active!==!1,f=L.sleepTimerActive===!0,p=L.skipBackSec??Ke,C=L.skipForwardSec??Ke,N(),I()}}const j=n.onCommand(B),ne=n.getConfig();ne&&B(ne);function Q(){c||(c=!0,w(),j(),a&&(a.playPauseBtn.removeEventListener("click",S),a.skipBackBtn.removeEventListener("click",z),a.skipForwardBtn.removeEventListener("click",H),a.rateBtn.removeEventListener("click",$),a.sleepBtn.removeEventListener("click",M),a.root.remove(),pe(t,{bottom:0})))}return{isVisible:()=>i,setChromeVisible:L=>{y=L,_()},destroy:Q}}const Je={highlight:"Highlight",underline:"Underline",strikethrough:"Strikethrough",squiggly:"Squiggly underline"};function Yr(t){const r=t.createElement("div");r.className="rx-anno-popover",r.setAttribute("role","dialog"),r.setAttribute("aria-label","Annotation"),r.hidden=!0;const n=t.createElement("div");n.className="rx-anno-status",n.setAttribute("aria-live","polite");const o=t.createElement("button");o.type="button",o.className="rx-icon-btn rx-anno-close",o.setAttribute("aria-label","Close"),o.textContent="✕";const e=t.createElement("div");e.className="rx-anno-header",e.append(n,o);const a=t.createElement("div");a.className="rx-anno-colors",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Colour");const i=Pt.map(f=>{const p=t.createElement("button");return p.type="button",p.className="rx-anno-swatch",p.style.setProperty("--rx-anno-swatch-color",f.value),p.setAttribute("role","radio"),p.setAttribute("aria-checked","false"),p.setAttribute("aria-label",f.label),p.dataset.color=f.value,a.append(p),p}),c=t.createElement("div");c.className="rx-anno-styles",c.setAttribute("role","group"),c.setAttribute("aria-label","Mark style");const d={};for(const f of Object.keys(Je)){const p=t.createElement("button");p.type="button",p.className=`rx-anno-style rx-anno-style-${f}`,p.textContent=Je[f],p.setAttribute("aria-label",Je[f]),p.dataset.style=f,c.append(p),d[f]=p}const s=t.createElement("button");s.type="button",s.className="rx-anno-note-toggle",s.textContent="Note",s.setAttribute("aria-expanded","false");const m=t.createElement("div");m.className="rx-anno-note-form",m.hidden=!0;const h=t.createElement("textarea");h.className="rx-anno-note-textarea",h.setAttribute("aria-label","Note text"),h.rows=3;const v=t.createElement("div");v.className="rx-anno-note-actions";const u=t.createElement("button");u.type="button",u.className="rx-anno-note-save",u.textContent="Save";const b=t.createElement("button");b.type="button",b.className="rx-anno-note-cancel",b.textContent="Cancel",v.append(b,u),m.append(h,v);const y=t.createElement("button");return y.type="button",y.className="rx-anno-delete",y.textContent="Delete",y.hidden=!0,r.append(e,a,c,s,m,y),{root:r,colorRow:a,colorButtons:i,styleRow:c,styleButtons:d,noteToggleBtn:s,noteForm:m,noteTextarea:h,noteSaveBtn:u,noteCancelBtn:b,deleteBtn:y,closeBtn:o,statusLabel:n}}const jr=`
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
`,xt="reactor-annotations-stylesheet";function Zr(t){return t==="underline"||t==="squiggly"?"underline":"highlight"}class Xr{constructor(r=500){q(this,"map",new Map);this.cap=r}get(r){return this.map.get(r)}addAll(r){for(const n of r)for(this.map.delete(n.cfi),this.map.set(n.cfi,n);this.map.size>this.cap;){const o=this.map.keys().next().value;if(o===void 0)break;this.map.delete(o)}}}function Jr({shellRoot:t,core:r,hostChannel:n,options:o={}}){const e=t.ownerDocument??document;if(!e.getElementById(xt)){const g=e.createElement("style");g.id=xt,g.textContent=jr,e.head.appendChild(g)}const a=Yr(e);t.append(a.root);const i=new Xr;let c=Ue,d=!1,s=null,m=null;function h(){s=null,m=null,a.root.hidden=!0,a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}function v(g){const I=t.getBoundingClientRect(),O=g?g.left-I.left:(t.clientWidth||300)/2-140,w=g?g.bottom-I.top+8:60,B=Math.max(0,(t.clientWidth||300)-288);a.root.style.left=`${Math.min(Math.max(0,O),B)}px`,a.root.style.top=`${Math.max(0,w)}px`}function u(g){c=g;for(const I of a.colorButtons)I.setAttribute("aria-checked",String(I.dataset.color===g))}function b(g){for(const[I,O]of Object.entries(a.styleButtons))O.setAttribute("aria-pressed",String(I===g))}function y(g,I,O){s={kind:"create",cfi:g,text:I},a.statusLabel.textContent="Add mark",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.noteTextarea.value="",u(c),b(null),a.root.hidden=!1,v(O)}function f(g,I){s={kind:"edit",note:g},a.statusLabel.textContent="Edit mark",a.deleteBtn.hidden=!1,a.noteForm.hidden=!0,a.noteTextarea.value=g.note??"",u(g.color??Ue),b(g.style??(g.kind==="underline"?"underline":"highlight")),a.root.hidden=!1,v(I)}function p(g,I){s=null,m=g,a.statusLabel.textContent="Loading…",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.root.hidden=!1,v(I),n.emitIntent({type:"notesPageRequest",offset:0,limit:1,filter:null,sort:null,query:`cfi:${g}`})}function C(g){if(g.type==="selection"&&g.cfi)y(g.cfi,g.text,g.rect);else if(g.type==="selectionCleared")(s==null?void 0:s.kind)==="create"&&h();else if(g.type==="annotationTap"){if(!g.cfi)return;const I=i.get(g.cfi);I?f(I,g.rect):p(g.cfi,g.rect)}}const A=r.on(C);function F(g){if(g.type==="setNotes"&&(i.addAll(g.items),m)){const I=g.items.find(O=>O.cfi===m);if(I){const O=a.root.hidden?null:{left:parseFloat(a.root.style.left||"0"),top:parseFloat(a.root.style.top||"0"),bottom:0};f(I,O)}else h()}}const T=n.onCommand(F);function S(g){(s==null?void 0:s.kind)==="create"&&(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:Zr(g),color:c,style:g,text:s.text,note:null}),r.clearSelection(),h())}function z(g){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:c,style:g,note:s.note.note}),h())}function H(g){const O=g.currentTarget.dataset.color??Ue;u(O),(s==null?void 0:s.kind)==="edit"&&n.emitIntent({type:"annotationUpdate",id:s.note.id,color:O,style:s.note.style,note:s.note.note})}for(const g of a.colorButtons)g.addEventListener("click",H);const M={highlight:()=>(s==null?void 0:s.kind)==="create"?S("highlight"):z("highlight"),underline:()=>(s==null?void 0:s.kind)==="create"?S("underline"):z("underline"),strikethrough:()=>(s==null?void 0:s.kind)==="create"?S("strikethrough"):z("strikethrough"),squiggly:()=>(s==null?void 0:s.kind)==="create"?S("squiggly"):z("squiggly")};for(const[g,I]of Object.entries(a.styleButtons))I.addEventListener("click",M[g]);function $(){const g=a.noteForm.hidden;a.noteForm.hidden=!g,a.noteToggleBtn.setAttribute("aria-expanded",String(g)),g&&a.noteTextarea.focus()}a.noteToggleBtn.addEventListener("click",$);function N(){a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}a.noteCancelBtn.addEventListener("click",N);function U(){const g=a.noteTextarea.value.trim()||null;(s==null?void 0:s.kind)==="create"?(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:"note",color:c,style:null,text:s.text,note:g}),r.clearSelection(),h()):(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:s.note.color,style:s.note.style,note:g}),h())}a.noteSaveBtn.addEventListener("click",U);function _(){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationDelete",id:s.note.id}),h())}a.deleteBtn.addEventListener("click",_);const D=()=>h();a.closeBtn.addEventListener("click",D);function R(){if(!d){d=!0,A(),T();for(const g of a.colorButtons)g.removeEventListener("click",H);for(const[g,I]of Object.entries(a.styleButtons))I.removeEventListener("click",M[g]);a.noteToggleBtn.removeEventListener("click",$),a.noteCancelBtn.removeEventListener("click",N),a.noteSaveBtn.removeEventListener("click",U),a.deleteBtn.removeEventListener("click",_),a.closeBtn.removeEventListener("click",D),a.root.remove()}}return{isOpen:()=>!a.root.hidden,close:h,destroy:R}}const Qr='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function en(t,r,n){const o=document.createElement("button");return o.type="button",o.className=n,o.setAttribute("aria-label",t),o.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,o}function Ee(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-toggle",n.setAttribute("aria-pressed","false"),n.setAttribute("data-setting",r),n.textContent=t,n}function Ve(t,r,n){const o=document.createElement("div");o.className=`rx-settings-pills ${n}`,o.setAttribute("role","radiogroup"),o.setAttribute("aria-label",t);for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-settings-pill",a.setAttribute("role","radio"),a.setAttribute("aria-checked","false"),a.setAttribute("data-value",e.id),a.textContent=e.label,o.appendChild(a)}return o}function de(t,r,n,o){const e=document.createElement("div");e.className="rx-settings-slider-row";const a=document.createElement("div");a.className="rx-settings-slider-label";const i=document.createElement("span");i.textContent=t;const c=document.createElement("span");c.className="rx-settings-slider-value",a.append(i,c);const d=document.createElement("input");return d.type="range",d.className="rx-settings-slider",d.min=String(r),d.max=String(n),d.step=String(o),d.setAttribute("aria-label",t),e.append(a,d),{row:e,input:d,value:c}}function tn(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-tab",n.setAttribute("role","tab"),n.setAttribute("aria-selected","false"),n.setAttribute("data-tab",t),n.id=`rx-settings-tab-${t}`,n.textContent=r,n}function Re(t){const r=document.createElement("div");return r.className="rx-settings-panel",r.setAttribute("role","tabpanel"),r.setAttribute("data-panel",t),r.setAttribute("aria-labelledby",`rx-settings-tab-${t}`),r.hidden=!0,r}function rn(t){const r=document.createElement("div");r.className="rx-settings-scrim";const n=document.createElement("div");n.className="rx-settings-sheet",n.setAttribute("role","dialog"),n.setAttribute("aria-label","Text settings"),n.tabIndex=-1;const o=document.createElement("div");o.className="rx-settings-head";const e=document.createElement("h3");e.className="rx-settings-title",e.textContent="Text settings";const a=en("Close settings",Qr,"rx-icon-btn rx-settings-close");o.append(e,a);const i=document.createElement("div");i.className="rx-settings-scope",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Settings scope");const c=document.createElement("button");c.type="button",c.className="rx-settings-scope-btn",c.setAttribute("role","radio"),c.setAttribute("aria-checked","true"),c.setAttribute("data-scope","global"),c.textContent="Global";const d=document.createElement("button");d.type="button",d.className="rx-settings-scope-btn",d.setAttribute("role","radio"),d.setAttribute("aria-checked","false"),d.setAttribute("data-scope","book"),d.textContent="This book",i.append(c,d);const s=document.createElement("div");s.className="rx-settings-scope-follow",s.hidden=!0;const m=Ee("","scopeFollow");m.classList.add("rx-settings-scope-follow-toggle");const h=document.createElement("p");h.className="rx-settings-scope-follow-banner",h.hidden=!0,s.append(m,h);const v=document.createElement("div");v.className="rx-settings-tabs",v.setAttribute("role","tablist");const u=[["typography","Typography"],["layout","Layout"],["theme","Theme"],["controls","Controls"],["playback","Playback"]],b={};for(const[ue,le]of u){const X=tn(ue,le);b[ue]=X,v.appendChild(X)}const y=document.createElement("div");y.className="rx-settings-body";const f=Re("typography"),p=de("Font size",13,28,1),C=de("Paragraph spacing",0,2,.1),A=Ve("Typeface",[],"rx-settings-font-pills");f.append(p.row,A,C.row);const F=Re("layout"),T=Ve("Reading mode",[{id:"paginated",label:"Paginated"},{id:"scrolled",label:"Scrolling"}],"rx-settings-flow-pills"),S=Ve("Columns",[{id:"1",label:"1 column"},{id:"2",label:"2 columns"}],"rx-settings-columns-pills"),z=document.createElement("div");z.className="rx-settings-margins-group";const H=document.createElement("div");H.className="rx-settings-margins-head";const M=document.createElement("span");M.className="rx-settings-margins-label",M.textContent="Margins";const $=Ee("Link left and right margins","linkSideMargins");$.classList.add("rx-settings-link-toggle"),H.append(M,$);const N=de("Top",0,96,4),U=de("Bottom",0,96,4),_=de("Left",0,96,4),D=de("Right",0,96,4);z.append(H,N.row,U.row,_.row,D.row);const R=de("Line spacing",1.2,1.95,.05),g=Ee("Justify text","justify"),I=Ee("Hyphenate","hyphenate"),O=Ee("Use book's own styling","useBookLayout");F.append(T,S,z,R.row,g,I,O);const w=Re("theme"),B=document.createElement("div");B.className="rx-settings-swatches",B.setAttribute("role","radiogroup"),B.setAttribute("aria-label","Theme"),w.append(B);const j=Re("controls"),ne=Ee("Swipe to turn pages","swipe"),Q=Ve("Tap zone preset",[],"rx-settings-tapzone-pills"),L=document.createElement("div");L.className="rx-settings-volumekeys",L.hidden=!0;const G=Ee("Volume keys turn pages","volumeKeys");L.append(G),j.append(ne,Q,L);const Y=Re("playback"),ae=document.createElement("p");ae.className="rx-settings-empty",ae.textContent="No narration provider for this book.";const ee=document.createElement("div");ee.className="rx-settings-playback-controls",ee.hidden=!0;const oe=de("Narration speed",.5,3,.1),J=de("Skip back (seconds)",5,60,5),se=de("Skip forward (seconds)",5,60,5);ee.append(oe.row,J.row,se.row),Y.append(ae,ee);const re=document.createElement("div");return re.className="rx-settings-actions-foot",re.hidden=!0,y.append(f,F,w,j,Y,re),n.append(o,i,s,v,y),t.append(r,n),{root:n,scrim:r,closeBtn:a,scopeGlobalBtn:c,scopeBookBtn:d,scopeFollowRow:s,scopeFollowToggle:m,scopeFollowBanner:h,tabsRow:v,tabButtons:b,panels:{typography:f,layout:F,theme:w,controls:j,playback:Y},fontSizeInput:p.input,fontSizeValue:p.value,paragraphSpacingInput:C.input,paragraphSpacingValue:C.value,fontFamilyPills:A,flowPills:T,columnsPills:S,linkSideMarginsToggle:$,marginTopInput:N.input,marginTopValue:N.value,marginBottomInput:U.input,marginBottomValue:U.value,marginLeftInput:_.input,marginLeftValue:_.value,marginRightInput:D.input,marginRightValue:D.value,lineHeightInput:R.input,lineHeightValue:R.value,justifyToggle:g,hyphenateToggle:I,useBookLayoutToggle:O,themeSwatches:B,swipeToggle:ne,tapZonePills:Q,volumeKeysRow:L,volumeKeysToggle:G,playbackEmpty:ae,playbackControls:ee,narrationSpeedInput:oe.input,narrationSpeedValue:oe.value,skipBackInput:J.input,skipBackValue:J.value,skipForwardInput:se.input,skipForwardValue:se.value,actionsFoot:re}}const nn=`
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
.rx-settings-slider:disabled,
.rx-settings-action-btn:disabled {
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

/* BO-53 #14: book-scope "follow Global" switch row, shown only on book scope when the host
   configures it. Reuses the existing .rx-settings-toggle look (48px target, aria-pressed). */
.rx-settings-scope-follow {
  display: flex;
  flex-direction: column;
  gap: var(--rx-space-1);
  flex: 0 0 auto;
  padding: 0 var(--rx-space-3) var(--rx-space-2);
}
.rx-settings-scope-follow[hidden] {
  display: none;
}
.rx-settings-scope-follow-banner {
  margin: 0;
  color: var(--rx-muted);
  font-size: 12px;
}
.rx-settings-scope-follow-banner[hidden] {
  display: none;
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

/* BO-53 #13: a quiet button stack at the foot of the body, separated from the active tab's
 * panel by the same divider weight as the tabs/body boundary above. */
.rx-settings-actions-foot {
  display: flex;
  flex-direction: column;
  gap: var(--rx-space-1);
  margin-top: var(--rx-space-2);
  padding-top: var(--rx-space-2);
  border-top: 1px solid var(--rx-border); /* taste-skill-ignore: section boundary, not decorative */
}
.rx-settings-actions-foot[hidden] {
  display: none;
}
.rx-settings-action-btn {
  min-height: 48px;
  border: none;
  background: none;
  color: var(--rx-muted);
  font-family: var(--rx-font-sans);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  padding: 0;
}
.rx-settings-action-btn:focus-visible {
  outline: 2px solid var(--rx-accent);
  outline-offset: 2px;
}
.rx-settings-action-btn[hidden] {
  display: none;
}
.rx-settings-action-btn--accent {
  color: var(--rx-accent);
  font-weight: 600;
}
`,gt={fontSize:16,lineHeight:1.5,fontFamily:null,paragraphSpacing:0,maxColumnCount:2,gap:.05,maxInlineSize:720,maxBlockSize:1440,justify:!0,hyphenate:!0,isDark:!1,themeName:"default",flow:"paginated",useBookLayout:!0,marginTop:40,marginBottom:40,marginLeft:40,marginRight:40,linkSideMargins:!0},Qe=[{id:"light",label:"Light",themeName:"default",isDark:!1,swatchBg:"#ffffff",swatchFg:"#000000"},{id:"sepia",label:"Sepia",themeName:"sepia",isDark:!1,swatchBg:"#f1e8d0",swatchFg:"#5b4636"},{id:"dark",label:"Dark",themeName:"default",isDark:!0,swatchBg:"#222222",swatchFg:"#e0e0e0"},{id:"amoled",label:"AMOLED",themeName:"amoled",isDark:!0,swatchBg:"#000000",swatchFg:"#ffffff"}];function an(t,r){return Qe.find(n=>n.themeName===t&&n.isDark===r)??Qe.find(n=>n.id===(r?"dark":"light"))}const mt=[{id:"publisher",label:"Publisher",value:null},{id:"serif",label:"Serif",value:'Georgia, "Iowan Old Style", "Times New Roman", serif'},{id:"sans",label:"Sans-serif",value:'-apple-system, "Segoe UI", Roboto, Arial, sans-serif'},{id:"mono",label:"Monospace",value:'"Courier New", monospace'}];function on(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function sn(t){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const e=on(t);if(e.length===0){o.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],c=t.ownerDocument.activeElement;o.shiftKey&&c===a?(o.preventDefault(),i.focus()):!o.shiftKey&&c===i&&(o.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const vt="reactor-settings-stylesheet",ln=["typography","layout","theme","controls","playback"];function cn(t){if(t.getElementById(vt))return;const r=t.createElement("style");r.id=vt,r.textContent=nn,t.head.appendChild(r)}function dn(t,r,n){var Ne,ze,Ie,Pe,Me,Fe,x,V,ye,et,tt,rt;const o=t.ownerDocument??document;cn(o);const e=rn(t),a=sn(e.root),i={global:{...gt},book:{...gt}};let c="global",d="typography",s=!1,m=!1,h=((ze=(Ne=n.hostChannel)==null?void 0:Ne.getConfig())==null?void 0:ze.capabilities.playback)??!1,v=null;const u=(Pe=(Ie=n.hostChannel)==null?void 0:Ie.getConfig())==null?void 0:Pe.scopeFollowSwitch;let b=!1;u&&(e.scopeFollowToggle.textContent=u.label);let y=n.volumeKeysCapability??((Fe=(Me=n.hostChannel)==null?void 0:Me.getConfig())==null?void 0:Fe.capabilities.volumeKeys)??!1;const f=(V=(x=n.hostChannel)==null?void 0:x.getConfig())==null?void 0:V.controlsState;e.volumeKeysRow.hidden=!y;function p(l){t.classList.remove("theme-dark","theme-amoled"),l.themeName==="amoled"?t.classList.add("theme-amoled"):l.isDark&&t.classList.add("theme-dark")}function C(){return i[c]}function A(){const l=C().fontFamily;for(const E of Array.from(e.fontFamilyPills.children)){const te=mt.find(ke=>ke.id===E.dataset.value);E.setAttribute("aria-checked",String((te==null?void 0:te.value)===l))}}function F(){const l=an(C().themeName,C().isDark);for(const E of Array.from(e.themeSwatches.children))E.setAttribute("aria-checked",String(E.dataset.value===l.id))}function T(l,E){for(const te of Array.from(l.children))te.setAttribute("aria-checked",String(te.dataset.value===E))}function S(){e.playbackEmpty.hidden=h,e.playbackControls.hidden=!h}function z(){const l=!!u&&c==="book";e.scopeFollowRow.hidden=!l,l&&(e.scopeFollowToggle.setAttribute("aria-pressed",String(b)),e.scopeFollowBanner.hidden=!b,u&&(e.scopeFollowBanner.textContent=u.bannerText))}function H(){const l=c==="book"&&b;for(const E of["typography","layout","theme"])for(const te of Array.from(e.panels[E].querySelectorAll("input, button")))te.disabled=l}function M(){const l=C().useBookLayout;for(const E of Array.from(e.fontFamilyPills.children))E.disabled=l;e.paragraphSpacingInput.disabled=l,e.lineHeightInput.disabled=l,e.justifyToggle.disabled=l,e.hyphenateToggle.disabled=l}function $(){const l=C();e.fontSizeInput.value=String(l.fontSize),e.fontSizeInput.setAttribute("aria-valuetext",`${l.fontSize}px`),e.fontSizeValue.textContent=`${l.fontSize}px`,e.paragraphSpacingInput.value=String(l.paragraphSpacing),e.paragraphSpacingValue.textContent=`${l.paragraphSpacing}em`,A(),T(e.flowPills,l.flow),T(e.columnsPills,String(l.maxColumnCount)),e.marginTopInput.value=String(l.marginTop),e.marginTopInput.setAttribute("aria-valuetext",`${l.marginTop}px`),e.marginTopValue.textContent=`${l.marginTop}px`,e.marginBottomInput.value=String(l.marginBottom),e.marginBottomInput.setAttribute("aria-valuetext",`${l.marginBottom}px`),e.marginBottomValue.textContent=`${l.marginBottom}px`,e.marginLeftInput.value=String(l.marginLeft),e.marginLeftInput.setAttribute("aria-valuetext",`${l.marginLeft}px`),e.marginLeftValue.textContent=`${l.marginLeft}px`,e.marginRightInput.value=String(l.marginRight),e.marginRightInput.setAttribute("aria-valuetext",`${l.marginRight}px`),e.marginRightValue.textContent=`${l.marginRight}px`,e.linkSideMarginsToggle.setAttribute("aria-pressed",String(l.linkSideMargins)),e.lineHeightInput.value=String(l.lineHeight),e.lineHeightValue.textContent=l.lineHeight.toFixed(2),e.justifyToggle.setAttribute("aria-pressed",String(l.justify)),e.hyphenateToggle.setAttribute("aria-pressed",String(l.hyphenate)),e.useBookLayoutToggle.setAttribute("aria-pressed",String(l.useBookLayout)),z(),H(),M(),F(),S(),e.scopeGlobalBtn.setAttribute("aria-checked",String(c==="global")),e.scopeBookBtn.setAttribute("aria-checked",String(c==="book"))}function N(l){var E;i[c]={...i[c],...l},$(),r.applyStyles(i[c]),p(i[c]),(E=n.hostChannel)==null||E.emitIntent({type:"settingsChange",scope:c,settings:i[c]})}function U(){N({fontSize:Number(e.fontSizeInput.value)})}e.fontSizeInput.addEventListener("change",U);function _(){N({paragraphSpacing:Number(e.paragraphSpacingInput.value)})}e.paragraphSpacingInput.addEventListener("change",_);for(const l of mt){const E=document.createElement("button");E.type="button",E.className="rx-settings-pill",E.setAttribute("role","radio"),E.setAttribute("aria-checked","false"),E.setAttribute("data-value",l.id),E.textContent=l.label,E.addEventListener("click",()=>N({fontFamily:l.value})),e.fontFamilyPills.appendChild(E)}function D(l){const E=l.currentTarget.dataset.value;N({flow:E})}for(const l of Array.from(e.flowPills.children))l.addEventListener("click",D);function R(l){const E=Number(l.currentTarget.dataset.value);N({maxColumnCount:E})}for(const l of Array.from(e.columnsPills.children))l.addEventListener("click",R);function g(){N({marginTop:Number(e.marginTopInput.value)})}e.marginTopInput.addEventListener("change",g);function I(){N({marginBottom:Number(e.marginBottomInput.value)})}e.marginBottomInput.addEventListener("change",I);function O(){const l=Number(e.marginLeftInput.value);C().linkSideMargins?N({marginLeft:l,marginRight:l}):N({marginLeft:l})}e.marginLeftInput.addEventListener("change",O);function w(){const l=Number(e.marginRightInput.value);C().linkSideMargins?N({marginLeft:l,marginRight:l}):N({marginRight:l})}e.marginRightInput.addEventListener("change",w);function B(){N({linkSideMargins:!C().linkSideMargins})}e.linkSideMarginsToggle.addEventListener("click",B);function j(){N({lineHeight:Number(e.lineHeightInput.value)})}e.lineHeightInput.addEventListener("change",j);function ne(){N({justify:!C().justify})}e.justifyToggle.addEventListener("click",ne);function Q(){N({hyphenate:!C().hyphenate})}e.hyphenateToggle.addEventListener("click",Q);function L(){N({useBookLayout:!C().useBookLayout})}e.useBookLayoutToggle.addEventListener("click",L);for(const l of Qe){const E=document.createElement("button");E.type="button",E.className="rx-settings-swatch",E.setAttribute("role","radio"),E.setAttribute("aria-checked","false"),E.setAttribute("aria-label",l.label),E.setAttribute("data-value",l.id);const te=document.createElement("span");te.className="rx-settings-swatch-dot",te.style.background=l.swatchBg;const ke=document.createElement("span");ke.textContent=l.label,E.append(te,ke),E.addEventListener("click",()=>N({themeName:l.themeName,isDark:l.isDark})),e.themeSwatches.appendChild(E)}let G=(f==null?void 0:f.swipeEnabled)??!0,Y=(f==null?void 0:f.volumeKeysEnabled)??!1;r.setSwipe(G);const ae=(f==null?void 0:f.tapZonePresets)??[];let ee=(f==null?void 0:f.tapZonePreset)??((ye=ae[0])==null?void 0:ye.id);e.tapZonePills.hidden=ae.length===0;for(const l of ae){const E=document.createElement("button");E.type="button",E.className="rx-settings-pill",E.setAttribute("role","radio"),E.setAttribute("aria-checked","false"),E.setAttribute("data-value",l.id),E.textContent=l.label,E.addEventListener("click",()=>se(l.id)),e.tapZonePills.appendChild(E)}ee&&T(e.tapZonePills,ee);function oe(){var l;(l=n.hostChannel)==null||l.emitIntent({type:"controlsChange",swipeEnabled:G,volumeKeysEnabled:Y,...ae.length>0?{tapZonePreset:ee}:{}})}function J(){G=!G,e.swipeToggle.setAttribute("aria-pressed",String(G)),r.setSwipe(G),oe()}e.swipeToggle.addEventListener("click",J),e.swipeToggle.setAttribute("aria-pressed",String(G));function se(l){ee=l,T(e.tapZonePills,ee),oe()}function re(){Y=!Y,e.volumeKeysToggle.setAttribute("aria-pressed",String(Y)),oe()}e.volumeKeysToggle.addEventListener("click",re),e.volumeKeysToggle.setAttribute("aria-pressed",String(Y));const ue=1,le=30;let X=ue,ie=le,ce=le;function he(){e.narrationSpeedInput.value=String(X),e.narrationSpeedValue.textContent=`${X.toFixed(1)}x`,e.skipBackInput.value=String(ie),e.skipBackValue.textContent=`${ie}s`,e.skipForwardInput.value=String(ce),e.skipForwardValue.textContent=`${ce}s`}function be(){var l;X=Number(e.narrationSpeedInput.value),e.narrationSpeedValue.textContent=`${X.toFixed(1)}x`,(l=n.hostChannel)==null||l.emitIntent({type:"playback",action:"rateChange",positionSec:null,rate:X})}e.narrationSpeedInput.addEventListener("input",()=>{e.narrationSpeedValue.textContent=`${Number(e.narrationSpeedInput.value).toFixed(1)}x`}),e.narrationSpeedInput.addEventListener("change",be);function fe(){var l;(l=n.hostChannel)==null||l.emitIntent({type:"playbackSkipChange",skipBackSec:ie,skipForwardSec:ce})}function xe(){e.skipBackValue.textContent=`${e.skipBackInput.value}s`}function k(){ie=Number(e.skipBackInput.value),e.skipBackValue.textContent=`${ie}s`,fe()}e.skipBackInput.addEventListener("input",xe),e.skipBackInput.addEventListener("change",k);function P(){e.skipForwardValue.textContent=`${e.skipForwardInput.value}s`}function K(){ce=Number(e.skipForwardInput.value),e.skipForwardValue.textContent=`${ce}s`,fe()}e.skipForwardInput.addEventListener("input",P),e.skipForwardInput.addEventListener("change",K),he();const W=((tt=(et=n.hostChannel)==null?void 0:et.getConfig())==null?void 0:tt.settingsActions)??[],Z=new Map,ge=new Map,me=new Map;for(const l of W){const E=document.createElement("button");E.type="button",E.className=l.styleHint==="accent"?"rx-settings-action-btn rx-settings-action-btn--accent":"rx-settings-action-btn",E.textContent=l.label,E.dataset.actionId=l.id,ge.set(l.id,l.enabled!==!1),me.set(l.id,l.disabledScopes??[]),E.addEventListener("click",()=>{var te;(te=n.hostChannel)==null||te.emitIntent({type:"settingsAction",actionId:l.id,scope:c})}),Z.set(l.id,E),e.actionsFoot.appendChild(E)}function Se(){for(const l of W){const E=Z.get(l.id);E.disabled=!ge.get(l.id)||me.get(l.id).includes(c)}}Se();function Le(){let l=!1;for(const E of W){const te=Z.get(E.id),ke=!E.tabs||E.tabs.includes(d);te.hidden=!ke,ke&&(l=!0)}e.actionsFoot.hidden=!l}Le();function Ae(l){l!==d&&(e.tabButtons[d].setAttribute("aria-selected","false"),e.panels[d].hidden=!0,d=l,e.tabButtons[d].setAttribute("aria-selected","true"),e.panels[d].hidden=!1,Le())}for(const l of ln)e.tabButtons[l].addEventListener("click",()=>Ae(l));Ae("typography"),e.tabButtons.typography.setAttribute("aria-selected","true"),e.panels.typography.hidden=!1;function _e(l){l!==c&&(c=l,$(),r.applyStyles(i[c]),p(i[c]),Se())}e.scopeGlobalBtn.addEventListener("click",()=>_e("global")),e.scopeBookBtn.addEventListener("click",()=>_e("book"));function qe(){var l;b=!b,$(),(l=n.hostChannel)==null||l.emitIntent({type:"scopeFollowChange",follows:b})}e.scopeFollowToggle.addEventListener("click",qe);const Te=(rt=n.hostChannel)==null?void 0:rt.onCommand(l=>{if(l.type==="setSettingsScope")i[l.scope]=l.settings,l.scope==="book"&&l.followsGlobal!==void 0&&(b=l.followsGlobal),l.scope===c&&($(),r.applyStyles(i[c]),p(i[c]));else if(l.type==="setPlaybackState")X=l.rate,l.skipBackSec!==void 0&&(ie=l.skipBackSec),l.skipForwardSec!==void 0&&(ce=l.skipForwardSec),he();else if(l.type==="configure"&&(h=l.capabilities.playback,S(),y=n.volumeKeysCapability??l.capabilities.volumeKeys??!1,e.volumeKeysRow.hidden=!y,l.controlsState&&(G=l.controlsState.swipeEnabled,Y=l.controlsState.volumeKeysEnabled,e.swipeToggle.setAttribute("aria-pressed",String(G)),e.volumeKeysToggle.setAttribute("aria-pressed",String(Y)),r.setSwipe(G)),l.settingsActions)){for(const E of l.settingsActions)Z.has(E.id)&&(ge.set(E.id,E.enabled!==!1),me.set(E.id,E.disabledScopes??[]));Se()}});function Be(){var l;s||(s=!0,v=o.activeElement??null,t.classList.add("settings-open"),e.scrim.classList.add("visible"),a.activate(),e.root.focus({preventScroll:!0}),(l=n.onOpenChange)==null||l.call(n,!0))}function ve(){var l,E;s&&(s=!1,t.classList.remove("settings-open"),e.scrim.classList.remove("visible"),a.deactivate(),(l=v==null?void 0:v.focus)==null||l.call(v),v=null,(E=n.onOpenChange)==null||E.call(n,!1))}function De(){s?ve():Be()}e.closeBtn.addEventListener("click",ve),e.scrim.addEventListener("click",ve),$();function Ge(){m||(m=!0,Te==null||Te(),a.deactivate(),t.classList.remove("settings-open"),e.root.remove(),e.scrim.remove())}return{open:Be,close:ve,toggle:De,isOpen:()=>s,getActiveSettings:()=>C(),getActiveScope:()=>c,destroy:Ge}}const un={top:0,right:0,bottom:0,left:0};function yt(t,r){t.style.setProperty("--rx-inset-top",`${Math.max(0,r.top)}px`),t.style.setProperty("--rx-inset-right",`${Math.max(0,r.right)}px`),t.style.setProperty("--rx-inset-bottom",`${Math.max(0,r.bottom)}px`),t.style.setProperty("--rx-inset-left",`${Math.max(0,r.left)}px`)}const pn=280,kt="reactor-shell-stylesheet";function hn(t){if(t.getElementById(kt))return;const r=t.createElement("style");r.id=kt,r.textContent=Ht,t.head.appendChild(r)}function bn(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function fn(){const t=new Set;return{getChromeState:()=>({barsVisible:!1,sidebar:"none"}),onChromeState:r=>(t.add(r),()=>t.delete(r)),setBarsVisible:()=>{},refreshSizeClass:()=>{},destroy:()=>{t.clear()}}}function mn(t,r,n={}){var Be,ve,De,Ge,Ne,ze,Ie,Pe,Me,Fe;if((n.chrome??"reactor")==="host")return fn();const e=t.ownerDocument??document;hn(e);const a=Ft(t),i=a.root;let c=!1,d=!1,s="none",m=!1,h=!1,v=null,u="shell",b=!1;const y=new Set;function f(){var V;if(h)return;const x={barsVisible:d,sidebar:s};for(const ye of y)ye(x);(V=n.hostChannel)==null||V.emitIntent({type:"chromeState",barsVisible:d,sidebar:s})}function p(x){d!==x&&(d=x,i.classList.toggle("ui-visible",d),re==null||re.setChromeVisible(d),f())}function C(){p(!d)}const A=cr(i,x=>r.goTo(x),{eink:n.eink,onBack:()=>{var x;return(x=n.hostChannel)==null?void 0:x.emitIntent({type:"back"})},onSidebarChange:x=>{s=x?"left":"none",a.contentsBtn.setAttribute("aria-pressed",String(x)),f(),S()}});function F(){return i.classList.contains("size-desktop")}function T(){if(A.isOpen()){A.close();return}F()||J.close(),W.close(),A.open()}a.contentsBtn.addEventListener("click",T);function S(){const x=i.classList.contains("size-desktop");pe(i,{left:x&&A.isOpen()?pn:0})}function z(){i.classList.toggle("reduced-motion",M||bn())}function H(){i.classList.toggle("e-ink",M)}let M=((ve=(Be=n.hostChannel)==null?void 0:Be.getConfig())==null?void 0:ve.eink)??!!n.eink;H(),z(),yt(i,((Ge=(De=n.hostChannel)==null?void 0:De.getConfig())==null?void 0:Ge.insets)??un);const $=(Ne=n.hostChannel)==null?void 0:Ne.onCommand(x=>{if(x.type==="toggleBars"){C();return}x.type==="configure"&&(M=x.eink,H(),z(),yt(i,x.insets),b||(b=!0,u=x.tapZonesOwner??"shell"))});function N(){const x=t.clientWidth||i.clientWidth,V=Ye(x);i.classList.remove("size-phone","size-fold-tablet","size-desktop"),i.classList.add(`size-${V}`),S()}N();function U(){N(),J.refreshLayout()}const _=typeof ResizeObserver=="function"?new ResizeObserver(()=>U()):null;_==null||_.observe(t);const D=()=>U();_||window.addEventListener("resize",D);const R=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,g=()=>z();(ze=R==null?void 0:R.addEventListener)==null||ze.call(R,"change",g);function I(x,V){if(u==="host")return;const ye=$t(x,c);ye==="prev"?r.prev():ye==="next"?r.next():C()}function O(x){x==="prev"?r.prev():x==="next"?r.next():C()}function w(x,V){V.key!=="Enter"&&V.key!==" "||(V.preventDefault(),O(x))}const B=()=>O(c?"next":"prev"),j=()=>O(c?"prev":"next"),ne=()=>O("toggle"),Q=x=>w(c?"next":"prev",x),L=x=>w(c?"prev":"next",x),G=x=>w("toggle",x);a.zoneLeft.addEventListener("click",B),a.zoneRight.addEventListener("click",j),a.zoneCentre.addEventListener("click",ne),a.zoneLeft.addEventListener("keydown",Q),a.zoneRight.addEventListener("keydown",L),a.zoneCentre.addEventListener("keydown",G);function Y(){return W.isOpen()?(W.close(),!0):K!=null&&K.isOpen()?(K.close(),!0):ge.isOpen()?(ge.close(),!0):J.isOpen()?(se(),!0):A.isOpen()?(A.close(),!0):d?(p(!1),!0):!1}function ae(x){const V=Gt(x);V&&(Kt(V)&&x.preventDefault(),V==="next"?r.next():V==="prev"?r.prev():V==="toggleBars"?C():V==="escape"&&Y())}e.addEventListener("keydown",ae);const ee=()=>r.historyBack(),oe=()=>r.historyForward();a.historyBackBtn.addEventListener("click",ee),a.historyForwardBtn.addEventListener("click",oe);const J=Dr(i,r,{getSizeClass:()=>Ye(t.clientWidth||i.clientWidth),onWidthChange:n.onContextWidthChange,hostChannel:n.hostChannel,onClose:()=>{s="none",a.contextBtn.setAttribute("aria-pressed","false"),f()}});function se(){s==="right"?(J.close(),s="none"):(F()||A.close(),W.close(),J.open(),s="right"),a.contextBtn.setAttribute("aria-pressed",String(s==="right")),f()}a.contextBtn.addEventListener("click",se);const re=n.hostChannel?Ur(i,r,n.hostChannel,{eink:n.eink}):null;let ue=new Set;function le(){a.bookmarkBtn.setAttribute("aria-pressed",String(!!v&&ue.has(v)))}function X(){!n.hostChannel||!v||n.hostChannel.emitIntent({type:"bookmarkToggle",cfi:v})}const ie=(Ie=n.hostChannel)==null?void 0:Ie.onCommand(x=>{x.type==="setBookmarks"&&(ue=new Set(x.items.map(V=>V.cfi)),le())});a.bookmarkBtn.addEventListener("click",X);let ce=!1;function he(x){ce||(ce=!0,a.narrationBtn.hidden=!x)}let be=!1;function fe(){a.narrationBtn.setAttribute("aria-pressed",String(be))}function xe(){var x;(x=n.hostChannel)==null||x.emitIntent({type:"playback",action:be?"stop":"play",positionSec:null,rate:null})}const k=(Pe=n.hostChannel)==null?void 0:Pe.onCommand(x=>{x.type==="configure"?he(x.capabilities.playback):x.type==="setPlaybackState"&&(be=x.active!==!1,fe())}),P=(Me=n.hostChannel)==null?void 0:Me.getConfig();P&&he(P.capabilities.playback),a.narrationBtn.addEventListener("click",xe);const K=n.hostChannel?Jr({shellRoot:i,core:r,hostChannel:n.hostChannel,options:{eink:n.eink}}):null,W=dn(i,r,{getSizeClass:()=>Ye(t.clientWidth||i.clientWidth),eink:n.eink,hostChannel:n.hostChannel,volumeKeysCapability:n.volumeKeysCapability,onOpenChange:x=>{a.settingsBtn.setAttribute("aria-pressed",String(x))}});function Z(){if(W.isOpen()){W.close();return}A.close(),J.close(),s="none",a.contentsBtn.setAttribute("aria-pressed","false"),a.contextBtn.setAttribute("aria-pressed","false"),f(),W.open()}a.settingsBtn.addEventListener("click",Z);const ge=Fr(i,r,{onOpenInGlossary:x=>{J.openGlossaryTerm(x),s="right",a.contextBtn.setAttribute("aria-pressed","true"),f()}}),me=(Fe=n.hostChannel)==null?void 0:Fe.onCommand(x=>{var V;x.type==="dismiss"&&!Y()&&((V=n.hostChannel)==null||V.emitIntent({type:"back"}))}),Se=()=>{m=!0},Le=()=>{m=!1,r.goToFraction(Number(a.scrubber.value)/1e3)};a.scrubber.addEventListener("pointerdown",Se),a.scrubber.addEventListener("change",Le);function Ae(x){switch(x.type){case"loaded":c=x.isRtl,i.classList.toggle("is-rtl",c),A.setToc(x.toc),S();break;case"relocate":v=x.cfi??null,a.chapterLabel&&a.chapterLabel.textContent!==(x.chapterTitle??"")&&(a.chapterLabel.textContent=x.chapterTitle??""),!m&&typeof x.fraction=="number"&&(a.scrubber.value=String(Math.round(x.fraction*1e3))),A.setCurrentChapterTitle(x.chapterTitle),le();break;case"history":a.historyBackBtn.disabled=!x.canGoBack,a.historyForwardBtn.disabled=!x.canGoForward;break;case"tap":I(x.x,x.y);break}}const _e=r.on(Ae);r.replayLastEvents(Ae),f();function qe(){N()}function Te(){var x;h||(h=!0,_e(),_==null||_.disconnect(),_||window.removeEventListener("resize",D),(x=R==null?void 0:R.removeEventListener)==null||x.call(R,"change",g),e.removeEventListener("keydown",ae),a.zoneLeft.removeEventListener("click",B),a.zoneRight.removeEventListener("click",j),a.zoneCentre.removeEventListener("click",ne),a.zoneLeft.removeEventListener("keydown",Q),a.zoneRight.removeEventListener("keydown",L),a.zoneCentre.removeEventListener("keydown",G),a.historyBackBtn.removeEventListener("click",ee),a.historyForwardBtn.removeEventListener("click",oe),a.contextBtn.removeEventListener("click",se),a.bookmarkBtn.removeEventListener("click",X),a.narrationBtn.removeEventListener("click",xe),k==null||k(),ie==null||ie(),me==null||me(),$==null||$(),K==null||K.destroy(),J.destroy(),re==null||re.destroy(),a.settingsBtn.removeEventListener("click",Z),W.destroy(),ge.destroy(),a.scrubber.removeEventListener("pointerdown",Se),a.scrubber.removeEventListener("change",Le),a.contentsBtn.removeEventListener("click",T),A.destroy(),y.clear(),i.classList.remove("reader-shell","ui-visible","e-ink","reduced-motion","is-rtl","size-phone","size-fold-tablet","size-desktop","settings-open"),a.zones.remove(),a.topBar.remove(),a.bottomBar.remove())}return{getChromeState:()=>({barsVisible:d,sidebar:s}),onChromeState:x=>(y.add(x),()=>y.delete(x)),setBarsVisible:p,refreshSizeClass:qe,destroy:Te}}export{nt as ZONE_FRACTION,Ye as computeSizeClass,Kt as isPreventableKey,Ur as mountPlaybackBar,Dr as mountRightSidebar,dn as mountSettingsPanel,mn as mountShell,Gt as resolveKeyboardAction,$t as resolveTapZone};
