import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--ds-background)",
        foreground: "var(--ds-foreground)",
        primary: {
          DEFAULT: "var(--ds-primary)",
          foreground: "var(--ds-primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--ds-secondary)",
          foreground: "var(--ds-secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--ds-destructive)",
          foreground: "var(--ds-destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--ds-muted)",
          foreground: "var(--ds-muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--ds-accent)",
          foreground: "var(--ds-accent-foreground)",
        },
        border: "var(--ds-border)",
        input: "var(--ds-input)",
        ring: "var(--ds-ring)",
      },
      borderRadius: {
        DEFAULT: "var(--ds-radius)",
      },
    },
  },
  plugins: [],
};

export default config;
