import weatherThumb from '../assets/projects/weather-app.png';
import ecomThumb from '../assets/projects/ecom.png';
import bookstoreThumb from '../assets/projects/bookstore.png';
import neckeaseThumb from '../assets/projects/neckease.png';

export const projects = [
  {
    id: "weather-app",
    title: "Weather App",
    period: "2025",
    summary: "Responsive weather dashboard with geolocation, search, and 5-day forecast.",
    tech: ["JavaScript", "React", "Vite", "OpenWeather API"],
    category: "Frontend",
    links: {
      demo: "https://your-username.github.io/weather-app/",
      repo: "https://github.com/your-username/weather-app"
    },
    thumb: weatherThumb
  },
  {
    id: "ecom-store",
    title: "E-commerce Store",
    period: "2025",
    summary: "Full-stack e-commerce with product catalog, cart, and admin panel. (In progress).",
    tech: ["React", "Node/Express", "MongoDB", "Cloudinary"],
    category: "Full Stack",
    links: {
      demo: null,
      repo: "https://github.com/your-username/ecom-store"
    },
    thumb: ecomThumb
  },
  {
    id: "dom-bookstore",
    title: "DOM Bookstore",
    period: "2025",
    summary: "Book catalog with GET/POST/DELETE, form handling, and local fallback for API outages.",
    tech: ["HTML", "CSS (Tailwind)", "JavaScript"],
    category: "Frontend",
    links: {
      demo: "https://your-username.github.io/dom-bookstore/",
      repo: "https://github.com/your-username/dom-bookstore"
    },
    thumb: bookstoreThumb
  },
  {
    id: "neckease-deck",
    title: "NeckEase – Pitch Deck",
    period: "2025",
    summary: "Slide deck for a salon neck support concept: problem framing, user research, and GTM.",
    tech: ["Slides", "Storytelling"],
    category: "Presentation",
    links: {
      demo: "https://docs.google.com/presentation/d/your-id/view",
      repo: null
    },
    thumb: neckeaseThumb
  }
];
