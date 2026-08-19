"use client";

import { useMemo, useState } from "react";
import type { FormEvent } from "react";

type Course = {
  id: number;
  code: string;
  title: string;
  category: string;
  level: string;
  progress: number;
  lessons: number;
  completed: number;
  nextLesson: string;
  duration: string;
  accent: string;
  softAccent: string;
  students: string;
  rating: string;
};

const courses: Course[] = [
  { id: 1, code: "UX", title: "Product Design Foundations", category: "Design", level: "Intermediate", progress: 68, lessons: 24, completed: 16, nextLesson: "Prototyping with intention", duration: "7h 20m", accent: "#6c5ce7", softAccent: "#eeeaff", students: "2.4k", rating: "4.9" },
  { id: 2, code: "AI", title: "Practical AI for Everyday Work", category: "AI & Data", level: "Beginner", progress: 34, lessons: 18, completed: 6, nextLesson: "Building a reliable prompt", duration: "5h 45m", accent: "#0b806b", softAccent: "#dff7f1", students: "4.8k", rating: "4.8" },
  { id: 3, code: "JS", title: "Modern JavaScript Patterns", category: "Development", level: "Advanced", progress: 12, lessons: 32, completed: 4, nextLesson: "Composable async workflows", duration: "10h 10m", accent: "#d97706", softAccent: "#fff1d6", students: "3.1k", rating: "4.7" },
  { id: 4, code: "PM", title: "Lead High-Impact Product Teams", category: "Leadership", level: "Intermediate", progress: 0, lessons: 20, completed: 0, nextLesson: "The modern product operating model", duration: "6h 30m", accent: "#d9485f", softAccent: "#ffe7ec", students: "1.9k", rating: "4.9" },
];

const lessonTitles = [
  "Welcome and course roadmap",
  "Understanding the problem space",
  "Research that reveals opportunity",
  "Prototyping with intention",
  "Testing, learning and iterating",
  "From insight to confident decisions",
];

const navItems = [
  { id: "overview", label: "Overview", symbol: "⌂" },
  { id: "explore", label: "Explore", symbol: "⌕" },
  { id: "learning", label: "My learning", symbol: "◫" },
  { id: "calendar", label: "Calendar", symbol: "◷" },
];

const deadlines = [
  { day: "21", month: "AUG", title: "Design critique", meta: "Product Design · 4:00 PM", tone: "purple" },
  { day: "24", month: "AUG", title: "AI workflow quiz", meta: "Practical AI · 15 min", tone: "green" },
  { day: "29", month: "AUG", title: "Async patterns lab", meta: "Modern JavaScript · 11:30 AM", tone: "amber" },
];

