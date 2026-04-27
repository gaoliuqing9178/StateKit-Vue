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
      "Welcome to your launch workspace",
    );
    expect(wrapper.get(".sk-shell__description").text()).toBe(
      "Bring projects, approvals, and teammates into one guided flow so the team can start shipping without rebuilding the basics.",
    );
    expect(wrapper.findAll(".sk-shell__action").map((action) => action.text())).toEqual(
      ["Start guided setup", "Watch quick walkthrough"],
    );
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
    expect(wrapper.get(".sk-shell__action").text()).toBe("Start guided setup");
  });

  it("forwards custom media and actions slots to the shared shell", () => {
    const wrapper = mount(OnboardingState, {
      slots: {
        media: '<div data-testid="onboarding-media-slot">Hero media</div>',
        actions:
          '<div data-testid="onboarding-actions-slot"><button type="button">Enter workspace</button><button type="button">Skip intro</button></div>',
      },
    });

    expect(wrapper.get('[data-testid="onboarding-media-slot"]').text()).toBe(
      "Hero media",
    );
    expect(wrapper.get(".sk-shell__media").attributes("aria-hidden")).toBeUndefined();
    expect(wrapper.get('[data-testid="onboarding-actions-slot"]').text()).toContain(
      "Enter workspace",
    );
    expect(wrapper.get('[data-testid="onboarding-actions-slot"]').text()).toContain(
      "Skip intro",
    );
    expect(wrapper.text()).not.toContain("Start guided setup");
    expect(wrapper.text()).not.toContain("Watch quick walkthrough");
  });
});
