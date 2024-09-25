// Load PDF
const pdfUrl = 'http://127.0.0.1:8080/The-Mom-Test-en.pdf'; // Put a valid URL here
const pdfContainer = document.getElementById('pdf-content');
let scrollInterval;
let scrollSpeed = 2;

pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {
  for (let i = 1; i <= pdf.numPages; i++) {
    pdf.getPage(i).then(page => {
      const canvas = document.createElement('canvas');
      pdfContainer.appendChild(canvas);
      const viewport = page.getViewport({ scale: 1.5 });
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const context = canvas.getContext('2d');
      page.render({
        canvasContext: context,
        viewport: viewport,
      });
    });
  }
});

// Scrolling function
function startScrolling() {
  scrollInterval = setInterval(() => {
    pdfContainer.scrollTop += scrollSpeed;
  }, 50);
}

function stopScrolling() {
  clearInterval(scrollInterval);
}

// Control Buttons
document.getElementById('play-btn').addEventListener('click', startScrolling);

document.getElementById('pause-btn').addEventListener('click', () => {
  clearInterval(scrollInterval);
});

document.getElementById('stop-btn').addEventListener('click', () => {
  stopScrolling();
  pdfContainer.scrollTop = 0;
});

document.getElementById('faster-btn').addEventListener('click', () => {
  scrollSpeed += 1;
});

document.getElementById('slower-btn').addEventListener('click', () => {
  if (scrollSpeed > 1) scrollSpeed -= 1;
});
