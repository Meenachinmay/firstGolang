// // components/RetroChat.tsx
// import React from "react";
// import styles from "./RetroChat.module.css";

// const RetroChat: React.FC = () => {
//   return (
//     <>
//       <main className="bg-[#e4e4e4] min-h-screen flex items-center justify-center">
//         <div className={`${styles.retroContainer} max-w-md mx-auto my-8 p-4`}>
//           <div className={styles.retroHeader}>
//             <h1 className="text-lg">Retro Retrospectives</h1>
//           </div>
//           <div className={styles.retroContent}>
//             <p>
//               Retro Retrospectives. Discuss positives, negatives, and action
//               items with your team, anonymously, in real-time.
//             </p>
//             <button className={styles.retroButton}>
//               + Create a new session
//             </button>
//           </div>
//         </div>
//       </main>
//     </>
//   );
// };

// export default RetroChat;

// components/RetroChat.tsx
import React from "react";

import { molle, vt323 } from "../fonts";

const RetroChat: React.FC = () => {
  return (
    <>
      <main className={`${vt323.className} flex flex-col w-full h-screen items-center p-[24px] font-mono`}>
        <div className="bg-[#f7f7f7] border border-black border-dashed p-4 w-[70%] h-full my-8">
          <div className="bg-black text-white p-2">
            <h1 className="text-2xl">Retro Retrospectives</h1>
          </div>
          <div className="p-4 border-black border-dashed border w-full h-full">
            <p>
              Retro Retrospectives. Discuss positives, negatives, and action
              items with your team, anonymously, in real-time.
            </p>            
          </div>
        </div>
      </main>
    </>
  );
};

export default RetroChat;

// <button className="mt-4 bg-transparent border border-black px-4 py-2 hover:bg-black hover:text-white cursor-pointer">
//               + Create a new session
//             </button>
