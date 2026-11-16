interface LocalResponse {
  content: string
  suggestions?: string[]
  card?: { title: string; val: string; growth: string }
}

export function getSmartLocalResponse(query: string, userName?: string, userRole?: string): LocalResponse {
  const q = query.toLowerCase()

  // Greetings
  if (q.includes("hi") || q.includes("hello") || q.includes("hey") || q.includes("salam")) {
    return {
      content: `Greetings! It is a pleasure to see you${userName ? `, ${userName}` : ""}. I'm actively monitoring green innovations and eco-initiatives across GreenVaya. How may I assist your mission today?`,
      suggestions: ["Browse Trending", "Explain Plants", "Solar Energy"],
    }
  }

  // Plants, Botany, Trees, Afforestation, Flora
  if (q.includes("plant") || q.includes("tree") || q.includes("flora") || q.includes("forest") || q.includes("botany") || q.includes("leaf")) {
    return {
      content: `**Plants & Flora in Eco-Innovation:**\n\nPlants are Earth's primary bio-sequesters, transforming sunlight, water, and atmospheric carbon dioxide into oxygen and life-sustaining biomass.\n\n• **Carbon Sequestration:** A single mature tree absorbs upwards of 22 kg (48 lbs) of CO2 per year.\n• **Urban Microclimate:** Native urban vegetation reduces heat-island temperature spikes by up to 3°C - 5°C.\n• **Soil & Hydrology:** Plant roots stabilize topsoil, prevent runoff erosion, and naturally filter groundwater.\n\nOn **GreenVaya**, you can explore afforestation blueprints, micro-forest community projects, and urban vertical farming designs!`,
      card: { title: "Biomass Carbon Capture", val: "22 kg/tree/yr", growth: "+99% Bio-Efficiency" },
      suggestions: ["Urban Farming", "Browse Green Ideas"],
    }
  }

  // Solar & Renewable Energy
  if (q.includes("solar") || q.includes("energy") || q.includes("power") || q.includes("wind") || q.includes("hydro")) {
    return {
      content: `**Renewable Energy Blueprint:**\n\nTransitioning to distributed solar and wind power eliminates fossil dependence and slashes levelized cost of energy (LCOE).\n\n• **Solar Photovoltaics:** Modern perovskite-silicon tandem cells achieve over 30% solar efficiency.\n• **Community Microgrids:** Decentralized clean grids allow neighborhoods to trade peer-to-peer energy.\n\nCheck out top community solar proposals posted by creators right here on GreenVaya!`,
      card: { title: "Current Market Trend", val: "Solar Microgrids", growth: "+24.5%" },
      suggestions: ["Explore Solar Ideas", "Start Solar Project"],
    }
  }

  // Waste & Recycling
  if (q.includes("waste") || q.includes("recycle") || q.includes("plastic") || q.includes("compost")) {
    return {
      content: `**Circular Economy & Zero Waste:**\n\nEliminating linear "take-make-dispose" models through circular design and community composting:\n\n• **Organic Composting:** Converts food waste into nitrogen-rich biofertilizers.\n• **Plastic Upcycling:** Advanced mechanical and bio-enzymatic recycling turns consumer polymers into durable construction materials.\n\nBrowse innovative zero-waste ideas in our Waste category.`,
      card: { title: "Landfill Diversion", val: "78% Achievable", growth: "+15.8%" },
      suggestions: ["Composting Guide", "Waste Ideas"],
    }
  }

  // Platform Verification
  if (q.includes("verified") || q.includes("vaya verified") || q.includes("how to") || q.includes("badge")) {
    return {
      content: `To receive the **Vaya Verified** badge, a project must pass a 3-stage environmental audit:\n\n1. **Feasibility Review:** Peer evaluation by certified eco-moderators.\n2. **Carbon Lifecycle Assessment:** Measuring expected GHG mitigation.\n3. **Community Consensus:** Voting threshold from active platform members.`,
      suggestions: ["Start Submission", "Browse Verified"],
    }
  }

  // General Ideas & Trending
  if (q.includes("idea") || q.includes("browse") || q.includes("trending")) {
    return {
      content: `Our eco-intelligence engine highlights **Solar Infrastructure**, **Urban Afforestation**, and **Closed-Loop Packaging** as top-trending sectors this week.\n\nWould you like to explore curated community submissions?`,
      card: { title: "Weekly Top Category", val: "Urban Afforestation", growth: "+31.2%" },
      suggestions: ["View Trending Ideas", "Submit an Idea"],
    }
  }

  // Impact & Stats
  if (q.includes("stats") || q.includes("impact") || q.includes("score")) {
    return {
      content: userRole === "ADMIN"
        ? "Global platform health is at **98.4%**. Over **3,450+ eco-initiatives** are active across 45 countries."
        : `Your eco-footprint reflects active involvement in community innovations, green voting, and sustainable contributions!`,
      suggestions: ["View Analytics", "Leaderboard"],
    }
  }

  // Price & Funding
  if (q.includes("price") || q.includes("funding") || q.includes("money") || q.includes("cost") || q.includes("pay")) {
    return {
      content: `**Community Trust & Sustainable Funding:**\n\nGreenVaya supports grassroots sustainability through direct micro-funding and premium blueprint access powered by secure payment gateways (e.g., SSL Commerz). Creators retain full intellectual integrity while mobilizing resources for real-world impact.`,
      suggestions: ["Payment Help", "Submit Idea"],
    }
  }

  // General Knowledge Fallback
  return {
    content: `**GreenVaya Sustainability Guide:**\n\nRegarding *"${query}"*:\nOur platform champions open-source climate solutions, biodiversity conservation, sustainable agriculture, and renewable infrastructure.\n\nYou can submit project proposals, vote on community initiatives, or collaborate with innovators worldwide to scale solutions for this topic!`,
    suggestions: ["Explore Plants & Trees", "Browse Renewable Energy"],
  }
}
