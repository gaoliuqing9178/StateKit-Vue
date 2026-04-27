<script setup lang="ts">
import { computed, ref } from "vue";
import { RouterLink } from "vue-router";
import { OnboardingState } from "@statekit-vue/vue";

const onboardingVisible = ref(true);
const setupPending = ref(false);
const setupRuns = ref(0);
const demoSeeded = ref(false);
const activityNote = ref(
  "The host page owns visibility. Nothing in the component library stores a dismissed flag or a once-only lifecycle.",
);

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

async function startGuidedSetup() {
  setupPending.value = true;
  activityNote.value = "Preparing the workspace from the page layer...";
  await wait(1100);
  setupRuns.value += 1;
  setupPending.value = false;
  onboardingVisible.value = false;
  activityNote.value =
    "Guided setup completed in the page layer. The component stayed stateless and the page decided to hide the onboarding hero.";
}

function skipOnboarding() {
  onboardingVisible.value = false;
  activityNote.value =
    "Skipped from the page layer. No `dismissed`, `showOnce`, or `localStorage` API was needed in the component library.";
}

function seedDemoWorkspace() {
  demoSeeded.value = true;
  activityNote.value =
    "Loaded a demo workspace from the custom actions slot without changing the shared two-CTA prop API.";
}

function reopenOnboarding() {
  onboardingVisible.value = true;
  setupPending.value = false;
  activityNote.value =
    "The host page reopened onboarding to prove the lifecycle still lives outside the component library.";
}

const launchMetrics = computed(() => [
  {
    label: "Visibility",
    value: onboardingVisible.value ? "Hero live" : "Closed",
    detail: "Controlled by the page state, not by the component",
  },
  {
    label: "Guided starts",
    value: String(setupRuns.value),
    detail: "Primary onboarding runs triggered from the custom action slot",
  },
  {
    label: "Demo content",
    value: demoSeeded.value ? "Seeded" : "Clean",
    detail: "Optional sample-data action rendered alongside the main CTA",
  },
]);

const onboardingNotes = computed(() => [
  "Use `#media` for richer mockups, GIFs, video, or screenshot rails instead of the small default onboarding figure.",
  "Use `#actions` when the default two-button model is not enough for tutorial entry points, demo data, and a low-priority skip affordance.",
  "Both `Start` and `Skip` update page state here. The component library still does not know whether onboarding should appear once, persist, or be remembered.",
  activityNote.value,
]);
</script>

