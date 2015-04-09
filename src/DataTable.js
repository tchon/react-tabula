'use strict';

var React = require('react');
var Table = require('./Table');
var PageItems = require('./PageItems');
var PageSize = require('./PageSize');
var Pagination = require('./Pagination');
var SearchField = require('./SearchField');

var DataMixin = require('./DataMixin');

var DataTable = React.createClass({

  mixins: [ DataMixin ],

  render() {
    var page = this.buildPage();

    return (
      <div className={this.props.className}>
        <div className="row ns-spacer-vertical"></div>
        <div className="row">
          <div className="col-xs-8"></div>
          <div className="col-xs-4 pull-right">
            <SearchField
              id="search-field"
              className="input-group pull-right"
              placeholder="Search Table"
              value={this.state.filterValues.globalSearch}
              onChange={this.onFilter.bind(this, 'globalSearch')}
            />
          </div>
        </div>
        <div className="row ns-spacer-vertical"></div>
        <Table
          className="table table-bordered"
          dataArray={page.data}
          columns={this.props.columns}
          keys={this.props.keys}
          sortBy={this.state.sortBy}
          onSort={this.onSort}
        />
        <div className="row">
          <div className="col-xs-7">
            <div className="row">
              <div className="col-xs-12 ns-page-items-size">
                <PageItems
                  id="page-items"
                  className="page-items pull-left"
                  dataLength={page.dataLength}
                  startIndex={page.startIndex}
                  endIndex={page.endIndex}
                />
                <PageSize
                  id="page-size"
                  className="page-size pull-left"
                  label="Show:"
                  value={this.state.pageLength}
                  max={this.props.pageLengthMax}
                  options={this.props.pageLengthOptions}
                  onChange={this.onPageLengthChange}
                />
              </div>
              </div>
            </div>


          <div className="col-xs-5">
            <Pagination
              className="pagination pagination-sm pull-right ns-pagination-top"
              currentPage={page.currentPage}
              totalPages={page.totalPages}
              onChangePage={this.onChangePage}
            />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = DataTable;
