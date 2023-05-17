import Roles from './roles';
import Plans from './plans';
import Storage from './storage';

const storage = Storage.values;
const roles = Roles.values;
const plans = Plans.values;

class Permissions {
  static get values() {
    return {
      tenantEdit: {
        id: 'tenantEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      tenantDestroy: {
        id: 'tenantDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planEdit: {
        id: 'planEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      planRead: {
        id: 'planRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userEdit: {
        id: 'userEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userDestroy: {
        id: 'userDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userCreate: {
        id: 'userCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userImport: {
        id: 'userImport',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userRead: {
        id: 'userRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      userAutocomplete: {
        id: 'userAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [
          plans.free,
          plans.growth,
          plans.enterprise,
        ],
        allowedStorage: [
          storage.settingsBackgroundImages,
          storage.settingsLogos,
        ],
      },
      clientImport: {
        id: 'clientImport',
        allowedRoles: [roles.societe , roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      clientCreate: {
        id: 'clientCreate',
        allowedRoles: [roles.societe , roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.clientPhotoClient,
        ],
      },
      clientEdit: {
        id: 'clientEdit',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.clientPhotoClient,
        ],
      },
      clientDestroy: {
        id: 'clientDestroy',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.clientPhotoClient,
        ],
      },
      clientRead: {
        id: 'clientRead',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      clientAutocomplete: {
        id: 'clientAutocomplete',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      fournisseurImport: {
        id: 'fournisseurImport',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      fournisseurCreate: {
        id: 'fournisseurCreate',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.fournisseurPhotoFournisseur,
        ],
      },
      fournisseurEdit: {
        id: 'fournisseurEdit',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.fournisseurPhotoFournisseur,
        ],
      },
      fournisseurDestroy: {
        id: 'fournisseurDestroy',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.fournisseurPhotoFournisseur,
        ],
      },
      fournisseurRead: {
        id: 'fournisseurRead',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      fournisseurAutocomplete: {
        id: 'fournisseurAutocomplete',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      societeImport: {
        id: 'societeImport',
        allowedRoles: [roles.admin,],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      societeCreate: {
        id: 'societeCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.societeLogoSociete,
        ],
      },
      societeEdit: {
        id: 'societeEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.societeLogoSociete,
        ],
      },
      societeDestroy: {
        id: 'societeDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.societeLogoSociete,
        ],
      },
      societeRead: {
        id: 'societeRead',
        allowedRoles: [roles.admin, roles.cabinet],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      societeAutocomplete: {
        id: 'societeAutocomplete',
        allowedRoles: [roles.admin, roles.cabinet],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      cabinetImport: {
        id: 'cabinetImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      cabinetCreate: {
        id: 'cabinetCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.cabinetLogoCabinet,
        ],
      },
      cabinetEdit: {
        id: 'cabinetEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.cabinetLogoCabinet,
        ],
      },
      cabinetDestroy: {
        id: 'cabinetDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.cabinetLogoCabinet,
        ],
      },
      cabinetRead: {
        id: 'cabinetRead',
        allowedRoles: [roles.admin,],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      cabinetAutocomplete: {
        id: 'cabinetAutocomplete',
        allowedRoles: [roles.admin,],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      taxesImport: {
        id: 'taxesImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      taxesCreate: {
        id: 'taxesCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      taxesEdit: {
        id: 'taxesEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      taxesDestroy: {
        id: 'taxesDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      taxesRead: {
        id: 'taxesRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      taxesAutocomplete: {
        id: 'taxesAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      venteImport: {
        id: 'venteImport',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      venteCreate: {
        id: 'venteCreate',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.venteAttachementVente,
        ],
      },
      venteEdit: {
        id: 'venteEdit',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.venteAttachementVente,
        ],
      },
      venteDestroy: {
        id: 'venteDestroy',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.venteAttachementVente,
        ],
      },
      venteRead: {
        id: 'venteRead',
        allowedRoles: [roles.societe, roles.cabinet, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      venteAutocomplete: {
        id: 'venteAutocomplete',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      tvaImport: {
        id: 'tvaImport',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      tvaCreate: {
        id: 'tvaCreate',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      tvaEdit: {
        id: 'tvaEdit',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      tvaDestroy: {
        id: 'tvaDestroy',
        allowedRoles: [roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      tvaRead: {
        id: 'tvaRead',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      tvaAutocomplete: {
        id: 'tvaAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      achatsImport: {
        id: 'achatsImport',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      achatsCreate: {
        id: 'achatsCreate',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.achatsAttachementAchat,
        ],
      },
      achatsEdit: {
        id: 'achatsEdit',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.achatsAttachementAchat,
        ],
      },
      achatsDestroy: {
        id: 'achatsDestroy',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.achatsAttachementAchat,
        ],
      },
      achatsRead: {
        id: 'achatsRead',
        allowedRoles: [roles.cabinet, roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      achatsAutocomplete: {
        id: 'achatsAutocomplete',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      avoirImport: {
        id: 'avoirImport',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      avoirCreate: {
        id: 'avoirCreate',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.avoirAttachementAvoir,
        ],
      },
      avoirEdit: {
        id: 'avoirEdit',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.avoirAttachementAvoir,
        ],
      },
      avoirDestroy: {
        id: 'avoirDestroy',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [
          storage.avoirAttachementAvoir,
        ],
      },
      avoirRead: {
        id: 'avoirRead',
        allowedRoles: [roles.societe, roles.cabinet, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      avoirAutocomplete: {
        id: 'avoirAutocomplete',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },

      activityImport: {
        id: 'activityImport',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      activityCreate: {
        id: 'activityCreate',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      activityEdit: {
        id: 'activityEdit',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      activityDestroy: {
        id: 'activityDestroy',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
        allowedStorage: [

        ],
      },
      activityRead: {
        id: 'activityRead',
        allowedRoles: [roles.societe, roles.admin],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
      activityAutocomplete: {
        id: 'activityAutocomplete',
        allowedRoles: [roles.admin, roles.custom],
        allowedPlans: [plans.free, plans.growth, plans.enterprise],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

export default Permissions;