const showPrintPages = () => {
    const A4_HEIGHT = 1122; // ~A4 height in px @ 96dpi
    const paddingBuffer = 60; // adjust based on padding and line height
  
    const content = document.getElementById("output");
    const measureBox = document.getElementById("measure-box");
    const originalNodes = Array.from(content.childNodes).filter(
      node => !(node.nodeType === Node.TEXT_NODE && !/\S/.test(node.textContent))
    );
  
    const output = document.createElement("div");
    let currentPage = document.createElement("div");
    currentPage.className = "print-page";
  
    let workingContainer = document.createElement("div");
  
    for (let i = 0; i < originalNodes.length; i++) {
      const node = originalNodes[i];
      const clone = node.cloneNode(true);
      workingContainer.appendChild(clone);
  
      measureBox.innerHTML = "";
      measureBox.appendChild(workingContainer.cloneNode(true));
  
      const height = measureBox.scrollHeight;
  
      if (height > (A4_HEIGHT - paddingBuffer)) {
        // Page full, push currentPage and start new
        output.appendChild(currentPage);
  
        currentPage = document.createElement("div");
        currentPage.className = "print-page";
  
        currentPage.appendChild(clone);
  
        workingContainer.innerHTML = "";
        workingContainer.appendChild(clone.cloneNode(true));
      } else {
        currentPage.appendChild(clone);
      }
  
      // keep workingContainer synced
      workingContainer.innerHTML = currentPage.innerHTML;
    }
  
    output.appendChild(currentPage);
    content.replaceWith(output);
  };
  
  document.addEventListener("DOMContentLoaded", showPrintPages);
  