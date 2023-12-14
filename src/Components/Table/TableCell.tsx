import { FC, HTMLAttributes, ReactNode } from "react";

interface TableCellProps extends HTMLAttributes<HTMLTableDataCellElement> {
  children: ReactNode;
}

const TableCell: FC<TableCellProps> = ({ children, ...props }) => {
  return (
    <td
      className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
      {...props}
    >
      {children}
    </td>
  );
};

export default TableCell;
