import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import OnboardingState from "./OnboardingState.vue";

describe("OnboardingState", () => {
  it("renders the onboarding defaults through the shared shell", () => {
    const wrapper = mount(OnboardingState);

    expect(wrapper.get(".sk-shell").attributes("data-category")).toBe(
      "onboarding",
    );
    expect(wrapper.get(".sk-shell").attributes("data-tone")).toBe("brand");
    expect(wrapper.get(".sk-shell").attributes("data-density")).toBe(
      "spacious",
    );
    expect(wrapper.get(".sk-shell").attributes("data-layout")).toBe("page");
    expect(wrapper.get(".sk-shell__title").text()).toBe(
      "Create your first workspace",
    );
    expect(wrapper.get(".sk-shell__description").text()).toBe(
      "Start with one shared workspace to organize projects, teammates, and review flows from day one.",
    );
    expect(wrapper.findAll(".sk-shell__action").map((action) => action.text())).toEqual([
      "Create workspace",
      "View setup guide",
    ]);
  });

  it("applies explicit overrides without losing onboarding semantics", () => {
    const wrapper = mount(OnboardingState, {
      props: {
        title: "Launch the design workspace",
        secondaryAction: null,
      },
    });

    expect(wrapper.get(".sk-shell").attributes("data-category")).toBe(
      "onboarding",
    );
    expect(wrapper.get(".sk-shell__title").text()).toBe(
      "Launch the design workspace",
    );
    expect(wrapper.findAll(".sk-shell__action")).toHaveLength(1);
    expect(wrapper.get(".sk-shell__action").text()).toBe("Create workspace");
  });
});
