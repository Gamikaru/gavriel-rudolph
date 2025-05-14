/* .storybook/preview.ts */

// Import Preview type from @storybook/react (for type definitions only)
import type { Preview } from '@storybook/react'

// Import your global CSS for Tailwind styles
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;