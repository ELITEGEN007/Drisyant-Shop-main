import { useEffect, useRef, useState } from 'react';

const ALL_IMAGES = [
  'https://plain-apac-prod-public.komododecks.com/202606/04/bvLmQNVtBl0pgmm2H6uV/image.png',
  'https://plain-apac-prod-public.komododecks.com/202607/31/qQyXMHyuKydNmA5jUgaU/image.jpg',
  'https://i.pinimg.com/736x/18/53/17/185317e70390054da58de0a05c8d3bcd.jpg',
  'https://plain-apac-prod-public.komododecks.com/202607/31/T5rL7G7Qcg2D3aeEMwit/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202607/31/6ZqUr14k8U9TkhoZCEkM/image.jpg',
  'https://i.pinimg.com/736x/15/82/e9/1582e9dc9548a15dad4765d09e64216c.jpg',
  'https://plain-apac-prod-public.komododecks.com/202606/04/YyickQet3U4mjitNEY2C/image.png',
  'https://i.pinimg.com/1200x/3e/d8/f9/3ed8f9a3c934f4b45b53a19c0de1fab3.jpg',
  'https://plain-apac-prod-public.komododecks.com/202607/31/T5rL7G7Qcg2D3aeEMwit/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202607/31/nmKF5TVLK6nlUZOCt5Ae/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202607/31/T5rL7G7Qcg2D3aeEMwit/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202607/31/nmKF5TVLK6nlUZOCt5Ae/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202607/31/bH0E1QZNQ7xnfTcuxwAS/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202607/31/u1i0RuAwEuPvpQ3JrXP4/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202607/31/QLpGhLkUSpdQS8vMXGhn/image.jpg',
  'https://i.pinimg.com/1200x/c9/7a/4f/c97a4f5d5a588db24e1bed182ef622be.jpg',
  'https://i.pinimg.com/1200x/60/f2/e7/60f2e79a01939670f3be83825443796a.jpg',
  'https://plain-apac-prod-public.komododecks.com/202607/31/bH0E1QZNQ7xnfTcuxwAS/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202607/31/7g5ED6gHwkEYBl7ZdYKu/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202607/31/QLpGhLkUSpdQS8vMXGhn/image.jpg',
  'https://plain-apac-prod-public.komododecks.com/202607/31/4jk7cduUWqilARcGsA7L/image.jpg',
];

const ROW1_IMAGES = ALL_IMAGES.slice(0, 11);
const ROW2_IMAGES = ALL_IMAGES.slice(11, 21);

function tripled(images: string[]) {
  return [...images, ...images, ...images];
}

function Tile({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="rounded-2xl object-cover flex-shrink-0"
      style={{ width: 420, height: 270 }}
    />
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      const next = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(next);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Images = tripled(ROW1_IMAGES);
  const row2Images = tripled(ROW2_IMAGES);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden"
    >
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${offset - 200}px)`,
            willChange: 'transform',
          }}
        >
          {row1Images.map((src, i) => (
            <Tile key={`row1-${i}`} src={src} alt={`Featured project preview ${(i % ROW1_IMAGES.length) + 1}`} />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{
            transform: `translateX(${-(offset - 200)}px)`,
            willChange: 'transform',
          }}
        >
          {row2Images.map((src, i) => (
            <Tile key={`row2-${i}`} src={src} alt={`Featured project preview ${(i % ROW2_IMAGES.length) + 12}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
