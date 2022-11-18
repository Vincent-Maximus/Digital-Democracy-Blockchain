import { useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

//INTRNAL IMPORT
import { VotingContext } from "../context/Voter";
import Style from "../styles/allowedVoter.module.css";
import images from "../assets";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const allowedVoters = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    position: "",
  });

  const router = useRouter();

  const {createVoter, getNewCandidate, voterArray } =
    useContext(VotingContext);

  console.log(voterArray);

  //-------------VOTERS
  // const onDrop = useCallback(async (acceptedFile) => {
  //   // const url = await uploadToIPFS(acceptedFile[0]);
  //
  //   // setFileUrl(url);
  // }, []);

  // const { getRootProps, getInputProps } = useDropzone({
  //   onDrop,
  //   accept: "image/*",
  //   maxSize: 500000,
  // });

  console.log("voterArray");
  console.log(voterArray);

  useEffect(() => {
    getNewCandidate();
  }, []);

  return (
    <div className={Style.createVoter}>
      <div>
        {(
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
              {voterArray.map((el, i) => (
                <div key={i + 0} className={Style.card_box}>
                  <div className={Style.card_info}>
                    <p>
                      {el[1]} #{el[0].toNumber()}
                    </p>
                    <p>Address: {el[2]}..</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={Style.voter}>
        <div className={Style.voter__container}>
          <h1>Create New Voter</h1>
          <div className={Style.voter__container__box}>

          </div>
        </div>

        <div className={Style.input__container}>
          <Input
            inputType="text"
            title="Name"
            placeholder="Voter Name"
            handleClick={(e) =>
              setFormInput({ ...formInput, name: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Address"
            placeholder="Voter Address"
            handleClick={(e) =>
              setFormInput({ ...formInput, address: e.target.value })
            }
          />
          <Input
            inputType="text"
            title="Position"
            placeholder="Voter Position"
            handleClick={(e) =>
              setFormInput({ ...formInput, position: e.target.value })
            }
          />

          <div className={Style.Button}>
            <Button
              btnName="Authorized Voter"
              handleClick={() => createVoter(formInput, router)}
            />
          </div>
        </div>
      </div>

      <div className={Style.createVoter}>
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

export default allowedVoters;
