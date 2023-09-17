function SUCCESS(message, title) {
  remote.dialog.showMessageBoxSync({
    type: 'question',
    buttons: ['Yes'],
    title: String(title),
    normalizeAccessKeys: true,
    message: String(message)
  });
  document.title = document.title.replace(/\s\- не збережено$/, "");
}