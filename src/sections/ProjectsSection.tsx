import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';

type Media = { type: 'video'; src: string } | { type: 'image'; src: string } | { type: 'empty' };

interface Project {
  number: string;
  category: 'Client' | 'Personal';
  name: string;
  col1Media1: Media;
  col1Media2: Media;
  col2Media: Media;
}

// Media pulled from the old drisyant.shop site (Portfolio + Videos & Thumbnails
// sections) -- a mix of real videos and real thumbnail images this time.
// A couple of slots are left empty on purpose so more thumbnails can be
// dropped in later.
const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'Client',
    name: 'Nextlevel Studio',
    col1Media1: {
      type: 'video',
      src: 'https://v1.pinimg.com/videos/mc/720p/26/db/d0/26dbd0f003c30e9ad9cf2affbe3002b3.mp4',
    },
    col1Media2: {
      type: 'video',
      src: 'https://v1.pinimg.com/videos/iht/expMp4/7e/a8/07/7ea807adb262314a1ad95c13ad49061e_720w.mp4',
    },
    col2Media: {
      type: 'video',
      src: 'https://v1.pinimg.com/videos/iht/expMp4/56/a7/35/56a73501ff230f8420746943527dac05_720w.mp4',
    },
  },
  {
    number: '02',
    category: 'Personal',
    name: 'Aura Brand Identity',
    col1Media1: {
      type: 'video',
      src: 'https://v1.pinimg.com/videos/iht/720p/2d/ef/15/2def1539168b11645445d9991bf629a5.mp4',
    },
    col1Media2: {
      type: 'video',
      src: 'https://v1.pinimg.com/videos/iht/expMp4/61/c5/ec/61c5ecea03897c3d709bfaa65589fc6e_720w.mp4',
    },
    col2Media: {
      type: 'video',
      src: 'https://v1.pinimg.com/videos/iht/expMp4/94/b9/25/94b925b09806f7e11364869cfbcfb382_720w.mp4',
    },
  },
{
  number: '03',
  category: 'Client',
  name: 'Solaris Digital',
  col1Media1: {
    type: 'video',
    src: 'https://v1.pinimg.com/videos/iht/expMp4/6e/ef/50/6eef50a59ec73278455226d9dc86bcd9_720w.mp4',
  },
  col1Media2: {
    type: 'video',
    src: 'https://v1.pinimg.com/videos/iht/expMp4/53/65/e2/5365e289aff6d70d97942f17376b54ca_720w.mp4',
  },
  col2Media: {
    type: 'video',
    src: 'https://v1.pinimg.com/videos/iht/expMp4/ca/5a/77/ca5a771fde35c9a29ce7602b450f6d78_720w.mp4',
  },
  },
];

function MediaTile({
  media,
  className,
  style,
  alt,
}: {
  media: Media;
  className: string;
  style?: React.CSSProperties;
  alt: string;
}) {
  if (media.type === 'video') {
    return (
      <video
        src={media.src}
        className={className}
        style={style}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    );
  }
  if (media.type === 'image') {
    return <img src={media.src} alt={alt} loading="lazy" className={className} style={style} />;
  }
  // empty thumbnail slot -- left blank on purpose, drop a thumbnail in later
  return (
    <div
      className={`${className} border border-dashed border-[#D7E2EA]/20`}
      style={style}
    />
  );
}

function ProjectCard({
  project,
  index,
  progress,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
}) {
  const totalCards = PROJECTS.length;
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(progress, [index * (1 / totalCards), 1], [1, targetScale]);

  return (
    <div
  className="sticky top-16 md:top-20 h-[74vh] flex items-start"
  style={{ marginTop: `${index * 40}px` }}
>
      <motion.div
  style={{ scale }}
  className="relative w-full rounded-[44px] border-2 border-[#D7E2EA] bg-[#0C0C0C] px-6 pt-6 pb-5 md:px-8 md:pt-8 md:pb-6 origin-top"
>
        {/* Top row */}
        <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-6 md:mb-8">
          <span
            className="text-[#D7E2EA] font-black leading-none"
            style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
          >
            {project.number}
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-[#D7E2EA] uppercase tracking-widest text-xs sm:text-sm opacity-60 font-light">
              {project.category}
            </span>
            <span className="text-[#D7E2EA] uppercase font-medium text-lg sm:text-2xl md:text-3xl">
              {project.name}
            </span>
          </div>
          <div className="ml-auto">
            <LiveProjectButton />
          </div>
        </div>

{/* Bottom row */}
<div className="grid grid-cols-[0.75fr_0.75fr_2fr] gap-5 w-full">

  {/* Left 3:4 */}
  <div className="aspect-[3/4] overflow-hidden rounded-[32px] bg-black">
    <MediaTile
      media={project.col1Media1}
      alt={`${project.name} preview 1`}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Middle 3:4 */}
  <div className="aspect-[3/4] overflow-hidden rounded-[32px] bg-black">
    <MediaTile
      media={project.col1Media2}
      alt={`${project.name} preview 2`}
      className="w-full h-full object-cover"
    />
  </div>

  {/* Right 16:8 */}
<div className="aspect-[16/8] overflow-hidden rounded-[32px] bg-black">
    <MediaTile
      media={project.col2Media}
      alt={`${project.name} preview 3`}
      className="w-full h-full object-cover"
    />
  </div>

</div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-28 pb-20"
    >
      <FadeIn delay={0} y={30}>
        <h2
          className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-24"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          Project
        </h2>
      </FadeIn>

      <div className="flex flex-col gap-8">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
