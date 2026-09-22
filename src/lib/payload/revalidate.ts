import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from "payload";

export const revalidatePathHook = (
  paths: string[] | ((doc: any) => string[])
): CollectionAfterChangeHook => {
  return async ({ doc }) => {
    try {
      const resolvedPaths = typeof paths === "function" ? paths(doc) : paths;
      for (const p of resolvedPaths) {
        if (p) {
          revalidatePath(p);
          console.log(`[On-Demand Revalidate] Cleared cache for path: ${p}`);
        }
      }
    } catch (err) {
      console.warn("[On-Demand Revalidate] Warning:", err);
    }
    return doc;
  };
};

export const revalidateGlobalHook = (
  paths: string[]
): GlobalAfterChangeHook => {
  return async ({ doc }) => {
    try {
      for (const p of paths) {
        revalidatePath(p);
        console.log(`[On-Demand Global Revalidate] Cleared cache for path: ${p}`);
      }
    } catch (err) {
      console.warn("[On-Demand Global Revalidate] Warning:", err);
    }
    return doc;
  };
};
