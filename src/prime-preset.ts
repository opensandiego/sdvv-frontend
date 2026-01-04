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
            padding: "8px 16px 8px 16px",
            // focus = hover
            selectedBackground: '{blue.200}',
            selectedColor: '{black.600}',
            selectedFocusBackground: '{blue.100}',
            selectedFocusColor: '{black.900}',
          },
        },
      },
    },
  },
});
