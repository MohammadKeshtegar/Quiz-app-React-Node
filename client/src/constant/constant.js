export const USER_TABLE_HEADER = ["profile", "name", "email", "username", "Rank", "Points", "delete user", "more details"];
export const QUIZ_HEADER_LIST = ["Category", "Question numebrs", "Time", "Created by", "Confirm quiz", "confirmed"];
export const CONFIRMED_QUIZ_HEADER = ["category", "question nums", "quiz time", "owner", "Total point", "you point", "check", "do again"];
export const QUIZ_TABLE_HEADER = ["", "category", "owner", "question num", "quiz time", "see quiz"];
export const USER_QUIZ_HEADER = ["", "Category", "Time", "Questions", "Delete", "Check"];
export const PALYERS_HEADER = ["Rank", "Profile", "Username", "Points", "See user"];
export const DIFFICULTY_OPTIONS = ["easy", "medium", "hard"];
export const QuizFilterOptions = ["All"];
export const QuizSortOptions = [
  { value: "time", text: "Quiz Time" },
  { value: "questionNum", text: "Question numbers" },
];
export const ENDPOINT = "http://localhost:5000";
export const ITEMS_PER_PAGE = 20;
