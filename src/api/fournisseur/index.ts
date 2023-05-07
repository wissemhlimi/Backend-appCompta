export default (app) => {
  app.post(
    `/tenant/:tenantId/fournisseur`,
    require('./fournisseurCreate').default,
  );
  app.put(
    `/tenant/:tenantId/fournisseur/:id`,
    require('./fournisseurUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/fournisseur/import`,
    require('./fournisseurImport').default,
  );
  app.delete(
    `/tenant/:tenantId/fournisseur`,
    require('./fournisseurDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/fournisseur/autocomplete`,
    require('./fournisseurAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/fournisseur`,
    require('./fournisseurList').default,
  );
  app.get(
    `/tenant/:tenantId/fournisseur/:id`,
    require('./fournisseurFind').default,
  );
};
