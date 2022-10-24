import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Tahanan = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [tahanan, setTahanan] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "tahanan")
          .then(res => res.json())
          .then(
            (result) => {
                setTahanan(result);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                setTahanan(error);
            }
          )
      }, [])

    const columns = [
        { field: "nik", headerName: "NIK" },
        {
            field: "name",
            headerName: "Nama Tersangka",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "umur",
            headerName: "Umur",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "pasal",
            headerName: "Pasal",
            flex: 1
        },
        {
            field: "diff",
            headerName: "Lama Penahanan",
            flex: 1
        },
        {
            field: "penyidik",
            headerName: "Penyidik",
            flex: 1,
            valueGetter: (params) =>
                `${params.row.penyidik.name}`,
        },
    ]

    return (
        <Box m="20px">
            <Header title="Tahanan" subtitle="Tahanan" />
            <Box
                m="40px 0 0 0"
                height ="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                }}
            >
                <DataGrid rows={tahanan} columns={columns} />
            </Box>
        </Box>
    )
}

export default Tahanan