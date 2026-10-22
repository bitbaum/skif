import type { Metadata } from "next";
import Link from "next/link";
import { Card, Empty, PageHeader, buttonClass } from "@/components/ui";
import { ACADEMY_AREAS, COURSES, deliveryLabel, type Course } from "@/config/academy";
import { getDb } from "@/db/client";
import { interestsOf, isCourseKey } from "@/server/academy";
import { requireViewer } from "@/server/viewer";
import { courseInterestAction } from "./actions";

export const metadata: Metadata = { title: "Training" };

const ALL = COURSES as readonly Course[];

function courseOf(key: string): Course | undefined {
  return ALL.find((c) => c.key === key);
}

function areaTitle(c: Course): string {
  return ACADEMY_AREAS.find((a) => a.key === c.area)?.title ?? "";
}

function InterestButton({ course, wanted }: { course: string; wanted: boolean }) {
  return (
    <form action={courseInterestAction}>
      <input type="hidden" name="course" value={course} />
      <input type="hidden" name="wanted" value={wanted ? "1" : "0"} />
      <button type="submit" className={wanted ? buttonClass.primary : buttonClass.secondary}>
        {wanted ? "Tell me when it starts" : "Remove"}
      </button>
    </form>
  );
}

/**
 * The person's side of the Academy: the courses they want, before any of them
 * runs. Asking is how training gets booked at this stage — Operations sees how
 * many people wait for each course and schedules the most-wanted first.
 */
export default async function TrainingPage({ searchParams }: { searchParams: Promise<{ course?: string; added?: string; removed?: string }> }) {
  const viewer = await requireViewer();
  const mine = await interestsOf(getDb(), viewer.sub);
  const { course, added, removed } = await searchParams;
  const asked = isCourseKey(course) && !mine.has(course) ? courseOf(course) : undefined;
  const list = ALL.filter((c) => mine.has(c.key));
  const changed = courseOf(added ?? removed ?? "");

  return (
    <>
      <PageHeader
        title="Training"
        lead="What Protectors learn, open to anyone. No course runs yet: tell Skif which ones you want, and the most-wanted are scheduled first. When one is, it appears here with its dates and price."
      />
      {changed && (
        <p role="status" className="mb-4 rounded-lg bg-accent-soft p-3 text-sm text-accent">
          {added ? `Added ${changed.title}.` : `Removed ${changed.title}.`}
        </p>
      )}
      {asked && (
        <Card title={asked.title} className="mb-6 border-accent">
          <p className="text-sm text-fg-tertiary">
            {areaTitle(asked)} · {deliveryLabel(asked.delivery)}
          </p>
          <p className="mt-2 max-w-prose leading-relaxed text-fg-secondary">{asked.outcome}</p>
          <div className="mt-4">
            <InterestButton course={asked.key} wanted />
          </div>
        </Card>
      )}
      <Card title="Courses you are waiting for">
        {list.length === 0 ? (
          <Empty>None yet. Pick a course in the Academy and press &ldquo;Tell me when it starts&rdquo;.</Empty>
        ) : (
          <ul className="divide-y divide-subtle">
            {list.map((c) => (
              <li key={c.key} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium text-fg-primary">{c.title}</p>
                  <p className="text-sm text-fg-tertiary">
                    {areaTitle(c)} · {deliveryLabel(c.delivery)} · Waiting for dates
                  </p>
                </div>
                <InterestButton course={c.key} wanted={false} />
              </li>
            ))}
          </ul>
        )}
        <p className="mt-4">
          <Link href="/academy" className={buttonClass.link}>
            Browse every course →
          </Link>
        </p>
      </Card>
    </>
  );
}
