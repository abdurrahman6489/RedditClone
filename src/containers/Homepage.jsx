import React, { useState } from "react";
import Post from "../components/Post";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useSelector, useDispatch } from "react-redux";
import { filterPost } from "../action";
import { chipProps, chipVariantStatus } from "../utils";

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
  const dispatch = useDispatch();
  const [variants, setVariants] = useState(chipVariantStatus);
  const getVariant = (status) => {
    return status ? "filled" : "outlined";
  };

  const BtnClickedStatusChanged = (index) => {
    return !variants[index];
  };
  return (
    <Container maxwidth="lg" sx={{ mt: "5vh" }}>
      <Stack direction="row" spacing={3}>
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
                  dispatch(filterPost(index));
                }
              }}
              key={label}
            />
          );
        })}
      </Stack>
      <div style={GRID_STYLES}>
        {filteredPosts?.map((post) => (
          <Post {...post} />
        ))}
      </div>
    </Container>
  );
};

export default Homepage;
