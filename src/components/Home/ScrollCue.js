"use client";

// "SCROLL" label with a bobbing comet line; jumps to the recent posts.
export function ScrollCue({ targetId }) {
  const scrollToTarget = () => {
    const target = document.getElementById(targetId);
    if (target) window.scrollTo({ top: target.offsetTop - 40, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Scroll to recent posts"
      onClick={scrollToTarget}
      className="absolute bottom-8 left-1/2 z-[3] flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[.14em] text-fg-3"
    >
      Scroll
      <span className="h-10 w-0.5 rounded-sm bg-[linear-gradient(180deg,transparent,#18CCFC)] [animation:ds-float_2.4s_ease-in-out_infinite]" />
    </button>
  );
}
