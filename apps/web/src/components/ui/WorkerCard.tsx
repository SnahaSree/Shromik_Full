import {
  BriefcaseBusiness,
  MapPin,
  Star,
} from "lucide-react";

import Badge from "./Badge";
import Card from "./Card";
import Button from "./Button";

interface WorkerCardProps {
  name: string;
  location: string;
  skills: string[];
  rating: number;
  completedJobs: number;
  verified?: boolean;
}

export default function WorkerCard({
  name,
  location,
  skills,
  rating,
  completedJobs,
  verified = false,
}: WorkerCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start gap-4">
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100 text-lg font-bold text-green-800"
          aria-hidden="true"
        >
          {name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-bold text-slate-950">
              {name}
            </h3>

            {verified && (
              <Badge variant="success">
                Verified
              </Badge>
            )}
          </div>

          <div className="mt-2 flex items-center gap-1 text-sm text-slate-500">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {location}
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-5 text-sm">
        <span className="flex items-center gap-1 text-amber-600">
          <Star
            className="h-4 w-4 fill-current"
            aria-hidden="true"
          />
          {rating.toFixed(1)}
        </span>

        <span className="flex items-center gap-1 text-slate-600">
          <BriefcaseBusiness
            className="h-4 w-4"
            aria-hidden="true"
          />
          {completedJobs} jobs
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill}>
            {skill}
          </Badge>
        ))}
      </div>

      <div className="mt-6">
        <Button fullWidth variant="outline">
          View Profile
        </Button>
      </div>
    </Card>
  );
}