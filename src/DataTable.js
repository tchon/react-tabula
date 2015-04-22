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

            <div className="btn-toolbar ns-btn-toolbar" role="toolbar" aria-label="...">
              <ConfigureTable
                columnsPossible={this.props.columnsPossible}
                columns={this.props.columns}
                config={this.state.config}
                configGroup={this.props.configGroup}
                configHeader={this.props.configHeader}
                configPrimary={this.props.configPrimary}
                enabled={this.props.enableConfig}
                onConfigCancel={this.onConfigCancel}
                onConfigSave={this.onConfigSave}
                onChangeConfigLeaf={this.onChangeConfigLeaf}
                onChangeConfig={this.onChangeConfig}
                onClickPrimary={this.onClickPrimary}
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
