import React, { useEffect, useState } from 'react';
import Navbaar from '../components/Navbaar';
import RateLimitedUI from '../components/RateLimitedUI';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard';
import NotesNotFound from '../components/NotesNotFound'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes,setNotes] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect( () => {
    const fetechNotes = async () => {
      try {
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      } catch (error) {
        console.log("Error feteching Notes");
        console.log(error);
        if(error.response?.status === 429){
          setIsRateLimited(true);
        }else{
           toast.error("Failed to load Notes");
        }
      }
      finally {
        setLoading(false);
       }
    };
       
      fetechNotes();
  },[]);

  return (
    <div className='min-h-screen'>
     <Navbaar/>
     
     {isRateLimited && <RateLimitedUI/>} 

      

      <div className='max-w-7xl mx-auto p-4 mt-6'> 
        {loading && <div className='text-center text-primary py-10'>Loading Notes..... </div> }

        {notes.length === 0 && !isRateLimited && <NotesNotFound />}

        {notes.length >0 && !isRateLimited &&(
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map((note) => (
             <NoteCard key={note._id} note={note} setNotes={setNotes} /> 
            ))}

          </div>
        )}
      </div>


    </div>
  )//displaying the notes
}

export default HomePage