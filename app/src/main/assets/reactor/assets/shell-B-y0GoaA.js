var St=Object.defineProperty;var Ct=(t,r,n)=>r in t?St(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;var W=(t,r,n)=>Ct(t,typeof r!="symbol"?r+"":r,n);import{A as Lt,D as Oe}from"./index-CbfdjjQF.js";const At={menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',bookmark:'<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',panel_right:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',back:'<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',forward:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',skip_back:'<polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/>',skip_forward:'<polygon points="13 19 22 12 13 5 13 19"/><polygon points="2 19 11 12 2 5 2 19"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-6a9 9 0 0 1 18 0v6a1 1 0 0 1-1 1h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',sleep:'<path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/>'};function we(t){return`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${At[t]}</svg>`}function me(t,r,n=!1){const s=document.createElement("button");return s.type="button",s.className="rx-icon-btn",s.setAttribute("aria-label",t),s.innerHTML=we(r),n&&s.setAttribute("aria-pressed","false"),s}function Tt(t){t.classList.add("reader-shell");const r=document.createElement("div");r.className="rx-zones";const n=document.createElement("div");n.className="rx-zone rx-zone-left",n.setAttribute("role","button"),n.setAttribute("tabindex","0"),n.setAttribute("aria-label","Previous page");const s=document.createElement("div");s.className="rx-zone rx-zone-centre",s.setAttribute("role","button"),s.setAttribute("tabindex","0"),s.setAttribute("aria-label","Toggle bars");const e=document.createElement("div");e.className="rx-zone rx-zone-right",e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label","Next page"),r.append(n,s,e);const a=document.createElement("div");a.className="rx-bar rx-bar-top",a.setAttribute("role","toolbar");const i=me("Table of contents","menu",!0),l=me("Bookmark","bookmark",!0),d=me("Toggle narration","headphones",!0);d.hidden=!0;const o=me("Text settings","settings",!0),y=me("Open context panel","panel_right",!0),b=document.createElement("div");b.className="rx-bar-spacer",a.append(i,l,b,d,o,y);const k=document.createElement("div");k.className="rx-bar rx-bar-bottom";const u=document.createElement("div");u.className="rx-status-row",u.setAttribute("aria-live","polite");const p=me("Back","back");p.disabled=!0;const g=document.createElement("span");g.className="rx-chapter-label";const f=me("Forward","forward");f.disabled=!0,u.append(p,g,f);const h=document.createElement("input");return h.type="range",h.className="rx-scrubber",h.min="0",h.max="1000",h.step="1",h.value="0",h.setAttribute("aria-label","Reading position"),k.append(u,h),t.append(r,a,k),{root:t,zones:r,zoneLeft:n,zoneCentre:s,zoneRight:e,topBar:a,bottomBar:k,contentsBtn:i,bookmarkBtn:l,narrationBtn:d,settingsBtn:o,contextBtn:y,historyBackBtn:p,historyForwardBtn:f,chapterLabel:g,scrubber:h}}const Bt=`
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
`,Nt=599,zt=1200;function Fe(t){return t<=Nt?"phone":t<=zt?"fold-tablet":"desktop"}const Ze=.3;function It(t,r){const n=Math.min(1,Math.max(0,t));return n<Ze?r?"next":"prev":n>1-Ze?r?"prev":"next":"toggle"}const Pt=new Set(["ArrowRight","ArrowDown","PageDown"," "]),Mt=new Set(["ArrowLeft","ArrowUp","PageUp"]);function Ht(t){return t.ctrlKey||t.metaKey||t.altKey?null:Pt.has(t.key)?"next":Mt.has(t.key)?"prev":t.key==="m"||t.key==="M"?"toggleBars":t.key==="Escape"?"escape":null}function Ot(t){return t==="next"||t==="prev"}const Ft='<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',Rt='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function Xe(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-icon-btn",n.setAttribute("aria-label",t),n.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,n}function $t(t){const r=document.createElement("div");r.className="rx-left-sidebar",r.setAttribute("aria-label","Table of contents"),r.tabIndex=-1;const n=document.createElement("div");n.className="rx-left-sidebar-scrim";const s=document.createElement("div");s.className="rx-sidebar-head";const e=Xe("Back",Ft),a=document.createElement("h3");a.className="rx-sidebar-title",a.textContent="Contents";const i=Xe("Close contents",Rt);i.classList.add("rx-left-sidebar-close"),s.append(e,a,i);const l=document.createElement("div");l.className="rx-left-sidebar-tabs",l.setAttribute("role","tablist");function d(M,N){const S=document.createElement("button");return S.type="button",S.className="rx-left-sidebar-tab",S.setAttribute("role","tab"),S.setAttribute("aria-selected","false"),S.setAttribute("data-tab",N),S.id=`rx-tab-${N}`,S.textContent=M,S}const o=d("Contents","contents"),y=d("Starred","starred"),b=d("Related","related");l.append(o,y,b);const k=document.createElement("div");k.className="rx-left-sidebar-body";function u(M){const N=document.createElement("div");return N.className="rx-sidebar-panel",N.setAttribute("role","tabpanel"),N.setAttribute("data-panel",M),N.setAttribute("aria-labelledby",`rx-tab-${M}`),N.hidden=!0,N}const p=u("contents"),g=document.createElement("div");g.className="rx-toc-scroll";const f=document.createElement("div");f.className="rx-toc-spacer";const h=document.createElement("div");h.className="rx-toc-window",h.setAttribute("role","list"),f.appendChild(h),g.appendChild(f),p.appendChild(g);const T=u("starred"),A=u("related");return k.append(p,T,A),r.append(s,l,k),t.append(n,r),{root:r,scrim:n,backBtn:e,closeBtn:i,title:a,tablist:l,tabContents:o,tabStarred:y,tabRelated:b,body:k,panelContents:p,tocScroll:g,tocSpacer:f,tocWindow:h,panelStarred:T,panelRelated:A}}const _t=`
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
`;function ft(t,r=null,n=0){const s=[];for(let e=0;e<t.length;e++){const a=t[e],i=r===null?String(e):`${r}.${e}`;s.push({id:i,label:a.label,href:a.href,depth:n,hasChildren:a.subitems.length>0,parentId:r}),a.subitems.length>0&&s.push(...ft(a.subitems,i,n+1))}return s}function Dt(t,r){if(r.size===0)return t;const n=new Set,s=[];for(const e of t){if(e.parentId!==null&&(n.has(e.parentId)||r.has(e.parentId))){n.add(e.id);continue}s.push(e)}return s}function Gt(t,r){if(!r)return null;const n=Je(r);let s=null;for(const e of t)if(e.href){if(e.href===r)return e.id;s===null&&Je(e.href)===n&&(s=e)}return(s==null?void 0:s.id)??null}function Kt(t,r){if(!r)return null;for(const n of t)if(n.label===r)return n.id;return null}function Je(t){const r=t.indexOf("#");return r===-1?t:t.slice(0,r)}function Wt(t,r,n,s,e=8){if(s===0||r<=0)return{start:0,end:-1};const a=Math.floor(t/r),i=Math.ceil(n/r),l=Math.max(0,a-e),d=Math.min(s-1,a+i+e);return{start:l,end:d}}const Re=48;function Vt(t,r,n,s){const e=document.createElement("div");if(e.className="rx-toc-row",e.setAttribute("role","listitem"),e.style.paddingLeft=`${12+t.depth*18}px`,s&&e.classList.add("is-current"),t.hasChildren){const d=document.createElement("button");d.type="button",d.className="rx-toc-toggle";const o=!r.collapsed.has(t.id);d.setAttribute("aria-expanded",String(o)),d.setAttribute("aria-label",`${o?"Collapse":"Expand"} ${t.label}`),d.textContent=o?"▾":"▸",d.addEventListener("click",y=>{y.stopPropagation(),n.onToggleExpand(t)}),e.appendChild(d)}else{const d=document.createElement("span");d.className="rx-toc-toggle-spacer",e.appendChild(d)}const a=document.createElement("button");a.type="button",a.className="rx-toc-label",a.setAttribute("aria-label",t.label),s&&a.setAttribute("aria-current","true"),a.textContent=t.label,a.addEventListener("click",()=>n.onActivate(t)),e.appendChild(a);const i=document.createElement("button");i.type="button",i.className="rx-toc-star";const l=t.href?r.starred.has(t.href):!1;return i.setAttribute("aria-pressed",String(l)),i.setAttribute("aria-label",`${l?"Unstar":"Star"} ${t.label}`),i.textContent=l?"★":"☆",i.addEventListener("click",d=>{d.stopPropagation(),n.onToggleStar(t)}),e.appendChild(i),e}function qt(t,r,n,s,e){const a=Dt(s.flat,s.collapsed),i=Gt(a,s.currentHref)??Kt(a,s.currentChapterTitle);r.style.height=`${a.length*Re}px`;const l=t.clientHeight||1,{start:d,end:o}=Wt(t.scrollTop,Re,l,a.length);n.replaceChildren(),n.style.transform=`translateY(${d*Re}px)`;for(let y=d;y<=o;y++){const b=a[y];b&&n.appendChild(Vt(b,s,e,b.id===i))}}function Ut(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No starred chapters yet. Star a chapter in Contents to find it here.",t.appendChild(e);return}const s=document.createElement("div");s.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-starred-row",a.setAttribute("role","listitem"),a.textContent=e.label,a.addEventListener("click",()=>n(e)),s.appendChild(a)}t.appendChild(s)}function Yt(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No related books yet.",t.appendChild(e);return}const s=document.createElement("div");s.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-related-row",a.setAttribute("role","listitem");const i=`${e.title}${e.subtitle?`, ${e.subtitle}`:""}${e.read?", read":""}`;if(a.setAttribute("aria-label",i),e.coverUrl){const o=document.createElement("img");o.className="rx-related-cover",o.src=e.coverUrl,o.alt="",a.appendChild(o)}else{const o=document.createElement("div");o.className="rx-related-cover rx-related-cover-empty",a.appendChild(o)}const l=document.createElement("div");l.className="rx-related-text";const d=document.createElement("span");if(d.className="rx-related-title",d.textContent=e.title,l.appendChild(d),e.subtitle){const o=document.createElement("span");o.className="rx-related-subtitle",o.textContent=e.subtitle,l.appendChild(o)}if(a.appendChild(l),e.read){const o=document.createElement("span");o.className="rx-related-badge",o.textContent="Read",a.appendChild(o)}a.addEventListener("click",()=>n(e)),s.appendChild(a)}t.appendChild(s)}function xt(t,r){return mt(t,r,1)}function gt(t,r){return mt(t,r,-1)}function mt(t,r,n){if(t.length===0)return r;const s=t.indexOf(r);if(s===-1)return t[0];const e=(s+n+t.length)%t.length;return t[e]}function jt(t,r){return xt(t,r)}function Zt(t,r){return gt(t,r)}const Xt=40;function Jt(t,r){return Math.abs(t)>=Xt&&Math.abs(t)>Math.abs(r)}function vt(t,r,n,s){return Jt(r,n)?t==="sidebar"?{action:r<0?"cycle-next":"cycle-prev"}:t==="book"&&s?{action:"close"}:{action:null}:{action:null}}function yt(t,r,n){return t&&r.contains(t)?"sidebar":t&&n.contains(t)&&!r.contains(t)?"book":"other"}function kt(t,r){let n=0,s=0,e=0,a=0,i=null,l=!1,d=!1;function o(h,T,A,M){n=e=h,s=a=T,i=A,l=!0,d=M}function y(){l&&(l=!1,r.onSwipe(e-n,a-s,i),i=null)}function b(h){h.pointerType!=="pen"&&o(h.clientX,h.clientY,h.target,h.pointerType==="touch")}function k(h){l&&(e=h.clientX,a=h.clientY)}function u(h){e=h.clientX,a=h.clientY,y()}function p(){d||y()}function g(h){if(!l)return;const T=h.touches[0];T&&(e=T.clientX,a=T.clientY)}function f(){y()}return t.addEventListener("pointerdown",b),t.addEventListener("pointermove",k),t.addEventListener("pointerup",u),t.addEventListener("pointercancel",p),t.addEventListener("touchmove",g,{passive:!0}),t.addEventListener("touchend",f,{passive:!0}),{destroy(){t.removeEventListener("pointerdown",b),t.removeEventListener("pointermove",k),t.removeEventListener("pointerup",u),t.removeEventListener("pointercancel",p),t.removeEventListener("touchmove",g),t.removeEventListener("touchend",f)}}}function Qt(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function er(t){let r=!1;function n(s){if(!r||s.key!=="Tab")return;const e=Qt(t);if(e.length===0){s.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],l=t.ownerDocument.activeElement;s.shiftKey&&l===a?(s.preventDefault(),i.focus()):!s.shiftKey&&l===i&&(s.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const Qe="reactor-left-sidebar-stylesheet";function tr(t){if(t.getElementById(Qe))return;const r=t.createElement("style");r.id=Qe,r.textContent=_t,t.head.appendChild(r)}function rr(t,r,n={}){var B,H;const s=t.ownerDocument??document;tr(s);const e=$t(t);e.root.classList.add("closed");const a=["contents","starred"];(B=n.capabilities)!=null&&B.related&&a.push("related"),e.tabRelated.hidden=!((H=n.capabilities)!=null&&H.related);let i="contents",l=!1,d=!1,o=[];const y=new Set;let b=null,k=null;const u=new Set,p=new Map;let g=[];const f=er(e.root);let h=null;function T(){return!t.classList.contains("size-desktop")}function A(E){return E==="contents"?e.panelContents:E==="starred"?e.panelStarred:e.panelRelated}function M(E){return E==="contents"?e.tabContents:E==="starred"?e.tabStarred:e.tabRelated}function N(){if(i==="contents")qt(e.tocScroll,e.tocSpacer,e.tocWindow,{flat:o,collapsed:y,currentHref:b,currentChapterTitle:k,starred:u},{onActivate:E=>{E.href&&r(E.href),T()&&P()},onToggleExpand:E=>{y.has(E.id)?y.delete(E.id):y.add(E.id),N()},onToggleStar:E=>{var F;if(!E.href)return;const z=!u.has(E.href);z?(u.add(E.href),p.set(E.href,E.label)):(u.delete(E.href),p.delete(E.href)),(F=n.onStarToggle)==null||F.call(n,E.href,E.label,z),N()}});else if(i==="starred"){const E=Array.from(p,([z,F])=>({href:z,label:F}));Ut(e.panelStarred,E,z=>{r(z.href),T()&&P()})}else Yt(e.panelRelated,g,E=>{var z;(z=n.onOpenRelated)==null||z.call(n,E.id),T()&&P()})}function S(E){E!==i&&(M(i).setAttribute("aria-selected","false"),A(i).hidden=!0,i=E,M(i).setAttribute("aria-selected","true"),A(i).hidden=!1,N())}function C(E){const z=E===1?jt(a,i):Zt(a,i);S(z)}e.tabContents.addEventListener("click",()=>S("contents")),e.tabStarred.addEventListener("click",()=>S("starred")),e.tabRelated.addEventListener("click",()=>S("related")),S("contents"),M("contents").setAttribute("aria-selected","true"),A("contents").hidden=!1;function O(){var z;if(l)return;l=!0,h=s.activeElement??null,e.root.classList.add("open"),e.root.classList.remove("closed"),t.classList.add("rx-left-sidebar-open"),e.scrim.classList.toggle("visible",T());const E=T();e.root.setAttribute("role",E?"dialog":"complementary"),E?e.root.setAttribute("aria-modal","true"):e.root.removeAttribute("aria-modal"),E&&(f.activate(),e.root.focus()),(z=n.onSidebarChange)==null||z.call(n,!0)}function P(){var E,z;l&&(l=!1,e.root.classList.remove("open"),e.root.classList.add("closed"),t.classList.remove("rx-left-sidebar-open"),e.scrim.classList.remove("visible"),f.deactivate(),(E=h==null?void 0:h.focus)==null||E.call(h),h=null,(z=n.onSidebarChange)==null||z.call(n,!1))}e.closeBtn.addEventListener("click",P),e.scrim.addEventListener("click",P),e.backBtn.addEventListener("click",()=>{var E;return(E=n.onBack)==null?void 0:E.call(n)});const K=kt(t,{onSwipe:(E,z,F)=>{const Y=yt(F,e.root,t),j=vt(Y,E,z,T());!l&&j.action!==null||(j.action==="cycle-next"?C(1):j.action==="cycle-prev"?C(-1):j.action==="close"&&P())}});function G(E){o=ft(E),y.clear(),i==="contents"&&N()}function V(E){p.clear(),u.clear();for(const z of E)u.add(z.href),p.set(z.href,z.label);(i==="starred"||i==="contents")&&N()}function $(E){g=E,i==="related"&&N()}function _(E){b=E,i==="contents"&&N()}function R(E){k=E,i==="contents"&&N()}function x(){d||(d=!0,K.destroy(),e.closeBtn.removeEventListener("click",P),e.scrim.removeEventListener("click",P),f.deactivate(),t.classList.remove("rx-left-sidebar-open"),e.root.remove(),e.scrim.remove())}return{open:O,close:P,isOpen:()=>l,cycleTab:C,getActiveTab:()=>i,setToc:G,setStarred:V,setRelated:$,setCurrentHref:_,setCurrentChapterTitle:R,destroy:x}}function $e(t,r,n){const s=document.createElement("button");return s.type="button",s.className="rx-sidebar-tab",s.textContent=t,s.setAttribute("role","tab"),s.setAttribute("aria-selected",String(r)),s.dataset.tab=n,r&&s.classList.add("active"),s}function nr(t){const r=t.createElement("div");r.className="rx-right-sidebar",r.setAttribute("role","complementary"),r.setAttribute("aria-label","Context panel");const n=t.createElement("div");n.className="rx-sidebar-resize",n.setAttribute("role","separator"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-label","Resize context panel"),n.setAttribute("tabindex","0");const s=t.createElement("div");s.className="rx-sidebar-tabs";const e=t.createElement("div");e.className="rx-sidebar-tablist",e.setAttribute("role","tablist");const a=$e("Context",!0,"context"),i=$e("Glossary",!1,"glossary"),l=$e("Notes",!1,"notes");l.disabled=!0;const d=t.createElement("button");d.type="button",d.className="rx-icon-btn rx-sidebar-close",d.setAttribute("aria-label","Close panel"),d.textContent="✕",e.append(a,i,l),s.append(e,d);const o=t.createElement("div");o.className="rx-ctx-searchbar",o.setAttribute("role","search");const y=t.createElement("input");y.type="search",y.className="rx-ctx-search-input",y.placeholder="Search this book",y.setAttribute("aria-label","Search this book");const b=t.createElement("button");b.type="button",b.className="rx-icon-btn rx-ctx-openmain",b.setAttribute("aria-label","Open in main window"),b.disabled=!0,b.textContent="↗";const k=t.createElement("div");k.className="rx-ctx-crumbs",k.setAttribute("aria-live","polite"),o.append(y,b,k);const u=t.createElement("div");u.className="rx-sidebar-body";const p=t.createElement("div");p.className="rx-ctx-results";const g=t.createElement("div");g.className="rx-ctx-page",g.hidden=!0;const f=t.createElement("div");f.className="rx-notes-body",f.hidden=!0;const h=t.createElement("div");return h.className="rx-glossary-panel-mount",h.hidden=!0,u.append(p,g,f,h),r.append(n,s,o,u),{root:r,resizeHandle:n,tabsRow:s,contextTabBtn:a,glossaryTabBtn:i,notesTabBtn:l,closeBtn:d,searchBar:o,searchInput:y,openInMainBtn:b,breadcrumb:k,body:u,resultsScroller:p,contextPage:g,notesBody:f,glossaryPanelMount:h}}const ar=`
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
`;class sr{constructor(){W(this,"rows",[]);W(this,"headerAt",new Map)}reset(){this.rows=[],this.headerAt.clear()}addGroup(r,n){if(n.length!==0){this.headerAt.has(r)||(this.headerAt.set(r,this.rows.length),this.rows.push({kind:"header",label:r}));for(const s of n)this.rows.push({kind:"item",item:s,groupLabel:r})}}get rowCount(){return this.rows.length}rowAt(r){return this.rows[r]}get isEmpty(){return this.rows.length===0}}class wt{constructor(r){W(this,"container");W(this,"rowHeight");W(this,"buffer");W(this,"opts");W(this,"topSpacer");W(this,"bottomSpacer");W(this,"rowsEl");W(this,"onScroll");W(this,"destroyed",!1);this.opts=r,this.container=r.container,this.rowHeight=r.rowHeight,this.buffer=r.buffer??6,this.topSpacer=document.createElement("div"),this.topSpacer.className="rx-wlist-spacer",this.bottomSpacer=document.createElement("div"),this.bottomSpacer.className="rx-wlist-spacer",this.rowsEl=document.createElement("div"),this.rowsEl.className="rx-wlist-rows",this.rowsEl.setAttribute("role","list"),this.container.replaceChildren(this.topSpacer,this.rowsEl,this.bottomSpacer),this.onScroll=()=>this.render(),this.container.addEventListener("scroll",this.onScroll)}visibleRange(){const r=this.opts.rowCount(),n=this.container.clientHeight||1,s=this.container.scrollTop||0,e=Math.max(0,Math.floor(s/this.rowHeight)-this.buffer),a=Math.ceil(n/this.rowHeight)+this.buffer*2,i=Math.min(r,e+a);return{first:e,last:i}}render(){if(this.destroyed)return;const r=this.opts.rowCount(),{first:n,last:s}=this.visibleRange();this.topSpacer.style.height=`${n*this.rowHeight}px`,this.bottomSpacer.style.height=`${Math.max(0,r-s)*this.rowHeight}px`,this.rowsEl.replaceChildren();for(let e=n;e<s;e++)this.rowsEl.appendChild(this.opts.renderRow(e))}destroy(){this.destroyed||(this.destroyed=!0,this.container.removeEventListener("scroll",this.onScroll),this.container.replaceChildren())}}function or(t,r){return t.kind!==r.kind?!1:t.kind==="page"&&r.kind==="page"?t.target===r.target:!0}class ir{constructor(){W(this,"stack",[{kind:"blank"}]);W(this,"index",0)}get current(){return this.stack[this.index]??{kind:"blank"}}get canGoBack(){return this.index>0}get canGoForward(){return this.index<this.stack.length-1}push(r){or(this.current,r)||(this.stack=this.stack.slice(0,this.index+1),this.stack.push(r),this.index=this.stack.length-1)}back(){return this.canGoBack?(this.index-=1,this.current):null}forward(){return this.canGoForward?(this.index+=1,this.current):null}reset(){this.stack=[{kind:"blank"}],this.index=0}}const lr={"fold-tablet":320,desktop:340},He=240,et=16,cr={"fold-tablet":.6,desktop:.7};function dr(t,r,n){const s=cr[n],e=Math.max(He,r*s);return t<He?He:t>e?e:t}const Et=new WeakMap;function _e(t){return Et.get(t)??{left:0,right:0,bottom:0}}function be(t,r){const n={left:Math.max(0,r.left??_e(t).left),right:Math.max(0,r.right??_e(t).right),bottom:Math.max(0,r.bottom??_e(t).bottom)};return Et.set(t,n),t.style.setProperty("--rx-book-inset-left",`${n.left}px`),t.style.setProperty("--rx-book-inset-right",`${n.right}px`),t.style.setProperty("--rx-book-inset-bottom",`${n.bottom}px`),t.style.paddingLeft=n.left?`${n.left}px`:"",t.style.paddingRight=n.right?`${n.right}px`:"",t.style.paddingBottom=n.bottom?`${n.bottom}px`:"",n}const ur=[{id:"all",label:"All"},{id:"highlight",label:"Highlight"},{id:"underline",label:"Underline"},{id:"note",label:"Typed note"},{id:"handwritten",label:"Handwritten"},{id:"bookmark",label:"Bookmark"}],pr=[{id:"position",label:"Position in book"},{id:"date",label:"Date"},{id:"colour",label:"Colour"},{id:"type",label:"Type"}];function hr(t){const r=t.createElement("div");r.className="rx-notes-panel";const n=t.createElement("div");n.className="rx-notes-searchbar",n.setAttribute("role","search");const s=t.createElement("input");s.type="search",s.className="rx-notes-search-input",s.placeholder="Search notes",s.setAttribute("aria-label","Search notes"),n.append(s);const e=t.createElement("select");e.className="rx-notes-sort",e.setAttribute("aria-label","Sort notes by");for(const{id:o,label:y}of pr){const b=t.createElement("option");b.value=o,b.textContent=y,e.append(b)}n.append(e);const a=t.createElement("div");a.className="rx-notes-filters",a.setAttribute("role","group"),a.setAttribute("aria-label","Filter notes by type");const i={};for(const{id:o,label:y}of ur){const b=t.createElement("button");b.type="button",b.className="rx-notes-chip",b.textContent=y,b.setAttribute("aria-pressed",String(o==="all")),o==="all"&&b.classList.add("active"),b.dataset.filter=o,a.append(b),i[o]=b}const l=t.createElement("div");l.className="rx-notes-banner",l.hidden=!0,l.textContent="No annotation store connected. Notes made in this session are not saved.";const d=t.createElement("div");return d.className="rx-notes-list",r.append(n,a,l,d),{root:r,searchBar:n,searchInput:s,filterRow:a,filterButtons:i,sortSelect:e,capabilityBanner:l,listScroller:d}}const br=`
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
`,fr=100,xr=20;function gr(t){return t==="all"?null:t}class mr{constructor(r){W(this,"total",0);W(this,"offset",0);W(this,"items",[]);W(this,"state",{filter:"all",sort:"position",query:null});W(this,"lastRequestedOffset",null);W(this,"everRequested",!1);this.hostChannel=r}getState(){return this.state}setState(r){this.state={...this.state,...r},this.total=0,this.offset=0,this.items=[],this.lastRequestedOffset=null,this.requestPage(0)}ensureInitialLoad(){this.everRequested||this.requestPage(0)}rowCount(){return this.total}rowAt(r){const n=r-this.offset;if(!(n<0||n>=this.items.length))return this.items[n]}ensureLoaded(r,n){const s=Math.max(r,n-1);if(this.rowAt(r)&&this.rowAt(s))return;const e=Math.max(0,r-xr);this.lastRequestedOffset!==e&&this.requestPage(e)}requestPage(r){this.everRequested=!0,this.lastRequestedOffset=r,this.hostChannel.emitIntent({type:"notesPageRequest",offset:r,limit:fr,filter:gr(this.state.filter),sort:this.state.sort,query:this.state.query})}applyWindow(r){this.total=r.total,this.offset=r.offset,this.items=r.items,this.lastRequestedOffset=null}}const tt="reactor-notes-stylesheet",vr=48,yr=200,rt={highlight:"Highlight",underline:"Underline",note:"Typed note",bookmark:"Bookmark"};function kr(t,r){return r?`${rt[t]} · ${r}`:rt[t]}function wr({container:t,core:r,hostChannel:n,options:s={}}){const e=t.ownerDocument??document;if(!e.getElementById(tt)){const S=e.createElement("style");S.id=tt,S.textContent=br,e.head.appendChild(S)}const a=hr(e);t.append(a.root);const i=new mr(n);let l=!1,d=null;const o=new Map,y=new Set;function b(S){o.has(S)||y.has(S)||typeof r.getChapterTitleForCfi=="function"&&(y.add(S),r.getChapterTitleForCfi(S).then(C=>{o.set(S,C)}).catch(()=>{o.set(S,null)}).finally(()=>{y.delete(S),!l&&u.render()}))}function k(S){i.ensureLoaded(S,S+1);const C=i.rowAt(S);if(!C){const R=e.createElement("div");return R.className="rx-notes-loading-row",R.setAttribute("role","listitem"),R.textContent="Loading…",R}const O=e.createElement("button");O.type="button",O.className="rx-notes-row";const P=e.createElement("span");P.className="rx-notes-row-swatch",C.color&&P.style.setProperty("--rx-notes-row-color",C.color);const K=e.createElement("span");K.className="rx-notes-row-body";const G=e.createElement("span");G.className="rx-notes-row-snippet",G.textContent=C.note??C.text??"";const V=e.createElement("span");V.className="rx-notes-row-meta";const $=o.get(C.cfi);V.textContent=kr(C.kind,$??null),K.append(G,V),O.append(P,K),O.setAttribute("aria-label",`${V.textContent}: ${G.textContent}`),$===void 0&&b(C.cfi),O.addEventListener("click",()=>r.goTo(C.cfi));const _=e.createElement("div");return _.setAttribute("role","listitem"),_.appendChild(O),_}const u=new wt({container:a.listScroller,rowHeight:vr,rowCount:()=>i.rowCount(),renderRow:k});function p(S){const C=S.currentTarget,O=C.dataset.filter??"all";for(const P of Object.values(a.filterButtons))P.classList.toggle("active",P===C),P.setAttribute("aria-pressed",String(P===C));i.setState({filter:O}),u.render()}for(const S of Object.values(a.filterButtons))S.addEventListener("click",p);function g(){i.setState({sort:a.sortSelect.value}),u.render()}a.sortSelect.addEventListener("change",g);function f(){d&&clearTimeout(d),d=setTimeout(()=>{i.setState({query:a.searchInput.value.trim()||null}),u.render()},yr)}a.searchInput.addEventListener("input",f);function h(S){S.type==="setNotes"&&(i.applyWindow(S),u.render())}const T=n.onCommand(h);function A(){var S;a.capabilityBanner.hidden=((S=n.getConfig())==null?void 0:S.capabilities.notes)!==!1,i.ensureInitialLoad(),u.render()}function M(){u.render()}function N(){if(!l){l=!0,d&&clearTimeout(d),T();for(const S of Object.values(a.filterButtons))S.removeEventListener("click",p);a.sortSelect.removeEventListener("change",g),a.searchInput.removeEventListener("input",f),u.destroy(),a.root.remove()}}return{onActivate:A,refresh:M,destroy:N}}function Er(t){const r=t.createElement("div");r.className="rx-glossary-panel",r.style.position="absolute",r.style.inset="0";const n=t.createElement("div");n.className="rx-glossary-search",n.setAttribute("role","search");const s=t.createElement("input");s.type="search",s.className="rx-glossary-search-input",s.placeholder="Search glossary",s.setAttribute("aria-label","Search glossary"),n.appendChild(s);const e=t.createElement("div");return e.className="rx-glossary-list",e.setAttribute("role","list"),r.append(n,e),{root:r,searchInput:s,list:e}}const Sr=900;function Cr(t){const r=t.ownerDocument??document,n=Er(r);t.appendChild(n.root);let s=[],e="",a=!1;function i(){const k=e.trim().toLowerCase();return[...k?s.filter(p=>p.term.toLowerCase().includes(k)):s].sort((p,g)=>p.term.localeCompare(g.term))}function l(){if(a)return;const k=i();if(n.list.replaceChildren(),!s.length){n.list.removeAttribute("role");const u=r.createElement("div");u.className="rx-glossary-empty",u.textContent="This book has no glossary.",n.list.appendChild(u);return}if(!k.length){n.list.removeAttribute("role");const u=r.createElement("div");u.className="rx-glossary-empty",u.textContent=`No terms match "${e}".`,n.list.appendChild(u);return}n.list.setAttribute("role","list");for(const u of k){let p=function(){const T=g.classList.toggle("expanded");f.setAttribute("aria-expanded",String(T))};const g=r.createElement("div");g.className="rx-glossary-item",g.setAttribute("role","listitem"),g.setAttribute("data-term",u.term);const f=r.createElement("button");f.type="button",f.className="rx-glossary-term-row",f.setAttribute("role","button"),f.setAttribute("aria-expanded","false"),f.textContent=u.term;const h=r.createElement("div");h.className="rx-glossary-def",h.textContent=u.definition,f.addEventListener("click",p),g.append(f,h),n.list.appendChild(g)}}function d(){e=n.searchInput.value,l()}n.searchInput.addEventListener("input",d),l();function o(k){s=k,l()}function y(k){var p,g;e&&(e="",n.searchInput.value="",l());const u=n.list.querySelector(`.rx-glossary-item[data-term="${CSS.escape(k)}"]`);u&&(u.classList.add("expanded"),(p=u.querySelector(".rx-glossary-term-row"))==null||p.setAttribute("aria-expanded","true"),(g=u.scrollIntoView)==null||g.call(u,{block:"center"}),u.classList.add("flash"),setTimeout(()=>u.classList.remove("flash"),Sr))}function b(){a||(a=!0,n.searchInput.removeEventListener("input",d),n.root.remove())}return{setTerms:o,scrollToAndFlash:y,destroy:b}}const nt=9,Le=8,at=16;function Lr(t,r,n,s){const e=t.top+t.height;let a=t.left;a=Math.min(Math.max(Le,a),Math.max(Le,r.width-n-Le));let i=e+nt,l=!1;if(i+s>r.height-Le){const o=t.top-s-nt;i=Math.max(Le,o),l=!0}const d=Math.max(at,Math.min(n-at,t.left+t.width/2-a));return{left:a,top:i,above:l,arrowX:d}}const Ar='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';function Tr(t,r,n){const s=t.ownerDocument??document;let e=null,a=!1;function i(){var u;const k=!!e;e==null||e.remove(),e=null,k&&((u=t.querySelector("iframe"))==null||u.focus())}function l(k,u){var A;i();const p=s.createElement("div");p.className="rx-glossary-popover",p.setAttribute("role","dialog"),p.setAttribute("aria-label",`${k.term} definition`),p.innerHTML=`
      <div class="rx-glossary-popover-head">
        <h4 class="rx-glossary-popover-term"></h4>
        <button type="button" class="rx-icon-btn rx-glossary-popover-open" aria-label="Open in glossary" title="Open in glossary">${Ar}</button>
      </div>
      <p class="rx-glossary-popover-def"></p>
    `,p.querySelector(".rx-glossary-popover-term").textContent=k.term,p.querySelector(".rx-glossary-popover-def").textContent=k.definition,t.appendChild(p),e=p;const g=t.getBoundingClientRect(),f={left:u.left-g.left,top:u.top-g.top,width:u.width,height:u.height},h={width:g.width,height:g.height},T=Lr(f,h,p.offsetWidth,p.offsetHeight||120);p.style.left=`${T.left}px`,p.style.top=`${T.top}px`,p.classList.toggle("above",T.above),p.style.setProperty("--arrow-x",`${T.arrowX}px`),p.querySelector(".rx-glossary-popover-open").addEventListener("click",M=>{M.stopPropagation(),i(),n.onOpenInGlossary(k.term)}),(A=p.querySelector(".rx-glossary-popover-open"))==null||A.focus()}async function d(k,u){const p=await r.getGlossaryTerms();if(a)return;const g=p.find(f=>f.term.toLowerCase()===k.toLowerCase());g&&l(g,u)}const o=r.onGlossaryTermTap(d);function y(k){var p;if(!e)return;const u=k.target;(p=u==null?void 0:u.closest)!=null&&p.call(u,".rx-glossary-popover")||i()}s.addEventListener("click",y);function b(){a||(a=!0,o(),s.removeEventListener("click",y),i())}return{isOpen:()=>e!==null,close:i,destroy:b}}const Br=`
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
`,st="reactor-right-sidebar-stylesheet",ot="reactor-glossary-stylesheet",Nr=48,zr=200;function Ir(t){if(!t.getElementById(st)){const r=t.createElement("style");r.id=st,r.textContent=ar,t.head.appendChild(r)}if(!t.getElementById(ot)){const r=t.createElement("style");r.id=ot,r.textContent=Br,t.head.appendChild(r)}}function Pr(t){const r=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`${r(t.pre)}<mark>${r(t.match)}</mark>${r(t.post)}`}function Mr(t,r,n){var ge,le;const s=t.ownerDocument??document;Ir(s);const e=nr(s),a=s.createElement("div");a.className="rx-sidebar-scrim",t.append(a,e.root);const i=new sr,l=new ir,d=Cr(e.glossaryPanelMount);let o="context",y=null,b=!1,k=!1,u=null;const p=!!n.hostChannel&&((ge=n.hostChannel.getConfig())==null?void 0:ge.capabilities.notes)!==!1;e.notesTabBtn.disabled=!p;const g=p?wr({container:e.notesBody,core:r,hostChannel:n.hostChannel}):null;((le=n.capabilities)==null?void 0:le.glossary)===!1&&(e.glossaryTabBtn.hidden=!0);const f=["context"];e.glossaryTabBtn.hidden!==!0&&f.push("glossary"),p&&f.push("notes");function h(){return n.getSizeClass()==="phone"}function T(v){const I=v===1?xt(f,o):gt(f,o);A(I)}function A(v){v!==o&&(o=v,e.contextTabBtn.classList.toggle("active",v==="context"),e.contextTabBtn.setAttribute("aria-selected",String(v==="context")),e.glossaryTabBtn.classList.toggle("active",v==="glossary"),e.glossaryTabBtn.setAttribute("aria-selected",String(v==="glossary")),e.notesTabBtn.classList.toggle("active",v==="notes"),e.notesTabBtn.setAttribute("aria-selected",String(v==="notes")),e.searchBar.hidden=v!=="context",e.glossaryPanelMount.hidden=v!=="glossary",e.notesBody.hidden=v!=="notes",v==="context"?_(l.current):v==="glossary"?(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,r.getGlossaryTerms().then(I=>d.setTerms(I))):(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,g==null||g.onActivate()))}const M=()=>A("context"),N=()=>A("glossary"),S=()=>A("notes");e.contextTabBtn.addEventListener("click",M),e.glossaryTabBtn.addEventListener("click",N),e.notesTabBtn.addEventListener("click",S);function C(v){const I=i.rowAt(v);if(!I)return s.createElement("div");if(I.kind==="header"){const X=s.createElement("div");return X.className="rx-ctx-group-header",X.setAttribute("role","listitem"),X.textContent=I.label,X}const D=s.createElement("button");D.type="button",D.className="rx-ctx-result",D.setAttribute("role","listitem"),D.innerHTML=Pr(I.item),D.addEventListener("click",()=>B(I.item,I.groupLabel));const U=s.createElement("div");return U.setAttribute("role","listitem"),U.appendChild(D),U}const O=new wt({container:e.resultsScroller,rowHeight:Nr,rowCount:()=>i.rowCount,renderRow:C});function P(){e.breadcrumb.replaceChildren();const v=s.createElement("button");v.type="button",v.textContent="Back",v.disabled=!l.canGoBack,v.setAttribute("aria-label","Back"),v.addEventListener("click",R);const I=s.createElement("button");I.type="button",I.textContent="Forward",I.disabled=!l.canGoForward,I.setAttribute("aria-label","Forward"),I.addEventListener("click",x),e.breadcrumb.append(v,I),e.openInMainBtn.disabled=l.current.kind!=="page"}function K(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,O.render()}function G(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,O.render()}function V(){return y||(y=r.createSecondaryView(e.contextPage),y)}function $(v){e.resultsScroller.hidden=!0,e.contextPage.hidden=!1;const I=V();I&&I.goTo(v)}function _(v){v.kind==="blank"?G():v.kind==="results"?K():$(v.target),P()}function R(){const v=l.back();v&&_(v)}function x(){const v=l.forward();v&&_(v)}function B(v,I){l.push({kind:"page",target:v.cfi,label:I}),_(l.current)}function H(){const v=e.searchInput.value.trim();i.reset(),v?l.current.kind!=="results"&&l.push({kind:"results"}):l.reset(),_(l.current),u&&clearTimeout(u),v&&(u=setTimeout(()=>r.runSearch(v),zr))}e.searchInput.addEventListener("input",H);function E(v){v.type==="searchResults"?(i.addGroup(v.label,v.items),l.current.kind==="results"&&O.render()):v.type==="loaded"&&d.setTerms([])}const z=r.on(E);function F(){const v=l.current;v.kind==="page"&&(r.goTo(v.target),n.getSizeClass()==="phone"&&ne())}e.openInMainBtn.addEventListener("click",F);function Y(){ne()}e.closeBtn.addEventListener("click",Y);const j=()=>ne();a.addEventListener("click",j);function L(){const v=getComputedStyle(t).getPropertyValue("--rx-ctx-width"),I=parseFloat(v);if(!Number.isNaN(I)&&I>0)return I;const D=n.getSizeClass();return D==="phone"?He:lr[D]}e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(L())));function q(v,I){var X;const D=n.getSizeClass();if(D==="phone")return;const U=dr(v,t.clientWidth||1200,D);t.style.setProperty("--rx-ctx-width",`${U}px`),e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(U))),b&&be(t,{right:U}),I&&((X=n.onWidthChange)==null||X.call(n,U))}let ee=!1,se=0,ae=0;function oe(v){ee=!0,se=v.clientX,ae=L(),t.classList.add("right-sidebar-resizing"),s.addEventListener("pointermove",Q),s.addEventListener("pointerup",te)}function Q(v){ee&&q(ae-(v.clientX-se),!1)}function te(){ee&&(ee=!1,t.classList.remove("right-sidebar-resizing"),s.removeEventListener("pointermove",Q),s.removeEventListener("pointerup",te),q(L(),!0))}function re(v){v.key==="ArrowLeft"?(v.preventDefault(),q(L()+et,!0)):v.key==="ArrowRight"&&(v.preventDefault(),q(L()-et,!0))}e.resizeHandle.addEventListener("pointerdown",oe),e.resizeHandle.addEventListener("keydown",re);const pe=kt(t,{onSwipe:(v,I,D)=>{const U=yt(D,e.root,t),X=vt(U,v,I,h());!b&&X.action!==null||(X.action==="cycle-next"?T(1):X.action==="cycle-prev"?T(-1):X.action==="close"&&ne())}});function ie(){b||(b=!0,t.classList.add("right-sidebar-open"),q(L(),!1),O.render(),o==="notes"&&(g==null||g.refresh()))}function ne(){var v;b&&(b=!1,t.classList.remove("right-sidebar-open"),be(t,{right:0}),(v=n.onClose)==null||v.call(n))}function he(){b?ne():ie()}function fe(v){b||ie(),A("glossary"),r.getGlossaryTerms().then(I=>{d.setTerms(I),d.scrollToAndFlash(v)})}function xe(){b&&(n.getSizeClass()==="phone"?be(t,{right:0}):be(t,{right:L()}))}_(l.current);function de(){k||(k=!0,u&&clearTimeout(u),z(),e.searchInput.removeEventListener("input",H),e.openInMainBtn.removeEventListener("click",F),e.closeBtn.removeEventListener("click",Y),a.removeEventListener("click",j),e.resizeHandle.removeEventListener("pointerdown",oe),s.removeEventListener("pointermove",Q),s.removeEventListener("pointerup",te),e.resizeHandle.removeEventListener("keydown",re),pe.destroy(),e.contextTabBtn.removeEventListener("click",M),e.notesTabBtn.removeEventListener("click",S),g==null||g.destroy(),e.glossaryTabBtn.removeEventListener("click",N),d.destroy(),O.destroy(),y==null||y.destroy(),t.classList.remove("right-sidebar-open","right-sidebar-resizing"),be(t,{right:0}),e.root.remove(),a.remove())}return{open:ie,close:ne,toggle:he,isOpen:()=>b,destroy:de,refreshLayout:xe,openGlossaryTerm:fe}}function Ae(t,r){const n=document.createElement("button");return n.type="button",n.className=r,n.setAttribute("aria-label",t),n}function Hr(t){const r=t.createElement("div");r.className="rx-playback-bar",r.setAttribute("role","group"),r.setAttribute("aria-label","Narration transport");const n=Ae("Skip back 15 seconds","rx-playback-icon-btn rx-playback-skip-back");n.innerHTML=we("skip_back");const s=Ae("Play","rx-playback-icon-btn rx-playback-play-pause");s.setAttribute("aria-pressed","false"),s.innerHTML=we("play");const e=Ae("Skip forward 15 seconds","rx-playback-icon-btn rx-playback-skip-forward");e.innerHTML=we("skip_forward");const a=Ae("Sleep timer","rx-playback-icon-btn rx-playback-sleep");a.setAttribute("aria-pressed","false"),a.innerHTML=we("sleep");const i=Ae("Playback speed","rx-playback-rate-btn");i.textContent="1x";const l=t.createElement("div");l.className="rx-playback-info";const d=t.createElement("span");d.className="rx-playback-chapter",d.setAttribute("aria-live","polite");const o=t.createElement("span");return o.className="rx-playback-position",o.textContent="0:00",l.append(d,o),r.append(n,s,e,a,l,i),{root:r,skipBackBtn:n,playPauseBtn:s,skipForwardBtn:e,sleepBtn:a,rateBtn:i,chapterLabel:d,positionLabel:o}}const Or=`
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
`;class Fr{constructor(){W(this,"timeline",null);W(this,"activeAudioIndex",0)}setTimeline(r){this.timeline=r,this.activeAudioIndex=0}clear(){this.timeline=null,this.activeAudioIndex=0}hasTimeline(){return this.timeline!==null}itemFor(r){const n=this.timeline;if(!n)return null;const s=a=>a.beginSec<=r&&(a.endSec===null||r<a.endSec);let e=n.items.filter(a=>a.audioIndex===this.activeAudioIndex&&s(a));if(e.length===0){e=n.items.filter(s);const a=e[0];a&&(this.activeAudioIndex=a.audioIndex)}return e.length===0?null:e.reduce((a,i)=>i.beginSec>a.beginSec?i:a)}textHrefFor(r){var n;return((n=this.itemFor(r))==null?void 0:n.textHref)??null}}const it="reactor-playback-stylesheet",Pe=15,Be=[.75,1,1.25,1.5,1.75,2];function Rr(t){if(t.getElementById(it))return;const r=t.createElement("style");r.id=it,r.textContent=Or,t.head.appendChild(r)}function $r(t){const r=Number.isFinite(t)&&t>0?t:0,n=Math.floor(r),s=Math.floor(n/60),e=n%60;return`${s}:${String(e).padStart(2,"0")}`}function lt(t){return Be.reduce((r,n)=>Math.abs(n-t)<Math.abs(r-t)?n:r,Be[0]??1)}function _r(t,r,n,s={}){const e=t.ownerDocument??document;Rr(e);let a=null,i=!1,l=!1,d=!1,o=!1,y=0,b=1,k=!1,u=!1,p=0,g=!1,f=!1,h=Pe,T=Pe,A="shell";const M=new Fr;function N(L,q=null,ee=null){n.emitIntent({type:"playback",action:L,positionSec:q,rate:ee})}const S=()=>N(o?"pause":"play"),C=()=>N("seek",Math.max(0,y-h)),O=()=>N("seek",y+T),P=()=>N("sleepTimer"),K=()=>{const L=Be.indexOf(lt(b)),q=Be[(L+1)%Be.length]??1;N("rateChange",null,q)};function G(){a&&(a.playPauseBtn.setAttribute("aria-pressed",String(o)),a.playPauseBtn.setAttribute("aria-label",o?"Pause":"Play"),a.playPauseBtn.innerHTML=we(o?"pause":"play"),a.sleepBtn.setAttribute("aria-pressed",String(f)),a.positionLabel.textContent=$r(y),a.rateBtn.textContent=`${lt(b)}x`,$())}function V(){if(!a)return;const L=a.root.classList.contains("rx-playback-chrome-hidden");be(t,{bottom:L?0:a.root.offsetHeight||56})}function $(){a&&(a.root.classList.toggle("rx-playback-chrome-hidden",!k||!g&&!o),V())}function _(L){a&&a.chapterLabel.textContent!==(L??"")&&(a.chapterLabel.textContent=L??"")}function R(){i||l||(i=!0,a=Hr(e),a.root.classList.toggle("e-ink",!!s.eink),t.appendChild(a.root),a.playPauseBtn.addEventListener("click",S),a.skipBackBtn.addEventListener("click",C),a.skipForwardBtn.addEventListener("click",O),a.rateBtn.addEventListener("click",K),a.sleepBtn.addEventListener("click",P),G(),x())}function x(){!i||!u||A==="host"||(p+=1,r.narrationPrepare(p))}function B(){if(!i||!u||A==="host")return;const L=M.textHrefFor(y);L?r.narrationHighlight(L):r.narrationUnhighlight()}function H(L){switch(L.type){case"loaded":u=L.hasMediaOverlay,M.clear(),x();break;case"relocate":_(L.chapterTitle);break;case"narrationTimeline":L.generation===p&&(M.setTimeline(L),B());break;case"narrationTimelineError":L.generation===p&&M.clear();break}}const E=r.on(H);r.replayLastEvents(H);function z(L){if(L.type==="configure"){if(d)return;d=!0,A=L.narrationFollow??"shell",L.capabilities.playback&&R()}else if(L.type==="setPlaybackState"){if(!i)return;o=L.playing,y=L.positionSec,b=L.rate,k=L.active!==!1,f=L.sleepTimerActive===!0,h=L.skipBackSec??Pe,T=L.skipForwardSec??Pe,G(),B()}}const F=n.onCommand(z),Y=n.getConfig();Y&&z(Y);function j(){l||(l=!0,E(),F(),a&&(a.playPauseBtn.removeEventListener("click",S),a.skipBackBtn.removeEventListener("click",C),a.skipForwardBtn.removeEventListener("click",O),a.rateBtn.removeEventListener("click",K),a.sleepBtn.removeEventListener("click",P),a.root.remove(),be(t,{bottom:0})))}return{isVisible:()=>i,setChromeVisible:L=>{g=L,$()},destroy:j}}const De={highlight:"Highlight",underline:"Underline",strikethrough:"Strikethrough",squiggly:"Squiggly underline"};function Dr(t){const r=t.createElement("div");r.className="rx-anno-popover",r.setAttribute("role","dialog"),r.setAttribute("aria-label","Annotation"),r.hidden=!0;const n=t.createElement("div");n.className="rx-anno-status",n.setAttribute("aria-live","polite");const s=t.createElement("button");s.type="button",s.className="rx-icon-btn rx-anno-close",s.setAttribute("aria-label","Close"),s.textContent="✕";const e=t.createElement("div");e.className="rx-anno-header",e.append(n,s);const a=t.createElement("div");a.className="rx-anno-colors",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Colour");const i=Lt.map(f=>{const h=t.createElement("button");return h.type="button",h.className="rx-anno-swatch",h.style.setProperty("--rx-anno-swatch-color",f.value),h.setAttribute("role","radio"),h.setAttribute("aria-checked","false"),h.setAttribute("aria-label",f.label),h.dataset.color=f.value,a.append(h),h}),l=t.createElement("div");l.className="rx-anno-styles",l.setAttribute("role","group"),l.setAttribute("aria-label","Mark style");const d={};for(const f of Object.keys(De)){const h=t.createElement("button");h.type="button",h.className=`rx-anno-style rx-anno-style-${f}`,h.textContent=De[f],h.setAttribute("aria-label",De[f]),h.dataset.style=f,l.append(h),d[f]=h}const o=t.createElement("button");o.type="button",o.className="rx-anno-note-toggle",o.textContent="Note",o.setAttribute("aria-expanded","false");const y=t.createElement("div");y.className="rx-anno-note-form",y.hidden=!0;const b=t.createElement("textarea");b.className="rx-anno-note-textarea",b.setAttribute("aria-label","Note text"),b.rows=3;const k=t.createElement("div");k.className="rx-anno-note-actions";const u=t.createElement("button");u.type="button",u.className="rx-anno-note-save",u.textContent="Save";const p=t.createElement("button");p.type="button",p.className="rx-anno-note-cancel",p.textContent="Cancel",k.append(p,u),y.append(b,k);const g=t.createElement("button");return g.type="button",g.className="rx-anno-delete",g.textContent="Delete",g.hidden=!0,r.append(e,a,l,o,y,g),{root:r,colorRow:a,colorButtons:i,styleRow:l,styleButtons:d,noteToggleBtn:o,noteForm:y,noteTextarea:b,noteSaveBtn:u,noteCancelBtn:p,deleteBtn:g,closeBtn:s,statusLabel:n}}const Gr=`
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
`,ct="reactor-annotations-stylesheet";function Kr(t){return t==="underline"||t==="squiggly"?"underline":"highlight"}class Wr{constructor(r=500){W(this,"map",new Map);this.cap=r}get(r){return this.map.get(r)}addAll(r){for(const n of r)for(this.map.delete(n.cfi),this.map.set(n.cfi,n);this.map.size>this.cap;){const s=this.map.keys().next().value;if(s===void 0)break;this.map.delete(s)}}}function Vr({shellRoot:t,core:r,hostChannel:n,options:s={}}){const e=t.ownerDocument??document;if(!e.getElementById(ct)){const x=e.createElement("style");x.id=ct,x.textContent=Gr,e.head.appendChild(x)}const a=Dr(e);t.append(a.root);const i=new Wr;let l=Oe,d=!1,o=null,y=null;function b(){o=null,y=null,a.root.hidden=!0,a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}function k(x){const B=t.getBoundingClientRect(),H=x?x.left-B.left:(t.clientWidth||300)/2-140,E=x?x.bottom-B.top+8:60,z=Math.max(0,(t.clientWidth||300)-288);a.root.style.left=`${Math.min(Math.max(0,H),z)}px`,a.root.style.top=`${Math.max(0,E)}px`}function u(x){l=x;for(const B of a.colorButtons)B.setAttribute("aria-checked",String(B.dataset.color===x))}function p(x){for(const[B,H]of Object.entries(a.styleButtons))H.setAttribute("aria-pressed",String(B===x))}function g(x,B,H){o={kind:"create",cfi:x,text:B},a.statusLabel.textContent="Add mark",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.noteTextarea.value="",u(l),p(null),a.root.hidden=!1,k(H)}function f(x,B){o={kind:"edit",note:x},a.statusLabel.textContent="Edit mark",a.deleteBtn.hidden=!1,a.noteForm.hidden=!0,a.noteTextarea.value=x.note??"",u(x.color??Oe),p(x.style??(x.kind==="underline"?"underline":"highlight")),a.root.hidden=!1,k(B)}function h(x,B){o=null,y=x,a.statusLabel.textContent="Loading…",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.root.hidden=!1,k(B),n.emitIntent({type:"notesPageRequest",offset:0,limit:1,filter:null,sort:null,query:`cfi:${x}`})}function T(x){if(x.type==="selection"&&x.cfi)g(x.cfi,x.text,x.rect);else if(x.type==="selectionCleared")(o==null?void 0:o.kind)==="create"&&b();else if(x.type==="annotationTap"){if(!x.cfi)return;const B=i.get(x.cfi);B?f(B,x.rect):h(x.cfi,x.rect)}}const A=r.on(T);function M(x){if(x.type==="setNotes"&&(i.addAll(x.items),y)){const B=x.items.find(H=>H.cfi===y);if(B){const H=a.root.hidden?null:{left:parseFloat(a.root.style.left||"0"),top:parseFloat(a.root.style.top||"0"),bottom:0};f(B,H)}else b()}}const N=n.onCommand(M);function S(x){(o==null?void 0:o.kind)==="create"&&(n.emitIntent({type:"annotationCreate",cfi:o.cfi,kind:Kr(x),color:l,style:x,text:o.text,note:null}),r.clearSelection(),b())}function C(x){(o==null?void 0:o.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:o.note.id,color:l,style:x,note:o.note.note}),b())}function O(x){const H=x.currentTarget.dataset.color??Oe;u(H),(o==null?void 0:o.kind)==="edit"&&n.emitIntent({type:"annotationUpdate",id:o.note.id,color:H,style:o.note.style,note:o.note.note})}for(const x of a.colorButtons)x.addEventListener("click",O);const P={highlight:()=>(o==null?void 0:o.kind)==="create"?S("highlight"):C("highlight"),underline:()=>(o==null?void 0:o.kind)==="create"?S("underline"):C("underline"),strikethrough:()=>(o==null?void 0:o.kind)==="create"?S("strikethrough"):C("strikethrough"),squiggly:()=>(o==null?void 0:o.kind)==="create"?S("squiggly"):C("squiggly")};for(const[x,B]of Object.entries(a.styleButtons))B.addEventListener("click",P[x]);function K(){const x=a.noteForm.hidden;a.noteForm.hidden=!x,a.noteToggleBtn.setAttribute("aria-expanded",String(x)),x&&a.noteTextarea.focus()}a.noteToggleBtn.addEventListener("click",K);function G(){a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}a.noteCancelBtn.addEventListener("click",G);function V(){const x=a.noteTextarea.value.trim()||null;(o==null?void 0:o.kind)==="create"?(n.emitIntent({type:"annotationCreate",cfi:o.cfi,kind:"note",color:l,style:null,text:o.text,note:x}),r.clearSelection(),b()):(o==null?void 0:o.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:o.note.id,color:o.note.color,style:o.note.style,note:x}),b())}a.noteSaveBtn.addEventListener("click",V);function $(){(o==null?void 0:o.kind)==="edit"&&(n.emitIntent({type:"annotationDelete",id:o.note.id}),b())}a.deleteBtn.addEventListener("click",$);const _=()=>b();a.closeBtn.addEventListener("click",_);function R(){if(!d){d=!0,A(),N();for(const x of a.colorButtons)x.removeEventListener("click",O);for(const[x,B]of Object.entries(a.styleButtons))B.removeEventListener("click",P[x]);a.noteToggleBtn.removeEventListener("click",K),a.noteCancelBtn.removeEventListener("click",G),a.noteSaveBtn.removeEventListener("click",V),a.deleteBtn.removeEventListener("click",$),a.closeBtn.removeEventListener("click",_),a.root.remove()}}return{isOpen:()=>!a.root.hidden,close:b,destroy:R}}const qr='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function Ur(t,r,n){const s=document.createElement("button");return s.type="button",s.className=n,s.setAttribute("aria-label",t),s.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,s}function ke(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-toggle",n.setAttribute("aria-pressed","false"),n.setAttribute("data-setting",r),n.textContent=t,n}function Me(t,r,n){const s=document.createElement("div");s.className=`rx-settings-pills ${n}`,s.setAttribute("role","radiogroup"),s.setAttribute("aria-label",t);for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-settings-pill",a.setAttribute("role","radio"),a.setAttribute("aria-checked","false"),a.setAttribute("data-value",e.id),a.textContent=e.label,s.appendChild(a)}return s}function ue(t,r,n,s){const e=document.createElement("div");e.className="rx-settings-slider-row";const a=document.createElement("div");a.className="rx-settings-slider-label";const i=document.createElement("span");i.textContent=t;const l=document.createElement("span");l.className="rx-settings-slider-value",a.append(i,l);const d=document.createElement("input");return d.type="range",d.className="rx-settings-slider",d.min=String(r),d.max=String(n),d.step=String(s),d.setAttribute("aria-label",t),e.append(a,d),{row:e,input:d,value:l}}function Yr(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-tab",n.setAttribute("role","tab"),n.setAttribute("aria-selected","false"),n.setAttribute("data-tab",t),n.id=`rx-settings-tab-${t}`,n.textContent=r,n}function Te(t){const r=document.createElement("div");return r.className="rx-settings-panel",r.setAttribute("role","tabpanel"),r.setAttribute("data-panel",t),r.setAttribute("aria-labelledby",`rx-settings-tab-${t}`),r.hidden=!0,r}function jr(t){const r=document.createElement("div");r.className="rx-settings-scrim";const n=document.createElement("div");n.className="rx-settings-sheet",n.setAttribute("role","dialog"),n.setAttribute("aria-label","Text settings"),n.tabIndex=-1;const s=document.createElement("div");s.className="rx-settings-head";const e=document.createElement("h3");e.className="rx-settings-title",e.textContent="Text settings";const a=Ur("Close settings",qr,"rx-icon-btn rx-settings-close");s.append(e,a);const i=document.createElement("div");i.className="rx-settings-scope",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Settings scope");const l=document.createElement("button");l.type="button",l.className="rx-settings-scope-btn",l.setAttribute("role","radio"),l.setAttribute("aria-checked","true"),l.setAttribute("data-scope","global"),l.textContent="Global";const d=document.createElement("button");d.type="button",d.className="rx-settings-scope-btn",d.setAttribute("role","radio"),d.setAttribute("aria-checked","false"),d.setAttribute("data-scope","book"),d.textContent="This book",i.append(l,d);const o=document.createElement("div");o.className="rx-settings-tabs",o.setAttribute("role","tablist");const y=[["typography","Typography"],["layout","Layout"],["theme","Theme"],["controls","Controls"],["playback","Playback"]],b={};for(const[oe,Q]of y){const te=Yr(oe,Q);b[oe]=te,o.appendChild(te)}const k=document.createElement("div");k.className="rx-settings-body";const u=Te("typography"),p=ue("Font size",13,28,1),g=ue("Paragraph spacing",0,2,.1),f=Me("Typeface",[],"rx-settings-font-pills");u.append(p.row,f,g.row);const h=Te("layout"),T=Me("Reading mode",[{id:"paginated",label:"Paginated"},{id:"scrolled",label:"Scrolling"}],"rx-settings-flow-pills"),A=Me("Columns",[{id:"1",label:"1 column"},{id:"2",label:"2 columns"}],"rx-settings-columns-pills"),M=document.createElement("div");M.className="rx-settings-margins-group";const N=document.createElement("div");N.className="rx-settings-margins-head";const S=document.createElement("span");S.className="rx-settings-margins-label",S.textContent="Margins";const C=ke("Link left and right margins","linkSideMargins");C.classList.add("rx-settings-link-toggle"),N.append(S,C);const O=ue("Top",0,96,4),P=ue("Bottom",0,96,4),K=ue("Left",0,96,4),G=ue("Right",0,96,4);M.append(N,O.row,P.row,K.row,G.row);const V=ue("Line spacing",1.2,1.95,.05),$=ke("Justify text","justify"),_=ke("Hyphenate","hyphenate"),R=ke("Use book's own styling","useBookLayout");h.append(T,A,M,V.row,$,_,R);const x=Te("theme"),B=document.createElement("div");B.className="rx-settings-swatches",B.setAttribute("role","radiogroup"),B.setAttribute("aria-label","Theme"),x.append(B);const H=Te("controls"),E=ke("Swipe to turn pages","swipe"),z=Me("Tap zone preset",[],"rx-settings-tapzone-pills"),F=document.createElement("div");F.className="rx-settings-volumekeys",F.hidden=!0;const Y=ke("Volume keys turn pages","volumeKeys");F.append(Y),H.append(E,z,F);const j=Te("playback"),L=document.createElement("p");L.className="rx-settings-empty",L.textContent="No narration provider for this book.";const q=document.createElement("div");q.className="rx-settings-playback-controls",q.hidden=!0;const ee=ue("Narration speed",.5,3,.1),se=ue("Skip forward (seconds)",5,60,5);q.append(ee.row,se.row),j.append(L,q);const ae=document.createElement("div");return ae.className="rx-settings-actions-foot",ae.hidden=!0,k.append(u,h,x,H,j,ae),n.append(s,i,o,k),t.append(r,n),{root:n,scrim:r,closeBtn:a,scopeGlobalBtn:l,scopeBookBtn:d,tabsRow:o,tabButtons:b,panels:{typography:u,layout:h,theme:x,controls:H,playback:j},fontSizeInput:p.input,fontSizeValue:p.value,paragraphSpacingInput:g.input,paragraphSpacingValue:g.value,fontFamilyPills:f,flowPills:T,columnsPills:A,linkSideMarginsToggle:C,marginTopInput:O.input,marginTopValue:O.value,marginBottomInput:P.input,marginBottomValue:P.value,marginLeftInput:K.input,marginLeftValue:K.value,marginRightInput:G.input,marginRightValue:G.value,lineHeightInput:V.input,lineHeightValue:V.value,justifyToggle:$,hyphenateToggle:_,useBookLayoutToggle:R,themeSwatches:B,swipeToggle:E,tapZonePills:z,volumeKeysRow:F,volumeKeysToggle:Y,playbackEmpty:L,playbackControls:q,narrationSpeedInput:ee.input,narrationSpeedValue:ee.value,skipForwardInput:se.input,skipForwardValue:se.value,actionsFoot:ae}}const Zr=`
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
`,dt={fontSize:16,lineHeight:1.5,fontFamily:null,paragraphSpacing:0,maxColumnCount:2,gap:.05,maxInlineSize:720,maxBlockSize:1440,justify:!0,hyphenate:!0,isDark:!1,themeName:"default",flow:"paginated",useBookLayout:!0,marginTop:40,marginBottom:40,marginLeft:40,marginRight:40,linkSideMargins:!0},Ge=[{id:"light",label:"Light",themeName:"default",isDark:!1,swatchBg:"#ffffff",swatchFg:"#000000"},{id:"sepia",label:"Sepia",themeName:"sepia",isDark:!1,swatchBg:"#f1e8d0",swatchFg:"#5b4636"},{id:"dark",label:"Dark",themeName:"default",isDark:!0,swatchBg:"#222222",swatchFg:"#e0e0e0"},{id:"amoled",label:"AMOLED",themeName:"amoled",isDark:!0,swatchBg:"#000000",swatchFg:"#ffffff"}];function Xr(t,r){return Ge.find(n=>n.themeName===t&&n.isDark===r)??Ge.find(n=>n.id===(r?"dark":"light"))}const ut=[{id:"publisher",label:"Publisher",value:null},{id:"serif",label:"Serif",value:'Georgia, "Iowan Old Style", "Times New Roman", serif'},{id:"sans",label:"Sans-serif",value:'-apple-system, "Segoe UI", Roboto, Arial, sans-serif'},{id:"mono",label:"Monospace",value:'"Courier New", monospace'}];function Jr(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function Qr(t){let r=!1;function n(s){if(!r||s.key!=="Tab")return;const e=Jr(t);if(e.length===0){s.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],l=t.ownerDocument.activeElement;s.shiftKey&&l===a?(s.preventDefault(),i.focus()):!s.shiftKey&&l===i&&(s.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const pt="reactor-settings-stylesheet",en=["typography","layout","theme","controls","playback"];function tn(t){if(t.getElementById(pt))return;const r=t.createElement("style");r.id=pt,r.textContent=Zr,t.head.appendChild(r)}function rn(t,r,n){var D,U,X,ve,ye,Ee,Se,Ce,Ne,ze;const s=t.ownerDocument??document;tn(s);const e=jr(t),a=Qr(e.root),i={global:{...dt},book:{...dt}};let l="global",d="typography",o=!1,y=!1,b=((U=(D=n.hostChannel)==null?void 0:D.getConfig())==null?void 0:U.capabilities.playback)??!1,k=null,u=n.volumeKeysCapability??((ve=(X=n.hostChannel)==null?void 0:X.getConfig())==null?void 0:ve.capabilities.volumeKeys)??!1;const p=(Ee=(ye=n.hostChannel)==null?void 0:ye.getConfig())==null?void 0:Ee.controlsState;e.volumeKeysRow.hidden=!u;function g(c){t.classList.remove("theme-dark","theme-amoled"),c.themeName==="amoled"?t.classList.add("theme-amoled"):c.isDark&&t.classList.add("theme-dark")}function f(){return i[l]}function h(){const c=f().fontFamily;for(const w of Array.from(e.fontFamilyPills.children)){const J=ut.find(ce=>ce.id===w.dataset.value);w.setAttribute("aria-checked",String((J==null?void 0:J.value)===c))}}function T(){const c=Xr(f().themeName,f().isDark);for(const w of Array.from(e.themeSwatches.children))w.setAttribute("aria-checked",String(w.dataset.value===c.id))}function A(c,w){for(const J of Array.from(c.children))J.setAttribute("aria-checked",String(J.dataset.value===w))}function M(){e.playbackEmpty.hidden=b,e.playbackControls.hidden=!b}function N(){const c=f().useBookLayout;for(const w of Array.from(e.fontFamilyPills.children))w.disabled=c;e.paragraphSpacingInput.disabled=c,e.lineHeightInput.disabled=c,e.justifyToggle.disabled=c,e.hyphenateToggle.disabled=c}function S(){const c=f();e.fontSizeInput.value=String(c.fontSize),e.fontSizeInput.setAttribute("aria-valuetext",`${c.fontSize}px`),e.fontSizeValue.textContent=`${c.fontSize}px`,e.paragraphSpacingInput.value=String(c.paragraphSpacing),e.paragraphSpacingValue.textContent=`${c.paragraphSpacing}em`,h(),A(e.flowPills,c.flow),A(e.columnsPills,String(c.maxColumnCount)),e.marginTopInput.value=String(c.marginTop),e.marginTopInput.setAttribute("aria-valuetext",`${c.marginTop}px`),e.marginTopValue.textContent=`${c.marginTop}px`,e.marginBottomInput.value=String(c.marginBottom),e.marginBottomInput.setAttribute("aria-valuetext",`${c.marginBottom}px`),e.marginBottomValue.textContent=`${c.marginBottom}px`,e.marginLeftInput.value=String(c.marginLeft),e.marginLeftInput.setAttribute("aria-valuetext",`${c.marginLeft}px`),e.marginLeftValue.textContent=`${c.marginLeft}px`,e.marginRightInput.value=String(c.marginRight),e.marginRightInput.setAttribute("aria-valuetext",`${c.marginRight}px`),e.marginRightValue.textContent=`${c.marginRight}px`,e.linkSideMarginsToggle.setAttribute("aria-pressed",String(c.linkSideMargins)),e.lineHeightInput.value=String(c.lineHeight),e.lineHeightValue.textContent=c.lineHeight.toFixed(2),e.justifyToggle.setAttribute("aria-pressed",String(c.justify)),e.hyphenateToggle.setAttribute("aria-pressed",String(c.hyphenate)),e.useBookLayoutToggle.setAttribute("aria-pressed",String(c.useBookLayout)),N(),T(),M(),e.scopeGlobalBtn.setAttribute("aria-checked",String(l==="global")),e.scopeBookBtn.setAttribute("aria-checked",String(l==="book"))}function C(c){var w;i[l]={...i[l],...c},S(),r.applyStyles(i[l]),g(i[l]),(w=n.hostChannel)==null||w.emitIntent({type:"settingsChange",scope:l,settings:i[l]})}function O(){C({fontSize:Number(e.fontSizeInput.value)})}e.fontSizeInput.addEventListener("change",O);function P(){C({paragraphSpacing:Number(e.paragraphSpacingInput.value)})}e.paragraphSpacingInput.addEventListener("change",P);for(const c of ut){const w=document.createElement("button");w.type="button",w.className="rx-settings-pill",w.setAttribute("role","radio"),w.setAttribute("aria-checked","false"),w.setAttribute("data-value",c.id),w.textContent=c.label,w.addEventListener("click",()=>C({fontFamily:c.value})),e.fontFamilyPills.appendChild(w)}function K(c){const w=c.currentTarget.dataset.value;C({flow:w})}for(const c of Array.from(e.flowPills.children))c.addEventListener("click",K);function G(c){const w=Number(c.currentTarget.dataset.value);C({maxColumnCount:w})}for(const c of Array.from(e.columnsPills.children))c.addEventListener("click",G);function V(){C({marginTop:Number(e.marginTopInput.value)})}e.marginTopInput.addEventListener("change",V);function $(){C({marginBottom:Number(e.marginBottomInput.value)})}e.marginBottomInput.addEventListener("change",$);function _(){const c=Number(e.marginLeftInput.value);f().linkSideMargins?C({marginLeft:c,marginRight:c}):C({marginLeft:c})}e.marginLeftInput.addEventListener("change",_);function R(){const c=Number(e.marginRightInput.value);f().linkSideMargins?C({marginLeft:c,marginRight:c}):C({marginRight:c})}e.marginRightInput.addEventListener("change",R);function x(){C({linkSideMargins:!f().linkSideMargins})}e.linkSideMarginsToggle.addEventListener("click",x);function B(){C({lineHeight:Number(e.lineHeightInput.value)})}e.lineHeightInput.addEventListener("change",B);function H(){C({justify:!f().justify})}e.justifyToggle.addEventListener("click",H);function E(){C({hyphenate:!f().hyphenate})}e.hyphenateToggle.addEventListener("click",E);function z(){C({useBookLayout:!f().useBookLayout})}e.useBookLayoutToggle.addEventListener("click",z);for(const c of Ge){const w=document.createElement("button");w.type="button",w.className="rx-settings-swatch",w.setAttribute("role","radio"),w.setAttribute("aria-checked","false"),w.setAttribute("aria-label",c.label),w.setAttribute("data-value",c.id);const J=document.createElement("span");J.className="rx-settings-swatch-dot",J.style.background=c.swatchBg;const ce=document.createElement("span");ce.textContent=c.label,w.append(J,ce),w.addEventListener("click",()=>C({themeName:c.themeName,isDark:c.isDark})),e.themeSwatches.appendChild(w)}let F=(p==null?void 0:p.swipeEnabled)??!0,Y=(p==null?void 0:p.volumeKeysEnabled)??!1;r.setSwipe(F);const j=(p==null?void 0:p.tapZonePresets)??[];let L=(p==null?void 0:p.tapZonePreset)??((Se=j[0])==null?void 0:Se.id);e.tapZonePills.hidden=j.length===0;for(const c of j){const w=document.createElement("button");w.type="button",w.className="rx-settings-pill",w.setAttribute("role","radio"),w.setAttribute("aria-checked","false"),w.setAttribute("data-value",c.id),w.textContent=c.label,w.addEventListener("click",()=>se(c.id)),e.tapZonePills.appendChild(w)}L&&A(e.tapZonePills,L);function q(){var c;(c=n.hostChannel)==null||c.emitIntent({type:"controlsChange",swipeEnabled:F,volumeKeysEnabled:Y,...j.length>0?{tapZonePreset:L}:{}})}function ee(){F=!F,e.swipeToggle.setAttribute("aria-pressed",String(F)),r.setSwipe(F),q()}e.swipeToggle.addEventListener("click",ee),e.swipeToggle.setAttribute("aria-pressed",String(F));function se(c){L=c,A(e.tapZonePills,L),q()}function ae(){Y=!Y,e.volumeKeysToggle.setAttribute("aria-pressed",String(Y)),q()}e.volumeKeysToggle.addEventListener("click",ae),e.volumeKeysToggle.setAttribute("aria-pressed",String(Y));function oe(){var w;const c=Number(e.narrationSpeedInput.value);e.narrationSpeedValue.textContent=`${c.toFixed(1)}x`,(w=n.hostChannel)==null||w.emitIntent({type:"playback",action:"rateChange",positionSec:null,rate:c})}e.narrationSpeedInput.addEventListener("input",()=>{e.narrationSpeedValue.textContent=`${Number(e.narrationSpeedInput.value).toFixed(1)}x`}),e.narrationSpeedInput.addEventListener("change",oe);function Q(){e.skipForwardValue.textContent=`${e.skipForwardInput.value}s`}e.skipForwardInput.addEventListener("input",Q),e.narrationSpeedInput.value="1",e.narrationSpeedValue.textContent="1.0x",e.skipForwardInput.value="30",e.skipForwardValue.textContent="30s";const te=((Ne=(Ce=n.hostChannel)==null?void 0:Ce.getConfig())==null?void 0:Ne.settingsActions)??[],re=new Map,pe=new Map,ie=new Map;for(const c of te){const w=document.createElement("button");w.type="button",w.className=c.styleHint==="accent"?"rx-settings-action-btn rx-settings-action-btn--accent":"rx-settings-action-btn",w.textContent=c.label,w.dataset.actionId=c.id,pe.set(c.id,c.enabled!==!1),ie.set(c.id,c.disabledScopes??[]),w.addEventListener("click",()=>{var J;(J=n.hostChannel)==null||J.emitIntent({type:"settingsAction",actionId:c.id,scope:l})}),re.set(c.id,w),e.actionsFoot.appendChild(w)}function ne(){for(const c of te){const w=re.get(c.id);w.disabled=!pe.get(c.id)||ie.get(c.id).includes(l)}}ne();function he(){let c=!1;for(const w of te){const J=re.get(w.id),ce=!w.tabs||w.tabs.includes(d);J.hidden=!ce,ce&&(c=!0)}e.actionsFoot.hidden=!c}he();function fe(c){c!==d&&(e.tabButtons[d].setAttribute("aria-selected","false"),e.panels[d].hidden=!0,d=c,e.tabButtons[d].setAttribute("aria-selected","true"),e.panels[d].hidden=!1,he())}for(const c of en)e.tabButtons[c].addEventListener("click",()=>fe(c));fe("typography"),e.tabButtons.typography.setAttribute("aria-selected","true"),e.panels.typography.hidden=!1;function xe(c){c!==l&&(l=c,S(),r.applyStyles(i[l]),g(i[l]),ne())}e.scopeGlobalBtn.addEventListener("click",()=>xe("global")),e.scopeBookBtn.addEventListener("click",()=>xe("book"));const de=(ze=n.hostChannel)==null?void 0:ze.onCommand(c=>{if(c.type==="setSettingsScope")i[c.scope]=c.settings,c.scope===l&&(S(),r.applyStyles(i[l]),g(i[l]));else if(c.type==="configure"&&(b=c.capabilities.playback,M(),u=n.volumeKeysCapability??c.capabilities.volumeKeys??!1,e.volumeKeysRow.hidden=!u,c.controlsState&&(F=c.controlsState.swipeEnabled,Y=c.controlsState.volumeKeysEnabled,e.swipeToggle.setAttribute("aria-pressed",String(F)),e.volumeKeysToggle.setAttribute("aria-pressed",String(Y)),r.setSwipe(F)),c.settingsActions)){for(const w of c.settingsActions)re.has(w.id)&&(pe.set(w.id,w.enabled!==!1),ie.set(w.id,w.disabledScopes??[]));ne()}});function ge(){var c;o||(o=!0,k=s.activeElement??null,t.classList.add("settings-open"),e.scrim.classList.add("visible"),a.activate(),e.root.focus({preventScroll:!0}),(c=n.onOpenChange)==null||c.call(n,!0))}function le(){var c,w;o&&(o=!1,t.classList.remove("settings-open"),e.scrim.classList.remove("visible"),a.deactivate(),(c=k==null?void 0:k.focus)==null||c.call(k),k=null,(w=n.onOpenChange)==null||w.call(n,!1))}function v(){o?le():ge()}e.closeBtn.addEventListener("click",le),e.scrim.addEventListener("click",le),S();function I(){y||(y=!0,de==null||de(),a.deactivate(),t.classList.remove("settings-open"),e.root.remove(),e.scrim.remove())}return{open:ge,close:le,toggle:v,isOpen:()=>o,getActiveSettings:()=>f(),getActiveScope:()=>l,destroy:I}}const nn={top:0,right:0,bottom:0,left:0};function ht(t,r){t.style.setProperty("--rx-inset-top",`${Math.max(0,r.top)}px`),t.style.setProperty("--rx-inset-right",`${Math.max(0,r.right)}px`),t.style.setProperty("--rx-inset-bottom",`${Math.max(0,r.bottom)}px`),t.style.setProperty("--rx-inset-left",`${Math.max(0,r.left)}px`)}const an=280,bt="reactor-shell-stylesheet";function sn(t){if(t.getElementById(bt))return;const r=t.createElement("style");r.id=bt,r.textContent=Bt,t.head.appendChild(r)}function on(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function ln(){const t=new Set;return{getChromeState:()=>({barsVisible:!1,sidebar:"none"}),onChromeState:r=>(t.add(r),()=>t.delete(r)),setBarsVisible:()=>{},refreshSizeClass:()=>{},destroy:()=>{t.clear()}}}function un(t,r,n={}){var w,J,ce,Ke,We,Ve,qe,Ue,Ye,je;if((n.chrome??"reactor")==="host")return ln();const e=t.ownerDocument??document;sn(e);const a=Tt(t),i=a.root;let l=!1,d=!1,o="none",y=!1,b=!1,k=null,u="shell",p=!1;const g=new Set;function f(){var Z;if(b)return;const m={barsVisible:d,sidebar:o};for(const Ie of g)Ie(m);(Z=n.hostChannel)==null||Z.emitIntent({type:"chromeState",barsVisible:d,sidebar:o})}function h(m){d!==m&&(d=m,i.classList.toggle("ui-visible",d),re==null||re.setChromeVisible(d),f())}function T(){h(!d)}const A=rr(i,m=>r.goTo(m),{eink:n.eink,onBack:()=>{var m;return(m=n.hostChannel)==null?void 0:m.emitIntent({type:"back"})},onSidebarChange:m=>{o=m?"left":"none",a.contentsBtn.setAttribute("aria-pressed",String(m)),f(),S()}});function M(){return i.classList.contains("size-desktop")}function N(){if(A.isOpen()){A.close();return}M()||Q.close(),U.close(),A.open()}a.contentsBtn.addEventListener("click",N);function S(){const m=i.classList.contains("size-desktop");be(i,{left:m&&A.isOpen()?an:0})}function C(){i.classList.toggle("reduced-motion",P||on())}function O(){i.classList.toggle("e-ink",P)}let P=((J=(w=n.hostChannel)==null?void 0:w.getConfig())==null?void 0:J.eink)??!!n.eink;O(),C(),ht(i,((Ke=(ce=n.hostChannel)==null?void 0:ce.getConfig())==null?void 0:Ke.insets)??nn);const K=(We=n.hostChannel)==null?void 0:We.onCommand(m=>{if(m.type==="toggleBars"){T();return}m.type==="configure"&&(P=m.eink,O(),C(),ht(i,m.insets),p||(p=!0,u=m.tapZonesOwner??"shell"))});function G(){const m=t.clientWidth||i.clientWidth,Z=Fe(m);i.classList.remove("size-phone","size-fold-tablet","size-desktop"),i.classList.add(`size-${Z}`),S()}G();function V(){G(),Q.refreshLayout()}const $=typeof ResizeObserver=="function"?new ResizeObserver(()=>V()):null;$==null||$.observe(t);const _=()=>V();$||window.addEventListener("resize",_);const R=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,x=()=>C();(Ve=R==null?void 0:R.addEventListener)==null||Ve.call(R,"change",x);function B(m,Z){if(u==="host")return;const Ie=It(m,l);Ie==="prev"?r.prev():Ie==="next"?r.next():T()}function H(m){m==="prev"?r.prev():m==="next"?r.next():T()}function E(m,Z){Z.key!=="Enter"&&Z.key!==" "||(Z.preventDefault(),H(m))}const z=()=>H(l?"next":"prev"),F=()=>H(l?"prev":"next"),Y=()=>H("toggle"),j=m=>E(l?"next":"prev",m),L=m=>E(l?"prev":"next",m),q=m=>E("toggle",m);a.zoneLeft.addEventListener("click",z),a.zoneRight.addEventListener("click",F),a.zoneCentre.addEventListener("click",Y),a.zoneLeft.addEventListener("keydown",j),a.zoneRight.addEventListener("keydown",L),a.zoneCentre.addEventListener("keydown",q);function ee(){return U.isOpen()?(U.close(),!0):D!=null&&D.isOpen()?(D.close(),!0):ve.isOpen()?(ve.close(),!0):Q.isOpen()?(te(),!0):A.isOpen()?(A.close(),!0):d?(h(!1),!0):!1}function se(m){const Z=Ht(m);Z&&(Ot(Z)&&m.preventDefault(),Z==="next"?r.next():Z==="prev"?r.prev():Z==="toggleBars"?T():Z==="escape"&&ee())}e.addEventListener("keydown",se);const ae=()=>r.historyBack(),oe=()=>r.historyForward();a.historyBackBtn.addEventListener("click",ae),a.historyForwardBtn.addEventListener("click",oe);const Q=Mr(i,r,{getSizeClass:()=>Fe(t.clientWidth||i.clientWidth),onWidthChange:n.onContextWidthChange,hostChannel:n.hostChannel,onClose:()=>{o="none",a.contextBtn.setAttribute("aria-pressed","false"),f()}});function te(){o==="right"?(Q.close(),o="none"):(M()||A.close(),U.close(),Q.open(),o="right"),a.contextBtn.setAttribute("aria-pressed",String(o==="right")),f()}a.contextBtn.addEventListener("click",te);const re=n.hostChannel?_r(i,r,n.hostChannel,{eink:n.eink}):null;let pe=new Set;function ie(){a.bookmarkBtn.setAttribute("aria-pressed",String(!!k&&pe.has(k)))}function ne(){!n.hostChannel||!k||n.hostChannel.emitIntent({type:"bookmarkToggle",cfi:k})}const he=(qe=n.hostChannel)==null?void 0:qe.onCommand(m=>{m.type==="setBookmarks"&&(pe=new Set(m.items.map(Z=>Z.cfi)),ie())});a.bookmarkBtn.addEventListener("click",ne);let fe=!1;function xe(m){fe||(fe=!0,a.narrationBtn.hidden=!m)}let de=!1;function ge(){a.narrationBtn.setAttribute("aria-pressed",String(de))}function le(){var m;(m=n.hostChannel)==null||m.emitIntent({type:"playback",action:de?"stop":"play",positionSec:null,rate:null})}const v=(Ue=n.hostChannel)==null?void 0:Ue.onCommand(m=>{m.type==="configure"?xe(m.capabilities.playback):m.type==="setPlaybackState"&&(de=m.active!==!1,ge())}),I=(Ye=n.hostChannel)==null?void 0:Ye.getConfig();I&&xe(I.capabilities.playback),a.narrationBtn.addEventListener("click",le);const D=n.hostChannel?Vr({shellRoot:i,core:r,hostChannel:n.hostChannel,options:{eink:n.eink}}):null,U=rn(i,r,{getSizeClass:()=>Fe(t.clientWidth||i.clientWidth),eink:n.eink,hostChannel:n.hostChannel,volumeKeysCapability:n.volumeKeysCapability,onOpenChange:m=>{a.settingsBtn.setAttribute("aria-pressed",String(m))}});function X(){if(U.isOpen()){U.close();return}A.close(),Q.close(),o="none",a.contentsBtn.setAttribute("aria-pressed","false"),a.contextBtn.setAttribute("aria-pressed","false"),f(),U.open()}a.settingsBtn.addEventListener("click",X);const ve=Tr(i,r,{onOpenInGlossary:m=>{Q.openGlossaryTerm(m),o="right",a.contextBtn.setAttribute("aria-pressed","true"),f()}}),ye=(je=n.hostChannel)==null?void 0:je.onCommand(m=>{var Z;m.type==="dismiss"&&!ee()&&((Z=n.hostChannel)==null||Z.emitIntent({type:"back"}))}),Ee=()=>{y=!0},Se=()=>{y=!1,r.goToFraction(Number(a.scrubber.value)/1e3)};a.scrubber.addEventListener("pointerdown",Ee),a.scrubber.addEventListener("change",Se);function Ce(m){switch(m.type){case"loaded":l=m.isRtl,i.classList.toggle("is-rtl",l),A.setToc(m.toc),S();break;case"relocate":k=m.cfi??null,a.chapterLabel&&a.chapterLabel.textContent!==(m.chapterTitle??"")&&(a.chapterLabel.textContent=m.chapterTitle??""),!y&&typeof m.fraction=="number"&&(a.scrubber.value=String(Math.round(m.fraction*1e3))),A.setCurrentChapterTitle(m.chapterTitle),ie();break;case"history":a.historyBackBtn.disabled=!m.canGoBack,a.historyForwardBtn.disabled=!m.canGoForward;break;case"tap":B(m.x,m.y);break}}const Ne=r.on(Ce);r.replayLastEvents(Ce),f();function ze(){G()}function c(){var m;b||(b=!0,Ne(),$==null||$.disconnect(),$||window.removeEventListener("resize",_),(m=R==null?void 0:R.removeEventListener)==null||m.call(R,"change",x),e.removeEventListener("keydown",se),a.zoneLeft.removeEventListener("click",z),a.zoneRight.removeEventListener("click",F),a.zoneCentre.removeEventListener("click",Y),a.zoneLeft.removeEventListener("keydown",j),a.zoneRight.removeEventListener("keydown",L),a.zoneCentre.removeEventListener("keydown",q),a.historyBackBtn.removeEventListener("click",ae),a.historyForwardBtn.removeEventListener("click",oe),a.contextBtn.removeEventListener("click",te),a.bookmarkBtn.removeEventListener("click",ne),a.narrationBtn.removeEventListener("click",le),v==null||v(),he==null||he(),ye==null||ye(),K==null||K(),D==null||D.destroy(),Q.destroy(),re==null||re.destroy(),a.settingsBtn.removeEventListener("click",X),U.destroy(),ve.destroy(),a.scrubber.removeEventListener("pointerdown",Ee),a.scrubber.removeEventListener("change",Se),a.contentsBtn.removeEventListener("click",N),A.destroy(),g.clear(),i.classList.remove("reader-shell","ui-visible","e-ink","reduced-motion","is-rtl","size-phone","size-fold-tablet","size-desktop","settings-open"),a.zones.remove(),a.topBar.remove(),a.bottomBar.remove())}return{getChromeState:()=>({barsVisible:d,sidebar:o}),onChromeState:m=>(g.add(m),()=>g.delete(m)),setBarsVisible:h,refreshSizeClass:ze,destroy:c}}export{Ze as ZONE_FRACTION,Fe as computeSizeClass,Ot as isPreventableKey,_r as mountPlaybackBar,Mr as mountRightSidebar,rn as mountSettingsPanel,un as mountShell,Ht as resolveKeyboardAction,It as resolveTapZone};
