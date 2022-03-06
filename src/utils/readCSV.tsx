import Papa from "papaparse";

export const readCSV = async (filePath: string) => {
  const response = await fetch(filePath);
  const csv = await response.text();
  return new Promise((resolve) => {
    Papa.parse(csv, {
      header: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
};
