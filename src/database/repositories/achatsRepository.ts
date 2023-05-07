import MongooseRepository from './mongooseRepository';
import MongooseQueryUtils from '../utils/mongooseQueryUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import Achats from '../models/achats';
import FileRepository from './fileRepository';

class AchatsRepository {
  
  static async create(data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    const currentUser = MongooseRepository.getCurrentUser(
      options,
    );

    const [record] = await Achats(
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

    

    return this.findById(record.id, options);
  }

  static async update(id, data, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Achats(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await Achats(options.database).updateOne(
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



    return record;
  }

  static async destroy(id, options: IRepositoryOptions) {
    const currentTenant = MongooseRepository.getCurrentTenant(
      options,
    );

    let record = await MongooseRepository.wrapWithSessionIfExists(
      Achats(options.database).findOne({_id: id, tenant: currentTenant.id}),
      options,
    );

    if (!record) {
      throw new Error404();
    }

    await Achats(options.database).deleteOne({ _id: id }, options);

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      id,
      record,
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

    const records = await Achats(options.database)
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
      Achats(options.database).countDocuments({
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
      Achats(options.database)
        .findOne({_id: id, tenant: currentTenant.id})
      .populate('founisseurAchat')
      .populate('achatTVA')
      .populate('achatTaxe')
      .populate('achatSociete'),
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

      if (filter.numeroFactureAchat) {
        criteriaAnd.push({
          numeroFactureAchat: {
            $regex: MongooseQueryUtils.escapeRegExp(
              filter.numeroFactureAchat,
            ),
            $options: 'i',
          },
        });
      }

      if (filter.dateAchatRange) {
        const [start, end] = filter.dateAchatRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            dateAchat: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            dateAchat: {
              $lte: end,
            },
          });
        }
      }

      if (filter.founisseurAchat) {
        criteriaAnd.push({
          founisseurAchat: MongooseQueryUtils.uuid(
            filter.founisseurAchat,
          ),
        });
      }

      if (filter.montantHTAchatRange) {
        const [start, end] = filter.montantHTAchatRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            montantHTAchat: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            montantHTAchat: {
              $lte: end,
            },
          });
        }
      }

      if (filter.achatTVA) {
        criteriaAnd.push({
          achatTVA: MongooseQueryUtils.uuid(
            filter.achatTVA,
          ),
        });
      }

      if (filter.achatTaxe) {
        criteriaAnd.push({
          achatTaxe: MongooseQueryUtils.uuid(
            filter.achatTaxe,
          ),
        });
      }

      if (filter.achatRemiseRange) {
        const [start, end] = filter.achatRemiseRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            achatRemise: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            achatRemise: {
              $lte: end,
            },
          });
        }
      }

      if (filter.rSAchatRange) {
        const [start, end] = filter.rSAchatRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            rSAchat: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            rSAchat: {
              $lte: end,
            },
          });
        }
      }

      if (filter.montantTTCAchatRange) {
        const [start, end] = filter.montantTTCAchatRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            montantTTCAchat: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            montantTTCAchat: {
              $lte: end,
            },
          });
        }
      }

      if (filter.montantNetRSAchatRange) {
        const [start, end] = filter.montantNetRSAchatRange;

        if (start !== undefined && start !== null && start !== '') {
          criteriaAnd.push({
            montantNetRSAchat: {
              $gte: start,
            },
          });
        }

        if (end !== undefined && end !== null && end !== '') {
          criteriaAnd.push({
            montantNetRSAchat: {
              $lte: end,
            },
          });
        }
      }

      if (filter.achatSociete) {
        criteriaAnd.push({
          achatSociete: MongooseQueryUtils.uuid(
            filter.achatSociete,
          ),
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

    let rows = await Achats(options.database)
      .find(criteria)
      .skip(skip)
      .limit(limitEscaped)
      .sort(sort)
      .populate('founisseurAchat')
      .populate('achatTVA')
      .populate('achatTaxe')
      .populate('achatSociete');

    const count = await Achats(
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
            numeroFactureAchat: {
              $regex: MongooseQueryUtils.escapeRegExp(search),
              $options: 'i',
            }
          },          
        ],
      });
    }

    const sort = MongooseQueryUtils.sort('numeroFactureAchat_ASC');
    const limitEscaped = Number(limit || 0) || undefined;

    const criteria = { $and: criteriaAnd };

    const records = await Achats(options.database)
      .find(criteria)
      .limit(limitEscaped)
      .sort(sort);

    return records.map((record) => ({
      id: record.id,
      label: record.numeroFactureAchat,
    }));
  }

  static async _createAuditLog(action, id, data, options: IRepositoryOptions) {
    await AuditLogRepository.log(
      {
        entityName: Achats(options.database).modelName,
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

    output.attachementAchat = await FileRepository.fillDownloadUrl(
      output.attachementAchat,
    );



    return output;
  }
}

export default AchatsRepository;
