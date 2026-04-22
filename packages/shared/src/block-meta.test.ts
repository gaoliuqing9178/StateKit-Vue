import { describe, expect, it } from "vitest";
import {
  implementedBlockIds,
  priorityStateBlockIds,
  stateBlockMetaById,
  stateBlockMetaBySlug,
  stateBlockMetaList,
} from "./block-meta";

const publicEntryNames = new Set([
  "EmptyState",
  "OnboardingState",
  "LoadingState",
  "ErrorState",
  "PermissionState",
  "UpgradeState",
  "SuccessState",
]);

const publicCategories = new Set([
  "empty",
  "onboarding",
  "loading",
  "error",
  "permission",
  "upgrade",
  "success",
]);

describe("stateBlockMeta", () => {
  it("keeps ids and slugs unique across the preset catalog", () => {
    const ids = stateBlockMetaList.map((meta) => meta.id);
    const slugs = stateBlockMetaList.map((meta) => meta.slug);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("keeps id and slug indexes aligned with the canonical list", () => {
    for (const meta of stateBlockMetaList) {
      expect(stateBlockMetaById[meta.id]).toBe(meta);
      expect(stateBlockMetaBySlug[meta.slug]).toBe(meta);
    }

    expect(Object.keys(stateBlockMetaById).sort()).toEqual(
      [...new Set(stateBlockMetaList.map((meta) => meta.id))].sort(),
    );
    expect(Object.keys(stateBlockMetaBySlug).sort()).toEqual(
      [...new Set(stateBlockMetaList.map((meta) => meta.slug))].sort(),
    );
  });

  it("keeps priority and public-entry metadata inside the implemented catalog", () => {
    const implementedSet = new Set(implementedBlockIds);

    for (const meta of stateBlockMetaList) {
      expect(implementedSet.has(meta.id)).toBe(true);
      expect(publicEntryNames.has(meta.componentName)).toBe(true);
      expect(publicCategories.has(meta.category)).toBe(true);
    }

    for (const id of priorityStateBlockIds) {
      expect(implementedSet.has(id)).toBe(true);
      expect(stateBlockMetaById[id].priority).toBe("launch");
    }
  });
});
