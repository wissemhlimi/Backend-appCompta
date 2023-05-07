import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('societe');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const SocieteSchema = new Schema(
    {
      activityType: {
        type: Schema.Types.ObjectId,
        ref: 'activity',
      },
      nomSociete: {
        type: String,
        required: true,
      },
      userSociete: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
      }],
      societeCabinet: {
        type: Schema.Types.ObjectId,
        ref: 'cabinet',
      },
      mFSociete: {
        type: String,
        required: true,
      },
      telephoneSociete: {
        type: String,
        required: true,
      },
      adresseSociete: {
        type: String,
        required: true,
      },
      emailSociete: {
        type: String,
      },
      logoSociete: [FileSchema],
      commentaireSociete: {
        type: String,
      },
      fournisseurSociete: [{
        type: Schema.Types.ObjectId,
        ref: 'fournisseur',
      }],
      clientsSociete: [{
        type: Schema.Types.ObjectId,
        ref: 'client',
      }],
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

  SocieteSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  SocieteSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  SocieteSchema.set('toJSON', {
    getters: true,
  });

  SocieteSchema.set('toObject', {
    getters: true,
  });

  return database.model('societe', SocieteSchema);
};
