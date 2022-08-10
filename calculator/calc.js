const range = document.getElementById('cost-range');
const costValue = document.querySelector('.range-value');

costValue.innerHTML = range.value;

range.oninput = function() {
    costValue.innerHTML = this.value;
}

range.addEventListener('mousemove', () =>
{
    let percent = range.value / 150;
    let clr = `linear-gradient(to right, lightgray ${percent}%, white ${percent}%)`;
    range.style.background = clr;
})