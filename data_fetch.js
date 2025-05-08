fetch('/data/vielas.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((jsonData) => {
    const tableBody = document.querySelector('#data-table tbody');

    jsonData.forEach((row) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.nosaukums}</td>
      <td>${row.tips}</td>
      <td>${row.apakstips}</td>
      <td>${row.skaits}</td>
      <td>${row.daudzums} ${row.mervienibas}</td>
      <td>${row.komentari}</td>
    `;
      tableBody.appendChild(tr);
    });
  })
  .catch((error) => {
    console.error('Error loading JSON:', error);
  });

fetch('/data/inventars.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((jsonData) => {
    const tableBody = document.querySelector('#data-table tbody');

    jsonData.forEach((row) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.nosaukums}</td>
      <td>${row.tips}</td>
      <td>${row.apakstips}</td>
      <td>${row.skaits}</td>
      <td></td>
      <td>${row.komentari}</td>
    `;
      tableBody.appendChild(tr);
    });
  })
  .catch((error) => {
    console.error('Error loading JSON:', error);
  });
