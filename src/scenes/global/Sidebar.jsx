import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import InventoryIcon from "@mui/icons-material/Inventory";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import CasesIcon from "@mui/icons-material/Cases";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CircleIcon from '@mui/icons-material/Circle';
import AttachmentIcon from '@mui/icons-material/Attachment';
import PsychologyIcon from '@mui/icons-material/Psychology';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const pathname = (window.location.pathname).split("/");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selected, setSelected] = useState(() => {
    if(pathname[1] === "anggota"){
      return "Anggota";
    }else if(pathname[1] === "barang_inventaris"){
      return "Barang Inventaris";
    }else if(pathname[1] === "perkara_ditangani"){
      return "Perkara Ditangani";
    }else if(pathname[1] === "tahanan"){
      return "Jumlah Tahanan";
    }else if(pathname[1] === "rencana"){
      return "Rencana Kegiatan";
    }else if(pathname[1] === "lampiran"){
      return "Lampiran Kegiatan";
    }else if(pathname[1] === "bukti"){
      return "Barang Bukti";
    }else if(pathname[1] === "Referensi"){
      return "referensi";
    }else{
      return "Dashboard"
    }
  });
  const [isCollapsed, setIsCollapsed] = useState(false);
  

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  Satuan Narkoba
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Anggota"
              to="/anggota"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Barang Inventaris"
              to="/barang_inventaris"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Perkara Ditangani"
              to="/perkara_ditangani"
              icon={<CasesIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Jumlah Tahanan"
              to="/tahanan"
              icon={<CircleIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Rencana Kegiatan"
              to="/rencana"
              icon={<LocalActivityIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Lampiran Kegiatan"
              to="/lampiran"
              icon={<AttachmentIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Barang Bukti"
              to="/bukti"
              icon={<InventoryIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Referensi"
              to="/referensi"
              icon={<PsychologyIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;