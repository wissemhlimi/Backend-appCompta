import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import AchatsRepository from '../database/repositories/achatsRepository';
import FournisseurRepository from '../database/repositories/fournisseurRepository';
import TvaRepository from '../database/repositories/tvaRepository';
import TaxesRepository from '../database/repositories/taxesRepository';
import SocieteRepository from '../database/repositories/societeRepository';

export default class AchatsService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.founisseurAchat = await FournisseurRepository.filterIdInTenant(data.founisseurAchat, { ...this.options, session });
      data.achatTVA = await TvaRepository.filterIdInTenant(data.achatTVA, { ...this.options, session });
      data.achatTaxe = await TaxesRepository.filterIdInTenant(data.achatTaxe, { ...this.options, session });
      data.achatSociete = await SocieteRepository.filterIdInTenant(data.achatSociete, { ...this.options, session });

      const record = await AchatsRepository.create(data, {
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
        'achats',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.founisseurAchat = await FournisseurRepository.filterIdInTenant(data.founisseurAchat, { ...this.options, session });
      data.achatTVA = await TvaRepository.filterIdInTenant(data.achatTVA, { ...this.options, session });
      data.achatTaxe = await TaxesRepository.filterIdInTenant(data.achatTaxe, { ...this.options, session });
      data.achatSociete = await SocieteRepository.filterIdInTenant(data.achatSociete, { ...this.options, session });

      const record = await AchatsRepository.update(
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
        'achats',
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
        await AchatsRepository.destroy(id, {
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
    return AchatsRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return AchatsRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return AchatsRepository.findAndCountAll(
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
    const count = await AchatsRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
