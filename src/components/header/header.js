import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faInfoCircle,
  faCogs,
  faMoneyBillWaveAlt,
  faPlusCircle,
  faChartLine,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { faListAlt } from "@fortawesome/free-regular-svg-icons";
import "../assets/css/style.css";

import { withRouter, Route } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// Components
import About from "../About";
import UpdateAboutText from "../aboutAdd";
import TeamAll from "../TeamAll";
import TeamAdd from "../teamAdd";
import AddEditor from "../EditorAdd";
import AllEditors from "../EditorAll";
import AddVideoArticle from "../VideoArticleAdd";
import AllVideosArticle from "../VideosArticleAll";
import Gallery from "../Gallery";
import GalleryAdd from "../galleryAddNew";
import CategoriesAddSubCate from "../CategoriesAddSubCate";
import BannerAddNew from "../BannerAddNew";
import HomePanel from "../home";
import BannerAll from "../BannerAll";
import HeaderAll from "../HeaderAll ";
import HeaderAdd from "../HeaderAdd";
import HeaderEdit from "../HeaderEdit";
import FooterAll from "../FooterAll";
import FooterAdd from "../FooterAdd";
import FooterEdit from "../FooterEdit";
import SideBarAll from "../SideBarAll";
import SideBarAdd from "../SideBarAdd";
import SideBarEdit from "../SideBarEdit";

import SideBar from "../sidebar";

// Redux
import { logoutuser } from "../../redux/actions/authAction";
import {
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

import Updateteam from "../teamUpdate";
import AboutUpdate from "../aboutUpdate";
import videoUpdate from "../videoUpdate";
import bannerUpdate from "../bannerUpdate";
import GalleryUpdate from "../GalleryUpdate";
import Talkshows from "../talkshows";
import talkshowCreate from "../talkshowCreate";
import Magzine from "../Magzine";
import magzineCreate from "../magzineCreate";
import TalkshowUpdate from "../TalkshowUpdate";
import magzineUpdate from "../magzineUpdate";
import AwardAll from "../AwardAll";
import AwardCreate from "../AwardCreate";
import AwardUpdate from "../AwardUpdate";

const drawerWidth = 241;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  changeColor: {
    backgroundColor: "white",
    height: 61,
  },
  appBarShift: {
    // width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  hide: {
    display: "none",
  },
  // drawer: {
  //     width: drawerWidth,
  //     flexShrink: 0,
  // },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
    color: "#f33676",
  },
}));

