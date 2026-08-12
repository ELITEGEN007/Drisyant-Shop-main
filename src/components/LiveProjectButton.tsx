interface LiveProjectButtonProps {
  className?: string;
}

export default function LiveProjectButton({ className = '' }: LiveProjectButtonProps) {
  return (
    <button
      type="button"
      className={`rounded-full border-2 border-[#F2F2F2] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base text-[#F2F2F2] font-medium uppercase tracking-widest transition-colors duration-200 hover:bg-[#F2F2F2]/10 ${className}`}
    >
      Live Project
    </button>
  );
}
