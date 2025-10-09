// components/ScrollDemo.tsx
"use client";

import { useLayoutEffect, useRef } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollDemo() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Contexto GSAP: limita selectores al root y hace cleanup automático
    const ctx = gsap.context(() => {
      /* -------------------------- 1) Fade-up al aparecer -------------------------- */
      gsap.from(".fade-up-section .fade-up", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".fade-up-section",
          start: "top 80%", // cuando el top de la sección entra al 80% del viewport
          toggleActions: "play none none reverse",
          // markers: true,
        },
      });

      /* --------------- 2) Pin + scrub (timeline de storytelling) ----------------- */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".pin-section",
          start: "top top",
          end: "+=1500", // longitud del "escenario" scrolleable
          scrub: 1, // suaviza el scrub
          pin: true,
          anticipatePin: 1,
          // markers: true,
        },
      });

      tl.from(".card-1", { xPercent: -50, opacity: 0, duration: 1 })
        .from(".card-2", { xPercent: 50, opacity: 0, duration: 1 }, "<0.2")
        .from(".card-3", { yPercent: 40, opacity: 0, duration: 1 }, "<0.2");

      /* ------------------- 3) Parallax suave por elemento ------------------------ */
      // Cada .parallax-y puede tener data-speed (por ejemplo, -20, -30, 15, etc.)
      gsap.utils.toArray<HTMLElement>(".parallax-y").forEach((el) => {
        const speedAttr = el.getAttribute("data-speed");
        const yPct = speedAttr ? parseFloat(speedAttr) : -20; // default -20

        gsap.to(el, {
          yPercent: yPct,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom", // cuando el elemento entra por abajo
            end: "bottom top", // hasta que sale por arriba
            scrub: true,
            // markers: true,
          },
        });
      });

      // Opcional: refrescar cuando las imágenes cargan (evita jumps)
      const onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);

      // Cleanup
      return () => {
        window.removeEventListener("load", onLoad);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root}>
      {/* ===================== Sección 1: Fade-up ===================== */}
      <section className="fade-up-section section">
        <h2 className="fade-up title">Fade-up al entrar</h2>
        <p className="fade-up">
          Cada .fade-up hace un y+40 → y 0 con opacidad y stagger.
        </p>
        <ul>
          <li className="fade-up">Item A</li>
          <li className="fade-up">Item B</li>
          <li className="fade-up">Item C</li>
        </ul>
      </section>

      {/* ================= Sección 2: Pin + Scrub (cards) =============== */}
      <section className="pin-section section">
        <div className="cards">
          <div className="card card-1">Card 1</div>
          <div className="card card-2">Card 2</div>
          <div className="card card-3">Card 3</div>
        </div>
      </section>

      {/* ===================== Sección 3: Parallax ====================== */}
      <section className="parallax-section section">
        {/* data-speed controla qué tanto se mueve (en %) */}
        <div className="parallax-y layer back" data-speed="-30">
          Capa fondo (más movimiento)
        </div>
        <div className="parallax-y layer mid" data-speed="-20">
          Capa media
        </div>
        <div className="parallax-y layer front" data-speed="-10">
          Capa frente (menos movimiento)
        </div>
        <p className="hint">
          Tip: usá <code>data-speed</code> en cada elemento para personalizar la
          intensidad del parallax.
        </p>
      </section>
    </div>
  );
}
