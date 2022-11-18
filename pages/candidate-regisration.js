import { useState, useMemo, useCallback, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

//INTRNAL IMPORT
import { VotingContext } from "../context/Voter";
import Style from "../styles/allowedVoter.module.css";
import images from "../assets";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const candidateRegistration = () => {
  const [candidateForm, setCandidateForm] = useState({
    name: "",
    address: "",
    age: "",
  });

  const router = useRouter();

  const {setCandidate, getNewCandidate, candidateArray,} =
      useContext(VotingContext);

  //-------------VOTERS
  console.log("candidateArray");
  console.log(candidateArray);

  useEffect(() => {
    getNewCandidate();
  }, []);
  return (
    <div className={Style.createVoter}>
      <div>
        <div className={Style.sideInfo}>
            <div className={Style.sideInfo_box}>
              <h4>Create Candidate For Voting</h4>
              <p>
                Blockchain voting orgainzation, privide ethereum blockchain eco
                system
              </p>
              <p className={Style.sideInfo_para}>Contract Candidate List</p>
            </div>
            <div className={Style.car}>
              {candidateArray.map((el, i) => (
                  <div key={i + 0} className={Style.card_box}>
                    <div className={Style.card_info}>
                      <p>
                        {el[1]} #{el[2].toNumber()}
                      </p>
                      <p>Address: {el[4]}..</p>
                    </div>
                  </div>
              ))}
            </div>
          </div>
      </div>

      <div className={Style.voter}>
        <div className={Style.voter__container}>
          <h1>Register New Candidate</h1>
          <div className={Style.voter__container__box}>
          </div>
        </div>

        <div className={Style.input__container}>
          <Input
            inputType="text"
            title="Name"
            placeholder="Voter Name"
            handleClick={(e) =>
              setCandidateForm({ ...candidateForm, name: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Address"
            placeholder="Voter Address"
            handleClick={(e) =>
              setCandidateForm({ ...candidateForm, address: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Age"
            placeholder="Voter Position"
            handleClick={(e) =>
              setCandidateForm({ ...candidateForm, age: e.target.value })
            }
          />

          <div className={Style.Button}>
            <Button
              btnName="Authorized Candidate"
              handleClick={() => setCandidate(candidateForm, router)}
            />
          </div>
        </div>
      </div>

      <div className={Style.createdVorter}>
        <div className={Style.createVoter__info}>
          <Image src={images.creator} alt="user profile" />
          <p>Notice</p>
          <p>
            Organizer <span>0xf39Fd6e51..</span>
          </p>
          <p>
            Only organizer of the voting contract can create voter and candidate
            for voting election
          </p>
        </div>
      </div>
    </div>
  );
};

export default candidateRegistration;
