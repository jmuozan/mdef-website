document.addEventListener("DOMContentLoaded", function () {
  const imageSources = [
    "./BIOCHROMES/IMGS/1.png",
    "./R&M/IMGS/1.JPG",
    "./THESIS_PROJECT/IMG/0.jpg",
    "./ROBOTS/ROBOT_PRINTING.gif",
    "MDEF02/LLUM25/Timelapse1.2.gif",
    "./EMERGING ECONOMIES/IMG/0.jpg",
    "./OS_HARDWARE/IMG/CIRCUIT.jpg",
    "",
  ];

  const menuItems = document.querySelectorAll(".menu-item");

  menuItems.forEach((item) => {
    const copyElements = item.querySelectorAll(".info, .name, .tag");

    copyElements.forEach((div) => {
      const copy = div.querySelector("p");
      if (copy) {
        const duplicateCopy = document.createElement("p");
        duplicateCopy.textContent = copy.textContent;
        div.appendChild(duplicateCopy);
      }
    });
  });

  const appendImages = (src) => {
    const preview1 = document.querySelector(".preview-img-1");
  
    const img1 = document.createElement("img");
    img1.src = src;
    img1.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
  
    // Set a fixed height and let the width adapt based on the image's proportions
    img1.style.height = "100%";  // Image height adapts to the container's height
    img1.style.width = "auto";   // The width adjusts based on the image's aspect ratio
    img1.style.objectFit = "contain"; // Ensures the image fits properly maintaining aspect ratio
  
    preview1.textContent = '';  // Clear previous content if any
    preview1.appendChild(img1);
  
    gsap.to([img1], {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      duration: 1,
      ease: "power3.out",
      onComplete: function () {
        removeExtraImages(preview1);
      },
    });
  };

  function removeExtraImages(container) {
    while (container.children.length > 10) {
      container.removeChild(container.firstChild);
    }
  }

  document.querySelectorAll(".menu-item").forEach((item, index) => {
    item.addEventListener("mouseover", () => {
      mouseOverAnimation(item);
      appendImages(imageSources[index]);
    });

    item.addEventListener("mouseout", () => {
      mouseOutAnimation(item);
    });
  });

  const mouseOverAnimation = (elem) => {
    gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
      top: "-100%",
      duration: 0.3,
    });
    gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
      top: "0%",
      duration: 0.3,
    });
  };

  const mouseOutAnimation = (elem) => {
    gsap.to(elem.querySelectorAll("p:nth-child(1)"), {
      top: "0%",
      duration: 0.3,
    });
    gsap.to(elem.querySelectorAll("p:nth-child(2)"), {
      top: "100%",
      duration: 0.3,
    });
  };

  document.querySelector(".menu").addEventListener("mouseout", function () {
    gsap.to(".preview-img img", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      duration: 1,
      ease: "power3.out",
    });
  });

  document.addEventListener("mousemove", function (e) {
    const preview = document.querySelector(".preview");
    gsap.to(preview, {
      x: e.clientX + 300,
      y: e.clientY,
      duration: 1,
      ease: "power3.out",
    });
  });
});
