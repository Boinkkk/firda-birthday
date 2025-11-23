let audioUrl = ""
let audio = null
let isPlaying = false
let tl = null // Variabel Timeline Global

const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      dataArr = Object.keys(data)
      dataArr.map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData])
          } else if (customData === "fonts") {
            data[customData].forEach(font => {
              const link = document.createElement('link')
              link.rel = 'stylesheet'
              link.href = font.path
              document.head.appendChild(link)
              document.body.style.fontFamily = font.name
            })
          } else if (customData === "music") {
            audioUrl = data[customData]
            audio = new Audio(audioUrl)
            audio.preload = "auto"
          } else {
            document.querySelector(`[data-node-name*="${customData}"]`).innerText = data[customData]
          }
        }

        if (dataArr.length === dataArr.indexOf(customData) + 1) {
          document.querySelector("#startButton").addEventListener("click", () => {
            document.querySelector(".startSign").style.display = "none"
            animationTimeline()
          })
        }
      })
    })
}

const animationTimeline = () => {
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0]
  const hbd = document.getElementsByClassName("wish-hbd")[0]

  textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
    .split("")
    .join("</span><span>")}</span`

  hbd.innerHTML = `<span>${hbd.innerHTML
    .split("")
    .join("</span><span>")}</span`

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  }

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  }

  tl = new TimelineMax()

  tl
    .to(".container", 0.1, { visibility: "visible" })
    
    // --- Segmen 1 ---
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .addPause() 
    // PERUBAHAN: +=2.5 diubah jadi +=0.1 agar langsung hilang saat diklik
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=0.1") 
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
    
    // --- Segmen 2 ---
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .addPause()
    // PERUBAHAN: +=2 diubah jadi +=0.1
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=0.1") 

    // --- Segmen 3 ---
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
    .staggerTo(".hbd-chatbox span", 0.5, { visibility: "visible" }, 0.05)
    .addPause()
    .to(".fake-btn", 0.1, { backgroundColor: "#8FE3B6" })
    // PERUBAHAN: +=0.7 diubah jadi +=0.1
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=0.1") 

    // --- Segmen 4 ---
    .from(".idea-1", 0.7, ideaTextTrans)
    .addPause()
    // PERUBAHAN: +=1.5 diubah jadi +=0.1
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=0.1") 

    // --- Segmen 5 ---
    .from(".idea-2", 0.7, ideaTextTrans)
    .addPause()
    // PERUBAHAN: +=1.5 diubah jadi +=0.1
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=0.1")

    // --- Segmen 6 ---
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    })
    .addPause()
    // PERUBAHAN: +=1.5 diubah jadi +=0.1
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=0.1")

    // --- Segmen 7 ---
    .from(".idea-4", 0.7, ideaTextTrans)
    .addPause()
    // PERUBAHAN: +=1.5 diubah jadi +=0.1
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=0.1")

    // --- Segmen 8 ---
    .from(".idea-5", 0.7, {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
      }, "+=0.5")
    .to(".idea-5 .smiley", 0.7, { rotation: 90, x: 8 }, "+=0.4")
    .addPause()
    // PERUBAHAN: +=2 diubah jadi +=0.1
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=0.1")

    // --- Segmen 9 ---
    .staggerFrom(".idea-6 span", 0.8, {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
      }, 0.2)
    .addPause()
    // PERUBAHAN: +=1 diubah jadi +=0.1
    .staggerTo(".idea-6 span", 0.8, {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
      }, 0.2, "+=0.1")

    // --- Segmen Akhir (Pesta - Tidak perlu diubah karena jalan otomatis) ---
    .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
    .from(".lydia-dp", 0.5, { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
    .from(".hat", 0.5, { x: -100, y: 350, rotation: -180, opacity: 0 })
    .staggerFrom(".wish-hbd span", 0.7, {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5)
      }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, 
      { scale: 1.4, rotationY: 150 },
      { scale: 1, rotationY: 0, color: "#ff69b4", ease: Expo.easeOut }, 
      0.1, "party")
    .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
    .staggerTo(".eight svg", 1.5, {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4
      }, 0.3)
    .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(".last-smile", 0.5, { rotation: 90 }, "+=1")

  const replyBtn = document.getElementById("replay")
  replyBtn.addEventListener("click", () => {
    tl.restart()
  })
}

fetchData()

const playPauseButton = document.getElementById('playPauseButton')

document.getElementById('startButton').addEventListener('click', () => {
  if (audio) {
    togglePlay(true)
  }
})

playPauseButton.addEventListener('click', () => {
  if (audio) {
    togglePlay(!isPlaying)
  }
})

// --- EVENT LISTENER KLIK GLOBAL ---
document.body.addEventListener("click", (e) => {
  // Mencegah klik pada tombol kontrol memicu animasi 'next'
  if (e.target.id !== "startButton" && e.target.id !== "replay" && e.target.id !== "playPauseButton") {
     // Jika timeline ada dan sedang dalam keadaan PAUSED, lanjutkan (Play)
     if (tl && tl.paused()) {
      tl.play()
    }
  }
})

function togglePlay(play) {
  if (!audio) return
  
  isPlaying = play
  play ? audio.play() : audio.pause()
  playPauseButton.classList.toggle('playing', play)
}