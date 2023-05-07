import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import VenteRepository from '../database/repositories/venteRepository';
import ClientRepository from '../database/repositories/clientRepository';
import TvaRepository from '../database/repositories/tvaRepository';
import TaxesRepository from '../database/repositories/taxesRepository';
import SocieteRepository from '../database/repositories/societeRepository';

export default class VenteService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.clientVente = await ClientRepository.filterIdInTenant(data.clientVente, { ...this.options, session });
      data.tva = await TvaRepository.filterIdsInTenant(data.tva, { ...this.options, session });
      data.taxe = await TaxesRepository.filterIdsInTenant(data.taxe, { ...this.options, session });
      data.venteSociete = await SocieteRepository.filterIdInTenant(data.venteSociete, { ...this.options, session });

      const record = await VenteRepository.create(data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'vente',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.clientVente = await ClientRepository.filterIdInTenant(data.clientVente, { ...this.options, session });
      data.tva = await TvaRepository.filterIdsInTenant(data.tva, { ...this.options, session });
      data.taxe = await TaxesRepository.filterIdsInTenant(data.taxe, { ...this.options, session });
      data.venteSociete = await SocieteRepository.filterIdInTenant(data.venteSociete, { ...this.options, session });

      const record = await VenteRepository.update(
        id,
        data,
        {
          ...this.options,
          session,
        },
      );

      await MongooseRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'vente',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      for (const id of ids) {
        await VenteRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return VenteRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return VenteRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return VenteRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await VenteRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
