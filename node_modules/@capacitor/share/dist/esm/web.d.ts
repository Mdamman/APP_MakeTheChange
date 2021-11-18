import { WebPlugin } from '@capacitor/core';
import type { ShareOptions, SharePlugin, ShareResult } from './definitions';
export declare class ShareWeb extends WebPlugin implements SharePlugin {
    share(options: ShareOptions): Promise<ShareResult>;
}
