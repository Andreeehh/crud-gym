export const mapOptionToEnglish = (
  selectedOptionPTBR,
  optionsPTBR,
  optionsEnglish,
) => {
  const index = optionsPTBR.indexOf(selectedOptionPTBR);
  if (index !== -1) {
    return optionsEnglish[index];
  }
  return null;
};

export const mapOptionToPortuguese = (
  selectedOption,
  optionsPTBR,
  optionsEnglish,
) => {
  const index = optionsEnglish.indexOf(selectedOption);
  if (index !== -1) {
    return optionsPTBR[index];
  }
  return null;
};
