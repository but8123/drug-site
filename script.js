let selectedLeftDrug = "";
let selectedRightDrug = "";

const leftCircle =
  document.getElementById("leftCircle");

const rightCircle =
  document.getElementById("rightCircle");

const checkBtn =
  document.getElementById("checkBtn");

const resultBox =
  document.getElementById("resultBox");

const selectedDrugs =
  document.getElementById("selectedDrugs");

const risk =
  document.getElementById("risk");

const summary =
  document.getElementById("summary");

const caution =
  document.getElementById("caution");

const aiExplanation =
  document.getElementById("aiExplanation");

const interactions = {

  "이부프로펜-아스피린": {
    risk: "높음",
    summary: "둘 다 위 점막을 자극하고 혈소판 기능에 영향을 주어 위장 출혈 위험 증가",
    caution: "장기간 병용 전 전문가 상담 필요"
  },

  "와파린-아스피린": {
    risk: "높음",
    summary: "둘 다 혈액 응고를 억제하여 심한 출혈 위험 증가",
    caution: "반드시 전문가 상담 필요"
  },

  "와파린-이부프로펜": {
    risk: "높음",
    summary: "출혈 위험 증가 + 위장관 손상 가능",
    caution: "함께 복용 시 매우 주의 필요"
  },

  "와파린-아지트로마이신": {
    risk: "높음",
    summary: "항생제가 와파린 대사를 변화시켜 항응고 효과가 과해질 수 있음",
    caution: "INR 수치 모니터링 필요"
  },

  "와파린-시프로플록사신": {
    risk: "높음",
    summary: "간 대사 효소 억제로 와파린 농도가 증가하여 출혈 위험 증가",
    caution: "병용 시 전문가 상담 권장"
  },

  "덱스트로메토르판-플루옥세틴": {
    risk: "높음",
    summary: "세로토닌 농도가 과도하게 증가하여 세로토닌 증후군 위험",
    caution: "함께 복용 시 주의 필요"
  },

  "덱스트로메토르판-설트랄린": {
    risk: "높음",
    summary: "신경전달물질 세로토닌 과다 증가 가능",
    caution: "병용 전 전문가 상담 권장"
  },

  "알프라졸람-세티리진": {
    risk: "주의",
    summary: "둘 다 중추신경계를 억제해 심한 졸림과 집중력 저하 가능",
    caution: "운전 및 기계 조작 주의"
  },

  "알프라졸람-플루옥세틴": {
    risk: "주의",
    summary: "플루옥세틴이 알프라졸람 대사를 억제하여 진정 효과 증가 가능",
    caution: "졸림 및 어지러움 주의"
  },

  "이부프로펜-로사르탄": {
    risk: "주의",
    summary: "NSAIDs가 신장 혈류를 감소시켜 혈압 약 효과 저하 가능",
    caution: "장기 복용 시 신장 기능 주의"
  },

  "이부프로펜-암로디핀": {
    risk: "주의",
    summary: "장기 복용 시 혈압 조절 효과 감소 가능",
    caution: "혈압 변화 관찰 필요"
  },

  "시프로플록사신-메트포르민": {
    risk: "주의",
    summary: "혈당 조절 이상 가능성 증가",
    caution: "혈당 수치 변화 주의"
  },

  "오메프라졸-와파린": {
    risk: "주의",
    summary: "와파린 대사 변화로 INR 증가 가능",
    caution: "출혈 증상 모니터링 필요"
  },

  "슈도에페드린-암로디핀": {
    risk: "주의",
    summary: "슈도에페드린이 혈압을 올려 혈압약 효과 감소 가능",
    caution: "고혈압 환자 주의"
  },

  "슈도에페드린-로사르탄": {
    risk: "주의",
    summary: "혈압 상승 가능성",
    caution: "혈압 변화 확인 필요"
  },

  "아세트아미노펜-와파린": {
    risk: "주의",
    summary: "장기간 병용 시 INR 상승 및 출혈 위험 증가 가능",
    caution: "장기 복용 시 전문가 상담 필요"
  },

  "아지트로마이신-플루옥세틴": {
    risk: "주의",
    summary: "둘 다 심장 전기 신호(QT interval)에 영향 가능",
    caution: "심장 질환 환자 주의"
  },

  "아지트로마이신-설트랄린": {
    risk: "주의",
    summary: "부정맥 위험 증가 가능",
    caution: "심장 증상 발생 시 진료 필요"
  },

  "파모티딘-세티리진": {
    risk: "낮음",
    summary: "큰 문제는 드물지만 졸림 증가 가능",
    caution: "개인 반응 차이 존재"
  },

  "오메프라졸-아목시실린": {
    risk: "낮음",
    summary: "헬리코박터 치료에서 함께 사용되며 비교적 안전",
    caution: "일반적으로 안전하게 사용 가능"
  },

  "메트포르민-암로디핀": {
    risk: "낮음",
    summary: "일반적으로 큰 상호작용 없음",
    caution: "정기적인 건강 관리 권장"
  },

  "세티리진-아세트아미노펜": {
    risk: "낮음",
    summary: "일반적으로 안전하게 사용 가능",
    caution: "권장 용량 준수 필요"
  }
};

