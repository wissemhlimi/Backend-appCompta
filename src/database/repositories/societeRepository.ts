import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import Societe from '../models/societe';
import UserRepository from './userRepository';
import FileRepository from './fileRepository';
import Activity from '../models/activity';
import Client from '../models/client';
import Fournisseur from '../models/fournisseur';
import Cabinet from '../models/cabinet';
import Vente from '../models/vente';
import Achats from '../models/achats';
import Avoir from '../models/avoir';

class SocieteRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await Societe(
      options.database,
    ).create(
      [
        {
          ...data,
          tenant: currentTenant.id,
          createdBy: currentUser.id,
          updatedBy: currentUser.id,
        }
      ],
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record.id,
      data,
      options,
    );

    await MongooseRepository.refreshTwoWayRelationOneToMany(
      record,
      'activityType',
      Activity(options.database),
      'societeType',
      options,
    );    

    return this.findById(record.id, options);
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Societe(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await Societe(options.database).updateOne(
      { _id: id },
      {
        ...data,
        updatedBy: MongooseRepository.getCurrentUser(
          options,
        ).id,
      },
      options,
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      id,
      data,
      options,
    );

    record = await this.findById(id, options);

    await MongooseRepository.refreshTwoWayRelationOneToMany(
      record,
      'activityType',
      Activity(options.database),
      'societeType',
      options,
    );

    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Societe(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await Societe(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
      options,
    );

    await MongooseRepository.destroyRelationToOne(
      id,
      Client(options.database),
      'cilentSociete',
      options,
    );

    await MongooseRepository.destroyRelationToOne(
      id,
      Fournisseur(options.database),
      'fournisseurSociete',
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      Cabinet(options.database),
      'cabinetSociete',
      options,
    );

    await MongooseRepository.destroyRelationToOne(
      id,
      Vente(options.database),
      'venteSociete',
      options,
    );

    await MongooseRepository.destroyRelationToOne(
      id,
      Achats(options.database),
      'achatSociete',
      options,
    );

    await MongooseRepository.destroyRelationToOne(
      id,
      Avoir(options.database),
      'avoirSociete',
      options,
    );

    await MongooseRepository.destroyRelationToMany(
      id,
      Activity(options.database),
      'societeType',
      options,
    );
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const currentTenant =
      MongooseRepository.getCurrentTenant(options);

    const records = await Societe(options.database)
      .find({
        _id: { $in: ids },
        tenant: currentTenant.id,
      })
      .select(['_id']);

    return records.map((record) => record._id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    return MongooseRepository.wrapWithSessionIfExists(
      Societe(options.database).countDocuments({
        ...filter,
        tenant: currentTenant.id,
      }),
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Societe(options.database)
        .findOne({_id: id, tenant: currentTenant.id})
      .populate('activityType')
      .populate('userSociete')
      .populate('societeCabinet')
      .populate('fournisseurSociete')
      .populate('clientsSociete'),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    return this._mapRelationshipsAndFillDownloadUrl(record);
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let criteriaAnd: any = [];
    
    criteriaAnd.push({
      tenant: currentTenant.id,
    });

    if (filter) {
      if (filter.id) {
        criteriaAnd.push({
          ['_id']: MongooseQueryUtils.uuid(filter.id),
        });
      }

      if (filter.activityType) {
        criteriaAnd.push({
          activityType: MongooseQueryUtils.uuid(
            filter.activityType,
          ),
        });
      }

      if (filter.nomSociete) {
        criteriaAnd.push({
          nomSociete: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.nomSociete,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.societeCabinet) {
        criteriaAnd.push({
          societeCabinet: MongooseQueryUtils.uuid(
            filter.societeCabinet,
          ),
        });
      }

      if (filter.mFSociete) {
        criteriaAnd.push({
          mFSociete: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.mFSociete,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.telephoneSociete) {
        criteriaAnd.push({
          telephoneSociete: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.telephoneSociete,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.emailSociete) {
        criteriaAnd.push({
          emailSociete: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.emailSociete,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $gte: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          criteriaAnd.push({
            ['createdAt']: {
              $lte: end,
            },
          });
        }
      }
    }

    const sort = MongooseQueryUtils.sort(
      orderBy || 'createdAt_DESC',
    );

    const skip = Number(offset || 0) || undefined;
    const limitEscaped = Number(limit || 0) || undefined;
    const criteria = criteriaAnd.length
      ? { $and: criteriaAnd }
      : null;

    let rows = await Societe(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('activityType')
      .populate('userSociete')
      .populate('societeCabinet')
      .populate('fournisseurSociete')
      .populate('clientsSociete');

    const count = await Societe(
      options.database,
    ).countDocuments(criteria);

    rows = await Promise.all(
      rows.map(this._mapRelationshipsAndFillDownloadUrl),
    );

    return { rows, count };
  }

  static async findAllAutocomplete(search, limit, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let criteriaAnd: Array<any> = [{
      tenant: currentTenant.id,
    }];

    if (search) {
      criteriaAnd.push({
        $or: [
          {
            _id: MongooseQueryUtils.uuid(search),
          },
          {
            nomSociete: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('nomSociete_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Societe(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.nomSociete,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: Societe(options.database).modelName,
        entityId: id,
        action,
        values: data,
      },
      options,
    );
  }

  static async _mapRelationshipsAndFillDownloadUrl(record) {
    if (!record) {
      return null;
    }

    const output = record.toObject
      ? record.toObject()
      : record;

    output.logoSociete = await FileRepository.fillDownloadUrl(
      output.logoSociete,
    );

    output.userSociete = UserRepository.cleanupForRelationships(output.userSociete);

    return output;
  }
}

export default SocieteRepository;
