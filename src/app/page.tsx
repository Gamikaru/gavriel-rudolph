/* Update src/app/page.tsx to include the ThemeToggle */
import { StandaloneThemeToggle } from "@/components/ui/theme/StandaloneThemeToggle";

export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-8 gap-8">
      <header>
        <h1 className="text-2xl font-bold">Theme Demo</h1>
      </header>

      <main className="flex flex-col gap-8 items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <StandaloneThemeToggle />
        </div>

        {/* Sample UI elements to showcase theme changes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
          <div className="p-6 rounded-lg bg-primary/10 border border-primary">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Primary Color Card
            </h2>
            <p className="text-foreground">
              This card uses the primary color from your theme.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-secondary/10 border border-secondary">
            <h2 className="text-xl font-semibold text-secondary mb-2">
              Secondary Color Card
            </h2>
            <p className="text-foreground">
              This card uses the secondary color from your theme.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-accent/10 border border-accent">
            <h2 className="text-xl font-semibold text-accent mb-2">
              Accent Color Card
            </h2>
            <p className="text-foreground">
              This card uses the accent color from your theme.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-muted border border-border">
            <h2 className="text-xl font-semibold mb-2">
              Muted Background Card
            </h2>
            <p className="text-muted-foreground">
              This card uses muted colors from your theme.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-muted-foreground">
        Theme system demo using Tailwind CSS v4
      </footer>
    </div>
  );
}