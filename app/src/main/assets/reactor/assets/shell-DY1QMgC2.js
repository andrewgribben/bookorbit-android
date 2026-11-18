var Dt=Object.defineProperty;var Gt=(t,r,n)=>r in t?Dt(t,r,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[r]=n;var W=(t,r,n)=>Gt(t,typeof r!="symbol"?r+"":r,n);import{A as Kt,D as st}from"./index-BO03ueUB.js";const Vt={menu:'<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',bookmark:'<path d="M19 21 12 16l-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',panel_right:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M15 3v18"/>',back:'<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',forward:'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',skip_back:'<polygon points="11 19 2 12 11 5 11 19"/><polygon points="22 19 13 12 22 5 22 19"/>',skip_forward:'<polygon points="13 19 22 12 13 5 13 19"/><polygon points="2 19 11 12 2 5 2 19"/>',play:'<polygon points="6 3 20 12 6 21 6 3"/>',pause:'<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>',headphones:'<path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a1 1 0 0 1-1-1v-6a9 9 0 0 1 18 0v6a1 1 0 0 1-1 1h-2a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3"/>',sleep:'<path d="M12 3a9 9 0 1 0 9 9 7 7 0 0 1-9-9z"/>'};function Be(t){return`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${Vt[t]}</svg>`}function we(t,r,n=!1){const o=document.createElement("button");return o.type="button",o.className="rx-icon-btn",o.setAttribute("aria-label",t),o.innerHTML=Be(r),n&&o.setAttribute("aria-pressed","false"),o}function qt(t){t.classList.add("reader-shell");const r=document.createElement("div");r.className="rx-zones";const n=document.createElement("div");n.className="rx-zone rx-zone-left",n.setAttribute("role","button"),n.setAttribute("tabindex","0"),n.setAttribute("aria-label","Previous page");const o=document.createElement("div");o.className="rx-zone rx-zone-centre",o.setAttribute("role","button"),o.setAttribute("tabindex","0"),o.setAttribute("aria-label","Toggle bars");const e=document.createElement("div");e.className="rx-zone rx-zone-right",e.setAttribute("role","button"),e.setAttribute("tabindex","0"),e.setAttribute("aria-label","Next page"),r.append(n,o,e);const a=document.createElement("div");a.className="rx-bar rx-bar-top",a.setAttribute("role","toolbar");const i=we("Table of contents","menu",!0),l=we("Bookmark","bookmark",!0),d=we("Toggle narration","headphones",!0);d.hidden=!0;const s=we("Text settings","settings",!0),v=we("Open context panel","panel_right",!0),h=document.createElement("div");h.className="rx-bar-spacer",a.append(i,l,h,d,s,v);const b=document.createElement("div");b.className="rx-bar rx-bar-bottom";const u=document.createElement("div");u.className="rx-status-row rx-chapter-row",u.setAttribute("aria-live","polite");const x=document.createElement("span");x.className="rx-chapter-label",u.append(x);const k=document.createElement("div");k.className="rx-bottom-row";const w=we("Back","back");w.disabled=!0;const p=we("Forward","forward");p.disabled=!0;const C=document.createElement("input");return C.type="range",C.className="rx-scrubber",C.min="0",C.max="1000",C.step="1",C.value="0",C.setAttribute("aria-label","Reading position"),k.append(w,C,p),b.append(u,k),t.append(r,a,b),{root:t,zones:r,zoneLeft:n,zoneCentre:o,zoneRight:e,topBar:a,bottomBar:b,contentsBtn:i,bookmarkBtn:l,narrationBtn:d,settingsBtn:s,contextBtn:v,historyBackBtn:w,historyForwardBtn:p,chapterLabel:x,scrubber:C}}const Wt=`
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

  /* BO-53 (bars): the book column's own reserved space (src/shell/layout.ts setBookInsets).
   * --rx-book-inset-bottom-playback feeds the bottom-bar-above-playback-bar stacking rule in
   * src/shell/playback/stylesheet.ts; -top/-bottom are informational (the real top/bottom
   * reflow is plain padding on the foliate-view element, not a CSS rule here - see
   * layout.ts). 0px default so a host/harness that never calls setBookInsets sees no change. */
  --rx-book-inset-top: 0px;
  --rx-book-inset-bottom: 0px;
  --rx-book-inset-bottom-playback: 0px;

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
  /* BO-53 (bars): vertical padding compacted from --rx-space-2 (8px) to --rx-space-1 (4px) -
   * the owner report was "too much white space...overlaps the content"; the 44px buttons inside
   * (below) already carry the touch target, so the bar doesn't also need 8px of padding on top
   * of that to stay comfortable to tap. Horizontal padding (cutout-only) is untouched. */
  padding: var(--rx-space-1) calc(var(--rx-space-3) + var(--rx-inset-right)) var(--rx-space-1) calc(var(--rx-space-3) + var(--rx-inset-left));
  background: color-mix(in srgb, var(--rx-surface) 92%, transparent);
  border-color: var(--rx-border);
  transition: transform var(--rx-motion-bar);
}
/* BO-53 (bars): the top/bottom reading bars use a 44px touch target instead of the shared
 * .rx-icon-btn's 48px (sidebars, settings, playback bar keep 48px - this is scoped to .rx-bar
 * only, never a global change) - the smallest size the task allows, freeing up the vertical
 * padding removed above while the row still clears a comfortable tap target. */
.rx-bar .rx-icon-btn {
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
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
  padding-top: calc(var(--rx-space-1) + var(--rx-inset-top));
  box-shadow: var(--rx-elevation); /* taste-skill-ignore: real sticky overlay bar, not an at-rest element */
  transform: translateY(-100%);
}
.rx-bar-bottom {
  bottom: 0;
  padding-bottom: calc(var(--rx-space-1) + var(--rx-inset-bottom));
  box-shadow: 0 -10px 24px rgba(20, 20, 30, 0.14); /* taste-skill-ignore: real sticky overlay bar, not an at-rest element */
  flex-direction: column;
  align-items: stretch;
  gap: var(--rx-space-1);
  /* U7's bottom override in src/shell/playback/stylesheet.ts lifts this bar above a docked
   * playback bar while visible; the hidden offset has to add the same inset back on top of its
   * own height, or sliding down by only 100% lands this bar inside the reserved playback-bar
   * strip instead of fully below the viewport (U7 review: stray Forward arrow ghosting over the
   * playback bar's position readout). BO-53 (bars): reads the playback-only variable, not the
   * combined --rx-book-inset-bottom (which now also includes this bar's own reserved height -
   * see layout.ts - and would double it here). */
  transform: translateY(calc(100% + var(--rx-book-inset-bottom-playback, 0px)));
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
/* BO-53 (bars): on phone the chapter label is the second chrome row the owner's "too much
 * white space" report was about - the bottom bar collapses to one row there ([previous]
 * [scrubber] [next], see rx-bottom-row below); the label stays mounted (still readable to a
 * screen reader via aria-live) but visually collapses to nothing instead of adding a row. */
.reader-shell.size-phone .rx-chapter-row {
  position: absolute;
  width: 1px;
  height: 1px;
  min-height: 0; /* .rx-status-row's own min-height: 20px would otherwise win over height: 1px */
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
.rx-bottom-row {
  display: flex;
  align-items: center;
  gap: var(--rx-space-2);
}
.rx-bottom-row .rx-scrubber {
  flex: 1 1 auto;
  width: auto;
}

.rx-scrubber {
  appearance: none;
  width: 100%;
  /* BO-53 (bars): compacted from 48px to 44px (task's minimum touch target for this bar) - the
   * visual track stays thin via the pseudo-elements below, only the hit area shrinks. */
  height: 44px;
  margin: 0;
  background: transparent;
}
.rx-scrubber::-webkit-slider-runnable-track {
  height: 4px;
  background: var(--rx-border);
  border-radius: 2px;
}
/* BO-53 #5: --rx-border is too close to the dark/AMOLED bar's own background to read as a
 * track (owner report: "scrubber track is nearly invisible on the dark bar"); --rx-muted is
 * already guaranteed >=4.5:1 on these themes (see their own token comments above), well over
 * the 3:1 a track needs. */
.reader-shell.theme-dark .rx-scrubber::-webkit-slider-runnable-track,
.reader-shell.theme-amoled .rx-scrubber::-webkit-slider-runnable-track {
  background: var(--rx-muted);
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

/* BO-53 #5: enabled vs disabled history arrows were indistinguishable on dark/AMOLED (both
 * read as a similarly dim blend once :disabled's opacity cut into --rx-ink). Enabled stays the
 * full-contrast --rx-ink; disabled uses the dimmer but still >=4.5:1 --rx-muted at full opacity
 * instead of blending a bright colour down, so the two states are reliably distinct. */
.reader-shell.theme-dark .rx-bar .rx-icon-btn:disabled,
.reader-shell.theme-amoled .rx-bar .rx-icon-btn:disabled {
  opacity: 1;
  color: var(--rx-muted);
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
`,Ut=599,Yt=1200;function it(t){return t<=Ut?"phone":t<=Yt?"fold-tablet":"desktop"}const ut=.3;function jt(t,r){const n=Math.min(1,Math.max(0,t));return n<ut?r?"next":"prev":n>1-ut?r?"prev":"next":"toggle"}const Zt=new Set(["ArrowRight","ArrowDown","PageDown"," "]),Xt=new Set(["ArrowLeft","ArrowUp","PageUp"]);function Jt(t){return t.ctrlKey||t.metaKey||t.altKey?null:Zt.has(t.key)?"next":Xt.has(t.key)?"prev":t.key==="m"||t.key==="M"?"toggleBars":t.key==="Escape"?"escape":null}function Qt(t){return t==="next"||t==="prev"}const er='<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',tr='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function pt(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-icon-btn",n.setAttribute("aria-label",t),n.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,n}function rr(t){const r=document.createElement("div");r.className="rx-left-sidebar",r.setAttribute("aria-label","Table of contents"),r.tabIndex=-1;const n=document.createElement("div");n.className="rx-left-sidebar-scrim";const o=document.createElement("div");o.className="rx-sidebar-head";const e=pt("Back",er),a=document.createElement("h3");a.className="rx-sidebar-title",a.textContent="Contents";const i=pt("Close contents",tr);i.classList.add("rx-left-sidebar-close"),o.append(e,a,i);const l=document.createElement("div");l.className="rx-left-sidebar-tabs",l.setAttribute("role","tablist");function d(O,F){const S=document.createElement("button");return S.type="button",S.className="rx-left-sidebar-tab",S.setAttribute("role","tab"),S.setAttribute("aria-selected","false"),S.setAttribute("data-tab",F),S.id=`rx-tab-${F}`,S.textContent=O,S}const s=d("Contents","contents"),v=d("Starred","starred"),h=d("Related","related");l.append(s,v,h);const b=document.createElement("div");b.className="rx-left-sidebar-body";function u(O){const F=document.createElement("div");return F.className="rx-sidebar-panel",F.setAttribute("role","tabpanel"),F.setAttribute("data-panel",O),F.setAttribute("aria-labelledby",`rx-tab-${O}`),F.hidden=!0,F}const x=u("contents"),k=document.createElement("div");k.className="rx-toc-scroll";const w=document.createElement("div");w.className="rx-toc-spacer";const p=document.createElement("div");p.className="rx-toc-window",p.setAttribute("role","list"),w.appendChild(p),k.appendChild(w),x.appendChild(k);const C=u("starred"),L=u("related");return b.append(x,C,L),r.append(o,l,b),t.append(n,r),{root:r,scrim:n,backBtn:e,closeBtn:i,title:a,tablist:l,tabContents:s,tabStarred:v,tabRelated:h,body:b,panelContents:x,tocScroll:k,tocSpacer:w,tocWindow:p,panelStarred:C,panelRelated:L}}const nr=`
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
/* polish #3: top-level entries read as the stronger hierarchy level; children stay at the
 * label's own regular weight (set on .rx-toc-label below) so parent/child are told apart by
 * more than indent alone. */
.rx-toc-row-top .rx-toc-label {
  font-weight: 600;
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
}
.rx-toc-toggle svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  transform: rotate(0deg);
  transition: transform 150ms ease; /* suppressed globally under .e-ink/.reduced-motion (stylesheet.ts) */
}
.rx-toc-toggle[aria-expanded='true'] svg {
  transform: rotate(90deg);
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
  /* polish #6: colour + background carry the selected state; weight must not change here, or
   * webkit-line-clamp re-truncates the selected row at a different point from its neighbours
   * as the bold glyphs measure wider (visible when a reader scrolls past the current chapter). */
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
`;function Nt(t,r=null,n=0){const o=[];for(let e=0;e<t.length;e++){const a=t[e],i=r===null?String(e):`${r}.${e}`;o.push({id:i,label:a.label,href:a.href,depth:n,hasChildren:a.subitems.length>0,parentId:r}),a.subitems.length>0&&o.push(...Nt(a.subitems,i,n+1))}return o}function ar(t,r){if(r.size===0)return t;const n=new Set,o=[];for(const e of t){if(e.parentId!==null&&(n.has(e.parentId)||r.has(e.parentId))){n.add(e.id);continue}o.push(e)}return o}function It(t,r){if(!r)return null;const n=ht(r);let o=null;for(const e of t)if(e.href){if(e.href===r)return e.id;o===null&&ht(e.href)===n&&(o=e)}return(o==null?void 0:o.id)??null}function zt(t,r){if(!r)return null;for(const n of t)if(n.label===r)return n.id;return null}function or(t){const r=new Set;for(const n of t)n.hasChildren&&r.add(n.id);return r}function sr(t,r,n){if(!n)return;const o=new Map(t.map(a=>[a.id,a]));let e=o.get(n)??null;for(;e&&e.parentId!==null;)r.delete(e.parentId),e=o.get(e.parentId)??null}function ht(t){const r=t.indexOf("#");return r===-1?t:t.slice(0,r)}function ir(t,r,n,o,e=8){if(o===0||r<=0)return{start:0,end:-1};const a=Math.floor(t/r),i=Math.ceil(n/r),l=Math.max(0,a-e),d=Math.min(o-1,a+i+e);return{start:l,end:d}}const rt=48,lr=12,cr=20,dr=4,ur='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m9 18 6-6-6-6"/></svg>';function pr(t,r,n,o){const e=document.createElement("div");e.className="rx-toc-row",e.setAttribute("role","listitem"),t.depth===0&&e.classList.add("rx-toc-row-top");const a=Math.min(t.depth,dr);if(e.style.paddingLeft=`${lr+a*cr}px`,o&&e.classList.add("is-current"),t.hasChildren){const s=document.createElement("button");s.type="button",s.className="rx-toc-toggle";const v=!r.collapsed.has(t.id);s.setAttribute("aria-expanded",String(v)),s.setAttribute("aria-label",`${v?"Collapse":"Expand"} ${t.label}`),s.innerHTML=ur,s.addEventListener("click",h=>{h.stopPropagation(),n.onToggleExpand(t)}),e.appendChild(s)}else{const s=document.createElement("span");s.className="rx-toc-toggle-spacer",e.appendChild(s)}const i=document.createElement("button");i.type="button",i.className="rx-toc-label",i.setAttribute("aria-label",t.label),o&&i.setAttribute("aria-current","true"),i.textContent=t.label,i.addEventListener("click",()=>n.onActivate(t)),e.appendChild(i);const l=document.createElement("button");l.type="button",l.className="rx-toc-star";const d=t.href?r.starred.has(t.href):!1;return l.setAttribute("aria-pressed",String(d)),l.setAttribute("aria-label",`${d?"Unstar":"Star"} ${t.label}`),l.textContent=d?"★":"☆",l.addEventListener("click",s=>{s.stopPropagation(),n.onToggleStar(t)}),e.appendChild(l),e}function hr(t,r,n,o){if(t<0)return 0;const e=t*r-n/2+r/2,a=Math.max(0,o*r-n),i=Math.max(0,Math.min(e,a)),l=Math.floor(i/r)*r;return Math.max(0,Math.min(l,a))}function br(t,r,n,o,e,a=!1){const i=ar(o.flat,o.collapsed),l=It(i,o.currentHref)??zt(i,o.currentChapterTitle);if(r.style.height=`${i.length*rt}px`,a&&l!==null){const h=i.findIndex(b=>b.id===l);if(h!==-1){const b=t.clientHeight||1;t.scrollTop=hr(h,rt,b,i.length)}}const d=t.clientHeight||1,{start:s,end:v}=ir(t.scrollTop,rt,d,i.length);n.replaceChildren(),n.style.transform=`translateY(${s*rt}px)`;for(let h=s;h<=v;h++){const b=i[h];b&&n.appendChild(pr(b,o,e,b.id===l))}}function fr(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No starred chapters yet. Star a chapter in Contents to find it here.",t.appendChild(e);return}const o=document.createElement("div");o.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-starred-row",a.setAttribute("role","listitem"),a.textContent=e.label,a.addEventListener("click",()=>n(e)),o.appendChild(a)}t.appendChild(o)}function xr(t,r,n){if(t.replaceChildren(),r.length===0){const e=document.createElement("p");e.className="rx-sidebar-empty",e.textContent="No related books yet.",t.appendChild(e);return}const o=document.createElement("div");o.setAttribute("role","list");for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-related-row",a.setAttribute("role","listitem");const i=`${e.title}${e.subtitle?`, ${e.subtitle}`:""}${e.read?", read":""}`;if(a.setAttribute("aria-label",i),e.coverUrl){const s=document.createElement("img");s.className="rx-related-cover",s.src=e.coverUrl,s.alt="",a.appendChild(s)}else{const s=document.createElement("div");s.className="rx-related-cover rx-related-cover-empty",a.appendChild(s)}const l=document.createElement("div");l.className="rx-related-text";const d=document.createElement("span");if(d.className="rx-related-title",d.textContent=e.title,l.appendChild(d),e.subtitle){const s=document.createElement("span");s.className="rx-related-subtitle",s.textContent=e.subtitle,l.appendChild(s)}if(a.appendChild(l),e.read){const s=document.createElement("span");s.className="rx-related-badge",s.textContent="Read",a.appendChild(s)}a.addEventListener("click",()=>n(e)),o.appendChild(a)}t.appendChild(o)}function Pt(t,r){return Ft(t,r,1)}function Mt(t,r){return Ft(t,r,-1)}function Ft(t,r,n){if(t.length===0)return r;const o=t.indexOf(r);if(o===-1)return t[0];const e=(o+n+t.length)%t.length;return t[e]}function gr(t,r){return Pt(t,r)}function mr(t,r){return Mt(t,r)}const vr=40;function yr(t,r){return Math.abs(t)>=vr&&Math.abs(t)>Math.abs(r)}function Ot(t,r,n,o){return yr(r,n)?t==="sidebar"?{action:r<0?"cycle-next":"cycle-prev"}:t==="book"&&o?{action:"close"}:{action:null}:{action:null}}function Ht(t,r,n){return t&&r.contains(t)?"sidebar":t&&n.contains(t)&&!r.contains(t)?"book":"other"}function Rt(t,r){let n=0,o=0,e=0,a=0,i=null,l=!1,d=!1;function s(p,C,L,O){n=e=p,o=a=C,i=L,l=!0,d=O}function v(){l&&(l=!1,r.onSwipe(e-n,a-o,i),i=null)}function h(p){p.pointerType!=="pen"&&s(p.clientX,p.clientY,p.target,p.pointerType==="touch")}function b(p){l&&(e=p.clientX,a=p.clientY)}function u(p){e=p.clientX,a=p.clientY,v()}function x(){d||v()}function k(p){if(!l)return;const C=p.touches[0];C&&(e=C.clientX,a=C.clientY)}function w(){v()}return t.addEventListener("pointerdown",h),t.addEventListener("pointermove",b),t.addEventListener("pointerup",u),t.addEventListener("pointercancel",x),t.addEventListener("touchmove",k,{passive:!0}),t.addEventListener("touchend",w,{passive:!0}),{destroy(){t.removeEventListener("pointerdown",h),t.removeEventListener("pointermove",b),t.removeEventListener("pointerup",u),t.removeEventListener("pointercancel",x),t.removeEventListener("touchmove",k),t.removeEventListener("touchend",w)}}}function kr(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function wr(t){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const e=kr(t);if(e.length===0){o.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],l=t.ownerDocument.activeElement;o.shiftKey&&l===a?(o.preventDefault(),i.focus()):!o.shiftKey&&l===i&&(o.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const bt="reactor-left-sidebar-stylesheet";function Er(t){if(t.getElementById(bt))return;const r=t.createElement("style");r.id=bt,r.textContent=nr,t.head.appendChild(r)}function Sr(t,r,n={}){var X,J;const o=t.ownerDocument??document;Er(o);const e=rr(t);e.root.classList.add("closed");const a=["contents","starred"];(X=n.capabilities)!=null&&X.related&&a.push("related"),e.tabRelated.hidden=!((J=n.capabilities)!=null&&J.related);let i="contents",l=!1,d=!1,s=[];const v=new Set;let h=null,b=null;const u=new Set,x=new Map;let k=[];const w=wr(e.root);let p=null;function C(){return!t.classList.contains("size-desktop")}function L(T){return T==="contents"?e.panelContents:T==="starred"?e.panelStarred:e.panelRelated}function O(T){return T==="contents"?e.tabContents:T==="starred"?e.tabStarred:e.tabRelated}function F(){return It(s,h)??zt(s,b)}function S(){sr(s,v,F())}function A(T=!1){if(i==="contents")br(e.tocScroll,e.tocSpacer,e.tocWindow,{flat:s,collapsed:v,currentHref:h,currentChapterTitle:b,starred:u},{onActivate:f=>{f.href&&r(f.href),C()&&M()},onToggleExpand:f=>{v.has(f.id)?v.delete(f.id):v.add(f.id),A()},onToggleStar:f=>{var H;if(!f.href)return;const P=!u.has(f.href);P?(u.add(f.href),x.set(f.href,f.label)):(u.delete(f.href),x.delete(f.href)),(H=n.onStarToggle)==null||H.call(n,f.href,f.label,P),A()}},T);else if(i==="starred"){const f=Array.from(x,([P,H])=>({href:P,label:H}));fr(e.panelStarred,f,P=>{r(P.href),C()&&M()})}else xr(e.panelRelated,k,f=>{var P;(P=n.onOpenRelated)==null||P.call(n,f.id),C()&&M()})}function B(T){T!==i&&(O(i).setAttribute("aria-selected","false"),L(i).hidden=!0,i=T,O(i).setAttribute("aria-selected","true"),L(i).hidden=!1,A(T==="contents"))}function $(T){const f=T===1?gr(a,i):mr(a,i);B(f)}e.tabContents.addEventListener("click",()=>B("contents")),e.tabStarred.addEventListener("click",()=>B("starred")),e.tabRelated.addEventListener("click",()=>B("related")),B("contents"),O("contents").setAttribute("aria-selected","true"),L("contents").hidden=!1;function U(){var f;if(l)return;l=!0,p=o.activeElement??null,e.root.classList.add("open"),e.root.classList.remove("closed"),t.classList.add("rx-left-sidebar-open"),e.scrim.classList.toggle("visible",C());const T=C();e.root.setAttribute("role",T?"dialog":"complementary"),T?e.root.setAttribute("aria-modal","true"):e.root.removeAttribute("aria-modal"),T&&(w.activate(),e.root.focus()),i==="contents"&&A(!0),(f=n.onSidebarChange)==null||f.call(n,!0)}function M(){var T,f;l&&(l=!1,e.root.classList.remove("open"),e.root.classList.add("closed"),t.classList.remove("rx-left-sidebar-open"),e.scrim.classList.remove("visible"),w.deactivate(),(T=p==null?void 0:p.focus)==null||T.call(p),p=null,(f=n.onSidebarChange)==null||f.call(n,!1))}e.closeBtn.addEventListener("click",M),e.scrim.addEventListener("click",M),e.backBtn.addEventListener("click",()=>{var T;return(T=n.onBack)==null?void 0:T.call(n)});const z=Rt(t,{onSwipe:(T,f,P)=>{const H=Ht(P,e.root,t),R=Ot(H,T,f,C());!l&&R.action!==null||(R.action==="cycle-next"?$(1):R.action==="cycle-prev"?$(-1):R.action==="close"&&M())}});let V=null;function D(){i==="contents"&&V===null&&(V=requestAnimationFrame(()=>{V=null,A(!1)}))}e.tocScroll.addEventListener("scroll",D,{passive:!0});function _(T){s=Nt(T),v.clear();for(const f of or(s))v.add(f);S(),i==="contents"&&A(!0)}function y(T){x.clear(),u.clear();for(const f of T)u.add(f.href),x.set(f.href,f.label);(i==="starred"||i==="contents")&&A()}function N(T){k=T,i==="related"&&A()}function G(T){h=T,S(),i==="contents"&&A(l)}function Z(T){b=T,S(),i==="contents"&&A(l)}function Y(){d||(d=!0,z.destroy(),V!==null&&cancelAnimationFrame(V),e.tocScroll.removeEventListener("scroll",D),e.closeBtn.removeEventListener("click",M),e.scrim.removeEventListener("click",M),w.deactivate(),t.classList.remove("rx-left-sidebar-open"),e.root.remove(),e.scrim.remove())}return{open:U,close:M,isOpen:()=>l,cycleTab:$,getActiveTab:()=>i,setToc:_,setStarred:y,setRelated:N,setCurrentHref:G,setCurrentChapterTitle:Z,destroy:Y}}function lt(t,r,n){const o=document.createElement("button");return o.type="button",o.className="rx-sidebar-tab",o.textContent=t,o.setAttribute("role","tab"),o.setAttribute("aria-selected",String(r)),o.dataset.tab=n,r&&o.classList.add("active"),o}function Cr(t){const r=t.createElement("div");r.className="rx-right-sidebar",r.setAttribute("role","complementary"),r.setAttribute("aria-label","Context panel");const n=t.createElement("div");n.className="rx-sidebar-resize",n.setAttribute("role","separator"),n.setAttribute("aria-orientation","vertical"),n.setAttribute("aria-label","Resize context panel"),n.setAttribute("tabindex","0");const o=t.createElement("div");o.className="rx-sidebar-tabs";const e=t.createElement("div");e.className="rx-sidebar-tablist",e.setAttribute("role","tablist");const a=lt("Context",!0,"context"),i=lt("Glossary",!1,"glossary"),l=lt("Notes",!1,"notes");l.disabled=!0;const d=t.createElement("button");d.type="button",d.className="rx-icon-btn rx-sidebar-close",d.setAttribute("aria-label","Close panel"),d.textContent="✕",e.append(a,i,l),o.append(e,d);const s=t.createElement("div");s.className="rx-ctx-searchbar",s.setAttribute("role","search");const v=t.createElement("input");v.type="search",v.className="rx-ctx-search-input",v.placeholder="Search this book",v.setAttribute("aria-label","Search this book");const h=t.createElement("button");h.type="button",h.className="rx-icon-btn rx-ctx-openmain",h.setAttribute("aria-label","Open in main window"),h.disabled=!0,h.textContent="↗";const b=t.createElement("div");b.className="rx-ctx-crumbs",b.setAttribute("aria-live","polite"),s.append(v,h,b);const u=t.createElement("div");u.className="rx-sidebar-body";const x=t.createElement("div");x.className="rx-ctx-results";const k=t.createElement("div");k.className="rx-ctx-page",k.hidden=!0;const w=t.createElement("div");w.className="rx-notes-body",w.hidden=!0;const p=t.createElement("div");return p.className="rx-glossary-panel-mount",p.hidden=!0,u.append(x,k,w,p),r.append(n,o,s,u),{root:r,resizeHandle:n,tabsRow:o,contextTabBtn:a,glossaryTabBtn:i,notesTabBtn:l,closeBtn:d,searchBar:s,searchInput:v,openInMainBtn:h,breadcrumb:b,body:u,resultsScroller:x,contextPage:k,notesBody:w,glossaryPanelMount:p}}const Lr=`
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
`;class Ar{constructor(){W(this,"rows",[]);W(this,"headerAt",new Map)}reset(){this.rows=[],this.headerAt.clear()}addGroup(r,n){if(n.length!==0){this.headerAt.has(r)||(this.headerAt.set(r,this.rows.length),this.rows.push({kind:"header",label:r}));for(const o of n)this.rows.push({kind:"item",item:o,groupLabel:r})}}get rowCount(){return this.rows.length}rowAt(r){return this.rows[r]}get isEmpty(){return this.rows.length===0}}class _t{constructor(r){W(this,"container");W(this,"rowHeight");W(this,"buffer");W(this,"opts");W(this,"topSpacer");W(this,"bottomSpacer");W(this,"rowsEl");W(this,"onScroll");W(this,"destroyed",!1);this.opts=r,this.container=r.container,this.rowHeight=r.rowHeight,this.buffer=r.buffer??6,this.topSpacer=document.createElement("div"),this.topSpacer.className="rx-wlist-spacer",this.bottomSpacer=document.createElement("div"),this.bottomSpacer.className="rx-wlist-spacer",this.rowsEl=document.createElement("div"),this.rowsEl.className="rx-wlist-rows",this.rowsEl.setAttribute("role","list"),this.container.replaceChildren(this.topSpacer,this.rowsEl,this.bottomSpacer),this.onScroll=()=>this.render(),this.container.addEventListener("scroll",this.onScroll)}visibleRange(){const r=this.opts.rowCount(),n=this.container.clientHeight||1,o=this.container.scrollTop||0,e=Math.max(0,Math.floor(o/this.rowHeight)-this.buffer),a=Math.ceil(n/this.rowHeight)+this.buffer*2,i=Math.min(r,e+a);return{first:e,last:i}}render(){if(this.destroyed)return;const r=this.opts.rowCount(),{first:n,last:o}=this.visibleRange();this.topSpacer.style.height=`${n*this.rowHeight}px`,this.bottomSpacer.style.height=`${Math.max(0,r-o)*this.rowHeight}px`,this.rowsEl.replaceChildren();for(let e=n;e<o;e++)this.rowsEl.appendChild(this.opts.renderRow(e))}destroy(){this.destroyed||(this.destroyed=!0,this.container.removeEventListener("scroll",this.onScroll),this.container.replaceChildren())}}function Tr(t,r){return t.kind!==r.kind?!1:t.kind==="page"&&r.kind==="page"?t.target===r.target:!0}class Br{constructor(){W(this,"stack",[{kind:"blank"}]);W(this,"index",0)}get current(){return this.stack[this.index]??{kind:"blank"}}get canGoBack(){return this.index>0}get canGoForward(){return this.index<this.stack.length-1}push(r){Tr(this.current,r)||(this.stack=this.stack.slice(0,this.index+1),this.stack.push(r),this.index=this.stack.length-1)}back(){return this.canGoBack?(this.index-=1,this.current):null}forward(){return this.canGoForward?(this.index+=1,this.current):null}reset(){this.stack=[{kind:"blank"}],this.index=0}}const Nr={"fold-tablet":320,desktop:340},ot=240,ft=16,Ir={"fold-tablet":.6,desktop:.7};function zr(t,r,n){const o=Ir[n],e=Math.max(ot,r*o);return t<ot?ot:t>e?e:t}const $t=new WeakMap;function Pr(t){return $t.get(t)??{left:0,right:0,top:0,bottomChrome:0,bottomPlayback:0}}function fe(t,r){const n=Pr(t),o={left:Math.max(0,r.left??n.left),right:Math.max(0,r.right??n.right),top:Math.max(0,r.top??n.top),bottomChrome:Math.max(0,r.bottomChrome??n.bottomChrome),bottomPlayback:Math.max(0,r.bottomPlayback??n.bottomPlayback)};$t.set(t,o);const e=o.bottomChrome+o.bottomPlayback;t.style.setProperty("--rx-book-inset-left",`${o.left}px`),t.style.setProperty("--rx-book-inset-right",`${o.right}px`),t.style.setProperty("--rx-book-inset-top",`${o.top}px`),t.style.setProperty("--rx-book-inset-bottom",`${e}px`),t.style.setProperty("--rx-book-inset-bottom-playback",`${o.bottomPlayback}px`),t.style.paddingLeft=o.left?`${o.left}px`:"",t.style.paddingRight=o.right?`${o.right}px`:"";const a=t.querySelector(":scope > foliate-view");return a&&(a.style.paddingTop=o.top?`${o.top}px`:"",a.style.paddingBottom=e?`${e}px`:""),{left:o.left,right:o.right,top:o.top,bottom:e}}const Mr=[{id:"all",label:"All"},{id:"highlight",label:"Highlight"},{id:"underline",label:"Underline"},{id:"note",label:"Typed note"},{id:"handwritten",label:"Handwritten"},{id:"bookmark",label:"Bookmark"}],Fr=[{id:"position",label:"Position in book"},{id:"date",label:"Date"},{id:"colour",label:"Colour"},{id:"type",label:"Type"}];function Or(t){const r=t.createElement("div");r.className="rx-notes-panel";const n=t.createElement("div");n.className="rx-notes-searchbar",n.setAttribute("role","search");const o=t.createElement("input");o.type="search",o.className="rx-notes-search-input",o.placeholder="Search notes",o.setAttribute("aria-label","Search notes"),n.append(o);const e=t.createElement("select");e.className="rx-notes-sort",e.setAttribute("aria-label","Sort notes by");for(const{id:s,label:v}of Fr){const h=t.createElement("option");h.value=s,h.textContent=v,e.append(h)}n.append(e);const a=t.createElement("div");a.className="rx-notes-filters",a.setAttribute("role","group"),a.setAttribute("aria-label","Filter notes by type");const i={};for(const{id:s,label:v}of Mr){const h=t.createElement("button");h.type="button",h.className="rx-notes-chip",h.textContent=v,h.setAttribute("aria-pressed",String(s==="all")),s==="all"&&h.classList.add("active"),h.dataset.filter=s,a.append(h),i[s]=h}const l=t.createElement("div");l.className="rx-notes-banner",l.hidden=!0,l.textContent="No annotation store connected. Notes made in this session are not saved.";const d=t.createElement("div");return d.className="rx-notes-list",r.append(n,a,l,d),{root:r,searchBar:n,searchInput:o,filterRow:a,filterButtons:i,sortSelect:e,capabilityBanner:l,listScroller:d}}const Hr=`
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
`,Rr=100,_r=20;function $r(t){return t==="all"?null:t}class Dr{constructor(r){W(this,"total",0);W(this,"offset",0);W(this,"items",[]);W(this,"state",{filter:"all",sort:"position",query:null});W(this,"lastRequestedOffset",null);W(this,"everRequested",!1);this.hostChannel=r}getState(){return this.state}setState(r){this.state={...this.state,...r},this.total=0,this.offset=0,this.items=[],this.lastRequestedOffset=null,this.requestPage(0)}ensureInitialLoad(){this.everRequested||this.requestPage(0)}rowCount(){return this.total}rowAt(r){const n=r-this.offset;if(!(n<0||n>=this.items.length))return this.items[n]}ensureLoaded(r,n){const o=Math.max(r,n-1);if(this.rowAt(r)&&this.rowAt(o))return;const e=Math.max(0,r-_r);this.lastRequestedOffset!==e&&this.requestPage(e)}requestPage(r){this.everRequested=!0,this.lastRequestedOffset=r,this.hostChannel.emitIntent({type:"notesPageRequest",offset:r,limit:Rr,filter:$r(this.state.filter),sort:this.state.sort,query:this.state.query})}applyWindow(r){this.total=r.total,this.offset=r.offset,this.items=r.items,this.lastRequestedOffset=null}}const xt="reactor-notes-stylesheet",Gr=48,Kr=200,gt={highlight:"Highlight",underline:"Underline",note:"Typed note",bookmark:"Bookmark"};function Vr(t,r){return r?`${gt[t]} · ${r}`:gt[t]}function qr({container:t,core:r,hostChannel:n,options:o={}}){const e=t.ownerDocument??document;if(!e.getElementById(xt)){const S=e.createElement("style");S.id=xt,S.textContent=Hr,e.head.appendChild(S)}const a=Or(e);t.append(a.root);const i=new Dr(n);let l=!1,d=null;const s=new Map,v=new Set;function h(S){s.has(S)||v.has(S)||typeof r.getChapterTitleForCfi=="function"&&(v.add(S),r.getChapterTitleForCfi(S).then(A=>{s.set(S,A)}).catch(()=>{s.set(S,null)}).finally(()=>{v.delete(S),!l&&u.render()}))}function b(S){i.ensureLoaded(S,S+1);const A=i.rowAt(S);if(!A){const _=e.createElement("div");return _.className="rx-notes-loading-row",_.setAttribute("role","listitem"),_.textContent="Loading…",_}const B=e.createElement("button");B.type="button",B.className="rx-notes-row";const $=e.createElement("span");$.className="rx-notes-row-swatch",A.color&&$.style.setProperty("--rx-notes-row-color",A.color);const U=e.createElement("span");U.className="rx-notes-row-body";const M=e.createElement("span");M.className="rx-notes-row-snippet",M.textContent=A.note??A.text??"";const z=e.createElement("span");z.className="rx-notes-row-meta";const V=s.get(A.cfi);z.textContent=Vr(A.kind,V??null),U.append(M,z),B.append($,U),B.setAttribute("aria-label",`${z.textContent}: ${M.textContent}`),V===void 0&&h(A.cfi),B.addEventListener("click",()=>r.goTo(A.cfi));const D=e.createElement("div");return D.setAttribute("role","listitem"),D.appendChild(B),D}const u=new _t({container:a.listScroller,rowHeight:Gr,rowCount:()=>i.rowCount(),renderRow:b});function x(S){const A=S.currentTarget,B=A.dataset.filter??"all";for(const $ of Object.values(a.filterButtons))$.classList.toggle("active",$===A),$.setAttribute("aria-pressed",String($===A));i.setState({filter:B}),u.render()}for(const S of Object.values(a.filterButtons))S.addEventListener("click",x);function k(){i.setState({sort:a.sortSelect.value}),u.render()}a.sortSelect.addEventListener("change",k);function w(){d&&clearTimeout(d),d=setTimeout(()=>{i.setState({query:a.searchInput.value.trim()||null}),u.render()},Kr)}a.searchInput.addEventListener("input",w);function p(S){S.type==="setNotes"&&(i.applyWindow(S),u.render())}const C=n.onCommand(p);function L(){var S;a.capabilityBanner.hidden=((S=n.getConfig())==null?void 0:S.capabilities.notes)!==!1,i.ensureInitialLoad(),u.render()}function O(){u.render()}function F(){if(!l){l=!0,d&&clearTimeout(d),C();for(const S of Object.values(a.filterButtons))S.removeEventListener("click",x);a.sortSelect.removeEventListener("change",k),a.searchInput.removeEventListener("input",w),u.destroy(),a.root.remove()}}return{onActivate:L,refresh:O,destroy:F}}function Wr(t){const r=t.createElement("div");r.className="rx-glossary-panel",r.style.position="absolute",r.style.inset="0";const n=t.createElement("div");n.className="rx-glossary-search",n.setAttribute("role","search");const o=t.createElement("input");o.type="search",o.className="rx-glossary-search-input",o.placeholder="Search glossary",o.setAttribute("aria-label","Search glossary"),n.appendChild(o);const e=t.createElement("div");return e.className="rx-glossary-list",e.setAttribute("role","list"),r.append(n,e),{root:r,searchInput:o,list:e}}const Ur=900;function Yr(t){const r=t.ownerDocument??document,n=Wr(r);t.appendChild(n.root);let o=[],e="",a=!1;function i(){const b=e.trim().toLowerCase();return[...b?o.filter(x=>x.term.toLowerCase().includes(b)):o].sort((x,k)=>x.term.localeCompare(k.term))}function l(){if(a)return;const b=i();if(n.list.replaceChildren(),!o.length){n.list.removeAttribute("role");const u=r.createElement("div");u.className="rx-glossary-empty",u.textContent="This book has no glossary.",n.list.appendChild(u);return}if(!b.length){n.list.removeAttribute("role");const u=r.createElement("div");u.className="rx-glossary-empty",u.textContent=`No terms match "${e}".`,n.list.appendChild(u);return}n.list.setAttribute("role","list");for(const u of b){let x=function(){const C=k.classList.toggle("expanded");w.setAttribute("aria-expanded",String(C))};const k=r.createElement("div");k.className="rx-glossary-item",k.setAttribute("role","listitem"),k.setAttribute("data-term",u.term);const w=r.createElement("button");w.type="button",w.className="rx-glossary-term-row",w.setAttribute("role","button"),w.setAttribute("aria-expanded","false"),w.textContent=u.term;const p=r.createElement("div");p.className="rx-glossary-def",p.textContent=u.definition,w.addEventListener("click",x),k.append(w,p),n.list.appendChild(k)}}function d(){e=n.searchInput.value,l()}n.searchInput.addEventListener("input",d),l();function s(b){o=b,l()}function v(b){var x,k;e&&(e="",n.searchInput.value="",l());const u=n.list.querySelector(`.rx-glossary-item[data-term="${CSS.escape(b)}"]`);u&&(u.classList.add("expanded"),(x=u.querySelector(".rx-glossary-term-row"))==null||x.setAttribute("aria-expanded","true"),(k=u.scrollIntoView)==null||k.call(u,{block:"center"}),u.classList.add("flash"),setTimeout(()=>u.classList.remove("flash"),Ur))}function h(){a||(a=!0,n.searchInput.removeEventListener("input",d),n.root.remove())}return{setTerms:s,scrollToAndFlash:v,destroy:h}}const mt=9,Ue=8,vt=16;function jr(t,r,n,o){const e=t.top+t.height;let a=t.left;a=Math.min(Math.max(Ue,a),Math.max(Ue,r.width-n-Ue));let i=e+mt,l=!1;if(i+o>r.height-Ue){const s=t.top-o-mt;i=Math.max(Ue,s),l=!0}const d=Math.max(vt,Math.min(n-vt,t.left+t.width/2-a));return{left:a,top:i,above:l,arrowX:d}}const Zr='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>';function Xr(t,r,n){const o=t.ownerDocument??document;let e=null,a=!1;function i(){var u;const b=!!e;e==null||e.remove(),e=null,b&&((u=t.querySelector("iframe"))==null||u.focus())}function l(b,u){var L;i();const x=o.createElement("div");x.className="rx-glossary-popover",x.setAttribute("role","dialog"),x.setAttribute("aria-label",`${b.term} definition`),x.innerHTML=`
      <div class="rx-glossary-popover-head">
        <h4 class="rx-glossary-popover-term"></h4>
        <button type="button" class="rx-icon-btn rx-glossary-popover-open" aria-label="Open in glossary" title="Open in glossary">${Zr}</button>
      </div>
      <p class="rx-glossary-popover-def"></p>
    `,x.querySelector(".rx-glossary-popover-term").textContent=b.term,x.querySelector(".rx-glossary-popover-def").textContent=b.definition,t.appendChild(x),e=x;const k=t.getBoundingClientRect(),w={left:u.left-k.left,top:u.top-k.top,width:u.width,height:u.height},p={width:k.width,height:k.height},C=jr(w,p,x.offsetWidth,x.offsetHeight||120);x.style.left=`${C.left}px`,x.style.top=`${C.top}px`,x.classList.toggle("above",C.above),x.style.setProperty("--arrow-x",`${C.arrowX}px`),x.querySelector(".rx-glossary-popover-open").addEventListener("click",O=>{O.stopPropagation(),i(),n.onOpenInGlossary(b.term)}),(L=x.querySelector(".rx-glossary-popover-open"))==null||L.focus()}async function d(b,u){const x=await r.getGlossaryTerms();if(a)return;const k=x.find(w=>w.term.toLowerCase()===b.toLowerCase());k&&l(k,u)}const s=r.onGlossaryTermTap(d);function v(b){var x;if(!e)return;const u=b.target;(x=u==null?void 0:u.closest)!=null&&x.call(u,".rx-glossary-popover")||i()}o.addEventListener("click",v);function h(){a||(a=!0,s(),o.removeEventListener("click",v),i())}return{isOpen:()=>e!==null,close:i,destroy:h}}const Jr=`
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
`,yt="reactor-right-sidebar-stylesheet",kt="reactor-glossary-stylesheet",Qr=48,en=200;function tn(t){if(!t.getElementById(yt)){const r=t.createElement("style");r.id=yt,r.textContent=Lr,t.head.appendChild(r)}if(!t.getElementById(kt)){const r=t.createElement("style");r.id=kt,r.textContent=Jr,t.head.appendChild(r)}}function rn(t){const r=n=>n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");return`${r(t.pre)}<mark>${r(t.match)}</mark>${r(t.post)}`}function nn(t,r,n){var me,xe;const o=t.ownerDocument??document;tn(o);const e=Cr(o),a=o.createElement("div");a.className="rx-sidebar-scrim",t.append(a,e.root);const i=new Ar,l=new Br,d=Yr(e.glossaryPanelMount);let s="context",v=null,h=!1,b=!1,u=null;const x=!!n.hostChannel&&((me=n.hostChannel.getConfig())==null?void 0:me.capabilities.notes)!==!1;e.notesTabBtn.disabled=!x;const k=x?qr({container:e.notesBody,core:r,hostChannel:n.hostChannel}):null;((xe=n.capabilities)==null?void 0:xe.glossary)===!1&&(e.glossaryTabBtn.hidden=!0);const w=["context"];e.glossaryTabBtn.hidden!==!0&&w.push("glossary"),x&&w.push("notes");function p(){return n.getSizeClass()==="phone"}function C(m){const I=m===1?Pt(w,s):Mt(w,s);L(I)}function L(m){m!==s&&(s=m,e.contextTabBtn.classList.toggle("active",m==="context"),e.contextTabBtn.setAttribute("aria-selected",String(m==="context")),e.glossaryTabBtn.classList.toggle("active",m==="glossary"),e.glossaryTabBtn.setAttribute("aria-selected",String(m==="glossary")),e.notesTabBtn.classList.toggle("active",m==="notes"),e.notesTabBtn.setAttribute("aria-selected",String(m==="notes")),e.searchBar.hidden=m!=="context",e.glossaryPanelMount.hidden=m!=="glossary",e.notesBody.hidden=m!=="notes",m==="context"?D(l.current):m==="glossary"?(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,r.getGlossaryTerms().then(I=>d.setTerms(I))):(e.resultsScroller.hidden=!0,e.contextPage.hidden=!0,k==null||k.onActivate()))}const O=()=>L("context"),F=()=>L("glossary"),S=()=>L("notes");e.contextTabBtn.addEventListener("click",O),e.glossaryTabBtn.addEventListener("click",F),e.notesTabBtn.addEventListener("click",S);function A(m){const I=i.rowAt(m);if(!I)return o.createElement("div");if(I.kind==="header"){const j=o.createElement("div");return j.className="rx-ctx-group-header",j.setAttribute("role","listitem"),j.textContent=I.label,j}const q=o.createElement("button");q.type="button",q.className="rx-ctx-result",q.setAttribute("role","listitem"),q.innerHTML=rn(I.item),q.addEventListener("click",()=>N(I.item,I.groupLabel));const ne=o.createElement("div");return ne.setAttribute("role","listitem"),ne.appendChild(q),ne}const B=new _t({container:e.resultsScroller,rowHeight:Qr,rowCount:()=>i.rowCount,renderRow:A});function $(){e.breadcrumb.replaceChildren();const m=o.createElement("button");m.type="button",m.textContent="Back",m.disabled=!l.canGoBack,m.setAttribute("aria-label","Back"),m.addEventListener("click",_);const I=o.createElement("button");I.type="button",I.textContent="Forward",I.disabled=!l.canGoForward,I.setAttribute("aria-label","Forward"),I.addEventListener("click",y),e.breadcrumb.append(m,I),e.openInMainBtn.disabled=l.current.kind!=="page"}function U(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,B.render()}function M(){e.resultsScroller.hidden=!1,e.contextPage.hidden=!0,B.render()}function z(){return v||(v=r.createSecondaryView(e.contextPage),v)}function V(m){e.resultsScroller.hidden=!0,e.contextPage.hidden=!1;const I=z();I&&I.goTo(m)}function D(m){m.kind==="blank"?M():m.kind==="results"?U():V(m.target),$()}function _(){const m=l.back();m&&D(m)}function y(){const m=l.forward();m&&D(m)}function N(m,I){l.push({kind:"page",target:m.cfi,label:I}),D(l.current)}function G(){const m=e.searchInput.value.trim();i.reset(),m?l.current.kind!=="results"&&l.push({kind:"results"}):l.reset(),D(l.current),u&&clearTimeout(u),m&&(u=setTimeout(()=>r.runSearch(m),en))}e.searchInput.addEventListener("input",G);function Z(m){m.type==="searchResults"?(i.addGroup(m.label,m.items),l.current.kind==="results"&&B.render()):m.type==="loaded"&&d.setTerms([])}const Y=r.on(Z);function X(){const m=l.current;m.kind==="page"&&(r.goTo(m.target),n.getSizeClass()==="phone"&&re())}e.openInMainBtn.addEventListener("click",X);function J(){re()}e.closeBtn.addEventListener("click",J);const T=()=>re();a.addEventListener("click",T);function f(){const m=getComputedStyle(t).getPropertyValue("--rx-ctx-width"),I=parseFloat(m);if(!Number.isNaN(I)&&I>0)return I;const q=n.getSizeClass();return q==="phone"?ot:Nr[q]}e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(f())));function P(m,I){var j;const q=n.getSizeClass();if(q==="phone")return;const ne=zr(m,t.clientWidth||1200,q);t.style.setProperty("--rx-ctx-width",`${ne}px`),e.resizeHandle.setAttribute("aria-valuenow",String(Math.round(ne))),h&&fe(t,{right:ne}),I&&((j=n.onWidthChange)==null||j.call(n,ne))}let H=!1,R=0,ee=0;function ae(m){H=!0,R=m.clientX,ee=f(),t.classList.add("right-sidebar-resizing"),o.addEventListener("pointermove",te),o.addEventListener("pointerup",oe)}function te(m){H&&P(ee-(m.clientX-R),!1)}function oe(){H&&(H=!1,t.classList.remove("right-sidebar-resizing"),o.removeEventListener("pointermove",te),o.removeEventListener("pointerup",oe),P(f(),!0))}function ie(m){m.key==="ArrowLeft"?(m.preventDefault(),P(f()+ft,!0)):m.key==="ArrowRight"&&(m.preventDefault(),P(f()-ft,!0))}e.resizeHandle.addEventListener("pointerdown",ae),e.resizeHandle.addEventListener("keydown",ie);const be=Rt(t,{onSwipe:(m,I,q)=>{const ne=Ht(q,e.root,t),j=Ot(ne,m,I,p());!h&&j.action!==null||(j.action==="cycle-next"?C(1):j.action==="cycle-prev"?C(-1):j.action==="close"&&re())}});function ue(){h||(h=!0,t.classList.add("right-sidebar-open"),P(f(),!1),B.render(),s==="notes"&&(k==null||k.refresh()))}function re(){var m;h&&(h=!1,t.classList.remove("right-sidebar-open"),fe(t,{right:0}),(m=n.onClose)==null||m.call(n))}function le(){h?re():ue()}function ce(m){h||ue(),L("glossary"),r.getGlossaryTerms().then(I=>{d.setTerms(I),d.scrollToAndFlash(m)})}function de(){h&&(n.getSizeClass()==="phone"?fe(t,{right:0}):fe(t,{right:f()}))}D(l.current);function ge(){b||(b=!0,u&&clearTimeout(u),Y(),e.searchInput.removeEventListener("input",G),e.openInMainBtn.removeEventListener("click",X),e.closeBtn.removeEventListener("click",J),a.removeEventListener("click",T),e.resizeHandle.removeEventListener("pointerdown",ae),o.removeEventListener("pointermove",te),o.removeEventListener("pointerup",oe),e.resizeHandle.removeEventListener("keydown",ie),be.destroy(),e.contextTabBtn.removeEventListener("click",O),e.notesTabBtn.removeEventListener("click",S),k==null||k.destroy(),e.glossaryTabBtn.removeEventListener("click",F),d.destroy(),B.destroy(),v==null||v.destroy(),t.classList.remove("right-sidebar-open","right-sidebar-resizing"),fe(t,{right:0}),e.root.remove(),a.remove())}return{open:ue,close:re,toggle:le,isOpen:()=>h,destroy:ge,refreshLayout:de,openGlossaryTerm:ce}}function Ye(t,r){const n=document.createElement("button");return n.type="button",n.className=r,n.setAttribute("aria-label",t),n}function an(t){const r=t.createElement("div");r.className="rx-playback-bar",r.setAttribute("role","group"),r.setAttribute("aria-label","Narration transport");const n=Ye("Skip back 15 seconds","rx-playback-icon-btn rx-playback-skip-back");n.innerHTML=Be("skip_back");const o=Ye("Play","rx-playback-icon-btn rx-playback-play-pause");o.setAttribute("aria-pressed","false"),o.innerHTML=Be("play");const e=Ye("Skip forward 15 seconds","rx-playback-icon-btn rx-playback-skip-forward");e.innerHTML=Be("skip_forward");const a=Ye("Sleep timer","rx-playback-icon-btn rx-playback-sleep");a.setAttribute("aria-pressed","false"),a.innerHTML=Be("sleep");const i=Ye("Playback speed","rx-playback-rate-btn");i.textContent="1x";const l=t.createElement("div");l.className="rx-playback-info";const d=t.createElement("span");d.className="rx-playback-chapter",d.setAttribute("aria-live","polite");const s=t.createElement("span");return s.className="rx-playback-position",s.textContent="0:00",l.append(d,s),r.append(n,o,e,a,l,i),{root:r,skipBackBtn:n,playPauseBtn:o,skipForwardBtn:e,sleepBtn:a,rateBtn:i,chapterLabel:d,positionLabel:s}}const on=`
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
 * playback bar isn't mounted, same pattern U2/U3 use for their own book-inset CSS variables.
 * BO-53 (bars): reads the playback-only variable, not the combined --rx-book-inset-bottom (that
 * one now also includes the reading bottom bar's own height - see layout.ts - and using it here
 * would push this bar up by its own height on top of the playback bar's, doubling the gap). */
.reader-shell .rx-bar-bottom {
  bottom: var(--rx-book-inset-bottom-playback, 0px);
}
`;class sn{constructor(){W(this,"timeline",null);W(this,"activeAudioIndex",0)}setTimeline(r){this.timeline=r,this.activeAudioIndex=0}clear(){this.timeline=null,this.activeAudioIndex=0}hasTimeline(){return this.timeline!==null}itemFor(r){const n=this.timeline;if(!n)return null;const o=a=>a.beginSec<=r&&(a.endSec===null||r<a.endSec);let e=n.items.filter(a=>a.audioIndex===this.activeAudioIndex&&o(a));if(e.length===0){e=n.items.filter(o);const a=e[0];a&&(this.activeAudioIndex=a.audioIndex)}return e.length===0?null:e.reduce((a,i)=>i.beginSec>a.beginSec?i:a)}textHrefFor(r){var n;return((n=this.itemFor(r))==null?void 0:n.textHref)??null}}const wt="reactor-playback-stylesheet",nt=15,Ze=[.75,1,1.25,1.5,1.75,2];function ln(t){if(t.getElementById(wt))return;const r=t.createElement("style");r.id=wt,r.textContent=on,t.head.appendChild(r)}function cn(t){const r=Number.isFinite(t)&&t>0?t:0,n=Math.floor(r),o=Math.floor(n/60),e=n%60;return`${o}:${String(e).padStart(2,"0")}`}function Et(t){return Ze.reduce((r,n)=>Math.abs(n-t)<Math.abs(r-t)?n:r,Ze[0]??1)}function dn(t,r,n,o={}){const e=t.ownerDocument??document;ln(e);let a=null,i=!1,l=!1,d=!1,s=!1,v=0,h=1,b=!1,u=!1,x=0,k=!1,w=!1,p=nt,C=nt,L="shell";const O=new sn;function F(f,P=null,H=null){n.emitIntent({type:"playback",action:f,positionSec:P,rate:H})}const S=()=>F(s?"pause":"play"),A=()=>F("seek",Math.max(0,v-p)),B=()=>F("seek",v+C),$=()=>F("sleepTimer"),U=()=>{const f=Ze.indexOf(Et(h)),P=Ze[(f+1)%Ze.length]??1;F("rateChange",null,P)};function M(){a&&(a.playPauseBtn.setAttribute("aria-pressed",String(s)),a.playPauseBtn.setAttribute("aria-label",s?"Pause":"Play"),a.playPauseBtn.innerHTML=Be(s?"pause":"play"),a.sleepBtn.setAttribute("aria-pressed",String(w)),a.positionLabel.textContent=cn(v),a.rateBtn.textContent=`${Et(h)}x`,V())}function z(){if(!a)return;const f=a.root.classList.contains("rx-playback-chrome-hidden");fe(t,{bottomPlayback:f?0:a.root.offsetHeight||56})}function V(){a&&(a.root.classList.toggle("rx-playback-chrome-hidden",!b||!k&&!s),z())}function D(f){a&&a.chapterLabel.textContent!==(f??"")&&(a.chapterLabel.textContent=f??"")}function _(){i||l||(i=!0,a=an(e),a.root.classList.toggle("e-ink",!!o.eink),t.appendChild(a.root),a.playPauseBtn.addEventListener("click",S),a.skipBackBtn.addEventListener("click",A),a.skipForwardBtn.addEventListener("click",B),a.rateBtn.addEventListener("click",U),a.sleepBtn.addEventListener("click",$),M(),y())}function y(){!i||!u||L==="host"||(x+=1,r.narrationPrepare(x))}function N(){if(!i||!u||L==="host")return;const f=O.textHrefFor(v);f?r.narrationHighlight(f):r.narrationUnhighlight()}function G(f){switch(f.type){case"loaded":u=f.hasMediaOverlay,O.clear(),y();break;case"relocate":D(f.chapterTitle);break;case"narrationTimeline":f.generation===x&&(O.setTimeline(f),N());break;case"narrationTimelineError":f.generation===x&&O.clear();break}}const Z=r.on(G);r.replayLastEvents(G);function Y(f){if(f.type==="configure"){if(d)return;d=!0,L=f.narrationFollow??"shell",f.capabilities.playback&&_()}else if(f.type==="setPlaybackState"){if(!i)return;s=f.playing,v=f.positionSec,h=f.rate,b=f.active!==!1,w=f.sleepTimerActive===!0,p=f.skipBackSec??nt,C=f.skipForwardSec??nt,M(),N()}}const X=n.onCommand(Y),J=n.getConfig();J&&Y(J);function T(){l||(l=!0,Z(),X(),a&&(a.playPauseBtn.removeEventListener("click",S),a.skipBackBtn.removeEventListener("click",A),a.skipForwardBtn.removeEventListener("click",B),a.rateBtn.removeEventListener("click",U),a.sleepBtn.removeEventListener("click",$),a.root.remove(),fe(t,{bottomPlayback:0})))}return{isVisible:()=>i,setChromeVisible:f=>{k=f,V()},destroy:T}}const ct={highlight:"Highlight",underline:"Underline",strikethrough:"Strikethrough",squiggly:"Squiggly underline"};function un(t){const r=t.createElement("div");r.className="rx-anno-popover",r.setAttribute("role","dialog"),r.setAttribute("aria-label","Annotation"),r.hidden=!0;const n=t.createElement("div");n.className="rx-anno-status",n.setAttribute("aria-live","polite");const o=t.createElement("button");o.type="button",o.className="rx-icon-btn rx-anno-close",o.setAttribute("aria-label","Close"),o.textContent="✕";const e=t.createElement("div");e.className="rx-anno-header",e.append(n,o);const a=t.createElement("div");a.className="rx-anno-colors",a.setAttribute("role","radiogroup"),a.setAttribute("aria-label","Colour");const i=Kt.map(w=>{const p=t.createElement("button");return p.type="button",p.className="rx-anno-swatch",p.style.setProperty("--rx-anno-swatch-color",w.value),p.setAttribute("role","radio"),p.setAttribute("aria-checked","false"),p.setAttribute("aria-label",w.label),p.dataset.color=w.value,a.append(p),p}),l=t.createElement("div");l.className="rx-anno-styles",l.setAttribute("role","group"),l.setAttribute("aria-label","Mark style");const d={};for(const w of Object.keys(ct)){const p=t.createElement("button");p.type="button",p.className=`rx-anno-style rx-anno-style-${w}`,p.textContent=ct[w],p.setAttribute("aria-label",ct[w]),p.dataset.style=w,l.append(p),d[w]=p}const s=t.createElement("button");s.type="button",s.className="rx-anno-note-toggle",s.textContent="Note",s.setAttribute("aria-expanded","false");const v=t.createElement("div");v.className="rx-anno-note-form",v.hidden=!0;const h=t.createElement("textarea");h.className="rx-anno-note-textarea",h.setAttribute("aria-label","Note text"),h.rows=3;const b=t.createElement("div");b.className="rx-anno-note-actions";const u=t.createElement("button");u.type="button",u.className="rx-anno-note-save",u.textContent="Save";const x=t.createElement("button");x.type="button",x.className="rx-anno-note-cancel",x.textContent="Cancel",b.append(x,u),v.append(h,b);const k=t.createElement("button");return k.type="button",k.className="rx-anno-delete",k.textContent="Delete",k.hidden=!0,r.append(e,a,l,s,v,k),{root:r,colorRow:a,colorButtons:i,styleRow:l,styleButtons:d,noteToggleBtn:s,noteForm:v,noteTextarea:h,noteSaveBtn:u,noteCancelBtn:x,deleteBtn:k,closeBtn:o,statusLabel:n}}const pn=`
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
`,St="reactor-annotations-stylesheet";function hn(t){return t==="underline"||t==="squiggly"?"underline":"highlight"}class bn{constructor(r=500){W(this,"map",new Map);this.cap=r}get(r){return this.map.get(r)}addAll(r){for(const n of r)for(this.map.delete(n.cfi),this.map.set(n.cfi,n);this.map.size>this.cap;){const o=this.map.keys().next().value;if(o===void 0)break;this.map.delete(o)}}}function fn({shellRoot:t,core:r,hostChannel:n,options:o={}}){const e=t.ownerDocument??document;if(!e.getElementById(St)){const y=e.createElement("style");y.id=St,y.textContent=pn,e.head.appendChild(y)}const a=un(e);t.append(a.root);const i=new bn;let l=st,d=!1,s=null,v=null;function h(){s=null,v=null,a.root.hidden=!0,a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}function b(y){const N=t.getBoundingClientRect(),G=y?y.left-N.left:(t.clientWidth||300)/2-140,Z=y?y.bottom-N.top+8:60,Y=Math.max(0,(t.clientWidth||300)-288);a.root.style.left=`${Math.min(Math.max(0,G),Y)}px`,a.root.style.top=`${Math.max(0,Z)}px`}function u(y){l=y;for(const N of a.colorButtons)N.setAttribute("aria-checked",String(N.dataset.color===y))}function x(y){for(const[N,G]of Object.entries(a.styleButtons))G.setAttribute("aria-pressed",String(N===y))}function k(y,N,G){s={kind:"create",cfi:y,text:N},a.statusLabel.textContent="Add mark",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.noteTextarea.value="",u(l),x(null),a.root.hidden=!1,b(G)}function w(y,N){s={kind:"edit",note:y},a.statusLabel.textContent="Edit mark",a.deleteBtn.hidden=!1,a.noteForm.hidden=!0,a.noteTextarea.value=y.note??"",u(y.color??st),x(y.style??(y.kind==="underline"?"underline":"highlight")),a.root.hidden=!1,b(N)}function p(y,N){s=null,v=y,a.statusLabel.textContent="Loading…",a.deleteBtn.hidden=!0,a.noteForm.hidden=!0,a.root.hidden=!1,b(N),n.emitIntent({type:"notesPageRequest",offset:0,limit:1,filter:null,sort:null,query:`cfi:${y}`})}function C(y){if(y.type==="selection"&&y.cfi)k(y.cfi,y.text,y.rect);else if(y.type==="selectionCleared")(s==null?void 0:s.kind)==="create"&&h();else if(y.type==="annotationTap"){if(!y.cfi)return;const N=i.get(y.cfi);N?w(N,y.rect):p(y.cfi,y.rect)}}const L=r.on(C);function O(y){if(y.type==="setNotes"&&(i.addAll(y.items),v)){const N=y.items.find(G=>G.cfi===v);if(N){const G=a.root.hidden?null:{left:parseFloat(a.root.style.left||"0"),top:parseFloat(a.root.style.top||"0"),bottom:0};w(N,G)}else h()}}const F=n.onCommand(O);function S(y){(s==null?void 0:s.kind)==="create"&&(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:hn(y),color:l,style:y,text:s.text,note:null}),r.clearSelection(),h())}function A(y){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:l,style:y,note:s.note.note}),h())}function B(y){const G=y.currentTarget.dataset.color??st;u(G),(s==null?void 0:s.kind)==="edit"&&n.emitIntent({type:"annotationUpdate",id:s.note.id,color:G,style:s.note.style,note:s.note.note})}for(const y of a.colorButtons)y.addEventListener("click",B);const $={highlight:()=>(s==null?void 0:s.kind)==="create"?S("highlight"):A("highlight"),underline:()=>(s==null?void 0:s.kind)==="create"?S("underline"):A("underline"),strikethrough:()=>(s==null?void 0:s.kind)==="create"?S("strikethrough"):A("strikethrough"),squiggly:()=>(s==null?void 0:s.kind)==="create"?S("squiggly"):A("squiggly")};for(const[y,N]of Object.entries(a.styleButtons))N.addEventListener("click",$[y]);function U(){const y=a.noteForm.hidden;a.noteForm.hidden=!y,a.noteToggleBtn.setAttribute("aria-expanded",String(y)),y&&a.noteTextarea.focus()}a.noteToggleBtn.addEventListener("click",U);function M(){a.noteForm.hidden=!0,a.noteToggleBtn.setAttribute("aria-expanded","false")}a.noteCancelBtn.addEventListener("click",M);function z(){const y=a.noteTextarea.value.trim()||null;(s==null?void 0:s.kind)==="create"?(n.emitIntent({type:"annotationCreate",cfi:s.cfi,kind:"note",color:l,style:null,text:s.text,note:y}),r.clearSelection(),h()):(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationUpdate",id:s.note.id,color:s.note.color,style:s.note.style,note:y}),h())}a.noteSaveBtn.addEventListener("click",z);function V(){(s==null?void 0:s.kind)==="edit"&&(n.emitIntent({type:"annotationDelete",id:s.note.id}),h())}a.deleteBtn.addEventListener("click",V);const D=()=>h();a.closeBtn.addEventListener("click",D);function _(){if(!d){d=!0,L(),F();for(const y of a.colorButtons)y.removeEventListener("click",B);for(const[y,N]of Object.entries(a.styleButtons))N.removeEventListener("click",$[y]);a.noteToggleBtn.removeEventListener("click",U),a.noteCancelBtn.removeEventListener("click",M),a.noteSaveBtn.removeEventListener("click",z),a.deleteBtn.removeEventListener("click",V),a.closeBtn.removeEventListener("click",D),a.root.remove()}}return{isOpen:()=>!a.root.hidden,close:h,destroy:_}}const xn='<path d="M18 6 6 18"/><path d="M6 6l12 12"/>';function gn(t,r,n){const o=document.createElement("button");return o.type="button",o.className=n,o.setAttribute("aria-label",t),o.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${r}</svg>`,o}function Ee(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-toggle",n.setAttribute("aria-pressed","false"),n.setAttribute("data-setting",r),n.textContent=t,n}function at(t,r,n){const o=document.createElement("div");o.className=`rx-settings-pills ${n}`,o.setAttribute("role","radiogroup"),o.setAttribute("aria-label",t);for(const e of r){const a=document.createElement("button");a.type="button",a.className="rx-settings-pill",a.setAttribute("role","radio"),a.setAttribute("aria-checked","false"),a.setAttribute("data-value",e.id),a.textContent=e.label,o.appendChild(a)}return o}function he(t,r,n,o){const e=document.createElement("div");e.className="rx-settings-slider-row";const a=document.createElement("div");a.className="rx-settings-slider-label";const i=document.createElement("span");i.textContent=t;const l=document.createElement("span");l.className="rx-settings-slider-value",a.append(i,l);const d=document.createElement("input");return d.type="range",d.className="rx-settings-slider",d.min=String(r),d.max=String(n),d.step=String(o),d.setAttribute("aria-label",t),e.append(a,d),{row:e,input:d,value:l}}function mn(t,r){const n=document.createElement("button");return n.type="button",n.className="rx-settings-tab",n.setAttribute("role","tab"),n.setAttribute("aria-selected","false"),n.setAttribute("data-tab",t),n.id=`rx-settings-tab-${t}`,n.textContent=r,n}function je(t){const r=document.createElement("div");return r.className="rx-settings-panel",r.setAttribute("role","tabpanel"),r.setAttribute("data-panel",t),r.setAttribute("aria-labelledby",`rx-settings-tab-${t}`),r.hidden=!0,r}function vn(t){const r=document.createElement("div");r.className="rx-settings-scrim";const n=document.createElement("div");n.className="rx-settings-sheet",n.setAttribute("role","dialog"),n.setAttribute("aria-label","Text settings"),n.tabIndex=-1;const o=document.createElement("div");o.className="rx-settings-head";const e=document.createElement("h3");e.className="rx-settings-title",e.textContent="Text settings";const a=gn("Close settings",xn,"rx-icon-btn rx-settings-close");o.append(e,a);const i=document.createElement("div");i.className="rx-settings-scope",i.setAttribute("role","radiogroup"),i.setAttribute("aria-label","Settings scope");const l=document.createElement("button");l.type="button",l.className="rx-settings-scope-btn",l.setAttribute("role","radio"),l.setAttribute("aria-checked","true"),l.setAttribute("data-scope","global"),l.textContent="Global";const d=document.createElement("button");d.type="button",d.className="rx-settings-scope-btn",d.setAttribute("role","radio"),d.setAttribute("aria-checked","false"),d.setAttribute("data-scope","book"),d.textContent="This book",i.append(l,d);const s=document.createElement("div");s.className="rx-settings-scope-follow",s.hidden=!0;const v=Ee("","scopeFollow");v.classList.add("rx-settings-scope-follow-toggle");const h=document.createElement("p");h.className="rx-settings-scope-follow-banner",h.hidden=!0,s.append(v,h);const b=document.createElement("div");b.className="rx-settings-tabs",b.setAttribute("role","tablist");const u=[["typography","Typography"],["layout","Layout"],["theme","Theme"],["controls","Controls"],["playback","Playback"]],x={};for(const[be,ue]of u){const re=mn(be,ue);x[be]=re,b.appendChild(re)}const k=document.createElement("div");k.className="rx-settings-body";const w=je("typography"),p=he("Font size",13,28,1),C=he("Paragraph spacing",0,2,.1),L=at("Typeface",[],"rx-settings-font-pills");w.append(p.row,L,C.row);const O=je("layout"),F=at("Reading mode",[{id:"paginated",label:"Paginated"},{id:"scrolled",label:"Scrolling"}],"rx-settings-flow-pills"),S=at("Columns",[{id:"1",label:"1 column"},{id:"2",label:"2 columns"}],"rx-settings-columns-pills"),A=document.createElement("div");A.className="rx-settings-margins-group";const B=document.createElement("div");B.className="rx-settings-margins-head";const $=document.createElement("span");$.className="rx-settings-margins-label",$.textContent="Margins";const U=Ee("Link left and right margins","linkSideMargins");U.classList.add("rx-settings-link-toggle"),B.append($,U);const M=he("Top",0,96,4),z=he("Bottom",0,96,4),V=he("Left",0,96,4),D=he("Right",0,96,4);A.append(B,M.row,z.row,V.row,D.row);const _=he("Line spacing",1.2,1.95,.05),y=Ee("Justify text","justify"),N=Ee("Hyphenate","hyphenate"),G=Ee("Use book's own styling","useBookLayout");O.append(F,S,A,_.row,y,N,G);const Z=je("theme"),Y=document.createElement("div");Y.className="rx-settings-swatches",Y.setAttribute("role","radiogroup"),Y.setAttribute("aria-label","Theme"),Z.append(Y);const X=je("controls"),J=Ee("Swipe to turn pages","swipe"),T=at("Tap zone preset",[],"rx-settings-tapzone-pills"),f=document.createElement("div");f.className="rx-settings-volumekeys",f.hidden=!0;const P=Ee("Volume keys turn pages","volumeKeys");f.append(P),X.append(J,T,f);const H=je("playback"),R=document.createElement("p");R.className="rx-settings-empty",R.textContent="No narration provider for this book.";const ee=document.createElement("div");ee.className="rx-settings-playback-controls",ee.hidden=!0;const ae=he("Narration speed",.5,3,.1),te=he("Skip back (seconds)",5,60,5),oe=he("Skip forward (seconds)",5,60,5);ee.append(ae.row,te.row,oe.row),H.append(R,ee);const ie=document.createElement("div");return ie.className="rx-settings-actions-foot",ie.hidden=!0,k.append(w,O,Z,X,H,ie),n.append(o,i,s,b,k),t.append(r,n),{root:n,scrim:r,closeBtn:a,scopeGlobalBtn:l,scopeBookBtn:d,scopeFollowRow:s,scopeFollowToggle:v,scopeFollowBanner:h,tabsRow:b,tabButtons:x,panels:{typography:w,layout:O,theme:Z,controls:X,playback:H},fontSizeInput:p.input,fontSizeValue:p.value,paragraphSpacingInput:C.input,paragraphSpacingValue:C.value,fontFamilyPills:L,flowPills:F,columnsPills:S,linkSideMarginsToggle:U,marginTopInput:M.input,marginTopValue:M.value,marginBottomInput:z.input,marginBottomValue:z.value,marginLeftInput:V.input,marginLeftValue:V.value,marginRightInput:D.input,marginRightValue:D.value,lineHeightInput:_.input,lineHeightValue:_.value,justifyToggle:y,hyphenateToggle:N,useBookLayoutToggle:G,themeSwatches:Y,swipeToggle:J,tapZonePills:T,volumeKeysRow:f,volumeKeysToggle:P,playbackEmpty:R,playbackControls:ee,narrationSpeedInput:ae.input,narrationSpeedValue:ae.value,skipBackInput:te.input,skipBackValue:te.value,skipForwardInput:oe.input,skipForwardValue:oe.value,actionsFoot:ie}}const yn=`
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
`,Ct={fontSize:16,lineHeight:1.5,fontFamily:null,paragraphSpacing:0,maxColumnCount:2,gap:.05,maxInlineSize:720,maxBlockSize:1440,justify:!0,hyphenate:!0,isDark:!1,themeName:"default",flow:"paginated",useBookLayout:!0,marginTop:40,marginBottom:40,marginLeft:40,marginRight:40,linkSideMargins:!0},dt=[{id:"light",label:"Light",themeName:"default",isDark:!1,swatchBg:"#ffffff",swatchFg:"#000000"},{id:"sepia",label:"Sepia",themeName:"sepia",isDark:!1,swatchBg:"#f1e8d0",swatchFg:"#5b4636"},{id:"dark",label:"Dark",themeName:"default",isDark:!0,swatchBg:"#222222",swatchFg:"#e0e0e0"},{id:"amoled",label:"AMOLED",themeName:"amoled",isDark:!0,swatchBg:"#000000",swatchFg:"#ffffff"}];function kn(t,r){return dt.find(n=>n.themeName===t&&n.isDark===r)??dt.find(n=>n.id===(r?"dark":"light"))}const Lt=[{id:"publisher",label:"Publisher",value:null},{id:"serif",label:"Serif",value:'Georgia, "Iowan Old Style", "Times New Roman", serif'},{id:"sans",label:"Sans-serif",value:'-apple-system, "Segoe UI", Roboto, Arial, sans-serif'},{id:"mono",label:"Monospace",value:'"Courier New", monospace'}];function wn(t){return Array.from(t.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(n=>n.offsetParent!==null||n===t)}function En(t){let r=!1;function n(o){if(!r||o.key!=="Tab")return;const e=wn(t);if(e.length===0){o.preventDefault(),t.focus();return}const a=e[0],i=e[e.length-1],l=t.ownerDocument.activeElement;o.shiftKey&&l===a?(o.preventDefault(),i.focus()):!o.shiftKey&&l===i&&(o.preventDefault(),a.focus())}return t.addEventListener("keydown",n),{activate(){r=!0},deactivate(){r=!1,t.removeEventListener("keydown",n)}}}const At="reactor-settings-stylesheet",Sn=["typography","layout","theme","controls","playback"];function Cn(t){if(t.getElementById(At))return;const r=t.createElement("style");r.id=At,r.textContent=yn,t.head.appendChild(r)}function Ln(t,r,n){var Te,Pe,Me,Fe,Qe,et,tt,Oe,He,Re,_e,$e,De,Ge,Ke,Ve,qe,We,g,K;const o=t.ownerDocument??document;Cn(o);const e=vn(t),a=En(e.root),i={global:((Pe=(Te=n.hostChannel)==null?void 0:Te.getSettingsScope("global"))==null?void 0:Pe.settings)??{...Ct},book:((Fe=(Me=n.hostChannel)==null?void 0:Me.getSettingsScope("book"))==null?void 0:Fe.settings)??{...Ct}};let l="global",d="typography",s=!1,v=!1,h=((et=(Qe=n.hostChannel)==null?void 0:Qe.getConfig())==null?void 0:et.capabilities.playback)??!1,b=null;const u=(Oe=(tt=n.hostChannel)==null?void 0:tt.getConfig())==null?void 0:Oe.scopeFollowSwitch;let x=((Re=(He=n.hostChannel)==null?void 0:He.getSettingsScope("book"))==null?void 0:Re.followsGlobal)??!1;u&&(e.scopeFollowToggle.textContent=u.label);let k=($e=(_e=n.hostChannel)==null?void 0:_e.getConfig())==null?void 0:$e.colorScheme,w=n.volumeKeysCapability??((Ge=(De=n.hostChannel)==null?void 0:De.getConfig())==null?void 0:Ge.capabilities.volumeKeys)??!1;const p=(Ve=(Ke=n.hostChannel)==null?void 0:Ke.getConfig())==null?void 0:Ve.controlsState;e.volumeKeysRow.hidden=!w;function C(c){t.classList.remove("theme-dark","theme-amoled"),c.themeName==="amoled"?t.classList.add("theme-amoled"):(c.isDark||k==="dark")&&t.classList.add("theme-dark")}function L(){return i[l]}function O(){const c=L().fontFamily;for(const E of Array.from(e.fontFamilyPills.children)){const Q=Lt.find(ke=>ke.id===E.dataset.value);E.setAttribute("aria-checked",String((Q==null?void 0:Q.value)===c))}}function F(){const c=kn(L().themeName,L().isDark);for(const E of Array.from(e.themeSwatches.children))E.setAttribute("aria-checked",String(E.dataset.value===c.id))}function S(c,E){for(const Q of Array.from(c.children))Q.setAttribute("aria-checked",String(Q.dataset.value===E))}function A(){e.playbackEmpty.hidden=h,e.playbackControls.hidden=!h}function B(){const c=!!u&&l==="book";e.scopeFollowRow.hidden=!c,c&&(e.scopeFollowToggle.setAttribute("aria-pressed",String(x)),e.scopeFollowBanner.hidden=!x,u&&(e.scopeFollowBanner.textContent=u.bannerText))}function $(){const c=l==="book"&&x;for(const E of["typography","layout","theme"])for(const Q of Array.from(e.panels[E].querySelectorAll("input, button")))Q.disabled=c}function U(){const c=L().useBookLayout;for(const E of Array.from(e.fontFamilyPills.children))E.disabled=c;e.paragraphSpacingInput.disabled=c,e.lineHeightInput.disabled=c,e.justifyToggle.disabled=c,e.hyphenateToggle.disabled=c}function M(){const c=L();e.fontSizeInput.value=String(c.fontSize),e.fontSizeInput.setAttribute("aria-valuetext",`${c.fontSize}px`),e.fontSizeValue.textContent=`${c.fontSize}px`,e.paragraphSpacingInput.value=String(c.paragraphSpacing),e.paragraphSpacingValue.textContent=`${c.paragraphSpacing}em`,O(),S(e.flowPills,c.flow),S(e.columnsPills,String(c.maxColumnCount)),e.marginTopInput.value=String(c.marginTop),e.marginTopInput.setAttribute("aria-valuetext",`${c.marginTop}px`),e.marginTopValue.textContent=`${c.marginTop}px`,e.marginBottomInput.value=String(c.marginBottom),e.marginBottomInput.setAttribute("aria-valuetext",`${c.marginBottom}px`),e.marginBottomValue.textContent=`${c.marginBottom}px`,e.marginLeftInput.value=String(c.marginLeft),e.marginLeftInput.setAttribute("aria-valuetext",`${c.marginLeft}px`),e.marginLeftValue.textContent=`${c.marginLeft}px`,e.marginRightInput.value=String(c.marginRight),e.marginRightInput.setAttribute("aria-valuetext",`${c.marginRight}px`),e.marginRightValue.textContent=`${c.marginRight}px`,e.linkSideMarginsToggle.setAttribute("aria-pressed",String(c.linkSideMargins)),e.lineHeightInput.value=String(c.lineHeight),e.lineHeightValue.textContent=c.lineHeight.toFixed(2),e.justifyToggle.setAttribute("aria-pressed",String(c.justify)),e.hyphenateToggle.setAttribute("aria-pressed",String(c.hyphenate)),e.useBookLayoutToggle.setAttribute("aria-pressed",String(c.useBookLayout)),B(),$(),U(),F(),A(),e.scopeGlobalBtn.setAttribute("aria-checked",String(l==="global")),e.scopeBookBtn.setAttribute("aria-checked",String(l==="book"))}function z(c){var E;i[l]={...i[l],...c},M(),r.applyStyles(i[l]),C(i[l]),(E=n.hostChannel)==null||E.emitIntent({type:"settingsChange",scope:l,settings:i[l]})}function V(){z({fontSize:Number(e.fontSizeInput.value)})}e.fontSizeInput.addEventListener("change",V);function D(){z({paragraphSpacing:Number(e.paragraphSpacingInput.value)})}e.paragraphSpacingInput.addEventListener("change",D);for(const c of Lt){const E=document.createElement("button");E.type="button",E.className="rx-settings-pill",E.setAttribute("role","radio"),E.setAttribute("aria-checked","false"),E.setAttribute("data-value",c.id),E.textContent=c.label,E.addEventListener("click",()=>z({fontFamily:c.value})),e.fontFamilyPills.appendChild(E)}function _(c){const E=c.currentTarget.dataset.value;z({flow:E})}for(const c of Array.from(e.flowPills.children))c.addEventListener("click",_);function y(c){const E=Number(c.currentTarget.dataset.value);z({maxColumnCount:E})}for(const c of Array.from(e.columnsPills.children))c.addEventListener("click",y);function N(){z({marginTop:Number(e.marginTopInput.value)})}e.marginTopInput.addEventListener("change",N);function G(){z({marginBottom:Number(e.marginBottomInput.value)})}e.marginBottomInput.addEventListener("change",G);function Z(){const c=Number(e.marginLeftInput.value);L().linkSideMargins?z({marginLeft:c,marginRight:c}):z({marginLeft:c})}e.marginLeftInput.addEventListener("change",Z);function Y(){const c=Number(e.marginRightInput.value);L().linkSideMargins?z({marginLeft:c,marginRight:c}):z({marginRight:c})}e.marginRightInput.addEventListener("change",Y);function X(){z({linkSideMargins:!L().linkSideMargins})}e.linkSideMarginsToggle.addEventListener("click",X);function J(){z({lineHeight:Number(e.lineHeightInput.value)})}e.lineHeightInput.addEventListener("change",J);function T(){z({justify:!L().justify})}e.justifyToggle.addEventListener("click",T);function f(){z({hyphenate:!L().hyphenate})}e.hyphenateToggle.addEventListener("click",f);function P(){z({useBookLayout:!L().useBookLayout})}e.useBookLayoutToggle.addEventListener("click",P);for(const c of dt){const E=document.createElement("button");E.type="button",E.className="rx-settings-swatch",E.setAttribute("role","radio"),E.setAttribute("aria-checked","false"),E.setAttribute("aria-label",c.label),E.setAttribute("data-value",c.id);const Q=document.createElement("span");Q.className="rx-settings-swatch-dot",Q.style.background=c.swatchBg;const ke=document.createElement("span");ke.textContent=c.label,E.append(Q,ke),E.addEventListener("click",()=>z({themeName:c.themeName,isDark:c.isDark})),e.themeSwatches.appendChild(E)}let H=(p==null?void 0:p.swipeEnabled)??!0,R=(p==null?void 0:p.volumeKeysEnabled)??!1;r.setSwipe(H);const ee=(p==null?void 0:p.tapZonePresets)??[];let ae=(p==null?void 0:p.tapZonePreset)??((qe=ee[0])==null?void 0:qe.id);e.tapZonePills.hidden=ee.length===0;for(const c of ee){const E=document.createElement("button");E.type="button",E.className="rx-settings-pill",E.setAttribute("role","radio"),E.setAttribute("aria-checked","false"),E.setAttribute("data-value",c.id),E.textContent=c.label,E.addEventListener("click",()=>ie(c.id)),e.tapZonePills.appendChild(E)}ae&&S(e.tapZonePills,ae);function te(){var c;(c=n.hostChannel)==null||c.emitIntent({type:"controlsChange",swipeEnabled:H,volumeKeysEnabled:R,...ee.length>0?{tapZonePreset:ae}:{}})}function oe(){H=!H,e.swipeToggle.setAttribute("aria-pressed",String(H)),r.setSwipe(H),te()}e.swipeToggle.addEventListener("click",oe),e.swipeToggle.setAttribute("aria-pressed",String(H));function ie(c){ae=c,S(e.tapZonePills,ae),te()}function be(){R=!R,e.volumeKeysToggle.setAttribute("aria-pressed",String(R)),te()}e.volumeKeysToggle.addEventListener("click",be),e.volumeKeysToggle.setAttribute("aria-pressed",String(R));const ue=1,re=30;let le=ue,ce=re,de=re;function ge(){e.narrationSpeedInput.value=String(le),e.narrationSpeedValue.textContent=`${le.toFixed(1)}x`,e.skipBackInput.value=String(ce),e.skipBackValue.textContent=`${ce}s`,e.skipForwardInput.value=String(de),e.skipForwardValue.textContent=`${de}s`}function me(){var c;le=Number(e.narrationSpeedInput.value),e.narrationSpeedValue.textContent=`${le.toFixed(1)}x`,(c=n.hostChannel)==null||c.emitIntent({type:"playback",action:"rateChange",positionSec:null,rate:le})}e.narrationSpeedInput.addEventListener("input",()=>{e.narrationSpeedValue.textContent=`${Number(e.narrationSpeedInput.value).toFixed(1)}x`}),e.narrationSpeedInput.addEventListener("change",me);function xe(){var c;(c=n.hostChannel)==null||c.emitIntent({type:"playbackSkipChange",skipBackSec:ce,skipForwardSec:de})}function m(){e.skipBackValue.textContent=`${e.skipBackInput.value}s`}function I(){ce=Number(e.skipBackInput.value),e.skipBackValue.textContent=`${ce}s`,xe()}e.skipBackInput.addEventListener("input",m),e.skipBackInput.addEventListener("change",I);function q(){e.skipForwardValue.textContent=`${e.skipForwardInput.value}s`}function ne(){de=Number(e.skipForwardInput.value),e.skipForwardValue.textContent=`${de}s`,xe()}e.skipForwardInput.addEventListener("input",q),e.skipForwardInput.addEventListener("change",ne),ge();const j=((g=(We=n.hostChannel)==null?void 0:We.getConfig())==null?void 0:g.settingsActions)??[],ve=new Map,ye=new Map,Se=new Map;for(const c of j){const E=document.createElement("button");E.type="button",E.className=c.styleHint==="accent"?"rx-settings-action-btn rx-settings-action-btn--accent":"rx-settings-action-btn",E.textContent=c.label,E.dataset.actionId=c.id,ye.set(c.id,c.enabled!==!1),Se.set(c.id,c.disabledScopes??[]),E.addEventListener("click",()=>{var Q;(Q=n.hostChannel)==null||Q.emitIntent({type:"settingsAction",actionId:c.id,scope:l})}),ve.set(c.id,E),e.actionsFoot.appendChild(E)}function Ce(){for(const c of j){const E=ve.get(c.id);E.disabled=!ye.get(c.id)||Se.get(c.id).includes(l)}}Ce();function Le(){let c=!1;for(const E of j){const Q=ve.get(E.id),ke=!E.tabs||E.tabs.includes(d);Q.hidden=!ke,ke&&(c=!0)}e.actionsFoot.hidden=!c}Le();function Xe(c){c!==d&&(e.tabButtons[d].setAttribute("aria-selected","false"),e.panels[d].hidden=!0,d=c,e.tabButtons[d].setAttribute("aria-selected","true"),e.panels[d].hidden=!1,Le())}for(const c of Sn)e.tabButtons[c].addEventListener("click",()=>Xe(c));Xe("typography"),e.tabButtons.typography.setAttribute("aria-selected","true"),e.panels.typography.hidden=!1;function Ne(c){c!==l&&(l=c,M(),r.applyStyles(i[l]),C(i[l]),Ce())}e.scopeGlobalBtn.addEventListener("click",()=>Ne("global")),e.scopeBookBtn.addEventListener("click",()=>Ne("book"));function Ie(){var c;x=!x,M(),(c=n.hostChannel)==null||c.emitIntent({type:"scopeFollowChange",follows:x})}e.scopeFollowToggle.addEventListener("click",Ie);const Ae=(K=n.hostChannel)==null?void 0:K.onCommand(c=>{if(c.type==="setSettingsScope")i[c.scope]=c.settings,c.scope==="book"&&c.followsGlobal!==void 0&&(x=c.followsGlobal),c.scope===l&&(M(),r.applyStyles(i[l]),C(i[l]));else if(c.type==="setPlaybackState")le=c.rate,c.skipBackSec!==void 0&&(ce=c.skipBackSec),c.skipForwardSec!==void 0&&(de=c.skipForwardSec),ge();else if(c.type==="configure"&&(h=c.capabilities.playback,A(),k=c.colorScheme,C(L()),w=n.volumeKeysCapability??c.capabilities.volumeKeys??!1,e.volumeKeysRow.hidden=!w,c.controlsState&&(H=c.controlsState.swipeEnabled,R=c.controlsState.volumeKeysEnabled,e.swipeToggle.setAttribute("aria-pressed",String(H)),e.volumeKeysToggle.setAttribute("aria-pressed",String(R)),r.setSwipe(H)),c.settingsActions)){for(const E of c.settingsActions)ve.has(E.id)&&(ye.set(E.id,E.enabled!==!1),Se.set(E.id,E.disabledScopes??[]));Ce()}});function pe(){var c;s||(s=!0,b=o.activeElement??null,t.classList.add("settings-open"),e.scrim.classList.add("visible"),a.activate(),e.root.focus({preventScroll:!0}),(c=n.onOpenChange)==null||c.call(n,!0))}function se(){var c,E;s&&(s=!1,t.classList.remove("settings-open"),e.scrim.classList.remove("visible"),a.deactivate(),(c=b==null?void 0:b.focus)==null||c.call(b),b=null,(E=n.onOpenChange)==null||E.call(n,!1))}function Je(){s?se():pe()}e.closeBtn.addEventListener("click",se),e.scrim.addEventListener("click",se),C(L()),M();function ze(){v||(v=!0,Ae==null||Ae(),a.deactivate(),t.classList.remove("settings-open"),e.root.remove(),e.scrim.remove())}return{open:pe,close:se,toggle:Je,isOpen:()=>s,getActiveSettings:()=>L(),getActiveScope:()=>l,destroy:ze}}const An={top:0,right:0,bottom:0,left:0};function Tt(t,r){t.style.setProperty("--rx-inset-top",`${Math.max(0,r.top)}px`),t.style.setProperty("--rx-inset-right",`${Math.max(0,r.right)}px`),t.style.setProperty("--rx-inset-bottom",`${Math.max(0,r.bottom)}px`),t.style.setProperty("--rx-inset-left",`${Math.max(0,r.left)}px`)}const Tn=280,Bt="reactor-shell-stylesheet";function Bn(t){if(t.getElementById(Bt))return;const r=t.createElement("style");r.id=Bt,r.textContent=Wt,t.head.appendChild(r)}function Nn(){return typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches}function In(){const t=new Set;return{getChromeState:()=>({barsVisible:!1,sidebar:"none"}),onChromeState:r=>(t.add(r),()=>t.delete(r)),setBarsVisible:()=>{},refreshSizeClass:()=>{},destroy:()=>{t.clear()}}}function Mn(t,r,n={}){var Oe,He,Re,_e,$e,De,Ge,Ke,Ve,qe,We;if((n.chrome??"reactor")==="host")return In();const e=t.ownerDocument??document;Bn(e);const a=qt(t),i=a.root;let l=!1,d=!1,s="none",v=!1,h=!1,b=null;const u=(Oe=n.hostChannel)==null?void 0:Oe.getConfig();let x=(u==null?void 0:u.tapZonesOwner)??"shell",k=!!u;const w=new Set;function p(){var K;if(h)return;const g={barsVisible:d,sidebar:s};for(const c of w)c(g);(K=n.hostChannel)==null||K.emitIntent({type:"chromeState",barsVisible:d,sidebar:s})}function C(g){d!==g&&(d=g,i.classList.toggle("ui-visible",d),g&&M(),L(),g||z(),q==null||q.setChromeVisible(d),p())}function L(){fe(i,{top:d?a.topBar.offsetHeight:0,bottomChrome:d?a.bottomBar.offsetHeight:0})}const O=250;let F=null,S=null,A=!1,B=null,$;function U(){A=!0,clearTimeout($),$=setTimeout(()=>{A=!1,B=null},O)}function M(){F=B??b,B=null,S=b,U()}function z(){B=!A&&b!==S?null:F,F=null,U()}function V(g){if(d){A&&(S=g,A=!1);return}if(B&&g!==B){const K=B;B=null,r.goTo(K)}else B=null}function D(){C(!d)}const _=Sr(i,g=>r.goTo(g),{eink:n.eink,onBack:()=>{var g;return(g=n.hostChannel)==null?void 0:g.emitIntent({type:"back"})},onSidebarChange:g=>{s=g?"left":"none",a.contentsBtn.setAttribute("aria-pressed",String(g)),p(),G()}});function y(){return i.classList.contains("size-desktop")}function N(){if(_.isOpen()){_.close();return}y()||m.close(),se.close(),_.open()}a.contentsBtn.addEventListener("click",N);function G(){const g=i.classList.contains("size-desktop");fe(i,{left:g&&_.isOpen()?Tn:0})}function Z(){i.classList.toggle("reduced-motion",X||Nn())}function Y(){i.classList.toggle("e-ink",X)}let X=((Re=(He=n.hostChannel)==null?void 0:He.getConfig())==null?void 0:Re.eink)??!!n.eink;Y(),Z(),Tt(i,(($e=(_e=n.hostChannel)==null?void 0:_e.getConfig())==null?void 0:$e.insets)??An),L();const J=(De=n.hostChannel)==null?void 0:De.onCommand(g=>{if(g.type==="toggleBars"){D();return}g.type==="configure"&&(X=g.eink,Y(),Z(),Tt(i,g.insets),L(),k||(k=!0,x=g.tapZonesOwner??"shell"))});function T(){const g=t.clientWidth||i.clientWidth,K=it(g);i.classList.remove("size-phone","size-fold-tablet","size-desktop"),i.classList.add(`size-${K}`),G(),L()}T();function f(){T(),m.refreshLayout()}const P=typeof ResizeObserver=="function"?new ResizeObserver(()=>f()):null;P==null||P.observe(t);const H=()=>f();P||window.addEventListener("resize",H);const R=typeof matchMedia=="function"?matchMedia("(prefers-reduced-motion: reduce)"):null,ee=()=>Z();(Ge=R==null?void 0:R.addEventListener)==null||Ge.call(R,"change",ee);function ae(g,K){if(x==="host")return;const c=jt(g,l);c==="prev"?r.prev():c==="next"?r.next():D()}function te(g){g==="prev"?r.prev():g==="next"?r.next():D()}function oe(g,K){K.key!=="Enter"&&K.key!==" "||(K.preventDefault(),te(g))}const ie=()=>te(l?"next":"prev"),be=()=>te(l?"prev":"next"),ue=()=>te("toggle"),re=g=>oe(l?"next":"prev",g),le=g=>oe(l?"prev":"next",g),ce=g=>oe("toggle",g);a.zoneLeft.addEventListener("click",ie),a.zoneRight.addEventListener("click",be),a.zoneCentre.addEventListener("click",ue),a.zoneLeft.addEventListener("keydown",re),a.zoneRight.addEventListener("keydown",le),a.zoneCentre.addEventListener("keydown",ce);function de(){return se.isOpen()?(se.close(),!0):pe!=null&&pe.isOpen()?(pe.close(),!0):ze.isOpen()?(ze.close(),!0):m.isOpen()?(I(),!0):_.isOpen()?(_.close(),!0):d?(C(!1),!0):!1}function ge(g){const K=Jt(g);K&&(Qt(K)&&g.preventDefault(),K==="next"?r.next():K==="prev"?r.prev():K==="toggleBars"?D():K==="escape"&&de())}e.addEventListener("keydown",ge);const me=()=>r.historyBack(),xe=()=>r.historyForward();a.historyBackBtn.addEventListener("click",me),a.historyForwardBtn.addEventListener("click",xe);const m=nn(i,r,{getSizeClass:()=>it(t.clientWidth||i.clientWidth),onWidthChange:n.onContextWidthChange,hostChannel:n.hostChannel,onClose:()=>{s="none",a.contextBtn.setAttribute("aria-pressed","false"),p()}});function I(){s==="right"?(m.close(),s="none"):(y()||_.close(),se.close(),m.open(),s="right"),a.contextBtn.setAttribute("aria-pressed",String(s==="right")),p()}a.contextBtn.addEventListener("click",I);const q=n.hostChannel?dn(i,r,n.hostChannel,{eink:n.eink}):null;let ne=new Set;function j(){a.bookmarkBtn.setAttribute("aria-pressed",String(!!b&&ne.has(b)))}function ve(){!n.hostChannel||!b||n.hostChannel.emitIntent({type:"bookmarkToggle",cfi:b})}const ye=(Ke=n.hostChannel)==null?void 0:Ke.onCommand(g=>{g.type==="setBookmarks"&&(ne=new Set(g.items.map(K=>K.cfi)),j())});a.bookmarkBtn.addEventListener("click",ve);let Se=!1;function Ce(g){Se||(Se=!0,a.narrationBtn.hidden=!g)}let Le=!1;function Xe(){a.narrationBtn.setAttribute("aria-pressed",String(Le))}function Ne(){var g;(g=n.hostChannel)==null||g.emitIntent({type:"playback",action:Le?"stop":"play",positionSec:null,rate:null})}const Ie=(Ve=n.hostChannel)==null?void 0:Ve.onCommand(g=>{g.type==="configure"?Ce(g.capabilities.playback):g.type==="setPlaybackState"&&(Le=g.active!==!1,Xe())}),Ae=(qe=n.hostChannel)==null?void 0:qe.getConfig();Ae&&Ce(Ae.capabilities.playback),a.narrationBtn.addEventListener("click",Ne);const pe=n.hostChannel?fn({shellRoot:i,core:r,hostChannel:n.hostChannel,options:{eink:n.eink}}):null,se=Ln(i,r,{getSizeClass:()=>it(t.clientWidth||i.clientWidth),eink:n.eink,hostChannel:n.hostChannel,volumeKeysCapability:n.volumeKeysCapability,onOpenChange:g=>{a.settingsBtn.setAttribute("aria-pressed",String(g))}});function Je(){if(se.isOpen()){se.close();return}_.close(),m.close(),s="none",a.contentsBtn.setAttribute("aria-pressed","false"),a.contextBtn.setAttribute("aria-pressed","false"),p(),se.open()}a.settingsBtn.addEventListener("click",Je);const ze=Xr(i,r,{onOpenInGlossary:g=>{m.openGlossaryTerm(g),s="right",a.contextBtn.setAttribute("aria-pressed","true"),p()}}),Te=(We=n.hostChannel)==null?void 0:We.onCommand(g=>{var K;g.type==="dismiss"&&!de()&&((K=n.hostChannel)==null||K.emitIntent({type:"back"}))}),Pe=()=>{v=!0},Me=()=>{v=!1,r.goToFraction(Number(a.scrubber.value)/1e3)};a.scrubber.addEventListener("pointerdown",Pe),a.scrubber.addEventListener("change",Me);function Fe(g){switch(g.type){case"loaded":l=g.isRtl,i.classList.toggle("is-rtl",l),_.setToc(g.toc),G(),L();break;case"relocate":b=g.cfi??null,V(b),a.chapterLabel&&a.chapterLabel.textContent!==(g.chapterTitle??"")&&(a.chapterLabel.textContent=g.chapterTitle??""),!v&&typeof g.fraction=="number"&&(a.scrubber.value=String(Math.round(g.fraction*1e3))),_.setCurrentChapterTitle(g.chapterTitle),j();break;case"history":a.historyBackBtn.disabled=!g.canGoBack,a.historyForwardBtn.disabled=!g.canGoForward;break;case"tap":ae(g.x,g.y);break}}const Qe=r.on(Fe);r.replayLastEvents(Fe),p();function et(){T()}function tt(){var g;h||(h=!0,Qe(),P==null||P.disconnect(),P||window.removeEventListener("resize",H),(g=R==null?void 0:R.removeEventListener)==null||g.call(R,"change",ee),e.removeEventListener("keydown",ge),a.zoneLeft.removeEventListener("click",ie),a.zoneRight.removeEventListener("click",be),a.zoneCentre.removeEventListener("click",ue),a.zoneLeft.removeEventListener("keydown",re),a.zoneRight.removeEventListener("keydown",le),a.zoneCentre.removeEventListener("keydown",ce),a.historyBackBtn.removeEventListener("click",me),a.historyForwardBtn.removeEventListener("click",xe),a.contextBtn.removeEventListener("click",I),a.bookmarkBtn.removeEventListener("click",ve),a.narrationBtn.removeEventListener("click",Ne),Ie==null||Ie(),ye==null||ye(),Te==null||Te(),J==null||J(),pe==null||pe.destroy(),m.destroy(),q==null||q.destroy(),a.settingsBtn.removeEventListener("click",Je),se.destroy(),ze.destroy(),a.scrubber.removeEventListener("pointerdown",Pe),a.scrubber.removeEventListener("change",Me),a.contentsBtn.removeEventListener("click",N),_.destroy(),w.clear(),i.classList.remove("reader-shell","ui-visible","e-ink","reduced-motion","is-rtl","size-phone","size-fold-tablet","size-desktop","settings-open"),a.zones.remove(),a.topBar.remove(),a.bottomBar.remove())}return{getChromeState:()=>({barsVisible:d,sidebar:s}),onChromeState:g=>(w.add(g),()=>w.delete(g)),setBarsVisible:C,refreshSizeClass:et,destroy:tt}}export{ut as ZONE_FRACTION,it as computeSizeClass,Qt as isPreventableKey,dn as mountPlaybackBar,nn as mountRightSidebar,Ln as mountSettingsPanel,Mn as mountShell,Jt as resolveKeyboardAction,jt as resolveTapZone};
