import { Index } from "./components/Index.js";
import { Thread } from "./components/Thread.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact children={<Index />} />
          <Route path="/:threadId" children={<Thread />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
