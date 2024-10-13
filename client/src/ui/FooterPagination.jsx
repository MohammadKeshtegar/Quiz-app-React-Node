import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import PaginationButton from "./PaginationButton";

function FooterPagination() {
  return (
    <div className="border-2 rounded flex items-center dark:border-neutral-400 border-neutral-500">
      <PaginationButton>
        <FaChevronLeft />
      </PaginationButton>

      <div className="border-x-2 px-4 py-1 dark:border-neutral-400 dark:bg-neutral-600 border-neutral-500">0</div>

      <PaginationButton>
        <FaChevronRight />
      </PaginationButton>
    </div>
  );
}

export default FooterPagination;
