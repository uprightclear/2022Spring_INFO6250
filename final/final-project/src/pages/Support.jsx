import React from 'react'
import '../CSS/Support.css'
import Tech_Portal from '../pics/Tech_Portal.png'
import Training_Options from '../pics/Training_Options.png'
import Solution_Services from '../pics/solution_services.png'
function Support(){
    return(
        <div className='support'>
            <h2>Support</h2>
            <div className='support-content'>
                <h3>We’re with You through Every Step of Lifelong Learning</h3>
                <p>Elevating students, faculty, and staff in their academic and professional pursuits is a community-wide endeavor—and the university’s support teams are here to provide a solid base for excellence. From fielding service requests to helping instructors digitally enhance their courses, all members of the Northeastern community can aim high knowing the technical details are taken care of. </p>
            </div>
            <div className='portal-link'>
                <a className="portal" href="https://service.northeastern.edu/tech?id=index_nu#_ga=2.250785734.1941757723.1650317195-1715126699.1628506811">
                    <img src={Tech_Portal}/>
                </a>
                <a className="portal" href="https://training.its.northeastern.edu/#_ga=2.250785734.1941757723.1650317195-1715126699.1628506811">
                    <img src={Training_Options}/>
                </a>
                <a className="portal" href="https://northeastern.statuspage.io/">
                    <img src={Solution_Services}/>
                </a>

            </div>

        </div>
    );
}

export default Support