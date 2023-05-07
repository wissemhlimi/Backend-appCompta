import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('activity');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ActivitySchema = new Schema(
    {
      activityName: {
        type: String,
      },
      societeType: [{
        type: Schema.Types.ObjectId,
        ref: 'societe',
      }],
      taxeType: [{
        type: Schema.Types.ObjectId,
        ref: 'taxes',
      }],
      tVAType: [{
        type: Schema.Types.ObjectId,
        ref: 'tva',
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

  ActivitySchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  

  ActivitySchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ActivitySchema.set('toJSON', {
    getters: true,
  });

  ActivitySchema.set('toObject', {
    getters: true,
  });

  return database.model('activity', ActivitySchema);
};
