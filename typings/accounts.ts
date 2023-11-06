export interface Account {
  id: number;
  label?: string;
  owner?: string;
  group?: string;
  balance: number;
  isDefault: boolean;
  type: "personal" | "shared" | "group";
}
