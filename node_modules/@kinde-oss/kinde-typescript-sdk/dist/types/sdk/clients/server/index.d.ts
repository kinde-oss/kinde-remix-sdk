import { GrantType } from '../../oauth2-flows/index.js';
import type { CCClient, ACClient, PKCEClientOptions, ACClientOptions, CCClientOptions } from '../types.js';
type Options<T> = T extends GrantType.PKCE ? PKCEClientOptions : T extends GrantType.AUTHORIZATION_CODE ? ACClientOptions : T extends GrantType.CLIENT_CREDENTIALS ? CCClientOptions : never;
type Client<T> = T extends PKCEClientOptions ? ACClient : T extends ACClientOptions ? ACClient : T extends CCClientOptions ? CCClient : never;
export declare const createKindeServerClient: <G extends GrantType>(grantType: G, options: Options<G>) => Client<Options<G>>;
export {};
