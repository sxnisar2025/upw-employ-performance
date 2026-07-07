import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export function exportReportToExcel(records, employees, accounts) {
  const data = records.map((record) => {
    const account = accounts.find(
      (a) => a.id === record.accountId
    );

    const employee = employees.find(
      (e) => e.id === account?.employeeId
    );

    return {
      Date: record.date,
      Employee: employee?.name || "",
      Account: account?.name || "",

      "Connect Cost": record.connectCost,

      "Gross Earn": record.grossEarn,

      Received: record.receivedAmount,

      Pending: record.pendingAmount,

      "Gross Profit":
        record.grossEarn - record.connectCost,

      "Net Profit":
        record.receivedAmount - record.connectCost,

      Notes: record.notes || "",
    };
  });

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Upwork Report"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, `Upwork_Report_${Date.now()}.xlsx`);
}