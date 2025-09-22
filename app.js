const STORAGE_KEY = 'wstg-tracker-state-v1';
const filterState = {
  searchTerm: '',
  categoryId: 'all',
  status: 'all',
};
let filterContainer = null;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return typeof parsed === 'object' && parsed ? parsed : {};
  } catch (error) {
    console.error('Failed to parse stored state', error);
    return {};
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function createStatusSelect(current) {
  const select = document.createElement('select');
  select.className = 'status-select';
  STATUS_OPTIONS.forEach((option) => {
    const opt = document.createElement('option');
    opt.value = option.value;
    opt.textContent = option.label;
    if (option.value === current) opt.selected = true;
    select.appendChild(opt);
  });
  return select;
}

function createStatusIndicator(statusValue) {
  const indicator = document.createElement('span');
  indicator.className = `status-indicator status-${statusValue.replace(/\s+/g, '-')}`;
  indicator.dataset.value = statusValue;
  const label = STATUS_OPTIONS.find((option) => option.value === statusValue)?.label || statusValue;
  indicator.textContent = label;
  return indicator;
}

function updateProgress(state) {
  const progressText = document.getElementById('progress-text');
  const progressBarFill = document.getElementById('progress-bar-fill');

  const counts = STATUS_OPTIONS.reduce(
    (acc, option) => ({ ...acc, [option.value]: 0 }),
    { total: TOTAL_TESTS }
  );

  Object.values(state).forEach((entry) => {
    if (entry.status && counts[entry.status] !== undefined) {
      counts[entry.status] += 1;
    }
  });

  const assignedWithoutDefault = STATUS_OPTIONS.filter((option) => option.value !== 'not started').reduce(
    (sum, option) => sum + (counts[option.value] || 0),
    0
  );

  counts['not started'] = Math.max(0, TOTAL_TESTS - assignedWithoutDefault);

  const doneCount = counts.done || 0;
  const percent = TOTAL_TESTS ? Math.round((doneCount / TOTAL_TESTS) * 100) : 0;

  progressBarFill.style.width = `${percent}%`;
  const statusSummary = STATUS_OPTIONS.map((option) => `${option.label}: ${counts[option.value] || 0}`).join(' • ');
  progressText.textContent = `${doneCount} / ${TOTAL_TESTS} completed (${percent}%). ${statusSummary}`;
}

function createTestCard(categoryId, test, state, stateUpdater) {
  const card = document.createElement('article');
  card.className = 'test-card';
  card.dataset.testId = test.id;
  card.dataset.categoryId = categoryId;

  const header = document.createElement('div');
  const title = document.createElement('h3');
  title.textContent = `${test.id}: ${test.title}`;
  header.appendChild(title);

  const summary = document.createElement('p');
  summary.textContent = test.summary;
  summary.className = 'test-summary';
  header.appendChild(summary);

  const meta = document.createElement('div');
  meta.className = 'test-meta';
  meta.appendChild(createStatusIndicator((state[test.id]?.status) || 'not started'));

  const select = createStatusSelect(state[test.id]?.status || 'not started');
  select.addEventListener('change', () => {
    stateUpdater(test.id, { status: select.value });
    meta.replaceChildren(createStatusIndicator(select.value));
  });

  const selectWrapper = document.createElement('div');
  selectWrapper.appendChild(select);

  const notesWrapper = document.createElement('div');
  notesWrapper.className = 'notes';
  const notesLabel = document.createElement('label');
  notesLabel.textContent = 'Notes';
  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Record findings, payloads, or next steps...';
  textarea.value = state[test.id]?.notes || '';
  textarea.addEventListener('input', () => {
    stateUpdater(test.id, { notes: textarea.value });
  });
  notesLabel.appendChild(textarea);
  notesWrapper.appendChild(notesLabel);

  card.append(header, meta, selectWrapper, notesWrapper);
  return card;
}

function renderCategories(container, state, stateUpdater) {
  container.innerHTML = '';
  TEST_CATEGORIES.forEach((category) => {
    const block = document.createElement('section');
    block.className = 'category-block';
    block.dataset.categoryId = category.id;

    const header = document.createElement('div');
    header.className = 'category-header';

    const title = document.createElement('h2');
    title.textContent = category.name;
    header.appendChild(title);

    const count = document.createElement('span');
    count.textContent = `${category.tests.length} tests`;
    header.appendChild(count);

    block.appendChild(header);

    category.tests.forEach((test) => {
      const card = createTestCard(category.id, test, state, stateUpdater);
      block.appendChild(card);
    });

    container.appendChild(block);
  });
}

function applyFiltersFromState() {
  if (!filterContainer) return;
  const normalizedSearch = filterState.searchTerm.trim().toLowerCase();
  const cards = filterContainer.querySelectorAll('.test-card');

  cards.forEach((card) => {
    const matchesCategory = filterState.categoryId === 'all' || card.dataset.categoryId === filterState.categoryId;
    const statusIndicator = card.querySelector('.status-indicator');
    const currentStatus = statusIndicator ? statusIndicator.dataset.value : 'not started';
    const matchesStatus = filterState.status === 'all' || currentStatus === filterState.status;
    const text = card.textContent.toLowerCase();
    const matchesSearch = !normalizedSearch || text.includes(normalizedSearch);

    card.style.display = matchesCategory && matchesStatus && matchesSearch ? '' : 'none';
  });
}

function initFilters() {
  const categoryFilter = document.getElementById('category-filter');
  const statusFilter = document.getElementById('status-filter');
  const searchInput = document.getElementById('search-input');

  categoryFilter.innerHTML = '<option value="all">All categories</option>';
  TEST_CATEGORIES.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    categoryFilter.appendChild(option);
  });

  statusFilter.innerHTML = '<option value="all">All statuses</option>';
  STATUS_OPTIONS.forEach((status) => {
    const option = document.createElement('option');
    option.value = status.value;
    option.textContent = status.label;
    statusFilter.appendChild(option);
  });

  searchInput.value = filterState.searchTerm;
  categoryFilter.value = filterState.categoryId;
  statusFilter.value = filterState.status;

  searchInput.addEventListener('input', (event) => {
    filterState.searchTerm = event.target.value;
    applyFiltersFromState();
  });

  categoryFilter.addEventListener('change', (event) => {
    filterState.categoryId = event.target.value;
    applyFiltersFromState();
  });

  statusFilter.addEventListener('change', (event) => {
    filterState.status = event.target.value;
    applyFiltersFromState();
  });

  applyFiltersFromState();
}