export default function Home() {
  const [activeNav, setActiveNav] = useState("overview");
  const [role, setRole] = useState<"student" | "instructor">("student");
  const [query, setQuery] = useState("");
  const [playerCourse, setPlayerCourse] = useState<Course | null>(null);
  const [activeLesson, setActiveLesson] = useState(3);
  const [lessonDone, setLessonDone] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [coachInput, setCoachInput] = useState("");
  const [coachReply, setCoachReply] = useState("You have 42 focused minutes today. I can turn that into a practical study plan.");
  const [toast, setToast] = useState("");

  const visibleCourses = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return courses;
    return courses.filter((course) => `${course.title} ${course.category} ${course.level}`.toLowerCase().includes(normalized));
  }, [query]);

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  }

  function openCourse(course: Course) {
    setPlayerCourse(course);
    setLessonDone(false);
    setQuizAnswer(null);
  }

  function askCoach(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!coachInput.trim()) return;
    const topic = coachInput.trim();
    setCoachReply(`Let’s make “${topic}” manageable: review the core idea for 10 minutes, apply it in one small exercise, then explain it back in your own words.`);
    setCoachInput("");
  }

  function switchRole(nextRole: "student" | "instructor") {
    setRole(nextRole);
    setActiveNav("overview");
    setQuery("");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <button className="brand" onClick={() => setActiveNav("overview")} aria-label="Lumina home">
          <span className="brand-mark"><span /></span><span>Lumina</span>
        </button>
        <nav className="side-nav">
          <p className="nav-caption">LEARN</p>
          {navItems.map((item) => (
            <button key={item.id} className={activeNav === item.id && role === "student" ? "nav-item active" : "nav-item"} onClick={() => { setActiveNav(item.id); setRole("student"); }}>
              <span className="nav-symbol" aria-hidden="true">{item.symbol}</span><span>{item.label}</span>
            </button>
          ))}
          <p className="nav-caption workspace-caption">WORKSPACE</p>
          <button className={role === "instructor" ? "nav-item active" : "nav-item"} onClick={() => switchRole("instructor")}>
            <span className="nav-symbol" aria-hidden="true">◇</span><span>Instructor studio</span>
          </button>
          <button className="nav-item" onClick={() => showToast("Messages are all caught up") }>
            <span className="nav-symbol" aria-hidden="true">□</span><span>Messages</span><span className="nav-badge">3</span>
          </button>
        </nav>
        <div className="sidebar-card">
          <span className="spark-symbol">✦</span><strong>Weekly goal</strong><span>3h 45m of 5h</span>
          <div className="mini-progress"><span style={{ width: "75%" }} /></div>
          <button onClick={() => setActiveNav("calendar")}>View activity →</button>
        </div>
        <button className="profile-card" onClick={() => switchRole(role === "student" ? "instructor" : "student")}>
          <span className="avatar">DK</span><span className="profile-copy"><strong>Danu K.</strong><small>{role === "student" ? "Student" : "Instructor"}</small></span><span aria-hidden="true">•••</span>
        </button>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="mobile-brand"><span className="brand-mark"><span /></span><strong>Lumina</strong></div>
          <label className="search-box">
            <span aria-hidden="true">⌕</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} onFocus={() => role === "student" && setActiveNav("explore")} placeholder="Search courses, skills, or topics" aria-label="Search courses, skills, or topics" />
            <kbd>⌘ K</kbd>
          </label>
          <div className="top-actions">
            <div className="role-switch" aria-label="Preview role"><button className={role === "student" ? "selected" : ""} onClick={() => switchRole("student")}>Student</button><button className={role === "instructor" ? "selected" : ""} onClick={() => switchRole("instructor")}>Instructor</button></div>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => showToast("You have 2 new learning updates")}>♧<span /></button>
          </div>
        </header>

        {role === "instructor" ? (
          <InstructorDashboard showToast={showToast} />
        ) : activeNav === "overview" ? (
          <StudentOverview openCourse={openCourse} setActiveNav={setActiveNav} coachInput={coachInput} setCoachInput={setCoachInput} coachReply={coachReply} askCoach={askCoach} />
        ) : activeNav === "explore" ? (
          <CourseCatalog courses={visibleCourses} query={query} openCourse={openCourse} setQuery={setQuery} />
        ) : activeNav === "learning" ? (
          <LearningView openCourse={openCourse} />
        ) : <CalendarView />}
      </main>

      <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map((item) => <button key={item.id} className={activeNav === item.id ? "active" : ""} onClick={() => { setRole("student"); setActiveNav(item.id); }}><span aria-hidden="true">{item.symbol}</span><small>{item.label.replace("My ", "")}</small></button>)}
      </nav>

      {playerCourse && <CoursePlayer course={playerCourse} activeLesson={activeLesson} setActiveLesson={setActiveLesson} lessonDone={lessonDone} setLessonDone={setLessonDone} quizAnswer={quizAnswer} setQuizAnswer={setQuizAnswer} close={() => setPlayerCourse(null)} showToast={showToast} />}
      <div className={toast ? "toast visible" : "toast"} role="status" aria-live="polite"><span>✓</span>{toast}</div>
    </div>
  );
}

