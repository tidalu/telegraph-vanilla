const title = document.querySelector('.title')
const titleFunc = document.querySelector('.titleBef')
const author = document.querySelector('.author')
const authorFunc = document.querySelector('.authorBef')






const templateElement = `<div class='textContainer'>
<div class="editable blinking-caret" dir='auto' contenteditable=true  data-placeholder="Type here..."></div>
</div>`

function addEventListeners(container) {
  const saveButton = document.querySelector('.save');
  const publishButton = document.querySelector('.publish');
  const itemsFunc = document.querySelector('.itemsFunc');
  const main = document.querySelector('.main')
  const mainContainer = document.querySelector('.mainContainer')
  const editable = container.querySelector('.editable');
  let caretPosition = null;
  const placeholder = editable.getAttribute('data-placeholder')
  let innerLength = 0; 


  editable.setAttribute("contenteditable", "true");

  if (saveButton && publishButton) {
    saveButton.addEventListener('click', () => {
      editable.setAttribute("contenteditable", "true");
      editable.focus();
      caretUtils(editable).setCaret()
      saveButton.classList.toggle('hide');
      publishButton.classList.toggle('hide');
    });

    publishButton.addEventListener('click', () => {
      editable.setAttribute("contenteditable", "false");
      saveButton.classList.toggle('hide');
      publishButton.classList.toggle('hide');
    });
  }

  editable.addEventListener('focus', () => {
    if(editable.textContent.trim().length >= 1) {
      
      editable.removeAttribute('data-placeholder-visible');
    }
    if (saveButton.classList.contains('hide')) {
      const mainLeft = getPosition(mainContainer).x;
      const itemsWidth = itemsFunc.offsetWidth;
      itemsFunc.style.left = `${mainLeft - itemsWidth}px`;
      itemsFunc.style.top = `${getPosition(container).y + window.scrollY + container.getBoundingClientRect().height / 2 - itemsFunc.getBoundingClientRect().height / 2}px`;

    }
  });
  editable.addEventListener('input', (e) => {
    innerLength = editable.textContent - 1
  })

  editable.addEventListener('keyup', () => {
    caretPosition = caretUtils(editable).getCaret()
  })

  editable.addEventListener('blur', () => {
    updateItemsFuncPosition()
    togglePlaceholder(editable)
  });



  editable.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      const nextElement = container.nextElementSibling;
      if (nextElement) {
        nextElement.querySelector('.editable').focus();
        caretUtils(nextElement).setCaret(nextElement)
      } else {
        addNewTextContainer();

      }
    }

    if (e.code === 'Backspace' && e.target.textContent.trim().length === 0) {
      const prevElement = container.previousElementSibling;
      if (prevElement && prevElement.classList.contains('textContainer')) {
        prevElement.querySelector('.editable').focus();
        caretUtils(prevElement).setCaret(prevElement) 
        e.target.parentNode.remove()
      } else {
        return
      }
    } else if (e.code === 'Backspace' && caretPosition === 0) {
      const prevElement = container.previousElementSibling;
      console.log(prevElement.childNodes)
      if (prevElement && prevElement.classList.contains('textContainer')) {
        prevElement.querySelector('.editable').focus();
        caretUtils(prevElement).setCaret(prevElement)
      }
    }
  });

  editable.addEventListener('input', (e) => {
    togglePlaceholder(editable);
    innerLength = e.target.innerText - 1
  });





  function updateItemsFuncPosition() {
    const mainLeft = getPosition(mainContainer).x;
    const itemsWidth = itemsFunc.offsetWidth;
    itemsFunc.style.left = `${mainLeft + itemsWidth}px`;
    itemsFunc.style.top = `${itemsFunc.style.top = `${getPosition(container).y + container.getBoundingClientRect().height / 2 - itemsFunc.getBoundingClientRect().height / 2}px`}`


  }


  function togglePlaceholder(editable) {
    
      if (!editable.textContent.trim()) {
        editable.setAttribute('data-placeholder-visible', true)
        
      } else {
        editable.removeAttribute('data-placeholder-visible')
      }
    
  }

  updateItemsFuncPosition();
  togglePlaceholder(editable)
  window.addEventListener('resize', updateItemsFuncPosition);

}


function modifHeader(container) {
  const saveButton = document.querySelector('.save');
  const publishButton = document.querySelector('.publish');
  const mainContainer = document.querySelector('.mainContainer')
  const main = document.querySelector('.main')
  const header = document.querySelector('.header');
  
  
  const editHeader = container.querySelector('.editHeader');
  
  let caretPosition = null;

  editHeader.setAttribute("contenteditable", "true");

  if (saveButton && publishButton) {
    saveButton.addEventListener('click', () => {
      editHeader.setAttribute("contenteditable", "true");
      saveButton.classList.toggle('hide');
      publishButton.classList.toggle('hide');
    });

    publishButton.addEventListener('click', () => {
      editHeader.setAttribute("contenteditable", "false");
      saveButton.classList.toggle('hide');
      publishButton.classList.toggle('hide');
    });
  }

  editHeader.addEventListener('input', () => {
    if(editHeader.textContent.trim().length > 0) {
      editHeader.removeAttribute('data-placeholder-visible');
    } else {
      togglePlaceholder(editHeader)
    }
  });


  editHeader.addEventListener('keyup', () => {
    caretPosition = caretUtils(editHeader).getCaret()
  })

  editHeader.addEventListener('blur', () => {
    togglePlaceholder(editHeader)
  });

  editHeader.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      const nextElement = container.nextElementSibling;
      if (nextElement) {
        nextElement.querySelector('.editHeader').focus();
      } 
    }

    if (e.code === 'Backspace') {
      const prevElement = container.previousElementSibling;
      if (prevElement?.classList.contains('topics')) {
        if (e.target.textContent.trim().length === 0 || caretPosition === 0) {
          prevElement.querySelector('.editHeader').focus();
          moveCaretToEnd(prevElement);
        }
      }
    }
    
  });

  editHeader.addEventListener('select', (e) => {
    // nothing
  })

  function togglePlaceholder(editable) {
    if (!editable.textContent.trim()) {
      editable.setAttribute('data-placeholder-visible', true)
  
    } else {
      editable.removeAttribute('data-placeholder-visible')
    }
  }
  togglePlaceholder(editHeader)

}



function addNewTextContainer() {
  const newElement = document.createRange().createContextualFragment(templateElement);
  document.querySelector('.mainContainer').appendChild(newElement);
  addEventListeners(document.querySelector('.mainContainer').lastElementChild);
  const editable = document.querySelector('.mainContainer').lastElementChild.querySelector('.editable')
  editable.focus();
  editable.classList.add('no-before')
}

function getPosition(element) {
  var rect = element.getBoundingClientRect();
  return {
    x: rect.left,
    y: rect.top
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
      // const range = document.createRange();
      //   const selection = window.getSelection();
      //   range.setStart(editable, editable.childNodes.length);
      //   range.collapse(true);
      //   selection.removeAllRanges();
      //   selection.addRange(range);
        console.log('we have not solved this yet')
      
      
    },
  };
}





document.querySelectorAll('.textContainer').forEach(addEventListeners);
document.querySelectorAll('.topics').forEach(modifHeader)
