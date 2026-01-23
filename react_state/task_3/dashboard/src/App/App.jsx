import React, { Component } from 'react';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Login from '../Login/Login.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import BodySection from '../BodySection/BodySection.jsx';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom.jsx';
import AppContext from '../Context/context.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);

    const user = {
      email: '',
      password: '',
      isLoggedIn: false,
    };

    this.state = {
      displayDrawer: false,
      user,
      contextValue: {
        user,
        logOut: this.logOut,
      },
    };
  }

  handleDisplayDrawer() {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer() {
    this.setState({ displayDrawer: false });
  }

  logIn(email, password) {
    const user = {
      email,
      password,
      isLoggedIn: true,
    };
    this.setState({
      user,
      contextValue: {
        user,
        logOut: this.logOut,
      },
    });
  }

  logOut() {
    const user = {
      email: '',
      password: '',
      isLoggedIn: false,
    };
    this.setState({
      user,
      contextValue: {
        user,
        logOut: this.logOut,
      },
    });
  }

  render() {
    const { displayDrawer, user, contextValue } = this.state;

    const listCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    return (
      <AppContext.Provider value={contextValue}>
        <div className="App min-h-screen flex flex-col bg-gray-50">
          <Notifications
            displayDrawer={displayDrawer}
            handleDisplayDrawer={this.handleDisplayDrawer}
            handleHideDrawer={this.handleHideDrawer}
            notifications={[
              { id: 1, type: 'default', value: 'New course available' },
              { id: 2, type: 'urgent', value: 'New resume available' },
            ]}
          />

          <Header />

          <main className="flex-1 px-4 py-4">
            {user.isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList courses={listCourses} />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login
                  logIn={this.logIn}
                  email={user.email}
                  password={user.password}
                />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title="News from the School">
              <p>Some random text about school news.</p>
            </BodySection>
          </main>

          <Footer />
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;
