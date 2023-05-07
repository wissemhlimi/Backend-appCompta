import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('tva');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TvaSchema = new Schema(
    {
      nomTVA: {
        type: String,
      },
      tvaActivity: {
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

  TvaSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  TvaSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TvaSchema.set('toJSON', {
    getters: true,
  });

  TvaSchema.set('toObject', {
    getters: true,
  });

  return database.model('tva', TvaSchema);
};
