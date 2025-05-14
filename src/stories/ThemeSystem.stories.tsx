/* src/stories/ThemeToggle.stories.tsx */
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggle } from '@/components/ui/theme/ThemeToggle';
import { ThemeProvider } from '@/lib/theme/ThemeProvider';

const meta: Meta<typeof ThemeToggle> = {
  title: 'UI/ThemeToggle',
  component: ThemeToggle,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="p-6 bg-background text-foreground">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: 'dark' },
  },
};