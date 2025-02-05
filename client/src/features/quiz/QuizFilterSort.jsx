import { useEffect, useState } from "react";

import { useFilterSortQuizzes } from "./useFilterSortQuizzes";
import useDebounce from "../../hooks/useDebounce";

export default function QuizFilterSort({ filterOptions }) {
  const { owner, category, sort, setFilterSort } = useFilterSortQuizzes();
  const [localSearch, setLocalSearch] = useState(owner);
  const debouncedSearchedOwner = useDebounce(localSearch);

  const sortItemList = [
    { value: "createdAt-ascending", text: "Created date (Ascending)" },
    { value: "createdAt-descending", text: "Created date (Descending)" },
    { value: "questions-ascending", text: "Questions (Asscending)" },
    { value: "questions-descending", text: "Questions (Descending)" },
    { value: "quizTime-ascending", text: "Quiz time (Asscending)" },
    { value: "quizTime-descending", text: "Quiz time (Descending)" },
  ];

  useEffect(
    function () {
      setFilterSort({ owner: debouncedSearchedOwner });
    },
    [setFilterSort, debouncedSearchedOwner]
  );

  return (
    <div className="flex items-center justify-between w-full mb-5">
      <div className="w-72">
        <input
          type="text"
          className="input-auth-style"
          placeholder="Search owner"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>

      <div className="flex items-center justify gap-2">
        <select name="sort" id="sort" className="select-input-style w-64" value={sort} onChange={(e) => setFilterSort({ sort: e.target.value })}>
          {sortItemList.map((sortItem) => (
            <option key={sortItem.value} value={sortItem.value}>
              {sortItem.text}
            </option>
          ))}
        </select>

        <select
          name="category"
          id="category"
          className="select-input-style"
          value={category}
          onChange={(e) => setFilterSort({ category: e.target.value })}
        >
          {filterOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
