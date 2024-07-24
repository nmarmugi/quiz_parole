import styles from './App.module.css';
import Select from './components/Select/Select';
import Option from './components/Option/Option.jsx';
import Letter from './components/Letter/Letter.jsx';
import Alphabeth from './components/Alphabeth/Alphabeth.jsx';
import { arrayCategory, arrayObj, alphabeth } from './assets/Data/data.jsx';
import { useEffect, useState } from 'react';
import Modal from './components/Modal/Modal.jsx';

const reset = [];

function App() {
  const [selectValue, setSelectValue] = useState('');
  const [phrase, setPhrase] = useState(reset);
  const [alphabethArray, setAlphabethArray] = useState(reset);
  const [count, setCount] = useState(3);
  const [score, setScore] = useState(0);
  const [modal, setModal] = useState(false);
  const [lose, setLose] = useState(false);

  function handleChange(e) {
    const value = e.target.value;
    setSelectValue(value);
  }

  function randomPhrase() {
    const filteredArray = arrayObj.filter(element => element.category === selectValue);
    if (filteredArray.length === 0) return;

    const randomIndex = Math.floor(Math.random() * filteredArray.length);
    const phraseSelected = filteredArray[randomIndex];
    const phraseInArray = phraseSelected.frase.split('').filter(carattere => /[a-zA-ZÀ-ÿ\s']/u.test(carattere));

    const newPhrase = phraseInArray.map((element, index) => ({
      id: index,
      value: element,
      isClick: false,
      bgBlack: randomBoolean()
    }));
    return newPhrase;
  }

  function mapAlphabeth() {
    const alphabethArray = alphabeth.map(element => ({
      letter: element,
      isClick: false
    }));
    setAlphabethArray(alphabethArray);
  }

  useEffect(() => {
    if (!selectValue) return;
    mapAlphabeth();
    setPhrase(reset);
    setPhrase(randomPhrase());
  }, [selectValue]);

  function randomBoolean() {
    const arrayClass = [true, false];
    const randomIndex = Math.floor(Math.random() * arrayClass.length);
    return arrayClass[randomIndex];
  }

  function handleClick(e) {
    const trigger = e.target.textContent;
    const findLetter = alphabethArray.map(element => element.letter === trigger ? { ...element, isClick: true } : element);
    setAlphabethArray(findLetter);

    const alphabetLetter = e.target.innerHTML.toLowerCase();
    const updateCount = phrase.find(element => alphabetLetter === element.value.toLowerCase() && element.bgBlack === true);
    if (!updateCount) {
      if (count === 0) return;
      setCount(count - 1);
    }

    const updatedPhrase = phrase.map(element => 
      element.value.toLowerCase() === alphabetLetter
      ? { ...element, isClick: true, bgBlack: false }
      : element
    );

    setPhrase(updatedPhrase);
  }

  useEffect(() => {
    if (count === 0) {
      setLose(true);
    }
  }, [count]);

  useEffect(() => {
    const score = phrase.filter(element => element.bgBlack === true);
    const allValuesAreSpaces = score.every(element => element.value === ' ');
    if (selectValue && allValuesAreSpaces) {
      mapAlphabeth()
      setScore(prevScore => prevScore + 1);
      setPhrase(randomPhrase());
      setModal(true);
      setTimeout(() => {
        setModal(false);
      }, 2000);
    }
  }, [phrase]);

  function handleReset() {
    window.location.reload();
  }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.score}>
          <h2>Score: {score}</h2>
          <img className={styles.icon} src="/img/ranking_12808792.png" alt="" />
        </div>
        <div className={styles.vite}>
          <h2>Vite:</h2>
          {count === 0 && <img className={styles.icon} src="/img/0-life.png" alt="Icona cuore" />}
          {count > 0 && <img className={styles.icon} src="/img/daily-health-app_7102731.png" alt="Icona cuore" />}
          {count > 1 && <img className={styles.icon} src="/img/daily-health-app_7102731.png" alt="Icona cuore" />}
          {count === 3 && <img className={styles.icon} src="/img/daily-health-app_7102731.png" alt="Icona cuore" />}
        </div>
        <Select onChange={handleChange}>
          <option value="">Seleziona categoria</option>
          {arrayCategory.map(category => (
            <Option key={category} value={category} textOption={category} />
          ))}
        </Select>
        <h1>{selectValue}</h1>
        <div className={styles.containerPhrases}>
          {selectValue ? (
            <div className={styles.containerLetters}>
              {phrase.map(letter => (
                <Letter 
                  isClicked={letter.isClick} 
                  key={letter.id}
                  classLetter={/[a-zA-Z]/.test(letter.value) ? letter.bgBlack ? styles.opacity : '' : ''} 
                  bgWhite={styles.noOpacity} 
                  letter={letter.value} 
                />
              ))}
            </div>
          ) : (
            <div className={styles.initial}>
              <h2>Seleziona una categoria</h2>
              <img className={styles.imgCategory} src="/img/infographic-elements_16335480.png" alt="Icona category" />
            </div>
          )}
        </div>
        {selectValue && (
          <div className={styles.alphabeth}>
            {alphabethArray.map((item, index) => (
              <Alphabeth 
                key={index} 
                letter={item.letter} 
                isClick={item.isClick} 
                onClick={handleClick} 
              />
            ))}
          </div>
        )}
      </div>
      <Modal isOpen={modal}><h1>🎆 Congratulazioni 🎆</h1></Modal>
      <Modal isOpen={lose}><h1>🆘 Hai perso! 🆘</h1><button className={styles.button} onClick={handleReset}>Riprova</button></Modal>
    </>
  );
}

export default App;
