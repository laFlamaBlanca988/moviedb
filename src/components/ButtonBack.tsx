import React from "react";
import { MdArrowBackIos } from "react-icons/md";

interface ButtonBackProps {
  onGoBack: React.MouseEventHandler<HTMLDivElement>;
}

const ButtonBack: React.FC<ButtonBackProps> = ({ onGoBack }) => {
  return (
    <div onClick={onGoBack} className="button-back-wrapper">
      <MdArrowBackIos size="26px" />
      <button className="button-back">Back</button>
    </div>
  );
};

export default ButtonBack;
