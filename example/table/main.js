require('../../css/table-twbs.css');

var React = require('react');
var { DataTable } = require('react-tabula');


function buildTable(data) {
  var columnGroupA = [
    { title: 'Phylum', prop: 'PHYLUM', group: 'A' },
    { title: 'Animal Genus', prop: 'ANIMAL GENUS', group: 'A' },
    { title: 'Animal', prop: 'ANIMAL', group: 'A' }
  ];
  var columnGroupB = [
    { title: 'No. of Walks', prop: 'WALKS', defaultContent: '<none>', group: 'B' },
    { title: 'Meals per day', prop: 'EATS', defaultContent: '<none>', group: 'B' },
    { title: 'Naps per day', prop: 'SLEEPS', defaultContent: '<none>', group: 'B' }
  ]
  var columns = columnGroupA.concat(columnGroupB);
  var columnKeys = columns.map(function(col) { return col.prop; });

  var columnPossibleGroupA = columnGroupA.slice(0, columnGroupA.length);
  var columnPossibleGroupB = columnGroupB.slice(0, columnGroupB.length);

  columnPossibleGroupA.push({ title: 'Kingdom', prop: 'KINGDOM', group: 'A'});
  columnPossibleGroupA.push({ title: 'Order', prop: 'ORDER', group: 'A'});
  columnPossibleGroupA.push({ title: 'Species', prop: 'Species', group: 'A'});

  columnPossibleGroupB.push({ title: 'Plays', prop: 'PLAYS', group: 'B'});
  columnPossibleGroupB.push({ title: 'Life Expectancy', prop: 'LIFE', group: 'B'});
  columnPossibleGroupB.push({ title: 'Reproduces', prop: 'REPRODUCE', group: 'B'});

  var columnsPossible = columnPossibleGroupA.concat(columnPossibleGroupB);

  return (
    <DataTable
      className="container"
      keys={columnKeys}
      columns={columns}
      columnsPossible={columnsPossible}
      initialData={data}
      initialPageSize={15}
      initialSortBy={{ prop: 'PHYLUM', order: 'ascending' }}
      configGroup='A'
      configPrimary='Phylum'
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
