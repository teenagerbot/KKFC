const DOMserver = (element, server) => {
  const targetElement = document.querySelector(String(element));
  const observer = new MutationObserver((mutationsList, observer) => {
    mutationsList.forEach(mutation => {
      const ObjectServer = {
        type: mutation.type,
        targetElement: mutation.target,
        attributeName: mutation.attributeName,
        oldValue: mutation.oldValue,
        newValue: mutation.newValue,
        addedNodes: mutation.addedNodes,
        removedNodes: mutation.removedNodes,
        previousSibling: mutation.previousSibling,
        nextSibling: mutation.nextSibling
      };
      server(ObjectServer);
    });
  });
  const config = {
    attributes: true, // Отслеживание изменений атрибутов элемента
    childList: true, // Отслеживание добавления или удаления дочерних элементов
    subtree: true, // Отслеживание изменений во всем поддереве элемента
    attributeOldValue: true,
    characterData: true,
    characterDataOldValue: true
  };
  observer.observe(targetElement, config);
}