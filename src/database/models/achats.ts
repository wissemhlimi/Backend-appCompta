import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('achats');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const AchatsSchema = new Schema(
    {
      numeroFactureAchat: {
        type: String,
        required: true,
      },
      dateAchat: {
        type: String,
        required: true,
      },
      founisseurAchat: {
        type: Schema.Types.ObjectId,
        ref: 'fournisseur',
        required: true,
      },
      montantHTAchat: {
        type: Number,
        required: true,
      },
      achatTVA: {
        type: Schema.Types.ObjectId,
        ref: 'tva',
      },
      achatTaxe: {
        type: Schema.Types.ObjectId,
        ref: 'taxes',
      },
      achatRemise: {
        type: Number,
      },
      rSAchat: {
        type: Number,
      },
      montantTTCAchat: {
        type: Number,
        required: true,
      },
      montantNetRSAchat: {
        type: Number,
      },
      attachementAchat: [FileSchema],
      achatSociete: {
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

  AchatsSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  AchatsSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  AchatsSchema.set('toJSON', {
    getters: true,
  });

  AchatsSchema.set('toObject', {
    getters: true,
  });

  return database.model('achats', AchatsSchema);
};
