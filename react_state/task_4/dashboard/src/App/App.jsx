import React from "react";
import BodySection from "../BodySection/BodySection";
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import Notifications from "../Notifications/Notifications";
import Header from "../Header/Header";
import LoginWithLogging from "../Login/Login";
import Footer from "../Footer/Footer";
import CourseListWithLogging from "../CourseList/CourseList";
import { getLatestNotification } from "../utils/utils";
import AppContext, { defaultUser } from "../Context/context";

class App extends React.Component {
  constructor(props) {
    super(props);

    // state part
    this.state = {
      notifications: [
        { id: 1, type: "default", value: "New course available" },
        { id: 2, type: "urgent", value: "New resume available" },
        { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
      ],
      courses: [
        { id: 1, name: "ES6", credit: 60 },
        { id: 2, name: "Webpack", credit: 20 },
        { id: 3, name: "React", credit: 40 },
      ],
      displayDrawer: true,
      user: defaultUser,
    };
  }

  // keydown logOut part
  handleLogout = (event) => {
    if (event.ctrlKey && event.key === "h") {
      alert("Logging you out");
      this.logOut();
    }
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleLogout);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleLogout);
  }

  // Drawer display part
  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  };

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  };

  //logIn part
  logIn = (email, password) => {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  };

  //logOut part
  logOut = () => {
    this.setState({ user: defaultUser });
  };

  // marknotification function
  markNotificationAsRead = (id) => {
    console.log(`Notification ${id} has been marked as read`);
    this.setState((prev) => ({
      notifications: prev.notifications.filter(
        (notification) => notification.id !== id
      ),
    }));
  };

  render() {
    const { notifications, courses, displayDrawer, user } = this.state;
    const valueContext = { user, logOut: this.logOut };

    return (
      <>
        <AppContext.Provider value={valueContext}>
          <div className="relative px-3 min-h-screen flex flex-col">
            <div className="absolute top-0 right-0 z-10">
              <Notifications
                notifications={notifications}
                displayDrawer={displayDrawer}
                handleDisplayDrawer={this.handleDisplayDrawer}
                handleHideDrawer={this.handleHideDrawer}
                markNotificationAsRead={this.markNotificationAsRead}
              />
            </div>
            <div className="flex-1">
              <Header />
              {user.isLoggedIn ? (
                <BodySectionWithMarginBottom title="Course list">
                  <CourseListWithLogging courses={courses} />
                </BodySectionWithMarginBottom>
              ) : (
                <BodySectionWithMarginBottom title="Log in to continue">
                  <LoginWithLogging
                    logIn={this.logIn}
                    email={user.email}
                    password={user.password}
                  />
                </BodySectionWithMarginBottom>
              )}
              <BodySection title="News from the School">
                <p>
                  ipsum Lorem ipsum dolor sit amet consectetur, adipisicing
                  elit. Similique, asperiores architecto blanditiis fuga
                  doloribus sit illum aliquid ea distinctio minus accusantium,
                  impedit quo voluptatibus ut magni dicta. Recusandae, quia
                  dicta?{" "}
                </p>
              </BodySection>
            </div>
            <Footer />
          </div>
        </AppContext.Provider>
      </>
    );
  }
}
export default App;
