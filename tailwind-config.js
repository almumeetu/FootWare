tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#0f1724', 
        accent: '#ff9900', 
        muted: '#6b7280'   
      },
      boxShadow: {
        'soft-blue': '0 0 20px 0 rgba(190, 210, 255, 0.70)',
        card: '0 6px 22px rgba(16,24,40,0.06)',
        softIn: 'inset 0 1px 0 rgba(255,255,255,0.6)',
        card: '0 8px 28px rgba(15,23,42,0.06)',
        subtle: '0 6px 18px rgba(16,24,40,0.04)'
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
      borderRadius: {
        xl2: '14px',
        'card-lg': '18px'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
    },
  },
};
