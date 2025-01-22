// make functions globally available
window.startTest = () => test.startTest();
window.startDemo = () => test.startDemo();
window.handleResponse = (response) => test.handleResponse(response);

// init and show instruction page
document.addEventListener('DOMContentLoaded', () => {
    display.showSection('instructions');
});