function StudentOverview({ openCourse, setActiveNav, coachInput, setCoachInput, coachReply, askCoach }: {
  openCourse: (course: Course) => void;
  setActiveNav: (value: string) => void;
  coachInput: string;
  setCoachInput: (value: string) => void;
  coachReply: string;
  askCoach: (event: FormEvent<HTMLFormElement>) => void;
}) {
  const currentCourse = courses[0];
  return (
    <div className="page-wrap">
      <section className="welcome-row">
        <div><span className="eyebrow">WEDNESDAY, AUGUST 19</span><h1>Keep your momentum, Danu <span>✦</span></h1><p>You’re 32 minutes away from reaching today’s learning goal.</p></div>
        <div className="streak-pill"><span>⌁</span><strong>12 day streak</strong><small>Personal best: 18</small></div>
      </section>

      <section className="overview-grid">
        <article className="continue-card">
          <div className="continue-copy">
            <span className="section-kicker">CONTINUE LEARNING</span>
            <div className="course-label"><span style={{ background: currentCourse.accent }}>UX</span>{currentCourse.category} · Course</div>
            <h2>{currentCourse.title}</h2><p className="next-label">UP NEXT · LESSON 17</p><p className="next-title">{currentCourse.nextLesson}</p>
            <button className="primary-button light" onClick={() => openCourse(currentCourse)}><span>▶</span> Continue lesson</button>
          </div>
          <div className="progress-visual"><div className="orb orb-one" /><div className="orb orb-two" /><div className="progress-ring" style={{ background: `conic-gradient(#ffffff ${currentCourse.progress * 3.6}deg, rgba(255,255,255,.16) 0deg)` }}><div><strong>{currentCourse.progress}%</strong><span>complete</span></div></div><p>{currentCourse.completed} of {currentCourse.lessons} lessons</p></div>
        </article>

        <article className="coach-card">
          <div className="coach-heading"><div className="coach-mark">✦</div><div><span>AI STUDY COACH</span><strong>Ask Lumina</strong></div><i>ONLINE</i></div>
          <div className="coach-message"><span className="tiny-ai">✦</span><p>{coachReply}</p></div>
          <div className="coach-prompts"><button onClick={() => setCoachInput("Plan my study session")}>Plan my session</button><button onClick={() => setCoachInput("Quiz me on prototyping")}>Quiz me</button><button onClick={() => setCoachInput("Explain my next lesson")}>Explain a topic</button></div>
          <form className="coach-input" onSubmit={askCoach}><input value={coachInput} onChange={(event) => setCoachInput(event.target.value)} placeholder="Ask anything about your learning..." aria-label="Ask the AI study coach" /><button aria-label="Send question">↑</button></form>
        </article>
      </section>

      <section className="stats-strip">
        <div><span className="stat-icon purple">◷</span><p>LEARNING TIME<strong>24.6 <small>hours</small></strong><em>+18% this month</em></p></div>
        <div><span className="stat-icon green">✓</span><p>LESSONS COMPLETED<strong>87</strong><em>12 this week</em></p></div>
        <div><span className="stat-icon amber">◇</span><p>AVERAGE SCORE<strong>92%</strong><em>Top 8% of learners</em></p></div>
        <div><span className="stat-icon rose">✦</span><p>CERTIFICATES<strong>4</strong><em>1 almost complete</em></p></div>
      </section>

      <section className="content-grid">
        <div className="section-block">
          <div className="section-title-row"><div><span className="eyebrow">YOUR COURSES</span><h2>Continue growing</h2></div><button className="text-button" onClick={() => setActiveNav("learning")}>View all <span>→</span></button></div>
          <div className="course-list compact">{courses.slice(1, 4).map((course) => <CourseCard key={course.id} course={course} openCourse={openCourse} />)}</div>
        </div>
        <aside className="upcoming-card">
          <div className="section-title-row"><div><span className="eyebrow">UP NEXT</span><h2>Your schedule</h2></div><button className="more-button" aria-label="Schedule options">•••</button></div>
          <div className="deadline-list">{deadlines.map((item) => <div className="deadline" key={item.title}><div className={`date-box ${item.tone}`}><span>{item.month}</span><strong>{item.day}</strong></div><div><strong>{item.title}</strong><span>{item.meta}</span></div></div>)}</div>
          <button className="secondary-button full" onClick={() => setActiveNav("calendar")}>Open learning calendar</button>
        </aside>
      </section>
    </div>
  );
}

function CourseCatalog({ courses: filteredCourses, query, openCourse, setQuery }: { courses: Course[]; query: string; openCourse: (course: Course) => void; setQuery: (value: string) => void }) {
  const filters = ["All courses", "Design", "AI & Data", "Development", "Leadership"];
  return (
    <div className="page-wrap catalog-page">
      <section className="catalog-hero"><div><span className="eyebrow">LEARNING LIBRARY</span><h1>Find your next breakthrough.</h1><p>Expert-led courses, practical projects, and an AI coach that adapts the journey to you.</p></div><div className="catalog-orbit"><span>AI</span><i>24k learners growing today</i></div></section>
      <div className="catalog-toolbar"><div className="filter-row">{filters.map((filter) => <button key={filter} className={!query && filter === "All courses" ? "selected" : ""} onClick={() => setQuery(filter === "All courses" ? "" : filter)}>{filter}</button>)}</div><span>{filteredCourses.length} curated courses</span></div>
      {filteredCourses.length ? <div className="course-list catalog-grid">{filteredCourses.map((course) => <CourseCard key={course.id} course={course} openCourse={openCourse} />)}</div> : <div className="empty-state"><span>⌕</span><h2>No courses found</h2><p>Try a broader skill or topic.</p><button className="secondary-button" onClick={() => setQuery("")}>Clear search</button></div>}
    </div>
  );
}

