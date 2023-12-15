import React, { FC } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { useQuery } from "react-query";
import { UserFormModel } from "../../Models/UserModel";
import { sectorServices } from "../../Services/SecotServices";

interface Props {
  field: ControllerRenderProps<UserFormModel, "sector">;
}

export const SectorSelect: FC<Props> = ({ field }): JSX.Element => {
  const { isLoading, error, data } = useQuery(
    "sectors",
    sectorServices.getAllSectors
  );

  if (isLoading) return <div>Loading sectors ...</div>;
  if (error) return <p className="bg-red-500 p-2 text-gray-500">Error fetching data</p>;

  const renderOptions = (items: any, parentId = null, depth = 0) => {
    const filteredItems = items.filter(
      (item: any) => item.parentId == parentId
    );

    return filteredItems.map((item: any) => {
      const prefix = depth > 0 ? `${"\xa0".repeat(depth * 4)} ` : "";
      const children = renderOptions(items, item.id, depth + 1);
      const childOptions = children.length
        ? renderOptions(items, item.id, depth + 1)
        : "";
      return (
        <React.Fragment key={item.id}>
          {children?.length <= 1 ? (
            <option value={item.id}>{prefix + item.name}</option>
          ) : (
            <option disabled>{prefix + item.name}</option>
          )}
          {childOptions}
        </React.Fragment>
      );
    });
  };

  const renderParentAndChildren = () => {
    if (data) {
      const sectorTree = renderOptions(data || []);
      return sectorTree;
    }
    return null;
  };

  return (
    <div>
      <label
        htmlFor="sector"
        className="block mb-1 text-sm font-medium text-gray-500"
      >
        Sector
      </label>
      <select
        className="block w-full p-2 mb-2 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
        {...field}
        onChange={(e) => {
          e.target.selectedIndex;
          e.target.value === "" ? e.preventDefault() : field.onChange(e);
        }}
        id="sector"
        value={Number(field.value)}
      >
        <option value="">Select a sector</option>
        {renderParentAndChildren()}
      </select>
    </div>
  );
};
