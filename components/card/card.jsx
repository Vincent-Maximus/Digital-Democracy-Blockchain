// import React from "react";
import Image from "next/image";
import React, { useState } from 'react';

import Style from "../card/card.module.css";
import image from "../../candidate.png";

const card = ({ candidateArray, giveVote }) => {
  candidateArray = [["1", "1", "0x05", "0x00", "0x80997970C51812dc3A010C7d01b50e0d17dc49b6"],["2", "2", "0x05", "0x00", "0x80997970C51812dc3A010C7d01b50e0d17dc49b6"],["3", "0", "0x05", "0x00", "0x50597970C51812dc3B010C7d01b50e0d17dc49b6"],["4", "0", "0x05", "0x00", "0x2546BcD3c84621e976D8185a91A922aE77ECEc30"],["5", "0", "0x05", "0x00", "0xbDA5747bFD65F08deb54cb465eB87D40e51B197E"]];
    const address = "0xdD2FD4581271e230360230F9337D5c0430Bf44C0";


    const [count, setCount] = useState (0);
    const handleIncrement = () => (

        setCount (count + 1)

    )

  return (
      <div className={Style.card}>



          {/*Hardcoded*/}
          <div className={Style.card_box}>
              <div className={Style.card_info}>
                  <h2>#0</h2>
                  <p>Address: {address.slice(0, 15)}..</p>
                  <p className={Style.total}>Total Vote {count}</p>
              </div>

              <div className={Style.card_button}>
                  <button
                      onClick={handleIncrement}
                  >
                      Give Vote
                  </button>
              </div>
          </div>
        {/*  Hardcoded*/}

        {candidateArray.map((el, i) => (
            <div className={Style.card_box}>
              <div className={Style.card_info}>
                <h2>#{el[0]}</h2>
                <p>Address: {el[4].slice(0, 15)}..</p>
                <p className={Style.total}>Total Vote {el[1]}</p>
              </div>

              <div className={Style.card_vote}>
                {/*<p>{el[2].toNumber()}</p>*/}
              </div>

              <div className={Style.card_button}>
                <button
                    onClick={() => giveVote({ id: el[2], address: el[6] })}
                >
                  Give Vote
                </button>
              </div>
            </div>
        ))}
      </div>
  );
};

export default card;



// <div className={Style.card}>
//       {candidateArray.map((el, i) => (
//
//         <div className={Style.card_box}>
//           <div className={Style.card_info}>
//             <h2>
//               {el[1]} #{el[3].toNumber()}
//             </h2>
//             <p>{el[0]}</p>
//             <p>Address: {el[4].slice(0, 30)}..</p>
//             <p className={Style.total}>Total Vote</p>
//           </div>
//
//           <div className={Style.card_vote}>
//             <p>{el[2].toNumber()}</p>
//           </div>
//
//           <div className={Style.card_button}>
//             <button
//               onClick={() => giveVote({ id: el[2].toNumber(), address: el[6] })}
//             >
//               Give Vote
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>