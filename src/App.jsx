import './App.css'
import { useMemo, useState } from 'react';
import Profileimage from './assets/profile.png'
import Xologlyph from './assets/glyph-xolo.svg'
import Navbar from './components/Navbar'
import Typewriter from './components/Typewriter'
import { projects } from './data/projects'

function TechChips({ items = [] }) {
  return (
    <div className="tech-chips">
      {items.map((t) => (<span key={t} className="chip">{t}</span>))}
    </div>
  );
}

function ProjectCard({ p }) {
  return (
    <article className="project-card" id={p.id}>
      <div className="project-card-inner">
        <header className="project-header">
          <h3>{p.title}</h3>
          <small className="muted">{p.period}</small>
        </header>
        <p className="project-summary">{p.summary}</p>
        <TechChips items={p.tech} />
        <div className="project-links">
          {p.links.demo && <a className="btn" href={p.links.demo} target="_blank" rel="noreferrer"><i className="fa-solid fa-arrow-up-right-from-square"></i> Live</a>}
          {p.links.repo && <a className="btn ghost" href={p.links.repo} target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i> Code</a>}
        </div>
      </div>
    </article>
  );
}

function App() {
  const [activeCat, setActiveCat] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(["All"]);
    projects.forEach(p => set.add(p.category || "Other"));
    return Array.from(set);
  }, []);

  const filtered = useMemo(
    () =>
      activeCat === "All"
        ? projects
        : projects.filter((p) => p.category === activeCat),
    [activeCat]
  );
  return (
    <>
      <Navbar />

      <header className="hero">
        <div className="hero-content">
          <img src={Profileimage} alt="Cristian Salas profile" className="profile-pic" />
          <div>
            <h1>Hi, I'm Cristian</h1>
            <p className="tagline">
              <Typewriter text=" Creative Problem Solver in Motion" speed={36} />
            </p>
          </div>
        </div>
      </header>

      <main>
        <section id="about" className="about">
          <h2>About Me</h2>
          <p>
  Hi! I’m Cristian — a small business manager, educator, spreadsheet enthusiast, and parkour coach.<br/>
  I believe in clear systems, creative movement, and collaborative learning.<br/><br/>
  If you're building something cool or need someone who thrives in motion — let's connect.<br/><br/>
  <a className="cta-link" href="#contact">Reach out →</a>
</p>
        </section>

        <div className="section-divider">
  <img src={Xologlyph} alt="Xolo divider" />
</div>

<section id="testimonial">
  <h2>Testimonials</h2>
  <div className="testimonial">
    <p>"Thanks to Cristian’s spreadsheets, my feeding schedule is on point, my crate training is smooth, and my recall game is strong. 10/10 would boop again."</p>
    <cite>— Cali, the Xoloitzcuintli</cite>
  </div>
  <div className="testimonial">
    <p>“I’m still not exactly sure what Cristian does, but people seem to like it — and he hasn’t broken anything yet!”</p>
    <cite>— My Grandma</cite>
  </div>
</section>


        <div className="section-divider">
          <img src={Xologlyph} alt="Xolo glyph divider" />
        </div>

        <section id="projects" className="projects">
  <h2>Projects</h2>

  <div className="filter-row">
    {categories.map(cat => (
      <button
        key={cat}
        type="button"
        className={`chip ${activeCat === cat ? "chip-active" : ""}`}
        onClick={() => setActiveCat(cat)}
      >
        {cat}
      </button>
    ))}
  </div>

  <div className="project-grid">
    {filtered.map((p) => <ProjectCard key={p.id} p={p} />)}
  </div>
</section>

        <div className="section-divider">
          <img src={Xologlyph} alt="Xolo glyph divider" />
        </div>

        <section id="contact" className="contact">
          <h2>Contact</h2>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="field-row">
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <textarea name="message" placeholder="Your message" rows="5" required></textarea>
            <button className="btn" type="submit">Send</button>
          </form>
        </section>
      </main>

      <footer>
        <a href="https://github.com/overender" target="_blank" rel="noreferrer"><i className="fab fa-github"></i></a>
        <a href="https://www.linkedin.com/in/cristiansalas9/" target="_blank" rel="noreferrer"><i className="fab fa-linkedin"></i></a>
        <p>© Cristian Salas 2025</p>
      </footer>
    </>
  )
}

export default App
