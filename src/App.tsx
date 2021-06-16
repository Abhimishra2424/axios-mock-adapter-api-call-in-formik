import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import StudentForm from "./pages/StudentForm";
import TableStudent from "./pages/TableStudent";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={TableStudent} />
          <Route exact path="/studentfrom" component={StudentForm} />
          <Route path="/studentform/:id"   component={StudentForm}/>
        </Switch>
      </Router>
    </>
  );
};

export default App;
