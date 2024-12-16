import React, { useState, useEffect } from 'react';
import validator from 'validator';
import './CSS/catalog.css';
import './CSS/form.css';
import './CSS/adaptive.css';

import * as images from './img/images';

const products = [
    { id: 1, name: 'VITAMIX Cherry', price: 2.99, image: images.vitamix_cherry, description: 'со вкусом вишни', isNew: true },
    { id: 2, name: 'VITAMIX Lemon-Mint', price: 2.89, image: images.vitamix_limon_myata, description: 'со вкусом лимон-мята', isNew: true },
    { id: 3, name: 'VITAMIX Multifruit', price: 3.49, image: images.vitamix_multifrukt, description: 'со вкусом мультифрукт', isNew: false },
    { id: 4, name: 'VITAMIX Peach', price: 3.49, image: images.vitamix_persik, description: 'со вкусом персика', isNew: false },
    { id: 5, name: 'VITAMIX Apple-Grapes', price: 1.99, image: images.vitamix_yabloko_vinograd, description: 'со вкусом яблоко-виноград', isNew: false },
    { id: 6, name: 'YOURTONIC BerryMore', price: 3.99, image: images.yourtonic_berrymore, description: 'тоник с ягодами', isNew: true },
    { id: 7, name: 'YOURTONIC Lemon', price: 2.99, image: images.yourtonic_bitter_lemon, description: 'тоник с лимоном', isNew: true },
    { id: 8, name: 'YOURTONIC Indian', price: 2.99, image: images.yourtonic_indian, description: 'индийский тоник', isNew: false },
    { id: 9, name: 'ZERONAD Grapes', price: 1.99, image: images.zeronad_grape, description: 'со вкусом винограда', isNew: true },
    { id: 10, name: 'ZERONAD Kiwi-Lime', price: 1.89, image: images.zeronad_green_kiwi_lime, description: 'со вкусом киви-лайм', isNew: true },
    { id: 11, name: 'ZERONAD Banana', price: 2.49, image: images.zeronad_banana, description: 'со вкусом банана', isNew: false },
    { id: 12, name: 'ZERONAD Grapefruit', price: 2.99, image: images.zeronad_grapefruit, description: 'со вкусом грейпфрута', isNew: true },
    { id: 13, name: 'YOURTEA Wild berries', price: 3.99, image: images.yourtea_lesnie_yagodi, description: 'чай лесные ягоды', isNew: true },
    { id: 14, name: 'YOURTEA Lemon-Mint', price: 3.49, image: images.yourtea_limon_myata, description: 'чай лимон и мята', isNew: false },
    { id: 15, name: 'YOURTEA Peach', price: 3.99, image: images.yourtea_persik, description: 'чай персик', isNew: false },
    { id: 16, name: 'YOURWATER Still water', price: 0.99, image: images.bottle1, description: 'негаз. вода', isNew: false },
    { id: 17, name: 'YOURWATER CARBON', price: 0.89, image: images.bottle2, description: 'газированная вода', isNew: false },
    { id: 18, name: 'YOURWATER Sport', price: 1.09, image: images.bottle3, description: 'негаз. вода', isNew: false },
];

const Catalog = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [cart, setCart] = useState([]);
    const [isBasketVisible, setIsBasketVisible] = useState(false);
    const [sortBy, setSortBy] = useState('name');
    const [isOrderVisible, setIsOrderVisible] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);
    const handleAddProduct = (productId) => {
        const existingProduct = cart.find(item => item.id === productId);
        if (existingProduct) {
            setCart(cart.map(item =>
                item.id === productId ? { ...item, count: item.count + 1 } : item
            ));
        } else {
            const product = products.find(p => p.id === productId);
            setCart([...cart, { ...product, count: 1 }]);
        }
    };
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const sortedProducts = filteredProducts.sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        } else if (sortBy === 'price') {
            return a.price - b.price;
        }
        return 0;
    });
    const totalPrice = cart.reduce((acc, item) => acc + item.price * item.count, 0);

    return (
        <div className='catalog-web'>
            <h1>КАТАЛОГ</h1>

            <div className="sort">
                <label>
                    Сортировать по:
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ marginLeft: '10px' }}>
                        <option value="name">Название</option>
                        <option value="price">Цена</option>
                    </select>
                </label>
                <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <ProductList
                products={sortedProducts}
                handleAddProduct={handleAddProduct}
            />

            <img className="cartIcon" src={images.bagIcon} onClick={() => setIsBasketVisible(!isBasketVisible)} />
            {isBasketVisible && (
                <Basket
                    cart={cart}
                    setIsBasketVisible={setIsBasketVisible}
                    setIsOrderVisible={setIsOrderVisible}
                    setCart={setCart}
                    totalPrice={totalPrice}
                />
            )}

            {isOrderVisible &&
                <OrderForm
                    setIsBasketVisible={setIsBasketVisible}
                    setIsOrderVisible={setIsOrderVisible}
                    totalPrice={totalPrice}
                    cart={cart}
                />
            }
        </div>
    );
};

