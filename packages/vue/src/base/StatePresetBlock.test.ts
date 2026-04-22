import { mount } from "@vue/test-utils";
import { describe, expect, it, vi, afterEach } from "vitest";
import StatePresetBlock from "./StatePresetBlock.vue";

describe("StatePresetBlock", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("falls back to the preset default layout when the requested layout is unsupported", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const wrapper = mount(StatePresetBlock, {
      props: {
        blockId: "empty-collection",
        layout: "inline",
      },
    });

    expect(wrapper.get(".sk-shell").attributes("data-layout")).toBe("panel");
    expect(warnSpy).toHaveBeenCalledWith(
      '[StateKit] "EmptyState" does not support the "inline" layout. Falling back to "panel".',
    );
  });

  it("keeps preset defaults when props are undefined and removes CTA when null is passed", () => {
    const wrapper = mount(StatePresetBlock, {
      props: {
        blockId: "no-permission",
        secondaryAction: null,
      },
    });

    expect(wrapper.get(".sk-shell__title").text()).toBe("You do not have access");
    expect(wrapper.get(".sk-shell").attributes("data-category")).toBe("permission");
    expect(wrapper.get(".sk-shell").attributes("data-layout")).toBe("panel");
    expect(wrapper.get(".sk-shell__action").text()).toBe("Request access");
    expect(wrapper.findAll(".sk-shell__action")).toHaveLength(1);
  });

  it("applies explicit prop overrides on top of preset metadata", () => {
    const wrapper = mount(StatePresetBlock, {
      props: {
        blockId: "first-project",
        title: "Ship the launch workspace",
        description: "Override the preset copy for a custom onboarding flow.",
        tone: "success",
        density: "compact",
        primaryAction: { label: "Launch now" },
      },
    });

    expect(wrapper.get(".sk-shell__title").text()).toBe("Ship the launch workspace");
    expect(wrapper.get(".sk-shell__description").text()).toBe(
      "Override the preset copy for a custom onboarding flow.",
    );
    expect(wrapper.get(".sk-shell").attributes("data-tone")).toBe("success");
    expect(wrapper.get(".sk-shell").attributes("data-density")).toBe("compact");
    expect(wrapper.get(".sk-shell__action").text()).toBe("Launch now");
    expect(wrapper.findAll(".sk-shell__action")).toHaveLength(2);
  });

  it("passes through supported layouts without warning and keeps the metadata category", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => undefined);

    const wrapper = mount(StatePresetBlock, {
      props: {
        blockId: "session-expired",
        layout: "page",
      },
    });

    expect(wrapper.get(".sk-shell").attributes("data-category")).toBe("permission");
    expect(wrapper.get(".sk-shell").attributes("data-layout")).toBe("page");
    expect(wrapper.get(".sk-shell").attributes("data-tone")).toBe("warning");
    expect(wrapper.get(".sk-shell").attributes("data-density")).toBe("cozy");
    expect(warnSpy).not.toHaveBeenCalled();
  });
});
