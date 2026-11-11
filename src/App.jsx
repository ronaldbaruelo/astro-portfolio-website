import { useRef, useState } from 'react'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronRight,
  Code2,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Radar,
  Server,
  ShieldCheck,
  Terminal,
  X,
} from 'lucide-react'
import { certifications, profile, projectOverviews, projects, skills } from './data'
import PortfolioChat from './PortfolioChat'

const navItems = ['About', 'Skills', 'Projects', 'Education', 'Contact']
const categories = [
  { value: 'all', label: 'All work' },
  { value: 'security', label: 'Cybersecurity' },
  { value: 'research', label: 'Research' },
  { value: 'data', label: 'Data & ML' },
]
const skillIcons = {
  shield: ShieldCheck,
  server: Server,
  code: Code2,
  book: BookOpen,
}
const iconForProject = { '01': Radar, '02': ShieldCheck, '03': Mail, '04': Code2, '05': Code2, '07': BarChart3 }

function SectionHeading({ number, eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <div className="section-label"><span>{number}</span><span>// {eyebrow}</span></div>
      <div className="section-heading-row">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  )
}

function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="logo" href="#home" onClick={closeMenu} aria-label="Return to home">
          <span className="logo-mark">&lt;<span>{profile.initials}</span>/&gt;</span>
          <span className="logo-text">{profile.initials.toLowerCase()}<span>.sec</span></span>
        </a>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          {navItems.map((label, index) => (
            <a key={label} href={`#${label.toLowerCase()}`} onClick={closeMenu}>
              <span>{String(index + 1).padStart(2, '0')}.</span> {label}
            </a>
          ))}
          {profile.resumeUrl && (
            <a className="nav-resume" href={profile.resumeUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
              Resume <ArrowUpRight size={14} />
            </a>
          )}
        </nav>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen}>
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  )
}

function TerminalPanel() {
  const [matrixPlaying, setMatrixPlaying] = useState(true)
  return (
    <div className="terminal-shell">
      <div className={`matrix-rain ${matrixPlaying ? 'matrix-playing' : 'matrix-paused'}`} aria-hidden="true">
        {Array.from({ length: 26 }, (_, column) => (
          <span key={column} style={{ '--column': column, '--duration': `${3 + (column % 7) * 0.45}s`, '--delay': `${-(column * 1.7)}s` }}>
            {Array.from({ length: 24 }, (_, row) => '01アイウエオカキクケコサシスセソタチツテトナニヌネノ'[ (column * 7 + row * 11) % 28 ]).join('')}
          </span>
        ))}
      </div>
      <div className="terminal-titlebar">
        <div className="terminal-dots"><span /><span /><span /></div>
        <span>ronald@portfolio: ~</span>
        <button className="matrix-toggle" type="button" onClick={() => setMatrixPlaying(playing => !playing)} aria-label={matrixPlaying ? 'Pause Matrix animation' : 'Play Matrix animation'} aria-pressed={matrixPlaying}>{matrixPlaying ? 'Ⅱ Pause' : '▶ Play'}</button>
      </div>
      <div className="terminal-content">
        <div><span className="prompt">➜</span> <span className="terminal-dir">~</span> whoami</div>
        <p className="terminal-output">{profile.name.toLowerCase().replace(/\s+/g, '_')}</p>
        <div><span className="prompt">➜</span> <span className="terminal-dir">~</span> cat focus.txt</div>
        <p className="terminal-output"><span className="terminal-check">[✓]</span> Vulnerability assessment</p>
        <p className="terminal-output"><span className="terminal-check">[✓]</span> Security operations & response</p>
        <p className="terminal-output"><span className="terminal-check">[✓]</span> Windows / Linux environments</p>
        <p className="terminal-output"><span className="terminal-check">[✓]</span> Python, research & ML</p>
        <div className="terminal-last"><span className="prompt">➜</span> <span className="terminal-dir">~</span> <span className="terminal-caret" /></div>
      </div>
      <div className="terminal-bottom"><span className="terminal-live"><i /> SYSTEM ONLINE</span><span>SECURITY • IT • DATA</span></div>
    </div>
  )
}

