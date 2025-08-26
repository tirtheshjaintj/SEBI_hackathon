import { permissionMap } from "@/src/constants/constant";

export const getReadablePermissions = (permissions = []) =>
  permissions.map((p) => permissionMap[p]).filter(Boolean);

export const getRiskScore = (app: any) => {
  let score = 0;
  if (!app.isSystemApp) score += 1;
  Object.keys(permissionMap).forEach((p) => {
    if (app.permissions?.includes(p)) score += 2;
  });
  if (app.installerPackageName !== "com.android.vending") score += 2;
  return score >= 4 ? "Alert" : score >= 2 ? "Suspicious" : "Safe";
};


