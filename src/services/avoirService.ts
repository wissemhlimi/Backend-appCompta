import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import AvoirRepository from '../database/repositories/avoirRepository';
import FournisseurRepository from '../database/repositories/fournisseurRepository';
import TvaRepository from '../database/repositories/tvaRepository';
import TaxesRepository from '../database/repositories/taxesRepository';
import SocieteRepository from '../database/repositories/societeRepository';

export default class AvoirService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.fournisseurAvoir = await FournisseurRepository.filterIdInTenant(data.fournisseurAvoir, { ...this.options, session });
      data.avoirTVA = await TvaRepository.filterIdsInTenant(data.avoirTVA, { ...this.options, session });
      data.avoirTaxe = await TaxesRepository.filterIdsInTenant(data.avoirTaxe, { ...this.options, session });
      data.avoirSociete = await SocieteRepository.filterIdInTenant(data.avoirSociete, { ...this.options, session });

      const record = await AvoirRepository.create(data, {
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
        'avoir',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.fournisseurAvoir = await FournisseurRepository.filterIdInTenant(data.fournisseurAvoir, { ...this.options, session });
      data.avoirTVA = await TvaRepository.filterIdsInTenant(data.avoirTVA, { ...this.options, session });
      data.avoirTaxe = await TaxesRepository.filterIdsInTenant(data.avoirTaxe, { ...this.options, session });
      data.avoirSociete = await SocieteRepository.filterIdInTenant(data.avoirSociete, { ...this.options, session });

      const record = await AvoirRepository.update(
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
        'avoir',
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
        await AvoirRepository.destroy(id, {
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
    return AvoirRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return AvoirRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return AvoirRepository.findAndCountAll(
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
    const count = await AvoirRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
