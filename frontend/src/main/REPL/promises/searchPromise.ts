
import { REPLFunction } from "../REPLFunction";
import { buildHtmlTable} from "../csv2Table";

/**
 * REPL function to call API for searching for a string in the CSV file.
 * 
 * @param args : arguments to the REPL function
 * @returns a Promise that returns a string to be added to the History window.
 */

export const searchPromise :  REPLFunction = args => {
    return new Promise<string>
        ((resolve, reject) => {
          // Request needs at least a search term and an indicator as to whether the CSV has headers - column name/index is optional
            if (args.length >= 2) {

              try {
                let searchTerm;
                let hasHeaders;
                // If there are two arguments, the user has left out the optional col parameter
                args.length === 2 ? searchTerm = args[0] : searchTerm = args[1];
                args.length === 2 ? hasHeaders = args[1] : hasHeaders = args[2];
                if (!(hasHeaders === "y") && !(hasHeaders === "n")) {
                  reject("Please double check your parameters. The last argument should be either 'y' or 'n' depending on whether your file has headers.");
                }
                // Generate a different URL based on whether the user specified a column name/index
                fetch(args.length === 3
                    ? "http://localhost:3232/searchcsv?searchterm=" + `${searchTerm}` + "&hasheaders=" + `${hasHeaders}` + "&col=" + `${args[0]}`
                    : "http://localhost:3232/searchcsv?searchterm=" + `${searchTerm}` + "&hasheaders=" + `${hasHeaders}`
                )
                .then(response => response.json())
                .then(responseObject => {
                  // Reject if the API returned an error
                    if (responseObject.result.includes("error")) {
                        reject(`An error occurred while searching the file: ${responseObject.message}`);
                        return;
                      } else {
                        const csvData= responseObject.data;
                        if (csvData.length === 0) {
                          resolve('No results found');
                        } else {
                          // Show results as a table
                          resolve("Showing search results <br>"+  buildHtmlTable(responseObject.data));
                        }
                      }
                })
                .catch((error) => {
                  reject(error);
                  return;
                });
              } catch (ex: any) {
                reject(ex.message);
                return;
              }
                // If the user provided either one or no arguments
            }  else {
                reject("Incorrect number of parameters.");
                return;
            }

        });
}
