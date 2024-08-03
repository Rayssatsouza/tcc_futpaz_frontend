
# FutManager_FrontEnd

Esse diretório armazena a parte do frontend da aplicação FutManager, que se destina a ajudar a organização Futpaz na gerência das atividades através de uma interface que provê facilidades para lidar com o cadastro de novos alunos e turmas. O FutManager_FrontEnd utiliza as seguintes tecnologias: React, TailwindCSS e Vite.

O projeto segue a seguinte estrutura: 

FutManager_Frontend/
├── public/
├── src/
│   ├── data/
│   │   └── services/
│   ├── pages/
│   ├── ui/
│   │   ├── components/
│   │   ├── partials/
│   │   └── styles/
│   ├── index.css
│   └── main.jsx
├── .env
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── Routes.jsx
├── tailwind.config.js
└── vite.config.js

Abaixo, apresentamos uma breve descrição da função de cada diretório que compõe nossa aplicação.



## public
 - Esse diretório armazena arquivos estáticos que podem ser distribuídos facilmente em toda nossa aplicação. Um bom exemplo de uso, e também o que estamos fazendo, é armazenar a logo do nosso sistema.

## src
 - A pasta src armazena o código-fonte do nosso projeto, isto é, os arquivos principais que compõem nossa aplicação. Ela também é dividida em subdiretórios, a fim de facilitar a manutenção da aplicação. Segue abaixo uma breve explicação a respeito desses subdiretórios:

#### data
 - O diretório data é utilizado para armazenar códigos que não vão afetar diretamente o visual de nossas páginas. Estamos utilizando-o a fim de separar a comunicação com nosso servidor backend de nossos componentes e páginas.

#### pages
 - A pasta pages é responsável por armazenar as páginas de nossa aplicação.

### ui
 - Esta pasta armazena todos os componentes e estilos que compõem nossa aplicação, ou seja, é responsável por guardar arquivos referentes à interface do usuário, desde componentes até layouts (partials) e estilos globais (styles).


Nossa aplicação também é composta por arquivos que estão fora da pasta src e que possuem bastante importância para o bom funcionamento da aplicação. Entretanto, serão detalhados apenas aqueles que desempenham um papel de maior destaque, como segue abaixo:

## .env
- Este arquivo armazena as variáveis de ambiente que podemos usar ao longo do funcionamento de nossa aplicação. Ele é responsável por assegurar que dados importantes não sejam comprometidos, garantindo assim a segurança do sistema.

## index.html
- Este é o arquivo HTML principal, responsável por gerar todo o corpo e configurações de cabeçalho da nossa aplicação.

## Routes.jsx
- Este arquivo configura a navegação entre nossas páginas, ou seja, aqui é onde você pode criar rotas para páginas novas ou ajustar o caminho para rotas já existentes.

