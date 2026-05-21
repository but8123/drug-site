import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "POST 요청만 가능합니다."
    });
  }

  try {
    const {
      drug1,
      drug2,
      risk,
      summary,
      caution,
      style
    } = req.body;

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite-preview"
    });

    let stylePrompt = "";

    if (style === "professional") {
      stylePrompt = `
의료 정보 사이트에 들어갈 수 있는 자연스럽고 전문적인 문체로 작성해줘.
너무 친근하거나 어린 말투는 사용하지 말고, 2~3문장으로 설명해줘.
`;
    }

    if (style === "simple") {
      stylePrompt = `
어려운 표현을 줄이고, 핵심만 2문장 정도로 간단하게 설명해줘.
다만 너무 유치한 표현은 사용하지 마.
`;
    }

    if (style === "queen") {
      stylePrompt = `
완전 호들갑스럽고 끼 많은 인터넷 AI처럼 말해줘.
반말만 사용하고, 리액션 크고 드라마틱하게 말해줘.
약간 "어머", "잠깐", "미친" 같은 감탄 표현도 자연스럽게 사용해줘.
살짝 게이 밈 감성의 유쾌한 톤은 괜찮지만 혐오적이거나 과도하게 비하하는 표현은 쓰지 마.
짧고 임팩트 있게 작성해줘.
의료 정보는 정확하게 유지해.
`;
    }

    const prompt = `
다음 약물 상호작용 정보를 설명해줘.
새로운 의학 정보를 지어내지 말고 제공된 정보만 활용해.

${stylePrompt}

약물1: ${drug1}
약물2: ${drug2}
위험도: ${risk}
설명: ${summary}
주의사항: ${caution}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.status(200).json({
      explanation: text
    });

  } catch (error) {
    console.error("AI 오류 전체:", error);
    console.error("오류 메시지:", error.message);
    console.error("오류 상태:", error.status);

    return res.status(500).json({
      error: "AI 설명 생성 실패"
    });
  }
}