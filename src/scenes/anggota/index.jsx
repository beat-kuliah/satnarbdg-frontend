import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";

const Anggota = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [penyidik, setPenyidik] = useState([]);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "penyidik")
          .then(res => res.json())
          .then(
            (result) => {
                setPenyidik(result);
            },
            (error) => {
                setPenyidik(error);
            }
          )
      }, [])

    const columns = [
        { field: "id", headerName: "ID" },
        {
            field: "nrp",
            headerName: "NRP",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "telp",
            headerName: "Phone Number",
            flex: 1
        },
    ]

    return (
        <Box m="20px">
            <Header title="Anggota" subtitle="Anggota" />
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
                <DataGrid rows={penyidik} columns={columns} />
            </Box>
        </Box>
    )
}

export default Anggota