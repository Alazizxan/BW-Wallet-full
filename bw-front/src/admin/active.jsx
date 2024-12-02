import {useState, useEffect} from "react";
import {deleteTask, fetchAllUsers, fetchTasks} from "../api/index.js";
import { useNavigate } from "react-router-dom";

import UILoading from "../components/ui/Loading/UILoading.jsx";
import ActiveCard from '../components/active/active.jsx';

import useAppStore from "../store/app.js";


export default function Avtive() {
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
           <div className="tasks h-[450px] flex flex-col gap-[8px] mt-[15px] overflow-y-scroll">
             {alluser
                .filter((user) => user.activation) // Faqatgina activation true bo'lgan userlarni tanlash
                .map((user, index) => (
                 <ActiveCard
                     key={index}
                     user={user}
                     admin={true}
                />
                ))}
            </div>

             
        </>
    }
