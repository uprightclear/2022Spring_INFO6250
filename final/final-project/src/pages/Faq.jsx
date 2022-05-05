import React from 'react'
import {useState} from 'react';
import Accordion from './Accordion'
import '../CSS/Faq.css'

const initialFaqs ={
    'Are online courses available?':`Online, live cast, and hybrid options are available for certain courses (lab courses are not offered online). Availability varies by semester. Please see the schedule of classes for class availability.`,
    'Can I take public transportation?':`From Northeastern, you can get almost anywhere in the city via public transportation. The Green Line and the Orange Line both stop at Northeastern. There are multiple bus connections on and around campus. If you want to get out of Boston, the Commuter Rail can take you to neighboring cities and towns like Salem and Worcester.`,
    'What financial aid options are available?':`Northeastern offers a full complement of financial assistance from federal, state, and institutional sources, including grants, loans, scholarships, and work awards to eligible students at all levels. For more information, visit the Student Financial Services site.`,
    'What type of career services are available?':`The Department of Employer Engagement and Career Design offers extensive resources, such as advising and events to help students with job search and career development, and Nucareers, Northeastern’s database of career and cooperative education job opportunities. For a full list of career services, see here.`,
    'Are there options for graduate student housing? And what are they?':`Graduate housing is available but space is limited. Applications and deposit details are listed on the housing website.`,
    'What is the Co-op program?':`Cooperative education is a structured method of combining classroom-based education with practical work experience. A cooperative education experience, commonly known as a “co-op,” provides academic credit for structured job experience. Cooperative education is taking on new importance in helping young people to make the school-to-work transition, service learning, and experiential learning initiatives. Learn more here.`,
    'How do I sign up for the Co-op program?':`Students at Northeastern make an academic plan with their advisor that determines when they will go on co-op. The semester before their co-op, students apply to positions. The application process is like applying for a full-time job: students submit their resumes and any other necessary documents to the company they are applying to and go through the interview process. Before their first co-op, students take a class to help them with this process.`,
    'What kind of opportunities are available in the Co-op program?':`Opportunities in the co-op program range from biotech companies to food waste elimination start-ups, from aquariums to wildlife reservations, from beer brewing to volcanoes, and everything in between. If none of the already established co-ops are exactly what you’re looking for, you can even make your own co-op. To learn more about co-op and see past examples, see our co-op page.`,
    'If I have more questions, who can I contact?':`For undergraduate admissions questions, call 617.373.2200 or email admissions@northeasthern.edu.
For graduate admissions questions, call 617.373.4275 or email gradcos@northeastern.edu.
To contact a specific person, please use our directory.`,
}

function Faq(){
    const [faqs] = useState(initialFaqs);

    return (
        <div className="faqs">
            <h2>Frequent Asked Questions</h2>
           <Accordion content={faqs}/>
        </div>
    );
}

export default Faq;