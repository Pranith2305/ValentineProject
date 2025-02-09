
import { useState } from "react"
import { Heart, Shield, Target, AlertTriangle, ArrowRight } from "lucide-react"
import EmergencyPickupLines from "./Emergency"

const insurancePlans = [
  {
    name: "Basic Heartbreak",
    price: "$9.99/month",
    features: [
      "Basic emotional support hotline (9-5)",
      "One free pint of ice cream",
      "Spotify breakup playlist",
      "Basic ex-tracking features",
    ],
    icon: Heart,
  },
  {
    name: "Premium Love Shield",
    price: "$24.99/month",
    features: [
      "24/7 emotional support",
      "Unlimited ice cream supply",
      "Premium ex-tracking features",
      "Dating app profile optimization",
      "Emergency pickup line generator",
    ],
    icon: Shield,
    popular: true,
  },
  {
    name: "Ultimate Heartbreak Protection",
    price: "$49.99/month",
    features: [
      "All Premium features",
      "Personal relationship counselor",
      "Advanced AI relationship predictions",
      "Social media detox service",
      'Exclusive "Ex-Radar" technology',
    ],
    icon: Target,
  },
]

const riskQuestions = [
  {
    question: "How many times do you check their social media daily?",
    options: [
      { text: "Never, I trust them", score: 0 },
      { text: "1-2 times, just casual", score: 2 },
      { text: "Every hour, is that bad?", score: 5 },
      { text: "I have notifications on", score: 10 },
    ],
  },
  {
    question: "What's their favorite food?",
    options: [
      { text: "I know their exact order at every restaurant", score: 0 },
      { text: "I know the basics", score: 2 },
      { text: "Pizza... maybe?", score: 5 },
      { text: "They eat food?", score: 10 },
    ],
  },
  {
    question: "How do you handle arguments?",
    options: [
      { text: "Open communication and compromise", score: 0 },
      { text: "We talk it out... eventually", score: 3 },
      { text: "Silent treatment is my weapon", score: 7 },
      { text: "What's their number again?", score: 10 },
    ],
  },
  {
    question: "Your partner's ex likes their Instagram post. You...",
    options: [
      { text: "Don't even notice", score: 0 },
      { text: "Notice but keep scrolling", score: 2 },
      { text: "Screenshot for evidence", score: 5 },
      { text: "Time to hire a private investigator", score: 10 },
    ],
  },
]

function App() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [quizScore, setQuizScore] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleStartQuiz = () => {
    setShowQuiz(true)
    setCurrentQuestion(0)
    setAnswers([])
    setShowResult(false)
    setQuizScore(null)
  }

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score]
    setAnswers(newAnswers)

    if (currentQuestion < riskQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate final score
      const totalScore = newAnswers.reduce((a, b) => a + b, 0)
      const maxScore = riskQuestions.length * 10
      const percentage = 100 - Math.round((totalScore / maxScore) * 100)
      setQuizScore(percentage)
      setShowResult(true)
    }
  }

  const getRiskLevel = (score: number) => {
    if (score >= 80) return { level: "Low Risk", message: "Looking stable! But remember, love is unpredictable..." }
    if (score >= 60)
      return { level: "Moderate Risk", message: "There's room for improvement. Consider our Basic plan!" }
    if (score >= 40) return { level: "High Risk", message: "Red flags detected! Our Premium plan is recommended." }
    return { level: "Critical Risk", message: "EMERGENCY! Sign up for Ultimate Protection immediately!" }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-red-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Breakup Insurance™</h1>
            <p className="text-xl text-gray-600 mb-8">Because love is risky business. Protect your heart today!</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => document.getElementById("plans")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-red-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition-colors"
              >
                View Plans
              </button>
              <button
                onClick={handleStartQuiz}
                className="bg-white text-red-500 px-8 py-3 rounded-full font-semibold border-2 border-red-500 hover:bg-red-50 transition-colors"
              >
                Take Risk Assessment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Assessment Quiz */}
      {showQuiz && (
        <div className="max-w-2xl mx-auto px-4 py-8 bg-white rounded-lg shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-center mb-4">Relationship Risk Assessment</h2>
          {!showResult ? (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {riskQuestions.length}
                </span>
                <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / riskQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4">{riskQuestions[currentQuestion].question}</h3>
              <div className="space-y-3">
                {riskQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.score)}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-red-500 hover:bg-red-50 transition-colors"
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-4">
                <div className="text-2xl font-bold text-red-500 mb-2">{getRiskLevel(quizScore!).level}</div>
                <div className="text-4xl font-bold mb-2">{quizScore}%</div>
                <p className="text-gray-600 mb-4">{getRiskLevel(quizScore!).message}</p>
              </div>
              <button
                onClick={handleStartQuiz}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Take Quiz Again
              </button>
            </div>
          )}
        </div>
      )}

      {/* Insurance Plans */}
      <div id="plans" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Protection Plan</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {insurancePlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-lg shadow-lg p-6 ${plan.popular ? "border-2 border-red-500" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
                </div>
              )}
              <div className="flex items-center justify-center mb-4">
                <plan.icon className="w-12 h-12 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{plan.name}</h3>
              <p className="text-2xl font-bold text-center text-red-500 mb-4">{plan.price}</p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setSelectedPlan(plan.name)}
                className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Pickup Lines */}
      <EmergencyPickupLines />

      {/* Refund Policy */}
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <AlertTriangle className="w-5 h-5" />
            <p>No refunds. Love is a risk we all have to take!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

