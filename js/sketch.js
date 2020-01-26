const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const divRanges = document.getElementById('div')
const divButtons = document.getElementById('divButtons')
const nSlider = document.createElement('input')
const scaleSlider = document.createElement('input')
const sizeSlider = document.createElement('input')
const angleSlider = document.createElement('input')
const randomButton = document.createElement('button')
const resetButton = document.createElement('button')

const nSliderLabel = document.createElement('label')
const scaleSliderLabel = document.createElement('label')
const sizeSliderLabel = document.createElement('label')
const angleSliderLabel = document.createElement('label')
const randomButtonLabel = document.createElement('label')
const resetButtonLabel = document.createElement('label')
nSliderLabel.innerText = "nBranches"
scaleSliderLabel.innerText = "branchScale"
sizeSliderLabel.innerText = "branchSize"
angleSliderLabel.innerText = "branchAngle"
nSlider.setAttribute("type", "range")
scaleSlider.setAttribute("type", "range")
sizeSlider.setAttribute("type", "range")
angleSlider.setAttribute("type", "range")
randomButton.innerHTML = "<span>Random</span> Button"
resetButton.innerHTML = "<span>Reset</span> Button"

nSlider.addEventListener('input', () => {
    nTimes = nSlider.value / 10
})
scaleSlider.addEventListener('input', () => {
    scale = scaleSlider.value / 100
})
sizeSlider.addEventListener('input', () => {
    length = sizeSlider.value * 2
})
angleSlider.addEventListener('input', () => {
    angle = mapValue(angleSlider.value, 0, 100, 0, Math.PI / 2)
})
randomButton.addEventListener('click', () => {
    randomValues()
})
resetButton.addEventListener('click', () => {
    setupValues()
})

divRanges.appendChild(nSliderLabel)
divRanges.appendChild(nSlider)
divRanges.appendChild(scaleSliderLabel)
divRanges.appendChild(scaleSlider)
divRanges.appendChild(sizeSliderLabel)
divRanges.appendChild(sizeSlider)
divRanges.appendChild(angleSliderLabel)
divRanges.appendChild(angleSlider)
divButtons.appendChild(randomButton)
divButtons.appendChild(resetButton)

const width = window.screen.height / 1.8
const height = window.screen.height / 1.8
canvas.width = width
canvas.height = height
nSlider.value = 75
scaleSlider.value = 66.6
sizeSlider.value = 60
angleSlider.value = 25
let nTimes;
let scale;
let length;
let angle;
setupValues()

function setupValues() {
    nSlider.value = 75
    scaleSlider.value = 67
    sizeSlider.value = 60
    angleSlider.value = 25
    nTimes = nSlider.value / 10
    scale = scaleSlider.value / 100
    length = sizeSlider.value * 4
    angle = mapValue(angleSlider.value, 0, 100, 0, Math.PI / 2)
}

function randomValues() {
    nSlider.value = getRandomInt(0, 100)
    scaleSlider.value = getRandomInt(0, 100)
    sizeSlider.value = getRandomInt(0, 100)
    angleSlider.value = getRandomInt(0, 100)
    nTimes = nSlider.value / 10
    scale = scaleSlider.value / 100
    length = sizeSlider.value * 4
    angle = mapValue(angleSlider.value, 0, 100, 0, Math.PI / 2)
}

function draw() {
    branch(length, nTimes, angle)
}

function clear() {
    ctx.clearRect(-2 * width, -2 * height, 4 * width, 4 * height)
    ctx.resetTransform();
    ctx.translate(width / 2, height)
    ctx.strokeStyle = Color.PINK.hex()
    ctx.lineWidth = 3
}

function branch(d, n, α) {
    line(0, 0, 0, -d)
    ctx.translate(0, -d)
    if (n > 0) {
        ctx.save()
        ctx.rotate(α)
        branch(d * scale, n - 1, α)
        ctx.restore()
        ctx.rotate(-α)
        branch(d * scale, n - 1, α)
    }
}

function line(x1, y1, x2, y2) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
}

setInterval(() => {
    clear()
    draw()
}, getMs(60));