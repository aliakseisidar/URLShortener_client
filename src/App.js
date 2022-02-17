import React, {useState} from "react";
import Counter from "./components/Counter";

function App() {
    const [value, setValue] = useState('input text')

  return (
    <div className="App">
        <Counter/>
        <Counter/>
        <Counter/>
    </div>
  );
}

export default App;
