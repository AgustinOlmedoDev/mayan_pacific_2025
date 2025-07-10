import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async ({ locale }) => {
  console.log("i18n.ts - Processing locale:", locale)

  // Si locale es undefined, usar 'es' como fallback
  const currentLocale = locale || "es"
  console.log("i18n.ts - Using locale:", currentLocale)

  try {
    const messages = (await import(`./messages/${currentLocale}.json`)).default
    console.log("i18n.ts - Messages loaded for", currentLocale)
    
    // IMPORTANTE: Retornar tanto messages como locale
    return { 
      messages,
      locale: currentLocale
    }
  } catch (error) {
    console.error("i18n.ts - Error loading messages for", currentLocale, error)
    // Fallback a español si hay error
    try {
      const fallbackMessages = (await import(`./messages/es.json`)).default
      return { 
        messages: fallbackMessages,
        locale: "es"
      }
    } catch (fallbackError) {
      return { 
        messages: {},
        locale: "es"
      }
    }
  }
})
