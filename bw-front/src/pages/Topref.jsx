import React, { Component,useEffect, useState } from "react";
import useAppStore from "../store/app.js";
import UIStatus from "../components/ui/PageStatus/PageStatus.jsx";
import UIPageIndicator from "../components/ui/PageIndicator/PageIndicator.jsx";
import { useNavigate } from "react-router-dom";
import TopReferralCard from "../components/topreferalls/topreferallpage.jsx";
import { fetchTopRef } from "../api/index.js";


export default function TopReferrals() {
  const app = useAppStore();
  const navigation = useNavigate();
  const [topuser, setTopuser] = useState([]);


  const getTopRef = async () => {
    const topuser = await fetchTopRef();
    setTopuser(topuser)
}

  // Mock data for top 10 referrals - replace with actual data from backend
  

  useEffect(() => {
    getTopRef()}, [])

  return (
    <>
      <UIStatus
        balance={true}
        user={{
          firstName: app.user.firstName,
          balance: app.user.balance,
          profileImage: app.profileImage
        }}
      />
      <UIPageIndicator page="Top Referrals" />
      
      <div className="mt-4 ">
        <div className="mb-4">
                  </div>
        
        <div className="tasks h-[320px] flex flex-col gap-[8px] mt-[15px] overflow-y-scroll">
          {topuser.map((user, index) => (
            <TopReferralCard 
              key={index}
              
              user={user}
              index={index}
            />
          ))}
        </div>
      </div>

      <div className="fixed mb-[45px] bottom-[55px] left-0 right-0 px-3">
        <button 
          onClick={() => navigation('/earn')}
          className="w-full py-[9px] text-black bg-white  rounded-lg font-medium hover:bg-gray-500 transition-colors"
        >
          Back to Tasks
        </button>
      </div>
    </>
  );
}