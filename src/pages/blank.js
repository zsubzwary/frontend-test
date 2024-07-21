import React from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../util/Helper";

/**
 * Renders a blank page.
 *
 * @return {JSX.Element} A Box component.
 */
const BlankPage = () => {

  const navigate = useNavigate()
  useEffect(() => {
    if(!isUserLoggedIn()){
      navigate("/login");
    }
  }, [])

  return <Box></Box>;
};

export default BlankPage;
