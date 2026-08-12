import { useEffect, useRef } from 'react';

const CHARACTER_IMG = 'https://plain-apac-prod-public.komododecks.com/202608/12/zDSgcDSPlkNwtlMeKqUo/image.png';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const characterRef = useRef<HTMLImageElement>(null);
  const sideLeftRef = useRef<HTMLDivElement>(null);
  const sideRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const character = characterRef.current;
    const sideLeft = sideLeftRef.current;
    const sideRight = sideRightRef.current;
    if (!hero || !character || !sideLeft || !sideRight) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = () => window.innerWidth <= 820;

    const onAnimEnd = () => character.classList.add('parallax-ready');
    character.addEventListener('animationend', onAnimEnd, { once: true });

    let targetX = 0, targetY = 0, curX = 0, curY = 0, rafId: number | null = null;

    const animateParallax = () => {
      curX += (targetX - curX) * 0.12;
      curY += (targetY - curY) * 0.12;

      character.style.transform = `translate(${curX * 14}px, ${curY * 10}px)`;
      sideLeft.style.transform = `translateY(calc(-50% + ${curY * 4}px)) rotate(180deg)`;
      sideRight.style.transform = `translateY(calc(-50% + ${curY * 4}px))`;

      if (Math.abs(targetX - curX) > 0.001 || Math.abs(targetY - curY) > 0.001) {
        rafId = requestAnimationFrame(animateParallax);
      } else {
        rafId = null;
      }
    };

    const requestParallaxFrame = () => {
      if (!rafId) rafId = requestAnimationFrame(animateParallax);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (reduceMotion || isSmall()) return;
      const rect = hero.getBoundingClientRect();
      targetX = (e.clientX - rect.left) / rect.width - 0.5;
      targetY = (e.clientY - rect.top) / rect.height - 0.5;
      requestParallaxFrame();
    };

    const onMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      requestParallaxFrame();
    };

    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);

    // scrollspy: highlight the matching nav link as each section scrolls into view
    const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.hd-nav a'));
    const sections = navLinks
      .map((a) => document.querySelector(a.getAttribute('href') || ''))
      .filter((el): el is Element => !!el);
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = '#' + entry.target.id;
            navLinks.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === id));
          }
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -60% 0px' }
    );
    sections.forEach((el) => spyObserver.observe(el));

    return () => {
      character.removeEventListener('animationend', onAnimEnd);
      hero.removeEventListener('mousemove', onMouseMove);
      hero.removeEventListener('mouseleave', onMouseLeave);
      spyObserver.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        @font-face {
          font-family: "Victory Striker Sans";
          src: url(data:font/otf;base64,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ADAAMgA1ACAAYgB5ACAAYQBoAHcAZQBwAHIAbwBqAGUAYwB0AC4AIABBAGwAbAAgAHIAaQBnAGgAdABzACAAcgBlAHMAZQByAHYAZQBkAC4AVgBpAGMAdABvAHIAeQAgAFMAdAByAGkAawBlAHIAIABTAGEAbgBzACAARABlAG0AbwBSAGUAZwB1AGwAYQByAFYAZQByAHMAaQBvAG4AIAAxAC4AMAAwADAAOwBQAFkAUgBTADsAVgBpAGMAdABvAHIAeQBTAHQAcgBpAGsAZQByAFMAYQBuAHMARABlAG0AbwAtAFIAZQBnADsAMgAwADIANQA7AEYATAA4ADQAMgBWAGkAYwB0AG8AcgB5ACAAUwB0AHIAaQBrAGUAcgAgAFMAYQBuAHMAIABEAGUAbQBvACAAUgBlAGcAVgBlAHIAcwBpAG8AbgAgADEALgAwADAAMABWAGkAYwB0AG8AcgB5AFMAdAByAGkAawBlAHIAUwBhAG4AcwBEAGUAbQBvAC0AUgBlAGcAVgBpAGMAdABvAHIAeQAgAFMAdAByAGkAawBlAHIAIABpAHMAIABhACAAdAByAGEAZABlAG0AYQByAGsAIABvAGYAIABhAGgAdwBlAHAAcgBvAGoAZQBjAHQALgBhAGgAdwBlAHAAcgBvAGoAZQBjAHQARABpAGQAYQAgAEEAaABsAHUAZABkAGkAbgBDAG8AcAB5AHIAaQBnAGgAdAAgACgAYwApACAAMgAwADIANQAgAGIAeQAgAGEAaAB3AGUAcAByAG8AagBlAGMAdAAuACAAQQBsAGwAIAByAGkAZwBoAHQAcwAgAHIAZQBzAGUAcgB2AGUAZAAuAHcAdwB3AC4AYQBoAHcAZQBwAHIAbwBqAGUAYwB0AC4AYwBvAG0AdwB3AHcALgBhAGgAdwBlAHAAcgBvAGoAZQBjAHQALgBjAG8AbQBQAGUAcgBzAG8AbgBhAGwAIABVAHMAZQAKAFAAbABlAGEAcwBlACAAdgBpAHMAaQB0ACAAdwB3AHcALgBhAGgAdwBlAHAAcgBvAGoAZQBjAHQALgBjAG8AbQAgAHQAbwAgAG8AYgB0AGEAaQBuACAAYQAgAGMAbwBtAG0AZQByAGMAaQBhAGwAIABsAGkAYwBlAG4AcwBlAC4AIAAAAAMAAAAAAAD/nAAyAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAAD/6wAA//D/8P/mAAAAAAAA//D/4f/wAAAAAAAAAAD/8P/w//D/8P/w//AAAAAAAAAAAAAA/+b/zAAAAAAAAAAAAAAAAAAAAAD/8P/w/8z/8P/w//AAAAAAAAAAAAAA/+b/zAAA/70AAAAA/8L/xwAAAAAAAAAAAAAAAAAAAAD/6wAA//D/8P/mAAAAAAAA//D/5v/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAAAAAAAAAAAAAAAD/5v/m/+b/5v/m/+YAAAAAAAAAAAAA/73/zAAAAAAAAAAAAAAAAAAAAAD/8P/w//D/8P/w//D/fv/w/7f/t/+t/7f/sv/XAAAAAAAAAAAAAP/MAAAAAAAAAAAAAAAAAAD/8AAA//D/8P/mAAAAAAAA//D/5v/wAAAAAAAAAAAAAAAA/8cAAAAAAAD/5gAA//D/8P/mAAAAAAAA/+L/5v/w/8IAAAAAAAAAAAAAAAAAAAAAAAD/8AAA//D/8P/mAAAAAAAA//D/5v/wAAAAAAAAAAAAAAAAAAAAAAAAAAD/5gAA//D/8P/mAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/8AAA//D/8P/m/+b/5gAA//D/5v/wAAAAAAAAAAD/8P/r/9z/8P/w//AAAAAAAAAAAAAA/8z/twAA/70AAAAA/73/0QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//AAAAAAAAAAAAAAAAD/8P/w/9H/8P/w//AAAAAAAAAAAAAA/+b/5gAA/70AAAAA/8z/5gAAAAD/8P/w/9H/8P/w//AAAAAAAAAAAAAA/+b/5gAA/70AAAAA/8z/5gAAAAD/5v/m/+H/5v/m/+YAAAAAAAAAAAAA/9z/wgAAAAAAAAAAAAAAAAAAAAD/5v/m/9z/5v/m/+YAAAAAAAAAAAAA/9z/1gAA/70AAAAA/73/zAAAAAD/8P/w//D/8P/w//AAAAAAAAAAAAAA/9z/zAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/vQAA/8z/zP+9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/8IAAAAA/+b/xwAA/+b/5v/cAAAAAAAA/+b/3P/cAAAAAAAAAAAAAAAA/7cAAAAA/+b/twAA/+b/5v/MAAAAAAAA/9z/wv+3AAAAAAAAAAAAAAAAAAAAAAAAAAD/wgAA/+b/5v/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/vQAA/+b/5v/cAAAAAAAAAAAAAAAAAAAAAAAAAAIAFAAOABEAAAAdAB4ABAAgACAABgAjACoABwAtAC8ADwAyAD0AEgBEAEoAHgBNAE8AJQBSAF0AKABhAGEANABlAGYANQBqAGoANwBuAG4AOAB2AHYAOQB7AH0AOgB/AH8APQCGAIgAPgCLAIsAQQCOAI4AQgCQAJEAQwABAA4AhAAYABcAGAAXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaABoAAAAYAAAAAAAZAAEAAgADAAQABQAGAAcAAAAAAAgACQAKAAAAAAALAAwADQAOAA8AEAARABIAEwAUABUAFgAAAAAAAAAAAAAAAAABAAIAAwAEAAUABgAHAAAAAAAIAAkACgAAAAAACwAMAA0ADgAPABAAEQASABMAFAAVABYAAAAAAAAAGAAAAAAAAAAYABUAAAAAAAAAGQAAAAAAAAAZAAAAAAAAAAAAAAAAAAAAGAAAAAAAAAAAABsAGwAbAAAABgAAAAAAAAAAAAAAAAARABgAGAAAAAAAFwAAAAAAFwAAABgAFwABAAUAkQAUAAAAAAAAAAAAFAAAAAAAFAAMABIADAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAATABMAAAAMAAAAAAANAA8AAAABAAAAAAAAAAIAAAAAAAMAAAAAAAAAAAAEAAAABQAAAAYABwAIAAkACgAQAAsAEQAAAAAAAAAUAAAAFAAPAAAAAQAAAAAAAAACAAAAAAADAAAAAAAAAAAABAAAAAUAAAAGAAcACAAJAAoAEAALABEAAAAAAAAADAAAAAAAAAAMAAsAAAAAABQADQAUAAAAFAANABQAFAAAABQAFAAUAAAADAAAABQAFAAAAA4ADgAOAAAAAAAUABQAFAAUAAAAFAAAAAwADAAUABQAEgAUABQAEgAAAAwAEgAAAAAAAAAUAAAAAQAAAAoAVADmAANERkxUABRncmVrACZsYXRuADgABAAAAAD//wAEAAAAAwAGAAkABAAAAAD//wAEAAEABAAHAAoABAAAAAD//wAEAAIABQAIAAsADGFhbHQASmFhbHQAUGFhbHQAVmZyYWMAXGZyYWMAYmZyYWMAaG9yZG4Abm9yZG4AdG9yZG4AenN1cHMAgHN1cHMAhnN1cHMAjAAAAAEAAAAAAAEAAAAAAAEAAAAAAAEAAgAAAAEAAgAAAAEAAgAAAAEAAwAAAAEAAwAAAAEAAwAAAAEAAQAAAAEAAQAAAAEAAQAFAAwAFAAcACQALgABAAAAAQAqAAEAAAABADgABAAAAAEARgAGAAAAAgByAJYAAQAAAAEAsAACAAwAAwB4AHIAcwABAAMAFAAVABYAAgAMAAMAeAByAHMAAQADABQAFQAWAAEALAACAAoAIAACAAYADgB8AAMAEgAVAHsAAwASABcAAQAEAH0AAwASABcAAQACABQAFgADAAEAEgABABwAAAABAAAABAACAAEAEwAcAAAAAQACACQARAADAAEAEgABABwAAAABAAAABAACAAEAEwAcAAAAAQACADIAUgACAA4ABABrAHkAawB5AAEABAAkADIARABSAAAAAAABAAAAAQ==) format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        :root {
          --blue-1:#7fa8f0;
          --blue-2:#4f7fe8;
          --blue-3:#3a63d6;
          --blue-4:#2647a8;
          --ink:#0f1a3d;
          --amber:#ffb43d;
          --white:#f5f8ff;
          --outline:rgba(255,255,255,0.35);
        }

        .hero-drisyant{
          position:relative;
          width:100%;
          height:100vh;
          height:100svh;
          overflow:hidden;
          background:
            radial-gradient(85% 65% at 50% 38%, #a7c6ff 0%, #729aef 30%, #4a71dc 55%, #2c4bb2 78%, #1c3184 100%);
          display:flex;
          flex-direction:column;
          font-family:"Inter", sans-serif;
          color:var(--white);
        }
        .hero-drisyant::before{
          content:"";
          position:absolute;
          inset:0;
          background:radial-gradient(55% 42% at 50% 6%, rgba(255,255,255,0.4), transparent 70%);
          pointer-events:none;
        }
        .hero-drisyant::after{
          content:"";
          position:absolute;
          inset:0;
          box-shadow: inset 0 0 160px rgba(8,16,60,0.45);
          pointer-events:none;
        }

        .hd-nav{
          position:relative;
          z-index:20;
          display:flex;
          justify-content:center;
          gap:56px;
          padding:34px 20px 0;
          opacity:0;
          animation:hdFadeDown .8s cubic-bezier(0.22,1,0.36,1) .9s forwards;
        }
        .hd-nav a{
          color:var(--white);
          text-decoration:none;
          font-size:14px;
          letter-spacing:1.5px;
          font-weight:600;
          position:relative;
          padding-bottom:6px;
          transition:opacity .25s ease;
          cursor:pointer;
        }
        .hd-nav a:hover{opacity:.75;}
        .hd-nav a.active::after{
          content:"";
          position:absolute;
          left:0; right:0; bottom:0;
          height:2px;
          background:var(--amber);
        }

        .hd-bg-text{
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          width:100%;
          text-align:center;
          font-family:"Victory Striker Sans", "Fredoka", sans-serif;
          font-weight:400;
          font-size:clamp(130px, min(30vw, 35vh), 460px);
          line-height:1.5;
          padding:0.3em 0;
          letter-spacing:0;
          color:transparent;
          background:linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.28));
          -webkit-background-clip:text;
          background-clip:text;
          filter:
            drop-shadow(0 2px 0 rgba(255,255,255,0.5))
            drop-shadow(0 14px 18px rgba(15,26,70,0.45))
            drop-shadow(0 1px 0 rgba(120,150,230,0.6));
          z-index:1;
          opacity:0;
          white-space:nowrap;
          animation:hdFadeIn 1.1s cubic-bezier(0.22,1,0.36,1) .3s forwards;
          pointer-events:none;
        }

        .hd-side-text{
          position:absolute;
          top:50%;
          font-family:"Victory Striker Sans", "Fredoka", sans-serif;
          font-weight:400;
          font-size:min(9vw,110px);
          letter-spacing:2px;
          color:transparent;
          -webkit-text-stroke:1px var(--outline);
          writing-mode:vertical-rl;
          z-index:0;
          opacity:0;
          animation:hdFadeIn 1.2s cubic-bezier(0.22,1,0.36,1) .55s forwards;
          user-select:none;
          pointer-events:none;
          transition:transform .5s cubic-bezier(0.22,1,0.36,1);
          will-change:transform;
        }
        .hd-side-text.left{ left:4.5%; transform:translateY(-50%) rotate(180deg); }
        .hd-side-text.right{ right:4.5%; transform:translateY(-50%); }

        .hd-character-wrap{
          position:absolute;
          top:2%;
          left:0; right:0; bottom:0;
          z-index:10;
          display:flex;
          align-items:flex-end;
          justify-content:center;
          pointer-events:none;
          overflow:hidden;
        }
        .hd-character-wrap img{
          height:min(98vh, 1020px);
          max-height:100%;
          width:auto;
          object-fit:contain;
          object-position:bottom;
          filter:drop-shadow(0 18px 14px rgba(8,14,50,0.4));
          opacity:0;
          transform:translateY(40px);
          animation:hdRiseIn 1s cubic-bezier(0.22,1,0.36,1) 1.1s forwards;
        }
        .hd-character-wrap img.parallax-ready{
          transition:transform .5s cubic-bezier(0.22,1,0.36,1);
          will-change:transform;
        }
        .hd-ground-shadow{
          position:absolute;
          bottom:14px;
          left:50%;
          width:min(34vh, 340px);
          height:38px;
          background:radial-gradient(50% 50% at 50% 50%, rgba(6,12,44,0.5), rgba(6,12,44,0) 72%);
          transform:translateX(-50%);
          z-index:9;
          opacity:0;
          animation:hdFadeIn 1s ease 1.3s forwards;
          pointer-events:none;
        }

        .hd-lower{
          position:absolute;
          left:0; right:0; bottom:0;
          z-index:20;
          display:flex;
          justify-content:space-between;
          align-items:flex-end;
          padding:0 clamp(24px,6vw,72px) clamp(28px,5vw,56px);
          gap:24px;
          flex-wrap:wrap;
        }
        .hd-lower-left{
          opacity:0;
          animation:hdFadeUp .9s cubic-bezier(0.22,1,0.36,1) 1.4s forwards;
        }
        .hd-lower-left .hd-greet{
          font-size:14px;
          letter-spacing:2px;
          font-weight:600;
          color:rgba(255,255,255,0.85);
          text-transform:uppercase;
          margin-bottom:12px;
        }
        .hd-lower-left .hd-name{
          font-family:"Victory Striker Sans", "Fredoka", sans-serif;
          font-weight:400;
          font-size:clamp(32px,5vw,52px);
          line-height:1;
          letter-spacing:0.5px;
          border-bottom:2px solid rgba(255,255,255,0.5);
          display:inline-block;
          padding-bottom:8px;
          margin-bottom:10px;
        }
        .hd-lower-left .hd-role{
          font-size:13px;
          letter-spacing:1.5px;
          font-weight:600;
          color:rgba(255,255,255,0.9);
          text-transform:uppercase;
        }

        .hd-lower-right{
          max-width:320px;
          text-align:right;
          opacity:0;
          animation:hdFadeUp .9s cubic-bezier(0.22,1,0.36,1) 1.6s forwards;
        }
        .hd-lower-right p{
          font-size:14.5px;
          line-height:1.6;
          color:rgba(255,255,255,0.92);
          margin-bottom:16px;
        }
        .hd-cta{
          display:inline-flex;
          align-items:center;
          gap:10px;
          padding:12px 22px;
          border:1.5px solid var(--amber);
          border-radius:999px;
          color:var(--white);
          text-decoration:none;
          font-size:13px;
          font-weight:700;
          letter-spacing:1px;
          background:rgba(255,180,61,0.1);
          backdrop-filter:blur(4px);
          transition:all .35s cubic-bezier(0.22,1,0.36,1);
          opacity:0;
          animation:hdFadeUp .9s cubic-bezier(0.22,1,0.36,1) 1.8s forwards;
          cursor:pointer;
        }
        .hd-cta:hover{
          background:var(--amber);
          color:var(--ink);
          border-color:var(--amber);
          transform:translateY(-2px);
          box-shadow:0 10px 30px rgba(255,180,61,0.35);
        }
        .hd-cta:focus-visible, .hd-nav a:focus-visible{
          outline:2px solid var(--amber);
          outline-offset:4px;
          border-radius:4px;
        }
        .hd-cta svg{transition:transform .35s cubic-bezier(0.22,1,0.36,1);}
        .hd-cta:hover svg{transform:translateX(3px);}

        @keyframes hdFadeIn{ to{ opacity:1; } }
        @keyframes hdFadeDown{ from{opacity:0; transform:translateY(-14px);} to{opacity:1; transform:translateY(0);} }
        @keyframes hdFadeUp{ from{opacity:0; transform:translateY(18px);} to{opacity:1; transform:translateY(0);} }
        @keyframes hdRiseIn{ to{opacity:1; transform:translateY(0);} }

        @media (max-width:820px){
          .hd-bg-text{ font-size:26vw; }
          .hd-side-text{ display:none; }
          .hd-character-wrap img{ height:52vh; }
          .hd-lower{ flex-direction:column; align-items:flex-start; gap:28px; }
          .hd-lower-right{ text-align:left; max-width:100%; }
          .hd-nav{ gap:26px; padding-top:24px; }
          .hd-nav a{ font-size:12px; }
        }
        @media (max-width:480px){
          .hd-nav{ gap:16px; }
          .hd-nav a{ font-size:10.5px; letter-spacing:1px; }
          .hd-character-wrap img{ height:44vh; }
          .hd-lower-left .hd-name{ font-size:34px; }
        }

        @media (prefers-reduced-motion: reduce){
          .hero-drisyant *{ animation-duration:0.01ms !important; animation-iteration-count:1 !important; transition-duration:0.01ms !important; }
        }
      `}</style>

      <section id="home" ref={heroRef} className="hero-drisyant">
        <nav className="hd-nav">
          <a href="#home" className="active">HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#services">SERVICES</a>
          <a href="#projects">PROJECTS</a>
        </nav>

        <div className="hd-bg-text">DRISYANT</div>
        <div className="hd-side-text left" ref={sideLeftRef}>CREATIVE</div>
        <div className="hd-side-text right" ref={sideRightRef}>DESIGNER</div>

        <div className="hd-character-wrap">
          <div className="hd-ground-shadow" />
          <img ref={characterRef} src={CHARACTER_IMG} alt="Drisyant character illustration" />
        </div>

        <div className="hd-lower">
          <div className="hd-lower-left">
            <div className="hd-greet">HEY, I'M</div>
            <div className="hd-name">DRISYANT</div>
            <div className="hd-role">VIDEO EDITOR &amp; GRAPHIC DESIGNER</div>
          </div>
          <div className="hd-lower-right">
            <p>I create eye-catching designs, cinematic edits, and powerful visuals that bring ideas to life.</p>
            <a href="#projects" className="hd-cta">VIEW MY WORK
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
