'use strict';

var $__0=     require('./utils'),sort=$__0.sort,filter=$__0.filter;
var React = require('react');
var _ = require('lodash');
var superagent = require('superagent');

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
      configPrimary: '',
      configBackup: _.cloneDeep(this.props.config)
    };
  },

  getDefaultProps:function() {
    return {
      columns: [],
      columnsPossible: [],
      configGroup: '',
      configHeader: 'Configure',
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

    this.state.configPrimary = title;

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

  onConfigCancel:function() {
    var backup = _.cloneDeep(this.state.configBackup);
    this.setState({ config: backup });
  },

  onConfigSave:function(e) {
    e.preventDefault();
    e.stopPropagation();

    var config = this.state.config;
    var url = this.props.configUrl;

    console.log('>> attempting to save configuration', config);

    superagent.post(url).send(config).end(function(reply) {
      console.log('>> reply', reply);
    });


    return;
  },

  onChangeConfigLeaf:function(current, parentProp, sectionProp, leafProp) {
    var config = this.state.config;
    //var config = _.cloneDeep(this.state.config);

    // find branch
    var branch = config.children.map(function(obj)  {
      return obj && obj.prop === parentProp ? obj : null;
    }).filter(objectExists);
    if (_.isEmpty(branch)) { return; }

    // find section
    var section = branch[0].children.map(function(obj)  {
      return obj && obj.prop === sectionProp ? obj : null;
    }).filter(objectExists);
    if (_.isEmpty(section)) { return; }

    // find leaf node
    var leaf = section[0].children.filter(objectExists).map(function(obj)  {
      return obj && obj.prop === leafProp ? obj : null;
    }).filter(objectExists);
    if (_.isEmpty(leaf)) { return; }

    leaf = leaf[0];


    if (!current.checked) {
      leaf.selected = false;
      console.log('  >> current not selected - leaf', leaf);

      // TODO remove disabled attributes

      this.setState({ config: config });
      return;
    }

    // Check if MAX has been exceeded - selection limit rules
    var MAX = leaf.group === this.props.configGroup ? 1 : 4;
    var selectedSize = 0;

    var counts = section[0].children.filter(objectExists).map(function(obj)  {
      return obj && obj.selected ? 1 : 0;
    })
    selectedSize = counts.reduce(function(a, b)  { return a+b; });


    // dis-allow over-selection
    if (selectedSize > MAX) {
      console.log('    >> selected count at or exceeded MAX:', MAX, 'leaf', leaf);

      // disable all other inputs

      current.checked = false;
      leaf.selected = false;

      this.setState({ config: config });
      return current;

    } else {
      // undo prior disables
    }

    console.log('    >> selected count:', selectedSize, 'leaf:', leaf);

    leaf.selected = !leaf.selected;
    console.log('  >> AFTER leaf update', leaf);

    // update config
    this.setState({ config: config });

    return current;
  },


  onClickPrimary:function(e) {
    var config = this.state.config;
    var title = e.currentTarget.textContent;

    config.children.forEach(function(child)  {
      if (_.isEmpty(child)) {
        return;
      }

      child.selected = child.title === title ? true : false;
    });

    this.setState({ config: config });
  }
};
