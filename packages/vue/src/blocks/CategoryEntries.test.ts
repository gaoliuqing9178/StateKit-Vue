import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import EmptyState from "./empty/EmptyState.vue";
import OnboardingState from "./onboarding/OnboardingState.vue";
import LoadingState from "./loading/LoadingState.vue";
import ErrorState from "./error/ErrorState.vue";
import PermissionState from "./permission/PermissionState.vue";
import UpgradeState from "./upgrade/UpgradeState.vue";
import SuccessState from "./success/SuccessState.vue";

const categoryEntryCases = [
  {
    name: "EmptyState",
    component: EmptyState,
    category: "empty",
    title: "Nothing here yet",
    description: "Create your first item or change the current view to keep moving.",
    tone: "neutral",
    density: "cozy",
    layout: "panel",
    actions: ["Create item", "Import"],
  },
  {
    name: "LoadingState",
    component: LoadingState,
    category: "loading",
    title: "Loading this view",
    description: "We are preparing the latest data and layout for this screen.",
    tone: "neutral",
    density: "cozy",
    layout: "panel",
    actions: [],
  },
  {
    name: "OnboardingState",
    component: OnboardingState,
    category: "onboarding",
    title: "Create your first workspace",
    description:
      "Start with one shared workspace to organize projects, teammates, and review flows from day one.",
    tone: "brand",
    density: "spacious",
    layout: "page",
    actions: ["Create workspace", "View setup guide"],
  },
  {
    name: "ErrorState",
    component: ErrorState,
    category: "error",
    title: "Something went wrong",
    description: "Try again or return to a stable place while we recover this view.",
    tone: "danger",
    density: "cozy",
    layout: "panel",
    actions: ["Try again", "Go back"],
  },
  {
    name: "PermissionState",
    component: PermissionState,
    category: "permission",
    title: "You do not have access",
    description: "Request access or return to a page you can use right now.",
    tone: "warning",
    density: "cozy",
    layout: "panel",
    actions: ["Request access", "Go back"],
  },
  {
    name: "UpgradeState",
    component: UpgradeState,
    category: "upgrade",
    title: "Upgrade to continue",
    description: "Move to a higher plan to unlock this workflow and higher limits.",
    tone: "brand",
    density: "cozy",
    layout: "panel",
    actions: ["Upgrade plan", "Compare plans"],
  },
  {
    name: "SuccessState",
    component: SuccessState,
    category: "success",
    title: "Done",
    description:
      "This step completed successfully. Review the result or continue to the next task.",
    tone: "success",
    density: "cozy",
    layout: "panel",
    actions: ["View results", "Continue"],
  },
] as const;

describe("category-first entries", () => {
  it.each(categoryEntryCases)(
    "renders $name with the expected default semantics",
    ({ component, category, title, description, tone, density, layout, actions }) => {
      const wrapper = mount(component);
      const shell = wrapper.get(".sk-shell");

      expect(shell.attributes("data-category")).toBe(category);
      expect(shell.attributes("data-tone")).toBe(tone);
      expect(shell.attributes("data-density")).toBe(density);
      expect(shell.attributes("data-layout")).toBe(layout);
      expect(wrapper.get(".sk-shell__kicker").text()).toBe(
        category.charAt(0).toUpperCase() + category.slice(1),
      );
      expect(wrapper.get(".sk-shell__title").text()).toBe(title);
      expect(wrapper.get(".sk-shell__description").text()).toBe(description);
      expect(
        wrapper.findAll(".sk-shell__action").map((action) => action.text()),
      ).toEqual(actions);
    },
  );

  it("lets actionless entries add CTA overrides through the shared merge layer", () => {
    const wrapper = mount(LoadingState, {
      props: {
        title: "Syncing finance records",
        layout: "inline",
        primaryAction: {
          label: "Open job log",
        },
      },
    });

    expect(wrapper.get(".sk-shell").attributes("data-category")).toBe("loading");
    expect(wrapper.get(".sk-shell").attributes("data-layout")).toBe("inline");
    expect(wrapper.get(".sk-shell__title").text()).toBe("Syncing finance records");
    expect(wrapper.findAll(".sk-shell__action")).toHaveLength(1);
    expect(wrapper.get(".sk-shell__action").text()).toBe("Open job log");
  });

  it("applies explicit overrides and allows removing the default secondary CTA", () => {
    const wrapper = mount(SuccessState, {
      props: {
        title: "Workspace delivered",
        description: "Open the launch report and hand the workspace to operations.",
        tone: "brand",
        density: "spacious",
        layout: "page",
        primaryAction: {
          label: "Open launch report",
          href: "/reports/launch",
        },
        secondaryAction: null,
      },
    });

    const action = wrapper.get(".sk-shell__action");

    expect(wrapper.get(".sk-shell").attributes("data-category")).toBe("success");
    expect(wrapper.get(".sk-shell").attributes("data-tone")).toBe("brand");
    expect(wrapper.get(".sk-shell").attributes("data-density")).toBe("spacious");
    expect(wrapper.get(".sk-shell").attributes("data-layout")).toBe("page");
    expect(wrapper.get(".sk-shell__title").text()).toBe("Workspace delivered");
    expect(wrapper.findAll(".sk-shell__action")).toHaveLength(1);
    expect(action.element.tagName).toBe("A");
    expect(action.attributes("href")).toBe("/reports/launch");
    expect(action.text()).toBe("Open launch report");
  });
});
