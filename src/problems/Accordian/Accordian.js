import React, { useState } from "react";
import "./Accordian.css";

const accordionData = [
  {
    title: "Section 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod ante nec mauris suscipit, nec molestie metus fermentum. Sed vel velit sit amet justo molestie consequat. Nulla facilisi. Ut ac urna eu odio volutpat volutpat. Vivamus eu mi sit amet lectus consequat posuere. Integer consectetur, sapien nec aliquam faucibus, dui nunc vestibulum magna, a tincidunt magna sem sed turpis. In hac habitasse platea dictumst. Donec dignissim metus a urna laoreet, a eleifend velit pellentesque. Vestibulum sit amet fringilla felis.",
  },
  {
    title: "Section 2",
    content:
      "Suspendisse potenti. Mauris dictum rutrum purus nec fermentum. Nullam nec tellus vitae nunc malesuada tincidunt. Curabitur vel diam a eros consequat dictum. Mauris tincidunt erat eget tellus volutpat lobortis. Duis id purus vel risus consequat consequat in in sapien. Proin consectetur erat id mi malesuada commodo. Proin id nunc ut dui sollicitudin varius.",
  },
  {
    title: "Section 3",
    content:
      "Nam non magna at velit sollicitudin aliquet. Proin pharetra metus in elit tincidunt, a hendrerit risus pharetra. In ultricies elit at odio facilisis, ac placerat sem efficitur. Nunc vitae mauris nec est volutpat pharetra. Nulla facilisi. Cras interdum nunc vitae tempus pharetra. Morbi quis velit vitae metus bibendum tincidunt sit amet nec nunc. Vestibulum convallis tempus urna, ac venenatis orci eleifend a.",
  },
];

const Accordian = () => {
  //state for active Index initially 0
  const [activeIndex, setActiveIndex] = useState(0);

  //function to handle active Index
  function handleChange(index) {
    setActiveIndex((prev) => {
      if (prev === index) {
        return null;
      }

      return index;
    });
  }

  return (
    <div>
      {accordionData.map((acc, i) => (
        <Tab
          key={i}
          isActive={activeIndex === i}
          currIndex={i}
          data={acc}
          handleChange={handleChange}
        />
      ))}
    </div>
  );
};

const Tab = ({ isActive, currIndex, data, handleChange }) => {
  return (
    <div className="accordian">
      <h3 className="title" onClick={() => handleChange(currIndex)}>
        <p>{data.title}</p>
        {isActive ? <p>-</p> : <p>+</p>}
      </h3>
      {isActive && <p>{data.content}</p>}
    </div>
  );
};

export default Accordian;
