"use client"

import { useState } from "react"
import { MessageSquare, Heart, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

const pickupLines = [
  "Are you a parking ticket? Because you've got FINE written all over you!",
  "Do you have a name, or can I call you mine?",
  "Are you French? Because Eiffel for you.",
  "Do you believe in love at first sight, or should I walk by again?",
  "Are you a magician? Because whenever I look at you, everyone else disappears!",
]

// This would typically come from a backend API
const initialSharedFavorites = [
  "Are you a camera? Because every time I look at you, I smile.",
  "Is your name Google? Because you've got everything I've been searching for.",
  "Do you have a map? I keep getting lost in your eyes.",
]

export default function EmergencyPickupLines() {
  const [line, setLine] = useState(pickupLines[0])
  const [personalFavorites, setPersonalFavorites] = useState<string[]>([])
  const [sharedFavorites, setSharedFavorites] = useState<string[]>(initialSharedFavorites)
  const [customLine, setCustomLine] = useState("")

  const generateNewLine = () => {
    let newLine
    do {
      newLine = pickupLines[Math.floor(Math.random() * pickupLines.length)]
    } while (newLine === line)
    setLine(newLine)
  }

  const addToPersonalFavorites = () => {
    if (!personalFavorites.includes(line)) {
      setPersonalFavorites([...personalFavorites, line])
    }
  }

  const addToSharedFavorites = () => {
    if (!sharedFavorites.includes(line)) {
      setSharedFavorites([...sharedFavorites, line])
      // In a real application, you would send this to your backend API
    }
  }

  const addCustomLine = () => {
    if (customLine.trim() !== "") {
      pickupLines.push(customLine)
      setCustomLine("")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(line)
    alert("Pickup line copied!")
  }

  const removeFromPersonalFavorites = (lineToRemove: string) => {
    setPersonalFavorites(personalFavorites.filter((l) => l !== lineToRemove))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-600">Emergency Pickup Lines</h2>
      <div className="max-w-2xl mx-auto text-center">
        <MessageSquare className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <motion.p
          key={line}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="text-xl text-gray-600 italic mb-6"
        >
          {line}
        </motion.p>
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
            onClick={generateNewLine}
          >
            Generate Another
          </button>
          <button
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
            onClick={addToPersonalFavorites}
          >
            Add to My Favorites
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
            onClick={addToSharedFavorites}
          >
            Add to Shared Favorites
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={copyToClipboard}
          >
            Copy to Clipboard
          </button>
        </div>
        <div className="mt-6">
          <input
            type="text"
            value={customLine}
            onChange={(e) => setCustomLine(e.target.value)}
            className="border border-red-300 p-2 rounded-md w-full mb-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Add your own pickup line"
          />
          <button onClick={addCustomLine} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
            Add Custom Line
          </button>
        </div>

        {/* Shared Favorites */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-red-600 mb-4">Community Favorites</h3>
          <ul className="text-gray-700 space-y-2">
            {sharedFavorites.map((fav, index) => (
              <li key={index} className="flex items-center justify-center">
                <Heart className="w-5 h-5 text-red-500 mr-2" />
                {fav}
              </li>
            ))}
          </ul>
        </div>

        {/* Personal Favorites */}
        {personalFavorites.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold text-red-600 mb-4">My Favorite Lines</h3>
            <ul className="text-gray-700 space-y-2">
              {personalFavorites.map((fav, index) => (
                <li key={index} className="flex items-center justify-center">
                  <span>{fav}</span>
                  <button
                    onClick={() => removeFromPersonalFavorites(fav)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