export default withRouter(function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const { container } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let dispatch = useDispatch();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [open, setOpen] = React.useState(true);
  const [admin, setAdmin] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const logout = () => {
    dispatch(logoutuser());
  };

  const routes = [
    {
      title: "Home",
      link: "/",
      icon: faHome,
    },

    {
      title: "Our Team",
      link: "/admin/teamall",
      icon: faUsers,
    },
    {
      title: "Events",
      link: "/admin/events",
      icon: faUsers,
    },
    // {
    //   title: "About",
    //   link: "/admin/About",
    //   icon: faListAlt,
    // },
    {
      title: "Gallery",
      link: "/admin/gallery",
      icon: faListAlt,
    },
    // userInfo && userInfo.user && !userInfo.user.isEditor
    //   ? {
    //       title: "All Editors",
    //       link: "/admin/all_editor",
    //       icon: faInfoCircle,
    //     }
    //   : null,
    {
      title: "All Videos",
      link: "/admin/all_videos",
      icon: faInfoCircle,
    },
    // {
    //   title: "Talk Shows",
    //   link: "/admin/talkshow",
    //   icon: faInfoCircle,
    // },
    {
      title: "Our Blog",
      link: "/admin/magzine",
      icon: faInfoCircle,
    },
    // {
    //   title: "All Banner",
    //   link: "/admin/banner_all",
    //   icon: faInfoCircle,
    // },
    // {
    //   title: "Setting Header",
    //   link: "/admin/header_all",
    //   icon: faInfoCircle,
    // },
    // {
    //   title: "Setting Sidebar",
    //   link: "/admin/sidebar",
    //   icon: faInfoCircle,
    // },
    // {
    //   title: "Setting Footer",
    //   link: "/admin/footer",
    //   icon: faInfoCircle,
    // },
  ];

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(
          classes.appBar,
          {
            [classes.appBarShift]: open,
          },
          classes.changeColor
        )}
      >
        <div class="header">
          <div class="">
            <nav class="navbar custom_nav">
              <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav navbar-left">
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    className={classes.menuButton}
                  >
                    <MenuIcon />
                  </IconButton>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                  <UncontrolledDropdown
                    nav
                    isOpen={dropdownOpen}
                    toggle={toggle}
                  >
                    <DropdownToggle nav className="homeBtn navBtn">
                      Hi, {userInfo && userInfo.user && userInfo.user.name}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        style={{
                          fontSize: 12,
                          marginLeft: 5,
                          color: "grey",
                        }}
                      />
                    </DropdownToggle>
                    <DropdownMenu center style={{ width: "100px" }}>
                      <DropdownItem
                        onClick={logout}
                        style={{
                          fontSize: 14,
                          background: "none",
                          border: "none",
                          color: "black",
                          width: "100%",
                          paddingBottom: 10,
                        }}
                      >
                        Log Out
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div
              class="leftbar"
              style={{
                width: "100%",
              }}
            >
              <div
                class="logo_header"
                style={{
                  width: 240,
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <Link to="/">
                  <img
                    src={require("../assets/images/logo.png")}
                    class="logo"
                  />
                </Link>
              </div>

              <span class="heading"></span>
              <div class="media hide">
                <div class="media-body">
                  <p>Admin</p>
                  <h4 class="media-heading">Naveed</h4>
                </div>
              </div>
              <ul>
                {true ? (
                  <>
                    {routes.map((item, key) =>
                      item ? (
                        <li className="drawerLi">
                          <Link to={item.link} class="">
                            <FontAwesomeIcon
                              icon={item.icon}
                              className="iconDrawer"
                            />
                            {item.title}
                          </Link>
                        </li>
                      ) : null
                    )}
                  </>
                ) : null}
              </ul>
            </div>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <div
              class="leftbar"
              style={{
                width: "100%",
              }}
            >
              <div
                class="logo_header"
                style={{
                  width: 240,
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <Link to="/">
                  <img src={require("../../logo.png")} class="logo" />
                </Link>
              </div>

              <span class="heading"></span>
              <div class="media hide">
                <div class="media-body">
                  <p>Admin</p>
                  <h4 class="media-heading">John Doe</h4>
                </div>
              </div>
              <ul>
                {true ? (
                  <>
                    {routes.map((item, key) =>
                      item ? (
                        <NavItem>
                          <NavLink
                            to={item.link}
                            activeClassName="active"
                            exact
                            tag={RRNavLink}
                          >
                            <FontAwesomeIcon
                              icon={item.icon}
                              className="iconDrawer"
                            />
                            {item.title}
                          </NavLink>
                        </NavItem>
                      ) : null
                    )}
                  </>
                ) : null}
              </ul>
            </div>
          </Drawer>
        </Hidden>
      </nav>

      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <Route
          exact
          path="/"
          component={() => {
            return <HomePanel admin={admin} />;
          }}
        />

        <Route exact path="/admin/About" component={About} />
        <Route
          exact
          path="/admin/create_new_about_text"
          component={UpdateAboutText}
        />
        <Route exact path="/admin/teamall" component={TeamAll} />
        <Route exact path="/admin/create_new_team" component={TeamAdd} />
        <Route
          exact
          path="/admin/talkshow_update/:id"
          component={TalkshowUpdate}
        />
{/* 
// these all routes */}
        <Route exact path="/admin/add_editor" component={AddEditor} />
        <Route exact path="/admin/all_editor" component={AllEditors} />

        <Route exact path="/admin/add_video" component={AddVideoArticle} />
        <Route exact path="/admin/all_videos" component={AllVideosArticle} />
        <Route exact path="/admin/banner_add_new" component={BannerAddNew} />
        <Route exact path="/admin/banner_all" component={BannerAll} />
        <Route exact path="/admin/update_team/:id" component={Updateteam} />
        <Route exact path="/admin/about_update/:id" component={AboutUpdate} />
        <Route exact path="/admin/video_update/:id" component={videoUpdate} />
        <Route exact path="/admin/banner_update/:id" component={bannerUpdate} />
        <Route
          exact
          path="/admin/gallery_update/:id"
          component={GalleryUpdate}
        />

        <Route exact path="/admin/footer_new" component={FooterAdd} />
        <Route exact path="/admin/footer_edit/:id" component={FooterEdit} />
        <Route exact path="/admin/footer" component={FooterAll} />
        <Route exact path="/admin/header_all" component={HeaderAll} />
        <Route exact path="/admin/header_new" component={HeaderAdd} />
        <Route exact path="/admin/header_edit/:id" component={HeaderEdit} />

        <Route exact path="/admin/sidebar_new" component={SideBarAdd} />
        <Route exact path="/admin/sidebar_edit/:id" component={SideBarEdit} />
        <Route exact path="/admin/sidebar" component={SideBarAll} />

        <Route exact path="/admin/gallery" component={Gallery} />
        <Route exact path="/admin/talkshow" component={Talkshows} />
        <Route exact path="/admin/talkshowcreate" component={talkshowCreate} />
        <Route exact path="/admin/magzine" component={Magzine} />
        <Route exact path="/admin/magzinecreate" component={magzineCreate} />
        <Route
          exact
          path="/admin/magzine_update/:id"
          component={magzineUpdate}
        />

        {/* Award */}
        <Route exact path="/admin/events" component={AwardAll} />
        <Route exact path="/admin/addaward" component={AwardCreate} />
        <Route exact path="/admin/awardupdate/:id" component={AwardUpdate} />



        

        <Route exact path="/admin/galleryaddnew" component={GalleryAdd} />
        <Route
          exact
          path="/admin/CategoriesAddSubCate"
          component={CategoriesAddSubCate}
        />
      </main>
    </div>
  );
});
