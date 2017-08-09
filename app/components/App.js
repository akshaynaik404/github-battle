var React = require('react');
var ReactRouter = require('react-router-dom');

var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;
var Popular = require('../components/Popular');
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/battle" component={Battle} />
            <Route path="/popular" component={Popular} />
            <Route render={function() {
              return (
                <h1 style={{textAlign: 'center'}}>404 Not found</h1>
              );
            }} />
          </Switch>
        </div>

      </Router>
    )
  }
}

module.exports = App;
