import React, { useState } from "react";
import "./Modal.css";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  function handleKeys(e) {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }
  return (
    <div className="wrapper" onKeyDown={handleKeys}>
      <button className="open-btn" onClick={() => setIsOpen(true)}>
        Open
      </button>
      {isOpen && <ModalContent setIsOpen={setIsOpen} />}
    </div>
  );
};

const ModalContent = ({ setIsOpen }) => {
  function handleOutside(e) {
    // modalContent.contains(e.target) checks if the clicked target (e.target) is inside the modal content. If it's not, it means the click happened outside, and the modal will close by calling setIsOpen(false)
    const modalContent = document.querySelector(".modal-content");
    console.log(modalContent);
    if (modalContent && !modalContent.contains(e.target)) {
      setIsOpen(false);
    }
  }

  return (
    <div className="modal-wrapper" onClick={handleOutside}>
      <div className="modal-content">
        <p>
          The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax
          quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick
          quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs
          grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright
          vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim.
          Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV
          quiz. How quickly daft jumping zebras vex. Two driven jocks help fax
          my big quiz. Quick, Baz, get my woven flax jodhpurs!
        </p>
        <button onClick={() => setIsOpen(false)}>close</button>
      </div>
    </div>
  );
};

export default Modal;
