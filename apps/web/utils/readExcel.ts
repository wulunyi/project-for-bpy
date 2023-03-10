import Excel from 'exceljs';
import { map, times } from 'lodash-es';

export interface Sheet {
  name: string;
  rows: unknown[][];
}

export async function readExcel(file?: File): Promise<Sheet[]> {
  if (!file) return [];

  const workbook = new Excel.Workbook();
  const buffer = await file.arrayBuffer();
  await workbook.xlsx.load(buffer);

  return map(workbook.worksheets, (worksheet) => {
    return {
      name: worksheet.name,
      rows: times(worksheet.rowCount, (rowIndex) => {
        return times(worksheet.columnCount, (fieldIndex) => {
          return worksheet.getRow(rowIndex).getCell(fieldIndex + 1)?.text;
        })
      })
    }
  });
}