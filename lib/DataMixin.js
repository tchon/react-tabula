'use strict';

var $__0=     require('./utils'),sort=$__0.sort,filter=$__0.filter;
var React = require('react');
var _ = require('lodash');

var containsIgnoreCase = function(a, b) {
  a = (a + '').toLowerCase().trim();
  b = (b + '').toLowerCase().trim();
  return b.indexOf(a) >= 0;
};


var objectExists = function(obj)  { return obj; }


module.exports = {

  getInitialState:function() {
    return {
      // Clone the initialData.
      data: this.props.initialData.slice(0),
      sortBy: this.props.initialSortBy,
      filterValues: {},
      currentPage: 0,
      pageSize: this.props.initialPageSize,
      config: this.props.config,
      configPrimary: ''
    };
  },

  getDefaultProps:function() {
    return {
      columns: [],
      columnsPossible: [],
      configGroup: '',
      configHeader: 'Configure',
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

  componentWillMount:function() {
    // Do the initial sorting if specified.
    var $__0=   this.state,sortBy=$__0.sortBy,data=$__0.data;
    if (sortBy) {
      this.setState({ data: sort(sortBy, data) });
    }
  },

  onSort:function(sortBy) {
    this.setState({
      sortBy: sortBy,
      data: sort(sortBy, this.state.data)
    });
  },

  onFilter:function(filterName, filterValue) {
    var $__0=   this.state,filterValues=$__0.filterValues,sortBy=$__0.sortBy;
    var $__1=   this.props,initialData=$__1.initialData,filters=$__1.filters;

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
  buildPage:function() {
    var $__0=     this.state,data=$__0.data,currentPage=$__0.currentPage,pageSize=$__0.pageSize,config=$__0.config;
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

  onChangeQuickConfig:function(title) {
    //console.log('>> selected item', title);

    this.props.configPrimary = title;

    // TODO update "active" dropdown, POST changes to server, update table
  },

  onChangeConfig:function(title) {
  },

  onChangePage:function(pageNumber) {
    var pageSize = this.state.pageSize;
    var start = pageSize * pageNumber;
    var end = start + pageSize;

    this.setState({
      currentPage: pageNumber,
      startIndex: start,
      endIndex: end
    });
  },

  onPageSizeChange:function(value) {
    var newPageSize = +value;
    var $__0=   this.state,currentPage=$__0.currentPage,pageSize=$__0.pageSize;
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

  onChangeConfigLeaf:function(current, parentProp, sectionProp, leafProp) {
    var config = this.state.config;
    var branch = config.children.map(function(obj)  {
      return obj && obj.prop === parentProp ? obj : null;
    }).filter(objectExists);

    if (_.isEmpty(branch)) { return; }

    var section = branch[0].children.map(function(obj)  {
      return obj && obj.prop === sectionProp ? obj : null;
    }).filter(objectExists);

    if (_.isEmpty(section)) { return; }

    var leaf = section[0].children.filter(objectExists).map(function(obj)  {
      return obj && obj.prop === leafProp ? obj : null;
    }).filter(objectExists);

    if (_.isEmpty(leaf)) {
      return;
    }
    leaf = leaf[0];

    // selection limit rules
    var MAX = leaf.group === this.props.configGroup ? 2 : 5;
    var selectedSize = 0;
    selectedSize = section[0].children.filter(objectExists).map(function(obj)  {
      return obj.selected ? 1 : 0;
    }).reduce(function(a, b)  { return a+b; });

    // dis-allow over-selection
    if (selectedSize >= MAX && !leaf.selected) {
      return null;
    }

    // toggle "selected" value of leaf
    leaf.selected = !leaf.selected;


    if (selectedSize === MAX -1 && leaf.selected) {
      // add disable attribute to others
      section[0].children.filter(objectExists).forEach(function(obj)  {
        obj.disabled = !obj.selected ? true : false;
      });
    } else {
      // remove disable attribute to others
      section[0].children.filter(objectExists).forEach(function(obj)  {
        obj.disabled = false;
      });
    }

    // update config
    this.setState({ config: config });
  }

};
