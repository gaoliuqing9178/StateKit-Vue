<script setup lang="ts">
import { computed, ref } from "vue";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  OnboardingState,
  PermissionState,
  SuccessState,
  UpgradeState,
} from "@statekit-vue/vue";

const activeFilters = ref(["Status: Needs review", "Owner: Motion"]);
const onboardingStarts = ref(2);
const savedViews = ref(4);
const accessRequests = ref(2);
const billingIntents = ref(3);
const releaseNotes = ref(6);
const retryCount = ref(0);
const onboardingVisible = ref(true);
const demoWorkspaceSeeded = ref(false);
const onboardingPending = ref(false);
const accessPending = ref(false);
const billingPending = ref(false);
const retryPending = ref(false);
const onboardingStatusNote = ref(
  "The example page owns onboarding visibility. The component only renders the launch hero and its richer slots.",
);

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function clearFilters() {
  activeFilters.value = [];
}

function saveView() {
  savedViews.value += 1;
}

async function startWorkspaceSetup() {
  onboardingPending.value = true;
  await wait(880);
  onboardingStarts.value += 1;
  onboardingPending.value = false;
  onboardingVisible.value = false;
  onboardingStatusNote.value =
    "The page hid the onboarding hero after the guided start completed. No component-level dismissed lifecycle was added.";
}

function seedDemoWorkspace() {
  demoWorkspaceSeeded.value = true;
  onboardingStatusNote.value =
    "Loaded a demo workspace from the custom actions slot without expanding the shared two-CTA prop model.";
}

function skipOnboarding() {
  onboardingVisible.value = false;
  onboardingStatusNote.value =
    "Skipped from the page layer. The example still keeps the once-only decision outside the component library.";
}

function reopenOnboarding() {
  onboardingVisible.value = true;
  onboardingPending.value = false;
  onboardingStatusNote.value =
    "The page reopened onboarding to show that visibility remains fully controlled by the host surface.";
}

async function requestAccess() {
  accessPending.value = true;
  await wait(820);
  accessRequests.value += 1;
  accessPending.value = false;
}

async function openBilling() {
  billingPending.value = true;
  await wait(1040);
  billingIntents.value += 1;
  billingPending.value = false;
}

async function retrySync() {
  retryPending.value = true;
  await wait(920);
  retryCount.value += 1;
  retryPending.value = false;
}

function openReleaseNotes() {
  releaseNotes.value += 1;
}

const searchPrimaryAction = computed(() =>
  activeFilters.value.length
    ? { label: "Clear filters", onClick: clearFilters }
    : { label: "Filters cleared", disabled: true },
);

const summaryCards = computed(() => [
  {
    label: "Direction",
    value: "Open Editorial",
    detail: "The page frame now relies on spacing and rhythm instead of stacked cards.",
  },
  {
    label: "Guided Starts",
    value: String(onboardingStarts.value).padStart(2, "0"),
    detail: "Onboarding now uses a dedicated hero with rich media and action slots.",
  },
  {
    label: "Release Notes",
    value: String(releaseNotes.value).padStart(2, "0"),
    detail: "Success keeps the next step visible without turning into a celebration card.",
  },
]);
</script>

