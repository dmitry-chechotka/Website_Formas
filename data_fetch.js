// Define which columns to render and how to extract values from each row
const columnExtractors = [
  (row) => row.id ?? '',
  (row) => row.nosaukums ?? '',
  (row) => row.tips ?? '',
  (row) => row.apakstips ?? '',
  (row) => row.skaits ?? '',
  (row) => {
    const daudzums = row.daudzums ?? '';
    const mervienibas = row.mervienibas ?? '';
    return daudzums || mervienibas ? `${daudzums} ${mervienibas}`.trim() : '';
  },
  (row) => row.komentari ?? '',
];

// List of data sources to fetch and render
const dataSources = ['/data/vielas.json', '/data/inventars.json'];

// Function to fetch a JSON file and render its data into the table
/**
 * Description
 * @param {any} url
 * @returns {any}
 * TODO:
 * Change this in a shorter and more readable way.
 * - You can just add the Mērvienības as an extra column in the html,
 * or just put both values as a single string in the jsons
 * - Or think of new logic
 *
 */

function fetchAndRenderData(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}`);
      }
      return response.json();
    })
    .then((data) => {
      const tableBody = document.querySelector('#data-table tbody');

      data.forEach((row) => {
        const tr = document.createElement('tr');

        columnExtractors.forEach((extractor) => {
          const td = document.createElement('td');
          td.textContent = extractor(row);
          tr.appendChild(td);
        });

        tableBody.appendChild(tr);
      });
    })
    .catch((error) => {
      console.error(`Error loading ${url}:`, error);
    });
}

// Fetch and render data from each source
dataSources.forEach(fetchAndRenderData);
