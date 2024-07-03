import { NEOVIS_ADVANCED_CONFIG } from "neovis.js";

export const facebookLabels = {
  "Persona": {
    label: 'Name',
    value: 'name',
    [NEOVIS_ADVANCED_CONFIG]: {
      static: {
        shape: 'image',
        image: 'assets/images/cliente_banco_entidad.png',
        brokenImage: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png',
        font: {
          color: '#fff',
          strokeWidth: 0,
          background: '#110c2a',
          size: 10
        },
      }
    }
  },
}