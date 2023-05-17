import mongoose from 'mongoose';
import FileSchema from './schemas/fileSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('avoir');
  } catch (error) {
    // continue, because model doesnt exist 
  }

  const AvoirSchema = new Schema(
    {
      numeroAvoir: {
        type: String,
        required: true,
      },
      dateAvoir: {
        type: String,
        required: true,
      },
      fournisseurAvoir: {
        type: Schema.Types.ObjectId,
        ref: 'fournisseur',
        required: true,
      },
      montantHTAvoir: {
        type: Number,
        required: true,
      },
      

      avoirTaxeList: [
        {
          avoirTaxe: {
            type: Schema.Types.ObjectId,
            ref: 'taxes',
          },
          valeur: {
            type: Number,
          },

        },
      ],
      
      montantTTCAvoir: {
        type: Number,
        required: true,
      },
      attachementAvoir: [FileSchema],
      avoirSociete: {
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

  AvoirSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );



  AvoirSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  AvoirSchema.set('toJSON', {
    getters: true,
  });

  AvoirSchema.set('toObject', {
    getters: true,
  });

  return database.model('avoir', AvoirSchema);
};
