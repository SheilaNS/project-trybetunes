# :loud_sound: Projeto TrybeTunes :notes:

## :page_facing_up: Sobre

Projeto obrigatório do Bloco 5 - Ciclo de Vida de Componentes e React Router do curso de Desenvolvimento Web da [Trybe](https://www.betrybe.com).<br>
Uma aplicação para pesquisar e listar álbuns/músicas de várias bandas e artistas, ouvir um preview de 29 segundos de cada música e fazer uma lista das suas músicas favoritas. Também é possível personalizar seu perfil de usuário.<br>
API utilizada neste projeto: [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html#//apple_ref/doc/uid/TP40017632-CH3-SW1)<br>
Desenvolvido com ReactJs e TailwindCSS.<br><br>
Quantidade de requisitos: 14<br>
Requisitos feitos: 11<br>
Requisitos feitos após refatoração: 14<br>
<br>
URL do projeto: https://project-trybetunes-nu.vercel.app/

## :computer: Habilidades desenvolvidas

- Fazer requisições e consumir dados vindos de uma API
- Utilizar os ciclos de vida de um componente React
- Utilizar a função setState de forma a garantir que um determinado código só é executado após o estado ser atualizado
- Utilizar o componente BrowserRouter corretamente
- Criar rotas, mapeando o caminho da URL com o componente correspondente, via Route
- Utilizar o Switch do React Router
- Criar links de navegação na aplicação com o componente Link

## :speaking_head: Linguagens utilizadas
<div align="left">
  <a href="https://reactjs.org/"><img alt="React.Js icon" height="20px" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />React</a>
  <a href="https://tailwindcss.com/" title="TailwindCSS"><img alt="TailwindCss icon" height="20px" width="30px" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" />TailwindCSS</a>
</div>

## :building_construction: Estrutura do projeto
```
.
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── assets
│   │   ├── icons
│   │   │   ├── fav.svg
│   │   │   ├── search.svg
│   │   │   └── user.svg
│   │   └── images
│   │       ├── blue-bg.svg
│   │       └── logo.svg
│   ├── components
│   │   ├── FavoriteMusicCard.jsx
│   │   ├── Header.jsx
│   │   ├── Loading.jsx
│   │   └── MusicCard.jsx
│   ├── pages
│   │   ├── Album.jsx
│   │   ├── Favorites.jsx
│   │   ├── Login.jsx
│   │   ├── NotFound.jsx
│   │   ├── ProfileEdit.jsx
│   │   ├── Profile.jsx
│   │   └── Search.jsx
│   ├── routes
│   │   └── routes.js
│   ├── services
│   │   ├── favoriteSongsAPI.js
│   │   ├── musicsAPI.js
│   │   ├── searchAlbumsAPI.js
│   │   └── userAPI.js
│   ├── App.js
│   ├── index.css
│   └── index.js
├── .env
├── .gitignore
├── .npmrc
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
```

 #### Autora: Sheila Nakashima dos Santos
<a href="https://wa.me/+5511995985416?text=Sheila%20Dev" target="_blank" rel="external"><img src="https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white" alt="WhatsApp" height="25px" /></a>
<a href="https://www.linkedin.com/in/sheila-nakashima-dos-santos/" target="_blank" rel="external"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" height="25px"></a>
<a href="mailto:shei.nsantos@gmail.com" target="_blank" rel="external"><img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail" height="25px"></a>
