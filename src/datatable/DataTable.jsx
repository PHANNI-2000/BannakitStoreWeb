import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ rows, columns }) {
  return (
    <Paper
      sx={{ height: 400, width: "100%", padding: "0 16px", margin: "16px 0" }}
    >
      <DataGrid
        rows={rows}
        getRowId={(row) => row.prod_id}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{
          border: 0,
          "& .MuiDataGrid-root": {
            overflowX: "auto",
            minWidth: 300,
            maxWidth: "100%", // จำกัดขนาดความกว้างของตาราง
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none", // ปิด outline เมื่อมีการ focus
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none", // ปิด outline เมื่อมีการ focus ด้วย
          },
        }}
      />
    </Paper>
  );
}
