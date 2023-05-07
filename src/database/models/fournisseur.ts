import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('fournisseur');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const FournisseurSchema = new Schema(
    {
      nomFournisseur: {
        type: String,
        required: true,
      },
      mFFournisseur: {
        type: String,
        required: true,
      },
      adresseFournisseur: {
        type: String,
        required: true,
      },
      telephoneFournisseur: {
        type: String,
        required: true,
      },
      emailFournisseur: {
        type: String,
      },
      photoFournisseur: [FileSchema],
      commentaireFournisseur: {
        type: String,
      },
      fournisseurSociete: {
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

  FournisseurSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  FournisseurSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  FournisseurSchema.set('toJSON', {
    getters: true,
  });

  FournisseurSchema.set('toObject', {
    getters: true,
  });

  return database.model('fournisseur', FournisseurSchema);
};
