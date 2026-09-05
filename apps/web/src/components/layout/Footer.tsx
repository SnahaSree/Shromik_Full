import Link from "next/link";

const platformLinks = [
  ["Find Jobs", "/jobs"],
  ["Training", "/trainings"],
  ["For Workers", "/for-workers"],
  ["For Contractors", "/for-contractors"],
];

const companyLinks = [
  ["About", "/about"],
  ["Impact", "/impact"],
  ["Contact", "/contact"],
  ["FAQ", "/faq"],
];

const legalLinks = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Security", "/security"],
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="text-2xl font-extrabold text-white"
            >
              SHROMIK
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-slate-400">
              A construction workforce platform connecting workers,
              contractors, and employers through digital workforce
              solutions.
            </p>
          </div>

          <FooterColumn
            title="Platform"
            links={platformLinks}
          />

          <FooterColumn
            title="Company"
            links={companyLinks}
          />

          <FooterColumn
            title="Legal"
            links={legalLinks}
          />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} SHROMIK. All rights reserved.
          </p>

          <p>
            Built for a more connected construction workforce.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[][];
}) {
  return (
    <div>
      <h2 className="font-semibold text-white">
        {title}
      </h2>

      <div className="mt-4 space-y-3">
        {links.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="block text-sm text-slate-400 transition-colors hover:text-white"
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}