import {
  Box,
  Container,
  IconButton,
  InputLabel,
  Pagination,
  Paper,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
interface Book {
  name: string;
  language: string;
  category: string;
  available: number;
  [key: string]: string | number; // Index signature for dynamic property access
}

const booksList: Book[] = [
  {
    name: "ارض زيكولا",
    language: "Arabic",
    category: "Fantasy",
    available: 150,
  },
  {
    name: "The Shining Stars",
    language: "English",
    category: "Science Fiction",
    available: 120,
  },
  {
    name: "المتاهة السحرية",
    language: "Arabic",
    category: "Adventure",
    available: 80,
  },
  {
    name: "Beyond the Horizon",
    language: "English",
    category: "Mystery",
    available: 200,
  },
  {
    name: "في عالم آخر",
    language: "Arabic",
    category: "Science Fiction",
    available: 90,
  },
  {
    name: "Lost in Time",
    language: "English",
    category: "Adventure",
    available: 110,
  },
  {
    name: "المملكة السحرية",
    language: "Arabic",
    category: "Fantasy",
    available: 60,
  },
  {
    name: "Echoes of Silence",
    language: "English",
    category: "Drama",
    available: 180,
  },
  {
    name: "الألغاز المفقودة",
    language: "Arabic",
    category: "Mystery",
    available: 100,
  },
  {
    name: "Whispers in the Wind",
    language: "English",
    category: "Fantasy",
    available: 150,
  },
];

const AllBooks = () => {
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const handlePage = (page: number): void => setPage(page);
  const totalPages: number = Math.ceil(booksList.length / pageSize);
  const [pageContent, setPageContent] = useState(booksList.slice((page - 1) * pageSize, page * pageSize));
  const handleSearchInputChange = (searchInput: string) => {
    const trimmedInput = searchInput.trim().toLowerCase();

    if (trimmedInput === "") {
      setPageContent(booksList);
    } else {
      const filteredBooks = booksList.filter((book) => book.name.toLowerCase().includes(trimmedInput));
      setPageContent(filteredBooks);
    }
  };

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<string | number>("name");

  const handleRequestSort = (property: string | number) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);

    const sortedBooks = [...booksList].sort((a, b) => {
      if (isAsc) {
        if (typeof a[property] === "string" && typeof b[property] === "string") {
          return (a[property] as string).localeCompare(b[property] as string);
        } else if (typeof a[property] === "number" && typeof b[property] === "number") {
          return (a[property] as number) - (b[property] as number);
        }
      } else {
        if (typeof a[property] === "string" && typeof b[property] === "string") {
          return (b[property] as string).localeCompare(a[property] as string);
        } else if (typeof a[property] === "number" && typeof b[property] === "number") {
          return (b[property] as number) - (a[property] as number);
        }
      }

      // Handle other cases or return a default value
      return 0;
    });

    setPageContent(sortedBooks.slice((page - 1) * pageSize, page * pageSize));
  };

  return (
    <>
      <Container sx={{ paddingTop: 2 }}>
        <Box sx={{ padding: 2 }}>
          <Typography variant="h3">Inventory</Typography>
        </Box>
        <Box component={Paper} sx={{ borderRadius: 5, padding: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", paddingBottom: 4 }}>
            <TextField
              size="small"
              InputProps={{
                startAdornment: <SearchIcon sx={{ paddingRight: 1 }} />,
              }}
              placeholder="Search By Books Name"
              onChange={(e) => {
                handleSearchInputChange(e.target.value);
              }}
            />
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: 2, backgroundColor: "transparent", boxShadow: "none" }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">
                    <TableSortLabel active={orderBy === "name"} direction={order} onClick={() => handleRequestSort("name")}>
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel active={orderBy === "category"} direction={order} onClick={() => handleRequestSort("category")}>
                      Category
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel active={orderBy === "language"} direction={order} onClick={() => handleRequestSort("language")}>
                      Language
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">
                    <TableSortLabel active={orderBy === "available"} direction={order} onClick={() => handleRequestSort("available")}>
                      Available
                    </TableSortLabel>
                  </TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageContent.map((row) => (
                  <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">
                      <InputLabel sx={{ backgroundColor: "#edf1f3" }}>{row.language}</InputLabel>
                    </TableCell>
                    <TableCell align="center">{row.available}</TableCell>
                    <TableCell align="center">
                      <IconButton sx={{ backgroundColor: "#62b5e3", marginRight: "8px" }} size="small">
                        <SvgIcon>
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z"
                                stroke="#000000"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>{" "}
                              <path d="M21 21H12" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{" "}
                            </g>
                          </svg>
                        </SvgIcon>
                      </IconButton>
                      <IconButton sx={{ backgroundColor: "#e63534", marginRight: "8px" }} size="small">
                        <SvgIcon>
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>{" "}
                            </g>
                          </svg>
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Pagination
              shape="rounded"
              sx={{ padding: 3 }}
              color="primary"
              count={totalPages}
              onChange={(event, value) => handlePage(value)}
              page={page}
              size="medium"
            />
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default AllBooks;
