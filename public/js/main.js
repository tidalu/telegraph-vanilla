const title = document.querySelector(".title");
const author = document.querySelector(".author");

const templateElement = `
<div class="editable" dir='auto' contenteditable=true  ></div>
`;

function addEventListeners(container) {
  const saveButton = document.querySelector(".save");
  const publishButton = document.querySelector(".publish");
  const itemsFunc = document.querySelector(".itemsFunc");
  const mainContainer = document.querySelector(".mainContainer");
  const editable = container;
  let caretPosition = null;

  editable.setAttribute("contenteditable", "true");

  if (saveButton && publishButton) {
    saveButton.addEventListener("click", () => {
      editable.setAttribute("contenteditable", "true");
      editable.focus();
      caretUtils(editable).setCaret()
      saveButton.classList.toggle("hide");
      publishButton.classList.toggle("hide");
    });

    publishButton.addEventListener("click", () => {
      try {
        let isTitleEmpty = title.innerText.trim().length === 0;
        let isAuthorEmpty = author.innerText.trim().length === 0;
      
        if (isTitleEmpty) {
          title.focus();
          title.style.setProperty("--after-color-title", "red");
          console.log("Title is empty, color set to red.");
        }
      
        if (isAuthorEmpty) {
          author.focus();
          author.style.setProperty("--after-color-author", "red");
          console.log("Author is empty, color set to red.");
        }
      
        // Only proceed with the else block if both title and author are non-empty
        if (!isTitleEmpty && !isAuthorEmpty) {
          // Reset colors if both fields are filled
          author.style.setProperty("--after-color-author", "rgba(0, 0, 0, 0.8)");
          title.style.setProperty("--after-color-title", "rgba(0, 0, 0, 0.8)");
      
          // Lock the editable field and toggle the button visibility
          editable.setAttribute("contenteditable", "false");
          console.log('falsen');
          saveButton.classList.toggle("hide");
          publishButton.classList.toggle("hide");
          console.log("Title and Author are both filled. Editing locked.");
        }
      } catch (error) {
        console.error("An error occurred during the publish process:", error);
      }
      
    });
    
  }

  editable.addEventListener("focus", () => {
    if (editable.textContent.trim().length >= 1) {
      editable.removeAttribute("data-placeholder-visible");
    }
    if (saveButton.classList.contains("hide")) {
      const mainLeft = getPosition(mainContainer).x;
      const editableTop = getPosition(editable).y;
      const editableHeight = editable.offsetHeight;
      const itemsHeight = itemsFunc.offsetHeight;
      const centeredTop = editableTop + editableHeight / 2 - itemsHeight / 2;
      const itemsWidth = itemsFunc.offsetWidth;
      let leftPosition;

      if (window.innerWidth < 960) {
        leftPosition = (window.innerWidth - itemsWidth) / 2;
      } else {
        leftPosition = mainLeft - itemsWidth;
      }

      itemsFunc.style.opacity = "1";
      itemsFunc.style.left = `${leftPosition}px`;
      itemsFunc.style.top = `${centeredTop + window.scrollY}px`;
    }
  });
  editable.addEventListener("input", (e) => {
    const isEmpty = editable.textContent.trim().length === 0;
    if (!isEmpty) {
      itemsFunc.style.opacity = "0";
      editable.removeAttribute("data-placeholder-visible");
    } else {
      itemsFunc.style.opacity = "1";
      togglePlaceholder(editable);
    }
  });

  editable.addEventListener("keyup", () => {
    caretPosition = caretUtils(editable).getCaret();
  });

  editable.addEventListener("blur", () => {
    updateItemsFuncPosition();
    togglePlaceholder(editable);
  });

  editable.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      const nextElement = container.nextElementSibling;
      if (nextElement) {
        nextElement.focus();
        caretUtils(nextElement).setCaret()
      } else {
        addNewTextContainer(e.target);
      }
    }

    if (e.code === "Backspace" && e.target.textContent.trim().length === 0) {
      const prevElement = container.previousElementSibling;
      if (prevElement) {
        prevElement.focus();
        caretUtils(prevElement).setCaret()
        if (prevElement.classList.contains("editable")) e.target.remove();
      } else {
        return;
      }
    } else if (e.code === "Backspace" && caretPosition === 0) {
      const prevElement = container.previousElementSibling;
      if (prevElement) {
        prevElement.focus();
        caretUtils(prevElement).setCaret()
      }
    }
  });

  editable.addEventListener("input", (e) => {
    togglePlaceholder(editable);
  });

  function updateItemsFuncPosition() {
    itemsFunc.style.opacity = "0";
  }

  function togglePlaceholder(editable) {
    if (!editable.textContent.trim()) {
      editable.setAttribute("data-placeholder-visible", true);
    } else {
      editable.removeAttribute("data-placeholder-visible");
    }
  }

  updateItemsFuncPosition();
  togglePlaceholder(editable);
  window.addEventListener("resize", updateItemsFuncPosition);
}

