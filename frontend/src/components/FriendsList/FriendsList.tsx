import React, { useEffect, useState } from "react";
import Tab from "../tabs/Tab";
import Tabs from "../tabs/Tabs";
import { TabsProvider } from "../tabs/TabsContext";

interface User {
  _id: string;
  name: string;
  email: string;
}

const FriendList = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [friends, setFriends] = useState<User[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [incomingRequests, setIncomingRequests] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found in local storage");
      }
      const response = await fetch(
        `https://u08-business-idea-adventurebuddies.onrender.com/api/users?search=${searchQuery}`,
        {
          method: "GET",
          headers: {
            // "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setSearchResults(data);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleFriendRequest = async (friendId: string, action: string) => {
    try {
      const token = localStorage.getItem("token");
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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Friend request response:", data);

      if (action === "accept" || action === "reject") {
        setIncomingRequests((prev) =>
          prev.filter((user) => user._id !== friendId)
        );
      } else if (action === "remove") {
        setFriends((prev) => prev.filter((user) => user._id !== friendId));
      }
    } catch (error) {
      console.error(`Error handling friend request:`, error);
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User ID or token not found in local storage");
        }
        const response = await fetch(
          `https://u08-business-idea-adventurebuddies.onrender.com/api/friends`,
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
        setIncomingRequests(data.incomingRequests || []);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <TabsProvider>
      <Tabs>
        <Tab tabLabel="Friends" index={0} setActiveTabIndex={setActiveTabIndex}>
          <div>
            {friends?.length > 0 ? (
              friends.map((friend) => (
                <div key={friend._id}>
                  <h3>{friend.name}</h3>
                  <p>{friend.email}</p>
                  <button
                    onClick={() => handleFriendRequest(friend._id, "remove")}
                  >
                    Remove Friend
                  </button>
                </div>
              ))
            ) : (
              <p>No friends found</p>
            )}
          </div>
        </Tab>
        <Tab
          tabLabel="Search Users"
          index={1}
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
                    <p>{user.email}</p>
                    <button
                      onClick={() => handleFriendRequest(user._id, "send")}
                    >
                      Add Friend
                    </button>
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
          index={2}
          setActiveTabIndex={setActiveTabIndex}
        >
          <div>
            {incomingRequests?.length > 0 ? (
              incomingRequests.map((request) => (
                <div key={request._id}>
                  <h3>{request.name}</h3>
                  <p>{request.email}</p>
                  <button
                    onClick={() => handleFriendRequest(request._id, "accept")}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleFriendRequest(request._id, "reject")}
                  >
                    Reject
                  </button>
                </div>
              ))
            ) : (
              <p>No friend requests</p>
            )}
          </div>
        </Tab>
      </Tabs>
    </TabsProvider>
  );
};

export default FriendList;
