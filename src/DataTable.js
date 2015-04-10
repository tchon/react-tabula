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
        <div className="row">
          <div className="col-xs-8">

            <div className="btn-toolbar" role="toolbar" aria-label="...">

              <div className="btn-group">
                <button type="button" className="btn btn-default">Configure</button>
                <button type="button" className="btn btn-default dropdown-toggle"
                  data-toggle="dropdown" aria-expanded="false">
                  <span className="caret"></span>
                  <span className="sr-only">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu" role="menu">

                  <li><a href="#">Columns 1</a></li>
                  <li><a href="#">Columns 2</a></li>
                  <li><a href="#">Columns 3</a></li>

                  <li class="divider"></li>
                  <li><a href="#">Configure</a></li>
                </ul>
              </div>
              <div className="btn-group">
                <button type="button" className="btn btn-default">Export</button>
              </div>
            </div>

          </div>
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
                  dataSize={page.dataSize}
                  startIndex={page.startIndex}
                  endIndex={page.endIndex}
                />
                <PageSize
                  id="page-size"
                  className="page-size pull-left"
                  label="Show:"
                  value={this.state.pageSize}
                  max={this.props.pageSizeMax}
                  options={this.props.pageSizeOptions}
                  onChange={this.onPageSizeChange}
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
