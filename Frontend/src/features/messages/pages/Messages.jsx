import React from "react";
import "./Messages.css";

const Messages = () => {
  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">T</div>
          <span>TalentFlow</span>
        </div>

        <div className="nav-section">
          <div className="section-title">LEARNING</div>
          <nav className="nav-menu">
            <a href="#" className="nav-item">
              <i className="fa-solid fa-house"></i>
              <span>Dashboard</span>
            </a>
            <a href="#" className="nav-item">
              <i className="fa-solid fa-book"></i>
              <span>My Courses</span>
            </a>
            <a href="#" className="nav-item">
              <i className="fa-solid fa-clipboard-check"></i>
              <span>Assignments Review</span>
            </a>
          </nav>
        </div>

        <div className="nav-section">
          <div className="section-title">COMMUNITY</div>
          <nav className="nav-menu">
            <a href="#" className="nav-item">
              <i className="fa-solid fa-users"></i>
              <span>Collaboration</span>
            </a>
            <a href="#" className="nav-item active">
              <i className="fa-solid fa-envelope"></i>
              <span>Messages</span>
            </a>
          </nav>
        </div>

        <div className="nav-section">
          <div className="section-title">YOU</div>
          <nav className="nav-menu">
            <a href="#" className="nav-item">
              <i className="fa-solid fa-bell"></i>
              <span>Notifications</span>
            </a>
            <a href="#" className="nav-item">
              <i className="fa-solid fa-user"></i>
              <span>Profile</span>
            </a>
            <a href="#" className="nav-item">
              <i className="fa-solid fa-cog"></i>
              <span>Settings</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <h1 className="page-title">Messages</h1>
          <div className="user-info">
            <div className="notification">
              <i className="fa-solid fa-bell"></i>
            </div>
            <div className="user-profile">
              <div className="user-text">
                <p className="user-name">Oscar Bob</p>
                <p className="user-email">oscarbob@gmail.com</p>
              </div>
              <img
                src="https://picsum.photos/id/64/128/128"
                alt="Oscar Bob"
                className="avatar"
              />
            </div>
          </div>
        </header>

        <div className="chat-container">
          {/* Chat List */}
          <div className="chat-list">
            <div className="chat-list-header">
              <div className="inbox-tabs">
                <button className="tab active">Inbox</button>
                <button className="tab">Flow AI</button>
              </div>
              <div className="tutor-section">
                <h2>Tutor Chat</h2>
                <button className="request-tutor-btn">Request Tutor</button>
              </div>
            </div>

            <div className="chat-items">
              {/* John Smith */}
              <div className="chat-item">
                <img
                  src="https://picsum.photos/id/64/128/128"
                  alt="John Smith"
                  className="chat-avatar"
                />
                <div className="chat-info">
                  <div className="chat-header">
                    <span className="chat-name">John Smith</span>
                    <span className="chat-time">2 mins ago</span>
                  </div>
                  <p className="chat-last-message">Go And Check The File</p>
                </div>
                <div className="unread-dot"></div>
              </div>

              {/* Tyler James - Active */}
              <div className="chat-item active">
                <img
                  src="https://picsum.photos/id/201/128/128"
                  alt="Tyler James"
                  className="chat-avatar"
                />
                <div className="chat-info">
                  <div className="chat-header">
                    <span className="chat-name">Tyler James</span>
                    <span className="chat-time">10:15 AM</span>
                  </div>
                  <p className="chat-last-message">Thank you so much</p>
                </div>
              </div>

              {/* Daniel Cold */}
              <div className="chat-item">
                <img
                  src="https://picsum.photos/id/201/128/128"
                  alt="Daniel Cold"
                  className="chat-avatar"
                />
                <div className="chat-info">
                  <div className="chat-header">
                    <span className="chat-name">Daniel Cold</span>
                    <span className="chat-time">9:45 AM</span>
                  </div>
                  <p className="chat-last-message">Decodabol@gmail.com</p>
                </div>
                <div className="unread-dot"></div>
              </div>
            </div>
          </div>

          {/* Active Chat Window */}
          <div className="chat-window">
            <div className="chat-window-header">
              <div className="tutor-info">
                <img
                  src="https://picsum.photos/id/201/128/128"
                  alt="Tyler James"
                  className="chat-avatar"
                />
                <div>
                  <p className="tutor-name">Tyler James</p>
                  <p className="tutor-role">Tutor</p>
                </div>
              </div>
            </div>

            <div className="messages-area">
              <div className="message received">
                <div className="message-bubble">
                  Hi! How are you doing today?
                </div>
              </div>
              <div className="message sent">
                <div className="message-bubble">
                  Thank you so much for your help yesterday!
                </div>
              </div>
              <div className="message received">
                <div className="message-bubble">
                  No problem at all. Let me know if you need anything else.
                </div>
              </div>
            </div>

            <div className="message-input-area">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Type Message"
                  className="message-input"
                />
                <button className="send-btn">
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
