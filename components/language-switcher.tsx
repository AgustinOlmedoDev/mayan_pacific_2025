"use client"

import { useLocale } from "next-intl"
import { useRouter, usePathname } from "next/navigation"
import { useTransition } from "react"
import * as Switch from "@radix-ui/react-switch"
import { useEffect, useState } from "react"

export const LanguageSwitcher = () => {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [checked, setChecked] = useState(locale === "en")

  useEffect(() => {
    setChecked(locale === "en")
  }, [locale])

  const handleLocaleChange = (value: boolean) => {
    const newLocale = value ? "en" : "es"
    startTransition(() => {
      const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
      router.push(newPath)
    })
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-white">🇪🇸</span>

      <Switch.Root
        className="w-12 h-6 bg-white/30 rounded-full relative data-[state=checked]:bg-sky-500 transition-colors duration-300 focus:outline-none"
        checked={checked}
        onCheckedChange={(val) => {
          setChecked(val)
          handleLocaleChange(val)
        }}
        disabled={isPending}
      >
        <Switch.Thumb
          className="block w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 translate-x-0 data-[state=checked]:translate-x-6"
        />
      </Switch.Root>

      <span className="text-sm text-white">🇺🇸</span>

      {isPending && <span className="text-xs text-gray-300">Cambiando...</span>}
    </div>
  )
}
