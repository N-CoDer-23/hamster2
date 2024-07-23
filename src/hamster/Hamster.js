import React, { useState, useEffect } from 'react';
import './Hamster.css';
import sefy from "../assets/closed.png";
import kalendar from "../assets/planner.png";
import search from "../assets/search-dollar.png";
import lion from "../assets/hmas.jpg";
import coin from "../assets/dollar.png";
import sett from "../assets/settings.png";
import bnc from "../assets/coin.png";
import mine from "../assets/bitcoin.png";
import friend from "../assets/friends s.png";
import earn from "../assets/earnings.png";
import ton from "../assets/currency.png";
import energ from '../assets/lighting.png';
import { useTelegram } from "../hook/Web";

const translations = {
    en: {
        balance: "Balance",
        tasks: "Task List",
        dailyCode: "Daily Code",
        dailyCombination: "Daily Combination",
        settings: "Settings",
        selectLanguage: "Select Language",
        energy: "Energy",
        exchange: "Exchange",
        mine: "Mine",
        friends: "Friends",
        earn: "Earn",
        airdrop: "Airdrop",
        language: "Language",
        close: "x",
        boost: "Boost",
        fullEnergy: "Full Energy",
        boostLimitMessage: "Boost limit reached. Please try again tomorrow.",
        levelUpMessage: "You have been promoted to a new level!",
        grandmaster: "Grandmaster",
        lord: "Lord"
    },
    ru: {
        balance: "Баланс",
        tasks: "Список задач",
        dailyCode: "Ежедневный код",
        dailyCombination: "Ежедневная комбинация",
        settings: "Настройки",
        selectLanguage: "Выберите язык",
        energy: "Энергия",
        exchange: "Обмен",
        mine: "Шахта",
        friends: "Друзья",
        earn: "Заработать",
        airdrop: "Airdrop",
        language: "Язык",
        close: "x",
        boost: "Ускорение",
        fullEnergy: "Полная энергия",
        boostLimitMessage: "Достигнут лимит ускорения. Попробуйте снова завтра.",
        levelUpMessage: "Вы были повышены на новый уровень!",
        grandmaster: "Грандмастер",
        lord: "Лорд"
    },
    uz: {
        balance: "Balans",
        tasks: "Vazifalar ro'yxati",
        dailyCode: "Kundalik shifr",
        dailyCombination: "Kundalik kombinatsiya",
        settings: "Sozlamalar",
        selectLanguage: "Tilni tanlang",
        energy: "Energiya",
        exchange: "Almashish",
        mine: "Kon",
        friends: "Do'stlar",
        earn: "Daromad",
        airdrop: "Airdrop",
        language: "Til",
        close: "x",
        boost: "Tezlatish",
        fullEnergy: "To'liq energiya",
        boostLimitMessage: "Tezlatish limiti yetdi. Iltimos, ertaga qayta urinib ko'ring.",
        levelUpMessage: "Siz yangi darajaga ko'tarildingiz!",
        grandmaster: "Grandmaster",
        lord: "Lord"
    }
};

