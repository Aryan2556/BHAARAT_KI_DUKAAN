import React,{ useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { MoveLeft, MoveRight } from "lucide-react";

const slides = [
  {
    subtitle: "Health Essentials",
    title: " Your Trusted Source for Wellness ... ",
    color:"black",
    text: " Explore to find the right solutions for your health needs.",
    imgSrc: "Assests/Medicines.jpg"
  },
  {
    subtitle: "Comfort & Style",
    title: " Step into Quality and Fashion ...  ",
    color:"white",
    text: "Explore our diverse range of shoes for every occasion",
    imgSrc: "Assests/Footwears.jpg"
  },
  {
    subtitle: "Stylish & Functional",
    title: " Carry Your Essentials with Elegance ... ",
    color:"darkblue",
    text: "Explore to choose the ideal bag that fits your lifestyle.",
    imgSrc: "Assests/Bags1.jpg"
  },
  {
    subtitle: "Home Essentials",
    title: " Crafting Comfort for Your Home ... ",
    color:"darkblue", 
    text: "Discover find everything you need for a cozy living space",
    imgSrc: "Assests/Household.jpg"
    
  },
  {
    subtitle: "Kitchen Wonders",
    title: " Equip Your Kitchen with the Best ... ",
    color:"darkblue",
    text: "Discover our top kitchen essentials.",
    imgSrc: "Assests/Kitchen.jpg"
  },
  {
    subtitle: "Stylish Accessories",
    title: " Enhance Your Look with Our Collection ... ",
    color:"darkblue",
    text: "Explore stylish accessories for every occasion.",
    imgSrc: "Assests/Spectacles.jpg"
  },
  {
    subtitle: "Wardrobe Essentials",
    title: " Elevate Your Wardrobe with Style ... ",
    color:"darkblue",
    text: "Discover our latest collection of clothing that blends comfort and trend",
    imgSrc: "Assests/Clothes.jpg"
  },
];

const Home = () => {

  const [currentSlidePos, setCurrentSlidePos] = useState(0);
  const autoSlideInterval = useRef(null);

  const slideNext = () => {
    setCurrentSlidePos((prev) => (prev + 1) % slides.length);
  };

  const slidePrev = () => {
    setCurrentSlidePos((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const autoSlide = () => {
    autoSlideInterval.current = setInterval(slideNext, 7000);
  };

  useEffect(() => {
    autoSlide();
    
    return () => clearInterval(autoSlideInterval.current);
  }, []);

  return (
    <div>
      
      <div className="hero text-center" aria-label="home">
        <ul>
          {slides.map((slide, index)=>(
             <li key={index} className={`slider-item ${currentSlidePos === index ? 'active' : ''}`}>
              <div className="slider-bg animate-smoothScale">
                <img src={slide.imgSrc} style={{ filter:'blur(18px)'}} width="1880" alt="" className="animate-smoothScale duration-75" />
              </div>
              
              <p className="label-2 section-subtitle animate-sliderReveal delay-[500ms]" style={{color:`${slide.color}`}}>{slide.subtitle}</p>
              <h1 className="display-1 mb-5 hero-title animate-sliderReveal delay-[1000ms]" style={{color:`${slide.color}`}}>{slide.title}</h1>
              <p className="body-2  hero-text animate-sliderReveal delay-[1.5s]" style={{color:`${slide.color}`}}>{slide.text}</p>
              <Link to={"/Categories"} className="btn reveals btn-primary animate-sliderReveal" style={{borderColor:`${slide.color}`,color:`${slide.color}`}}>
                <span className="text text-1">Explore It</span>
                <span className="text text-2">Explore It</span>
              </Link>
              <button onClick={slidePrev} aria-label="slide to previous" style={{color:`${slide.color}`,borderColor:`${slide.color}`}}  className="none try top-[70%] grid left-[30px] absolute z-10 text-4xl text-emerald-400 border-solid border-1 border-red-600 w-[45px] h-[45px] place-items-center transform rotate-[45deg] transition duration-[250] ease-linear hover:bg-[#30D5C8] hover:text-white focus-visible:bg-[#30D5C8] ">
                <MoveLeft className="transform rotate-[-45deg]"  />
              </button>
              <button onClick={slideNext} aria-level="slide to next" style={{color:`${slide.color}`,borderColor:`${slide.color}`}} className="none try top-[70%] grid right-[30px] absolute z-10 text-4xl text-emerald-400 border-solid border-1 border-red-600 w-[45px] h-[45px] place-items-center transform rotate-[45deg] transition duration-[250] ease-linear hover:bg-[#30D5C8] hover:text-white focus-visible:bg-[#30D5C8]">
                <MoveRight className="transform rotate-[-45deg]" />
              </button>
             </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default Home;