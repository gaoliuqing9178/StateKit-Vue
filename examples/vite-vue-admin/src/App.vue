<script setup lang="ts">
import { computed, ref } from "vue";
import {
  EmptyState,
  ErrorState,
  LoadingState,
  PermissionState,
  SuccessState,
  UpgradeState,
} from "@statekit-vue/vue";

const activeFilters = ref(["Status: Needs review", "Owner: Motion"]);
const savedViews = ref(4);
const accessRequests = ref(2);
const billingIntents = ref(3);
const releaseNotes = ref(6);
const retryCount = ref(0);
const accessPending = ref(false);
const billingPending = ref(false);
const retryPending = ref(false);

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
    label: "Saved Views",
    value: String(savedViews.value).padStart(2, "0"),
    detail: "Empty-state secondary actions still feel useful in the lighter, quieter layout.",
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
      <section class="example-band">
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
            <p class="example-band__index">Example 03</p>
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
            <p class="example-band__index">Example 04</p>
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
            <p class="example-band__index">Example 05</p>
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
            <p class="example-band__index">Example 06</p>
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
