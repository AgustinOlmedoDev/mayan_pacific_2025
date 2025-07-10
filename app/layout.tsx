import type React from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import "../app/globals.css" // Importar los estilos globales

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  console.log("Layout - Locale:", locale)

  let messages
  try {
    messages = await getMessages({ locale })
    console.log("Messages loaded successfully for locale:", locale)
  } catch (error) {
    console.error("Error loading messages:", error)
    messages = {}
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
