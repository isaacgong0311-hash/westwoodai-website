// Tags lessons by topic from their titles, so the Lessons archive can be
// filtered without officers having to tag 100 entries by hand. First match
// wins per topic; a lesson can have several topics.

export const TOPICS = [
  { id: "basics", label: "Getting started", words: ["introduction", "intro", "terminology", "welcome", "information meeting", "colab", "python", "pandas", "review", "basics"] },
  { id: "regression", label: "Regression & loss", words: ["regression", "loss", "gradient descent", "training a machine", "house prices", "housing", "stock", "financial data"] },
  { id: "classification", label: "Classification & trees", words: ["classification", "decision tree", "random forest", "support vector", "nearest-neighbor", "metrics", "titanic", "overfitting", "workflow"] },
  { id: "neural", label: "Neural networks", words: ["neural", "perceptron", "lstm", "recurrent", "feature"] },
  { id: "vision", label: "Computer vision", words: ["vision", "convolutional", "image", "mnist", "cifar"] },
  { id: "language", label: "Language & transformers", words: ["transformer", "tokeniz", "natural language", "chatbot", "text generation"] },
  { id: "society", label: "AI & society", words: ["ethics", "alignment", "social media", "finance", "medicine", "partner"] },
  { id: "projects", label: "Projects & competitions", words: ["project", "competition", "wharton", "hockey", "festival", "presentations", "election", "interview", "submission"] },
] as const;

export type TopicId = (typeof TOPICS)[number]["id"];

export function topicsFor(title: string): TopicId[] {
  const t = title.toLowerCase();
  return TOPICS.filter((topic) => topic.words.some((w) => t.includes(w))).map((topic) => topic.id);
}
