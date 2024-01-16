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

  /**
   * @type {import("./types").KindeUser}
   */
  const user = session.get("user") || null;

  /**
   * @type {string | null}
   */
  const idTokenRaw = session.get("id_token") || null;

  /**
   * @type {import("./types").KindeIdToken | null}
   */
  let idToken;
  try {
    idToken = jwtDecode(idTokenRaw);
  } catch (error) {}

  /**
   * @type {string | null}
   */
  const accessTokenRaw = session.get("access_token") || null;

  /**
   * @type {import("./types").KindeAccessToken | null}
   */
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

  /**
   * @type {string[]}
   */
  const permissions = getClaim("permissions") || [];

  /**
   * @type {string[]}
   */
  const userOrganizations = getClaim("org_codes", "idToken");

  /**
   * @type {string}
   */
  const organization = getClaim("org_code");

  /**
   *
   * @param {string} permission
   * @returns {import("./types").KindePermission | null}
   */
  const getPermission = (permission) => {
    if (!permissions) return null;
    if (permissions.includes(permission)) {
      return {
        isGranted: true,
        orgCode: organization,
      };
    }
    return null;
  };

  /**
   *
   * @param {string} code
   * @param {any} defaultValue
   * @param {"i" | "s" | "b"} type
   * @returns {{code: string, type: "string" | "integer" | "boolean", value: any,is_default: boolean, defaultValue: any}}
   */
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

  /**
   *
   * @param {string} code
   * @param {boolean} defaultValue
   * @returns {boolean}
   */
  const getBooleanFlag = (code, defaultValue) => {
    try {
      const flag = getFlag(code, defaultValue, "b");
      return flag.value;
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *
   * @param {string} code
   * @param {string} defaultValue
   * @returns {string}
   */
  const getStringFlag = (code, defaultValue) => {
    try {
      const flag = getFlag(code, defaultValue, "b");
      return flag.value;
    } catch (err) {
      console.error(err);
    }
  };

  /**
   *
   * @param {string} code
   * @param {number} defaultValue
   * @returns {number}
   */
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
