// 2024-03-07 autor: https://www.werner-zenk.de/javascript/html-tabelle_als_csv-datei_exportieren.php
// HTML-Tabelle als CSV-Datei exportieren

document.addEventListener('DOMContentLoaded', function() {
  const table = document.getElementById('result_table');
  const exportBtn = document.getElementById('export');

  const toCsv = function(table) {
    const rows = table.querySelectorAll('tr');

    return [].slice.call(rows)
      .map(function(row) {
        const cells = row.querySelectorAll('th,td');
        return [].slice.call(cells)
          .map(function(cell) {
            return cell.textContent;
          })
          .join(',');
      })
      .join('\n');
  };

  const download = function(text, fileName) {
    const link = document.createElement('a');
    link.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(text)}`);
    link.setAttribute('download', fileName);

    link.style.display = 'none';
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };

  exportBtn.addEventListener('click', function() {
    const csv = toCsv(table);

    download(csv, 'result_grid_contains_arrival_times.csv');
  });
});