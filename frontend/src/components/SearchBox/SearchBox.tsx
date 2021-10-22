import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const SearchBox = () => {
  return (
    <Box display="flex" alignItems="flex-end">
      <SearchIcon sx={{ mr: 1, my: 0.5 }} />
      <TextField label="Search" variant="standard" />
    </Box>
  );
};

export default SearchBox;
