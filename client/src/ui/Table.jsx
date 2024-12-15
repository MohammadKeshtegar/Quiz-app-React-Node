import { createContext } from "react";

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

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
