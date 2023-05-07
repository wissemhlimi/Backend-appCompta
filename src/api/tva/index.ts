export default (app) => {
  app.post(
    `/tenant/:tenantId/tva`,
    require('./tvaCreate').default,
  );
  app.put(
    `/tenant/:tenantId/tva/:id`,
    require('./tvaUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/tva/import`,
    require('./tvaImport').default,
  );
  app.delete(
    `/tenant/:tenantId/tva`,
    require('./tvaDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/tva/autocomplete`,
    require('./tvaAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/tva`,
    require('./tvaList').default,
  );
  app.get(
    `/tenant/:tenantId/tva/:id`,
    require('./tvaFind').default,
  );
};