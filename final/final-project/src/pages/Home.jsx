import React from "react";
import '../CSS/Home.css'
import { useState } from "react";
import daily_wellness_check from "../pics/daily_wellness_check.png";
import test_scheduler from "../pics/test_scheduler.png";
import book_study from "../pics/book_study.png";

function Home(){

  const [isClicked, setIsClicked] = useState(false);
    const toggleClass = () =>{
        setIsClicked(!isClicked);
    }

    return(
        <div className="home">
          <h2>Welcome to the Northeastern Student Center</h2>
            <div className="calendar">
                <div className="calendar__opts">
                    <select name="calendar__month" id="calendar__month">
                        <option>Jan</option>
                        <option>Feb</option>
                        <option>Mar</option>
                        <option>Apr</option>
                        <option selected>May</option>
                        <option>Jun</option>
                        <option>Jul</option>
                        <option>Aug</option>
                        <option>Sep</option>
                        <option>Oct</option>
                        <option>Nov</option>
                        <option>Dec</option>
                    </select>

                    <select name="calendar__year" id="calendar__year">
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option selected>2022</option>
                    </select>
                </div>

                <div className="calendar__body">
                    <div className="calendar__days">
                        <div>M</div>
                        <div>T</div>
                        <div>W</div>
                        <div>T</div>
                        <div>F</div>
                        <div>S</div>
                        <div>S</div>
                    </div>

                    <div className="calendar__dates">
                        <div className="calendar__date calendar__date--grey"><span>27</span></div>
                        <div className="calendar__date calendar__date--grey"><span>28</span></div>
                        <div className="calendar__date calendar__date--grey"><span>29</span></div>
                        <div className="calendar__date calendar__date--grey"><span>30</span></div>
                        <div className="calendar__date"><span>1</span></div>
                        <div className="calendar__date"><span>2</span></div>
                        <div className="calendar__date"><span>3</span></div>
                        <div className="calendar__date"><span>4</span></div>
                        <div className="calendar__date"><span>5</span></div>
                        <div className="calendar__date"><span>6</span></div>
                        <div className="calendar__date"><span>7</span></div>
                        <div className="calendar__date"><span>8</span></div>
                        <div className="calendar__date"><span>9</span></div>
                        <div className="calendar__date"><span>10</span></div>
                        <div className="calendar__date"><span>11</span></div>
                        <div className="calendar__date"><span>12</span></div>
                        <div className="calendar__date"><span>13</span></div>
                        <div className="calendar__date"><span>14</span></div>
                        <div className="calendar__date"><span>15</span></div>
                        <div
                            className="calendar__date calendar__date--selected calendar__date--first-date calendar__date--range-start">
                            <span>16</span></div>
                        <div className="calendar__date calendar__date--selected calendar__date--last-date">
                            <span>17</span></div>
                        <div className="calendar__date calendar__date--selected calendar__date--first-date">
                            <span>18</span></div>
                        <div className="calendar__date calendar__date--selected"><span>19</span></div>
                        <div className="calendar__date calendar__date--selected"><span>20</span></div>
                        <div
                            className="calendar__date calendar__date--selected calendar__date--last-date calendar__date--range-end">
                            <span>21</span></div>
                        <div className="calendar__date"><span>22</span></div>
                        <div className="calendar__date"><span>23</span></div>
                        <div className="calendar__date"><span>24</span></div>
                        <div className="calendar__date"><span>25</span></div>
                        <div className="calendar__date"><span>26</span></div>
                        <div className="calendar__date"><span>27</span></div>
                        <div className="calendar__date"><span>28</span></div>
                        <div className="calendar__date"><span>29</span></div>
                        <div className="calendar__date"><span>30</span></div>
                        <div className="calendar__date"><span>31</span></div>
                    </div>
                </div>

                <div className="calendar__buttons">
                    <button className="calendar__button calendar__button--grey">Back</button>

                    <button className="calendar__button calendar__button--primary">Apply</button>
                </div>
            </div>
            <div className='app-link canvas'>
                <a href='https://canvas.northeastern.edu/' target="_blank">
                    <img src="https://northeastern.sharepoint.com/sites/studenthub/SiteAssets/app_icons/ico_canvas.png" alt="Canvas"/>
                    <h3>Canvas</h3>
                </a>
            </div>
            <div className='app-link robin'>
                <a href='https://dashboard.robinpowered.com/Northeastern/' target="_blank">
                    <img src="https://northeastern.sharepoint.com/sites/studenthub/SiteAssets/app_icons/ico_robin.png" alt="Robin"/>
                    <h3>Robin</h3>
                </a>
            </div>
            <div className='app-link teams'>
                <a href='https://teams.microsoft.com/' target="_blank">
                    <img src="https://northeastern.sharepoint.com/sites/studenthub/SiteAssets/app_icons/ico_teams.png" alt="Teams"/>
                    <h3>Teams</h3>
                </a>
            </div>
            <div className='app-link onenote'>
                <a href='https://www.microsoft.com/en-us/microsoft-365/onenote/digital-note-taking-app?rtc=1' target="_blank">
                    <img src="https://northeastern.sharepoint.com/sites/studenthub/SiteAssets/app_icons/ico_onenote.png" alt="OneNote"/>
                    <h3>OneNote</h3>
                </a>
            </div>
            <div className='app-link outlook'>
                <a href='https://outlook.office365.com/mail/inbox/' target="_blank">
                    <img src="https://northeastern.sharepoint.com/sites/studenthub/SiteAssets/app_icons/ico_outlook.png" alt="Outlook"/>
                    <h3>Outlook</h3>
                </a>
            </div>
            <div className='app-link planner'>
                <a href='https://tasks.office.com/' target="_blank">
                    <img src="https://northeastern.sharepoint.com/sites/studenthub/SiteAssets/app_icons/ico_planner.png" alt="Planner"/>
                    <h3>Planner</h3>
                </a>
            </div>
          <div className='news-pieces check'>
            <a href='https://wellness-check.northeastern.edu/' target="_blank">
              <img src={daily_wellness_check} alt="daily_wellness_check"/>
            </a>
          </div>
          <div className='news-pieces test'>
            <a href="https://covid19-testing.northeastern.edu/" target="_blank">
              <img src={test_scheduler} alt="test_scheduler"/>
            </a>
          </div>
          <div className='news-pieces book'>
            <a href="https://spaces.northeastern.edu/" target="_blank">
              <img src={book_study} alt="book_study"/>
            </a>
          </div>
      </div>
    );
}

export default Home;