const navIcons = {
  overview: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  students: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.5 3.5-5 6.5-5s5.5 1.5 6.5 5"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14.5c2.3.2 4 1.6 4.5 4"/>',
  logs: '<path d="M6 3h9l4 4v14H6z"/><path d="M9 12h7M9 16h7M9 8h3"/>',
  classes: '<path d="M4 4h7v16H4zM13 4h7v16h-7z"/>',
  analytics: '<path d="M4 20V10M10 20V4M16 20v-8M21 20H3"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 9h18M8 3v4M16 3v4"/>',
  finals: '<path d="M8 21h8M12 17v4M6 3h12v5a6 6 0 0 1-12 0z"/><path d="M6 5H3v2a3 3 0 0 0 3 3M18 5h3v2a3 3 0 0 1-3 3"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a1.7 1.7 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.5-1.1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a1.7 1.7 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1.1 1.7 1.7 0 0 0 .3 1.8 1.7 1.7 0 0 0 1.5 1.1z"/>'
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${navIcons[name]}</svg>`;
}

class StudentSidebar extends HTMLElement {
  connectedCallback() {
    const items = [
      ['overview', 'Overview'],
      ['students', 'Students'],
      ['logs', 'Student Logs'],
      ['classes', 'Classes'],
      ['analytics', 'Analytics'],
      ['calendar', 'Calendar'],
      ['finals', 'Finals'],
      ['settings', 'Settings']
    ];
    this.innerHTML = `<aside class="sidebar" aria-label="Primary navigation">
      <div class="brand"><span class="brand-mark">B</span><span>BNDS Insights<small>Cambridge</small></span></div>
      <nav>${items.map(([key, label]) => `<span class="nav-item ${key === 'students' ? 'active' : ''}">${icon(key)}${label}</span>`).join('')}</nav>
      <div class="sidebar-foot">Design exploration<br>Student profile · fictional data</div>
    </aside>`;
  }
}

class ConceptNav extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active') || '';
    const options = [
      ['a', 'A', 'Balanced workspace'],
      ['b', 'B', 'Three-column dashboard'],
      ['c', 'C', 'Today-first board'],
      ['d', 'D', 'Readable dossier']
    ];
    this.innerHTML = `<nav class="concept-switcher" aria-label="Compare layout concepts">
      <a class="all-concepts" href="index.html">All concepts</a>
      <span class="switcher-divider"></span>
      ${options.map(([key, letter, label]) => `<a class="concept-link ${active === key ? 'active' : ''}" href="option-${key}-${{a: 'workspace', b: 'columns', c: 'today', d: 'dossier'}[key]}.html" ${active === key ? 'aria-current="page"' : ''} title="${label}"><span>${letter}</span><b>${label}</b></a>`).join('')}
    </nav>`;
  }
}

const studentLogs = [
  { category: 'Awaiting follow-up', tone: 'red', className: 'AL Physics A 2', date: 'Fri 23 Oct', text: 'Sent home ill P6 — please check he catches up on the practical.', author: 'D. Schaefer · 14:20', style: 'flagged' },
  { category: 'Repeated tardiness', tone: 'amber', className: 'AL Mathematics A 1', date: 'Thu 22 Oct', text: 'Late to P2 again — third time this term. Advisor notified.', author: 'N. Carroll · 09:05', style: 'flagged' },
  { category: 'Positive contribution', tone: 'green', className: 'AL Economics A 1', date: 'Wed 21 Oct', text: 'Excellent contribution to the market structures discussion and strong support for his group.', author: 'J. Whitfield · 16:02', style: '' },
  { category: 'Risk', tone: 'purple', className: 'None → Moderate', date: 'Mon 12 Oct', text: 'Late mark in Mathematics.', author: 'System · Cambridge risk check', style: 'risk-entry' }
];

const attendancePeriods = [
  { period: 'P1', time: '08:00', className: 'No lesson', state: 'no-lesson', status: '—' },
  { period: 'P2', time: '08:50', className: 'AL Mathematics A 1', teacher: 'N. Carroll', state: 'late', status: 'Late' },
  { period: 'P3', time: '09:50', className: 'AL Biology A 1', teacher: 'D. Schaefer', state: 'present', status: 'Present' },
  { period: 'P4', time: '10:50', className: 'No lesson', state: 'no-lesson', status: '—' },
  { period: 'P5', time: '13:00', className: 'AL Chemistry A 1', teacher: 'J. Whitfield', note: 'No register returned', state: 'register-missing', status: 'Not returned', badge: 'missing' },
  { period: 'P6', time: '14:00', className: 'AL Physics A 2', teacher: 'C. Mahinay', note: 'Ill — sent home', state: 'absent', status: 'Absent' },
  { period: 'P7', time: '15:00', className: 'AL Economics A 1', teacher: 'J. Whitfield', note: 'University visit', state: 'excused', status: 'Excused' },
  { period: 'P8', time: '16:00', className: 'No lesson', state: 'no-lesson', status: '—' }
];

const studentClasses = [
  { name: 'AL Chemistry A 1', code: 'AL26CHE31', teacher: 'J. Whitfield', grade: '66.8%', completion: 76, standing: 'Watch', tone: 'amber' },
  { name: 'AL Biology A 1', code: 'AL26BIO31', teacher: 'D. Schaefer', grade: '68.2%', completion: 84, standing: 'On track', tone: 'green' },
  { name: 'AL Mathematics A 1', code: 'AL26MAT31', teacher: 'N. Carroll', grade: '71.4%', completion: 88, standing: 'On track', tone: 'green' },
  { name: 'AL Physics A 2', code: 'AL26PHY31', teacher: 'C. Mahinay', grade: '74.5%', completion: 91, standing: 'On track', tone: 'green' },
  { name: 'AL Economics A 1', code: 'AL26ECO31', teacher: 'J. Whitfield', grade: '79.0%', completion: 95, standing: 'On track', tone: 'green' }
];

function component(name, renderer) {
  customElements.define(name, class extends HTMLElement {
    connectedCallback() {
      this.innerHTML = renderer(this);
    }
  });
}

function attendanceFooter() {
  return `<div class="attendance-foot">
    <span class="legend-swatch"></span>No lesson = no register due · grey = scheduled, no register returned
    <div class="coverage"><span>Term counts through 23 Oct</span><span>5/5 classes synced · 18:10</span></div>
  </div>`;
}

component('student-header', element => `<section class="card student-header ${element.getAttribute('mode') === 'today' ? 'c-header' : ''}">
  <div class="student-identity">
    <div class="student-avatar">TE</div>
    <div>
      <div class="eyebrow">Student profile</div>
      <h1>Tao (Tom) Example</h1>
      <div class="student-meta">Grade 12 · Class of 2027 · Advisor: J. Whitfield · 5 classes</div>
      <div class="student-badges"><span class="tag purple">A Level</span><span class="tag amber">Moderate risk</span><span class="tag red">2 follow-ups open</span></div>
    </div>
  </div>
  <div class="quick-stats">
    <div class="quick-stat"><strong>72.0%</strong><span>ManageBac average</span></div>
    <div class="quick-stat"><strong>88%</strong><span>Completion</span></div>
    <div class="quick-stat"><strong class="red">2</strong><span>Past due to review</span></div>
  </div>
  <div class="header-actions"><span class="btn">Grades &amp; reports</span><span class="btn primary">+ New log</span></div>
</section>`);

component('log-card', () => `<section class="card log-panel">
  <div class="card-head"><div><h2>Current log <span class="head-meta">· 4 entries</span></h2><p>Last 30 days · newest first</p></div><div class="segmented head-right"><span class="selected">All</span><span>Follow-ups</span></div></div>
  <div class="log-list">${studentLogs.map(log => `<article class="log-entry ${log.style}">
    <div class="log-entry-top"><span class="tag ${log.tone}">${log.category}</span><span class="log-class">${log.className}</span><time class="log-date">${log.date}</time></div>
    <p class="log-text">${log.text}</p>
    <div class="log-meta"><span>${log.author}</span><span class="text-link">Reply</span></div>
  </article>`).join('')}</div>
  <div class="log-footer"><span><i class="dot red"></i> 2 follow-ups still open</span><span class="text-link">Open full student log →</span></div>
</section>`);

component('attendance-card', element => {
  if (element.getAttribute('mode') === 'board') {
    return `<section class="card attendance-board">
      <div class="card-head"><div><h2>Today’s attendance</h2><p>ManageBac · class shown for every period</p></div><div class="board-term head-right"><div class="term-present"><strong>97.6%</strong><span>term present</span></div><div class="term-counts"><span><i class="dot red"></i>1 absent</span><span><i class="dot amber"></i>1 late</span><span><i class="dot blue"></i>1 excused</span></div></div></div>
      <div class="date-bar"><div class="date-nav"><span class="date-arrow">‹</span><span class="date-label">Fri 23 Oct</span><span class="date-arrow">›</span></div><span class="lesson-count">5 lessons</span><span class="board-scroll-hint">Swipe for all 8 periods →</span><span class="day-sync">Latest completed school day</span></div>
      <div class="period-board-wrap"><div class="period-board" aria-label="Attendance by period on Friday 23 October">${attendancePeriods.map(period => `<div class="board-period ${period.state}">
        <div class="board-period-top"><span class="period-number">${period.period}</span><span class="board-time">${period.time}</span></div>
        <div class="board-class">${period.className}</div>
        ${period.teacher ? `<div class="board-teacher">${period.teacher}</div>` : ''}
        ${period.state === 'absent' ? `<div class="board-note">${period.note}</div>` : ''}
        <span class="status-badge ${period.badge || period.state}">${period.status}</span>
      </div>`).join('')}</div></div>
      <div class="board-footer"><span>Dashed = no lesson</span><span>Grey = no register returned, not present</span><span>5/5 classes synced · term counts through 23 Oct</span></div>
    </section>`;
  }
  return `<section class="card attendance-panel">
    <div class="card-head"><div><h2>Attendance</h2><p>ManageBac · Term 1</p></div></div>
    <div class="attendance-summary"><div class="term-present"><strong>97.6%</strong><span>term present</span></div><div class="term-counts"><span><i class="dot red"></i>1 absent</span><span><i class="dot amber"></i>1 late</span><span><i class="dot blue"></i>1 excused</span></div></div>
    <div class="date-bar"><div class="date-nav"><span class="date-arrow">‹</span><span class="date-label">Fri 23 Oct</span><span class="date-arrow">›</span></div><span class="lesson-count">5 lessons</span><span class="day-sync">Synced 18:10</span></div>
    <div class="period-list" aria-label="Attendance by period on Friday 23 October">${attendancePeriods.map(period => `<div class="period-row ${period.state}">
      <span class="period-number">${period.period}</span>
      <div class="period-class"><strong>${period.className}</strong>${period.teacher ? `<span class="period-meta">${period.teacher}${period.note ? ` · ${period.note}` : ''}</span>` : ''}</div>
      <span class="status-badge ${period.badge || period.state}">${period.status}</span>
    </div>`).join('')}</div>
    ${attendanceFooter()}
  </section>`;
});

component('classes-card', () => `<section class="card classes-panel">
  <div class="card-head"><div><h2>Classes <span class="head-meta">· 5 current</span></h2><p>ManageBac averages and canonical completion</p></div><span class="tag purple head-right">Overall 72.0%</span></div>
  <div class="table-scroll"><table class="data-table" aria-label="Current classes"><colgroup><col style="width:48%"><col style="width:17%"><col style="width:19%"><col style="width:16%"></colgroup><thead><tr><th>Class</th><th class="num">ManageBac %</th><th>Completion</th><th>Standing</th></tr></thead><tbody>${studentClasses.map(course => `<tr>
    <td><span class="class-name">${course.name}</span><span class="class-sub">${course.code} · ${course.teacher}</span></td>
    <td class="num metric ${course.tone === 'amber' ? 'amber' : ''}">${course.grade}</td>
    <td class="completion-cell"><span class="metric">${course.completion}%</span><div class="mini-track"><i class="${course.completion < 80 ? 'warn' : ''}" style="width:${course.completion}%"></i></div></td>
    <td><span class="tag ${course.tone}">${course.standing}</span></td>
  </tr>`).join('')}</tbody></table></div>
</section>`);

component('class-cards', () => studentClasses.map(course => `<section class="card class-card">
  <div class="class-card-top"><div><h3>${course.name}</h3><div class="class-teacher">${course.teacher} · ${course.code}</div></div></div>
  <div class="class-grade ${course.tone === 'amber' ? 'amber' : ''}">${course.grade}</div>
  <div class="tiny muted">ManageBac average</div>
  <div class="class-card-footer"><span>Completion <b class="ink-2">${course.completion}%</b></span><span class="tag ${course.tone}">${course.standing}</span></div>
</section>`).join(''));

component('upcoming-card', () => `<section class="card">
  <div class="card-head"><div><h2>Upcoming work</h2><p>Next 7 days · attainments first</p></div><span class="head-meta head-right">3 tasks</span></div>
  <div class="work-list">
    <div class="work-row"><time class="work-date"><b>26</b>Mon Oct</time><div><div class="work-name">Trigonometry attainment</div><div class="work-meta">AL Mathematics A 1</div></div><span class="tag purple">Attainment</span></div>
    <div class="work-row"><time class="work-date"><b>28</b>Wed Oct</time><div><div class="work-name">Titration practical</div><div class="work-meta">AL Chemistry A 1</div></div><span class="tag purple">Attainment</span></div>
    <div class="work-row"><time class="work-date"><b>30</b>Fri Oct</time><div><div class="work-name">Market structures essay</div><div class="work-meta">AL Economics A 1</div></div><span class="tag">Work</span></div>
  </div>
</section>`);

component('pastdue-card', () => `<section class="card">
  <div class="card-head"><div><h2>Past-due work <span class="head-meta">· 2 to review</span></h2><p>Blank and zero grades; excused kept separate</p></div><span class="tag red head-right">Action needed</span></div>
  <div class="work-list">
    <div class="work-row past-due"><time class="work-date"><b>20</b>Tue Oct</time><div><div class="work-name">Practical 2</div><div class="work-meta">AL Chemistry A 1</div></div><span class="tag amber">No grade</span></div>
    <div class="work-row past-due"><time class="work-date"><b>19</b>Mon Oct</time><div><div class="work-name">Practical write-up</div><div class="work-meta">AL Physics A 2</div></div><span class="tag red">0 / 100</span></div>
    <div class="work-row"><time class="work-date"><b>16</b>Fri Oct</time><div><div class="work-name">Source analysis</div><div class="work-meta">AL Economics A 1</div></div><span class="tag">Excused: N/A</span></div>
  </div>
</section>`);

component('risk-card', () => `<section class="card">
  <div class="card-head"><div><h2>Risk timeline</h2><p>Canonical Cambridge standing</p></div><span class="tag amber head-right">Moderate</span></div>
  <div class="risk-timeline">
    <div class="risk-event"><i class="dot amber"></i><div><div class="risk-title">None → Moderate</div><div class="risk-meta">12 Oct · Late mark in Mathematics<br>System · Cambridge risk check</div></div></div>
    <div class="risk-event"><i class="dot green"></i><div><div class="risk-title">No risk flags</div><div class="risk-meta">1 Sep · Start of academic year</div></div></div>
  </div>
</section>`);

component('behavior-card', () => `<section class="card">
  <div class="card-head"><div><h2>Learning behavior</h2><p>Latest 3 entries</p></div><span class="text-link head-right">View history →</span></div>
  <div class="behavior-list">
    <div class="behavior-row"><div><div class="behavior-subject">AL Physics A 2</div><div class="behavior-task">Practical write-up</div></div><div class="behavior-score">3/4<span>Last week</span></div></div>
    <div class="behavior-row"><div><div class="behavior-subject">AL Economics A 1</div><div class="behavior-task">Collaboration</div></div><div class="behavior-score">4/4<span>12 Oct</span></div></div>
    <div class="behavior-row"><div><div class="behavior-subject">AL Mathematics A 1</div><div class="behavior-task">Independent practice</div></div><div class="behavior-score">2/4<span>8 Oct</span></div></div>
  </div>
</section>`);

component('marks-card', () => `<section class="card">
  <div class="card-head"><div><h2>Marks over time</h2><p>Current classes · ManageBac %</p></div><span class="tag green head-right">+1.8 this term</span></div>
  <div class="chart-wrap">
    <svg class="chart-svg" viewBox="0 0 320 105" role="img" aria-label="ManageBac average rises from 70.2 to 72.0 percent over six weeks">
      <g stroke="#eeeaf0" stroke-width="1"><path d="M25 15H310M25 42H310M25 69H310M25 96H310"/></g>
      <g fill="rgba(0,0,0,.38)" font-size="8" font-family="inherit"><text x="2" y="18">80%</text><text x="2" y="45">75%</text><text x="2" y="72">70%</text><text x="2" y="99">65%</text></g>
      <path d="M27 50 83 46 140 53 196 42 253 38 307 35" fill="none" stroke="#c9c2cd" stroke-width="2" stroke-dasharray="4 4"/>
      <path d="M27 61 83 56 140 63 196 48 253 45 307 42" fill="none" stroke="#6d417e" stroke-width="2.5"/>
      <g fill="#fff" stroke="#6d417e" stroke-width="2"><circle cx="27" cy="61" r="3"/><circle cx="83" cy="56" r="3"/><circle cx="140" cy="63" r="3"/><circle cx="196" cy="48" r="3"/><circle cx="253" cy="45" r="3"/><circle cx="307" cy="42" r="3.5"/></g>
      <text x="289" y="31" fill="#4a235b" font-size="9" font-weight="650">72.0%</text>
    </svg>
    <div class="chart-labels"><span>14 Sep</span><span>28 Sep</span><span>12 Oct</span><span>23 Oct</span></div>
    <div class="chart-key"><span><i></i>Student</span><span class="median"><i></i>Cohort median</span></div>
  </div>
</section>`);

customElements.define('student-sidebar', StudentSidebar);
customElements.define('concept-nav', ConceptNav);
