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
      configBaseRequest: {},
      configPostCallback: function () {},
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
    this.clearModalAlert();

    var backup = _.cloneDeep(this.state.configBackup);
    this.setState({ config: backup });
  },

  showModalAlert:function(text) {
    $('.modal-footer .alert').text(text).show();
  },

  clearModalAlert:function() {
    $('.modal-footer .alert').text('').hide();
  },

  saveConfig:function() {
    var config = this.state.config;
    var baseRequest = _.cloneDeep(this.props.configBaseRequest);
    var payload = _.merge(baseRequest, { "configuration": config });
    var url = this.props.configUrl;
    var clearModalAlert = this.clearModalAlert;
    var showModalAlert = this.showModalAlert;

    var postCallback = this.props.configPostCallback;

    superagent.post(url)
      .send(payload)
      .set('Accept', 'application/json')
      .end(function(err, reply) {
        if (reply.ok) {
          // XXX should we be implicitly be using jquery here?
          $('#configure-table-modal').modal('hide');
          clearModalAlert();
        } else {
          // do not close but show notification in config modal
          showModalAlert('cannot save configuration right now');
        }

        postCallback(reply);
      });
  },

  onConfigSave:function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.saveConfig();
    return;
  },

  onChangeQuickConfig:function(title) {
    var config = this.state.config;

    config.children.forEach(function(child)  {
      if (_.isEmpty(child)) {
        return;
      }

      child.selected = child.title === title ? true : false;
    });

    this.props.configPrimary = title;
    this.setState({ config: config });

    // TODO POST current active config and reload report query
    var callback = function(msg){
        console.log('>>', msg);
    };
    this.saveConfig(callback);
  },

  findNode:function(list, prop) {
    if (_.isEmpty(list)) { return []; }

    return list.map(
      function(obj)  { return obj && obj.prop === prop ? obj : null; }
    ).filter(objectExists);
  },

  findLeaf:function(config, parentProp, sectionProp, leafProp) {
    // find branch
    var branch = config && config.children.length ?
      this.findNode(config.children, parentProp) : [];

    // find section
    var section = branch && branch.length ?
      this.findNode(branch[0].children, sectionProp) : []; 

    // find leaf node
    var leaf = section && section.length ?
      this.findNode(section[0].children, leafProp) : [];

    return {
      section: section,
      leaf: leaf && leaf.length ? leaf[0] : null
    };
  },

  onChangeConfigLeaf:function(current, parentProp, sectionProp, leafProp) {
    //var config = _.cloneDeep(this.state.config);
    var config = this.state.config;
    var match = this.findLeaf(config, parentProp, sectionProp, leafProp);
    var section = match.section;
    var leaf = match.leaf;
    if (!leaf) { return; }

    if (!current.checked) {
      leaf.selected = false;
      // TODO remove disabled attributes
      this.setState({ config: config });
      return;
    }

    // Check if MAX has been exceeded - selection limit rules
    var MAX = leaf.group === this.props.configGroup ? 1 : 4;
    var counts = section[0].children.filter(objectExists).map(function(obj)  {
      return obj && obj.selected ? 1 : 0;
    })
    var selectedSize = 0;
    selectedSize = counts.reduce(function(a, b)  { return a+b; });

    // dis-allow over-selection
    if (selectedSize > MAX) {
      // TODO disable all other inputs
      current.checked = false;
      leaf.selected = false;
      this.setState({ config: config });
      return current;
    } else {
      // TODO remove disabled attributes
    }

    leaf.selected = !leaf.selected;

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
