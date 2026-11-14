var lt=Object.defineProperty;var ct=(e,r,n)=>r in e?lt(e,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[r]=n;var G=(e,r,n)=>ct(e,typeof r!="symbol"?r+"":r,n);import{A as dt,D as ye}from"./index-BaP9s-KF.js";const ut={menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',bookmark:'<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',panel_right:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',back:'<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',forward:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',skip_back:'<polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/>',skip_forward:'<polygon points="13 19 22 12 13 5 13 19"/><polygon points="2 19 11 12 2 5 2 19"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>'};function be(e){return`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ut[e]}</svg>`}function le(e,r,n=!1){const o=document.createElement("button");return o.type="button",o.className="rx-icon-btn",o.setAttribute("aria-label",e),o.innerHTML=be(r),n&&o.setAttribute("aria-pressed","false"),o}function pt(e){e.classList.add("reader-shell");const r=document.createElement("div");r.className="rx-zones";const n=document.createElement("div");n.className="rx-zone rx-zone-left",n.setAttribute("role","button"),n.setAttribute("tabindex","0"),n.setAttribute("aria-label","Previous page");const o=document.createElement("div");o.className="rx-zone rx-zone-centre",o.setAttribute("role","button"),o.setAttribute("tabindex","0"),o.setAttribute("aria-label","Toggle bars");const t=document.createElement("div");t.className="rx-zone rx-zone-right",t.setAttribute("role","button"),t.setAttribute("tabindex","0"),t.setAttribute("aria-label","Next page"),r.append(n,o,t);const a=document.createElement("div");a.className="rx-bar rx-bar-top",a.setAttribute("role","toolbar");const i=le("Table of contents","menu",!0),l=le("Bookmark","bookmark",!0),c=le("Text settings","settings",!0),s=le("Open context panel","panel_right",!0),g=document.createElement("div");g.className="rx-bar-spacer",a.append(i,l,g,c,s);const b=document.createElement("div");b.className="rx-bar rx-bar-bottom";const h=document.createElement("div");h.className="rx-status-row",h.setAttribute("aria-live","polite");const d=le("Back","back");d.disabled=!0;const u=document.createElement("span");u.className="rx-chapter-label";const f=le("Forward","forward");f.disabled=!0,h.append(d,u,f);const y=document.createElement("input");return y.type="range",y.className="rx-scrubber",y.min="0",y.max="1000",y.step="1",y.value="0",y.setAttribute("aria-label","Reading position"),b.append(h,y),e.append(r,a,b),{root:e,zones:r,zoneLeft:n,zoneCentre:o,zoneRight:t,topBar:a,bottomBar:b,contentsBtn:i,bookmarkBtn:l,settingsBtn:c,contextBtn:s,historyBackBtn:d,historyForwardBtn:f,chapterLabel:u,scrubber:y}}const xt=`
.reader-shell {
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
`,bt=599,ht=1200;function ke(e){return e<=bt?"phone":e<=ht?"fold-tablet":"desktop"}const He=.3;function ft(e,r){const n=Math.min(1,Math.max(0,e));return n<He?r?"next":"prev":n>1-He?r?"prev":"next":"toggle"}const mt=new Set(["ArrowRight","ArrowDown","PageDown"," "]),gt=new Set(["ArrowLeft","ArrowUp","PageUp"]);function vt(e){return e.ctrlKey||e.metaKey||e.altKey?null:mt.has(e.key)?"next":gt.has(e.key)?"prev":e.key==="m"||e.key==="M"?"toggleBars":e.key==="Escape"?"escape":null}function yt(e){return e==="next"||e==="prev"}const kt='<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',wt='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function Fe(e,r){const n=document.createElement("button");return n.type="button",n.className="rx-icon-btn",n.setAttribute("aria-label",e),n.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,n}function Et(e){const r=document.createElement("div");r.className="rx-left-sidebar",r.setAttribute("aria-label","Table of contents"),r.tabIndex=-1;const n=document.createElement("div");n.className="rx-left-sidebar-scrim";const o=document.createElement("div");o.className="rx-sidebar-head";const t=Fe("Back",kt),a=document.createElement("h3");a.className="rx-sidebar-title",a.textContent="Contents";const i=Fe("Close contents",wt);i.classList.add("rx-left-sidebar-close"),o.append(t,a,i);const l=document.createElement("div");l.className="rx-left-sidebar-tabs",l.setAttribute("role","tablist");function c(T,A){const E=document.createElement("button");return E.type="button",E.className="rx-left-sidebar-tab",E.setAttribute("role","tab"),E.setAttribute("aria-selected","false"),E.setAttribute("data-tab",A),E.id=`rx-tab-${A}`,E.textContent=T,E}const s=c("Contents","contents"),g=c("Starred","starred"),b=c("Related","related");l.append(s,g,b);const h=document.createElement("div");h.className="rx-left-sidebar-body";function d(T){const A=document.createElement("div");return A.className="rx-sidebar-panel",A.setAttribute("role","tabpanel"),A.setAttribute("data-panel",T),A.setAttribute("aria-labelledby",`rx-tab-${T}`),A.hidden=!0,A}const u=d("contents"),f=document.createElement("div");f.className="rx-toc-scroll";const y=document.createElement("div");y.className="rx-toc-spacer";const m=document.createElement("div");m.className="rx-toc-window",m.setAttribute("role","list"),y.appendChild(m),f.appendChild(y),u.appendChild(f);const N=d("starred"),M=d("related");return h.append(u,N,M),r.append(o,l,h),e.append(n,r),{root:r,scrim:n,backBtn:t,closeBtn:i,title:a,tablist:l,tabContents:s,tabStarred:g,tabRelated:b,body:h,panelContents:u,tocScroll:f,tocSpacer:y,tocWindow:m,panelStarred:N,panelRelated:M}}const St=`
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
`;function tt(e,r=null,n=0){const o=[];for(let t=0;t<e.length;t++){const a=e[t],i=r===null?String(t):`${r}.${t}`;o.push({id:i,label:a.label,href:a.href,depth:n,hasChildren:a.subitems.length>0,parentId:r}),a.subitems.length>0&&o.push(...tt(a.subitems,i,n+1))}return o}function Ct(e,r){if(r.size===0)return e;const n=new Set,o=[];for(const t of e){if(t.parentId!==null&&(n.has(t.parentId)||r.has(t.parentId))){n.add(t.id);continue}o.push(t)}return o}function Lt(e,r){if(!r)return null;const n=Oe(r);let o=null;for(const t of e)if(t.href){if(t.href===r)return t.id;o===null&&Oe(t.href)===n&&(o=t)}return(o==null?void 0:o.id)??null}function At(e,r){if(!r)return null;for(const n of e)if(n.label===r)return n.id;return null}function Oe(e){const r=e.indexOf("#");return r===-1?e:e.slice(0,r)}function Tt(e,r,n,o,t=8){if(o===0||r<=0)return{start:0,end:-1};const a=Math.floor(e/r),i=Math.ceil(n/r),l=Math.max(0,a-t),c=Math.min(o-1,a+i+t);return{start:l,end:c}}const we=48;function Bt(e,r,n,o){const t=document.createElement("div");if(t.className="rx-toc-row",t.setAttribute("role","listitem"),t.style.paddingLeft=`${12+e.depth*18}px`,o&&t.classList.add("is-current"),e.hasChildren){const c=document.createElement("button");c.type="button",c.className="rx-toc-toggle";const s=!r.collapsed.has(e.id);c.setAttribute("aria-expanded",String(s)),c.setAttribute("aria-label",`${s?"Collapse":"Expand"} ${e.label}`),c.textContent=s?"▾":"▸",c.addEventListener("click",g=>{g.stopPropagation(),n.onToggleExpand(e)}),t.appendChild(c)}else{const c=document.createElement("span");c.className="rx-toc-toggle-spacer",t.appendChild(c)}const a=document.createElement("button");a.type="button",a.className="rx-toc-label",a.setAttribute("aria-label",e.label),o&&a.setAttribute("aria-current","true"),a.textContent=e.label,a.addEventListener("click",()=>n.onActivate(e)),t.appendChild(a);const i=document.createElement("button");i.type="button",i.className="rx-toc-star";const l=e.href?r.starred.has(e.href):!1;return i.setAttribute("aria-pressed",String(l)),i.setAttribute("aria-label",`${l?"Unstar":"Star"} ${e.label}`),i.textContent=l?"★":"☆",i.addEventListener("click",c=>{c.stopPropagation(),n.onToggleStar(e)}),t.appendChild(i),t}function Nt(e,r,n,o,t){const a=Ct(o.flat,o.collapsed),i=Lt(a,o.currentHref)??At(a,o.currentChapterTitle);r.style.height=`${a.length*we}px`;const l=e.clientHeight||1,{start:c,end:s}=Tt(e.scrollTop,we,l,a.length);n.replaceChildren(),n.style.transform=`translateY(${c*we}px)`;for(let g=c;g<=s;g++){const b=a[g];b&&n.appendChild(Bt(b,o,t,b.id===i))}}function zt(e,r,n){if(e.replaceChildren(),r.length===0){const t=document.createElement("p");t.className="rx-sidebar-empty",t.textContent="No starred chapters yet. Star a chapter in Contents to find it here.",e.appendChild(t);return}const o=document.createElement("div");o.setAttribute("role","list");for(const t of r){const a=document.createElement("button");a.type="button",a.className="rx-starred-row",a.setAttribute("role","listitem"),a.textContent=t.label,a.addEventListener("click",()=>n(t)),o.appendChild(a)}e.appendChild(o)}function It(e,r,n){if(e.replaceChildren(),r.length===0){const t=document.createElement("p");t.className="rx-sidebar-empty",t.textContent="No related books yet.",e.appendChild(t);return}const o=document.createElement("div");o.setAttribute("role","list");for(const t of r){const a=document.createElement("button");a.type="button",a.className="rx-related-row",a.setAttribute("role","listitem");const i=`${t.title}${t.subtitle?`, ${t.subtitle}`:""}${t.read?", read":""}`;if(a.setAttribute("aria-label",i),t.coverUrl){const s=document.createElement("img");s.className="rx-related-cover",s.src=t.coverUrl,s.alt="",a.appendChild(s)}else{const s=document.createElement("div");s.className="rx-related-cover rx-related-cover-empty",a.appendChild(s)}const l=document.createElement("div");l.className="rx-related-text";const c=document.createElement("span");if(c.className="rx-related-title",c.textContent=t.title,l.appendChild(c),t.subtitle){const s=document.createElement("span");s.className="rx-related-subtitle",s.textContent=t.subtitle,l.appendChild(s)}if(a.appendChild(l),t.read){const s=document.createElement("span");s.className="rx-related-badge",s.textContent="Read",a.appendChild(s)}a.addEventListener("click",()=>n(t)),o.appendChild(a)}e.appendChild(o)}function Pt(e,r){return rt(e,r,1)}function Mt(e,r){return rt(e,r,-1)}function rt(e,r,n){if(e.length===0)return r;const o=e.indexOf(r);if(o===-1)return e[0];const t=(o+n+e.length)%e.length;return e[t]}const Ht=40;function Ft(e,r){return Math.abs(e)>=Ht&&Math.abs(e)>Math.abs(r)}function Ot(e,r,n,o){return Ft(r,n)?e==="sidebar"?{action:r<0?"cycle-next":"cycle-prev"}:e==="book"&&o?{action:"close"}:{action:null}:{action:null}}function _t(e,r,n){return e&&r.contains(e)?"sidebar":e&&n.contains(e)&&!r.contains(e)?"book":"other"}function $t(e){return Array.from(e.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===e)}function Dt(e){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const t=$t(e);if(t.length===0){o.preventDefault(),e.focus();return}const a=t[0],i=t[t.length-1],l=e.ownerDocument.activeElement;o.shiftKey&&l===a?(o.preventDefault(),i.focus()):!o.shiftKey&&l===i&&(o.preventDefault(),a.focus())}return e.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,e.removeEventListener("keydown",n)}}}const _e="reactor-left-sidebar-stylesheet";function Rt(e){if(e.getElementById(_e))return;const r=e.createElement("style");r.id=_e,r.textContent=St,e.head.appendChild(r)}function Gt(e,r,n={}){var U,K;const o=e.ownerDocument??document;Rt(o);const t=Et(e);t.root.classList.add("closed");const a=["contents","starred"];(U=n.capabilities)!=null&&U.related&&a.push("related"),t.tabRelated.hidden=!((K=n.capabilities)!=null&&K.related);let i="contents",l=!1,c=!1,s=[];const g=new Set;let b=null,h=null;const d=new Set;let u=[],f=[];const y=Dt(t.root);let m=null;function N(){return!e.classList.contains("size-desktop")}function M(k){return k==="contents"?t.panelContents:k==="starred"?t.panelStarred:t.panelRelated}function T(k){return k==="contents"?t.tabContents:k==="starred"?t.tabStarred:t.tabRelated}function A(){i==="contents"?Nt(t.tocScroll,t.tocSpacer,t.tocWindow,{flat:s,collapsed:g,currentHref:b,currentChapterTitle:h,starred:d},{onActivate:k=>{k.href&&r(k.href),N()&&z()},onToggleExpand:k=>{g.has(k.id)?g.delete(k.id):g.add(k.id),A()},onToggleStar:k=>{var X;if(!k.href)return;const $=!d.has(k.href);$?d.add(k.href):d.delete(k.href),(X=n.onStarToggle)==null||X.call(n,k.href,k.label,$),A()}}):i==="starred"?zt(t.panelStarred,u,k=>{r(k.href),N()&&z()}):It(t.panelRelated,f,k=>{var $;($=n.onOpenRelated)==null||$.call(n,k.id),N()&&z()})}function E(k){k!==i&&(T(i).setAttribute("aria-selected","false"),M(i).hidden=!0,i=k,T(i).setAttribute("aria-selected","true"),M(i).hidden=!1,A())}function B(k){const $=k===1?Pt(a,i):Mt(a,i);E($)}t.tabContents.addEventListener("click",()=>E("contents")),t.tabStarred.addEventListener("click",()=>E("starred")),t.tabRelated.addEventListener("click",()=>E("related")),E("contents"),T("contents").setAttribute("aria-selected","true"),M("contents").hidden=!1;function _(){var $;if(l)return;l=!0,m=o.activeElement??null,t.root.classList.add("open"),t.root.classList.remove("closed"),e.classList.add("rx-left-sidebar-open"),t.scrim.classList.toggle("visible",N());const k=N();t.root.setAttribute("role",k?"dialog":"complementary"),k?t.root.setAttribute("aria-modal","true"):t.root.removeAttribute("aria-modal"),k&&(y.activate(),t.root.focus()),($=n.onSidebarChange)==null||$.call(n,!0)}function z(){var k,$;l&&(l=!1,t.root.classList.remove("open"),t.root.classList.add("closed"),e.classList.remove("rx-left-sidebar-open"),t.scrim.classList.remove("visible"),y.deactivate(),(k=m==null?void 0:m.focus)==null||k.call(m),m=null,($=n.onSidebarChange)==null||$.call(n,!1))}t.closeBtn.addEventListener("click",z),t.scrim.addEventListener("click",z),t.backBtn.addEventListener("click",()=>{var k;return(k=n.onBack)==null?void 0:k.call(n)});let D=0,I=0,R="other",H=!1;function O(k){k.pointerType!=="pen"&&(D=k.clientX,I=k.clientY,R=_t(k.target,t.root,e),H=R!=="other")}function C(k){if(!H)return;H=!1;const $=k.clientX-D,X=k.clientY-I,ee=Ot(R,$,X,N());!l&&ee.action!==null||(ee.action==="cycle-next"?B(1):ee.action==="cycle-prev"?B(-1):ee.action==="close"&&z())}e.addEventListener("pointerdown",O),e.addEventListener("pointerup",C);function p(k){s=tt(k),g.clear(),i==="contents"&&A()}function L(k){u=k,d.clear();for(const $ of k)d.add($.href);(i==="starred"||i==="contents")&&A()}function F(k){f=k,i==="related"&&A()}function j(k){b=k,i==="contents"&&A()}function V(k){h=k,i==="contents"&&A()}function W(){c||(c=!0,e.removeEventListener("pointerdown",O),e.removeEventListener("pointerup",C),t.closeBtn.removeEventListener("click",z),t.scrim.removeEventListener("click",z),y.deactivate(),e.classList.remove("rx-left-sidebar-open"),t.root.remove(),t.scrim.remove())}return{open:_,close:z,isOpen:()=>l,cycleTab:B,getActiveTab:()=>i,setToc:p,setStarred:L,setRelated:F,setCurrentHref:j,setCurrentChapterTitle:V,destroy:W}}function Ee(e,r){const n=document.createElement("button");return n.type="button",n.className="rx-sidebar-tab",n.textContent=e,n.setAttribute("role","tab"),n.setAttribute("aria-selected",String(r)),r&&n.classList.add("active"),n}function qt(e){const r=e.createElement("div");r.className="rx-right-sidebar",r.setAttribute("role","complementary"),r.setAttribute("aria-label","Context panel");const n=e.createElement("div");n.className="rx-sidebar-resize",n.setAttribute("role","separator"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-label","Resize context panel"),n.setAttribute("tabindex","0");const o=e.createElement("div");o.className="rx-sidebar-tabs";const t=e.createElement("div");t.className="rx-sidebar-tablist",t.setAttribute("role","tablist");const a=Ee("Context",!0),i=Ee("Glossary",!1),l=Ee("Notes",!1);l.disabled=!0;const c=e.createElement("button");c.type="button",c.className="rx-icon-btn rx-sidebar-close",c.setAttribute("aria-label","Close panel"),c.textContent="✕",t.append(a,i,l),o.append(t,c);const s=e.createElement("div");s.className="rx-ctx-searchbar",s.setAttribute("role","search");const g=e.createElement("input");g.type="search",g.className="rx-ctx-search-input",g.placeholder="Search this book",g.setAttribute("aria-label","Search this book");const b=e.createElement("button");b.type="button",b.className="rx-icon-btn rx-ctx-openmain",b.setAttribute("aria-label","Open in main window"),b.disabled=!0,b.textContent="↗";const h=e.createElement("div");h.className="rx-ctx-crumbs",h.setAttribute("aria-live","polite"),s.append(g,b,h);const d=e.createElement("div");d.className="rx-sidebar-body";const u=e.createElement("div");u.className="rx-ctx-results";const f=e.createElement("div");f.className="rx-ctx-page",f.hidden=!0;const y=e.createElement("div");y.className="rx-notes-body",y.hidden=!0;const m=e.createElement("div");return m.className="rx-glossary-panel-mount",m.hidden=!0,d.append(u,f,y,m),r.append(n,o,s,d),{root:r,resizeHandle:n,tabsRow:o,contextTabBtn:a,glossaryTabBtn:i,notesTabBtn:l,closeBtn:c,searchBar:s,searchInput:g,openInMainBtn:b,breadcrumb:h,body:d,resultsScroller:u,contextPage:f,notesBody:y,glossaryPanelMount:m}}const Wt=`
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
`;class Ut{constructor(){G(this,"rows",[]);G(this,"headerAt",new Map)}reset(){this.rows=[],this.headerAt.clear()}addGroup(r,n){if(n.length!==0){this.headerAt.has(r)||(this.headerAt.set(r,this.rows.length),this.rows.push({kind:"header",label:r}));for(const o of n)this.rows.push({kind:"item",item:o,groupLabel:r})}}get rowCount(){return this.rows.length}rowAt(r){return this.rows[r]}get isEmpty(){return this.rows.length===0}}class nt{constructor(r){G(this,"container");G(this,"rowHeight");G(this,"buffer");G(this,"opts");G(this,"topSpacer");G(this,"bottomSpacer");G(this,"rowsEl");G(this,"onScroll");G(this,"destroyed",!1);this.opts=r,this.container=r.container,this.rowHeight=r.rowHeight,this.buffer=r.buffer??6,this.topSpacer=document.createElement("div"),this.topSpacer.className="rx-wlist-spacer",this.bottomSpacer=document.createElement("div"),this.bottomSpacer.className="rx-wlist-spacer",this.rowsEl=document.createElement("div"),this.rowsEl.className="rx-wlist-rows",this.rowsEl.setAttribute("role","list"),this.container.replaceChildren(this.topSpacer,this.rowsEl,this.bottomSpacer),this.onScroll=()=>this.render(),this.container.addEventListener("scroll",this.onScroll)}visibleRange(){const r=this.opts.rowCount(),n=this.container.clientHeight||1,o=this.container.scrollTop||0,t=Math.max(0,Math.floor(o/this.rowHeight)-this.buffer),a=Math.ceil(n/this.rowHeight)+this.buffer*2,i=Math.min(r,t+a);return{first:t,last:i}}render(){if(this.destroyed)return;const r=this.opts.rowCount(),{first:n,last:o}=this.visibleRange();this.topSpacer.style.height=`${n*this.rowHeight}px`,this.bottomSpacer.style.height=`${Math.max(0,r-o)*this.rowHeight}px`,this.rowsEl.replaceChildren();for(let t=n;t<o;t++)this.rowsEl.appendChild(this.opts.renderRow(t))}destroy(){this.destroyed||(this.destroyed=!0,this.container.removeEventListener("scroll",this.onScroll),this.container.replaceChildren())}}function Kt(e,r){return e.kind!==r.kind?!1:e.kind==="page"&&r.kind==="page"?e.target===r.target:!0}class Yt{constructor(){G(this,"stack",[{kind:"blank"}]);G(this,"index",0)}get current(){return this.stack[this.index]??{kind:"blank"}}get canGoBack(){return this.index>0}get canGoForward(){return this.index<this.stack.length-1}push(r){Kt(this.current,r)||(this.stack=this.stack.slice(0,this.index+1),this.stack.push(r),this.index=this.stack.length-1)}back(){return this.canGoBack?(this.index-=1,this.current):null}forward(){return this.canGoForward?(this.index+=1,this.current):null}reset(){this.stack=[{kind:"blank"}],this.index=0}}const jt={"fold-tablet":320,desktop:340},ve=240,$e=16,Vt={"fold-tablet":.6,desktop:.7};function Xt(e,r,n){const o=Vt[n],t=Math.max(ve,r*o);return e<ve?ve:e>t?t:e}const at=new WeakMap;function Se(e){return at.get(e)??{left:0,right:0,bottom:0}}function ie(e,r){const n={left:Math.max(0,r.left??Se(e).left),right:Math.max(0,r.right??Se(e).right),bottom:Math.max(0,r.bottom??Se(e).bottom)};return at.set(e,n),e.style.setProperty("--rx-book-inset-left",`${n.left}px`),e.style.setProperty("--rx-book-inset-right",`${n.right}px`),e.style.setProperty("--rx-book-inset-bottom",`${n.bottom}px`),e.style.paddingLeft=n.left?`${n.left}px`:"",e.style.paddingRight=n.right?`${n.right}px`:"",e.style.paddingBottom=n.bottom?`${n.bottom}px`:"",n}const Zt=[{id:"all",label:"All"},{id:"highlight",label:"Highlight"},{id:"underline",label:"Underline"},{id:"note",label:"Typed note"},{id:"handwritten",label:"Handwritten"},{id:"bookmark",label:"Bookmark"}],Jt=[{id:"position",label:"Position in book"},{id:"date",label:"Date"},{id:"colour",label:"Colour"},{id:"type",label:"Type"}];function Qt(e){const r=e.createElement("div");r.className="rx-notes-panel";const n=e.createElement("div");n.className="rx-notes-searchbar",n.setAttribute("role","search");const o=e.createElement("input");o.type="search",o.className="rx-notes-search-input",o.placeholder="Search notes",o.setAttribute("aria-label","Search notes"),n.append(o);const t=e.createElement("select");t.className="rx-notes-sort",t.setAttribute("aria-label","Sort notes by");for(const{id:s,label:g}of Jt){const b=e.createElement("option");b.value=s,b.textContent=g,t.append(b)}n.append(t);const a=e.createElement("div");a.className="rx-notes-filters",a.setAttribute("role","group"),a.setAttribute("aria-label","Filter notes by type");const i={};for(const{id:s,label:g}of Zt){const b=e.createElement("button");b.type="button",b.className="rx-notes-chip",b.textContent=g,b.setAttribute("aria-pressed",String(s==="all")),s==="all"&&b.classList.add("active"),b.dataset.filter=s,a.append(b),i[s]=b}const l=e.createElement("div");l.className="rx-notes-banner",l.hidden=!0,l.textContent="No annotation store connected. Notes made in this session are not saved.";const c=e.createElement("div");return c.className="rx-notes-list",r.append(n,a,l,c),{root:r,searchBar:n,searchInput:o,filterRow:a,filterButtons:i,sortSelect:t,capabilityBanner:l,listScroller:c}}const er=`
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
`,tr=100,rr=20;function nr(e){return e==="all"?null:e}class ar{constructor(r){G(this,"total",0);G(this,"offset",0);G(this,"items",[]);G(this,"state",{filter:"all",sort:"position",query:null});G(this,"lastRequestedOffset",null);G(this,"everRequested",!1);this.hostChannel=r}getState(){return this.state}setState(r){this.state={...this.state,...r},this.total=0,this.offset=0,this.items=[],this.lastRequestedOffset=null,this.requestPage(0)}ensureInitialLoad(){this.everRequested||this.requestPage(0)}rowCount(){return this.total}rowAt(r){const n=r-this.offset;if(!(n<0||n>=this.items.length))return this.items[n]}ensureLoaded(r,n){const o=Math.max(r,n-1);if(this.rowAt(r)&&this.rowAt(o))return;const t=Math.max(0,r-rr);this.lastRequestedOffset!==t&&this.requestPage(t)}requestPage(r){this.everRequested=!0,this.lastRequestedOffset=r,this.hostChannel.emitIntent({type:"notesPageRequest",offset:r,limit:tr,filter:nr(this.state.filter),sort:this.state.sort,query:this.state.query})}applyWindow(r){this.total=r.total,this.offset=r.offset,this.items=r.items,this.lastRequestedOffset=null}}const De="reactor-notes-stylesheet",or=48,sr=200,Re={highlight:"Highlight",underline:"Underline",note:"Typed note",bookmark:"Bookmark"};function ir(e,r){return r?`${Re[e]} · ${r}`:Re[e]}function lr({container:e,core:r,hostChannel:n,options:o={}}){const t=e.ownerDocument??document;if(!t.getElementById(De)){const E=t.createElement("style");E.id=De,E.textContent=er,t.head.appendChild(E)}const a=Qt(t);e.append(a.root);const i=new ar(n);let l=!1,c=null;const s=new Map,g=new Set;function b(E){s.has(E)||g.has(E)||typeof r.getChapterTitleForCfi=="function"&&(g.add(E),r.getChapterTitleForCfi(E).then(B=>{s.set(E,B)}).catch(()=>{s.set(E,null)}).finally(()=>{g.delete(E),!l&&d.render()}))}function h(E){i.ensureLoaded(E,E+1);const B=i.rowAt(E);if(!B){const C=t.createElement("div");return C.className="rx-notes-loading-row",C.setAttribute("role","listitem"),C.textContent="Loading…",C}const _=t.createElement("button");_.type="button",_.className="rx-notes-row";const z=t.createElement("span");z.className="rx-notes-row-swatch",B.color&&z.style.setProperty("--rx-notes-row-color",B.color);const D=t.createElement("span");D.className="rx-notes-row-body";const I=t.createElement("span");I.className="rx-notes-row-snippet",I.textContent=B.note??B.text??"";const R=t.createElement("span");R.className="rx-notes-row-meta";const H=s.get(B.cfi);R.textContent=ir(B.kind,H??null),D.append(I,R),_.append(z,D),_.setAttribute("aria-label",`${R.textContent}: ${I.textContent}`),H===void 0&&b(B.cfi),_.addEventListener("click",()=>r.goTo(B.cfi));const O=t.createElement("div");return O.setAttribute("role","listitem"),O.appendChild(_),O}const d=new nt({container:a.listScroller,rowHeight:or,rowCount:()=>i.rowCount(),renderRow:h});function u(E){const B=E.currentTarget,_=B.dataset.filter??"all";for(const z of Object.values(a.filterButtons))z.classList.toggle("active",z===B),z.setAttribute("aria-pressed",String(z===B));i.setState({filter:_}),d.render()}for(const E of Object.values(a.filterButtons))E.addEventListener("click",u);function f(){i.setState({sort:a.sortSelect.value}),d.render()}a.sortSelect.addEventListener("change",f);function y(){c&&clearTimeout(c),c=setTimeout(()=>{i.setState({query:a.searchInput.value.trim()||null}),d.render()},sr)}a.searchInput.addEventListener("input",y);function m(E){E.type==="setNotes"&&(i.applyWindow(E),d.render())}const N=n.onCommand(m);function M(){var E;a.capabilityBanner.hidden=((E=n.getConfig())==null?void 0:E.capabilities.notes)!==!1,i.ensureInitialLoad(),d.render()}function T(){d.render()}function A(){if(!l){l=!0,c&&clearTimeout(c),N();for(const E of Object.values(a.filterButtons))E.removeEventListener("click",u);a.sortSelect.removeEventListener("change",f),a.searchInput.removeEventListener("input",y),d.destroy(),a.root.remove()}}return{onActivate:M,refresh:T,destroy:A}}function cr(e){const r=e.createElement("div");r.className="rx-glossary-panel",r.style.position="absolute",r.style.inset="0";const n=e.createElement("div");n.className="rx-glossary-search",n.setAttribute("role","search");const o=e.createElement("input");o.type="search",o.className="rx-glossary-search-input",o.placeholder="Search glossary",o.setAttribute("aria-label","Search glossary"),n.appendChild(o);const t=e.createElement("div");return t.className="rx-glossary-list",t.setAttribute("role","list"),r.append(n,t),{root:r,searchInput:o,list:t}}const dr=900;function ur(e){const r=e.ownerDocument??document,n=cr(r);e.appendChild(n.root);let o=[],t="",a=!1;function i(){const h=t.trim().toLowerCase();return[...h?o.filter(u=>u.term.toLowerCase().includes(h)):o].sort((u,f)=>u.term.localeCompare(f.term))}function l(){if(a)return;const h=i();if(n.list.replaceChildren(),!o.length){n.list.removeAttribute("role");const d=r.createElement("div");d.className="rx-glossary-empty",d.textContent="This book has no glossary.",n.list.appendChild(d);return}if(!h.length){n.list.removeAttribute("role");const d=r.createElement("div");d.className="rx-glossary-empty",d.textContent=`No terms match "${t}".`,n.list.appendChild(d);return}n.list.setAttribute("role","list");for(const d of h){let u=function(){const N=f.classList.toggle("expanded");y.setAttribute("aria-expanded",String(N))};const f=r.createElement("div");f.className="rx-glossary-item",f.setAttribute("role","listitem"),f.setAttribute("data-term",d.term);const y=r.createElement("button");y.type="button",y.className="rx-glossary-term-row",y.setAttribute("role","button"),y.setAttribute("aria-expanded","false"),y.textContent=d.term;const m=r.createElement("div");m.className="rx-glossary-def",m.textContent=d.definition,y.addEventListener("click",u),f.append(y,m),n.list.appendChild(f)}}function c(){t=n.searchInput.value,l()}n.searchInput.addEventListener("input",c),l();function s(h){o=h,l()}function g(h){var u,f;t&&(t="",n.searchInput.value="",l());const d=n.list.querySelector(`.rx-glossary-item[data-term="${CSS.escape(h)}"]`);d&&(d.classList.add("expanded"),(u=d.querySelector(".rx-glossary-term-row"))==null||u.setAttribute("aria-expanded","true"),(f=d.scrollIntoView)==null||f.call(d,{block:"center"}),d.classList.add("flash"),setTimeout(()=>d.classList.remove("flash"),dr))}function b(){a||(a=!0,n.searchInput.removeEventListener("input",c),n.root.remove())}return{setTerms:s,scrollToAndFlash:g,destroy:b}}const Ge=9,ue=8,qe=16;function pr(e,r,n,o){const t=e.top+e.height;let a=e.left;a=Math.min(Math.max(ue,a),Math.max(ue,r.width-n-ue));let i=t+Ge,l=!1;if(i+o>r.height-ue){const s=e.top-o-Ge;i=Math.max(ue,s),l=!0}const c=Math.max(qe,Math.min(n-qe,e.left+e.width/2-a));return{left:a,top:i,above:l,arrowX:c}}const xr='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';function br(e,r,n){const o=e.ownerDocument??document;let t=null,a=!1;function i(){var d;const h=!!t;t==null||t.remove(),t=null,h&&((d=e.querySelector("iframe"))==null||d.focus())}function l(h,d){var M;i();const u=o.createElement("div");u.className="rx-glossary-popover",u.setAttribute("role","dialog"),u.setAttribute("aria-label",`${h.term} definition`),u.innerHTML=`
      <div class="rx-glossary-popover-head">
        <h4 class="rx-glossary-popover-term"></h4>
        <button type="button" class="rx-icon-btn rx-glossary-popover-open" aria-label="Open in glossary" title="Open in glossary">${xr}</button>
      </div>
      <p class="rx-glossary-popover-def"></p>
    `,u.querySelector(".rx-glossary-popover-term").textContent=h.term,u.querySelector(".rx-glossary-popover-def").textContent=h.definition,e.appendChild(u),t=u;const f=e.getBoundingClientRect(),y={left:d.left-f.left,top:d.top-f.top,width:d.width,height:d.height},m={width:f.width,height:f.height},N=pr(y,m,u.offsetWidth,u.offsetHeight||120);u.style.left=`${N.left}px`,u.style.top=`${N.top}px`,u.classList.toggle("above",N.above),u.style.setProperty("--arrow-x",`${N.arrowX}px`),u.querySelector(".rx-glossary-popover-open").addEventListener("click",T=>{T.stopPropagation(),i(),n.onOpenInGlossary(h.term)}),(M=u.querySelector(".rx-glossary-popover-open"))==null||M.focus()}async function c(h,d){const u=await r.getGlossaryTerms();if(a)return;const f=u.find(y=>y.term.toLowerCase()===h.toLowerCase());f&&l(f,d)}const s=r.onGlossaryTermTap(c);function g(h){var u;if(!t)return;const d=h.target;(u=d==null?void 0:d.closest)!=null&&u.call(d,".rx-glossary-popover")||i()}o.addEventListener("click",g);function b(){a||(a=!0,s(),o.removeEventListener("click",g),i())}return{isOpen:()=>t!==null,close:i,destroy:b}}const hr=`
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
`,We="reactor-right-sidebar-stylesheet",Ue="reactor-glossary-stylesheet",fr=48,mr=200;function gr(e){if(!e.getElementById(We)){const r=e.createElement("style");r.id=We,r.textContent=Wt,e.head.appendChild(r)}if(!e.getElementById(Ue)){const r=e.createElement("style");r.id=Ue,r.textContent=hr,e.head.appendChild(r)}}function vr(e){const r=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`${r(e.pre)}<mark>${r(e.match)}</mark>${r(e.post)}`}function yr(e,r,n){var re,de;const o=e.ownerDocument??document;gr(o);const t=qt(o),a=o.createElement("div");a.className="rx-sidebar-scrim",e.append(a,t.root);const i=new Ut,l=new Yt,c=ur(t.glossaryPanelMount);let s="context",g=null,b=!1,h=!1,d=null;const u=!!n.hostChannel&&((re=n.hostChannel.getConfig())==null?void 0:re.capabilities.notes)!==!1;t.notesTabBtn.disabled=!u;const f=u?lr({container:t.notesBody,core:r,hostChannel:n.hostChannel}):null;((de=n.capabilities)==null?void 0:de.glossary)===!1&&(t.glossaryTabBtn.hidden=!0);function y(v){v!==s&&(s=v,t.contextTabBtn.classList.toggle("active",v==="context"),t.contextTabBtn.setAttribute("aria-selected",String(v==="context")),t.glossaryTabBtn.classList.toggle("active",v==="glossary"),t.glossaryTabBtn.setAttribute("aria-selected",String(v==="glossary")),t.notesTabBtn.classList.toggle("active",v==="notes"),t.notesTabBtn.setAttribute("aria-selected",String(v==="notes")),t.searchBar.hidden=v!=="context",t.glossaryPanelMount.hidden=v!=="glossary",t.notesBody.hidden=v!=="notes",v==="context"?I(l.current):v==="glossary"?(t.resultsScroller.hidden=!0,t.contextPage.hidden=!0,r.getGlossaryTerms().then(P=>c.setTerms(P))):(t.resultsScroller.hidden=!0,t.contextPage.hidden=!0,f==null||f.onActivate()))}const m=()=>y("context"),N=()=>y("glossary"),M=()=>y("notes");t.contextTabBtn.addEventListener("click",m),t.glossaryTabBtn.addEventListener("click",N),t.notesTabBtn.addEventListener("click",M);function T(v){const P=i.rowAt(v);if(!P)return o.createElement("div");if(P.kind==="header"){const se=o.createElement("div");return se.className="rx-ctx-group-header",se.setAttribute("role","listitem"),se.textContent=P.label,se}const Z=o.createElement("button");Z.type="button",Z.className="rx-ctx-result",Z.setAttribute("role","listitem"),Z.innerHTML=vr(P.item),Z.addEventListener("click",()=>O(P.item,P.groupLabel));const ne=o.createElement("div");return ne.setAttribute("role","listitem"),ne.appendChild(Z),ne}const A=new nt({container:t.resultsScroller,rowHeight:fr,rowCount:()=>i.rowCount,renderRow:T});function E(){t.breadcrumb.replaceChildren();const v=o.createElement("button");v.type="button",v.textContent="Back",v.disabled=!l.canGoBack,v.setAttribute("aria-label","Back"),v.addEventListener("click",R);const P=o.createElement("button");P.type="button",P.textContent="Forward",P.disabled=!l.canGoForward,P.setAttribute("aria-label","Forward"),P.addEventListener("click",H),t.breadcrumb.append(v,P),t.openInMainBtn.disabled=l.current.kind!=="page"}function B(){t.resultsScroller.hidden=!1,t.contextPage.hidden=!0,A.render()}function _(){t.resultsScroller.hidden=!1,t.contextPage.hidden=!0,A.render()}function z(){return g||(g=r.createSecondaryView(t.contextPage),g)}function D(v){t.resultsScroller.hidden=!0,t.contextPage.hidden=!1;const P=z();P&&P.goTo(v)}function I(v){v.kind==="blank"?_():v.kind==="results"?B():D(v.target),E()}function R(){const v=l.back();v&&I(v)}function H(){const v=l.forward();v&&I(v)}function O(v,P){l.push({kind:"page",target:v.cfi,label:P}),I(l.current)}function C(){const v=t.searchInput.value.trim();i.reset(),v?l.current.kind!=="results"&&l.push({kind:"results"}):l.reset(),I(l.current),d&&clearTimeout(d),v&&(d=setTimeout(()=>r.runSearch(v),mr))}t.searchInput.addEventListener("input",C);function p(v){v.type==="searchResults"?(i.addGroup(v.label,v.items),l.current.kind==="results"&&A.render()):v.type==="loaded"&&c.setTerms([])}const L=r.on(p);function F(){const v=l.current;v.kind==="page"&&(r.goTo(v.target),n.getSizeClass()==="phone"&&te())}t.openInMainBtn.addEventListener("click",F);function j(){te()}t.closeBtn.addEventListener("click",j);const V=()=>te();a.addEventListener("click",V);function W(){const v=getComputedStyle(e).getPropertyValue("--rx-ctx-width"),P=parseFloat(v);if(!Number.isNaN(P)&&P>0)return P;const Z=n.getSizeClass();return Z==="phone"?ve:jt[Z]}t.resizeHandle.setAttribute("aria-valuenow",String(Math.round(W())));function U(v,P){var se;const Z=n.getSizeClass();if(Z==="phone")return;const ne=Xt(v,e.clientWidth||1200,Z);e.style.setProperty("--rx-ctx-width",`${ne}px`),t.resizeHandle.setAttribute("aria-valuenow",String(Math.round(ne))),b&&ie(e,{right:ne}),P&&((se=n.onWidthChange)==null||se.call(n,ne))}let K=!1,k=0,$=0;function X(v){K=!0,k=v.clientX,$=W(),e.classList.add("right-sidebar-resizing"),o.addEventListener("pointermove",ee),o.addEventListener("pointerup",J)}function ee(v){K&&U($-(v.clientX-k),!1)}function J(){K&&(K=!1,e.classList.remove("right-sidebar-resizing"),o.removeEventListener("pointermove",ee),o.removeEventListener("pointerup",J),U(W(),!0))}function oe(v){v.key==="ArrowLeft"?(v.preventDefault(),U(W()+$e,!0)):v.key==="ArrowRight"&&(v.preventDefault(),U(W()-$e,!0))}t.resizeHandle.addEventListener("pointerdown",X),t.resizeHandle.addEventListener("keydown",oe);function ae(){b||(b=!0,e.classList.add("right-sidebar-open"),U(W(),!1),A.render(),s==="notes"&&(f==null||f.refresh()))}function te(){var v;b&&(b=!1,e.classList.remove("right-sidebar-open"),ie(e,{right:0}),(v=n.onClose)==null||v.call(n))}function x(){b?te():ae()}function S(v){b||ae(),y("glossary"),r.getGlossaryTerms().then(P=>{c.setTerms(P),c.scrollToAndFlash(v)})}function Y(){b&&(n.getSizeClass()==="phone"?ie(e,{right:0}):ie(e,{right:W()}))}I(l.current);function Q(){h||(h=!0,d&&clearTimeout(d),L(),t.searchInput.removeEventListener("input",C),t.openInMainBtn.removeEventListener("click",F),t.closeBtn.removeEventListener("click",j),a.removeEventListener("click",V),t.resizeHandle.removeEventListener("pointerdown",X),o.removeEventListener("pointermove",ee),o.removeEventListener("pointerup",J),t.resizeHandle.removeEventListener("keydown",oe),t.contextTabBtn.removeEventListener("click",m),t.notesTabBtn.removeEventListener("click",M),f==null||f.destroy(),t.glossaryTabBtn.removeEventListener("click",N),c.destroy(),A.destroy(),g==null||g.destroy(),e.classList.remove("right-sidebar-open","right-sidebar-resizing"),ie(e,{right:0}),t.root.remove(),a.remove())}return{open:ae,close:te,toggle:x,isOpen:()=>b,destroy:Q,refreshLayout:Y,openGlossaryTerm:S}}function me(e,r){const n=document.createElement("button");return n.type="button",n.className=r,n.setAttribute("aria-label",e),n}function kr(e){const r=e.createElement("div");r.className="rx-playback-bar",r.setAttribute("role","group"),r.setAttribute("aria-label","Narration transport");const n=me("Skip back 15 seconds","rx-playback-icon-btn rx-playback-skip-back");n.innerHTML=be("skip_back");const o=me("Play","rx-playback-icon-btn rx-playback-play-pause");o.setAttribute("aria-pressed","false"),o.innerHTML=be("play");const t=me("Skip forward 15 seconds","rx-playback-icon-btn rx-playback-skip-forward");t.innerHTML=be("skip_forward");const a=me("Playback speed","rx-playback-rate-btn");a.textContent="1x";const i=e.createElement("div");i.className="rx-playback-info";const l=e.createElement("span");l.className="rx-playback-chapter",l.setAttribute("aria-live","polite");const c=e.createElement("span");return c.className="rx-playback-position",c.textContent="0:00",i.append(l,c),r.append(n,o,t,i,a),{root:r,skipBackBtn:n,playPauseBtn:o,skipForwardBtn:t,rateBtn:a,chapterLabel:l,positionLabel:c}}const wr=`
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
`;class Er{constructor(){G(this,"timeline",null);G(this,"activeAudioIndex",0)}setTimeline(r){this.timeline=r,this.activeAudioIndex=0}clear(){this.timeline=null,this.activeAudioIndex=0}hasTimeline(){return this.timeline!==null}itemFor(r){const n=this.timeline;if(!n)return null;const o=a=>a.beginSec<=r&&(a.endSec===null||r<a.endSec);let t=n.items.filter(a=>a.audioIndex===this.activeAudioIndex&&o(a));if(t.length===0){t=n.items.filter(o);const a=t[0];a&&(this.activeAudioIndex=a.audioIndex)}return t.length===0?null:t.reduce((a,i)=>i.beginSec>a.beginSec?i:a)}textHrefFor(r){var n;return((n=this.itemFor(r))==null?void 0:n.textHref)??null}}const Ke="reactor-playback-stylesheet",Ye=15,he=[.75,1,1.25,1.5,1.75,2];function Sr(e){if(e.getElementById(Ke))return;const r=e.createElement("style");r.id=Ke,r.textContent=wr,e.head.appendChild(r)}function Cr(e){const r=Number.isFinite(e)&&e>0?e:0,n=Math.floor(r),o=Math.floor(n/60),t=n%60;return`${o}:${String(t).padStart(2,"0")}`}function je(e){return he.reduce((r,n)=>Math.abs(n-e)<Math.abs(r-e)?n:r,he[0]??1)}function Lr(e,r,n,o={}){const t=e.ownerDocument??document;Sr(t);let a=null,i=!1,l=!1,c=!1,s=!1,g=0,b=1,h=!1,d=0;const u=new Er;function f(C,p=null,L=null){n.emitIntent({type:"playback",action:C,positionSec:p,rate:L})}const y=()=>f(s?"pause":"play"),m=()=>f("seek",Math.max(0,g-Ye)),N=()=>f("seek",g+Ye),M=()=>{const C=he.indexOf(je(b)),p=he[(C+1)%he.length]??1;f("rateChange",null,p)};function T(){a&&(a.playPauseBtn.setAttribute("aria-pressed",String(s)),a.playPauseBtn.setAttribute("aria-label",s?"Pause":"Play"),a.playPauseBtn.innerHTML=be(s?"pause":"play"),a.positionLabel.textContent=Cr(g),a.rateBtn.textContent=`${je(b)}x`)}function A(C){a&&a.chapterLabel.textContent!==(C??"")&&(a.chapterLabel.textContent=C??"")}function E(){i||l||(i=!0,a=kr(t),a.root.classList.toggle("e-ink",!!o.eink),e.appendChild(a.root),a.playPauseBtn.addEventListener("click",y),a.skipBackBtn.addEventListener("click",m),a.skipForwardBtn.addEventListener("click",N),a.rateBtn.addEventListener("click",M),ie(e,{bottom:a.root.offsetHeight||56}),T(),B())}function B(){!i||!h||(d+=1,r.narrationPrepare(d))}function _(){if(!i||!h)return;const C=u.textHrefFor(g);C?r.narrationHighlight(C):r.narrationUnhighlight()}function z(C){switch(C.type){case"loaded":h=C.hasMediaOverlay,u.clear(),B();break;case"relocate":A(C.chapterTitle);break;case"narrationTimeline":C.generation===d&&(u.setTimeline(C),_());break;case"narrationTimelineError":C.generation===d&&u.clear();break}}const D=r.on(z);function I(C){if(C.type==="configure"){if(c)return;c=!0,C.capabilities.playback&&E()}else if(C.type==="setPlaybackState"){if(!i)return;s=C.playing,g=C.positionSec,b=C.rate,T(),_()}}const R=n.onCommand(I),H=n.getConfig();H&&I(H);function O(){l||(l=!0,D(),R(),a&&(a.playPauseBtn.removeEventListener("click",y),a.skipBackBtn.removeEventListener("click",m),a.skipForwardBtn.removeEventListener("click",N),a.rateBtn.removeEventListener("click",M),a.root.remove(),ie(e,{bottom:0})))}return{isVisible:()=>i,destroy:O}}const Ce={highlight:"Highlight",underline:"Underline",strikethrough:"Strikethrough",squiggly:"Squiggly underline"};function Ar(e){const r=e.createElement("div");r.className="rx-anno-popover",r.setAttribute("role","dialog"),r.setAttribute("aria-label","Annotation"),r.hidden=!0;const n=e.createElement("div");n.className="rx-anno-status",n.setAttribute("aria-live","polite");const o=e.createElement("button");o.type="button",o.className="rx-icon-btn rx-anno-close",o.setAttribute("aria-label","Close"),o.textContent="✕";const t=e.createElement("div");t.className="rx-anno-header",t.append(n,o);const a=e.createElement("div");a.className="rx-anno-colors",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Colour");const i=dt.map(y=>{const m=e.createElement("button");return m.type="button",m.className="rx-anno-swatch",m.style.setProperty("--rx-anno-swatch-color",y.value),m.setAttribute("role","radio"),m.setAttribute("aria-checked","false"),m.setAttribute("aria-label",y.label),m.dataset.color=y.value,a.append(m),m}),l=e.createElement("div");l.className="rx-anno-styles",l.setAttribute("role","group"),l.setAttribute("aria-label","Mark style");const c={};for(const y of Object.keys(Ce)){const m=e.createElement("button");m.type="button",m.className=`rx-anno-style rx-anno-style-${y}`,m.textContent=Ce[y],m.setAttribute("aria-label",Ce[y]),m.dataset.style=y,l.append(m),c[y]=m}const s=e.createElement("button");s.type="button",s.className="rx-anno-note-toggle",s.textContent="Note",s.setAttribute("aria-expanded","false");const g=e.createElement("div");g.className="rx-anno-note-form",g.hidden=!0;const b=e.createElement("textarea");b.className="rx-anno-note-textarea",b.setAttribute("aria-label","Note text"),b.rows=3;const h=e.createElement("div");h.className="rx-anno-note-actions";const d=e.createElement("button");d.type="button",d.className="rx-anno-note-save",d.textContent="Save";const u=e.createElement("button");u.type="button",u.className="rx-anno-note-cancel",u.textContent="Cancel",h.append(u,d),g.append(b,h);const f=e.createElement("button");return f.type="button",f.className="rx-anno-delete",f.textContent="Delete",f.hidden=!0,r.append(t,a,l,s,g,f),{root:r,colorRow:a,colorButtons:i,styleRow:l,styleButtons:c,noteToggleBtn:s,noteForm:g,noteTextarea:b,noteSaveBtn:d,noteCancelBtn:u,deleteBtn:f,closeBtn:o,statusLabel:n}}const Tr=`
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
`,Ve="reactor-annotations-stylesheet";function Br(e){return e==="underline"||e==="squiggly"?"underline":"highlight"}class Nr{constructor(r=500){G(this,"map",new Map);this.cap=r}get(r){return this.map.get(r)}addAll(r){for(const n of r)for(this.map.delete(n.cfi),this.map.set(n.cfi,n);this.map.size>this.cap;){const o=this.map.keys().next().value;if(o===void 0)break;this.map.delete(o)}}}function zr({shellRoot:e,core:r,hostChannel:n,options:o={}}){const t=e.ownerDocument??document;if(!t.getElementById(Ve)){const p=t.createElement("style");p.id=Ve,p.textContent=Tr,t.head.appendChild(p)}const a=Ar(t);e.append(a.root);const i=new Nr;let l=ye,c=!1,s=null,g=null;function b(){s=null,g=null,a.root.hidden=!0,a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}function h(p){const L=e.getBoundingClientRect(),F=p?p.left-L.left:(e.clientWidth||300)/2-140,j=p?p.bottom-L.top+8:60,V=Math.max(0,(e.clientWidth||300)-288);a.root.style.left=`${Math.min(Math.max(0,F),V)}px`,a.root.style.top=`${Math.max(0,j)}px`}function d(p){l=p;for(const L of a.colorButtons)L.setAttribute("aria-checked",String(L.dataset.color===p))}function u(p){for(const[L,F]of Object.entries(a.styleButtons))F.setAttribute("aria-pressed",String(L===p))}function f(p,L,F){s={kind:"create",cfi:p,text:L},a.statusLabel.textContent="Add mark",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.noteTextarea.value="",d(l),u(null),a.root.hidden=!1,h(F)}function y(p,L){s={kind:"edit",note:p},a.statusLabel.textContent="Edit mark",a.deleteBtn.hidden=!1,a.noteForm.hidden=!0,a.noteTextarea.value=p.note??"",d(p.color??ye),u(p.style??(p.kind==="underline"?"underline":"highlight")),a.root.hidden=!1,h(L)}function m(p,L){s=null,g=p,a.statusLabel.textContent="Loading…",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.root.hidden=!1,h(L),n.emitIntent({type:"notesPageRequest",offset:0,limit:1,filter:null,sort:null,query:`cfi:${p}`})}function N(p){if(p.type==="selection"&&p.cfi)f(p.cfi,p.text,p.rect);else if(p.type==="selectionCleared")(s==null?void 0:s.kind)==="create"&&b();else if(p.type==="annotationTap"){if(!p.cfi)return;const L=i.get(p.cfi);L?y(L,p.rect):m(p.cfi,p.rect)}}const M=r.on(N);function T(p){if(p.type==="setNotes"&&(i.addAll(p.items),g)){const L=p.items.find(F=>F.cfi===g);if(L){const F=a.root.hidden?null:{left:parseFloat(a.root.style.left||"0"),top:parseFloat(a.root.style.top||"0"),bottom:0};y(L,F)}else b()}}const A=n.onCommand(T);function E(p){(s==null?void 0:s.kind)==="create"&&(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:Br(p),color:l,style:p,text:s.text,note:null}),r.clearSelection(),b())}function B(p){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:l,style:p,note:s.note.note}),b())}function _(p){const F=p.currentTarget.dataset.color??ye;d(F),(s==null?void 0:s.kind)==="edit"&&n.emitIntent({type:"annotationUpdate",id:s.note.id,color:F,style:s.note.style,note:s.note.note})}for(const p of a.colorButtons)p.addEventListener("click",_);const z={highlight:()=>(s==null?void 0:s.kind)==="create"?E("highlight"):B("highlight"),underline:()=>(s==null?void 0:s.kind)==="create"?E("underline"):B("underline"),strikethrough:()=>(s==null?void 0:s.kind)==="create"?E("strikethrough"):B("strikethrough"),squiggly:()=>(s==null?void 0:s.kind)==="create"?E("squiggly"):B("squiggly")};for(const[p,L]of Object.entries(a.styleButtons))L.addEventListener("click",z[p]);function D(){const p=a.noteForm.hidden;a.noteForm.hidden=!p,a.noteToggleBtn.setAttribute("aria-expanded",String(p)),p&&a.noteTextarea.focus()}a.noteToggleBtn.addEventListener("click",D);function I(){a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}a.noteCancelBtn.addEventListener("click",I);function R(){const p=a.noteTextarea.value.trim()||null;(s==null?void 0:s.kind)==="create"?(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:"note",color:l,style:null,text:s.text,note:p}),r.clearSelection(),b()):(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:s.note.color,style:s.note.style,note:p}),b())}a.noteSaveBtn.addEventListener("click",R);function H(){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationDelete",id:s.note.id}),b())}a.deleteBtn.addEventListener("click",H);const O=()=>b();a.closeBtn.addEventListener("click",O);function C(){if(!c){c=!0,M(),A();for(const p of a.colorButtons)p.removeEventListener("click",_);for(const[p,L]of Object.entries(a.styleButtons))L.removeEventListener("click",z[p]);a.noteToggleBtn.removeEventListener("click",D),a.noteCancelBtn.removeEventListener("click",I),a.noteSaveBtn.removeEventListener("click",R),a.deleteBtn.removeEventListener("click",H),a.closeBtn.removeEventListener("click",O),a.root.remove()}}return{isOpen:()=>!a.root.hidden,close:b,destroy:C}}const Ir='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function Pr(e,r,n){const o=document.createElement("button");return o.type="button",o.className=n,o.setAttribute("aria-label",e),o.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,o}function pe(e,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-toggle",n.setAttribute("aria-pressed","false"),n.setAttribute("data-setting",r),n.textContent=e,n}function ge(e,r,n){const o=document.createElement("div");o.className=`rx-settings-pills ${n}`,o.setAttribute("role","radiogroup"),o.setAttribute("aria-label",e);for(const t of r){const a=document.createElement("button");a.type="button",a.className="rx-settings-pill",a.setAttribute("role","radio"),a.setAttribute("aria-checked","false"),a.setAttribute("data-value",t.id),a.textContent=t.label,o.appendChild(a)}return o}function ce(e,r,n,o){const t=document.createElement("div");t.className="rx-settings-slider-row";const a=document.createElement("div");a.className="rx-settings-slider-label";const i=document.createElement("span");i.textContent=e;const l=document.createElement("span");l.className="rx-settings-slider-value",a.append(i,l);const c=document.createElement("input");return c.type="range",c.className="rx-settings-slider",c.min=String(r),c.max=String(n),c.step=String(o),c.setAttribute("aria-label",e),t.append(a,c),{row:t,input:c,value:l}}function Mr(e,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-tab",n.setAttribute("role","tab"),n.setAttribute("aria-selected","false"),n.setAttribute("data-tab",e),n.id=`rx-settings-tab-${e}`,n.textContent=r,n}function xe(e){const r=document.createElement("div");return r.className="rx-settings-panel",r.setAttribute("role","tabpanel"),r.setAttribute("data-panel",e),r.setAttribute("aria-labelledby",`rx-settings-tab-${e}`),r.hidden=!0,r}function Hr(e){const r=document.createElement("div");r.className="rx-settings-scrim";const n=document.createElement("div");n.className="rx-settings-sheet",n.setAttribute("role","dialog"),n.setAttribute("aria-label","Text settings"),n.tabIndex=-1;const o=document.createElement("div");o.className="rx-settings-head";const t=document.createElement("h3");t.className="rx-settings-title",t.textContent="Text settings";const a=Pr("Close settings",Ir,"rx-icon-btn rx-settings-close");o.append(t,a);const i=document.createElement("div");i.className="rx-settings-scope",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Settings scope");const l=document.createElement("button");l.type="button",l.className="rx-settings-scope-btn",l.setAttribute("role","radio"),l.setAttribute("aria-checked","true"),l.setAttribute("data-scope","global"),l.textContent="Global";const c=document.createElement("button");c.type="button",c.className="rx-settings-scope-btn",c.setAttribute("role","radio"),c.setAttribute("aria-checked","false"),c.setAttribute("data-scope","book"),c.textContent="This book",i.append(l,c);const s=document.createElement("div");s.className="rx-settings-tabs",s.setAttribute("role","tablist");const g=[["typography","Typography"],["layout","Layout"],["theme","Theme"],["controls","Controls"],["playback","Playback"]],b={};for(const[W,U]of g){const K=Mr(W,U);b[W]=K,s.appendChild(K)}const h=document.createElement("div");h.className="rx-settings-body";const d=xe("typography"),u=ce("Font size",13,28,1),f=ce("Paragraph spacing",0,2,.1),y=ge("Typeface",[],"rx-settings-font-pills");d.append(u.row,y,f.row);const m=xe("layout"),N=ge("Reading mode",[{id:"paginated",label:"Paginated"},{id:"scrolled",label:"Scrolling"}],"rx-settings-flow-pills"),M=ge("Columns",[{id:"1",label:"1 column"},{id:"2",label:"2 columns"}],"rx-settings-columns-pills"),T=ce("Margins",0,96,4),A=ce("Line spacing",1.2,1.95,.05),E=pe("Justify text","justify"),B=pe("Hyphenate","hyphenate"),_=pe("Use book's own styling","useBookLayout");m.append(N,M,T.row,A.row,E,B,_);const z=xe("theme"),D=document.createElement("div");D.className="rx-settings-swatches",D.setAttribute("role","radiogroup"),D.setAttribute("aria-label","Theme"),z.append(D);const I=xe("controls"),R=pe("Swipe to turn pages","swipe"),H=ge("Tap zone size",[{id:"standard",label:"Standard"},{id:"wide",label:"Wide"}],"rx-settings-tapzone-pills"),O=document.createElement("div");O.className="rx-settings-volumekeys",O.hidden=!0;const C=pe("Volume keys turn pages","volumeKeys");O.append(C),I.append(R,H,O);const p=xe("playback"),L=document.createElement("p");L.className="rx-settings-empty",L.textContent="No narration provider for this book.";const F=document.createElement("div");F.className="rx-settings-playback-controls",F.hidden=!0;const j=ce("Narration speed",.5,3,.1),V=ce("Skip forward (seconds)",5,60,5);return F.append(j.row,V.row),p.append(L,F),h.append(d,m,z,I,p),n.append(o,i,s,h),e.append(r,n),{root:n,scrim:r,closeBtn:a,scopeGlobalBtn:l,scopeBookBtn:c,tabsRow:s,tabButtons:b,panels:{typography:d,layout:m,theme:z,controls:I,playback:p},fontSizeInput:u.input,fontSizeValue:u.value,paragraphSpacingInput:f.input,paragraphSpacingValue:f.value,fontFamilyPills:y,flowPills:N,columnsPills:M,marginInput:T.input,marginValue:T.value,lineHeightInput:A.input,lineHeightValue:A.value,justifyToggle:E,hyphenateToggle:B,useBookLayoutToggle:_,themeSwatches:D,swipeToggle:R,tapZonePills:H,volumeKeysRow:O,volumeKeysToggle:C,playbackEmpty:L,playbackControls:F,narrationSpeedInput:j.input,narrationSpeedValue:j.value,skipForwardInput:V.input,skipForwardValue:V.value}}const Fr=`
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
`,Xe={fontSize:16,lineHeight:1.5,fontFamily:null,paragraphSpacing:0,maxColumnCount:2,gap:.05,maxInlineSize:720,maxBlockSize:1440,justify:!0,hyphenate:!0,isDark:!1,themeName:"default",flow:"paginated",useBookLayout:!0,marginTop:40,marginBottom:40,marginLeft:40,marginRight:40,linkSideMargins:!0},Le=[{id:"light",label:"Light",themeName:"default",isDark:!1,swatchBg:"#ffffff",swatchFg:"#000000"},{id:"sepia",label:"Sepia",themeName:"sepia",isDark:!1,swatchBg:"#f1e8d0",swatchFg:"#5b4636"},{id:"dark",label:"Dark",themeName:"default",isDark:!0,swatchBg:"#222222",swatchFg:"#e0e0e0"},{id:"amoled",label:"AMOLED",themeName:"amoled",isDark:!0,swatchBg:"#000000",swatchFg:"#ffffff"}];function Or(e,r){return Le.find(n=>n.themeName===e&&n.isDark===r)??Le.find(n=>n.id===(r?"dark":"light"))}const Ze=[{id:"publisher",label:"Publisher",value:null},{id:"serif",label:"Serif",value:'Georgia, "Iowan Old Style", "Times New Roman", serif'},{id:"sans",label:"Sans-serif",value:'-apple-system, "Segoe UI", Roboto, Arial, sans-serif'},{id:"mono",label:"Monospace",value:'"Courier New", monospace'}];function _r(e){return Array.from(e.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===e)}function $r(e){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const t=_r(e);if(t.length===0){o.preventDefault(),e.focus();return}const a=t[0],i=t[t.length-1],l=e.ownerDocument.activeElement;o.shiftKey&&l===a?(o.preventDefault(),i.focus()):!o.shiftKey&&l===i&&(o.preventDefault(),a.focus())}return e.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,e.removeEventListener("keydown",n)}}}const Je="reactor-settings-stylesheet",Dr=["typography","layout","theme","controls","playback"];function Rr(e){if(e.getElementById(Je))return;const r=e.createElement("style");r.id=Je,r.textContent=Fr,e.head.appendChild(r)}function Gr(e,r,n){var oe,ae,te;const o=e.ownerDocument??document;Rr(o);const t=Hr(e),a=$r(t.root),i={global:{...Xe},book:{...Xe}};let l="global",c="typography",s=!1,g=!1,b=((ae=(oe=n.hostChannel)==null?void 0:oe.getConfig())==null?void 0:ae.capabilities.playback)??!1,h=null;t.volumeKeysRow.hidden=!n.volumeKeysCapability;function d(x){e.classList.remove("theme-dark","theme-amoled"),x.themeName==="amoled"?e.classList.add("theme-amoled"):x.isDark&&e.classList.add("theme-dark")}function u(){return i[l]}function f(){const x=u().fontFamily;for(const S of Array.from(t.fontFamilyPills.children)){const Y=Ze.find(Q=>Q.id===S.dataset.value);S.setAttribute("aria-checked",String((Y==null?void 0:Y.value)===x))}}function y(){const x=Or(u().themeName,u().isDark);for(const S of Array.from(t.themeSwatches.children))S.setAttribute("aria-checked",String(S.dataset.value===x.id))}function m(x,S){for(const Y of Array.from(x.children))Y.setAttribute("aria-checked",String(Y.dataset.value===S))}function N(){t.playbackEmpty.hidden=b,t.playbackControls.hidden=!b}function M(){const x=u();t.fontSizeInput.value=String(x.fontSize),t.fontSizeInput.setAttribute("aria-valuetext",`${x.fontSize}px`),t.fontSizeValue.textContent=`${x.fontSize}px`,t.paragraphSpacingInput.value=String(x.paragraphSpacing),t.paragraphSpacingValue.textContent=`${x.paragraphSpacing}em`,f(),m(t.flowPills,x.flow),m(t.columnsPills,String(x.maxColumnCount)),t.marginInput.value=String(x.marginTop),t.marginValue.textContent=`${x.marginTop}px`,t.lineHeightInput.value=String(x.lineHeight),t.lineHeightValue.textContent=x.lineHeight.toFixed(2),t.justifyToggle.setAttribute("aria-pressed",String(x.justify)),t.hyphenateToggle.setAttribute("aria-pressed",String(x.hyphenate)),t.useBookLayoutToggle.setAttribute("aria-pressed",String(x.useBookLayout)),y(),N(),t.scopeGlobalBtn.setAttribute("aria-checked",String(l==="global")),t.scopeBookBtn.setAttribute("aria-checked",String(l==="book"))}function T(x){var S;i[l]={...i[l],...x},M(),r.applyStyles(i[l]),d(i[l]),(S=n.hostChannel)==null||S.emitIntent({type:"settingsChange",scope:l,settings:i[l]})}function A(){T({fontSize:Number(t.fontSizeInput.value)})}t.fontSizeInput.addEventListener("change",A);function E(){T({paragraphSpacing:Number(t.paragraphSpacingInput.value)})}t.paragraphSpacingInput.addEventListener("change",E);for(const x of Ze){const S=document.createElement("button");S.type="button",S.className="rx-settings-pill",S.setAttribute("role","radio"),S.setAttribute("aria-checked","false"),S.setAttribute("data-value",x.id),S.textContent=x.label,S.addEventListener("click",()=>T({fontFamily:x.value})),t.fontFamilyPills.appendChild(S)}function B(x){const S=x.currentTarget.dataset.value;T({flow:S})}for(const x of Array.from(t.flowPills.children))x.addEventListener("click",B);function _(x){const S=Number(x.currentTarget.dataset.value);T({maxColumnCount:S})}for(const x of Array.from(t.columnsPills.children))x.addEventListener("click",_);function z(){const x=Number(t.marginInput.value);T({marginTop:x,marginBottom:x,marginLeft:x,marginRight:x})}t.marginInput.addEventListener("change",z);function D(){T({lineHeight:Number(t.lineHeightInput.value)})}t.lineHeightInput.addEventListener("change",D);function I(){T({justify:!u().justify})}t.justifyToggle.addEventListener("click",I);function R(){T({hyphenate:!u().hyphenate})}t.hyphenateToggle.addEventListener("click",R);function H(){T({useBookLayout:!u().useBookLayout})}t.useBookLayoutToggle.addEventListener("click",H);for(const x of Le){const S=document.createElement("button");S.type="button",S.className="rx-settings-swatch",S.setAttribute("role","radio"),S.setAttribute("aria-checked","false"),S.setAttribute("aria-label",x.label),S.setAttribute("data-value",x.id);const Y=document.createElement("span");Y.className="rx-settings-swatch-dot",Y.style.background=x.swatchBg;const Q=document.createElement("span");Q.textContent=x.label,S.append(Y,Q),S.addEventListener("click",()=>T({themeName:x.themeName,isDark:x.isDark})),t.themeSwatches.appendChild(S)}let O=!0;function C(){O=!O,t.swipeToggle.setAttribute("aria-pressed",String(O)),r.setSwipe(O)}t.swipeToggle.addEventListener("click",C),t.swipeToggle.setAttribute("aria-pressed",String(O));let p="standard";function L(x){p=x.currentTarget.dataset.value??"standard",m(t.tapZonePills,p)}for(const x of Array.from(t.tapZonePills.children))x.addEventListener("click",L);m(t.tapZonePills,p);let F=!1;function j(){F=!F,t.volumeKeysToggle.setAttribute("aria-pressed",String(F))}t.volumeKeysToggle.addEventListener("click",j);function V(){var S;const x=Number(t.narrationSpeedInput.value);t.narrationSpeedValue.textContent=`${x.toFixed(1)}x`,(S=n.hostChannel)==null||S.emitIntent({type:"playback",action:"rateChange",positionSec:null,rate:x})}t.narrationSpeedInput.addEventListener("input",()=>{t.narrationSpeedValue.textContent=`${Number(t.narrationSpeedInput.value).toFixed(1)}x`}),t.narrationSpeedInput.addEventListener("change",V);function W(){t.skipForwardValue.textContent=`${t.skipForwardInput.value}s`}t.skipForwardInput.addEventListener("input",W),t.narrationSpeedInput.value="1",t.narrationSpeedValue.textContent="1.0x",t.skipForwardInput.value="30",t.skipForwardValue.textContent="30s";function U(x){x!==c&&(t.tabButtons[c].setAttribute("aria-selected","false"),t.panels[c].hidden=!0,c=x,t.tabButtons[c].setAttribute("aria-selected","true"),t.panels[c].hidden=!1)}for(const x of Dr)t.tabButtons[x].addEventListener("click",()=>U(x));U("typography"),t.tabButtons.typography.setAttribute("aria-selected","true"),t.panels.typography.hidden=!1;function K(x){x!==l&&(l=x,M(),r.applyStyles(i[l]),d(i[l]))}t.scopeGlobalBtn.addEventListener("click",()=>K("global")),t.scopeBookBtn.addEventListener("click",()=>K("book"));const k=(te=n.hostChannel)==null?void 0:te.onCommand(x=>{x.type==="setSettingsScope"?(i[x.scope]=x.settings,x.scope===l&&(M(),r.applyStyles(i[l]),d(i[l]))):x.type==="configure"&&(b=x.capabilities.playback,N())});function $(){var x;s||(s=!0,h=o.activeElement??null,e.classList.add("settings-open"),t.scrim.classList.add("visible"),a.activate(),t.root.focus({preventScroll:!0}),(x=n.onOpenChange)==null||x.call(n,!0))}function X(){var x,S;s&&(s=!1,e.classList.remove("settings-open"),t.scrim.classList.remove("visible"),a.deactivate(),(x=h==null?void 0:h.focus)==null||x.call(h),h=null,(S=n.onOpenChange)==null||S.call(n,!1))}function ee(){s?X():$()}t.closeBtn.addEventListener("click",X),t.scrim.addEventListener("click",X),M();function J(){g||(g=!0,k==null||k(),a.deactivate(),e.classList.remove("settings-open"),t.root.remove(),t.scrim.remove())}return{open:$,close:X,toggle:ee,isOpen:()=>s,getActiveSettings:()=>u(),getActiveScope:()=>l,destroy:J}}const qr={top:0,right:0,bottom:0,left:0};function Qe(e,r){e.style.setProperty("--rx-inset-top",`${Math.max(0,r.top)}px`),e.style.setProperty("--rx-inset-right",`${Math.max(0,r.right)}px`),e.style.setProperty("--rx-inset-bottom",`${Math.max(0,r.bottom)}px`),e.style.setProperty("--rx-inset-left",`${Math.max(0,r.left)}px`)}const Wr=280,et="reactor-shell-stylesheet";function Ur(e){if(e.getElementById(et))return;const r=e.createElement("style");r.id=et,r.textContent=xt,e.head.appendChild(r)}function Kr(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function Yr(){const e=new Set;return{getChromeState:()=>({barsVisible:!1,sidebar:"none"}),onChromeState:r=>(e.add(r),()=>e.delete(r)),setBarsVisible:()=>{},refreshSizeClass:()=>{},destroy:()=>{e.clear()}}}function Xr(e,r,n={}){var Ae,Te,Be,Ne,ze,Ie,Pe,Me;if((n.chrome??"reactor")==="host")return Yr();const t=e.ownerDocument??document;Ur(t);const a=pt(e),i=a.root;let l=!1,c=!1,s="none",g=!1,b=!1,h=null;const d=new Set;function u(){var q;if(b)return;const w={barsVisible:c,sidebar:s};for(const fe of d)fe(w);(q=n.hostChannel)==null||q.emitIntent({type:"chromeState",barsVisible:c,sidebar:s})}function f(w){c!==w&&(c=w,i.classList.toggle("ui-visible",c),u())}function y(){f(!c)}const m=Gt(i,w=>r.goTo(w),{eink:n.eink,onBack:()=>{var w;return(w=n.hostChannel)==null?void 0:w.emitIntent({type:"back"})},onSidebarChange:w=>{s=w?"left":"none",a.contentsBtn.setAttribute("aria-pressed",String(w)),u(),T()}});function N(){return i.classList.contains("size-desktop")}function M(){if(m.isOpen()){m.close();return}N()||J.close(),re.close(),m.open()}a.contentsBtn.addEventListener("click",M);function T(){const w=i.classList.contains("size-desktop");ie(i,{left:w&&m.isOpen()?Wr:0})}function A(){i.classList.toggle("reduced-motion",B||Kr())}function E(){i.classList.toggle("e-ink",B)}let B=((Te=(Ae=n.hostChannel)==null?void 0:Ae.getConfig())==null?void 0:Te.eink)??!!n.eink;E(),A(),Qe(i,((Ne=(Be=n.hostChannel)==null?void 0:Be.getConfig())==null?void 0:Ne.insets)??qr);const _=(ze=n.hostChannel)==null?void 0:ze.onCommand(w=>{w.type==="configure"&&(B=w.eink,E(),A(),Qe(i,w.insets))});function z(){const w=e.clientWidth||i.clientWidth,q=ke(w);i.classList.remove("size-phone","size-fold-tablet","size-desktop"),i.classList.add(`size-${q}`),T()}z();function D(){z(),J.refreshLayout()}const I=typeof ResizeObserver=="function"?new ResizeObserver(()=>D()):null;I==null||I.observe(e);const R=()=>D();I||window.addEventListener("resize",R);const H=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,O=()=>A();(Ie=H==null?void 0:H.addEventListener)==null||Ie.call(H,"change",O);function C(w,q){const fe=ft(w,l);fe==="prev"?r.prev():fe==="next"?r.next():y()}function p(w){w==="prev"?r.prev():w==="next"?r.next():y()}function L(w,q){q.key!=="Enter"&&q.key!==" "||(q.preventDefault(),p(w))}const F=()=>p(l?"next":"prev"),j=()=>p(l?"prev":"next"),V=()=>p("toggle"),W=w=>L(l?"next":"prev",w),U=w=>L(l?"prev":"next",w),K=w=>L("toggle",w);a.zoneLeft.addEventListener("click",F),a.zoneRight.addEventListener("click",j),a.zoneCentre.addEventListener("click",V),a.zoneLeft.addEventListener("keydown",W),a.zoneRight.addEventListener("keydown",U),a.zoneCentre.addEventListener("keydown",K);function k(){return re.isOpen()?(re.close(),!0):Q!=null&&Q.isOpen()?(Q.close(),!0):v.isOpen()?(v.close(),!0):J.isOpen()?(oe(),!0):m.isOpen()?(m.close(),!0):c?(f(!1),!0):!1}function $(w){const q=vt(w);q&&(yt(q)&&w.preventDefault(),q==="next"?r.next():q==="prev"?r.prev():q==="toggleBars"?y():q==="escape"&&k())}t.addEventListener("keydown",$);const X=()=>r.historyBack(),ee=()=>r.historyForward();a.historyBackBtn.addEventListener("click",X),a.historyForwardBtn.addEventListener("click",ee);const J=yr(i,r,{getSizeClass:()=>ke(e.clientWidth||i.clientWidth),onWidthChange:n.onContextWidthChange,hostChannel:n.hostChannel,onClose:()=>{s="none",a.contextBtn.setAttribute("aria-pressed","false"),u()}});function oe(){s==="right"?(J.close(),s="none"):(N()||m.close(),re.close(),J.open(),s="right"),a.contextBtn.setAttribute("aria-pressed",String(s==="right")),u()}a.contextBtn.addEventListener("click",oe);const ae=n.hostChannel?Lr(i,r,n.hostChannel,{eink:n.eink}):null;let te=new Set;function x(){a.bookmarkBtn.setAttribute("aria-pressed",String(!!h&&te.has(h)))}function S(){!n.hostChannel||!h||n.hostChannel.emitIntent({type:"bookmarkToggle",cfi:h})}const Y=(Pe=n.hostChannel)==null?void 0:Pe.onCommand(w=>{w.type==="setBookmarks"&&(te=new Set(w.items.map(q=>q.cfi)),x())});a.bookmarkBtn.addEventListener("click",S);const Q=n.hostChannel?zr({shellRoot:i,core:r,hostChannel:n.hostChannel,options:{eink:n.eink}}):null,re=Gr(i,r,{getSizeClass:()=>ke(e.clientWidth||i.clientWidth),eink:n.eink,hostChannel:n.hostChannel,volumeKeysCapability:n.volumeKeysCapability,onOpenChange:w=>{a.settingsBtn.setAttribute("aria-pressed",String(w))}});function de(){if(re.isOpen()){re.close();return}m.close(),J.close(),s="none",a.contentsBtn.setAttribute("aria-pressed","false"),a.contextBtn.setAttribute("aria-pressed","false"),u(),re.open()}a.settingsBtn.addEventListener("click",de);const v=br(i,r,{onOpenInGlossary:w=>{J.openGlossaryTerm(w),s="right",a.contextBtn.setAttribute("aria-pressed","true"),u()}}),P=(Me=n.hostChannel)==null?void 0:Me.onCommand(w=>{var q;w.type==="dismiss"&&!k()&&((q=n.hostChannel)==null||q.emitIntent({type:"back"}))}),Z=()=>{g=!0},ne=()=>{g=!1,r.goToFraction(Number(a.scrubber.value)/1e3)};a.scrubber.addEventListener("pointerdown",Z),a.scrubber.addEventListener("change",ne);function se(w){switch(w.type){case"loaded":l=w.isRtl,i.classList.toggle("is-rtl",l),m.setToc(w.toc),T();break;case"relocate":h=w.cfi??null,a.chapterLabel&&a.chapterLabel.textContent!==(w.chapterTitle??"")&&(a.chapterLabel.textContent=w.chapterTitle??""),!g&&typeof w.fraction=="number"&&(a.scrubber.value=String(Math.round(w.fraction*1e3))),m.setCurrentChapterTitle(w.chapterTitle),x();break;case"history":a.historyBackBtn.disabled=!w.canGoBack,a.historyForwardBtn.disabled=!w.canGoForward;break;case"tap":C(w.x,w.y);break}}const ot=r.on(se);function st(){z()}function it(){var w;b||(b=!0,ot(),I==null||I.disconnect(),I||window.removeEventListener("resize",R),(w=H==null?void 0:H.removeEventListener)==null||w.call(H,"change",O),t.removeEventListener("keydown",$),a.zoneLeft.removeEventListener("click",F),a.zoneRight.removeEventListener("click",j),a.zoneCentre.removeEventListener("click",V),a.zoneLeft.removeEventListener("keydown",W),a.zoneRight.removeEventListener("keydown",U),a.zoneCentre.removeEventListener("keydown",K),a.historyBackBtn.removeEventListener("click",X),a.historyForwardBtn.removeEventListener("click",ee),a.contextBtn.removeEventListener("click",oe),a.bookmarkBtn.removeEventListener("click",S),Y==null||Y(),P==null||P(),_==null||_(),Q==null||Q.destroy(),J.destroy(),ae==null||ae.destroy(),a.settingsBtn.removeEventListener("click",de),re.destroy(),v.destroy(),a.scrubber.removeEventListener("pointerdown",Z),a.scrubber.removeEventListener("change",ne),a.contentsBtn.removeEventListener("click",M),m.destroy(),d.clear(),i.classList.remove("reader-shell","ui-visible","e-ink","reduced-motion","is-rtl","size-phone","size-fold-tablet","size-desktop","settings-open"),a.zones.remove(),a.topBar.remove(),a.bottomBar.remove())}return{getChromeState:()=>({barsVisible:c,sidebar:s}),onChromeState:w=>(d.add(w),()=>d.delete(w)),setBarsVisible:f,refreshSizeClass:st,destroy:it}}export{He as ZONE_FRACTION,ke as computeSizeClass,yt as isPreventableKey,Lr as mountPlaybackBar,yr as mountRightSidebar,Gr as mountSettingsPanel,Xr as mountShell,vt as resolveKeyboardAction,ft as resolveTapZone};
