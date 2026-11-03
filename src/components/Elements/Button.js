import Link from "next/link";
import { cn } from "@/src/utils";

const SIZES = {
  sm: "px-4 py-2 text-sm gap-2",
  md: "px-6 py-2.5 text-base gap-2",
  lg: "px-7 py-3 text-lg gap-2.5",
};

const VARIANTS = {
  // Fills with the light text color and flips to an outline on hover
  solid: "bg-fg-1 text-[var(--fg-inverse)] border-fg-1 hover:bg-transparent hover:text-fg-1",
  accent: "bg-[var(--accent-strong)] text-white border-transparent hover:opacity-80",
  outline: "bg-transparent text-fg-1 border-fg-1 hover:bg-fg-1 hover:text-[var(--fg-inverse)]",
  ghost: "bg-transparent text-fg-1 border-transparent hover:bg-[var(--accent-soft)]",
  // Gradient border with a glow on hover; one hero call-to-action per view
  comet:
    "text-fg-1 border-transparent [background:linear-gradient(var(--space-900),var(--space-900))_padding-box,linear-gradient(90deg,#18CCFC,#6344F5,#AE48FF)_border-box] hover:shadow-[0_0_28px_rgba(99,68,245,.55),0_0_10px_rgba(24,204,252,.4)]",
};

// A link styled as a button (pass href) or a real <button>.
export function Button({ children, href, variant = "solid", size = "md", className, ...rest }) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-lg border-2 font-bold leading-tight capitalize",
    "transition-[background-color,color,opacity,box-shadow,transform] duration-200 active:scale-[.97]",
    SIZES[size],
    VARIANTS[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
