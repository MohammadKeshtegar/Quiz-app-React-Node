import { createContext } from "react";

const TableContext = createContext();

function Table({ children, tableStyle = "" }) {
  return (
    <TableContext.Provider value={{}}>
      <div className={`${tableStyle} overflow-y-auto h-[650px] overflow-hidden relative dark:text-white text-black`}>
        <div className="divider-y-2 w-full text-center dark:shadow-none shadow-xl bg-zinc-50 dark:bg-neutral-900 rounded dark:border-none">
          {children}
        </div>
      </div>
    </TableContext.Provider>
  );
}

function Header({ headerTitles, headerStyle }) {
  return (
    <div
      as="header"
      role="row"
      className={`${headerStyle} grid-rows-1 dark:bg-neutral-700 bg-zinc-50 dark:border-neutral-700 border-2 border-b-0 border-neutral-400 rounded-ss rounded-se capitalize grid p-3 w-full absolute top-0 h-12`}
    >
      {headerTitles.map((title) => (
        <div key={title}>{title}</div>
      ))}
    </div>
  );
}

function Body({ data, bodyStyle, render }) {
  return (
    <section className={`${bodyStyle} divide-y dark:divide-neutral-700 dark:border-none border-y border-neutral-400 divide-neutral-400 mt-12`}>
      {data.map(render)}
    </section>
  );
}

function Row({ children, rowStyle, as, role }) {
  return (
    <div
      as={as}
      role={role}
      className={`${rowStyle} grid dark:border-neutral-700 border-x-2 border-neutral-400 items-center dark:bg-neutral-900 bg-neutral-200/50`}
    >
      {children}
    </div>
  );
}

function Footer({ children, footerStyle }) {
  return (
    <footer
      className={`${footerStyle} rounded-b dark:bg-neutral-700 dark:border-none border-2 border-t-0 border-neutral-400 w-full px-3 py-2 flex items-center justify-between`}
    >
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
