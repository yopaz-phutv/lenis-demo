import { useEffect, useRef, useState } from "react";
import ReactLenis, { useLenis } from "lenis/react";

function App() {
  const boxRef = useRef(null);
  const [useLenisScroll, setUseLenisScroll] = useState(true);
  const scrollYRef = useRef(0);

  useEffect(() => {
    let intervalId;

    if (!useLenisScroll) {
      intervalId = setInterval(() => {
        let scroll = window.scrollY;
        scrollYRef.current = scroll;
        let newX = Math.min(scroll, window.innerWidth - 70);
        if (boxRef.current) {
          boxRef.current.style.transform = `translateX(${newX}px)`;
        }
      }, 50);
    }

    return () => clearInterval(intervalId);
  }, [useLenisScroll]);

  // useLenis(({ scroll }) => {
  //   if (useLenisScroll && boxRef.current) {
  //     let newX = Math.min(scroll, window.innerWidth - 70);
  //     boxRef.current.style.transform = `translateX(${newX}px)`;
  //   }
  // });
//   useLenis(({ scroll }) => {
//     if (useLenisScroll && boxRef.current) {
//         let containerWidth = window.innerWidth; 
//         let boxWidth = 50; // Giả sử ô vuông có width 50px
//         let centerX = containerWidth / 2 - boxWidth / 2; // Tính vị trí giữa

//         // Nếu ô vuông đi qua trung tâm, đảo ngược hướng di chuyển
//         let newX = scroll < centerX ? scroll : centerX - (scroll - centerX);
        
//         // Giới hạn trong khoảng hợp lệ
//         newX = Math.max(0, Math.min(newX, containerWidth - boxWidth));

//         boxRef.current.style.transform = `translateX(${newX}px)`;
//     }
// });
useLenis(({ scroll }) => {
  if (useLenisScroll && boxRef.current) {
    let screenWidth = window.innerWidth;
    let screenHeight = window.innerHeight;
    let boxSize = 50; // Giả sử ô vuông là 50x50px
    let midX = screenWidth / 2 - boxSize / 2;
    let midY = screenHeight / 2 - boxSize / 2;

    let x, y;

    if (scroll < midX) {
      // Đang di chuyển theo chiều ngang
      x = scroll;
      y = 0;
    } else if (scroll < midX + midY) {
      // Chuyển sang di chuyển theo chiều dọc
      x = midX;
      y = scroll - midX;
    } else {
      // Quay lại di chuyển theo chiều ngang
      x = scroll - midY;
      y = midY;
    }

    boxRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }
});

  const Content = (
    <div
      style={{
        height: "300vh",
        overflow: "auto",
        top: 0,
        left: 0,
      }}
    >
      <div style={{ height: "200vh", padding: "20px" }}>
        <div className="fixed-top border border-primary border-2">
          <h1>Cuộn xuống để thấy khối vuông di chuyển ngang</h1>
          <button onClick={() => setUseLenisScroll(!useLenisScroll)} className="btn btn-primary m-2">
            {useLenisScroll ? "Dùng setInterval" : "Dùng Lenis"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {useLenisScroll ? (
        <ReactLenis root options={{ duration: 5 }}>
          {Content}
        </ReactLenis>
      ) : (
        Content
      )}

      <div
        style={{
          position: "fixed",
          top: "50%",
          width: "100%",
          height: "80px",
          border: "2px solid red",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          ref={boxRef}
          style={{
            width: "50px",
            height: "50px",
            background: "green",
          }}
        />
      </div>
    </>
  );
}

export default App;
