component('attendance-strip', () => {
  const codes = { 'no-lesson': '—', late: 'L', present: 'P', 'register-missing': 'NR', absent: 'A', excused: 'E' };
  const exception = attendancePeriods.find(period => period.state === 'absent');
  return `<section class="card attendance-strip-card">
    <div class="card-head"><div><h2>Attendance</h2><p>ManageBac · daily</p></div><span class="head-meta head-right">Term 1</span></div>
    <div class="strip-summary"><div><strong>97.6%</strong><span>term present</span></div><div class="strip-counts"><span><i class="dot red"></i>1 absent</span><span><i class="dot amber"></i>1 late</span><span><i class="dot blue"></i>1 excused</span></div></div>
    <div class="strip-date"><span class="date-arrow">‹</span><span class="date-label">Fri 23 Oct</span><span class="date-arrow">›</span></div>
    <div class="strip-periods" aria-label="Attendance by period on Friday 23 October">${attendancePeriods.map(period => `<div class="strip-period ${period.state}" title="${period.period} · ${period.className} · ${period.status}${period.note ? ` · ${period.note}` : ''}"><span class="strip-p">${period.period}</span><span class="strip-class">${period.className}</span><span class="strip-state ${period.state}" aria-label="${period.status}">${codes[period.state]}</span></div>`).join('')}</div>
    <div class="strip-detail"><b>${exception.period} · ${exception.className}</b><span>Absent · “${exception.note}”</span></div>
    <div class="strip-legend"><span><b>P</b> present</span><span><b>L</b> late</span><span><b>A</b> absent</span><span><b>E</b> excused</span><span class="strip-nr"><b>NR</b> no register returned</span><span><b>—</b> no lesson</span></div>
    <div class="strip-coverage">Term counts through 23 Oct<br>5/5 classes synced · 18:10</div>
  </section>`;
});

class IntegratedNav extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') || '';
    const options = [['b3', 'B3', 'Full context'], ['b4', 'B4', 'Focused']];
    this.innerHTML = `<nav class="concept-switcher integrated-switcher" aria-label="Compare integrated B layouts"><a class="all-concepts" href="integrated.html">Integrated B</a><span class="switcher-divider"></span>${options.map(([key, letter, label]) => `<a class="concept-link ${active === key ? 'active' : ''}" href="option-${key}-${key === 'b3' ? 'integrated' : 'focused'}.html" ${active === key ? 'aria-current="page"' : ''} title="${label}"><span>${letter}</span><b>${label}</b></a>`).join('')}</nav>`;
  }
}

customElements.define('integrated-nav', IntegratedNav);
