import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";

const fontSize = "large";

const Warning = () => <WarningIcon color="warning" fontSize={fontSize} />;
const Success = () => <CheckCircleIcon color="success" fontSize={fontSize} />;

const Actionicons = ({ signal }) => {
  return (
    <div style={{ textAlign: "center" }}>
      {signal === "warning" ? <Warning /> : <Success />}
    </div>
  );
};

export default Actionicons;
