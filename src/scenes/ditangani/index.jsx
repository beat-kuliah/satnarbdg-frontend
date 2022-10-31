import { useState, useEffect } from "react";
import { Box, useTheme, Modal, Button, IconButton, TextField, Alert, AlertTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import CloseIcon from '@mui/icons-material/Close';
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DesktopDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

const checkoutSchema = yup.object().shape({
    identitas: yup.number().integer().required("required"),
    umur: yup.number().integer().required("required"),
    nama: yup.string().required("required"),
    tkp: yup.string().required("required"),
    pasal: yup.string().required("required"),
    alamat: yup.string().required("required"),
});

const initialValues = {
    identitas: "",
    umur: "",
    nama: "",
    tkp: "",
    pasal: "",
    alamat: "",
    date: "2022-04-07",
};

const Tahanan = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [tahanan, setTahanan] = useState([]);
    const [openForm, setOpenForm] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [date, setDate] = useState(dayjs('2022-04-07'));

    const handleFormSubmit = (values) => {
        values.date = date['$y'] + '-' + date['$D'] + '-' + (date['$M'] + 1);
        console.log(JSON.stringify(values, null, 2));
        setOpenSuccess(true);
    };

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "tahanan")
            .then(res => res.json())
            .then(
                (result) => {
                    setTahanan(result);
                },
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
            <Box display="flex" justifyContent="space-between">
                <Header title="Tahanan" subtitle="Tahanan" />
                <Box mb="30px">
                    <Button
                        onClick={handleOpenForm}
                        color="secondary"
                        variant="contained"
                    >Tambah Tahanan</Button>
                    <Modal
                        open={openForm}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                    >
                        <Box sx={{ ...style, width: 700 }}>
                            <Box display="flex" justifyContent="space-between">
                                <Box>
                                    <h2 id="parent-modal-title">Tambah Tahanan</h2>
                                </Box>
                                <Box>
                                    <IconButton onClick={handleCloseForm}>
                                        <CloseIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                            <Formik
                                onSubmit={handleFormSubmit}
                                initialValues={initialValues}
                                validationSchema={checkoutSchema}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleBlur,
                                    handleChange,
                                    handleSubmit,
                                }) => (
                                    <form onSubmit={handleSubmit}>
                                        <Box
                                            display="grid"
                                            gap="30px"
                                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                            sx={{
                                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                            }}
                                        >
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="number"
                                                label="Identitas"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.identitas}
                                                name="identitas"
                                                error={!!touched.identitas && !!errors.identitas}
                                                helperText={touched.identitas && errors.identitas}
                                                sx={{ gridColumn: "span 1" }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="number"
                                                label="Umur"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.umur}
                                                name="umur"
                                                error={!!touched.umur && !!errors.umur}
                                                helperText={touched.umur && errors.umur}
                                                sx={{ gridColumn: "span 1" }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Nama"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.nama}
                                                name="nama"
                                                error={!!touched.nama && !!errors.nama}
                                                helperText={touched.nama && errors.nama}
                                                sx={{ gridColumn: "span 2" }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="TKP"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.tkp}
                                                name="tkp"
                                                error={!!touched.tkp && !!errors.tkp}
                                                helperText={touched.tkp && errors.tkp}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Pasal"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.pasal}
                                                name="pasal"
                                                error={!!touched.pasal && !!errors.pasal}
                                                helperText={touched.pasal && errors.pasal}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                label="Alamat"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.alamat}
                                                name="alamat"
                                                error={!!touched.alamat && !!errors.alamat}
                                                helperText={touched.alamat && errors.alamat}
                                                sx={{ gridColumn: "span 4" }}
                                            />
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                    label="For desktop"
                                                    value={date}
                                                    minDate={dayjs('2017-01-01')}
                                                    onChange={(newValue) => {
                                                        setDate(newValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} />}
                                                />
                                            </LocalizationProvider>
                                        </Box>
                                        <Box display="flex" justifyContent="end" mt="20px">
                                            <Button type="submit" color="secondary" variant="contained">
                                                Create New User
                                            </Button>
                                        </Box>
                                    </form>
                                )}
                            </Formik>
                        </Box>
                    </Modal>
                    <Modal
                        open={openSuccess}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                    >
                        <Box sx={{ ...style, width: "auto" }}>
                            <Alert severity="success">
                                <AlertTitle>Berhasil menambah tahanan</AlertTitle>
                            </Alert>
                            <Box display="flex" justifyContent="space-between">
                                <Box>
                                </Box>
                                <Box>
                                    <Button
                                        color="secondary"
                                        variant="contained"
                                        href="/perkara_ditangani"
                                    >Close</Button>
                                </Box>
                            </Box>
                        </Box>
                    </Modal>
                </Box>
            </Box>
            <Box
                m="20px 0 0 0"
                height="75vh"
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