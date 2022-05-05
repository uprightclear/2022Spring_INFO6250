import '../CSS/About.css'
import campus from '../pics/campus.png'

function About(){
    return(
        <div className="entry-content">
            <h1>Northeastern University</h1>
            <p>A University Like No Other</p>
            <div className="goal">
                <div className="goal-area">
                    <div className="goal-content">
                        <p>
                            <strong>Northeastern University</strong>
                            &nbsp; is a private research university with its main campus in Boston. Established in 1898, the university offers undergraduate and graduate programs on its main campus in Boston as well as satellite campuses in Charlotte, North Carolina; Seattle, Washington; San Jose, California; Oakland, California; Portland, Maine; and Toronto and Vancouver in Canada. In 2019, Northeastern purchased the New College of the Humanities in London, England. The university's enrollment is approximately 19,000 undergraduate students and 8,600 graduate students. It is classified among "R1: Doctoral Universities – Very high research activity". Northeastern faculty and alumni include Nobel Prize laureates, Rhodes, Truman, and Marshall scholars. Undergraduate admission to the university is categorized as "most selective."
                        </p>
                        <p>
                            Northeastern features a cooperative education program, more commonly known as "co-op," that integrates classroom study with professional experience and includes over 3,100 partners across all seven continents. The program has been a key part of Northeastern's curriculum of experiential learning for more than a hundred years and is one of the largest co-op/internship programs in the world. While not required for all academic disciplines, participation is nearly universal among undergraduate students. Northeastern also has a comprehensive study abroad program that spans more than 170 universities and colleges.
                        </p>
                    </div>
                    <div className="about-image">
                        <img src={campus}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;