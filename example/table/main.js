require('../../css/table-twbs.css');
require('../../bower_components/bootstrap-vertical-tabs/bootstrap.vertical-tabs.css');


var React = require('react');
var { DataTable } = require('react-tabula');
var _ = require('lodash');


function Taxonomy() {
  this.phylum = { title: 'Phylum', prop: 'PHYLUM' };
  this.genus = { title: 'Animal Genus', prop: 'ANIMAL GENUS' };
  this.animal = { title: 'Animal', prop: 'ANIMAL' };

  this.kingdom = { title: 'Kingdom', prop: 'KINGDOM'};
  this.order = { title: 'Order', prop: 'ORDER'};
  this.species = { title: 'Species', prop: 'Species'}
}

function Behavior() {
  this.walks = { title: 'No. of Walks', prop: 'WALKS' };
  this.meals = { title: 'Meals per day', prop: 'EATS' };
  this.naps = { title: 'Naps per day', prop: 'SLEEPS' };

  this.plays = { title: 'Plays', prop: 'PLAYS'};
  this.life = { title: 'Life Expectancy', prop: 'LIFE'};
  this.sex = { title: 'Reproduces', prop: 'REPRODUCE'};
}


function Fixtures() {
  this.initTaxonomy();
  this.initBehavior();
  this.initColumns();
  this.initConfig();
}

Fixtures.prototype.initTaxonomy = function() {
  this.taxonomy = new Taxonomy();
  this.taxonomyDefaults = [ 'phylum', 'genus', 'animal' ];
  this.taxonomyAdditional = [ 'kingdom', 'order', 'species' ];
  this.taxonomyColumns = this.groupColumns(this.taxonomyDefaults, 'taxonomy');
  this.taxonomyColumnsAdditional = this.groupColumns(this.taxonomyAdditional, 'taxonomy');
  this.taxonomyAll = this.taxonomyColumns.concat(this.taxonomyColumnsAdditional);
};

Fixtures.prototype.initBehavior = function() {
  this.behavior = new Behavior();
  this.behaviorDefaults = [ 'walks', 'meals', 'naps' ];
  this.behaviorAdditional = [ 'plays', 'life', 'sex' ];
  this.behaviorColumns = this.groupColumns(this.behaviorDefaults, 'behavior');
  // select defaults to be checked
  this.behaviorColumns.forEach(function(obj) { obj.selected = true; return obj; });

  this.behaviorColumnsAdditional = this.groupColumns(this.behaviorAdditional, 'behavior');
  this.behaviorAll = this.behaviorColumns.concat(this.behaviorColumnsAdditional);
};

Fixtures.prototype.initColumns = function() {
  this.columns = this.taxonomyColumns.concat(this.behaviorColumns);
  this.columnKeys = this.columns.map(function(c) { return c.prop; });
  this.columnsPossible = this.taxonomyAll.concat(this.behaviorAll);
  this.columnsPossibleKeys = this.columnsPossible.map(function(o){ return o.prop; });
};

Fixtures.prototype.initConfig = function() {
  this.buildBranch = this.buildBranch.bind(this);
  // build configuration branches
  var primaries = _.cloneDeep(this.taxonomyAll).map(this.buildBranch);

  // configuration tree
  this.config = { title: 'Taxonomy', prop: 'root', children: primaries };
};

Fixtures.prototype.buildBranch = function(primary) {
  var secondaries = _.cloneDeep(this.taxonomyAll);
  secondaries = secondaries.map(function(second) {
    return second.prop === primary.prop ? null : second
  });

  var behaviors = _.cloneDeep(this.behaviorAll);
  behaviors = behaviors.map(function(behavior) { return behavior; });

  var additionalTaxonomySection = {
      title: 'Additional categories',
      prop: 'additional',
      group: 'section',
      children: secondaries
  };

  var additionalBehaviorSection = {
      title: 'Behaviors',
      prop: 'behaviors',
      group: 'section',
      children: behaviors
  };

  primary.children = [ additionalTaxonomySection, additionalBehaviorSection ]; 
  return primary
};

Fixtures.prototype.group = function(ary, label) {
  return ary.filter(function(obj){ return obj; }).map(function(obj) {
    var twin = _.cloneDeep(obj);
    twin.group = label;
    return twin;
  });
};

Fixtures.prototype.groupColumns = function(keys, attribute) {
  var ref = this[attribute];
  var ary = keys.map(function (k) { return ref[k]; });
  return this.group(ary, attribute);
}


function buildTable(data) {
  fixtures = new Fixtures();

  return (
    <DataTable
      className="container"
      keys={fixtures.columnKeys}
      columns={fixtures.columns}
      columnsPossible={fixtures.columnsPossible}
      enableConfig={true}
      enableExport={false}
      initialData={data}
      initialPageSize={15}
      initialSortBy={{ prop: 'PHYLUM', order: 'ascending' }}
      config={fixtures.config}
      configGroup={fixtures.columns[0].group}
      configHeader={"Configure Table"}
      configPrimary={fixtures.columns[0].title}
      configUrl={'/config'}
      pageSizeOptions={[ 5, 15, 50, 100 ]}
      pageSizeMax={100}
    />
  );
}


var records = [
  {
    'PHYLUM': 'Canidae',
    'ANIMAL GENUS': 'Canis',
    'ANIMAL': 'Labrador',
    'WALKS': 2,
    'EATS': 3,
    'SLEEPS': 5
  },
  {
    'PHYLUM': 'Canidae',
    'ANIMAL GENUS': 'Canis',
    'ANIMAL': 'Beagle',
    'WALKS': 5,
    'EATS': 2,
    'SLEEPS': 1
  },
  {
    'PHYLUM': 'Felidae',
    'ANIMAL GENUS': 'Felis',
    'ANIMAL': 'Tabby',
    'WALKS': 1,
    'EATS': 6,
    'SLEEPS': 10
  },
  {
    'PHYLUM': 'Felidae',
    'ANIMAL GENUS': 'Felis',
    'ANIMAL': 'Balinese',
    'WALKS': 3,
    'EATS': 2,
    'SLEEPS': 12
  },
  {
    'PHYLUM': 'Chordata',
    'ANIMAL GENUS': 'Aves',
    'ANIMAL': 'Finch',
    'WALKS': 0,
    'EATS': 10,
    'SLEEPS': 2
  },
  {
    'PHYLUM': 'Chordata',
    'ANIMAL GENUS': 'Aves',
    'ANIMAL': 'Crow',
    'WALKS': 11,
    'EATS': 3,
    'SLEEPS': 1
  }
];

// case when records is empty
//records = [];

window.tabula = React.render(buildTable(records), document.body);
