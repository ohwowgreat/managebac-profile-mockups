component('compact-profile-bar', element => `<section class="compact-profile ${element.getAttribute('variant') === 'card' ? 'card-profile' : ''}">
  <div class="compact-person">
    <div class="student-avatar">TE</div>
    <div>
      <div class="eyebrow">Student profile</div>
      <h1>Tao (Tom) Example</h1>
      <div class="student-meta">Grade 12 · A Level · Class of 2027 · Advisor: J. Whitfield</div>
      <div class="student-badges"><span class="tag amber">Moderate risk</span><span class="tag red">2 follow-ups open</span></div>
    </div>
  </div>
  <div class="compact-metrics">
    <span><b>72.0%</b><small>ManageBac avg</small></span>
    <span><b>88%</b><small>Completion</small></span>
    <span><b class="red">2</b><small>Past due</small></span>
  </div>
  <div class="header-actions"><span class="btn">Grades &amp; reports</span><span class="btn primary">+ New log</span></div>
</section>`);

component('triple-classes-card', element => {
  const condensed = element.getAttribute('density') === 'condensed';
  return `<section class="card triple-classes ${condensed ? 'condensed' : ''}">
    <div class="card-head"><div><h2>Classes <span class="head-meta">· 5</span></h2><p>ManageBac averages</p></div><span class="tag purple head-right">72.0%</span></div>
    <div class="compact-class-list">${studentClasses.map(course => `<article class="compact-class-row">
      <div class="compact-class-heading"><span class="class-name">${course.name}</span><strong class="compact-grade ${course.tone === 'amber' ? 'amber' : ''}">${course.grade}</strong></div>
      <div class="compact-class-meta">${condensed ? course.teacher : `${course.code} · ${course.teacher}`}</div>
      <div class="compact-class-bottom"><span class="compact-completion"><span>Completion <b>${course.completion}%</b></span><span class="mini-track"><i class="${course.completion < 80 ? 'warn' : ''}" style="width:${course.completion}%"></i></span></span><span class="tag ${course.tone}">${course.standing}</span></div>
    </article>`).join('')}</div>
    <div class="compact-class-footer"><span>5 current classes</span><span class="text-link">Open gradebook →</span></div>
  </section>`;
});

class VariantNav extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') || '';
    const options = [
      ['a1', 'A1', 'Balanced'],
      ['a2', 'A2', 'Attendance-wide'],
      ['b1', 'B1', 'Log-wide'],
      ['b2', 'B2', 'Class-wide']
    ];
    this.innerHTML = `<nav class="concept-switcher variant-switcher" aria-label="Compare three-column variants">
      <a class="all-concepts" href="three-columns.html">3-column options</a><span class="switcher-divider"></span>
      ${options.map(([key, letter, label]) => `<a class="concept-link ${active === key ? 'active' : ''}" href="option-${key}-three-columns.html" ${active === key ? 'aria-current="page"' : ''} title="${label}"><span>${letter}</span><b>${label}</b></a>`).join('')}
    </nav>`;
  }
}

customElements.define('variant-nav', VariantNav);
