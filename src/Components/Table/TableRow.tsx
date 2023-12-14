import { FC, ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
}

const TableRow: FC<TableRowProps> = ({ children }) => {
  return <tr className="bg-gray-100">{children}</tr>;
};

export default TableRow;
