/**
 * Storage permissions.
 *
 * @id - Used to identify the rule on permissions and upload.
 * @folder - Folder where the files will be saved
 * @maxSizeInBytes - Max allowed size in bytes
 * @bypassWritingPermissions - Does not validate if the user has permission to write
 * @publicRead - The file can be publicly accessed via the URL without the need for a signed token
 */
export default class Storage {
  static get values() {
    return {
      userAvatarsProfiles: {
        id: 'userAvatarsProfiles',
        folder: 'user/avatars/profile/:userId',
        maxSizeInBytes: 10 * 1024 * 1024,
        bypassWritingPermissions: true,
        publicRead: true,
      },
      settingsLogos: {
        id: 'settingsLogos',
        folder: 'tenant/:tenantId/settings/logos',
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },
      settingsBackgroundImages: {
        id: 'settingsBackgroundImages',
        folder:
          'tenant/:tenantId/settings/backgroundImages',
        maxSizeInBytes: 10 * 1024 * 1024,
        publicRead: true,
      },
      clientPhotoClient: {
        id: 'clientPhotoClient',
        folder: 'tenant/:tenantId/client/photoClient',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      fournisseurPhotoFournisseur: {
        id: 'fournisseurPhotoFournisseur',
        folder: 'tenant/:tenantId/fournisseur/photoFournisseur',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      societeLogoSociete: {
        id: 'societeLogoSociete',
        folder: 'tenant/:tenantId/societe/logoSociete',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      cabinetLogoCabinet: {
        id: 'cabinetLogoCabinet',
        folder: 'tenant/:tenantId/cabinet/logoCabinet',
        maxSizeInBytes: 100 * 1024 * 1024,
      },



      venteAttachementVente: {
        id: 'venteAttachementVente',
        folder: 'tenant/:tenantId/vente/attachementVente',
        maxSizeInBytes: 100 * 1024 * 1024,
      },



      achatsAttachementAchat: {
        id: 'achatsAttachementAchat',
        folder: 'tenant/:tenantId/achats/attachementAchat',
        maxSizeInBytes: 100 * 1024 * 1024,
      },

      avoirAttachementAvoir: {
        id: 'avoirAttachementAvoir',
        folder: 'tenant/:tenantId/avoir/attachementAvoir',
        maxSizeInBytes: 100 * 1024 * 1024,
      },


    };
  }
}
