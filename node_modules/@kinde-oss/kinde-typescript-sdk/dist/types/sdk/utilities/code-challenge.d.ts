/**
 * Encodes the provided ArrayBuffer string to base-64 format.
 * @param {ArrayBuffer} str
 * @returns {string}
 */
export declare const base64UrlEncode: (str: ArrayBuffer) => string;
/**
 * Creates a one-way hash for the provided string using SHA-256
 * algorithm, the result is provided as an ArrayBuffer instance.
 * @param {string} plain
 * @returns {Promise<ArrayBuffer>}
 */
export declare const sha256: (plain: string) => Promise<ArrayBuffer>;
/**
 * Sets up the code challenge required for PKCE OAuth2.0 flow
 * returning the verifier (secret) and its corresponding one-way
 * hash (challenge).
 * @returns {Promise<{ challenge: string, verifier: string }>}
 */
export declare const setupCodeChallenge: () => Promise<{
    challenge: string;
    verifier: string;
}>;
