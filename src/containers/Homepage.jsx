import React, { useState, useEffect } from "react";
import Post from "../components/PostComponents/Post";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { chipProps, chipVariantStatus, selectTagProps } from "../utils";

import { useSelector, useDispatch } from "react-redux";
import { filterPost } from "../action";
import Footer from "../components/Footer";
// const GRID_STYLES = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(20rem,1fr)",
//   justfiyContent: "Center",
//   alignItems: "Center",
//   alignContent: "Center",
//   marginTop: "2vh",
// };

const Homepage = () => {
  const filteredPosts = useSelector((state) => state.filteredPosts);
  const filtersArray = useSelector((state) => state.filtersArray);
  const dispatch = useDispatch();
  const [selectValue, setSelectValue] = useState(selectTagProps[0].value);

  // useEffect(() => {
  //   if (!isLoggedIn) setVariants(chipVariantStatus);
  // }, [isLoggedIn]);

  const getVariant = (status) => {
    return status ? "filled" : "outlined";
  };

  const BtnClickedStatusChanged = (index, filtersArray) => {
    return !filtersArray[index]["status"];
  };

  const handleChange = (event) => {
    setSelectValue(event.target.value);
    dispatch(filterPost(event.target.value));
  };

  return (
    <Container maxwidth="lg" sx={{ mt: "5vh" }}>
      <Grid container spacing={2} sx={{ margin: "auto", mb: "2vh" }}>
        {filtersArray?.map((prop, index) => {
          const { label, color, status } = prop;
          return (
            <Grid item xs={4} sm={4} md={2} lg={2}>
              <Chip
                label={label}
                variant={getVariant(status)}
                component="button"
                color={color}
                onClick={() => {
                  if (BtnClickedStatusChanged(index, filtersArray)) {
                    dispatch(filterPost(label, index));
                  }
                }}
                key={label}
              />
            </Grid>
          );
        })}
        <Grid item xs={4} sm={4} md={2} lg={2}>
          <FormControl variant="standard">
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectValue}
              onChange={handleChange}
            >
              {selectTagProps?.map((prop) => (
                <MenuItem value={prop.value} key={prop.value}>
                  {prop.content}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={{ xs: 4, sm: 4, md: 3 }}
        columns={{ xs: 4, sm: 12, md: 12, lg: 12 }}
      >
        {filteredPosts?.map((post) => (
          <Grid item xs={4} sm={6} md={6} lg={4}>
            <Post {...post} key={post.id} />
          </Grid>
        ))}
      </Grid>
      {/* <Footer /> */}
    </Container>
  );
};

export default Homepage;
