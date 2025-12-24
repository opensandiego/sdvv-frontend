import { applicationConfig, type Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';
import { providePrimeNG } from 'primeng/config';
import { PrimePreset } from 'src/prime-preset';
setCompodocJson(docJson);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    // docs: { inlineStories: true },
  },
  decorators: [
    applicationConfig({
      providers: [
        providePrimeNG({
          theme: {
            preset: PrimePreset,
            options: {
              darkModeSelector: false,
              cssLayer: {
                name: 'primeng',
                order: 'theme, base, primeng',
              },
            },
          },
        }),
      ],
    }),
  ],
};

export default preview;
