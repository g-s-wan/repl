/**
 * Function that converts a CSV (expressed as a 2D array of strings) to an HTML table
 * @param csvDataset - the CSV that will be turned into an HTML table
 */
export function buildHtmlTable(csvDataset: string[][]) {
    // Nothing to do if we provide a null or string parameter
    if ((csvDataset == null) || (typeof(csvDataset) == "string")) {
        return "";
    }

    // Allow adjusting the column width
    const colCount = 1 + csvDataset[0].length;

    // The HTML for the table
    let tableHTML = '<table class="response-table" role="table">';


    // Now add the data rows
    //    <tr>
    //          <td> Value 1 </td>
    //          <td> Value 2 </td>
    //          <td> Value 3 </td>
    //    </tr>
    csvDataset.forEach(row => {
        tableHTML += '<tr>';
        row.forEach(value => {
            tableHTML += '<td role="cell" style = "width: ' + (100/colCount) + '%" >' + value +'</td>';
        });
        tableHTML += '</tr>';
    });

    tableHTML += "</table><br>";

    return tableHTML;
  }