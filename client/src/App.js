import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/hello")
      .then((r) => r.json())
      .then((data) => setCount(data.count));
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/testing">
            <h1>Test Route</h1>
            <h1>maui wowie pineapple express lets ride</h1>
          </Route>
          <Route path="/">
            <h1>Page Count: {count}</h1>
            <h1> all these dumb hoes wanting to rider stupid bikes and sleep in ignorant dirt </h1>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