const ProductList = ({ products, handleAddProduct }) => {
    return (
        <div className="catalog">
            {products.map((product) => (
                <div key={product.id} className="product">
                    {product.isNew && <h3 className="new">NEW!</h3>}
                    <img src={product.image} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p className="price">{product.price} BYN</p>
                    <div className="product-controls">
                        <button onClick={() => handleAddProduct(product.id)} className="add-button">
                            ДОБАВИТЬ
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

const Basket = ({ cart, setIsBasketVisible, setIsOrderVisible, setCart, totalPrice }) => {
    const handleRemove = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    const handleIncrement = (productId) => {
        setCart(cart.map(item =>
            item.id === productId ? { ...item, count: item.count + 1 } : item
        ));
    };

    const handleDecrement = (productId) => {
        setCart(cart.map(item =>
            item.id === productId && item.count > 1 ? { ...item, count: item.count - 1 } : item
        ).filter(item => item.count > 0));
    };

    return (
        <div className='back'>
            <div className="basket">
                <h2>Корзина</h2>
                <img className="close" src={images.close} onClick={() => setIsBasketVisible(false)} />
                {cart.length === 0 ? (
                    <p>Корзина пуста</p>
                ) : (
                    <div className='cards'>
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <img className='basketImg' src={item.image} alt={item.name} />
                                <div>
                                    <h4>{item.name}</h4>
                                    <p>{item.price} BYN</p>
                                    <div className="counter">
                                        <button className='minus' onClick={() => handleDecrement(item.id)}>-</button>
                                        <span>{item.count}</span>
                                        <button onClick={() => handleIncrement(item.id)}>+</button>
                                    </div>
                                </div>
                                <button onClick={() => handleRemove(item.id)} className="remove-button">Удалить</button>
                            </div>
                        ))}
                        <h3>Итого: {totalPrice.toFixed(2)} BYN</h3>
                        <button className="Order" onClick={() => setIsOrderVisible(true)}>Заказать</button>
                    </div>
                )}
            </div>
        </div>
    );
};

const OrderForm = ({ setIsBasketVisible, setIsOrderVisible, totalPrice, cart }) => {
    const [formData, setFormData] = useState({ name: '', address: '', email: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (validator.isEmpty(formData.name)) newErrors.name = 'Имя обязательно для заполнения';
        if (validator.isEmpty(formData.address)) newErrors.address = 'Адрес обязателен для заполнения';
        if (validator.isEmpty(formData.email)) {
            newErrors.email = 'E-mail обязателен для заполнения';
        } else if (!validator.isEmail(formData.email)) {
            newErrors.email = 'Некорректный адрес электронной почты';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы

        if (!validateForm()) {
            return;
        }

        const { name, address, email } = formData;
        const data = {
            name,
            address,
            recipientEmail: email,
            totalPrice,
            cart,
        };

        try {
            const response = await fetch('http://localhost:5000/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            console.log('Письмо отправлено');
            setIsOrderVisible(false);
            setIsBasketVisible(false); 
        } catch (error) {
            console.error('Ошибка отправки:', error.message);
        }
    };

    return (
        <div className="back2">
            <div className="order-form">
                <h2>Форма заказа</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Имя</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Введите ваше имя"
                        />
                        {errors.name && <div className="error">{errors.name}</div>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="address">Адрес</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Введите ваш адрес"
                        />
                        {errors.address && <div className="error">{errors.address}</div>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Почта</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Введите вашу почту"
                        />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>

                    <div className="buttons">
                        <button type="button" className="cancel-btn" onClick={() => setIsOrderVisible(false)}>Отмена</button>
                        <button type="submit" className="submit-btn">Подтвердить</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default Catalog;