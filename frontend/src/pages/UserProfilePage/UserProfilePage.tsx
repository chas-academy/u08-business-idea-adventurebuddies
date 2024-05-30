import React from "react";

const UserProfilePage = () => {
  return (
    <div className="w-3/5 border p-2 rounded border shadow-md mx-auto">
      <h1 className="text-center-primaryColor mb-4 leading-12 font-bold">
        d.enize
      </h1>
      <p className="text-xs italic pb-4">
        "I used to be an adventurer like you. Then I took an arrow in the
        knee..."
      </p>

      <div className="flex justify-center">
        <div className="flex item-left item-left">
          <img src="" alt="UserProfileImg" />
        </div>
        {"| |"}
        <div className="flex flex-col justify-center item-start text-sm font-medium md:box-content bg-gray-200 rounded-md">
          <div className="flex flex-col justify-center">
            Aktiviteter:
            <p className="text-xs">Dans, Minigolf, Frisbee</p>
          </div>
          <div className="">
            Språk:
            <p className="text-xs">Svenska, Engelska, Spanska, Turkiska</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
