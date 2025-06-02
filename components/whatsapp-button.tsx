"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { MessageCircle, X } from "lucide-react"
import Image from "next/image"

export function WhatsAppButton() {
  const [showDialog, setShowDialog] = useState(false)
  const whatsappNumber = "+233241350760"
  
  const handleStartChat = () => {
    const encodedNumber = encodeURIComponent(whatsappNumber)
    const url = `https://api.whatsapp.com/send/?phone=${encodedNumber}&type=phone_number&app_absent=0`
    window.open(url, "_blank")
    setShowDialog(false)
  }

  const handleStartChatBot = () => {
    // You can implement your chatbot logic here
    console.log("Starting chatbot...")
    setShowDialog(false)
  }

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 rounded-full h-14 w-14 sm:h-16 sm:w-16 shadow-lg z-50 bg-accent hover:bg-[#1EA952] p-0 flex items-center justify-center"
        onClick={() => setShowDialog(true)}
        aria-label="Open chat options"
      >
        <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent 
          className="fixed !bottom-[120px] sm:!bottom-[144px] !top-auto !right-6 sm:!right-8 !left-auto !translate-x-0 !translate-y-0 max-w-[360px] p-0 gap-0 shadow-xl border bg-background dark:bg-background rounded-xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 flex items-center gap-3 border-b relative bg-background">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
              onClick={() => setShowDialog(false)}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-lg">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-foreground">Message Central Team</h2>
            </div>
          </div>

          {/* Message Preview */}
          <div className="bg-muted/50 dark:bg-muted/10 p-4">
            <div className="bg-background rounded-lg p-3 shadow-sm max-w-[85%] border">
              <p className="text-sm text-foreground">How would you like to chat with us?</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 space-y-3 bg-background">
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-white gap-2 py-6"
              onClick={handleStartChatBot}
            >
              <MessageCircle className="h-5 w-5" />
              Start ChatBot
            </Button>
            
            <Button
              className="w-full bg-[#25D366] hover:bg-[#1EA952] text-white gap-2 py-6"
              onClick={handleStartChat}
            >
              <MessageCircle className="h-5 w-5" />
              Start WhatsApp Chat
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
