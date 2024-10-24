import React from "react";
import NumSet from "./NumSet";
import CrossSvg from "./icons/CrossSvg";

const ModalSettings = ({ handleClose, settings, setSettings }) => {
  const handleContainerClick = (e) => {
    e.stopPropagation(); // Останавливаем всплытие события
  };
  const handleToggleNumber = (number) => {
    setSettings((prevSettings) => {
      // Проверяем, есть ли число в selectedPull
      const isSelected = prevSettings.selectedPull.includes(number);
      if (prevSettings.selectedPull.length <= 2 && isSelected)
        return prevSettings;

      // Если есть - убираем, если нет - добавляем
      const updatedSelectedPull = isSelected
        ? prevSettings.selectedPull.filter((n) => n !== number) // Убираем число
        : [...prevSettings.selectedPull, number]; // Добавляем число

      return {
        ...prevSettings,
        selectedPull: updatedSelectedPull,
      };
    });
  };
  const handlerOnChange = (e)=>{
    const content = e.target.value
    if (/^\d{0,2}$/.test(content)) {
       
        setSettings({...settings, countProblem: content});
      }
  }
  return (
    <div
      onClick={handleClose}
      className="fixed w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
    >
      <div
        onClick={handleContainerClick}
        className="max-w-[400px] max-h-[600px] w-full h-full bg-white flex items-center flex-col relative"
      >
        <span onClick={handleClose} className="w-[50px] absolute right-[5px] top-2 cursor-pointer"><CrossSvg/></span>
        <h2 className="p-2 text-xl font-bold">Настроки</h2>
        <h2 className="text-lg font-bold my-2">Используемые значения</h2>
        <ul className="grid grid-cols-4 gap-4 my-4 max-w-[100%] ">
          {settings.pull.map((num, index) => {
            const isInPull = settings.selectedPull.includes(num);
            return (
              <NumSet
                value={num}
                active={isInPull}
                onClick={() => {
                  handleToggleNumber(num);
                }}
                key={index}
              />
            );
          })}
        </ul>
        <div className="flex w-full pl-4 text-lg">
          <p className="m-2 font-bold "> {`Количество задач `} </p>
          <input
            type="tel"
            className=" max-w-12 border rounded-md m-2 p-0 flex px-2"
            value={settings.countProblem}
            onChange={handlerOnChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalSettings;
