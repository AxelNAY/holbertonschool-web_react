import { useState, useCallback, useMemo } from 'react';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import Footer from '../Footer/Footer.jsx';
import Login from '../Login/Login.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import BodySection from '../BodySection/BodySection.jsx';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom.jsx';
import AppContext from '../Context/context.js';

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  {
    id: 3,
    type: 'urgent',
    html: {
      __html: '<strong>Urgent requirement</strong> - complete by EOD',
    },
  },
];

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

export default function App() {
  // --- State hooks ---
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: '',
    isLoggedIn: false,
  });
  const [notifications, setNotifications] = useState(notificationsList);

  // --- Handlers (memoized) ---
  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const logIn = useCallback((email, password) => {
    const newUser = {
      email,
      password,
      isLoggedIn: true,
    };
    setUser(newUser);
  }, []);

  const logOut = useCallback(() => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  }, []);

  // --- Context value (memoized) ---
  const contextValue = useMemo(
    () => ({
      user,
      logOut,
    }),
    [user, logOut]
  );

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App min-h-screen flex flex-col bg-gray-50">
        <Notifications
          displayDrawer={displayDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          notifications={notifications}
          markNotificationAsRead={markNotificationAsRead}
        />

        <Header />

        <main className="flex-1 px-4 py-4">
          {user.isLoggedIn ? (
            <BodySectionWithMarginBottom title="Course list">
              <CourseList courses={coursesList} />
            </BodySectionWithMarginBottom>
          ) : (
            <BodySectionWithMarginBottom title="Log in to continue">
              <Login
                logIn={logIn}
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
