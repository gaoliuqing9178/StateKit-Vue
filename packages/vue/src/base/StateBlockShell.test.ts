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
});
