import { NextRequest, NextResponse } from "next/server"

const SYSTEM_PROMPT = `You are Vaya Intel v2.0, the intelligent sustainability & eco-innovation AI assistant for GreenVaya (an environmental crowdsourcing & innovation platform).
Your persona:
- Friendly, visionary, knowledgeable about sustainability, ecology, renewable energy, waste reduction, flora, fauna, plants, and green technologies.
- Provide crisp, well-structured, inspiring answers in Markdown format (use bolding, bullet points where appropriate). Keep responses concise (around 2-4 short paragraphs maximum or clean bullet points) so they read well in a chat window.
- Suggest 2 short, clickable follow-up topic phrases at the very end formatted as:
SUGGESTIONS: [Option 1] | [Option 2]
`

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY

    // If no API key configured, signal client to use local engine gracefully
    if (!apiKey) {
      return NextResponse.json({
        hasApiKey: false,
        fallback: true,
      })
    }

    // Build contents for Gemini API (v1beta gemini-1.5-flash / gemini-2.5-flash)
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = []

    // Add brief conversation history if available
    if (Array.isArray(history)) {
      history.slice(-4).forEach((h: { role: string; content: string }) => {
        contents.push({
          role: h.role === "assistant" ? "model" : "user",
          parts: [{ text: h.content }],
        })
      })
    }

    contents.push({
      role: "user",
      parts: [{ text: message }],
    })

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600,
          },
        }),
      }
    )

    if (!response.ok) {
      const errText = await response.text()
      console.error("Gemini API error:", response.status, errText)
      return NextResponse.json({
        fallback: true,
        error: `Gemini API returned status ${response.status}`,
      })
    }

    const data = await response.json()
    const rawReply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I couldn't process that query at the moment."

    // Extract suggestions if present
    let content = rawReply
    let suggestions: string[] = []

    const suggestionMatch = rawReply.match(/SUGGESTIONS:\s*\[(.*?)\]\s*\|\s*\[(.*?)\]/i)
    if (suggestionMatch) {
      content = rawReply.replace(/SUGGESTIONS:[\s\S]*$/i, "").trim()
      suggestions = [suggestionMatch[1].trim(), suggestionMatch[2].trim()]
    }

    return NextResponse.json({
      content,
      suggestions: suggestions.length > 0 ? suggestions : ["Explore Plants", "Top Green Ideas"],
      source: "gemini",
    })
  } catch (error) {
    console.error("Chat API route error:", error)
    return NextResponse.json({ fallback: true, error: "Internal server error" }, { status: 500 })
  }
}
