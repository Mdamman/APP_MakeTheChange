import { WebPlugin } from '@capacitor/core';
export class ShareWeb extends WebPlugin {
    async share(options) {
        if (typeof navigator === 'undefined' || !navigator.share) {
            throw this.unavailable('Share API not available in this browser');
        }
        await navigator.share({
            title: options.title,
            text: options.text,
            url: options.url,
        });
        return {};
    }
}
//# sourceMappingURL=web.js.map