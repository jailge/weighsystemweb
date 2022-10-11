import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import localeZH from 'element-plus/lib/locale/lang/zh-cn'
import localeEN from 'element-plus/lib/locale/lang/en'

// const i18n = createI18n({
//     locale: localeZH.name,
//     fallbackLocale: localeEN.name,
//     messages,
// })

export default (app) => {
    app.use(ElementPlus, { locale: localeZH })
        // app.use(i18n)
}

// db.createUser({ user: 'weight1', pwd: 'weight1', roles: [{ role: "readWrite", db: "weight" }] });