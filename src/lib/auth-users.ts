import bcrypt from "bcryptjs";

type AuthUserEntry = {
  username: string;
  passwordHash: string;
  roles?: string[];
};

const DEFAULT_ADMIN_HASH =
  "$2b$10$ciwM/5uSH33ordBya0y.F.MCWyneYkBEIZLwZmrnRZOpvJTvI6x9K";

const parseEnvArray = (key?: string): AuthUserEntry[] => {
  if (!key) return [];
  try {
    const parsed = JSON.parse(key);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((entry) => entry?.username && entry?.passwordHash)
      .map((entry) => ({
        username: String(entry.username).trim(),
        passwordHash: String(entry.passwordHash).trim(),
        roles: Array.isArray(entry.roles)
          ? entry.roles.map((role: unknown) => String(role).trim().toLowerCase())
          : undefined,
      }));
  } catch (error) {
    console.error("Unable to parse auth user list", error);
    return [];
  }
};

const defaultAdminUser: AuthUserEntry = {
  username: process.env.ADMIN_USERNAME ?? "ops@eaglefamilycarriers.com",
  passwordHash: process.env.ADMIN_PASSWORD_HASH ?? DEFAULT_ADMIN_HASH,
  roles: ["admin"],
};

const adminEnvUsers = parseEnvArray(process.env.ADMIN_USERS);
const driverEnvUsers = parseEnvArray(process.env.DRIVER_USERS).map((entry) => ({
  ...entry,
  roles: Array.from(new Set([...(entry.roles ?? []), "driver"])),
}));

const dedupedUsers: Record<string, AuthUserEntry> = [
  ...adminEnvUsers,
  ...driverEnvUsers,
  defaultAdminUser,
].reduce(
  (acc, user) => {
    const key = user.username.toLowerCase();
    const existing = acc[key];
    if (!existing) {
      acc[key] = user;
      return acc;
    }
    if (user.roles) {
      acc[key] = {
        ...existing,
        roles: Array.from(new Set([...(existing.roles ?? []), ...user.roles])),
      };
    }
    return acc;
  },
  {} as Record<string, AuthUserEntry>,
);

export const AUTH_USERS = Object.values(dedupedUsers);

export const verifyPassword = (username: string, password: string, requiredRole?: string) => {
  const user = AUTH_USERS.find((entry) => entry.username.toLowerCase() === username.toLowerCase());
  if (!user) {
    return false;
  }
  if (requiredRole && user.roles && !user.roles.includes(requiredRole.toLowerCase())) {
    return false;
  }
  return bcrypt.compareSync(password, user.passwordHash);
};
