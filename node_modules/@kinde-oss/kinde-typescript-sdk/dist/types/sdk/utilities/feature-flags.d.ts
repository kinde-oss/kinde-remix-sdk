import { type SessionManager } from '../session-managers/index.js';
import { type GetFlagType, type FlagType } from './types.js';
/**
 * Method extracts the provided feature flag from the access token in the
 * current session.
 * @param {SessionManager} sessionManager
 * @param {string} code
 * @param {FlagType[keyof FlagType]} defaultValue
 * @param {keyof FlagType} type
 * @returns {GetFlagType}
 */
export declare const getFlag: (sessionManager: SessionManager, code: string, defaultValue?: FlagType[keyof FlagType], type?: keyof FlagType) => Promise<GetFlagType>;
/**
 * Method extracts the provided number feature flag from the access token in
 * the current session.
 * @param {SessionManager} sessionManager
 * @param {string} code
 * @param {number} defaultValue
 * @returns {number} integer flag value
 */
export declare const getIntegerFlag: (sessionManager: SessionManager, code: string, defaultValue?: number) => Promise<number>;
/**
 * Method extracts the provided string feature flag from the access token in
 * the current session.
 * @param {SessionManager} sessionManager
 * @param {string} code
 * @param {string} defaultValue
 * @returns {string} string flag value
 */
export declare const getStringFlag: (sessionManager: SessionManager, code: string, defaultValue?: string) => Promise<string>;
/**
 * Method extracts the provided boolean feature flag from the access token in
 * the current session.
 * @param {SessionManager} sessionManager
 * @param {string} code
 * @param {boolean} defaultValue
 * @returns {boolean} boolean flag value
 */
export declare const getBooleanFlag: (sessionManager: SessionManager, code: string, defaultValue?: boolean) => Promise<boolean>;
