import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import BlockDetails from "./routes/block-details";
import Address, { loader as addressLoader } from "./routes/address";
import TxDetails from "./routes/tx-details";
import Txs from "./routes/txs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "block/:blockNumber",
    element: <BlockDetails />,
  },
  {
    path: "address/:address",
    element: <Address />,
    loader: addressLoader,
  },
  {
    path: "tx/:txHash",
    element: <TxDetails />,
  },
  {
    path: "txs/:blockNumber",
    element: <Txs />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
