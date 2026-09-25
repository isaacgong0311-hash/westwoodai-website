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

export const POINTS_BREAKDOWN = [
  { category: "Meeting attendance", points: POINTS.attendance, note: "per meeting" },
  { category: "Project submission", points: POINTS.project, note: "per project" },
  { category: "Project demo", points: POINTS.projectDemo, note: "at a showcase" },
  { category: "Competition entry", points: POINTS.competitionEntry, note: "per competition" },
  { category: "Competition placement", points: POINTS.competitionPlacement, note: "top 3 finish" },
  { category: "Prompt entry", points: POINTS.promptEntry, note: "per submission" },
  { category: "Prompt winner", points: POINTS.promptWinner, note: "most upvotes" },
  { category: "Lesson delivery", points: POINTS.lesson, note: "presenting" },
];