function LearningView({ openCourse }: { openCourse: (course: Course) => void }) {
  return <div className="page-wrap"><section className="page-heading"><div><span className="eyebrow">MY LEARNING</span><h1>Your learning, all in one place.</h1><p>Pick up where you left off and keep building momentum.</p></div><div className="goal-card"><span>WEEKLY GOAL</span><strong>3h 45m <small>/ 5h</small></strong><div className="mini-progress"><span style={{ width: "75%" }} /></div></div></section><div className="learning-summary"><button className="active">In progress <span>3</span></button><button>Saved <span>8</span></button><button>Completed <span>12</span></button></div><div className="course-list learning-grid">{courses.slice(0, 3).map((course) => <CourseCard key={course.id} course={course} openCourse={openCourse} wide />)}</div></div>;
}

function CalendarView() {
  const week = [{ day: "MON", date: 17, mins: 35 }, { day: "TUE", date: 18, mins: 65 }, { day: "WED", date: 19, mins: 42 }, { day: "THU", date: 20, mins: 0 }, { day: "FRI", date: 21, mins: 25 }, { day: "SAT", date: 22, mins: 50 }, { day: "SUN", date: 23, mins: 0 }];
  return (
    <div className="page-wrap">
      <section className="page-heading"><div><span className="eyebrow">LEARNING CALENDAR</span><h1>Make progress feel inevitable.</h1><p>A focused week beats a perfect plan. Your schedule is ready.</p></div><button className="primary-button">+ Add study block</button></section>
      <section className="calendar-card"><div className="calendar-head"><div><button aria-label="Previous week">←</button><h2>August 17–23</h2><button aria-label="Next week">→</button></div><span>Weekly target · 5 hours</span></div><div className="week-grid">{week.map((item) => <div className={item.date === 19 ? "day-column today" : "day-column"} key={item.day}><span>{item.day}</span><strong>{item.date}</strong><div className="activity-track"><i style={{ height: `${Math.max(item.mins, 5)}%` }} /></div><small>{item.mins ? `${item.mins}m` : "Rest"}</small></div>)}</div></section>
      <section className="schedule-section"><div className="section-title-row"><div><span className="eyebrow">UPCOMING</span><h2>Deadlines & sessions</h2></div><span className="timezone">GMT+5:30 · Colombo</span></div><div className="schedule-table">{deadlines.map((item, index) => <div className="schedule-row" key={item.title}><span className={`schedule-dot ${item.tone}`} /><strong>{item.title}</strong><span>{item.meta}</span><span>{index === 0 ? "Tomorrow" : `In ${index * 4 + 4} days`}</span><button>View</button></div>)}</div></section>
    </div>
  );
}

