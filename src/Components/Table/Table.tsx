import { FC, ReactNode, TableHTMLAttributes } from "react";

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  children: ReactNode;
}

const Table: FC<TableProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        {children}
      </table>
    </div>
  );
};

export default Table;
