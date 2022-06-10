import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import Routers from "./routers";
import Modal from "./components/products/modal";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { changeInvalidate } from "./components/products/productSlice";

const theme = createTheme({
    typography: {
        fontFamily: ["Montserrat", "cursive"].join(","),
    },
});

function App() {
    const isValid = useSelector((state) => state.products)?.validateHelper;

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routers />
            </BrowserRouter>
            {!isValid?.isValid && <Modal message={isValid?.message}></Modal>}
        </ThemeProvider>
    );
}

export default App;
