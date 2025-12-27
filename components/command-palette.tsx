"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Github, Linkedin, Mail, FileText } from "lucide-react"

export default function CommandPalette() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((v) => !v)
      }
      if (e.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const actions = [
    {
      label: "Email Me",
      icon: Mail,
      action: () => (window.location.href = "mailto:kartikeyu07@gmail.com"),
    },
    {
      label: "Download Resume",
      icon: FileText,
      action: () => window.open("/Kartikey_R_esume.pdf", "_blank"),
    },
    {
      label: "GitHub",
      icon: Github,
      action: () => window.open("https://github.com/Kartikey116", "_blank"),
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      action: () =>
        window.open(
          "https://www.linkedin.com/in/kartikey-upadhyay/",
          "_blank"
        ),
    },
  ]

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* PALETTE */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="
              fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-[90%] max-w-md
              rounded-xl
              bg-black/80 backdrop-blur-xl
              border border-white/20
              z-50
              p-4
            "
          >
            <p className="text-xs text-gray-400 mb-3">
              Command Palette — ⌘K / Ctrl+K
            </p>

            <div className="space-y-2">
              {actions.map((a) => (
                <button
                  key={a.label}
                  onClick={() => {
                    a.action()
                    setOpen(false)
                  }}
                  className="
                    w-full flex items-center gap-3
                    px-4 py-3 rounded-lg
                    text-left
                    hover:bg-cyan-400/20
                    transition
                  "
                >
                  <a.icon className="w-4 h-4 text-cyan-400" />
                  <span>{a.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
