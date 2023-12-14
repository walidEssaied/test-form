import { FC, ReactNode } from "react";

interface TableHeaderProps {
  children: ReactNode;
}

const TableHeader: FC<TableHeaderProps> = ({ children }) => {
  return (
    <th className="border border-gray-300 py-2 px-4 text-gray-900">
      {children}
    </th>
  );
};

export default TableHeader;
