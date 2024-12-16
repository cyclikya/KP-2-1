import React, { useState} from 'react';
import './CSS/index.css';
import './CSS/main.css';
import './CSS/adaptive.css';
import * as images from './img/images';

export function First() {
  return (
    <div className="first">
      <p>YOUR<br/>WATER<br/>VITAMIX</p>
      <img className="bottle" src={images.vitamix_multifrukt} alt="Orange Bottle"/>
      <img className="shadow" src={images.shadow} alt="Shadow"/>
    </div>
  );
}

export function Second() {
  const products = [
    {
      id: 1,
      image: images.vitamix_multifrukt,
      description: "Такой насыщенный витаминами и минералами состав не только очистит ваш организм от шлаков и токсинов, но и насытит необходимыми микроэлементами для активной жизни и энергии. Витамины С и Е, содержащиеся в апельсине и нектарине, укрепят иммунную систему, а натуральные сахара из яблока и груши подарят заряд бодрости на весь день. Улучшает состояние сердечно-сосудистой системы, кожи и волос.",
    },
    {
      id: 2,
      image: images.vitamix_limon_myata,
      description: "Освежающий и бодрящий сок с лимоном и мятой не только утолит жажду, но и станет отличным помощником в укреплении иммунной системы благодаря высокому содержанию витамина С. Мята способствует улучшению пищеварения и успокаивает нервную систему, а лимон помогает очистить организм от токсинов. Такой состав подарит вам ощущение свежести и легкости на весь день.",
    },
    {
      id: 3,
      image: images.vitamix_cherry,
      description: "Сок с насыщенным вкусом черешни богат витаминами и антиоксидантами, которые способствуют укреплению иммунной системы и защите клеток от свободных радикалов. Черешня улучшает кровообращение и работу сердечно-сосудистой системы, а также благотворно влияет на состояние кожи. Этот сок наполнит ваш организм энергией и свежестью, улучшая общее самочувствие и настроение.",
    }
  ];

  const [currentProduct, setCurrentProduct] = useState(products[0]);
  const handleChangeProduct = (id) => {
    const newProduct = products.find(product => product.id === id);
    setCurrentProduct(newProduct);
  };

  return (
    <section className="second"  id='products' >
      <span style={{ borderBottom: `0.3vw solid ${currentProduct.color}` }}>НОВАЯ КОЛЛЕКЦИЯ СОКОВ VITAMIX</span>
      <div className="content">
        <div className='left-column'>
          <img src={images.choose} className='choose'/>
          <img src={products[0].image} alt="Product 1" onClick={() => handleChangeProduct(1)} className='product-button' style={{ transform: currentProduct.id === 1 ? 'translateX(6.5vw) rotate(90deg)' : 'rotate(90deg)' }} />
          <img src={products[1].image} alt="Product 2" onClick={() => handleChangeProduct(2)} className='product-button' style={{ transform: currentProduct.id === 2 ? 'translateX(6.5vw) rotate(90deg)' : 'rotate(90deg)' }} id='second_bottle' />
          <img src={products[2].image} alt="Product 3" onClick={() => handleChangeProduct(3)} className='product-button' style={{ transform: currentProduct.id === 3 ? 'translateX(6.5vw) rotate(90deg)' : 'rotate(90deg)' }} />
        </div>
        <div className="center-column">
          <div className='icons'>
            {currentProduct.id === 1 && (
              <div>
                <img className="icon" src={images.appleIcon} alt="Apple" />
                <img className="plus" src={images.plus} alt="Plus" />
                <img className="icon" src={images.pearIcon} alt="Pear" />
                <img className="plus" src={images.plus} alt="Plus" />
                <img className="icon" src={images.orangeIcon} alt="Orange" />
                <img className="plus" src={images.plus} alt="Plus" />
                <img className="icon" src={images.nectarineIcon} alt="Nectarine" />
              </div>
            )}
            {currentProduct.id === 2 && <img className="icon" src={images.orangeIcon} alt="Orange" />}
            {currentProduct.id === 3 && <img className="icon" src={images.cherryIcon} alt="Cherry" />}
          </div>
          <div className="description">
            <p>{currentProduct.description}</p>
          </div>
        </div><section style={{ position: 'absolute' }}  id='about-us'></section>
        <div className="right-column">
          <img className="bottle" src={currentProduct.image} alt="Bottle" />
          <img className="shadow" src={images.shadow} alt="Shadow" />
        </div>
      </div>
    </section>
  );
}


export function Third() {
  return (
    <div className="third">
      <img className="fruits" src={images.fruits} alt="Fruits"/>
      <p><span id='fr'>FRESH</span></p>
      <p><span id='he'>HEALTHY</span></p>
      <h1 className='title-1'>НАТУРАЛЬНЫЕ СОКИ</h1>
      <p className='text1'>Добро пожаловать на сайт нашей новой линейки соков! Мы предлагаем натуральные напитки, богатые витаминами и минералами, для вашего здоровья и придания энергии.</p>
      <h1 className='title-2'>СВЕЖЕСТЬ И КАЧЕСТВО</h1>
      <p className='text2'>Наши соки готовятся из отборных фруктов и овощей с экологически чистых плантаций. В каждом глотке вы почувствуете свежесть и важные витамины, такие как С и Е.</p>
      <h1 className='title-3'>ВКУС И ЗДОРОВЬЕ</h1>
      <p className='text3'>Мы делаем полезные и вкусные напитки доступными для всех. Наши соки сочетают в себе лучшие ингредиенты, вкус и пользу.</p>
      <h1 className='title-4'>ТЕХНОЛОГИИ</h1>
      <p className='text4'>Современные технологии позволяют сохранить максимум витаминов. Попробуйте наши соки — это вкусная забота о здоровье! Наполните свою жизнь яркими вкусами и энергией!</p>
    </div>
  );
}