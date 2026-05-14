export const UserRole = {
  PATIENT: "PATIENT",
  PRACTITIONER: "PRACTITIONER",
  ADMIN: "ADMIN",
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export function dashboardPathForRole(role: UserRole) {
  if (role === UserRole.PRACTITIONER) {
    return "/dashboard/practitioner";
  }

  if (role === UserRole.ADMIN) {
    return "/dashboard/admin";
  }

  return "/dashboard/patient";
}
