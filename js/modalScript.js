// ✅ 최종 통합 modalScript.js (data-video는 iframe, 없으면 mp4 video)

function openModal(videoSrc, title, descHtml, isYouTube = false) {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const modalIframe = document.getElementById("modalIframe");
  const videoTitle = document.getElementById("videoTitle");
  const videoDesc = document.getElementById("videoDesc");

  document.body.style.overflow = "hidden";

  if (isYouTube) {
    // ✅ YouTube 영상 처리
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = "";
    modalVideo.style.display = "none";

    modalIframe.style.display = "block";
    modalIframe.src = `https://www.youtube.com/embed/${videoSrc}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1&playsinline=1`;
  } else {
    // ✅ 일반 mp4 영상 처리
    modalIframe.src = "";
    modalIframe.style.display = "none";

    modalVideo.style.display = "block";
    modalVideo.setAttribute("playsinline", true); // ✅ 자동 전체화면 방지
    modalVideo.setAttribute("webkit-playsinline", true); // ✅ iOS 대응
    modalVideo.src = videoSrc;
    modalVideo.loop = true;
    modalVideo.play();
  }

  videoTitle.textContent = title;
  videoDesc.innerHTML = descHtml;

  modal.style.display = "flex";
}

function closeModal() {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const modalIframe = document.getElementById("modalIframe");

  modal.style.display = "none";

  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.src = "";
  modalVideo.style.display = "none";

  modalIframe.src = "";
  modalIframe.style.display = "none";

  document.body.style.overflow = "auto";
}

["click", "touchstart"].forEach((evt) => {
  document.addEventListener(evt, (event) => {
    const modal = document.getElementById("videoModal");
    const modalContent = document.querySelector(".modal-content");

    // 모달이 보이고 있고, 클릭한 요소가 모달 안이 아니고, 모달 자체도 아닐 때만 닫기
    if (
      modal &&
      modal.style.display === "flex" &&
      !modalContent.contains(event.target) &&
      !event.target.closest(".thumb-item") // 썸네일 클릭은 무시
    ) {
      closeModal();
    }
  });
});

// ✅ ESC 키로 모달 닫기
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".thumb-item").forEach((item) => {
    item.addEventListener("click", () => {
      let dataVideo = item.querySelector("video")?.getAttribute("data-video");
      let isYouTube = false;
      let videoSrc = "";

      if (dataVideo) {
        // ✅ data-video가 있으면 YouTube
        videoSrc = dataVideo;
        isYouTube = true;
      } else {
        // ✅ 일반 mp4 video
        videoSrc = item.querySelector("video source")?.src || "";
        isYouTube = false;
      }

      const title = item.querySelector(".thumb-title")?.textContent || "";
      const descHtml = item.querySelector(".desc-template")?.innerHTML || "";

      if (videoSrc.trim() !== "") {
        openModal(videoSrc, title, descHtml, isYouTube);
      } else {
        console.error("Video source를 찾을 수 없습니다.");
      }
    });
  });

  // ✅ 페이지 로드 시, data-video가 있으면 video 숨기기
  document.querySelectorAll(".thumb-item").forEach((item) => {
    const video = item.querySelector("video");
    const videoSrc = item.querySelector("video")?.getAttribute("data-video");

    if (videoSrc) {
      if (video) {
        video.style.display = "none";
      }
    } else {
      if (video) {
        video.style.display = "block";
      }
    }
  });
});
