const dataCache = {
  vielas: [],
  inventars: [],
};

const headerLabels = {
  id: 'ID',
  tips: 'Tips',
  apakstips: 'Apakštips',
  nosaukums: 'Nosaukums',
  skaits: 'Skaits',
  daudzums: 'Daudzums',
  mervienibas: 'Mērvienības',
  komentari: 'Komentāri',
};

let currentView = 'both';
let currentSearch = '';

function fetchData() {
  Promise.all([
    fetch('/data/vielas.json').then((r) => r.json()),
    fetch('/data/inventars.json').then((r) => r.json()),
  ])
    .then(([vielas, inventars]) => {
      dataCache.vielas = vielas;
      dataCache.inventars = inventars;
      render();
    })
    .catch((err) => {
      console.error('Error loading data:', err);
    });
}

function render() {
  let data = [];

  if (currentView === 'vielas') {
    data = dataCache.vielas;
  } else if (currentView === 'inventars') {
    data = dataCache.inventars;
  } else {
    data = [...dataCache.vielas, ...dataCache.inventars];
  }

  // Add search filter
  if (currentSearch.trim()) {
    const query = currentSearch.toLowerCase();
    data = data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(query)
      )
    );
  }

  // Sort by ID
  data.sort((a, b) => a.id.localeCompare(b.id));

  renderTable(data);
}

function renderTable(data) {
  const table = document.getElementById('data-table');
  const thead = table.querySelector('thead');
  const tbody = table.querySelector('tbody');

  tbody.innerHTML = '';
  thead.innerHTML = '';

  if (!data.length) {
    thead.innerHTML = '<tr><th>No data</th></tr>';
    return;
  }

  // Define the full column order & ID
  const columns = [
    'id',
    'tips',
    'apakstips',
    'nosaukums',
    'skaits',
    'daudzums',
    'mervienibas',
    'komentari',
  ];

  // Build header
  const headerRow = document.createElement('tr');
  columns.forEach((key) => {
    const th = document.createElement('th');
    th.textContent = headerLabels[key] || key;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);

  // Build rows
  data.forEach((row) => {
    const tr = document.createElement('tr');
    columns.forEach((key) => {
      const td = document.createElement('td');
      td.textContent = row[key] ?? '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Event listeners for buttons
document.getElementById('show-vielas').addEventListener('click', () => {
  currentView = 'vielas';
  render();
});

document.getElementById('show-inventars').addEventListener('click', () => {
  currentView = 'inventars';
  render();
});

document.getElementById('show-both').addEventListener('click', () => {
  currentView = 'both';
  render();
});

document.getElementById('search-box').addEventListener('input', (e) => {
  currentSearch = e.target.value;
  render();
});

fetchData();