function InstructorDashboard({ showToast }: { showToast: (message: string) => void }) {
  return (
    <div className="page-wrap instructor-page">
      <section className="page-heading instructor-heading"><div><span className="eyebrow">INSTRUCTOR STUDIO</span><h1>Good afternoon, Danu.</h1><p>Your learners completed 186 lessons this week. That’s 14% above your average.</p></div><button className="primary-button" onClick={() => showToast("A new course draft is ready to edit")}>+ Create a course</button></section>
      <section className="instructor-metrics"><Metric label="ACTIVE LEARNERS" value="3,842" change="+12.4%" detail="vs last month" tone="purple" symbol="◎" /><Metric label="COURSE COMPLETION" value="76.8%" change="+4.2%" detail="across all courses" tone="green" symbol="✓" /><Metric label="AVG. QUIZ SCORE" value="88.2%" change="+2.1%" detail="1,294 attempts" tone="amber" symbol="◇" /><Metric label="LEARNER RATING" value="4.91" change="Top 5%" detail="from 924 reviews" tone="rose" symbol="✦" /></section>
      <section className="analytics-grid">
        <article className="chart-card"><div className="section-title-row"><div><span className="eyebrow">ENGAGEMENT</span><h2>Learning activity</h2></div><button className="select-button">Last 7 days⌄</button></div><div className="chart-legend"><span><i className="legend-purple" />Lessons completed</span><span><i className="legend-mint" />Active learners</span></div><div className="bar-chart">{[42, 68, 53, 88, 76, 95, 72].map((height, index) => <div className="bar-group" key={height + index}><div className="bars"><i style={{ height: `${height}%` }} /><b style={{ height: `${Math.max(height - 22, 24)}%` }} /></div><span>{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}</span></div>)}</div></article>
        <article className="insight-card"><span className="ai-label">✦ LUMINA INSIGHT</span><h2>Your learners are on a roll.</h2><p>Completion rates rise 23% when students finish lesson 3 within their first week.</p><div className="insight-stat"><strong>+23%</strong><span>completion lift</span></div><button onClick={() => showToast("Learner nudge scheduled for this afternoon")}>Nudge learners <span>→</span></button></article>
      </section>
      <section className="courses-table-card"><div className="section-title-row"><div><span className="eyebrow">YOUR COURSES</span><h2>Course performance</h2></div><button className="text-button">Manage all <span>→</span></button></div><div className="data-table" role="table" aria-label="Course performance"><div className="table-row table-head" role="row"><span>COURSE</span><span>STATUS</span><span>LEARNERS</span><span>COMPLETION</span><span>RATING</span><span /></div>{courses.slice(0, 3).map((course, index) => <div className="table-row" role="row" key={course.id}><div className="table-course"><span style={{ background: course.softAccent, color: course.accent }}>{course.code}</span><p><strong>{course.title}</strong><small>Updated {index + 2} days ago</small></p></div><span><i className={index === 2 ? "status-dot draft" : "status-dot"} />{index === 2 ? "Draft" : "Published"}</span><span>{course.students}</span><span><strong>{[82, 74, 61][index]}%</strong></span><span>★ {course.rating}</span><button aria-label={`More options for ${course.title}`}>•••</button></div>)}</div></section>
    </div>
  );
}

function Metric({ label, value, change, detail, tone, symbol }: { label: string; value: string; change: string; detail: string; tone: string; symbol: string }) {
  return <article className="metric-card"><span className={`stat-icon ${tone}`}>{symbol}</span><p>{label}<strong>{value}</strong><small><em>{change}</em> {detail}</small></p></article>;
}

function CourseCard({ course, openCourse, wide = false }: { course: Course; openCourse: (course: Course) => void; wide?: boolean }) {
  return (
    <article className={wide ? "course-card wide" : "course-card"}>
      <button className="course-cover" style={{ background: `linear-gradient(145deg, ${course.softAccent}, #ffffff)` }} onClick={() => openCourse(course)} aria-label={`Open ${course.title}`}><span className="cover-grid" /><span className="course-code" style={{ color: course.accent }}>{course.code}</span><span className="course-level">{course.level}</span><span className="cover-orb" style={{ background: course.accent }} /></button>
      <div className="course-card-body"><span className="course-category">{course.category}</span><h3>{course.title}</h3><div className="course-meta"><span>★ {course.rating}</span><span>·</span><span>{course.duration}</span><span>·</span><span>{course.lessons} lessons</span></div>{course.progress > 0 ? <div className="card-progress"><span><i style={{ width: `${course.progress}%`, background: course.accent }} /></span><strong>{course.progress}%</strong></div> : <button className="start-link" onClick={() => openCourse(course)}>Start course →</button>}</div>
    </article>
  );
}

