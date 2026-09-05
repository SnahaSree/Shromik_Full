import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import JobCard from "@/components/ui/JobCard";
import WorkerCard from "@/components/ui/WorkerCard";

const features = [
  {
    title: "Verified Workers",
    description:
      "Help contractors discover workers with verified profiles, skills, experience, and training.",
  },
  {
    title: "Better Job Access",
    description:
      "Workers can discover relevant construction opportunities based on skills, location, and availability.",
  },
  {
    title: "Skill Development",
    description:
      "Access safety, technical, workplace, and financial training designed for construction workers.",
  },
  {
    title: "Transparent Workforce Management",
    description:
      "Contractors can manage jobs, workers, attendance, projects, and workforce information in one platform.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Profile",
    description:
      "Register as a worker or contractor and build a professional profile.",
  },
  {
    number: "02",
    title: "Discover Opportunities",
    description:
      "Workers can find jobs while contractors can discover suitable workers.",
  },
  {
    number: "03",
    title: "Connect & Work",
    description:
      "Apply, hire, manage assignments, attendance, and workforce activities.",
  },
];

const featuredJobs = [
  {
    id: "demo-1",
    title: "Construction Helper",
    location: "Dhaka",
    wage: "BDT —",
    duration: "Project based",
    workersNeeded: 5,
    skills: ["General Work", "Construction"],
    verifiedContractor: true,
  },
  {
    id: "demo-2",
    title: "Mason",
    location: "Chattogram",
    wage: "BDT —",
    duration: "Full-time",
    workersNeeded: 2,
    skills: ["Masonry", "Construction"],
    verifiedContractor: true,
  },
  {
    id: "demo-3",
    title: "Electrician",
    location: "Dhaka",
    wage: "BDT —",
    duration: "Project based",
    workersNeeded: 1,
    skills: ["Electrical", "Technical"],
    verifiedContractor: false,
  },
];

