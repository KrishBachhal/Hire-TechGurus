// icons.js
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';

const icons = {
  microsoft: {
    prefix: 'fab',
    iconName: 'microsoft',
    icon: [448, 512, [], 'f3ca', 'M0 32h214.6v214.6H0V32zm233.4 0H448v214.6H233.4V32zM0 265.4h214.6V480H0V265.4zm233.4 0H448V480H233.4V265.4z'],
  },
  markdown: {
    prefix: 'fab',
    iconName: 'markdown',
    icon: [640, 512, [], 'f60f', 'M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z'],
  },
  // ... more icons ...
};

library.add(fab(...Object.values(icons)));

export default icons;


// app.js
import icons from './icons.js';

// Use the icons object to render Font Awesome icons
// ...
