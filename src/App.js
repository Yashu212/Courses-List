import React, { useEffect, useState } from "react";
import Cards from "./component/Cards";
import Navbar from "./component/Navbar";
import Filter from "./component/Filter";
import Spinner from "./component/Spinner";
import {apiUrl,filterData} from "./data";
import { toast } from "react-toastify";
const App = () => {

  const[courses,setCourses] = useState(null);
  const[loading,setLoading] = useState(true);
  const[category,setCategory] = useState(filterData[0].title);
  async function fetchData(){
    setLoading(true);
    try{
      const res = await fetch(apiUrl);
      const output = await res.json();
      setCourses(output.data);
    }
    catch(error)
    {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div className="min-h-screen flex flex-col">
      <div>
        <Navbar/>
      </div>
      <div className="bg-bgDark2 min-h-[100vh]">
        <div>
          <Filter filterData={filterData} category={category} setCategory={setCategory}/>
        </div>
        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {loading ? (<Spinner/>) : (<Cards courses={courses} category={category}/>)}
        </div>
      </div>
    </div>
  )
};

export default App;
