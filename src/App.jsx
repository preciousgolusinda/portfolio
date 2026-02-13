import { useState, useEffect } from "react";
import "./App.css";

/* ICONS */
import {
  SiGmail,
  SiVite,
  SiArduino,
  SiEspressif,
  SiCplusplus,
  SiMysql
} from "react-icons/si";

import {
  FaPhoneAlt,
  FaFacebookF,
  FaInstagram,
  FaReact,
  FaJsSquare,
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaGithub,
  FaJava
} from "react-icons/fa";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  const [currentProject, setCurrentProject] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectOpen, setProjectOpen] = useState(false);
  const [paused, setPaused] = useState(false);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [aboutOpen, setAboutOpen] = useState(false);

  const projects = [
    {
      title:
        "Waste to Worth: An IoT-Enabled Reverse Vending Machine for Plastic Bottles and Tin Cans",
      desc:
        "An ESP32-powered reverse vending machine that detects, sorts, and monitors recyclable materials while rewarding users through an IoT-based credit system.",
      images: [
        "/portfolio/projects/698ff452-b845-4322-a693-60530829bb09.jpg"
,
        "/portfolio/projects/e45e922c-5dcb-4eb7-b2ec-e4c2982b8ee7.jpg",
        "/portfolio/projects/app.jpg",
        "/portfolio/projects/4d5961be-5c3a-41fa-9d31-227a0feb19a7.jpg",
        "/portfolio/projects/16c01b88-e2ef-450a-9b53-7064f4385e2f.jpg",
        "/portfolio/projects/6a2805f9-f292-45e2-a62f-dacc929cf80f.jpg",
        "/portfolio/projects/6d062eb5-3ff9-45a8-bd36-14e44e996a78.jpg",
        "/portfolio/projects/79d9bee3-42a8-4acb-b20c-2020187be89c.jpg",
        "/portfolio/projects//3428099f-9242-4de9-a485-f1c344e27f3b.jpg",
        "/portfolio/projects/7477cbd8-1840-4834-b30a-075f0d649aa1.jpg"
      ],
      functions: [
        "Detects items using proximity sensors",
        "Identifies tin cans via inductive proximity and Hall sensors",
        "Automatically separates plastic bottles and tin cans",
        "Monitors bin levels using ultrasonic sensors",
        "Displays system status and credits on an LCD",
        "Uploads data to an IoT dashboard"
      ]
    },
    {
      title: "Digital Logic-Based Access Control System",
      desc:
        "A secure access control system implemented using digital logic gates and combinational circuits, complete with schematic diagrams used for logic design and verification.",
      images: [
        "/portfolio/projects/0606f1e2-5446-4e3c-b448-eefb16314f1a.jpg"
      ],
      functions: [
        "Uses AND, OR, NOT, XOR gates",
        "Truth-table-based input validation",
        "Allows access only for valid combinations",
        "LED indicators for access status"
      ]
    },
    {
      title: "Robotic Arm",
      desc:
        "An Arduino-controlled robotic arm designed for basic pick-and-place operations.",
      images: [
        "/portfolio/projects/c97d2099-71f7-40ba-9ea2-ab22eadd5730.jpg",
        "/portfolio/projects/4928c9d9-4cb2-4a39-b2fc-a9ad0077edd5.jpg",
        "/portfolio/projects/80ce7085-8079-4956-b7ca-f309af90d0fa.jpg"
      ],
      functions: [
        "Controls multiple servo motors",
        "Executes pick-and-place movements",
        "Smooth and precise motion control"
      ]
    },
    {
      title: "Solar Auto Irrigation System",
      desc:
        "A solar-powered irrigation system that automatically waters plants based on soil moisture levels.",
      images: [
        "/portfolio/projects/a070ad4b-9482-4433-aa54-185ef37c1b01.jpg",
        "/portfolio/projects/1c95df68-b0dc-4cad-9545-9ade206d2025.jpg",
        "/portfolio/projects/2bb8b1d0-7400-4d99-acd2-89b425e231b2.jpg",
        "/portfolio/projects/5b59a24d-dcfe-4738-9886-0185176182ef.jpg",
        "/portfolio/projects/04053a94-cacf-4bf8-b140-3cfc17426483.jpg",
        "/portfolio/projects/9989de2d-8a4d-4476-ada5-e27f467a7448.jpg"
      ],
      functions: [
        "Monitors soil moisture",
        "Automatically activates water pump",
        "Powered by renewable solar energy",
        "Reduces water consumption"
      ]
    }
  ];

  /* AUTO ROTATE PROJECT SELECTOR */
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentProject((prev) =>
        prev === projects.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [paused, projects.length]);

  /* AUTO ROTATE PROJECT IMAGES */
  useEffect(() => {
    if (!projectOpen || !selectedProject?.images?.length) return;

    const interval = setInterval(() => {
      setActiveImgIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [projectOpen, selectedProject]);

  /* SCROLL SPY */
 useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (scrollY >= top && scrollY < top + height) {
          setActive(id);
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="header">
        <nav className="nav">
          <div className="logo">
            Precious <span>Golusinda</span>
          </div>

          <ul className={`nav-menu ${menuOpen ? "open" : ""}`}>
            {["home", "about", "skills", "education", "projects", "contact"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className={active === item ? "active" : ""}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              )
            )}
          </ul>

          <div
            className={`hamburger ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </div>
        </nav>
      </header>

      <div className="container">
        {/* HOME SECTION*/}
        <section className="home" id="home">
          <div className="home-content">
            <h1>
              <span className="greeting">Hi, it’s</span>
              <span className="typing">Precious Ann</span>
            </h1>
            <p className="subtitle">Computer Engineering</p>
            <p className="description">
              I build modern web applications, embedded systems, and IoT-based
              engineering solutions that integrate hardware and software.
            </p>
          </div>

          <div className="home-image">
            <img
              src="/portfolio/projects/dcffb35d-0631-4e20-af2f-f701c7f6531a.jpg"
              alt="Precious Ann"
            />
          </div>
        </section>

        {/* ABOUT SECTION*/}
        <section
          className="section about-section"
          id="about"
          onClick={() => setAboutOpen(!aboutOpen)}
        >
          <div className={`about-card ${aboutOpen ? "active" : ""}`}>
            <div className="about-front">
              <h2>About Me</h2>
              <p className="about-hint">Click to read</p>
            </div>

            <div className="about-back">
              <h2>About Me</h2>
              <p>
                I am a Computer Engineer with a strong focus on software
                development, embedded systems, and IoT-based solutions. I
                specialize in building technology-driven projects that seamlessly
                integrate hardware and software.
              </p>
              <p>
                I have hands-on experience working with microcontrollers, sensors, and
                automation systems, as well as developing modern web applications using
                contemporary frameworks and tools. I am passionate about continuous
                learning, problem-solving, and creating innovative engineering solutions
                that address real-world challenges.
              </p>
              <p className="about-hint">Click to go back</p>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION*/}
        <section className="section" id="skills">
          <h2>Skills</h2>
          <ul className="skills">
            <li><FaReact className="icon react" /> React</li>
            <li><SiVite className="icon vite" /> Vite</li>
            <li><FaJsSquare className="icon js" /> JavaScript</li>
            <li><FaHtml5 className="icon html" /> HTML</li>
            <li><FaCss3Alt className="icon css" /> CSS</li>
            <li><FaNodeJs className="icon node" /> Node.js</li>
            <li><SiMysql className="icon mysql" /> MySQL</li>
            <li><SiCplusplus className="icon cpp" /> C++</li>
            <li><FaJava className="icon java" /> Java</li>
            <li><SiEspressif className="icon esp" /> ESP32</li>
            <li><SiArduino className="icon arduino" /> Arduino</li>
            <li><FaGithub className="icon github" /> GitHub</li>
          </ul>
        </section>

        {/* EDUCATION SECTION*/} 
        <section className="section" id="education"> 
          <h2>Education</h2> 
            <div className="edu-college"> 
              <h3>BS Computer Engineering</h3> 
                <p>STI College Davao</p> 
                <p>2022 – 2026</p> 
                <h3>Certificate</h3> 
                  <p>Computer Systems Servicing NC II</p> 
            </div> 
        </section>

        {/* PROJECTS SECTION*/}
        <section className="section" id="projects">
          <h2>Projects</h2>

          <div
            className="project-rotate-wrapper"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="rotate-window">
              {projects.map((project, index) => {
                const offset = index - currentProject;

                return (
                  <div
                  key={index}
                  className={`rotate-card coverflow ${
                    index === currentProject ? "active" : ""
                  }`}
                  style={{
                    transform: `
                      translateX(${offset * 220}px)
                      scale(${index === currentProject ? 1 : 0.85})
                    `,
                    opacity: Math.abs(offset) > 2 ? 0 : 1,
                    zIndex: 10 - Math.abs(offset)
                  }}
                  onClick={() => {
                    if (index === currentProject) {
                      setSelectedProject(project);
                      setActiveImgIndex(0);
                      setProjectOpen(true);
                    } else {
                      setCurrentProject(index);
                    }
                  }}
                >
                  {/* IMAGE */}
                  <div className="project-thumb">
                    <img src={project.images[0]} alt={project.title} />
                  </div>

                  {/* TITLE */}
                  <h3>{project.title}</h3>

                  <p className="click-hint">
                    {index === currentProject ? "Click to view details" : "Click to focus"}
                  </p>
                </div>

                );
              })}
            </div>


          </div>
        </section>

        {/* PROJECT MODAL */}
        {projectOpen && selectedProject && (
          <div
            className="project-modal"
            onClick={() => setProjectOpen(false)}
          >
            <div
              className="project-pane"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-btn"
                onClick={() => setProjectOpen(false)}
              >
                ✕
              </button>

              <h2>{selectedProject.title}</h2>

              <div className="project-image-box">
  {/* LEFT CLICK ZONE */}
  <div
    className="image-click left"
    onClick={() =>
      setActiveImgIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      )
    }
  />

  {/* LEFT (FADED) IMAGE */}
  {selectedProject.images.length > 1 && (
    <img
      src={
        selectedProject.images[
          activeImgIndex === 0
            ? selectedProject.images.length - 1
            : activeImgIndex - 1
        ]
      }
      className="side"
      alt="Previous"
    />
  )}

  {/* CENTER (ACTIVE) IMAGE */}
  <img
    src={selectedProject.images[activeImgIndex]}
    className="active"
    alt="Project"
  />

  {/* RIGHT (FADED) IMAGE */}
  {selectedProject.images.length > 1 && (
    <img
      src={
        selectedProject.images[
          activeImgIndex === selectedProject.images.length - 1
            ? 0
            : activeImgIndex + 1
        ]
      }
      className="side"
      alt="Next"
    />
  )}

  {/* RIGHT CLICK ZONE */}
  <div
    className="image-click right"
    onClick={() =>
      setActiveImgIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      )
    }
  />
</div>



              <p className="project-desc">{selectedProject.desc}</p>

              <ul className="project-functions">
                {selectedProject.functions.map((func, i) => (
                  <li key={i}>• {func}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* CONTACT SECTION*/}
        <section className="section" id="contact">
          <h2>Contact</h2>

          <div className="contact-card">
            <div className="contact-item">
              <SiGmail className="contact-icon gmail" />
              <a href="mailto:preciousgolusinda@gmail.com">
                preciousgolusinda@gmail.com
              </a>
            </div>

            <div className="contact-item">
              <FaPhoneAlt className="contact-icon phone" />
              <a href="tel:+639854285083">
                +63 985 428 5083
              </a>
            </div>

            <div className="contact-item">
              <FaFacebookF className="contact-icon facebook" />
              <a
                href="https://facebook.com/preciousgolusinda"
                target="_blank"
                rel="noopener noreferrer"
              >
                Precious Golusinda
              </a>
            </div>

            <div className="contact-item">
              <FaInstagram className="contact-icon instagram" />
              <a
                href="https://instagram.com/preciousann_18"
                target="_blank"
                rel="noopener noreferrer"
              >
                Precious Golusinda
              </a>
            </div>
          </div>
        </section>

        <footer className="footer">
          © {new Date().getFullYear()} Precious Ann Golusinda
        </footer>
      </div>
    </>
  );
}

export default App;
