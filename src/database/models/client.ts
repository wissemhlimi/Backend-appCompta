import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('client');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ClientSchema = new Schema(
    {
      nomClient: {
        type: String,
        required: true,
      },
      mFClient: {
        type: String,
        required: true,
      },
      adresseClient: {
        type: String,
        required: true,
      },
      telephoneClient: {
        type: String,
        required: true,
      },
      emailClient: {
        type: String,
      },
      photoClient: [FileSchema],
      commentaireClient: {
        type: String,
      },
      cilentSociete: {
        type: Schema.Types.ObjectId,
        ref: 'societe',
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

  ClientSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ClientSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ClientSchema.set('toJSON', {
    getters: true,
  });

  ClientSchema.set('toObject', {
    getters: true,
  });

  return database.model('client', ClientSchema);
};
