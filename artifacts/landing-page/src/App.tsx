import { Switch, Route } from "wouter";
import LandingPage from "@/pages/LandingPage";
import LandingPage2 from "@/pages/LandingPage2";
import AdminPage from "@/pages/AdminPage";

function App() {
  return (
    <Switch>
      <Route path="/home2" component={LandingPage2} />
      <Route path="/admin" component={AdminPage} />
      <Route component={LandingPage} />
    </Switch>
  );
}

export default App;
