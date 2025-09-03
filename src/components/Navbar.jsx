// src/components/Navbar.jsx
import { useState } from "react";
import Profileimage from "../assets/profile.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  return (
    <nav className="navbar">
      <a href="#top" className="brand" onClick={close}>
        <img
          src={Profileimage}
          alt="Cristian Salas"
          className="nav-avatar"
          decoding="async"
          loading="lazy"
          width={40}
          height={40}
        />
      </a>

      <button
  type="button"
  className="hamburger"
  onClick={toggle}
  aria-expanded={open}
  aria-controls="primary-navigation"
  aria-label="Toggle menu"
>
  <span></span>
  <span></span>
  <span></span>
</button>

      <ul id="primary-navigation" className={`nav-links ${open ? "show" : ""}`}>
        <li><a href="#about" onClick={close}>About</a></li>
        <li><a href="#projects" onClick={close}>Projects</a></li>
        <li><a href="#contact" onClick={close}>Contact</a></li>
      </ul>
    </nav>
  );
}
