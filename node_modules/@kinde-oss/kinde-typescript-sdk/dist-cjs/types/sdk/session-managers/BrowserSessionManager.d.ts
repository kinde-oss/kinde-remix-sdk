import { type SessionManager } from './types.js';
/**
 * Provides a session manager implementation for the browser.
 * @class BrowserSessionManager
 */
export declare class BrowserSessionManager implements SessionManager {
    static ITEM_NAME_PREFIX: string;
    private memCache;
    constructor();
    /**
     * Prefixes provided item key with class static prefix.
     * @param {string} itemKey
     * @returns {string}
     */
    private generateItemKey;
    /**
     * Clears all items from session store.
     * @returns {void}
     */
    destroySession(): Promise<void>;
    /**
     * Sets the provided key-value store to the memory cache.
     * @param {string} itemKey
     * @param {unknown} itemValue
     * @returns {void}
     */
    setSessionItem(itemKey: string, itemValue: unknown): Promise<void>;
    /**
     * Sets the provided key-value store to the browser session storage.
     * @param {string} itemKey
     * @param {unknown} itemValue
     */
    setSessionItemBrowser(itemKey: string, itemValue: unknown): Promise<void>;
    /**
     * Gets the item for the provided key from the memory cache.
     * @param {string} itemKey
     * @returns {unknown | null}
     */
    getSessionItem(itemKey: string): Promise<unknown | null>;
    /**
     * Gets the item for the provided key from the browser session storage.
     * @param {string} itemKey
     * @returns {unknown | null}
     */
    getSessionItemBrowser(itemKey: string): Promise<unknown | null>;
    /**
     * Removes the item for the provided key from the memory cache.
     * @param {string} itemKey
     * @returns {void}
     */
    removeSessionItem(itemKey: string): Promise<void>;
    /**
     * Removes the item for the provided key from the browser session storage.
     * @param {string} itemKey
     * @returns {void}
     */
    removeSessionItemBrowser(itemKey: string): Promise<void>;
}
