import React from "react";
import "./App.css";
import { Grid } from "./components/Grid";

function App() {
  return (
    <div className="App">
      <header className="document-title"></header>
      <Grid columns={10} rows={10} />
    </div>
  );
}

export default App;
