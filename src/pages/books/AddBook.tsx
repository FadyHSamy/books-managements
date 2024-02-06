import { Container, Box, Typography, Grid, Paper, TextField, Button, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bookApi from "../../api/bookApi";
import languageApi from "../../api/languageApi";
import { booksGenreResponse } from "../../models/books/genre";
import { getAllLanguagesResponse } from "../../models/languages/languages";

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const returnButton = () => navigate("/all-books");
  const [bookGenreResponse, setBookGenreResponse] = useState<booksGenreResponse[]>([]);
  const [languagesResponse, setLanguagesResponse] = useState<getAllLanguagesResponse[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const genreResponse = await bookApi.getBooksGenre();
      setBookGenreResponse(genreResponse);
      const languagesResponse = await languageApi.getAllLanguages();
      setLanguagesResponse(languagesResponse.data);
    };
    fetchData();
  }, []);

  const [inputValues, setInputValues] = useState<{
    bookName: string;
    author: string;
    category: string;
    publisher: string;
    publishDate: string;
    language: string;
    price: string;
  }>({
    bookName: "",
    author: "",
    category: "",
    publisher: "",
    publishDate: "",
    language: "",
    price: "",
  });
  const handleInputChange = (inputName: any, value: any) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [inputName]: value,
    }));
  };

  return (
    <>
      <Container sx={{ paddingTop: 2 }}>
        <Box sx={{ padding: 2 }} display="flex" justifyContent="space-between">
          <Typography variant="h3">Adding Book</Typography>
        </Box>
        <Grid container component={Paper} sx={{ paddingTop: 0, paddingBottom: 3, paddingRight: 3 }} spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="bookName"
              variant="outlined"
              margin="normal"
              fullWidth
              value={inputValues.bookName}
              onChange={(e) => handleInputChange("bookName", e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="author"
              variant="outlined"
              margin="normal"
              fullWidth
              value={inputValues.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Category"
              variant="outlined"
              margin="normal"
              fullWidth
              size="small"
              value={inputValues.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
            >
              {bookGenreResponse.map((genre) => (
                <MenuItem key={genre._id} value={genre.genre}>
                  {genre.genre}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Publisher"
              variant="outlined"
              margin="normal"
              fullWidth
              value={inputValues.publisher}
              onChange={(e) => handleInputChange("publisher", e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Publish Date"
              variant="outlined"
              margin="normal"
              fullWidth
              value={inputValues.publishDate}
              onChange={(e) => handleInputChange("publishDate", e.target.value)}
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Language"
              variant="outlined"
              margin="normal"
              fullWidth
              value={inputValues.language}
              onChange={(e) => handleInputChange("language", e.target.value)}
              size="small"
            >
              {languagesResponse.map((lang) => (
                <MenuItem key={lang._id} value={lang._id}>
                  {lang.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Price"
              variant="outlined"
              margin="normal"
              fullWidth
              value={inputValues.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              size="small"
            />
          </Grid>
        </Grid>
        <Box sx={{ textAlign: "center" }}>
          <Button onClick={returnButton}>Back</Button>
        </Box>
      </Container>
    </>
  );
};
export default AddBook;
