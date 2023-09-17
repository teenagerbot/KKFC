const highlight = () => {
  const inputs = document.querySelectorAll("input");
  const selects = document.querySelectorAll("select");
  inputs.forEach(input => {
    if (input.value) {
      input.style.background = "#76dc7670"
    } else {
      input.style.background = "pink";
    }
  })
  selects.forEach(input => {
    if (input.value && input.value != "Оберіть") {
      input.style.background = "#76dc7670"
    } else {
      input.style.background = "pink";
    }
  })
}