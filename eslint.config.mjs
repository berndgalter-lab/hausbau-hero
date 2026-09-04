import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

// Next 16 hat `next lint` entfernt — ESLint 9 wird direkt aufgerufen und braucht Flat Config.
const config = [
  { ignores: [".next/**", "node_modules/**", "scripts/**", "next-env.d.ts"] },
  ...nextCoreWebVitals,
];

export default config;
