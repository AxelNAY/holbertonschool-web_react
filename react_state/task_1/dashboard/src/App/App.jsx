import React, { Component } from 'react';
import Notifications from '../Notifications/Notifications.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
    };
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
  }

  handleDisplayDrawer() {
    this.setState({ displayDrawer: true });
  }

  handleHideDrawer() {
    this.setState({ displayDrawer: false });
  }

  render() {
    const { displayDrawer } = this.state;

    return (
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

        <main className="flex-1 px-4 py-4">
          {!displayDrawer && (
            <p className="text-sm text-gray-600">
              Click “Your notifications” to open the drawer.
            </p>
          )}
        </main>
      </div>
    );
  }
}

export default App;
