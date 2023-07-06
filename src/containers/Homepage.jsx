import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { filterPost } from "../action";
import { chipProps, chipVariantStatus, selectTagProps } from "../utils";

const GRID_STYLES = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(20rem,1fr)",
  justfiyContent: "Center",
  alignItems: "Center",
  alignContent: "Center",
  marginTop: "2vh",
};

const Homepage = () => {
  const filteredPosts = useSelector((state) => state.filteredPosts);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const [variants, setVariants] = useState(chipVariantStatus);
  const [selectValue, setSelectValue] = useState(selectTagProps[0].value);

  useEffect(() => {
    if (!isLoggedIn) setVariants(chipVariantStatus);
  }, [isLoggedIn]);
  const getVariant = (status) => {
    return status ? "filled" : "outlined";
  };

  const BtnClickedStatusChanged = (index) => {
    return !variants[index];
  };

  const handleChange = (event) => {
    setSelectValue(event.target.value);
    dispatch(filterPost(event.target.value));
  };
  return (
    <Container maxwidth="lg" sx={{ mt: "5vh" }}>
      <Stack
        direction="row"
        spacing={3}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(1rem, 5rem))",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          gap: "2%",
        }}
      >
        {chipProps?.map((prop, index) => {
          const { label, color } = prop;
          return (
            <Chip
              label={label}
              variant={getVariant(variants[index])}
              component="button"
              color={color}
              onClick={() => {
                if (BtnClickedStatusChanged(index)) {
                  setVariants(
                    variants.map((elem, currentIndex) =>
                      currentIndex == index ? true : false
                    )
                  );
                  dispatch(filterPost(label));
                }
              }}
              key={label}
            />
          );
        })}
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
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
      </Stack>
      <div style={GRID_STYLES}>
        {filteredPosts?.map((post) => (
          <Post {...post} key={post.id} />
        ))}
      </div>
    </Container>
  );
};

export default Homepage;
