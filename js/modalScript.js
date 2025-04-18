// ✅ modalScript.js 수정본 (모달 설명 구성 개선 및 개별 설명 반영)

function openModal(videoSrc, title, descHtml) {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const videoTitle = document.getElementById("videoTitle");
  const videoDesc = document.getElementById("videoDesc");
  const progressBar = document.getElementById("progressBar");

  document.body.style.overflow = "hidden";

  modalVideo.src = videoSrc;
  modalVideo.loop = true;
  modalVideo.play();

  videoTitle.textContent = title;
  videoDesc.innerHTML = descHtml; // ✨ HTML 그대로 삽입
  modal.style.display = "flex";

  // 진행바 동기화
  modalVideo.addEventListener("timeupdate", () => {
    progressBar.value = (modalVideo.currentTime / modalVideo.duration) * 100;
  });

  progressBar.addEventListener("input", () => {
    modalVideo.currentTime = (progressBar.value / 100) * modalVideo.duration;
  });
}

function closeModal() {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  modal.style.display = "none";
  modalVideo.pause();
  modalVideo.currentTime = 0;
}

// 모달 바깥 클릭 시 닫기
window.addEventListener("click", (event) => {
  const modal = document.getElementById("videoModal");
  const modalContent = document.querySelector(".modal-content");
  if (event.target === modal && !modalContent.contains(event.target)) {
    closeModal();
  }

  document.body.style.overflow = "";
});

// ✅ 모든 thumb-item에 클릭 이벤트 연결
//    (영상, 제목, 상세 설명을 HTML로 구성)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".thumb-item").forEach((item) => {
    item.addEventListener("click", () => {
      const videoSrc = item.querySelector("video source")?.src;
      const title = item.querySelector(".thumb-title")?.textContent || "";
      const descHtml = item.querySelector(".desc-template")?.innerHTML || "";

      if (videoSrc) {
        openModal(videoSrc, title, descHtml);
      }
    });
  });
});
