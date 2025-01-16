import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { createContext } from "react";

// import PaginationButton from "./PaginationButton";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../constant/constant";

const TableContext = createContext();

function Table({ children, tableStyle = "" }) {
  return (
    <TableContext.Provider value={{}}>
      <div className={`${tableStyle} overflow-y-auto rounded overflow-hidden relative shadow-custom-2`}>
        <div className="divider-y-2 w-full text-center">{children}</div>
      </div>
    </TableContext.Provider>
  );
}

function Header({ headerTitles, headerStyle }) {
  return (
    <div
      as="header"
      role="row"
      className={`${headerStyle} grid-rows-1 dark:bg-neutral-700 dark:border-none border-b-0 border border-blue-500 dark:text-white text-black rounded-t capitalize grid p-3 w-full absolute top-0 h-12`}
    >
      {headerTitles.map((title) => (
        <div key={title}>{title}</div>
      ))}
    </div>
  );
}

function Body({ data, bodyStyle, render }) {
  return (
    <section className={`${bodyStyle} divide-y-[1px] divide-neutral-600 mt-12 border dark:border-neutral-700/50 border-blue-500`}>
      {data.map(render)}
    </section>
  );
}

function Row({ children, rowStyle, as, role }) {
  return (
    <div as={as} role={role} className={`${rowStyle} grid items-center dark:text-white text-black`}>
      {children}
    </div>
  );
}

function Footer({ children, footerStyle }) {
  return (
    <footer
      className={`${footerStyle} dark:text-white text-black rounded-b dark:bg-neutral-700 dark:border-none border border-blue-500 border-t-0 w-full px-3 py-2 flex items-center justify-between`}
    >
      {children}
    </footer>
  );
}

function Pagination({ itemsLength }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !searchParams ? 1 : Number(searchParams.get("page"));
  const pageCount = Math.ceil(itemsLength / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  console.log(currentPage);

  return (
    <>
      <div>
        <p className="text-lg">
          Total quizzes: <span className="font-semibold">{itemsLength}</span>
        </p>
      </div>

      <div className="border-2 rounded flex items-center">
        <PaginationButton onClick={prevPage} disabled={currentPage <= 1}>
          <FaChevronLeft />
        </PaginationButton>

        <div className="border-x-2 px-4 py-1 dark:bg-neutral-600">{currentPage + 1}</div>

        <PaginationButton onClick={nextPage} disabled={currentPage >= pageCount - 1}>
          <FaChevronRight />
        </PaginationButton>
      </div>
    </>
  );
}

function PaginationButton({ children, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="h-8 w-12 hover:bg-blue-500 hover:text-white m-0 p-0 overflow-hidden flex items-center justify-center disabled:cursor-not-allowed transition-all"
    >
      {children}
    </button>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
Table.Pagination = Pagination;

export default Table;
