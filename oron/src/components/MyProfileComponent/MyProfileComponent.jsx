import React, { useState } from "react";
import "./MyProfileComponent.scss";

const MyProfileComponent = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <div className="profile-content">
        <div className="profile-sidebar">
          <button
            className={activeTab === "Overview" ? "active-tab" : ""}
            onClick={() => setActiveTab("Overview")}
          >
            Overview
          </button>
          <button
            className={activeTab === "Details" ? "active-tab" : ""}
            onClick={() => setActiveTab("Details")}
          >
            Details
          </button>
          <button
            className={activeTab === "Other" ? "active-tab" : ""}
            onClick={() => setActiveTab("Other")}
          >
            Other
          </button>
        </div>
        <div className="profile-details">
          {activeTab === "Overview" && (
            <div>
              <p className="profile-details-title">
                <strong>Name</strong>
              </p>
              <p className="profile-details-content">Dinh Thinh</p>
              <p className="profile-details-title">
                <strong>Birthday</strong>
              </p>
              <p className="profile-details-content">04/06/2002</p>
              <p className="profile-details-title">
                <strong>Address</strong>
              </p>
              <p className="profile-details-content">Details address</p>
              <p className="profile-details-title">
                <strong>Contact</strong>
              </p>
              <p className="profile-details-content">Email or number phone</p>
              {/* <div className="edit-buttons">
                <button className="edit-button">H</button>
                <button className="delete-button">X</button>
              </div> */}
            </div>
          )}
          {activeTab === "Details" && (
            <div className="details-section">
              <h3>
                <strong>Personal Information</strong>
              </h3>
              <div className="details-form">
                <div className="details_Personal">
                  {/* <label>First Name</label> */}
                  <div class="field">
                    <input type="text" id="firstname" placeholder="..." />
                    <label for="firstname">firstname</label>
                  </div>
                  {/* <label>Name</label> */}
                  <div class="field">
                    <input type="text" id="name" placeholder="..." />
                    <label for="name">name</label>
                  </div>
                </div>
                <label>Birthday</label>
                <div className="birthday-inputs">
                  <select>
                    <option>Date</option>
                  </select>
                  <select>
                    <option>Month</option>
                  </select>
                  <select>
                    <option>Year</option>
                  </select>
                </div>
                <label>Sex</label>
                <select>
                  <option>Male</option>
                </select>
              </div>
              <h3 className="addres_title">
                <strong>Address</strong>
              </h3>
              <div className="address-form">
                <label>Province</label>
                <select>
                  <option>Province</option>
                </select>
                <label>District</label>
                <select>
                  <option>District</option>
                </select>
                <label>Ward</label>
                <select>
                  <option>Ward</option>
                </select>
                {/* <label>Specific Address</label> */}
                <div class="field">
                  <input type="text" id="SpecificAddress" placeholder="..." />
                  <label for="SpecificAddress">Specific Address</label>
                </div>
              </div>
            </div>
          )}
          {activeTab === "Other" && (
            <div className="other-section">
              <h3>Personal Information</h3>
              <div className="other-form">
                <label>Email</label>
                <input type="email" value="nguyenxuanloc@gmail.com" readOnly />
                <label>Number Phone</label>
                <input type="text" value="01234567890" readOnly />
              </div>
              <h3>Other</h3>
              <label>Link</label>
              <input type="text" value="google.com" readOnly />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfileComponent;
