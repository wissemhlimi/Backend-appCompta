const models = [
  require('./tenant').default,
  require('./auditLog').default,  
  require('./settings').default,
  require('./user').default,
  require('./client').default,
  require('./fournisseur').default,
  require('./societe').default,
  require('./cabinet').default,
  require('./taxes').default,
  require('./vente').default,
  require('./tva').default,
  require('./achats').default,
  require('./avoir').default,
  require('./activity').default,  
];

export default function init(database) {
  for (let model of models) {
    model(database);
  }

  return database;
}

export async function createCollections(database) {
  for (let model of models) {
    await model(database).createCollection();
  }

  return database;
}