const featuredWorkers = [
  {
    name: "Worker Profile",
    location: "Dhaka",
    skills: ["Masonry", "Construction"],
    rating: 4.8,
    completedJobs: 12,
    verified: true,
  },
  {
    name: "Worker Profile",
    location: "Chattogram",
    skills: ["Electrical", "Safety"],
    rating: 4.7,
    completedJobs: 8,
    verified: true,
  },
  {
    name: "Worker Profile",
    location: "Rajshahi",
    skills: ["General Work", "Construction"],
    rating: 4.6,
    completedJobs: 10,
    verified: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
          <div>
            <Badge variant="success">Construction Workforce Platform</Badge>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Connecting
              <span className="text-green-800"> skilled workers</span>{" "}
              with better opportunities.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              SHROMIK is a digital workforce platform designed to connect
              construction workers with contractors and employers while
              supporting verification, training, job discovery, and workforce
              management.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>

              <Link href="/jobs">
                <Button variant="outline">Explore Jobs</Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
              <span>✓ Verified profiles</span>
              <span>✓ Skills & training</span>
              <span>✓ Workforce management</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
              <div className="rounded-2xl bg-green-800 p-8 text-white">
                <p className="text-sm font-medium text-green-100">
                  SHROMIK PLATFORM
                </p>

                <h2 className="mt-4 text-3xl font-bold">
                  Work. Connect. Grow.
                </h2>

                <p className="mt-4 leading-7 text-green-50">
                  A professional digital space for construction workers and
                  contractors.
                </p>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-2xl font-bold text-green-800">Jobs</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Opportunities
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-2xl font-bold text-green-800">Skills</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Development
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-2xl font-bold text-green-800">Trust</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Verification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform introduction */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="info">One Platform</Badge>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Building a stronger construction workforce
            </h2>

            <p className="mt-5 text-lg leading-8 text-slate-600">
              SHROMIK brings workers and contractors together through a
              structured digital platform that makes workforce discovery,
              professional profiles, training, and workforce management
              easier.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title}>
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-100 text-lg font-bold text-green-800">
                  ✓
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-950">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="warning">How It Works</Badge>

              <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">
                Simple for workers. Powerful for contractors.
              </h2>

              <p className="mt-5 leading-7 text-slate-600">
                SHROMIK is designed around clear workflows so users can
                understand what to do next without unnecessary complexity.
              </p>

              <div className="mt-8 space-y-6">
                {steps.map((step) => (
                  <div key={step.number} className="flex gap-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-800 text-sm font-bold text-white">
                      {step.number}
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-950">
                        {step.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="p-8">
              <p className="text-sm font-semibold uppercase tracking-wider text-green-800">
                For Workers
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-950">
                Build your professional workforce profile
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Showcase your skills, experience, availability, ratings, and
                training progress through a structured profile.
              </p>

              <Link href="/for-workers" className="mt-6 inline-block">
                <Button variant="outline">Learn About Workers</Button>
              </Link>

              <div className="my-8 border-t border-slate-200" />

              <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">
                For Contractors
              </p>

              <h3 className="mt-3 text-2xl font-bold text-slate-950">
                Find and manage your workforce
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Post jobs, discover workers, manage projects, track attendance,
                and organize workforce activities.
              </p>

              <Link
                href="/for-contractors"
                className="mt-6 inline-block"
              >
                <Button variant="secondary">
                  Learn About Contractors
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

<section className="bg-white py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Badge variant="success">
          Job Marketplace
        </Badge>

        <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">
          Explore construction opportunities
        </h2>

        <p className="mt-4 max-w-2xl text-slate-600">
          Discover opportunities based on skills, location,
          availability, and workforce requirements.
        </p>
      </div>

      <Link
        href="/jobs"
        className="text-sm font-semibold text-green-800 hover:text-green-900"
      >
        View all jobs →
      </Link>
    </div>

    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {featuredJobs.map((job) => (
        <JobCard key={job.id} {...job} />
      ))}
    </div>
  </div>
</section>

<section className="bg-slate-50 py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <Badge variant="info">
          Worker Discovery
        </Badge>

        <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">
          Discover skilled workers
        </h2>

        <p className="mt-4 max-w-2xl text-slate-600">
          Contractors can discover worker profiles based on
          skills, experience, location, ratings, and verification.
        </p>
      </div>

      <Link
        href="/for-contractors"
        className="text-sm font-semibold text-green-800 hover:text-green-900"
      >
        Explore contractor tools →
      </Link>
    </div>

    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {featuredWorkers.map((worker) => (
        <WorkerCard
          key={`${worker.name}-${worker.location}`}
          {...worker}
        />
      ))}
    </div>
  </div>
</section>

      {/* Training */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-green-800 px-6 py-12 text-white sm:px-10 lg:px-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="success">Training & Development</Badge>

                <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
                  Learn skills that support safer and better work.
                </h2>

                <p className="mt-5 max-w-2xl leading-7 text-green-50">
                  SHROMIK can provide structured training opportunities across
                  safety, technical skills, workplace behavior, tool handling,
                  first aid, worker rights, and financial literacy.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Safety",
                  "Technical Skills",
                  "Tool Handling",
                  "First Aid",
                  "Worker Rights",
                  "Financial Literacy",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-green-700 bg-green-900/40 px-4 py-3 text-sm font-medium"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI */}
      <section className="bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="info">SHROMIK AI Assistant</Badge>

          <h2 className="mt-4 text-3xl font-bold text-slate-950 sm:text-4xl">
            Help when you need it
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
            The SHROMIK AI Assistant will help users understand platform
            features, jobs, registration, training, safety information, and
            common questions in Bengali and English.
          </p>

          <div className="mt-8">
            <Link href="/faq">
              <Button>Explore Help & FAQ</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Ready to get started with SHROMIK?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Create a profile, explore opportunities, or build your workforce
            network through the SHROMIK platform.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/register">
              <Button>Create Your Account</Button>
            </Link>

            <Link href="/contact">
              <Button variant="outline">Contact SHROMIK</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}