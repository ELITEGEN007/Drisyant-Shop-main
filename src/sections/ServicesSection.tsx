import FadeIn from '../components/FadeIn';

interface Service {
  number: string;
  name: string;
  description: string;
}

const SERVICES: Service[] = [
  {
    number: '01',
    name: 'VIDEO EDITING',
    description:
      'Creating cinematic, engaging videos for YouTube, brands, and social media with seamless cuts, smooth transitions, professional color grading, and impactful storytelling.',
  },
  {
    number: '02',
    name: '3D ART',
    description:
      'Designing high-quality 3D characters, products, and environments with realistic lighting, detailed textures, and premium renders for digital experiences.',
  },
  {
    number: '03',
    name: 'THUMBNAIL DESIGN',
    description:
      'Creating bold, click-worthy thumbnails that grab attention, increase CTR, and help creators grow with visually striking and professional designs.',
  },
  {
    number: '04',
    name: 'MOTION GRAPHICS',
    description:
      'Producing smooth animations, logo reveals, visual effects, and motion graphics that bring creativity, energy, and style to every project.',
  },
  {
    number: '05',
    name: 'CREATIVE DIRECTION',
    description:
      'Helping creators and brands develop premium visual content with consistent design, strong storytelling, and a unique creative identity across platforms.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="price"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32"
    >
      <FadeIn delay={0} y={30}>
        <h2
          className="text-[#0C0C0C] font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Services
        </h2>
      </FadeIn>

      <div className="max-w-5xl mx-auto">
        {SERVICES.map((service, i) => (
          <FadeIn key={service.number} delay={i * 0.1} y={30}>
            <div
              className="flex items-start gap-6 md:gap-10 py-8 sm:py-10 md:py-12"
              style={{
                borderBottom:
                  i < SERVICES.length - 1 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none',
                borderTop: i === 0 ? '1px solid rgba(12, 12, 12, 0.15)' : 'none',
              }}
            >
              <span
                className="text-[#0C0C0C] font-black leading-none flex-shrink-0"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
              >
                {service.number}
              </span>
              <div className="flex flex-col gap-3 md:gap-4 justify-center">
                <h3
                  className="text-[#0C0C0C] font-medium uppercase"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="text-[#0C0C0C] font-light leading-relaxed max-w-2xl"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', opacity: 0.6 }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
