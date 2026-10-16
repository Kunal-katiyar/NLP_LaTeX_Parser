
function getCanvasButtons() {
    const main_button = document.getElementById("main-btn");
    if (!main_button) return null;
    const inner_btns = main_button.querySelectorAll<HTMLElement>(".inner-btn")
    if (!inner_btns || (inner_btns.length == 0)) return null;
    return {main_button, inner_btns};
}

export function arrangeInCircle() {
    const buttons = getCanvasButtons();
    if (!buttons) return;

    const {main_button, inner_btns} = buttons;
    const total = inner_btns.length;
    const r = 3 * 16;

    const centerX = main_button.offsetWidth / 2;
    const centerY = main_button.offsetHeight / 2;

    inner_btns.forEach((btn: HTMLElement, index: number) => {
        const angle = (index * 2 * Math.PI) / total;

        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);

        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
    })
}

export function resetInnerPositions() {
    const buttons = getCanvasButtons();
    if (!buttons) return;

    const { main_button, inner_btns } = buttons;
    const centerX = main_button.offsetWidth / 2;
    const centerY = main_button.offsetHeight / 2;
 
    inner_btns.forEach((btn) => {
        btn.style.left = `${centerX}px`;
        btn.style.top = `${centerY}px`;
    });
}