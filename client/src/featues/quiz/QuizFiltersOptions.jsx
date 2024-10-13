import SelectOption from "../../ui/SelectOption";
import SelectInput from "../../ui/SelectInput";
import { QuizFilterOptions, QuizSortOptions } from "../../constant/constant";

export function QuizFiltersOptions({ setOwner, setSortBy, setFilterBy }) {
  return (
    <div className="flex items-center gap-7 self-end">
      <div>
        <input type="text" placeholder="Enter owner name" className="input-auth-style bg-neutral-100" onChange={(e) => setOwner(e.target.value)} />
      </div>

      <div>
        <span className="dark:text-white">Sort by: </span>
        <SelectInput
          onChange={(e) => setSortBy(e.target.value)}
          data={QuizSortOptions}
          render={(option, i) => <SelectOption key={i} value={option.value} text={option.text} />}
        />
      </div>

      <div>
        Filter by:{" "}
        <SelectInput
          onChange={(e) => setFilterBy(e.target.value)}
          data={QuizFilterOptions}
          render={(option, i) => <SelectOption key={i} value={option} text={option} />}
        />
      </div>
    </div>
  );
}

export default QuizFiltersOptions;
