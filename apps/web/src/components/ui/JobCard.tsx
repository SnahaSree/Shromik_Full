import {
  CalendarDays,
  MapPin,
  Users,
  Wallet,
} from "lucide-react";
import Link from "next/link";

import Badge from "./Badge";
import Button from "./Button";
import Card from "./Card";

interface JobCardProps {
  id: string;
  title: string;
  location: string;
  wage: string;
  duration: string;
  workersNeeded: number;
  skills: string[];
  verifiedContractor?: boolean;
}

export default function JobCard({
  id,
  title,
  location,
  wage,
  duration,
  workersNeeded,
  skills,
  verifiedContractor = false,
}: JobCardProps) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-slate-950">
            {title}
          </h3>

          {verifiedContractor && (
            <div className="mt-2">
              <Badge variant="success">
                Verified Contractor
              </Badge>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" aria-hidden="true" />
          {location}
        </div>

        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4" aria-hidden="true" />
          {wage}
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" aria-hidden="true" />
          {duration}
        </div>

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" aria-hidden="true" />
          {workersNeeded} worker
          {workersNeeded !== 1 ? "s" : ""} needed
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="neutral">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="mt-auto pt-6">
        <Link href={`/jobs/${id}`}>
          <Button fullWidth variant="outline">
            View Job
          </Button>
        </Link>
      </div>
    </Card>
  );
}