'use strict';

var React = require('react');

var ConfigureTable = require('./ConfigureTable');
var ExportButton = require('./ExportButton');
var PageItems = require('./PageItems');
var PageSize = require('./PageSize');
var Pagination = require('./Pagination');
var SearchField = require('./SearchField');
var Table = require('./Table');

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
              <ConfigureTable
                columns={this.props.columns}
                columnsPossible={this.props.columnsPossible}
                configGroup={this.props.configGroup}
                configPrimary={this.props.configPrimary}
                enabled={this.props.enableConfig}
                onChangeQuickConfig={this.onChangeQuickConfig}
              />
              <ExportButton enabled={this.props.enableExport} />

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
                  dataSize={page.dataSize}
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
