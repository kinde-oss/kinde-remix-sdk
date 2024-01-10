import { sessionStorage } from "./handle-auth";
import { jwtDecode } from "jwt-decode";

const flagDataTypeMap = {
  s: "string",
  i: "integer",
  b: "boolean",
};

export const getKindeSession = async (request) => {
  const cookie = request.headers.get("Cookie");
  const session = await sessionStorage.getSession(cookie);

  const user = session.get("user") || null;

  const idTokenRaw = session.get("id_token") || null;
  let idToken;
  try {
    idToken = jwtDecode(idTokenRaw);
  } catch (error) {}

  const accessTokenRaw = session.get("access_token") || null;
  let accessToken;
  try {
    accessToken = jwtDecode(accessTokenRaw);
  } catch (error) {}

  const getClaim = (claim, token = "accessToken") => {
    if (!idToken && !accessToken) {
      return null;
    }

    if (token === "accessToken") {
      return accessToken[claim];
    } else if (token === "idToken") {
      return idToken[claim];
    } else {
      return null;
    }
  };

  const permissions = getClaim("permissions");
  const userOrganizations = getClaim("org_codes", "idToken");
  const organization = getClaim("org_code");

  const getPermission = (permission) => {
    if (permissions.includes(permission)) {
      return {
        isGranted: true,
        orgCode: organization,
      };
    }
    return null;
  };

  const getFlag = (code, defaultValue, type) => {
    const flags = getClaim("feature_flags");
    const flag = flags && flags[code] ? flags[code] : {};

    if (flag == {} && defaultValue == undefined) {
      throw Error(
        `Flag ${code} was not found, and no default value has been provided`
      );
    }

    if (type && flag.t && type !== flag.t) {
      throw Error(
        `Flag ${code} is of type ${flagDataTypeMap[flag.t]} - requested type ${
          flagDataTypeMap[type]
        }`
      );
    }

    return {
      code,
      type: flagDataTypeMap[flag.t || type],
      value: flag.v == null ? defaultValue : flag.v,
      is_default: flag.v == null,
      defaultValue,
    };
  };

  const getBooleanFlag = (code, defaultValue) => {
    try {
      const flag = getFlag(code, defaultValue, "b");
      return flag.value;
    } catch (err) {
      console.error(err);
    }
  };

  const getStringFlag = (code, defaultValue) => {
    try {
      const flag = getFlag(code, defaultValue, "b");
      return flag.value;
    } catch (err) {
      console.error(err);
    }
  };

  const getIntegerFlag = (code, defaultValue) => {
    try {
      const flag = getFlag(code, defaultValue, "i");
      return flag.value;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    user,
    idToken,
    accessToken,
    idTokenRaw,
    accessTokenRaw,
    permissions,
    userOrganizations,
    organization,
    getPermission,
    getFlag,
    getStringFlag,
    getBooleanFlag,
    getIntegerFlag,
  };
};
