import React from "react";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "./App.css";
import Loader from "./components/Loader/Loader";
import ChannelsProvider from "./Provider/ChannelsProvider";
import CommentsPropider from "./Provider/CommentsProvider";
import CommentStatsPropider from "./Provider/CommentStatsProvider";
import VideosPropider from "./Provider/VideosProvider";
import ChannelDetails from "./views/ChannelDetails/ChannelDetails";
import Home from "./views/Home/Home";
import Page404 from "./views/Page404/Page404";
import ComparationTool from "./views/ComparationTool/ComparationTool";
import VideoDetails from "./views/VideoDetails/VideoDetails";
import Results from "./views/Results/Results";
import ResultsProvider from "./Provider/ResultsProvider";

function App() {
  return (
      <ResultsProvider>
        <ChannelsProvider>
          <CommentsPropider>
            <CommentStatsPropider>
              <VideosPropider>
                <Router>
                  <Switch>
                    <Route path="/" component={Home} exact></Route>
                    <Route path="/video/:id" component={VideoDetails} exact></Route>
                    <Route
                      path="/channel/:id"
                      component={ChannelDetails}
                      exact
                    ></Route>
                    <Route path="/comparison" component={ComparationTool} exact></Route>
                    <Route path={"/results"} component={Results} exact/>
                    <Route path="/404" component={Page404}></Route>
                    <Redirect to="/404"></Redirect>
                  </Switch>
                </Router>
              </VideosPropider>
            </CommentStatsPropider>
          </CommentsPropider>
        </ChannelsProvider>
      </ResultsProvider>
  );
}

export default App;
