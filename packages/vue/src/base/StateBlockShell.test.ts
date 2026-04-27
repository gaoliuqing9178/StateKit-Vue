import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import StateBlockShell from "./StateBlockShell.vue";

describe("StateBlockShell", () => {
  it("renders actions as button or link based on href", () => {
    const wrapper = mount(StateBlockShell, {
      props: {
        title: "Set up workspace",
        primaryAction: { label: "Start setup" },
        secondaryAction: { label: "Read guide", href: "/docs/installation" },
      },
    });

    const actions = wrapper.findAll(".sk-shell__action");

    expect(actions).toHaveLength(2);
    expect(actions[0].element.tagName).toBe("BUTTON");
    expect(actions[0].attributes("type")).toBe("button");
    expect(actions[1].element.tagName).toBe("A");
    expect(actions[1].attributes("href")).toBe("/docs/installation");
  });

  it("keeps the default onboarding figure decorative when no custom media slot is provided", () => {
    const wrapper = mount(StateBlockShell, {
      props: {
        title: "Welcome",
        category: "onboarding",
      },
    });

    expect(wrapper.get(".sk-shell__media").attributes("aria-hidden")).toBe("true");
  });

  it("exposes a custom media slot to assistive tech instead of hiding the whole media region", () => {
    const wrapper = mount(StateBlockShell, {
      props: {
        title: "Welcome",
        category: "onboarding",
      },
      slots: {
        media: '<div data-testid="hero-media">Interactive launch preview</div>',
      },
    });

    expect(wrapper.get('[data-testid="hero-media"]').text()).toBe(
      "Interactive launch preview",
    );
    expect(wrapper.get(".sk-shell__media").attributes("aria-hidden")).toBeUndefined();
  });

  it("blocks unavailable button actions and exposes loading semantics", async () => {
    const onClick = vi.fn();
    const wrapper = mount(StateBlockShell, {
      props: {
        title: "Preparing workspace",
        primaryAction: {
          label: "Start setup",
          loading: true,
          loadingLabel: "Preparing workspace...",
          onClick,
        },
      },
    });

    const action = wrapper.get(".sk-shell__action");

    expect(action.text()).toBe("Preparing workspace...");
    expect(action.attributes("aria-busy")).toBe("true");
    expect(action.attributes("aria-disabled")).toBe("true");
    expect(action.attributes("disabled")).toBe("");

    await action.trigger("click");

    expect(onClick).not.toHaveBeenCalled();
  });

  it("falls back to the default loading label when none is provided", () => {
    const wrapper = mount(StateBlockShell, {
      props: {
        title: "Sync data",
        primaryAction: {
          label: "Retry",
          loading: true,
        },
      },
    });

    expect(wrapper.get(".sk-shell__action").text()).toBe("Working...");
  });

  it("removes href and tab focus from unavailable links", async () => {
    const onClick = vi.fn();
    const wrapper = mount(StateBlockShell, {
      props: {
        title: "Upgrade plan",
        primaryAction: {
          label: "Compare plans",
          href: "/pricing",
          disabled: true,
          onClick,
        },
      },
    });

    const action = wrapper.get(".sk-shell__action");

    expect(action.element.tagName).toBe("A");
    expect(action.attributes("href")).toBeUndefined();
    expect(action.attributes("tabindex")).toBe("-1");
    expect(action.attributes("aria-disabled")).toBe("true");

    await action.trigger("click");

    expect(onClick).not.toHaveBeenCalled();
  });

  it("invokes click handlers for available actions", async () => {
    const onClick = vi.fn();
    const wrapper = mount(StateBlockShell, {
      props: {
        title: "Invite teammates",
        primaryAction: {
          label: "Invite now",
          onClick,
        },
      },
    });

    await wrapper.get(".sk-shell__action").trigger("click");

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("lets the actions slot replace the fallback CTA rendering", () => {
    const wrapper = mount(StateBlockShell, {
      props: {
        title: "Launch onboarding",
        primaryAction: { label: "Default start" },
        secondaryAction: { label: "Default guide" },
      },
      slots: {
        actions:
          '<div data-testid="custom-actions"><button type="button">Launch now</button><button type="button">Skip for now</button></div>',
      },
    });

    expect(wrapper.get('[data-testid="custom-actions"]').text()).toContain(
      "Launch now",
    );
    expect(wrapper.get('[data-testid="custom-actions"]').text()).toContain(
      "Skip for now",
    );
    expect(wrapper.text()).not.toContain("Default start");
    expect(wrapper.text()).not.toContain("Default guide");
  });
});
