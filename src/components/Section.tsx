type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  desc?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  subtitle?: string;
};

const cx = (...classes: Array<string | undefined | false | null>) =>
  classes.filter(Boolean).join(" ");

export default function Section({
  id,
  eyebrow,
  title,
  desc,
  className,
  children,
  subtitle,
}: SectionProps) {
  return (
    <section id={id} className={cx("w-full py-16", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10">
          {eyebrow && (
            <div className="text-xs font-semibold tracking-widest opacity-70">
              {eyebrow}
            </div>
          )}
          <h2 className="mt-2 text-2xl font-semibold tracking-tight md:text-3xl">
            {title}
          </h2>
          {subtitle ? <p className="muted">{subtitle}</p> : null}
          {desc && (
            <div className="mt-3 max-w-2xl space-y-2 text-sm opacity-80">
              {desc}
            </div>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}
