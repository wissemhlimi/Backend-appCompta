import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('vente');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const VenteSchema = new Schema(
    {
      numeroFacture: {
        type: String,
        required: true,
      },
      clientVente: {
        type: Schema.Types.ObjectId,
        ref: 'client',
        required: true,
      },
      montantHTVente: {
        type: Number,
        required: true,
      },
      tva: [{
        type: Schema.Types.ObjectId,
        ref: 'tva',
      }],
      taxe: [{
        type: Schema.Types.ObjectId,
        ref: 'taxes',
      }],
      remise: {
        type: Number,
      },
      montantTTCVente: {
        type: Number,
        required: true,
      },
      dateVente: {
        type: String,
        required: true,
      },
      attachementVente: [FileSchema],
      venteSociete: {
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

  VenteSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  VenteSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  VenteSchema.set('toJSON', {
    getters: true,
  });

  VenteSchema.set('toObject', {
    getters: true,
  });

  return database.model('vente', VenteSchema);
};