document.querySelectorAll(".drug.left")
.forEach(button => {

  button.addEventListener("click", () => {

    selectedLeftDrug = button.dataset.drug;

    leftCircle.textContent =
      selectedLeftDrug;

    document.querySelectorAll(".drug.left")
    .forEach(btn => {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");
  });
});

document.querySelectorAll(".drug.right")
.forEach(button => {

  button.addEventListener("click", () => {

    selectedRightDrug = button.dataset.drug;

    rightCircle.textContent =
      selectedRightDrug;

    document.querySelectorAll(".drug.right")
    .forEach(btn => {
      btn.classList.remove("selected");
    });

    button.classList.add("selected");
  });
});

checkBtn.addEventListener("click", async () => {

  if (
    selectedLeftDrug === "" ||
    selectedRightDrug === ""
  ) {
    alert("양쪽에서 약물을 선택해주세요.");
    return;
  }

  if (
    selectedLeftDrug ===
    selectedRightDrug
  ) {
    alert("서로 다른 약물을 선택해주세요.");
    return;
  }

  const key1 =
    selectedLeftDrug +
    "-" +
    selectedRightDrug;

  const key2 =
    selectedRightDrug +
    "-" +
    selectedLeftDrug;

  const result =
    interactions[key1] ||
    interactions[key2];

  selectedDrugs.textContent =
    selectedLeftDrug +
    " + " +
    selectedRightDrug;

  if (result) {

    risk.textContent =
      result.risk;

    summary.textContent =
      result.summary;

    caution.textContent =
      result.caution;

  } else {

    risk.textContent =
      "정보 없음";

    summary.textContent =
      "현재 등록된 상호작용 정보가 없습니다.";

    caution.textContent =
      "정확한 정보 확인을 위해 전문가 상담이 필요합니다.";
  }

  resultBox.classList.remove("hidden");

  aiExplanation.textContent =
    "AI 설명 생성 중...";

  try {

    const response = await fetch(
      "/api/ai-explain",
      {
        method: "POST",

        headers: {
          "Content-Type":
          "application/json"
        },

        body: JSON.stringify({

          drug1:
            selectedLeftDrug,

          drug2:
            selectedRightDrug,

          risk:
            risk.textContent,

          summary:
            summary.textContent,

          caution:
            caution.textContent,

          style:
            document.querySelector(
              'input[name="aiStyle"]:checked'
            ).value
        })
      }
    );

    const data =
      await response.json();

    aiExplanation.textContent =
      data.explanation ||
      "AI 설명 생성 중 오류가 발생했습니다.";

  } catch (error) {

    console.error(error);

    aiExplanation.textContent =
      "AI 설명 생성 중 오류가 발생했습니다.";
  }
});

function setupSearch(searchInputId, buttonSelector) {
  const searchInput = document.getElementById(searchInputId);
  const buttons = document.querySelectorAll(buttonSelector);

  searchInput.addEventListener("input", () => {
    const keyword = searchInput.value.trim().toLowerCase();

    buttons.forEach(button => {
      const drugName = button.dataset.drug.toLowerCase();

      if (drugName.includes(keyword)) {
        button.style.display = "block";
      } else {
        button.style.display = "none";
      }
    });
  });
}

setupSearch("leftSearch", ".drug.left");
setupSearch("rightSearch", ".drug.right");