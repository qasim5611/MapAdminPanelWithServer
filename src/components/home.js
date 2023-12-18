import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faFile,
  faBullhorn,
  faDollarSign,
  faChartBar,
  faCogs,
  faMoneyBillWaveAlt,
  faPlusCircle,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { faFileAlt, faListAlt } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { logoutuser } from "../redux/actions/authAction";
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";


import slider1 from './SliderImages/slider1.jpg';
import slider2 from "./SliderImages/slider2.jpg";
import slider3 from "./SliderImages/slider3.jpeg";
import slider4 from "./SliderImages/slider4.jpeg";
import slider5 from "./SliderImages/slider5.jpeg";




function Home(props) {
  // const userInfo = useSelector((state) => state.auth.userInfo);

  // const routes = [
  //   {
  //     title: "Add Top Story",
  //     link: "/admin/create_new_top_story",
  //     icon: faUsers,
  //   },

  //   {
  //     title: "Add Article",
  //     link: "/admin/create_new_article",
  //     icon: faUsers,
  //   },

  //   {
  //     title: "Add Categories",
  //     link: "/admin/CategoriesAddNew",
  //     icon: faListAlt,
  //   },
  //   userInfo && userInfo.user && !userInfo.user.isEditor
  //     ? {
  //         title: "Add Editors",
  //         link: "/admin/add_editor",
  //         icon: faListAlt,
  //       }
  //     : null,
  //   {
  //     title: "Add Video Article",
  //     link: "/admin/add_video",
  //     icon: faListAlt,
  //   },
  // ];

  return (
    <>
      <div class="welcome_section">
        <div class="row first_row">
          {true ? (
            <>
              {/* {routes.map((item, key) =>
                item ? ( */}
              {/* <div class="col-md-4 wow flipInY" data-wow-delay="0.1s"> */}
              <Carousel showThumbs={false} autoPlay={true} id="">
                <div class="">
                  <img src={slider1} alt="COC Group" />
                </div>
                <div class="">
                  <img src={slider2} alt="COC Prize Distribution" />
                </div>
                <div class="">
                  <img src={slider3} alt="COC Prize Distribution" />
                </div>
                <div class="">
                  <img
                    src={slider4}
                    alt="Ramesh Pokhrayal in coc prize distribution"
                  />
                </div>
                <div class="slide">
                  {/* <!--<img src="images/demo-images/preity-zinta-gga-event-2019.jpg" alt="Preity Zinta as a cheif Guest in Golden Glory Awards 2019" />--> */}
                  <img
                    src={slider5}
                    alt="Preity Zinta as cheif Guest in Golden Glory Awards 2019"
                  />
                </div>
                <div class="slide">
                  <img src={slider1} />
                </div>
                <div class="slide">
                  <img src={slider2} />
                </div>
                <div class="slide">
                  <img src={slider3} />
                </div>
                <div class="slide">
                  <img src={slider4} />
                </div>
                {/* <div class="slide">
                  <img src="images/demo-images/international-quality-awards.jpg" />
                </div>

                <div class="slide">
                  <img src="images/demo-images/raveena.jpg" />
                </div>
                <div class="slide">
                  <img src="images/demo-images/diya-mirza.jpg" />
                </div>
                <div class="slide">
                  <img src="images/demo-images/Slide-4.jpg" />
                </div>
                <div class="slide">
                  <img src="images/demo-images/media-collage.jpg" />
                </div> */}
              </Carousel>
              {/* </div> */}
              {/* ) : null
              )} */}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default withRouter(Home);
export let roleChanger;
