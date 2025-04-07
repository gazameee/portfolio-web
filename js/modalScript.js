// 모달 열기 함수 내부에서 정의
function openModal(videoSrc, title, desc) {
  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const videoTitle = document.getElementById("videoTitle");
  const videoDesc = document.getElementById("videoDesc");
  const progressBar = document.getElementById("progressBar");

  modalVideo.src = videoSrc;
  modalVideo.loop = true;
  modalVideo.play();

  videoTitle.textContent = title;
  videoDesc.textContent = desc;
  modal.style.display = "flex";

  // 재생 시간 업데이트
  modalVideo.addEventListener("timeupdate", () => {
    progressBar.value = (modalVideo.currentTime / modalVideo.duration) * 100;
  });

  // 재생바를 움직이면 영상 위치 이동
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

// 모달 바깥 클릭 시 닫기 (모달 내부 클릭 방지 추가)
window.addEventListener("click", (event) => {
  const modal = document.getElementById("videoModal");
  const modalContent = document.querySelector(".modal-content");
  if (event.target === modal && !modalContent.contains(event.target)) {
    closeModal();
  }
});

// 영상 클릭 이벤트 등록
document.querySelectorAll(".thumb-item").forEach((item) => {
  item.addEventListener("click", () => {
    const videoSrc = item.querySelector("video source").src;
    const title = item.querySelector(".thumb-title").textContent;
    const desc = "";

    openModal(videoSrc, title, desc);
  });
});

// 재생 시간 업데이트
modalVideo.addEventListener("timeupdate", () => {
  progressBar.value = (modalVideo.currentTime / modalVideo.duration) * 100;
});

// 재생바를 움직이면 영상 위치 이동
progressBar.addEventListener("input", () => {
  modalVideo.currentTime = (progressBar.value / 100) * modalVideo.duration;
});
