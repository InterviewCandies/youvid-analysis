import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import ChannelsProvider from "./Provider/ChannelsProvider";
import VideosPropider from "./Provider/VideosProvider";
import ChannelDetails from "./views/ChannelDetails/ChannelDetails";
import Home from "./views/Home/Home";
import Page404 from "./views/Page404/Page404";
import ComparationTool from "./views/ComparationTool/ComparationTool";
import VideoDetails from "./views/VideoDetails/VideoDetails";
import Results from "./views/Results/Results";
import ResultsProvider from "./Provider/ResultsProvider";
import Categorites from "./views/Categories/Categorites";
import CategoriesProvider from "./Provider/CategoryProvider";

function App() {
  return (
      <ResultsProvider>
        <ChannelsProvider>
            <CategoriesProvider>
              <VideosPropider>
                <Router>
                  <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/video/:id" component={VideoDetails} exact/>
                    <Route
                      path="/channel/:id"
                      component={ChannelDetails}
                      exact
                    />
                    <Route path="/categories" component={Categorites} exact/>
                    <Route path="/comparison" component={ComparationTool} exact/>
                    <Route path={"/results"} component={Results} exact/>
                    <Route path="/404" component={Page404}/>
                    <Redirect to="/404"/>
                  </Switch>
                </Router>
              </VideosPropider>
            </CategoriesProvider>
        </ChannelsProvider>
      </ResultsProvider>
  );
}

export default App;
