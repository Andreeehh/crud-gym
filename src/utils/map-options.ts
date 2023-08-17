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
