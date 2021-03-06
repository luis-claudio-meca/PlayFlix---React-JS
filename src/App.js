import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';

export default () =>{

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData]= useState(null);
  const [blackHeader, setblackHeader]= useState(false);

  useEffect(()=>{
    const loadAll = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let trending = list.filter(i=> i.slug === 'trending');
      let randonChosen = Math.floor(Math.random() * (trending[0].items.results.length - 1));
      let chosen = trending[0].items.results[randonChosen]

      
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, chosen.media_type === 'tv' ? 'tv' : 'movie');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  useEffect(()=>{
    const scrollListener = () =>{
        if(window.scrollY > 10){
          setblackHeader(true);
        }else{
          setblackHeader(false);
        }
    }

    window.addEventListener('scroll', scrollListener);

    return () =>{
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return(
  
    <div className="page">

      <Header black={blackHeader}/>

      {featuredData && 
        <FeaturedMovie item ={featuredData}/>
      }

      <section className="lists">
        {movieList.map((item, key) =>(
          <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
        ))

        }
      </section>
      <footer>
        Feito para estudo de react.<br/>
        Dados Extraidos de https://www.themoviedb.org/
      </footer>


    {movieList.length <= 0 &&
      <div className="loading">
        <img src="https://thumbs.gfycat.com/CleanGiantFlea-size_restricted.gif" alt="loading"></img>
      </div>
    }
    </div>
 
  )
}