function modifHeader(container) {
  const saveButton = document.querySelector(".save");
  const publishButton = document.querySelector(".publish");

  const editHeader = container;

  let caretPosition = null;

  editHeader.setAttribute("contenteditable", "true");

  if (saveButton && publishButton) {
    saveButton.addEventListener("click", () => {
      editHeader.setAttribute("contenteditable", "true");
      saveButton.classList.toggle("hide");
      publishButton.classList.toggle("hide");
    });

    publishButton.addEventListener("click", () => {
      try {
        let isTitleEmpty = title.innerText.trim().length === 0;
        let isAuthorEmpty = author.innerText.trim().length === 0;
      
        if (isTitleEmpty) {
          title.focus();
          title.style.setProperty("--after-color-title", "red");
          console.log("Title is empty, color set to red.");
        }
      
        if (isAuthorEmpty) {
          author.focus();
          author.style.setProperty("--after-color-author", "red");
          console.log("Author is empty, color set to red.");
        }
      
        // Only proceed with the else block if both title and author are non-empty
        if (!isTitleEmpty && !isAuthorEmpty) {
          // Reset colors if both fields are filled
          author.style.setProperty("--after-color-author", "rgba(0, 0, 0, 0.8)");
          title.style.setProperty("--after-color-title", "rgba(0, 0, 0, 0.8)");
      
          // Lock the editable field and toggle the button visibility
          editable.setAttribute("contenteditable", "false");
          console.log('falsen');
          saveButton.classList.toggle("hide");
          publishButton.classList.toggle("hide");
          console.log("Title and Author are both filled. Editing locked.");
        }
      } catch (error) {
        console.error("An error occurred during the publish process:", error);
      }
      
    });
  }

  editHeader.addEventListener("input", (e) => {
    const isEmpty = editHeader.textContent.trim().length === 0;

    if (!isEmpty) {
      editHeader.removeAttribute("data-placeholder-visible");
    } else {
      togglePlaceholder(editHeader);
    }

    editHeader.style.setProperty(
      "--display-pseudo",
      isEmpty ? "none" : "inline"
    );
  });

  editHeader.addEventListener("focus", (e) => {
    if (e.target.textContent.trim().length > 0) {
      e.target.style.setProperty("--display-pseudo", "inline");
    } else {
      e.target.style.setProperty("--display-pseudo", "none");
    }
  });

  editHeader.addEventListener("blur", (e) => {
    e.target.style.setProperty("--display-pseudo", "none");
  });

  editHeader.addEventListener("keyup", () => {
    caretPosition = caretUtils(editHeader).getCaret();
  });

  editHeader.addEventListener("blur", () => {
    togglePlaceholder(editHeader);
  });

  editHeader.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      e.preventDefault();
      const nextElement = container.nextElementSibling;
      if (nextElement) {
        caretUtils(nextElement).setCaret()
        nextElement.focus();
      } else return;
    }

    if (e.code === "Backspace") {
      const prevElement = container.previousElementSibling;
      if (prevElement?.classList.contains("topics")) {
        if (e.target.textContent.trim().length === 0 || caretPosition === 0) {
          prevElement.focus();
          caretUtils(prevElement).setCaret()
        }
      }
    }
  });

  function togglePlaceholder(editable) {
    if (!editable.textContent.trim()) {
      editable.setAttribute("data-placeholder-visible", true);
    } else {
      editable.removeAttribute("data-placeholder-visible");
    }
  }
  togglePlaceholder(editHeader);
}

function addNewTextContainer(currentElement) {
  const newElement = document
    .createRange()
    .createContextualFragment(templateElement).firstElementChild;
  if (!newElement) return;

  currentElement.insertAdjacentElement("afterend", newElement);
  addEventListeners(newElement);

  if (newElement.focus) {
    newElement.focus();
    caretUtils(newElement).setCaret()
  }

  newElement.classList.add("no-before");
}

function getPosition(element) {
  var rect = element.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
  };
}

function caretUtils(editable) {
  return {
    getCaret: function () {
      const selection = window.getSelection();
      if (!selection.rangeCount) return 0;

      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editable);
      preCaretRange.setEnd(range.endContainer, range.endOffset);

      return preCaretRange.toString().length;
    },

    setCaret: function () {
      const range = document.createRange();
      range.selectNodeContents(editable);
      range.collapse(false);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    },
  };
}

document.querySelectorAll(".editable").forEach(addEventListeners);
document.querySelectorAll(".topics").forEach(modifHeader);