<template>
  <section class="page-stack">
    <section class="demo-shell">
      <div class="demo-shell__header">
        <div>
          <p class="demo-kicker">Example</p>
          <h1>Onboarding Activation</h1>
          <p>
            A dedicated onboarding hero that is intentionally louder than the
            empty-state family: rich media, layered action groups, and a skip
            path controlled entirely by the host page.
          </p>
        </div>

        <div class="demo-chip-row" aria-label="Scenario tags">
          <span class="demo-chip">Hero layout</span>
          <span class="demo-chip">Rich media slot</span>
          <span class="demo-chip">Controlled lifecycle</span>
          <RouterLink class="button-link is-secondary" to="/examples/admin-empty-states">
            Compare with empty states
          </RouterLink>
        </div>
      </div>

      <div class="demo-metric-list">
        <div class="demo-metric-list__row">
          <article
            v-for="metric in launchMetrics"
            :key="metric.label"
            class="demo-metric"
          >
            <p class="demo-surface__eyebrow">{{ metric.label }}</p>
            <strong>{{ metric.value }}</strong>
            <p>{{ metric.detail }}</p>
          </article>
        </div>
      </div>

      <article
        class="demo-surface demo-surface--span-2"
        data-testid="page-onboarding-state-demo"
      >
        <div class="demo-surface__header">
          <div>
            <p class="demo-surface__eyebrow">Task</p>
            <h2>Use the onboarding entry as a real activation surface</h2>
            <p>
              This example keeps lifecycle ownership in the page while
              `OnboardingState` handles the stronger shell, richer media slot,
              and higher-contrast visual hierarchy.
            </p>
          </div>
          <span class="demo-badge">OnboardingState</span>
        </div>

        <template v-if="onboardingVisible">
          <OnboardingState
            layout="page"
            density="spacious"
            title="Launch the workspace with one guided first run"
            description="Give the team a welcome surface that explains value, shows the product shape, and offers more than a plain two-button setup prompt."
          >
            <template #media>
              <div class="sk-onboarding-media">
                <div class="sk-onboarding-media__header">
                  <div>
                    <p class="sk-onboarding-media__eyebrow">Activation flow</p>
                    <strong class="sk-onboarding-media__title">
                      Workspace launch board
                    </strong>
                  </div>
                  <span class="sk-onboarding-media__chip">Rich media slot</span>
                </div>

                <div class="sk-onboarding-media__window">
                  <div class="sk-onboarding-media__rail">
                    <span class="sk-onboarding-media__rail-item is-strong" />
                    <span class="sk-onboarding-media__rail-item" />
                    <span class="sk-onboarding-media__rail-item" />
                    <span class="sk-onboarding-media__rail-item" />
                  </div>

                  <div class="sk-onboarding-media__canvas">
                    <div class="sk-onboarding-media__toolbar">
                      <span class="is-active">Launch plan</span>
                      <span>Owners</span>
                      <span>Approvals</span>
                    </div>

                    <div class="sk-onboarding-media__stats">
                      <div class="sk-onboarding-media__stat">
                        <small>Starter tasks</small>
                        <strong>12</strong>
                      </div>
                      <div class="sk-onboarding-media__stat">
                        <small>Connected roles</small>
                        <strong>4</strong>
                      </div>
                    </div>

                    <div class="sk-onboarding-media__feed">
                      <div class="sk-onboarding-media__feed-item">
                        <span />
                        <span />
                      </div>
                      <div class="sk-onboarding-media__feed-item">
                        <span />
                        <span />
                      </div>
                      <div class="sk-onboarding-media__feed-item">
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <template #actions>
              <div class="sk-onboarding-actions">
                <div class="sk-onboarding-actions__group">
                  <button
                    class="sk-shell__action"
                    :aria-busy="setupPending ? 'true' : undefined"
                    :disabled="setupPending"
                    type="button"
                    @click="startGuidedSetup"
                  >
                    {{ setupPending ? "Preparing workspace..." : "Start guided setup" }}
                  </button>

                  <button
                    class="sk-shell__action is-secondary"
                    :disabled="setupPending"
                    type="button"
                    @click="seedDemoWorkspace"
                  >
                    {{ demoSeeded ? "Demo workspace seeded" : "Load demo workspace" }}
                  </button>
                </div>

                <div class="sk-onboarding-actions__secondary">
                  <RouterLink class="sk-shell__action is-secondary" to="/docs/installation">
                    Watch quick walkthrough
                  </RouterLink>
                  <RouterLink
                    class="sk-shell__action is-secondary"
                    to="/recipes/onboarding-workspace-state"
                  >
                    Review recipe defaults
                  </RouterLink>
                  <button
                    class="sk-onboarding-actions__skip"
                    :disabled="setupPending"
                    type="button"
                    @click="skipOnboarding"
                  >
                    Skip for now
                  </button>
                </div>
              </div>
            </template>
          </OnboardingState>
        </template>

        <template v-else>
          <div class="demo-inline-panel">
            <div class="demo-inline-panel__copy">
              <h3>Workspace surface unlocked by page state</h3>
              <p>{{ activityNote }}</p>
            </div>

            <div class="demo-status-list">
              <div class="demo-status-list__row">
                <span>Lifecycle owner</span>
                <span class="demo-status-pill">Host page</span>
              </div>
              <div class="demo-status-list__row">
                <span>Persistence API</span>
                <span class="demo-status-pill is-warning">Not built in</span>
              </div>
              <div class="demo-status-list__row">
                <span>Next move</span>
                <span class="demo-status-pill is-success">Reopen or continue</span>
              </div>
            </div>

            <div class="button-row">
              <button class="button-link" type="button" @click="reopenOnboarding">
                Show onboarding again
              </button>
              <RouterLink class="button-link is-secondary" to="/examples/admin-empty-states">
                Back to empty-state examples
              </RouterLink>
            </div>
          </div>
        </template>

        <ul class="demo-note-list">
          <li v-for="item in onboardingNotes" :key="item">{{ item }}</li>
        </ul>
      </article>
    </section>
  </section>
</template>