const Hamster = () => {
    const { onClose, increment } = useTelegram();
    const [count, setCount] = useState(0);
    const [language, setLanguage] = useState('en');
    const [showLanguageOptions, setShowLanguageOptions] = useState(false);
    const [showSettingsCard, setShowSettingsCard] = useState(false);
    const [showBoostCard, setShowBoostCard] = useState(false);
    const [showFullEnergy, setShowFullEnergy] = useState(false);
    const [energy, setEnergy] = useState(500);
    const [boostUsage, setBoostUsage] = useState(0);
    const [showBoostLimitMessage, setShowBoostLimitMessage] = useState(false);
    const [levelUpMessage, setLevelUpMessage] = useState('');
    const [showLevelUpCard, setShowLevelUpCard] = useState(false);

    useEffect(() => {
        const savedBoostUsage = parseInt(localStorage.getItem('boostUsage'), 10);
        if (!isNaN(savedBoostUsage)) {
            setBoostUsage(savedBoostUsage);
        }

        const intervalId = setInterval(() => {
            setBoostUsage(0);
            localStorage.setItem('boostUsage', 0);
        }, 10 * 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        const savedCount = parseInt(localStorage.getItem('count'), 10);
        if (!isNaN(savedCount)) {
            setCount(savedCount);
        }
    }, []);

    const handleTouch = (e) => {
        const numTouches = e.touches.length;
        increment(count, setCount, numTouches);
    }

    const [currentProfit, setCurrentProfit] = useState(1.31);
    const [previousProfit, setPreviousProfit] = useState(1.0);
    const [balance, setBalance] = useState(21159780);
    const [percentageIncrease, setPercentageIncrease] = useState(0);

    const [numbers, setNumbers] = useState([]);

    const updatePercentageIncrease = () => {
        const newPercentageIncrease = ((currentProfit - previousProfit) / previousProfit) * 1000;
        setPercentageIncrease(newPercentageIncrease);
    };

    const handleAvatarClick = () => {
        if (energy > 0) {
            setPreviousProfit(currentProfit);
            setBalance(prevBalance => {
                const newBalance = prevBalance + 10;
                if (newBalance >= 21160000) {
                    const savedLevel = localStorage.getItem('savedLevel');
                    if (savedLevel !== 'Lord') {
                        setLevelUpMessage(translations[language].levelUpMessage);
                        setShowLevelUpCard(true);
                        localStorage.setItem('savedLevel', 'Lord');
                    }
                }
                return newBalance;
            });
            setEnergy(prevEnergy => Math.max(prevEnergy - 10, 0));
            updatePercentageIncrease();
            const newNumber = { id: Date.now(), value: 10 };
            setNumbers(prevNumbers => [...prevNumbers, newNumber]);
            setTimeout(() => {
                setNumbers(prevNumbers => prevNumbers.filter(number => number.id !== newNumber.id));
            }, 2000);
        }
    };

    const handleSettingsClick = () => {
        setShowSettingsCard(!showSettingsCard);
    };

    const handleBoostClick = () => {
        if (boostUsage < 3) {
            setEnergy(1000);
            setBoostUsage(prevUsage => prevUsage + 1);
            localStorage.setItem('boostUsage', boostUsage + 1);
            setShowBoostLimitMessage(false);
        } else {
            setShowBoostLimitMessage(true);
        }
    };

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setShowSettingsCard(false);
    };

    const handleLanguageClick = () => {
        setShowLanguageOptions(!showLanguageOptions);
    };

    const [taskTimes, setTaskTimes] = useState({
        task1: 24 * 60 * 60 + 59 * 60,
        task2: 24 * 60 * 60 + 59 * 60,
        task3: 24 * 60 * 60 + 59 * 60
    });

    useEffect(() => {
        const savedTaskTimes = JSON.parse(localStorage.getItem('taskTimes'));
        if (savedTaskTimes) {
            setTaskTimes(savedTaskTimes);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('taskTimes', JSON.stringify(taskTimes));
    }, [taskTimes]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTaskTimes(prevTimes => {
                const newTimes = {};
                Object.keys(prevTimes).forEach(task => {
                    newTimes[task] = prevTimes[task] - 1;
                    if (newTimes[task] < 0) {
                        newTimes[task] = 10 - 1;
                    }
                });
                return newTimes;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        let intervalId;
        if (energy < 1000) {
            intervalId = setInterval(() => {
                setEnergy(prevEnergy => Math.min(prevEnergy + 1, 1000));
            }, 2000);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [energy]);

    const formatTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(seconds % 60).padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    };

    useEffect(() => {
        const savedLevel = localStorage.getItem('savedLevel');
        const currentLevel = balance >= 21160000 ? 'Lord' : 'Grandmaster';

        if (savedLevel !== currentLevel && currentLevel === 'Lord') {
            setLevelUpMessage(translations[language].levelUpMessage);
            setShowLevelUpCard(true);
            localStorage.setItem('savedLevel', currentLevel);
        }
    }, [balance, language]);

    const t = translations[language];
    const isGrandmaster = balance >= 21160000;
    const isAvatarDisabled = energy < 10; // Disable avatar if energy is less than 10

    return (
        <div className="hamster-kombat">
            <header className="header">
                <div className="header-left">
                    <img src={bnc} alt="Profile" className="profile-img" />
                    <div>
                        <h2> Azimjon ({isGrandmaster ? t.lord : 'Grandmaster'})</h2>
                        <p>Level: {isGrandmaster ? 'Lord' : 'Grandmaster 9 / 11'}</p>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${percentageIncrease}%` }}></div>
                        </div>
                    </div>
                </div>
                <div className="header-right">
                    <div className="profit">
                        <img src={coin} alt="Closed Icon" className="closed-icon" />
                        <span>+1M</span>
                        <img src={sett} alt="Settings Icon" className="settings-icon" onClick={handleSettingsClick} />
                    </div>
                </div>
            </header>
            <main className="main-content">
                {showSettingsCard && (
                    <div className="settings-card">
                        <div className="settings-card-header">
                            <button onClick={handleSettingsClick} className="close-btn">{t.close}</button>
                        </div>
                        <div className="settings-card-content">
                            <p>{t.selectLanguage}</p>
                            {showLanguageOptions && (
                                <div className="language-options">
                                    <button onClick={() => handleLanguageChange('en')}>English</button>
                                    <button onClick={() => handleLanguageChange('ru')}>Русский</button>
                                    <button onClick={() => handleLanguageChange('uz')}>O'zbek</button>
                                </div>
                            )}
                            <button onClick={handleLanguageClick}>{t.language}</button>
                            {showBoostLimitMessage && (
                                <div className="boost-limit-message">
                                    <p>{t.boostLimitMessage}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {showLevelUpCard && (
                    <div className="level-up-card">
                        <div className="level-up-content">
                            <p>{levelUpMessage}</p>
                            <button onClick={() => setShowLevelUpCard(false)}>{t.close}</button>
                        </div>
                    </div>
                )}
                <div className="tasks">
                    <div className="task">
                        <img src={kalendar} alt="Task Icon" className="closed-icon" />
                        <p>{t.tasks}</p>
                        <span>{formatTime(taskTimes.task1)}</span>
                    </div>
                    <div className="task">
                        <img src={sefy} alt="Task Icon" className="closed-icon" />
                        <p>{t.dailyCode}</p>
                        <span>{formatTime(taskTimes.task2)}</span>
                    </div>
                    <div className="task">
                        <img src={search} alt="Task Icon" className="closed-icon" />
                        <p>{t.dailyCombination}</p>
                        <span>{formatTime(taskTimes.task3)}</span>
                    </div>
                </div>
                <div className="balance">
                    <h1>
                        <img src={coin} alt="Dollar Icon" className="balance-icon" />
                        {balance.toLocaleString()}
                    </h1>
                </div>
                <div className="avatar-container">
                    <div 
                        className={`avatar ${isAvatarDisabled ? 'disabled' : ''}`} 
                        onClick={!isAvatarDisabled ? handleAvatarClick : undefined} 
                        onTouchStart={!isAvatarDisabled ? handleTouch : undefined}
                    >
                        <img src={lion} alt="Hamster Avatar" />
                        {numbers.map(number => (
                            <div key={number.id} className="number-overlay">+{number.value}</div>
                        ))}
                    </div>
                    <div className="energy">
                        <h2><img src={energ} alt="Energy Icon" />: {energy}</h2>
                    </div>
                    <button className='boost_dizayn' onClick={handleBoostClick}>{t.boost}</button>
                </div>
                {showFullEnergy && (
                    <div className="full-energy-card">
                        <div className="full-energy-content">
                            <img src={energ} alt="Energy Icon" />
                            <p>{t.fullEnergy}</p>
                        </div>
                    </div>
                )}
            </main>
            <footer className="footer">
                <div className="footer-item">
                    {t.exchange}
                    <img src={bnc} alt="Hamster Avatar" className='footer-icon' />
                </div>
                <div className="footer-item">
                    {t.mine}
                    <img src={mine} alt="Hamster Avatar" className='footer-icon' />
                </div>
                <div className="footer-item">
                    {t.friends}
                    <img src={friend} alt="Hamster Avatar" className='footer-icon' />
                </div>
                <div className="footer-item">
                    {t.earn}
                    <img src={earn} alt="Hamster Avatar" className='footer-icon' />
                </div>
                <div className="footer-item">
                    {t.airdrop}
                    <img src={ton} alt="Hamster Avatar" className='footer-icon' />
                </div>
            </footer>
        </div>
    );
};

export default Hamster;
