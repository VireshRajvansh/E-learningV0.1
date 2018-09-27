import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'findLanguageFromKey' })
export class FindLanguageFromKeyPipe implements PipeTransform {
    private languages: any = {
        hy: { name: 'Հայերեն' },
        bn: { name: 'বাংলা' },
        da: { name: 'Dansk' },
        nl: { name: 'Nederlands' },
        en: { name: 'English' },
        fr: { name: 'Français' },
        de: { name: 'Deutsch' },
        hi: { name: 'हिंदी' },
        id: { name: 'Bahasa Indonesia' },
        it: { name: 'Italiano' },
        ja: { name: '日本語' },
        ko: { name: '한국어' },
        ru: { name: 'Русский' },
        es: { name: 'Español' }
        // jhipster-needle-i18n-language-key-pipe - JHipster will add/remove languages in this object
    };
    transform(lang: string): string {
        return this.languages[lang].name;
    }
}
