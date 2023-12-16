import React from 'react';

export const Steps = () => {
  return (
    <section className="flex flex-row flex-wrap p-4 ">
      <div id="StepAnimation" className=" flex flex-row justify-center  content-center w-1/2">
        <img
          className=" object-contain "
          src={
            'https://www.mastercard.co.in/content/dam/public/mastercardcom/in/en/homepage/Home/homepage_banner2_1300x650.jpg'
          }
          alt="team"
          width=""
          // height="auto"
        />
      </div>
      <div className="flex flex-row w-1/2">
        <div className="flex flex-col flex-wrap  w-full justify-evenly items-center">
          <div className="flex flex-col p-4  w-4/5 h-1/5 rounded-md bg-black">Abhishek</div>
          <div className="flex flex-col p-4  w-4/5 h-1/5 rounded-md bg-black">Abhishek</div>
          <div className="flex flex-col p-4  w-4/5 h-1/5 rounded-md bg-black">Abhishek</div>
          <div className="flex flex-col p-4  w-4/5 h-1/5 rounded-md bg-black">Abhishek</div>
        </div>
      </div>
    </section>
  );
};
