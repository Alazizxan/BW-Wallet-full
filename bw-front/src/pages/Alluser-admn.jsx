import { useNavigate, useNavigation } from "react-router-dom";
import React, { Component,useEffect, useState } from "react";
import useAppStore from "../store/app.js";
import UIStatus from "../components/ui/PageStatus/PageStatus.jsx";
import UIPageIndicator from "../components/ui/PageIndicator/PageIndicator.jsx";
import TopReferralCard from "../components/topreferalls/topreferallpage.jsx";
import { fetchAllUsers, fetchTopRef } from "../api/index.js";
import AllUserCard from "../components/alluseradmn/allUserCard.jsx";
import './alluser.css';






export default function AllUserAdmn () {
  const app = useAppStore();
  const navigation = useNavigate();
  const [alluser, setAlluser] = useState([]);

  const getAllUsr = async () => {
    try {
      // fetchAllUsers ni asinxron kutib turamiz
      const alluserData = await fetchAllUsers();
      setAlluser(alluserData);
    } catch (error) {
      console.error("Foydalanuvchilarni olishda xatolik:", error);
    }
  };

useEffect(() => {
  getAllUsr()}, [])

    return <>
        <div className="alluser">
        
        <UIPageIndicator page="Top Referrals" />
      
      
        <div className="mb-4">
                  </div>
        
        <div className="tasks h-[350px] flex flex-col gap-[8px] mt-[15px] overflow-y-scroll">
          {alluser.map((user, index) => (
            <AllUserCard 
              key={index}
              user={user}
              index={index}
            />
          ))}
        </div>
      
        
        <div className="fixed mb-[1px] bottom-[55px] left-0 right-0 px-2">
        
        <button 
          onClick={() => navigation('/admin/active')}
          className="w-full py-[9px] mb-[9px] text-black bg-white  rounded-lg font-medium hover:bg-gray-500 transition-colors"
        >
          Request for Active
        </button>

        <button 
          onClick={() => navigation('/admin')}
          className="w-full py-[9px] text-black bg-white  rounded-lg font-medium hover:bg-gray-500 transition-colors"
        >
          Back to Tasks
        </button>
      </div>

      </div>
    </>



}