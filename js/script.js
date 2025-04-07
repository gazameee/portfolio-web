// src/js/script.js

document.addEventListener("DOMContentLoaded", () => {
  showMainPage(); // ✅ 초기 화면을 메인 페이지로 설정
});

// 로고 클릭 시 메인 페이지로 이동
function resetHome() {
  location.reload(true);
}

// ✅ 메인 페이지 표시 함수 (이미지가 사라지지 않도록 설정)
function showMainPage() {
  document.querySelectorAll("[data-section]").forEach((sec) => {
    sec.style.display = "none"; // 모든 섹션 숨기기
  });

  const mainPage = document.querySelector(".main-page");
  mainPage.style.display = "flex"; // ✅ 메인 페이지가 항상 보이도록 설정
}

// 메일 복사 함수
function copyLink() {
  // 복사할 링크
  const link = "grf0607@gmail.com";

  // 클립보드에 복사
  navigator.clipboard
    .writeText(link)
    .then(() => {
      // 복사 완료 메시지 표시
      const msg = document.getElementById("copyMsg");
      msg.style.display = "block";

      // 2초 후 메시지 숨기기
      setTimeout(() => {
        msg.style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      console.error("복사 실패: ", err);
    });
}

// ✅ 섹션 변경 함수 (About, Works, Experiences)
function changeContent(section) {
  document.querySelector(".main-page").style.display = "none"; // ✅ 메인 페이지 숨기기

  document.querySelectorAll("[data-section]").forEach((sec) => {
    sec.style.display = sec.dataset.section === section ? "block" : "none";
  });

  document.querySelector("main").className = `${section}-bg`;

  // ✅ 활성 버튼 설정
  document
    .querySelectorAll(".nav-btn")
    .forEach((btn) => btn.classList.remove("active"));
  document.querySelector(`.nav-btn.${section}`).classList.add("active");

  // ✅ About 섹션 선택 시 타이핑 효과 실행
  if (section === "about") {
    startTypingEffect();
  }

  // ✅ Works 섹션 선택 시 reverse 스타일 적용
  if (section === "works") {
    applyReverseStyle();
  }
}

// ✅ About 타이핑 효과 함수
function typeText(elementId, text, speed = 50, callback) {
  const target = document.getElementById(elementId);
  let index = 0;
  target.innerHTML = "";

  function type() {
    if (index < text.length) {
      target.innerHTML += text.charAt(index++);
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }
  type();
}

let isTyping = false; // ✅ 중복 실행 방지 변수

// ✅ About 섹션 타이핑 효과 실행 (중복 실행 방지)
function startTypingEffect() {
  if (isTyping) return; // 이미 실행 중이라면 중단
  isTyping = true; // 실행 상태로 변경

  const q1 =
    "환경에 스며듭니다. 사람들의 감정 변화를 빠르게 파악하고, 이를 섬세하게 표현하는 능력을 가지고 있습니다. 커뮤니케이션을 통해 감정을 세심하게 캐치함으로써, 시청자에게 보다 자연스럽게 다가갈 수 있는 작업물을 만들어내고자 합니다.";
  const q2 =
    "스토리와 감정이 조화를 이루는 편집을 하고 싶습니다. 영상 편집은 단순히 장면을 연결하는 작업이 아니라, 이야기의 전개를 강화하고 감정을 효과적으로 전달하는 과정이라고 생각합니다. 영상의 힘은 감정과 이야기가 자연스럽게 어우러질 때 가장 크게 발휘된다고 믿습니다. 감정의 흐름이 끊기지 않도록 장면을 연결하고, 자연스럽게 이어지는 편집을 통해 감동을 줄 수 있는 영상을 만들고 싶습니다.";

  // 기존 텍스트 초기화
  document.getElementById("typing-q1").innerHTML = "";
  document.getElementById("typing-q2").innerHTML = "";

  // 첫 번째 타이핑 완료 후 두 번째 실행
  typeText("typing-q1", q1, 20, () => {
    typeText("typing-q2", q2, 20, () => {
      isTyping = false; // ✅ 모든 타이핑이 끝난 후 다시 실행 가능하도록 변경
    });
  });
}

// ✅ Motion Graphy의 짝수 번째 블록에 reverse 스타일 적용
function applyReverseStyle() {
  const motionGraphyCategory = document.querySelector(
    "#works .works-category[data-category='motion-graphy']"
  );

  if (!motionGraphyCategory) return; // Motion Graphy 섹션이 없으면 실행 안 함

  const projectBlocks = motionGraphyCategory.querySelectorAll(".project-block");

  projectBlocks.forEach((block, index) => {
    if ((index + 1) % 2 === 0) {
      block.classList.add("reverse");
    } else {
      block.classList.remove("reverse");
    }
  });
}

// Video Hover Preview
document.addEventListener("DOMContentLoaded", () => {
  const videoItems = document.querySelectorAll(".thumb-item");

  videoItems.forEach((item) => {
    const video = item.querySelector(".preview-video");

    // Mouse over - play the video
    item.addEventListener("mouseenter", () => {
      if (video) {
        video.style.display = "block";
        video.play();
      }
    });

    // Mouse leave - pause the video
    item.addEventListener("mouseleave", () => {
      if (video) {
        video.pause();
        video.style.display = "none";
        video.currentTime = 0; // Reset video
      }
    });
  });
});

// Video Hover Preview with Disappearing Progress Bar
document.addEventListener("DOMContentLoaded", () => {
  const videoItems = document.querySelectorAll(".thumb-item");

  videoItems.forEach((item) => {
    const video = item.querySelector(".preview-video");
    const progressBar = item.querySelector(
      ".works-progress-bar, .experiences-progress-bar"
    );
    let hideTimeout; // 재생바 숨기기 타이머

    // 재생바 보이기 함수
    const showProgressBar = () => {
      progressBar.classList.remove("hidden-bar");
      clearTimeout(hideTimeout);
    };

    // 재생바 숨기기 함수
    const hideProgressBar = () => {
      hideTimeout = setTimeout(() => {
        progressBar.classList.add("hidden-bar");
      }, 1000); // 1초 후 서서히 사라짐
    };

    // Mouse over - play the video
    item.addEventListener("mouseenter", () => {
      if (video) {
        video.play();
        showProgressBar(); // 초기화하여 바로 보이게
      }
    });

    // Mouse move - update progress bar and video time
    item.addEventListener("mousemove", (event) => {
      if (video && !video.paused) {
        showProgressBar(); // 마우스 움직임에 따라 보이기

        const rect = item.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const percent = (mouseX / rect.width) * 100;
        const newTime = (video.duration * percent) / 100;

        // 재생바 위치 및 길이 업데이트
        progressBar.style.width = `${percent}%`;
        progressBar.style.left = "0";

        // 영상 시간 이동
        video.currentTime = newTime;

        // 재생바 숨기기 타이머 시작
        hideProgressBar();
      }
    });

    // Mouse leave - pause the video
    item.addEventListener("mouseleave", () => {
      if (video) {
        video.pause();
        progressBar.style.width = "0%";
        progressBar.classList.add("hidden-bar"); // 마우스 나가면 즉시 사라짐
      }
    });
  });
});
