import ENTITY_NAMES from './entities';

export const PRIMARY_DATABASE_PROVIDER = 'PRIMARY_DATABASE';
export const CONFIG_PROVIDER = 'CONFIG';
export const REPOSITORY = Object.keys(ENTITY_NAMES).reduce(
  (prev, key) => ({
    ...prev,
    [key.toUpperCase()]: `${key.toUpperCase()}_REPOSITORY`,
  }),
  {} as Record<
    keyof typeof ENTITY_NAMES,
    `${keyof typeof ENTITY_NAMES}_REPOSITORY`
  >,
);
console.log(REPOSITORY);