function initPersistence(state, updateState) {
  document.getElementById('export-button').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `wstg-tracker-export-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  });

  document.getElementById('import-input').addEventListener('change', (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      try {
        const parsed = JSON.parse(loadEvent.target?.result ?? '{}');
        if (typeof parsed !== 'object' || Array.isArray(parsed) || parsed === null) {
          throw new Error('Invalid format');
        }
        Object.keys(parsed).forEach((key) => {
          const { status, notes } = parsed[key];
          updateState(key, { status, notes }, { silent: true });
        });
        saveState(state);
        renderCategories(filterContainer, state, updateState);
        applyFiltersFromState();
        updateProgress(state);
      } catch (error) {
        alert('Import failed: invalid JSON file.');
        console.error(error);
      } finally {
        event.target.value = '';
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('reset-button').addEventListener('click', () => {
    if (confirm('This will clear all saved progress. Continue?')) {
      Object.keys(state).forEach((key) => delete state[key]);
      saveState(state);
      renderCategories(filterContainer, state, updateState);
      applyFiltersFromState();
      updateProgress(state);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const state = loadState();

  const updateState = (testId, changes, options = {}) => {
    const existing = state[testId] || {};
    const next = { ...existing, ...changes };
    if (!next.status) next.status = 'not started';
    state[testId] = next;
    if (!options.silent) {
      saveState(state);
      updateProgress(state);
      applyFiltersFromState();
    }
  };

  filterContainer = document.getElementById('tests-container');
  renderCategories(filterContainer, state, updateState);
  initFilters();
  updateProgress(state);
  initPersistence(state, updateState);
});
