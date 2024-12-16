import React from 'react';
import { Link } from 'react-router-dom';
import * as images from './img/images';
import './CSS/H&F.css';
import './CSS/adaptive.css';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function Header() {
  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };
  return (
    <header>
        <Link to="/"><img className='logo' src={images.logo} alt="logo"/></Link>
      <nav>
          <ul>
            <li><Link to="/#products">НОВИНКА</Link></li>
            <li><Link to="/catalog">КАТАЛОГ</Link></li>
            <li><Link to="/#about-us">О НАС</Link></li>
            <li><a onClick={scrollToBottom}>КОНТАКТЫ</a></li>
          </ul>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer id="contacts">
      <div className="logo">
          <img src={images.pineapple} alt='pineapple'/>       
      </div>
      <div className="contact-info">
          <h2> КОНТАКТЫ</h2>
          <p>Darida Your Water VITAMIX
          <br/>Адрес: Линейная ул., 1А, агрогородок Ждановичи
          <br/>Телефон: +375 17 500-16-16
          <br/>Email: office@darida.by</p>
      </div>
    </footer>
  );
}

export function ScrollToAnchor() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return null;
}
