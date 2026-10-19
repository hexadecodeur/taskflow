/**
 * @jest-environment jsdom
 */

require('jest');

let nameInput, descriptionInput, error, form;
global.secureFetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve({id: 123})
}));

beforeEach(() => {
    jest.resetModules();
    document.body.innerHTML = `<form id="project-form">
      <input id="project-name" type="text" placeholder="Nom du projet" required>
      <textarea id="project-description" rows="4" placeholder="Description"></textarea>
      <p id="error"></p>
      <button type="submit">Créer</button>
    </form>`;
    nameInput = document.getElementById('project-name');
    descriptionInput = document.getElementById('project-description');
    error = document.getElementById('error');
    form = document.getElementById('project-form');

    require('../create-project.js');
})

test('affiche une erreur si le nom < 4 caractères', () => {
    nameInput.value = 'abc';

    form.dispatchEvent(new Event('submit'));

    expect(error.textContent).toBe('Nom du projet invalide');
    expect(global.secureFetch).not.toHaveBeenCalled();
});

test('appelle secureFetch avec les bons paramètres', async () => {
    nameInput.value = 'Projet 1';
    descriptionInput.value = 'Description';

    await form.dispatchEvent(new Event('submit'));

    expect(global.secureFetch).toHaveBeenCalledWith(
        'http://localhost:3000/projects',
        'POST',
        {
            title: 'Projet 1',
            description: 'Description'
        }
    )
})