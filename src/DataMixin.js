'use strict';

var { sort, filter } = require('./utils');
var React = require('react');
var _ = require('lodash');
var superagent = require('superagent');

var containsIgnoreCase = function(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};


var objectExists = (obj) => { return obj; }


module.exports = {

  getInitialState() {
    return {
      // Clone the initialData.
      data: this.props.initialData.slice(0),
      sortBy: this.props.initialSortBy,
      filterValues: {},
      currentPage: 0,
      pageSize: this.props.initialPageSize,
      config: this.props.config,
      configBackup: _.cloneDeep(this.props.config)
    };
  },

  getDefaultProps() {
    return {
      columns: [],
      columnsPossible: [],
      configGroup: '',
      configHeader: 'Configure',
      configPrimary: '',
      configUrl: '',
      enableConfig: false,
      enableExport: false,
      initialPageSize: 5,
      keys: [],
      pageSizeMax: 20,
      pageSizeOptions: [ 5, 10, 20 ],
      filters: {
        globalSearch: {
          filter: containsIgnoreCase
        }
      }
    };
  },

  componentWillMount() {
    // Do the initial sorting if specified.
    var {sortBy, data} = this.state;
    if (sortBy) {
      this.setState({ data: sort(sortBy, data) });
    }
  },

  onSort(sortBy) {
    this.setState({
      sortBy: sortBy,
      data: sort(sortBy, this.state.data)
    });
  },

  onFilter(filterName, filterValue) {
    var {filterValues, sortBy} = this.state;
    var {initialData, filters} = this.props;

    filterValues[filterName] = filterValue;
    var newData = filter(filters, filterValues, initialData);
    newData = sort(sortBy, newData);

    this.setState({
      data: newData,
      filterValues: filterValues,
      currentPage: 0
    });
  },

  // Pagination
  buildPage() {
    var {data, currentPage, pageSize, config} = this.state;
    var start = pageSize * currentPage;
    var end = start + pageSize;
    var endIndex = data.length > end ? end : data.length;

    return {
      data: data.slice(start, end),
      dataSize: data.length,
      currentPage: currentPage,
      startIndex: start,
      endIndex: endIndex,
      totalPages: Math.ceil(data.length / pageSize),
      config: config
    };
  },

  onChangeQuickConfig(title) {
    //console.log('>> selected item', title);

    this.props.configPrimary = title;

    // TODO update "active" dropdown, POST changes to server, update table
  },

  onChangeConfig(title) {
  },

  onChangePage(pageNumber) {
    var pageSize = this.state.pageSize;
    var start = pageSize * pageNumber;
    var end = start + pageSize;

    this.setState({
      currentPage: pageNumber,
      startIndex: start,
      endIndex: end
    });
  },

  onPageSizeChange(value) {
    var newPageSize = +value;
    var {currentPage, pageSize} = this.state;
    var newPage = Math.floor((currentPage * pageSize) / newPageSize);

    var start = newPageSize * currentPage;
    var end = start + newPageSize;

    this.setState({
      pageSize: newPageSize,
      currentPage: newPage,
      startIndex: start,
      endIndex: end
    });
  },

  onConfigCancel() {
    var backup = _.cloneDeep(this.state.configBackup);
    this.setState({ config: backup });
  },

  onConfigSave(e) {
    e.preventDefault();
    e.stopPropagation();

    var config = this.state.config;
    var url = this.props.configUrl;
    //console.log('>> attempting to save configuration', config);
    //superagent.post(url).send(config).end(function(reply) {
    //  console.log('>> reply', reply);
    //});


    return;
  },

  onChangeConfigLeaf(current, parentProp, sectionProp, leafProp) {
    var config = this.state.config;
    var branch = config.children.map((obj) => {
      return obj && obj.prop === parentProp ? obj : null;
    }).filter(objectExists);

    if (_.isEmpty(branch)) { return; }

    var section = branch[0].children.map((obj) => {
      return obj && obj.prop === sectionProp ? obj : null;
    }).filter(objectExists);

    if (_.isEmpty(section)) { return; }

    var leaf = section[0].children.filter(objectExists).map((obj) => {
      return obj && obj.prop === leafProp ? obj : null;
    }).filter(objectExists);

    if (_.isEmpty(leaf)) {
      return;
    }
    leaf = leaf[0];

    // selection limit rules
    var MAX = leaf.group === this.props.configGroup ? 2 : 5;
    var selectedSize = 0;
    selectedSize = section[0].children.filter(objectExists).map((obj) => {
      return obj.selected ? 1 : 0;
    }).reduce((a, b) => { return a+b; });

    // dis-allow over-selection
    if (selectedSize >= MAX && !leaf.selected) {
      return null;
    }

    // toggle "selected" value of leaf
    leaf.selected = !leaf.selected;


    if (selectedSize === MAX -1 && leaf.selected) {
      // add disable attribute to others
      section[0].children.filter(objectExists).forEach((obj) => {
        obj.disabled = !obj.selected ? true : false;
      });
    } else {
      // remove disable attribute to others
      section[0].children.filter(objectExists).forEach((obj) => {
        obj.disabled = false;
      });
    }

    // update config
    this.setState({ config: config });
  }

};
