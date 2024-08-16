import fa from "./config/i18n/fa.json"
import en from "./config/i18n/en.json"

export default defineI18nConfig(() => ({
    legacy: false,
    messages:{
        fa : fa,
        en : en,
    }
}))