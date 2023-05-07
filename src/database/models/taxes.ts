import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('taxes');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TaxesSchema = new Schema(
    {
      nomTaxe: {
        type: String,
      },
      taxesActivity: {
        type: Schema.Types.ObjectId,
        ref: 'activity',
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

  TaxesSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  TaxesSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TaxesSchema.set('toJSON', {
    getters: true,
  });

  TaxesSchema.set('toObject', {
    getters: true,
  });

  return database.model('taxes', TaxesSchema);
};
