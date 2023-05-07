import Error400 from '../errors/Error400';
import MongooseRepository from '../database/repositories/mongooseRepository';
import { IServiceOptions } from './IServiceOptions';
import SocieteRepository from '../database/repositories/societeRepository';
import ActivityRepository from '../database/repositories/activityRepository';
import CabinetRepository from '../database/repositories/cabinetRepository';
import FournisseurRepository from '../database/repositories/fournisseurRepository';
import ClientRepository from '../database/repositories/clientRepository';
import UserRepository from '../database/repositories/userRepository';

export default class SocieteService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.activityType = await ActivityRepository.filterIdInTenant(data.activityType, { ...this.options, session });
      data.userSociete = await UserRepository.filterIdsInTenant(data.userSociete, { ...this.options, session });
      data.societeCabinet = await CabinetRepository.filterIdInTenant(data.societeCabinet, { ...this.options, session });
      data.fournisseurSociete = await FournisseurRepository.filterIdsInTenant(data.fournisseurSociete, { ...this.options, session });
      data.clientsSociete = await ClientRepository.filterIdsInTenant(data.clientsSociete, { ...this.options, session });

      const record = await SocieteRepository.create(data, {
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
        'societe',
      );

      throw error;
    }
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database,
    );

    try {
      data.activityType = await ActivityRepository.filterIdInTenant(data.activityType, { ...this.options, session });
      data.userSociete = await UserRepository.filterIdsInTenant(data.userSociete, { ...this.options, session });
      data.societeCabinet = await CabinetRepository.filterIdInTenant(data.societeCabinet, { ...this.options, session });
      data.fournisseurSociete = await FournisseurRepository.filterIdsInTenant(data.fournisseurSociete, { ...this.options, session });
      data.clientsSociete = await ClientRepository.filterIdsInTenant(data.clientsSociete, { ...this.options, session });

      const record = await SocieteRepository.update(
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
        'societe',
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
        await SocieteRepository.destroy(id, {
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
    return SocieteRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return SocieteRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return SocieteRepository.findAndCountAll(
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
    const count = await SocieteRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
