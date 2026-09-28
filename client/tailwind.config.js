/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                executive: {
                    950: '#0B0B0C', // Background
                    900: '#151517', // Surface
                    800: '#1C1C1E', // Elevated
                    700: '#27272A', // Border
                },
                gold: {
                    DEFAULT: '#C9A96A', // Champagne Gold
                    muted: '#8B7355',   // Bronze
                    glow: 'rgba(201, 169, 106, 0.2)',
                },
                zinc: {
                    900: '#18181B',
                    800: '#27272A',
                    700: '#3F3F46', // Hover
                }
            },
            fontFamily: {
                sans: ['"Outfit"', 'sans-serif'],
            },
            borderRadius: {
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            boxShadow: {
                'gold-aura': '0 0 20px rgba(201, 169, 106, 0.08)',
                'gold-focal': '0 0 30px rgba(201, 169, 106, 0.15)',
            }
        },
    },
    plugins: [],
}
