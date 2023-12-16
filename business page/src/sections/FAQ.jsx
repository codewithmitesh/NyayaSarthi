import React, { useState } from 'react';

export const FAQ = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionToggle = (index) => {
    setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqItems = [
    {
      question: 'Can I cancel at anytime?',
      answer:
        'Yes, you can cancel anytime no questions are asked while you cancel, but we would highly appreciate if you will give us some feedback.'
    },
    {
      question: 'My team has credits. How do we use them?',
      answer:
        'Once your team signs up for a subscription plan, this is where we sit down, grab a cup of coffee, and dial in the details.'
    },
    {
      question: "How does Preline's pricing work?",
      answer: 'Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.'
    },
    {
      question: 'How secure is Preline?',
      answer:
        'Protecting the data you trust to Preline is our first priority. This part is really crucial in keeping the project in line to completion.'
    },
    {
      question: 'Do you offer discounts?',
      answer:
        "We've built in discounts at each tier for teams. The time has come to bring those ideas and plans to life."
    }
  ];

  return (
    <div className="flex flex-row justify-around max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* <div className="w-full m-0 p-0 max-h- overflow-hidden object-cover relative">
        <img
          className=" scale-125"
          src={
            'https://images.unsplash.com/photo-1665916185751-2bd83e74f9a7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          }
        />
      </div> */}
      <div className="w-2/3 md:w-2/3 lg:w-2/3 flex flex-col ">
        {/* Grid */}
        <div className="w-full">
          <h2 className=" text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">
            Frequently asked questions <span className="text-coral-red ">(FAQS)</span>
          </h2>
          <p className="mt-1 hidden md:block text-gray-600 dark:text-gray-400">
            Answers to the most frequently asked questions.
          </p>
        </div>
        <div className="w-full grid md:grid-cols-3 gap-10">
          {/* End Col */}

          <div className="md:col-span-3">
            {/* Accordion */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700 mt-4">
              {faqItems.map((item, index) => (
                <div key={index} className={`hs-accordion pt-3 pb-3 ${activeAccordion === index ? 'active' : ''}`}>
                  <button
                    className="hs-accordion-toggle group pt-3 pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 dark:text-gray-200 dark:hover:text-gray-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    aria-controls={`hs-basic-with-title-and-arrow-stretched-collapse-${index}`}
                    onClick={() => handleAccordionToggle(index)}
                  >
                    {item.question}
                    <svg
                      className={`flex-shrink-0 w-5 h-5 text-gray-600 group-hover:text-gray-500 dark:text-gray-400 ${
                        activeAccordion === index ? 'rotate-180' : ''
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    id={`hs-basic-with-title-and-arrow-stretched-collapse-${index}`}
                    className={`hs-accordion-content w-full overflow-hidden transition-[height] duration-300 ${
                      activeAccordion === index ? '' : 'hidden'
                    }`}
                    aria-labelledby={`hs-basic-with-title-and-arrow-stretched-heading-${index}`}
                  >
                    <p className="mt-4 text-gray-700 dark:text-gray-300">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* End Accordion */}
          </div>
          {/* End Col */}
        </div>
      </div>
      {/* End Grid */}
    </div>
  );
};