function Hero() {
  return (
    <section id="home" className="hero section-grid">
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="eyebrow-pill"><span className="pulse-dot" /> OPEN TO IT & CYBERSECURITY OPPORTUNITIES</div>
          <p className="hero-kicker">Hi, I'm <span>{profile.name}</span></p>
          <h1>Securing systems.<br/><span>Solving problems.</span></h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-description">{profile.intro}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">Explore my work <ArrowUpRight size={18} /></a>
            <a className="btn btn-secondary" href="#contact">Get in touch <ArrowRight size={18} /></a>
          </div>
          <div className="hero-location"><MapPin size={16} /> Based in {profile.location} <span className="hero-separator" /> Learning. Building. Improving.</div>
        </div>
        <div className="hero-visual"><div className="terminal-orbit" aria-hidden="true" /><TerminalPanel /></div>
      </div>
      <div className="container stats-bar" aria-label="Portfolio highlights">
        <div><strong>04</strong><span>FEATURED PROJECTS</span></div>
        <div><strong>02</strong><span>SECURITY SCANNERS</span></div>
        <div><strong>IT</strong><span>MASTER'S IN PROGRESS</span></div>
        <div><strong>NZ</strong><span>BASED IN NEW ZEALAND</span></div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="content-section about-section" id="about">
      <div className="container">
        <SectionHeading number="01" eyebrow="INTRODUCTION" title="About me" description="A curious problem solver with a practical approach to technology and security." />
        <div className="about-layout">
          <div className="about-text">
            <p>{profile.about}</p>
            <p>My goal is to grow into an IT or cybersecurity role where I can contribute to reliable systems, clear documentation and continuous improvement.</p>
            <a className="text-link" href="#projects">Take a look at my projects <ArrowUpRight size={17} /></a>
          </div>
          <div className="about-highlights">
            <div><span className="mini-icon"><Radar size={21} /></span><div><strong>Hands-on security labs</strong><p>Scanning, findings, risk ratings and practical mitigations.</p></div></div>
            <div><span className="mini-icon"><Server size={21} /></span><div><strong>Infrastructure knowledge</strong><p>Windows, Ubuntu, virtualisation and cloud fundamentals.</p></div></div>
            <div><span className="mini-icon"><Code2 size={21} /></span><div><strong>Data-driven thinking</strong><p>Python, analysis and machine learning research.</p></div></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="content-section skills-section" id="skills">
      <div className="container">
        <SectionHeading number="02" eyebrow="TOOLKIT" title="Skills & technologies" description="Tools and concepts I've used in my studies, labs and research projects." />
        <div className="skills-grid">
          {skills.map((skill) => {
            const Icon = skillIcons[skill.icon]
            return (
              <article className="skill-card" key={skill.title}>
                <div className="skill-card-top"><span className="skill-icon"><Icon size={23} /></span><ArrowDownRight size={18} className="skill-arrow" /></div>
                <h3>{skill.title}</h3><p>{skill.description}</p>
                <div className="skill-tags">{skill.items.map(item => <span key={item}>{item}</span>)}</div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const Icon = iconForProject[project.id] || Code2
  const dialogRef = useRef(null)
  return (
    <article className={`project-card accent-${project.accent}`}>
      <div className="project-visual">
        <span className="project-no">PROJECT_{project.id}</span>
        <Icon className="project-art-icon" size={48} strokeWidth={1.15} aria-hidden="true" />
        <span className="project-art-label">{project.visual}</span>
        <span className="project-visual-stripe" aria-hidden="true" />
      </div>
      <div className="project-body">
        <div className="project-meta"><span>{project.category}</span><span>{project.id} / {String(projects.length).padStart(2, '0')}</span></div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
        <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
        {project.link ? (
          <a className="project-action" href={project.link} target="_blank" rel="noopener noreferrer">{project.linkLabel || 'View project'} <ExternalLink size={16} /></a>
        ) : (
          <button type="button" className="project-action project-overview-button" onClick={() => dialogRef.current?.showModal()}>Project overview <ChevronRight size={16} /></button>
        )}
      </div>
      <dialog ref={dialogRef} className="project-dialog" aria-labelledby={`project-${project.id}-title`} onClick={event => { if (event.target === event.currentTarget) dialogRef.current?.close() }}>
        <div className="project-dialog-content">
          <div className="project-dialog-top"><span className="education-overline">PROJECT_{project.id} / {project.category.toUpperCase()}</span><button type="button" className="project-dialog-close" aria-label="Close project overview" onClick={() => dialogRef.current?.close()} autoFocus><X size={22} /></button></div>
          <span className="skill-icon"><Icon size={28} /></span>
          <h2 id={`project-${project.id}-title`}>{project.title}</h2>
          <p className="project-dialog-intro">{project.summary}</p>
          <div className="project-tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          {(projectOverviews[project.id] || []).map(section => <section key={section.title}><h3>{section.title}</h3>{section.steps ? <ol>{section.steps.map(step => <li key={step}>{step}</li>)}</ol> : <p>{section.text}</p>}</section>)}
          <div className="project-dialog-actions">
          {project.id === '05' && <a className="btn btn-primary" href="https://recommendation-system-hjgfyy64ysdqtqx6hku4hf.streamlit.app/" target="_blank" rel="noopener noreferrer">Open recommendation app <ExternalLink size={16} /></a>}
          <button type="button" className="btn btn-primary" onClick={() => dialogRef.current?.close()}>Back to projects <ArrowRight size={16} /></button>
          </div>
        </div>
      </dialog>
    </article>
  )
}

function Projects() {
  const [filter, setFilter] = useState('all')
  const visibleProjects = filter === 'all' ? projects : projects.filter(project => project.categoryKey === filter)
  return (
    <section className="content-section projects-section" id="projects">
      <div className="container">
        <SectionHeading number="03" eyebrow="PRACTICAL WORK" title="Featured projects" description="A selection of security, infrastructure, research and data projects from my postgraduate journey." />
        <div className="project-filters" aria-label="Filter projects">
          {categories.map(category => (
            <button type="button" key={category.value} className={filter === category.value ? 'filter-button active' : 'filter-button'} onClick={() => setFilter(category.value)} aria-pressed={filter === category.value}>{category.label}</button>
          ))}
        </div>
        <div className="projects-grid">{visibleProjects.map(project => <ProjectCard project={project} key={project.id} />)}</div>
      </div>
    </section>
  )
}

function Education() {
  return (
    <section className="content-section education-section" id="education">
      <div className="container">
        <SectionHeading number="04" eyebrow="LEARNING" title="Education & certifications" description="Developing practical skills alongside postgraduate study." />
        <div className="education-layout">
          <div className="education-feature"><span className="edu-icon"><GraduationCap size={28} /></span><div><span className="education-overline">CURRENT STUDY</span><h3>Master of Information Technology</h3><strong>Cybersecurity specialisation</strong><p>Postgraduate study • {profile.location}</p><span className="in-progress"><span className="pulse-dot" /> IN PROGRESS</span></div></div>
          <div className="education-feature"><span className="edu-icon"><GraduationCap size={28} /></span><div><span className="education-overline">BACHELOR'S DEGREE</span><h3>Bachelor of Information Technology</h3><strong>Open Polytechnic</strong></div></div>
          <div className="education-feature"><span className="edu-icon"><GraduationCap size={28} /></span><div><span className="education-overline">DIPLOMA</span><h3>Diploma in Cloud Engineering</h3><strong>Yoobee</strong></div></div>
          <div className="certifications-area" id="certifications"><h3>Certifications</h3>{certifications.map(certificate => <article className="education-feature certification-card" key={certificate.title}><span className="edu-icon"><ShieldCheck size={28} /></span><div><span className="education-overline">{certificate.issuer}</span><h3>{certificate.title}</h3>{certificate.certificateUrl && <a className="text-link" href={certificate.certificateUrl} target="_blank" rel="noopener noreferrer">View certificate (PDF) <ExternalLink size={16} /></a>}</div></article>)}</div>
          <div className="education-note"><span className="education-overline">MY APPROACH</span><h3>Learn by doing.</h3><p>From virtual server builds to vulnerability assessments and research reports, I focus on understanding not only how technologies work, but how to explain findings and improve security in practice.</p><div className="edu-bottom"><span>BUILD</span><ChevronRight size={14}/><span>TEST</span><ChevronRight size={14}/><span>ANALYSE</span><ChevronRight size={14}/><span>IMPROVE</span></div></div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  async function copyEmail() {
    if (!profile.email) return
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="container contact-layout">
        <div className="contact-left"><div className="section-label"><span>05</span><span>// LET'S CONNECT</span></div><h2>Let's build something <em>meaningful.</em></h2><p>Interested in my work, have an IT opportunity or want to connect? I'd be happy to hear from you.</p>
          {profile.email ? <a className="btn btn-primary" href={`mailto:${profile.email}`}>Send me an email <Mail size={18}/></a> : <span className="contact-hint">Add your email in <code>src/data.js</code> to enable contact links.</span>}
        </div>
        <div className="contact-right">
          <div className="contact-line"><Mail size={19}/><span>Email</span>{profile.email ? <button type="button" className="contact-value" onClick={copyEmail} aria-label="Copy email">{copied ? 'Copied!' : profile.email} {copied ? <Check size={15}/> : <ArrowUpRight size={15}/>}</button> : <span className="not-set">Not added yet</span>}</div>
          <div className="contact-line"><Github size={19}/><span>GitHub</span>{profile.githubUrl ? <a className="contact-value" href={profile.githubUrl} target="_blank" rel="noreferrer">View profile <ArrowUpRight size={15}/></a> : <span className="not-set">Add your profile URL</span>}</div>
          <div className="contact-line"><Linkedin size={19}/><span>LinkedIn</span>{profile.linkedinUrl ? <a className="contact-value" href={profile.linkedinUrl} target="_blank" rel="noreferrer">Connect with me <ArrowUpRight size={15}/></a> : <span className="not-set">Add your profile URL</span>}</div>
          {profile.resumeUrl && <div className="contact-line"><Download size={19}/><span>Resume</span><a className="contact-value" href={profile.resumeUrl} target="_blank" rel="noreferrer">Download PDF <ArrowUpRight size={15}/></a></div>}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return <footer className="footer"><div className="container footer-inner"><span>© {new Date().getFullYear()} {profile.name}</span><a href="#home" aria-label="Back to top">Back to top ↑</a><span>Designed with React <span className="footer-accent">&lt;/&gt;</span></span></div></footer>
}

export default function App() {
  return (
    <>
      <AppHeader />
      <main><Hero /><About /><Skills /><Projects /><Education /><Contact /></main>
      <Footer />
      <PortfolioChat />
    </>
  )
}