<template>
  <main class="showcase-shell">
    <header class="showcase-hero">
      <div class="showcase-hero__copy">
        <p class="showcase-kicker">StateKit / Example studies</p>
        <h1>State components with less framing and more air.</h1>
        <p class="showcase-hero__lede">
          This pass pushes the example away from card galleries and closer to an
          editorial product page. The components still carry the state, but the
          page around them is quieter, flatter, and more deliberate.
        </p>
      </div>

      <aside class="showcase-hero__aside" aria-label="Design notes">
        <p class="showcase-note__eyebrow">Direction</p>
        <p class="showcase-note__title">Editorial product surfaces, not dashboard cards.</p>
        <p class="showcase-note__body">
          The page now leans on whitespace, typographic hierarchy, and section
          dividers. That lets the state components feel intentional without the
          whole screen turning into a stack of floating boxes.
        </p>
        <ul class="pill-list">
          <li class="pill-list__item">High-contrast copy</li>
          <li class="pill-list__item">Open page structure</li>
          <li class="pill-list__item">Stable hover feedback</li>
          <li class="pill-list__item">Fewer container shapes</li>
        </ul>
      </aside>
    </header>

    <section class="summary-rail" aria-label="Example summary">
      <article
        v-for="card in summaryCards"
        :key="card.label"
        class="summary-rail__item"
      >
        <p class="summary-rail__label">{{ card.label }}</p>
        <strong class="summary-rail__value">{{ card.value }}</strong>
        <p class="summary-rail__detail">{{ card.detail }}</p>
      </article>
    </section>

    <section class="examples-rail" aria-label="State examples">
      <section class="example-band example-band--onboarding">
        <div class="example-band__intro">
          <div class="example-band__meta">
            <p class="example-band__index">Example 01</p>
            <span class="example-band__tag">EmptyState</span>
          </div>
          <h2>Search empty state, reduced to the essentials</h2>
          <p>
            Inline layout keeps the data frame visible. The component still
            carries the interaction, but the page around it no longer behaves
            like a showcase card.
          </p>
          <ul class="chip-row" aria-label="Active filters">
            <li
              v-for="filter in activeFilters"
              :key="filter"
              class="chip-row__item"
            >
              {{ filter }}
            </li>
            <li v-if="!activeFilters.length" class="chip-row__item is-muted">
              Filters are clear, so the primary action is disabled.
            </li>
          </ul>
        </div>

        <div class="example-band__stage demo-theme demo-theme--graphite">
          <div class="frame-topline">
            <span>Name</span>
            <span>Collection</span>
            <span>Status</span>
            <span>Owner</span>
          </div>

          <EmptyState
            tone="brand"
            layout="inline"
            density="compact"
            title="No review-ready assets match this cut"
            description="Clear the current filters or save this view for the next editorial pass."
            :primary-action="searchPrimaryAction"
            :secondary-action="{
              label: 'Save view',
              onClick: saveView,
            }"
          />
        </div>
      </section>

      <section class="example-band">
        <div class="example-band__intro">
          <div class="example-band__meta">
            <p class="example-band__index">Example 02</p>
            <span class="example-band__tag">OnboardingState</span>
          </div>
          <h2>Onboarding as a launch hero, not a dressed-up empty state</h2>
          <p>
            This pass makes onboarding visibly different from the empty-state
            family. The host page now drives the lifecycle while the component
            gets a richer media slot, a layered action area, and a stronger
            first-run hierarchy.
          </p>
          <p id="launch-notes" class="example-band__footnote">
            Guided starts: {{ onboardingStarts }} · Demo workspace:
            {{ demoWorkspaceSeeded ? "Seeded" : "Not seeded yet" }}
          </p>
        </div>

        <div class="example-band__stage example-band__stage--onboarding">
          <template v-if="onboardingVisible">
            <OnboardingState
              tone="brand"
              layout="page"
              density="spacious"
              title="Launch the motion workspace with one guided first run"
              description="Show the team the product shape, seed the right starting context, and keep tutorial paths visible without collapsing back into a generic empty prompt."
            >
              <template #media>
                <div class="sk-onboarding-media">
                  <div class="sk-onboarding-media__header">
                    <div>
                      <p class="sk-onboarding-media__eyebrow">Launch surface</p>
                      <strong class="sk-onboarding-media__title">
                        Motion approvals board
                      </strong>
                    </div>
                    <span class="sk-onboarding-media__chip">Hero media slot</span>
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
                        <span class="is-active">Launch brief</span>
                        <span>Owners</span>
                        <span>Approvals</span>
                      </div>

                      <div class="sk-onboarding-media__stats">
                        <div class="sk-onboarding-media__stat">
                          <small>Starter tasks</small>
                          <strong>08</strong>
                        </div>
                        <div class="sk-onboarding-media__stat">
                          <small>Review lanes</small>
                          <strong>03</strong>
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
                      :aria-busy="onboardingPending ? 'true' : undefined"
                      :disabled="onboardingPending"
                      type="button"
                      @click="startWorkspaceSetup"
                    >
                      {{ onboardingPending ? "Preparing workspace..." : "Start guided setup" }}
                    </button>

                    <button
                      class="sk-shell__action is-secondary"
                      :disabled="onboardingPending"
                      type="button"
                      @click="seedDemoWorkspace"
                    >
                      {{ demoWorkspaceSeeded ? "Demo workspace seeded" : "Load demo workspace" }}
                    </button>
                  </div>

                  <div class="sk-onboarding-actions__secondary">
                    <a class="sk-shell__action is-secondary" href="#launch-notes">
                      Read launch guide
                    </a>
                    <a class="sk-shell__action is-secondary" href="#launch-notes">
                      View launch stats
                    </a>
                    <button
                      class="sk-onboarding-actions__skip"
                      :disabled="onboardingPending"
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
            <div id="launch-notes" class="launch-panel">
              <div class="launch-panel__copy">
                <p class="example-band__index">Host page state</p>
                <h3>Workspace surface unlocked outside the component</h3>
                <p>{{ onboardingStatusNote }}</p>
              </div>

              <div class="launch-panel__facts">
                <div class="launch-panel__fact">
                  <span>Visibility owner</span>
                  <strong>Host page</strong>
                </div>
                <div class="launch-panel__fact">
                  <span>Built-in persistence</span>
                  <strong>Not added</strong>
                </div>
                <div class="launch-panel__fact">
                  <span>Demo content</span>
                  <strong>{{ demoWorkspaceSeeded ? "Seeded" : "Clean" }}</strong>
                </div>
              </div>

              <div class="launch-panel__actions">
                <button class="launch-panel__button" type="button" @click="reopenOnboarding">
                  Show onboarding again
                </button>
                <a class="launch-panel__button is-secondary" href="#launch-notes">
                  Back to launch notes
                </a>
              </div>
            </div>
          </template>
        </div>
      </section>

      <section class="example-band">
        <div class="example-band__intro">
          <div class="example-band__meta">
            <p class="example-band__index">Example 03</p>
            <span class="example-band__tag">LoadingState</span>
          </div>
          <h2>Loading state as a quiet queue marker</h2>
          <p>
            Motion stays inside the component. The surrounding stage is only a
            thin runway, so the state does not have to compete with another card
            wrapped around it.
          </p>
          <p class="example-band__footnote">
            The hover language in this direction stays color-based. No lift, no
            wobble, no extra ornament.
          </p>
        </div>

        <div class="example-band__stage demo-theme demo-theme--mist">
          <div class="frame-topline frame-topline--compact">
            <span>Queue</span>
            <span>Operator</span>
            <span>Status</span>
          </div>

          <LoadingState
            tone="brand"
            layout="inline"
            density="compact"
            title="Refreshing the review digest"
            description="Pulling operator notes, scheduled sends, and approval changes into one pass."
          />
        </div>
      </section>

      <section class="example-band">
        <div class="example-band__intro">
          <div class="example-band__meta">
            <p class="example-band__index">Example 04</p>
            <span class="example-band__tag">PermissionState</span>
          </div>
          <h2>Permission state with one clear next step</h2>
          <p>
            The page keeps plenty of air around the component, but the decision
            path is still simple: one primary action, no extra visual scaffolding.
          </p>
          <p class="example-band__footnote">
            Access requests sent from this example: {{ accessRequests }}
          </p>
        </div>

        <div class="example-band__stage demo-theme demo-theme--sand">
          <PermissionState
            tone="warning"
            layout="panel"
            density="compact"
            title="You need finance approval to edit payouts"
            description="Ask a workspace admin to grant access before changing payout routing in this area."
            :primary-action="{
              label: 'Request access',
              onClick: requestAccess,
              loading: accessPending,
              loadingLabel: 'Sending request...',
            }"
            :secondary-action="null"
          />
        </div>
      </section>

      <section class="example-band">
        <div class="example-band__intro">
          <div class="example-band__meta">
            <p class="example-band__index">Example 05</p>
            <span class="example-band__tag">UpgradeState</span>
          </div>
          <h2>Upgrade state framed like a product decision</h2>
          <p>
            This version keeps the surface light and the copy direct, so the
            upsell reads like product guidance instead of another decorative box
            inside a bigger decorative box.
          </p>
          <p id="plan-notes" class="example-band__footnote">
            Billing workspaces opened from this example: {{ billingIntents }}
          </p>
        </div>

        <div class="example-band__stage demo-theme demo-theme--indigo">
          <UpgradeState
            tone="brand"
            layout="panel"
            density="compact"
            title="Unlock approval routing on the workflow plan"
            description="Move this workspace to the workflow tier to enable multi-step review, audit history, and route ownership."
            :primary-action="{
              label: 'Open billing workspace',
              onClick: openBilling,
              loading: billingPending,
              loadingLabel: 'Opening billing workspace...',
            }"
            :secondary-action="{
              label: 'Read plan notes',
              href: '#plan-notes',
            }"
          />
        </div>
      </section>

      <section class="example-band">
        <div class="example-band__intro">
          <div class="example-band__meta">
            <p class="example-band__index">Example 06</p>
            <span class="example-band__tag">ErrorState</span>
          </div>
          <h2>Error state with restrained urgency</h2>
          <p>
            The red accent stays narrow. The main signal is still the message
            and recovery action, not a page shell competing for attention.
          </p>
          <p id="activity-log" class="example-band__footnote">
            Sync retries triggered from this example: {{ retryCount }}
          </p>
        </div>

        <div class="example-band__stage demo-theme demo-theme--rose">
          <ErrorState
            tone="danger"
            layout="inline"
            density="compact"
            title="The content sync paused before completion"
            description="Retry the sync to finish pulling the latest edits and operator notes."
            :primary-action="{
              label: 'Retry sync',
              onClick: retrySync,
              loading: retryPending,
              loadingLabel: 'Retrying sync...',
            }"
            :secondary-action="{
              label: 'Open activity log',
              href: '#activity-log',
            }"
          />
        </div>
      </section>

      <section class="example-band example-band--full">
        <div class="example-band__intro">
          <div class="example-band__meta">
            <p class="example-band__index">Example 07</p>
            <span class="example-band__tag">SuccessState</span>
          </div>
          <h2>Success state with room to land, then move on</h2>
          <p>
            The full-page layout is still generous, but it now sits inside an
            open section instead of a framed card gallery. The state gets room
            without looking overdesigned.
          </p>
          <p id="return-to-queue" class="example-band__footnote">
            Release notes opened from this example: {{ releaseNotes }}
          </p>
        </div>

        <div class="example-band__stage example-band__stage--hero demo-theme demo-theme--forest">
          <SuccessState
            tone="success"
            layout="page"
            density="compact"
            title="The release brief is now live"
            description="Open the release notes, confirm the final links, or move directly into the next editorial cycle."
            :primary-action="{
              label: 'Open release notes',
              onClick: openReleaseNotes,
            }"
            :secondary-action="{
              label: 'Return to queue',
              href: '#return-to-queue',
            }"
          />
        </div>
      </section>
    </section>
  </main>
</template>
