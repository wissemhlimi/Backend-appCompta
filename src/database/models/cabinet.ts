import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('cabinet');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const CabinetSchema = new Schema(
    {
      nomCabinet: {
        type: String,
        required: true,
      },
      cabinetUser: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
      }],
      cabinetSociete: [{
        type: Schema.Types.ObjectId,
        ref: 'societe',
      }],
      telCabinet: {
        type: String,
        required: true,
      },
      adresseCabinet: {
        type: String,
        required: true,
      },
      emailCabinet: {
        type: String,
      },
      logoCabinet: [FileSchema],
      commentaireCabinet: {
        type: String,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String },
    },
    { timestamps: true },
  );

  CabinetSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  CabinetSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  CabinetSchema.set('toJSON', {
    getters: true,
  });

  CabinetSchema.set('toObject', {
    getters: true,
  });

  return database.model('cabinet', CabinetSchema);
};
