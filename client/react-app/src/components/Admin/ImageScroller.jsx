// ImageScroller.jsx

import React, { useReducer, useRef, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';
import '../../styles/ImageScroller.css';

// Initial state for the slider
const initialState = {
  slideIndex: 0,
};

// Slide data
const slides = [
  {
    title: 'MinSuiZen',
    subtitle: '明水然',
    description: 'Adventure is never far away',
    image: 'https://d3nexs9enmvorf.cloudfront.net/images.jpeg',
  },
  {
    title: 'Haidilao',
    subtitle: '海底撈',
    description: 'Let your dreams come true',
    image:
      'https://d3nexs9enmvorf.cloudfront.net/截圖 2023-12-20 上午5.31.39.png',
  },
  {
    title: 'Mimisa Rocks',
    subtitle: '茶六',
    description: 'A piece of heaven',
    image:
      'https://d3nexs9enmvorf.cloudfront.net/截圖 2023-12-20 上午5.32.19.png',
  },
  {
    title: 'OGANGE',
    subtitle: '橘色鍋物',
    description: 'A piece of Love',
    image:
      'https://d3nexs9enmvorf.cloudfront.net/截圖 2023-12-20 上午6.13.59.png',
  },
  {
    title: 'MARAIS',
    subtitle: '瑪黑餐酒',
    description: 'A piece of Joy',
    image:
      'https://d3nexs9enmvorf.cloudfront.net/截圖 2023-12-20 上午5.41.34.png',
  },
];

// Reducer for slide transitions
const slidesReducer = (state, event) => {
  const totalSlides = slides.length;
  if (event.type === 'NEXT') {
    return {
      ...state,
      slideIndex: (state.slideIndex + 1) % totalSlides,
    };
  }
  if (event.type === 'PREV') {
    return {
      ...state,
      slideIndex: (state.slideIndex - 1 + totalSlides) % totalSlides,
    };
  }
  if (event.type === 'GOTO') {
    return {
      ...state,
      slideIndex: event.index,
    };
  }
};

// Custom hook for tilt effect
function useTilt(active) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined,
    };

    const el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty('--px', px);
      el.style.setProperty('--py', py);
    };

    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, [active]);

  return ref;
}

// Slide component with Parallax effect
function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    <Parallax className="slideParallax" y={[50, -50]} tagOuter="div">
      <div
        ref={ref}
        className="slide"
        data-active={active}
        style={{
          '--offset': offset,
          '--dir': offset === 0 ? 0 : offset > 0 ? 1 : -1,
        }}
      >
        <div
          className="slideContent"
          style={{
            backgroundImage: `url('${slide.image}')`,
          }}
        />

        <div className="slideContentInner">
          <h2 className="slideTitle">{slide.title}</h2>
          <h3 className="slideSubtitle">{slide.subtitle}</h3>
          <p className="slideDescription">{slide.description}</p>
        </div>
      </div>
    </Parallax>
  );
}

// ImageScroller component
export const ImageScroller = () => {
  const [state, dispatch] = useReducer(slidesReducer, initialState);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch({ type: 'NEXT' });
    }, 1500); // 每3秒切换到下一张

    return () => clearInterval(timer); // 清除定时器
  }, []);

  return (
    <div className="slide-container">
      <div className="slides">
        {slides.map((slide, i) => {
          let offset = state.slideIndex - i;
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
      </div>
      <div className="dots">
        {[...slides].reverse().map((_, idx) => {
          // 计算实际索引
          let actualIndex = slides.length - 1 - idx;
          return (
            <span
              key={idx}
              className={`dot ${
                actualIndex === state.slideIndex ? 'button-active' : ''
              }`}
              onClick={() => dispatch({ type: 'GOTO', index: actualIndex })}
            ></span>
          );
        })}
      </div>
    </div>
  );
};
