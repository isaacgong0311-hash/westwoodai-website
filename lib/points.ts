// How members earn leaderboard points. Single source of truth — the
// leaderboard's "How points work" panel and any page that quotes a point
// value read from here.
export const POINTS = {
  attendance: 30,
  project: 150,
  projectDemo: 75,
  competitionEntry: 100,
  competitionPlacement: 250,
  promptEntry: 50,
  promptWinner: 100,
  lesson: 100,
} as const;

export type PointKey = keyof typeof POINTS;

// `key` is also what officers type in the leaderboard sheet's Awards tab
// (the `category` label works too).
export const POINTS_BREAKDOWN: { key: PointKey; category: string; points: number; note: string }[] = [
  { key: "attendance", category: "Meeting attendance", points: POINTS.attendance, note: "per meeting" },
  { key: "project", category: "Project submission", points: POINTS.project, note: "per project" },
  { key: "projectDemo", category: "Project demo", points: POINTS.projectDemo, note: "at a showcase" },
  { key: "competitionEntry", category: "Competition entry", points: POINTS.competitionEntry, note: "per competition" },
  { key: "competitionPlacement", category: "Competition placement", points: POINTS.competitionPlacement, note: "top 3 finish" },
  { key: "promptEntry", category: "Prompt entry", points: POINTS.promptEntry, note: "per submission" },
  { key: "promptWinner", category: "Prompt winner", points: POINTS.promptWinner, note: "most upvotes" },
  { key: "lesson", category: "Lesson delivery", points: POINTS.lesson, note: "presenting" },
];
