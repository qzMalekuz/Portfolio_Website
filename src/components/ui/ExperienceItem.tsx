/**
 * A single experience entry in an editorial two-column grid (inspired by the
 * resume-style layout): the company name + location sit in a left rail, the role
 * title and always-visible bullet points fill the wide middle column, and the
 * dates pin to the right in mono. A small company logo sits above the name to
 * keep brand identity.
 *
 * On small screens it stacks, but the meta (period + role) sits to the *right*
 * of the company name on the same header row rather than dropping beneath it —
 * company/location on the left, dates/designation right-aligned opposite them.
 */
export const ExperienceItem = ({
  logo,
  company,
  role,
  href,
  period,
  location,
  bullets,
}: {
  logo: string;
  company: string;
  role: string;
  href: string;
  period: string;
  location?: string;
  bullets: string[];
}) => {
  return (
    <div className="group grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-[minmax(140px,1fr)_minmax(0,2.4fr)]">
      {/* Left rail — logo, company, location. On mobile the period + role are
          pulled up to the right of the company name (see below). */}
      <div className="flex flex-col">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 w-fit"
        >
          <img
            src={logo}
            alt={company}
            className="w-9 h-9 rounded-lg border border-(--border-color) shadow-sm"
          />
        </a>

        {/* Header row: company/location on the left; on mobile the date and
            designation sit right-aligned opposite them. They move into the
            middle column on sm+ so the desktop grid layout is unchanged. */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 flex-col">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-fit text-[15px] font-bold text-(--text-primary) hover:text-(--text-highlight) transition-colors leading-tight"
            >
              <span className="hover-wavy">{company}</span>
            </a>
            {location && (
              <span className="mt-1 text-[13px] font-medium text-(--text-muted)">
                {location}
              </span>
            )}
          </div>

          <div className="flex shrink-0 flex-col items-end text-right sm:hidden">
            <span className="text-[13px] font-mono text-(--text-muted)">
              {period}
            </span>
            <span className="mt-1 text-[13px] font-bold text-(--text-primary) leading-tight">
              {role}
            </span>
          </div>
        </div>
      </div>

      {/* Middle/right — role, dates, bullets (desktop only header; on mobile the
          role + period live in the left rail's header row above). */}
      <div className="flex flex-col">
        <div className="hidden items-start justify-between gap-4 sm:flex">
          <span className="text-[15px] font-bold text-(--text-primary) leading-tight">
            {role}
          </span>
          <span className="shrink-0 text-[13px] font-mono text-(--text-muted)">
            {period}
          </span>
        </div>
        <ul className="mt-4 flex flex-col gap-3 text-[14px] leading-relaxed text-(--text-secondary) sm:pr-28">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex gap-2.5">
              <span className="select-none text-(--text-muted)">—</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
