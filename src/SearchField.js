'use strict';

var React = require('react');

class SearchField {

  constructor() {
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <form role="form" className={this.props.className}>
        <div className="form-group has-feedback">
          <input
            id={this.props.id}
            className="form-control"
            describedby="sizing-addon2"
            type="text"
            value={this.props.value}
            placeholder={this.props.placeholder}
            onChange={this.onChange}
          />
          <i className="form-control-feedback glyphicon glyphicon-search"></i>
        </div>
      </form>
    );
  }

}

module.exports = SearchField;