function CoursePlayer({ course, activeLesson, setActiveLesson, lessonDone, setLessonDone, quizAnswer, setQuizAnswer, close, showToast }: { course: Course; activeLesson: number; setActiveLesson: (value: number) => void; lessonDone: boolean; setLessonDone: (value: boolean) => void; quizAnswer: number | null; setQuizAnswer: (value: number | null) => void; close: () => void; showToast: (message: string) => void }) {
  function completeLesson() { setLessonDone(true); showToast("Lesson completed — your progress is updated"); }
  const displayProgress = lessonDone ? Math.min(course.progress + 4, 100) : course.progress;
  return (
    <div className="player-backdrop" role="dialog" aria-modal="true" aria-label={`${course.title} course player`}>
      <div className="course-player">
        <header className="player-header"><button className="player-brand" onClick={close}><span className="brand-mark"><span /></span><strong>Lumina</strong></button><div><span>{course.category}</span><strong>{course.title}</strong></div><div className="player-progress"><span><i style={{ width: `${displayProgress}%` }} /></span><small>{displayProgress}%</small></div><button className="close-player" onClick={close} aria-label="Close course player">×</button></header>
        <div className="player-body">
          <aside className="lesson-sidebar"><div className="module-heading"><span>MODULE 2 OF 4</span><h3>Ideas into experiences</h3></div><div className="lesson-list">{lessonTitles.map((lesson, index) => { const complete = index < 3 || (index === activeLesson && lessonDone); return <button key={lesson} className={activeLesson === index ? "active" : ""} onClick={() => { setActiveLesson(index); setQuizAnswer(null); }}><span className={complete ? "lesson-check complete" : "lesson-check"}>{complete ? "✓" : index + 1}</span><p><strong>{lesson}</strong><small>{8 + index * 2} min {index === 4 ? "· Quiz" : "· Video"}</small></p></button>; })}</div><div className="module-footer"><span>Course progress</span><strong>{displayProgress}%</strong><div className="mini-progress"><span style={{ width: `${displayProgress}%` }} /></div></div></aside>
          <main className="lesson-stage">
            <div className="lesson-breadcrumb">MODULE 2 <span>›</span> LESSON {activeLesson + 1}</div><h1>{lessonTitles[activeLesson]}</h1><p className="lesson-lead">Turn fuzzy ideas into clear, testable experiences through focused prototyping and fast feedback.</p>
            <div className="video-frame" style={{ background: `radial-gradient(circle at 30% 25%, ${course.softAccent}, transparent 35%), linear-gradient(135deg, #171527, #2f2954)` }}><div className="video-lines"><span /><span /><span /></div><button aria-label="Play lesson video">▶</button><div className="video-controls"><span>02:18 / 12:40</span><div><button aria-label="Captions">CC</button><button aria-label="Video settings">⚙</button><button aria-label="Full screen">□</button></div></div></div>
            <div className="lesson-notes"><div><span className="eyebrow">KEY IDEA</span><h2>Prototype the question, not the entire product.</h2><p>A strong prototype isolates the riskiest assumption. Keep the scope intentionally small so feedback stays focused and useful.</p></div><span className="quote-mark">“</span></div>
            <div className="quick-check"><span className="eyebrow">QUICK CHECK</span><h2>What is the primary purpose of an early prototype?</h2><div className="answer-grid">{["Polish the final interface", "Test the riskiest assumption", "Document every requirement"].map((answer, index) => <button key={answer} className={quizAnswer === index ? (index === 1 ? "correct" : "wrong") : ""} onClick={() => setQuizAnswer(index)}><span>{String.fromCharCode(65 + index)}</span>{answer}{quizAnswer === index && <i>{index === 1 ? "✓" : "×"}</i>}</button>)}</div>{quizAnswer !== null && <p className={quizAnswer === 1 ? "quiz-feedback success" : "quiz-feedback"}>{quizAnswer === 1 ? "Exactly — early prototypes reduce uncertainty before the team invests heavily." : "Not quite. Focus on learning quickly by testing the riskiest assumption."}</p>}</div>
            <div className="lesson-actions"><button className="secondary-button" onClick={() => setActiveLesson(Math.max(activeLesson - 1, 0))}>← Previous</button><button className={lessonDone ? "primary-button completed" : "primary-button"} onClick={completeLesson}>{lessonDone ? "✓ Lesson complete" : "Mark complete & continue →"}</button></div>
          </main>
          <aside className="notes-panel"><div className="notes-head"><div><span className="eyebrow">MY NOTES</span><h3>Lesson notes</h3></div><button>•••</button></div><textarea defaultValue="A prototype should answer one specific question. Keep fidelity proportional to what we need to learn." aria-label="Lesson notes" /><div className="ai-note"><span>✦</span><div><strong>AI note helper</strong><p>I found 3 key ideas in this lesson.</p><button onClick={() => showToast("AI summary added to your notes")}>Add summary</button></div></div><small className="saved-state">✓ Saved just now</small></aside>
        </div>
      </div>
    </div>
  );
}
