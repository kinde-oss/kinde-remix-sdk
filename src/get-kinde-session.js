import { kindeClient } from "./handle-auth";
import { createSessionManager } from "./session/session";

/**
 *
 * @param {Request} request
 */
export const getKindeSession = async (request) => {
  const { sessionManager } = await createSessionManager(request);

  /**
   *
   * @param {string} claim
   * @param {import("@kinde-oss/kinde-typescript-sdk").ClaimTokenType} type
   * @returns
   */
  const getClaimValue = async (claim, type) => {
    try {
      return await kindeClient.getClaimValue(sessionManager, claim, type);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  /**
   *
   * @param {string} claim
   * @param {import("@kinde-oss/kinde-typescript-sdk").ClaimTokenType} type
   * @returns {Promise<{name: string, value: unknown} | null>}
   */
  const getClaim = async (claim, type) => {
    try {
      return await kindeClient.getClaim(sessionManager, claim, type);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getToken = async () => {
    try {
      return await kindeClient.getToken(sessionManager);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const refreshTokens = async () => {
    try {
      return await kindeClient.refreshTokens(sessionManager);
    } catch (error) {
      console.error(error);
    }
  };

  const isAuthenticated = async () => {
    try {
      return await kindeClient.isAuthenticated(sessionManager);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getUser = async () => {
    try {
      return await kindeClient.getUser(sessionManager);
    } catch (error) {
      if (
        error.message !==
        "Cannot get user details, no authentication credential found"
      )
        console.error(error);
      return null;
    }
  };

  const getUserProfile = async () => {
    try {
      return await kindeClient.getUserProfile(sessionManager);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  /**
   *
   * @param {string} code
   * @param {boolean | string | number} defaultValue
   * @param {*} type
   */
  const getFlag = async (code, defaultValue, type) => {
    try {
      return await kindeClient.getFlag(
        sessionManager,
        code.toLowerCase(),
        defaultValue,
        type
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  /**
   *
   * @param {string} code
   * @param {boolean} defaultValue
   * @returns {Promise<boolean>}
   */
  const getBooleanFlag = async (code, defaultValue) => {
    try {
      return await kindeClient.getBooleanFlag(
        sessionManager,
        code.toLowerCase(),
        defaultValue
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  /**
   *
   * @param {string} code
   * @param {number} defaultValue
   * @returns {Promise<number>}
   */
  const getIntegerFlag = async (code, defaultValue) => {
    try {
      return await kindeClient.getIntegerFlag(
        sessionManager,
        code.toLowerCase(),
        defaultValue
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  };
  /**
   *
   * @param {string} code
   * @param {string} defaultValue
   * @returns {Promise<string>}
   */
  const getStringFlag = async (code, defaultValue) => {
    try {
      return await kindeClient.getStringFlag(
        sessionManager,
        code.toLowerCase(),
        defaultValue
      );
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getPermission = async (permission) => {
    try {
      return await kindeClient.getPermission(sessionManager, permission);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getPermissions = async () => {
    try {
      return await kindeClient.getPermissions(sessionManager);
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  const getOrganization = async () => {
    try {
      return await kindeClient.getOrganization(sessionManager);
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const getUserOrganizations = async () => {
    try {
      return await kindeClient.getUserOrganizations(sessionManager);
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  return {
    getClaim,
    getClaimValue,
    getOrganization,
    getPermission,
    getPermissions,
    getFlag,
    getStringFlag,
    getBooleanFlag,
    getIntegerFlag,
    getToken,
    getUser,
    getUserProfile,
    getUserOrganizations,
    isAuthenticated,
    refreshTokens,
  };
};
