import "dotenv/config";

import {
  Skill,
  TrainingProgram,
} from "../models/index.js";

import {
  connectDatabase,
  disconnectDatabase,
} from "../config/database.js";

const skills = [
  {
    name: "Masonry",
    category: "construction",
    description:
      "Brick, block, concrete, and related masonry work.",
  },
  {
    name: "Carpentry",
    category: "construction",
    description:
      "Woodwork, formwork, framing, and related carpentry tasks.",
  },
  {
    name: "Electrical",
    category: "technical",
    description:
      "Electrical installation and related technical work.",
  },
  {
    name: "Plumbing",
    category: "technical",
    description:
      "Water supply, drainage, pipe fitting, and plumbing work.",
  },
  {
    name: "Painting",
    category: "finishing",
    description:
      "Interior and exterior painting and finishing work.",
  },
  {
    name: "Steel Work",
    category: "construction",
    description:
      "Steel fabrication, reinforcement, and related work.",
  },
  {
    name: "General Labor",
    category: "general",
    description:
      "General construction site support and labor tasks.",
  },
];

const trainingPrograms = [
  {
    title: "Construction Site Safety",
    category: "safety" as const,
    description:
      "Basic safety practices for construction workers.",
    durationMinutes: 60,
    skillNames: [
      "Masonry",
      "Carpentry",
      "Electrical",
      "Plumbing",
      "Painting",
      "Steel Work",
      "General Labor",
    ],
  },
  {
    title: "Personal Protective Equipment",
    category: "safety" as const,
    description:
      "Understanding and using appropriate protective equipment.",
    durationMinutes: 45,
    skillNames: [
      "Masonry",
      "Carpentry",
      "Electrical",
      "Plumbing",
      "Painting",
      "Steel Work",
      "General Labor",
    ],
  },
  {
    title: "Workplace Behavior",
    category: "behavior" as const,
    description:
      "Professional communication, teamwork, and workplace conduct.",
    durationMinutes: 45,
    skillNames: [],
  },
  {
    title: "Tool Handling Basics",
    category: "tool_handling" as const,
    description:
      "Basic principles for safe and responsible tool handling.",
    durationMinutes: 60,
    skillNames: [
      "Masonry",
      "Carpentry",
      "Electrical",
      "Plumbing",
      "Painting",
      "Steel Work",
    ],
  },
  {
    title: "First Aid Basics",
    category: "first_aid" as const,
    description:
      "Basic first-aid awareness for workplace situations.",
    durationMinutes: 60,
    skillNames: [],
  },
  {
    title: "Worker Rights and Responsibilities",
    category: "worker_rights" as const,
    description:
      "Basic awareness of workplace rights and responsibilities.",
    durationMinutes: 45,
    skillNames: [],
  },
  {
    title: "Financial Literacy",
    category: "financial_literacy" as const,
    description:
      "Basic financial awareness for workers.",
    durationMinutes: 45,
    skillNames: [],
  },
];

async function seedSkills() {
  await Skill.bulkWrite(
    skills.map((skill) => ({
      updateOne: {
        filter: {
          name: skill.name,
        },
        update: {
          $set: skill,
        },
        upsert: true,
      },
    })),
  );

  return Skill.find({
    name: {
      $in: skills.map(
        (skill) => skill.name,
      ),
    },
  }).exec();
}

async function seedTrainingPrograms(
  seededSkills: Awaited<
    ReturnType<typeof seedSkills>
  >,
): Promise<void> {
  const skillMap = new Map(
    seededSkills.map((skill) => [
      skill.name,
      skill._id,
    ]),
  );

  await TrainingProgram.bulkWrite(
    trainingPrograms.map((program) => ({
      updateOne: {
        filter: {
          title: program.title,
        },
        update: {
          $set: {
            title: program.title,
            category: program.category,
            description: program.description,
            durationMinutes:
              program.durationMinutes,
            skills: program.skillNames
              .map((name) =>
                skillMap.get(name),
              )
              .filter(
                (
                  skillId,
                ): skillId is NonNullable<
                  typeof skillId
                > => skillId !== undefined,
              ),
            isPublished: true,
          },
        },
        upsert: true,
      },
    })),
  );
}

async function seed(): Promise<void> {
  if (
    process.env.NODE_ENV ===
    "production"
  ) {
    throw new Error(
      "Seed script cannot run in production.",
    );
  }

  await connectDatabase();

  console.log(
    "Seeding SHROMIK development data...",
  );

  const seededSkills =
    await seedSkills();

  console.log(
    `${seededSkills.length} skills seeded.`,
  );

  await seedTrainingPrograms(
    seededSkills,
  );

  console.log(
    `${trainingPrograms.length} training programs seeded.`,
  );

  console.log(
    "SHROMIK seed completed successfully.",
  );
}

async function run(): Promise<void> {
  try {
    await seed();
  } catch (error: unknown) {
    console.error(
      "SHROMIK seed failed:",
      error,
    );

    process.exitCode = 1;
  } finally {
    await disconnectDatabase();
  }
}

void run();