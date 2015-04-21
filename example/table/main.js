require('../../css/table-twbs.css');

var React = require('react');
var { DataTable } = require('react-tabula');

function Fixtures() {
  this.columnGroupA = [
    { title: 'Phylum', prop: 'PHYLUM', group: 'A' },
    { title: 'Animal Genus', prop: 'ANIMAL GENUS', group: 'A' },
    { title: 'Animal', prop: 'ANIMAL', group: 'A' }
  ];

  this.columnGroupB = [
    { title: 'No. of Walks', prop: 'WALKS', defaultContent: '<none>', group: 'B' },
    { title: 'Meals per day', prop: 'EATS', defaultContent: '<none>', group: 'B' },
    { title: 'Naps per day', prop: 'SLEEPS', defaultContent: '<none>', group: 'B' }
  ]

  this.columns = this.columnGroupA.concat(this.columnGroupB);
  this.columnKeys = this.columns.map(function(col) { return col.prop; });

  this.columnPossibleGroupA = this.columnGroupA.slice(0, this.columnGroupA.length);
  this.columnPossibleGroupB = this.columnGroupB.slice(0, this.columnGroupB.length);

  this.columnPossibleGroupA.push({ title: 'Kingdom', prop: 'KINGDOM', group: 'A'});
  this.columnPossibleGroupA.push({ title: 'Order', prop: 'ORDER', group: 'A'});
  this.columnPossibleGroupA.push({ title: 'Species', prop: 'Species', group: 'A'});

  this.columnPossibleGroupB.push({ title: 'Plays', prop: 'PLAYS', group: 'B'});
  this.columnPossibleGroupB.push({ title: 'Life Expectancy', prop: 'LIFE', group: 'B'});
  this.columnPossibleGroupB.push({ title: 'Reproduces', prop: 'REPRODUCE', group: 'B'});

  this.columnsPossible = this.columnPossibleGroupA.concat(this.columnPossibleGroupB);

  //this.config = {
  //  prop: 'root',
  //  children: [
  //    this.columnGroupA[0]
  //  ]
  //};

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
