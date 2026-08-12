interface ContactButtonProps {
  className?: string;
}

export default function ContactButton({ className = '' }: ContactButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest bg-white text-black transition-opacity duration-200 hover:opacity-80 ${className}`}
    >
      Contact Me
    </button>
  );
}
