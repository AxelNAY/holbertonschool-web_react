# React State

Ce projet explore la gestion de l'état dans React à travers une application Dashboard progressive. Chaque tâche introduit de nouveaux concepts liés à l'état local, au Context API et à l'optimisation des re-rendus.

## Ressources

- [React State & Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)
- [React Context](https://reactjs.org/docs/context.html)
- [React.memo](https://reactjs.org/docs/react-api.html#reactmemo)

## Prérequis

- Node.js
- npm

## Technologies utilisées

- React 18 (Class Components)
- Vite
- Jest & React Testing Library
- TailwindCSS
- PropTypes

## Structure du projet

```
react_state/
├── task_0/   # État local dans App (displayDrawer)
├── task_1/   # Optimisation avec React.memo
├── task_2/   # Introduction du Context API
├── task_3/   # Consommation du Context dans les composants enfants
└── task_4/   # État complet : notifications et cours dans App
```

## Tâches

### Task 0 - État local et gestion des événements

Ajout de l'état local dans le composant `App` :

- État `displayDrawer` pour afficher/masquer le panneau de notifications
- Méthodes `handleDisplayDrawer` et `handleHideDrawer` pour contrôler cet état
- Raccourci clavier **Ctrl+H** pour déclencher la déconnexion via un listener sur `keydown`

### Task 1 - Optimisation avec React.memo

Optimisation du composant `Notifications` pour éviter les re-rendus inutiles :

- Utilisation de `React.memo` avec une fonction de comparaison personnalisée `areEqual`
- Le composant ne se re-rend que si `displayDrawer` ou le nombre de notifications change

### Task 2 - Introduction du Context API

Création d'un contexte React pour partager l'état d'authentification :

- Création de `Context/context.js` avec `React.createContext`
- Déplacement de l'état utilisateur (`email`, `password`, `isLoggedIn`) dans `App`
- Ajout des méthodes `logIn` et `logOut` dans `App`
- Le composant `App` enveloppe l'arbre dans un `Context.Provider`

### Task 3 - Consommation du Context

Connexion des composants enfants au Context :

- `Header` et `Footer` consomment le contexte via `useContext`
- Affichage conditionnel selon l'état `isLoggedIn` de l'utilisateur

### Task 4 - État complet dans App

Centralisation de tout l'état dans `App` :

- `notifications` et `courses` déplacés dans le state de `App`
- Ajout de la méthode `markNotificationAsRead` : filtre et supprime une notification de l'état par son `id`
- La prop `markNotificationAsRead` est passée à `Notifications`

## Installation et lancement

```bash
cd task_X/dashboard
npm install
npm run dev
```

## Tests

```bash
cd task_X/dashboard
npm test
```

## Auteur

**Axel NAY** - [GitHub](https://github.com/AxelNAY)
