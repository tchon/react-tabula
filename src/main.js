var React = require('react'),
    Component = require('./component.js');

var App = React.createClass({

  render: function() {
    return (
      <Component />
    );
  }

});

React.render(<App />, document.body);
