import { definePreset } from '@primeuix/themes';
import Material from '@primeuix/themes/material';

export const PrimePreset = definePreset(Material, {
  components: {
    floatlabel: { root: { focusColor: '{blue.400}' } },
    select: {
      root: {},
      colorScheme: {
        light: {
          root: {
            focusBorderColor: '{blue.400}',
            focusRing: { color: '{blue.600}' },
          },
          option: {
            selectedBackground: '{blue.200}',
            selectedColor: '{blue.600}',
            selectedFocusBackground: '{blue.300}',
            selectedFocusColor: '{blue.900}',
          },
        },
      },
    },
  },
});
