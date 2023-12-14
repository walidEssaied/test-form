import { Sector } from "./SectorModel";

export interface UserFormModel {
  name: string;
  sector: number | null;
  agree_to_terms: boolean;
}

export interface UsersListItem {
  id: number;
  name: string;
  sector: Sector;
  agree_to_terms: boolean;
}
