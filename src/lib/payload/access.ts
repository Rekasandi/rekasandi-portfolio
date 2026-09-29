import type { Access } from "payload";

export const isAdmin: Access = ({ req: { user } }) => user?.role === "admin";
export const canManageContent: Access = ({ req: { user } }) =>
  user?.role === "admin" || user?.role === "editor";
