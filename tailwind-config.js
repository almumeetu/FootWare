tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#0f1724',
        accent: '#ff9900',
        muted: '#6b7280',
        'primary-blue': '#1a237e',
        'accent-orange': '#ff9800',
        'sale-red': '#f44336',
        'border-cyan': '#80deea',
        'light-bg': '#e0f7fa',
        'zinc-100': '#f4f4f5',
        'amber-500': '#f59e0b',
        'neutral-800': '#292929', 
        'zinc-500': '#71717a', 
        'slate-400': '#94a3b8',
        'red-800': '#991b1b',
        'blue-700': '#1d4ed8',
        'gray-700': '#4b5563',
      },
      screens: {
        'xxs': '360px',
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
};
