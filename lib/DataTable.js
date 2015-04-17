'use strict';

var React = require('react');

var ConfigureTable = require('./ConfigureTable');
var PageItems = require('./PageItems');
var PageSize = require('./PageSize');
var Pagination = require('./Pagination');
var SearchField = require('./SearchField');
var Table = require('./Table');

var DataMixin = require('./DataMixin');

var DataTable = React.createClass({displayName: "DataTable",

  mixins: [ DataMixin ],

  render:function() {
    var page = this.buildPage();

    return (
      React.createElement("div", {className: this.props.className}, 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-xs-8"}, 

            React.createElement("div", {className: "btn-toolbar", role: "toolbar", "aria-label": "..."}, 
              React.createElement(ConfigureTable, {
                columns: this.props.columns, 
                columnsPossible: this.props.columnsPossible, 
                configGroup: this.props.configGroup, 
                configPrimary: this.props.configPrimary, 
                onChangeQuickConfig: this.onChangeQuickConfig}
              ), 

              React.createElement("div", {className: "btn-group"}, 
                React.createElement("button", {type: "button", className: "btn btn-default"}, "Export")
              )
            )

          ), 
          React.createElement("div", {className: "col-xs-4 pull-right"}, 
            React.createElement(SearchField, {
              id: "search-field", 
              className: "input-group pull-right", 
              placeholder: "Search Table", 
              value: this.state.filterValues.globalSearch, 
              onChange: this.onFilter.bind(this, 'globalSearch')}
            )
          )
        ), 
        React.createElement("div", {className: "row ns-spacer-vertical"}), 
        React.createElement(Table, {
          className: "table table-bordered", 
          dataArray: page.data, 
          columns: this.props.columns, 
          keys: this.props.keys, 
          sortBy: this.state.sortBy, 
          onSort: this.onSort}
        ), 
        React.createElement("div", {className: "row"}, 
          React.createElement("div", {className: "col-xs-7"}, 
            React.createElement("div", {className: "row"}, 
              React.createElement("div", {className: "col-xs-12 ns-page-items-size"}, 
                React.createElement(PageItems, {
                  id: "page-items", 
                  className: "page-items pull-left", 
                  dataSize: page.dataSize, 
                  startIndex: page.startIndex, 
                  endIndex: page.endIndex}
                ), 
                React.createElement(PageSize, {
                  id: "page-size", 
                  className: "page-size pull-left", 
                  label: "Show:", 
                  dataSize: page.dataSize, 
                  value: this.state.pageSize, 
                  max: this.props.pageSizeMax, 
                  options: this.props.pageSizeOptions, 
                  onChange: this.onPageSizeChange}
                )
              )
              )
            ), 


          React.createElement("div", {className: "col-xs-5"}, 
            React.createElement(Pagination, {
              className: "pagination pagination-sm pull-right ns-pagination-top", 
              currentPage: page.currentPage, 
              totalPages: page.totalPages, 
              onChangePage: this.onChangePage}
            )
          )
        )
      )
    );
  }
});

module.exports = DataTable;
