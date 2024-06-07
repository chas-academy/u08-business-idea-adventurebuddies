import React, { useEffect, useState } from "react";
import Tab from "../tabs/Tab";
import Tabs from "../tabs/Tabs";
import { TabsProvider } from "../tabs/TabsContext";

interface User {
  _id: string;
  name: string;
  email: string;
  status: string;
  requester: {
    _id: string;
    userName: string;
  };
  recipient: {
    _id: string;
    name: string;
  };
}

const FriendList = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [friends, setFriends] = useState<User[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  console.log(activeTabIndex); //låt stå annars ERROOOOORR
  const fetchFriends = async () => {
    try {
      if (!userId || !token) {
        throw new Error("User ID or token not found in local storage");
      }
      const response = await fetch(
        `https://u08-business-idea-adventurebuddies.onrender.com/api/users/${userId}/friends`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setFriends(data.friends || []);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const fetchIncomingRequests = async () => {
    try {
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const incomingResponse = await fetch(
        `https://u08-business-idea-adventurebuddies.onrender.com/api/friends/received`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!incomingResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const incomingData = await incomingResponse.json();
      setIncomingRequests(incomingData.requests || []);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const handleSearch = async () => {
    try {
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      const response = await fetch(
        `https://u08-business-idea-adventurebuddies.onrender.com/api/users/search?search=${searchQuery}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      const filteredResults = data.filter((user: User) => user._id !== userId);

      setSearchResults(filteredResults);
    } catch (error) {
      if (error === "Friend request already sent") {
        ("You have already sent a friend request to this user");
      } else {
        console.error("Error searching users:", error);
      }
    }
  };

  const handleFriendRequest = async (friendId: string, action: string) => {
    try {
      if (!token) {
        throw new Error("Token not found in local storage");
      }

      let url = "";
      let method = "POST";

      switch (action) {
        case "send":
          url = `https://u08-business-idea-adventurebuddies.onrender.com/api/friends/request/${friendId}`;
          break;
        case "accept":
          url = `https://u08-business-idea-adventurebuddies.onrender.com/api/friends/accept/${friendId}`;
          break;
        case "reject":
          url = `https://u08-business-idea-adventurebuddies.onrender.com/api/friends/reject/${friendId}`;
          break;
        case "remove":
          url = `https://u08-business-idea-adventurebuddies.onrender.com/api/friends/${friendId}`;
          method = "DELETE";
          break;
        default:
          throw new Error("Unknown action");
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server response error:", errorData);
        throw new Error("Network response was not ok");
      }

      if (action === "accept" || action === "reject") {
        fetchIncomingRequests();
      } else if (action === "remove") {
        fetchFriends();
      } else if (action === "send") {
        handleSearch();
      }

      fetchFriends();
      fetchIncomingRequests();
      handleSearch();

      let message = "";
      switch (action) {
        case "send":
          message = "Friend request sent.";
          break;
        case "accept":
          message = "Friend request accepted.";
          break;
        case "reject":
          message = "Friend request rejected.";
          break;
        case "remove":
          message = "Friend removed.";
          break;
        default:
          break;
      }
      setModalMessage(message);
    } catch (error) {
      console.error(`Error handling friend request:`, error);
    }
  };

  useEffect(() => {
    fetchFriends();
    fetchIncomingRequests();
  }, []);

  const closeModal = () => {
    setModalMessage(null);
  };

  return (
    <TabsProvider>
      {modalMessage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
      <Tabs>
        <Tab
          tabLabel="Search Users"
          index={0}
          setActiveTabIndex={setActiveTabIndex}
        >
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users by name or email"
            />
            <button onClick={handleSearch}>Search</button>
            <div>
              {searchResults?.length > 0 ? (
                searchResults.map((user) => (
                  <div key={user._id}>
                    <h3>{user.name}</h3>
                    {user.status === "pending" ? (
                      <p>Friend request pending</p>
                    ) : (
                      <button
                        onClick={() => handleFriendRequest(user._id, "send")}
                      >
                        Add Friend
                      </button>
                    )}
                  </div>
                ))
              ) : (
                <p>No users found</p>
              )}
            </div>
          </div>
        </Tab>
        <Tab
          tabLabel="Friend Requests"
          index={1}
          setActiveTabIndex={setActiveTabIndex}
        >
          <div>
            {incomingRequests?.length > 0 ? (
              incomingRequests.map((request) => (
                <div key={request._id}>
                  <h3>{request.requester.userName}</h3>{" "}
                  {request.status === "pending" ? (
                    <>
                      <button
                        onClick={() =>
                          handleFriendRequest(request.requester._id, "accept")
                        }
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleFriendRequest(request.requester._id, "reject")
                        }
                      >
                        Reject
                      </button>
                    </>
                  ) : request.status === "accepted" ? (
                    <p>Friend request accepted</p>
                  ) : (
                    <p>Friend request rejected</p>
                  )}
                </div>
              ))
            ) : (
              <p>No friend requests</p>
            )}
          </div>
        </Tab>
        <Tab tabLabel="Friends" index={2} setActiveTabIndex={setActiveTabIndex}>
          <div>
            {friends?.length > 0 ? (
              <>
                {" "}
                {friends.map(
                  (friend) =>
                    friend.recipient.name && (
                      <div key={friend._id}>
                        <h3>{friend.recipient.name}</h3>
                        <button
                          onClick={() =>
                            handleFriendRequest(friend.recipient._id, "remove")
                          }
                        >
                          Remove Friend
                        </button>
                      </div>
                    )
                )}
              </>
            ) : (
              <p>No friends found</p>
            )}
          </div>
        </Tab>
      </Tabs>
    </TabsProvider>
  );
};

export default FriendList;
