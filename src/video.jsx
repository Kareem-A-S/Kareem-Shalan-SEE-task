import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import "animate.css";
import html2canvas from "html2canvas";

function Video() {
  const screenshotTarget = useRef(null);
  const pausePoints = [1.9, 7.31];
  const tolerance = 0.15;
  const [showResumeBttn, changeResume] = useState(false);
  const lastPausedTime = useRef(null);
  const videoCtrl = useRef(null);
  const triggered = useRef(new Set());
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);
  const [isHovered4, setIsHovered4] = useState(false);
  const [isHovered5, setIsHovered5] = useState(false);
  const [pauseCount, setCount] = useState(0);
  const [dispPoints, changePointDisp] = useState(true);
  const [dispDims, changeDimDisp] = useState(true);
  useEffect(() => {
    const video = videoCtrl.current;

    const handleLoadedMetadata = () => {
      video.currentTime = 0;
      setTimeout(() => {
        video.play();
      }, 50);
    };
    const handleVideoEnded = () => {
      triggered.current = new Set();
      video.currentTime = 0;
      video.play();
    };

    let checkInterval = null;

    const timeCheck = () => {
      checkInterval = setInterval(() => {
        const currTime = video.currentTime;
        for (const pauseTime of pausePoints) {
          if (
            currTime >= pauseTime &&
            currTime <= pauseTime + tolerance &&
            !triggered.current.has(pauseTime)
          ) {
            triggered.current.add(pauseTime);
            video.pause();
            setCount((prev) => prev + 1);
            lastPausedTime.current = currTime;
            changeResume(true);
            clearInterval(checkInterval);
            break;
          }
        }
      }, 50);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", timeCheck);
    video.addEventListener("ended", handleVideoEnded);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", timeCheck);
      video.removeEventListener("ended", handleVideoEnded);
      clearInterval(checkInterval);
    };
  }, []);

  const handleResume = () => {
    videoCtrl.current.play();
    changeResume(false);
  };

  const handleScreenshot = async () => {
    const source = screenshotTarget.current;
    if (!source) return;

    const clone = source.cloneNode(true);

    const copyComputedStyles = (sourceEl, targetEl) => {
      const computedStyle = getComputedStyle(sourceEl);
      for (let prop of computedStyle) {
        targetEl.style[prop] = computedStyle.getPropertyValue(prop);
      }

      Array.from(sourceEl.children).forEach((child, i) => {
        copyComputedStyles(child, targetEl.children[i]);
      });
    };

    copyComputedStyles(source, clone);

    const originalVideo = source.querySelector("video");
    const cloneVideo = clone.querySelector("video");

    if (originalVideo && cloneVideo) {
      try {
        const videoCanvas = document.createElement("canvas");
        videoCanvas.width = originalVideo.videoWidth;
        videoCanvas.height = originalVideo.videoHeight;
        const ctx = videoCanvas.getContext("2d");
        ctx.drawImage(
          originalVideo,
          0,
          0,
          videoCanvas.width,
          videoCanvas.height
        );

        const videoImg = document.createElement("img");
        videoImg.src = videoCanvas.toDataURL("image/png");
        videoImg.style.width = originalVideo.clientWidth + "px";
        videoImg.style.height = originalVideo.clientHeight + "px";

        cloneVideo.parentNode.replaceChild(videoImg, cloneVideo);
      } catch (err) {
        console.warn(
          "Video frame could not be drawn due to CORS restrictions:",
          err
        );
      }
    }

    const offscreen = document.createElement("div");
    offscreen.style.position = "absolute";
    offscreen.style.top = "0";
    offscreen.style.left = "-10000px";
    offscreen.style.zIndex = "-9999";
    offscreen.appendChild(clone);
    document.body.appendChild(offscreen);

    await new Promise((res) => requestAnimationFrame(res));
    await new Promise((res) => requestAnimationFrame(res));

    html2canvas(clone, {
      useCORS: true,
      backgroundColor: null,
      logging: true,
      scale: 2,
    }).then((canvas) => {
      try {
        const dataURL = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `video-ui-screenshot-${Date.now()}.png`;
        link.click();
      } catch (err) {
        console.error(
          "Screenshot failed due to canvas security restrictions:",
          err
        );
      } finally {
        document.body.removeChild(offscreen);
      }
    });
  };

  return (
    <>
      <div ref={screenshotTarget} className="videoComponents roboto-serif-font">
        <video
          ref={videoCtrl}
          muted
          width="100%"
          className="myVideo"
          crossOrigin="anonymous"
        >
          <source src="/resources/video.mp4" type="video/mp4" />
          Invalid video format!
        </video>

        {showResumeBttn && (
          <button className="resumeButton " onClick={handleResume}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100"
              height="100"
              fill="#6805f2"
              className="bi bi-file-play"
              viewBox="0 0 16 16"
            >
              <path d="M6 10.117V5.883a.5.5 0 0 1 .757-.429l3.528 2.117a.5.5 0 0 1 0 .858l-3.528 2.117a.5.5 0 0 1-.757-.43z" />
              <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1" />
            </svg>
          </button>
        )}

        <div
          className={`dimPlayerLeft ${
            showResumeBttn && pauseCount % 2 == 1 && dispDims ? `Dim1` : ``
          }
        ${showResumeBttn && pauseCount % 2 == 0 && dispDims ? `Dim2` : ``}`}
        ></div>
        <div
          className={`dimPlayerRight ${
            showResumeBttn && pauseCount % 2 == 1 && dispDims ? `Dim1` : ``
          }
        ${showResumeBttn && pauseCount % 2 == 0 && dispDims ? `Dim2` : ``}`}
        ></div>
        <div
          className={`headStats ${
            showResumeBttn && pauseCount % 2 == 1 ? `animateStat` : ``
          }
        ${showResumeBttn && pauseCount % 2 == 0 ? `animateStat2` : ``}`}
          onMouseEnter={() => setIsHovered5(true)}
          onMouseLeave={() => setIsHovered5(false)}
        >
          <div className="bar-container   roboto-serif-font ">
            <div className={`fill-line1 ${isHovered5 ? "filled" : ""}`}></div>
            <div
              className={`  roboto-serif-font bodyPart ${
                isHovered5 ? "movedUp" : ""
              }`}
            >
              Head
            </div>
            <div className={`statDeets ${isHovered5 ? "showStatBar" : ""}`}>
              <div
                className={`  roboto-serif-font statDesc-a ${
                  isHovered5 && dispPoints ? "descShow" : ""
                }`}
              >
                Focus:
              </div>
              <div
                className={`progress-bar-e ${
                  isHovered5 && dispPoints ? "fillStat" : ""
                }`}
              ></div>
              <div
                className={`  roboto-serif-font statDesc-b ${
                  isHovered5 && dispPoints ? "descShow" : ""
                }`}
              >
                Tilt:
              </div>
              <div
                className={`progress-bar-d ${
                  isHovered5 && dispPoints ? "fillStat" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`leftWristStats ${
            showResumeBttn && pauseCount % 2 == 1 ? `animateStat` : ``
          }
        ${showResumeBttn && pauseCount % 2 == 0 ? `animateStat2` : ``}`}
        >
          <div className="bar-container">
            <div className={`fill-line1 ${isHovered ? "filled" : ""}`}></div>
            <div
              className={`  roboto-serif-font bodyPart ${
                isHovered ? "movedUp" : ""
              }`}
            >
              Left Wrist
            </div>
            <div className={`statDeets ${isHovered ? "showStatBar" : ""}`}>
              <div
                className={`  roboto-serif-font statDesc-a ${
                  isHovered && dispPoints ? "descShow" : ""
                }`}
              >
                Core:
              </div>
              <div
                className={`progress-bar-e ${
                  isHovered && dispPoints ? "fillStat" : ""
                }`}
              ></div>
              <div
                className={`  roboto-serif-font statDesc-b ${
                  isHovered && dispPoints ? "descShow" : ""
                }`}
              >
                Form:
              </div>
              <div
                className={`progress-bar-d ${
                  isHovered && dispPoints ? "fillStat" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
        {/*  */}
        <div
          onMouseEnter={() => setIsHovered2(true)}
          onMouseLeave={() => setIsHovered2(false)}
          className={`rightWristStats ${
            showResumeBttn && pauseCount % 2 == 1 ? `animateStat` : ``
          }
        ${showResumeBttn && pauseCount % 2 == 0 ? `animateStat2` : ``}`}
        >
          <div className="bar-container">
            <div className={`fill-line3 ${isHovered2 ? "filled" : ""}`}></div>
            <div
              className={`bodyPart  roboto-serif-font  ${
                isHovered2 ? "movedUp" : ""
              }`}
            >
              Right Wrist
            </div>
            <div className={`statDeets ${isHovered2 ? "showStatBar" : ""}`}>
              <div
                className={`statDesc-a  roboto-serif-font  ${
                  isHovered2 && dispPoints ? "descShow" : ""
                }`}
              >
                Core:
              </div>
              <div
                className={`progress-bar-c ${
                  isHovered2 && dispPoints ? "fillStat" : ""
                }`}
              ></div>
              <div
                className={`statDesc-b  roboto-serif-font  ${
                  isHovered2 && dispPoints ? "descShow" : ""
                }`}
              >
                Form:
              </div>
              <div
                className={`progress-bar-b ${
                  isHovered2 && dispPoints ? "fillStat" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
        {/* */}
        <div
          onMouseEnter={() => setIsHovered3(true)}
          onMouseLeave={() => setIsHovered3(false)}
          className={`leftAnkleStats ${
            showResumeBttn && pauseCount % 2 == 1 ? `animateStat` : ``
          }
        ${showResumeBttn && pauseCount % 2 == 0 ? `animateStat2` : ``}`}
        >
          <div className="bar-container">
            <div className={`fill-line4 ${isHovered3 ? "filled" : ""}`}></div>
            <div
              className={`bodyPart  roboto-serif-font  ${
                isHovered3 ? "movedUp" : ""
              }`}
            >
              Left Ankle
            </div>
            <div className={`statDeets ${isHovered3 ? "showStatBar" : ""}`}>
              <div
                className={`statDesc-a  roboto-serif-font  ${
                  isHovered3 && dispPoints ? "descShow" : ""
                }`}
              >
                Control:
              </div>
              <div
                className={`progress-bar-a ${
                  isHovered3 && dispPoints ? "fillStat" : ""
                }`}
              ></div>
              <div
                className={`statDesc-b  roboto-serif-font  ${
                  isHovered3 && dispPoints ? "descShow" : ""
                }`}
              >
                Pos:
              </div>
              <div
                className={`progress-bar-b ${
                  isHovered3 && dispPoints ? "fillStat" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
        {/*  */}
        <div
          onMouseEnter={() => setIsHovered4(true)}
          onMouseLeave={() => setIsHovered4(false)}
          className={`rightAnkleStats ${
            showResumeBttn && pauseCount % 2 == 1 ? `animateStat` : ``
          }
        ${showResumeBttn && pauseCount % 2 == 0 ? `animateStat2` : ``}`}
        >
          <div className="bar-container">
            <div className={`fill-line2 ${isHovered4 ? "filled" : ""}`}></div>
            <div
              className={`bodyPartIRR   roboto-serif-font ${
                isHovered4 ? "movedUp" : ""
              }`}
            >
              Right Ankle
            </div>
            <div className={`statDeetsIRR ${isHovered4 ? "showStatBar" : ""}`}>
              <div
                className={`statDesc-a   roboto-serif-font ${
                  isHovered4 && dispPoints ? "descShow" : ""
                }`}
              >
                Core:
              </div>
              <div
                className={`progress-bar-e ${
                  isHovered4 && dispPoints ? "fillStat" : ""
                }`}
              ></div>
              <div
                className={`statDesc-b  roboto-serif-font  ${
                  isHovered4 && dispPoints ? "descShow" : ""
                }`}
              >
                Form:
              </div>
              <div
                className={`progress-bar-d ${
                  isHovered4 && dispPoints ? "fillStat" : ""
                }`}
              ></div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
      <div className="toggleGroup">
        <div className="toggleButtons">
          <p className="toggleTitle  roboto-serif-font ">Toggle Dimming</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={dispDims}
              onChange={() => {
                changeDimDisp((prev) => !prev);
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
        {showResumeBttn && (
          <button className="scButton" onClick={handleScreenshot}>
            <div className="scComponents  roboto-serif-font ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                fill="currentColor"
                className="bi bi-camera"
                viewBox="0 0 16 16"
              >
                <path d="M15 12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1.172a3 3 0 0 0 2.12-.879l.83-.828A1 1 0 0 1 6.827 3h2.344a1 1 0 0 1 .707.293l.828.828A3 3 0 0 0 12.828 5H14a1 1 0 0 1 1 1zM2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4z" />
                <path d="M8 11a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5m0 1a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M3 6.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0" />
              </svg>
              ScreenShot
            </div>
          </button>
        )}
        <div className="toggleButtons">
          <p className="toggleTitle roboto-serif-font ">Toggle Stats</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={dispPoints}
              onChange={() => {
                changePointDisp((prev) => !prev);
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </>
  );
}

export default Video;
