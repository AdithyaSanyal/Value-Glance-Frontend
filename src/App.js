import React from "react";
import IncomeStatementTable from "./components/IncomeStatementTable";

const App = () => {
  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-center mb-4">Financial Data Filtering App</h1>
      <IncomeStatementTable />
    </div>
  );
};

export default App;
