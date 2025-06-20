import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { asyncloadmovie, removemovie } from '../store/actions/movieAction';
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import HorizontalCards from "../templates/HorizontalCards";
import Loading from './Loading';

const Moviedetails = () => {
  const {pathname} = useLocation();
 const {info} = useSelector((state) => state.movie);
  document.title = `MVXC | Movie Details`;
  const navigate = useNavigate();

const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(asyncloadmovie(id))
      return ()=>{
        // Cleanup if needed
        dispatch(removemovie())
      }
  },[id])
  return info ?(
    <div style={{
      background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5),rgba(0,0,0,.8)), url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path  })`,
      backgroundPosition:'center top 10%',backgroundSize:"cover",backgroundRepeat: 'no-repeat'
    }} className='relative overflow-auto w-screen max-h-[200vh] px-[10%]'>
      {/*part 1*/}
      <nav className='w-full h-[10vh] items-center text-zinc-100 flex gap-10 text-xl' >
        <Link onClick={()=>navigate(-1)} className="hover:text-[#D2042D] mr-3 ri-arrow-left-line  "></Link>

        <a target='_blank' href={info.detail.homepage}><i className="  hover:text-[#D2042D]   ri-external-link-line"></i></a>
        <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}><i className=" hover:text-[#D2042D]  ri-earth-fill"></i></a>
        <a target='_blank' href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}    className="  hover:text-[#D2042D]" >imdb</a>
      </nav>
        
      {/*part 2*/}
      <div className='w-full flex  '>
      <img className='shadow-[8px_17px_58px_2px_rgba(0,0,0,.5)] hover:shadow-xl hover:shadow-black duration-300 rounded-md h-[50vh] object-fit mt-3   ' src={`https://image.tmdb.org/t/p/original/${ info.detail.poster_path  ||info.detail.backdrop_path  }`} alt="" />
       <div className='content ml-[5%] text-white'>
        <h1 className='text-4xl font-black  '> {info.detail.name ||info.detail.title || info.detail.original_name || info.detail.original_title}


          <small className='text-2xl font-bold text-zinc-200'>({info.detail.release_date.split("-")[0]})</small>
        </h1>
        <div className='flex  items-center gap-x-3 mt-3 mb-5 '>

      <span className='  text-xs font-semibold w-[5vh] h-[5vh] flex justify-center rounded-full items-center bg-gradient-to-r from-red-900 via-red-700 to-red-400'>{(info.detail.vote_average*10).toFixed()}<sup>%</sup></span>
      <h1 className='font-semibold text-xl w-[60px] leading-none'>User Score</h1>
      <h1>{info.detail.release_date}</h1>
      <h1>({info.detail.genres.map(g=>g.name).join(",")})</h1>
      <h1>{info.detail.runtime}min</h1>
        </div>
          <h1  className='text-xl font-semibold italic text-zinc-200 '>{info.detail.tagline}</h1>
            <h1  className='text-2xl mt-4 mb-3 '>Overview</h1>
            <p>{info.detail.overview}</p>


             <h1  className='text-2xl mt-3 mb-3 '>Available in Languages</h1>
            <p className='mb-10 leading-6'>{info.translations.join(" , ")}</p>
                     
                     <Link className=' rounded-lg p-5 bg-gradient-to-r from-red-900 via-red-800 to-red-500' to={`${pathname}/trailer`} ><i className="text-xl mr-3 ri-play-fill"></i> Play Trailer</Link>

                     <Link target='_blank'  className=' rounded-lg p-5 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-500 ml-5' to={`https://www.2embed.stream/embed/movie/${info.externalid.id}`} ><i className="text-xl mr-3 ri-play-fill"></i> Watch Now</Link>

       </div>
      </div>
       
      {/*part 3*/}
       <div className='w-[80%] flex flex-col gap-y-5 mt-10'>

                 { info.watchproviders && info.watchproviders.flatrate && 
              <div className='flex gap-10 items-center text-white'>
                <h1 >
                  Available on Platforms
                </h1>
               { info.watchproviders.flatrate.map((w,i)=>(
                         <img key={i} title={w.provider_name} className='shadow-[8px_17px_58px_2px_rgba(0,0,0,.5)] hover:shadow-xl hover:shadow-black duration-300 w-[5vh] object-fit h-[5vh] rounded-md' src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}  />
                    ))}
              </div>
              }
      
              { info.watchproviders && info.watchproviders.rent && 
              <div className='flex gap-10 items-center  text-white'>
                <h1 >
                  Available on Rent
                </h1>
               { info.watchproviders.rent.map((w,i)=>(
                         <img key={i} title={w.provider_name} className='shadow-[8px_17px_58px_2px_rgba(0,0,0,.5)] hover:shadow-xl hover:shadow-black duration-300 w-[5vh] object-fit h-[5vh] rounded-md' src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}  />
                    ))}
              </div>
              }


              { info.watchproviders && info.watchproviders.buy && 
              <div className='flex gap-10 items-center text-white'>
                <h1 >
                  Available on Buy
                </h1>
               { info.watchproviders.buy.map((w,i)=>(
                         <img key={i} title={w.provider_name} className='shadow-[8px_17px_58px_2px_rgba(0,0,0,.5)] hover:shadow-xl hover:shadow-black duration-300 w-[5vh] object-fit h-[5vh] rounded-md' src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}  />
                    ))}
              </div>
              }
          

        
     
        </div>   
      {/*part 4*/}
      <hr className='mt-10 mb-5 text-zinc-500 h-[2px]'/>
      <h1 className='text-3xl font-bold  text-white '>Recommendations & Similar Movies</h1>
      <HorizontalCards  data={info.recommendations.length>0 ? info.recommendations : info.similar} />
     
            <Outlet />
    </div>
  ):<Loading/>
}

export default Moviedetails
