import { createContext } from "react";

const TableContext = createContext();

function Table({ children, tableStyle = "" }) {
  return (
    <TableContext.Provider value={{}}>
      <div className={`${tableStyle} overflow-y-auto h-[650px] rounded overflow-hidden relative`}>
        <div className="divider-y-2 w-full text-center">{children}</div>
      </div>
    </TableContext.Provider>
  );
}

function Header({ headerTitles, headerStyle }) {
  return (
    <div as="header" role="row" className={`${headerStyle} grid-rows-1 bg-neutral-700 capitalize grid p-3 w-full absolute top-0 h-12`}>
      {headerTitles.map((title) => (
        <div key={title}>{title}</div>
      ))}
    </div>
  );
}

function Body({ data, bodyStyle, render }) {
  return <section className={`${bodyStyle} divide-y-[1px] divide-neutral-600 mt-12`}>{data.map(render)}</section>;
}

function Row({ children, rowStyle, as, role }) {
  return (
    <div as={as} role={role} className={`${rowStyle} grid items-center`}>
      {children}
    </div>
  );
}

function Footer({ children, footerStyle }) {
  return <footer className={`${footerStyle} rounded-b bg-neutral-700 w-full px-3 py-2 flex items-center justify-between`}>{children}</footer>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
