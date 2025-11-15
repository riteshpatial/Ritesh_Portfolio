import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip } from "chart.js";
import "./App.css";

Chart.register(ArcElement, Tooltip);

export default function Portfolio() {
  const homeRef = useRef(null);
  const skillsRef = useRef(null);
  const projectsRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);
  const resumeRef = useRef(null);
  const contactRef = useRef(null);

  const sections = useMemo(
    () => ({
      home: homeRef,
      skills: skillsRef,
      projects: projectsRef,
      experience: experienceRef,
      education: educationRef,
      resume: resumeRef,
      contact: contactRef,
    }),
    []
  );

  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const options = { threshold: 0.3 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.dataset.section);
        }
      });
    }, options);

    Object.values(sections).forEach((ref) => ref.current && observer.observe(ref.current));

    const handleScroll = () => {
      const scrollPos = window.innerHeight + window.scrollY;
      const docHeight = document.body.offsetHeight;
      if (scrollPos >= docHeight - 10) {
        setActive("contact");
        return;
      }

      const offsets = Object.entries(sections).map(([key, ref]) => ({
        key,
        offset: Math.abs(ref.current.getBoundingClientRect().top),
      }));
      const nearest = offsets.reduce((a, b) => (a.offset < b.offset ? a : b));
      setActive(nearest.key);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  const scrollTo = (ref) => {
    setMenuOpen(false);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const card = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

  const projects = [
    {
      id: "blinkit",
      title: "Blinkit Dashboard",
      year: "2025",
      tags: ["Power BI", "Sales", "Delivery"],
      short: "Interactive Power BI dashboard — sales, marketing & delivery insights.",
      long:
        "Blinkit Dashboard: Built interactive dashboards showing order funnels, delivery performance, and marketing KPIs. Enabled stakeholders to identify drop-off points and optimize delivery routes.",
      visualLink:
        "https://app.powerbi.com/view?r=eyJrIjoiYmNlNDczN2MtM2RiNi00NTUzLWExYTktZTlkODdhNWU1OWNmIiwidCI6IjQ5OWE3ZGIxLTkwODUtNGE1My05OTNkLTA0ODMyMmY0YzgxMSJ9&pageName=dbcc4166e1dceb044c44",
      img: process.env.PUBLIC_URL + "/blinkit_dashboard.png",
    },
    {
      id: "hr",
      title: "HR Analytics",
      year: "2024",
      tags: ["Power BI", "Attrition", "Workforce"],
      short: "Attrition & workforce analytics with actionable insights for HR leaders.",
      long:
        "HR Analytics: Created dashboards for attrition drivers, tenure cohorts, and employee lifecycle metrics. Helped HR reduce voluntary attrition by identifying at-risk segments.",
      visualLink:
        "https://app.powerbi.com/view?r=eyJrIjoiZmVlNmFkMmItOWRmMy00MTFjLTk5MjUtM2JmOWM0ZDNiYzVmIiwidCI6IjQ5OWE3ZGIxLTkwODUtNGE1My05OTNkLTA0ODMyMmY0YzgxMSJ9&pageName=5bf04c68966509bcde4b",
      img: process.env.PUBLIC_URL + "/hr_analytics.png",
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [modalMode, setModalMode] = useState("details");

  function openModal(project, mode = "details") {
    setActiveProject(project);
    setModalMode(mode);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setModalOpen(false);
    setActiveProject(null);
    setModalMode("details");
    document.body.style.overflow = "";
  }

  function clickOutsideModal(e) {
    if (e.target.classList && e.target.classList.contains("modal-backdrop")) closeModal();
  }

  return (
    <div className="landing-root">
      {/* NAV */}
      <nav className="nav">
        <div className="brand">Ritesh Patial</div>
        <button
          className={`nav-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((s) => !s)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {Object.entries(sections).map(([key, ref]) => (
            <button key={key} className={active === key ? "active" : ""} onClick={() => scrollTo(ref)}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <header ref={homeRef} data-section="home" className="hero">
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          Ritesh Patial
        </motion.h1>
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          Data Analyst — turning raw data into real insights
        </motion.h2>

        <div className="hero-cta">
          <button onClick={() => scrollTo(projectsRef)} className="btn-secondary">
            View Projects
          </button>
          <a href="#resume" onClick={() => scrollTo(resumeRef)} className="btn-primary">
            View Resume
          </a>
        </div>
      </header>

      <main className="container">
        {/* SKILLS */}
        <section ref={skillsRef} data-section="skills" className="section">
          <motion.h3 variants={card} initial="hidden" whileInView="show" transition={{ duration: 0.6 }}>
            Skills
          </motion.h3>

          <div className="grid skills-grid">
  {[
    { name: "Python", icon: process.env.PUBLIC_URL + "/logos/python.png", level: 92 },
{ name: "SQL", icon: process.env.PUBLIC_URL + "/logos/sql.png", level: 70 },
{ name: "Power BI", icon: process.env.PUBLIC_URL + "/logos/powerbi.png", level: 88 },
{ name: "Excel", icon: process.env.PUBLIC_URL + "/logos/excel.png", level: 86 },
{ name: "EDA", icon: process.env.PUBLIC_URL + "/logos/eda.png", level: 85 },
{ name: "Visualization", icon: process.env.PUBLIC_URL + "/logos/visualization.png", level: 87 },
{ name: "DAX", icon: process.env.PUBLIC_URL + "/logos/dax.png", level: 84 },
{ name: "Pandas", icon: process.env.PUBLIC_URL + "/logos/pandas.png", level: 89 },
{ name: "Data Cleaning", icon: process.env.PUBLIC_URL + "/logos/datacleaning.png", level: 90 },
{ name: "Machine Learning", icon: process.env.PUBLIC_URL + "/logos/machinelearning.png", level: 78 },
  ].map((s, i) => (
    <SkillCardWithChart key={i} {...s} />
  ))}
</div>

        </section>

        {/* PROJECTS */}
        <section ref={projectsRef} data-section="projects" className="section">
          <motion.h3 variants={card} initial="hidden" whileInView="show" transition={{ duration: 0.6 }}>
            Projects
          </motion.h3>
          <div className="projects-grid">
            {projects.map((p) => (
              <motion.article
                key={p.id}
                className="project-card glass"
                whileHover={{ translateY: -6 }}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                <div className="project-thumb-wrapper">
                  <div
                    className="project-thumb"
                    style={{
                      backgroundImage: `url("${p.img}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      borderRadius: "12px",
                      width: "100%",
                      height: "200px",
                    }}
                  >
                    <div className="project-overlay">
                      <h4>{p.title}</h4>
                      <div className="tag-row">
                        {p.tags.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="project-body">
                  <div className="row-between">
                    <h4>{p.title}</h4>
                    <span className="muted">{p.year}</span>
                  </div>
                  <p className="muted small">{p.short}</p>
                  <div className="tag-row">
                    {p.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="card-actions">
                    <button className="btn-secondary" onClick={() => openModal(p, "details")}>
                      View Details
                    </button>
                    <button className="btn-primary" onClick={() => openModal(p, "visual")}>
                      View Visual
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section ref={experienceRef} data-section="experience" className="section">
          <motion.h3 variants={card} initial="hidden" whileInView="show" transition={{ duration: 0.6 }}>
            Courses & Training
          </motion.h3>
          <div className="glass experience-card">
            <strong>Data Analyst Training – Ziion Technology, Mohali, Punjab &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;2025 – Present </strong>
            <ul className="short-list">
              <li>Completed practical training in Data Analytics, covering SQL, Python, Power BI, and Excel.</li>
              <li>Worked on live datasets to perform data cleaning, EDA, and dashboard creation for business insights. </li>
              <li>Built and optimized Power BI dashboards and SQL projects to analyze sales, HR, and customer data.</li>
            </ul>
          </div>
        </section>

        {/* EDUCATION */}
        <section ref={educationRef} data-section="education" className="section">
          <motion.h3 variants={card} initial="hidden" whileInView="show" transition={{ duration: 0.6 }}>
            Education
          </motion.h3>
          <div className="glass education-card">
            <strong>Bachelor of Computer Applications (BCA)</strong>
            <p className="muted">Govt. Degree College Dhaliara — 2022 to 2025</p>
          </div>
        </section>

        {/* RESUME */}
        <section ref={resumeRef} data-section="resume" className="section resume-section">
          <motion.h3 initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            Resume
          </motion.h3>

          <div className="glass resume-container">
            <object
              data={`${process.env.PUBLIC_URL}/Ritesh_Patial_Resume.pdf`}
              type="application/pdf"
              width="100%"
              height="100%"
            >
              <p>
                Your browser can't display the PDF.{" "}
                <a href={`${process.env.PUBLIC_URL}/Ritesh_Patial_Resume.pdf`} target="_blank" rel="noopener noreferrer">
                  Open Resume
                </a>
              </p>
            </object>
          </div>

          <div className="resume-download" style={{ display: "flex", justifyContent: "center", marginTop: "14px" }}>
            <a
              href={`${process.env.PUBLIC_URL}/Ritesh_Patial_Resume.pdf`}
              download="Ritesh_Patial_Resume.pdf"
              className="btn-primary"
            >
              ⬇ Download Resume
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section ref={contactRef} data-section="contact" className="section contact-section">
          <motion.h3 variants={card} initial="hidden" whileInView="show" transition={{ duration: 0.6 }}>
            Contact
          </motion.h3>
          <div className="contact-cards">
            <div className="glass contact-card">
              <strong>Email</strong>
              <a href="mailto:riteshpatial430@gmail.com" className="muted small">
                riteshpatial430@gmail.com
              </a>
            </div>
            <div className="glass contact-card">
              <strong>LinkedIn</strong>
              <a
                href="https://www.linkedin.com/in/ritesh-patial-b183bb349"
                target="_blank"
                rel="noreferrer"
                className="muted small"
              >
                View Profile
              </a>
            </div>
            <div className="glass contact-card">
              <strong>GitHub</strong>
              <a href="https://github.com/riteshpatial" target="_blank" rel="noreferrer" className="muted small">
                Open Repos
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">© {new Date().getFullYear()} Ritesh Patial — Data Analyst</footer>

      {/* MODAL */}
      {modalOpen && activeProject && (
        <div className="modal-backdrop" onMouseDown={clickOutsideModal}>
          <motion.div
            className="modal-card glass"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <button className="modal-close" onClick={closeModal} aria-label="Close modal" style={{ color: "#000" }}>
              ×
            </button>

            {modalMode === "details" && (
              <div className="modal-grid">
                <div className="modal-image-wrap">
                  <img src={activeProject.img} alt={activeProject.title} className="modal-image" />
                </div>

                <div className="modal-body">
                  <h3>{activeProject.title}</h3>
                  <p className="muted small">{activeProject.year}</p>
                  <p style={{ marginTop: 12 }}>{activeProject.long}</p>
                  <div className="tag-row" style={{ marginTop: 12 }}>
                    {activeProject.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: 18, display: "flex", gap: 10 }}>
                    <button className="btn-primary" onClick={() => setModalMode("visual")}>
                      View Visual
                    </button>
                    <button className="btn-secondary" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

            {modalMode === "visual" && (
              <div style={{ minHeight: 420 }}>
                <div
                  style={{
                    height: 480,
                    borderRadius: 10,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <iframe
                    title={`${activeProject.title} Visual`}
                    src={activeProject.visualLink}
                    style={{ width: "100%", height: "100%", border: "none" }}
                    allowFullScreen
                  />
                </div>
                <div style={{ marginTop: 12 }}>
                  <h3 style={{ marginBottom: 6 }}>{activeProject.title}</h3>
                  <p className="muted small">{activeProject.year}</p>
                  <p style={{ marginTop: 8 }}>{activeProject.long}</p>
                  <div className="tag-row" style={{ marginTop: 10 }}>
                    {activeProject.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                    <button className="btn-secondary" onClick={() => setModalMode("details")}>
                      Back
                    </button>
                    <button className="btn-primary" onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

/* === SkillCardWithChart Component === */
function SkillCardWithChart({ name, icon, level = 80 }) {
  const [showChart, setShowChart] = useState(false);

  useEffect(() => {
    let t;
    if (showChart) {
      t = setTimeout(() => setShowChart(false), 2000);
    }
    return () => clearTimeout(t);
  }, [showChart]);

  const data = {
    datasets: [
      {
        data: [level, 100 - level],
        backgroundColor: ["#6366f1", "rgba(255,255,255,0.08)"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  return (
    <motion.div
      className="skill-card glass"
      onClick={() => setShowChart(true)}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 220 }}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      style={{ position: "relative", cursor: "pointer" }}
    >
      <div
  style={{
    width: "46px",
    height: "46px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    overflow: "hidden",
  }}
>
  <img
    src={icon}
    alt={name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "contain",
      objectPosition: "center",
    }}
  />
</div>



      <div className="skill-name">{name}</div>

      {showChart && (
        <motion.div
          className="skill-chart-overlay"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
            background: "rgba(0,0,0,0.45)",
            borderRadius: 12,
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ width: 52, height: 52, position: "relative" }}>
              <Doughnut data={data} options={options} />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                {level}%
              </div>
            </div>

            <div style={{ color: "#fff", textAlign: "left", minWidth: 140 }}>
              <div style={{ fontWeight: 500, marginBottom: 4 }}>{name}</div>
              <div style={{ fontSize: 12, opacity: 0.9 }}>{`Proficiency ${level}%`}</div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
