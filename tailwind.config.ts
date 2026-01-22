import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'cap-teal': '#00897B',
                'cap-black': '#050505',
                'cap-gold': '#FFD700',
            },
            fontFamily: {
                oswald: ['var(--font-oswald)'],
                outfit: ['var(--font-outfit)'],
            },
        },
    },
    plugins: [],
};
export default config;
